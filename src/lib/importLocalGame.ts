// ═══ Заливка локальной игры (шаг 6/Part B) обратно в облако ═══
//
// Шаг 7 плана офлайн-устойчивости (issue #4/#5). Локальный сервер бара
// отдаёт весь прогон игры одним снимком (`GET /api/export` на
// `local-server/server.mjs`, скачивается со страницы `/local` как файл).
// Здесь — приёмная сторона: облачная админка читает этот файл и
// воспроизводит его в Supabase через тот же `RoomTransport`, что и обычная
// игра (см. `src/lib/transport/types.ts`).
//
// Заливка ОДНОСТОРОННЯЯ и РУЧНАЯ: ведущий сам выбирает файл, видит сводку
// и подтверждает. Автомерджа нет — если в облаке параллельно что-то
// записалось, разбирается ведущий глазами, не код.
//
// ВАЖНО про id команд. `room.upsertTeam` в облаке конфликтует по `name`
// (см. supabaseTransport.ts, `onConflict: 'name'`), НЕ по `id` — вернувшийся
// облачный id почти наверняка отличается от локального. Поэтому команды
// заливаются ПЕРВЫМИ, строится карта локальный id → облачный id, и только
// потом ею перекладываются `team_id` в ответах и результатах блица.
import type { Answer, GameState, Team } from '../types/quiz'
import type { BlitzState } from './blitzState'
import type { AnswerUpsert } from './transport/types'
import { room } from './transport'
import { getRoomId } from './room'

export type LocalExportTeam = Pick<Team, 'name' | 'color' | 'icon'> & {
  id: string
  game_id?: string | null
  last_seen_at?: string | null
}

export type LocalExportAnswer = {
  team_id: string
  question_ref: string
  round_number: number
  answer_text: string
  stake?: number | null
  is_correct?: boolean | null
  updated_at?: string
}

export type LocalExportBlitz = {
  round_number: number
  state: BlitzState
}

/** Форма файла, отдаваемого `GET /api/export` (см. `local-server/server.mjs`). */
export type LocalExport = {
  session: Partial<GameState> & { game_id: string }
  teams: LocalExportTeam[]
  answers: LocalExportAnswer[]
  blitz: LocalExportBlitz[]
}

/** Разбор файла: понятная ошибка вместо необработанного исключения, если
 *  файл битый или это не экспорт локальной игры (правило проекта — объяснять,
 *  а не молчать). */
export function parseLocalExport(text: string): LocalExport {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Файл повреждён: это не JSON.')
  }
  if (!data || typeof data !== 'object') {
    throw new Error('Файл повреждён: ожидался объект экспорта.')
  }
  const d = data as Record<string, unknown>
  const session = d.session
  if (!session || typeof session !== 'object' || typeof (session as Record<string, unknown>).game_id !== 'string'
    || !(session as Record<string, unknown>).game_id) {
    throw new Error('В файле нет сессии игры (session.game_id) — это не экспорт с /local.')
  }
  if (!Array.isArray(d.teams)) throw new Error('В файле нет списка команд (teams).')
  if (!Array.isArray(d.answers)) throw new Error('В файле нет списка ответов (answers).')
  return {
    session: session as LocalExport['session'],
    teams: d.teams as LocalExportTeam[],
    answers: d.answers as LocalExportAnswer[],
    blitz: Array.isArray(d.blitz) ? d.blitz as LocalExportBlitz[] : [],
  }
}

export type ImportSummary = {
  teamsCount: number
  answersCount: number
  blitzRoundsCount: number
  /** Сколько команд/ответов из файла уже есть в облаке с теми же ключами
   *  (совпадение по имени команды и по паре team_id+question_ref после
   *  переноса имени в облачный id) — эти строки заливка перезапишет.
   *  Для свежей игры (новый game_id) обычно 0 — ноль здесь ЧЕСТНЫЙ: ничего
   *  и не перезапишется, так как в облаке под этим game_id ничего нет. */
  teamsOverwritten: number
  answersOverwritten: number
}

/** Сводка «что будет перезаписано» — читает облако (без записи), чтобы
 *  показать ведущему перед подтверждением. */
export async function summarizeLocalImport(data: LocalExport): Promise<ImportSummary> {
  const gameId = data.session.game_id
  const [existingTeams, existingAnswers] = await Promise.all([
    room.listTeams(gameId),
    room.listAnswers(gameId),
  ])
  const existingNames = new Set(existingTeams.map(t => t.name))
  const teamsOverwritten = data.teams.filter(t => existingNames.has(t.name)).length

  const nameToCloudId = new Map(existingTeams.map(t => [t.name, t.id]))
  const localIdToName = new Map(data.teams.map(t => [t.id, t.name]))
  const existingAnswerKeys = new Set(existingAnswers.map((a: Answer) => `${a.team_id}|${a.question_ref}`))
  const answersOverwritten = data.answers.filter(a => {
    const name = localIdToName.get(a.team_id)
    const cloudId = name != null ? nameToCloudId.get(name) : undefined
    return cloudId != null && existingAnswerKeys.has(`${cloudId}|${a.question_ref}`)
  }).length

  return {
    teamsCount: data.teams.length,
    answersCount: data.answers.length,
    blitzRoundsCount: data.blitz.length,
    teamsOverwritten,
    answersOverwritten,
  }
}

/** Текст для confirm() — коротко, числами, как просит CLAUDE.md. */
export function summaryText(s: ImportSummary): string {
  const lines = [
    `Команд: ${s.teamsCount}`,
    `Ответов: ${s.answersCount}`,
  ]
  if (s.blitzRoundsCount > 0) lines.push(`Раундов блица: ${s.blitzRoundsCount}`)
  const overwritten = s.teamsOverwritten + s.answersOverwritten
  lines.push(overwritten > 0
    ? `Перезапишет уже существующих записей: ${overwritten} (команд: ${s.teamsOverwritten}, ответов: ${s.answersOverwritten})`
    : 'Совпадений с уже существующим в облаке не найдено — новая запись.')
  return lines.join('\n')
}

/** Собственно заливка. Порядок важен: команды первыми (нужна карта id),
 *  затем ответы одним upsertAnswers, затем блиц, затем сессия — чтобы
 *  patchSession не указывал на игру, для которой ещё нет ни команд, ни
 *  ответов, если что-то из середины упадёт. */
export async function importLocalGame(data: LocalExport): Promise<void> {
  const gameId = data.session.game_id

  const teamIdMap = new Map<string, string>()
  for (const t of data.teams) {
    const cloud = await room.upsertTeam({
      name: t.name, color: t.color, icon: t.icon ?? null,
      game_id: gameId, last_seen_at: t.last_seen_at ?? null,
    })
    teamIdMap.set(t.id, cloud.id)
  }

  const answerRows: AnswerUpsert[] = data.answers.map(a => {
    const cloudTeamId = teamIdMap.get(a.team_id)
    if (!cloudTeamId) {
      throw new Error(`Ответ ссылается на неизвестную команду (team_id=${a.team_id}) — файл повреждён.`)
    }
    return {
      team_id: cloudTeamId, game_id: gameId,
      question_ref: a.question_ref, round_number: a.round_number,
      answer_text: a.answer_text, stake: a.stake ?? null, is_correct: a.is_correct ?? null,
      updated_at: a.updated_at ?? new Date().toISOString(),
    }
  })
  if (answerRows.length > 0) await room.upsertAnswers(answerRows)

  for (const b of data.blitz) {
    await room.writeBlitz(gameId, b.round_number, b.state)
  }

  // id — идентичность строки game_sessions в облаке (роль/номер комнаты),
  // не переносим его с локального сервера; updated_at обновит сам транспорт.
  const { id: _id, updated_at: _updatedAt, ...sessionPatch } = data.session
  void _id; void _updatedAt
  await room.patchSession(getRoomId(), { ...sessionPatch, game_id: gameId })
}
