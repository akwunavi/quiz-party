import { describe, it, expect } from 'vitest'
import { rankTeams } from '../ranking'
import type { Answer, Team } from '../../types/quiz'

const team = (id: string, name: string): Team =>
  ({ id, name, color: '#fff', game_id: 'g', last_seen_at: null } as unknown as Team)
const wrong = (team_id: string, at: string): Answer =>
  ({ id: at, team_id, game_id: 'g', question_ref: 'q-1', round_number: 0,
     answer_text: 'x', stake: null, is_correct: false, updated_at: at } as Answer)

describe('rankTeams', () => {
  it('расставляет по очкам', () => {
    const teams = [team('a', 'A'), team('b', 'B')]
    const totals = new Map([['a', 5], ['b', 9]])
    const r = rankTeams(teams, totals, [])
    expect(r.map(x => x.team.id)).toEqual(['b', 'a'])
    expect(r.map(x => x.place)).toEqual([1, 2])
  })

  it('при равных очках место общее и следующее НЕ пропускается: 1, 1, 2, 3', () => {
    const teams = [team('a', 'A'), team('b', 'B'), team('c', 'C'), team('d', 'D')]
    const totals = new Map([['a', 10], ['b', 10], ['c', 7], ['d', 3]])
    const r = rankTeams(teams, totals, [])
    expect(r.map(x => x.place)).toEqual([1, 1, 2, 3])
    expect(r.map(x => x.shared)).toEqual([true, true, false, false])
  })

  it('ничья в середине таблицы тоже не съедает место: 1, 2, 2, 3', () => {
    const teams = [team('a', 'A'), team('b', 'B'), team('c', 'C'), team('d', 'D')]
    const totals = new Map([['a', 12], ['b', 7], ['c', 7], ['d', 3]])
    const r = rankTeams(teams, totals, [])
    expect(r.map(x => x.place)).toEqual([1, 2, 2, 3])
  })

  it('внутри общего места выше тот, кто ошибся раньше', () => {
    const teams = [team('a', 'A'), team('b', 'B')]
    const totals = new Map([['a', 7], ['b', 7]])
    const answers = [
      wrong('b', '2026-01-01T10:00:00Z'),   // ошиблась раньше
      wrong('a', '2026-01-01T10:05:00Z'),
    ]
    const r = rankTeams(teams, totals, answers)
    expect(r.map(x => x.team.id)).toEqual(['b', 'a'])
    expect(r.map(x => x.place)).toEqual([1, 1])
  })

  it('команда без очков (пришла в середине игры) просто последняя', () => {
    const teams = [team('a', 'A'), team('late', 'Опоздавшие')]
    const totals = new Map([['a', 12]])
    const r = rankTeams(teams, totals, [])
    expect(r[1].team.id).toBe('late')
    expect(r[1].total).toBe(0)
  })
})
