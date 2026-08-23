import { describe, it, expect } from 'vitest'
import { finalQuestionOf, scoringQuestionsOf } from '../thematic'

const q = (id: string, fin = false) => ({ id, is_final_question: fin })

describe('финальный вопрос тематического раунда', () => {
  it('определяется флагом редактора', () => {
    expect(finalQuestionOf([q('1'), q('2', true), q('3')])?.id).toBe('2')
  })

  it('без флага финального вопроса НЕТ (и удвоения тоже)', () => {
    expect(finalQuestionOf([q('1'), q('2'), q('3')])).toBeUndefined()
  })

  it('баллы считаются по всем, кроме финального', () => {
    const qs = [q('1'), q('2'), q('3'), q('4'), q('5'), q('6', true)]
    expect(scoringQuestionsOf(qs).map(x => x.id)).toEqual(['1', '2', '3', '4', '5'])
  })
})
