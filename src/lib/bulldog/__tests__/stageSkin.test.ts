import { describe, expect, it } from 'vitest'
import { fitList, lum, parseColor, rgba, seg } from '../stageSkin'

const ctx = { save() {}, restore() {}, font: '', measureText(t: string) { return { width: t.length * 10 } } } as unknown as CanvasRenderingContext2D
describe('скин экранов раунда', () => {
  it('цвета токенов: #rgb/#rrggbb/rgba() читаются, светлота светлой темы выше порога', () => {
    expect(parseColor('#fff')).toEqual([255, 255, 255, 1]); expect(parseColor('rgba(10,20,30,.5)')).toEqual([10, 20, 30, .5]); expect(rgba('#000', .5)).toBe('rgba(0,0,0,0.5)')
    expect(lum('#f3ead8')).toBeGreaterThan(.55); expect(lum('#0a1a3d')).toBeLessThan(.55)
  })
  it('много команд: список не шире рамки, остаток — «+N»; одна длинная — обрезается; пусто — пусто', () => {
    const names = ['ТИГРЫ', 'СОВЫ', 'ЛИСЫ', 'ВОЛКИ', 'ОРЛЫ', 'БОБРЫ']
    const s = fitList(ctx, names, 120, 20, 'x'); expect(s.length * 10).toBeLessThanOrEqual(120); expect(s).toMatch(/\+\d+$/)
    expect(fitList(ctx, ['ДРУЖНАЯ КОМАНДА ПОД НАЗВАНИЕМ ТРИДЦАТЬ ТРИ БОГАТЫРЯ'], 200, 20, 'x')).toMatch(/…$/); expect(fitList(ctx, [], 100, 20, 'x')).toBe('')
    expect(fitList(ctx, names, 1000, 20, 'x')).toBe(names.join(' · '))
  })
  it('анимация появления: 0 до начала, 1 после конца, плавно между', () => { expect(seg(0, .2, .6)).toBe(0); expect(seg(1, .2, .6)).toBe(1); expect(seg(.4, .2, .6)).toBeCloseTo(.5, 6) })
})
