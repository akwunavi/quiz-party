// ═══ Перелистывание А на РЕАЛЬНОМ проекторе: запись видео + проверка поведения (ТЗ п.4) ═══
// Сценарий (меняем состояние игры через API, как ведущий): вопрос 1 → 2 (медленно) → пауза 5 с (таймер идёт — листа быть не должно) →
// быстрая серия 3→4→5→6 за ~1.5 с → раскрытие ответа (reveal на том же вопросе — листа нет) → следующий ответ. MutationObserver считает монтирования
// .bk-turn: сколько запусков, максимум одновременно, были ли при таймере/раскрытии. Те же шаги с эмуляцией prefers-reduced-motion — листа на экране нет.
// usage: QP_BOOK_SCRATCH=… node e2e/book/flip-check.cjs [--no-build] --out <каталог>
'use strict'
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'flip-out'))
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { makeApi } = await import('./scenes.mjs')
  const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true })
  await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch()
  const res = {}
  for (const reduced of [false, true]) {
    const vdir = path.join(OUT, 'v-' + (reduced ? 'reduced' : 'normal')); fs.rmSync(vdir, { recursive: true, force: true })
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, serviceWorkers: 'block', reducedMotion: reduced ? 'reduce' : 'no-preference', recordVideo: { dir: vdir, size: { width: 1280, height: 720 } } })
    const page = await ctx.newPage(); const errs = []
    page.on('pageerror', e => { if (!/PIN/.test(String(e.message))) errs.push(String(e.message)) })
    await page.addInitScript(() => {
      window.__turn = { mounts: 0, max: 0, log: [] }
      const t0 = performance.now()
      new MutationObserver(() => { const n = document.querySelectorAll('.bk-turn2-leaf').length; const T = window.__turn
        if (n > T.max) T.max = n; const cur = document.querySelector('.bk-turn2-leaf'); const id = cur && (cur.__id ||= ++T.mounts); if (cur && cur.__logged !== true) { cur.__logged = true; T.log.push(Math.round(performance.now() - t0)) } })
        .observe(document, { childList: true, subtree: true })
    })
    const Q = (qi, extra = {}) => ({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: qi, timer_started_at: new Date().toISOString(), reveal: false, ...extra })
    await api.reset(); await api.teams(6); await api.session(Q(1))
    await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await page.waitForSelector('.host-screen .q-text, .host-screen', { timeout: 20000 }); await page.waitForTimeout(3500)
    const snap = async () => page.evaluate(() => ({ ...window.__turn }))
    const step = {}
    let s0 = await snap(); await api.session(Q(2)); await page.waitForTimeout(3000); let s1 = await snap(); step.single = s1.mounts - s0.mounts
    await page.waitForTimeout(2500); let s2 = await snap(); step.idleTimerTicks = s2.mounts - s1.mounts
    for (const qi of [3, 4, 5, 6]) { await api.session(Q(qi)); await page.waitForTimeout(380) }
    await page.waitForTimeout(4000); step.shownQ = await page.evaluate(() => document.querySelector('.qnum')?.textContent); let s3 = await snap(); step.rapid = s3.mounts - s2.mounts; step.maxSimultaneous = s3.max
    await api.session({ ...Q(6), phase: 'show_answers', timer_started_at: null, reveal: false }); await page.waitForTimeout(3000); let s4 = await snap()
    await api.session({ ...Q(6), phase: 'show_answers', timer_started_at: null, reveal: true }); await page.waitForTimeout(3500); let s5 = await snap(); step.reveal = s5.mounts - s4.mounts
    await api.session({ ...Q(7), phase: 'show_answers', timer_started_at: null, reveal: true }); await page.waitForTimeout(3500); let s6 = await snap(); step.nextAnswer = s6.mounts - s5.mounts
    step.controlsAlive = await page.evaluate(() => { const a = document.querySelector('.host-actions button'); return !!a && !a.disabled })
    step.leafLeftBehind = await page.evaluate(() => document.querySelectorAll('.bk-turn2-leaf').length)
    step.errors = errs
    await ctx.close()
    const vf = fs.readdirSync(vdir).find(f => f.endsWith('.webm')); fs.copyFileSync(path.join(vdir, vf), path.join(OUT, `flip-${reduced ? 'reduced' : 'normal'}.webm`))
    res[reduced ? 'reduced-motion' : 'normal'] = step; console.log(reduced ? 'reduced' : 'normal', JSON.stringify(step))
  }
  fs.writeFileSync(path.join(OUT, 'flip-check.json'), JSON.stringify(res, null, 1))
  await browser.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
