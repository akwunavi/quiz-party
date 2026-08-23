import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createAudio, stopAllAudio } from '../audioSource'

// Плееры, созданные через new Audio(), НЕ находятся в документе.
// Раньше «заглушить всё» искало только по документу и их не трогало —
// поэтому трек продолжал играть на следующем слайде.
class FakeAudio {
  paused = false
  currentTime = 12
  src = 'track.mp3'
  pause() { this.paused = true }
  play() { this.paused = false; return Promise.resolve() }
}

beforeEach(() => {
  vi.stubGlobal('Audio', FakeAudio)
  vi.stubGlobal('document', { querySelectorAll: () => [] })
})

describe('реестр плееров', () => {
  it('останавливает плеер, созданный кодом (его нет в документе)', () => {
    const a = createAudio() as unknown as FakeAudio
    a.paused = false
    stopAllAudio()
    expect(a.paused).toBe(true)
  })

  it('сбрасывает позицию, чтобы трек не продолжился с середины', () => {
    const a = createAudio() as unknown as FakeAudio
    stopAllAudio()
    expect(a.currentTime).toBe(0)
  })

  it('глушит ВСЕ плееры разом: озвучка, трек вопроса, фон', () => {
    const players = [createAudio(), createAudio(), createAudio()] as unknown as FakeAudio[]
    stopAllAudio()
    expect(players.every(p => p.paused)).toBe(true)
  })

  it('после остановки реестр пуст — старые плееры не оживают', () => {
    const a = createAudio() as unknown as FakeAudio
    stopAllAudio()
    a.paused = false          // как будто кто-то запустил заново
    stopAllAudio()            // повторная остановка не должна падать
    expect(a.paused).toBe(false)   // им управляет уже новый владелец
  })
})
