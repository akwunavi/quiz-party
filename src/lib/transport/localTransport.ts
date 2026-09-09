// ═══ RoomTransport поверх локального сервера бара (`local-server/server.mjs`) ═══
//
// Шаг 6/Part B плана офлайн-устойчивости. Вторая реализация того же
// интерфейса, что и `supabaseTransport.ts` — вызывающий код (хуки,
// gameActions, blitzApi) не знает, какая из них активна, см.
// `src/lib/transport/index.ts`/`mode.ts`.
//
// ОТЛИЧИЯ ОТ ОБЛАЧНОЙ РЕАЛИЗАЦИИ, ОСОЗНАННЫЕ:
//  - таймаут короче (1500мс вместо 6000) и только ОДИН ретрай: сервер в
//    той же локальной сети, если он не ответил за полтора секунды — скорее
//    всего, просто упал (закрыли окно консоли), и нет смысла ждать так же
//    долго, как для облака через мобильный интернет.
//  - `roomId`/`gameId` в вызовах ИГНОРИРУЮТСЯ: один физический сервер = одна
//    игра за вечер, отдельного понятия «комната» здесь нет (в отличие от
//    облака, где на одном проекте может крутиться несколько командных
//    квизов параллельно). Сервер всегда работает с ЕДИНСТВЕННОЙ сессией.
//  - `readSession`/`listAnswers` используют `?since=<rev>` сервера и держат
//    маленький локальный кеш «последнее известное значение»: если сервер
//    ответил 204 (rev не изменился), отдаём то, что уже знаем — экономим
//    трафик на LAN, хотя выигрыш здесь и так небольшой.
import type { Answer, GameState, Team } from '../../types/quiz'
import type { BlitzState } from '../blitzState'
import type {
  AnswerPatch, AnswerUpsert, DeleteAnswersBy, RoomTransport, SessionPatch, TeamPatch, TeamUpsert,
} from './types'

const TIMEOUT_MS = 1500

function isRetryableNetworkError(err: unknown): boolean {
  if (err instanceof DOMException && err.name === 'AbortError') return true
  if (err instanceof TypeError) return true
  const raw = err instanceof Error ? err.message : String(err)
  return /network|fetch|failed to fetch|offline|abort/i.test(raw)
}

async function withTimeout(path: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(path, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

/** Таймаут (1.5с) + один ретрай на сетевую ошибку — то же решение, что
 *  `withNetResilience` в net.ts, но с параметрами под локальную сеть, а не
 *  под мобильный интернет к облаку. Не переиспользуем net.ts напрямую,
 *  чтобы таймаут облака (6с) не протёк случайно в локальный путь. */
async function request(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await withTimeout(path, init)
  } catch (err) {
    if (!isRetryableNetworkError(err)) throw err
    return await withTimeout(path, init)
  }
}

async function errorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json() as { error?: string }
    if (body?.error) return body.error
  } catch { /* тело не JSON — используем статус */ }
  return `локальный сервер ответил ${res.status}`
}

/** JSON-запрос: бросает на 4xx/5xx (тем же смыслом, что supabase error),
 *  возвращает `undefined` на 204 (пустое тело). */
async function requestJson<T>(path: string, init?: RequestInit): Promise<T | undefined> {
  const res = await request(path, init)
  if (res.status === 204) return undefined
  if (!res.ok) throw new Error(await errorMessage(res))
  const text = await res.text()
  return text ? JSON.parse(text) as T : undefined
}

// ── Кеш «последнее известное» для ?since=<rev> ──
let sessionCache: { rev: number; data: GameState | null } = { rev: -1, data: null }
const answersCache = new Map<string, { rev: number; data: Answer[] }>()

function answersCacheKey(gameId: string, roundNumber?: number): string {
  return `${gameId}|${roundNumber ?? 'all'}`
}

export const localTransport: RoomTransport = {
  async readSession(_roomId) {
    // roomId игнорируется — локальный сервер держит одну сессию на весь
    // вечер (см. комментарий в шапке файла).
    const res = await request(`/api/session?since=${sessionCache.rev}`)
    if (res.status === 204) return sessionCache.data
    if (!res.ok) throw new Error(await errorMessage(res))
    const data = await res.json() as GameState
    const rev = Number(res.headers.get('X-Rev') ?? sessionCache.rev)
    sessionCache = { rev, data }
    return data
  },

  async patchSession(_roomId, patch: SessionPatch) {
    await requestJson('/api/session', { method: 'PATCH', body: JSON.stringify(patch) })
  },

  async listTeams(_gameId) {
    return (await requestJson<Team[]>('/api/teams')) ?? []
  },

  async upsertTeam(row: TeamUpsert) {
    const team = await requestJson<Team>('/api/teams', { method: 'POST', body: JSON.stringify(row) })
    if (!team) throw new Error('локальный сервер не вернул команду')
    return team
  },

  async patchTeam(id, patch: TeamPatch) {
    await requestJson(`/api/teams/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(patch) })
  },

  async deleteTeam(id) {
    await requestJson(`/api/teams/${encodeURIComponent(id)}`, { method: 'DELETE' })
  },

  async listAnswers(gameId, roundNumber) {
    const key = answersCacheKey(gameId, roundNumber)
    const cached = answersCache.get(key) ?? { rev: -1, data: [] }
    const q = new URLSearchParams({ since: String(cached.rev) })
    if (roundNumber !== undefined) q.set('round', String(roundNumber))
    const res = await request(`/api/answers?${q.toString()}`)
    if (res.status === 204) return cached.data
    if (!res.ok) throw new Error(await errorMessage(res))
    const data = await res.json() as Answer[]
    const rev = Number(res.headers.get('X-Rev') ?? cached.rev)
    answersCache.set(key, { rev, data })
    return data
  },

  async upsertAnswers(rows: AnswerUpsert[]) {
    await requestJson('/api/answers', { method: 'POST', body: JSON.stringify(rows) })
  },

  async patchAnswer(id, patch: AnswerPatch) {
    await requestJson(`/api/answers/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(patch) })
  },

  async deleteAnswers(by: DeleteAnswersBy) {
    // Локальный сервер (шаг 6) не реализует пакетное удаление ответов —
    // эта операция сегодня нужна только resetGameHard (админский путь вне
    // обычной игры). Пока не реализовано на сервере: сообщаем явно, а не
    // делаем вид, что почистили.
    void by
    throw new Error('локальный сервер: пакетное удаление ответов пока не поддержано')
  },

  async readBlitz(_gameId, roundNumber) {
    const st = await requestJson<BlitzState | null>(`/api/blitz?round=${roundNumber}`)
    return st && Array.isArray(st.order) ? st : null
  },

  async writeBlitz(_gameId, roundNumber, state) {
    await requestJson(`/api/blitz?round=${roundNumber}`, { method: 'PUT', body: JSON.stringify(state) })
  },

  async markQuestionShown(row) {
    // Тайминг — аналитика, не блокирует игру (тот же смысл, что в
    // supabaseTransport). Локальный сервер не хранит question_shown
    // отдельно — если понадобится офлайн-CSV с таймингом, потребует
    // отдельного эндпоинта (см. HANDOFF, бэклог).
    void row
  },

  async setPackStatus(_packId, _status) {
    // packs.status — редакторское/облачное поле, у локального сервера нет
    // таблицы пакетов со статусами (только снимок JSON под /api/pack/:id).
    // Не бросаем — вызывающий код (selectPackAndStart/finishGame) не должен
    // падать локально из-за этого не-игрового побочного эффекта.
  },
}
