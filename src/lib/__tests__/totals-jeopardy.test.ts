import { describe, it, expect } from 'vitest'
import { computeTotals, computeRoundScores } from '../totals'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// две темы по 4 плитки: 0.5 / 1 / 1.5 / 2
// сквозные номера: тема A = 0..3, тема B = 4..7
const tiles = (n: string) => [0.5, 1, 1.5, 2].map((value, i) => ({
  value, audio: `${n}${i}.mp3`, correct: 'ответ',
}))
const pack = {
  rounds: [{
    id: 'r1', mechanic: 'jeopardy', off_scoreboard: false, questions: [],
    settings: { themes: [{ name: 'A', tiles: tiles('a') }, { name: 'B', tiles: tiles('b') }] },
  }],
} as unknown as LoadedPack
const team = { id: 't1', name: 'Команда', color: '#fff' } as unknown as Team

const tile = (flat: number, correct: boolean | null, extra: Partial<Answer> = {}): Answer =>
  ({ id: `a${flat}`, team_id: 't1', game_id: 'g', question_ref: `q-t${flat}`,
     round_number: 0, answer_text: 'ответ', stake: null, is_correct: correct,
     updated_at: '2026-01-01T00:00:00Z', ...extra } as Answer)

describe('своя игра: балл = цена плитки', () => {
  it('верная плитка приносит ровно свою цену', () => {
    expect(computeTotals(pack, [team], [tile(3, true)]).get('t1')).toBe(2)
    expect(computeTotals(pack, [team], [tile(0, true)]).get('t1')).toBe(0.5)
  })

  it('нумерация сквозная: плитка 4 — это первая плитка второй темы', () => {
    expect(computeTotals(pack, [team], [tile(4, true)]).get('t1')).toBe(0.5)
    expect(computeTotals(pack, [team], [tile(7, true)]).get('t1')).toBe(2)
  })

  it('несколько верных плиток складываются', () => {
    const answers = [tile(0, true), tile(3, true), tile(5, true)]
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(0.5 + 2 + 1)
  })

  it('неверный ответ — ноль, а не минус', () => {
    expect(computeTotals(pack, [team], [tile(3, false)]).get('t1')).toBe(0)
  })

  it('неоценённый ответ (ведущий не нажал ✓/✗) — ноль', () => {
    expect(computeTotals(pack, [team], [tile(3, null)]).get('t1')).toBe(0)
  })

  it('СКОРОСТЬ ОТВЕТА НЕ ВЛИЯЕТ: обе команды получают цену плитки', () => {
    const t2 = { id: 't2', name: 'Вторая', color: '#0ff' } as unknown as Team
    const answers = [
      tile(3, true, { id: 'x1', updated_at: '2026-01-01T00:00:01Z' }),
      tile(3, true, { id: 'x2', team_id: 't2', updated_at: '2026-01-01T00:00:59Z' }),
    ]
    const totals = computeTotals(pack, [team, t2], answers)
    expect(totals.get('t1')).toBe(2)
    expect(totals.get('t2')).toBe(2)
  })

  it('поле stake игнорируется: цена берётся ТОЛЬКО из плитки', () => {
    // сюда механики других раундов писали баллы — на своей игре это мусор
    expect(computeTotals(pack, [team], [tile(3, true, { stake: 5 })]).get('t1')).toBe(2)
    expect(computeTotals(pack, [team], [tile(1, true, { stake: 0 })]).get('t1')).toBe(1)
  })

  it('ответы чужого раунда в зачёт не идут', () => {
    expect(computeTotals(pack, [team], [tile(3, true, { round_number: 1 })]).get('t1')).toBe(0)
  })

  it('колонка раунда на табло равна вкладу в сумму', () => {
    const answers = [tile(0, true), tile(3, true)]
    expect(computeRoundScores(pack, [team], answers).get('t1')).toEqual([2.5])
    expect(computeTotals(pack, [team], answers).get('t1')).toBe(2.5)
  })

  it('раунд вне зачёта в сумму не попадает', () => {
    const off = { rounds: [{ ...pack.rounds[0], off_scoreboard: true }] } as unknown as LoadedPack
    expect(computeTotals(off, [team], [tile(3, true)]).get('t1')).toBe(0)
  })

  it('«бумажный» ручной балл перебивает автоподсчёт плиток', () => {
    const paper = { id: 'p', team_id: 't1', game_id: 'g', question_ref: 'q-paper-0',
      round_number: 0, answer_text: '', stake: 9, is_correct: null, updated_at: '' } as Answer
    expect(computeTotals(pack, [team], [paper, tile(3, true)]).get('t1')).toBe(9)
  })
})
