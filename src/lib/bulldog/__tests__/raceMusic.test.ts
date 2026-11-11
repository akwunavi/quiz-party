import { describe, expect, it } from 'vitest'
import { createRaceMusic, musicStartPlan, LATE_TOLERANCE_MS } from '../raceMusic'

describe('музыка гонки: когда запускать', () => {
  it('до старта — по расписанию; в допуске — сразу со смещением; позже допуска — пропуск (музыка никогда не стартует посреди гонки)', () => {
    expect(musicStartPlan(10_000, 8_500)).toEqual({ mode: 'start', delaySec: 1.5, offsetSec: 0 })
    expect(musicStartPlan(10_000, 10_000 + LATE_TOLERANCE_MS)).toMatchObject({ mode: 'start', delaySec: 0 })
    expect(musicStartPlan(10_000, 10_000 + LATE_TOLERANCE_MS + 1)).toEqual({ mode: 'skip' })
    expect(musicStartPlan(10_000, 40_000)).toEqual({ mode: 'skip' })
  })
})
class FakeCtx {
  state: AudioContextState = 'suspended'; currentTime = 0; destination = {}; onstatechange: (() => void) | null = null; started: { when: number; off: number }[] = []
  resumeAllowed = false
  async decodeAudioData(_b: ArrayBuffer) { return { duration: 100 } as AudioBuffer }
  async resume() { if (this.resumeAllowed) { this.state = 'running'; this.onstatechange?.() } else await new Promise(() => {}) }   // как в Chrome: без жеста промис не отклоняется и не завершается
  createBufferSource() { const o = { buffer: null as unknown, loop: false, connect() {}, start: (when: number, off: number) => { this.started.push({ when, off }) }, stop() {} }; return o as unknown as AudioBufferSourceNode }
  createGain() { return { gain: { value: 1 }, connect() {} } as unknown as GainNode }
  async close() {}
}
const flush = () => new Promise(r => setTimeout(r, 0))
const mk = (allowed: boolean, now = () => 0, fetchBuffer = async () => new ArrayBuffer(8), retryDelays: number[] = [0, 0, 0]) => {
  const box: { inst?: FakeCtx } = {}; class C extends FakeCtx { constructor() { super(); this.resumeAllowed = allowed; box.inst = this } }
  const m = createRaceMusic(true, { AudioContext: C as unknown as new () => AudioContext, fetchBuffer, now, sleep: async () => {}, retryDelays }); return { m, ctx: () => box.inst! }
}
describe('createRaceMusic', () => {
  it('нет трека → none, играть нечего', () => { const m = createRaceMusic(false, { fetchBuffer: async () => new ArrayBuffer(0), now: () => 0 }); expect(m.status()).toBe('none'); expect(m.playAt(1000)).toBe(false) })
  it('звук разрешён → ready; запуск планируется на момент старта (по часам аудио)', async () => {
    const { m, ctx } = mk(true, () => 5_000); await flush(); await flush(); expect(m.status()).toBe('ready')
    expect(m.playAt(7_000)).toBe(true); expect(ctx().started).toEqual([{ when: 2, off: 0 }])
  })
  it('браузер не разрешил автозапуск → blocked с понятной причиной, играть нельзя; после resume() по жесту → ready', async () => {
    const { m, ctx } = mk(false); await flush(); await flush(); expect(m.status()).toBe('blocked'); expect(m.reason()).toMatch(/Включить звук/); expect(m.playAt(1000)).toBe(false)
    ctx().resumeAllowed = true; await m.resume(); expect(m.status()).toBe('ready')
  })
  it('сбой первой попытки → повторная загрузка сама; удалась со второй — ready, ошибки нет', async () => {
    let n = 0; const { m } = mk(true, () => 0, async () => { if (++n === 1) throw new Error('обрыв'); return new ArrayBuffer(8) })
    for (let i = 0; i < 8; i++) await flush(); expect(n).toBe(2); expect(m.status()).toBe('ready')
  })
  it('все попытки неудачны (1 + 3 повтора) → error с причиной; опоздавший запуск не играет', async () => {
    let n = 0; const bad = mk(true, () => 0, async () => { n++; throw new Error('404') }); for (let i = 0; i < 12; i++) await flush(); expect(n).toBe(4); expect(bad.m.status()).toBe('error'); expect(bad.m.reason()).toMatch(/404/)
    const late = mk(true, () => 20_000); await flush(); await flush(); expect(late.m.playAt(10_000)).toBe(false); expect(late.ctx().started).toEqual([])
  })
})
