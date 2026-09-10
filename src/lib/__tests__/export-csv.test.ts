import { describe, it, expect } from 'vitest'
import { exportPackCsv, shownKey } from '../exportCsv'
import type { LoadedPack } from '../packLoader'
import type { Answer, Team, PackPlay } from '../../types/quiz'

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
    // 11 базовых + озвучка(2) + оценки(2) + отыгрышей(1) + статистика игры(4) + сырые ответы(1)
    expect(rows[0]).toBe(21)
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
      shownAt: new Map([[shownKey('g', 'q-a'), '2026-01-01T00:00:00.000Z']]),
    })
    expect(csv.split('\r\n')[1]).toContain('"15"')   // среднее (10+20)/2
  })

  it('shownAt по чужому game_id не считается (составной ключ, не голый ref)', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [ans('q-a', 'да', true, '2026-01-01T00:00:10.000Z')],
      // запись про ДРУГУЮ игру с тем же question_ref не должна подмешаться
      shownAt: new Map([[shownKey('другая-игра', 'q-a'), '2026-01-01T00:00:00.000Z']]),
    })
    // без метки показа СВОЕЙ игры скорость не считается — колонка пустая
    const line = csv.split('\r\n')[1]
    expect(line).not.toContain('"10"')
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

describe('shownKey — составной ключ показа вопроса (истории 0013)', () => {
  it('детерминированный и одинаковый для одних и тех же аргументов', () => {
    expect(shownKey('game1', 'q-a')).toBe(shownKey('game1', 'q-a'))
  })

  it('разные game_id при одном question_ref дают РАЗНЫЕ ключи', () => {
    // регресс-тест на схлопывание: раньше карта тайминга индексировалась
    // голым question_ref, и запись одной игры затирала другую
    expect(shownKey('game1', 'q-a')).not.toBe(shownKey('game2', 'q-a'))
  })

  it('разные question_ref при одном game_id тоже дают разные ключи', () => {
    expect(shownKey('game1', 'q-a')).not.toBe(shownKey('game1', 'q-b'))
  })
})

describe('история отыгрышей пакета (issue #3 + миграция 0013)', () => {
  const ans = (question_ref: string, answer_text: string, game_id: string,
    created_at?: string, team_id = 't1'): Answer => ({
    id: `${question_ref}-${game_id}-${Math.random()}`, team_id, game_id,
    question_ref, round_number: 0, answer_text, stake: null, is_correct: null,
    updated_at: '2026-01-01', created_at,
  })
  const play = (game_id: string, played_at: string): PackPlay =>
    ({ id: game_id, pack_id: 'p', game_id, played_at })

  it('колонка «Отыгрышей в статистике» — в шапке и в строке одновременно', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [ans('q-a', 'да', 'g1')],
      plays: [play('g1', '2026-09-05T00:00:00.000Z')],
    })
    const [header, row] = csv.split('\r\n')
    expect(header).toContain('Отыгрышей в статистике')
    expect(row).toContain('"1"')
  })

  it('без переданного plays считает по числу различных game_id в ответах', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [ans('q-a', 'да', 'g1'), ans('q-a', 'нет', 'g2')],
    })
    const row = csv.split('\r\n')[1]
    const cols = row.split('";"')
    // индекс колонки «Отыгрышей в статистике» — сразу после «Скрыт» (15-я, 0-based 15)
    expect(cols[15]).toBe('2')
  })

  it('при одной игре в выборке ответы идут без даты-префикса', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [ans('q-a', 'да', 'g1')],
      teams: [{ id: 't1', name: 'Команда', color: '#fff', game_id: 'g1', icon: null, last_seen_at: null }],
      plays: [play('g1', '2026-09-05T00:00:00.000Z')],
    })
    const row = csv.split('\r\n')[1]
    expect(row).toContain('Команда: да')
    expect(row).not.toContain('05.09 Команда')
  })

  it('при нескольких играх в выборке ответ префиксуется короткой датой отыгрыша', () => {
    const csv = exportPackCsv(pack, new Map(), undefined, {
      answers: [ans('q-a', 'Дели', 'g1', undefined, 't1'), ans('q-a', 'Мумбаи', 'g2', undefined, 't2')],
      teams: [{ id: 't2', name: 'Котики', color: '#fff', game_id: 'g2', icon: null, last_seen_at: null }],
      plays: [play('g1', '2026-09-05T00:00:00.000Z'), play('g2', '2026-09-08T00:00:00.000Z')],
    })
    const row = csv.split('\r\n')[1]
    expect(row).toContain('05.09 ?: Дели')
    expect(row).toContain('08.09 Котики: Мумбаи')
  })
})
