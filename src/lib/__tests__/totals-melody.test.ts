import { describe, it, expect } from 'vitest'
import { computeTotals } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

const pack = {
  rounds: [{ id: 'r1', mechanic: 'melody', off_scoreboard: false, settings: {}, questions: [] }],
} as unknown as LoadedPack
const team = { id: 't1', name: 'Команда', color: '#fff' } as unknown as Team

const mel = (key: string, correct: boolean | null, stake: number | null): Answer =>
  ({ id: key, team_id: 't1', game_id: 'g', question_ref: `q-mel-${key}`,
     round_number: 0, answer_text: 'ответ', stake, is_correct: correct,
     updated_at: '' } as Answer)
const bid = (key: string, sec: number): Answer =>
  ({ id: key + '-bid', team_id: 't1', game_id: 'g', question_ref: `q-mel-${key}-bid`,
     round_number: 0, answer_text: String(sec), stake: null, is_correct: null,
     updated_at: '' } as Answer)

describe('подсчёт в музыкальном раунде', () => {
  it('оценённые треки дают баллы из ставки', () => {
    const answers = [bid('0-0', 4), mel('0-0', true, 2), bid('0-1', 8), mel('0-1', true, 1)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(3)
  })

  it('ставки (-bid) сами по себе баллов НЕ дают', () => {
    expect(computeTotals(pack, [team], [bid('0-0', 4), bid('0-1', 6)]).get('t1')).toBe(0)
  })

  it('неверный ответ не приносит баллов', () => {
    expect(computeTotals(pack, [team], [mel('0-0', false, 0)]).get('t1')).toBe(0)
  })

  it('НЕОЦЕНЁННЫЙ ответ даёт 0 — это и есть «баллы не засчитались»', () => {
    // ведущий не нажал «верно/неверно»: is_correct = null
    expect(computeTotals(pack, [team], [mel('0-0', null, null)]).get('t1')).toBe(0)
  })

  it('половинка за перехват (0.5) тоже считается', () => {
    expect(computeTotals(pack, [team], [mel('0-2', true, 0.5)]).get('t1')).toBe(0.5)
  })
})
