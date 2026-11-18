// ═══ «Книга», экран «Отвечайте!»: автопроверка (20.11) ═══
// Сцены 09n00…09n24 (0/4/8/16/24 команд) × 1920×1080, 1366×768, 1280×720, 1899×905. Проверяем числами:
//  1. нет подписей «РАУНД N :: ОЖИДАЮ ОТВЕТЫ» (.mono-tag) и «КАПИТАНЫ ОТПРАВЛЯЮТ…» (.meta-line);
//  2. зелёное кольцо: у .answer-pulse нет анимации answerPulseRing (document.getAnimations), box-shadow none, рамка 0;
//  3. карточек = числу команд, «ответила на всё» (.bk-tc-selected) = ожидаемому числу;
//  4. заголовок → таймер → сетка идут сверху вниз без пересечений, сетка внутри ширины сгиба-страниц и выше сугробов (низ ≤ 0.86·h), ничего не вылезло по горизонтали.
// usage: QP_BOOK_SCRATCH=… node e2e/book/answering-check.cjs [--no-build]
'use strict'
const { chromium } = require('playwright')
const argv = process.argv.slice(2)
const CASES = [[0, 0], [4, 1], [8, 3], [16, 6], [24, 9]]
const VPS = [[1920, 1080], [1366, 768], [1280, 720], [1899, 905]]
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, SCENES } = await import('./scenes.mjs')
  await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  let bad = 0
  for (const [n, done] of CASES) {
    const sc = SCENES.find(s => s.id.startsWith(`09n${String(n).padStart(2, '0')}-`))
    for (const [w, h] of VPS) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage()
      await sc.setup(api); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector(sc.ready, { timeout: 20000 }); await p.waitForTimeout(2500)
      const r = await p.evaluate(() => {
        const R = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { t: b.top, b: b.bottom, l: b.left, r: b.right } }
        const pulse = document.querySelector('.answer-pulse'); const cs = getComputedStyle(pulse)
        const ring = document.getAnimations().filter(a => /answerPulseRing/.test(a.animationName || '')).length
        const grid = document.querySelector('.answer-time-teams')
        const cards = [...document.querySelectorAll('.answer-time-teams .bk-tc')]
        const cr = cards.map(R)
        return {
          mono: !!document.querySelector('.host-screen .mono-tag'), meta: !!document.querySelector('.host-screen .meta-line'),
          ring, anim: cs.animationName, shadow: cs.boxShadow, border: cs.borderTopWidth,
          title: R(pulse), timer: R(document.querySelector('.bk-timer-slot, .p-ros')), grid: R(grid),
          cards: cards.length, selected: document.querySelectorAll('.answer-time-teams .bk-tc-selected').length,
          cardsBottom: cr.length ? Math.max(...cr.map(c => c.b)) : null, cardsL: cr.length ? Math.min(...cr.map(c => c.l)) : null, cardsR: cr.length ? Math.max(...cr.map(c => c.r)) : null,
          gridOver: grid ? grid.scrollWidth - grid.clientWidth : 0,
        }
      })
      const errs = []
      if (r.mono) errs.push('есть .mono-tag'); if (r.meta) errs.push('есть .meta-line')
      if (r.ring || r.anim !== 'none') errs.push(`кольцо: ${r.ring} анимаций, animation=${r.anim}`)
      if (r.shadow !== 'none' || r.border !== '0px') errs.push(`рамка: shadow=${r.shadow} border=${r.border}`)
      if (r.cards !== n) errs.push(`карточек ${r.cards} ≠ ${n}`)
      if (r.selected !== done) errs.push(`«ответили на всё» ${r.selected} ≠ ${done}`)
      if (r.timer && r.title.b > r.timer.t + 1) errs.push(`заголовок налезает на таймер (${r.title.b.toFixed(0)} > ${r.timer.t.toFixed(0)})`)
      if (n && r.timer.b > r.grid.t + 1) errs.push(`таймер налезает на сетку (${r.timer.b.toFixed(0)} > ${r.grid.t.toFixed(0)})`)
      if (n && r.cardsBottom > 0.86 * h) errs.push(`карточки заходят на сугробы: низ ${r.cardsBottom.toFixed(0)} > ${(0.86 * h).toFixed(0)}`)
      if (n && (r.cardsL < 0.12 * w || r.cardsR > 0.88 * w)) errs.push(`карточки у краёв страницы: ${r.cardsL.toFixed(0)}…${r.cardsR.toFixed(0)}`)
      if (r.gridOver > 0) errs.push(`сетка шире себя на ${r.gridOver}`)
      if (r.timer && r.timer.b > 0.86 * h) errs.push('таймер на сугробах')
      if (errs.length) bad++
      console.log(`${errs.length ? '✗' : '✓'} ${n} команд ${w}×${h}: ${errs.join('; ') || `заголовок ${r.title.t.toFixed(0)}–${r.title.b.toFixed(0)}, таймер ${r.timer.t.toFixed(0)}–${r.timer.b.toFixed(0)}${n ? `, карточки до ${r.cardsBottom.toFixed(0)}` : ''}`}`)
      await ctx.close()
    }
  }
  await b.close(); process.exit(bad ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
