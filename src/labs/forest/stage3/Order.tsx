// ═══ Этап 3 · «Порядок» — утверждённое направление «Лоза-путь» ═══
// Механика (answer.mode 'order'): варианты с буквами (choices), команды присылают последовательность букв
// («БВГА»); показ ответа — элементы в правильном порядке с позицией 1…N. Никаких «раньше/позже» в данных
// нет — смысл порядка задаёт текст вопроса; сцена показывает только направление и номера мест.
// Образ: внизу от края до края растёт лоза — от семени (место 1) к цветку (место N), на ней бутоны с
// номерами мест. Варианты — листья, висят сверху в алфавитном порядке (вразнобой). На ответе листья по
// очереди — от первого места к последнему — по дуге опускаются на свои бутоны: бутон раскрывается
// цветком, по лозе вслед за ним бежит свет. Направление читается сразу: семя → цветок, номера растут.
import { useRef } from 'react'
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { ORDER_SETS, type OrderSet } from './data'
import { head, Timer, timer3 } from './common3'
import { TeamStrip, rowsFrom } from '../stage4/TeamStrip'
import hubble from '../media/hubble-deep-field.jpg'

export const ORDER_STATES = [
  { id: 'question', name: 'Вопрос: 4 варианта вразнобой' },
  { id: 'long', name: 'Длинные подписи' },
  { id: 'five', name: '5 вариантов, порядок «от позднего»' },
  { id: 'six', name: '6 вариантов' },
  { id: 'media', name: 'Вопрос с картинкой' },
  { id: 'reveal', name: 'Показ ответа: листья встают по порядку' },
  { id: 'revlong', name: 'Показ: длинные подписи' },
  { id: 'revfive', name: 'Показ: 5 вариантов, обратный порядок' },
  { id: 'revsix', name: 'Показ: 6 вариантов' },
  { id: 'complete', name: 'Итог: порядок собран' },
]
export const ORDER_VARIANTS = [
  { id: 'A', name: 'Лоза-путь', note: 'Утверждено. Внизу от края до края растёт лоза: слева семя (место 1), справа цветок (последнее место), на лозе бутоны с номерами. Варианты — листья, висят сверху вразнобой. На ответе листья по одному, от первого места к последнему, опускаются на свои бутоны по дуге; бутон раскрывается цветком, по лозе вслед бежит свет. Номер места горит на листе. Направление — всегда от семени к цветку; что значит «раньше», говорит вопрос.' },
]

type P = { x: number; y: number }
const leaf = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
const VY = 858
function setOf(state: string): OrderSet {
  const k = state.replace(/^rev/, '')
  return k === 'long' ? ORDER_SETS.long : k === 'five' ? ORDER_SETS.five : k === 'six' ? ORDER_SETS.six : k === 'media' ? ORDER_SETS.media : ORDER_SETS.normal
}
function layout(S: OrderSet) {
  const n = S.choices.length, long = S === ORDER_SETS.long
  const cw = n >= 6 ? 244 : n === 5 ? 292 : S.media ? 300 : 360
  const ch = n >= 6 ? 112 : n === 5 ? 140 : long ? 196 : 150
  const L = S.media ? 470 : 330, R = 1850
  const xs = Array.from({ length: n }, (_, j) => L + cw / 2 + (n === 1 ? 0 : (j * (R - L - cw)) / (n - 1)))
  const slot: P[] = xs.map(x => ({ x, y: VY - 130 - ch / 2 }))
  const home: P[] = S.choices.map((_, i) => ({ x: xs[i], y: 350 + (i % 2) * (long ? 130 : 60) }))
  return { n, cw, ch, slot, home, xs }
}
const lenCls = (t: string) => (t.length > 50 ? ' xl' : t.length > 28 ? ' lg' : '')

export function Order({ state, nOv, onReady }: S1Props) {
  const S = setOf(state), Ly = layout(S), rev = state.startsWith('rev') || state === 'complete', done = state === 'complete'
  const KEYS = S.choices.map(c => c.key), POS = (key: string) => S.correct_order.indexOf(key)
  const tm = timer3(rev ? 'reveal' : 'question', S.timer)
  const pathRef = useRef<SVGPathElement>(null)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    tl.fromTo(q('.s3-q .w'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04 }, 0.1)
    if (!rev) {
      tl.fromTo(q('.orA-vine'), { strokeDashoffset: 2400 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 0.1)
        .fromTo(q('.orA-bud'), { scale: 0 }, { scale: 1, svgOrigin: '0 0', duration: 0.4, stagger: 0.2, ease: 'back.out(2)' }, 0.5)
        .fromTo(q('.or-place'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.15 }, 0.6)
        .fromTo(q('.or-card'), { opacity: 0, y: -30, rotation: -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' }, 0.8)
    } else if (!done) {
      const step = Ly.n > 5 ? 0.85 : 1.0
      S.correct_order.split('').forEach((key, j) => {
        const i = KEYS.indexOf(key), el = q(`.or-card[data-i="${i}"]`)[0], h = Ly.home[i], s = Ly.slot[j], at = 0.4 + j * step
        if (el) tl.fromTo(el, { x: 0, y: 0, rotation: i % 2 ? 3 : -3 }, { keyframes: [{ x: (s.x - h.x) * 0.5, y: (s.y - h.y) * 0.5 - 50, rotation: s.x > h.x ? 7 : -7, duration: step * 0.5, ease: 'sine.inOut' }, { x: s.x - h.x, y: s.y - h.y, rotation: 0, duration: step * 0.45, ease: 'power2.out' }] }, at)
        tl.fromTo(q(`.orA-stem[data-j="${j}"]`), { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 0.3 }, at + step * 0.75)
          .fromTo(q(`.orA-fl[data-j="${j}"]`), { scale: 0 }, { scale: 1, svgOrigin: '0 0', duration: 0.5, ease: 'back.out(2.2)' }, at + step * 0.8)
            .to(q(`.orA-bud[data-j="${j}"]`), { scale: 0, svgOrigin: '0 0', duration: 0.2 }, at + step * 0.75)
          .fromTo(q(`.or-pos[data-i="${i}"]`), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2.2)' }, at + step * 0.9)
      })
      tl.fromTo(q('.orA-light'), { strokeDashoffset: 2400 }, { strokeDashoffset: 0, duration: 0.4 + Ly.n * step, ease: 'none' }, 0.4)
        .fromTo(q('.s4-sl'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, 0.4 + Ly.n * step + 0.6)
    } else tl.fromTo(q('.s4-sl'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 0.5)
  }, tm, [state])
  const n = nOv ?? (tm ? nLive : null)
  const rects: Rect[] = [...Ly.home, ...Ly.slot].map(p => ({ x: p.x - Ly.cw / 2, y: p.y - Ly.ch / 2, w: Ly.cw, h: Ly.ch })).concat([{ x: 360, y: 40, w: 1200, h: 90 }])
  // лоза: плавная волна через места, от семени до цветка
  const pts: P[] = [{ x: 300, y: VY }, ...Ly.xs.map((x, j) => ({ x, y: VY + (j % 2 ? 12 : -12) })), { x: 1820, y: VY - 6 }]
  const vineD = pts.reduce((d, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${d} C ${(pts[i - 1].x + p.x) / 2} ${pts[i - 1].y} ${(pts[i - 1].x + p.x) / 2} ${p.y} ${p.x} ${p.y}`, '')
  return (
    <S1Screen rects={rects} n={n} rootRef={root} cls={`s3 or orA st-${rev ? 'reveal' : 'question'}${done ? ' done' : ''} n${Ly.n}`}>
      {head(S.title, S.qn, S.qcount)}
      <div className="s3-q or-q" style={S.media ? { left: 470, right: 240 } : undefined}>{S.text.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</div>
      {S.media && <figure className="or-media"><img src={hubble} alt="" /></figure>}
      <svg className="orA-back" viewBox="0 0 1920 1080" aria-hidden>
        <path className="orA-vine" d={vineD} /><path ref={pathRef} className="orA-light" d={vineD} />
        <g className="orA-seed" transform={`translate(300 ${VY})`}><ellipse rx="26" ry="17" /><path d="M -6 -14 C -2 -30 8 -34 16 -32" /></g>
        <g transform={`translate(1820 ${VY - 6})`}><g className="orA-flower">{Array.from({ length: 8 }, (_, k) => <g key={k} transform={`rotate(${k * 45})`}><ellipse cx="0" cy="-26" rx="12" ry="26" /></g>)}<circle r="11" /></g></g>
        {Ly.slot.map((s, j) => <g key={j} transform={`translate(${s.x} ${pts[j + 1].y})`}>
          <path className="orA-stem" data-j={j} d={`M 0 0 L 0 ${s.y + Ly.ch / 2 - pts[j + 1].y}`} />
          <ellipse className="orA-bud" data-j={j} rx="18" ry="22" cy="-6" />
          <g className="orA-fl" data-j={j} style={done ? { transform: 'scale(1)' } : undefined}>{Array.from({ length: 7 }, (_, k) => <g key={k} transform={`rotate(${k * 51.4})`}><ellipse cx="0" cy="-22" rx="11" ry="22" /></g>)}<circle r="9" /></g>
        </g>)}
      </svg>
      {Ly.slot.map((s, j) => <b key={j} className="or-place" style={{ left: s.x, top: VY + 38 }}>{j + 1}</b>)}
      {S.choices.map((c, i) => {
        const h = done ? Ly.slot[POS(c.key)] : Ly.home[i]
        return <div key={c.key} className={`or-card orA-card${lenCls(c.text)}${rev ? ' placed' : ''}`} data-i={i} style={{ left: h.x - Ly.cw / 2, top: h.y - Ly.ch / 2, width: Ly.cw, height: Ly.ch }}>
          <svg className="or-cardbg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={leaf} /></svg>
          <span className="key">{c.key}</span><span className="txt">{c.text}</span>
          {rev && <em className="or-pos" data-i={i}>{POS(c.key) + 1}</em>}
        </div>
      })}
      {rev && <TeamStrip rows={rowsFrom(S.correct_order.split(''), '')} top={968} />}
      <Timer n={n} total={S.timer} x={150} base={1040} size={170} rooted={120} />
    </S1Screen>
  )
}
