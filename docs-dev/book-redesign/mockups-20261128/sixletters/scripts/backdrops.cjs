// Подложки макетов: настоящий проектор «Книги» (стенд e2e/book) на 1920×1080 БЕЗ левой страницы — остаются разворот, декор, плашки шапки,
// таймер и правая колонка «ОТВЕТЫ КОМАНД». Всё, что макеты рисуют заново, прячется (visibility), поэтому подложка = реальный кадр.
// usage: QP_BOOK_PORT=7461 NODE_PATH=/opt/node22/lib/node_modules PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node backdrops.cjs
// (стенд e2e/book/stand.mjs со своим QP_BOOK_PORT/QP_BOOK_SCRATCH должен быть запущен; в make-pack добавлен вопрос r2-q2 «опал+тусовка»)
const { chromium } = require('playwright')
const path = require('path')
const O = `http://127.0.0.1:${process.env.QP_BOOK_PORT || 7461}`, H = { 'Content-Type': 'application/json', 'X-QP-PIN': '000000' }
const call = async (p, m = 'GET', b) => { const r = await fetch(O + p, { method: m, headers: H, body: b ? JSON.stringify(b) : undefined }); const t = await r.text(); return t ? JSON.parse(t) : null }
const GAME = 'stand-game', PACK = 'stand-book'
const OUT = path.join(__dirname, '..', 'assets')
const TEAMS = ['Ёлочки', 'Мандарины и шампанское', 'Снежный барс', 'Оливье навсегда']
async function setup(answers, session) {
  await call(`/stand/reset?game=${GAME}`, 'POST')
  const ts = []
  for (let i = 0; i < TEAMS.length; i++) ts.push(await call('/api/teams', 'POST', { name: TEAMS[i], color: ['#d9534f', '#e0a030', '#2f9e6a', '#3a7bd5'][i], icon: ['🎄', '❄️', null, '🦌'][i], game_id: GAME, last_seen_at: '2099-01-01T00:00:00.000Z', created_at: new Date(Date.UTC(2026, 10, 12, 18, 0, i)).toISOString() }))
  if (answers) await call('/api/answers', 'POST', ts.map((t, i) => ({ game_id: GAME, stake: null, team_id: t.id, ...answers(i) })))
  await call('/api/session', 'PATCH', { pack_id: PACK, timer_started_at: null, reveal: false, ...session })
}
;(async () => {
  const b = await chromium.launch()
  const shots = [
    ['bd-answer-rebus', () => setup(i => ({ question_ref: 'q-stand-book-r2-q2', round_number: 2, answer_text: ['палтус', '42', 'ПАЛТУС', 'палтус'][i], is_correct: [true, false, true, true][i] }), { phase: 'show_answers', round_number: 2, question_index: 2, reveal: true }), '.answers-main'],
    ['bd-answer-order4', () => setup(i => ({ question_ref: 'q-stand-book-r1-q1', round_number: 1, answer_text: ['БВГА', 'БГВА', 'БВАГ', 'БВГА'][i], is_correct: [true, false, false, true][i] }), { phase: 'show_answers', round_number: 1, question_index: 1, reveal: true }), '.answers-main'],
    ['bd-answer-order6', () => setup(i => ({ question_ref: 'q-stand-book-r1-q1', round_number: 1, answer_text: ['БВГАДЕ', 'БГВАДЕ', 'БВАГДЕ', 'БВГАДЕ'][i], is_correct: [true, false, false, true][i] }), { phase: 'show_answers', round_number: 1, question_index: 1, reveal: true }), '.answers-main'],
    ['bd-question', () => setup(null, { phase: 'question', round_number: 2, question_index: 2, timer_started_at: new Date(Date.now() - 12000).toISOString() }), '.bk-media'],
  ]
  for (const [name, prep, hide] of shots) {
    await prep()
    const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    console.log('session', JSON.stringify(await call('/api/session')).slice(0, 160)); await p.goto(O + '/quiz-party/#/?room=stand')
    await p.waitForSelector(hide, { state: 'attached', timeout: 45000 }).catch(async e => { await p.screenshot({ path: '/tmp/claude-0/-home-user-quiz-party/32f8ecfe-7b77-5373-8c6d-c1e5a6cf01d8/scratchpad/s/fail.png' }); throw e })
    await p.evaluate(() => document.fonts.ready)
    await p.waitForTimeout(name === 'bd-question' ? 3000 : 11000)   // галочки/шары команд появляются по таймерам проектора
    await p.addStyleTag({ content: `${hide}{visibility:hidden!important}` })
    await p.waitForTimeout(300)
    await p.screenshot({ path: path.join(OUT, name + '.png') })
    await ctx.close(); console.log('ok', name)
  }
  await b.close()
})()
