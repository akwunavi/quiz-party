// Лобби Леса, три концепта: раскладка существует только для пришедших команд, места не накладываются,
// состояния перечислены полностью, составы рандомайзера — настоящие (4×18 и 8×24).
import { describe, expect, it } from 'vitest'
import { LB_STATES, preset, rzPeople } from '../core'
import { slotsA } from '../A'
import { slotsB } from '../B'
import { slotsC } from '../C'

describe('лобби Леса — три концепта', () => {
  it('в каждом состоянии число мест равно числу команд (пустых мест нет)', () => {
    for (const s of LB_STATES) {
      const p = preset(s.id)
      expect(p.teams.length).toBeLessThanOrEqual(p.n)
      expect(slotsA(p.n)).toHaveLength(p.n); expect(slotsB(p.n)).toHaveLength(p.n); expect(slotsC(p.n)).toHaveLength(p.n)
    }
    expect(slotsA(0)).toHaveLength(0)
  })
  it('на 12 командах ни одно место не совпадает с другим и не уходит за кадр', () => {
    for (const [name, slots] of [['A', slotsA(12)], ['B', slotsB(12)], ['C', slotsC(12)]] as const) {
      const keys = new Set(slots.map(s => `${Math.round(s.x)}:${Math.round(s.y)}`))
      expect(keys.size, name).toBe(12)
      for (const s of slots) { expect(s.x).toBeGreaterThan(0); expect(s.x).toBeLessThan(1920); expect(s.y).toBeGreaterThan(0); expect(s.y).toBeLessThan(1080) }
    }
  })
  it('рандомайзер: 4 команды из 18 человек и 8 из 24, каждый человек ровно в одной команде', () => {
    const a = rzPeople(4), b = rzPeople(8)
    expect([a.groups.length, a.N]).toEqual([4, 18]); expect([b.groups.length, b.N]).toEqual([8, 24])
    expect(new Set(a.order).size).toBe(18); expect(new Set(b.order).size).toBe(24)
  })
  it('отключившаяся команда — настоящая (t11 «Последний ряд» не в сети)', () => {
    const p = preset('drop')
    expect(p.dead).toBe('t11'); expect(p.teams.find(t => t.id === 't11')?.alive).toBe(false)
  })
})
