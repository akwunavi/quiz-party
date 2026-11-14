// ═══ «Книга»: адаптивная раскладка — подбор кегля, сетка по пропорциям, безопасная область, диагностика (ADAPTIVE.md) ═══
// Тесты проверяют ФАКТИЧЕСКУЮ геометрию (числа), а не «собралось».
import { describe, it, expect } from 'vitest'
import { fitFontSize, roleRange, TEXT_ROLES } from '../book/adaptive/fit'
import { BALANCE_MAX, containBox, gridShape, planMedia } from '../book/adaptive/mediaPlan'
import { FOLD_GAP, bookRect, bookUnit, contentArea, crossesFold, inside, overlapArea, pageAreas, timerZone } from '../book/adaptive/safeArea'
import { diagnoseLayout, type DiagInput } from '../book/adaptive/diagnostics'

describe('AdaptiveText: fitFontSize', () => {
  // модель: текст из N знаков шириной 0.5em, высота строки 1.2em, область W×H
  const model = (chars: number, W: number, H: number) => (px: number) => {
    const perLine = Math.max(1, Math.floor(W / (px * 0.5)))
    return Math.ceil(chars / perLine) * px * 1.2 <= H
  }
  it('короткий текст — максимум диапазона (крупно), длинный — меньше, по реальной площади, а не по числу знаков', () => {
    const r = { min: 20, max: 100 }
    expect(fitFontSize(r, model(30, 1200, 700)).size).toBe(100)
    const long = fitFontSize(r, model(700, 1200, 700)).size
    expect(long).toBeLessThan(100); expect(long).toBeGreaterThan(20)
    // те же 700 знаков в большей области — крупнее (зависит от площади)
    expect(fitFontSize(r, model(700, 1200, 1000)).size).toBeGreaterThan(long)
  })
  it('результат — наибольший помещающийся кегль (шаг 0.5) и монотонность по размеру области', () => {
    const f = model(300, 900, 500), res = fitFontSize({ min: 16, max: 90 }, f)
    expect(f(res.size)).toBe(true); expect(f(res.size + 1)).toBe(false)
    expect(res.overflow).toBe(false)
    let prev = 0
    for (const H of [200, 300, 400, 600, 800]) { const s = fitFontSize({ min: 10, max: 120 }, model(400, 900, H)).size; expect(s).toBeGreaterThanOrEqual(prev); prev = s }
  })
  it('не помещается на минимуме — размер = min и overflow=true (текст не режем)', () => {
    const res = fitFontSize({ min: 30, max: 80 }, model(5000, 600, 300))
    expect(res).toMatchObject({ size: 30, overflow: true })
  })
  it('замеров немного (бинарный поиск), диапазон из пикселей мокапа масштабируется по --u', () => {
    expect(fitFontSize({ min: 10, max: 200 }, model(500, 1000, 600)).steps).toBeLessThanOrEqual(12)
    expect(roleRange('plain', 0.5)).toEqual({ min: TEXT_ROLES.plain.min * 0.5, max: TEXT_ROLES.plain.max * 0.5 })
  })
})

describe('AdaptiveMedia: planMedia', () => {
  const RATIOS4 = [1, 9 / 16, 21 / 9, 3 / 2]   // 1:1, 9:16, 21:9, PNG
  it('containBox сохраняет пропорцию и не выходит за область', () => {
    for (const r of [0.3, 0.5625, 1, 1.5, 2.333, 4]) for (const [w, h] of [[300, 300], [650, 287], [100, 600]]) {
      const b = containBox(r, w, h)
      expect(b.w).toBeLessThanOrEqual(w + 1e-9); expect(b.h).toBeLessThanOrEqual(h + 1e-9)
      expect(b.w / b.h).toBeCloseTo(r, 6)
    }
  })
  it('сетка: 1 — одна ячейка, 2 — в ряд, 3 — три в ряд, 4 — 2×2', () => {
    expect([1, 2, 3, 4].map(gridShape)).toEqual([{ cols: 1, rows: 1 }, { cols: 2, rows: 1 }, { cols: 3, rows: 1 }, { cols: 2, rows: 2 }])
  })
  it('4 картинки разных пропорций: одинаковые ячейки, пропорции точные, ничто не пересекается, колонки разведены на сгиб', () => {
    const W = 1420, H = 590, fold = FOLD_GAP
    const p = planMedia({ ratios: RATIOS4, width: W, height: H, gap: 20, colGap: fold })
    expect(p).toHaveLength(4)
    for (const a of p) { expect(a.cell.w).toBeCloseTo(p[0].cell.w, 6); expect(a.cell.h).toBeCloseTo(p[0].cell.h, 6) }
    p.forEach((a, i) => { expect(a.photo.w / a.photo.h).toBeCloseTo(RATIOS4[i], 6) })
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
      const A = p[i].photo, B = p[j].photo
      const w = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x), h = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y)
      expect(w > 0 && h > 0).toBe(false)
    }
    // левая колонка целиком левее сгиба, правая — правее: зазор между колонками = ширина зоны сгиба
    const left = p[0].cell, right = p[1].cell
    expect(right.x - (left.x + left.w)).toBeCloseTo(fold, 6)
    // все фото внутри контейнера
    for (const a of p) { expect(a.photo.x).toBeGreaterThanOrEqual(-1e-9); expect(a.photo.x + a.photo.w).toBeLessThanOrEqual(W + 1e-9); expect(a.photo.y + a.photo.h).toBeLessThanOrEqual(H + 1e-9) }
  })
  it('баланс веса: площадь картинок отличается не больше чем в BALANCE_MAX раз, пропорции и ячейки целы', () => {
    const p = planMedia({ ratios: RATIOS4, width: 1420, height: 590, gap: 20, colGap: FOLD_GAP })
    const A = p.map(a => a.photo.w * a.photo.h)
    expect(Math.max(...A) / Math.min(...A)).toBeLessThanOrEqual(BALANCE_MAX + 1e-6)
    p.forEach((a, i) => { expect(a.photo.w / a.photo.h).toBeCloseTo(RATIOS4[i], 6); expect(a.photo.w).toBeLessThanOrEqual(a.cell.w + 1e-9); expect(a.photo.h).toBeLessThanOrEqual(a.cell.h + 1e-9) })
    const free = planMedia({ ratios: RATIOS4, width: 1420, height: 590, gap: 20, colGap: FOLD_GAP, balance: false })
    expect(Math.max(...free.map(a => a.photo.w * a.photo.h)) / Math.min(...free.map(a => a.photo.w * a.photo.h))).toBeGreaterThan(BALANCE_MAX)
  })
  it('подписи 4 картинок — на одном уровне, под картинкой, картинки прижаты к этой линии', () => {
    const p = planMedia({ ratios: RATIOS4, width: 1420, height: 590, gap: 20, colGap: FOLD_GAP, captionH: 56 })
    for (const row of [[0, 1], [2, 3]]) {
      const ys = row.map(i => p[i].caption!.y); expect(ys[0]).toBeCloseTo(ys[1], 6)
      for (const i of row) expect(p[i].photo.y + p[i].photo.h).toBeCloseTo(p[i].caption!.y, 6)
    }
    for (const a of p) expect(a.caption!.h).toBe(56)
  })
  it('одно вертикальное изображение: по центру ячейки, влезает по высоте', () => {
    const [a] = planMedia({ ratios: [3 / 4], width: 650, height: 764, gap: 0 })
    expect(a.photo.h).toBeLessThanOrEqual(764); expect(a.photo.w / a.photo.h).toBeCloseTo(0.75, 6)
    expect(a.photo.x + a.photo.w / 2).toBeCloseTo(325, 6)
  })
  it('мусорные пропорции (0, NaN) не ломают раскладку', () => {
    expect(planMedia({ ratios: [0, NaN], width: 600, height: 300, gap: 10 }).every(a => a.photo.w > 0 && a.photo.h > 0)).toBe(true)
  })
})

describe('BookSafeArea', () => {
  const VPS = [{ w: 1920, h: 1080 }, { w: 1899, h: 905 }, { w: 1366, h: 768 }, { w: 1280, h: 720 }]
  it('контентная область лежит на страницах, ниже шапки, не заходит на сгиб; страницы симметричны вокруг сгиба', () => {
    for (const v of VPS) {
      const c = contentArea(v), b = bookRect(v), u = bookUnit(v)
      expect(inside(c, b, 0.5)).toBe(true)
      expect(c.y).toBeGreaterThan(b.y + 120 * u)                    // ниже служебной полосы
      const { left, right } = pageAreas(v)
      expect(crossesFold(left, v)).toBe(false); expect(crossesFold(right, v)).toBe(false)
      expect(right.x - (left.x + left.w)).toBeCloseTo(FOLD_GAP * u, 6)
      expect(left.w).toBeCloseTo(right.w, 6)
    }
  })
  it('зона таймера — квадрат внутри книги и не пересекает контентную область', () => {
    for (const v of VPS) {
      const t = timerZone(v)
      expect(t.w).toBeCloseTo(t.h, 6); expect(inside(t, bookRect(v), 0.5)).toBe(true)
      expect(overlapArea(t, contentArea(v))).toBe(0)
    }
  })
  it('1899×905: книга целиком и масштаб = 905/1080', () => {
    const v = { w: 1899, h: 905 }; expect(bookUnit(v)).toBeCloseTo(905 / 1080, 9)
    const b = bookRect(v); expect(b.y).toBeGreaterThanOrEqual(0); expect(b.y + b.h).toBeLessThanOrEqual(905)
  })
})

describe('BookLayoutDiagnostics: diagnoseLayout', () => {
  const v = { w: 1920, h: 1080 }, content = contentArea(v), book = bookRect(v)
  const base = (): DiagInput => ({ viewport: v, content, book, texts: [], media: [], containers: [], mediaMayCrossFold: true })
  const R = (x: number, y: number, w: number, h: number) => ({ x, y, w, h })
  it('чистая раскладка — без замечаний', () => {
    const d = base()
    d.texts.push({ id: 't', fontPx: 60, minPx: 28, rect: R(content.x + 10, content.y + 10, 500, 120), overflow: false })
    d.media.push({ id: 'm', rect: R(content.x + 10, content.y + 200, 300, 400), natural: { w: 900, h: 1200 } })
    d.timer = { slot: R(1550, 50, 120, 120), art: R(1550, 50, 120, 120) }; d.qnum = R(250, 80, 300, 40)
    expect(diagnoseLayout(d)).toEqual([])
  })
  it('ловит: overflow, кегль < минимума, вне безопасной области, пересечение, искажение, деформацию таймера, сгиб', () => {
    const d = base(); d.mediaMayCrossFold = false
    d.containers.push({ id: 'frame', scrollW: 500, clientW: 500, scrollH: 700, clientH: 400 })
    d.texts.push({ id: 't', fontPx: 12, minPx: 28, rect: R(content.x - 50, content.y, 500, 120), overflow: true })
    d.media.push({ id: 'm1', rect: R(content.x + 10, content.y + 100, 300, 300), natural: { w: 900, h: 1200 } })   // 1:1 вместо 3:4
    d.media.push({ id: 'm2', rect: R(900, content.y + 500, 120, 100), natural: { w: 120, h: 100 } })                // на сгибе (центр 960)
    d.timer = { slot: R(1550, 50, 120, 100), art: R(1550, 50, 120, 100) }
    const codes = new Set(diagnoseLayout(d).map(i => i.code))
    for (const c of ['overflow', 'font-min', 'outside-safe', 'overlap', 'distortion', 'timer-shape', 'fold']) expect(codes.has(c as never), c).toBe(true)
  })
})
