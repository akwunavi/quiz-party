// Замер Скрэмбла: плитки/ячейки против чужих элементов, выход за страницу/сгиб. usage: QP_BOOK_THEME=.. node e2e/book/anagram-measure.cjs [--no-build] --out dir
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'anm')); const PHRASES = (opt('--phrases', '')).split('|').filter(Boolean)
const VPS = opt('--vp', '1920x1080,1899x905,1366x768,1280x720').split(',').map(s => s.split('x').map(Number)); const TEAMS = opt('--teams', '6,16').split(',').map(Number)
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, SCENES } = await import('./scenes.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); const rows = []
  const setup = SCENES.find(s => s.id === '49-anagram-6')
  for (const [w, h] of VPS) for (const n of TEAMS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    await api.reset(); await api.teams(n); await api.session({ pack_id: 'stand-book-all', phase: 'question', round_number: 14, question_index: 0, timer_started_at: new Date(Date.now() - 12000).toISOString(), reveal: false })
    await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.an-screen', { timeout: 15000 }); await p.waitForTimeout(3200)
    const r = await p.evaluate(() => {
      const R = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, r: r.right, b: r.bottom, w: r.width, h: r.height } }
      const mine = [...document.querySelectorAll('.an-tile, .an-cell:not(.fixed)')]
      const wrap = document.querySelector('.an-board-wrap').getBoundingClientRect()
      const others = [...document.querySelectorAll('.an-teams, .an-result, .host-topbar, .host-actions, .an-clue')].map(e => ({ cls: e.className.split(' ')[0], r: R(e) }))
      const bad = [], book = document.querySelector('.p-book, .bk-content')?.getBoundingClientRect(); const cx = innerWidth / 2
      const hit = (a, o) => a.x < o.r && a.r > o.x && a.y < o.b && a.b > o.y
      let outside = 0, fold = 0, clipped = 0
      for (const e of mine) { const a = R(e); if (!a.w) continue
        for (const o of others) if (hit(a, o.r)) bad.push(o.cls)
        if (a.r > innerWidth + 1 || a.b > innerHeight + 1 || a.x < -1) outside++
        if (a.x < cx - 4 && a.r > cx + 4) fold++
        if (a.r > wrap.right + 1 || a.b > wrap.bottom + 1 || a.x < wrap.x - 1 || a.y < wrap.y - 1) clipped++ }
      return { n: mine.length, overlaps: [...new Set(bad)], outside, fold, clipped, wrap: [Math.round(wrap.x), Math.round(wrap.y), Math.round(wrap.width), Math.round(wrap.height)], tileW: Math.round(mine[0]?.getBoundingClientRect().width || 0) }
    })
    if (process.env.QP_SHOT) await p.screenshot({ path: `${OUT}/${process.env.QP_SHOT}-${w}x${h}-t${n}.png` })
    rows.push({ vp: `${w}x${h}`, teams: n, ...r }); await ctx.close()
  }
  console.log(JSON.stringify(rows)); await b.close(); process.exit(0)
}
let return_
main().catch(e => { console.error(e); process.exit(1) })
