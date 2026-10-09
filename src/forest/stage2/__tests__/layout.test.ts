// Доски «Своей игры» и «Угадай мелодию» в Лесу: при утверждённом составе — ровно лабораторная геометрия; при другом —
// всё внутри кадра 1920×1080 и без наложений, сколько бы ни было тем и плиток.
import { describe, expect, it } from 'vitest'
import { jpLayout, jpTilePos, petalAngles, melLayout, melBellPos, melPlant, listDensity } from '../layout'
import { fmtVal, lenCls } from '../fmt'

describe('«Своя игра» — цветы цен', () => {
  it('5 тем × 4 цены — точно как в лаборатории', () => {
    const L = jpLayout([4, 4, 4, 4, 4])
    expect(L.map(f => f.cx)).toEqual([256, 608, 960, 1312, 1664])
    expect(L.map(f => f.cy)).toEqual([520, 498, 486, 498, 520])
    L.forEach(f => { expect(f.k).toBe(1); expect(f.kp).toBe(1); expect(f.ang).toEqual([-135, -45, 45, 135]); expect(f.labelW).toBe(336) })
    const p = jpTilePos(L[0], 2)
    expect(p.x).toBeCloseTo(256 + Math.cos(Math.PI / 4) * 104)
    expect(p.y).toBeCloseTo(520 + Math.sin(Math.PI / 4) * 104)
  })
  it('1–6 тем: цветы и подписи в кадре и не наезжают друг на друга', () => {
    for (let n = 1; n <= 6; n++) for (const m of [1, 2, 3, 4, 5, 6]) {
      const L = jpLayout(Array(n).fill(m))
      L.forEach((f, i) => {
        const reach = (186 + 10) * f.k * f.kp // длина лепестка от центра
        expect(f.cx - reach, `n=${n} m=${m}`).toBeGreaterThan(0)
        expect(f.cx + reach).toBeLessThan(1920)
        expect(f.cy - reach).toBeGreaterThan(90) // ниже заголовка
        if (i > 0) expect(f.cx - L[i - 1].cx).toBeGreaterThanOrEqual(f.labelW) // подписи не перекрываются
        expect(f.ang).toHaveLength(m)
      })
    }
  })
  it('углы лепестков: по часовой от верхнего левого, без повторов', () => {
    expect(petalAngles(1)).toEqual([-90])
    for (const m of [3, 5, 6, 8]) { const a = petalAngles(m); expect(new Set(a).size).toBe(m); a.slice(1).forEach((x, i) => expect(x).toBeGreaterThan(a[i])) }
  })
})

describe('«Угадай мелодию» — колокольчики', () => {
  it('4 темы × 4 трека — точно как в лаборатории', () => {
    const L = melLayout([4, 4, 4, 4])
    expect(L.map(c => c.x)).toEqual([330, 750, 1170, 1590])
    L.forEach(c => { expect(c.k).toBe(1); expect(c.kb).toBe(1); expect(c.top).toBe(120); expect(c.labelW).toBe(380) })
    // точки на стебле — 0.84 / 0.66 / 0.48 / 0.3, листья — 0.12 / 0.2 / 0.39 / 0.57 / 0.75 (без хвостов плавающей точки)
    const P = melPlant(0, 4)
    expect(P.bells).toHaveLength(4); expect(P.leaves).toHaveLength(5)
    // центр колокола — как pos() лаборатории: PLANT_X − 200 + x, PLANT_Y + y + 50
    const pos = melBellPos(L[2], 2), b = melPlant(2, 4).bells[2]
    expect(pos.x).toBeCloseTo(1170 - 200 + b.x); expect(pos.y).toBeCloseTo(120 + b.y + 50)
  })
  it('1–6 тем, 1–10 треков: колокола в кадре, соседние растения не перекрываются', () => {
    for (let n = 1; n <= 6; n++) for (const m of [1, 3, 4, 5, 6, 8, 10]) {
      const L = melLayout(Array(n).fill(m))
      const boxes = L.map((c, ti) => { const xs = c.plant.bells.map((_, i) => melBellPos(c, i).x); expect(c.plant.bells).toHaveLength(m); return { l: Math.min(...xs) - 50 * c.k * c.kb, r: Math.max(...xs) + 50 * c.k * c.kb, ti } })
      boxes.forEach((b, i) => {
        expect(b.l, `n=${n} m=${m}`).toBeGreaterThan(0); expect(b.r).toBeLessThan(1920)
        if (i > 0) expect(b.l).toBeGreaterThan(boxes[i - 1].r - 1)
      })
      L.forEach(c => c.plant.bells.forEach((_, i) => { const p = melBellPos(c, i); expect(p.y).toBeGreaterThan(230); expect(p.y).toBeLessThan(1080) }))
    }
  })
})

describe('мелочи', () => {
  it('плотность списка команд и кегль длинного ответа', () => {
    expect(listDensity(4)).toBe(''); expect(listDensity(7)).toBe(' d1'); expect(listDensity(12)).toBe(' d2'); expect(listDensity(16)).toBe(' d2 d3')
    expect(lenCls('«Сталкер» — проезд на дрезине')).toBe(''); expect(lenCls('x'.repeat(80))).toBe(' long'); expect(lenCls('x'.repeat(200))).toBe(' xlong')
    expect(fmtVal(1.5)).toBe('1,5')
  })
})
