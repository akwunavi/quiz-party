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
  plain: { min: 28, max: 120 },
  /** вопрос рядом с картинкой (колонка страницы) */
  split: { min: 28, max: 68 },
  /** вопрос над рядом картинок/вариантов */
  above: { min: 26, max: 58 },
} as const
export type TextRole = keyof typeof TEXT_ROLES

export const roleRange = (role: TextRole, unit: number): FitRange =>
  ({ min: TEXT_ROLES[role].min * unit, max: TEXT_ROLES[role].max * unit })
