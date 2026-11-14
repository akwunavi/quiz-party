// ═══ prefers-reduced-motion: РЕАЛЬНАЯ эмуляция на новых экранах (ТЗ п.6.6) ═══
// Для каждой сцены — две загрузки (обычная и reducedMotion:'reduce'); собираем document.getAnimations() с именами ключевых анимаций «Книги»
// (свиток bk-unroll, падение строк bk-row-drop, раскрытие bk-unfold, лист bk-turn, дым bk-smoke, свет bk-glow/bk-flick, тик таймера bk-tm-tick, чернила p-ink)
// и canvas-снег (счётчик перерисовок за 600 мс). В режиме reduce бесконечных и «движущих» анимаций быть не должно.
// usage: QP_BOOK_SCRATCH=… node e2e/book/reduced-check.cjs [--no-build]
'use strict'
const { chromium } = require('playwright')
const argv = process.argv.slice(2)
const WATCH = ['bk-unroll', 'bk-row-drop', 'bk-unfold', 'bk-turn', 'bk-smoke', 'bk-glow', 'bk-flick', 'bk-tm-tick', 'p-ink', 'bk-gold-flash', 'bk-turn-shade', 'bk-spin']
const IDS = ['35-sprint', '09-answer-time', '14-melody-snippet', '39-jp-answer', '01-lobby-8', '38-jp-tile', '53-mel-bidding', '15-finale-8', '65-reveal-short', '41-blitz-turn', '49-anagram-8', '700-rules-r0']
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, SCENES } = await import('./scenes.mjs')
  await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  let bad = 0
  for (const id of IDS) {
    const sc = SCENES.find(s => s.id === id); const res = {}
    for (const reduced of [false, true]) {
      const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, serviceWorkers: 'block', reducedMotion: reduced ? 'reduce' : 'no-preference' }); const p = await ctx.newPage()
      await sc.setup(api); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector(sc.ready, { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(1200)
      res[reduced ? 'reduce' : 'normal'] = await p.evaluate(async () => {
        const names = {}; const run = () => document.getAnimations().forEach(a => { const n = a.animationName || a.transitionProperty || ''; const t = a.effect?.getComputedTiming?.(); if (a.playState === 'running' && n) { const k = n + (t && t.iterations === Infinity ? '∞' : ''); names[k] = (names[k] || 0) + 1 } })
        run(); await new Promise(r => setTimeout(r, 400)); run()
        const cv = document.querySelector('.ny-layer canvas, canvas'); let moving = null
        if (cv) { const ctx2 = cv.getContext('2d'); try { const a = ctx2.getImageData(0, 0, cv.width, cv.height).data; await new Promise(r => setTimeout(r, 700)); const c = ctx2.getImageData(0, 0, cv.width, cv.height).data; let d = 0; for (let i = 0; i < a.length; i += 97) if (a[i] !== c[i]) d++; moving = d } catch { moving = 'n/a' } }
        return { names, canvasDiff: moving }
      })
      await ctx.close()
    }
    const watchedReduce = Object.keys(res.reduce.names).filter(k => WATCH.some(w => k.startsWith(w)))
    const infReduce = Object.keys(res.reduce.names).filter(k => k.endsWith('∞'))
    const ok = !watchedReduce.length && !infReduce.length
    if (!ok) bad++
    console.log(`${ok ? '✓' : '✗'} ${id}: обычный [${Object.keys(res.normal.names).filter(k => WATCH.some(w => k.startsWith(w)) || k.endsWith('∞')).join(', ') || '—'}] снег-diff ${res.normal.canvasDiff} | reduce [${[...watchedReduce, ...infReduce].join(', ') || '—'}] снег-diff ${res.reduce.canvasDiff}`)
  }
  await b.close(); process.exit(bad ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
