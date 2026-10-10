// Мелочи темы «Волшебный лес»: тон команды из её цвета, цвет подписи.
/** Тон (0–359) из hex-цвета команды — сцена красит свои предметы (фонарь, шар) в тон команды. */
export function hueOf(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return 150
  const n = parseInt(m[1], 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn
  if (d < 0.02) return 150
  const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
  return Math.round(((h * 60) + 360) % 360)
}
/** Цвет подписи команды по тону: мягкий, читается на тёмном лесу. */
export const tcol = (hue: number) => `hsl(${hue} 52% 66%)`
export const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
