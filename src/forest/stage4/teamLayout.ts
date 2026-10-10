// ═══ «Ответы команд» в разборах Леса: раскладка под любое число команд (чистые функции, без DOM) ═══
// Утверждённые кадры лаборатории — потолок: на шести командах колонка и полоса ровно такие, как в лаборатории;
// дальше строки ужимаются (колонка справа: > 7 — ниже строки, > 12 — две колонки; полоса снизу: > 6 — два-три ряда).
// Всё считается в кадре 1920×1080 (оболочка ForestFrame масштабирует кадр в окно).

/** Колонка справа (обычные вопросы): кадр x 1290…1870, y 92…1050 */
export type ColLay = {
  cols: number
  /** высота строки (px); null — как в лаборатории (min-height 118, растёт по содержимому) */
  rowH: number | null
  gap: number
  nameFs: number; txtFs: number; mk: number
  /** строк текста ответа (дальше — многоточие) */
  txtLines: number
  /** отступ слева внутри листа (у узкого листа меньше) */
  padL: number
}
export const COL = { left: 1290, top: 92, width: 580, bottom: 1050, head: 56 }

export function teamColLayout(n: number): ColLay {
  if (n <= 7) return { cols: 1, rowH: null, gap: 8, nameFs: 21, txtFs: 32, mk: 56, txtLines: 2, padL: 44 }
  const cols = n <= 12 ? 1 : 2
  const rows = Math.ceil(n / cols), gap = n <= 12 ? 6 : 5
  const rowH = Math.floor((COL.bottom - COL.top - COL.head - gap * (rows - 1)) / rows)
  const k = Math.min(1, rowH / 118)
  if (cols === 1) return { cols, rowH, gap, nameFs: Math.round(Math.max(15, 21 * Math.sqrt(k))), txtFs: Math.round(Math.max(20, 32 * k)), mk: Math.round(Math.max(30, 56 * k)), txtLines: rowH >= 90 ? 2 : 1, padL: 34 }
  return { cols, rowH, gap, nameFs: rowH >= 60 ? 15 : 13, txtFs: rowH >= 60 ? 20 : 17, mk: rowH >= 60 ? 30 : 24, txtLines: 1, padL: 22 }
}
/** Высота колонки целиком (для проверки «не вылезает за кадр») */
export function teamColHeight(n: number, L = teamColLayout(n)): number {
  const rows = Math.ceil(n / L.cols), rh = L.rowH ?? 118
  return COL.head + rows * rh + Math.max(0, rows - 1) * L.gap
}

/** Полоса снизу (Сопоставление, Порядок): кадр x 60…1860, низ ≤ 1068 */
export type StripLay = {
  cols: number; rows: number
  /** ширина карточки; null — как в лаборатории (6 колонок 1fr) */
  cw: number | null
  rowH: number; gap: number
  nameFs: number; txtFs: number; mk: number
  /** насколько вся полоса выше лабораторной (сцена поднимается на столько же) */
  lift: number
  height: number
}
export const STRIP = { left: 60, width: 1800, gap: 10, labH: 100 }
export function stripLayout(n: number): StripLay {
  if (n <= 0) return { cols: 0, rows: 0, cw: null, rowH: 0, gap: 0, nameFs: 17, txtFs: 25, mk: 34, lift: 0, height: 0 }
  if (n === 6) return { cols: 6, rows: 1, cw: null, rowH: STRIP.labH, gap: 10, nameFs: 17, txtFs: 25, mk: 34, lift: 0, height: STRIP.labH }
  const rows = n <= 6 ? 1 : n <= 12 ? 2 : n <= 24 ? 3 : 4
  const cols = Math.ceil(n / rows)
  const lab = (STRIP.width - STRIP.gap * 5) / 6
  const cw = Math.min(rows === 1 ? lab : 440, Math.floor((STRIP.width - STRIP.gap * (cols - 1)) / cols))
  const rowH = rows === 1 ? STRIP.labH : rows === 2 ? 56 : rows === 3 ? 40 : 32
  const gap = rows === 1 ? 10 : 6
  const height = rows * rowH + (rows - 1) * gap
  const f = rows === 1 ? [17, 25, 34] : rows === 2 ? [15, 21, 30] : rows === 3 ? [13, 17, 24] : [12, 15, 22]
  return { cols, rows, cw, rowH, gap, nameFs: f[0], txtFs: f[1], mk: f[2], lift: Math.max(0, height - STRIP.labH), height }
}

/** Кегль, при котором текст (оценка: средняя ширина знака ≈ k·кегль) влезает в `lines` строк шириной `w`. */
export function fitFs(text: string, w: number, base: number, lines: number, min = Math.round(base * 0.6), k = 0.52): number {
  const len = Math.max(1, text.length)
  for (let fs = base; fs > min; fs -= 1) if (Math.ceil((len * k * fs) / w) <= lines) return fs
  return min
}
