import { describe, it, expect } from 'vitest'
import { finalQuestionOf, scoringQuestionsOf } from '../thematic'

const q = (id: string, extra: Record<string, unknown> = {}) =>
  ({ id, ...extra }) as { id: string; is_final_question?: boolean; hidden?: boolean }

describe('финальный вопрос тематического раунда', () => {
  it('берётся по флагу, если он проставлен', () => {
    const qs = [q('1'), q('2', { is_final_question: true }), q('3')]
    expect(finalQuestionOf(qs)?.id).toBe('2')
  })

  it('БЕЗ флага финальным считается последний вопрос', () => {
    const qs = [q('1'), q('2'), q('3')]
    expect(finalQuestionOf(qs)?.id).toBe('3')
  })

  it('скрытые вопросы финальными не становятся', () => {
    const qs = [q('1'), q('2'), q('3', { hidden: true })]
    expect(finalQuestionOf(qs)?.id).toBe('2')
  })

  it('баллы считаются по всем, кроме финального', () => {
    const qs = [q('1'), q('2'), q('3'), q('4'), q('5'), q('6')]
    expect(scoringQuestionsOf(qs).map(x => x.id)).toEqual(['1', '2', '3', '4', '5'])
  })

  it('пустой раунд не падает', () => {
    expect(finalQuestionOf([])).toBeUndefined()
    expect(scoringQuestionsOf([])).toEqual([])
  })
})
