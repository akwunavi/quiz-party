// Тело функции для QP_EXTRA_MEASURE (shoot.cjs): геометрия свитков-вариантов с декором (border-image-outset) — 10.73.
// Декор-прямоугольник = рамка плитки + outset (хвоя/бант выступают над и под лентой). Проверки: пересечения декор↔декор,
// декор↔{таймер, плашка вопроса, текст вопроса, сгиб, рамка экрана/страницы}, обрезка родителем (overflow), текст внутри пергамента.
const rc = r => ({ x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) })
const inter = (a, b) => { const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y); return w > 0.5 && h > 0.5 ? +(w * h).toFixed(0) : 0 }
const plates = [...document.querySelectorAll('.choice-plate')].filter(e => e.getBoundingClientRect().width > 0)
const dec = plates.map((e, i) => {
  const r = e.getBoundingClientRect(), cs = getComputedStyle(e), o = cs.borderImageOutset.split(' ').map(parseFloat)
  const [t, rr, b, l] = o.length === 4 ? o : o.length === 1 ? [o[0], o[0], o[0], o[0]] : [o[0], o[1], o[0], o[1]]
  const body = rc(r), d = { x: r.left - l, y: r.top - t, w: r.width + l + rr, h: r.height + t + b }
  const cell = [...e.children].find(c => !c.classList.contains('key') && c.tagName !== 'I' && getComputedStyle(c).display !== 'none') || e
  const rg = document.createRange(); rg.selectNodeContents(cell); const tr = rg.getBoundingClientRect(), key = e.querySelector('.key')?.getBoundingClientRect()
  const sh = parseFloat(cs.getPropertyValue('--sh')) || r.height
  const bw = parseFloat(cs.borderLeftWidth) || 0
  return { i, cls: e.className.replace(/\s+/g, ' ').slice(0, 40), body, decor: rc({ left: d.x, top: d.y, width: d.w, height: d.h }), outset: { t: +t.toFixed(1), b: +b.toFixed(1) },
    borderImageWidth: cs.borderImageWidth, borderW: bw, textRect: rc(tr), keyRect: key ? rc(key) : null, bodyH: +r.height.toFixed(1),
    textInsideBody: tr.width === 0 ? true : tr.left >= r.left + bw - 1 && tr.right <= r.right - bw + 1,
    textInBodyV: tr.top >= r.top - 1 && tr.bottom <= r.bottom + 1 }
})
const pair = []
for (let i = 0; i < dec.length; i++) for (let j = i + 1; j < dec.length; j++) { const a = inter(dec[i].decor, dec[j].decor); if (a) pair.push([i, j, a]) }
const other = {}
for (const [k, sel] of [['timer', '.p-ros'], ['timerSlot', '[data-bk-slot="timer"]'], ['qnum', '.host-topbar .qnum'], ['qtext', '.host-screen .q-text'], ['answerBlock', '.answer-block'], ['teamAnswers', '.team-answers']]) {
  const el = document.querySelector(sel); if (!el) continue; const r = rc(el.getBoundingClientRect()); other[k] = r
  const hit = dec.filter(d => inter(d.decor, r)).map(d => d.i); if (hit.length) other[k + 'Hit'] = hit
}
const fold = { x: innerWidth / 2 - 22, y: 0, w: 44, h: innerHeight }
const foldHit = dec.filter(d => inter(d.decor, fold)).map(d => d.i)
const clip = []
for (const d of dec) { let p = plates[d.i].parentElement; while (p && p !== document.body) { const cs = getComputedStyle(p); if (/hidden|clip|auto|scroll/.test(cs.overflowX + cs.overflowY)) { const pr = p.getBoundingClientRect(); if (d.decor.x < pr.left - 0.5 || d.decor.y < pr.top - 0.5 || d.decor.x + d.decor.w > pr.right + 0.5 || d.decor.y + d.decor.h > pr.bottom + 0.5) clip.push([d.i, p.className.toString().slice(0, 40)]) } p = p.parentElement } }
const ab = document.querySelector('.answer-block')?.getBoundingClientRect()
const outAB = ab ? dec.filter(d => d.decor.x < ab.left - 0.5 || d.decor.y < ab.top - 0.5 || d.decor.x + d.decor.w > ab.right + 0.5 || d.decor.y + d.decor.h > ab.bottom + 0.5).map(d => d.i) : []
const outVp = dec.filter(d => d.decor.x < 0 || d.decor.y < 0 || d.decor.x + d.decor.w > innerWidth || d.decor.y + d.decor.h > innerHeight).map(d => d.i)
return { n: dec.length, plates: dec, pairOverlaps: pair, other, foldHit, clip, outsideAnswerBlock: outAB, outsideViewport: outVp, src: plates[0] ? getComputedStyle(plates[0]).borderImageSource.slice(-40) : null }
