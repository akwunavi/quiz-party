// ═══ preloadAudio: прогрев кеша без ожидания результата ═══
// (HANDOFF.md §3bw, коммит A 9.59)
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../packCache', () => ({ readMedia: vi.fn().mockResolvedValue(null) }))

let resolvers: Array<(b: Blob) => void> = []
let rejecters: Array<(e: Error) => void> = []
const fetchMediaBlob = vi.fn((_path: string) => new Promise<Blob>((res, rej) => {
  resolvers.push(res); rejecters.push(rej)
}))
vi.mock('../media', () => ({ fetchMediaBlob: (path: string) => fetchMediaBlob(path) }))

beforeEach(() => {
  resolvers = []; rejecters = []
  fetchMediaBlob.mockClear()
  vi.stubGlobal('URL', { createObjectURL: () => 'blob:x-' + Math.random(), revokeObjectURL: vi.fn() })
  vi.resetModules()
})

describe('preloadAudio', () => {
  it('два подряд вызова на один URL → fetchMediaBlob вызван ровно один раз', async () => {
    const { preloadAudio } = await import('../audioSource')
    preloadAudio('track.mp3')
    preloadAudio('track.mp3')
    await Promise.resolve(); await Promise.resolve()
    expect(fetchMediaBlob).toHaveBeenCalledTimes(1)
    resolvers[0]?.(new Blob())
    await Promise.resolve(); await Promise.resolve()
  })

  it('отклонённый fetch внутри preloadAudio не роняет процесс/не даёт unhandled rejection', async () => {
    const { preloadAudio } = await import('../audioSource')
    const onUnhandled = vi.fn()
    process.on('unhandledRejection', onUnhandled)
    preloadAudio('bad.mp3')
    await Promise.resolve(); await Promise.resolve()
    rejecters[0]?.(new Error('boom'))
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()
    process.off('unhandledRejection', onUnhandled)
    expect(onUnhandled).not.toHaveBeenCalled()
  })

  it('на blob:-URL — no-op, fetchMediaBlob не вызывается', async () => {
    const { preloadAudio } = await import('../audioSource')
    preloadAudio('blob:already-local')
    await Promise.resolve(); await Promise.resolve()
    expect(fetchMediaBlob).not.toHaveBeenCalled()
  })

  it('вытеснение сверх MAX_CACHED_BLOBS не отзывает blob, стоящий в src живого элемента', async () => {
    let blobCounter = 0
    const revoke = vi.fn()
    vi.stubGlobal('URL', { createObjectURL: () => `blob:x-${blobCounter++}`, revokeObjectURL: revoke })
    class MiniAudio { src = '' }
    vi.stubGlobal('Audio', MiniAudio)

    const { preloadAudio, createAudio } = await import('../audioSource')
    const live = createAudio() as unknown as { src: string }

    const firstBlobUrl = 'blob:x-0'
    for (let i = 0; i < 9; i++) {
      preloadAudio(`track${i}.mp3`)
      await Promise.resolve(); await Promise.resolve()
      resolvers[i]?.(new Blob())
      await Promise.resolve(); await Promise.resolve()
      // "проиграть" первый трек на живом элементе СРАЗУ после его скачивания —
      // защита должна действовать на всех дальнейших вытеснениях, не только
      // на первом же.
      if (i === 0) live.src = firstBlobUrl
    }

    expect(revoke).not.toHaveBeenCalledWith(firstBlobUrl)
  })
})
