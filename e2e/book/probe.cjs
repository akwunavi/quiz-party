// Отладочный зонд стенда: поднять сцену и выполнить выражение в странице.
// usage: QP_BOOK_SCRATCH=… node e2e/book/probe.cjs <scene-id> <WxH> '<js-выражение>' [query]
'use strict'
const { chromium } = require('playwright')
;(async () => {
  const [id, vp, expr, query] = process.argv.slice(2)
  const [w, h] = vp.split('x').map(Number)
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { SCENES, makeApi } = await import('./scenes.mjs')
  const scene = SCENES.find(s => s.id === id)
  const stand = await startStand({ noBuild: true })
  await scene.setup(makeApi(ORIGIN, PIN))
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const page = await (await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' })).newPage()
  await page.clock.install()
  await page.goto(`${ORIGIN}/quiz-party/#/?room=stand${query ? '&' + query : ''}`)
  await page.waitForSelector(scene.ready, { timeout: 15000 }).catch(() => {})
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(scene.settle ?? 2000)
  if (scene.runFor) { await page.clock.runFor(scene.runFor); await page.waitForTimeout(500) }
  console.log(JSON.stringify(await page.evaluate(expr), null, 1))
  await b.close(); await stand.close()
})().catch(e => { console.error(e); process.exit(1) })
