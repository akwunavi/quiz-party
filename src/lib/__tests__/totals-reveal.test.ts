import { describe, it, expect } from 'vitest'
import { computeTotals, computeRoundScores } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

const q = { id: 'q1', answer: { mode: 'crossword_word', word: 'СЛОВО' } }
const pack = {
  rounds: [{ id: 'r1', mechanic: 'four_pics', off_scoreboard: false, settings: {},
    questions: [q] }],
} as unknown as LoadedPack
const team = { id: 't1', name: 'Команда', color: '#fff' } as unknown as Team

const ans = (correct: boolean | null, stake: number | null, text = 'слово'): Answer =>
  ({ id: 'a1', team_id: 't1', game_id: 'g', question_ref: 'q-q1',
     round_number: 0, answer_text: text, stake, is_correct: correct,
     updated_at: '' } as Answer)

describe('подсчёт «3 попытки»', () => {
  it('верно на фазе 1 (stake=1) — 2 балла', () => {
    expect(computeTotals(pack, [team], [ans(true, 1)]).get('t1')).toBe(2)
  })
  it('верно на фазе 2 (stake=2) — 1 балл', () => {
    expect(computeTotals(pack, [team], [ans(true, 2)]).get('t1')).toBe(1)
  })
  it('верно на фазе 3 (stake=3) — 0.5 балла', () => {
    expect(computeTotals(pack, [team], [ans(true, 3)]).get('t1')).toBe(0.5)
  })
  it('неверный ответ — 0, даже с фазой 1', () => {
    expect(computeTotals(pack, [team], [ans(false, 1)]).get('t1')).toBe(0)
  })
  it('stake=null (не отвечали) — 0', () => {
    expect(computeTotals(pack, [team], [ans(true, null)]).get('t1')).toBe(0)
  })
  it('нет ответа вовсе — 0', () => {
    expect(computeTotals(pack, [team], []).get('t1')).toBe(0)
  })
  it('автопроверка без ручной оценки (is_correct=null, текст совпадает) — балл начисляется', () => {
    expect(computeTotals(pack, [team], [ans(null, 1, 'СЛОВО')]).get('t1')).toBe(2)
  })
  it('ручная коррекция q-adjust складывается поверх', () => {
    const adjust = { id: 'adj', team_id: 't1', game_id: 'g', question_ref: 'q-adjust-0',
      round_number: 0, answer_text: '', stake: 3, is_correct: null, updated_at: '' } as Answer
    expect(computeTotals(pack, [team], [ans(true, 1), adjust]).get('t1')).toBe(5)
  })

  it('computeTotals и computeRoundScores дают одинаковый результат', () => {
    const answers = [ans(true, 2)]
    const total = computeTotals(pack, [team], answers).get('t1')
    const perRound = computeRoundScores(pack, [team], answers).get('t1')
    expect(perRound?.[0]).toBe(total)
  })
})
