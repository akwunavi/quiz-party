// ═══ BookLayoutDiagnostics: проверка раскладки экрана «Книги» — ЧИСТАЯ функция над снимком геометрии (ADAPTIVE.md) ═══
// Не влияет на игру: ничего не меняет и не прячет, только сообщает. Снимок собирает diagnosticsDom.ts (в бою — только по ?bkdiag=1/DEV,
// в стенде и e2e/book/adaptive-check.cjs — всегда). Коды: overflow, outside-safe, overlap, font-min, distortion, timer-shape, fold.
import type { Rect } from '../geometry'
import { crossesFold, inside, overlapArea, type Viewport } from './safeArea'

export interface DiagText { id: string; fontPx: number; minPx: number; rect: Rect; overflow: boolean }
export interface DiagMedia { id: string; rect: Rect; natural: { w: number; h: number }
  /** картинке разрешено лежать на сгибе («центральная» композиция одной картинки, поверх — тень сгиба) */
  foldOk?: boolean }
export interface DiagContainer { id: string; scrollW: number; clientW: number; scrollH: number; clientH: number }
export interface DiagInput {
  viewport: Viewport
  /** контентная область (px окна) */
  content: Rect
  /** книга целиком (px окна) — шапка/таймер обязаны лежать внутри */
  book: Rect
  texts: DiagText[]
  media: DiagMedia[]
  containers: DiagContainer[]
  /** служебные элементы шапки: плашка вопроса */
  qnum?: Rect | null
  /** таймер: слот и видимый рисунок (оба обязаны быть квадратами) */
  timer?: { slot: Rect; art: Rect; /** ожидаемое w/h рисунка: розетка 1; будущий ассет (почти квадрат с ветками и бантом) — своя фиксированная пропорция из data-art-ratio слота */ artRatio?: number } | null
  /** прочие критичные блоки (варианты ответов и т.п.), не пересекающие текст и картинки */
  critical?: { id: string; rect: Rect }[]
  /** разрешены ли картинки на сгибе (false — у однострочных сеток, где колонки лежат на разных страницах) */
  mediaMayCrossFold?: boolean
  /** подписи под картинками: кегль и не обрезаны ли */
  captions?: { id: string; fontPx: number; minPx: number; overflow: boolean }[]
  /** зоны декора (px окна) */
  decor?: { id: string; rect: Rect }[]
  /** контейнеры AdaptiveMedia (px окна): под ними считается неиспользованная площадь */
  mediaBoxes?: { id: string; rect: Rect }[]
  /** «пиксель мокапа» (для порогов) */
  unit?: number
}
export type IssueCode = 'overflow' | 'outside-safe' | 'overlap' | 'font-min' | 'distortion' | 'timer-shape' | 'fold'
  | 'decor' | 'caption' | 'unused-area' | 'small-photo' | 'imbalance' | 'empty-area'
/** error — ломает экран (наложение, обрезка, искажение); warn — композиция слабая (мало места под картинки, пустоты) — сообщаем, но НЕ «заполняем всё место». */
export type Severity = 'error' | 'warn'
export interface DiagIssue { code: IssueCode; id: string; detail: string; severity: Severity }
const WARN: ReadonlySet<IssueCode> = new Set(['unused-area', 'small-photo', 'imbalance', 'empty-area'])
export const isWarn = (i: DiagIssue) => i.severity === 'warn'

const TOL_RATIO = 0.015   // допуск искажения пропорций картинки, 1.5 %
const TOL_SQUARE = 1      // допуск «квадрат» для таймера, px
const MIN_OVERLAP = 16    // px² — меньше считаем касанием

export function diagnoseLayout(d: DiagInput): DiagIssue[] {
  const out: DiagIssue[] = []
  const push = (code: IssueCode, id: string, detail: string) => out.push({ code, id, detail, severity: WARN.has(code) ? 'warn' : 'error' })

  for (const c of d.containers) {
    if (c.scrollW > c.clientW + 1 || c.scrollH > c.clientH + 1)
      push('overflow', c.id, `контент ${c.scrollW}×${c.scrollH} > контейнер ${c.clientW}×${c.clientH}`)
  }
  for (const t of d.texts) {
    if (t.overflow) push('overflow', t.id, 'текст не помещается даже на минимальном кегле')
    if (t.fontPx + 0.01 < t.minPx) push('font-min', t.id, `кегль ${t.fontPx.toFixed(1)} px < минимума ${t.minPx.toFixed(1)} px`)
    if (!inside(t.rect, d.content, 2)) push('outside-safe', t.id, 'текст вне безопасной области')
  }
  for (const m of d.media) {
    if (!inside(m.rect, d.content, 2)) push('outside-safe', m.id, 'картинка вне безопасной области')
    if (!d.mediaMayCrossFold && !m.foldOk && crossesFold(m.rect, d.viewport, 2)) push('fold', m.id, 'картинка заходит на сгиб')
    if (m.natural.w > 0 && m.natural.h > 0 && m.rect.h > 0) {
      const want = m.natural.w / m.natural.h, got = m.rect.w / m.rect.h
      if (Math.abs(got - want) / want > TOL_RATIO) push('distortion', m.id, `пропорции ${got.toFixed(3)} вместо ${want.toFixed(3)}`)
    }
  }
  if (d.qnum && !inside(d.qnum, d.book, 1)) push('outside-safe', 'qnum', 'плашка вопроса за пределами книги')
  if (d.timer) {
    const { slot, art } = d.timer
    if (Math.abs(slot.w - slot.h) > TOL_SQUARE) push('timer-shape', 'timer-slot', `слот ${slot.w.toFixed(1)}×${slot.h.toFixed(1)} не квадрат`)
    const want = d.timer.artRatio ?? 1
    if (art.h > 0 && (want === 1 ? Math.abs(art.w - art.h) > TOL_SQUARE : Math.abs(art.w / art.h - want) / want > 0.01))
      push('timer-shape', 'timer-art', `рисунок ${art.w.toFixed(1)}×${art.h.toFixed(1)}: пропорция ${(art.w / (art.h || 1)).toFixed(3)} вместо ${want}`)
    if (!inside(slot, d.book, 1)) push('outside-safe', 'timer-slot', 'таймер за пределами книги')
  }
  // подписи: кегль не мельче минимума, не обрезаны
  for (const c of d.captions ?? []) {
    if (c.overflow) push('caption', c.id, 'подпись не помещается в отведённую зону (обрезана)')
    if (c.fontPx + 0.01 < c.minPx) push('caption', c.id, `кегль подписи ${c.fontPx.toFixed(1)} px < минимума ${c.minPx.toFixed(1)} px`)
  }
  // декор: контент не заходит на гирлянду, веточки, уголки
  for (const z of d.decor ?? []) {
    for (const it of [...d.texts.map(t => ({ id: t.id, rect: t.rect })), ...d.media.map(m => ({ id: m.id, rect: m.rect })), ...(d.qnum ? [{ id: 'qnum', rect: d.qnum }] : []), ...(d.timer ? [{ id: 'timer-slot', rect: d.timer.slot }] : [])])
      if (overlapArea(it.rect, z.rect) > MIN_OVERLAP) push('decor', `${it.id}×${z.id}`, `заходит на декор «${z.id}»`)
  }
  // композиция (предупреждения): неиспользуемая площадь, мелкие/несбалансированные картинки, большие пустоты — без требования «заполнить всё»
  const u = d.unit ?? 1
  for (const b of d.mediaBoxes ?? []) {
    const inBox = d.media.filter(m => overlapArea(m.rect, b.rect) > 0), used = inBox.reduce((s, m) => s + m.rect.w * m.rect.h, 0), A = b.rect.w * b.rect.h
    if (A > 0 && inBox.length && used / A < 0.28) push('unused-area', b.id, `картинки занимают ${(100 * used / A).toFixed(0)} % отведённой площади`)
  }
  if (d.media.length) {
    const ar = d.media.map(m => m.rect.w * m.rect.h), cA = d.content.w * d.content.h
    if (d.media.length > 1 && Math.max(...ar) / Math.min(...ar) > 3.5) push('imbalance', 'media', `площади картинок различаются в ${(Math.max(...ar) / Math.min(...ar)).toFixed(1)} раза`)
    d.media.forEach((m, i) => { if (Math.min(m.rect.w, m.rect.h) < 110 * u || ar[i] / cA < 0.05) push('small-photo', m.id, `картинка мелкая: ${m.rect.w.toFixed(0)}×${m.rect.h.toFixed(0)} px (${(100 * ar[i] / cA).toFixed(1)} % области)`) })
    // пустота: доля высоты контентной области, не занятой ни текстом, ни картинками (по объединению вертикальных отрезков)
    const spans = [...d.texts.map(t => t.rect), ...d.media.map(m => m.rect)].map(r => [r.y, r.y + r.h] as [number, number]).sort((a, b) => a[0] - b[0])
    let covered = 0, cur: [number, number] | null = null
    for (const s2 of spans) { if (!cur || s2[0] > cur[1]) { if (cur) covered += cur[1] - cur[0]; cur = [s2[0], s2[1]] } else cur[1] = Math.max(cur[1], s2[1]) }
    if (cur) covered += cur[1] - cur[0]
    if (1 - covered / d.content.h > 0.5) push('empty-area', 'content', `не занято ${(100 * (1 - covered / d.content.h)).toFixed(0)} % высоты области`)
  }
  // пересечения критичных элементов: текст/картинки/плашка/таймер/варианты — попарно
  const items: { id: string; rect: Rect }[] = [
    ...d.texts.map(t => ({ id: t.id, rect: t.rect })), ...d.media.map(m => ({ id: m.id, rect: m.rect })),
    ...(d.qnum ? [{ id: 'qnum', rect: d.qnum }] : []), ...(d.timer ? [{ id: 'timer-slot', rect: d.timer.slot }] : []), ...(d.critical ?? []),
  ]
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const a = overlapArea(items[i].rect, items[j].rect)
    if (a > MIN_OVERLAP) push('overlap', `${items[i].id}×${items[j].id}`, `пересечение ${Math.round(a)} px²`)
  }
  return out
}
