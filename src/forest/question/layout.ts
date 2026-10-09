// ═══ Вопрос Леса: раскладка по настоящему содержимому ═══
// Утверждённые композиции (утверждённый Концепт C) собираются не по «номеру состояния», а по тому, что реально лежит в вопросе:
// сколько картинок и какой они пропорции, есть ли варианты, как длинен текст. Геометрия ветвей, рам, лиан и цветов — те же числа,
// что у утверждённых экранов; меняется только то, что зависит от содержимого: размер и число строк текста, число цветов-вариантов,
// высота картинок под текст. Чистая функция: ширину строк ей даёт `measure` (в игре — по настоящему шрифту, в тестах — оценка).
import { groundY } from '../paint'

export type Pt = { x: number; y: number }
export type Rect = { x: number; y: number; w: number; h: number }
export type Img = { src: string; w: number; h: number; caption?: string }
export type Opt = { key: string; text: string }
export type Flower = { x: number; y: number; r: number }
export type Layout = {
  strands: { pts: Pt[]; w: number }[]; frames: { r: Rect; img: Img }[]; vines: [Pt, Pt][]
  flowers: Flower[]; opts: Opt[]; label: number; labelW: number; labelSize: number
  q: { text: string; left: number; top: number; width: number; size: number; align: 'center' | 'left' } | null
  markers: { key: string; x: number; y: number; frame: number }[]
  cells: { word: string; open: number[]; cx: number; cy: number; d: number; gap: number } | null
  phase: { text: string; x: number; y: number } | null
  dand: Pt; ans: { x: number; y: number; w: number; align: 'center' | 'left' } | null
}
export type QInput = {
  text: string; options: Opt[]; images: Img[]
  /** «3 попытки» (ранний вариант в Scene): слово в клетках */
  word?: { word: string; open: number[]; phase: number }
  /** правильный ответ открытого вопроса (подпись «Ответ: …» при показе ответа) */
  answerText?: string
}
export type Measure = (text: string, size: number) => number

/** оценка ширины текста, когда настоящего шрифта нет (тесты) */
export const approxMeasure: Measure = (t, s) => t.length * s * 0.5
const LINE = 1.18

/** жадный перенос по словам: сколько строк займёт текст при данном кегле и ширине */
export function wrapCount(text: string, width: number, size: number, m: Measure): number {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return 0
  const sp = m(' ', size) * 0.9 + size * 0.26 // запас: слова в сцене стоят с margin .26em
  let lines = 1, cur = 0
  for (const w of words) {
    const wl = m(w, size)
    if (cur > 0 && cur + sp + wl > width) { lines++; cur = wl } else cur += (cur > 0 ? sp : 0) + wl
  }
  return lines
}
/** самый крупный кегль из [min..max], при котором текст влезает в maxLines строк (иначе — min) */
export function fitText(text: string, width: number, maxLines: number, max: number, min: number, m: Measure): { size: number; lines: number } {
  for (let s = max; s >= min; s -= 2) { const l = wrapCount(text, width, s, m); if (l <= maxLines) return { size: s, lines: l } }
  return { size: min, lines: wrapCount(text, width, min, m) }
}
const textH = (size: number, lines: number) => Math.round(size * LINE * Math.max(1, lines))

const byH = (img: Img, h: number) => Math.round(img.w * h / img.h)
const fit = (img: Img, cx: number, cy: number, mw: number, mh: number): Rect => {
  const k = Math.min(mw / img.w, mh / img.h), w = Math.round(img.w * k), h = Math.round(img.h * k)
  return { x: Math.round(cx - w / 2), y: Math.round(cy - h / 2), w, h }
}
/** Ряд картинок одной высоты (равная важность), по центру cx, с промежутком gap; если ряд шире maxW — высота уменьшается. */
function row(imgs: Img[], h: number, cx: number, y: number, gap: number, maxW = 1780): Rect[] {
  const wsAt = (hh: number) => imgs.map(i => byH(i, hh)), tot = (hh: number) => wsAt(hh).reduce((a, b) => a + b, 0) + gap * (imgs.length - 1)
  let hh = h; while (tot(hh) > maxW && hh > 120) hh -= 4
  const ws = wsAt(hh); let x = Math.round(cx - tot(hh) / 2)
  return ws.map(w => { const r = { x, y: y + Math.round((h - hh) / 2), w, h: hh }; x += w + gap; return r })
}
const G = (x: number) => ({ x, y: groundY(x) + 6 })
export const DAND_TEXT = { x: 236, y: 610 }   // утверждённый экран текста — место прежнее
export const DAND_MEDIA = { x: 206, y: 800 }  // экраны с фото — нижний левый угол, верх экрана отдан фото
const bough = (y: number, x0: number, x1: number): Pt[] => [{ x: x0, y: y + 34 }, { x: x0 + (x1 - x0) * 0.18, y: y + 6 }, { x: x0 + (x1 - x0) * 0.42, y }, { x: x0 + (x1 - x0) * 0.66, y: y + 4 }, { x: x0 + (x1 - x0) * 0.86, y: y + 12 }, { x: x1, y: y + 26 }]
const hang = (r: Rect, from: number): [Pt, Pt][] => [r.x + r.w * 0.2, r.x + r.w * 0.8].map(x => [{ x, y: from }, { x, y: r.y - 10 }] as [Pt, Pt])
/** Опоры от земли к нижним углам кадра — для одиночного большого фото. */
const props = (r: Rect): { pts: Pt[]; w: number }[] => [
  { pts: [G(r.x - 70), { x: r.x - 64, y: (r.y + r.h + groundY(r.x)) / 2 + 20 }, { x: r.x - 30, y: r.y + r.h - 10 }, { x: r.x - 12, y: r.y + r.h * 0.55 }], w: 18 },
  { pts: [G(r.x + r.w + 70), { x: r.x + r.w + 64, y: (r.y + r.h + groundY(r.x + r.w)) / 2 + 20 }, { x: r.x + r.w + 30, y: r.y + r.h - 10 }, { x: r.x + r.w + 12, y: r.y + r.h * 0.55 }], w: 18 },
]
const base: Layout = { strands: [], frames: [], vines: [], flowers: [], opts: [], label: 0, labelW: 280, labelSize: 36, q: null, markers: [], cells: null, phase: null, dand: DAND_MEDIA, ans: null }
/** Цветы-варианты в ряд: до 4 — как у утверждённых экранов (шаг `sp4`), больше — теснее; подпись сужается вместе с шагом. */
function flowerRow(n: number, cx: number, y: number, r: number, sp4: number): { flowers: Flower[]; labelW: number; labelSize: number } {
  const sp = n <= 4 ? sp4 : Math.max(150, Math.min(sp4, 1500 / n))
  const flowers = Array.from({ length: n }, (_, i) => ({ x: Math.round(cx + (i - (n - 1) / 2) * sp), y, r }))
  return { flowers, labelW: Math.min(n <= 4 ? 280 : 256, Math.round(sp - 14)), labelSize: n <= 4 ? 36 : n <= 6 ? 32 : 28 }
}
const letters = (imgs: Rect[], keys: string[]) => imgs.map((r, i) => ({ key: keys[i] ?? '', x: r.x - 40, y: r.y + r.h / 2, frame: i }))

const KEYS = 'АБВГДЕЖЗИК'

export function layoutFor(inp: QInput, m: Measure = approxMeasure): Layout {
  const { text, options: opts, images: imgs } = inp
  const n = Math.min(imgs.length, 4), hasOpts = opts.length > 0
  const L = (l: Partial<Layout>): Layout => ({ ...base, opts, ...l })
  if (inp.word) {
    const rs = row(imgs.slice(0, 2), 560, 1060, 58, 56)
    return L({ opts: [], vines: rs.flatMap(r => hang(r, -10)), frames: rs.map((r, i) => ({ r, img: imgs[i] })),
      cells: { word: inp.word.word, open: inp.word.open, cx: 1060, cy: 788, d: 112, gap: 22 }, phase: { text: `Фаза ${inp.word.phase} из 3`, x: 1060, y: 660 } })
  }
  if (n === 0) {
    // текст и цветы-варианты
    const t = fitText(text, 1060, 5, 60, 36, m), fl = flowerRow(opts.length, 1140, 716, 74, 270)
    return L({ dand: DAND_TEXT, labelW: fl.labelW, labelSize: fl.labelSize,
      strands: [{ pts: [G(548), { x: 506, y: 760 }, { x: 532, y: 520 }, { x: 630, y: 330 }, { x: 790, y: 212 }, { x: 990, y: 158 }, { x: 1210, y: 150 }], w: 30 },
        { pts: [G(1748), { x: 1788, y: 760 }, { x: 1764, y: 520 }, { x: 1676, y: 330 }, { x: 1526, y: 214 }, { x: 1326, y: 160 }, { x: 1100, y: 154 }], w: 30 }],
      flowers: fl.flowers, label: 806, q: { text, left: 620, top: Math.max(260, 330 - Math.round(textH(t.size, t.lines) / 2) + 90), width: 1060, size: t.size, align: 'center' } })
  }
  if (n === 1) {
    const im = imgs[0]
    if (hasOpts) {
      const t = fitText(text, 1300, 2, 48, 32, m), top = 32, tb = top + textH(t.size, t.lines) + 22
      const r = fit(im, 1090, 408 + Math.round((tb - 111) / 2), 1000, Math.min(600, 740 - tb))
      const fl = flowerRow(opts.length, 1090, 790, 50, 260)
      return L({ strands: props(r), frames: [{ r, img: im }], flowers: fl.flowers, labelW: fl.labelW, labelSize: fl.labelSize, label: 852, q: { text, left: 440, top, width: 1300, size: t.size, align: 'center' } })
    }
    if (im.h > im.w * 1.1) {
      const t = fitText(text, 680, 7, 52, 30, m), r = fit(im, 750, 540, 660, 860)
      return L({ strands: [{ pts: bough(70, 260, 1180), w: 16 }], vines: hang(r, 76), frames: [{ r, img: im }],
        q: { text, left: 1150, top: Math.max(200, 520 - Math.round(textH(t.size, t.lines) / 2)), width: 680, size: t.size, align: 'left' }, ans: { x: 1150, y: 660, w: 680, align: 'left' } })
    }
    const wide = fitText(text, 1300, 2, 50, 34, m)
    if (wrapCount(text, 1300, 50, m) <= 2) {
      const r = fit(im, 1080, 524, 1260, 812)
      return L({ strands: props(r), frames: [{ r, img: im }], q: { text, left: 440, top: 34, width: 1300, size: wide.size, align: 'center' }, ans: { x: 1080, y: r.y + r.h + 8, w: 900, align: 'center' } })
    }
    // длинный вопрос с широкой картинкой: фото слева, текст столбцом справа
    const t = fitText(text, 520, 12, 40, 26, m), r = fit(im, 840, 540, 900, 700)
    return L({ strands: [{ pts: bough(190, 260, 1330), w: 16 }], vines: hang(r, 196), frames: [{ r, img: im }],
      q: { text, left: 1340, top: Math.max(120, 520 - Math.round(textH(t.size, t.lines) / 2)), width: 520, size: t.size, align: 'left' }, ans: { x: 1340, y: 700, w: 520, align: 'left' } })
  }
  if (n === 2) {
    // два фото одной высоты — равная важность; вопрос сверху, цветы-варианты снизу
    const one = fitText(text, 1440, 1, 48, 40, m)
    const t = wrapCount(text, 1440, one.size, m) <= 1 ? one : fitText(text, 1440, 3, 40, 30, m)
    const lines = Math.max(1, t.lines), top = lines === 1 ? 30 : 26
    const imgY = lines === 1 ? 112 : Math.max(200, top + textH(t.size, lines) + 32), imgH = lines === 1 ? 548 : 670 - imgY
    const rs = row(imgs.slice(0, 2), imgH, 1060, imgY, 48)
    const fl = flowerRow(opts.length, 1100, lines === 1 ? 752 : 748, 52, 360)
    return L({ strands: [{ pts: bough(imgY - 20, 280, 1860), w: 16 }], vines: rs.flatMap(r => hang(r, imgY - 14)), frames: rs.map((r, i) => ({ r, img: imgs[i] })),
      flowers: fl.flowers, labelW: fl.labelW, labelSize: fl.labelSize, label: lines === 1 ? 818 : 812, q: { text, left: 380, top, width: 1440, size: t.size, align: 'center' } })
  }
  if (n === 3) {
    // три фото одной высоты в ряд, промежутки шире — в них живут метки А/Б/В
    const t = fitText(text, 1440, 2, 48, 30, m), top = 40
    const y0 = Math.max(214, top + textH(t.size, t.lines) + 28), rs = row(imgs.slice(0, 3), Math.min(386, 640 - y0 + 60), 1004, y0, 78)
    return L({ opts: [], strands: [{ pts: bough(y0 - 46, 60, 1890), w: 16 }], vines: rs.flatMap(r => hang(r, y0 - 40)), frames: rs.map((r, i) => ({ r, img: imgs[i] })),
      markers: letters(rs, opts.length ? opts.map(o => o.key) : [...KEYS]), q: { text, left: 380, top, width: 1440, size: t.size, align: 'center' } })
  }
  // четыре фото: сетка 2×2, центральная лоза между столбцами держит рамы
  const t = fitText(text, 1500, 2, 44, 28, m), shift = t.lines > 1 ? 36 : 0
  const rs = imgs.slice(0, 4).map((im, i) => fit(im, i % 2 ? 1500 : 760, (i < 2 ? 322 : 780) + shift, 650, 432 - shift / 2))
  return L({ opts: [], strands: [{ pts: [G(1130), { x: 1122, y: 760 }, { x: 1136, y: 540 }, { x: 1126, y: 330 }, { x: 1132, y: 110 }], w: 18 }],
    frames: rs.map((r, i) => ({ r, img: imgs[i] })), markers: letters(rs, opts.length ? opts.map(o => o.key) : [...KEYS]), q: { text, left: 380, top: 26, width: 1500, size: t.size, align: 'center' } })
}
