import { describe, it, expect } from 'vitest'
import gold from './gold-layouts.json'
import { layoutFor, type QInput } from '../layout'
import { IMG, MC, IMG1, PORT, TWO, THREE, FOUR, LONG, LONG2, SIX } from '../../content'

// Раскладка по содержимому обязана совпадать с утверждёнными экранами Лаборатории (геометрия кадров, цветов, ветвей)
const I = (...k: (keyof typeof IMG)[]) => k.map(x => IMG[x])
const CASES: Record<string, QInput> = {
  mc: { text: MC.text, options: MC.options, images: [] },
  img1opt: { text: IMG1.text, options: IMG1.options, images: I('palace') },
  img1open: { text: IMG1.text, options: [], images: I('palace') },
  port: { text: PORT.text, options: [], images: I('collins') },
  two: { text: TWO.text, options: TWO.options, images: I('falcon', 'hubble') },
  three: { text: THREE.text, options: [], images: I('coffee', 'hubble', 'dahlia'), markers: ['А', 'Б', 'В'] },
  four: { text: FOUR.text, options: [], images: I('collins', 'falcon', 'hubble', 'palace'), markers: ['А', 'Б', 'В', 'Г'] },
  long: { text: LONG.text, options: [], images: I('palace') },
  long2: { text: LONG2.text, options: TWO.options, images: I('falcon', 'hubble') },
  six: { text: '', options: [], images: I('falcon', 'collins'), word: SIX },
}
const rect = (r: { x: number; y: number; w: number; h: number }) => [r.x, r.y, r.w, r.h]
describe('layoutFor ≈ утверждённые экраны', () => {
  for (const [id, inp] of Object.entries(CASES)) {
    it(id, () => {
      const g = (gold as any)[id], l = layoutFor(inp)
      expect(l.frames.map(f => rect(f.r))).toEqual(g.frames.map((f: any) => rect(f.r)))
      expect(l.flowers.length).toBe(g.flowers.length)
      l.flowers.forEach((f, i) => { expect(Math.abs(f.x - g.flowers[i].x)).toBeLessThanOrEqual(1); expect(f.y).toBe(g.flowers[i].y); expect(f.r).toBe(g.flowers[i].r) })
      expect(l.strands.length).toBe(g.strands.length)
      expect(l.markers.length).toBe(g.markers.length)
      expect(!!l.q).toBe(!!g.q)
      if (l.q) expect(l.q.align).toBe(g.q.align)
    })
  }
})
describe('layoutFor — иное содержимое', () => {
  const img = IMG.palace
  it('6 вариантов умещаются в экран', () => {
    const l = layoutFor({ text: 'x', options: 'АБВГДЕ'.split('').map(k => ({ key: k, text: k })), images: [] })
    expect(l.flowers.length).toBe(6)
    for (const f of l.flowers) { expect(f.x - f.r).toBeGreaterThan(0); expect(f.x + f.r).toBeLessThan(1920) }
  })
  it('фото всегда внутри кадра 1920×1080', () => {
    for (const n of [1, 2, 3, 4]) for (const txt of ['Коротко?', 'Очень '.repeat(60)]) {
      const l = layoutFor({ text: txt, options: [], images: Array(n).fill(img) })
      for (const f of l.frames) { expect(f.r.x).toBeGreaterThanOrEqual(0); expect(f.r.x + f.r.w).toBeLessThanOrEqual(1920); expect(f.r.y + f.r.h).toBeLessThanOrEqual(1080) }
    }
  })
  it('без текста картинки крупные (ребус), без меток', () => {
    const l = layoutFor({ text: '', options: [], images: [img, img] })
    expect(l.markers.length).toBe(0)
    for (const f of l.frames) expect(f.r.h).toBeGreaterThan(450)
    const one = layoutFor({ text: '', options: [], images: [img] })
    expect(one.frames[0].r.w).toBeGreaterThan(1200)
    expect(one.frames[0].r.x).toBeGreaterThanOrEqual(380) // не под таймером слева
  })
  it('метки на картинках — только если переданы (варианты/пары)', () => {
    const imgs = [img, img, img]
    expect(layoutFor({ text: 'Что?', options: [], images: imgs }).markers.length).toBe(0)
    expect(layoutFor({ text: 'Что?', options: [], images: imgs, markers: ['А', 'Б', 'В'] }).markers.map(k => k.key)).toEqual(['А', 'Б', 'В'])
  })
  it('длинный текст без вариантов: крупно, внутри арки и строки ровные', () => {
    const t = 'Назовите точное название фильма по заголовкам рецензий на Кинопоиске 1. Самое сложное расследование в их карьере 2. Когда музыка умолкнет ты увидишь его сзади позади себя 3. Основано на реальном шарлатанстве'
    const l = layoutFor({ text: t, options: [], images: [] })
    expect(l.q!.size).toBeGreaterThanOrEqual(34)
    expect(l.q!.width).toBeLessThanOrEqual(1100)
    expect(l.q!.top).toBeGreaterThan(250)
  })
})
