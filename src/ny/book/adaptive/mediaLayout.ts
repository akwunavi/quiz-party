// ═══ AdaptiveMedia: ВЫБОР раскладки картинок по оценке — ЧИСТЫЕ функции (доработка адаптивности, ADAPTIVE.md §«Доработка») ═══
// Раскладка не зашита под число картинок: для 2/3/4 картинок строится НАБОР кандидатов (ряд, 2×2 по колонкам, «герой + стопка»,
// выключные ряды/колонки и равные ячейки), каждый кандидат РАЗМЕЩАЕТСЯ по реальным пропорциям и оценивается ПО ФАКТИЧЕСКИМ размерам:
// заполнение области, согласованность площадей, не слишком мелкие картинки, пустые подложки, читаемость подписей, общая линия подписей.
// Победитель — по очкам; при близких очках — по порядку кандидатов (детерминированно), а при смене размера окна — с гистерезисом
// (prev: прежний победитель остаётся, пока не отстаёт заметно). Сетка не обязана быть «равными ячейками»: размеры могут быть разными,
// пропорции каждой картинки — точные. Картинки никогда не заходят на сгиб (spansFold) и за пределы контейнера.
import { containBox, type Box } from './mediaPlan'

export type ArrKind = 'one' | 'row' | 'col' | 'rowEq' | 'colEq'
export interface PaneSpec { side: 'L' | 'R' | 'ALL'; items: number[]; arr: ArrKind }
export interface Candidate { name: string; panes: PaneSpec[] }

export interface LayoutInput {
  ratios: number[]
  width: number
  height: number
  /** зазор между картинками */
  gap: number
  /** ширина зазора между половинами (сгиб, если spansFold; иначе = gap) */
  midGap: number
  /** контейнер лежит на обеих страницах: картинки не заходят в центральную полосу midGap */
  spansFold: boolean
  /** высота зоны подписи под картинкой (0 — без подписей) */
  captionH: number
  /** длины подписей (знаков) — для оценки читаемости; без них подписи считаются короткими (только маркеры) */
  captionLens?: number[]
  /** кегль подписи, px — для оценки числа строк */
  capFontPx?: number
  /** ширина, на которую подпись «съедает» маркер (кружок буквы), px */
  markerW?: number
  /** «пиксель мокапа» — для порогов размера картинки */
  unit?: number
  /** прежний победитель (гистерезис при ресайзе) */
  prev?: string | null
}

export interface Placed2 { cell: Box; photo: Box; caption: Box | null }
export interface Metrics {
  fill: number          // доля контейнера под картинками
  balance: number       // min/max площадей
  smallShare: number    // площадь самой мелкой относительно «равной доли» контейнера
  cellUse: number       // средняя доля ячейки, занятая картинкой (пустые подложки)
  captionOk: number     // доля подписей, влезающих в 2 строки
  minSide: number       // меньшая сторона самой мелкой картинки, px
  align: number         // доля картинок на общей линии подписей
}
export interface Scored { name: string; score: number; placed: Placed2[]; metrics: Metrics; valid: boolean; why?: string }
export interface Choice extends Scored { all: { name: string; score: number; valid: boolean }[] }

const P = (side: PaneSpec['side'], items: number[], arr: ArrKind): PaneSpec => ({ side, items, arr })

/** Кандидаты по числу картинок. ПОРЯДОК важен только как тай-брейк при почти равных очках. */
export function layoutCandidates(n: number, spansFold: boolean): Candidate[] {
  if (n <= 0) return []
  if (n === 1) return [{ name: 'single', panes: [P('ALL', [0], 'one')] }]
  const out: Candidate[] = []
  if (n === 2) {
    out.push({ name: 'pages-1|1', panes: [P('L', [0], 'one'), P('R', [1], 'one')] })
    if (!spansFold) out.push({ name: 'row2', panes: [P('ALL', [0, 1], 'row')] }, { name: 'col2', panes: [P('ALL', [0, 1], 'col')] })
    return out
  }
  if (n === 3) {
    out.push(
      { name: 'L1|R2row', panes: [P('L', [0], 'one'), P('R', [1, 2], 'row')] },
      { name: 'L1|R2col', panes: [P('L', [0], 'one'), P('R', [1, 2], 'col')] },
      { name: 'L2row|R1', panes: [P('L', [0, 1], 'row'), P('R', [2], 'one')] },
      { name: 'L2col|R1', panes: [P('L', [0, 1], 'col'), P('R', [2], 'one')] },
      { name: 'L1|R2colEq', panes: [P('L', [0], 'one'), P('R', [1, 2], 'colEq')] },
      { name: 'L2colEq|R1', panes: [P('L', [0, 1], 'colEq'), P('R', [2], 'one')] })
    if (!spansFold) out.push({ name: 'row3', panes: [P('ALL', [0, 1, 2], 'row')] }, { name: 'row3eq', panes: [P('ALL', [0, 1, 2], 'rowEq')] })
    return out
  }
  // 4 (и больше — первые четыре не придумываем: AdaptiveMedia зовётся для 2–4)
  out.push(
    { name: 'row4', panes: [P('L', [0, 1], 'row'), P('R', [2, 3], 'row')] },
    { name: 'grid2x2', panes: [P('L', [0, 2], 'col'), P('R', [1, 3], 'col')] },
    { name: 'grid2x2eq', panes: [P('L', [0, 2], 'colEq'), P('R', [1, 3], 'colEq')] },
    { name: 'row4eq', panes: [P('L', [0, 1], 'rowEq'), P('R', [2, 3], 'rowEq')] },
    { name: 'pages-stack', panes: [P('L', [0, 1], 'col'), P('R', [2, 3], 'col')] },
    { name: 'hero-L', panes: [P('L', [0], 'one'), P('R', [1, 2, 3], 'col')] },
    { name: 'hero-R', panes: [P('L', [0, 1, 2], 'col'), P('R', [3], 'one')] })
  if (!spansFold) out.push({ name: 'row4all', panes: [P('ALL', [0, 1, 2, 3], 'row')] })
  return out
}

interface PaneBox { x: number; y: number; w: number; h: number }
const paneBox = (side: PaneSpec['side'], o: LayoutInput): PaneBox => {
  const half = Math.max(0, (o.width - o.midGap) / 2)
  if (side === 'ALL') return { x: 0, y: 0, w: o.width, h: o.height }
  return side === 'L' ? { x: 0, y: 0, w: half, h: o.height } : { x: half + o.midGap, y: 0, w: half, h: o.height }
}

/** Разместить панель: вернуть Placed2 для её items (индексы в общем массиве). */
function placePane(spec: PaneSpec, o: LayoutInput, out: Placed2[]) {
  const pb = paneBox(spec.side, o), cap = o.captionH, g = o.gap
  const rs = spec.items.map(i => (o.ratios[i] > 0 && Number.isFinite(o.ratios[i]) ? o.ratios[i] : 1))
  const m = spec.items.length
  const put = (i: number, cell: Box, photo: Box) => {
    out[i] = { cell, photo, caption: cap > 0 ? { x: cell.x, y: photo.y + photo.h, w: cell.w, h: cap } : null }
  }
  if (spec.arr === 'one') {
    const b = containBox(rs[0], pb.w, Math.max(0, pb.h - cap)), y = pb.y + (pb.h - (b.h + cap)) / 2
    put(spec.items[0], { x: pb.x, y, w: pb.w, h: b.h + cap }, { x: pb.x + (pb.w - b.w) / 2, y, w: b.w, h: b.h })
  } else if (spec.arr === 'row') {            // выключной ряд: общая высота, ширины по пропорции
    const sum = rs.reduce((a, b) => a + b, 0)
    const h = Math.max(0, Math.min((pb.w - g * (m - 1)) / sum, pb.h - cap))
    const total = h * sum + g * (m - 1), y = pb.y + (pb.h - (h + cap)) / 2
    let x = pb.x + (pb.w - total) / 2
    rs.forEach((r, k) => { const w = h * r; put(spec.items[k], { x, y, w, h: h + cap }, { x, y, w, h }); x += w + g })
  } else if (spec.arr === 'col') {            // выключная колонка: общая ширина, высоты по пропорции
    const inv = rs.reduce((a, r) => a + 1 / r, 0)
    const w = Math.max(0, Math.min(pb.w, (pb.h - cap * m - g * (m - 1)) / inv))
    const total = w * inv + cap * m + g * (m - 1)
    let y = pb.y + (pb.h - total) / 2
    rs.forEach((r, k) => { const h = w / r, x = pb.x + (pb.w - w) / 2
      put(spec.items[k], { x, y, w, h: h + cap }, { x, y, w, h }); y += h + cap + g })
  } else if (spec.arr === 'rowEq') {          // равные ячейки в ряд: картинка вписана в свою ячейку, прижата к линии подписи
    const cw = (pb.w - g * (m - 1)) / m, zh = Math.max(0, pb.h - cap)
    rs.forEach((r, k) => { const b = containBox(r, cw, zh), x = pb.x + k * (cw + g)
      put(spec.items[k], { x, y: pb.y, w: cw, h: pb.h }, { x: x + (cw - b.w) / 2, y: pb.y + zh - b.h, w: b.w, h: b.h }) })
  } else {                                    // colEq: равные ячейки в колонку
    const ch = (pb.h - g * (m - 1)) / m, zh = Math.max(0, ch - cap)
    rs.forEach((r, k) => { const b = containBox(r, pb.w, zh), y = pb.y + k * (ch + g)
      put(spec.items[k], { x: pb.x, y, w: pb.w, h: ch }, { x: pb.x + (pb.w - b.w) / 2, y: y + zh - b.h, w: b.w, h: b.h }) })
  }
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const EPS = 0.75
const area = (b: Box) => b.w * b.h
const overlap = (a: Box, b: Box) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))

/** Разместить и оценить ОДНОГО кандидата. */
export function scoreCandidate(c: Candidate, o: LayoutInput): Scored {
  const n = o.ratios.length, placed: Placed2[] = new Array(n)
  c.panes.forEach(p => placePane(p, o, placed))
  // единая линия подписей: у панелей-«рядов» (one/row/rowEq) картинки встают на общую линию — нижний край самой высокой
  const rowLike = c.panes.filter(p => p.arr === 'one' || p.arr === 'row' || p.arr === 'rowEq')
  if (rowLike.length > 1) {
    const ids = rowLike.flatMap(p => p.items), base = Math.max(...ids.map(i => placed[i].photo.y + placed[i].photo.h))
    ids.forEach(i => { const d = base - (placed[i].photo.y + placed[i].photo.h); if (d > 0) {
      placed[i].photo.y += d; placed[i].cell.y += d; if (placed[i].caption) placed[i].caption!.y += d } })
  }
  const area0 = Math.max(1, o.width * o.height), u = o.unit ?? 1
  const photos = placed.map(p => p.photo)
  // жёсткие условия: внутри контейнера, без пересечений, не на сгибе
  let why: string | undefined
  const half = o.midGap / 2, cx = o.width / 2
  photos.forEach((b, i) => {
    if (b.w <= 0.5 || b.h <= 0.5) why = why ?? `картинка ${i} нулевая`
    if (b.x < -0.5 || b.y < -0.5 || b.x + b.w > o.width + 0.5 || b.y + b.h + o.captionH > o.height + 0.5) why = why ?? `картинка ${i} вне контейнера`
    if (o.spansFold && b.x < cx + half - 0.5 && b.x + b.w > cx - half + 0.5) why = why ?? `картинка ${i} на сгибе`
  })
  for (let i = 0; i < n && !why; i++) for (let j = i + 1; j < n; j++) if (overlap(placed[i].cell, placed[j].cell) > 1) { why = `ячейки ${i}/${j} пересекаются`; break }
  const areas = photos.map(area), amax = Math.max(...areas), amin = Math.min(...areas)
  const fill = areas.reduce((a, b) => a + b, 0) / area0
  const balance = amax > 0 ? amin / amax : 0
  const smallShare = amin / (area0 / n)
  const cellUse = placed.reduce((s, p) => s + area(p.photo) / Math.max(1, area(p.cell) - (p.caption ? area(p.caption) : 0)), 0) / n
  // подписи: хватает ли ширины на 2 строки
  let captionOk = 1
  if (o.captionH > 0 && o.captionLens) {
    const font = o.capFontPx ?? 28 * u, mw = o.markerW ?? 0
    let ok = 0
    placed.forEach((p, i) => {
      const len = o.captionLens![i] ?? 0, w = Math.max(1, p.cell.w - mw - 12 * u)
      ok += len === 0 || Math.ceil(len * 0.52 * font / w) <= 2 ? 1 : 0
    })
    captionOk = ok / n
  }
  const minSide = Math.min(...photos.map(b => Math.min(b.w, b.h)))
  // общая линия подписей: картинки, чей нижний край совпал с нижним краем другой (или единственная)
  const bottoms = photos.map(b => b.y + b.h)
  const align = n === 1 ? 1 : bottoms.filter((y, i) => bottoms.some((z, j) => j !== i && Math.abs(z - y) < 1.5)).length / n
  const metrics: Metrics = { fill, balance, smallShare, cellUse, captionOk, minSide, align }
  const fillS = clamp01(fill / 0.5), balS = clamp01(balance / 0.4), smallS = clamp01(smallShare / 0.6),
    useS = clamp01((cellUse - 0.45) / 0.35), sizeS = clamp01(minSide / (130 * u))
  const score = why ? -1 : 100 * (0.32 * fillS + 0.20 * balS + 0.13 * smallS + 0.11 * useS + 0.09 * captionOk + 0.07 * sizeS + 0.08 * align)
  return { name: c.name, score, placed, metrics, valid: !why, why }
}

/** Выбрать лучшую раскладку. Детерминированно: максимум очков; при разнице < EPS — раньше в списке; с `prev` — гистерезис 3 очка. */
export function chooseLayout(o: LayoutInput): Choice | null {
  const n = o.ratios.length
  if (n === 0) return null
  const scored = layoutCandidates(n, o.spansFold).map(c => scoreCandidate(c, o))
  let best = scored[0]
  for (const s of scored) if (s.valid && (!best.valid || s.score > best.score + EPS)) best = s
  if (o.prev) {
    const p = scored.find(s => s.name === o.prev)
    if (p && p.valid && p.score >= best.score - 3) best = p
  }
  return { ...best, all: scored.map(s => ({ name: s.name, score: Math.round(s.score * 10) / 10, valid: s.valid })) }
}

