// Тело функции для QP_EXTRA_MEASURE (shoot.cjs): плашка «ПРАВИЛЬНЫЙ ОТВЕТ» — свиток с бантом (10.75, components/screens/AnswerPlate.tsx).
// Декор-прямоугольник = рамка свитка + border-image-outset (хвоя сверху, низ рулона). Проверки (violations — список строк, пусто = норма):
//  рулоны не растянуты (ширина границы = .9·высоты, border-image-width = 1.0446·высоты, сверху/снизу 0);
//  подпись и ответ внутри пергамента (между рулонами, по высоте внутри тела); кегль подобран (data-bk-fit=ok);
//  декор не пересекает вопрос (.q-recall), картинки ответа, пояснение, шапку, колонку команд, сгиб (±22 px), не выходит за экран и не обрезается предками (overflow).
const rc = r => ({ x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) })
const inter = (a, b) => { const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y); return w > 0.5 && h > 0.5 ? +(w * h).toFixed(0) : 0 }
const out = { plates: [], violations: [] }
const bad = s => out.violations.push(s)
const plates = [...document.querySelectorAll('.answer-plate')].filter(e => e.getBoundingClientRect().width > 0)
out.n = plates.length
if (!plates.length) bad('нет .answer-plate')
plates.forEach((e, i) => {
  const r = e.getBoundingClientRect(), cs = getComputedStyle(e), h = r.height
  const k = r.height / (parseFloat(cs.height) || r.height)   // масштаб сцены (transform): computed-значения — до него
  const o = cs.borderImageOutset.split(' ').map(x => parseFloat(x) * k)
  const [t, rr, b, l] = o.length === 4 ? o : o.length === 1 ? [o[0], o[0], o[0], o[0]] : o.length === 3 ? [o[0], o[1], o[2], o[1]] : [o[0], o[1], o[0], o[1]]
  const decor = { x: r.left - l, y: r.top - t, w: r.width + l + rr, h: r.height + t + b }
  const bq = cs.borderImageWidth.split(' ').map(parseFloat), biw = bq.length === 2 ? [bq[0], bq[1], bq[0], bq[1]] : bq.length === 1 ? [bq[0], bq[0], bq[0], bq[0]] : bq.length === 3 ? [bq[0], bq[1], bq[2], bq[1]] : bq
  const bl = parseFloat(cs.borderLeftWidth), br = parseFloat(cs.borderRightWidth)
  const rec = { i, body: rc(r), decor: rc({ left: decor.x, top: decor.y, width: decor.w, height: decor.h }), sh: +h.toFixed(1), outset: { t: +t.toFixed(1), b: +b.toFixed(1) }, borderImageWidth: cs.borderImageWidth, src: cs.borderImageSource.slice(-30) }
  if (!/hscroll-bow\.webp/.test(cs.borderImageSource)) bad(`#${i}: не hscroll-bow.webp`)
  // сцена масштабируется transform: rect — в экранных px, computed — до масштаба; сравниваем через k
  if (Math.abs(bl * k - 0.9 * h) > 1.5 || Math.abs(br * k - 0.9 * h) > 1.5) bad(`#${i}: граница ${(bl * k).toFixed(1)} ≠ .9·h (${(0.9 * h).toFixed(1)})`)
  if (Math.abs(biw[1] * k - 1.0446 * h) > 1.5 || Math.abs(biw[3] * k - 1.0446 * h) > 1.5) bad(`#${i}: рулон ${(biw[1] * k).toFixed(1)} ≠ 1.0446·h (${(1.0446 * h).toFixed(1)}) — растянут`)
  if (biw[0] !== 0 || biw[2] !== 0) bad(`#${i}: border-image сверху/снизу не 0 (${cs.borderImageWidth})`)
  const main = e.querySelector('.answer-main'), label = e.querySelector('.answer-label')
  const inner = { l: r.left + 1.0 * h * 1, r: r.right - 1.0 * h * 1, t: r.top, b: r.bottom }
  const lo = { l: r.left + bl * k - 1, r: r.right - br * k + 1 }
  for (const [nm, el] of [['ответ', main], ['подпись', label]]) {
    if (!el) { bad(`#${i}: нет ${nm}`); continue }
    const rg = document.createRange(); rg.selectNodeContents(el); const tr = rg.getBoundingClientRect()
    rec[nm] = rc(tr)
    // текст между рулонами: от внутренней кромки границы (.9·h) до другой; ПОЛЯ внутри пергамента — допуск .1·h (хвоя под текстом)
    if (tr.width > 0 && (tr.left < lo.l || tr.right > lo.r)) bad(`#${i}: ${nm} выходит за границы рулонов (${tr.left.toFixed(0)}..${tr.right.toFixed(0)} vs ${lo.l.toFixed(0)}..${lo.r.toFixed(0)})`)
    if (tr.width > 0 && (tr.top < r.top - 1 || tr.bottom > r.bottom + 1)) bad(`#${i}: ${nm} выходит по вертикали (${tr.top.toFixed(0)}..${tr.bottom.toFixed(0)} vs ${r.top.toFixed(0)}..${r.bottom.toFixed(0)})`)
  }
  if (main) { rec.fontPx = parseFloat(getComputedStyle(main).fontSize); rec.fit = main.dataset.bkFit || null; if (main.dataset.bkFit === 'overflow') bad(`#${i}: кегль не подобран (overflow)`) }
  if (label) { const rg = document.createRange(); rg.selectNodeContents(label); const w = rg.getBoundingClientRect().width; rec.labelFits = w <= label.clientWidth + 1; if (!rec.labelFits) bad(`#${i}: подпись шире места (${w.toFixed(0)} > ${label.clientWidth})`) }
  // соседи
  const nb = []
  for (const [k2, sel] of [['q-recall', '.answers-main > .q-recall, .q-recall'], ['картинки', '.answer-media, .lay-img'], ['пояснение', '.bk-note-box, .lay-anote'], ['шапка', '.host-topbar .qnum, .host-topbar .mono-tag'], ['колонка команд', '.team-answers']])
    for (const n of document.querySelectorAll(sel)) { const nr = n.getBoundingClientRect(); if (nr.width < 2 || nr.height < 2) continue; const a = inter(decor, rc(nr)); if (a) { nb.push([k2, a]); bad(`#${i}: декор пересекает «${k2}» (${a} px²)`) } }
  rec.neighbours = nb
  const foldX = innerWidth / 2
  if (decor.x < foldX && decor.x + decor.w > foldX - 22 * k) bad(`#${i}: декор заходит на сгиб (правый край ${(decor.x + decor.w).toFixed(0)} ≥ ${(foldX - 22 * k).toFixed(0)})`)
  if (decor.x < 0 || decor.y < 0 || decor.x + decor.w > innerWidth || decor.y + decor.h > innerHeight) bad(`#${i}: декор за экраном`)
  for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) {
    const pc = getComputedStyle(p); if (!/hidden|clip|auto|scroll/.test(pc.overflowX + pc.overflowY)) continue
    const pr = p.getBoundingClientRect()
    if (decor.x < pr.left - 0.5 || decor.y < pr.top - 0.5 || decor.x + decor.w > pr.right + 0.5 || decor.y + decor.h > pr.bottom + 0.5) bad(`#${i}: декор обрезается предком .${p.className.toString().slice(0, 40)}`)
  }
  out.plates.push(rec)
})
// на экране не должно остаться старой карточки (бежевая с золотой кромкой): у .answer-block нет фона/тени/рамки
const ab = document.querySelector('.answer-block')
if (ab) { const c = getComputedStyle(ab); out.oldCard = { bg: c.backgroundColor, bgImage: c.backgroundImage.slice(0, 30), shadow: c.boxShadow.slice(0, 30), border: c.borderTopWidth }
  if (c.backgroundImage !== 'none' || (c.backgroundColor !== 'rgba(0, 0, 0, 0)' && c.backgroundColor !== 'transparent') || c.boxShadow !== 'none' || parseFloat(c.borderTopWidth) > 0) bad('у .answer-block осталась подложка/тень/рамка') }
return out
