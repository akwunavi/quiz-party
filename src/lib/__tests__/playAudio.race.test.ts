// ═══ playAudio(): необязательный isStale — запасной путь не проигрывает
// устаревший трек, но не молчит, если он ещё актуален ═══
// (HANDOFF.md §3bu, шаг 6 плана). Проверено вручную (независимая сверка,
// CLAUDE.md): закомментировать `if (isStale?.())` в audioSource.ts —
// первый тест ниже красный (play() зовётся, хотя isStale() вернула true).
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../packCache', () => ({ readMedia: vi.fn().mockResolvedValue(null) }))

let resolveFetch: (blob: Blob) => void = () => {}
vi.mock('../media', () => ({
  fetchMediaBlob: vi.fn(() => new Promise<Blob>(res => { resolveFetch = res })),
}))

class FakeAudio {
  paused = true
  currentTime = 0
  src = ''
  play = vi.fn(() => {
    if (this.src.startsWith('blob:')) { this.paused = false; return Promise.resolve() }
    return Promise.reject(new Error('blocked'))
  })
  pause() { this.paused = true }
}

beforeEach(() => {
  vi.stubGlobal('URL', { createObjectURL: () => 'blob:x' })
  vi.resetModules()
})

describe('playAudio: isStale перед повторным play() запасного пути', () => {
  it('isStale() → true: НЕ проигрывает, не трогает el.play() второй раз', async () => {
    const { playAudio } = await import('../audioSource')
    const el = new FakeAudio() as unknown as HTMLAudioElement
    const playCallsBefore = () => (el as unknown as FakeAudio).play.mock.calls.length

    const p = playAudio(el, 'x.mp3', 0, () => true)
    await Promise.resolve(); await Promise.resolve()   // первый (прямой) play() падает
    const before = playCallsBefore()

    resolveFetch(new Blob())
    const r = await p
    expect(r).toEqual({ ok: false, reason: 'stale' })
    // play() не вызван повторно ради устаревшего трека
    expect(playCallsBefore()).toBe(before)
  })

  it('isStale() → false: проигрывает трек, пусть и с опозданием, а не молчит', async () => {
    const { playAudio } = await import('../audioSource')
    const el = new FakeAudio() as unknown as HTMLAudioElement

    const p = playAudio(el, 'x.mp3', 0, () => false)
    await Promise.resolve(); await Promise.resolve()

    resolveFetch(new Blob())
    const r = await p
    expect(r).toEqual({ ok: true })
    expect((el as unknown as FakeAudio).paused).toBe(false)
  })

  it('без isStale (playSynced): поведение как раньше — играет как получится', async () => {
    const { playAudio } = await import('../audioSource')
    const el = new FakeAudio() as unknown as HTMLAudioElement

    const p = playAudio(el, 'x.mp3')
    await Promise.resolve(); await Promise.resolve()

    resolveFetch(new Blob())
    const r = await p
    expect(r).toEqual({ ok: true })
  })
})
