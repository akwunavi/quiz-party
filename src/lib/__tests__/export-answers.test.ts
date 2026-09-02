import { describe, it, expect } from 'vitest'
import { exportAnswersCsv } from '../exportAnswers'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

const q = (id: string) => ({
  id, hidden: false, question_text: `Вопрос ${id}?`,
  answer: { mode: 'free_text', correct: 'да', display: 'да' },
  media: { question: [], answer: [] },
})

const pack = {
  rounds: [
    { id: 'r1', mechanic: 'standard', off_scoreboard: false, settings: {},
      title_lines: ['РАЗМИНКА'], questions: [q('a')] },
    { id: 'r2', mechanic: 'blitz', off_scoreboard: false, settings: {},
      title_lines: ['БЛИЦ'], questions: [] },
  ],
} as unknown as LoadedPack

const teams = [
  { id: 't1', name: 'Алые паруса', color: '#f00' },
  { id: 't2', name: 'Бирюза', color: '#0ff' },
] as unknown as Team[]

const ans = (over: Partial<Answer>): Answer => ({
  id: 'x', team_id: 't1', game_id: 'g', question_ref: 'q-a', round_number: 0,
  answer_text: '', stake: null, is_correct: null, updated_at: '2026-01-01T00:00:00Z',
  ...over,
} as Answer)

describe('выгрузка ответов по раундам (апелляции)', () => {
  it('число колонок в строках совпадает с шапкой', () => {
    const csv = exportAnswersCsv(pack, teams, [
      ans({ team_id: 't1', answer_text: 'да', is_correct: true }),
      ans({ team_id: 't2', answer_text: 'нет', is_correct: false }),
    ])
    const cols = csv.replace(/^\uFEFF/, '').split('\r\n').map(l => l.split('";"').length)
    expect(cols[1]).toBe(cols[0])
    expect(cols[2]).toBe(cols[0])
  })

  it('обычный вопрос — текст вопроса и правильный ответ подставлены', () => {
    const csv = exportAnswersCsv(pack, teams,
      [ans({ team_id: 't1', answer_text: 'да', is_correct: true })])
    expect(csv).toContain('Вопрос a?')
    expect(csv).toContain('РАЗМИНКА')
    expect(csv).toContain('Алые паруса')
    expect(csv).toContain('"верно"')
  })

  it('вердикт null — «не оценено», а не «неверно»', () => {
    const csv = exportAnswersCsv(pack, teams,
      [ans({ team_id: 't1', answer_text: 'может быть', is_correct: null })])
    expect(csv).toContain('"не оценено"')
  })

  it('особый ref (блиц) — читаемая пометка вместо текста вопроса', () => {
    const csv = exportAnswersCsv(pack, teams,
      [ans({ team_id: 't1', question_ref: 'q-blitz', round_number: 1, stake: 5, is_correct: true })])
    expect(csv).toContain('Блиц — итог раунда')
    expect(csv).toContain('БЛИЦ')
  })

  it('сортировка: сначала по раунду, затем по имени команды', () => {
    const csv = exportAnswersCsv(pack, teams, [
      ans({ team_id: 't2', question_ref: 'q-blitz', round_number: 1 }),
      ans({ team_id: 't1', question_ref: 'q-a', round_number: 0 }),
    ])
    const lines = csv.replace(/^\uFEFF/, '').split('\r\n')
    // первая строка данных — раунд 1 (разминка), вторая — раунд 2 (блиц)
    expect(lines[1]).toContain('РАЗМИНКА')
    expect(lines[2]).toContain('БЛИЦ')
  })

  it('время показа + created_at — считает скорость ответа в секундах', () => {
    const shownAt = new Map([['q-a', '2026-01-01T00:00:00Z']])
    const csv = exportAnswersCsv(pack, teams, [
      ans({ team_id: 't1', question_ref: 'q-a', created_at: '2026-01-01T00:00:07Z' }),
    ], shownAt)
    expect(csv).toContain('"7"')
  })

  it('нет данных о показе — колонка скорости пустая, а не падает', () => {
    const csv = exportAnswersCsv(pack, teams,
      [ans({ team_id: 't1', question_ref: 'q-a' })])
    expect(csv).not.toContain('NaN')
  })
})
