// Устойчивый якорь собаки на тумбе пьедестала (10.74). Раньше собака вставала на поверхность по подошве ТЕКУЩЕГО кадра IDLE, а подошва/центр лап у кадров разные
// (Зефир: 257–272 из 283, скачок до 14 строк за кадр; Фрэнк, Рокки, Пупс — до 4–6) — весь спрайт и тени под лапами прыгали вслед за ней («дрыгается, пол дрожит»).
// Теперь точка контакта берётся один раз на собаку — по ТИПИЧНОМУ положению в клипе (медиана), и одинакова для всех кадров IDLE/SELECTED/RETURN: движение, нарисованное
// в самих кадрах, остаётся, а «подпрыгивания» якоря — нет. Чистые функции, без DOM — тест в __tests__/pawAnchor.test.ts.
export interface Paw { x0: number; x1: number; bottom: number }
export interface PawMetric { bottom: number; cx: number; span: number; paws: Paw[] }

const median = (v: number[]) => { const s = v.slice().sort((a, b) => a - b), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2 }

/** Один постоянный якорь по набору замеров кадров клипа: подошва и центр — медианы (целые строки/колонки, без дробей), лапы и размах — у кадра, ближайшего к медианам. */
export function stableAnchor(frames: PawMetric[]): PawMetric | null {
  if (frames.length === 0) return null
  const bottom = Math.round(median(frames.map(f => f.bottom))), cx = Math.round(median(frames.map(f => f.cx)))
  let best = frames[0], bd = Infinity
  for (const f of frames) { const d = Math.abs(f.bottom - bottom) * 4 + Math.abs(f.cx - cx); if (d < bd) { bd = d; best = f } }
  return { bottom, cx, span: best.span, paws: best.paws.map(p => ({ ...p })) }
}
