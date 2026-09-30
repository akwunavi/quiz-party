import { describe, it, expect } from 'vitest'
import { computeTotals, computeRoundScores } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// «Скрэмбл» (HANDOFF §3ca): обычный режим — балл каждому верному; гонка —
// один балл первому верному по серверному времени; на бумаге гонки нет.

const qs = [
  { id: 'q1', answer: { mode: 'anagram', phrase: 'КОТ', order: [2, 0, 1] } },
  { id: 'q2', answer: { mode: 'anagram', phrase: 'Ёлка', order: [1, 2, 3, 0] } },
]
const mkPack = (settings: Record<string, unknown>, playMode: 'phones' | 'paper' = 'phones',
  off = false) => ({
  settings: { play_mode: playMode },
  rounds: [{ id: 'r1', mechanic: 'anagram', off_scoreboard: off, settings, questions: qs }],
} as unknown as LoadedPack)
const teams = ['a', 'b', 'c'].map(id => ({ id, name: id, color: '#fff' })) as unknown as Team[]

const ans = (team: string, q: string, text: string, acc: string | undefined,
  is_correct: boolean | null = null, upd = '2026-09-30T20:00:00Z'): Answer => ({
  id: `${team}-${q}`, team_id: team, game_id: 'g', question_ref: `q-${q}`, round_number: 0,
  answer_text: text, stake: null, is_correct, updated_at: upd, accepted_at: acc,
})
const T = (s: number) => `2026-09-30T20:00:${String(s).padStart(2, '0')}.000Z`

const totals = (pack: LoadedPack, answers: Answer[]) =>
  Object.fromEntries(computeTotals(pack, teams, answers))

describe('подсчёт «Скрэмбла»', () => {
  it('обычный: балл каждому верному, ё=е, опечатка — 0', () => {
    const p = mkPack({ mode: 'standard' })
    const answers = [
      ans('a', 'q1', 'КОТ', T(5)), ans('b', 'q1', 'КОТ', T(2)), ans('c', 'q1', 'КТО', T(1)),
      ans('a', 'q2', 'ЕЛКА', T(9)),
    ]
    expect(totals(p, answers)).toEqual({ a: 2, b: 1, c: 0 })
  })

  it('обычный: pointsPerQuestion', () => {
    const p = mkPack({ mode: 'standard', pointsPerQuestion: 3 })
    expect(totals(p, [ans('a', 'q1', 'кот', T(1))]).a).toBe(3)
  })

  it('гонка: балл только первому верному по accepted_at', () => {
    const p = mkPack({ mode: 'race' })
    const answers = [
      ans('a', 'q1', 'КОТ', T(5)), ans('b', 'q1', 'КОТ', T(3)), ans('c', 'q1', 'КТО', T(1)),
      ans('a', 'q2', 'ЁЛКА', T(9)), ans('c', 'q2', 'ЕЛКА', T(7)),
    ]
    expect(totals(p, answers)).toEqual({ a: 0, b: 1, c: 1 })
  })

  it('гонка: ничья по accepted_at решается updated_at, затем id команды', () => {
    const p = mkPack({ mode: 'race' })
    expect(totals(p, [
      ans('b', 'q1', 'КОТ', T(3), null, T(1)), ans('a', 'q1', 'КОТ', T(3), null, T(2)),
    ])).toEqual({ a: 0, b: 1, c: 0 })
    expect(totals(p, [ans('b', 'q1', 'КОТ', T(3)), ans('a', 'q1', 'КОТ', T(3))]))
      .toEqual({ a: 1, b: 0, c: 0 })
  })

  it('гонка: ручная ✗ ведущего снимает победу и отдаёт следующему', () => {
    const p = mkPack({ mode: 'race' })
    const answers = [ans('a', 'q1', 'КОТ', T(1), false), ans('b', 'q1', 'КОТ', T(2))]
    expect(totals(p, answers)).toEqual({ a: 0, b: 1, c: 0 })
  })

  it('гонка: ручная ✓ на неверном тексте участвует по времени', () => {
    const p = mkPack({ mode: 'race' })
    const answers = [ans('c', 'q1', 'К0Т', T(1), true), ans('b', 'q1', 'КОТ', T(2))]
    expect(totals(p, answers)).toEqual({ a: 0, b: 0, c: 1 })
  })

  it('гонка без миграции 0015 — по updated_at', () => {
    const p = mkPack({ mode: 'race' })
    const answers = [ans('a', 'q1', 'КОТ', undefined, null, T(4)), ans('b', 'q1', 'КОТ', undefined, null, T(3))]
    expect(totals(p, answers)).toEqual({ a: 0, b: 1, c: 0 })
  })

  it('на бумаге гонка считается как обычный', () => {
    const p = mkPack({ mode: 'race' }, 'paper')
    const answers = [ans('a', 'q1', 'КОТ', T(5)), ans('b', 'q1', 'КОТ', T(3))]
    expect(totals(p, answers)).toEqual({ a: 1, b: 1, c: 0 })
  })

  it('вне зачёта — 0 в сумме', () => {
    const p = mkPack({ mode: 'race' }, 'phones', true)
    expect(totals(p, [ans('a', 'q1', 'КОТ', T(1))]).a).toBe(0)
  })

  it('computeTotals и computeRoundScores совпадают (обычный и гонка)', () => {
    const answers = [
      ans('a', 'q1', 'КОТ', T(5)), ans('b', 'q1', 'КОТ', T(3)), ans('c', 'q1', 'КТО', T(1)),
      ans('a', 'q2', 'ЁЛКА', T(9)), ans('c', 'q2', 'ЕЛКА', T(7), false),
    ]
    for (const mode of ['standard', 'race']) {
      const p = mkPack({ mode })
      const tot = computeTotals(p, teams, answers)
      const per = computeRoundScores(p, teams, answers)
      for (const t of teams) expect(per.get(t.id)?.[0]).toBe(tot.get(t.id))
    }
  })
})
