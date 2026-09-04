import { describe, it, expect } from 'vitest'
import { exportPackCsv } from '../exportCsv'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team } from '../../types/quiz'

// Колонки шапки и колонки строк живут в разных местах функции — добавил
// поле в одном и забыл в другом, и вся таблица уезжает вправо, причём
// молча. Тест держит их в согласии.

const q = (id: string, voice?: string) => ({
  id, hidden: false, question_text: 'Вопрос?', answer_note: '',
  answer: { mode: 'free_text', correct: 'да', display: 'да' },
  media: { question: [], answer: [], ...(voice ? { voice } : {}) },
})

const pack = {
  rounds: [{
    id: 'r', mechanic: 'sprint', timer_seconds: 60, off_scoreboard: false,
    title_lines: ['РАЗМИНКА'], settings: {},
    questions: [q('a', 'pack-1/voice-a.mp3'), q('b')],
  }],
} as unknown as LoadedPack

const parse = (csv: string) =>
  csv.replace(/^\uFEFF/, '').split('\r\n').map(l => l.split('";"').length)

describe('выгрузка в таблицу', () => {
  it('число колонок в строках совпадает с шапкой', () => {
    const rows = parse(exportPackCsv(pack, new Map()))
    expect(rows[0]).toBe(20)   // 11 базовых + озвучка(2) + оценки(2) + статистика игры(4) + сырые ответы(1)
    expect(rows[1]).toBe(rows[0])
    expect(rows[2]).toBe(rows[0])
  })

  it('есть колонка озвучки и признак «да/нет»', () => {
    const csv = exportPackCsv(pack, new Map([['pack-1/voice-a.mp3', 'https://x/voice-a.mp3']]))
    expect(csv).toContain('Озвучка')
    expect(csv).toContain('Есть озвучка')
    // у первого вопроса озвучка есть, у второго нет
    expect(csv).toContain('https://x/voice-a.mp3')
    expect(csv).toContain('"да"')
    expect(csv).toContain('"нет"')
  })

  it('без озвучки колонка пустая, а признак — «нет»', () => {
    const only = { rounds: [{ ...pack.rounds[0], questions: [q('b')] }] } as unknown as LoadedPack
    const line = exportPackCsv(only, new Map()).split('\r\n')[1]
    expect(line).toContain('"нет"')
  })
})

describe('колонки оценок', () => {
  it('без оценок колонки пустые, число колонок не меняется', () => {
    const csv = exportPackCsv(pack, new Map())
    const cols = csv.replace(/^\uFEFF/, '').split('\r\n').map(l => l.split('";"').length)
    expect(cols[1]).toBe(cols[0])
  })

  it('средняя и число голосов попадают в строку своего вопроса', () => {
    const rated = new Map([['q-a', { avg: 8.25, votes: 4 }]])
    const lines = exportPackCsv(pack, new Map(), rated).split('\r\n')
    expect(lines[1]).toContain('"8.3"')   // округление до одного знака
    expect(lines[1]).toContain('"4"')
    // у второго вопроса оценок нет — колонки пустые
    expect(lines[2]).toContain('"";""')
  })
})

describe('статистика последней игры (issue #3)', () => {
  const ans = (question_ref: string, answer_text: string, is_correct: boolean | null,
    created_at?: string): Answer => ({
    id: `${question_ref}-${answer_text}-${Math.random()}`, team_id: 't', game_id: 'g',
    question_ref, round_number: 0, answer_text, stake: null, is_correct,
    updated_at: '2026-01-01', created_at,
  })

  it('без ответов игры новые колонки пустые', () => {
    const csv = exportPackCsv(pack, new Map())
    expect(csv.split('\r\n')[1]).toContain('"";"";"";"";""')
  })

  it('число ответов и % верных считаются по вопросу', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [ans('q-a', 'да', true), ans('q-a', 'нет', false), ans('q-a', 'да', null)],
    })
    const line = csv.split('\r\n')[1]
    expect(line).toContain('"3"')     // три ответа
    expect(line).toContain('"50"')    // из двух оценённых один верный
  })

  it('скорость ответа — от показа вопроса до отправки, по всем командам', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [
        ans('q-a', 'да', true, '2026-01-01T00:00:10.000Z'),
        ans('q-a', 'да', true, '2026-01-01T00:00:20.000Z'),
      ],
      shownAt: new Map([['q-a', '2026-01-01T00:00:00.000Z']]),
    })
    expect(csv.split('\r\n')[1]).toContain('"15"')   // среднее (10+20)/2
  })

  it('распределение по вариантам — только у choice-вопросов', () => {
    const choicePack = { rounds: [{ ...pack.rounds[0], questions: [{
      id: 'c', hidden: false, question_text: 'Что?', answer_note: '',
      answer: { mode: 'choice', correct_choice: 'Б', display: 'Б',
        choices: [{ key: 'А', text: 'х' }, { key: 'Б', text: 'у' }] },
      media: { question: [], answer: [] },
    }] }] } as unknown as LoadedPack
    const csv = exportPackCsv(choicePack, new Map(), undefined, {
      answers: [ans('q-c', 'Б', true), ans('q-c', 'Б', true), ans('q-c', 'А', false)],
    })
    expect(csv.split('\r\n')[1]).toContain('А: 1 | Б: 2')
    // у free_text-вопроса распределения нет, но сырые ответы всё равно есть
    const plainCsv = exportPackCsv(pack, new Map(), undefined,
      { answers: [ans('q-a', 'да', true)] })
    const cols = plainCsv.split('\r\n')[1].split('";"')
    expect(cols[cols.length - 2]).toBe('')             // распределение пустое
    expect(cols[cols.length - 1]).toContain('да — верно')  // а сырой ответ есть
  })
})

describe('сырые ответы команд (уточнение ведущего: агрегатов мало)', () => {
  const ans = (question_ref: string, answer_text: string, is_correct: boolean | null,
    team_id = 't1'): Answer => ({
    id: `${question_ref}-${team_id}-${Math.random()}`, team_id, game_id: 'g',
    question_ref, round_number: 0, answer_text, stake: null, is_correct,
    updated_at: '2026-01-01',
  })
  const team = (id: string, name: string): Team =>
    ({ id, name, color: '#fff', game_id: 'g', icon: null, last_seen_at: null }) as Team

  it('каждый ответ команды виден с её именем и вердиктом', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [ans('q-a', 'Дели', false, 't1'), ans('q-a', 'Мумбаи', true, 't2')],
      teams: [team('t1', 'Смешные фламинго'), team('t2', 'Котики')],
    })
    const line = csv.split('\r\n')[1]
    expect(line).toContain('Смешные фламинго: Дели — неверно')
    expect(line).toContain('Котики: Мумбаи — верно')
  })

  it('без данных о команде — ответ виден с "?", ничего не теряется', () => {
    const csv = exportPackCsv(pack, new Map(), undefined,
      { answers: [ans('q-a', 'Дели', null, 't1')] })
    expect(csv.split('\r\n')[1]).toContain('?: Дели')
  })
})
