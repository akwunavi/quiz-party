import { describe, it, expect } from 'vitest'
import { encodeQr } from '../qr'

// Проверка finder-паттерна 7×7 (три угла QR-кода) по тому же правилу,
// каким его строит кодер: внешнее тёмное кольцо, светлое кольцо внутри
// него, тёмный квадрат 3×3 в центре. Сверяем структуру, а не пиксели —
// внешнего эталона для офлайн-проверки нет и взять его неоткуда.
function expectFinderPattern(matrix: ReturnType<typeof encodeQr>, originX: number, originY: number) {
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const expectedDark =
        r === 0 || r === 6 || c === 0 || c === 6 ||
        (r >= 2 && r <= 4 && c >= 2 && c <= 4)
      expect(matrix.isDark(originX + c, originY + r)).toBe(expectedDark)
    }
  }
}

describe('encodeQr', () => {
  it('строит квадратную матрицу для короткой строки', () => {
    const m = encodeQr('HELLO')
    expect(m.size).toBeGreaterThan(0)
    // размер QR всегда version*4+17, т.е. вида 21, 25, 29…
    expect((m.size - 17) % 4).toBe(0)
  })

  it('finder-паттерны стоят в трёх углах (короткая строка)', () => {
    const m = encodeQr('HELLO')
    expectFinderPattern(m, 0, 0) // верхний левый
    expectFinderPattern(m, m.size - 7, 0) // верхний правый
    expectFinderPattern(m, 0, m.size - 7) // нижний левый
  })

  it('finder-паттерны стоят в трёх углах для реалистичного урла игрока', () => {
    const playerUrl =
      'https://akwunavi.github.io/quiz-party/#/player?room=3f6a9c2e-1b4d-4e8a-9c7f-2d5b6a1e8f30&pack=7a1c4e9b-2f3d-4a6c-8b1e-5d9f2a7c3e60'
    const m = encodeQr(playerUrl)
    expectFinderPattern(m, 0, 0)
    expectFinderPattern(m, m.size - 7, 0)
    expectFinderPattern(m, 0, m.size - 7)
  })

  it('размер растёт для более длинного входа и не падает на реалистичном урле', () => {
    const short = encodeQr('HELLO')
    const longer = encodeQr(
      'https://akwunavi.github.io/quiz-party/#/player?room=3f6a9c2e-1b4d-4e8a-9c7f-2d5b6a1e8f30&pack=7a1c4e9b-2f3d-4a6c-8b1e-5d9f2a7c3e60'
    )
    expect(longer.size).toBeGreaterThanOrEqual(short.size)
  })

  it('одинаковая длина входа даёт одинаковый размер символа', () => {
    const a = encodeQr('AAAAAAAAAA')
    const b = encodeQr('ZZZZZZZZZZ')
    expect(a.size).toBe(b.size)
  })

  it('детерминирован: одинаковый вход даёт одинаковую матрицу', () => {
    const url = 'https://example.com/#/player?room=abc123&pack=xyz789'
    const m1 = encodeQr(url)
    const m2 = encodeQr(url)
    expect(m1.size).toBe(m2.size)
    for (let y = 0; y < m1.size; y++) {
      for (let x = 0; x < m1.size; x++) {
        expect(m1.isDark(x, y)).toBe(m2.isDark(x, y))
      }
    }
  })

  it('не рисует один сплошной цвет — есть и тёмные, и светлые модули', () => {
    const m = encodeQr('https://example.com/#/player?room=abc123&pack=xyz789')
    let dark = 0
    let light = 0
    for (let y = 0; y < m.size; y++) {
      for (let x = 0; x < m.size; x++) {
        if (m.isDark(x, y)) dark++
        else light++
      }
    }
    expect(dark).toBeGreaterThan(0)
    expect(light).toBeGreaterThan(0)
  })

  it('вмещает данные вплоть до версии символа 10 (213 байт)', () => {
    const near213 = 'x'.repeat(213)
    expect(() => encodeQr(near213)).not.toThrow()
    const over = 'x'.repeat(214)
    expect(() => encodeQr(over)).toThrow()
  })
})
