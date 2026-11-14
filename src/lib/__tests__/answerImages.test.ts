import { describe, expect, it } from 'vitest'
import { answerScreenImages } from '../answerImages'

describe('answerScreenImages: картинки на экране ответа', () => {
  it('есть картинка ответа — показывается только она, картинки вопроса не показываются', () => {
    const r = answerScreenImages({ question: ['q1.jpg', 'q2.jpg'], answer: ['a.jpg'] })
    expect(r.revealImgs).toEqual(['a.jpg']); expect(r.questionGallery).toBe(false)
  })
  it('нет картинки ответа — на разборе картинки вопроса', () => {
    expect(answerScreenImages({ question: ['q1.jpg'], answer: [] }).revealImgs).toEqual(['q1.jpg'])
    expect(answerScreenImages({ question: ['q1.jpg'] }).revealImgs).toEqual(['q1.jpg'])
  })
  it('звук и видео — не картинки', () => {
    expect(answerScreenImages({ question: ['v.mp4', 'q.jpg'], answer: ['s.mp3'] }).revealImgs).toEqual(['q.jpg'])
  })
  it('пусто / undefined', () => {
    expect(answerScreenImages(undefined).revealImgs).toEqual([])
    expect(answerScreenImages({}).questionGallery).toBe(false)
  })
})
