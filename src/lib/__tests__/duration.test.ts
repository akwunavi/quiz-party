import { describe, it, expect } from 'vitest'
import { estimateRoundMinutes } from '../duration'

const round = (n: number, timer: number, reveal = 'after_question') => ({
  questions: Array.from({ length: n }, () => ({ hidden: false })),
  timer_seconds: timer, answers_reveal: reveal,
})

describe('estimateRoundMinutes', () => {
  it('пустой раунд — ноль', () => {
    expect(estimateRoundMinutes(round(0, 45))).toBe(0)
  })

  it('12 вопросов по 45 сек — около 14 минут', () => {
    const m = estimateRoundMinutes(round(12, 45))
    expect(m).toBeGreaterThanOrEqual(12)
    expect(m).toBeLessThanOrEqual(16)
  })

  it('скрытые вопросы не считаются', () => {
    const r = { ...round(6, 45) }
    r.questions = [...r.questions, { hidden: true }, { hidden: true }]
    expect(estimateRoundMinutes(r)).toBe(estimateRoundMinutes(round(6, 45)))
  })

  it('без показа ответов раунд короче', () => {
    expect(estimateRoundMinutes(round(10, 45, 'never')))
      .toBeLessThan(estimateRoundMinutes(round(10, 45, 'after_question')))
  })

  it('длинный таймер удлиняет раунд', () => {
    expect(estimateRoundMinutes(round(10, 90)))
      .toBeGreaterThan(estimateRoundMinutes(round(10, 30)))
  })
})
