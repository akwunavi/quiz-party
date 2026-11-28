// ═══ «Книга», «Отвечайте!»: раскладка по числу команд (answeringLayout) ═══
import { describe, it, expect } from 'vitest'
import { answeringLayout } from '../book/answeringLayout'

describe('answeringLayout', () => {
  it('0 команд — сетки нет, таймер и заголовок крупные', () => {
    const l = answeringLayout(0)
    expect(l.ch).toBe(0); expect(l.timer).toBeGreaterThan(answeringLayout(8).timer)
  })
  it('чем больше команд, тем мельче карточка, таймер и заголовок (не растут)', () => {
    let prev = answeringLayout(1)
    for (const n of [2, 4, 5, 8, 9, 12, 13, 16, 17, 24, 25, 40]) {
      const l = answeringLayout(n)
      expect(l.ch).toBeLessThanOrEqual(prev.ch); expect(l.timer).toBeLessThanOrEqual(prev.timer); expect(l.title).toBeLessThanOrEqual(prev.title)
      prev = l
    }
  })
  it('бюджет высоты: заголовок + таймер + строки карточек ≤ 780u для 0…36 команд', () => {
    for (let n = 0; n <= 36; n++) {
      const l = answeringLayout(n); const rows = n ? Math.ceil(n / l.cols) : 0
      expect(l.title * 1.0 + l.timer + rows * (l.ch + 6) + 24).toBeLessThanOrEqual(780)
    }
  })
  it('плитки крупные: 1–8 команд ≥ 124u, 16 — ≥ 100u, 24 команды ≥ 80u; текстовая область плитки не уже 200u', () => {
    for (let n = 1; n <= 8; n++) expect(answeringLayout(n).ch).toBeGreaterThanOrEqual(124)
    expect(answeringLayout(16).ch).toBeGreaterThanOrEqual(100); expect(answeringLayout(24).ch).toBeGreaterThanOrEqual(80)
    for (let n = 1; n <= 24; n++) {
      const l = answeringLayout(n); const col = (l.width - 14 * (l.cols - 1)) / l.cols
      expect(col - 0.96 * l.ch).toBeGreaterThanOrEqual(200)   // ширина под имя (без счётчика) после рамки плитки
    }
  })
  it('колонок не больше команд, ширина сетки ≤ 1560u; отрицательное/дробное число не ломает', () => {
    for (let n = 1; n <= 40; n++) { const l = answeringLayout(n); expect(l.cols).toBeLessThanOrEqual(Math.max(n, 1)); expect(l.width).toBeLessThanOrEqual(1560) }
    expect(answeringLayout(-3)).toEqual(answeringLayout(0)); expect(answeringLayout(7.9)).toEqual(answeringLayout(7))
  })
})
