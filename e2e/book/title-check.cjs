// ═══ Заголовки раундов «Книги»: замер — заголовок целиком на ЛЕВОЙ странице (не заходит за сгиб), не пересекает правила, кегль крупный ═══
// usage: QP_BOOK_SCRATCH=… node e2e/book/title-check.cjs [--no-build] --out <каталог>   (нужны раунды 15–19 пакета «все механики»)
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'title-out'))
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ALL } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); const res = []; let bad = 0
  for (const [w, h] of [[1920, 1080], [1280, 720], [1366, 768], [1899, 905]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' })).newPage()
    for (const r of [15, 16, 17, 18, 19, 3]) {
      await api.reset(); await api.teams(6); await api.session({ pack_id: r === 3 ? 'stand-book' : PACK_ALL, phase: 'round_intro', round_number: r, question_index: 0, timer_started_at: null, reveal: false })
      await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.bk-rt-h', { timeout: 20000 }); await p.waitForTimeout(2800)
      const m = await p.evaluate(() => { const R = e => e && (r => ({ l: r.left, r: r.right, t: r.top, b: r.bottom }))(e.getBoundingClientRect()); const u = Math.min(innerWidth / 1920, innerHeight / 1080), ox = (innerWidth - 1920 * u) / 2
        const fold = ox + 960 * u; const t = document.querySelector('.bk-rt-h'), rules = document.querySelector('.round-intro .rules-frame'), rg = document.createRange(); rg.selectNodeContents(t); const tr = rg.getBoundingClientRect()
        const rr = R(rules); const hit = rr && !(tr.right <= rr.l || tr.left >= rr.r || tr.bottom <= rr.t || tr.top >= rr.b)
        return { fs: parseFloat(t.style.fontSize), fit: t.dataset.bkFit, textRight: Math.round(tr.right), fold: Math.round(fold), crossFold: tr.right > fold - 4 * u, hitRules: !!hit, u, glitchAnim: getComputedStyle(t).animationName } })
      const ok = m.fit === 'ok' && !m.crossFold && !m.hitRules && m.glitchAnim === 'none'; if (!ok) bad++; res.push({ w, h, r, ...m, ok }); console.log(ok ? 'OK  ' : 'FAIL', w, h, 'r' + r, JSON.stringify(m))
    }
  }
  fs.writeFileSync(path.join(OUT, 'title-check.json'), JSON.stringify(res, null, 1)); await b.close(); console.log(bad ? `FAILED ${bad}` : 'ALL OK'); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
