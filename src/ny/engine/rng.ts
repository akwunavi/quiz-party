// Детерминированный генератор случайных чисел (mulberry32): одна и та же
// ель/раскладка при одном и том же зерне — сцены не «прыгают» при повторе.
export type Rng = () => number

export function rng(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const range = (r: Rng, a: number, b: number) => a + (b - a) * r()
export const pick = <T,>(r: Rng, list: readonly T[]): T => list[Math.floor(r() * list.length)]
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smooth = (t: number) => t * t * (3 - 2 * t)
