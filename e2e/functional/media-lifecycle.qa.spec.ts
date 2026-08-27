import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: media lifecycle contracts', () => {
  it('global media stop covers programmatic audio and DOM media', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain('live.forEach')
    expect(source).toContain("document.querySelectorAll('audio, video')")
    expect(source).toContain('m.pause()')
    expect(source).toContain('m.currentTime = 0')
  })

  it('synced playback cannot start an old generation after a new one begins', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain('const my = ++generation')
    expect(source).toContain('if (stale()) { stop(); return }')
    expect(source).toContain('stopAllAudio()')
  })

  it('sync timer starts from actual media playback', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain("el.addEventListener('playing'")
    expect(source).toContain('cb.onStart?.()')
  })

  it('sync timer has an explicit end and cleanup path', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain('clearInterval(timer)')
    expect(source).toContain('cb.onEnd?.()')
  })

  it('media diagnostics distinguish missing storage objects from network failures', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain('ФАЙЛА НЕТ В ХРАНИЛИЩЕ')
    expect(source).toContain('файл не скачивается: запрос блокирует браузер, VPN или расширение')
  })
})
