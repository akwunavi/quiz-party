import { describe, it, expect } from 'vitest'
import { stableAnchor, type PawMetric } from '../pawAnchor'

const paw = (x0: number, x1: number, bottom: number) => ({ x0, x1, bottom })
const fr = (bottom: number, cx: number, span = 60): PawMetric => ({ bottom, cx, span, paws: [paw(cx - 20, cx - 10, bottom), paw(cx + 10, cx + 20, bottom - 5)] })

describe('stableAnchor: постоянный якорь собаки на тумбе (10.74)', () => {
  it('пустой набор — нет якоря', () => { expect(stableAnchor([])).toBeNull() })
  it('Зефир-подобный клип (подошва 257–272, в основном 272): якорь — типичная подошва, а не кадр', () => {
    const frames = [...Array(30).fill(0).map(() => fr(272, 130)), fr(257, 126), fr(260, 134), fr(266, 128)]
    const a = stableAnchor(frames)!
    expect(a.bottom).toBe(272); expect(a.cx).toBe(130)
  })
  it('не зависит от порядка кадров и от того, берём ли мы каждый второй (устойчив к выборке)', () => {
    const frames = Array.from({ length: 40 }, (_, i) => fr(i % 7 === 0 ? 262 : 273, 128 + (i % 3)))
    const a = stableAnchor(frames)!, b = stableAnchor(frames.slice().reverse())!, c = stableAnchor(frames.filter((_, i) => i % 2 === 0))!
    expect(b.bottom).toBe(a.bottom); expect(c.bottom).toBe(a.bottom); expect(b.cx).toBe(a.cx)
  })
  it('значения целые (дробный сдвиг спрайта мерцает), лапы и размах — от кадра, ближайшего к медианам; копия, не ссылка', () => {
    const frames = [fr(270, 100.5, 50), fr(270, 100.5, 50), fr(250, 90, 80)]
    const a = stableAnchor(frames)!
    expect(Number.isInteger(a.bottom) && Number.isInteger(a.cx)).toBe(true)
    expect(a.span).toBe(50); expect(a.paws).toEqual(frames[0].paws); expect(a.paws[0]).not.toBe(frames[0].paws[0])
  })
})
