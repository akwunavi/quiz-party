// ═══ Этап 3 · «Кроссворд» — три концепта ═══
// Механика: сетка — настоящий CrosswordGrid (генератор редактора, данные не меняем). В игре вопросы
// идут по одному: текст вопроса = определение, номер слова = номер вопроса; команды вписывают слово
// на телефоне; ответы — на разборе после раунда. Сейчас проектор показывает сетку только на титуле
// раунда — здесь предложено держать её на экране весь раунд (только показ, логика та же):
// активное слово подсвечено, на разборе слова вписываются по одному.
// A «Резная решётка» — клетки вырезаны в деревянной плите, буквы выжигаются.
// B «Корни-узлы» — клетки — узлы на сети корней; слово — это корень, который загорается.
// C «Кувшинки» — клетки — листья кувшинок на тёмной воде; у активного слова распускаются лилии.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { CW } from './data'
import { head, Timer, timer3 } from './common3'

export const CW_STATES = [
  { id: 'question', name: 'Вопрос: активное слово и определение' },
  { id: 'reveal', name: 'Разбор: два слова вписаны, третье вписывается' },
  { id: 'complete', name: 'Кроссворд разгадан' },
]
export const CW_VARIANTS = [
  { id: 'A', name: 'A · Резная решётка', note: 'Сетка вырезана в старой деревянной плите, подвешенной между деревьями; пустые места плиты поросли мхом. Клетки — светлое дерево, номера и буквы выжжены. Активное слово — клетки теплеют изнутри, по ним тянется золотой побег. На разборе буквы выжигаются по одной (вспыхивает уголёк). Определение — на дощечке справа.' },
  { id: 'B', name: 'B · Корни-узлы', note: 'Никакой плиты: клетки — круглые узлы, соединённые корнями ровно по линиям слов (видно, где слова пересекаются). Активное слово — его корень загорается светом, узлы раскрываются. На разборе свет бежит по корню, и буквы проступают в узлах одна за другой. Определение — на табличке, подвешенной на корне.' },
  { id: 'C', name: 'C · Кувшинки на воде', note: 'Сетка лежит на тёмной воде лесного пруда: клетки — листья кувшинок строго по сетке. Активное слово — на его листьях распускаются белые лилии, по воде идут круги. На разборе буквы всплывают из глубины. Определение — на большом листе у берега.' },
]

const G = CW.grid, CELL = 60, GX = 300, GY = 258
type Cell = { r: number; c: number; num?: number; words: number[] }
const CELLS: Cell[] = (() => {
  const m = new Map<string, Cell>()
  G.words.forEach((w, wi) => { for (let i = 0; i < w.word.length; i++) {
    const r = w.dir === 'down' ? w.row + i : w.row, c = w.dir === 'across' ? w.col + i : w.col, k = `${r},${c}`
    const cell = m.get(k) ?? { r, c, words: [] }; cell.words.push(wi); if (i === 0) cell.num = w.number; m.set(k, cell)
  } })
  return [...m.values()]
})()
const letterAt = (cell: Cell) => { const wi = cell.words[0], w = G.words[wi], i = w.dir === 'down' ? cell.r - w.row : cell.c - w.col; return w.word[i].toUpperCase() }
const cx = (c: number) => GX + c * CELL + CELL / 2, cy = (r: number) => GY + r * CELL + CELL / 2
const ACT = G.words[CW.active]
const inWord = (cell: Cell, wi: number) => cell.words.includes(wi)
const posIn = (cell: Cell, wi: number) => { const w = G.words[wi]; return w.dir === 'down' ? cell.r - w.row : cell.c - w.col }

export function Crossword({ variant, state, nOv, onReady }: S1Props) {
  const tm = timer3(state, CW.timer)
  const filled = (cell: Cell) => state === 'complete' || (state === 'reveal' && cell.words.some(w => CW.solvedBefore.includes(w) || w === CW.active))
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (state === 'question') {
      if (variant === 'A') tl.fromTo(q('.cwA-slab'), { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0)
      if (variant === 'B') tl.fromTo(q('.cwB-root'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.0, stagger: 0.08, ease: 'power2.out' }, 0)
      if (variant === 'C') tl.fromTo(q('.cwC-pond'), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out', transformOrigin: '50% 50%' }, 0)
      tl.fromTo(q('.cw-cell'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: { each: 0.012, from: 'center' }, ease: 'back.out(2)' }, 0.5)
        .fromTo(q('.cw-cell.act'), { '--act': 0 }, { '--act': 1, duration: 0.5, stagger: 0.06 }, 1.4)
        .fromTo(q('.cw-clue > *'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, 1.2)
      if (variant === 'A') tl.fromTo(q('.cwA-vine'), { strokeDashoffset: 800 }, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 1.5)
      if (variant === 'B') tl.fromTo(q('.cwB-root.act'), { '--act': 0 }, { '--act': 1, duration: 0.8 }, 1.4)
      if (variant === 'C') tl.fromTo(q('.cwC-lily'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(2)' }, 1.6)
    }
    if (state === 'reveal') {
      const order = CELLS.filter(c => inWord(c, CW.active)).sort((a, b) => posIn(a, CW.active) - posIn(b, CW.active))
      order.forEach((c, k) => {
        const el = q(`.cw-cell[data-k="${c.r},${c.c}"] .ch`), at = 0.6 + k * 0.22
        if (variant === 'A') tl.fromTo(el, { opacity: 0, color: '#ffcf6a', textShadow: '0 0 18px rgba(255,170,60,1)' }, { opacity: 1, color: '#3a1e08', textShadow: '0 0 0 rgba(255,170,60,0)', duration: 0.7 }, at)
        if (variant === 'B') tl.fromTo(el, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.2)' }, at)
        if (variant === 'C') tl.fromTo(el, { opacity: 0, y: 18, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }, at)
      })
      if (variant === 'B') tl.fromTo(q('.cwB-light'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 0.22 * ACT.word.length, ease: 'none' }, 0.5)
      if (variant === 'C') tl.fromTo(q('.cwC-ripple'), { scale: 0.3, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 1.0, stagger: 0.22, ease: 'power2.out', transformOrigin: '50% 50%' }, 0.6)
      tl.fromTo(q('.cw-clue .ans'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6 + ACT.word.length * 0.22)
    }
    if (state === 'complete') {
      tl.fromTo(q('.cw-cell .ch'), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: { each: 0.015, from: 'random' } }, 0.3)
        .fromTo(q('.cw-done'), { '--done': 0 }, { '--done': 1, duration: 1.2 }, 1.4)
        .fromTo(q('.cw-clue > *'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 1.6)
    }
  }, tm, [variant, state])
  const n = nOv ?? (tm ? nLive : null)
  const W = G.cols * CELL, H = G.rows * CELL
  const rects: Rect[] = [{ x: GX - 30, y: GY - 30, w: W + 60, h: H + 60 }, { x: 1230, y: 250, w: 610, h: 520 }]
  // корни B: по линиям слов, между центрами соседних клеток
  const wordLine = (wi: number) => { const w = G.words[wi], r1 = w.dir === 'down' ? w.row + w.word.length - 1 : w.row, c1 = w.dir === 'across' ? w.col + w.word.length - 1 : w.col; return `M ${cx(w.col)} ${cy(w.row)} L ${cx(c1)} ${cy(r1)}` }
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 cw cw${variant} st-${state}`}>
      {head(CW.title, ACT.number, CW.qcount)}
      {variant === 'A' && <div className="cwA-slab cw-done" style={{ left: GX - 34, top: GY - 34, width: W + 68, height: H + 68 }}><i className="rope l" /><i className="rope r" /></div>}
      {variant === 'C' && <svg className="cwC-pond cw-done" viewBox="0 0 1920 1080" aria-hidden><ellipse cx={GX + W / 2} cy={GY + H / 2} rx={W / 2 + 120} ry={H / 2 + 90} /></svg>}
      {variant === 'B' && <svg className="cwB-net cw-done" viewBox="0 0 1920 1080" aria-hidden>
        {G.words.map((_, wi) => <path key={wi} className={`cwB-root${wi === CW.active && state === 'question' ? ' act' : ''}`} d={wordLine(wi)} />)}
        <path className="cwB-light" d={wordLine(CW.active)} />
      </svg>}
      {variant === 'A' && state === 'question' && <svg className="cwA-vinesvg" viewBox="0 0 1920 1080" aria-hidden><path className="cwA-vine" d={ACT.dir === 'across'
        ? `M ${cx(ACT.col) - 26} ${cy(ACT.row) + 26} ${Array.from({ length: ACT.word.length }, (_, i) => `Q ${cx(ACT.col + i)} ${cy(ACT.row) + (i % 2 ? 40 : 14)} ${cx(ACT.col + i) + 30} ${cy(ACT.row) + 26}`).join(' ')}`
        : `M ${cx(ACT.col) + 26} ${cy(ACT.row) - 26} ${Array.from({ length: ACT.word.length }, (_, i) => `Q ${cx(ACT.col) + (i % 2 ? 40 : 14)} ${cy(ACT.row + i)} ${cx(ACT.col) + 26} ${cy(ACT.row + i) + 30}`).join(' ')}`} /></svg>}
      {CELLS.map(cell => {
        const act = inWord(cell, CW.active) && state === 'question'
        return <div key={`${cell.r},${cell.c}`} data-k={`${cell.r},${cell.c}`} className={`cw-cell cw-cell${variant}${act ? ' act' : ''}${filled(cell) ? ' on' : ''}${state === 'reveal' && inWord(cell, CW.active) ? ' now' : ''}`}
          style={{ left: GX + cell.c * CELL, top: GY + cell.r * CELL, width: CELL, height: CELL }}>
          {variant === 'C' && <svg className="cwC-pad" viewBox="-30 -30 60 60" aria-hidden><path d="M 0 0 L 27 -6 A 28 28 0 1 1 18 -21 Z" /></svg>}
          {variant === 'C' && act && <svg className="cwC-lily" viewBox="-30 -30 60 60" aria-hidden>{Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx="0" cy="-19" rx="5" ry="10" transform={`rotate(${k * 60 + 30})`} />)}</svg>}
          {variant === 'C' && state === 'reveal' && inWord(cell, CW.active) && <i className="cwC-ripple" />}
          {cell.num && <span className="num">{cell.num}</span>}
          {filled(cell) && <span className="ch">{letterAt(cell)}</span>}
        </div>
      })}
      <div className={`cw-clue cw-clue${variant}`}>
        {variant === 'B' && <i className="cord" />}
        {state === 'complete' ? <>
          <span className="tag">кроссворд разгадан</span><b className="big">{G.words.length} слов</b><span className="sub">ответы и баллы — в разборе раунда</span>
        </> : <>
          <span className="tag">{ACT.number} · {ACT.dir === 'across' ? 'по горизонтали' : 'по вертикали'} · {ACT.word.length} букв</span>
          <span className="txt">{ACT.clue}</span>
          {state === 'reveal' && <b className="ans">{ACT.word.toUpperCase()}</b>}
        </>}
      </div>
      <Timer n={n} total={CW.timer} x={150} base={1012} size={160} />
    </S1Screen>
  )
}
