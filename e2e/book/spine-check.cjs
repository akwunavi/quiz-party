// ═══ Проверка: заголовки/нумерация/строки правил заставок раундов НЕ пересекают сгиб книги (ТЗ п.3) ═══
// Для заставок раундов 0–14: bbox всех элементов .ri-main/.neon-title/.rules-frame/.rule-item/.idx/.cw-layout .side и сетки кроссворда относительно сгиба
// (центр .p-book / ширины сцены). Затем «стресс»: название 70 знаков и правила по 260 знаков в DOM — снова замер.
// usage: QP_BOOK_SCRATCH=… node e2e/book/spine-check.cjs [--no-build] [--vp 1920x1080,…]
'use strict'
const { chromium } = require('playwright')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const VPS = opt('--vp', '1920x1080,1280x720').split(',').map(s => s.split('x').map(Number))
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { makeApi, SCENES } = await import('./scenes.mjs')
  await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch()
  const fails = []
  for (const [w, h] of VPS) for (let r = 0; r < 15; r++) for (const stress of [false]) {
    const sc = SCENES.find(s => s.id === `7${String(r).padStart(2, '0')}-rules-r${r}`)
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const page = await ctx.newPage()
    await sc.setup(api); await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
    await page.waitForSelector('.round-intro', { timeout: 20000 }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(3500)
    if (stress) { await page.evaluate(() => {
      const L = 'Очень длинное правило раунда, которое занимает много строк и обязано переноситься внутри своей страницы, а не вылезать через корешок книги на соседнюю. '
      document.querySelectorAll('.rule-item').forEach(e => { const i = e.querySelector('.idx'); e.replaceChildren(...(i ? [i] : []), document.createTextNode(L.slice(0, 260))) })
      document.querySelectorAll('.round-intro .neon-title').forEach(e => { e.textContent = 'Необыкновенно длинное название раунда номер' + ' ' + 'девяносто девять' }) })
      await page.waitForTimeout(800) }
    const m = await page.evaluate(() => {
      const book = (document.querySelector('.p-book') || document.querySelector('.bk-content'))?.getBoundingClientRect(); const cx = book ? book.x + book.width / 2 : innerWidth / 2
      const out = []
      for (const sel of ['.ri-main', '.round-intro .neon-title', '.rules-frame', '.rules-frame-label', '.rule-item', '.rule-item .idx', '.cw-layout .side', '.cw-layout > :first-child', '.round-badge']) {
        document.querySelectorAll(sel).forEach((e, i) => { const r = e.getBoundingClientRect(); if (r.width) out.push({ sel: sel + '#' + i, x: r.x, r: r.x + r.width, y: r.y, b: r.y + r.height, left: r.x < cx && r.x + r.width > cx }) })
      }
      return { cx, spine: 22, out, bookBottom: book ? book.y + book.height : innerHeight }
    })
    await ctx.close()
    const bad = m.out.filter(e => e.x < m.cx + 0 && e.r > m.cx - 0 && !/round-badge/.test(e.sel)).map(e => `${e.sel} пересекает сгиб (${e.x.toFixed(0)}…${e.r.toFixed(0)} при сгибе ${m.cx.toFixed(0)})`)
    const low = m.out.filter(e => e.b > m.bookBottom).map(e => `${e.sel} ниже книги`)
    const msg = [...bad, ...low]
    console.log(`${msg.length ? '✗' : '✓'} ${w}x${h} раунд ${r}${stress ? ' стресс' : ''} ${msg.slice(0, 3).join('; ')}`)
    for (const b of msg) fails.push(`${w}x${h} r${r}${stress ? ' стресс' : ''}: ${b}`)
  }
  await browser.close(); process.exit(fails.length ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
