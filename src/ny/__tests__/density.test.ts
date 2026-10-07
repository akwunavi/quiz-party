// ═══ Новогодние темы ny_book / ny_home: чистая логика плотности (HANDOFF §3cl) ═══
import { describe, it, expect } from 'vitest'
import { isNyTheme, nyDensity, isPlainQuestion } from '../density'

describe('ny: тема и плотность', () => {
  it('isNyTheme узнаёт только две новые темы, старые не трогает', () => {
    expect(isNyTheme('ny_book')).toBe(true)
    expect(isNyTheme('ny_home')).toBe(true)
    for (const t of ['classic', 'potter', 'new_year', undefined, null, '']) expect(isNyTheme(t as string)).toBe(false)
  })
  it('лобби — «комната», вопрос с картинками/вариантами — «плотно»', () => {
    expect(nyDensity('ny_book', 'lobby')).toBe('sparse')
    expect(nyDensity('ny_home', 'lobby')).toBe('sparse')
    expect(nyDensity('ny_book', 'question', false)).toBe('dense')
    expect(nyDensity('ny_home', 'show_answers')).toBe('dense')
  })
  it('пустой вопрос: Книга — просторно, Дом — «ТВ крупно»; экраны без макета — средние', () => {
    expect(nyDensity('ny_book', 'question', true)).toBe('sparse')
    expect(nyDensity('ny_home', 'question', true)).toBe('medium')
    for (const p of ['scoreboard', 'break', 'finale', 'info', 'round_intro']) expect(nyDensity('ny_home', p)).toBe('medium')
  })
  it('isPlainQuestion: без картинок и вариантов — да; с вариантами/картинкой — нет; аудио не считается картинкой', () => {
    expect(isPlainQuestion(undefined)).toBe(false)
    expect(isPlainQuestion({ answer: { mode: 'free_text' } })).toBe(true)
    expect(isPlainQuestion({ answer: { mode: 'choice' } })).toBe(false)
    expect(isPlainQuestion({ media: { question: ['a.jpg'] }, answer: { mode: 'free_text' } })).toBe(false)
    expect(isPlainQuestion({ media: { question: ['a.mp3'] }, answer: { mode: 'free_text' } })).toBe(true)
    expect(isPlainQuestion({ answer: { mode: 'anagram' } })).toBe(false)
    expect(isPlainQuestion({ answer: { mode: 'free_text' } }, 'blitz')).toBe(false)
    expect(isPlainQuestion({ answer: { mode: 'free_text' } }, 'standard')).toBe(true)
  })
})
