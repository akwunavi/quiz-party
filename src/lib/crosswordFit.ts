// ═══ Кроссворд на телефоне игрока: чистая математика без DOM ═══
// Размер клетки по области и сетке, зум, границы прокрутки, «довести слово до видимой зоны»,
// клетка под пальцем. Компонент `PlayerCrossword` только меряет окно и вызывает эти функции.
import type { CrosswordGrid, CrosswordWordPlacement } from '../types/quiz'

export const CW_GAP = 2
export const CW_MIN_CELL = 12
export const CW_MAX_CELL = 48
export const CW_MAX_ZOOM = 3.5

export interface Rect { x: number; y: number; w: number; h: number }

/** Длина ряда из n клеток со щелями. */
export function span(n: number, cell: number, gap = CW_GAP): number {
  return n <= 0 ? 0 : n * cell + (n - 1) * gap
}

/** Максимально крупная целая клетка, при которой вся сетка влезает в область. */
export function fitCellSize(o: {
  areaW: number; areaH: number; cols: number; rows: number
  gap?: number; min?: number; max?: number
}): number {
  const gap = o.gap ?? CW_GAP
  const cols = Math.max(1, o.cols), rows = Math.max(1, o.rows)
  const byW = (o.areaW - (cols - 1) * gap) / cols
  const byH = (o.areaH - (rows - 1) * gap) / rows
  const raw = Math.floor(Math.min(byW, byH))
  const lo = o.min ?? CW_MIN_CELL, hi = o.max ?? CW_MAX_CELL
  return Math.max(lo, Math.min(hi, Number.isFinite(raw) ? raw : lo))
}

/** Высота области сетки: доля РЕАЛЬНОГО видимого окна; при клавиатуре — меньше (остаётся место полю ввода). */
export function panelAreaHeight(visibleH: number, keyboardOpen: boolean): number {
  return Math.max(120, Math.round(visibleH * (keyboardOpen ? 0.42 : 0.5)))
}

/** Клавиатура открыта, если видимое окно заметно ниже «спокойной» высоты. */
export function isKeyboardOpen(visibleH: number, stableH: number): boolean {
  return stableH > 0 && visibleH < stableH * 0.8
}

export function clampZoom(z: number, max = CW_MAX_ZOOM): number {
  return Number.isFinite(z) ? Math.max(1, Math.min(max, z)) : 1
}

/** Масштаб щипка: стартовый зум × (текущее расстояние между пальцами / стартовое). */
export function pinchZoom(startZoom: number, startDist: number, dist: number, max = CW_MAX_ZOOM): number {
  if (!(startDist > 0) || !(dist > 0)) return clampZoom(startZoom, max)
  return clampZoom(startZoom * (dist / startDist), max)
}

/** Двойной тап: от обычного — к удобному увеличению, от увеличенного — назад. */
export function doubleTapZoom(zoom: number): number {
  return zoom > 1.05 ? 1 : 2.2
}

export function clampScroll(s: number, content: number, view: number): number {
  return Math.max(0, Math.min(Math.max(0, content - view), Number.isFinite(s) ? s : 0))
}

/** Новая прокрутка, чтобы точка под пальцем (focus — координата внутри окна) осталась на месте при смене размера. */
export function zoomScroll(o: {
  scroll: number; focus: number; oldContent: number; newContent: number; view: number
}): number {
  if (!(o.oldContent > 0)) return 0
  const ratio = o.newContent / o.oldContent
  return clampScroll((o.scroll + o.focus) * ratio - o.focus, o.newContent, o.view)
}

/** Прямоугольник слова в пикселях содержимого (клетки, рамка — без внешних отступов). */
export function wordRect(w: Pick<CrosswordWordPlacement, 'row' | 'col' | 'dir' | 'word'>, cell: number, gap = CW_GAP): Rect {
  const len = w.word.length
  const across = w.dir === 'across'
  return {
    x: w.col * (cell + gap), y: w.row * (cell + gap),
    w: span(across ? len : 1, cell, gap), h: span(across ? 1 : len, cell, gap),
  }
}

/** Прокрутка по одной оси: если отрезок уже виден с запасом — не трогаем (никаких «прыжков»),
 *  если нет — ставим его по центру, а длинный (больше окна) — начало с запасом. */
export function revealAxis(o: { start: number; size: number; scroll: number; view: number; content: number; margin?: number }): number {
  const m = o.margin ?? 8
  const cur = clampScroll(o.scroll, o.content, o.view)
  if (o.start - m >= cur && o.start + o.size + m <= cur + o.view) return cur
  const target = o.size + 2 * m >= o.view ? o.start - m : o.start + o.size / 2 - o.view / 2
  return clampScroll(target, o.content, o.view)
}

/** Слова, проходящие через клетку (r, c). */
export function wordsAt(grid: CrosswordGrid, r: number, c: number): CrosswordWordPlacement[] {
  return grid.words.filter(w => w.dir === 'across'
    ? r === w.row && c >= w.col && c < w.col + w.word.length
    : c === w.col && r >= w.row && r < w.row + w.word.length)
}

/** Какое слово открыть по тапу: если в клетке пересечение — то, что ещё не открыто (второй тап переключает). */
export function pickWordAt(grid: CrosswordGrid, r: number, c: number, current?: CrosswordWordPlacement): CrosswordWordPlacement | undefined {
  const list = wordsAt(grid, r, c)
  return list.find(w => !(current && w.number === current.number && w.dir === current.dir)) ?? list[0]
}
