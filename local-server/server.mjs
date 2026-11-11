#!/usr/bin/env node
// ═══ Quiz Party — локальный сервер бара (офлайн-устойчивость, шаг 6/Part B) ═══
//
// Один файл, ноль npm-зависимостей: только встроенные модули Node
// (node:http/fs/path/crypto/os). Раздаёт собранное приложение (папка
// `local-server/app/` — копия `dist/`) и API под `/api/*`, чтобы вечером в
// баре игра шла по локальной сети без доступа к интернету вообще.
//
// АРХИТЕКТУРА (см. HANDOFF.md, раздел про локальный сервер):
//  - mixed content не даёт https-странице обратиться на http://192.168.x.x,
//    поэтому это НЕ «те же данные с другого адреса», а переход на другой
//    origin целиком: сервер раздаёт СВОЮ копию приложения плюс API с
//    одного и того же адреса http://<ip>:7331. Один источник истины
//    получается бесплатно: вкладка на https:// пишет в облако, вкладка на
//    http://192.168… — только сюда, перепутать физически нельзя.
//  - REST + поллинг, как в облаке (НЕ WebSocket) — тот же протокол, что
//    ждут pollLoop.ts/хуки. Дешевизна поллинга — через монотонный счётчик
//    `rev`: растёт на каждой мутации, клиент шлёт `?since=<rev>`, если
//    нечего отдавать — 204 No Content.
//  - Сервер стартует «холодным» (armed: false) и не принимает записи,
//    пока ведущий явно не нажал «включить локальный режим» на /local —
//    второй, ручной замок поверх origin-замка.
//
// Хранилище: `local-server/data/state.json` (атомарная запись — во
// временный файл + rename) + журнал `local-server/data/game-<gameId>.jsonl`
// (дописывание на каждую мутацию — на случай, если state.json побился).
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

// ставки гонки: ref 'q-race-<раунд>'; выбор открыт только в стадии betting своего раунда
const isRaceRef = ref => typeof ref === 'string' && ref.startsWith('q-race-')
const raceBetsOpen = (st, round) => st.session?.melody?.race?.stage === 'betting' && String(st.session.round_number) === String(round)


// ═══ Безопасность локального сервера (10.64, аудит К3/В4/В1) ═══
// 1) decodeURIComponent на кривом адресе (`/quiz-party/%`) бросает URIError — раньше это роняло весь процесс. Теперь — безопасное чтение, ответ 400.
// 2) PIN ведущего: «опасные» запросы (включить/выключить запись, сменить фазу игры, удалить команду, править/начислять ответы, блиц, загрузить/скачать пакет с ответами, выгрузка)
//    требуют заголовок X-QP-PIN. Игроки с телефонов PIN не знают: они регистрируются, пишут свои ответы и читают состояние — этого достаточно.
// 3) Служебные строки очков (q-paper-/q-adjust-/q-blitz) и «выписанные» ставки игроку без PIN не принимаются (зеркало миграции 0018).
// 4) Пакет для игроков — без ответов (то же, что в облаке делает функция player_pack_questions).
export function safeDecode(s) { try { return decodeURIComponent(s) } catch { return null } }
const SERVICE_REF = /^(q-paper-|q-adjust-|q-blitz)/
export const MAX_PLAYER_STAKE = 100
/** Убирает из вопроса пакета всё, что выдаёт ответ (кроме слова кроссворда и фразы «Скрэмбла», без которых телефон не построит поле). */
export function sanitizeQuestion(q) {
  if (!q || typeof q !== 'object') return q
  const a = q.answer && typeof q.answer === 'object' ? { ...q.answer } : q.answer
  if (a && typeof a === 'object') { delete a.correct; delete a.display; delete a.correct_choice; delete a.correct_order; delete a.correct_pairs }
  const media = q.media && typeof q.media === 'object' ? { ...q.media } : q.media
  if (media && typeof media === 'object') delete media.answer
  return { ...q, answer: a, media, answer_note: null }
}
export function sanitizePack(pack) {
  if (!pack || typeof pack !== 'object') return pack
  return { ...pack, rounds: (pack.rounds ?? []).map(r => ({ ...r, questions: (r.questions ?? []).map(sanitizeQuestion) })) }
}
function pinOk(req, pin) {
  const got = String(req.headers['x-qp-pin'] ?? ''); if (!pin || !got) return false
  const a = Buffer.from(got), b = Buffer.from(String(pin)); return a.length === b.length && crypto.timingSafeEqual(a, b)
}
/** Какие запросы только для ведущего (нужен PIN). */
function hostOnly(method, seg) {
  const s0 = seg[0]
  if (s0 === 'arm' || s0 === 'disarm') return true
  if (s0 === 'session' && method === 'PATCH') return true
  if (s0 === 'teams' && method === 'DELETE') return true
  if (s0 === 'answers' && (method === 'PATCH' || method === 'DELETE')) return true
  if (s0 === 'blitz' && method === 'PUT') return true
  if (s0 === 'pack' && method === 'POST') return true
  if (s0 === 'export') return true
  return false
}

export const PORT = Number(process.env.QP_LOCAL_PORT) || 7331
// База путей приложения — ДОЛЖНА совпадать с `base` в vite.config.ts.
// Сейчас там '/quiz-party/'. Если поменяется там — поменять и здесь.
export const APP_BASE = '/quiz-party/'

const VERSION = readVersion()

function readVersion() {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url))
    const src = fs.readFileSync(path.join(here, '..', 'src', 'version.ts'), 'utf8')
    const m = src.match(/VERSION\s*=\s*'([^']+)'/)
    return m ? m[1] : 'dev'
  } catch {
    return 'dev'
  }
}

// ═══ Хранилище ═══

function defaultState() {
  const now = new Date().toISOString()
  return {
    gameId: crypto.randomUUID(),
    armed: false,
    rev: 0,
    session: {
      id: 1, game_id: '', pack_id: null, phase: 'lobby', round_number: 0,
      question_index: 0, timer_started_at: null, reveal: false,
      completed_rounds: [], melody: {}, updated_at: now, state_rev: 0,
    },
    teams: [],
    answers: [],
    blitz: {},   // round_number (string) -> { state, updated_at }
    packs: {},   // packId -> снимок пакета (JSON), загружен вручную с /local
  }
}

export function createStore(dataDir) {
  fs.mkdirSync(dataDir, { recursive: true })
  const statePath = path.join(dataDir, 'state.json')
  const mediaDir = path.join(dataDir, 'media')
  fs.mkdirSync(mediaDir, { recursive: true })

  let state
  try {
    state = JSON.parse(fs.readFileSync(statePath, 'utf8'))
    // старый state.json (до 9.60/миграции 0014) не знает про state_rev —
    // трактуем как версию 0, а не роняем загрузку.
    if (typeof state.session?.state_rev !== 'number') {
      state.session.state_rev = 0
    }
    // старый state.json (до 9.67/миграции 0015) не знает про accepted_at —
    // зеркало бэкфилла миграции: момент последней отправки = updated_at.
    for (const a of state.answers ?? []) {
      if (a.accepted_at == null) a.accepted_at = a.updated_at ?? a.created_at ?? null
    }
  } catch {
    state = defaultState()
  }

  function journalPath() {
    return path.join(dataDir, `game-${state.gameId}.jsonl`)
  }

  function persist() {
    const tmp = statePath + '.tmp'
    fs.writeFileSync(tmp, JSON.stringify(state))
    fs.renameSync(tmp, statePath)
  }

  function journal(op, payload) {
    try {
      fs.appendFileSync(journalPath(), JSON.stringify({
        ts: new Date().toISOString(), rev: state.rev, op, payload,
      }) + '\n')
    } catch { /* журнал — подстраховка, не блокирует игру */ }
  }

  /** Любая мутация идёт через это: растит rev, пишет журнал, атомарно
   *  сохраняет state.json. */
  function mutate(op, payload, fn) {
    fn()
    state.rev++
    journal(op, payload)
    persist()
  }

  return { state: () => state, mediaDir, mutate, persist }
}

// ═══ Мелкая утиль HTTP ═══

function sendJson(res, status, body, extraHeaders = {}) {
  const buf = Buffer.from(JSON.stringify(body ?? null))
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  })
  res.end(buf)
}

function sendNoContent(res, extraHeaders = {}) {
  res.writeHead(204, { 'Cache-Control': 'no-store', ...extraHeaders })
  res.end()
}

function sendError(res, status, error) {
  sendJson(res, status, { error })
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', c => {
      size += c.length
      if (size > 25 * 1024 * 1024) { req.destroy(); reject(new Error('тело запроса слишком большое')); return }
      chunks.push(c)
    })
    req.on('end', () => {
      if (chunks.length === 0) { resolve(undefined); return }
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) } catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.m4a': 'audio/mp4',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/opus',
  '.flac': 'audio/flac',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
}
function mimeOf(p) { return MIME[path.extname(p).toLowerCase()] ?? 'application/octet-stream' }

// ═══ Статика приложения (dist, с учётом base) ═══

function serveApp(req, res, pathname, appDir) {
  if (pathname === '/') { res.writeHead(302, { Location: APP_BASE }); res.end(); return true }
  if (!pathname.startsWith(APP_BASE)) return false

  let rel = safeDecode(pathname.slice(APP_BASE.length))
  if (rel === null || rel.includes('\0')) { sendError(res, 400, 'плохой адрес'); return true }
  if (rel === '') rel = 'index.html'
  const root = path.resolve(appDir), filePath = path.resolve(root, rel)
  if (filePath !== root && !filePath.startsWith(root + path.sep)) { sendError(res, 400, 'плохой путь'); return true }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendHtmlNotFound(res, appDir)
      return
    }
    if (rel === 'index.html') {
      let html = data.toString('utf8')
      // Метка, по которой клиент (src/lib/transport/mode.ts) отличает
      // страницу, отданную ЭТИМ сервером, от облачной — не по IP-регэксп,
      // а прямым признаком в разметке.
      const tag = '<meta name="qp-local" content="1">'
      html = html.includes('<head>') ? html.replace('<head>', `<head>\n    ${tag}`) : tag + html
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' })
      res.end(html)
      return
    }
    res.writeHead(200, { 'Content-Type': mimeOf(filePath), 'Cache-Control': 'public, max-age=3600' })
    res.end(data)
  })
  return true
}

function sendHtmlNotFound(res, appDir) {
  // Собранного приложения может не быть на месте (ведущий ещё не положил
  // dist в local-server/app/) — понятный текст вместо голого 404.
  const hint = fs.existsSync(path.join(appDir, 'index.html'))
    ? 'Файл не найден.'
    : 'В папке local-server/app/ нет собранного приложения — см. local-server/README.md.'
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end(hint)
}

// ═══ /api/media/* — раздача файлов с диска, с поддержкой Range ═══

function serveMedia(req, res, relPath, mediaDir) {
  if (req.method !== 'GET' && req.method !== 'HEAD') { sendError(res, 405, 'метод не поддержан'); return }
  const root = path.resolve(mediaDir), filePath = path.resolve(root, relPath)
  if (relPath.includes('\0') || !filePath.startsWith(root + path.sep)) { sendError(res, 400, 'плохой путь'); return }
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) { sendError(res, 404, 'файла нет на сервере'); return }
    const range = req.headers.range
    const type = mimeOf(filePath)
    if (!range) {
      res.writeHead(200, {
        'Content-Type': type, 'Content-Length': stat.size,
        'Accept-Ranges': 'bytes', 'Cache-Control': 'public, max-age=3600',
      })
      if (req.method === 'HEAD') { res.end(); return }
      fs.createReadStream(filePath).pipe(res)
      return
    }
    const m = /bytes=(\d*)-(\d*)/.exec(range)
    if (!m || (!m[1] && !m[2])) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` })
      res.end()
      return
    }
    let start = m[1] ? parseInt(m[1], 10) : stat.size - parseInt(m[2], 10)
    let end = m[2] && m[1] ? parseInt(m[2], 10) : stat.size - 1
    if (Number.isNaN(start) || start < 0) start = 0
    if (Number.isNaN(end) || end >= stat.size) end = stat.size - 1
    if (start > end) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` })
      res.end()
      return
    }
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
    })
    if (req.method === 'HEAD') { res.end(); return }
    fs.createReadStream(filePath, { start, end }).pipe(res)
  })
}

// ═══ API ═══

function createApiHandler(store, pin) {
  const WRITE_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE'])

  return async function handleApi(req, res, url) {
    const st = store.state()
    const seg = url.pathname.replace(/^\/api\//, '').split('/').filter(Boolean)
    const method = req.method

    // PIN ведущего для «опасных» запросов (ответ 403 — клиент покажет, что нужно ввести PIN на странице /local)
    const isHost = pinOk(req, pin)
    if (hostOnly(method, seg) && !isHost) { sendError(res, 403, 'нужен PIN ведущего (он напечатан в окне сервера; введите его на странице /local)'); return }
    // arm/disarm сами переключают замок — их эти проверки не касаются.
    const isArmToggle = seg[0] === 'arm' || seg[0] === 'disarm'
    if (WRITE_METHODS.has(method) && !st.armed && !isArmToggle) {
      sendError(res, 409, 'Локальный режим выключен — включите на странице /local')
      return
    }

    try {
      // ── серверное время: поправка часов устройств (src/lib/serverClock.ts) ──
      if (seg[0] === 'server-now' && method === 'GET') {
        sendJson(res, 200, { now: Date.now() })
        return
      }

      // ── health ──
      if (seg[0] === 'health' && method === 'GET') {
        sendJson(res, 200, { ok: true, version: VERSION, rev: st.rev, armed: st.armed, gameId: st.gameId, pinOk: isHost })
        return
      }

      // ── arm/disarm ──
      if (seg[0] === 'arm' && method === 'POST') {
        store.mutate('arm', {}, () => { st.armed = true })
        sendJson(res, 200, { ok: true, armed: true })
        return
      }
      if (seg[0] === 'disarm' && method === 'POST') {
        store.mutate('disarm', {}, () => { st.armed = false })
        sendJson(res, 200, { ok: true, armed: false })
        return
      }

      // ── session ──
      if (seg[0] === 'session' && seg.length === 1) {
        if (method === 'GET') {
          const since = Number(url.searchParams.get('since') ?? 'NaN')
          if (Number.isFinite(since) && since === st.rev) { sendNoContent(res); return }
          sendJson(res, 200, st.session, { 'X-Rev': String(st.rev) })
          return
        }
        if (method === 'PATCH') {
          const patch = await readJsonBody(req)
          // 9.60 (миграция 0014, HANDOFF §3bw): CAS через ?ifStateRev=<rev> —
          // облачный аналог триггера state_rev. Сравнение и применение
          // патча — в ОДНОМ синхронном блоке (Node однопоточный, между ними
          // нет await), иначе гонка возможна и здесь.
          const ifStateRevRaw = url.searchParams.get('ifStateRev')
          const ifStateRev = ifStateRevRaw == null ? null : Number(ifStateRevRaw)
          if (ifStateRev != null && ifStateRev !== st.session.state_rev) {
            sendJson(res, 412, { error: 'conflict', session: st.session })
            return
          }

          const strip = s => { const { updated_at, state_rev, ...rest } = s; return JSON.stringify(rest) }
          const before = strip(st.session)
          store.mutate('session.patch', patch, () => {
            for (const [k, v] of Object.entries(patch ?? {})) {
              // `melody` — общий jsonb-мешок состояний механик (плитка «Своей
              // игры», скачки, мелодия). ПОЛНАЯ ЗАМЕНА объекта — как и в
              // облаке (supabaseTransport) — не слияние по ключам: прошлый
              // merge-по-ключам не давал раунду мелодии реально ОЧИЩАТЬ
              // предыдущий мешок между треками/раундами (см. HANDOFF §3bw,
              // найдено ревью коммита B — старое поведение было багом, не
              // фичей: сброс `melody: {}` не работал на локальном сервере).
              // `state_rev` из тела запроса клиента ИГНОРИРУЕТСЯ — версией
              // управляет только сервер (ниже).
              if (k === 'state_rev') continue
              st.session[k] = v
            }
            st.session.updated_at = new Date().toISOString()
            const after = strip(st.session)
            if (after !== before) st.session.state_rev = (st.session.state_rev ?? 0) + 1
          })
          sendJson(res, 200, { ok: true, rev: st.rev, state_rev: st.session.state_rev })
          return
        }
      }

      // ── teams ──
      if (seg[0] === 'teams' && seg.length === 1) {
        if (method === 'GET') { sendJson(res, 200, st.teams, { 'X-Rev': String(st.rev) }); return }
        if (method === 'POST') {
          const row = await readJsonBody(req)
          if (!row?.name) { sendError(res, 400, 'нужно имя команды'); return }
          let team
          store.mutate('teams.upsert', row, () => {
            const existing = st.teams.find(t => t.name === row.name)
            if (existing) {
              Object.assign(existing, row)
              team = existing
            } else {
              team = { id: crypto.randomUUID(), color: row.color ?? '#888', icon: row.icon ?? null,
                game_id: row.game_id ?? null, last_seen_at: row.last_seen_at ?? null, ...row }
              st.teams.push(team)
            }
          })
          sendJson(res, 200, team)
          return
        }
      }
      if (seg[0] === 'teams' && seg.length === 2) {
        const id = seg[1]
        if (method === 'PATCH') {
          const patch = await readJsonBody(req)
          const found = st.teams.find(t => t.id === id)
          if (!found) { sendError(res, 404, 'команда не найдена'); return }
          store.mutate('teams.patch', { id, patch }, () => { Object.assign(found, patch) })
          sendJson(res, 200, found)
          return
        }
        if (method === 'DELETE') {
          store.mutate('teams.delete', { id }, () => { st.teams = st.teams.filter(t => t.id !== id) })
          sendNoContent(res)
          return
        }
      }

      // ── answers ──
      if (seg[0] === 'answers' && seg.length === 1) {
        if (method === 'GET') {
          const since = Number(url.searchParams.get('since') ?? 'NaN')
          if (Number.isFinite(since) && since === st.rev) { sendNoContent(res); return }
          const round = url.searchParams.get('round')
          const rows = round == null ? st.answers : st.answers.filter(a => String(a.round_number) === round)
          sendJson(res, 200, rows, { 'X-Rev': String(st.rev) })
          return
        }
        if (method === 'POST') {
          const rows = await readJsonBody(req)
          if (!Array.isArray(rows)) { sendError(res, 400, 'ожидается массив ответов'); return }
          store.mutate('answers.upsert', rows, () => {
            for (const row of rows) {
              // onConflict как в supabaseTransport: team_id+question_ref, БЕЗ
              // game_id (см. types.ts/HANDOFF §5 — иначе бумажные баллы
              // задваиваются).
              // accepted_at — зеркало триггера 0015: серверный момент
              // ПОСЛЕДНЕЙ СМЕНЫ ТЕКСТА. Значение из тела клиента выкидываем
              // всегда (иначе Object.assign затёр бы его клиентским).
              const { accepted_at: _ignored, ...clean } = row
              if (!isHost) {
                if (SERVICE_REF.test(String(row.question_ref ?? ''))) continue                    // служебные очки пишет только ведущий (зеркало 0018)
                if (clean.stake != null && !(Number(clean.stake) >= 0 && Number(clean.stake) <= MAX_PLAYER_STAKE)) delete clean.stake
                if (isRaceRef(row.question_ref)) { delete clean.stake; delete clean.is_correct }  // очки гонки — только проектор (зеркало 0017)
                delete clean.is_correct                                                          // верность ответа отмечает только ведущий (зеркало 0012)
              }
              const existing = st.answers.find(a => a.team_id === row.team_id && a.question_ref === row.question_ref)
              // ставки «Скачек бульдогов» (зеркало миграции 0017): выбор меняется только пока race.stage = 'betting' в ЭТОМ раунде.
              // Здесь нет ролей (локальная сеть бара доверенная), поэтому закрывается именно текст ставки: после старта новая
              // ставка не создаётся, чужая не меняется. Очки (stake/is_correct) проектор пишет и после старта.
              if (isRaceRef(row.question_ref) && row.question_ref !== `q-race-${row.round_number}`) continue   // ref и раунд обязаны совпадать (зеркало 0017)
              if (isRaceRef(row.question_ref) && !raceBetsOpen(st, row.round_number)) {
                if (!existing) continue
                if (clean.answer_text !== undefined && clean.answer_text !== existing.answer_text) delete clean.answer_text
              }
              if (existing) {
                if (clean.answer_text !== undefined && clean.answer_text !== existing.answer_text) {
                  existing.accepted_at = new Date().toISOString()
                }
                Object.assign(existing, clean)
              } else {
                const now = new Date().toISOString()
                st.answers.push({ id: crypto.randomUUID(), is_correct: null, stake: null,
                  created_at: now, ...clean, accepted_at: now })
              }
            }
          })
          sendJson(res, 200, { ok: true, count: rows.length })
          return
        }
      }
      if (seg[0] === 'answers' && seg.length === 2) {
        const id = seg[1]
        if (method === 'PATCH') {
          const patch = await readJsonBody(req)
          const found = st.answers.find(a => a.id === id)
          if (!found) { sendError(res, 404, 'ответ не найден'); return }
          // accepted_at ставит только сервер (зеркало триггера 0015); смена
          // текста через PATCH двигает его так же, как upsert.
          const { accepted_at: _ignored, ...cleanPatch } = patch ?? {}
          if (isRaceRef(found.question_ref)) for (const k of ['id', 'team_id', 'game_id', 'question_ref', 'round_number']) delete cleanPatch[k]   // личность ставки не переопределяется (зеркало 0017)
          if (isRaceRef(found.question_ref) && !raceBetsOpen(st, found.round_number) && cleanPatch.answer_text !== undefined) delete cleanPatch.answer_text
          store.mutate('answers.patch', { id, patch: cleanPatch }, () => {
            if (cleanPatch.answer_text !== undefined && cleanPatch.answer_text !== found.answer_text) {
              found.accepted_at = new Date().toISOString()
            }
            Object.assign(found, cleanPatch)
          })
          sendJson(res, 200, found)
          return
        }
      }

      // ── blitz ──
      if (seg[0] === 'blitz' && seg.length === 1) {
        const round = url.searchParams.get('round') ?? '0'
        if (method === 'GET') {
          const entry = st.blitz[round]
          sendJson(res, 200, entry ? entry.state : null)
          return
        }
        if (method === 'PUT') {
          const body = await readJsonBody(req)
          store.mutate('blitz.write', { round, body }, () => {
            st.blitz[round] = { state: body, updated_at: new Date().toISOString() }
          })
          sendJson(res, 200, { ok: true })
          return
        }
      }

      // ── pack ──
      if (seg[0] === 'pack' && seg.length === 2) {
        const id = seg[1]
        if (method === 'GET') {
          const pack = st.packs[id]
          if (!pack) { sendError(res, 404, 'пакет не загружен на этот сервер'); return }
          sendJson(res, 200, isHost ? pack : sanitizePack(pack))                              // игроку — без ответов
          return
        }
        if (method === 'POST') {
          const pack = await readJsonBody(req)
          store.mutate('pack.upload', { id }, () => { st.packs[id] = pack })
          sendJson(res, 200, { ok: true })
          return
        }
      }

      // ── export ──
      if (seg[0] === 'export' && method === 'GET') {
        sendJson(res, 200, {
          session: st.session,
          teams: st.teams,
          answers: st.answers,
          blitz: Object.entries(st.blitz).map(([round_number, v]) => ({
            round_number: Number(round_number), state: v.state, updated_at: v.updated_at,
          })),
        })
        return
      }

      sendError(res, 404, 'нет такого API-пути')
    } catch (err) {
      sendError(res, 500, err instanceof Error ? err.message : String(err))
    }
  }
}

// ═══ Сервер целиком ═══

export function createServer({ dataDir, appDir, pin }) {
  const store = createStore(dataDir)
  const hostPin = pin ?? process.env.QP_LOCAL_PIN ?? String(crypto.randomInt(100000, 1000000))
  const apiHandler = createApiHandler(store, hostPin)

  const server = http.createServer((req, res) => {
   try {
    let url
    try { url = new URL(req.url, 'http://localhost') } catch { sendError(res, 400, 'плохой адрес'); return }
    // /api/media/* — отдельная раздача файлов с диска (Range), НЕ через
    // JSON-обработчик apiHandler; проверяем ДО общего префикса /api/.
    const mediaRel = matchMedia(url.pathname)
    if (mediaRel !== null) {
      const dec = safeDecode(mediaRel); if (dec === null) { sendError(res, 400, 'плохой адрес'); return }
      serveMedia(req, res, dec, store.mediaDir)
      return
    }
    if (url.pathname.startsWith('/api/')) {
      apiHandler(req, res, url).catch(err => { try { sendError(res, 500, err instanceof Error ? err.message : String(err)) } catch { /* ответ уже ушёл */ } })
      return
    }
    if (serveApp(req, res, url.pathname, appDir)) return
    sendHtmlNotFound(res, appDir)
   } catch (err) {                                                       // что бы ни случилось с одним запросом — сервер живёт дальше
     try { sendError(res, 500, err instanceof Error ? err.message : String(err)) } catch { /* ответ уже ушёл */ }
   }
  })

  return { server, store, pin: hostPin }
}

function matchMedia(pathname) {
  const prefix = '/api/media/'
  if (!pathname.startsWith(prefix)) return null
  return pathname.slice(prefix.length)
}

// ═══ Точка входа (запуск скриптом start-quiz-local.cmd) ═══

function printAddresses(port, pin) {
  const nets = os.networkInterfaces()
  const addrs = []
  for (const list of Object.values(nets)) {
    for (const net of list ?? []) {
      if (net.family === 'IPv4' && !net.internal) addrs.push(net.address)
    }
  }
  console.log('')
  console.log('========================================')
  console.log('  QUIZ PARTY — ЛОКАЛЬНЫЙ СЕРВЕР ЗАПУЩЕН')
  console.log('========================================')
  console.log(`  Версия: ${VERSION}`)
  console.log('')
  console.log(`  PIN ВЕДУЩЕГО: ${pin}   (введи его один раз на странице /local на устройстве ведущего;`)
  console.log('  игрокам НЕ говори — без него нельзя менять фазу игры, начислять очки и скачивать ответы)')
  console.log('')
  console.log('  Адреса для подключения (с этого же вай-фая/хот-спота):')
  if (addrs.length === 0) {
    console.log('    сеть не найдена — подключи ноутбук к вай-фаю/хот-споту и перезапусти')
  }
  for (const a of addrs) console.log(`    http://${a}:${port}${APP_BASE}`)
  console.log('')
  console.log(`    Проектор: http://<адрес выше>:${port}${APP_BASE}#/`)
  console.log(`    Пульт ведущего: http://<адрес выше>:${port}${APP_BASE}#/admin`)
  console.log(`    Управление сервером: http://<адрес выше>:${port}${APP_BASE}#/local`)
  console.log('')
  console.log('  НЕ ЗАКРЫВАЙ это окно — закрытие останавливает игру.')
  console.log('========================================')
  console.log('')
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const here = path.dirname(fileURLToPath(import.meta.url))
  // PIN переживает перезапуск сервера (иначе ведущему пришлось бы вводить новый посреди игры): лежит в data/pin.txt; удалить файл = выдать новый
  const dataDir = path.join(here, 'data'); fs.mkdirSync(dataDir, { recursive: true })
  let pinValue = process.env.QP_LOCAL_PIN
  try { pinValue = pinValue || fs.readFileSync(path.join(dataDir, 'pin.txt'), 'utf8').trim() } catch { /* файла нет — выдадим */ }
  if (!pinValue) { pinValue = String(crypto.randomInt(100000, 1000000)); try { fs.writeFileSync(path.join(dataDir, 'pin.txt'), pinValue) } catch { /* не критично */ } }
  const { server, pin } = createServer({
    dataDir,
    appDir: path.join(here, 'app'),
    pin: pinValue,
  })
  // последний рубеж: неожиданная ошибка пишется в журнал, процесс не умирает посреди игры
  process.on('uncaughtException', err => { console.error('[ошибка, сервер продолжает работу]', err) })
  process.on('unhandledRejection', err => { console.error('[необработанный отказ, сервер продолжает работу]', err) })
  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Порт ${PORT} уже занят — закрой другую копию сервера или поменяй QP_LOCAL_PORT.`)
      process.exit(1)
    }
    throw err
  })
  server.listen(PORT, () => printAddresses(PORT, pin))
}
