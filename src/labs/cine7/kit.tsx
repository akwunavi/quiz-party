// ═══ Cinematic Direction Lab — общий контракт сцены ═══
// Каждый мир — одна непрерывная последовательность на GSAP-таймлайне с метками
// A (общий план) → B (сверхъестественное событие) → C (мир перестраивается) →
// D (вопрос как следствие) → E (устойчивый игровой кадр). Оболочка управляет
// таймлайном (играть/пауза/итог/перемотка по главам) и таймером: число секунд
// считается от метки D, а сцена только РИСУЕТ его по-своему (setTimer).
import type { CSSProperties } from 'react'
import { QUESTION } from '../worlds7/content'

export { QUESTION }
export const ROUND_NAME = 'Кино и литература'
export const QNO = 'Вопрос 5 из 7'
export type Phase = 'normal' | 'warning' | 'zero'
export const phaseOf = (n: number): Phase => (n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal')
export type SceneApi = { tl: gsap.core.Timeline; setTimer: (n: number) => void; dispose?: () => void }
export type SceneProps = { onReady: (api: SceneApi) => void }
export type WorldDef = {
  num: number; name: string; law: string; event: string; transform: string; question: string
  timer: string; look: string; type: string; Scene: (p: SceneProps) => JSX.Element
}
export const css = (o: Record<string, string | number>) => o as CSSProperties
/** Детерминированный генератор (mulberry32): одинаковое зерно — одинаковый мир. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}
/** Гладкий шум 1D/2D без зависимостей (value noise). */
export function noise2(seed: number) {
  const r = seeded(seed), P = Array.from({ length: 256 }, () => r())
  const h = (x: number, y: number) => P[((x * 73856093) ^ (y * 19349663)) & 255]
  const s = (t: number) => t * t * (3 - 2 * t)
  return (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1)
    const u = s(xf), v = s(yf)
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
  }
}

/** Текст по буквам, но перенос — только между словами (слово = неразрывный блок). */
export function Letters({ text, cls = 'split' }: { text: string; cls?: string }) {
  return <>{text.split(' ').map((w, i) => <span key={i} className="word">{w.split('').map((ch, k) => <span key={k} className={cls}>{ch}</span>)}</span>)}</>
}

/** Длина SVG-пути (для «рисования» штрихом). */
export const pathLen = (el: Element) => (el as unknown as SVGPathElement).getTotalLength()
/** Заранее отрисованный мягкий световой спрайт: дешевле, чем градиент на каждый кадр. */
export function glowSprite(rgb: string, size = 64) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const x = c.getContext('2d')!, g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, `rgba(${rgb},1)`); g.addColorStop(0.28, `rgba(${rgb},.38)`); g.addColorStop(1, `rgba(${rgb},0)`)
  x.fillStyle = g; x.fillRect(0, 0, size, size); return c
}
