// ═══ Этап 3 · «Кроссворд» · A «Фонарные гирлянды» ═══
// Сетка висит в воздухе между стволами: слова по вертикали — гирлянды, спущенные с толстой ветви; слова по
// горизонтали — провисающие нити, продетые через фонари вертикальных гирлянд. Клетка = стеклянный фонарь;
// пересечение — фонарь с золотым кольцом (одна лампа на две нити). Холодный фонарь — слово ещё не звучало;
// тёплый закрытый — слово уже было (буквы не видны: до разбора не спойлерим); горящий с качанием — слово идёт сейчас.
// Разбор: тот же лес, справа — «табличка на верёвках» с ответом и командами: буквы команды лежат в стеклянных
// ячейках под буквами правильного слова. На ответе фонари слова загораются по буквам, затем команды открывают
// ответы по одной, и свет переходит к следующей гирлянде.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { Timer, head, timer3 } from './common3'
import { CELLS, CWT, CW_TIMER, G, RANKED, W, Align, Mark, NUMS, cellNums, dirRu, sceneOf, shown, total, verdict, wordCells, lenCls } from './cwcommon'

export const CWA_NOTE = 'Сетка висит в воздухе: слова по вертикали — гирлянды с толстой ветви, слова по горизонтали — нити через фонари. Клетка — стеклянный фонарь, пересечение — фонарь с золотым кольцом (одна лампа на две нити). Идущее слово горит и покачивается; прошедшие — тёплые и закрытые; будущие — холодные. Разбор: фонари слова загораются по буквам, справа на табличке — ответ команд побуквенно, ✓ / ✗ и +1. Свет переходит к следующей гирлянде.'

const P = 66, GX = 84, GY = 244, BR = 186
const cx = (c: number) => GX + c * P + P / 2, cy = (r: number) => GY + r * P + P / 2
const pts = (num: number) => wordCells(num).map(c => ({ x: cx(c.c), y: cy(c.r) }))
function stringD(num: number) {
  const p = pts(num), w = W(num)
  if (w.dir === 'down') return `M ${p[0].x} ${BR} L ${p[p.length - 1].x} ${p[p.length - 1].y}`
  return p.reduce((d, q, i) => (i === 0 ? `M ${q.x - 30} ${q.y + 4} L ${q.x} ${q.y}` : `${d} Q ${(p[i - 1].x + q.x) / 2} ${q.y + 12} ${q.x} ${q.y}`), '') + ` L ${p[p.length - 1].x + 30} ${p[p.length - 1].y + 4}`
}

export function CrosswordA({ state, nOv, onReady }: S1Props) {
  const sc = sceneOf(state), rev = sc.rev, cur = sc.cur
  const tm = timer3(rev ? 'reveal' : 'question', CW_TIMER)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (!rev) {
      tl.fromTo(q('.cwA-branch'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 0)
        .fromTo(q('.cwA-str'), { strokeDashoffset: 1600 }, { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: 'power2.out' }, 0.2)
        .fromTo(q('.cwA-lan'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: { each: 0.012, from: 'start' }, ease: 'back.out(2)' }, 0.5)
        .fromTo(q('.cwA-tag'), { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, 1.0)
    } else if (!sc.complete) {
      tl.fromTo(q('.cwA-lan, .cwA-str, .cwA-branch'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
      tl.addLabel('P', 0.4)
      tl.fromTo(q('.cwA-pane.p1 .head, .cwA-pane.p1 .ans, .cwA-pane.p1 .row'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07 }, 0.4)
      tl.fromTo(q('.cwA-pane.p1 .row .ch'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0.4)
      tl.fromTo(q('.cwA-pane.p1 .row .cwA-mk'), { opacity: 0, scale: 0 }, { opacity: 0, scale: 0, duration: 0.01 }, 0.4)
      tl.fromTo(q('.cwA-lan[data-cur]'), { '--pulse': 0 }, { '--pulse': 1, duration: 0.5, yoyo: true, repeat: 1 }, 1.0)
      tl.addLabel('R', 2.2)
      const k = 0.15
      tl.fromTo(q('.cwA-lan[data-cur]:not([data-old])'), { '--on': 0, '--glow': 0.5 }, { '--on': 1, '--glow': 0.95, duration: 0.35, stagger: (i, el) => Number((el as HTMLElement).dataset.k) * k, ease: 'power1.out' }, 2.2)
        .fromTo(q('.cwA-pane.p1 .ans .ch'), { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: k }, 2.2)
      const T = 2.2 + W(cur).word.length * k + 0.7
      tl.addLabel('T', T)
      CWT.forEach((_, ti) => {
        tl.fromTo(q(`.cwA-pane.p1 .row[data-ti="${ti}"] .ch`), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.05 }, T + ti * 0.55)
          .fromTo(q(`.cwA-pane.p1 .row[data-ti="${ti}"] .cwA-mk`), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, T + ti * 0.55 + 0.35)
      })
      if (sc.next != null) {
        const N = T + CWT.length * 0.55 + 1.6
        tl.addLabel('N', N)
        tl.to(q('.cwA-pane.p1'), { opacity: 0, x: -30, duration: 0.5 }, N)
          .fromTo(q('.cwA-pane.p2'), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6 }, N + 0.4)
          .fromTo(q('.cwA-lan[data-nx]'), { '--glow': 0.25 }, { '--glow': 1, duration: 0.7, stagger: 0.04 }, N + 0.2)
          .fromTo(q('.cwA-str[data-nx]'), { '--hot': 0 }, { '--hot': 1, duration: 0.7 }, N + 0.2)
      }
    } else {
      tl.fromTo(q('.cwA-lan'), { '--glow': 0.4 }, { '--glow': 1, duration: 0.8, stagger: { each: 0.015, from: 'edges' } }, 0.2)
        .fromTo(q('.cwA-pane.pd .row'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 }, 0.6)
    }
  }, tm, [state])
  const n = nOv ?? (tm ? nLive : null)
  const rects: Rect[] = [{ x: GX - 20, y: 150, w: 14 * P + 40, h: 10 * P + 120 }, { x: 1040, y: 110, w: 820, h: 880 }]
  const curCells = new Set(wordCells(cur).map(c => `${c.r},${c.c}`)), nxCells = new Set(sc.next != null ? wordCells(sc.next).map(c => `${c.r},${c.c}`) : [])
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 cw cwA st-${state}`}>
      {head('Литературный кроссворд', cur > 8 ? 8 : cur, G.words.length)}
      <svg className="cwA-svg" viewBox="0 0 1920 1080" aria-hidden>
        <path className="cwA-branch" d={`M 30 ${BR - 6} C 280 ${BR - 22} 640 ${BR + 6} 1060 ${BR - 10}`} />
        {NUMS.map(num => {
          const old = sc.complete || num < cur, now = num === cur && !sc.complete
          return <path key={num} className={`cwA-str${now ? ' now' : old ? ' old' : ''}`} data-n={num} {...(num === sc.next ? { 'data-nx': 1 } : {})} d={stringD(num)} />
        })}
        {CELLS.filter(c => c.words.length > 1).map((c, i) => <circle key={i} className="cwA-knot" cx={cx(c.c)} cy={cy(c.r)} r="30" />)}
      </svg>
      {CELLS.map(c => {
        const ns = cellNums(c), key = `${c.r},${c.c}`
        const old = ns.some(x => shown(x, sc)), isCur = curCells.has(key) && !sc.complete
        const cls = sc.complete ? 'rev' : isCur ? (rev ? 'seal' : 'act') : old ? 'rev' : ns.some(x => x < cur) ? 'seal' : 'cold'
        const first = c.words.length ? wordCells(cur).findIndex(w => w === c) : -1
        return <div key={key} className={`cwA-lan ${cls}${c.words.length > 1 ? ' x' : ''}`} data-n={ns.join(' ')} style={{ left: cx(c.c) - 25, top: cy(c.r) - 29, ['--d' as string]: `${(c.r * 3 + c.c) % 7 * 0.35}s` }}
          {...(isCur && rev ? { 'data-cur': 1, 'data-k': first, ...(ns.some(x => shown(x, sc)) ? { 'data-old': 1 } : {}) } : {})} {...(nxCells.has(key) ? { 'data-nx': 1 } : {})}>
          <span className="cwA-body"><i className="cap" /><span className="glass">{c.num && <em className="num">{c.num}</em>}<b className="ch">{c.ch}</b></span></span>
        </div>
      })}
      {!rev && <div className="cwA-tag"><i className="rope l" /><i className="rope r" />
        <div className="k">слово {cur} · {dirRu(cur)} · {W(cur).word.length} букв</div>
        <div className={`t${lenCls(W(cur).clue)}`}>{W(cur).clue}</div></div>}
      {rev && !sc.complete && <>
        <div className="cwA-pane p1"><Pane num={cur} /></div>
        {sc.next != null && <div className="cwA-pane p2" style={{ opacity: 0 }}><Pane num={sc.next} covered /></div>}
      </>}
      {sc.complete && <div className="cwA-pane pd">
        <div className="head"><div className="k">Кроссворд разгадан</div><div className="r">Угадано слов из {NUMS.length}</div></div>
        {RANKED.map(t => <div key={t.i} className="row done" data-ti={t.i}>
          <span className="nm" style={{ color: t.color }}>{t.name}</span>
          <span className="pips">{NUMS.map(num => <i key={num} className={verdict(num, t.i) === true ? 'ok' : verdict(num, t.i) === false ? 'no' : 'nil'}>{num}</i>)}</span>
          <b className="sum">{total(t.i)}</b>
        </div>)}
      </div>}
      {!rev && <Timer n={n} total={CW_TIMER} x={1760} base={1044} size={150} rooted={50} />}
    </S1Screen>
  )
}

function Pane({ num, covered }: { num: number; covered?: boolean }) {
  const w = W(num)
  return <>
    <div className="head"><div className="k">Разбор · слово {num} · {dirRu(num)}</div><div className={`clue${lenCls(w.clue)}`}>{w.clue}</div></div>
    <div className="ans"><span className="lab">Правильный ответ</span>
      <span className="cwA-al big">{[...w.word.toUpperCase()].map((ch, i) => <i key={i} className="cwA-lt ok"><b className="ch" style={covered ? { opacity: 0 } : undefined}>{ch}</b></i>)}</span></div>
    <div className="lab teams">{covered ? 'Ответили: 6 команд' : 'Ответы команд'}</div>
    {CWT.map((t, ti) => <div key={ti} className="row" data-ti={ti}>
      <span className="nm" style={{ color: t.color }}>{t.name}</span>
      {covered ? <span className="cwA-al">{Array.from({ length: w.word.length }, (_, i) => <i key={i} className="cwA-lt cov"><b className="ch" style={{ opacity: 0 }}>•</b></i>)}</span> : <Align num={num} ti={ti} px="cwA" />}
      {!covered && <Mark num={num} ti={ti} px="cwA" />}
    </div>)}
  </>
}
