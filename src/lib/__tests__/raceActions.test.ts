// «Скачки бульдогов» (Race V3): старт гонки пишет в общее состояние сид, время и D — по ним ВСЕ экраны считают одну гонку.
import { beforeEach, describe, expect, it, vi } from 'vitest'
const roomMock = { patchSession: vi.fn().mockResolvedValue(undefined) }
vi.mock('../transport', () => ({ room: roomMock }))
vi.mock('../room', () => ({ getRoomId: () => 'room-1' }))
const { startRace, openRaceBets } = await import('../raceActions')
const gs = (melody: Record<string, unknown> = {}) => ({ id: 1, game_id: 'g', pack_id: 'p', phase: 'question', round_number: 2, question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [], updated_at: '', melody }) as never

describe('raceActions', () => {
  beforeEach(() => roomMock.patchSession.mockClear())
  it('startRace: stage running + сид uint32 + startedAt + D; остальное melody не затирается', async () => {
    await startRace(gs({ jp: { tile: 1 } }), 60)
    const [room, patch] = roomMock.patchSession.mock.calls[0]
    expect(room).toBe('room-1')
    const race = patch.melody.race
    expect(race.stage).toBe('running'); expect(race.D).toBe(60); expect(Number.isInteger(race.seed)).toBe(true)
    expect(race.seed).toBeGreaterThanOrEqual(0); expect(race.seed).toBeLessThanOrEqual(0xffffffff)
    expect(Number.isFinite(Date.parse(race.startedAt))).toBe(true); expect(patch.melody.jp).toEqual({ tile: 1 })
  })
  it('startRace по умолчанию пишет D = 42', async () => { await startRace(gs()); expect(roomMock.patchSession.mock.calls[0][1].melody.race.D).toBe(42) })
  it('сид рождается в момент вызова: два старта — разные сиды (с вероятностью 1 − 2⁻³²)', async () => {
    await startRace(gs()); await startRace(gs())
    expect(roomMock.patchSession.mock.calls[0][1].melody.race.seed).not.toBe(roomMock.patchSession.mock.calls[1][1].melody.race.seed)
  })
  it('openRaceBets: только stage betting', async () => { await openRaceBets(gs()); expect(roomMock.patchSession.mock.calls[0][1].melody.race).toEqual({ stage: 'betting' }) })
})
