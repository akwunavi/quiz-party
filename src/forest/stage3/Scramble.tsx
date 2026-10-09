// ═══ Этап 3 · «Скрэмбл» — утверждённое направление «Семена над поляной»: разметка и перелёты (общие для лаборатории и игры) ═══
// Механика (AnagramRound.tsx + lib/anagram.ts): определение (текст вопроса) сверху, буквы фразы
// перемешаны на плитках, под ними — пустые клетки слов. Пока идёт таймер, подсказки открываются по
// одной каждые N секунд (первая буква не подсказывается никогда, минимум две остаются закрытыми):
// плитка подсказки сама перелетает в свою клетку. На показе ответа перелетают все плитки.
// Перемешивание, порядок подсказок — те же функции, что в игре (lib/anagram.ts).
// Образ: буквы — семена одуванчика, парящие над поляной; клетки — чашечки на грядке внизу. В пустой
// чашечке — пунктирный контур семени («сюда опустится семя»); подсказка и ответ опускают семя в
// чашечку, и из неё распускается цветок. Слова — отдельные грядки с травяной полосой.
// Здесь только РИСУНОК по данным (буквы, какие сели, какие — подсказки) и куски таймлайна; кто и когда их
// запускает — у вызывающих: в игре src/forest/stage3/ScrambleGame.tsx, в лаборатории src/labs/forest/scrambleLab.tsx.
import type { ReactNode, RefObject } from 'react'
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import type { AnagramTemplate } from '../../lib/anagram'
import { head, Timer } from './common3'

type P = { x: number; y: number }
export type ScrLay = { cell: number; tile: number; slot: P[]; home: P[]; rowY: number[]; bed: { x0: number; x1: number; y: number }[]; words: { x0: number; x1: number; y: number }[] }
const CX = 1100, AVAIL = 1400, GAP = 10, WGAP = 58
const jit = (p: number, k: number) => Math.sin(p * 12.9898 + k * 78.233) * 0.5 // детерминированный «разброс» без случайности

/** Раскладка: клетки слов (грядки) и «дом» каждой плитки. Утверждённый кадр — до двух строк грядок и клетка ≥ 56;
 *  длинные фразы из настоящих паков ужимают клетку до 40 и при нужде занимают третью строку. */
export function scrLayout(template: AnagramTemplate, order: number[]): ScrLay {
  const words = template.words.map(w => w.filter(c => c.kind === 'letter') as { kind: 'letter'; idx: number }[]).filter(w => w.length)
  const N = template.letters.length
  const wid = (n: number, c: number) => n * (c + GAP) - GAP
  const wrap = (c: number) => { // жадно по словам: строки, в которые слова влезают по ширине
    const rows: number[][] = [[]]; let w = 0
    words.forEach((wd, i) => { const ww = wid(wd.length, c); const add = rows[rows.length - 1].length ? WGAP + ww : ww
      if (w + add > AVAIL && rows[rows.length - 1].length) { rows.push([i]); w = ww } else { rows[rows.length - 1].push(i); w += add } })
    return rows
  }
  // строка не шире области (одно длинное слово целиком в строке тоже должно поместиться)
  const fits = (r: number[][], c: number) => r.every(ids => ids.reduce((a, i) => a + wid(words[i].length, c), 0) + WGAP * (ids.length - 1) <= AVAIL)
  let cell = 56, rows = wrap(56), found = false
  for (let c = 92; c >= 40; c -= 2) { const r = wrap(c); if (!fits(r, c)) continue; if (r.length === 1 && c >= 70) { cell = c; rows = r; found = true; break } if (r.length <= 2) { cell = c; rows = r; found = true; break } }
  if (!found) { cell = 40; rows = wrap(40) }
  const rowY = rows.length === 1 ? [880] : rows.length === 2 ? [782, 930] : rows.map((_, i) => 760 + i * Math.min(cell + 30, 280 / (rows.length - 1)))
  const slot: P[] = [], bed: ScrLay['bed'] = [], wordsB: ScrLay['words'] = []
  rows.forEach((ids, ri) => {
    const tw = ids.reduce((a, i) => a + wid(words[i].length, cell), 0) + WGAP * (ids.length - 1)
    let x = CX - tw / 2
    ids.forEach(i => { const x0 = x
      words[i].forEach(c => { slot[c.idx] = { x: x + cell / 2, y: rowY[ri] }; x += cell + GAP })
      x -= GAP; wordsB.push({ x0: x0 - 14, x1: x + 14, y: rowY[ri] + cell * 0.46 }); x += WGAP })
    bed.push({ x0: CX - tw / 2 - 34, x1: CX - tw / 2 + tw + 34, y: rowY[ri] + cell * 0.46 })
  })
  const tile = N > 18 ? 84 : 96
  const hr = N <= 9 ? 1 : N <= 18 ? 2 : 3
  const cols = Math.ceil(N / hr), pitch = Math.min(190, 1400 / cols)
  const ys = hr === 1 ? [460] : hr === 2 ? [400, 590] : [370, 500, 630]
  const home = order.map((_, p) => { const r = Math.floor(p / cols), c = p % cols, inRow = Math.min(cols, N - r * cols)
    return { x: CX + (c - (inRow - 1) / 2) * pitch + jit(p, 1) * pitch * 0.2 + (r % 2 ? pitch * 0.18 : 0), y: ys[r] + jit(p, 2) * 44 } })
  return { cell, tile: rows.length > 2 ? Math.min(tile, 84) : tile, slot, home, rowY, bed, words: wordsB }
}

/** Где встаёт строка «угадали …»: под грядками (утверждено); если не помещается — на освободившееся место плиток */
export function scrResultTop(Ly: ScrLay, lines: number) {
  const below = Ly.rowY[Ly.rowY.length - 1] + Ly.cell / 2 + 36
  return below + lines * 52 <= 1070 ? below : 330
}

type Q = (s: string) => Element[]
/** Вход в кадр: «question» — семена взлетают с земли, чашечки раскрываются; иначе (ответ уже открыт) — спокойно */
export function scrEnterTl(tl: gsap.core.Timeline, q: Q, live: boolean) {
  if (live) {
    tl.fromTo(q('.scA-cup'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'back.out(2)', transformOrigin: '50% 100%' }, 0.2)
      .fromTo(q('.scA-bedline'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2)
      .fromTo(q('.s3-tile'), { y: 260, opacity: 0, rotation: -30 }, { y: 0, opacity: 1, duration: 1.2, stagger: { each: 0.05, from: 'random' }, ease: 'power2.out' }, 0.3)
      .fromTo(q('.s3-cell'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.02 }, 0.5)
  } else tl.fromTo(q('.s3-cell'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0).fromTo(q('.scA-bedline'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
  tl.fromTo(q('.s3-clue .w'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.5)' }, 0.2)
}
/** перелёт плитки буквы `i` в её клетку: одна плавная дуга (подъём — спуск), без «петель» */
export function scrFly(tl: gsap.core.Timeline, q: Q, Ly: ScrLay, order: number[], i: number, at: number, dur: number) {
  const k = Ly.cell / Ly.tile
  const p = order.indexOf(i), el = q(`.s3-tile[data-p="${p}"]`)[0]; if (!el) return
  const h = Ly.home[p], s = Ly.slot[i], dx = s.x - h.x, dy = s.y - h.y
  tl.fromTo(el, { x: 0, y: 0, rotation: 0, scale: 1 }, { keyframes: [{ x: dx * 0.5, y: dy * 0.5 - 80, rotation: dx > 0 ? 10 : -10, duration: dur * 0.55, ease: 'sine.inOut' }, { x: dx, y: dy, rotation: 0, scale: k, duration: dur * 0.45, ease: 'power2.out' }] }, at)
  tl.fromTo(q(`.s3-cell[data-i="${i}"]`), { '--lit': 0 }, { '--lit': 1, duration: 0.3 }, at + dur * 0.9)
}
/** подсказка: семя вспыхивает и перелетает в свою чашечку */
export function scrHintTl(tl: gsap.core.Timeline, q: Q, Ly: ScrLay, order: number[], i: number, glintAt: number, flyAt: number) {
  tl.fromTo(q(`.s3-tile[data-p="${order.indexOf(i)}"] .scA-glint`), { opacity: 0 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: 1 }, glintAt)
  scrFly(tl, q, Ly, order, i, flyAt, 1.2)
}
/** показ ответа: семена собираются, по очереди (в порядке слова) планируют на места, чашечки распускаются, по грядке бежит
 *  золотой побег, потом — «угадали». Возвращает момент конца. */
export function scrRevealTl(tl: gsap.core.Timeline, q: Q, Ly: ScrLay, order: number[], flying: number[], N: number) {
  // летят только эти семена (в игре — даже если React ещё не успел пометить прежние севшими)
  const els = flying.map(i => q(`.s3-tile[data-p="${order.indexOf(i)}"]`)[0]).filter(Boolean)
  tl.to(els.map(e => e.querySelector('.scA-fluff')).filter(Boolean), { opacity: 1, duration: 0.4 }, 0.1)
    .to(els, { y: -16, duration: 0.5, ease: 'sine.out' }, 0.1) // «собраться»: семена замирают и чуть приподнимаются
  const step = N > 18 ? 0.14 : 0.2
  flying.forEach((i, j) => { const at = 0.9 + j * step; tl.set(q(`.s3-tile[data-p="${order.indexOf(i)}"]`), { y: 0 }, at - 0.001); scrFly(tl, q, Ly, order, i, at, 1.0) })
  const end = 0.9 + flying.length * step + 1.0
  tl.fromTo(q('.scA-petal'), { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.025, ease: 'back.out(2)', transformOrigin: '50% 100%' }, end - 0.5)
    .fromTo(q('.scA-wv'), { strokeDashoffset: 1600 }, { strokeDashoffset: 0, duration: 1.0, ease: 'power1.inOut' }, end)
    .fromTo(q('.s3-result > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, end + 0.7)
  return end + 0.7 + 0.45
}

export function ScrambleScene({ title, qn, qcount, qExtra, clue, Ly, letters, order, landed, hinted, fin, n, total, cls, timeUp, result, resTop, rootRef, side }: {
  title: string; qn: number; qcount: number; qExtra?: string
  clue: string
  Ly: ScrLay
  /** буквы фразы по порядку */
  letters: string[]
  /** order[p] — буква на плитке p */
  order: number[]
  /** буквы, чьи плитки уже стоят в клетках */
  landed: ReadonlySet<number>
  /** буквы-подсказки (янтарные) */
  hinted: ReadonlySet<number>
  /** показан ответ: чашечки распускаются цветами */
  fin: boolean
  n: number | null; total: number
  /** дополнительные классы корня (состояние) */
  cls: string
  timeUp: boolean
  /** содержимое строки результата (угадали / балл получает / никто не угадал); null — строки нет */
  result: ReactNode | null
  resTop?: number
  rootRef: RefObject<HTMLDivElement>
  side?: ReactNode
}) {
  const L = letters
  const rects: Rect[] = [{ x: 300, y: 100, w: 1480, h: 900 }]
  const warn = n != null && n > 0 && n <= 10, zero = n === 0
  const top = resTop ?? Ly.rowY[Ly.rowY.length - 1] + Ly.cell / 2 + 36
  const clueCls = clue.length > 200 ? ' xl' : clue.length > 120 ? ' lg' : ''
  return (
    <S1Screen rects={rects} n={n} rootRef={rootRef} cls={`s3 sc scA ${cls}${fin ? ' fin' : ''}${warn ? ' warn' : ''}${zero ? ' zero' : ''}`}>
      {head(title, qn, qcount, qExtra)}
      {clue ? <div className={`s3-clue sc-clueA${clueCls}`}>{clue.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</div> : null}
      {side}
      <svg className="scA-bed" viewBox="0 0 1920 1080" aria-hidden>
        {Ly.bed.map((b, i) => <path key={i} className="scA-bedline" d={`M ${b.x0} ${b.y} C ${b.x0 + 200} ${b.y - 12} ${(b.x0 + b.x1) / 2} ${b.y + 10} ${b.x1 - 200} ${b.y - 8} S ${b.x1} ${b.y + 4} ${b.x1} ${b.y}`} />)}
        {Ly.words.map((w, i) => <path key={i} className="scA-wv" d={`M ${w.x0} ${w.y + 6} L ${w.x1} ${w.y + 6}`} />)}
      </svg>
      {L.map((_, i) => {
        const s = Ly.slot[i]
        return <div key={i} className="s3-cell sc-cellA" data-i={i} style={{ left: s.x - Ly.cell / 2, top: s.y - Ly.cell / 2, width: Ly.cell, height: Ly.cell, ...(fin || landed.has(i) ? { ['--lit' as string]: 1 } : null) }}>
          <CupA />
          {!landed.has(i) && <i className="scA-ghost" />}
          <PetalsA hidden={!fin} />
        </div>
      })}
      {order.map((li, p) => {
        const isL = landed.has(li), h = isL ? Ly.slot[li] : Ly.home[p], sz = isL ? Ly.cell : Ly.tile
        return <div key={p} className={`s3-tile sc-tileA${hinted.has(li) ? ' hint' : ''}${isL ? ' landed' : ''}`} data-p={p} style={{ left: h.x - sz / 2, top: h.y - sz / 2, width: sz, height: sz, ['--ph' as string]: `${(p * 0.37) % 2.4}s` }}>
          <svg className="scA-fluff" viewBox="-50 -90 100 100" aria-hidden>{Array.from({ length: 11 }, (_, k) => { const a = (-160 + k * 14) * Math.PI / 180; return <line key={k} x1="0" y1="-30" x2={Math.cos(a) * 46} y2={-30 + Math.sin(a) * 46} /> })}<line x1="0" y1="-30" x2="0" y2="-8" /></svg>
          <b>{L[li]}</b><i className="scA-glint" />
        </div>
      })}
      {timeUp && <div className="scA-time">Время вышло</div>}
      {result != null && <div className="s3-result sc-resA" style={{ top }}>{result}</div>}
      <Timer n={n} total={total} />
    </S1Screen>
  )
}

function CupA() {
  return <svg className="scA-cup" viewBox="-50 -10 100 110" aria-hidden>
    <path className="stem" d="M 0 60 C 4 80 -4 92 0 110" />
    <path className="sep" d="M -46 6 C -40 40 -20 58 0 60 C 20 58 40 40 46 6 C 30 22 14 26 0 26 C -14 26 -30 22 -46 6 Z" />
    <path className="sep2" d="M -46 6 C -34 14 -24 2 -14 14 C -6 2 6 2 14 14 C 24 2 34 14 46 6" />
  </svg>
}
function PetalsA({ hidden }: { hidden: boolean }) {
  return <svg className="scA-bloom" viewBox="-70 -70 140 140" aria-hidden>{Array.from({ length: 8 }, (_, k) => <g key={k} transform={`rotate(${k * 45})`}><ellipse className="scA-petal" cx="0" cy="-46" rx="13" ry="24" style={hidden ? { transform: 'scale(0)' } : undefined} /></g>)}</svg>
}
