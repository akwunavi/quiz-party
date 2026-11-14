// ручная раскладка + показ ответа после вопроса (answers_reveal=after_question), 3 темы × 2 разрешения
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const OUT = path.resolve(process.argv[2] || 'laq')
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: process.env.QP_NB === '1' }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  const layout = { question: { v: 1, imgs: ['book/p16x9.jpg', 'book/p1x1.jpg'], text: { x: 0.04, y: 0.05, w: 0.42, h: 0.4 }, images: [{ x: 0.56, y: 0.1, w: 0.4, h: 0.5 }, { x: 0.56, y: 0.62, w: 0.3, h: 0.3 }] } }
  await fetch(`${ORIGIN}/sb/rest/v1/pack_questions?id=eq.stand-book-r0-q2`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ service: { layout } }) })
  // раунд 0 → answers_reveal after_question: правим раунд в сессии пакета через патч pack_rounds недоступен; используем сессию с reveal=true на вопросе (экран вопроса показывает плашку при revealMode after_question)
  for (const [w, h] of [[1920, 1080], [1280, 720]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    await api.reset(); await api.teams(3); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: 2, timer_started_at: new Date().toISOString(), reveal: true })
    await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.lay-area', { timeout: 15000 }); await p.waitForTimeout(3500)
    const r = await p.evaluate(() => { const R = e => e && (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(e.getBoundingClientRect()); return { reveal: R(document.querySelector('.answer-reveal')), imgs: [...document.querySelectorAll('.lay-img')].map(R), text: R(document.querySelector('.lay-text')) } })
    console.log(w, JSON.stringify(r)); await p.screenshot({ path: `${OUT}/${process.env.QP_BOOK_THEME || 'ny_book'}-${w}.png` }); await ctx.close()
  }
  await b.close(); process.exit(0)
})()
