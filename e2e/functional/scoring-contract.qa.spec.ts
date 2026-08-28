import { describe, expect, it } from 'vitest'
import { scoreCrossword, scoreJeopardy } from '../../src/lib/scoring'

describe('QA: complete scoring coverage', () => {
  it('crossword awards one point per correct word and ignores null/wrong', () => {
    expect(scoreCrossword([{ questionIndex: 0, isCorrect: true }, { questionIndex: 1, isCorrect: false }, { questionIndex: 2, isCorrect: null }])).toBe(1)
  })
  it('jeopardy ignores unanswered and wrong tiles', () => {
    expect(scoreJeopardy([{ value: 100, isCorrect: null }, { value: 200, isCorrect: false }, { value: 300, isCorrect: true }])).toBe(300)
  })
})
