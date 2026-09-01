import { describe, it, expect } from 'vitest'
import { scramble } from '../scramble'

describe('scramble', () => {
  it('сохраняет длину строки на любом прогрессе', () => {
    const text = 'QUIZ PARTY'
    for (const p of [0, .25, .5, .75, 1]) {
      expect(scramble(text, p, 7).length).toBe(text.length)
    }
  })

  it('progress=1 возвращает исходную строку', () => {
    expect(scramble('СВОЯ ИГРА', 1, 3)).toBe('СВОЯ ИГРА')
  })

  it('progress=0 не возвращает исходную строку', () => {
    const text = 'РАУНД ПЕРВЫЙ'
    expect(scramble(text, 0, 5)).not.toBe(text)
  })

  it('пробелы остаются на своих местах при любом прогрессе', () => {
    const text = 'QUIZ PARTY NIGHT'
    const spaceIdx = [...text].map((c, i) => c === ' ' ? i : -1).filter(i => i >= 0)
    for (const p of [0, .3, .6]) {
      const out = scramble(text, p, 11)
      for (const i of spaceIdx) expect(out[i]).toBe(' ')
    }
  })

  it('детерминирована по seed: тот же seed и progress дают тот же результат', () => {
    const a = scramble('ФИНАЛ', .4, 42)
    const b = scramble('ФИНАЛ', .4, 42)
    expect(a).toBe(b)
  })

  it('раскрывает символы слева направо по мере роста progress', () => {
    const text = 'РЕЗУЛЬТАТЫ'
    const half = scramble(text, .5, 9)
    // первая половина символов уже совпадает с исходником
    const revealTo = Math.floor(text.length * .5)
    expect(half.slice(0, revealTo)).toBe(text.slice(0, revealTo))
  })
})
