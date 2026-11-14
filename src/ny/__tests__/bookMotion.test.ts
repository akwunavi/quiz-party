// ═══ «Книга»: события анимаций не зависят от опроса (прототип этапа 2) ═══
import { describe, it, expect } from 'vitest'
import { REVEAL_LIVE_INIT, revealLiveStep, pageTurnKey, type TurnSnap } from '../book/motion'

const run = (steps: [string, boolean][]) => steps.reduce((s, [k, r]) => revealLiveStep(s, k, r), REVEAL_LIVE_INIT)

describe('Книга: «живое» раскрытие ответа', () => {
  it('нераскрыт → раскрыт на том же вопросе — живое; повторные снимки не сбрасывают и возвращают тот же объект', () => {
    const s = run([['0:3', false], ['0:3', false], ['0:3', true]])
    expect(s.live).toBe(true)
    expect(revealLiveStep(s, '0:3', true)).toBe(s)
  })
  it('первый снимок уже раскрыт (перезагрузка проектора) — не живое', () => {
    expect(run([['0:3', true], ['0:3', true]]).live).toBe(false)
  })
  it('следующий вопрос сбрасывает; раскрыт сразу (возврат назад) — не живое', () => {
    expect(run([['0:3', false], ['0:3', true], ['0:4', true]]).live).toBe(false)
    expect(run([['0:3', false], ['0:3', true], ['0:4', false], ['0:4', true]]).live).toBe(true)
  })
  it('нераскрытые снимки подряд возвращают тот же объект', () => {
    const a = revealLiveStep(REVEAL_LIVE_INIT, 'k', false)
    expect(revealLiveStep(a, 'k', false)).toBe(a)
  })
})

describe('Книга: перелистывание страницы', () => {
  const s = (phase: string, qi: number, round = 0, game_id = 'g'): TurnSnap => ({ game_id, phase, round_number: round, question_index: qi })
  it('первый снимок, другая игра, тот же вопрос — не листаем', () => {
    expect(pageTurnKey(null, s('question', 1))).toBeNull()
    expect(pageTurnKey(s('question', 1, 0, 'a'), s('question', 2, 0, 'b'))).toBeNull()
    expect(pageTurnKey(s('question', 1), s('question', 1))).toBeNull()
  })
  it('смена вопроса и вход из заставки — листаем; ключ по раунду и вопросу', () => {
    expect(pageTurnKey(s('question', 1), s('question', 2))).toBe('turn:0:2')
    expect(pageTurnKey(s('round_intro', 0, 2), s('question', 0, 2))).toBe('turn:2:0')
    expect(pageTurnKey(s('show_answers', 0), s('show_answers', 1))).toBe('turn:a:0:1')
  })
  it('прочие смены фазы — без листа', () => {
    expect(pageTurnKey(s('question', 9), s('answer_time', 9))).toBeNull()
    expect(pageTurnKey(s('answer_time', 9), s('show_answers', 0))).toBeNull()
    expect(pageTurnKey(s('question', 3, 0), s('question', 0, 1))).toBeNull()
  })
})
