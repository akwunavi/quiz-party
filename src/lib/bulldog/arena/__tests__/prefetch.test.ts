import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ARENA_FILES, prefetchArena, resetPrefetchForTests } from '../prefetch'

describe('ранний прогрев арены', () => {
  beforeEach(() => resetPrefetchForTests())
  it('грузит все файлы арены один раз за сессию (повторные вызовы ничего не качают)', async () => {
    const f = vi.fn(async () => new Response(new Blob(['x']))) as unknown as typeof fetch
    prefetchArena('/quiz-party/', f); prefetchArena('/quiz-party/', f)
    expect((f as unknown as ReturnType<typeof vi.fn>).mock.calls.map(c => c[0])).toEqual(ARENA_FILES.map(n => `/quiz-party/arena/${n}`))
  })
  it('сбой сети не бросает ошибку и разрешает повторный прогрев', async () => {
    const f = vi.fn(async () => { throw new Error('offline') }) as unknown as typeof fetch
    prefetchArena('/q/', f); await new Promise(r => setTimeout(r, 0)); prefetchArena('/q/', f)
    expect((f as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBe(ARENA_FILES.length * 2)
  })
})
