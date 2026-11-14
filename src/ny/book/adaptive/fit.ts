// ═══ AdaptiveText: подбор кегля — ЧИСТОЕ ядро (прототип этапа C, ADAPTIVE.md) ═══
// Измерение делает вызывающий (реальный DOM: offsetHeight / Range — hooks/useFitText), здесь — только поиск наибольшего кегля из
// [min, max], при котором текст помещается. Не зависит от числа знаков, не использует transform: scale.

export interface FitRange { min: number; max: number }
export interface FitResult {
  /** выбранный кегль, px (шаг 0.5) */
  size: number
  /** true — даже на минимуме не помещается (диагностическая ошибка, текст НЕ режем и не прячем) */
  overflow: boolean
  /** сколько замеров понадобилось */
  steps: number
}

const STEP = 0.5
const snap = (v: number) => Math.floor(v / STEP) * STEP

/** Наибольший кегль в [min, max], для которого fits(px) === true. fits должна быть монотонной (больше кегль — труднее поместиться). */
export function fitFontSize(range: FitRange, fits: (px: number) => boolean): FitResult {
  const min = Math.max(1, range.min), max = Math.max(min, range.max)
  let steps = 1
  if (fits(max)) return { size: max, overflow: false, steps }
  steps++
  if (!fits(min)) return { size: min, overflow: true, steps }
  let lo = min, hi = max
  while (hi - lo > STEP) {
    const mid = snap((lo + hi) / 2)
    if (mid <= lo) break
    steps++
    if (fits(mid)) lo = mid; else hi = mid
  }
  return { size: lo, overflow: false, steps }
}

/** Роли текста и допустимые кегли в «пикселях мокапа» (умножаются на bookUnit). Минимум — предел читаемости с дальних столов. */
export const TEXT_ROLES = {
  /** вопрос без картинок: большая область */
  plain: { min: 28, max: 96 },
  /** вопрос рядом с картинкой (колонка страницы) */
  split: { min: 28, max: 90 },
  /** вопрос над рядом картинок/вариантов */
  above: { min: 26, max: 60 },
} as const
export type TextRole = keyof typeof TEXT_ROLES

/** Целевой (потолочный) кегль по иерархии и ДЛИНЕ текста, px мокапа: короткий вопрос не раздувается до предела рамки.
 *  Лесенка непрерывная по длине (линейная интерполяция между опорами), поэтому соседние длины не дают скачков. Измерение (fitFontSize)
 *  по-прежнему может ТОЛЬКО уменьшить кегль, если текст не влезает в область, — но «наибольший влезающий» больше не критерий. */
const TARGETS: Record<TextRole, [number, number][]> = {
  //            знаков → кегль
  plain: [[0, 84], [30, 84], [70, 72], [130, 62], [220, 52], [340, 44]],
  split: [[0, 88], [14, 84], [40, 72], [90, 58], [170, 46], [300, 38]],
  above: [[0, 54], [40, 52], [100, 46], [180, 40], [300, 34]],
}
export function targetSize(role: TextRole, len: number): number {
  const t = TARGETS[role], n = Math.max(0, len)
  if (n <= t[0][0]) return t[0][1]
  for (let i = 1; i < t.length; i++) if (n <= t[i][0]) { const [x0, y0] = t[i - 1], [x1, y1] = t[i]; return y0 + (y1 - y0) * (n - x0) / (x1 - x0) }
  return t[t.length - 1][1]
}

/** Диапазон для fitFontSize: min — предел читаемости, max — целевой кегль по длине (если длина не задана — прежний предел роли). */
export const roleRange = (role: TextRole, unit: number, len?: number): FitRange => {
  const r = TEXT_ROLES[role], max = len == null ? r.max : Math.min(r.max, Math.max(r.min, targetSize(role, len)))
  return { min: r.min * unit, max: max * unit }
}
