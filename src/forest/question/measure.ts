// Ширина строки в настоящем шрифте сцены (Philosopher) — для подгонки кегля вопроса под рамку. Без шрифта/холста — оценка.
import { approxMeasure, type Measure } from './layout'

let ctx: CanvasRenderingContext2D | null | undefined
export const fontMeasure: Measure = (text, size) => {
  if (ctx === undefined) { try { ctx = document.createElement('canvas').getContext('2d') } catch { ctx = null } }
  if (!ctx) return approxMeasure(text, size)
  ctx.font = `400 ${size}px Philosopher, sans-serif`
  return ctx.measureText(text).width
}
/** Дождаться шрифта (иначе первая раскладка посчитается по запасному и текст «прыгнет»); не дольше 1.2 с. */
export function fontReady(): Promise<void> {
  try {
    const f = document.fonts
    if (!f?.load) return Promise.resolve()
    return Promise.race([f.load('400 40px Philosopher', 'Аа').then(() => undefined), new Promise<void>(r => setTimeout(r, 1200))]).catch(() => undefined)
  } catch { return Promise.resolve() }
}
