// Рендер макетов в JPEG q85 1920×1080 (png/<имя>.jpg) + замеры (measure.json): границы области, пересечения, текст внутри плитки, базовая линия рядов.
// usage: NODE_PATH=/opt/node22/lib/node_modules PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node shoot.cjs [имя1,имя2]
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const DEST = path.join(__dirname, '..', '..', '..', 'docs-dev', 'book-redesign', 'mockups-20261128', 'sixletters')
const HTML = path.join(DEST, 'html'), PNG = path.join(DEST, 'png')
fs.mkdirSync(PNG, { recursive: true })
const only = (process.argv[2] || '').split(',').filter(Boolean)

function measure() {
  const R = e => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, r: r.right, b: r.bottom } }
  const sh = e => parseFloat(getComputedStyle(e).getPropertyValue('--sh')) || 0
  const out = { bounds: [], overlaps: [], textOutside: [], baselines: [], tileBaselines: [], fold: [] }
  const title = document.body.dataset.title || ''
  const isQuestion = /^Б[12]|вопроса/.test(title) && !/ответа/.test(title)
  // область: ответ — левая страница (x 250…930, y 168…944); вопрос — рабочая область (250…1670, 208…944)
  const AREA = isQuestion ? { x: 250, y: 208, r: 1670, b: 944 } : { x: 250, y: 168, r: 930, b: 944 }
  const items = [...document.querySelectorAll('.scroll,.opl,.cell,.mat,.tiles,.cap,.recall,.note,.lbl,.div,.med')].filter(e => !e.closest('.fr,.panel'))
  const boxes = []
  for (const e of items) {
    let r = R(e)
    if (e.matches('.scroll,.opl')) { const s = sh(e); r = { ...r, y: r.y - s * 0.2277, h: r.h + s * 0.2277 + s * 0.0941, b: r.b + s * 0.0941 } }       // выступы декора свитка
    if (e.matches('.cell,.mat')) { const img = e.querySelector('img'); if (img && e.matches('.cell')) { const ir = R(img); r = { x: ir.x - 10.5, y: ir.y - 10.5, w: ir.w + 21, h: ir.h + 21, r: ir.r + 10.5, b: ir.b + 10.5 } } }   // рамка на <img>
    boxes.push({ e, r, cls: e.className.baseVal ?? e.className })
    const inArea = r.x >= AREA.x - 0.5 && r.r <= AREA.r + 0.5 && r.y >= AREA.y - 0.5 && r.b <= AREA.b + 0.5
    // медальон «места» (В2) стоит левее колонки — считаем его частью плитки
    if (!inArea && !e.matches('.med')) out.bounds.push({ cls: String(cls(e)), x: Math.round(r.x), y: Math.round(r.y), r: Math.round(r.r), b: Math.round(r.b), area: AREA })
    if (e.matches('.cell,.mat') && isQuestion) { if (r.r > 900 && r.x < 1020) out.fold.push({ cls: String(cls(e)), x: Math.round(r.x), r: Math.round(r.r) }) }
  }
  function cls(e) { return typeof e.className === 'string' ? e.className : '' }
  // пересечения: только «крупные» блоки одного уровня (свитки/плитки/ячейки/ряды плиток/подписи)
  const big = boxes.filter(b => b.e.matches('.scroll,.opl,.cell,.mat,.tiles,.recall,.note,.cap'))
  for (let i = 0; i < big.length; i++) for (let j = i + 1; j < big.length; j++) {
    const a = big[i].r, b = big[j].r
    if (big[i].e.contains(big[j].e) || big[j].e.contains(big[i].e)) continue
    const ix = Math.min(a.r, b.r) - Math.max(a.x, b.x), iy = Math.min(a.b, b.b) - Math.max(a.y, b.y)
    if (ix > 1 && iy > 1 && !(big[i].e.matches('.cap') && big[j].e.closest('.tiles')) ) out.overlaps.push({ a: cls(big[i].e), b: cls(big[j].e), ix: Math.round(ix), iy: Math.round(iy) })
  }
  // текст внутри пергамента плитки/свитка: тело = рамка минус рулоны (0.9·sh с боков), по высоте — тело
  for (const p of document.querySelectorAll('.opl,.scroll')) {
    const s = sh(p), pr = R(p)
    const body = { x: pr.x + s * 0.9, r: pr.r - s * 0.9, y: pr.y, b: pr.b }
    for (const t of p.querySelectorAll('.txt,.word,.lab,.key,.pl')) {
      const range = document.createRange(); range.selectNodeContents(t); const tr = range.getBoundingClientRect()
      if (tr.left < body.x - 0.5 || tr.right > body.r + 0.5 || tr.top < body.y - 0.5 || tr.bottom > body.b + 0.5) out.textOutside.push({ plate: cls(p), el: cls(t), text: (t.textContent || '').slice(0, 30), dx: Math.round(Math.min(tr.left - body.x, 0) + Math.max(tr.right - body.r, 0)), dy: Math.round(Math.min(tr.top - body.y, 0) + Math.max(tr.bottom - body.b, 0)) })
      if (t.scrollWidth > t.clientWidth + 1 && t.matches('.txt')) out.textOutside.push({ plate: cls(p), el: 'scrollWidth', text: t.textContent.slice(0, 30) })
    }
  }
  // базовая линия: у каждой плитки-варианта и свитка маркеры .bl должны лежать на одной линии (допуск 0.5 px)
  for (const p of document.querySelectorAll('.opl:not(.orow .opl),.orow,.arow,.scroll .ap,.cap')) {
    const ys = [...p.querySelectorAll('.bl')].map(m => m.getBoundingClientRect().bottom)
    if (p.matches('.cap')) { continue }
    if (p.matches('.scroll .ap')) { out.baselines.push({ row: 'scroll ap', n: ys.length, spread: 'вертикальный стек (две строки: подпись/слово) — не ряд' }); continue }
    if (ys.length > 1) out.baselines.push({ row: cls(p), n: ys.length, spread: +(Math.max(...ys) - Math.min(...ys)).toFixed(2) })
  }
  // плитки-буквы одного слова: нижний край текстового бокса одинаков у всех букв ряда (одинаковый кегль и box → одна базовая линия)
  for (const t of document.querySelectorAll('.tiles')) {
    const ys = [...t.querySelectorAll('.tile .bl')].map(x => x.getBoundingClientRect().bottom)
    out.tileBaselines.push({ n: ys.length, spread: +(Math.max(...ys) - Math.min(...ys)).toFixed(2) })
  }
  return out
}

;(async () => {
  const b = await chromium.launch()
  const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
  const names = fs.readdirSync(HTML).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5)).filter(n => n !== 'index' && (!only.length || only.includes(n))).sort()
  const res = {}
  for (const n of names) {
    const p = await ctx.newPage()
    await p.goto('file://' + path.join(HTML, n + '.html'))
    await p.evaluate(() => document.fonts.ready)
    await p.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 8000 })
    await p.waitForTimeout(200)
    const fontsOk = await p.evaluate(() => ['700 20px "PT Serif"', '700 20px "Cormorant Garamond"', 'italic 400 20px "PT Serif"'].map(f => document.fonts.check(f, 'ПАЛТУС123')))
    res[n] = { fontsOk, ...(await p.evaluate(measure)) }
    await p.screenshot({ path: path.join(PNG, n + '.jpg'), type: 'jpeg', quality: 85 })
    const m = res[n]
    console.log(n.padEnd(10), 'вне области:', m.bounds.length, ' пересечений:', m.overlaps.length, ' текст вне плитки:', m.textOutside.length, ' сгиб:', m.fold.length, ' baseline max:', Math.max(0, ...m.baselines.map(x => +x.spread || 0), ...m.tileBaselines.map(x => x.spread)), ' шрифты:', m.fontsOk.join(','))
    await p.close()
  }
  fs.writeFileSync(path.join(DEST, 'measure.json'), JSON.stringify(res, null, 1))
  await b.close()
})()
