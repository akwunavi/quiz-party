// ═══ Независимая проверка таймера «Книги» (BookTimer: золотое кольцо timer-ring-hi + дуга + цифры HTML) ═══
// Для окон × состояний (49/10/5/0 с) на «Вопрос 10/10» и трёхзначных цифр («120 секунд», 120 с): слот и кольцо — квадраты, кольцо = слоту, дуга — внутри кольца,
// ЦИФРЫ (по Range) целиком внутри внутреннего круга кольца (внутр. диаметр ≈ 90 % кольца), накопленный масштаб по осям равный, нет скоса,
// слот внутри книги и не пересекает плашку вопроса; ассет кольца реально загружен (naturalWidth ≥ 2× слота на 3840).
// usage: QP_BOOK_SCRATCH=… node e2e/book/timer-check.cjs [--no-build] [--vp 1920x1080,…] [--out файл.json]
'use strict'
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const VPS = opt('--vp', '1920x1080,1899x905,1366x768,1280x720,3840x2160,1024x768,2560x1080').split(',').map(s => s.split('x').map(Number))
const OUT = opt('--out', '')
const INNER = 0.89   // внутренний диаметр кольца / диаметр кольца (замер ассета: 888/984 ≈ 0.90, берём с запасом)

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { makeApi } = await import('./scenes.mjs')
  const { PACK_ONLINE, PACK_ALL } = await import('./make-pack.mjs')
  const stand = await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const cases = [...[49, 10, 5, 0].map(L => ({ L, pack: PACK_ONLINE, round: 0, q: 9, total: 60 })), { L: 120, pack: PACK_ALL, round: 9, q: 0, total: 120, label: '3 цифры' }, { L: 105, pack: PACK_ALL, round: 9, q: 0, total: 120, label: '3 цифры' }]
  const rows = [], fails = []
  for (const [w, h] of VPS) for (const c of cases) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, serviceWorkers: 'block' })
    const page = await ctx.newPage()
    const offset = c.L === 0 ? (c.total + 2) * 1000 : (c.total - c.L + 1) * 1000
    await api.reset(); await api.teams(8)
    await api.session({ pack_id: c.pack, phase: 'question', round_number: c.round, question_index: c.q, timer_started_at: new Date(Date.now() - offset).toISOString(), reveal: false })
    await page.clock.install()
    await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
    await page.waitForSelector('[data-bk-slot="timer"] .bk-tm-num', { timeout: 20000 })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() => { const i = document.querySelector('.bk-tm-ring'); return i && i.complete && i.naturalWidth > 0 }, null, { timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(2500)
    const t = await page.evaluate(() => Date.now()); await page.clock.pauseAt(t + 20).catch(() => {})
    await page.waitForTimeout(300)
    const m = await page.evaluate(() => {
      const lin = el => { let M = new DOMMatrix(); for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const tr = getComputedStyle(n).transform; if (tr && tr !== 'none') M = new DOMMatrix(tr).multiply(M) }
        const sx = Math.hypot(M.a, M.b), sy = Math.hypot(M.c, M.d); return { sx, sy, skew: (M.a * M.c + M.b * M.d) / (sx * sy || 1) } }
      const R = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height } }
      const slot = document.querySelector('[data-bk-slot="timer"]'), tm = slot.querySelector('.bk-tm'), ring = tm.querySelector('.bk-tm-ring'), arc = tm.querySelector('.bk-tm-arc'), num = tm.querySelector('.bk-tm-num')
      const rg = document.createRange(); rg.selectNodeContents(num); const dr = rg.getBoundingClientRect()
      const book = document.querySelector('.p-book')?.getBoundingClientRect(), q = document.querySelector('.host-topbar .qnum')?.getBoundingClientRect()
      return { slot: R(slot), tm: R(tm), tmo: [tm.offsetWidth, tm.offsetHeight], ring: R(ring), ringNat: ring.naturalWidth, arc: R(arc), digits: { x: dr.x, y: dr.y, w: dr.width, h: dr.height }, text: num.textContent, cls: tm.className,
        lin: lin(ring), size: slot.dataset.size, book: book ? { x: book.x, y: book.y, w: book.width, h: book.height } : null, qnum: q ? { x: q.x, y: q.y, w: q.width, h: q.height } : null, faceImg: !!tm.querySelector('.bk-tm-face') }
    })
    await ctx.close()
    const bad = [], near = (a, b, tol) => Math.abs(a - b) <= tol
    if (!near(m.slot.w, m.slot.h, 1)) bad.push(`слот ${m.slot.w.toFixed(1)}×${m.slot.h.toFixed(1)} не квадрат`)
    if (!near(m.tmo[0], m.tmo[1], 1)) bad.push(`таймер ${m.tmo[0]}×${m.tmo[1]} не квадрат`)
    if (!near(m.ring.w, m.ring.h, 1)) bad.push(`кольцо ${m.ring.w.toFixed(1)}×${m.ring.h.toFixed(1)} не квадрат`)
    if (!near(m.ring.w, m.tm.w, 1.5)) bad.push('кольцо ≠ размеру таймера')
    if (m.ringNat < 100) bad.push('ассет кольца не загружен')
    if (m.ringNat < m.ring.w * 0.99 && w < 3000) bad.push(`кольцо растянуто: ${m.ringNat}px на ${m.ring.w.toFixed(0)}px`)
    if (m.faceImg) bad.push('остался старый диск timer_face')
    const cx = m.ring.x + m.ring.w / 2, cy = m.ring.y + m.ring.h / 2, rIn = m.ring.w * INNER / 2, d = m.digits
    const far = Math.max(...[[d.x, d.y], [d.x + d.w, d.y], [d.x, d.y + d.h], [d.x + d.w, d.y + d.h]].map(([x, y]) => Math.hypot(x - cx, y - cy)))
    if (far > rIn) bad.push(`цифры «${m.text}» выходят за внутренний круг кольца (${far.toFixed(1)} > ${rIn.toFixed(1)})`)
    if (Math.abs(m.lin.sx / m.lin.sy - 1) > 0.005) bad.push(`масштаб X/Y = ${(m.lin.sx / m.lin.sy).toFixed(4)}`)
    if (Math.abs(m.lin.skew) > 0.005) bad.push(`скос ${m.lin.skew.toFixed(4)}`)
    if (m.book && (m.slot.x < m.book.x - 1 || m.slot.x + m.slot.w > m.book.x + m.book.w + 1 || m.slot.y < m.book.y - 1 || m.slot.y + m.slot.h > m.book.y + m.book.h + 1)) bad.push('слот вне книги')
    if (m.qnum && m.slot.x < m.qnum.x + m.qnum.w && m.slot.x + m.slot.w > m.qnum.x && m.slot.y < m.qnum.y + m.qnum.h && m.slot.y + m.slot.h > m.qnum.y) bad.push('слот пересекает плашку вопроса')
    const state = m.cls.includes('is-zero') ? 'zero' : m.cls.includes('is-low') ? 'low' : 'normal'
    const row = { vp: `${w}x${h}`, left: c.L, shown: m.text, state, slot: `${m.slot.w.toFixed(1)}`, ring: `${m.ringNat}px→${m.ring.w.toFixed(0)}px`, bad }
    rows.push(row); for (const b of bad) fails.push(`${row.vp} ${c.L}с: ${b}`)
    console.log(`${bad.length ? '✗' : '✓'} ${row.vp} ${c.L}с → «${m.text}» ${state} слот ${row.slot} кольцо ${row.ring}${bad.length ? '\n    ' + bad.join('\n    ') : ''}`)
  }
  await browser.close(); await stand.close()
  if (OUT) fs.writeFileSync(path.resolve(OUT), JSON.stringify({ rows, fails }, null, 1))
  console.log(fails.length ? `\nНАРУШЕНИЙ: ${fails.length}` : `\nOK: ${rows.length} состояний`)
  process.exit(fails.length ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
