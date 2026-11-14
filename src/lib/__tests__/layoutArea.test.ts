import { describe, expect, it } from 'vitest'
import { layoutAreaCss, layoutAreaPx, themeHasFold, themeHasLayoutArea } from '../layoutArea'

describe('layoutArea: рабочая область темы', () => {
  it('Лес не поддерживается, остальные темы — да', () => {
    expect(themeHasLayoutArea('enchanted_forest')).toBe(false); expect(layoutAreaCss('enchanted_forest')).toBeNull(); expect(layoutAreaPx('enchanted_forest', 1920, 1080)).toBeNull()
    for (const t of ['classic', 'potter', 'new_year', 'ny_home', 'ny_book']) expect(themeHasLayoutArea(t)).toBe(true)
    expect(themeHasLayoutArea(undefined)).toBe(false)
  })
  it('сгиб — только у Книги', () => { expect(themeHasFold('ny_book')).toBe(true); expect(themeHasFold('classic')).toBe(false) })
  it('Книга на 1920×1080: 250/208, 1420 шириной; ниже плашки и таймера, выше среза страниц', () => {
    const a = layoutAreaPx('ny_book', 1920, 1080)!
    expect(a).toMatchObject({ x: 250, y: 208, w: 1420 }); expect(a.y + a.h).toBe(1080 - 136)
  })
  it('Книга на 1899×905: область внутри окна, пропорции те же (масштаб --u)', () => {
    const a = layoutAreaPx('ny_book', 1899, 905)!, u = 905 / 1080
    expect(a.w).toBeCloseTo(1420 * u, 6); expect(a.x + a.w).toBeLessThanOrEqual(1899); expect(a.y).toBeCloseTo(208 * u + 0, 6)
  })
  it('прочие темы: доли окна, не заходят на слот таймера (верх 17vh) и кнопки (низ 11vh); одна доля — одинаковые пропорции на любом окне', () => {
    for (const [w, h] of [[1920, 1080], [1366, 768], [3840, 2160]]) {
      const a = layoutAreaPx('classic', w, h)!
      expect(a.y).toBeCloseTo(h * 0.17, 6); expect(a.y + a.h).toBeCloseTo(h * 0.89, 6); expect(a.x).toBeCloseTo(w * 0.04, 6)
      expect(a.w / w).toBeCloseTo(0.92, 6); expect(a.h / h).toBeCloseTo(0.72, 6)
    }
  })
  it('CSS-строки согласованы с темой', () => {
    expect(layoutAreaCss('classic')).toEqual({ left: '4vw', top: '17vh', width: '92vw', height: '72vh' })
    expect(layoutAreaCss('ny_book')!.left).toContain('--bk-ox')
  })
})
