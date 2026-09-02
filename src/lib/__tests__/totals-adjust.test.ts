import { describe, it, expect } from 'vitest'
import { computeTotals, computeRoundScores } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// Два обычных раунда: во втором один вопрос, второй — off_scoreboard
// (разминка, в зачёт не идёт), чтобы проверить, что корректировка его
// не задевает.
const pack = {
  rounds: [
    { id: 'r1', mechanic: 'standard', off_scoreboard: false, settings: {},
      questions: [{ id: 'q1', is_final_question: false, answer: { mode: 'free_text', correct: 'x' } }] },
    { id: 'r2', mechanic: 'standard', off_scoreboard: true, settings: {},
      questions: [{ id: 'q2', is_final_question: false, answer: { mode: 'free_text', correct: 'x' } }] },
  ],
} as unknown as LoadedPack

const team = { id: 't1', name: 'Команда', color: '#fff' } as unknown as Team
const ans = (ref: string, ri: number, correct: boolean | null, stake: number | null = null): Answer =>
  ({ id: ref, team_id: 't1', game_id: 'g', question_ref: ref, round_number: ri,
     answer_text: '', stake, is_correct: correct, updated_at: '' } as Answer)

describe('ручная корректировка баллов (q-adjust-<раунд>)', () => {
  it('прибавляет к обычному счёту раунда', () => {
    const answers = [ans('q-q1', 0, true), ans('q-adjust-0', 0, true, 5)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(6)
    expect(computeRoundScores(pack, [team], answers).get('t1')).toEqual([6, 0])
  })

  it('отрицательная корректировка вычитает', () => {
    const answers = [ans('q-q1', 0, true), ans('q-adjust-0', 0, true, -1)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(0)
    expect(computeRoundScores(pack, [team], answers).get('t1')).toEqual([0, 0])
  })

  it('без корректировки — счёт как обычно', () => {
    const answers = [ans('q-q1', 0, true)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(1)
  })

  it('корректировка off_scoreboard-раунда не входит в общий счёт', () => {
    const answers = [ans('q-q1', 0, true), ans('q-adjust-1', 1, true, 10)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(1)
    // но в построчном массиве место сохраняется (индексация по ВСЕМ раундам)
    expect(computeRoundScores(pack, [team], answers).get('t1')).toEqual([1, 10])
  })
})
