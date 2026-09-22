// ═══ SpecAudio сверяется с РЕАЛЬНЫМ поведением Chromium ═══
// chromium-semantics.json получен запуском scripts/media-calibration.mjs в
// headless Chromium (см. комментарий там). Если SpecAudio разойдётся с
// реальным браузером — гонки, которые она эмулирует в остальных тестах
// (sharedAudio.race.test.ts и др.), окажутся вымышленными, а не настоящими.
import { describe, it, expect } from 'vitest'
import { SpecAudio } from '../fakeMedia'
import semantics from '../media/chromium-semantics.json'

describe('SpecAudio соответствует калибровке реального Chromium', () => {
  it('случай 1: play() → сразу pause() даёт то же имя ошибки', async () => {
    const a = new SpecAudio()
    const p = a.play().catch(e => (e as Error).name)
    a.pause()
    await expect(p).resolves.toBe(semantics.case1)
  })

  it('случай 2: play() → сразу смена src даёт то же имя ошибки', async () => {
    const a = new SpecAudio()
    const p = a.play().catch(e => (e as Error).name)
    a.src = 'other.wav'
    await expect(p).resolves.toBe(semantics.case2)
  })

  it('случай 3: несуществующий файл (эмулируется _failLoad) даёт то же имя ошибки', async () => {
    const a = new SpecAudio()
    const p = a.play().catch(e => (e as Error).name)
    a._failLoad()
    await expect(p).resolves.toBe(semantics.case3)
  })

  it('случай 4: play() → removeAttribute(src)+load() даёт то же имя ошибки', async () => {
    const a = new SpecAudio()
    const p = a.play().catch(e => (e as Error).name)
    a.load()
    await expect(p).resolves.toBe(semantics.case4)
  })
})
