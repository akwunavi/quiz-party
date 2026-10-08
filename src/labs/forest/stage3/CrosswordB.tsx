// ═══ Этап 3 · «Кроссворд» · B «Живое дерево» ═══
// Сетка — одно дерево, выросшее из земли в левом нижнем углу: слово = ветвь (кора, неровная, но строго по
// клеткам сетки), клетка = лист на ветви, пересечение — развилка, где две ветви срослись. Закрытый бутон —
// слово ещё не звучало; свёрнутый лист — слово уже было; развёрнутый светящийся — идёт сейчас; золотой лист
// с буквой — разобрано. Разбор: дерево отодвигается влево и уменьшается, справа с толстой ветви свисают
// стручки-карточки команд (2×3): у каждой ответ по буквам под правильным словом. Лист за листом раскрывается
// слово, команды открывают ответы по одной; потом дерево «перекидывает» свет на следующую ветвь.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { Timer, head, timer3 } from './common3'
import { CELLS, CWT, CW_TIMER, G, RANKED, W, Align, Mark, NUMS, cellNums, dirRu, sceneOf, shown, total, verdict, wordCells, lenCls } from './cwcommon'

export const CWB_NOTE = 'Сетка — дерево, выросшее из земли в левом нижнем углу: слово — ветвь, клетка — лист, пересечение — развилка. Закрытый бутон — слово ещё не звучало, свёрнутый лист — было, светящийся развёрнутый — идёт сейчас. Разбор: дерево уменьшается влево, справа с ветви свисают стручки команд 2×3 — ответ побуквенно под правильным словом. Листья слова раскрываются по буквам, команды открывают ответы по одной, свет перебегает на следующую ветвь.'

type Pt = { x: number; y: number }
const jit = (i: number, n: number) => ({ x: Math.sin(i * 2.3 + n * 1.7) * 4, y: Math.cos(i * 1.9 + n * 2.9) * 4 })
/** гладкая кривая через точки (Catmull-Rom → кубические Безье) */
function smooth(p: Pt[]) {
  let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c
    d += ` C ${(b.x + (c.x - a.x) / 6).toFixed(1)} ${(b.y + (c.y - a.y) / 6).toFixed(1)} ${(c.x - (e.x - b.x) / 6).toFixed(1)} ${(c.y - (e.y - b.y) / 6).toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`
  }
  return d
}

export function CrosswordB({ state, nOv, onReady }: S1Props) {
  const sc = sceneOf(state), rev = sc.rev, cur = sc.cur
  const g = rev ? { P: 56, GX: 70, GY: 306 } : { P: 70, GX: 250, GY: 232 }
  const cx = (c: number) => g.GX + c * g.P + g.P / 2, cy = (r: number) => g.GY + r * g.P + g.P / 2
  const tm = timer3(rev ? 'reveal' : 'question', CW_TIMER)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    if (!rev) {
      tl.fromTo(q('.cwB-trunk'), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
        .fromTo(q('.cwB-bough'), { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: 'power2.out' }, 0.5)
        .fromTo(q('.cwB-leaf'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: { each: 0.014, from: 'start' }, ease: 'back.out(2)' }, 0.9)
        .fromTo(q('.cwB-clue'), { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, 1.4)
    } else if (!sc.complete) {
      tl.fromTo(q('.cwB-leaf, .cwB-bough, .cwB-trunk'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
      tl.addLabel('P', 0.4)
      tl.fromTo(q('.cwB-ban.p1, .cwB-card.p1, .cwB-rec.p1'), { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(1.4)' }, 0.4)
      tl.fromTo(q('.cwB-card.p1 .ch, .cwB-ban.p1 .ch'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0.4)
      tl.fromTo(q('.cwB-card.p1 .cwB-mk'), { opacity: 0, scale: 0 }, { opacity: 0, scale: 0, duration: 0.01 }, 0.4)
      tl.fromTo(q('.cwB-bough[data-cur]'), { '--hot': 0 }, { '--hot': 1, duration: 0.6 }, 1.0)
      tl.addLabel('R', 2.2)
      const k = 0.15
      tl.fromTo(q('.cwB-leaf[data-cur]:not([data-old])'), { '--on': 0, '--open': 0.2 }, { '--on': 1, '--open': 1, duration: 0.4, stagger: (i, el) => Number((el as HTMLElement).dataset.k) * k, ease: 'back.out(1.6)' }, 2.2)
        .fromTo(q('.cwB-ban.p1 .ch'), { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: k }, 2.2)
      const T = 2.2 + W(cur).word.length * k + 0.7
      tl.addLabel('T', T)
      CWT.forEach((_, ti) => {
        tl.fromTo(q(`.cwB-card.p1[data-ti="${ti}"] .ch`), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.05 }, T + ti * 0.55)
          .fromTo(q(`.cwB-card.p1[data-ti="${ti}"] .cwB-mk`), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, T + ti * 0.55 + 0.35)
          .fromTo(q(`.cwB-card.p1[data-ti="${ti}"]`), { '--v': 0 }, { '--v': 1, duration: 0.4 }, T + ti * 0.55 + 0.3)
      })
      if (sc.next != null) {
        const N = T + CWT.length * 0.55 + 1.6
        tl.addLabel('N', N)
        tl.to(q('.cwB-ban.p1, .cwB-card.p1, .cwB-rec.p1'), { opacity: 0, y: 24, duration: 0.5, stagger: 0.03 }, N)
          .fromTo(q('.cwB-ban.p2, .cwB-card.p2, .cwB-rec.p2'), { opacity: 0, y: -26 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: 'back.out(1.4)' }, N + 0.5)
          .fromTo(q('.cwB-bough[data-nx]'), { '--hot': 0 }, { '--hot': 1, duration: 0.7 }, N + 0.2)
          .fromTo(q('.cwB-leaf[data-nx]'), { '--open': 0.5 }, { '--open': 1, duration: 0.6, stagger: 0.05 }, N + 0.3)
      }
    } else {
      tl.fromTo(q('.cwB-leaf'), { '--open': 0.5 }, { '--open': 1, duration: 0.7, stagger: { each: 0.015, from: 'edges' } }, 0.2)
        .fromTo(q('.cwB-card.pd'), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' }, 0.5)
    }
  }, tm, [state])
  const n = nOv ?? (tm ? nLive : null)
  const rects: Rect[] = [{ x: 40, y: 200, w: rev ? 860 : 1100, h: rev ? 700 : 820 }, { x: rev ? 900 : 1150, y: 100, w: 980, h: 800 }]
  const curCells = new Set(wordCells(cur).map(c => `${c.r},${c.c}`)), nxCells = new Set(sc.next != null ? wordCells(sc.next).map(c => `${c.r},${c.c}`) : [])
  const boughD = (num: number) => {
    const p = wordCells(num).map((c, i) => { const j = jit(i, num); return { x: cx(c.c) + j.x, y: cy(c.r) + j.y } })
    const w = W(num), a = p[0], b = p[p.length - 1], t = g.P * 0.5
    return smooth([w.dir === 'across' ? { x: a.x - t, y: a.y } : { x: a.x, y: a.y - t }, ...p, w.dir === 'across' ? { x: b.x + t, y: b.y } : { x: b.x, y: b.y + t }])
  }
  const low = CELLS.reduce((a, c) => (c.r > a.r || (c.r === a.r && c.c < a.c) ? c : a), CELLS[0]) // самая нижняя клетка — сюда встаёт ствол
  const x0 = cx(low.c), y0 = cy(low.r)
  const reviewCards = (num: number, covered: boolean, cls: string) => CWT.map((t, ti) => {
    const col = ti % 2, row = Math.floor(ti / 2), v = verdict(num, ti)
    return <div key={ti} className={`cwB-card ${cls}${covered ? ' cov' : v === true ? ' ok' : v === false ? ' no' : ''}`} data-ti={ti} style={{ left: 940 + col * 480, top: 318 + row * 196, ...(covered ? { opacity: 0 } : null) }}>
      <i className="cord" /><div className="nm" style={{ color: t.color }}>{t.name}</div>
      {covered ? <span className="cwB-al">{Array.from({ length: W(num).word.length }, (_, i) => <i key={i} className="cwB-lt cov"><b className="ch" style={{ opacity: 0 }}>•</b></i>)}</span> : <Align num={num} ti={ti} px="cwB" />}
      {!covered && <Mark num={num} ti={ti} px="cwB" />}
    </div>
  })
  const ban = (num: number, covered: boolean, cls: string) => <div className={`cwB-ban ${cls}`} style={covered ? { opacity: 0 } : undefined}>
    <span className="lab">Правильный ответ</span>
    <span className="cwB-al big">{[...W(num).word.toUpperCase()].map((ch, i) => <i key={i} className="cwB-lt ok"><b className="ch" style={covered ? { opacity: 0 } : undefined}>{ch}</b></i>)}</span></div>
  const rec = (num: number, cls: string, covered?: boolean) => <div className={`cwB-rec ${cls}${lenCls(W(num).clue)}`} style={covered ? { opacity: 0 } : undefined}><em>Разбор · слово {num} · {dirRu(num)}</em>{W(num).clue}</div>
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 cw cwB st-${state}${rev ? ' rev' : ''}`}>
      {head('Литературный кроссворд', cur > 8 ? 8 : cur, G.words.length)}
      <svg className="cwB-svg" viewBox="0 0 1920 1080" aria-hidden>
        <defs><linearGradient id="cwBbark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2a1c12" /><stop offset=".5" stopColor="#4a3220" /><stop offset="1" stopColor="#2a1c12" /></linearGradient></defs>
        <g className="cwB-trunk">
          <path d={`M ${x0 - 20} ${y0 + 40} C ${x0 - 60} 1030 ${x0 - 130} 1060 ${x0 - 210} 1068`} className="root" /><path d={`M ${x0 + 20} ${y0 + 40} C ${x0 + 60} 1030 ${x0 + 130} 1060 ${x0 + 210} 1068`} className="root" />
          <path d={`M ${x0 - 100} 1080 C ${x0 - 70} 1030 ${x0 - 40} ${y0 + 110} ${x0 - 17} ${y0 + 12} L ${x0 + 17} ${y0 + 12} C ${x0 + 40} ${y0 + 110} ${x0 + 70} 1030 ${x0 + 100} 1080 Z`} fill="url(#cwBbark)" />
          {[-24, -10, 6, 20].map((o, i) => <path key={i} className="grain" d={`M ${x0 + o} ${y0 + 20} C ${x0 + o * 1.6} ${y0 + 90} ${x0 + o * 2.4} 1000 ${x0 + o * 3} 1078`} />)}
        </g>
        {NUMS.map(num => {
          const old = sc.complete || num < cur, now = num === cur && !sc.complete
          return <path key={num} className={`cwB-bough${now ? ' now' : old ? ' old' : ''}`} data-n={num} {...(rev && now ? { 'data-cur': 1 } : {})} {...(num === sc.next ? { 'data-nx': 1 } : {})} d={boughD(num)} />
        })}
        {rev && <path className="cwB-limb" d="M 900 276 C 1200 258 1600 294 1900 266" />}
      </svg>
      {CELLS.map(c => {
        const ns = cellNums(c), key = `${c.r},${c.c}`
        const old = ns.some(x => shown(x, sc)), isCur = curCells.has(key) && !sc.complete
        const cls = sc.complete ? 'rev' : isCur ? (rev ? 'seal' : 'act') : old ? 'rev' : ns.some(x => x < cur) ? 'seal' : 'cold'
        const k = wordCells(cur).findIndex(w => w === c)
        const rot = ((c.r * 5 + c.c * 3) % 7 - 3) * 6
        return <div key={key} className={`cwB-leaf ${cls}${c.words.length > 1 ? ' x' : ''}`} data-n={ns.join(' ')}
          style={{ left: cx(c.c) - g.P * 0.46, top: cy(c.r) - g.P * 0.36, width: g.P * 0.92, height: g.P * 0.72, ['--rot' as string]: `${rot}deg`, ['--d' as string]: `${(c.r * 3 + c.c) % 7 * 0.4}s` }}
          {...(isCur && rev ? { 'data-cur': 1, 'data-k': k, ...(ns.some(x => shown(x, sc)) ? { 'data-old': 1 } : {}) } : {})} {...(nxCells.has(key) ? { 'data-nx': 1 } : {})}>
          <i className="blade" />{c.num && <em className="num">{c.num}</em>}<b className="ch" style={{ fontSize: g.P * 0.5 }}>{c.ch}</b>
        </div>
      })}
      {!rev && <div className="cwB-clue"><div className="k">слово {cur} · {dirRu(cur)} · {W(cur).word.length} букв</div>
        <div className={`t${lenCls(W(cur).clue)}`}>{W(cur).clue}</div></div>}
      {rev && !sc.complete && <>
        {rec(cur, 'p1')}{ban(cur, false, 'p1')}{reviewCards(cur, false, 'p1')}
        {sc.next != null && <>{rec(sc.next, 'p2', true)}{ban(sc.next, true, 'p2')}{reviewCards(sc.next, true, 'p2')}</>}
      </>}
      {sc.complete && <>
        <div className="cwB-rec pd"><em>Кроссворд разгадан</em>Угадано слов из {NUMS.length}</div>
        {RANKED.map((t, k) => <div key={t.i} className="cwB-card pd" style={{ left: 940 + (k % 2) * 480, top: 318 + Math.floor(k / 2) * 196 }}>
          <i className="cord" /><div className="nm" style={{ color: t.color }}>{t.name}</div>
          <span className="pips">{NUMS.map(num => <i key={num} className={verdict(num, t.i) === true ? 'ok' : verdict(num, t.i) === false ? 'no' : 'nil'}>{num}</i>)}</span>
          <b className="sum">{total(t.i)}</b>
        </div>)}
      </>}
      {!rev && <Timer n={n} total={CW_TIMER} x={1760} base={1044} size={150} rooted={50} />}
    </S1Screen>
  )
}
