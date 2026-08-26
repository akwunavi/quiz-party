import { describe, expect, it } from 'vitest'
import {
  melodyPointsFor,
  scoreCrossword,
  scoreJeopardy,
  scoreMelody,
  scoreRace,
  scoreSprint,
  scoreStakesFree,
  scoreStakesUnique,
  scoreStandard,
  scoreTestStop,
  scoreThematic,
  type ScoredAnswer,
} from '../../src/lib/scoring'

const ok = (questionIndex: number, extra: Partial<ScoredAnswer> = {}): ScoredAnswer => ({ questionIndex, isCorrect: true, ...extra })
const wrong = (questionIndex: number, extra: Partial<ScoredAnswer> = {}): ScoredAnswer => ({ questionIndex, isCorrect: false, ...extra })
const blank = (questionIndex: number): ScoredAnswer => ({ questionIndex, isCorrect: null })

describe('QA: scoring regression', () => {
  it('standard: counts only explicitly correct answers', () => {
    expect(scoreStandard([ok(0), wrong(1), blank(2), ok(3)], 2)).toBe(4)
  })

  it('test_stop: stops after the first wrong answer and ignores skipped questions', () => {
    expect(scoreTestStop([ok(2), wrong(3), ok(0), ok(4)])).toBe(1)
    expect(scoreTestStop([ok(0), blank(1), ok(2), wrong(3), ok(4)])).toBe(2)
  })

  it('stakes_unique: applies +stake+1 / -stake and ignores ungraded answers', () => {
    expect(scoreStakesUnique([ok(0, { stake: 3 }), wrong(1, { stake: 5 }), blank(2)])).toBe(-1)
  })

  it('stakes_free: a stake of 2 gives +3/-2; no stake gives +1/0', () => {
    expect(scoreStakesFree([ok(0, { stake: 2 }), wrong(1, { stake: 2 }), ok(2), wrong(3)])).toBe(2)
  })

  it('thematic: doubles the base score only when explicitly enabled', () => {
    const answers = [ok(0), ok(1), wrong(2)]
    expect(scoreThematic(answers, false)).toBe(2)
    expect(scoreThematic(answers, true)).toBe(4)
  })

  it('jeopardy: awards tile value only for correct tiles', () => {
    expect(scoreJeopardy([{ value: 100, isCorrect: true }, { value: 200, isCorrect: false }, { value: 300, isCorrect: null }, { value: 400, isCorrect: true }])).toBe(500)
  })

  it('sprint: gives per-question points and the all-correct bonus only when every question is correct', () => {
    expect(scoreSprint([ok(0), ok(1), ok(2)])).toBe(11)
    expect(scoreSprint([ok(0), wrong(1), ok(2)])).toBe(4)
    expect(scoreSprint([ok(0), blank(1), ok(2)])).toBe(4)
  })

  it('melody: uses stake when present and bid seconds as fallback', () => {
    expect(melodyPointsFor(null)).toBe(1)
    expect(melodyPointsFor(0)).toBe(1)
    expect(melodyPointsFor(5)).toBe(2)
    expect(melodyPointsFor(6)).toBe(1)
    expect(melodyPointsFor(10)).toBe(1)
    expect(scoreMelody([ok(0, { stake: 2, bidSeconds: 5 }), ok(1, { stake: null, bidSeconds: 5 }), ok(2, { stake: null, bidSeconds: 8 }), wrong(3, { stake: 2, bidSeconds: 5 })])).toBe(5)
  })

  it('race: awards only the recorded placement points for correct answers', () => {
    expect(scoreRace([ok(0, { stake: 5 }), ok(1, { stake: 3 }), wrong(2, { stake: 2 }), blank(3)])).toBe(8)
  })

  it('crossword: uses the same one-point-per-correct rule as standard', () => {
    expect(scoreCrossword([ok(0), ok(1), wrong(2), blank(3)])).toBe(2)
  })
})
