// ═══ Этап 3 · «Кроссворд» · C «Созвездие светлячков» ═══
// Ни рамы, ни доски: сетка — карта огоньков, повисших в тёмном воздухе леса. Клетка — светлячок, слово — нить
// света между светлячками, пересечение — яркая звезда с лучами (одна звезда на два слова). Холодный огонёк —
// слово ещё не звучало, тёплый тусклый — уже было, яркий золотой — идёт сейчас. Далёкая пыль и карта чуть
// дрейфуют (параллакс). Разбор: карта уменьшается в уголок, слово «взлетает» с неё светлячками и встаёт рядом
// колонкой букв, а под ним — ответы команд: буква команды лежит ровно под буквой правильного слова, расхождение
// видно сразу. Потом свет перебегает к следующему слову.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { Timer, head, timer3 } from './common3'
import { CELLS, CWT, CW_TIMER, G, RANKED, W, Align, Mark, NUMS, cellNums, dirRu, sceneOf, shown, total, verdict, wordCells, lenCls } from './cwcommon'

export const CWC_NOTE = 'Сетка — карта огоньков в тёмном воздухе, без рамы и доски: слово — нить света, пересечение — яркая звезда. Идущее слово горит золотом, прошедшие тлеют, будущие холодные. Разбор: карта уменьшается в угол, слово взлетает с неё светлячками и встаёт колонкой букв, а под ним — ответы команд, каждая буква лежит под своей буквой правильного слова (расхождение видно сразу), справа ✓ / ✗ и +1. Потом свет бежит к следующему слову.'

const bb = (() => { const r = CELLS.map(c => c.r), c = CELLS.map(x => x.c); return { r0: Math.min(...r), r1: Math.max(...r), c0: Math.min(...c), c1: Math.max(...c) } })()
const X0 = 1000, COL = 62, ROW0 = 392, ROWH = 88, ANSY = 292
const dust = Array.from({ length: 70 }, (_, i) => ({ x: (i * 977) % 1900 + 10, y: (i * 613) % 1040 + 20, s: 2 + (i % 3), d: (i % 9) * 0.6 }))

export function CrosswordC({ state, nOv, onReady }: S1Props) {
  const sc = sceneOf(state), rev = sc.rev, cur = sc.cur
  const g = !rev ? { P: 78, OX: 960 - ((bb.c1 - bb.c0 + 1) * 78) / 2, OY: 96 } : sc.complete ? { P: 66, OX: 70, OY: 200 } : { P: 56, OX: 44, OY: 310 }
  const cx = (c: number) => g.OX + (c - bb.c0) * g.P + g.P / 2, cy = (r: number) => g.OY + (r - bb.r0) * g.P + g.P / 2
  const orb = g.P * (sc.complete ? 0.72 : 0.62)
  const tm = timer3(rev ? 'reveal' : 'question', CW_TIMER)
  const wc = wordCells(cur)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (!rev) {
      tl.fromTo(q('.cwC-dust i'), { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.01 }, 0)
        .fromTo(q('.cwC-line'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: 'power2.out' }, 0.2)
        .fromTo(q('.cwC-orb'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: { each: 0.016, from: 'random' }, ease: 'back.out(2)' }, 0.4)
        .fromTo(q('.cwC-clue'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.2)
    } else if (!sc.complete) {
      tl.fromTo(q('.cwC-orb, .cwC-line, .cwC-dust i'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
      tl.addLabel('P', 0.4)
      tl.fromTo(q('.cwC-veil'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2)
      tl.fromTo(q('.cwC-rec.p1, .cwC-lab.p1, .cwC-nm.p1'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, 0.5)
      tl.fromTo(q('.cwC-trow.p1 .ch, .cwC-ans.p1 .ch'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0.5)
      tl.fromTo(q('.cwC-trow.p1 .cwC-lt, .cwC-ans.p1 .cwC-lt'), { opacity: 0, scale: 0.4 }, { opacity: 0, scale: 0.4, duration: 0.01 }, 0.5)
      tl.fromTo(q('.cwC-trow.p1 .cwC-mk'), { opacity: 0, scale: 0 }, { opacity: 0, scale: 0, duration: 0.01 }, 0.5)
      tl.addLabel('R', 1.6)
      // слово взлетает с карты в колонку букв
      wc.forEach((c, k) => {
        const el = q(`.cwC-lift[data-k="${k}"]`)[0], fx = cx(c.c) - (X0 + k * COL + COL / 2), fy = cy(c.r) - ANSY, at = 1.6 + k * 0.12, land = at + 1.0
        if (el) tl.fromTo(el, { x: fx, y: fy, scale: orb / 54, opacity: 1 }, { keyframes: [{ x: fx * 0.4, y: fy * 0.4 - 60, scale: 1.1, duration: 0.55, ease: 'sine.inOut' }, { x: 0, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }] }, at)
          .to(el, { opacity: 0, duration: 0.15 }, land)
        tl.fromTo(q(`.cwC-beam[data-k="${k}"]`), { strokeDashoffset: 600, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.9, duration: 0.6, ease: 'power1.out' }, at)
          .to(q(`.cwC-beam[data-k="${k}"]`), { opacity: 0, duration: 0.5 }, land - 0.1)
          .fromTo(q(`.cwC-ans.p1 .cwC-lt:nth-child(${k + 1})`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.2 }, land)
      })
      const k0 = 1.6 + wc.length * 0.12 + 1.0
      tl.fromTo(q('.cwC-ans.p1 .ch'), { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: 0.12 }, k0 - 0.4)
        .fromTo(q('.cwC-orb[data-cur]:not([data-old])'), { '--on': 0, '--glow': 0.6 }, { '--on': 1, '--glow': 1, duration: 0.35, stagger: (i, el) => Number((el as HTMLElement).dataset.k) * 0.12, ease: 'power1.out' }, k0 - 0.4)
      const T = k0 + wc.length * 0.12 + 0.8
      tl.addLabel('T', T)
      CWT.forEach((_, ti) => {
        tl.fromTo(q(`.cwC-trow.p1[data-ti="${ti}"] .cwC-lt`), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' }, T + ti * 0.55)
          .fromTo(q(`.cwC-trow.p1[data-ti="${ti}"] .ch`), { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.05 }, T + ti * 0.55 + 0.1)
          .fromTo(q(`.cwC-trow.p1[data-ti="${ti}"] .cwC-mk`), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, T + ti * 0.55 + 0.35)
      })
      if (sc.next != null) {
        const N = T + CWT.length * 0.55 + 1.6
        tl.addLabel('N', N)
        tl.to(q('.cwC-rec.p1, .cwC-lab.p1, .cwC-nm.p1, .cwC-trow.p1, .cwC-ans.p1'), { opacity: 0, y: 20, duration: 0.5, stagger: 0.02 }, N)
          .fromTo(q('.cwC-rec.p2, .cwC-lab.p2, .cwC-nm.p2, .cwC-trow.p2, .cwC-ans.p2'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03 }, N + 0.5)
          .fromTo(q('.cwC-orb[data-nx]'), { '--glow': 0.3 }, { '--glow': 1, duration: 0.7, stagger: 0.05 }, N + 0.2)
          .fromTo(q('.cwC-line[data-nx]'), { '--hot': 0 }, { '--hot': 1, duration: 0.7 }, N + 0.2)
      }
    } else {
      tl.fromTo(q('.cwC-orb'), { '--glow': 0.4, scale: 1 }, { '--glow': 1, scale: 1.12, duration: 0.5, yoyo: true, repeat: 1, stagger: { each: 0.02, from: 'center' } }, 0.2)
        .fromTo(q('.cwC-tally > *'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 }, 0.6)
    }
  }, tm, [state])
  const n = nOv ?? (tm ? nLive : null)
  const rects: Rect[] = [{ x: 60, y: 80, w: 860, h: 860 }]
  const curCells = new Set(wc.map(c => `${c.r},${c.c}`)), nxCells = new Set(sc.next != null ? wordCells(sc.next).map(c => `${c.r},${c.c}`) : [])
  const lineD = (num: number) => wordCells(num).map((c, i) => `${i ? 'L' : 'M'} ${cx(c.c)} ${cy(c.r)}`).join(' ')
  const trow = (num: number, covered: boolean, cls: string) => CWT.map((t, ti) => <div key={ti} className={`cwC-trow ${cls}`} data-ti={ti} style={{ top: ROW0 + ti * ROWH - 44, ...(covered ? { opacity: 0 } : null) }}>
    <span className={`cwC-nm ${cls}`} style={{ color: t.color }}>{t.name}</span>
    <span className="cwC-cells">{covered ? <span className="cwC-al">{Array.from({ length: W(num).word.length }, (_, i) => <i key={i} className="cwC-lt cov"><b className="ch" style={{ opacity: 0 }}>•</b></i>)}</span> : <Align num={num} ti={ti} px="cwC" />}</span>
    {!covered && <Mark num={num} ti={ti} px="cwC" />}
  </div>)
  const ans = (num: number, covered: boolean, cls: string) => <div className={`cwC-ans ${cls}`} style={{ top: ANSY - 44, ...(covered ? { opacity: 0 } : null) }}>
    <span className={`cwC-lab ${cls}`}>Правильный ответ</span>
    <span className="cwC-cells"><span className="cwC-al">{[...W(num).word.toUpperCase()].map((ch, i) => <i key={i} className="cwC-lt ok big"><b className="ch" style={covered ? { opacity: 0 } : undefined}>{ch}</b></i>)}</span></span>
  </div>
  const rec = (num: number, cls: string, covered?: boolean) => <div className={`cwC-rec ${cls}${lenCls(W(num).clue)}`} style={covered ? { opacity: 0 } : undefined}><em>Разбор · слово {num} · {dirRu(num)}{covered ? ' · ответили 6 команд' : ''}</em>{W(num).clue}</div>
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 cw cwC st-${state}${rev ? ' rev' : ''}`}>
      {head('Литературный кроссворд', cur > 8 ? 8 : cur, G.words.length)}
      <div className="cwC-dust" aria-hidden>{dust.map((d, i) => <i key={i} style={{ left: d.x, top: d.y, width: d.s, height: d.s, animationDelay: `${d.d}s` }} />)}</div>
      <div className="cwC-map">
        <svg className="cwC-svg" viewBox="0 0 1920 1080" aria-hidden>
          {NUMS.map(num => {
            const old = sc.complete || num < cur, now = num === cur && !sc.complete
            return <path key={num} className={`cwC-line${now ? ' now' : old ? ' old' : ''}`} data-n={num} {...(num === sc.next ? { 'data-nx': 1 } : {})} d={lineD(num)} />
          })}
          {rev && !sc.complete && wc.map((c, k) => { const tx = X0 + k * COL + COL / 2, mx = cx(c.c), my = cy(c.r); return <path key={k} className="cwC-beam" data-k={k} d={`M ${mx} ${my} C ${mx + 120} ${my} ${tx - 160} ${ANSY} ${tx} ${ANSY}`} /> })}
        </svg>
        {CELLS.map(c => {
          const ns = cellNums(c), key = `${c.r},${c.c}`
          const old = ns.some(x => shown(x, sc)), isCur = curCells.has(key) && !sc.complete
          const cls = sc.complete ? 'rev' : isCur ? (rev ? 'seal' : 'act') : old ? 'rev' : ns.some(x => x < cur) ? 'seal' : 'cold'
          const k = wc.findIndex(w => w === c)
          return <div key={key} className={`cwC-orb ${cls}${c.words.length > 1 ? ' x' : ''}`} data-n={ns.join(' ')}
            style={{ left: cx(c.c) - orb / 2, top: cy(c.r) - orb / 2, width: orb, height: orb, ['--d' as string]: `${(c.r * 3 + c.c) % 7 * 0.5}s` }}
            {...(isCur && rev ? { 'data-cur': 1, 'data-k': k, ...(ns.some(x => shown(x, sc)) ? { 'data-old': 1 } : {}) } : {})} {...(nxCells.has(key) ? { 'data-nx': 1 } : {})}>
            {c.words.length > 1 && <i className="flare" />}<span className="core"><b className="ch" style={{ fontSize: orb * 0.56 }}>{c.ch}</b></span>{c.num && <em className="num" style={{ left: -orb * 0.1, top: -orb * 0.28 }}>{c.num}</em>}
          </div>
        })}
      </div>
      {!rev && <div className="cwC-clue"><div className="k">слово {cur} · {dirRu(cur)} · {W(cur).word.length} букв</div><div className={`t${lenCls(W(cur).clue)}`}>{W(cur).clue}</div></div>}
      {rev && !sc.complete && <>
        <div className="cwC-veil" />
        {rec(cur, 'p1')}{ans(cur, false, 'p1')}{trow(cur, false, 'p1')}
        {wc.map((c, k) => <div key={k} className="cwC-lift" data-k={k} style={{ left: X0 + k * COL, top: ANSY - 27 }}><i className="cwC-lt ok big" /></div>)}
        {sc.next != null && <>{rec(sc.next, 'p2', true)}{ans(sc.next, true, 'p2')}{trow(sc.next, true, 'p2')}</>}
      </>}
      {sc.complete && <div className="cwC-tally">
        <div className="cwC-rec pd"><em>Кроссворд разгадан</em>Угадано слов из {NUMS.length}</div>
        {RANKED.map((t, k) => <div key={t.i} className="cwC-tr" style={{ top: 300 + k * 92 }}>
          <span className="cwC-nm" style={{ color: t.color }}>{t.name}</span>
          <span className="pips">{NUMS.map(num => <i key={num} className={verdict(num, t.i) === true ? 'ok' : verdict(num, t.i) === false ? 'no' : 'nil'}>{num}</i>)}</span>
          <b className="sum">{total(t.i)}</b>
        </div>)}
      </div>}
      {!rev && <Timer n={n} total={CW_TIMER} x={1800} base={440} size={140} rooted={0} />}
    </S1Screen>
  )
}
