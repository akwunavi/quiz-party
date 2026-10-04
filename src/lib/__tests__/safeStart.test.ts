// ═══ Точка старта отрывка по РЕАЛЬНОЙ длине файла (9.83, HANDOFF §3cf) ═══
// Корень «секунда мелодии иногда не звучит»: старт выбирали по номинальной
// длине трека, и у файла короче этой точки браузер прыгал в конец — тишина
// (замер в headless Chromium: файл 12 с, старт 15/18 → 0,00 с звука).
import { describe, it, expect, vi } from 'vitest'
vi.mock('../packCache', () => ({ readMedia: vi.fn() }))
vi.mock('../media', () => ({ fetchMediaBlob: vi.fn() }))
const { safeStart } = await import('../audioSource')

describe('safeStart: после точки старта остаётся звук', () => {
  it('файл короче выбранной точки — старт сдвигается так, чтобы хватило на самый длинный отрывок', () => {
    expect(safeStart(15, 12, 10)).toBe(2)
    expect(safeStart(18, 12, 10)).toBe(2)
  })
  it('файл длинный — точка как выбрали', () => {
    expect(safeStart(18, 40, 10)).toBe(18)
  })
  it('файл короче самого отрывка — с начала', () => {
    expect(safeStart(5, 6, 10)).toBe(0)
  })
  it('длина неизвестна — как просили; ноль — ноль', () => {
    expect(safeStart(7, NaN, 10)).toBe(7)
    expect(safeStart(0, 12, 10)).toBe(0)
  })
})
