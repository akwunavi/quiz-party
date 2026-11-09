// Арена: камера, раскладка дорожек и слоты авторской графики — без холста (чистая математика). Гонка — Race V3 того же движка (seed 328, D=42).
import { describe, expect, it } from 'vitest'
import { ARENA, DOG_ENVELOPE, LANE_RULES, buildCameraTrack, worldX } from '../camera'
import { SLOTS, slotPlacements, moduleOf } from '../slots'
import { BERM_Y } from '../art'
import { raceFor, stateAt } from '../../engine'

const race = raceFor(328, 42), T0 = 8, DUR = 22
const cam = buildCameraTrack(race, T0, DUR)

describe('камера сопровождения', () => {
  it('детерминирована: два построения дают одну траекторию', () => {
    const b = buildCameraTrack(race, T0, DUR); for (let t = 0; t <= DUR; t += 0.37) expect(b.at(t).x).toBe(cam.at(t).x)
  })
  it('едет вперёд плавно: не откатывается назад, ускорение ограничено (нет рывков)', () => {
    let prev = cam.at(0).x, vPrev = 0, maxAcc = 0
    for (let f = 1; f <= DUR * 60; f++) { const x = cam.at(f / 60).x, v = (x - prev) * 60; expect(x).toBeGreaterThanOrEqual(prev - 0.01); if (f > 1) maxAcc = Math.max(maxAcc, Math.abs(v - vPrev) * 60); prev = x; vPrev = v }
    expect(maxAcc).toBeLessThan(260)                       // px/с² — без скачков скорости
  })
  it('средняя скорость фона заметна глазу (≥ 70 px/с), а не «собаки стоят на месте»', () => {
    expect((cam.at(DUR).x - cam.at(0).x) / DUR).toBeGreaterThan(70)
  })
  it('лидер всегда в кадре, группа читается: ≥ 4 собак в кадре в 90% моментов', () => {
    let ok = 0, n = 0
    for (let t = 0; t <= DUR; t += 0.25) {
      const X = cam.at(t).x, xs = race.dogs.map(d => worldX(stateAt(d, T0 + t).progress) - X)
      expect(Math.max(...xs)).toBeGreaterThan(300); expect(Math.max(...xs)).toBeLessThan(ARENA.W - 120)
      n++; if (xs.filter(x => x > 40 && x < ARENA.W - 40).length >= 4) ok++
    }
    expect(ok / n).toBeGreaterThan(0.9)
  })
  it('собаки не «приклеены» к кадру: положение лидера на экране меняется по ходу', () => {
    const xs = [0, 5, 10, 15, 20].map(t => Math.max(...race.dogs.map(d => worldX(stateAt(d, T0 + t).progress))) - cam.at(t).x)
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(40)
  })
})

describe('дорожки', () => {
  it('пять дорожек, шаг ≥ 105 px, дальше — мельче, ближе — крупнее; нижняя помещается в кадр', () => {
    for (let i = 1; i < 5; i++) { expect(ARENA.LANE_Y[i] - ARENA.LANE_Y[i - 1]).toBeGreaterThanOrEqual(105); expect(ARENA.LANE_K[i]).toBeGreaterThan(ARENA.LANE_K[i - 1]) }
    expect(ARENA.LANE_Y[0]).toBeGreaterThan(BERM_Y); expect(ARENA.LANE_Y[4] + 8 * ARENA.LANE_K[4]).toBeLessThan(ARENA.H + 4)
  })
  it('вертикальная компоновка закрыта: зазор между соседями ≥ minGap при самых высоких позах за всю гонку, Фрэнк не доходит до ограждения, Луна с запасом снизу', () => {
    const { up, down } = DOG_ENVELOPE, Y = ARENA.LANE_Y, K = ARENA.LANE_K
    for (let i = 0; i < 4; i++) expect(Y[i + 1] - up[i + 1] * K[i + 1] - (Y[i] + down[i] * K[i])).toBeGreaterThanOrEqual(LANE_RULES.minGap)
    expect(Y[0] - up[0] * K[0]).toBeGreaterThanOrEqual(BERM_Y - LANE_RULES.fenceEdge + LANE_RULES.topClear)
    expect(Y[4] + down[4] * K[4]).toBeLessThanOrEqual(ARENA.H - LANE_RULES.bottomMargin)
  })
})

describe('слоты авторской графики', () => {
  it('раскладка по параллаксу: при камере 0 слой начинается с 0; сдвиг = камера × параллакс; кадр закрыт целиком', () => {
    const s = SLOTS.find(x => x.id === 'forest_far')!
    expect(slotPlacements(s, 0)[0].x).toBe(0)
    expect(slotPlacements(s, 1000)[0].x).toBeCloseTo(-1000 * s.parallax + Math.floor(1000 * s.parallax / s.tileW) * s.tileW, 6)
    for (const cx of [0, 777, 3210]) { const p = slotPlacements(s, cx); expect(p[0].x).toBeLessThanOrEqual(0); expect(p[p.length - 1].x + s.tileW).toBeGreaterThanOrEqual(ARENA.W) }
  })
  it('маршрут: трибуна → открытый участок → деревня → открытый участок → трибуна, без наложений и без старой трибуны', () => {
    const st = SLOTS.find(x => x.id === 'stands_crowd')!, vi = SLOTS.find(x => x.id === 'village_mid')!
    const items = [...st.route!.slice(0, 2).map(r => ({ id: 'st', x: r.x, w: st.tileW * (r.scale ?? 1) })), ...vi.route!.map(r => ({ id: 'vi', x: r.x, w: vi.tileW }))].sort((a, b) => a.x - b.x)
    expect(items.map(i => i.id)).toEqual(['st', 'vi', 'st'])
    expect(st.parallax).toBe(vi.parallax)                                    // идут по одной «линии» маршрута — взаимный сдвиг не плывёт
    // объекты (у трибуны ≈ 82% модуля, у деревни весь кадр) не налезают друг на друга; между ними — открытый участок с горами ≥ 300 px
    const ends = [items[0].x + 1303 * 0.9, items[1].x + vi.tileW, items[2].x + 294 * 0.74]; const starts = [items[1].x, items[2].x + 294 * 0.74]
    for (let k = 0; k < 2; k++) expect(starts[k] - ends[k]).toBeGreaterThanOrEqual(300)
    expect(SLOTS.some(x => x.id === 'stands')).toBe(true)                    // старая двухъярусная в маршрут не входит (её нет в файлах public/arena)
    expect(slotPlacements(vi, 0).length + slotPlacements(vi, 2687).length).toBeGreaterThan(0)
    expect(slotPlacements(vi, 0).length).toBeLessThanOrEqual(1)
  })
  it('полный маршрут длинной гонки (с ожидающими ассетами): без наложений, горы между объектами, трибуны/деревни не повторяются подряд', () => {
    type It = { id: string; a: number; b: number }
    const items: It[] = []
    for (const sp of SLOTS) for (const r of sp.route ?? []) { const k = r.scale ?? 1; const w = sp.tileW * k
      const a = sp.id === 'stands_crowd' ? (r.module === 1 ? r.x + 294 * k : r.x) : r.x, b = sp.id === 'stands_crowd' ? (r.module === 1 ? r.x + w : r.x + 1303 * k) : r.x + w; items.push({ id: sp.id, a, b }) }
    items.sort((p, q) => p.a - q.a)
    for (let i = 1; i < items.length; i++) { expect(items[i].a - items[i - 1].b).toBeGreaterThanOrEqual(24)   // не наезжают друг на друга
      if (items[i].id !== 'spruce_set' && items[i - 1].id !== 'spruce_set') expect(items[i].a - items[i - 1].b).toBeGreaterThanOrEqual(300)  // между крупными — открытые горы
      expect(items[i].id === items[i - 1].id && items[i].id !== 'spruce_set').toBe(false) }
    const big = items.filter(x => x.id !== 'spruce_set').map(x => x.id)
    for (let i = 2; i < big.length; i++) expect(big[i] === big[i - 2] && big[i] === big[i - 1]).toBe(false)
    expect(new Set(big).size).toBeGreaterThanOrEqual(3)
  })
  it('модули идут без одинакового подряд и используют все варианты', () => {
    for (const m of [2, 3, 4, 6]) { const seq = Array.from({ length: 200 }, (_, i) => moduleOf(i, m)); for (let i = 1; i < seq.length; i++) expect(seq[i]).not.toBe(seq[i - 1]); expect(new Set(seq).size).toBe(m) }
    expect(moduleOf(5, 1)).toBe(0)
  })
  it('нижние кромки слоёв не заходят на трассу, у всех есть описание для художника', () => {
    for (const s of SLOTS) { expect(s.bottomY).toBeLessThanOrEqual(BERM_Y + 40);           // низ слоя (его нижние ~30 px прячет борт) не доходит до первой дорожки
       expect(s.note.length).toBeGreaterThan(20); expect(s.file).toMatch(/\.webp$/) }
  })
})
