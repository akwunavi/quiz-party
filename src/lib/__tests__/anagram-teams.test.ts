// GAME-02 (10.30): строки панели команд «Скрэмбла» — порядок, время по серверным часам, вердикт.
import { describe, it, expect } from 'vitest'
import { anagramTeamRows } from '../anagram'
import type { Answer } from '../../types/quiz'

const ans = (team: string, text: string, at: string, extra: Partial<Answer> = {}): Answer =>
  ({ id: team + at, game_id: 'g', team_id: team, question_ref: 'q-x', round_number: 0, answer_text: text,
    is_correct: null, accepted_at: at, updated_at: at, ...extra }) as unknown as Answer

const START = '2026-01-01T10:00:00.000Z'
const teams = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]

describe('anagramTeamRows', () => {
  it('порядок — как у списка команд, не по времени ответа; без ответа — sent:false', () => {
    const rows = anagramTeamRows(teams, [ans('c', 'КОТ', '2026-01-01T10:00:03.000Z'), ans('a', 'КИТ', '2026-01-01T10:00:09.000Z')], START, 'КОТ')
    expect(rows.map(r => r.teamId)).toEqual(['a', 'b', 'c'])
    expect(rows.map(r => r.sent)).toEqual([true, false, true])
  })
  it('время — от серверного старта до accepted_at', () => {
    const [r] = anagramTeamRows([{ id: 'a' }], [ans('a', 'КОТ', '2026-01-01T10:00:07.250Z')], START, 'КОТ')
    expect(r.ms).toBe(7250)
  })
  it('вердикт: ручная оценка главнее точной проверки; Ё=Е', () => {
    const rows = anagramTeamRows(teams, [
      ans('a', 'елка', '2026-01-01T10:00:01.000Z'),
      ans('b', 'КОТ', '2026-01-01T10:00:02.000Z', { is_correct: false }),
    ], START, 'ёлка')
    expect(rows[0].verdict).toBe(true)
    expect(rows[1].verdict).toBe(false)
    expect(rows[2].verdict).toBeNull()
  })
  it('пустой ответ не считается отправленным; при нескольких записях — поздняя', () => {
    const rows = anagramTeamRows([{ id: 'a' }], [ans('a', '  ', '2026-01-01T10:00:09.000Z'),
      ans('a', 'ПЕРВЫЙ', '2026-01-01T10:00:02.000Z'), ans('a', 'ВТОРОЙ', '2026-01-01T10:00:05.000Z')], START, 'X')
    expect(rows[0].text).toBe('ВТОРОЙ')
    const none = anagramTeamRows([{ id: 'a' }], [ans('a', ' ', START)], START, 'X')
    expect(none[0].sent).toBe(false)
  })
})
