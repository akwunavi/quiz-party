// ═══ «Книга», модалка «Составы команд»: сетка по числу команд (groupsLayout) и склонение ═══
import { describe, it, expect } from 'vitest'
import { groupsLayout, teamsWord } from '../book/groupsLayout'

describe('groupsLayout', () => {
  it('чем больше команд, тем мельче плитка и список (не растут)', () => {
    let prev = groupsLayout(1)
    for (let n = 2; n <= 40; n++) {
      const l = groupsLayout(n)
      expect(l.ch).toBeLessThanOrEqual(prev.ch); expect(l.fs).toBeLessThanOrEqual(prev.fs)
      prev = l
    }
  })
  it('1–24 команд: колонок ≥ 1, плитка ≥ 44u, список ≥ 15u; ширина под имя плитки (колонка − 0,96·ch) ≥ 80u при области 930u', () => {
    for (let n = 1; n <= 24; n++) {
      const l = groupsLayout(n)
      expect(l.cols).toBeGreaterThanOrEqual(1); expect(l.ch).toBeGreaterThanOrEqual(44); expect(l.fs).toBeGreaterThanOrEqual(15)
      const col = l.cell || (930 - 16 * (l.cols - 1)) / l.cols
      expect(col - 14 - 0.96 * l.ch).toBeGreaterThanOrEqual(80)
    }
  })
  it('предел ширины ячейки: сетка с пределом не шире области 930u', () => {
    for (let n = 1; n <= 24; n++) { const l = groupsLayout(n); if (l.cell) expect(l.cell * l.cols + 16 * (l.cols - 1)).toBeLessThanOrEqual(930) }
  })
  it('не больше 6 колонок; 0 и дробь не ломают функцию', () => {
    expect(groupsLayout(0).cols).toBe(1); expect(groupsLayout(100).cols).toBeLessThanOrEqual(6); expect(groupsLayout(4.9).cols).toBe(2)
  })
})

describe('teamsWord', () => {
  it('склоняет по числу', () => {
    expect([1, 2, 4, 5, 11, 12, 14, 21, 22, 25].map(teamsWord)).toEqual(['команда', 'команды', 'команды', 'команд', 'команд', 'команд', 'команд', 'команда', 'команды', 'команд'])
  })
})
