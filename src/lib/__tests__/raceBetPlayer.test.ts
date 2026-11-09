// Телефон игрока «Скачек»: ставка после закрытия выбора — только серверная; недоставленный выбор из очереди снимается. (Модульные проверки;
// настоящее закрытие на сервере проверяет scripts/db-test/race-bets.sh на живом PostgreSQL.)
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { effectiveBet } from '../bulldog/bets'
const upsertAnswers = vi.fn()
vi.mock('../transport', () => ({ room: { upsertAnswers: (...a: unknown[]) => upsertAnswers(...a) } }))
beforeEach(() => {
  vi.resetModules(); upsertAnswers.mockReset()
  let st: Record<string, string> = {}
  vi.stubGlobal('localStorage', { getItem: (k: string) => st[k] ?? null, setItem: (k: string, v: string) => { st[k] = v }, removeItem: (k: string) => { delete st[k] }, clear: () => { st = {} } })
})
describe('какую ставку показывает телефон', () => {
  it('пока выбор открыт — свой выбор побеждает (кнопка отзывается сразу)', () => { expect(effectiveBet('betting', 3, 1)).toBe(3); expect(effectiveBet('betting', null, 2)).toBe(2) })
  it('после старта — только серверная: недоставленный локальный выбор не показывается', () => {
    expect(effectiveBet('running', 5, null)).toBeNull(); expect(effectiveBet('running', 5, 2)).toBe(2); expect(effectiveBet('done', 4, 4)).toBe(4)
  })
})
describe('очередь ответов: недоставленная ставка после закрытия выбора', () => {
  it('dropPending убирает её — после перезагрузки телефона она не полетит на сервер', async () => {
    const { enqueueAnswer, dropPending } = await import('../answerQueue')
    upsertAnswers.mockImplementation(() => new Promise(() => {}))   // сеть «висит»: запись остаётся в очереди
    await enqueueAnswer({ team_id: 't1', game_id: 'g', question_ref: 'q-race-2', round_number: 2, answer_text: '4' })
    await enqueueAnswer({ team_id: 't1', game_id: 'g', question_ref: 'q-abc', round_number: 2, answer_text: 'x' })
    dropPending('t1', 'q-race-2')
    const left = JSON.parse(localStorage.getItem('qp-answer-queue')!)
    expect(left.map((a: { question_ref: string }) => a.question_ref)).toEqual(['q-abc'])   // чужие ответы очереди не тронуты
  })
})
