import { describe, it, expect } from 'vitest'
import { answerPlateSize, answerPlateTextWidth, answerFitRange, ANSWER_COLUMN_U } from '../book/answerPlate'

describe('плашка «Правильный ответ» (свиток с бантом)', () => {
  it('ступени высоты растут с длиной ответа и не падают; их четыре', () => {
    const lens = [0, 5, 16, 17, 40, 41, 80, 81, 150, 400]
    const sizes = lens.map(answerPlateSize)
    for (let i = 1; i < sizes.length; i++) expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1])
    expect(new Set(sizes).size).toBe(4)
  })
  it('самая высокая ступень оставляет тексту не меньше 280u в ширину', () => {
    expect(answerPlateTextWidth(answerPlateSize(400))).toBeGreaterThanOrEqual(280)
    expect(answerPlateTextWidth(answerPlateSize(1), ANSWER_COLUMN_U)).toBeGreaterThan(answerPlateTextWidth(answerPlateSize(400)))
  })
  it('диапазон кегля: пол не выше потолка; потолок мокапа ограничивает ячейку', () => {
    const a = answerFitRange(0, 1, null)
    expect(a.min).toBeLessThanOrEqual(a.max)
    expect(answerFitRange(400, 1, 66).max).toBe(66)
    expect(answerFitRange(90, 1, 66).max).toBeCloseTo(55.8, 1)
    const tiny = answerFitRange(10, 1, null)
    expect(tiny.min).toBeLessThanOrEqual(tiny.max)
  })
})
