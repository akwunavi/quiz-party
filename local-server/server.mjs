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
      completed_rounds: [], melody: {}, updated_at: now,
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

  let rel = decodeURIComponent(pathname.slice(APP_BASE.length))
  if (rel === '') rel = 'index.html'
  const filePath = path.join(appDir, rel)
  if (!filePath.startsWith(path.resolve(appDir))) { sendError(res, 400, 'плохой путь'); return true }

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
  const filePath = path.join(mediaDir, relPath)
  if (!filePath.startsWith(path.resolve(mediaDir))) { sendError(res, 400, 'плохой путь'); return }
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

function createApiHandler(store) {
  const WRITE_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE'])

  return async function handleApi(req, res, url) {
    const st = store.state()
    const seg = url.pathname.replace(/^\/api\//, '').split('/').filter(Boolean)
    const method = req.method

    // arm/disarm сами переключают замок — их эти проверки не касаются.
    const isArmToggle = seg[0] === 'arm' || seg[0] === 'disarm'
    if (WRITE_METHODS.has(method) && !st.armed && !isArmToggle) {
      sendError(res, 409, 'Локальный режим выключен — включите на странице /local')
      return
    }

    try {
      // ── health ──
      if (seg[0] === 'health' && method === 'GET') {
        sendJson(res, 200, { ok: true, version: VERSION, rev: st.rev, armed: st.armed, gameId: st.gameId })
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
          store.mutate('session.patch', patch, () => {
            for (const [k, v] of Object.entries(patch ?? {})) {
              // `melody` — общий jsonb-мешок состояний механик (плитка «Своей
              // игры», скачки). Полная замена объекта затирает то, что успел
              // записать другой экран (проектор/телефон ведущего), почти
              // одновременно дёрнувший другое поле мешка — мержим по ключам
              // верхнего уровня. В облаке (supabaseTransport) этот дефект
              // ЕСТЬ и сегодня, не тронут этим шагом (см. HANDOFF).
              if (k === 'melody' && v && typeof v === 'object' && !Array.isArray(v)) {
                st.session.melody = { ...(st.session.melody ?? {}), ...v }
              } else {
                st.session[k] = v
              }
            }
            st.session.updated_at = new Date().toISOString()
          })
          sendJson(res, 200, { ok: true, rev: st.rev })
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
              const existing = st.answers.find(a => a.team_id === row.team_id && a.question_ref === row.question_ref)
              if (existing) Object.assign(existing, row)
              else st.answers.push({ id: crypto.randomUUID(), is_correct: null, stake: null,
                created_at: new Date().toISOString(), ...row })
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
          store.mutate('answers.patch', { id, patch }, () => { Object.assign(found, patch) })
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
          sendJson(res, 200, pack)
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

export function createServer({ dataDir, appDir }) {
  const store = createStore(dataDir)
  const apiHandler = createApiHandler(store)

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    // /api/media/* — отдельная раздача файлов с диска (Range), НЕ через
    // JSON-обработчик apiHandler; проверяем ДО общего префикса /api/.
    const mediaRel = matchMedia(url.pathname)
    if (mediaRel !== null) {
      serveMedia(req, res, decodeURIComponent(mediaRel), store.mediaDir)
      return
    }
    if (url.pathname.startsWith('/api/')) {
      void apiHandler(req, res, url)
      return
    }
    if (serveApp(req, res, url.pathname, appDir)) return
    sendHtmlNotFound(res, appDir)
  })

  return { server, store }
}

function matchMedia(pathname) {
  const prefix = '/api/media/'
  if (!pathname.startsWith(prefix)) return null
  return pathname.slice(prefix.length)
}

// ═══ Точка входа (запуск скриптом start-quiz-local.cmd) ═══

function printAddresses(port) {
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
  const { server } = createServer({
    dataDir: path.join(here, 'data'),
    appDir: path.join(here, 'app'),
  })
  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Порт ${PORT} уже занят — закрой другую копию сервера или поменяй QP_LOCAL_PORT.`)
      process.exit(1)
    }
    throw err
  })
  server.listen(PORT, () => printAddresses(PORT))
}
