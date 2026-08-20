import { describe, it, expect } from 'vitest'
import { afterRoundStep } from '../flow'
import type { LoadedPack } from '../packLoader'

const pack = (n: number, settings: Record<string, unknown>): LoadedPack =>
  ({ rounds: Array.from({ length: n }, () => ({ settings })) } as unknown as LoadedPack)

describe('afterRoundStep — маршрут после раунда', () => {
  it('без настроек сразу следующий раунд', () => {
    expect(afterRoundStep(pack(3, {}), 0, 'show_answers').kind).toBe('next')
  })

  it('включено табло — сначала табло', () => {
    const p = pack(3, { show_scoreboard_after: true })
    expect(afterRoundStep(p, 0, 'show_answers').kind).toBe('scoreboard')
  })

  it('С ТАБЛО НЕ ВОЗВРАЩАЕМСЯ НА ТАБЛО', () => {
    const p = pack(3, { show_scoreboard_after: true })
    expect(afterRoundStep(p, 0, 'scoreboard').kind).toBe('next')
  })

  it('табло + перерыв: строгий порядок и без цикла', () => {
    const p = pack(3, { show_scoreboard_after: true, break_after_minutes: 10 })
    expect(afterRoundStep(p, 0, 'show_answers').kind).toBe('scoreboard')
    expect(afterRoundStep(p, 0, 'scoreboard').kind).toBe('break')
    expect(afterRoundStep(p, 0, 'break').kind).toBe('next')   // не обратно на табло
  })

  it('из перерыва никогда не уходим в табло', () => {
    const p = pack(3, { show_scoreboard_after: true, break_after_minutes: 5 })
    expect(afterRoundStep(p, 0, 'break').kind).not.toBe('scoreboard')
  })

  it('на последнем раунде маршрут ведёт в финал', () => {
    const p = pack(2, { show_scoreboard_after: true })
    expect(afterRoundStep(p, 1, 'show_answers').kind).toBe('scoreboard')
    expect(afterRoundStep(p, 1, 'scoreboard').kind).toBe('finale')
  })
})
