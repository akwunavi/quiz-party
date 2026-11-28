// Замер и кадры «Скрэмбла» в «Книге» (28.11.2026: перепутанные буквы прямо в клетках слов).
// Одна фраза за запуск: QP_AN_PHRASE='Дед Мороз' QP_AN_HINT=3 [QP_BOOK_APP=<готовая сборка>] node e2e/book/anagram-inplace.cjs --tag after --out <каталог> [--no-build]
//   [--vp 1920x1080,...] [--teams 6,16] [--states h0,h2,hall,reveal] [--race]
// Состояния: h0 — подсказок нет, h2 — ~2 подсказки (интервал QP_AN_HINT=5 с), hall — максимум, reveal — ответ показан.
// Время страницы остановлено (page.clock), так что число открытых подсказок воспроизводимо между «до» и «после».
// Выход: JSON-строка с замерами; PNG — в --out (если задан --shots).
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'anp')); const TAG = opt('--tag', 'after')
const VPS = opt('--vp', '1920x1080,1366x768,1280x720,1899x905').split(',').map(s => s.split('x').map(Number))
const TEAMS = opt('--teams', '6').split(',').map(Number)
const STATES = opt('--states', 'h0,h2,hall,reveal').split(',')
const SHOTS = argv.includes('--shots'); const LABEL = opt('--label', 'p')

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, SCENES } = await import('./scenes.mjs')
  fs.mkdirSync(OUT, { recursive: true }); const stand = await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); const rows = []
  for (const [w, h] of VPS) for (const n of TEAMS) for (const st of STATES) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    const errors = []; p.on('pageerror', e => errors.push(String(e.message || e)))
    const X = Date.now()
    await api.reset(); await api.teams(n)
    const startAt = { h0: X + 60000, h2: X - 8000, hall: X - 60000, reveal: X - 60000 }[st]
    await api.session({ pack_id: 'stand-book-all', phase: 'question', round_number: 14, question_index: 0, timer_started_at: new Date(startAt).toISOString(), reveal: st === 'reveal' })
    await p.clock.install({ time: X })
    await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.an-screen', { timeout: 15000 })
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2500)
    const t = await p.evaluate(() => Date.now()); await p.clock.pauseAt(t + 20)
    await p.evaluate(() => document.getAnimations().forEach(a => { const it = a.effect?.getComputedTiming?.().iterations; if (Number.isFinite(it) && a.playState !== 'finished') { try { a.finish() } catch { /* */ } } }))
    await p.waitForTimeout(250)
    const r = await p.evaluate(() => {
      const R = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, r: r.right, b: r.bottom, w: r.width, h: r.height } }
      const hit = (a, o) => a.x < o.r - 0.5 && a.r > o.x + 0.5 && a.y < o.b - 0.5 && a.b > o.y + 0.5
      const legacy = !document.querySelector('.bk-an-board')
      const wrapEl = document.querySelector('.an-board-wrap'); const wrap = R(wrapEl)
      const out = { legacy, wrap: [wrap.x, wrap.y, wrap.w, wrap.h].map(Math.round) }
      if (legacy) {
        out.hintIdx = [...document.querySelectorAll('.an-cell.hint')].map(e => +e.dataset.i).sort((a, b) => a - b)
        out.tiles = document.querySelectorAll('.an-tile').length
        return out
      }
      const all = [...document.querySelectorAll('.bk-an-c')], lets = all.filter(e => !e.classList.contains('fixed'))
      const others = [...document.querySelectorAll('.an-teams, .an-result, .host-topbar, .host-actions, .an-clue, .q-media-grid, [class*="timer"]')].map(e => ({ cls: String(e.className).split(' ')[0], r: R(e) })).filter(o => o.r.w > 0 && o.r.h > 0)
      const cx = innerWidth / 2; const bad = new Set(); let outside = 0, fold = 0, clipped = 0
      for (const e of all) { const a = R(e); if (!a.w) continue
        for (const o of others) if (hit(a, o.r)) bad.add(o.cls)
        if (a.r > innerWidth + 1 || a.b > innerHeight + 1 || a.x < -1 || a.y < -1) outside++
        if (a.x < cx - 4 && a.r > cx + 4) fold++
        if (a.r > wrap.r + 1 || a.b > wrap.b + 1 || a.x < wrap.x - 1 || a.y < wrap.y - 1) clipped++ }
      const words = [...document.querySelectorAll('.bk-an-word')].map(w => ({
        text: [...w.children].map(c => c.textContent).join(''),
        letters: w.querySelectorAll('.bk-an-c:not(.fixed)').length,
        hintIdx: [...w.querySelectorAll('.set')].map(c => +c.dataset.i) }))
      // ряды по верхнему краю
      const byRow = new Map(); for (const e of all) { const a = R(e); const k = Math.round(a.y); (byRow.get(k) ?? byRow.set(k, []).get(k)).push({ e, a }) }
      const rowsInfo = [...byRow.entries()].sort((a, b) => a[0] - b[0]).map(([y, cs]) => {
        cs.sort((p, q) => p.a.x - q.a.x)
        const tb = cs.filter(c => c.e.textContent).map(c => { const rg = document.createRange(); rg.selectNodeContents(c.e); return rg.getBoundingClientRect().bottom })
        const left = cs[0].a.x, right = Math.max(...cs.map(c => c.a.r))
        const gapsIn = [], gapsBetween = []
        for (let i = 1; i < cs.length; i++) { const g = cs[i].a.x - cs[i - 1].a.r; (cs[i].e.parentElement === cs[i - 1].e.parentElement ? gapsIn : gapsBetween).push(g) }
        return { y, n: cs.length, baselineSpread: tb.length ? Math.max(...tb) - Math.min(...tb) : 0, centerOff: (left + right) / 2 - (wrap.x + wrap.w / 2), gapsIn, gapsBetween }
      })
      const fs = [...new Set(lets.map(e => getComputedStyle(e).fontSize))]
      const hs = [...new Set(all.map(e => Math.round(e.getBoundingClientRect().height * 10) / 10))]
      const bd = lets[0] ? getComputedStyle(lets.find(e => e.classList.contains('mix')) ?? lets[0]) : null
      return { ...out, cells: lets.length, words, overlaps: [...bad], outside, fold, clipped, fontSizes: fs, heights: hs, rows: rowsInfo.map(r => ({ ...r, gapsIn: undefined, gapsBetween: undefined, maxGapIn: Math.max(0, ...r.gapsIn), minGapBetween: r.gapsBetween.length ? Math.min(...r.gapsBetween) : null })),
        cellW: Math.round(lets[0]?.getBoundingClientRect().width || 0), borderStyle: bd?.borderTopStyle, hintIdx: [...document.querySelectorAll('.bk-an-c.set')].map(e => +e.dataset.i).sort((a, b) => a - b),
        setBgInReveal: all.filter(e => e.classList.contains('set')).length }
    })
    if (SHOTS) await p.screenshot({ path: `${OUT}/${TAG}-${LABEL}-${st}-${w}x${h}-t${n}.png` })
    rows.push({ vp: `${w}x${h}`, teams: n, state: st, errors: [...new Set(errors)].slice(0, 3), ...r }); await ctx.close()
  }
  await b.close(); await stand.close()
  console.log(JSON.stringify(rows)); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
