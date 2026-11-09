// «Скачки бульдогов»: старт гонки, открытие ставок и «забег окончен» пишутся ЗАЩИЩЁННО (CAS по state_rev, как мелодия, 9.61):
// независимая эмуляция хранилища с настоящей семантикой версии (рост только на реальное изменение). Сценарии — по правилам игры.
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { GameState, MelodyState } from '../../types/quiz'
import type { CasResult, SessionPatch } from '../transport/types'

let session: GameState
const room = {
  readSession: vi.fn(async () => structuredClone(session)),
  patchSession: vi.fn(async (_r: unknown, p: SessionPatch) => { session = { ...session, ...p } as GameState }),
  casSession: vi.fn(async (_r: unknown, rev: number, p: SessionPatch): Promise<CasResult> => {
    if (session.state_rev !== rev) return { ok: false, current: structuredClone(session) }
    session = { ...session, ...p, state_rev: rev + 1 } as GameState
    return { ok: true, stateRev: session.state_rev as number }
  }),
}
vi.mock('../transport', () => ({ room }))
vi.mock('../room', () => ({ getRoomId: () => 'room-1' }))
const { startRace, openRaceBets, finishRace, startRaceFn, openBetsFn, finishRaceFn } = await import('../raceActions')
const mk = (melody: MelodyState = {}): GameState => ({ id: 1, game_id: 'g', pack_id: 'p', phase: 'question', round_number: 2, question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [], updated_at: '', melody, state_rev: 0 }) as GameState
const race = () => session.melody?.race

describe('raceActions', () => {
  beforeEach(() => { session = mk(); Object.values(room).forEach(f => f.mockClear()) })

  it('открыть ставки → «betting», остальное melody не затирается', async () => {
    session = mk({ jp: { tile: 1 } } as never)
    expect(await openRaceBets(session)).toBe('written')
    expect(race()).toEqual({ stage: 'betting', round: 2, game: 'g' }); expect((session.melody as never as { jp: unknown }).jp).toEqual({ tile: 1 })
  })
  it('перезагрузка/повтор проектора НЕ возвращает идущую гонку в «betting»', async () => {
    session = { ...mk({ race: { stage: 'running', seed: 7, D: 42, startedAt: 'x' } }), state_rev: 5 }; const stale = mk()   // экран держит устаревший снимок «гонки нет»
    expect(await openRaceBets(stale)).toBe('already')
    expect(race()).toMatchObject({ stage: 'running', seed: 7 })
  })
  it('старт: running + сид uint32 + startedAt + D; D по умолчанию 42', async () => {
    session = mk({ race: { stage: 'betting' } })
    await startRace(session, 60)
    expect(race()).toMatchObject({ stage: 'running', D: 60 }); expect(Number.isInteger(race()!.seed)).toBe(true)
    expect(race()!.seed!).toBeGreaterThanOrEqual(0); expect(race()!.seed!).toBeLessThanOrEqual(0xffffffff)
    expect(Number.isFinite(Date.parse(race()!.startedAt!))).toBe(true)
    session = mk({ race: { stage: 'betting' } }); await startRace(session); expect(race()!.D).toBe(42)
  })
  it('два «Старта» подряд (двойной клик / проектор + пульт): гонка стартует ОДИН раз, сид и startedAt не меняются', async () => {
    session = mk({ race: { stage: 'betting' } }); const snap = structuredClone(session)
    const [a, b] = await Promise.all([startRace(snap, 42), startRace(snap, 42)])
    expect([a, b].sort()).toEqual(['already', 'written'])
    const first = { ...race() }; expect(await startRace(snap, 42)).toBe('already'); expect(race()).toEqual(first)
  })
  it('старт без открытых ставок — понятная ошибка, ничего не пишется', async () => {
    session = mk(); await expect(startRace(session)).rejects.toThrow(/выбор ещё не открыт/); expect(race()).toBeUndefined()
  })
  it('«забег окончен»: только своему сиду и только из running; повтор — без записи', async () => {
    session = mk({ race: { stage: 'running', seed: 5, D: 42, startedAt: 'x' } })
    expect(await finishRace(session, 99)).toBe('already'); expect(race()!.stage).toBe('running')   // чужой сид (запоздавшая запись)
    expect(await finishRace(session, 5)).toBe('written'); expect(race()).toMatchObject({ stage: 'done', seed: 5, D: 42 })
    const calls = room.casSession.mock.calls.length
    expect(await finishRace(session, 5)).toBe('already'); expect(room.casSession.mock.calls.length).toBe(calls)
  })
  it('запоздавший finishRace прошлого раунда не трогает следующий (там другой race)', async () => {
    session = mk({ race: { stage: 'betting' } })
    expect(await finishRace(session, 5)).toBe('already'); expect(race()).toEqual({ stage: 'betting' })
    session = mk({ race: { stage: 'running', seed: 6, D: 42, startedAt: 'y' } })
    expect(await finishRace(session, 5)).toBe('already'); expect(race()!.stage).toBe('running')
  })
  it('чистые условия идемпотентны', () => {
    const at = { round: 2, game: 'g' }
    expect(openBetsFn(at)({ race: { stage: 'betting', round: 2, game: 'g' } })).toBeNull(); expect(startRaceFn(at, 1, 't', 42)({ race: { stage: 'running', round: 2, game: 'g' } })).toBeNull()
    expect(finishRaceFn(at, 1)({ race: { stage: 'done', seed: 1, round: 2, game: 'g' } })).toBeNull()
  })
  // найдено сквозным тестом на настоящем backend (e2e/bulldog/net.cjs, S19): мешок melody общий на комнату
  it('второй раунд-гонка: «завершённая» гонка ПРОШЛОГО раунда не мешает открыть ставки нового', async () => {
    session = { ...mk({ race: { stage: 'done', seed: 9, D: 42, startedAt: 'x', round: 0, game: 'g' } }), round_number: 2, state_rev: 4 }
    expect(await openRaceBets(session)).toBe('written')
    expect(race()).toEqual({ stage: 'betting', round: 2, game: 'g' })
  })
  it('новая игра в той же комнате (другой game_id): старая гонка не читается как текущая', async () => {
    session = { ...mk({ race: { stage: 'done', seed: 9, D: 42, startedAt: 'x', round: 2, game: 'OLD' } }), state_rev: 4 }
    expect(await openRaceBets(session)).toBe('written'); expect(race()).toMatchObject({ stage: 'betting', game: 'g' })
  })
  it('возврат к уже сыгранному раунду после более позднего: показан итог (done), ставки НЕ открываются заново', async () => {
    session = { ...mk({ race: { stage: 'running', seed: 5, D: 42, startedAt: 'a', round: 0, game: 'g' } }), round_number: 0, state_rev: 3 }
    expect(await finishRace(session, 5)).toBe('written')                      // раунд 0 сыгран и записан в raceDone
    session = { ...session, round_number: 2 }; expect(await openRaceBets(session)).toBe('written')   // раунд 2: слот race занят новой гонкой
    const { raceOf } = await import('../bulldog/bets')
    expect(raceOf(session.melody, 0, 'g')).toMatchObject({ stage: 'done', seed: 5 })    // назад в раунд 0 — итог прежней гонки
    expect(raceOf(session.melody, 2, 'g').stage).toBe('betting')
    session = { ...session, round_number: 0 }; expect(await openRaceBets(session)).toBe('already')
  })
  it('старт и «окончен» привязаны к раунду и игре: чужая запись не проходит', async () => {
    session = { ...mk({ race: { stage: 'betting', round: 0, game: 'g' } }), state_rev: 1 }   // ставки ДРУГОГО раунда (текущий — 2)
    await expect(startRace(session)).rejects.toThrow(/выбор ещё не открыт/)
    session = { ...mk({ race: { stage: 'running', seed: 5, D: 42, round: 7, game: 'g' } }), state_rev: 1 }
    expect(await finishRace(session, 5)).toBe('already'); expect(race()!.stage).toBe('running')
  })
})

describe('raceOf', () => {
  it('подходящее состояние отдаётся, чужое раунда/игры — пустое, без полей (старая запись) — подходит', async () => {
    const { raceOf } = await import('../bulldog/bets')
    expect(raceOf({ race: { stage: 'done', round: 1, game: 'g' } }, 1, 'g').stage).toBe('done')
    expect(raceOf({ race: { stage: 'done', round: 1, game: 'g' } }, 2, 'g')).toEqual({})
    expect(raceOf({ race: { stage: 'done', round: 1, game: 'g' } }, 1, 'h')).toEqual({})
    expect(raceOf({ race: { stage: 'running' } }, 5, 'x').stage).toBe('running'); expect(raceOf(undefined, 0, 'g')).toEqual({})
  })
})
