import { describe, it, expect } from 'vitest'
import { collectUsedPaths } from '../usedPaths'

describe('поиск используемых медиа', () => {
  it('видит треки «Своей игры» внутри settings.themes[].tiles[]', () => {
    const pack = {
      id: 'p1', settings: {},
      rounds: [{
        settings: { themes: [{ name: 'Кино', tiles: [
          { value: 100, audio: 'pack-p1/1-track.mp3', correct: 'Ответ' },
          { value: 200, audio: 'pack-p1/2-track.mp3', correct: 'Ответ' },
        ] }] },
        questions: [],
      }],
    }
    const used = collectUsedPaths(pack)
    expect(used.has('pack-p1/1-track.mp3')).toBe(true)
    expect(used.has('pack-p1/2-track.mp3')).toBe(true)
  })

  it('видит треки «Угадай мелодию»', () => {
    const pack = {
      id: 'p1', settings: {},
      rounds: [{ settings: { themes: [{ name: 'Рок',
        tracks: [{ audio: 'pack-p1/rock.mp3', correct: 'Queen' }] }] }, questions: [] }],
    }
    expect(collectUsedPaths(pack).has('pack-p1/rock.mp3')).toBe(true)
  })

  it('видит обычные медиа вопроса и ответа', () => {
    const pack = {
      id: 'p1', settings: { bg_music: 'pack-p1/bg.mp3' },
      rounds: [{ settings: {}, questions: [{ media: {
        question: ['pack-p1/q.png'], answer: ['pack-p1/a.png'], voice: 'pack-p1/v.mp3',
      } }] }],
    }
    const used = collectUsedPaths(pack)
    for (const p of ['pack-p1/bg.mp3', 'pack-p1/q.png', 'pack-p1/a.png', 'pack-p1/v.mp3']) {
      expect(used.has(p)).toBe(true)
    }
  })

  it('не считает медиа обычные строки настроек', () => {
    const pack = { id: 'p1', settings: { play_mode: 'paper', title: 'Квиз' }, rounds: [] }
    expect(collectUsedPaths(pack).size).toBe(0)
  })
})
