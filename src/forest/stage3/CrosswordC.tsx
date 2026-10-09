// ═══ Этап 3 · «Кроссворд» · C «Созвездие светлячков» — разметка сцены (общая для лаборатории и игры) ═══
// Ни рамы, ни доски: сетка — карта огоньков, повисших в тёмном воздухе леса. Клетка — светлячок, слово — нить
// света между светлячками, пересечение — яркая звезда с лучами (одна звезда на два слова). Холодный огонёк —
// слово ещё не звучало, тёплый тусклый — уже было, яркий золотой — идёт сейчас. Далёкая пыль и карта чуть
// дрейфуют (параллакс). Разбор: карта уменьшается в уголок, слово «взлетает» с неё светлячками и встаёт рядом
// колонкой букв, а под ним — ответы команд: буква команды лежит ровно под буквой правильного слова, расхождение
// видно сразу. Потом свет перебегает к следующему слову.
// Здесь только РИСУНОК по данным: сетка, ответы команд и вердикты приходят пропсами (в игре — из настоящего состояния
// и проверки ShowAnswers; в лаборатории — тестовые, src/labs/forest/crosswordLab.tsx). Таймлайны — у вызывающих.
import { Fragment, type ReactNode, type RefObject } from 'react'
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { Timer, head } from './common3'
import { diffOf, lenCls, mapGeom, rowGeom, tallyGeom, type Cell, type CwModel } from './cwModel'

export const CWC_NOTE = 'Выбрано ведущим. Сетка — карта огоньков в тёмном воздухе, без рамы и доски: слово — нить света, пересечение — яркая звезда. Идущее слово горит золотом, прошедшие тлеют, будущие холодные. Разбор: карта уменьшается в угол, слово взлетает с неё светлячками и встаёт колонкой букв, а под ним — ответы команд, каждая буква лежит под своей буквой правильного слова (расхождение видно сразу), справа ✓ / ✗ и +1. Потом свет бежит к следующему слову.'

export const X0 = 1000, ANSY = 292
const dust = Array.from({ length: 70 }, (_, i) => ({ x: (i * 977) % 1900 + 10, y: (i * 613) % 1040 + 20, s: 2 + (i % 3), d: (i % 9) * 0.6 }))
const RECTS: Rect[] = [{ x: 60, y: 80, w: 860, h: 860 }]

export type CwMode = 'question' | 'review' | 'complete'
/** Геометрия карты: где клетка и какого размера огонёк */
export function cwGeom(m: CwModel, mode: CwMode, o?: { bottom?: number; right?: number }) {
  const g = mapGeom(m.bb, mode, o)
  const cx = (c: number) => g.OX + (c - m.bb.c0) * g.P + g.P / 2, cy = (r: number) => g.OY + (r - m.bb.r0) * g.P + g.P / 2
  return { g, cx, cy, orb: g.P * (mode === 'complete' ? 0.72 : 0.62) }
}

/** Строка команды в разборе. answer: null — команда не ответила; verdict: null — вердикта нет (не ответили / ещё не объявлен) */
export type CwTeamRow = { key: string | number; name: string; color: string; answer: string | null; verdict: boolean | null }
/** Один «слой» разбора (слово): в лаборатории их два — текущее (p1) и следующее (p2), в игре один */
export type CwPart = {
  num: number; cls: string
  /** ответы ещё закрыты: у правильного ответа и у команд пустые огоньки */
  covered: boolean
  /** слой невидим до анимации (лабораторный «следующий») */
  hidden?: boolean
  /** приписка к шапке разбора, напр. « · ответили 6 команд» */
  recExtra?: string
  clue: string
  rows: CwTeamRow[]
  /** раскраска букв и ✓/✗ — только когда вердикт объявлен (в игре — после автопроверки ShowAnswers) */
  judged: boolean
}
export type CwTallyRow = { key: string | number; name: string; color: string; pips: (boolean | null)[]; sum: number }

export function CrosswordScene({ m, mode, title, qn, qcount, cur, next = null, past, shown, curLit, clue, parts, lifts, tally, n, total, rootRef, cls = '', bottom, right, side, timer = true }: {
  m: CwModel; mode: CwMode; title: string; qn: number; qcount: number
  /** текущее слово (номер в сетке); null — слово не нашлось в сетке */
  cur: number | null; next?: number | null
  /** слово уже прошло (нить тлеет) */
  past: (num: number) => boolean
  /** буквы слова можно показывать */
  shown: (num: number) => boolean
  /** буквы текущего слова уже видны (в игре — ответ открыт; в лаборатории их зажигает таймлайн) */
  curLit?: boolean
  clue?: { text: string; answer?: string; note?: string }
  parts?: CwPart[]
  /** огоньки, которые взлетают с карты к правильному ответу */
  lifts?: boolean
  tally?: { rows: CwTallyRow[] }
  n: number | null; total: number
  rootRef: RefObject<HTMLDivElement>
  cls?: string
  /** нижняя/правая граница карты на экране вопроса (если внизу длинное определение или справа картинки) */
  bottom?: number; right?: number
  /** картинки/видео вопроса или ответа */
  side?: ReactNode
  timer?: boolean
}) {
  const rev = mode !== 'question', complete = mode === 'complete'
  const { cx, cy, orb } = cwGeom(m, mode, { bottom, right })
  const wc = cur != null ? m.wordCells(cur) : []
  const curCells = new Set(wc.map(c => `${c.r},${c.c}`)), nxCells = new Set(next != null ? m.wordCells(next).map(c => `${c.r},${c.c}`) : [])
  const lineD = (num: number) => m.wordCells(num).map((c, i) => `${i ? 'L' : 'M'} ${cx(c.c)} ${cy(c.r)}`).join(' ')
  const curWord = cur != null ? m.W(cur)?.word ?? '' : ''
  const RG = rowGeom(Math.max(1, ...(parts ?? []).map(p => p.rows.length)), Math.max(curWord.length, ...(parts ?? []).map(p => m.W(p.num)?.word.length ?? 0)))
  const std = RG.ROWH === 88 && RG.COL === 62 && RG.lt === 54
  const gridVars = std ? undefined : { ['--lt' as string]: `${RG.lt}px`, ['--gap' as string]: `${RG.COL - RG.lt}px` }
  const cellCls = (c: Cell) => {
    const ns = m.cellNums(c), key = `${c.r},${c.c}`
    const old = ns.some(x => shown(x)), isCur = curCells.has(key) && !complete
    return complete ? 'rev' : isCur ? (curLit ? 'rev' : rev ? 'seal' : 'act') : old ? 'rev' : ns.some(x => past(x)) ? 'seal' : 'cold'
  }
  const trow = (p: CwPart) => p.rows.map((t, ti) => <div key={t.key} className={`cwC-trow ${p.cls}`} data-ti={ti} style={{ top: RG.ROW0 + ti * RG.ROWH - RG.ROWH / 2, ...(std ? null : { height: RG.ROWH, ...gridVars }), ...(p.hidden ? { opacity: 0 } : null) }}>
    <span className={`cwC-nm ${p.cls}`} style={{ color: t.color }}>{t.name}</span>
    <span className="cwC-cells">{p.covered ? <span className="cwC-al">{Array.from({ length: m.W(p.num).word.length }, (_, i) => <i key={i} className="cwC-lt cov"><b className="ch" style={{ opacity: 0 }}>•</b></i>)}</span> : <Align answer={t.answer} word={m.W(p.num).word} judged={p.judged} />}</span>
    {!p.covered && p.judged && <Mark v={t.verdict} />}
  </div>)
  const ans = (p: CwPart) => <div className={`cwC-ans ${p.cls}`} style={{ top: ANSY - 44, ...gridVars, ...(p.hidden ? { opacity: 0 } : null) }}>
    <span className={`cwC-lab ${p.cls}`}>Правильный ответ</span>
    <span className="cwC-cells"><span className="cwC-al">{[...m.W(p.num).word.toUpperCase()].map((ch, i) => <i key={i} className="cwC-lt ok big"><b className="ch" style={p.covered ? { opacity: 0 } : undefined}>{ch}</b></i>)}</span></span>
  </div>
  const rec = (p: CwPart) => <div className={`cwC-rec ${p.cls}${lenCls(p.clue)}`} style={p.hidden ? { opacity: 0 } : undefined}><em>Разбор · слово {p.num} · {m.dirRu(p.num)}{p.recExtra ?? ''}</em>{p.clue}</div>
  const TG = tally ? tallyGeom(tally.rows.length, m.nums.length) : null
  const tstd = !TG || (TG.step === 92 && TG.pip === 40)
  return (
    <S1Screen rects={RECTS} n={n} rootRef={rootRef} cls={`s3 cw cwC ${cls}`}>
      {head(title, qn, qcount)}
      <div className="cwC-dust" aria-hidden>{dust.map((d, i) => <i key={i} style={{ left: d.x, top: d.y, width: d.s, height: d.s, animationDelay: `${d.d}s` }} />)}</div>
      <div className="cwC-map">
        <svg className="cwC-svg" viewBox="0 0 1920 1080" aria-hidden>
          {m.nums.map(num => {
            const old = complete || past(num), now = num === cur && !complete
            return <path key={num} className={`cwC-line${now ? ' now' : old ? ' old' : ''}`} data-n={num} {...(num === next ? { 'data-nx': 1 } : {})} d={lineD(num)} />
          })}
          {lifts && wc.map((c, k) => { const tx = X0 + k * RG.COL + RG.COL / 2, mx = cx(c.c), my = cy(c.r); return <path key={k} className="cwC-beam" data-k={k} d={`M ${mx} ${my} C ${mx + 120} ${my} ${tx - 160} ${ANSY} ${tx} ${ANSY}`} /> })}
        </svg>
        {m.cells.map(c => {
          const ns = m.cellNums(c), key = `${c.r},${c.c}`
          const isCur = curCells.has(key) && !complete
          const k = wc.findIndex(w => w === c)
          return <div key={key} className={`cwC-orb ${cellCls(c)}${c.words.length > 1 ? ' x' : ''}`} data-n={ns.join(' ')}
            style={{ left: cx(c.c) - orb / 2, top: cy(c.r) - orb / 2, width: orb, height: orb, ['--d' as string]: `${(c.r * 3 + c.c) % 7 * 0.5}s` }}
            {...(isCur && rev ? { 'data-cur': 1, 'data-k': k, ...(ns.some(x => shown(x)) ? { 'data-old': 1 } : {}) } : {})} {...(nxCells.has(key) ? { 'data-nx': 1 } : {})}>
            {c.words.length > 1 && <i className="flare" />}<span className="core"><b className="ch" style={{ fontSize: orb * 0.56 }}>{c.ch}</b></span>{c.num && <em className="num" style={{ left: -orb * 0.1, top: -orb * 0.28 }}>{c.num}</em>}
          </div>
        })}
      </div>
      {side}
      {!rev && clue && cur != null && <div className="cwC-clue"><div className="k">слово {cur} · {m.dirRu(cur)} · {curWord.length} {lettersWord(curWord.length)}</div><div className={`t${lenCls(clue.text)}`}>{clue.text}</div>
        {clue.answer ? <div className="cwC-open">{clue.answer}</div> : null}{clue.note ? <div className="cwC-note">{clue.note}</div> : null}</div>}
      {rev && !complete && parts && <>
        <div className="cwC-veil" />
        {parts.map(p => <Fragment key={p.cls + p.num}>{rec(p)}{ans(p)}{trow(p)}{p.cls === 'p1' && lifts && wc.map((c, k) => <div key={'l' + k} className="cwC-lift" data-k={k} style={{ left: X0 + k * RG.COL, top: ANSY - RG.lt / 2, ...(std ? null : { width: RG.lt, height: RG.lt, ...gridVars }) }}><i className="cwC-lt ok big" /></div>)}</Fragment>)}
      </>}
      {complete && tally && <div className="cwC-tally">
        <div className="cwC-rec pd"><em>Кроссворд разгадан</em>Угадано слов из {m.nums.length}</div>
        {tally.rows.map((t, k) => <div key={t.key} className="cwC-tr" style={{ top: TG!.top + k * TG!.step, ...(tstd ? null : { height: Math.min(80, TG!.step), ['--pip' as string]: `${TG!.pip}px` }) }}>
          <span className="cwC-nm" style={{ color: t.color }}>{t.name}</span>
          <span className="pips">{m.nums.map((num, i) => <i key={num} className={t.pips[i] === true ? 'ok' : t.pips[i] === false ? 'no' : 'nil'}>{num}</i>)}</span>
          <b className="sum">{t.sum}</b>
        </div>)}
      </div>}
      {!rev && timer && <Timer n={n} total={total} />}
    </S1Screen>
  )
}

export const lettersWord = (n: number) => { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? 'буква' : a >= 2 && a <= 4 && (b < 12 || b > 14) ? 'буквы' : 'букв' }

/** ответ команды по буквам (или текстом, если длинный); judged=false — буквы без раскраски (вердикт ещё не объявлен) */
export function Align({ answer, word, judged = true }: { answer: string | null; word: string; judged?: boolean }) {
  if (answer == null) return <span className="cwC-none">не ответили</span>
  const dl = diffOf(answer, word)
  if (!dl) return <span className={`cwC-txt${lenCls(answer)}`}><b className="ch">{answer}</b></span>
  const n = Math.max(word.length, dl.length)
  return <span className="cwC-al">{Array.from({ length: n }, (_, i) => { const d = dl[i]; return <i key={i} className={`cwC-lt ${d ? (judged ? d.st : 'neu') : 'miss'}`}><b className="ch">{d?.ch ?? ''}</b></i> })}</span>
}
/** вердикт строки: ✓ верно (+1), ✗ неверно, — нет ответа */
export function Mark({ v }: { v: boolean | null }) {
  return <span className={`cwC-mk ${v === true ? 'ok' : v === false ? 'no' : 'nil'}`}>{v === true ? <><b>✓</b><em>+1</em></> : v === false ? <b>✗</b> : <b>—</b>}</span>
}
