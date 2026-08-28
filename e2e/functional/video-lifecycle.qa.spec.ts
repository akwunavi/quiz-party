import { describe, expect, it } from 'vitest'
import { readFile } from 'node:fs/promises'

const read = (path: string) => readFile(path, 'utf8')

describe('QA: projector video lifecycle', () => {
  it('projector recognises video media separately from audio', async () => {
    const source = await read('src/pages/HostScreen.tsx')
    expect(source).toContain("/\\.(mp4|webm)$/i")
    expect(source).toContain('<QuestionVideo')
  })

  it('video playback is tied to the current question timer state', async () => {
    const source = await read('src/pages/HostScreen.tsx')
    expect(source).toContain('go={!!gameState.timer_started_at}')
    expect(source).toContain('waitFor={!!q.media.voice}')
  })

  it('global media cleanup covers DOM video elements when the question changes', async () => {
    const source = await read('src/lib/audioSource.ts')
    expect(source).toContain("document.querySelectorAll('audio, video')")
    expect(source).toContain('m.pause()')
    expect(source).toContain('m.currentTime = 0')
  })

  it('question navigation invokes media cleanup before entering the next question', async () => {
    const source = await read('src/lib/gameActions.ts')
    expect(source).toContain('stopAllAudio()')
  })
})
