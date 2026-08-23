import { describe, it, expect } from 'vitest'
import { computeTotals } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// Раунд как у Ивана: 5 обычных вопросов + 6-й финальный «что общего».
const pack = {
  rounds: [{
    id: 'r1', mechanic: 'thematic_x2', off_scoreboard: false, settings: {},
    questions: [
      ...['1', '2', '3', '4', '5'].map(id => ({
        id, is_final_question: false, answer: { mode: 'free_text', correct: 'x' },
      })),
      { id: 'fin', is_final_question: true, answer: { mode: 'free_text', correct: 'связь' } },
    ],
  }],
} as unknown as LoadedPack

const team = { id: 't1', name: 'Команда', color: '#fff' } as unknown as Team
const ans = (ref: string, correct: boolean | null, text = ''): Answer =>
  ({ id: ref, team_id: 't1', game_id: 'g', question_ref: ref, round_number: 0,
     answer_text: text, stake: null, is_correct: correct, updated_at: '' } as Answer)

describe('тематический раунд: вся цепочка подсчёта', () => {
  it('5 верных, финальный НЕ отвечен — 5 баллов', () => {
    const answers = ['1', '2', '3', '4', '5'].map(id => ans(`q-${id}`, true))
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(5)
  })

  it('5 верных + финальный ВЕРНЫЙ (оценка админа) — 10 баллов', () => {
    const answers = [
      ...['1', '2', '3', '4', '5'].map(id => ans(`q-${id}`, true)),
      ans('q-fin', true, 'связь'),
    ]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(10)
  })

  it('финальный верный по АВТОПРОВЕРКЕ (оценки нет) — тоже удваивает', () => {
    const answers = [
      ...['1', '2', '3', '4', '5'].map(id => ans(`q-${id}`, true)),
      ans('q-fin', null, 'связь'),
    ]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(10)
  })

  it('финальный НЕВЕРНЫЙ — удвоения нет', () => {
    const answers = [
      ...['1', '2', '3', '4', '5'].map(id => ans(`q-${id}`, true)),
      ans('q-fin', false, 'мимо'),
    ]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(5)
  })

  it('сам финальный вопрос НЕ приносит балла: 3 верных + финальный верный = 6', () => {
    const answers = [
      ...['1', '2', '3'].map(id => ans(`q-${id}`, true)),
      ans('q-fin', true, 'связь'),
    ]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(6)
  })
})
