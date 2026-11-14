// ═══ Одна картинка + вопрос: ВЫБОР композиции по оценке — ЧИСТАЯ функция (доработка адаптивности, ADAPTIVE.md) ═══
// Кандидаты: «текст на левой странице | картинка на правой», зеркальный вариант и «центральная композиция» — вопрос полосой сверху
// (может идти через сгиб), картинка крупно под ним по центру (картинка тогда лежит на сгибе: поверх неё рисуется мягкая тень сгиба).
// Выбор — по длине вопроса, пропорции картинки и ФАКТИЧЕСКИМ площадям: размер картинки, кегль текста относительно целевого,
// заполнение разворота. Длина строк оценивается моделью «знаков в строке»; точный кегль потом подбирает useFitText по DOM.
import { containBox, type Box } from './mediaPlan'
import { targetSize, TEXT_ROLES } from './fit'

export type SingleName = 'text|image' | 'image|text' | 'top-center'
export interface SingleInput {
  /** пропорция картинки (w/h) */
  ratio: number
  /** знаков в вопросе */
  textLen: number
  /** вся контентная область (px): обе страницы + сгиб */
  width: number
  height: number
  /** ширина зоны сгиба между страницами (px) */
  midGap: number
  /** зазор между текстом и картинкой по вертикали в «центральной» композиции */
  gap: number
  /** «пиксель мокапа» */
  unit: number
  /** число для детерминированного тай-брейка (зеркальный порядок при равных очках), напр. хеш id вопроса */
  seed?: number
  prev?: SingleName | null
}
export interface SingleScored {
  name: SingleName
  score: number
  /** области (px, относительно контента) */
  text: Box
  image: Box
  /** оценка кегля текста по модели строк (px) — ориентир, итог даёт useFitText */
  fontEst: number
  /** картинка лежит на сгибе */
  crossesFold: boolean
  metrics: { imgShare: number; textRatio: number; fill: number }
}
export interface SingleChoice extends SingleScored { all: { name: SingleName; score: number }[] }

const AVG_CH = 0.52     // средняя ширина знака, em (жирный serif, кириллица)
const LH = 1.16         // интерлиньяж
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/** Сколько строк займёт текст при кегле f в ширине w. */
export const estLines = (len: number, f: number, w: number) => Math.max(1, Math.ceil(len * AVG_CH * f / Math.max(1, w)))

/** Наибольший кегль ≤ target, при котором текст из len знаков влезает в w×h (оценка); не ниже min. */
export function estFont(len: number, w: number, h: number, target: number, min: number): number {
  for (let f = target; f > min; f -= 0.5) if (estLines(len, f, w) * LH * f <= h) return f
  return min
}

export function scoreSingle(name: SingleName, o: SingleInput): SingleScored {
  const { width: W, height: H, unit: u } = o
  const page = Math.max(0, (W - o.midGap) / 2)
  const splitT = targetSize('split', o.textLen) * u, topT = targetSize('above', o.textLen) * u
  let text: Box, image: Box, fontEst: number, target: number, crosses = false
  if (name === 'top-center') {
    const lineW = Math.min(W, 1240 * u)
    target = topT
    fontEst = estFont(o.textLen, lineW, 0.34 * H, target, TEXT_ROLES.above.min * u)
    const th = estLines(o.textLen, fontEst, lineW) * LH * fontEst
    text = { x: (W - lineW) / 2, y: 0, w: lineW, h: th }
    const b = containBox(o.ratio, W, Math.max(0, H - th - o.gap))
    image = { x: (W - b.w) / 2, y: th + o.gap + (H - th - o.gap - b.h) / 2, w: b.w, h: b.h }
    crosses = image.x < W / 2 + o.midGap / 2 && image.x + image.w > W / 2 - o.midGap / 2
  } else {
    target = splitT
    fontEst = estFont(o.textLen, page, H, target, TEXT_ROLES.split.min * u)
    const th = estLines(o.textLen, fontEst, page) * LH * fontEst
    const b = containBox(o.ratio, page, H)
    const left = name === 'text|image'
    text = { x: left ? 0 : page + o.midGap, y: (H - th) / 2, w: page, h: th }
    image = { x: left ? page + o.midGap + (page - b.w) / 2 : (page - b.w) / 2, y: (H - b.h) / 2, w: b.w, h: b.h }
  }
  const region = Math.max(1, W * H)
  const imgShare = image.w * image.h / region, textRatio = fontEst / Math.max(1, target)
  const fill = (image.w * image.h + text.w * text.h) / region
  const sizeS = clamp01(imgShare / 0.45), textS = clamp01(textRatio / 0.8), fillS = clamp01(fill / 0.55)
  // легкий штраф за картинку на сгибе: выбирается только когда выигрыш в размере заметный
  const score = 100 * (0.42 * sizeS + 0.28 * textS + 0.30 * fillS) - (crosses ? 6 : 0)
  return { name, score, text, image, fontEst, crossesFold: crosses, metrics: { imgShare, textRatio, fill } }
}

const EPS = 0.75
export function chooseSingle(o: SingleInput): SingleChoice {
  const odd = ((o.seed ?? 0) % 2) === 1
  const order: SingleName[] = odd ? ['image|text', 'text|image', 'top-center'] : ['text|image', 'image|text', 'top-center']
  const scored = order.map(n => scoreSingle(n, o))
  let best = scored[0]
  for (const s of scored) if (s.score > best.score + EPS) best = s
  if (o.prev) { const p = scored.find(s => s.name === o.prev); if (p && p.score >= best.score - 3) best = p }
  return { ...best, all: scored.map(s => ({ name: s.name, score: Math.round(s.score * 10) / 10 })) }
}

/** Детерминированный хеш строки (для seed). */
export function hashSeed(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h) }
