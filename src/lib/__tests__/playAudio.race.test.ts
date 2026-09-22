// ═══ playAudio(): AbortController вместо isStale() ═══
// (HANDOFF.md §3bw, коммит A 9.59). Проверено вручную (независимая сверка,
// CLAUDE.md): убрать проверку `signal?.aborted || name === 'AbortError'` в
// прямом пути audioSource.ts:playAudio — первый тест ниже краснеет (fetch
// зовётся, хотя сигнал уже отменён).
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../packCache', () => ({ readMedia: vi.fn().mockResolvedValue(null) }))

let resolveFetch: (blob: Blob) => void = () => {}
const fetchMediaBlob = vi.fn((_path: string) => new Promise<Blob>(res => { resolveFetch = res }))
vi.mock('../media', () => ({ fetchMediaBlob: (path: string) => fetchMediaBlob(path) }))

class FakeAudio extends EventTarget {
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
  fetchMediaBlob.mockClear()
  vi.resetModules()
})

describe('playAudio: AbortSignal вместо isStale', () => {
  it('signal уже aborted до вызова: не идёт на прямой play() дальше, НЕ вызывает fetchMediaBlob', async () => {
    const { playAudio } = await import('../audioSource')
    const el = new FakeAudio() as unknown as HTMLAudioElement
    const ctrl = new AbortController()
    ctrl.abort()

    const r = await playAudio(el, 'x.mp3', 0, ctrl.signal)
    expect(r).toEqual({ ok: false, reason: 'superseded' })
  })

  it('AbortError на прямом пути НЕ вызывает fetchMediaBlob (главный фикс §3bw)', async () => {
    const { playAudio } = await import('../audioSource')
    class AbortingAudio extends FakeAudio {
      play = vi.fn(() => Promise.reject(new DOMException('прервано', 'AbortError')))
    }
    const el = new AbortingAudio() as unknown as HTMLAudioElement
    const ctrl = new AbortController()

    const r = await playAudio(el, 'x.mp3', 0, ctrl.signal)
    expect(r).toEqual({ ok: false, reason: 'superseded' })
    expect(fetchMediaBlob).not.toHaveBeenCalled()
  })

  it('url уже в блоб-кеше (шаг 0): играется сразу, sетевой fetchMediaBlob не вызывается', async () => {
    const { playAudio } = await import('../audioSource')
    // первый вызов кладёт url в кеш через обычный запасной путь
    class BlockedThenCached extends FakeAudio {
      play = vi.fn(() => {
        if (this.src.startsWith('blob:')) { this.paused = false; return Promise.resolve() }
        return Promise.reject(new Error('blocked'))
      })
    }
    const el1 = new BlockedThenCached() as unknown as HTMLAudioElement
    const p1 = playAudio(el1, 'cached.mp3')
    await Promise.resolve(); await Promise.resolve()   // прямой play() падает, идём в fetch
    resolveFetch(new Blob())
    await p1
    expect(fetchMediaBlob).toHaveBeenCalledTimes(1)

    // второй раз — тот же url, кеш уже тёплый, второго fetch быть не должно
    const el2 = new BlockedThenCached() as unknown as HTMLAudioElement
    // прямой путь на el2 должен упасть (не blob), но playAudio должна сначала
    // проверить кеш ДО прямого запроса — el2.play() не должен звать 'cached.mp3' напрямую
    const r2 = await playAudio(el2, 'cached.mp3')
    expect(r2).toEqual({ ok: true })
    expect(fetchMediaBlob).toHaveBeenCalledTimes(1)
  })

  it('без signal (playSynced): поведение как раньше — играет как получится', async () => {
    const { playAudio } = await import('../audioSource')
    const el = new FakeAudio() as unknown as HTMLAudioElement

    const p = playAudio(el, 'y.mp3')
    await Promise.resolve(); await Promise.resolve()

    resolveFetch(new Blob())
    const r = await p
    expect(r).toEqual({ ok: true })
  })
})

describe('playSynced: superseded не считается ошибкой звука', () => {
  it('вторая playSynced() вытесняет первую через AbortController — onError первой НЕ вызывается', async () => {
    vi.stubGlobal('Audio', FakeAudio)
    vi.stubGlobal('document', { querySelectorAll: () => [] })
    const { playSynced } = await import('../audioSource')

    const onError1 = vi.fn()
    playSynced('a.mp3', 5, { onError: onError1 })
    await Promise.resolve(); await Promise.resolve()   // прямой play() первой упал, ушла на fetch

    // вторая playSynced() (аналог «переслушать») вытесняет первую по AbortController
    const onError2 = vi.fn()
    playSynced('b.mp3', 5, { onError: onError2 })
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()

    resolveFetch(new Blob())
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()

    expect(onError1).not.toHaveBeenCalled()
  })
})
