import { describe, it, expect } from 'vitest'
import { rmsEnvelope, loudThreshold, loudStarts, pickLoudStart } from '../loudWindows'

const SR = 8000
/** сегменты [секунды, амплитуда] → синус 440 Гц с этой амплитудой */
function signal(segs: [number, number][], noise = 0): Float32Array {
  const total = segs.reduce((a, [d]) => a + d, 0)
  const out = new Float32Array(Math.round(total * SR))
  let i = 0
  for (const [d, amp] of segs) {
    const n = Math.round(d * SR)
    for (let k = 0; k < n; k++, i++) out[i] = amp * Math.sin(2 * Math.PI * 440 * i / SR) + noise * (((i * 7919) % 200) / 100 - 1)
  }
  return out
}
const env = (segs: [number, number][], noise = 0) => rmsEnvelope([signal(segs, noise)], SR)

describe('rmsEnvelope', () => {
  it('окна по 100 мс, RMS синуса ≈ амплитуда/√2', () => {
    const e = env([[2, 0.5]])
    expect(e.length).toBe(20)
    expect(e[5]).toBeCloseTo(0.5 / Math.SQRT2, 2)
  })
  it('стерео усредняется, пустой вход — пустой результат', () => {
    expect(rmsEnvelope([], SR)).toEqual([])
    const a = signal([[1, 0.4]]), b = new Float32Array(a.length)
    expect(rmsEnvelope([a, b], SR)[3]).toBeCloseTo(0.2 / Math.SQRT2, 2)
  })
})

describe('loudThreshold', () => {
  it('беззвучный трек — null', () => {
    expect(loudThreshold(env([[10, 0]]))).toBeNull()
    expect(loudThreshold([])).toBeNull()
  })
  it('порог относительный: тихий трек (амплитуда 0.01) тоже находит звучание', () => {
    const e = env([[10, 0], [5, 0.01], [10, 0], [5, 0.01], [10, 0]])
    expect(loudThreshold(e)).not.toBeNull()
  })
})

describe('pickLoudStart: тишина — тон — тишина — тон', () => {
  const segs: [number, number][] = [[10, 0], [5, 0.3], [10, 0], [5, 0.3]]
  const e = env(segs)
  const opts = { spanSec: 3 }
  it('всегда попадает в тон, на любом rng (200 бросков)', () => {
    for (let i = 0; i < 200; i++) {
      const st = pickLoudStart(e, opts, () => i / 200)!
      const inTone = (st >= 10 && st + 3 <= 15.11) || (st >= 25 && st + 3 <= 30.11)
      expect(inTone, `start=${st}`).toBe(true)
    }
  })
  it('не начинает раньше edgeSec и не заходит за конец файла', () => {
    const { starts } = loudStarts(env([[5, 0.3]]), { spanSec: 3 })
    expect(Math.min(...starts)).toBeGreaterThanOrEqual(1)
    expect(Math.max(...starts)).toBeLessThanOrEqual(5 - 3 - 0.3 + 1e-9)
  })
  it('случайность сохраняется: разные rng — разные точки в обоих кусках', () => {
    const set = new Set<number>()
    for (let i = 0; i < 50; i++) set.add(pickLoudStart(e, opts, () => i / 50)!)
    expect(set.size).toBeGreaterThan(3)
    expect([...set].some(s => s < 20)).toBe(true)
    expect([...set].some(s => s > 20)).toBe(true)
  })
  it('rng инъектируется: 0 — первое подходящее место', () => {
    expect(pickLoudStart(e, opts, () => 0)).toBe(10)
  })
})

describe('пограничные случаи', () => {
  it('тихий трек целиком (амплитуда 0.01) — старты находятся', () => {
    expect(pickLoudStart(env([[20, 0.01]]), { spanSec: 10 })).not.toBeNull()
  })
  it('слишком короткий трек — null (старое поведение)', () => {
    expect(pickLoudStart(env([[2, 0.3]]), { spanSec: 10 })).toBeNull()
  })
  it('беззвучный — null', () => {
    expect(pickLoudStart(env([[30, 0]]), { spanSec: 10 })).toBeNull()
  })
  it('ровный шум (всё одинаково громко) — старты есть по всему треку', () => {
    const { starts } = loudStarts(env([[30, 0.001]], 0.2), { spanSec: 10 })
    expect(starts.length).toBeGreaterThan(100)
  })
  it('пауза 0,5 с внутри отрывка отсекает строгий ярус; ярус 2 берёт голову + 2 с', () => {
    const e2 = env([[4, 0.3], [0.5, 0], [4, 0.3], [4, 0]])
    const r = loudStarts(e2, { spanSec: 10 })
    expect(r.tier).toBe(2)
    for (const st of r.starts) {
      const inA = st >= 1 && st + 3 <= 4.11
      const inB = st >= 4.5 && st + 3 <= 8.61
      expect(inA || inB, `start=${st}`).toBe(true)
    }
  })
  it('один тихий «вдох» 100 мс в отрывке допускается, 200 мс — нет', () => {
    const ok = env([[1, 0.3], [0.1, 0], [5, 0.3]])
    const bad = env([[1, 0.3], [0.2, 0], [5, 0.3]])
    expect(loudStarts(ok, { spanSec: 3, edgeSec: 0 }).starts).toContain(0)
    expect(loudStarts(bad, { spanSec: 3, edgeSec: 0 }).starts).not.toContain(0)
  })
})
