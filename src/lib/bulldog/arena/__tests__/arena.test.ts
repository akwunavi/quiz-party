// Арена: камера, раскладка дорожек и слоты авторской графики — без холста (чистая математика). Гонка — Race V3 того же движка (seed 328, D=42).
import { describe, expect, it } from 'vitest'
import { ARENA, buildCameraTrack, worldX } from '../camera'
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
  it('самый высокий силуэт (замер на сиде 328: 108 строк атласа) помещается в шаг дорожки — собаки не наступают друг на друга при любой позе', () => {
    for (let i = 1; i < 5; i++) expect(108 * ARENA.LANE_K[i]).toBeLessThan(ARENA.LANE_Y[i] - ARENA.LANE_Y[i - 1])
  })
})

describe('слоты авторской графики', () => {
  it('раскладка по параллаксу: при камере 0 слой начинается с 0; сдвиг = камера × параллакс; кадр закрыт целиком', () => {
    const s = SLOTS.find(x => x.id === 'village_mid')!
    expect(slotPlacements(s, 0)[0].x).toBe(0)
    expect(slotPlacements(s, 1000)[0].x).toBeCloseTo(-1000 * s.parallax + Math.floor(1000 * s.parallax / s.tileW) * s.tileW, 6)
    for (const cx of [0, 777, 3210]) { const p = slotPlacements(s, cx); expect(p[0].x).toBeLessThanOrEqual(0); expect(p[p.length - 1].x + s.tileW).toBeGreaterThanOrEqual(ARENA.W) }
  })
  it('модули идут без одинакового подряд и используют все варианты', () => {
    for (const m of [2, 3, 4, 6]) { const seq = Array.from({ length: 200 }, (_, i) => moduleOf(i, m)); for (let i = 1; i < seq.length; i++) expect(seq[i]).not.toBe(seq[i - 1]); expect(new Set(seq).size).toBe(m) }
    expect(moduleOf(5, 1)).toBe(0)
  })
  it('нижние кромки слоёв не заходят на трассу, у всех есть описание для художника', () => {
    for (const s of SLOTS) { expect(s.bottomY).toBeLessThanOrEqual(BERM_Y + 2); expect(s.note.length).toBeGreaterThan(20); expect(s.file).toMatch(/\.webp$/) }
  })
})
