// ═══ Запись анимаций НАСТОЯЩИХ компонентов «Книги» (стенд, реальный HostScreen) в анимированный WebP ═══
// usage: QP_BOOK_SCRATCH=… node e2e/book/anim-shoot.cjs [--no-build] --out <каталог кадров>
// Для каждой демо: готовит состояние через API, открывает проектор, снимает кадры по реальному времени (метки времени → длительности).
'use strict'
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'anim-frames'))
const ONLY = (opt('--only', '') || '').split(',').filter(Boolean)
const VP = [1280, 720]

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { SCENES, makeApi, PACK_ONLINE } = await import('./scenes.mjs')
  fs.mkdirSync(OUT, { recursive: true })
  await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const url = `${ORIGIN}/quiz-party/#/?room=stand`
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const scene = id => SCENES.find(s => s.id === id)
  const DEMOS = [
    { id: 'snow-lobby', scene: '01-lobby-8', ready: '.lobby-screen', ms: 5000, pre: 1500 },
    { id: 'reveal', scene: '65-reveal-short', ready: '.host-screen', ms: 7000, pre: 1000,
      before: async () => { const s = scene('65-reveal-short'); await s.setup(api); await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: 8, timer_started_at: null, reveal: false }) },
      trigger: async () => { await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: 8, timer_started_at: null, reveal: true }) } },
    { id: 'scroll-unroll', scene: '14-melody-snippet', ready: '.mel-board, .mel-modal', ms: 6000, pre: 0, early: true },
    { id: 'finale', scene: '15-finale-8', ready: '.fin-table', ms: 22000, pre: 0, early: true },
  ]
  for (const d of DEMOS.filter(d => !ONLY.length || ONLY.includes(d.id))) {
    const vdir = path.join(OUT, 'v-' + d.id); fs.rmSync(vdir, { recursive: true, force: true })
    const ctx = await browser.newContext({ viewport: { width: VP[0], height: VP[1] }, deviceScaleFactor: 1, serviceWorkers: 'block', recordVideo: { dir: vdir, size: { width: VP[0], height: VP[1] } } })
    const page = await ctx.newPage(); const errs = []; const tc = Date.now()
    page.on('pageerror', e => { if (!/PIN/.test(String(e.message || e))) errs.push(String(e.message || e)) })
    if (d.before) await d.before(); else await scene(d.scene).setup(api)
    await page.goto(url)
    await page.waitForSelector(d.ready, { timeout: 20000 }).catch(() => errs.push('нет ' + d.ready))
    await page.evaluate(() => document.fonts.ready)
    const tReady = d.early ? 0 : Date.now() - tc
    if (d.pre) await page.waitForTimeout(d.pre)
    const tTrig = Date.now() - tc
    if (d.trigger) await d.trigger()
    await page.waitForTimeout(d.ms)
    await ctx.close()
    const vf = fs.readdirSync(vdir).find(f => f.endsWith('.webm'))
    fs.copyFileSync(path.join(vdir, vf), path.join(OUT, d.id + '.webm'))
    fs.writeFileSync(path.join(OUT, d.id + '.json'), JSON.stringify({ tReady, tTrig, errs }))
    const stamps = [0]
    console.log(d.id, errs.length ? 'ОШИБКИ ' + errs.join('|') : '')
    await ctx.close()
  }
  await browser.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
