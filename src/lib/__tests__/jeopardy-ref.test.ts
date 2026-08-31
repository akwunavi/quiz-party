import { describe, it, expect } from 'vitest'
import { jeopardyRef, jeopardyTile } from '../jeopardyRef'
import { computeTotals, computeRoundScores } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// Ключ ответа на плитку «Своей игры» раньше не содержал номера раунда, и два
// таких раунда в одном паке перетирали ответы друг друга: уникальность в базе
// идёт по паре (team_id, question_ref). Тесты держат две вещи сразу — новый
// ключ разделяет раунды, старый по-прежнему читается.

const tiles = [0.5, 1, 1.5, 2].map((value, i) => ({ value, audio: `${i}.mp3`, correct: 'ответ' }))
const jeopardyRound = (id: string) => ({
  id, mechanic: 'jeopardy', off_scoreboard: false, questions: [],
  settings: { themes: [{ name: 'A', tiles }] },
})
// пак с ДВУМЯ раундами «Своей игры» — та самая ситуация, ради которой всё
const pack = { rounds: [jeopardyRound('r1'), jeopardyRound('r2')] } as unknown as LoadedPack
const team = { id: 't1', name: 'Команда', color: '#fff' } as unknown as Team

const answer = (ref: string, roundNumber: number): Answer =>
  ({ id: ref + roundNumber, team_id: 't1', game_id: 'g', question_ref: ref,
     round_number: roundNumber, answer_text: 'ответ', stake: null, is_correct: true,
     updated_at: '2026-01-01T00:00:00Z' } as Answer)

describe('ключ плитки «Своей игры»', () => {
  it('новый ключ содержит раунд и плитку', () => {
    expect(jeopardyRef(1, 3)).toBe('q-t1-3')
    expect(jeopardyTile('q-t1-3', 1)).toBe(3)
  })

  it('ключ чужого раунда не читается как свой', () => {
    expect(jeopardyTile('q-t1-3', 0)).toBeNull()
  })

  it('старый ключ без раунда читается по-прежнему', () => {
    expect(jeopardyTile('q-t3', 0)).toBe(3)
    expect(jeopardyTile('q-t3', 1)).toBe(3)
  })

  it('чужие ключи игнорируются', () => {
    expect(jeopardyTile('q-blitz', 0)).toBeNull()
    expect(jeopardyTile('q-paper-0', 0)).toBeNull()
    expect(jeopardyTile('q-abc', 0)).toBeNull()
  })
})

describe('два раунда «Своей игры» в одном паке', () => {
  it('баллы раундов не смешиваются', () => {
    const answers = [answer(jeopardyRef(0, 3), 0), answer(jeopardyRef(1, 0), 1)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(2 + 0.5)
    expect(computeRoundScores(pack, [team], answers).get('t1')).toEqual([2, 0.5])
  })

  it('плитка второго раунда не начисляется в первый', () => {
    const answers = [answer(jeopardyRef(1, 3), 1)]
    expect(computeRoundScores(pack, [team], answers).get('t1')).toEqual([0, 2])
  })

  it('игра, сыгранная на старом ключе, считается как раньше', () => {
    const answers = [answer('q-t3', 0), answer('q-t0', 1)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(2 + 0.5)
  })
})
