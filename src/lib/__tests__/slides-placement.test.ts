import { describe, it, expect } from 'vitest'
import { slideForRound, slideBeforeFinale } from '../slides'

// Где в игре появляется слайд-брифинг. Правило одно: «после раунда N» —
// это то же место, что «перед раундом N+1», отдельного значения ему не надо.
// Дырка была одна: после ПОСЛЕДНЕГО раунда следующего нет, для неё 'finale'.

const slides = [
  { show_at: 'manual' },       // 0 — только по кнопке
  { show_at: 'lobby' },        // 1 — перед первым раундом
  { show_at: 'round:3' },      // 2 — перед третьим (то есть после второго)
  { show_at: 'finale' },       // 3 — после последнего раунда, перед итогами
]

describe('размещение слайда-брифинга', () => {
  it('lobby показывается перед первым раундом', () => {
    expect(slideForRound(slides, 0)).toBe(1)
  })

  it('round:3 показывается на входе в третий раунд', () => {
    expect(slideForRound(slides, 2)).toBe(2)
  })

  it('«после раунда 2» и «перед раундом 3» — одно и то же место', () => {
    // раунды нумеруются с нуля: вход в раунд с индексом 2 — это третий раунд
    expect(slideForRound([{ show_at: 'round:3' }], 2)).toBe(0)
  })

  it('на раундах без назначенного слайда — ничего', () => {
    expect(slideForRound(slides, 1)).toBeNull()
    expect(slideForRound(slides, 5)).toBeNull()
  })

  it('«только по кнопке» сам не выходит', () => {
    expect(slideForRound([{ show_at: 'manual' }], 0)).toBeNull()
    expect(slideForRound([{ show_at: 'manual' }], 3)).toBeNull()
  })

  it('слайд перед итогами находится отдельно', () => {
    expect(slideBeforeFinale(slides)).toBe(3)
    expect(slideBeforeFinale([{ show_at: 'round:2' }])).toBeNull()
    expect(slideBeforeFinale([])).toBeNull()
    expect(slideBeforeFinale(undefined)).toBeNull()
  })

  it('пустой список слайдов ничего не ломает', () => {
    expect(slideForRound([], 0)).toBeNull()
    expect(slideForRound(undefined, 0)).toBeNull()
  })
})
