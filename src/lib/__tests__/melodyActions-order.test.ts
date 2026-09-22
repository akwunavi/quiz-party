// ═══ gradeMelody/passMelody: CAS ДО patchAnswer, не после (9.62) ═══
// (ревью 9.62, HANDOFF §3bx, находка 3)
//
// Раньше обе функции сначала звали room.patchAnswer(...) (необратимо
// меняли оценку ответа команды), и только ПОТОМ пытались провести CAS-
// переход стадии. Если CAS не проходил (условие уже неактуально — ход
// ушёл другой команде на другом экране, или пульт уже поставил вердикт) —
// patchAnswer уже применился, а ведущий видел «кнопка устарела» и думал,
// что ничего не произошло. Тесты ниже доказывают ОБРАТНОЕ: при устаревшем
// снимке patchAnswer не должен вызываться вовсе.
//
// Фейковое хранилище — независимая эмуляция CAS-семантики (свой счётчик
// версий), как в sessionBag.test.ts, не копия кода.
import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Answer, GameState } from '../../types/quiz'
import type { CasResult, SessionPatch } from '../transport/types'

vi.mock('../room', () => ({ getRoomId: () => 'room1' }))

const BASE_SESSION: GameState = {
  id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
  question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
  updated_at: 't0', melody: {}, state_rev: 0,
}

function makeFakeRoom() {
  let session: GameState = { ...BASE_SESSION }
  const patchAnswerCalls: { id: string; patch: unknown }[] = []

  function applyRealChange(patch: SessionPatch) {
    const before = JSON.stringify({ ...session, state_rev: undefined, updated_at: undefined })
    session = { ...session, ...patch } as GameState
    const after = JSON.stringify({ ...session, state_rev: undefined, updated_at: undefined })
    if (after !== before) session.state_rev = (session.state_rev ?? 0) + 1
  }

  return {
    getSnapshot: () => session,
    setSnapshot: (s: GameState) => { session = s },
    patchAnswerCalls,
    async readSession(): Promise<GameState | null> { return { ...session } },
    async patchSession(_roomId: string | null, patch: SessionPatch): Promise<void> {
      applyRealChange(patch)
    },
    async casSession(_roomId: string | null, expectedRev: number, patch: SessionPatch): Promise<CasResult> {
      if (session.state_rev !== expectedRev) return { ok: false, current: { ...session } }
      applyRealChange(patch)
      return { ok: true, stateRev: session.state_rev as number }
    },
    async patchAnswer(id: string, patch: unknown): Promise<void> {
      patchAnswerCalls.push({ id, patch })
    },
  }
}

const fakeRoom = makeFakeRoom()
vi.mock('../transport', () => ({ get room() { return fakeRoom } }))

const ans: Answer = {
  id: 'ans-1', team_id: 'team-a', game_id: 'g1', question_ref: 'q-mel-0-0',
  round_number: 1, answer_text: 'ответ', stake: null, is_correct: null, updated_at: 't0',
}

describe('melodyActions: CAS сначала, patchAnswer только после успешной записи', () => {
  beforeEach(() => {
    fakeRoom.patchAnswerCalls.length = 0
    fakeRoom.setSnapshot({ ...BASE_SESSION })
  })

  // Сценарий (А) из находки 3: пульт жмёт "передать ход" (turn 0→1)
  // одновременно с проектором "✓ Верно" по устаревшему снимку (turn ещё 0).
  it('gradeMelody: ход уже ушёл другой команде — patchAnswer НЕ вызывается, ошибка "устарела"', async () => {
    const { gradeMelody } = await import('../melodyActions')
    // ведущий на проекторе читал состояние с turn=0
    const staleGs: GameState = { ...BASE_SESSION, melody: { key: '0-0', stage: 'answering', turn: 0 } }
    // но в БД ход уже ушёл ко второй команде (кто-то успел передать ход)
    fakeRoom.setSnapshot({
      ...BASE_SESSION, state_rev: 1,
      melody: { key: '0-0', stage: 'passed', turn: 1 },
    })

    await expect(gradeMelody(staleGs, ans, true, 3)).rejects.toThrow(/устарела/)
    expect(fakeRoom.patchAnswerCalls).toHaveLength(0)
  })

  // Сценарий (Б) из находки 3: пульт уже поставил "✓ ВЕРНО" (стадия ушла в
  // reveal), проектор в этот момент жмёт "✗ Передать ход" на устаревшем
  // снимке, где is_correct ещё выглядел null.
  it('passMelody: пульт уже засчитал верный ответ (stage=reveal) — не затирает его', async () => {
    const { passMelody } = await import('../melodyActions')
    const staleGs: GameState = { ...BASE_SESSION, melody: { key: '0-0', stage: 'answering', turn: 0 } }
    fakeRoom.setSnapshot({
      ...BASE_SESSION, state_rev: 1,
      melody: { key: '0-0', stage: 'reveal', turn: 0, wonPts: 2, wonTeam: 'team-a' },
    })
    const staleAns: Answer = { ...ans, is_correct: null } // на проекторе ещё не видно вердикта

    await expect(passMelody(staleGs, staleAns)).rejects.toThrow(/устарела/)
    expect(fakeRoom.patchAnswerCalls).toHaveLength(0)
  })

  // Контрольный положительный случай: снимок актуален — обе операции
  // проходят, и patchAnswer вызывается РОВНО один раз, с очками, которые
  // реально были применены в CAS-записи (не с внешнего устаревшего gs).
  it('gradeMelody: актуальный снимок — CAS проходит, patchAnswer вызывается с правильными очками', async () => {
    const { gradeMelody } = await import('../melodyActions')
    fakeRoom.setSnapshot({
      ...BASE_SESSION, melody: { key: '0-0', stage: 'answering', turn: 0 },
    })
    const gs = fakeRoom.getSnapshot()

    await gradeMelody(gs, ans, true, 3) // ставка 3 сек, первая команда → 2 балла

    expect(fakeRoom.patchAnswerCalls).toHaveLength(1)
    expect(fakeRoom.patchAnswerCalls[0]).toEqual({ id: 'ans-1', patch: { is_correct: true, stake: 2 } })
    expect(fakeRoom.getSnapshot().melody?.stage).toBe('reveal')
  })

  it('passMelody: актуальный снимок, ответ ещё не оценён — отмечает промах и передаёт ход', async () => {
    const { passMelody } = await import('../melodyActions')
    fakeRoom.setSnapshot({
      ...BASE_SESSION,
      melody: { key: '0-0', stage: 'answering', turn: 0, order: ['team-a', 'team-b'] },
    })
    const gs = fakeRoom.getSnapshot()

    await passMelody(gs, ans)

    expect(fakeRoom.patchAnswerCalls).toHaveLength(1)
    expect(fakeRoom.patchAnswerCalls[0]).toEqual({ id: 'ans-1', patch: { is_correct: false, stake: 0 } })
    expect(fakeRoom.getSnapshot().melody?.stage).toBe('passed')
  })
})
