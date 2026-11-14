// ═══ Раскадровка перелистывания А на реальном проекторе: N кадров по времени на одном переходе + быстрая серия ═══
// usage: QP_BOOK_SCRATCH=… node e2e/book/flip-frames.cjs [--no-build] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'flip-frames'))
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  const Q = qi => ({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: qi, timer_started_at: new Date().toISOString(), reveal: false })
  for (const [w, h] of [[1920, 1080], [1280, 720]]) {
    const vdir = path.join(OUT, 'v' + w); fs.rmSync(vdir, { recursive: true, force: true }); const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block', recordVideo: { dir: vdir, size: { width: w, height: h } } }); const tc = Date.now(); const p = await ctx.newPage(); const errs = []
    p.on('pageerror', e => { if (!/PIN/.test(String(e))) errs.push(String(e)) })
    await api.reset(); await api.teams(6); await api.session(Q(2)); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.host-screen .q-text'); await p.waitForTimeout(3500)
    await api.session(Q(3))
    await p.waitForSelector('.bk-turn2-leaf', { state: 'attached', timeout: 8000 }).catch(() => {}); const tTrig = Date.now() - tc - 40; await p.waitForTimeout(1800)
    const afterOne = await p.evaluate(() => ({ turn: document.querySelectorAll('.bk-turn2-leaf').length, under: document.querySelectorAll('.bk-turn2-under').length, clip: document.querySelector('.host-screen')?.style.clipPath || '' }))
    const tRapid = Date.now() - tc
    for (const qi of [4, 5, 6, 7]) { await api.session(Q(qi)); await p.waitForTimeout(250) }
    await p.waitForTimeout(4000)
    const afterRapid = await p.evaluate(() => ({ leaves: document.querySelectorAll('.bk-turn2-leaf').length, under: document.querySelectorAll('.bk-turn2-under').length, clip: document.querySelector('.host-screen')?.style.clipPath || '', q: document.querySelector('.qnum')?.textContent }))
    fs.writeFileSync(path.join(OUT, `t${w}.json`), JSON.stringify({ tTrig, tRapid })); console.log(w, JSON.stringify({ tTrig, tRapid, afterOne, afterRapid, errs })); await ctx.close(); const vf = fs.readdirSync(vdir).find(f => f.endsWith('.webm')); fs.copyFileSync(path.join(vdir, vf), path.join(OUT, `flip-${w}.webm`))
  }
  await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
