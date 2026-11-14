// ═══ AdaptiveMedia: раскладка 1–4 картинок по реальным пропорциям — ЧИСТЫЕ функции (прототип этапа C, ADAPTIVE.md) ═══
// Вход — размер контейнера и пропорции файлов (naturalWidth/naturalHeight после загрузки). Выход — ячейки, рамки картинок (пропорции
// сохранены ТОЧНО, без растяжения), зоны подписей на ОДНОМ уровне. Картинки не крупнее ячейки; ничего не обрезается и не прячется.

export interface Box { x: number; y: number; w: number; h: number }
export interface Placed {
  /** ячейка сетки (равная у всех в ряду) */
  cell: Box
  /** рамка картинки внутри ячейки: ровно ratio, по центру по X, прижата к зоне подписи (общая линия) */
  photo: Box
  /** зона подписи/маркера под картинкой (одинаковая у всех ячеек, null — без подписей) */
  caption: Box | null
}
export interface MediaPlanOpts {
  ratios: number[]
  width: number
  height: number
  /** зазор между ячейками */
  gap: number
  /** зазор между КОЛОНКАМИ, если контейнер лежит на обеих страницах (сгиб); иначе = gap */
  colGap?: number
  /** высота зоны подписи под картинкой (0 — без подписей) */
  captionH?: number
  /** уравнять визуальный вес: площадь ни одной картинки не больше BALANCE_MAX × площади самой маленькой (пропорции сохраняются; по умолчанию вкл. для n ≥ 2) */
  balance?: boolean
}

/** Во сколько раз самая крупная картинка может превосходить по площади самую мелкую (иначе «узкая» рядом с «широкой» выглядит случайным мусором). */
export const BALANCE_MAX = 2.5

/** Максимальный прямоугольник заданной пропорции (w/h) внутри w×h. */
export function containBox(ratio: number, w: number, h: number): { w: number; h: number } {
  const r = ratio > 0 && Number.isFinite(ratio) ? ratio : 1
  if (w <= 0 || h <= 0) return { w: 0, h: 0 }
  return w / h > r ? { w: h * r, h } : { w, h: w / r }
}

/** Сетка по числу картинок: 1 — одна ячейка; 2 — две в ряд; 3 — три в ряд; 4 — 2×2 (единая сетка, одинаковые ячейки). */
export function gridShape(n: number): { cols: number; rows: number } {
  if (n <= 1) return { cols: 1, rows: 1 }
  if (n === 2) return { cols: 2, rows: 1 }
  if (n === 3) return { cols: 3, rows: 1 }
  return { cols: 2, rows: 2 }          // 4 (5–6 — прежние раскладки, сюда не попадают)
}

export function planMedia(o: MediaPlanOpts): Placed[] {
  const n = o.ratios.length
  if (n === 0) return []
  const { cols, rows } = gridShape(n)
  const colGap = o.colGap ?? o.gap, cap = o.captionH ?? 0
  const cw = Math.max(0, (o.width - colGap * (cols - 1)) / cols)
  const ch = Math.max(0, (o.height - o.gap * (rows - 1)) / rows)
  const zoneH = Math.max(0, ch - cap)
  const fits = o.ratios.map(r => containBox(r, cw, zoneH))
  // баланс веса: ограничиваем площадь самых крупных (шире всех «в рост» ячейки) — каждая остаётся в своей ячейке и со своей пропорцией
  const areas = fits.map(f => f.w * f.h), minA = Math.min(...areas)
  const cap2 = (o.balance ?? n >= 2) && minA > 0 ? minA * BALANCE_MAX : Infinity
  return o.ratios.map((ratio, i) => {
    const c = i % cols, r = Math.floor(i / cols)
    const cell = { x: c * (cw + colGap), y: r * (ch + o.gap), w: cw, h: ch }
    const k = areas[i] > cap2 ? Math.sqrt(cap2 / areas[i]) : 1
    const fit = { w: fits[i].w * k, h: fits[i].h * k }
    const photo = { x: cell.x + (cw - fit.w) / 2, y: cell.y + zoneH - fit.h, w: fit.w, h: fit.h }
    return { cell, photo, caption: cap > 0 ? { x: cell.x, y: cell.y + zoneH, w: cw, h: cap } : null }
  })
}
