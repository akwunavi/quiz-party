// ═══ Лобби «Полуночный праздник»: геометрия сцены ═══
// Лунные ворота в центре, верёвки с огоньками расходятся от столбов; фонари команд висят на верёвках, имя — снаружи от фонаря.
// Места зависят от ЧИСЛА команд (до 24); неиспользованных мест в кадре нет. Раскладка — чистая функция, без сети и без случайности.
export const GATE = { x: 960, y: 592, rx: 250, ry: 270 }
export const PL = 704, PR = 1216
type Rope = { py: number; ey: number }
/** три верёвки на сторону (до 12 команд) или четыре, потеснее (до 24) */
export const ROPES3: Rope[] = [{ py: 322, ey: 200 }, { py: 474, ey: 420 }, { py: 626, ey: 630 }]
export const ROPES4: Rope[] = [{ py: 304, ey: 188 }, { py: 424, ey: 366 }, { py: 544, ey: 522 }, { py: 664, ey: 664 }]
export const ropesFor = (n: number) => (n <= 12 ? ROPES3 : ROPES4)
export const ropeY = (ropes: Rope[], side: -1 | 1, k: number, x: number) => {
  const r = ropes[k], px = side < 0 ? PL : PR, ex = side < 0 ? -30 : 1950, t = (x - px) / (ex - px)
  return r.py + (r.ey - r.py) * t + Math.sin(t * Math.PI) * 38
}
export type SlotB = { x: number; ay: number; side: -1 | 1; k: number; col: number }
export type LayoutB = { slots: SlotB[]; ropes: Rope[]; sc: number; nameW: number; fs: number; cols: number }
/** размер подписи по числу команд (35 → 24 px) */
export const nameFs = (n: number) => (n <= 4 ? 44 : n <= 6 ? 38 : n <= 9 ? 34 : n <= 12 ? 31 : n <= 16 ? 27 : 24)
export function layoutB(n: number): LayoutB {
  const ropes = ropesFor(n), R = ropes.length, perSide = Math.ceil(n / 2), cols = Math.max(1, Math.ceil(perSide / R))
  const colX = (col: number) => (n <= 6 ? 580 : 570) - col * (cols === 2 ? 300 : 215)
  const slots: SlotB[] = []
  for (let i = 0; i < n; i++) {
    const side: -1 | 1 = i % 2 ? 1 : -1, j = Math.floor(i / 2), col = Math.floor(j / R), k = j % R
    const x = side < 0 ? colX(col) : 1920 - colX(col)
    slots.push({ x, ay: ropeY(ropes, side, k, x), side, k, col })
  }
  return { slots, ropes, cols, sc: n <= 6 ? 1.15 : n <= 12 ? 0.8 : n <= 16 ? 0.72 : 0.62, nameW: cols === 1 ? 270 : cols === 2 ? 204 : 150, fs: nameFs(n) }
}
/** путь искры от лунного круга к верёвке */
export const cometPath = (x: number, ay: number) => `M ${GATE.x} ${GATE.y} C ${GATE.x + (x - GATE.x) * 0.2} ${GATE.y - 260}, ${x - (x - GATE.x) * 0.35} ${ay - 180}, ${x} ${ay}`

// логотип: ширины букв Philosopher Bold (в em), чтобы подвес и надпись совпали без измерения шрифта
const ADV: Record<string, number> = { Q: 0.735, U: 0.694, I: 0.304, Z: 0.599, ' ': 0.25, P: 0.577, A: 0.647, R: 0.616, T: 0.575, Y: 0.638 }
export const swagY = (x: number) => { const t = (x - 380) / 1160; return 66 + Math.sin(Math.max(0, Math.min(1, t)) * Math.PI) * 54 }
export const LOGO = (() => {
  const fs = 170, sp = 12, w = [...'QUIZ PARTY'].reduce((a, c) => a + ADV[c] * fs + sp, -sp)
  let x = 960 - w / 2
  return [...'QUIZ PARTY'].flatMap((c, i) => { const cx = x + (ADV[c] * fs) / 2; x += ADV[c] * fs + sp; return c === ' ' ? [] : [{ c, i, x: cx }] })
})()
export const RING_N = 24
export const ringPts = Array.from({ length: RING_N }, (_, i) => { const a = (i / RING_N) * Math.PI * 2 - Math.PI / 2; return { x: GATE.x + Math.cos(a) * GATE.rx, y: GATE.y + Math.sin(a) * GATE.ry } })
export const litFor = (n: number) => Math.min(RING_N, 4 + n * 2)
