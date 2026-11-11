import { describe, expect, it } from 'vitest'
import { butterflyArtPose, butterflyHeading, bfFrame } from '../butterfly'

describe('бабочка арены', () => {
  const nose = { x: 800, y: 500 }
  it('детерминирована: те же u/время/собака — тот же кадр (перезагрузка проектора ничего не меняет)', () => {
    for (let d = 0; d < 5; d++) for (const u of [0, 0.1, 0.5, 0.9, 1]) expect(butterflyArtPose(u, nose, 12.34, d)).toEqual(butterflyArtPose(u, nose, 12.34, d))
  })
  it('привязана к носу собаки: сдвиг носа сдвигает бабочку ровно на столько же', () => {
    const a = butterflyArtPose(0.5, nose, 7.7, 2), b = butterflyArtPose(0.5, { x: nose.x + 123, y: nose.y - 45 }, 7.7, 2)
    expect(b.x - a.x).toBeCloseTo(123, 9); expect(b.y - a.y).toBeCloseTo(-45, 9)
  })
  it('появляется вблизи собаки, зависает у морды, улетает: расстояние до носа мало в середине и больше по краям, прозрачность 0 → 1 → 0', () => {
    for (let d = 0; d < 5; d++) {
      const dist = (u: number) => { const p = butterflyArtPose(u, nose, 5, d); return Math.hypot(p.x - nose.x, p.y - nose.y) }
      expect(dist(0.5)).toBeLessThan(75); expect(dist(0.5)).toBeLessThan(dist(0.02)); expect(dist(0.5)).toBeLessThan(dist(0.99))
      expect(butterflyArtPose(0, nose, 5, d).alpha).toBe(0); expect(butterflyArtPose(0.5, nose, 5, d).alpha).toBe(1); expect(butterflyArtPose(1, nose, 5, d).alpha).toBe(0)
    }
  })
  it('траектория неровная и плавная: в пути её шаг за кадр мал (без скачков), но не прямая', () => {
    let maxStep = 0, wiggle = 0
    for (let t = 0; t < 2; t += 1 / 30) { const a = butterflyArtPose(0.1, nose, t, 1), b = butterflyArtPose(0.1, nose, t + 1 / 30, 1); maxStep = Math.max(maxStep, Math.hypot(b.x - a.x, b.y - a.y)); wiggle += Math.abs(b.y - a.y) }
    expect(maxStep).toBeLessThan(9); expect(wiggle).toBeGreaterThan(8)
  })
  it('курс считается по полёту, взмахи крыльев — отдельный счётчик кадров листа', () => {
    expect(Number.isFinite(butterflyHeading(t => butterflyArtPose(0.1, nose, t, 0), 3))).toBe(true)
    const f = new Set(Array.from({ length: 60 }, (_, i) => bfFrame(i / 60, 0, 9))); expect(f.size).toBe(9); expect(bfFrame(5, 1, 9)).toBe(bfFrame(5, 1, 9)); expect(bfFrame(5, 1, 0)).toBe(0)
  })
})
