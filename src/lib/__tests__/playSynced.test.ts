import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { playSynced } from '../audioSource'

// Плеер, который начинает играть НЕ СРАЗУ — как настоящий при загрузке файла.
class SlowAudio {
  src = ''
  paused = true
  currentTime = 0
  private handlers: Record<string, (() => void)[]> = {}
  addEventListener(k: string, fn: () => void) { (this.handlers[k] ??= []).push(fn) }
  removeEventListener() { /* не нужен в тесте */ }
  pause() { this.paused = true }
  play() { this.paused = false; return Promise.resolve() }
  /** Имитируем момент, когда звук реально пошёл. */
  firePlaying() { (this.handlers['playing'] ?? []).forEach(f => f()) }
}

let created: SlowAudio[] = []

beforeEach(() => {
  created = []
  vi.useFakeTimers()
  vi.stubGlobal('Audio', function () { const a = new SlowAudio(); created.push(a); return a })
  vi.stubGlobal('document', { querySelectorAll: () => [] })
})
afterEach(() => vi.useRealTimers())

describe('трек и отсчёт синхронны', () => {
  it('отсчёт НЕ идёт, пока звук не начался', () => {
    const ticks: number[] = []
    playSynced('track.mp3', 30, { onTick: l => ticks.push(l) })
    vi.advanceTimersByTime(5000)          // файл всё ещё грузится
    expect(ticks).toEqual([])
  })

  it('отсчёт стартует ровно в момент начала звука', () => {
    const ticks: number[] = []
    playSynced('track.mp3', 30, { onTick: l => ticks.push(l) })
    created[0].firePlaying()
    expect(ticks[0]).toBe(30)
    vi.advanceTimersByTime(3000)
    expect(ticks[ticks.length - 1]).toBe(27)
  })

  it('по окончании отсчёта звук останавливается', () => {
    const onEnd = vi.fn()
    playSynced('track.mp3', 3, { onEnd })
    created[0].firePlaying()
    vi.advanceTimersByTime(3000)
    expect(onEnd).toHaveBeenCalled()
    expect(created[0].paused).toBe(true)
  })

  it('«переслушать» ГЛУШИТ прошлый трек — наложения нет', () => {
    playSynced('track.mp3', 30, {})
    created[0].firePlaying()
    playSynced('track.mp3', 30, {})       // нажали «переслушать»
    expect(created[0].paused).toBe(true)
    expect(created.length).toBe(2)
  })

  it('запоздавший старт СТАРОГО трека игнорируется', () => {
    const ticks: number[] = []
    playSynced('track.mp3', 30, { onTick: l => ticks.push(l) })
    playSynced('track.mp3', 30, {})       // переслушали до начала первого
    created[0].firePlaying()              // старый файл догрузился и пошёл
    expect(created[0].paused).toBe(true)  // должен быть заглушен
    expect(ticks).toEqual([])             // и не должен вести отсчёт
  })
})
