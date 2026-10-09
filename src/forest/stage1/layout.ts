// ═══ Этап 1 — раскладка под настоящее содержимое (чистые функции, без DOM) ═══
// В лаборатории размеры жёсткие (8 вопросов, 4 картинки, слово из 6 букв); в игре — что угодно.
// Здесь только геометрия «в пикселях кадра 1920×1080»; на лабораторных данных результат совпадает
// с прежними формулами экранов один в один (это проверяют тесты).

export type Size = { w: number; h: number }
export type Box = { x: number; y: number; w: number; h: number }
/** Запасной размер картинки, пока она не загрузилась или если загрузка не удалась. */
export const FALLBACK_SIZE: Size = { w: 4, h: 3 }

/** Картинки в ряд, ОДНОЙ высоты (равная важность), пропорции свои; по центру `cx`.
 *  Та же формула, что у «Трёх попыток» в лаборатории: высота снижается шагом 4, пока ряд не влезет. */
export function fitRow(sizes: Size[], top: number, maxH: number, cx: number, maxW: number, gap = 50): Box[] {
  const ims = sizes.map(s => (s.w > 0 && s.h > 0 ? s : FALLBACK_SIZE))
  if (!ims.length) return []
  let h = maxH
  const total = (hh: number) => ims.reduce((a, im) => a + im.w * hh / im.h, 0) + gap * (ims.length - 1)
  while (total(h) > maxW && h > 8) h -= 4
  let x = cx - total(h) / 2
  return ims.map(im => { const w = Math.round(im.w * h / im.h), r = { x: Math.round(x), y: top, w, h }; x += w + gap; return r })
}

/** Клетка слова «Трёх попыток»: центр, буква, плоский индекс (без пробелов — как revealLetterOpen). */
export type Cell = { x: number; y: number; ch: string; flat: number }
export type WordLayout = { cells: Cell[]; d: number; gap: number; rows: number; minX: number; maxX: number; bottom: number }

/** Спилы с буквами: одна строка по центру `cx`; между словами — промежуток пошире. Не влезает в `maxW` —
 *  спилы мельчают (не меньше `minD`), а если и так не влезает — слова переносятся на вторую строку.
 *  Одно слово из 6 букв при d=116/gap=24 даёт ровно лабораторную раскладку. */
export function wordCells(groups: string[][], cx: number, cy: number, maxW: number, d0 = 116, gap0 = 24, minD = 56): WordLayout {
  const gs = groups.filter(g => g.length)
  const empty = { cells: [], d: d0, gap: gap0, rows: 0, minX: cx, maxX: cx, bottom: cy }
  if (!gs.length) return empty
  const width = (row: string[][], d: number, gap: number) => {
    const n = row.reduce((a, g) => a + g.length, 0)
    return n * d + (n - 1) * gap + (row.length - 1) * gap * 1.5
  }
  const place = (rows: string[][][], d: number, gap: number): WordLayout => {
    const cells: Cell[] = []
    let flat = 0
    const rowH = d + Math.round(gap * 0.9)
    rows.forEach((row, ri) => {
      const y = cy + (ri - (rows.length - 1) / 2) * rowH
      let x = cx - width(row, d, gap) / 2 + d / 2
      row.forEach((g, gi) => {
        if (gi) x += gap * 1.5
        g.forEach(ch => { cells.push({ x, y, ch, flat: flat++ }); x += d + gap })
      })
    })
    const xs = cells.map(c => c.x)
    return { cells, d, gap, rows: rows.length, minX: Math.min(...xs) - d / 2, maxX: Math.max(...xs) + d / 2, bottom: cells[cells.length - 1].y + d / 2 }
  }
  // одна строка: уменьшаем спилы до minD
  const w1 = width(gs, d0, gap0)
  if (w1 <= maxW) return place([gs], d0, gap0)
  const k1 = maxW / w1
  if (d0 * k1 >= minD) return place([gs], Math.floor(d0 * k1), Math.max(8, Math.floor(gap0 * k1)))
  // две строки: слова делятся так, чтобы строки были как можно ровнее; одно длинное слово — пополам по буквам
  let split: string[][][]
  if (gs.length === 1) { const g = gs[0], m = Math.ceil(g.length / 2); split = [[g.slice(0, m)], [g.slice(m)]] }
  else {
    let best = 1, bestW = Infinity
    for (let i = 1; i < gs.length; i++) { const w = Math.max(width(gs.slice(0, i), d0, gap0), width(gs.slice(i), d0, gap0)); if (w < bestW) { bestW = w; best = i } }
    split = [gs.slice(0, best), gs.slice(best)]
  }
  const w2 = Math.max(...split.map(r => width(r, d0, gap0)))
  const k2 = Math.min(1, maxW / w2)
  return place(split, Math.max(36, Math.floor(d0 * k2)), Math.max(6, Math.floor(gap0 * k2)))
}

/** «120 секунд»: вопросы в две колонки (левая — первая половина, по порядку), строк — по большей колонке. */
export function sprintColumns<T>(qs: T[]): { cols: [T[], T[]]; rows: number } {
  const half = Math.ceil(qs.length / 2)
  return { cols: [qs.slice(0, half), qs.slice(half)], rows: Math.max(1, half) }
}
