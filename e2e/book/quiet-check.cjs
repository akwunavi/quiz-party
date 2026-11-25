// ═══ «Вопрос перед зачитыванием ответа» (quiet): появляется сразу, без эффектов — покадровая проверка (10.75) ═══
// usage: QP_BOOK_SCRATCH=… [QP_BOOK_APP=<готовая сборка>] [QP_BOOK_THEME=…] node e2e/book/quiet-check.cjs [--vp 1920x1080] [--q 0,1,4] [--reduced] [--shots <dir>]
// Каждый rAF с первого кадра документа пишет: кегль и непрозрачность слов текста вопроса, число активных анимаций у вопросного контента,
// рамку текста. Критерий «сразу»: все кадры после появления текста одинаковы (кегль, прозрачность 1, анимаций 0).
'use strict'
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const VP = opt('--vp', '1920x1080').split('x').map(Number)
const QS = opt('--q', '0,1,4').split(',').map(Number)
const SHOTS = opt('--shots', '')
const REDUCED = argv.includes('--reduced')

const REC = `(() => {
  window.__fr = []; const t0 = performance.now(); let tShown = 0
  const tick = () => {
    const t = performance.now() - t0, qt = document.querySelector('.host-screen .q-text')
    if (qt && !tShown) tShown = t
    if (qt) {
      const words = [...qt.querySelectorAll('.q-word')]
      const r = qt.getBoundingClientRect(), box = qt.parentElement.getBoundingClientRect()
      const scope = document.querySelector('.host-screen')
      const run = scope.getAnimations({ subtree: true }).filter(a => a.playState === 'running')
      const entry = run.filter(a => !a.effect || !a.effect.target || !a.effect.target.closest('.host-actions')).length
      window.__names = window.__names || {}; run.forEach(a => { const k = (a.animationName || a.transitionProperty || '?') + '@' + ((a.effect && a.effect.target && (a.effect.target.className || a.effect.target.tagName)) + '').slice(0, 40); window.__names[k] = 1 })
      window.__fr.push({ t: Math.round(t - tShown), fs: parseFloat(getComputedStyle(qt).fontSize),
        minOp: words.length ? Math.min(...words.map(w => +getComputedStyle(w).opacity)) : +getComputedStyle(qt).opacity,
        anims: entry, all: run.length, top: Math.round(r.top), bottom: Math.round(r.bottom), boxBottom: Math.round(box.bottom), h: Math.round(r.height),
        fit: qt.dataset.bkFit || '', cls: scope.className.includes('qs-quiet') })
    }
    if (!tShown || t - tShown < 1700) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})()`

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  await startStand({ noBuild: !!process.env.QP_BOOK_APP || argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const out = []
  for (const qi of QS) {
    await api.reset(); await api.teams(3)
    await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: qi, timer_started_at: null, reveal: false })
    const ctx = await browser.newContext({ viewport: { width: VP[0], height: VP[1] }, serviceWorkers: 'block', reducedMotion: REDUCED ? 'reduce' : 'no-preference' })
    const page = await ctx.newPage(); await page.addInitScript(REC)
    await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
    await page.waitForSelector('.host-screen .q-text', { timeout: 20000 }).catch(() => {})
    await page.waitForTimeout(1900)
    if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, `q${qi}-${VP[0]}.png`) }) }
    const fr = await page.evaluate(() => window.__fr || [])
    const names = Object.keys(await page.evaluate(() => window.__names || {}))
    const chip = await page.locator('.answered-chip').count()
    const first = fr[0], last = fr[fr.length - 1]
    out.push({ q: qi, frames: fr.length, firstFs: first && first.fs, lastFs: last && last.fs, fsVariants: new Set(fr.map(f => f.fs)).size,
      minOpacity: Math.min(...fr.map(f => f.minOp)), firstOp: first && first.minOp, animsMax: Math.max(...fr.map(f => f.anims)),
      rectVariants: new Set(fr.map(f => `${f.top}-${f.bottom}`)).size, overflow: fr.some(f => f.bottom > f.boxBottom + 1), h: last && last.h, fit: last && last.fit, chip, quiet: last && last.cls, names })
    await ctx.close()
  }
  console.log(JSON.stringify({ vp: VP.join('x'), theme: process.env.QP_BOOK_THEME || 'ny_book', reduced: REDUCED, app: process.env.QP_BOOK_APP ? 'base' : 'new', out }))
  await browser.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
