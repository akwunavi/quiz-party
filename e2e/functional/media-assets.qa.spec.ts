import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: media asset safety contracts', () => {
  it('audio source reports missing storage files distinctly', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain("'ФАЙЛА НЕТ В ХРАНИЛИЩЕ'")
    expect(source).toContain("файла нет в хранилище — трек нужно загрузить заново в редакторе")
  })

  it('audio playback has a network fallback and does not hide fetch failures', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain('await fetch(url, { mode: \'cors\', credentials: \'omit\' })')
    expect(source).toContain('await toBlobUrl(url)')
    expect(source).toContain('файл не скачивается: запрос блокирует браузер, VPN или расширение')
  })

  it('synced playback starts the timer from media playing event', async () => {
    const source = await read('src/lib/audioSource.ts')
    const fn = source.match(/export function playSynced[\s\S]*?\n}\n/)
    expect(fn?.[0]).toContain("el.addEventListener('playing'")
    expect(fn?.[0]).toContain('cb.onStart?.()')
    expect(fn?.[0]).toContain('setInterval')
    expect(fn?.[0]).toContain('stale()')
  })

  it('new synced playback stops and invalidates the previous generation', async () => {
    const source = await read('src/lib/audioSource.ts')
    const fn = source.match(/export function playSynced[\s\S]*?\n}\n/)
    expect(fn?.[0]).toContain('const my = ++generation')
    expect(fn?.[0]).toContain('stopAllAudio()')
    expect(fn?.[0]).toContain('if (stale()) { stop(); return }')
  })
})
