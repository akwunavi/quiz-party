// ═══ «Книга»: выбор раскладки картинок по оценке (mediaLayout.ts) — тесты на ФАКТИЧЕСКУЮ геометрию ═══
import { describe, it, expect } from 'vitest'
import { chooseLayout, layoutCandidates, scoreCandidate, type LayoutInput } from '../book/adaptive/mediaLayout'

const W = 1420, H = 594, FOLD = 120
const base = (ratios: number[], extra: Partial<LayoutInput> = {}): LayoutInput =>
  ({ ratios, width: W, height: H, gap: 20, midGap: FOLD, spansFold: true, captionH: 0, unit: 1, ...extra })
const R = { h: 16 / 9, v: 9 / 16, sq: 1, c: 4 / 3 }

describe('AdaptiveMedia: chooseLayout (кандидаты + оценка)', () => {
  it('ориентиры получаются из оценки: 4 горизонтальных → 2×2, 4 вертикальных → ряд', () => {
    expect(chooseLayout(base([R.h, R.h, R.h, R.h]))!.name).toMatch(/^grid2x2/)
    expect(chooseLayout(base([R.v, R.v, R.v, R.v]))!.name).toBe('row4')
  })
  it('4 квадратных и 4 смешанных пропорции: любой победитель корректен — внутри контейнера, не на сгибе, пропорции точные', () => {
    for (const ratios of [[1, 1, 1, 1], [R.v, R.sq, R.h, R.c]]) {
      const c = chooseLayout(base(ratios, { captionH: 64 }))!
      expect(c.valid).toBe(true)
      c.placed.forEach((p, i) => {
        expect(p.photo.w / p.photo.h).toBeCloseTo(ratios[i], 5)
        expect(p.photo.x).toBeGreaterThanOrEqual(-0.5); expect(p.photo.x + p.photo.w).toBeLessThanOrEqual(W + 0.5)
        expect(p.photo.y + p.photo.h + 64).toBeLessThanOrEqual(H + 0.5)
        expect(p.photo.x < W / 2 + FOLD / 2 && p.photo.x + p.photo.w > W / 2 - FOLD / 2).toBe(false)
      })
    }
  })
  it('размеры ячеек бывают РАЗНЫМИ при точных пропорциях (выключной ряд: общая высота, разная ширина)', () => {
    const c = chooseLayout(base([R.v, R.sq, R.h, R.c]))!
    const ws = new Set(c.placed.map(p => Math.round(p.photo.w)))
    expect(ws.size).toBeGreaterThan(1)
  })
  it('детерминизм: одинаковый вход → тот же результат; тай-брейк при почти равных очках — порядок кандидатов', () => {
    const a = chooseLayout(base([R.sq, R.sq, R.sq, R.sq]))!, b = chooseLayout(base([R.sq, R.sq, R.sq, R.sq]))!
    expect(a.name).toBe(b.name); expect(a.score).toBe(b.score)
    const names = layoutCandidates(4, true).map(x => x.name)
    expect(names.indexOf(a.name)).toBe(Math.min(...a.all.filter(x => x.score >= a.score - 0.75 && x.valid).map(x => names.indexOf(x.name))))
  })
  it('гистерезис: прежний победитель остаётся, пока отстаёт меньше 3 очков', () => {
    const o = base([R.h, R.h, R.h, R.h]), best = chooseLayout(o)!
    const other = best.all.filter(x => x.valid && x.name !== best.name).sort((x, y) => y.score - x.score)[0]
    expect(chooseLayout({ ...o, prev: other.name })!.name).toBe(best.score - other.score <= 3 ? other.name : best.name)
    expect(chooseLayout({ ...o, prev: 'нет-такого' })!.name).toBe(best.name)
  })
  it('картинки не заходят на сгиб ни у одного кандидата; невалидный кандидат не побеждает', () => {
    for (const n of [2, 3, 4]) for (const c of layoutCandidates(n, true)) {
      const s = scoreCandidate(c, base(Array(n).fill(R.h)))
      if (s.valid) s.placed.forEach(p => expect(p.photo.x < W / 2 + FOLD / 2 && p.photo.x + p.photo.w > W / 2 - FOLD / 2).toBe(false))
    }
  })
  it('для 2 и 3 картинок — свои наборы кандидатов (3: «одна + две», не «три в ряд через сгиб»)', () => {
    expect(layoutCandidates(2, true).map(c => c.name)).toEqual(['pages-1|1'])
    expect(layoutCandidates(3, true).every(c => !c.name.startsWith('row3'))).toBe(true)
    expect(layoutCandidates(3, false).some(c => c.name === 'row3')).toBe(true)
    expect(chooseLayout(base([R.h, R.v, R.sq]))!.valid).toBe(true)
  })
  it('подписи: длинные подписи в узком ряду штрафуются, победитель выбирается с учётом читаемости', () => {
    const long = Array(4).fill(60)
    const withCaps = chooseLayout(base([R.v, R.v, R.v, R.v], { captionH: 64, captionLens: long, capFontPx: 28, markerW: 45 }))!
    const noCaps = chooseLayout(base([R.v, R.v, R.v, R.v], { captionH: 64, captionLens: Array(4).fill(0) }))!
    expect(noCaps.metrics.captionOk).toBe(1)
    expect(withCaps.metrics.captionOk).toBeGreaterThanOrEqual(chooseLayout(base([R.v, R.v, R.v, R.v], { captionH: 64, captionLens: long, capFontPx: 28, markerW: 45, prev: 'row4' }))!.metrics.captionOk - 1)
  })
  it('мусорные пропорции не ломают выбор; одна картинка — «single» по центру', () => {
    expect(chooseLayout(base([0, NaN, 1, -1]))!.valid).toBe(true)
    const one = chooseLayout({ ...base([3 / 4]), spansFold: false, midGap: 20 })!
    expect(one.name).toBe('single'); expect(one.placed[0].photo.h).toBeCloseTo(H, 3)
  })
})

import { roleRange, targetSize } from '../book/adaptive/fit'
describe('AdaptiveText: целевой кегль по иерархии и длине', () => {
  it('короткий вопрос не раздувается до 120u; кегль монотонно убывает с длиной; границы стабильны', () => {
    expect(targetSize('plain', 12)).toBeLessThan(100)
    let prev = Infinity
    for (let n = 0; n <= 500; n += 10) { const v = targetSize('plain', n); expect(v).toBeLessThanOrEqual(prev + 1e-9); prev = v }
    expect(targetSize('plain', 1000)).toBe(targetSize('plain', 340))
  })
  it('иерархия: на одной длине plain ≥ split ≥ above; диапазон масштабируется и не выше предела роли', () => {
    for (const n of [20, 80, 160, 280]) { expect(targetSize('plain', n)).toBeGreaterThanOrEqual(targetSize('split', n)); expect(targetSize('split', n)).toBeGreaterThanOrEqual(targetSize('above', n)) }
    const r = roleRange('plain', 2, 20); expect(r.max).toBe(targetSize('plain', 20) * 2); expect(r.min).toBe(56)
  })
})

import { chooseSingle, estLines, hashSeed } from '../book/adaptive/singleLayout'
describe('Одна картинка: chooseSingle (композиция по оценке)', () => {
  const base = (ratio: number, textLen: number, extra = {}) => ({ ratio, textLen, width: 1420, height: 764, midGap: 120, gap: 28, unit: 1, ...extra })
  it('широкая картинка + короткий вопрос → «центральная» (крупнее картинка), вертикальная → картинка на странице', () => {
    expect(chooseSingle(base(16 / 9, 40)).name).toBe('top-center')
    expect(chooseSingle(base(9 / 16, 12)).name).toMatch(/\|/)
  })
  it('левая страница не пустая: ни одна композиция не оставляет картинку мельче порога, кегль считается по длине', () => {
    for (const r of [9 / 16, 3 / 4, 1, 4 / 3, 16 / 9, 21 / 9]) for (const n of [8, 40, 120, 260]) {
      const c = chooseSingle(base(r, n))
      expect(c.metrics.imgShare).toBeGreaterThan(0.12)
      expect(c.fontEst).toBeGreaterThan(0)
      expect(c.image.w / c.image.h).toBeCloseTo(r, 5)
    }
  })
  it('картинка вне сгиба в боковых композициях; на сгибе — только в «центральной», и это помечено crossesFold', () => {
    for (const r of [9 / 16, 1, 16 / 9]) {
      const c = chooseSingle(base(r, 60))
      const onFold = c.image.x < 710 + 60 && c.image.x + c.image.w > 710 - 60
      expect(c.crossesFold).toBe(onFold)
      if (c.name !== 'top-center') expect(onFold).toBe(false)
    }
  })
  it('зеркало при равных очках зависит от seed, а не фиксировано; детерминизм; гистерезис', () => {
    const a = chooseSingle(base(9 / 16, 12, { seed: 0 })), b = chooseSingle(base(9 / 16, 12, { seed: 1 }))
    expect(new Set([a.name, b.name]).size).toBe(2)
    expect(chooseSingle(base(9 / 16, 12, { seed: 1 })).name).toBe(b.name)
    expect(chooseSingle(base(9 / 16, 12, { seed: 0, prev: 'image|text' })).name).toBe('image|text')
    expect(hashSeed('a')).toBe(hashSeed('a')); expect(estLines(100, 20, 500)).toBe(Math.ceil(100 * 0.52 * 20 / 500))
  })
})

import { diagnoseLayout, isWarn, type DiagInput } from '../book/adaptive/diagnostics'
import { bookRect, contentArea, decorZones } from '../book/adaptive/safeArea'
describe('BookLayoutDiagnostics: композиция (предупреждения) и декор', () => {
  const v = { w: 1920, h: 1080 }, content = contentArea(v), book = bookRect(v)
  const R = (x: number, y: number, w: number, h: number) => ({ x, y, w, h })
  const base = (): DiagInput => ({ viewport: v, content, book, texts: [], media: [], containers: [], mediaMayCrossFold: true, unit: 1, decor: decorZones(v), captions: [], mediaBoxes: [] })
  const codes = (d: DiagInput) => diagnoseLayout(d).map(i => i.code)
  it('мелкая картинка, дисбаланс площадей, неиспользуемая площадь, большая пустота — предупреждения (warn), не ошибки', () => {
    const d = base()
    d.media.push({ id: 'a', rect: R(300, 300, 60, 60), natural: { w: 1, h: 1 } }, { id: 'b', rect: R(500, 300, 600, 300), natural: { w: 2, h: 1 } })
    d.mediaBoxes = [{ id: 'media#0', rect: R(250, 200, 1420, 740) }]
    const is = diagnoseLayout(d)
    for (const c of ['small-photo', 'imbalance', 'unused-area', 'empty-area']) expect(is.some(i => i.code === c), c).toBe(true)
    expect(is.every(isWarn)).toBe(true)
  })
  it('хорошая раскладка не получает предупреждений: нет требования заполнять всё место', () => {
    const d = base()
    d.texts.push({ id: 't', fontPx: 50, minPx: 28, rect: R(400, 200, 1100, 100), overflow: false })
    d.media.push({ id: 'a', rect: R(300, 330, 500, 280), natural: { w: 16, h: 9 } }, { id: 'b', rect: R(1000, 330, 500, 280), natural: { w: 16, h: 9 } })
    d.mediaBoxes = [{ id: 'media#0', rect: R(250, 320, 1420, 600) }]
    expect(codes(d).filter(c => ['small-photo', 'imbalance'].includes(c))).toEqual([])
  })
  it('декор и подписи — ошибки: контент на гирлянде; подпись обрезана или мельче минимума', () => {
    const d = base()
    d.texts.push({ id: 't', fontPx: 50, minPx: 28, rect: R(800, 60, 300, 80), overflow: false })
    d.captions = [{ id: 'c0', fontPx: 12, minPx: 18, overflow: true }]
    const is = diagnoseLayout(d)
    expect(is.filter(i => i.code === 'decor').length).toBeGreaterThan(0)
    expect(is.filter(i => i.code === 'caption').length).toBe(2)
    expect(is.filter(i => i.code === 'decor' || i.code === 'caption').every(i => i.severity === 'error')).toBe(true)
  })
  it('таймер с фиксированной пропорцией ассета: ожидаемое w/h из data-art-ratio, слот остаётся квадратом', () => {
    const d = base()
    d.timer = { slot: R(1550, 60, 120, 120), art: R(1550, 60, 126, 120), artRatio: 1.05 }
    expect(codes(d)).not.toContain('timer-shape')
    d.timer = { slot: R(1550, 60, 120, 120), art: R(1550, 60, 140, 120), artRatio: 1.05 }
    expect(codes(d)).toContain('timer-shape')
  })
})
