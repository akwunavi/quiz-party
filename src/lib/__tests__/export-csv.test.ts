import { describe, it, expect } from 'vitest'
import { exportPackCsv } from '../exportCsv'
import type { LoadedPack } from '../packLoader'

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
    expect(rows[0]).toBe(15)   // 11 базовых + озвучка(2) + оценки(2)
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
