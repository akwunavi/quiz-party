// Серверные часы: оценка поправки по замерам (src/lib/serverClock.ts, миграция 0016).
import { describe, it, expect } from 'vitest'
import { estimateOffset, serverNow, clockOffsetMs } from '../serverClock'

describe('estimateOffset', () => {
  it('сервер впереди на минуту, задержка симметрична — поправка +60 с', () => {
    // запрос ушёл в t0=1000, вернулся в t1=1100: сервер ответил в «середине» = 1050 по нашим часам
    expect(estimateOffset([{ t0: 1000, t1: 1100, server: 1050 + 60_000 }])).toBe(60_000)
  })
  it('наши часы впереди — поправка отрицательная', () => {
    expect(estimateOffset([{ t0: 5000, t1: 5040, server: 5020 - 90_000 }])).toBe(-90_000)
  })
  it('из нескольких замеров берётся с наименьшей задержкой (самый точный)', () => {
    const off = estimateOffset([
      { t0: 0, t1: 900, server: 450 + 5000 },    // медленный, «шумный»
      { t0: 2000, t1: 2020, server: 2010 + 1000 }, // быстрый
    ])
    expect(off).toBe(1000)
  })
  it('нет годных замеров — null (останемся на своих часах)', () => {
    expect(estimateOffset([])).toBeNull()
    expect(estimateOffset([{ t0: 10, t1: 5, server: 7 }])).toBeNull()
    expect(estimateOffset([{ t0: 1, t1: 2, server: NaN }])).toBeNull()
  })
})

describe('serverNow', () => {
  it('без синхронизации равен Date.now() (поправка 0)', () => {
    expect(clockOffsetMs()).toBe(0)
    expect(Math.abs(serverNow() - Date.now())).toBeLessThan(50)
  })
})
