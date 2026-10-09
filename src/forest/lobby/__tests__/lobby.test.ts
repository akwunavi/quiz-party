// Лобби «Волшебного леса»: места только для пришедших, ничего не накладывается, рандомайзер раздаёт каждому ровно одно место.
import { describe, expect, it } from 'vitest'
import { layoutB } from '../geom'
import { rzPeople, rzLayout } from '../Rz'
import { hueOf } from '../../util'

describe('лобби Леса — раскладка', () => {
  it('число мест равно числу команд (пустых мест нет), до 24 команд', () => {
    for (let n = 0; n <= 24; n++) expect(layoutB(n).slots).toHaveLength(n)
  })
  it('места не совпадают и лежат внутри кадра 1920×1080', () => {
    for (const n of [1, 6, 7, 12, 13, 24]) {
      const { slots } = layoutB(n), keys = new Set(slots.map(s => `${Math.round(s.x)}:${Math.round(s.ay)}`))
      expect(keys.size, `n=${n}`).toBe(n)
      for (const s of slots) { expect(s.x).toBeGreaterThan(0); expect(s.x).toBeLessThan(1920); expect(s.ay).toBeGreaterThan(0); expect(s.ay).toBeLessThan(1080) }
    }
  })
  it('растущее число команд не переставляет прежние между сторонами', () => {
    const a = layoutB(6).slots, b = layoutB(8).slots
    a.forEach((s, i) => expect(b[i].side).toBe(s.side))
  })
})

describe('рандомайзер — показ готового результата', () => {
  const g = (sizes: number[]) => sizes.map((n, gi) => Array.from({ length: n }, (_, j) => `И${gi}-${j}`))
  it('каждый человек получает ровно одно место посадки при любом числе людей (в том числе кратном 5)', () => {
    for (const sizes of [[5, 5, 5, 5], [4, 5, 5, 4], [3, 3, 3, 3, 3, 3, 3, 3], [7, 6]]) {
      const { order, N } = rzPeople(g(sizes))
      expect(new Set(order).size).toBe(N); expect(Math.max(...order)).toBe(N - 1)
    }
  })
  it('порядок посадки не зависит от перезагрузки: те же составы дают тот же порядок', () => {
    expect(rzPeople(g([5, 5, 4])).order).toEqual(rzPeople(g([5, 5, 4])).order)
  })
  it('списки команд помещаются в кадр и не заходят на QR слева', () => {
    for (const sizes of [[5, 5, 4, 4], [9, 9], [3, 3, 3, 3, 3, 3, 3, 3], [6, 6, 6, 6, 6, 6, 5, 5]]) {
      const groups = g(sizes), lay = rzLayout(groups.length, groups)
      groups.forEach((m, gi) => { const L = lay(gi); expect(L.cx - 115).toBeGreaterThan(360); expect(L.names + (m.length - 1) * L.pitch).toBeLessThan(1060) })
    }
  })
})

describe('тон команды из цвета', () => {
  it('hueOf возвращает тон и не падает на странном вводе', () => {
    expect(hueOf('#ff0000')).toBe(0); expect(hueOf('#00ff00')).toBe(120); expect(hueOf('#0000ff')).toBe(240)
    expect(hueOf('красный')).toBe(150); expect(hueOf('#808080')).toBe(150)
  })
})
