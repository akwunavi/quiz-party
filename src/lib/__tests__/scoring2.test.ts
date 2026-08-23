import { describe, it, expect } from 'vitest'
import { scoreThematic, scoreStakesUnique, scoreStakesFree, type ScoredAnswer } from '../scoring'

const row = (isCorrect: boolean | null, stake: number | null = null, i = 0): ScoredAnswer =>
  ({ questionIndex: i, isCorrect, stake })

describe('тематический раунд ×2', () => {
  it('5 верных без удвоения — 5 баллов', () => {
    const rows = [true, true, true, true, true].map((c, i) => row(c, null, i))
    expect(scoreThematic(rows, false)).toBe(5)
  })

  it('5 верных с удвоением — 10, а НЕ 18', () => {
    const rows = [true, true, true, true, true].map((c, i) => row(c, null, i))
    expect(scoreThematic(rows, true)).toBe(10)
  })

  it('часть верных: 3 из 5 с удвоением — 6', () => {
    const rows = [true, false, true, false, true].map((c, i) => row(c, null, i))
    expect(scoreThematic(rows, true)).toBe(6)
  })
})

describe('раунд со ставками', () => {
  it('верно со ставкой 5 — ставка плюс балл', () => {
    expect(scoreStakesUnique([row(true, 5)])).toBe(6)
  })

  it('неверно со ставкой 5 — минус ставка', () => {
    expect(scoreStakesUnique([row(false, 5)])).toBe(-5)
  })

  it('БЕЗ ставки верный ответ всё равно даёт балл', () => {
    expect(scoreStakesUnique([row(true, null)])).toBe(1)
  })

  it('неоценённые ответы не обнуляют раунд', () => {
    expect(scoreStakesUnique([row(true, 3), row(null, 5), row(true, 2)])).toBe(7)
  })

  it('свободные ставки: со ставкой 2 верно — 3, неверно — минус 2', () => {
    expect(scoreStakesFree([row(true, 2)])).toBe(3)
    expect(scoreStakesFree([row(false, 2)])).toBe(-2)
    expect(scoreStakesFree([row(true, 0)])).toBe(1)
  })
})
