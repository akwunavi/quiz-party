// ═══ Тесты заливки локальной игры в облако (шаг 7) ═══
//
// room — мок: интересует не то, как работает supabaseTransport (это уже
// покрыто contract.test.ts), а то, что importLocalGame.ts правильно
// разбирает файл, честно считает пересечения и вызывает транспорт с
// правильно переложенными id команд.
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Team, Answer } from '../../types/quiz'

const roomMock = {
  listTeams: vi.fn<(gameId: string) => Promise<Team[]>>(),
  listAnswers: vi.fn<(gameId: string) => Promise<Answer[]>>(),
  upsertTeam: vi.fn(),
  upsertAnswers: vi.fn(),
  writeBlitz: vi.fn(),
  patchSession: vi.fn(),
}

vi.mock('../transport', () => ({ room: roomMock }))
vi.mock('../room', () => ({ getRoomId: () => 'room-1' }))

const {
  parseLocalExport, summarizeLocalImport, summaryText, importLocalGame,
} = await import('../importLocalGame')

function team(over: Partial<Team> = {}): Team {
  return { id: 't1', name: 'Орлы', color: '#f00', icon: null, game_id: null, last_seen_at: null, ...over }
}

beforeEach(() => {
  vi.clearAllMocks()
  roomMock.listTeams.mockResolvedValue([])
  roomMock.listAnswers.mockResolvedValue([])
  roomMock.upsertTeam.mockImplementation(async (row: { name: string }) => team({ id: `cloud-${row.name}`, name: row.name }))
})

const exportFixture = {
  session: { game_id: 'local-game-1', pack_id: 'pack1', phase: 'finale', round_number: 2, question_index: 0, id: 1 as const, updated_at: 'x' },
  teams: [
    { id: 'local-1', name: 'Орлы', color: '#f00', icon: '🦅' },
    { id: 'local-2', name: 'Совы', color: '#00f', icon: '🦉' },
  ],
  answers: [
    { team_id: 'local-1', question_ref: 'q-1', round_number: 0, answer_text: '42', is_correct: true },
    { team_id: 'local-2', question_ref: 'q-1', round_number: 0, answer_text: '7', is_correct: false },
  ],
  blitz: [{ round_number: 1, state: { order: [] } as never }],
}

describe('parseLocalExport', () => {
  it('парсит валидный файл', () => {
    const parsed = parseLocalExport(JSON.stringify(exportFixture))
    expect(parsed.teams).toHaveLength(2)
    expect(parsed.answers).toHaveLength(2)
    expect(parsed.session.game_id).toBe('local-game-1')
  })

  it('бросает понятную ошибку на не-JSON', () => {
    expect(() => parseLocalExport('не json{')).toThrow(/не JSON/)
  })

  it('бросает понятную ошибку без session.game_id', () => {
    expect(() => parseLocalExport(JSON.stringify({ teams: [], answers: [] })))
      .toThrow(/session/)
  })

  it('бросает понятную ошибку без teams/answers', () => {
    expect(() => parseLocalExport(JSON.stringify({ session: { game_id: 'g1' } })))
      .toThrow(/команд/)
  })

  it('blitz необязателен — по умолчанию пустой массив', () => {
    const parsed = parseLocalExport(JSON.stringify({ session: { game_id: 'g1' }, teams: [], answers: [] }))
    expect(parsed.blitz).toEqual([])
  })
})

describe('summarizeLocalImport', () => {
  it('на свежий game_id пересечений нет', async () => {
    const s = await summarizeLocalImport(exportFixture)
    expect(s.teamsCount).toBe(2)
    expect(s.answersCount).toBe(2)
    expect(s.blitzRoundsCount).toBe(1)
    expect(s.teamsOverwritten).toBe(0)
    expect(s.answersOverwritten).toBe(0)
  })

  it('находит пересечение по имени команды и team_id+question_ref', async () => {
    roomMock.listTeams.mockResolvedValue([team({ id: 'cloud-1', name: 'Орлы' })])
    roomMock.listAnswers.mockResolvedValue([
      { id: 'a1', team_id: 'cloud-1', game_id: 'local-game-1', question_ref: 'q-1', round_number: 0,
        answer_text: 'старое', stake: null, is_correct: null, updated_at: 'x', created_at: 'x' } as Answer,
    ])
    const s = await summarizeLocalImport(exportFixture)
    expect(s.teamsOverwritten).toBe(1)
    expect(s.answersOverwritten).toBe(1)
  })

  it('summaryText упоминает числа', async () => {
    const s = await summarizeLocalImport(exportFixture)
    const text = summaryText(s)
    expect(text).toContain('Команд: 2')
    expect(text).toContain('Ответов: 2')
    expect(text).toMatch(/новая запись/)
  })
})

describe('importLocalGame', () => {
  it('заливает команды первыми, перекладывает team_id в ответах, пишет блиц и сессию', async () => {
    await importLocalGame(exportFixture)

    expect(roomMock.upsertTeam).toHaveBeenCalledTimes(2)
    expect(roomMock.upsertTeam).toHaveBeenNthCalledWith(1, {
      name: 'Орлы', color: '#f00', icon: '🦅', game_id: 'local-game-1', last_seen_at: null,
    })

    expect(roomMock.upsertAnswers).toHaveBeenCalledTimes(1)
    const rows = roomMock.upsertAnswers.mock.calls[0][0]
    expect(rows).toHaveLength(2)
    expect(rows[0].team_id).toBe('cloud-Орлы')
    expect(rows[0].game_id).toBe('local-game-1')
    expect(rows[1].team_id).toBe('cloud-Совы')

    expect(roomMock.writeBlitz).toHaveBeenCalledWith('local-game-1', 1, { order: [] })

    expect(roomMock.patchSession).toHaveBeenCalledTimes(1)
    const [roomId, patch] = roomMock.patchSession.mock.calls[0]
    expect(roomId).toBe('room-1')
    expect(patch.game_id).toBe('local-game-1')
    expect(patch.phase).toBe('finale')
    expect(patch).not.toHaveProperty('id')
    expect(patch).not.toHaveProperty('updated_at')
  })

  it('бросает понятную ошибку, если ответ ссылается на неизвестную команду', async () => {
    const broken = {
      ...exportFixture,
      answers: [{ team_id: 'ghost', question_ref: 'q-1', round_number: 0, answer_text: 'x' }],
    }
    await expect(importLocalGame(broken)).rejects.toThrow(/неизвестную команду/)
  })

  it('не вызывает upsertAnswers, если ответов нет', async () => {
    await importLocalGame({ ...exportFixture, answers: [] })
    expect(roomMock.upsertAnswers).not.toHaveBeenCalled()
  })
})
