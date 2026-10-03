// ═══ navGuard: переход пишется, только если игра всё ещё «там, откуда жали» ═══
// (9.78, HANDOFF §3cc). Сценарии — словами по живой игре; фейковое хранилище
// эмулирует настоящую CAS-семантику миграции 0014 (версия растёт только на
// реальное изменение), а не копирует код navGuard.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { GameState } from '../../types/quiz'
import type { CasResult, SessionPatch } from '../transport/types'

vi.mock('../room', () => ({ getRoomId: () => 'room1' }))
vi.mock('../supabase', () => ({ supabase: {} }))

let session: GameState
let beforeCas: (() => void) | null = null
function apply(patch: SessionPatch) {
  const before = JSON.stringify({ ...session, state_rev: undefined })
  session = { ...session, ...patch } as GameState
  if (JSON.stringify({ ...session, state_rev: undefined }) !== before && typeof session.state_rev === 'number')
    session.state_rev += 1
}
const fakeRoom = {
  async readSession(): Promise<GameState | null> { return { ...session } },
  async patchSession(_r: string | null, patch: SessionPatch) { apply(patch) },
  async casSession(_r: string | null, rev: number, patch: SessionPatch): Promise<CasResult> {
    if (beforeCas) { const f = beforeCas; beforeCas = null; f() }
    if (session.state_rev !== rev) return { ok: false, current: { ...session } }
    apply(patch)
    return { ok: true, stateRev: session.state_rev as number }
  },
}
vi.mock('../transport', () => ({ get room() { return fakeRoom } }))

const { gotoQuestion, startAnswerTime, gotoRound } = await import('../gameActions')
const { StaleNavError, navFrom } = await import('../navGuard')

const base = (over: Partial<GameState> = {}): GameState => ({
  id: 1, game_id: 'g', pack_id: 'p', phase: 'question', round_number: 2, question_index: 8,
  timer_started_at: 'x', reveal: false, completed_rounds: [], updated_at: '', state_rev: 10, ...over,
})

describe('переходы «откуда жали» (9.78)', () => {
  beforeEach(() => { session = base(); beforeCas = null })

  it('телефон «замёрз» на 6-м вопросе, игра уже на 9-м — «Далее» НЕ откатывает раунд', async () => {
    const stalePhone = base({ question_index: 5 })        // снимок пульта до заморозки
    await expect(gotoQuestion(6, navFrom(stalePhone))).rejects.toBeInstanceOf(StaleNavError)
    expect(session.question_index).toBe(8)
    expect(session.phase).toBe('question')
  })

  it('игра уже на «Отвечайте» — запоздалое автопролистывание вопроса ничего не пишет', async () => {
    session = base({ phase: 'answer_time' })
    await expect(gotoQuestion(8, { phase: 'question', round_number: 2, question_index: 7 }))
      .rejects.toBeInstanceOf(StaleNavError)
    expect(session.phase).toBe('answer_time')
  })

  it('пульт видит актуальный последний вопрос — переход на «Отвечайте» проходит', async () => {
    await startAnswerTime(navFrom(base()))
    expect(session.phase).toBe('answer_time')
  })

  it('между чтением и записью проектор стартовал таймер — переход всё равно проходит', async () => {
    beforeCas = () => apply({ timer_started_at: 'y' })   // чужая запись, игра на том же вопросе
    await startAnswerTime(navFrom(base()))
    expect(session.phase).toBe('answer_time')
  })

  it('между чтением и записью игру увели на другой вопрос — переход не пишется', async () => {
    beforeCas = () => apply({ question_index: 3 })
    await expect(startAnswerTime(navFrom(base()))).rejects.toBeInstanceOf(StaleNavError)
    expect(session.phase).toBe('question')
    expect(session.question_index).toBe(3)
  })

  it('без миграции 0014 (нет state_rev) — проверка по свежему чтению всё равно работает', async () => {
    session = base({ state_rev: undefined })
    await expect(gotoQuestion(6, navFrom(base({ question_index: 5 })))).rejects.toBeInstanceOf(StaleNavError)
    await gotoQuestion(0, navFrom(base()))
    expect(session.question_index).toBe(0)
  })

  // ревью 9.78, находка 1: переход, который УЖЕ прошёл, — не ошибка
  it('двойной тап «Далее»: второй клик видит игру уже на цели — успех, без ошибки и без перескока', async () => {
    const snap = navFrom(base({ question_index: 5 }))
    session = base({ question_index: 5 })
    await gotoQuestion(6, snap)
    await expect(gotoQuestion(6, snap)).resolves.toBeUndefined()
    expect(session.question_index).toBe(6)
  })

  it('ответ на запись потерялся, повтор видит конфликт — но цель уже достигнута, ошибки нет', async () => {
    beforeCas = () => apply({ phase: 'answer_time', timer_started_at: 'z', reveal: false })
    await expect(startAnswerTime(navFrom(base()))).resolves.toBeUndefined()
    expect(session.phase).toBe('answer_time')
  })

  it('пульт замёрз на табло 2-го раунда, игра уже в 3-м — «Дальше» не откатывает раунд на заставку', async () => {
    session = base({ phase: 'question', round_number: 3, question_index: 4 })
    await expect(gotoRound(3, undefined, { phase: 'scoreboard', round_number: 2, question_index: 8 }))
      .rejects.toBeInstanceOf(StaleNavError)
    expect(session.round_number).toBe(3)
    expect(session.question_index).toBe(4)
  })
})
