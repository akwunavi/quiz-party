// ═══ Кадры перелистывания ИЗ КОМПОЗИТОРА (CDP screencast: каждый реально показанный кадр, без пропусков кодека) — для поиска пустых кадров ═══
// usage: QP_BOOK_SCRATCH=… [QP_BOOK_APP=…] node e2e/book/flip-screencast.cjs [--no-build] [--vp 1280x720] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'flip-cast')); const VP = opt('--vp', '1280x720').split('x').map(Number)
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  const ctx = await b.newContext({ viewport: { width: VP[0], height: VP[1] }, serviceWorkers: 'block' }); const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p)
  const Q = qi => ({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: qi, timer_started_at: new Date().toISOString(), reveal: false })
  await api.reset(); await api.teams(6); await api.session(Q(2)); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.host-screen'); await p.waitForTimeout(3600)
  const frames = []; let n = 0
  cdp.on('Page.screencastFrame', async f => { const i = n++; fs.writeFileSync(path.join(OUT, `f${String(i).padStart(3, '0')}.jpg`), Buffer.from(f.data, 'base64')); frames.push(f.metadata.timestamp); await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}) })
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 70, everyNthFrame: 1 })
  await p.waitForTimeout(300); await api.session(Q(3)); await p.waitForTimeout(3200); await cdp.send('Page.stopScreencast')
  fs.writeFileSync(path.join(OUT, 'ts.json'), JSON.stringify(frames)); console.log('frames', n); await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
