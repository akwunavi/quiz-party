import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: projector media regression contracts', () => {
  it('projector classifies question media into images and audio/video assets', async () => {
    const source = await read('src/pages/HostScreen.tsx')
    expect(source).toContain('const media = q.media.question ?? []')
    expect(source).toContain('const imgs = media.filter')
    expect(source).toContain('const avs = media.filter')
    expect(source).toMatch(/mp4\|webm/)
  })

  it('round rules audio is rendered from the round media reference', async () => {
    const source = await read('src/pages/HostScreen.tsx')
    expect(source).toContain('round.rules_audio')
    expect(source).toContain('<audio autoPlay src={mediaUrl(round.rules_audio)} />')
  })

  it('projector has an explicit global media cleanup primitive', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain("document.querySelectorAll('audio, video')")
    expect(source).toContain('m.pause()')
    expect(source).toContain('m.currentTime = 0')
  })

  it('media URL failures are surfaced with actionable diagnostics', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain('ФАЙЛА НЕТ В ХРАНИЛИЩЕ')
    expect(source).toContain('файл не скачивается: запрос блокирует браузер, VPN или расширение')
  })
})