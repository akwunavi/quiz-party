// ═══ BookLayoutDiagnostics: проверка раскладки экрана «Книги» — ЧИСТАЯ функция над снимком геометрии (ADAPTIVE.md) ═══
// Не влияет на игру: ничего не меняет и не прячет, только сообщает. Снимок собирает diagnosticsDom.ts (в бою — только по ?bkdiag=1/DEV,
// в стенде и e2e/book/adaptive-check.cjs — всегда). Коды: overflow, outside-safe, overlap, font-min, distortion, timer-shape, fold.
import type { Rect } from '../geometry'
import { crossesFold, inside, overlapArea, type Viewport } from './safeArea'

export interface DiagText { id: string; fontPx: number; minPx: number; rect: Rect; overflow: boolean }
export interface DiagMedia { id: string; rect: Rect; natural: { w: number; h: number } }
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
  timer?: { slot: Rect; art: Rect } | null
  /** прочие критичные блоки (варианты ответов и т.п.), не пересекающие текст и картинки */
  critical?: { id: string; rect: Rect }[]
  /** разрешены ли картинки на сгибе (false — у однострочных сеток, где колонки лежат на разных страницах) */
  mediaMayCrossFold?: boolean
}
export type IssueCode = 'overflow' | 'outside-safe' | 'overlap' | 'font-min' | 'distortion' | 'timer-shape' | 'fold'
export interface DiagIssue { code: IssueCode; id: string; detail: string }

const TOL_RATIO = 0.015   // допуск искажения пропорций картинки, 1.5 %
const TOL_SQUARE = 1      // допуск «квадрат» для таймера, px
const MIN_OVERLAP = 16    // px² — меньше считаем касанием

export function diagnoseLayout(d: DiagInput): DiagIssue[] {
  const out: DiagIssue[] = []
  const push = (code: IssueCode, id: string, detail: string) => out.push({ code, id, detail })

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
    if (!d.mediaMayCrossFold && crossesFold(m.rect, d.viewport, 2)) push('fold', m.id, 'картинка заходит на сгиб')
    if (m.natural.w > 0 && m.natural.h > 0 && m.rect.h > 0) {
      const want = m.natural.w / m.natural.h, got = m.rect.w / m.rect.h
      if (Math.abs(got - want) / want > TOL_RATIO) push('distortion', m.id, `пропорции ${got.toFixed(3)} вместо ${want.toFixed(3)}`)
    }
  }
  if (d.qnum && !inside(d.qnum, d.book, 1)) push('outside-safe', 'qnum', 'плашка вопроса за пределами книги')
  if (d.timer) {
    const { slot, art } = d.timer
    if (Math.abs(slot.w - slot.h) > TOL_SQUARE) push('timer-shape', 'timer-slot', `слот ${slot.w.toFixed(1)}×${slot.h.toFixed(1)} не квадрат`)
    if (Math.abs(art.w - art.h) > TOL_SQUARE) push('timer-shape', 'timer-art', `рисунок ${art.w.toFixed(1)}×${art.h.toFixed(1)} не квадрат`)
    if (!inside(slot, d.book, 1)) push('outside-safe', 'timer-slot', 'таймер за пределами книги')
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
