import { describe, expect, it } from 'vitest'
import { alignRects, bbox, distribute, nudge, pageLines, sameSize, snapMove, snapResize, type SnapCfg } from '../layoutSnap'

const cfg: SnapCfg = { thrX: 0.004, thrY: 0.006, pageX: [0.5], pageY: [0.5] }
const R = (x: number, y: number, w: number, h: number) => ({ x, y, w, h })

describe('layoutSnap: привязка при перетаскивании', () => {
  it('левый край прилипает к левому краю соседа в пределах порога и даёт вертикальную направляющую', () => {
    const r = snapMove(R(0.101, 0.6, 0.2, 0.1), [R(0.1, 0.1, 0.2, 0.1)], cfg)
    expect(r.rect.x).toBeCloseTo(0.1, 9); expect(r.snapped.x).toBe(true)
    expect(r.lines.some(l => l.axis === 'x' && Math.abs(l.at - 0.1) < 1e-6 && l.from <= 0.1 && l.to >= 0.7)).toBe(true)
  })
  it('вне порога — не трогает', () => {
    const r = snapMove(R(0.2, 0.6, 0.2, 0.1), [R(0.1, 0.1, 0.05, 0.1)], { ...cfg, pageX: [], pageY: [] })
    expect(r.rect).toEqual(R(0.2, 0.6, 0.2, 0.1)); expect(r.snapped).toEqual({ x: false, y: false }); expect(r.lines).toEqual([])
  })
  it('центр рамки прилипает к центру соседа и к центру экрана', () => {
    const c = snapMove(R(0.399, 0.6, 0.2, 0.1), [R(0.4, 0.1, 0.2, 0.1)], { ...cfg, pageX: [] })
    expect(c.rect.x + c.rect.w / 2).toBeCloseTo(0.5, 9)
    const p = snapMove(R(0.352, 0.2, 0.3, 0.1), [], cfg)
    expect(p.rect.x + p.rect.w / 2).toBeCloseTo(0.5, 9)
  })
  it('линии страницы Книги: центры левой и правой страниц, сгиб = центр экрана', () => {
    const pl = pageLines('ny_book')
    expect(pl.x).toContain(0.5)
    const c = pl.x.filter(v => v !== 0.5)
    expect(c.some(v => v < 0.5) && c.some(v => v > 0.5)).toBe(true)
    expect(pl.x.length).toBeGreaterThanOrEqual(5)
    expect(pageLines('classic').x).toContain(0.5)
  })
  it('равные интервалы: рамка встаёт посередине между двумя соседями', () => {
    const a = R(0.1, 0.4, 0.1, 0.1), b = R(0.7, 0.4, 0.1, 0.1)
    const r = snapMove(R(0.4015, 0.4, 0.1, 0.1), [a, b], { ...cfg, pageX: [] })
    expect(r.rect.x).toBeCloseTo(0.4, 9)
    expect(r.gaps.length).toBe(2)
    expect(r.gaps[0].to - r.gaps[0].from).toBeCloseTo(r.gaps[1].to - r.gaps[1].from, 9)
  })
  it('равные интервалы: продолжение ряда из трёх рамок', () => {
    const o = [R(0.1, 0.4, 0.1, 0.1), R(0.3, 0.4, 0.1, 0.1)]   // зазор 0.1
    const r = snapMove(R(0.5015, 0.4, 0.1, 0.1), o, { ...cfg, pageX: [] })
    expect(r.rect.x).toBeCloseTo(0.5, 9)
  })
  it('интервалы считаются только по рамкам «в одном ряду»', () => {
    const o = [R(0.1, 0.1, 0.1, 0.1), R(0.3, 0.1, 0.1, 0.1)]
    const r = snapMove(R(0.5015, 0.7, 0.1, 0.1), o, { ...cfg, pageX: [], pageY: [] })
    expect(r.rect.x).toBeCloseTo(0.5015, 9)
  })
  it('не выходит за экран', () => {
    const r = snapMove(R(0.95, 0.5, 0.2, 0.1), [], cfg)
    expect(r.rect.x + r.rect.w).toBeLessThanOrEqual(1 + 1e-9)
  })
})

describe('layoutSnap: привязка при растягивании', () => {
  const none = { ...cfg, pageX: [], pageY: [] }
  it('ширина и высота примагничиваются к размерам другой рамки, есть индикатор «те же размеры»', () => {
    const r = snapResize(R(0.5, 0.5, 0.2015, 0.1485), [R(0.1, 0.1, 0.2, 0.15)], none)
    expect(r.rect.w).toBeCloseTo(0.2, 9); expect(r.rect.h).toBeCloseTo(0.15, 9)
    expect(r.sameW).toEqual([0]); expect(r.sameH).toEqual([0])
  })
  it('правый край прилипает к краю соседа', () => {
    const r = snapResize(R(0.1, 0.5, 0.7985, 0.1), [R(0.5, 0.1, 0.4, 0.1)], none)
    expect(r.rect.x + r.rect.w).toBeCloseTo(0.9, 9)
  })
  it('равный интервал до соседа справа (эталон — зазор между двумя другими)', () => {
    const o = [R(0.1, 0.1, 0.1, 0.1), R(0.3, 0.1, 0.1, 0.1), R(0.7, 0.1, 0.1, 0.1)]   // зазор 0.1 между первыми двумя
    const r = snapResize(R(0.45, 0.1, 0.1505, 0.1), o, none)   // правый край ≈ 0.6005 → 0.7 - 0.1
    expect(r.rect.x + r.rect.w).toBeCloseTo(0.6, 9); expect(r.gaps.length).toBe(2)
  })
  it('вне порога — без изменений', () => {
    const r = snapResize(R(0.5, 0.5, 0.31, 0.21), [R(0.1, 0.1, 0.2, 0.15)], none)
    expect(r.rect).toEqual(R(0.5, 0.5, 0.31, 0.21)); expect(r.sameW).toEqual([])
  })
})

describe('layoutSnap: выравнивание и распределение', () => {
  const a = R(0.1, 0.1, 0.2, 0.1), b = R(0.4, 0.3, 0.1, 0.2), c = R(0.6, 0.6, 0.3, 0.1)
  it('bbox', () => { const x = bbox([a, c]); expect(x.x).toBeCloseTo(0.1, 9); expect(x.w).toBeCloseTo(0.8, 9); expect(x.h).toBeCloseTo(0.6, 9) })
  it('по левому/правому/центру', () => {
    expect(alignRects([a, b, c], 'left').map(r => r.x)).toEqual([0.1, 0.1, 0.1])
    expect(alignRects([a, b, c], 'right').map(r => +(r.x + r.w).toFixed(9))).toEqual([0.9, 0.9, 0.9])
    expect(new Set(alignRects([a, b, c], 'hcenter').map(r => +(r.x + r.w / 2).toFixed(9))).size).toBe(1)
  })
  it('по верху/низу/середине; размеры целы', () => {
    expect(alignRects([a, b, c], 'top').map(r => r.y)).toEqual([0.1, 0.1, 0.1])
    expect(alignRects([a, b, c], 'bottom').map(r => +(r.y + r.h).toFixed(9))).toEqual([0.7, 0.7, 0.7])
    const vm = alignRects([a, b, c], 'vmiddle')
    expect(new Set(vm.map(r => +(r.y + r.h / 2).toFixed(9))).size).toBe(1); expect(vm.map(r => r.w)).toEqual([0.2, 0.1, 0.3])
  })
  it('одна рамка — выравнивать не с чем', () => { expect(alignRects([a], 'left')).toEqual([a]) })
  it('одинаковая ширина/высота — по первой рамке, не за экран', () => {
    expect(sameSize([a, b, c], 'w').map(r => r.w)).toEqual([0.2, 0.2, 0.2])
    expect(sameSize([a, c], 'h').map(r => r.h)).toEqual([0.1, 0.1])
    const s = sameSize([R(0.1, 0.1, 0.5, 0.1), R(0.9, 0.5, 0.1, 0.1)], 'w')
    expect(s[1].x + s[1].w).toBeLessThanOrEqual(1 + 1e-9); expect(s[1].w).toBe(0.5)
  })
  it('распределить: равные промежутки, крайние на месте, порядок индексов сохранён', () => {
    const d = distribute([c, a, b], 'x')   // порядок на оси: a, b, c
    expect(d[1].x).toBeCloseTo(0.1, 9); expect(d[0].x).toBeCloseTo(0.6, 9)
    expect(d[2].x - (d[1].x + d[1].w)).toBeCloseTo(d[0].x - (d[2].x + d[2].w), 9)
    const dv = distribute([a, b, c], 'y')
    expect(dv[1].y - (dv[0].y + dv[0].h)).toBeCloseTo(dv[2].y - (dv[1].y + dv[1].h), 9)
  })
  it('две рамки — распределять нечего', () => { expect(distribute([a, b], 'x')).toEqual([a, b]) })
  it('nudge держит в экране', () => {
    expect(nudge(R(0.9, 0.5, 0.1, 0.1), 0.05, 0).x).toBeCloseTo(0.9, 9)
    expect(nudge(R(0.5, 0.5, 0.1, 0.1), 0.01, -0.01)).toMatchObject({ x: 0.51, y: 0.49 })
  })
})
