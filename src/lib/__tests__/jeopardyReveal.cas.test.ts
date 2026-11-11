// Аудит В7: «Своя игра» и «3 попытки» пишут защищённо — на СВЕЖИЙ мешок, а не на устаревший снимок экрана (раньше слепая перезапись стирала race/jp/rv других механик).
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { GameState, MelodyState } from '../../types/quiz'
import type { CasResult, SessionPatch } from '../transport/types'

let session: GameState
const room = {
  readSession: vi.fn(async () => structuredClone(session)),
  patchSession: vi.fn(async (_r: unknown, p: SessionPatch) => { session = { ...session, ...p } as GameState }),
  casSession: vi.fn(async (_r: unknown, rev: number, p: SessionPatch): Promise<CasResult> => {
    if (session.state_rev !== rev) return { ok: false, current: structuredClone(session) }
    session = { ...session, ...p, state_rev: rev + 1 } as GameState; return { ok: true, stateRev: session.state_rev as number }
  }),
}
vi.mock('../transport', () => ({ room }))
vi.mock('../room', () => ({ getRoomId: () => 'room-1' }))
vi.mock('../gameActions', () => ({ gotoQuestion: vi.fn(async () => {}), startTimer: vi.fn(async () => {}) }))
const { openJeopardyTile, closeJeopardyTile, showJeopardyAnswer, replayJeopardyTile } = await import('../jeopardyActions')
const { saveReveal, clearReveal } = await import('../revealActions')
const mk = (melody: MelodyState = {}): GameState => ({ id: 1, game_id: 'g', pack_id: 'p', phase: 'question', round_number: 0, question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [], updated_at: '', melody, state_rev: 5 } as unknown as GameState)

describe('«Своя игра» / «3 попытки»: защищённая запись', () => {
  beforeEach(() => { session = mk(); Object.values(room).forEach(f => f.mockClear()) })
  it('открытие плитки с устаревшим снимком НЕ стирает чужие ключи мешка (race, rv)', async () => {
    session = { ...mk({ race: { stage: 'running', seed: 7 }, rv: { phase: 2 } } as unknown as MelodyState), state_rev: 9 }   // в базе версия уже новее снимка (state_rev 5)
    await openJeopardyTile(mk(), 3)                                    // экран держит старый снимок с пустым мешком
    expect(session.melody?.race).toMatchObject({ stage: 'running', seed: 7 }); expect((session.melody as { rv?: unknown }).rv).toEqual({ phase: 2 }); expect(session.melody?.jp?.tile).toBe(3)
  })
  it('двойной клик по той же плитке не открывает её заново (replay не растёт); показ ответа и закрытие — идемпотентны', async () => {
    await openJeopardyTile(mk(), 3); const r1 = session.melody?.jp?.replay; await openJeopardyTile(mk(), 3); expect(session.melody?.jp?.replay).toBe(r1)
    await showJeopardyAnswer(session); const c = room.casSession.mock.calls.length; await showJeopardyAnswer(session); expect(room.casSession.mock.calls.length).toBe(c); expect(session.melody?.jp?.answer).toBe(true)
    await closeJeopardyTile(session, '3', []); expect(session.melody?.jp?.tile).toBe(null); const c2 = room.casSession.mock.calls.length; await closeJeopardyTile(session, '3', ['3']); expect(room.casSession.mock.calls.length).toBe(c2)
  })
  it('«переслушать» прибавляет счётчик на свежем мешке', async () => {
    await openJeopardyTile(mk(), 1); const r = session.melody!.jp!.replay!; await replayJeopardyTile(mk()); expect(session.melody?.jp?.replay).toBe(r + 1)
  })
  it('«3 попытки»: запись rv на свежий мешок не трогает jp/race; повтор того же состояния без записи; clear убирает только rv', async () => {
    session = mk({ jp: { tile: 2, answer: false, replay: 1 }, race: { stage: 'betting' } } as unknown as MelodyState)
    await saveReveal({}, { phase: 1 } as never); expect(session.melody?.jp?.tile).toBe(2); expect(session.melody?.race?.stage).toBe('betting'); expect((session.melody as { rv?: unknown }).rv).toEqual({ phase: 1 })
    const c = room.casSession.mock.calls.length; await saveReveal({}, { phase: 1 } as never); expect(room.casSession.mock.calls.length).toBe(c)
    await clearReveal({}); expect((session.melody as { rv?: unknown }).rv).toBeUndefined(); expect(session.melody?.jp?.tile).toBe(2)
  })
})
