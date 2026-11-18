// ═══ Видео перелистывания на реальном проекторе: вопрос → вопрос и ответ → ответ (до/после — подставляй QP_BOOK_APP) ═══
// usage: QP_BOOK_SCRATCH=… [QP_BOOK_APP=<старая сборка>] node e2e/book/flip-video.cjs [--no-build] [--vp 1920x1080] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'flip-video')); const VP = opt('--vp', '1280x720').split('x').map(Number)
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  const vdir = path.join(OUT, 'v'); fs.rmSync(vdir, { recursive: true, force: true })
  const ctx = await b.newContext({ viewport: { width: VP[0], height: VP[1] }, serviceWorkers: 'block', recordVideo: { dir: vdir, size: { width: VP[0], height: VP[1] } } }); const p = await ctx.newPage(); const tc = Date.now()
  const Q = qi => ({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: qi, timer_started_at: new Date().toISOString(), reveal: false })
  const A = qi => ({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: qi, timer_started_at: null, reveal: true })
  await api.reset(); await api.teams(6); await api.session(Q(2)); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.host-screen'); await p.waitForTimeout(3600)
  const marks = {}
  marks.qq = Date.now() - tc; await api.session(Q(3)); await p.waitForTimeout(3000)
  await api.session(A(1)); await p.waitForTimeout(3600)
  marks.aa = Date.now() - tc; await api.session(A(2)); await p.waitForTimeout(3000)
  await ctx.close(); const vf = fs.readdirSync(vdir).find(f => f.endsWith('.webm')); fs.copyFileSync(path.join(vdir, vf), path.join(OUT, 'flip.webm')); fs.writeFileSync(path.join(OUT, 'marks.json'), JSON.stringify(marks)); console.log(JSON.stringify(marks)); await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
