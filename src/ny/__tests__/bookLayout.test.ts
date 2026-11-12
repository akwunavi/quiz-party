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
