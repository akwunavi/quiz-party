import { describe, expect, it } from 'vitest'
import { scoreStandard, scoreTestStop, scoreStakesUnique, scoreStakesFree, scoreThematic, scoreJeopardy, scoreSprint, melodyPointsFor, scoreMelody, scoreRace } from '../../src/lib/scoring'

describe('QA: scoring regression matrix', () => {
  it('standard awards only correct answers', () => expect(scoreStandard([{ questionIndex: 0, isCorrect: true }, { questionIndex: 1, isCorrect: false }, { questionIndex: 2, isCorrect: null }])).toBe(1))
  it('test stop stops after first wrong answer but ignores skipped answers', () => expect(scoreTestStop([{ questionIndex: 2, isCorrect: true }, { questionIndex: 0, isCorrect: true }, { questionIndex: 1, isCorrect: false }, { questionIndex: 3, isCorrect: true }])).toBe(2))
  it('unique stakes add stake+1 for correct and subtract stake for wrong', () => expect(scoreStakesUnique([{ questionIndex: 0, isCorrect: true, stake: 3 }, { questionIndex: 1, isCorrect: false, stake: 2 }])).toBe(2))
  it('free stakes use 0 as ordinary one-point mode', () => expect(scoreStakesFree([{ questionIndex: 0, isCorrect: true, stake: 0 }, { questionIndex: 1, isCorrect: true, stake: 2 }, { questionIndex: 2, isCorrect: false, stake: 2 }])).toBe(2))
  it('thematic doubling is applied exactly once', () => {
    const answers = [{ questionIndex: 0, isCorrect: true }, { questionIndex: 1, isCorrect: true }]
    expect(scoreThematic(answers, false)).toBe(2)
    expect(scoreThematic(answers, true)).toBe(4)
  })
  it('jeopardy scores only correct tiles by their value', () => expect(scoreJeopardy([{ value: 100, isCorrect: true }, { value: 200, isCorrect: false }, { value: 300, isCorrect: null }])).toBe(100))
  it('sprint bonus requires every question to be correct', () => {
    expect(scoreSprint([{ questionIndex: 0, isCorrect: true }, { questionIndex: 1, isCorrect: true }])).toBe(9)
    expect(scoreSprint([{ questionIndex: 0, isCorrect: true }, { questionIndex: 1, isCorrect: false }])).toBe(2)
    expect(scoreSprint([{ questionIndex: 0, isCorrect: true }, { questionIndex: 1, isCorrect: null }])).toBe(2)
  })
  it('melody maps bid seconds to the round rules', () => {
    expect(melodyPointsFor(null)).toBe(1)
    expect(melodyPointsFor(5)).toBe(2)
    expect(melodyPointsFor(6)).toBe(1)
  })
  it('melody uses explicit stake, otherwise bid seconds', () => expect(scoreMelody([{ questionIndex: 0, isCorrect: true, stake: 2 }, { questionIndex: 1, isCorrect: true, bidSeconds: 5 }, { questionIndex: 2, isCorrect: false, bidSeconds: 2 }])).toBe(4))
  it('race scores only the recorded finish stake for correct entries', () => expect(scoreRace([{ questionIndex: 0, isCorrect: true, stake: 5 }, { questionIndex: 1, isCorrect: true, stake: 3 }, { questionIndex: 2, isCorrect: false, stake: 2 }])).toBe(8))
})
