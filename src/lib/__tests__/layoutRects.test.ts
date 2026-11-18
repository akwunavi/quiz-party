import { describe, expect, it } from 'vitest'
import { WORK, clampRect, fallbackRects, keepOffFold, layoutStatus, mergeServiceKeepLayout, rectToScene, sceneToRect, screenLayout, validateRects, withScreenLayout, type Rects } from '../layoutRects'

const imgs = ['a.jpg', 'b.jpg']
const good: Rects = { v: 2, imgs, text: { x: .05, y: .02, w: .9, h: .3 }, images: [{ x: .05, y: .4, w: .4, h: .5 }, { x: .55, y: .4, w: .4, h: .5 }] }

describe('layoutRects: проверка', () => {
  it('корректная раскладка проходит', () => { expect(validateRects(good, imgs)).toEqual(good) })
  it('не объект / null / другая версия → авто', () => {
    for (const bad of [null, undefined, 5, 'x', [], { ...good, v: 3 }, { ...good, v: '1' }, { ...good, v: 0 }]) expect(validateRects(bad, imgs)).toBeNull()
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
  it('v:2: картинка МОЖЕТ лежать на сгибе и поверх декора — рамки свободны (только в пределах экрана)', () => {
    const r = validateRects({ ...good, text: { x: .1, y: .1, w: .8, h: .2 }, images: [{ x: .4, y: .4, w: .3, h: .3 }, { x: .95, y: .95, w: .3, h: .3 }] }, imgs, 'ny_book')!
    expect(r.images[0]).toEqual({ x: .4, y: .4, w: .3, h: .3 })
    const e = r.images[1]; expect(e.x + e.w).toBeLessThanOrEqual(1 + 1e-9); expect(e.y + e.h).toBeLessThanOrEqual(1 + 1e-9)
  })
  it('clampRect: минимум стороны — разумный, но малый (свободный размер)', () => { const w = clampRect({ x: .5, y: .5, w: 0, h: 0 }).w; expect(w).toBeGreaterThan(0.02); expect(w).toBeLessThan(0.06) })
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

import { answerLayoutUnsupportedReason, fallbackAnswerRects, fallbackGridRects } from '../layoutRects'
describe('экран ответа и «3 попытки»', () => {
  const free = { answer: { mode: 'free_text' }, media: {} }
  it('ответ: поддержан свободный ответ обычной механики; Лес, варианты/порядок/пары, скрытое видео, чужие механики — нет', () => {
    expect(answerLayoutUnsupportedReason('classic', 'standard', free)).toBeNull()
    expect(answerLayoutUnsupportedReason('ny_book', 'four_pics', { answer: { mode: 'crossword_word' }, media: {} })).toBeNull()
    expect(answerLayoutUnsupportedReason('enchanted_forest', 'standard', free)).toMatch(/лес/)
    expect(answerLayoutUnsupportedReason('classic', 'standard', { answer: { mode: 'choice' }, media: {} })).toMatch(/вариант/)
    expect(answerLayoutUnsupportedReason('classic', 'standard', { answer: { mode: 'free_text' }, media: { hidden: true } })).toMatch(/видео/)
    expect(answerLayoutUnsupportedReason('classic', 'melody', free)).toMatch(/механики/)
  })
  it('«3 попытки» поддержаны для вопроса', () => { expect(layoutUnsupportedReason('classic', 'four_pics', { answer: { mode: 'crossword_word' }, media: {} })).toBeNull() })
  it('note: проходит проверку, битая note → авто; раскладка только из note допустима', () => {
    const r = { v: 2, imgs: [], note: { x: .1, y: .8, w: .5, h: .1 }, images: [] }
    expect(validateRects(r, [])?.note).toEqual({ x: .1, y: .8, w: .5, h: .1 })
    expect(validateRects({ ...r, note: { x: NaN, y: 0, w: .1, h: .1 } }, [])).toBeNull()
  })
  it('fallbackAnswerRects и fallbackGridRects проходят проверку для 0–4 картинок', () => {
    for (let n = 0; n <= 4; n++) { const l = Array.from({ length: n }, (_, i) => `p${i}.jpg`)
      expect(validateRects(fallbackAnswerRects(l, true), l)).not.toBeNull()
      if (n) expect(validateRects(fallbackGridRects(l), l)).not.toBeNull() }
  })
  it('layout.answer не мешает layout.question: withScreenLayout пишет экраны независимо', () => {
    const s1 = withScreenLayout({}, 'answer', toV2(fallbackAnswerRects(['a.jpg'], false), 'ny_book'))
    const s2 = withScreenLayout(s1, 'question', good)
    expect(Object.keys(s2.layout as object).sort()).toEqual(['answer', 'question'])
    expect(Object.keys(withScreenLayout(s2, 'answer', null).layout as object)).toEqual(['question'])
  })
})

import { imgKey, answerUsesSharedScreen } from '../layoutRects'
describe('ревью: утечка путей и делегирование ответа', () => {
  const a = ['secret/answer-1.jpg', 'secret/answer-2.jpg']
  it('layout.answer хранит хеши, не пути; layout.question — пути', () => {
    const r: Rects = { v: 2, imgs: a, images: [{ x: .1, y: .1, w: .3, h: .3 }, { x: .5, y: .1, w: .3, h: .3 }] }
    const s = withScreenLayout({}, 'answer', r); const stored = JSON.stringify(s)
    expect(stored).not.toContain('secret'); expect((s.layout as { answer: Rects }).answer.imgs).toEqual(a.map(imgKey))
    expect(JSON.stringify(withScreenLayout({}, 'question', r))).toContain('secret/answer-1.jpg')
  })
  it('валидация по хешам: число и порядок совпали — manual; изменился набор — авто/stale', () => {
    const s = withScreenLayout({}, 'answer', { v: 2, imgs: a, images: [{ x: .1, y: .1, w: .3, h: .3 }, { x: .5, y: .1, w: .3, h: .3 }] })
    expect(screenLayout(s, 'answer', a)).not.toBeNull()
    expect(layoutStatus(s, 'answer', [a[1], a[0]])).toBe('stale'); expect(layoutStatus(s, 'answer', [a[0]])).toBe('stale')
  })
  it('старый layout.answer с путями читается; любое следующее сохранение переписывает его без путей', () => {
    const old = { layout: { answer: { v: 1, imgs: a, images: [{ x: .1, y: .1, w: .3, h: .3 }, { x: .5, y: .1, w: .3, h: .3 }] }, question: undefined } }
    expect(screenLayout(old, 'answer', a)).not.toBeNull()
    expect(JSON.stringify(withScreenLayout(old, 'question', null))).not.toContain('secret')
  })
  it('AnswerScreen ведёт только РАСКРЫТЫЙ ответ; до раскрытия (в т.ч. anagram вне «Скрэмбла») — нет', () => {
    const q = { answer: { mode: 'anagram' }, media: {} }
    expect(answerUsesSharedScreen('classic', 'standard', q, false)).toBe(false)
    expect(answerUsesSharedScreen('classic', 'standard', { answer: { mode: 'free_text' }, media: {} }, true)).toBe(true)
    expect(answerUsesSharedScreen('classic', 'standard', { answer: { mode: 'free_text' }, media: {} }, false)).toBe(false)
  })
})


import { toV2, rectV1ToV2, layoutWarnings } from '../layoutRects'
import { workAreaFractions, sceneAreaCss, busyZones } from '../layoutArea'
describe('v:2 — доли всего экрана: чтение старых v:1, запись только v:2, предупреждения', () => {
  const v1 = { v: 1, imgs, text: { x: .05, y: .02, w: .9, h: .3 }, images: [{ x: .05, y: .4, w: .4, h: .5 }, { x: .55, y: .4, w: .4, h: .5 }] }
  it('v:1 читается и переводится в v:2 по рабочей области темы (Книга)', () => {
    const r = validateRects(v1, imgs, 'ny_book')!, a = workAreaFractions('ny_book')
    expect(r.v).toBe(2)
    expect(r.text!.x).toBeCloseTo(a.x + .05 * a.w, 9); expect(r.text!.w).toBeCloseTo(.9 * a.w, 9)
    expect(r.images[1].y).toBeCloseTo(a.y + .4 * a.h, 9); expect(r.images[1].h).toBeCloseTo(.5 * a.h, 9)
  })
  it('v:1 другой темы — по её области (окно: поля 4vw/17vh/11vh)', () => {
    const r = validateRects(v1, imgs, 'classic')!, a = workAreaFractions('classic')
    expect(a).toEqual({ x: .04, y: .17, w: .92, h: .72 })
    expect(r.images[0].x).toBeCloseTo(.04 + .05 * .92, 9)
  })
  it('угол рабочей области переходит в угол области на экране; весь v:1 остаётся в экране', () => {
    for (const th of ['ny_book', 'classic', 'potter', 'new_year', undefined]) {
      const a = workAreaFractions(th), tl = rectV1ToV2({ x: 0, y: 0, w: .1, h: .1 }, th), br = rectV1ToV2({ x: .9, y: .9, w: .1, h: .1 }, th)
      expect(tl.x).toBeCloseTo(a.x, 9); expect(tl.y).toBeCloseTo(a.y, 9)
      expect(br.x + br.w).toBeCloseTo(a.x + a.w, 9); expect(br.y + br.h).toBeCloseTo(a.y + a.h, 9)
      expect(a.x + a.w).toBeLessThanOrEqual(1); expect(a.y + a.h).toBeLessThanOrEqual(1)
    }
  })
  it('v:2 не пересчитывается; повторное чтение того, что записано, даёт то же', () => {
    const once = validateRects(v1, imgs, 'ny_book')!
    expect(validateRects(once, imgs, 'ny_book')).toEqual(once)
    expect(validateRects(JSON.parse(JSON.stringify(once)), imgs, 'classic')).toEqual(once)   // v:2 не зависит от темы чтения
  })
  it('запись: withScreenLayout пишет v:2; layout.answer — только хеши', () => {
    const s = withScreenLayout({}, 'answer', toV2({ ...v1, imgs: ['x/a.jpg', 'x/b.jpg'] } as never, 'ny_book'))
    const st = JSON.stringify(s); expect(st).toContain('"v":2'); expect(st).not.toContain('x/a.jpg')
  })
  it('битые/устаревшие v:2 → авто', () => {
    expect(validateRects({ ...good, images: [{ x: 0, y: 0, w: 0, h: 0 }, good.images[1]] }, imgs)).toBeNull()
    expect(validateRects({ ...good, imgs: ['q.jpg', 'b.jpg'] }, imgs)).toBeNull()
  })
  it('предупреждения о перекрытии: таймер/кнопки/сгиб/декор — мягкие, рамка остаётся валидной', () => {
    const over: Rects = { v: 2, imgs: [], text: { x: .3, y: 0.02, w: .4, h: .1 }, images: [] }
    expect(layoutWarnings(over, 'ny_book').join(' ')).toMatch(/таймер/)
    const fold: Rects = { v: 2, imgs: ['a'], images: [{ x: .45, y: .4, w: .1, h: .3 }] }
    expect(layoutWarnings(fold, 'ny_book').join(' ')).toMatch(/сгиб/)
    const btn: Rects = { v: 2, imgs: ['a'], images: [{ x: .8, y: .93, w: .2, h: .07 }] }
    expect(layoutWarnings(btn, 'classic').join(' ')).toMatch(/кнопки/)
    const clean: Rects = { v: 2, imgs: ['a'], images: [{ x: .1, y: .3, w: .3, h: .3 }] }
    expect(layoutWarnings(clean, 'ny_book')).toEqual([]); expect(layoutWarnings(clean, 'classic')).toEqual([])
    expect(validateRects(over, [], 'ny_book')).not.toBeNull()
  })
  it('экран раскладки: Книга — вся сцена, остальные — окно; Лес — нет', () => {
    expect(sceneAreaCss('ny_book')!.width).toContain('1920'); expect(sceneAreaCss('classic')).toEqual({ left: '0', top: '0', width: '100vw', height: '100vh' })
    expect(sceneAreaCss('enchanted_forest')).toBeNull()
    expect(busyZones('ny_book').some(z => z.id === 'fold')).toBe(true); expect(busyZones('classic').some(z => z.id === 'fold')).toBe(false)
  })
})
