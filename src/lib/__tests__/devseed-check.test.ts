import { describe, it, expect } from 'vitest'
import { computeTotals } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// Сверка «ожидали / вышло» из панели репетиции считает баллы независимо от
// totals.ts. Эти тесты фиксируют, что для сгенерированных сидом данных обе
// стороны обязаны совпасть — иначе панель будет врать о расхождениях.

const team = (id: string): Team => ({ id, name: id, color: '#fff' } as unknown as Team)
const ans = (o: Partial<Answer>): Answer => ({
  id: Math.random().toString(36), team_id: 't1', game_id: 'g',
  question_ref: 'q-x', round_number: 0, answer_text: 'a',
  stake: null, is_correct: null, updated_at: '2026-01-01T00:00:00Z', ...o,
} as Answer)

/** Независимый расчёт — правила словами, как в devSeed.expectedForRound.
 *  Импортировать оттуда нельзя: модуль тянет supabase. */
function expectedSprint(answers: Answer[], total: number, per = 2, bonus = 5): number {
  const graded = answers.filter(a => a.is_correct !== null)
  const right = graded.filter(a => a.is_correct === true)
  const all = total > 0 && right.length === total && graded.length === total
  return right.length * per + (all ? bonus : 0)
}
function expectedStakesUnique(answers: Answer[]): number {
  return answers.filter(a => a.is_correct !== null).reduce((s, a) =>
    s + (a.is_correct ? Number(a.stake ?? 0) + 1 : -Number(a.stake ?? 0)), 0)
}

describe('сверка начислений: ожидание сходится с боевым подсчётом', () => {
  it('обычный раунд: балл за верный ответ', () => {
    const questions = ['a', 'b', 'c'].map(id => ({
      id, hidden: false, answer: { mode: 'free_text', correct: 'да', display: 'да' },
      media: {}, question_text: '?',
    }))
    const pack = { rounds: [{ id: 'r', mechanic: 'sprint', off_scoreboard: false,
      settings: {}, questions }] } as unknown as LoadedPack
    const answers = [
      ans({ question_ref: 'q-a', is_correct: true }),
      ans({ question_ref: 'q-b', is_correct: false }),
      ans({ question_ref: 'q-c', is_correct: true }),
    ]
    const actual = computeTotals(pack, [team('t1')], answers).get('t1')
    // два балла за вопрос, бонуса нет — ответили не на всё верно
    expect(actual).toBe(expectedSprint(answers, 3))
    expect(actual).toBe(4)
  })

  it('раунд со ставками: балл равен ставке', () => {
    const questions = ['a', 'b'].map(id => ({
      id, hidden: false, answer: { mode: 'free_text', correct: 'да', display: 'да' },
      media: {}, question_text: '?',
    }))
    const pack = { rounds: [{ id: 'r', mechanic: 'stakes_unique', off_scoreboard: false,
      settings: { stakesValues: [0, 1, 2, 3] }, questions }] } as unknown as LoadedPack
    const answers = [
      ans({ question_ref: 'q-a', is_correct: true, stake: 3 }),
      ans({ question_ref: 'q-b', is_correct: false, stake: 2 }),
    ]
    const actual = computeTotals(pack, [team('t1')], answers).get('t1')
    // верно: ставка 3 + 1 = 4; неверно: минус ставка 2 → итого 2
    expect(actual).toBe(expectedStakesUnique(answers))
    expect(actual).toBe(2)
  })

  it('раунд вне зачёта не даёт баллов ни там, ни там', () => {
    const questions = [{ id: 'a', hidden: false, media: {}, question_text: '?',
      answer: { mode: 'free_text', correct: 'да', display: 'да' } }]
    const pack = { rounds: [{ id: 'r', mechanic: 'sprint', off_scoreboard: true,
      settings: {}, questions }] } as unknown as LoadedPack
    const answers = [ans({ question_ref: 'q-a', is_correct: true })]
    expect(computeTotals(pack, [team('t1')], answers).get('t1')).toBe(0)
  })

  it('неоценённый ответ не приносит баллов', () => {
    const questions = [{ id: 'a', hidden: false, media: {}, question_text: '?',
      answer: { mode: 'free_text', correct: 'да', display: 'да' } }]
    const pack = { rounds: [{ id: 'r', mechanic: 'sprint', off_scoreboard: false,
      settings: {}, questions }] } as unknown as LoadedPack
    const answers = [ans({ question_ref: 'q-a', is_correct: null })]
    expect(computeTotals(pack, [team('t1')], answers).get('t1')).toBe(0)
    expect(expectedSprint(answers, 1)).toBe(0)
  })
})
