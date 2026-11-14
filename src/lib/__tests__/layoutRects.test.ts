import { describe, expect, it } from 'vitest'
import { FOLD, WORK, clampRect, fallbackRects, keepOffFold, layoutStatus, mergeServiceKeepLayout, rectToScene, sceneToRect, screenLayout, validateRects, withScreenLayout, type Rects } from '../layoutRects'

const imgs = ['a.jpg', 'b.jpg']
const good: Rects = { v: 1, imgs, text: { x: .05, y: .02, w: .9, h: .3 }, images: [{ x: .05, y: .4, w: .4, h: .5 }, { x: .55, y: .4, w: .4, h: .5 }] }

describe('layoutRects: проверка', () => {
  it('корректная раскладка проходит', () => { expect(validateRects(good, imgs)).toEqual(good) })
  it('не объект / null / другая версия → авто', () => {
    for (const bad of [null, undefined, 5, 'x', [], { ...good, v: 2 }, { ...good, v: '1' }]) expect(validateRects(bad, imgs)).toBeNull()
  })
  it('число картинок или их список изменился → авто', () => {
    expect(validateRects(good, ['a.jpg'])).toBeNull()
    expect(validateRects(good, ['b.jpg', 'a.jpg'])).toBeNull()
    expect(validateRects(good, ['a.jpg', 'b.jpg', 'c.jpg'])).toBeNull()
  })
  it('NaN, строки, нулевой размер → авто', () => {
    expect(validateRects({ ...good, text: { x: NaN, y: 0, w: .5, h: .5 } }, imgs)).toBeNull()
    expect(validateRects({ ...good, images: [{ x: 0, y: 0, w: 0, h: .2 }, good.images[1]] }, imgs)).toBeNull()
    expect(validateRects({ ...good, images: [{ x: '0', y: 0, w: .2, h: .2 }, good.images[1]] }, imgs)).toBeNull()
  })
  it('выход за рабочую область — кламп в 0…1', () => {
    const r = validateRects({ ...good, text: { x: -.5, y: .9, w: 2, h: .5 } }, imgs)!
    expect(r.text).toEqual({ x: 0, y: .5, w: 1, h: .5 })
  })
  it('пустая раскладка (ни текста, ни картинок) — авто', () => {
    expect(validateRects({ v: 1, imgs: [], images: [] }, [])).toBeNull()
  })
  it('картинка не лежит на сгибе, текст — может', () => {
    const r = validateRects({ ...good, text: { x: .1, y: .1, w: .8, h: .2 }, images: [{ x: .4, y: .4, w: .3, h: .3 }, good.images[1]] }, imgs)!
    const im = r.images[0]
    expect(im.x + im.w <= FOLD.from + 1e-9 || im.x >= FOLD.to - 1e-9).toBe(true)
    expect(r.text).toEqual({ x: .1, y: .1, w: .8, h: .2 })
  })
  it('clampRect: минимум стороны', () => { expect(clampRect({ x: .5, y: .5, w: 0, h: 0 }).w).toBeGreaterThan(0.05) })
  it('keepOffFold не трогает уже допустимые', () => { const r = { x: .05, y: .1, w: .3, h: .3 }; expect(keepOffFold(r)).toEqual(r) })
})

describe('layoutRects: service', () => {
  const svc = { word1: 'а', layout: { question: good } }
  it('screenLayout / layoutStatus', () => {
    expect(screenLayout(svc, 'question', imgs)).toEqual(good)
    expect(screenLayout(svc, 'answer', imgs)).toBeNull()
    expect(layoutStatus(svc, 'question', imgs)).toBe('manual')
    expect(layoutStatus(svc, 'question', ['x.jpg', 'y.jpg'])).toBe('stale')
    expect(layoutStatus(svc, 'answer', imgs)).toBe('auto')
    expect(layoutStatus({}, 'question', imgs)).toBe('auto')
    expect(layoutStatus(null, 'question', imgs)).toBe('auto')
  })
  it('withScreenLayout: точечно, другие ключи и экран целы; сброс последнего удаляет layout целиком', () => {
    const s1 = withScreenLayout(svc, 'answer', good)
    expect(s1.word1).toBe('а'); expect((s1.layout as { question: Rects }).question).toEqual(good)
    const s2 = withScreenLayout(s1, 'question', null)
    expect(Object.keys(s2.layout as object)).toEqual(['answer'])
    const s3 = withScreenLayout(s2, 'answer', null)
    expect('layout' in s3).toBe(false); expect(s3.word1).toBe('а')
  })
  it('withScreenLayout не мутирует исходный объект и переживает мусор', () => {
    const src = { layout: { question: good } }; const copy = JSON.stringify(src)
    withScreenLayout(src, 'question', null); expect(JSON.stringify(src)).toBe(copy)
    expect(withScreenLayout(null, 'question', good).layout).toEqual({ question: good })
    expect(withScreenLayout([1, 2], 'question', null)).toEqual({})
  })
  it('mergeServiceKeepLayout: форма со старым layout не затирает свежий', () => {
    const stale = { word1: 'новое', layout: { question: { ...good, text: { x: 0, y: 0, w: .1, h: .1 } } } }
    const fresh = { word1: 'старое', layout: { question: good } }
    const m = mergeServiceKeepLayout(stale, fresh)
    expect(m.word1).toBe('новое'); expect((m.layout as { question: Rects }).question).toEqual(good)
  })
  it('mergeServiceKeepLayout: в свежей версии нет layout — в итоге его тоже нет (сброс не «воскресает»)', () => {
    expect('layout' in mergeServiceKeepLayout({ layout: { question: good } }, { word1: 'x' })).toBe(false)
  })
})

describe('layoutRects: геометрия', () => {
  it('сцена ⇄ доли взаимно обратны', () => {
    const r = { x: .2, y: .3, w: .4, h: .25 }
    const back = sceneToRect(rectToScene(r))
    for (const k of ['x', 'y', 'w', 'h'] as const) expect(back[k]).toBeCloseTo(r[k], 9)
  })
  it('рабочая область: между полями декора, ниже служебной полосы', () => { expect(WORK.x).toBe(250); expect(WORK.y).toBe(208); expect(WORK.w).toBe(1420) })
  it('fallbackRects валиден для 0–4 картинок и даёт раскладку, проходящую проверку', () => {
    for (let n = 0; n <= 4; n++) for (const t of [true, false]) {
      if (!n && !t) continue
      const list = Array.from({ length: n }, (_, i) => `p${i}.jpg`)
      expect(validateRects(fallbackRects(list, t), list)).not.toBeNull()
    }
  })
})

import { layoutUnsupportedReason } from '../layoutRects'
describe('layoutUnsupportedReason', () => {
  const free = { answer: { mode: 'free_text' }, media: {} }
  it('поддерживается: любая тема кроме Леса, обычная механика, свободный ответ', () => { expect(layoutUnsupportedReason('ny_book', 'standard', free)).toBeNull() })
  it('другие темы, механики и режимы — причина текстом', () => {
    expect(layoutUnsupportedReason('enchanted_forest', 'standard', free)).toMatch(/лес/)
    expect(layoutUnsupportedReason('classic', 'standard', free)).toBeNull()
    expect(layoutUnsupportedReason('ny_book', 'melody', free)).toMatch(/механики/)
    expect(layoutUnsupportedReason('ny_book', 'standard', { answer: { mode: 'choice' }, media: {} })).toMatch(/вариантами/)
    expect(layoutUnsupportedReason('ny_book', 'standard', { answer: { mode: 'free_text' }, media: { hidden: true } })).toMatch(/скрыто/)
  })
})

describe('защита буфера формы и видео', () => {
  it('видео вопроса — ручная раскладка не поддерживается (общее условие для редактора и проектора)', () => {
    expect(layoutUnsupportedReason('classic', 'standard', { answer: { mode: 'free_text' }, media: { question: ['a.mp4'] } })).toMatch(/видео/)
    expect(layoutUnsupportedReason('classic', 'standard', { answer: { mode: 'free_text' }, media: { question: ['a.jpg'] } })).toBeNull()
  })
  it('сохранение компоновки при несохранённой форме: поля формы живы, layout — свежий', () => {
    const lay = { question: good }
    const m = mergeServiceKeepLayout({ word1: 'правка в форме' }, { word1: 'старое', layout: lay })
    expect(m.word1).toBe('правка в форме'); expect(m.layout).toEqual(lay)
  })
})
