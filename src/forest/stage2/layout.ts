// ═══ Этап 2 — раскладка досок «Своей игры» и «Угадай мелодию» под настоящее содержимое ═══
// Утверждённые композиции нарисованы под 5 тем × 4 цены (цветы) и 4 темы × 4 трека (колокольчики). В игре тем бывает
// от 1 до 6, плиток/треков в теме — сколько угодно. Здесь только геометрия (без React): при утверждённом числе тем и
// плиток результат совпадает с лабораторией до пикселя, при другом — цветы/растения расходятся по ширине кадра и,
// если не помещаются, уменьшаются; лепестков/колоколов столько, сколько плиток/треков.

// ── «Своя игра»: цветы цен ────────────────────────────────────────────────
export const JP_PETAL_R = 104 // центр цены на лепестке — расстояние от сердцевины
export type JpFlower = {
  cx: number; cy: number
  /** масштаб цветка (1 — как в лаборатории) */
  k: number
  /** масштаб лепестка внутри цветка (больше 4 лепестков — уже) */
  kp: number
  /** углы лепестков, по часовой стрелке от верхнего левого */
  ang: number[]
  /** ширина листа-подписи */
  labelW: number
}
/** Углы лепестков: 4 — как в лаборатории (−135, −45, 45, 135); 1–2 — вверх; иначе — поровну по кругу. */
export function petalAngles(m: number): number[] {
  if (m <= 0) return []
  if (m === 1) return [-90]
  if (m === 2) return [-135, -45]
  const step = 360 / m, start = -90 - step / 2
  return Array.from({ length: m }, (_, i) => start + i * step)
}
const JP_SP = 352, JP_W = 1680
export function jpLayout(tilesPerTheme: number[]): JpFlower[] {
  const n = tilesPerTheme.length
  const sp = n <= 5 ? JP_SP : JP_W / n, k = Math.min(1, sp / JP_SP)
  return tilesPerTheme.map((m, ti) => {
    const off = ti - (n - 1) / 2, d = Math.abs(off)
    const kp = m <= 4 ? 1 : m === 5 ? 0.92 : m === 6 ? 0.84 : 0.84 * 6 / m
    return { cx: 960 + off * sp, cy: 486 + 12 * d + 5 * d * (d - 1), k, kp, ang: petalAngles(m), labelW: Math.min(336, Math.round(sp - 16)) }
  })
}
/** центр цены на экране — отсюда вылетает открытая плитка */
export function jpTilePos(f: JpFlower, i: number) {
  const a = ((f.ang[i] ?? -90) * Math.PI) / 180, r = JP_PETAL_R * f.k * f.kp
  return { x: f.cx + Math.cos(a) * r, y: f.cy + Math.sin(a) * r }
}

// ── «Угадай мелодию»: колокольчики ────────────────────────────────────────
export const MEL_PLANT_Y = 120
const MEL_SP = 420, MEL_W = 1680, MEL_MIN = 300
type P2 = { x: number; y: number }
const bez = (a: P2, b: P2, c: P2, d: P2, t: number): P2 => { const u = 1 - t; return { x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x, y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y } }
export type MelBell = { x: number; y: number; side: number; ped: string; at: P2 }
export type MelPlant = { stem: string; tip: P2; bells: MelBell[]; leaves: { p: P2; side: number; len: number }[] }
/** Растение в своих координатах (400×940, земля на y=900). Колокола сверху вниз: 1 — выше всех; стороны чередуются,
 *  первая — наружу от изгиба стебля; листья — между колоколами. При 4 треках — ровно лабораторное растение. */
export function melPlant(ti: number, tracks: number): MelPlant {
  const s = ti % 2 ? 1 : -1, A = { x: 200, y: 900 }, B = { x: 200 + s * 26, y: 660 }, C = { x: 200 - s * 30, y: 400 }, D = { x: 200 + s * 14, y: 130 }
  const stem = `M ${A.x} ${A.y} C ${B.x} ${B.y} ${C.x} ${C.y} ${D.x} ${D.y}`
  const m = Math.max(1, tracks)
  // округление — чтобы при 4 треках числа были ровно лабораторными (0.84, 0.66, 0.48, 0.3), без хвостов плавающей точки
  const ts = m === 1 ? [0.66] : Array.from({ length: m }, (_, i) => Math.round((0.84 - i * (0.54 / (m - 1))) * 1e6) / 1e6)
  const bells = ts.map((t, i) => {
    const p = bez(A, B, C, D, t), side = (i % 2 ? 1 : -1) * s, reach = 86 - i * (12 / Math.max(m - 1, 1))
    const e = { x: p.x + side * reach, y: p.y + 6 }
    return { x: e.x, y: e.y, side, ped: `M ${p.x.toFixed(1)} ${p.y.toFixed(1)} C ${(p.x + side * reach * 0.45).toFixed(1)} ${(p.y - 44).toFixed(1)} ${(e.x - side * 4).toFixed(1)} ${(e.y - 40).toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`, at: p }
  })
  // листья: два внизу + по одному между соседними колоколами (при 4 треках — 0.12, 0.2, 0.39, 0.57, 0.75)
  const mids = ts.slice(1).map((t, i) => Math.round(((t + ts[i]) / 2) * 1000) / 1000).sort((a, b) => a - b)
  const leaves = [0.12, 0.2, ...mids].map((t, k) => { const p = bez(A, B, C, D, t), side = (k % 2 ? -1 : 1) * s, len = k < 2 ? 96 : 62; return { p, side, len } })
  return { stem, tip: D, bells, leaves }
}
export type MelCol = {
  /** центр растения по горизонтали (как PLANT_X лаборатории) */
  x: number
  /** масштаб растения; 1 — как в лаборатории */
  k: number
  /** левый верхний угол растения в кадре */
  left: number; top: number
  /** масштаб колокола (много треков — меньше) */
  kb: number
  labelW: number
  plant: MelPlant
}
export function melLayout(tracksPerTheme: number[]): MelCol[] {
  const n = tracksPerTheme.length
  const sp = n <= 4 ? MEL_SP : MEL_W / n, k = Math.min(1, sp / MEL_MIN)
  return tracksPerTheme.map((m, ti) => {
    const x = 960 + (ti - (n - 1) / 2) * sp
    return { x, k, left: x - 200 * k, top: MEL_PLANT_Y + 900 * (1 - k), kb: m <= 8 ? 1 : 8 / m, labelW: Math.min(380, Math.round(sp - 40)), plant: melPlant(ti, m) }
  })
}
/** центр колокола на экране — отсюда вылетает выбранный трек, сюда садится огонёк рулетки */
export function melBellPos(c: MelCol, i: number) {
  const b = c.plant.bells[i] ?? c.plant.bells[0]
  return { x: c.left + b.x * c.k, y: c.top + (b.y + 50 * c.kb) * c.k }
}
/** Плотность списка команд на панели: обычный (до 5), плотнее (6–8), две колонки (9+). */
export function listDensity(rows: number): '' | ' d1' | ' d2' {
  return rows <= 5 ? '' : rows <= 8 ? ' d1' : ' d2'
}
