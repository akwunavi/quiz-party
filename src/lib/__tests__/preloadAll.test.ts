// ═══ Все треки раунда мелодии — в память при входе на доску (9.85) ═══
import { describe, it, expect, vi } from 'vitest'
vi.mock('../packCache', () => ({ readMedia: vi.fn(async () => null) }))
const pending: Record<string, (ok: boolean) => void> = {}
let active = 0, maxActive = 0
vi.mock('../media', () => ({
  fetchMediaBlob: vi.fn((path: string) => new Promise<Blob>((resolve, reject) => {
    active++; maxActive = Math.max(maxActive, active)
    pending[path] = ok => { active--; if (ok) resolve(new Blob()); else reject(new Error('ФАЙЛА НЕТ')) }
  })),
}))
;(globalThis as unknown as { URL: typeof URL }).URL.createObjectURL = vi.fn(() => 'blob:x')
const { preloadAudioAll } = await import('../audioSource')
const tick = () => new Promise(r => setTimeout(r, 0))

describe('preloadAudioAll: прогресс скачивания треков', () => {
  it('качает по два одновременно, считает готовые и неудачные, ошибка не останавливает остальные', async () => {
    const seen: string[] = []
    preloadAudioAll(['a.mp3', 'b.mp3', 'c.mp3', 'a.mp3'], p => seen.push(`${p.done}/${p.failed}/${p.total}`))
    await tick()
    expect(seen[0]).toBe('0/0/3')              // дубли схлопнуты
    expect(Object.keys(pending)).toEqual(['a.mp3', 'b.mp3'])
    pending['a.mp3'](true); await tick(); await tick()
    pending['b.mp3'](false); await tick(); await tick()
    pending['c.mp3'](true); await tick(); await tick()
    expect(seen[seen.length - 1]).toBe('2/1/3')
    expect(maxActive).toBeLessThanOrEqual(2)
  })
})
