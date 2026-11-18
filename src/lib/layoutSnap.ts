// ═══ Умные направляющие редактора компоновки («как в PowerPoint»): ЧИСТАЯ математика, без DOM и сети ═══
// Привязка краёв/центров к краям/центрам других рамок и к линиям страницы, привязка размера («те же размеры»),
// равные интервалы между тремя и более рамками, выравнивание/распределение выбранных рамок.
// Всё считается в долях экрана (тот же Rect, что в layoutRects) и ничего нового в хранилище не добавляет: результат — те же рамки.
import type { Rect } from './layoutRects'
import { workAreaFractions } from './layoutArea'

export type Axis = 'x' | 'y'
/** Направляющая: при axis='x' — вертикальная линия в x=at, тянется по y от from до to (и наоборот). */
export interface GuideLine { axis: Axis; at: number; from: number; to: number }
/** Отрезок равного интервала: между from и to по оси axis, на перпендикулярной координате at. */
export interface GapMark { axis: Axis; from: number; to: number; at: number }
export interface SnapResult {
  rect: Rect
  lines: GuideLine[]
  gaps: GapMark[]
  /** индексы чужих рамок, чья ширина/высота теперь равна нашей (только при растягивании) */
  sameW: number[]; sameH: number[]
  /** на какой оси сработала привязка (для тестов/индикации) */
  snapped: { x: boolean; y: boolean }
}
export interface SnapCfg {
  /** порог в долях экрана по каждой оси (px экрана / размер области) */
  thrX: number; thrY: number
  /** линии страницы: центр экрана, центры страниц, края рабочей области */
  pageX: number[]; pageY: number[]
}

export const EPS = 1e-4
/** Порог привязки в пикселях экрана. */
export const SNAP_PX = 6

/** Линии «страницы» темы (доли экрана): центр, края рабочей области; у Книги — центры левой и правой страниц (сгиб = центр экрана, ориентир, не запрет). */
export function pageLines(theme: string | undefined): { x: number[]; y: number[] } {
  const a = workAreaFractions(theme)
  const x = [0.5, a.x, a.x + a.w]
  if (theme === 'ny_book') x.push(a.x + a.w / 4, a.x + (a.w * 3) / 4)
  const y = [0.5, a.y, a.y + a.h, a.y + a.h / 2]
  return { x: dedupe(x), y: dedupe(y) }
}
const dedupe = (v: number[]) => [...new Set(v.map(n => Math.round(n * 1e6) / 1e6))]

// ── работа по оси: pos/size вдоль неё и вдоль перпендикуляра ──
const P = (r: Rect, a: Axis) => (a === 'x' ? r.x : r.y)
const S = (r: Rect, a: Axis) => (a === 'x' ? r.w : r.h)
const Q = (r: Rect, a: Axis) => (a === 'x' ? r.y : r.x)       // начало по перпендикуляру
const QS = (r: Rect, a: Axis) => (a === 'x' ? r.h : r.w)
const other = (a: Axis): Axis => (a === 'x' ? 'y' : 'x')
const withP = (r: Rect, a: Axis, v: number): Rect => (a === 'x' ? { ...r, x: v } : { ...r, y: v })
const withS = (r: Rect, a: Axis, v: number): Rect => (a === 'x' ? { ...r, w: v } : { ...r, h: v })
const overlapPerp = (a: Rect, b: Rect, ax: Axis) => Math.min(Q(a, ax) + QS(a, ax), Q(b, ax) + QS(b, ax)) - Math.max(Q(a, ax), Q(b, ax)) > EPS

interface Cand { delta: number; gaps?: GapMark[] }

/** Кандидаты равных интервалов для начала рамки m по оси ax (m двигается целиком). Возвращает НОВЫЕ позиции начала. */
function spacingStarts(m: Rect, others: Rect[], ax: Axis): { pos: number; gaps: GapMark[] }[] {
  const row = others.filter(o => overlapPerp(m, o, ax)).sort((a, b) => P(a, ax) - P(b, ax))
  const out: { pos: number; gaps: GapMark[] }[] = []
  const size = S(m, ax), at = Q(m, ax) + QS(m, ax) / 2
  const gapsList: { g: number; from: number; to: number; at: number }[] = []
  for (let i = 0; i + 1 < row.length; i++) {
    const a = row[i], b = row[i + 1], g = P(b, ax) - (P(a, ax) + S(a, ax))
    if (g >= -EPS) gapsList.push({ g, from: P(a, ax) + S(a, ax), to: P(b, ax), at: Q(a, ax) + QS(a, ax) / 2 })
  }
  // между двумя соседями: поровну слева и справа
  for (const gp of gapsList) {
    const free = gp.g - size
    if (free >= 0) { const pos = gp.from + free / 2; out.push({ pos, gaps: [{ axis: ax, from: gp.from, to: pos, at }, { axis: ax, from: pos + size, to: gp.to, at }] }) }
  }
  // продолжение ряда: тот же интервал, что уже есть между другими, — справа от рамки b и слева от рамки a
  for (const ref of gapsList) {
    for (const b of row) {
      const end = P(b, ax) + S(b, ax)
      out.push({ pos: end + ref.g, gaps: [{ axis: ax, from: ref.from, to: ref.to, at: ref.at }, { axis: ax, from: end, to: end + ref.g, at }] })
      const start = P(b, ax)
      out.push({ pos: start - ref.g - size, gaps: [{ axis: ax, from: ref.from, to: ref.to, at: ref.at }, { axis: ax, from: start - ref.g, to: start, at }] })
    }
  }
  return out
}

/** Кандидаты для ПРАВОГО/нижнего края при растягивании (начало зафиксировано): интервал до соседа справа равен уже существующему. */
function spacingEnds(m: Rect, others: Rect[], ax: Axis): { pos: number; gaps: GapMark[] }[] {
  const row = others.filter(o => overlapPerp(m, o, ax)).sort((a, b) => P(a, ax) - P(b, ax))
  const out: { pos: number; gaps: GapMark[] }[] = []
  const at = Q(m, ax) + QS(m, ax) / 2, start = P(m, ax)
  const refs: { g: number; from: number; to: number; at: number }[] = []
  for (let i = 0; i + 1 < row.length; i++) {
    const a = row[i], b = row[i + 1], g = P(b, ax) - (P(a, ax) + S(a, ax))
    if (g >= -EPS) refs.push({ g, from: P(a, ax) + S(a, ax), to: P(b, ax), at: Q(a, ax) + QS(a, ax) / 2 })
  }
  for (const b of row) {
    if (P(b, ax) < start) {
      // слева от нас стоит b: зазор b→m тоже может быть эталоном для зазора m→c справа
      const g0 = start - (P(b, ax) + S(b, ax))
      if (g0 >= -EPS) for (const c of row) if (P(c, ax) > start && c !== b) out.push({ pos: P(c, ax) - g0, gaps: [{ axis: ax, from: P(b, ax) + S(b, ax), to: start, at }, { axis: ax, from: P(c, ax) - g0, to: P(c, ax), at }] })
    }
    for (const ref of refs) if (P(b, ax) >= start) out.push({ pos: P(b, ax) - ref.g, gaps: [{ axis: ax, from: ref.from, to: ref.to, at: ref.at }, { axis: ax, from: P(b, ax) - ref.g, to: P(b, ax), at }] })
  }
  return out
}

const targetsOf = (others: Rect[], page: number[], ax: Axis): number[] => {
  const t = [...page]
  for (const o of others) t.push(P(o, ax), P(o, ax) + S(o, ax) / 2, P(o, ax) + S(o, ax))
  return t
}

/** Лучший сдвиг из кандидатов в пределах порога (меньший по модулю; при равенстве — первый). */
function pick(cands: Cand[], thr: number): Cand | null {
  let best: Cand | null = null
  for (const c of cands) if (Math.abs(c.delta) <= thr + EPS && (!best || Math.abs(c.delta) < Math.abs(best.delta) - 1e-9)) best = c
  return best
}

/** Направляющие, на которые рамка r (после привязки) действительно встала: края/центры, совпавшие с краями/центрами других рамок и линиями страницы. */
export function guideLines(r: Rect, others: Rect[], cfg: Pick<SnapCfg, 'pageX' | 'pageY'>): GuideLine[] {
  const lines: GuideLine[] = []
  for (const ax of ['x', 'y'] as Axis[]) {
    const own = [P(r, ax), P(r, ax) + S(r, ax) / 2, P(r, ax) + S(r, ax)]
    const page = ax === 'x' ? cfg.pageX : cfg.pageY
    const add = (at: number, from: number, to: number) => {
      const ex = lines.find(l => l.axis === ax && Math.abs(l.at - at) < EPS)
      if (ex) { ex.from = Math.min(ex.from, from); ex.to = Math.max(ex.to, to) } else lines.push({ axis: ax, at, from, to })
    }
    for (const e of own) {
      for (const p of page) if (Math.abs(p - e) < EPS) add(p, 0, 1)
      for (const o of others) for (const t of [P(o, ax), P(o, ax) + S(o, ax) / 2, P(o, ax) + S(o, ax)]) {
        if (Math.abs(t - e) < EPS) add(t, Math.min(Q(r, ax), Q(o, ax)), Math.max(Q(r, ax) + QS(r, ax), Q(o, ax) + QS(o, ax)))
      }
    }
  }
  return lines
}

const clampInto = (r: Rect): Rect => ({ ...r, x: Math.min(1 - r.w, Math.max(0, r.x)), y: Math.min(1 - r.h, Math.max(0, r.y)) })

/** Привязка при ПЕРЕТАСКИВАНИИ: края и центр рамки (или bbox группы) — к краям/центрам других рамок, линиям страницы и равным интервалам. */
export function snapMove(r: Rect, others: Rect[], cfg: SnapCfg): SnapResult {
  let cur = r; const snapped = { x: false, y: false }; let gaps: GapMark[] = []
  for (const ax of ['x', 'y'] as Axis[]) {
    const thr = ax === 'x' ? cfg.thrX : cfg.thrY
    const own = [P(cur, ax), P(cur, ax) + S(cur, ax) / 2, P(cur, ax) + S(cur, ax)]
    const cands: Cand[] = []
    for (const t of targetsOf(others, ax === 'x' ? cfg.pageX : cfg.pageY, ax)) for (const e of own) cands.push({ delta: t - e })
    for (const s of spacingStarts(cur, others, ax)) cands.push({ delta: s.pos - P(cur, ax), gaps: s.gaps })
    const c = pick(cands, thr)
    if (c) { cur = withP(cur, ax, P(cur, ax) + c.delta); snapped[ax] = true; if (c.gaps) gaps = gaps.concat(c.gaps) }
  }
  cur = clampInto(cur)
  return { rect: cur, lines: guideLines(cur, others, cfg), gaps, sameW: [], sameH: [], snapped }
}

/** Привязка при РАСТЯГИВАНИИ углом ◢: правый/нижний край — к линиям; ширина/высота — к ширине/высоте других рамок; интервал до соседа — равный существующим. */
export function snapResize(r: Rect, others: Rect[], cfg: SnapCfg): SnapResult {
  let cur = r; const snapped = { x: false, y: false }; let gaps: GapMark[] = []
  for (const ax of ['x', 'y'] as Axis[]) {
    const thr = ax === 'x' ? cfg.thrX : cfg.thrY
    const start = P(cur, ax), end = start + S(cur, ax)
    const cands: Cand[] = []
    // размер первым: при равной близости «те же размеры» важнее краёв
    for (const o of others) cands.push({ delta: S(o, ax) - S(cur, ax) })
    for (const t of targetsOf(others, ax === 'x' ? cfg.pageX : cfg.pageY, ax)) cands.push({ delta: t - end })
    for (const s of spacingEnds(cur, others, ax)) cands.push({ delta: s.pos - end, gaps: s.gaps })
    const c = pick(cands, thr)
    if (c) { cur = withS(cur, ax, Math.max(0.0001, S(cur, ax) + c.delta)); snapped[ax] = true; if (c.gaps) gaps = gaps.concat(c.gaps) }
  }
  // не выходим за экран: если привязка вытолкнула край, оставляем исходный размер
  if (cur.x + cur.w > 1 + EPS) cur = { ...cur, w: r.w }
  if (cur.y + cur.h > 1 + EPS) cur = { ...cur, h: r.h }
  const sameW: number[] = [], sameH: number[] = []
  others.forEach((o, i) => { if (Math.abs(o.w - cur.w) < EPS) sameW.push(i); if (Math.abs(o.h - cur.h) < EPS) sameH.push(i) })
  return { rect: cur, lines: guideLines(cur, others, cfg), gaps, sameW, sameH, snapped }
}

// ── Выравнивание и распределение выбранных рамок ──
export type AlignMode = 'left' | 'hcenter' | 'right' | 'top' | 'vmiddle' | 'bottom'

export function bbox(rs: Rect[]): Rect {
  const x = Math.min(...rs.map(r => r.x)), y = Math.min(...rs.map(r => r.y))
  return { x, y, w: Math.max(...rs.map(r => r.x + r.w)) - x, h: Math.max(...rs.map(r => r.y + r.h)) - y }
}

/** Выровнять рамки по границам (центру) их общего охвата. Размеры не меняются. */
export function alignRects(rs: Rect[], mode: AlignMode): Rect[] {
  if (rs.length < 2) return rs
  const b = bbox(rs)
  return rs.map(r => {
    switch (mode) {
      case 'left': return { ...r, x: b.x }
      case 'right': return { ...r, x: b.x + b.w - r.w }
      case 'hcenter': return { ...r, x: b.x + (b.w - r.w) / 2 }
      case 'top': return { ...r, y: b.y }
      case 'bottom': return { ...r, y: b.y + b.h - r.h }
      default: return { ...r, y: b.y + (b.h - r.h) / 2 }
    }
  })
}

/** Одинаковая ширина/высота: размер ПЕРВОЙ выбранной рамки (она — образец); рамка не выходит за экран. */
export function sameSize(rs: Rect[], dim: 'w' | 'h'): Rect[] {
  if (rs.length < 2) return rs
  const v = rs[0][dim]
  return rs.map(r => {
    const n = { ...r, [dim]: v }
    return clampInto(n)
  })
}

/** Распределить по оси: крайние рамки на месте, остальные — с равными промежутками (по порядку на оси). Нужно ≥ 3 рамок. */
export function distribute(rs: Rect[], ax: Axis): Rect[] {
  if (rs.length < 3) return rs
  const order = rs.map((r, i) => ({ r, i })).sort((a, b) => P(a.r, ax) - P(b.r, ax))
  const first = order[0].r, last = order[order.length - 1].r
  const total = P(last, ax) + S(last, ax) - P(first, ax)
  const gap = (total - order.reduce((s, o) => s + S(o.r, ax), 0)) / (order.length - 1)
  const res = rs.slice(); let pos = P(first, ax)
  for (const o of order) { res[o.i] = withP(o.r, ax, pos); pos += S(o.r, ax) + gap }
  return res
}

/** Сдвиг рамки на шаг стрелок (для клавиатуры); остаётся внутри экрана. */
export function nudge(r: Rect, dx: number, dy: number): Rect { return clampInto({ ...r, x: r.x + dx, y: r.y + dy }) }
