#!/usr/bin/env node
// ═══ Book Design Review — интерактивный просмотр прототипов «Книги» на НАСТОЯЩЕМ проекторе ═══
// Запуск: npm run book:review   (собирает приложение, поднимает локальный стенд, печатает адрес — открыть в браузере)
//         npm run book:review -- --no-build   (без пересборки, быстрее; сборка уже должна лежать в scratch)
// Только стенд: в боевую сборку (vite build) и в docs/ не входит. Состояние игры пишется через API стенда (PIN 000000),
// проектор в iframe открыт без PIN (только чтение), поэтому сам ничего не переключает — всем ходом управляют кнопки просмотра.
import { startStand, ORIGIN, PIN } from '../stand.mjs'
import { SCENES, makeApi, TEAM_NAMES, GAME } from '../scenes.mjs'
import { group, teamsApplicable, stepsFor, sceneList } from './meta.mjs'

const iso = ms => new Date(ms).toISOString()
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function runStep(api, scene, step) {
  const cur = await api.call('/api/session')
  const qi = cur.question_index ?? 0
  const sess = p => api.session(p)
  switch (step) {
    case 'next': return sess({ question_index: Math.min(qi + 1, 9), timer_started_at: iso(Date.now() - 2000), reveal: false })
    case 'prev': return sess({ question_index: Math.max(qi - 1, 0), timer_started_at: iso(Date.now() - 2000), reveal: false })
    case 'timer': return sess({ timer_started_at: iso(Date.now()) })
    case 'to-q': return sess({ phase: 'question', question_index: 0, timer_started_at: iso(Date.now() - 2000), reveal: false })
    case 'to-intro': return sess({ phase: 'round_intro', question_index: 0, timer_started_at: null })
    case 'hide': return sess({ reveal: false })
    case 'show': return sess({ reveal: true })
    case 'rereveal': await sess({ reveal: false }); await sleep(2800); return sess({ reveal: true })
    case 'spin': return sess({ phase: 'question', melody: { key: '2-3', stage: 'spinning', deadline: iso(Date.now() + 6000), spinMs: 5000, played: ['0-0', '1-2'] } })
    case 'play': {
      await sess({ melody: { key: '1-2', stage: 'idle', played: ['0-0'] } }); await sleep(2600)
      return sess({ phase: 'question', melody: { key: '1-2', stage: 'snippet', snippetSec: 8, startSec: 2, deadline: iso(Date.now() + 9000), order: [], turn: 0, played: ['0-0'] } })
    }
    case 'stop': return sess({ melody: { key: '1-2', stage: 'idle', played: ['0-0', '1-2'] } })
    case 'addteam': {
      const n = (await api.call('/api/teams')).length
      const COLORS = ['#ffd700', '#ff2fa0', '#00e5ff', '#b6ff3c', '#ff8c42', '#a78bfa', '#ff5c5c', '#40e0d0']
      return api.call('/api/teams', 'POST', { name: TEAM_NAMES[n % TEAM_NAMES.length] + (n >= TEAM_NAMES.length ? ` ${Math.floor(n / TEAM_NAMES.length) + 1}` : ''), color: COLORS[n % COLORS.length], icon: null, game_id: GAME, last_seen_at: '2099-01-01T00:00:00.000Z', created_at: iso(Date.now()) })
    }
    case 'reset': return scene.setup(api)
    default: throw new Error('неизвестный шаг ' + step)
  }
}

const readBody = req => new Promise(r => { let b = ''; req.on('data', c => { b += c }); req.on('end', () => r(b ? JSON.parse(b) : {})) })

async function extra(req, res, url) {
  const send = (code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(obj)) }
  try {
    const api = makeApi(ORIGIN, PIN)
    if (url.pathname === '/review-api/scenes') {
      return send(200, sceneList())
    }
    const body = await readBody(req)
    const scene = SCENES.find(s => s.id === body.id && !s.path)
    if (!scene) return send(404, { error: 'нет такой сцены' })
    if (url.pathname === '/review-api/scene') {
      api.teamsOverride = teamsApplicable(scene.id) && body.teams != null ? Number(body.teams) : null
      await scene.setup(api)
      return send(200, { ok: true })
    }
    if (url.pathname === '/review-api/step') { await runStep(api, scene, body.step); return send(200, { ok: true }) }
    send(404, { error: 'нет такого метода' })
  } catch (e) { send(500, { error: String(e.message || e) }) }
}

const stand = await startStand({ noBuild: process.argv.includes('--no-build'), extra })
console.log(`\n  Book Design Review запущен. Откройте в браузере:\n\n    ${ORIGIN}/review/\n\n  Остановить: Ctrl+C в этом окне.\n`)
process.on('SIGINT', async () => { await stand.close(); process.exit(0) })
