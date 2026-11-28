// Снимает ПУСТОЙ разворот «Книги» (сцена боевого проектора без игрового содержимого) — подложка макетов.
// Две плотности декора: medium (табло/финал) и dense (recap). Свой порт и каталог — чужие стенды не трогаем.
// usage: QP_BOOK_PORT=7611 QP_BOOK_SCRATCH=<dir> NODE_PATH=/opt/node22/lib/node_modules node capture-bg.cjs <out-dir> [--no-build]
'use strict'
const { chromium } = require('playwright')
const path = require('path')
const ROOT = path.resolve(__dirname, '..', '..', '..', '..')
async function main() {
  const out = path.resolve(process.argv[2])
  const { startStand, ORIGIN, PIN } = await import(path.join(ROOT, 'e2e/book/stand.mjs'))
  const { makeApi } = await import(path.join(ROOT, 'e2e/book/scenes.mjs'))
  const { PACK_ONLINE } = await import(path.join(ROOT, 'e2e/book/make-pack.mjs'))
  const stand = await startStand({ noBuild: process.argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const jobs = [
    ['medium', { phase: 'scoreboard', round_number: 3, question_index: 0, completed_rounds: [0, 1, 2, 3] }, '.host-screen'],
    ['dense', { phase: 'recap', round_number: 0, question_index: 0 }, '.recap-screen'],
  ]
  for (const [name, ses, ready] of jobs) {
    await api.reset(); await api.teams(4)
    await api.session({ pack_id: PACK_ONLINE, timer_started_at: null, reveal: false, ...ses })
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, serviceWorkers: 'block' })
    const page = await ctx.newPage()
    page.on('crash', () => console.log('CRASH')); page.on('pageerror', e => console.log('ERR', e.message)); await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
    await page.waitForSelector(ready, { timeout: 15000, state: 'attached' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(2500)
    await page.addStyleTag({ content: '.host-screen,.host-topbar,.host-actions,.recap-screen,.audio-gate{visibility:hidden!important}' })
    await page.waitForTimeout(300)
    await page.screenshot({ path: path.join(out, `bg-${name}.png`) })
    await ctx.close(); console.log('bg', name)
  }
  await browser.close(); await stand.close()
}
main().catch(e => { console.error(e); process.exit(1) })
