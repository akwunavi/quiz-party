// ═══ BookSafeArea: доступная область разворота «Книги» — ЧИСТЫЕ функции (прототип этапа C, ADAPTIVE.md) ═══
// Расширяет geometry.ts (BOOK/SAFE/SCENE), а не дублирует: здесь только то, что нужно раскладке экранов — масштаб книги (--u),
// сдвиг contain-сцены, контентная область под служебной полосой, зона сгиба, зона таймера. Все прямоугольники — в пикселях ОКНА.
import { BOOK, SAFE, SCENE, type Rect } from '../geometry'

/** Ширина зоны сгиба, px сцены: контент (картинки, колонки) не заходит в ±FOLD_GAP/2 от центра разворота. */
export const FOLD_GAP = 120
/** Служебная полоса сверху (до y, px сцены): плашка «раунд, вопрос N/M». Контент начинается ниже. Таймер (260u) ниже этой полосы по высоте, но стоит в УГЛУ
 *  (x ≥ 1524): экраны с картинкой в правом верхнем углу опускают контент до TIMER_BOTTOM сами (CSS 41-ny-book.css, 10.76). TOP_BAND не менялся: от него считаются
 *  сохранённые ручные раскладки (layoutRects.WORK) — сдвиг рабочей области сдвинул бы их все. */
export const TOP_BAND = 208
/** Диаметр таймера в шапке, px сцены (10.76: 260 — размер со скрина ведущего, венок ≈ 253u; было 150). В CSS — `--bk-tm-d`. */
export const TIMER_D = 260
/** Верх слота таймера в сцене (10.76: 44; страница книги с y=50, венок выступает над ней, как на скрине ведущего). В CSS — `--bk-tm-top`. */
export const TOP_Y = 44
/** Правый край слота таймера, px сцены от правого края сцены (10.76: 136 → x = 1784). В CSS — `--bk-tm-right`. */
export const TIMER_RIGHT = 136
/** Низ банта таймера (≈ 44 + 255): ниже этой линии контент правого верхнего угла уже не задевает таймер. В CSS — `--bk-tm-bottom`. */
export const TIMER_BOTTOM = 300

export interface Viewport { w: number; h: number }

/** Масштаб книги = «пиксель мокапа» --u (min по осям, как Stage fit="contain"). */
export const bookUnit = (v: Viewport): number => Math.min(v.w / SCENE.w, v.h / SCENE.h)

/** Сдвиг книжной сцены от края окна (поля на не-16:9): совпадает с --bk-ox/--bk-oy в CSS. */
export function bookOffset(v: Viewport): { u: number; ox: number; oy: number } {
  const u = bookUnit(v)
  return { u, ox: Math.max(0, (v.w - SCENE.w * u) / 2), oy: Math.max(0, (v.h - SCENE.h * u) / 2) }
}

/** Прямоугольник сцены → пиксели окна. */
export function sceneRect(v: Viewport, r: Rect): Rect {
  const { u, ox, oy } = bookOffset(v)
  return { x: ox + r.x * u, y: oy + r.y * u, w: r.w * u, h: r.h * u }
}

/** Книга целиком (корешок/обложка не считаются): страницы разворота. */
export const bookRect = (v: Viewport): Rect => sceneRect(v, BOOK)

/** Контентная область экрана вопроса: между полями декора, ниже служебной полосы, выше среза страниц. */
export function contentArea(v: Viewport): Rect {
  return sceneRect(v, { x: SAFE.x, y: TOP_BAND, w: SCENE.w - 2 * SAFE.x, h: SCENE.h - SAFE.b - TOP_BAND })
}

/** Левая и правая страницы внутри контентной области (между ними — сгиб FOLD_GAP). */
export function pageAreas(v: Viewport): { left: Rect; right: Rect } {
  const c = contentArea(v), u = bookUnit(v)
  const w = (c.w - FOLD_GAP * u) / 2
  return { left: { x: c.x, y: c.y, w, h: c.h }, right: { x: c.x + w + FOLD_GAP * u, y: c.y, w, h: c.h } }
}

/** Зона таймера (резервируется всегда, не зависит от раскладки вопроса). */
export const timerZone = (v: Viewport): Rect =>
  sceneRect(v, { x: SCENE.w - TIMER_RIGHT - TIMER_D, y: TOP_Y, w: TIMER_D, h: TIMER_D })

export const rectRight = (r: Rect) => r.x + r.w
export const rectBottom = (r: Rect) => r.y + r.h

/** Прямоугольник a целиком внутри b (с допуском tol px). */
export const inside = (a: Rect, b: Rect, tol = 1): boolean =>
  a.x >= b.x - tol && a.y >= b.y - tol && rectRight(a) <= rectRight(b) + tol && rectBottom(a) <= rectBottom(b) + tol

/** Площадь пересечения (px²), 0 если не пересекаются. */
export function overlapArea(a: Rect, b: Rect): number {
  const w = Math.min(rectRight(a), rectRight(b)) - Math.max(a.x, b.x)
  const h = Math.min(rectBottom(a), rectBottom(b)) - Math.max(a.y, b.y)
  return w > 0 && h > 0 ? w * h : 0
}

/** Прямоугольник заходит на зону сгиба (центр разворота ± FOLD_GAP/2)? */
export function crossesFold(a: Rect, v: Viewport, tol = 1): boolean {
  const { u, ox } = bookOffset(v)
  const cx = ox + SCENE.w * u / 2, half = FOLD_GAP * u / 2
  return a.x < cx + half - tol && rectRight(a) > cx - half + tol
}

/** Зоны декора сцены (px сцены): гирлянда с бантом, веточки в нижних углах, уголки переплёта. Контент обязан их не пересекать. */
export const DECOR_ZONES: { id: string; r: Rect }[] = [
  { id: 'garland-bow', r: { x: 700, y: 0, w: 520, h: 140 } },
  { id: 'garland-l', r: { x: 450, y: 0, w: 250, h: 92 } }, { id: 'garland-r', r: { x: 1220, y: 0, w: 250, h: 92 } },
  { id: 'sprig-bl', r: { x: 70, y: 955, w: 190, h: 105 } },
  { id: 'sprig-br', r: { x: 1660, y: 965, w: 190, h: 95 } },
  { id: 'corner-tl', r: { x: 30, y: 20, w: 90, h: 90 } }, { id: 'corner-tr', r: { x: 1800, y: 20, w: 90, h: 90 } },
]
export const decorZones = (v: Viewport) => DECOR_ZONES.map(z => ({ id: z.id, rect: sceneRect(v, z.r) }))
