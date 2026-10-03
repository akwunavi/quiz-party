import { describe, it, expect, vi } from 'vitest'

// Подставка Web Audio: проверяем, что поток держится тихим шумом (не нулями
// и не слышимым звуком), зациклен и создаётся ровно один раз за вечер.
class FakeCtx {
  static made = 0
  state: 'suspended' | 'running' = 'suspended'
  sampleRate = 48000
  destination = {}
  gainNode = { gain: { value: 1 }, connect: vi.fn() }
  source = { buffer: null as null | { data: Float32Array }, loop: false, connect: vi.fn(), start: vi.fn() }
  constructor() { FakeCtx.made++ }
  createBuffer(_ch: number, len: number) {
    const data = new Float32Array(len)
    return { data, getChannelData: () => data }
  }
  createBufferSource() { return this.source }
  createGain() { return this.gainNode }
  resume() { this.state = 'running'; return Promise.resolve() }
}

describe('audioKeepAlive (9.76): колонки не засыпают между звуками', () => {
  it('один поток на весь вечер: тихий зациклённый шум, не нули', async () => {
    const made: FakeCtx[] = []
    vi.stubGlobal('window', { AudioContext: class extends FakeCtx { constructor() { super(); made.push(this) } } })
    const { startAudioKeepAlive, KEEPALIVE_GAIN } = await import('../audioKeepAlive')
    startAudioKeepAlive()
    startAudioKeepAlive()
    expect(made).toHaveLength(1)
    const c = made[0]
    expect(c.source.loop).toBe(true)
    expect(c.source.start).toHaveBeenCalledTimes(1)
    expect(c.gainNode.gain.value).toBe(KEEPALIVE_GAIN)
    // ≈ −80 дБ: не слышно, но и не «цифровая тишина»
    expect(KEEPALIVE_GAIN).toBeLessThanOrEqual(1e-4)
    expect(KEEPALIVE_GAIN).toBeGreaterThan(0)
    const data = (c.source as unknown as { buffer: { getChannelData: () => Float32Array } }).buffer.getChannelData()
    expect(data.some(v => v !== 0)).toBe(true)
    vi.unstubAllGlobals()
  })
})
