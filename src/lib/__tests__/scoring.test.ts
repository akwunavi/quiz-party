import { describe, it, expect } from 'vitest'
import {
  scoreStandard, scoreTestStop, scoreStakesUnique,
  scoreStakesFree, scoreThematic, scoreJeopardy, scoreCrossword,
} from '../scoring'

const A = (i: number, ok: boolean | null, stake?: number | null) =>
  ({ questionIndex: i, isCorrect: ok, stake })

describe('standard', () => {
  it('1 балл за верный', () => {
    expect(scoreStandard([A(0, true), A(1, false), A(2, true)])).toBe(2)
  })
  it('pointsPerQuestion', () => {
    expect(scoreStandard([A(0, true)], 2)).toBe(2)
  })
})

describe('test_stop (Р3)', () => {
  it('стоп после первой ошибки', () => {
    expect(scoreTestStop([A(0, true), A(1, false), A(2, true)])).toBe(1)
  })
  it('пропуск (null) не ошибка', () => {
    expect(scoreTestStop([A(0, true), A(1, null), A(2, true)])).toBe(2)
  })
  it('порядок по questionIndex, не по массиву', () => {
    expect(scoreTestStop([A(2, true), A(0, false), A(1, true)])).toBe(0)
  })
})

describe('stakes_unique (Р5)', () => {
  it('верно: ставка+1, неверно: -ставка', () => {
    expect(scoreStakesUnique([A(0, true, 5), A(1, false, 3)])).toBe(6 - 3)
  })
  it('ставка 0: верно +1, неверно 0', () => {
    expect(scoreStakesUnique([A(0, true, 0), A(1, false, 0)])).toBe(1)
  })
})

describe('stakes_free (Р7, бинарная ставка 0|2)', () => {
  it('со ставкой 2: верно +3', () => {
    expect(scoreStakesFree([A(0, true, 2)])).toBe(3)
  })
  it('со ставкой 2: неверно −2', () => {
    expect(scoreStakesFree([A(0, false, 2)])).toBe(-2)
  })
  it('без ставки: 1/0', () => {
    expect(scoreStakesFree([A(0, true, 0), A(1, false, null)])).toBe(1)
  })
  it('микс подтверждённой математики', () => {
    // верно+2 → +3; неверно+2 → −2; верно без → +1; неверно без → 0
    expect(scoreStakesFree([A(0, true, 2), A(1, false, 2), A(2, true, 0), A(3, false, 0)])).toBe(2)
  })
})

describe('thematic_x2 (Р6)', () => {
  it('без удвоения — как standard', () => {
    expect(scoreThematic([A(0, true), A(1, true)], false)).toBe(2)
  })
  it('удвоение ручной кнопкой', () => {
    expect(scoreThematic([A(0, true), A(1, true)], true)).toBe(4)
  })
})

describe('jeopardy (Р4)', () => {
  it('сумма value верных плиток', () => {
    expect(scoreJeopardy([
      { value: 0.5, isCorrect: true },
      { value: 2, isCorrect: false },
      { value: 1.5, isCorrect: true },
      { value: 1, isCorrect: null },
    ])).toBe(2)
  })
})

describe('crossword', () => {
  it('1 балл за слово', () => {
    expect(scoreCrossword([A(0, true), A(1, true), A(2, false)])).toBe(2)
  })
})
