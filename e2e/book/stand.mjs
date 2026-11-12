#!/usr/bin/env node
// ═══ Стенд «Книги»: настоящее приложение + локальный сервер бара, без облака ═══
//
// Что делает:
//  1. генерирует медиа демо-пакета (media/gen.py) в <scratch>/book-data/media/book;
//  2. собирает приложение `vite build --outDir <scratch>/book-app` (в docs/ и dist/ — ничего);
//  3. поднимает `createServer` из local-server/server.mjs (PIN 000000, порт 7399),
//     включает запись (`POST /api/arm`), заливает два демо-пакета (`POST /api/pack/<id>`);
//  4. держит процесс, пока его не остановят (Ctrl+C).
//
// ОБХОД №1 (почему сборка НЕ «без VITE_*»): `src/lib/supabase.ts` вызывает
// `createClient(url, key)` при импорте модуля, а supabase-js бросает
// «supabaseUrl is required.» на undefined — без переменных приложение не
// стартует вовсе (белый экран), даже в локальном режиме. Поэтому стенд
// собирает с VITE_SUPABASE_URL = http://127.0.0.1:7399/sb — это АДРЕС ЭТОГО ЖЕ
// стенда, а не облако; ключ — заглушка. К живой базе стенд не обращается.
//
// ОБХОД №2 (пакет): в локальном режиме проектор всё равно читает пакет через
// `loadPack` → supabase.from('packs'|'pack_rounds'|'pack_questions') (а не через
// GET /api/pack). Поэтому под /sb/rest/v1/* стенд отвечает крошечным
// PostgREST-эмулятором ТОЛЬКО на чтение, который отдаёт снимки, залитые через
// POST /api/pack/<id> (то есть данные лежат там же, где у локального сервера).
// Плюс /sb/rest/v1/teams (ShowAnswers читает имена команд напрямую из Supabase).
// Всё остальное под /sb/* — 404/401, как у недоступного облака.
//
// Служебный /stand/reset (только этот стенд, не local-server): обнуляет
// команды/ответы/сессию между сценариями — у API локального сервера нет
// «удалить все ответы», а ответы удалённых команд иначе висели бы на разборе.
//
// usage: node e2e/book/stand.mjs [--no-build] [--scratch <dir>]
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import http from 'node:http'
import { fileURLToPath } from 'node:url'
import { createServer } from '../../local-server/server.mjs'
import { buildPack, PACK_ONLINE, PACK_PAPER } from './make-pack.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..', '..')
export const PORT = Number(process.env.QP_BOOK_PORT) || 7399
export const PIN = '000000'
export const ORIGIN = `http://127.0.0.1:${PORT}`

function arg(name, def) { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : def }
export const SCRATCH = path.resolve(arg('--scratch', process.env.QP_BOOK_SCRATCH || path.join(os.tmpdir(), 'qp-book-stand')))
// QP_BOOK_APP — готовая сборка из другого места (регресс «до/после»: сборка предка лежит отдельно)
const APP_DIR = process.env.QP_BOOK_APP ? path.resolve(process.env.QP_BOOK_APP) : path.join(SCRATCH, 'book-app')
// QP_BOOK_THEME — те же пакеты (те же id) в другой теме: регресс classic/potter/new_year/ny_home/enchanted_forest
export const THEME = process.env.QP_BOOK_THEME || 'ny_book'
const DATA_DIR = path.join(SCRATCH, 'book-data')

// ffmpeg из /opt/pw-browsers урезан под запись видео Playwright (нет lavfi/mp3) —
// годится только системный; нет его — gen.py пишет WAV встроенным модулем.
function ffmpegPath() {
  const w = spawnSync('which', ['ffmpeg'], { encoding: 'utf8' })
  return w.status === 0 ? w.stdout.trim() : ''
}

function genMedia() {
  const mediaRoot = path.join(DATA_DIR, 'media')
  const r = spawnSync('python3', ['-I', path.join(HERE, 'media', 'gen.py'), mediaRoot, ffmpegPath()], { stdio: 'inherit' })
  if (r.status !== 0) throw new Error('media/gen.py упал')
  return JSON.parse(fs.readFileSync(path.join(mediaRoot, 'book', 'manifest.json'), 'utf8'))
}

function build() {
  console.log(`[stand] vite build → ${APP_DIR}`)
  const r = spawnSync('npx', ['vite', 'build', '--outDir', APP_DIR, '--emptyOutDir', '--logLevel', 'warn'], {
    cwd: ROOT, stdio: 'inherit',
    env: { ...process.env, VITE_SUPABASE_URL: `${ORIGIN}/sb`, VITE_SUPABASE_ANON_KEY: 'stand-anon-key-not-a-secret' },
  })
  if (r.status !== 0) throw new Error('vite build упал')
}

// ── PostgREST-эмулятор (только чтение, только то, что зовёт проектор) ──
function eqParam(sp, key) { const v = sp.get(key); return v && v.startsWith('eq.') ? decodeURIComponent(v.slice(3)) : null }
function inParam(sp, key) {
  const v = sp.get(key); if (!v || !v.startsWith('in.(')) return null
  return v.slice(4, -1).split(',').map(s => s.replace(/^"|"$/g, ''))
}
function fakeRest(store, req, res, url) {
  const st = store.state()
  const table = url.pathname.replace(/^\/sb\/rest\/v1\//, '').split('/')[0]
  const sp = url.searchParams
  const single = String(req.headers.accept || '').includes('vnd.pgrst.object')
  const packs = Object.values(st.packs)
  let rows = null
  if (table === 'packs') {
    const id = eqParam(sp, 'id')
    rows = packs.filter(p => !id || p.id === id).map(({ rounds: _r, ...p }) => p)
  } else if (table === 'pack_rounds') {
    const pid = eqParam(sp, 'pack_id')
    rows = packs.filter(p => p.id === pid).flatMap(p => p.rounds.map(({ questions: _q, ...r }) => r))
  } else if (table === 'pack_questions') {
    const ids = inParam(sp, 'round_id') ?? []
    rows = packs.flatMap(p => p.rounds).filter(r => ids.includes(r.id)).flatMap(r => r.questions)
  } else if (table === 'teams') {
    rows = st.teams.map(t => ({ id: t.id, name: t.name, color: t.color }))
  }
  if (rows === null) { res.writeHead(404, { 'Content-Type': 'application/json' }); res.end('{"message":"stand: нет такой таблицы"}'); return }
  if (single) {
    if (rows.length !== 1) { res.writeHead(406, { 'Content-Type': 'application/json' }); res.end('{"message":"stand: не одна строка"}'); return }
    res.writeHead(200, { 'Content-Type': 'application/vnd.pgrst.object+json' }); res.end(JSON.stringify(rows[0])); return
  }
  res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(rows))
}

function resetGame(store, gameId) {
  store.mutate('stand.reset', {}, () => {
    const st = store.state()
    st.teams = []; st.answers = []; st.blitz = {}
    st.session = { ...st.session, game_id: gameId, pack_id: null, phase: 'lobby', round_number: 0, question_index: 0,
      timer_started_at: null, reveal: false, completed_rounds: [], melody: {}, random_groups: [] }
    st.session.state_rev = (st.session.state_rev ?? 0) + 1
    st.session.updated_at = new Date().toISOString()
  })
}

export async function startStand({ noBuild = false } = {}) {
  // порт занят другим прогоном — НЕ трогаем его данные (rmSync ниже стёр бы чужой стенд посреди снимков)
  const busy = await fetch(`${ORIGIN}/api/server-now`, { signal: AbortSignal.timeout(800) }).then(() => true, () => false)
  if (busy) throw new Error(`стенд уже запущен на ${ORIGIN} — дождитесь конца прогона`)
  fs.mkdirSync(SCRATCH, { recursive: true })
  if (fs.existsSync(DATA_DIR)) fs.rmSync(DATA_DIR, { recursive: true, force: true })
  const manifest = genMedia()
  if (!noBuild || !fs.existsSync(path.join(APP_DIR, 'index.html'))) build()

  const { server: inner, store } = createServer({ dataDir: DATA_DIR, appDir: APP_DIR, pin: PIN })
  const server = http.createServer((req, res) => {
    let url
    try { url = new URL(req.url, ORIGIN) } catch { res.writeHead(400); res.end(); return }
    if (url.pathname.startsWith('/sb/rest/v1/')) return fakeRest(store, req, res, url)
    if (url.pathname.startsWith('/sb/')) { res.writeHead(401, { 'Content-Type': 'application/json' }); res.end('{"message":"stand: облака нет"}'); return }
    if (url.pathname === '/stand/reset' && req.method === 'POST') {
      resetGame(store, url.searchParams.get('game') || 'stand-game')
      res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{"ok":true}'); return
    }
    inner.emit('request', req, res)
  })
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(PORT, '127.0.0.1', resolve) })

  const call = async (p, init = {}) => {
    const r = await fetch(ORIGIN + p, { ...init, headers: { 'Content-Type': 'application/json', 'X-QP-PIN': PIN, ...(init.headers ?? {}) } })
    if (!r.ok) throw new Error(`${p}: ${r.status} ${await r.text()}`)
    return r
  }
  await call('/api/arm', { method: 'POST' })
  for (const paper of [false, true]) {
    const pack = buildPack({ paper, audioExt: manifest.audioExt, theme: THEME })
    await call(`/api/pack/${pack.id}`, { method: 'POST', body: JSON.stringify(pack) })
  }
  console.log(`[stand] ${ORIGIN}/quiz-party/#/?room=stand  · PIN ${PIN} · пакеты ${PACK_ONLINE}, ${PACK_PAPER} · данные ${DATA_DIR}`)
  return { server, store, manifest, close: () => new Promise(r => server.close(r)) }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await startStand({ noBuild: process.argv.includes('--no-build') })
}
