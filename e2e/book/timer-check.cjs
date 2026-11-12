// ═══ Независимая проверка геометрии таймера «Книги»: КАЖДЫЙ внутренний слой × размеры окна × состояния секунд (ADAPTIVE.md) ═══
// Сцена — экран «Вопрос 10/10»: 3 картинки + текстовые варианты (как у ведущего), таймер 49 с. Для каждого окна и каждого состояния (49, 10, 5, 0)
// собирается: слот, .p-ros и слои (венец, диск, сектор, карточка, булавка, число) — layout-размер (offsetWidth/Height, без поворота),
// bbox, накопленное линейное преобразование предков (масштаб по осям, скос), анимации. Правила:
//  - слот и .p-ros — КВАДРАТ (±1 px); венец/диск/сектор — квадраты (±1 px); карточка — 52 % × 44 % диаметра (±1 %);
//  - накопленный масштаб по X и Y одинаков (±0.5 %), скоса нет (±0.005), поворот вносят только известные анимации (wobble/drop-over);
//  - слот целиком внутри книги, не заходит на гирлянду выше TOP_Y и не пересекает плашку вопроса.
// usage: QP_BOOK_SCRATCH=… node e2e/book/timer-check.cjs [--no-build] [--vp 1920x1080,…] [--q 9] [--out файл.json]
'use strict'
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const VPS = opt('--vp', '1920x1080,1600x900,1440x900,1920x1200,1280x1024,1280x720,1899x905,1366x768,2560x1080,1024x768').split(',').map(s => s.split('x').map(Number))
const Q = Number(opt('--q', '9')), OUT = opt('--out', '')
const LEFT = [49, 10, 5, 0]

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { makeApi } = await import('./scenes.mjs')
  const { PACK_ONLINE } = await import('./make-pack.mjs')
  const stand = await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const rows = [], fails = []
  for (const [w, h] of VPS) for (const L of LEFT) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, serviceWorkers: 'block' })
    const page = await ctx.newPage()
    const offset = L === 0 ? 62000 : (57 - L) * 1000
    await api.reset(); await api.teams(8)
    await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: Q, timer_started_at: new Date(Date.now() - offset).toISOString(), reveal: false })
    await page.clock.install()
    await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
    await page.waitForSelector('[data-bk-slot="timer"] .p-ros', { timeout: 15000 })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(2500)
    const t = await page.evaluate(() => Date.now()); await page.clock.pauseAt(t + 20)
    await page.waitForTimeout(300)
    const m = await page.evaluate(() => {
      const lin = el => { // накопленное линейное преобразование предков (без переноса)
        let M = new DOMMatrix(); for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const tr = getComputedStyle(n).transform; if (tr && tr !== 'none') M = new DOMMatrix(tr).multiply(M) }
        const sx = Math.hypot(M.a, M.b), sy = Math.hypot(M.c, M.d)
        return { sx, sy, skew: (M.a * M.c + M.b * M.d) / (sx * sy || 1), rot: Math.atan2(M.b, M.a) * 180 / Math.PI }
      }
      const slot = document.querySelector('[data-bk-slot="timer"]'), ros = slot.querySelector('.p-ros')
      const R = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height } }
      const sel = { ros: '.p-ros', crown: '.p-ros-crown', disc: '.p-ros-disc', wedge: '.p-ros-wedge', card: '.p-ros-card', pin: '.p-ros-pin', num: '.p-ros-num' }
      const layers = {}
      for (const [k, s] of Object.entries(sel)) { const e = k === 'ros' ? ros : ros.querySelector(s); if (!e) { layers[k] = null; continue }
        const cs = getComputedStyle(e)
        layers[k] = { ow: e.offsetWidth, oh: e.offsetHeight, rect: R(e), transform: cs.transform, anim: e.getAnimations().map(a => a.animationName ?? a.constructor.name), lin: lin(e), font: k === 'num' ? cs.fontSize : undefined } }
      const book = document.querySelector('.p-book')?.getBoundingClientRect()
      const q = document.querySelector('.host-topbar .qnum')?.getBoundingClientRect()
      const sc = document.querySelector('.p-scene, .stage, [class*="stage"]')
      return { slot: R(slot), slotCls: slot.dataset.size, num: ros.querySelector('.p-ros-num')?.textContent, cls: ros.className, layers,
        book: book ? { x: book.x, y: book.y, w: book.width, h: book.height } : null, qnum: q ? { x: q.x, y: q.y, w: q.width, h: q.height } : null, scene: sc ? lin(sc) : null }
    })
    await ctx.close()
    const bad = []
    const d = m.slot.w, near = (a, b, tol) => Math.abs(a - b) <= tol
    if (!near(m.slot.w, m.slot.h, 1)) bad.push(`слот ${m.slot.w.toFixed(1)}×${m.slot.h.toFixed(1)} не квадрат`)
    const L0 = m.layers
    for (const k of ['ros', 'crown', 'disc', 'wedge']) if (!L0[k]) bad.push(`нет слоя ${k}`); else if (!near(L0[k].ow, L0[k].oh, 1)) bad.push(`${k}: layout ${L0[k].ow}×${L0[k].oh} не квадрат`)
    if (L0.ros && !near(L0.ros.ow, m.slot.w, 1.5)) bad.push(`.p-ros ${L0.ros.ow} ≠ слоту ${m.slot.w.toFixed(1)}`)
    if (L0.card && !(near(L0.card.ow / d, 0.52, 0.012) && near(L0.card.oh / d, 0.44, 0.012))) bad.push(`карточка ${(L0.card.ow / d).toFixed(3)}×${(L0.card.oh / d).toFixed(3)} d вместо 0.52×0.44`)
    if (L0.num && L0.card) { const n = L0.num.rect, c = L0.card.rect
      if (n.x < c.x - 1 || n.x + n.w > c.x + c.w + 1 || n.y < c.y - 1 || n.y + n.h > c.y + c.h + 1) bad.push(`число «${m.num}» не помещается в карточке (${n.w.toFixed(1)}×${n.h.toFixed(1)} в ${c.w.toFixed(1)}×${c.h.toFixed(1)})`) }
    if (L0.pin && !near(L0.pin.ow, L0.pin.oh, 1)) bad.push(`булавка ${L0.pin.ow}×${L0.pin.oh}`)
    for (const [k, v] of Object.entries(L0)) if (v) {
      if (Math.abs(v.lin.sx / v.lin.sy - 1) > 0.005) bad.push(`${k}: накопленный масштаб X/Y = ${(v.lin.sx / v.lin.sy).toFixed(4)}`)
      if (Math.abs(v.lin.skew) > 0.005) bad.push(`${k}: скос ${v.lin.skew.toFixed(4)}`)
    }
    if (m.scene && Math.abs(m.scene.sx / m.scene.sy - 1) > 0.005) bad.push(`сцена масштабируется неравномерно ${m.scene.sx}/${m.scene.sy}`)
    if (m.book && (m.slot.x < m.book.x - 1 || m.slot.x + m.slot.w > m.book.x + m.book.w + 1 || m.slot.y < m.book.y - 1 || m.slot.y + m.slot.h > m.book.y + m.book.h + 1)) bad.push('слот вне книги')
    if (m.qnum && m.slot.x < m.qnum.x + m.qnum.w && m.slot.x + m.slot.w > m.qnum.x && m.slot.y < m.qnum.y + m.qnum.h && m.slot.y + m.slot.h > m.qnum.y) bad.push('слот пересекает плашку вопроса')
    const state = m.cls.includes('is-zero') ? 'zero' : m.cls.includes('is-low') ? 'low' : 'normal'
    const row = { vp: `${w}x${h}`, left: L, shown: m.num, state, slot: `${m.slot.w.toFixed(1)}×${m.slot.h.toFixed(1)}`, size: m.slotCls, anims: [...new Set(Object.values(m.layers).flatMap(v => v ? v.anim : []))], bad }
    rows.push(row)
    if (String(m.num) !== String(L)) row.note = `показано ${m.num}, ожидалось ${L}`
    for (const b of bad) fails.push(`${row.vp} ${L}с: ${b}`)
    console.log(`${bad.length ? '✗' : '✓'} ${row.vp} ${L}с → «${m.num}» ${state} слот ${row.slot} ${row.anims.join(',') || 'без анимаций'}${row.note ? ' (' + row.note + ')' : ''}${bad.length ? '\n    ' + bad.join('\n    ') : ''}`)
  }
  await browser.close(); await stand.close()
  if (OUT) fs.writeFileSync(path.resolve(OUT), JSON.stringify({ q: Q, rows, fails }, null, 1))
  console.log(fails.length ? `\nНАРУШЕНИЙ: ${fails.length}` : `\nOK: ${rows.length} состояний, все слои — без деформации`)
  process.exit(fails.length ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
