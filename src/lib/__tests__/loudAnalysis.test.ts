import { describe, it, expect, beforeEach } from 'vitest'
import { analyzeBytes, loudStartFor, _resetLoudAnalysis, _setEnv, watchTracks, type Decoder } from '../loudAnalysis'

const SR = 8000
const tone = (sec: number, amp: number) => Float32Array.from({ length: sec * SR }, (_, i) => amp * Math.sin(i / 7))
const cat = (...p: Float32Array[]) => {
  const o = new Float32Array(p.reduce((a, x) => a + x.length, 0)); let k = 0
  for (const x of p) { o.set(x, k); k += x.length }
  return o
}

beforeEach(() => _resetLoudAnalysis())

describe('loudAnalysis', () => {
  it('analyzeBytes: декодер подменён — WebAudio не нужен', async () => {
    const dec: Decoder = async () => ({ sampleRate: SR, channels: [cat(tone(10, 0), tone(5, 0.3), tone(10, 0))] })
    const r = await analyzeBytes(new ArrayBuffer(10), dec)
    expect(r!.durationSec).toBeCloseTo(25, 1)
  })
  it('пустой и гигантский файл — null без декодирования', async () => {
    expect(await analyzeBytes(new ArrayBuffer(0))).toBeNull()
    expect(await analyzeBytes(new ArrayBuffer(31 * 1024 * 1024))).toBeNull()
  })
  it('loudStartFor: нет анализа / анализ не вышел — null (старое поведение)', () => {
    expect(loudStartFor('a.mp3', 10)).toBeNull()
    _setEnv('a.mp3', null)
    expect(loudStartFor('a.mp3', 10)).toBeNull()
  })
  it('loudStartFor: попадает в звучащий кусок', async () => {
    const dec: Decoder = async () => ({ sampleRate: SR, channels: [cat(tone(10, 0), tone(14, 0.3), tone(10, 0))] })
    _setEnv('a.mp3', (await analyzeBytes(new ArrayBuffer(10), dec))!)
    for (let i = 0; i < 100; i++) {
      const st = loudStartFor('a.mp3', 10, () => i / 100)!
      expect(st).toBeGreaterThanOrEqual(10)
      expect(st + 10).toBeLessThanOrEqual(24.11)
    }
  })
  it('watchTracks без WebAudio (jsdom) — тихий no-op', () => {
    expect(() => watchTracks(['x.mp3'])()).not.toThrow()
  })
})
