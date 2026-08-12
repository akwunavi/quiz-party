import { describe, it, expect } from 'vitest'
import {
  normalize, isFuzzyMatch, letterEq,
  isCrosswordWordCorrect, rebusExpected, rebusRuleHolds,
} from '../answerCheck'

describe('normalize', () => {
  it('регистр, ё, пунктуация', () => {
    expect(normalize(' Всё, ОК!! ')).toBe('все ок')
  })
})

describe('fuzzy', () => {
  it('опечатки в допуске', () => {
    expect(isFuzzyMatch('начяло', 'Начало / Inception')).toBe(true)
  })
  it('вариант через /', () => {
    expect(isFuzzyMatch('inception', 'Начало / Inception')).toBe(true)
  })
  it('пусто = null (пропуск)', () => {
    expect(isFuzzyMatch('', 'Начало')).toBe(null)
  })
  it('другое слово — неверно', () => {
    expect(isFuzzyMatch('матрица', 'Начало')).toBe(false)
  })
})

describe('letterEq (гомоглифы)', () => {
  it('латинская A = кириллическая А', () => {
    expect(letterEq('A', 'А')).toBe(true)
  })
})

describe('crossword word', () => {
  it('регистр и ё не важны', () => {
    expect(isCrosswordWordCorrect('ЁЛКА', 'елка')).toBe(true)
  })
  it('другое слово', () => {
    expect(isCrosswordWordCorrect('палка', 'елка')).toBe(false)
  })
  it('пусто = null', () => {
    expect(isCrosswordWordCorrect('', 'елка')).toBe(null)
  })
})

describe('rebus 3+3 (Р2)', () => {
  it('бланш + лагуна = аншлаг', () => {
    expect(rebusExpected('бланш', 'лагуна')).toBe('аншлаг')
    expect(rebusRuleHolds('бланш', 'лагуна', 'Аншлаг')).toBe(true)
  })
  it('подсветка несоответствия', () => {
    expect(rebusRuleHolds('бланш', 'лагуна', 'Аншлак')).toBe(false)
  })
  it('реальные пары из ДР-пакета', () => {
    expect(rebusExpected('Ток', 'Сикль')).toBe('токсик')
    expect(rebusExpected('Плед', 'Никель')).toBe('ледник')
  })
})
