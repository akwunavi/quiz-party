// ═══ Лобби · Концепт B — «Полуночный праздник» ═══
// Тайный праздник на ночной поляне. Центр — Лунные ворота: плетёное кольцо на двух резных столбах, внутри — луна. От столбов
// веером расходятся три верёвки с огоньками; на них висят фонари-«бутоны» команд. Логотип — светящаяся надпись, подвешенная
// на гирлянде над поляной. Новая команда: ворота вспыхивают, из лунного круга по воздуху летит искра, у верёвки она
// раскручивает шнур, и на нём раскрывается фонарь; чем больше фонарей, тем больше огней на кольце, верёвках и дорожке.
import { useMemo, useRef } from 'react'
import { useEntrance, type S1Props, type S1Api } from '../../stage1/common'
import { ForestBackdrop } from '../../stage1/env'
import { Qr } from '../../../magic2/common'
import { preset, nameFs, tcol, type T5 } from './core'
import { RzLayer, rzBuild, useRzTicker, type RzCfg } from './Rz'
import { HandoffTitle, handoffTl } from './Handoff'

const GATE = { x: 960, y: 592, rx: 250, ry: 270 }, PL = 704, PR = 1216
/** три верёвки на сторону: старт на столбе, конец за краем экрана */
const ROPES = [{ py: 322, ey: 200 }, { py: 474, ey: 420 }, { py: 626, ey: 630 }]
const ropeY = (side: -1 | 1, k: number, x: number) => { const r = ROPES[k], px = side < 0 ? PL : PR, ex = side < 0 ? -30 : 1950, t = (x - px) / (ex - px); return r.py + (r.ey - r.py) * t + Math.sin(t * Math.PI) * 38 }
export type SlotB = { x: number; y: number; ay: number; side: -1 | 1; k: number; col: number; sc: number }
/** места: слева/справа поочерёдно, внутренний столбец раньше внешнего; на верёвке висит фонарь, имя — снаружи от него */
export function slotsB(n: number): SlotB[] {
  const out: SlotB[] = []
  for (let i = 0; i < n; i++) {
    const side: -1 | 1 = i % 2 ? 1 : -1, j = Math.floor(i / 2), col = n <= 6 ? 0 : Math.floor(j / 3), k = n <= 6 ? j % 3 : j % 3
    const cx = n <= 6 ? (side < 0 ? 580 : 1340) : side < 0 ? (col === 0 ? 570 : 270) : (col === 0 ? 1350 : 1650)
    const ay = ropeY(side, k, cx)
    out.push({ x: cx, y: ay, ay, side, k, col, sc: n <= 6 ? 1.15 : 0.8 })
  }
  return out
}
const ADV: Record<string, number> = { Q: 0.735, U: 0.694, I: 0.304, Z: 0.599, ' ': 0.25, P: 0.577, A: 0.647, R: 0.616, T: 0.575, Y: 0.638 }
const swagY = (x: number) => { const t = (x - 380) / 1160; return 66 + Math.sin(Math.max(0, Math.min(1, t)) * Math.PI) * 54 }
const LOGO = (() => { const fs = 170, sp = 12, w = [...'QUIZ PARTY'].reduce((a, c) => a + ADV[c] * fs + sp, -sp); let x = 960 - w / 2; return [...'QUIZ PARTY'].flatMap((c, i) => { const cx = x + (ADV[c] * fs) / 2; x += ADV[c] * fs + sp; return c === ' ' ? [] : [{ c, i, x: cx }] }) })()
const compComet = (s: SlotB) => `M ${GATE.x} ${GATE.y} C ${GATE.x + (s.x - GATE.x) * 0.2} ${GATE.y - 260}, ${s.x - (s.x - GATE.x) * 0.35} ${s.ay - 180}, ${s.x} ${s.ay}`

function Lantern({ hue, id }: { hue: number; id: string }) {
  const c1 = `hsl(${hue} 90% 88%)`, c2 = `hsl(${hue} 78% 62%)`, c3 = `hsl(${hue} 60% 26%)`
  return <svg className="b-lan" viewBox="-60 0 120 170" aria-hidden>
    <defs>
      <radialGradient id={`bl-${id}`} cx="50%" cy="58%" r="60%"><stop offset="0" stopColor="#fffdf0" /><stop offset=".22" stopColor={c1} /><stop offset=".62" stopColor={c2} /><stop offset="1" stopColor={c3} /></radialGradient>
      <radialGradient id={`bg-${id}`}><stop offset="0" stopColor={`hsl(${hue} 95% 76%)`} stopOpacity=".65" /><stop offset="1" stopColor={`hsl(${hue} 95% 60%)`} stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse className="glow" cx="0" cy="92" rx="92" ry="98" fill={`url(#bg-${id})`} />
    <g className="cordg"><line className="cord" x1="0" y1="0" x2="0" y2="34" stroke="#c9a566" strokeWidth="2.4" /></g>
    <g transform="translate(0 34)"><g className="lbody">
      <ellipse cx="0" cy="4" rx="13" ry="5" fill="#8a6428" stroke="#d9b36a" strokeWidth="1.6" />
      <path d="M 0 8 C 32 12 46 54 31 96 C 23 116 9 128 0 134 C -9 128 -23 116 -31 96 C -46 54 -32 12 0 8 Z" fill={`url(#bl-${id})`} stroke="#d9b36a" strokeWidth="2" />
      <g className="ribs" fill="none" stroke="#d9b36a" strokeWidth="1.8" opacity=".85"><path d="M 0 8 C 14 40 14 100 0 134" /><path d="M 0 8 C -14 40 -14 100 0 134" /><path d="M 0 8 C 28 40 30 96 0 134" /><path d="M 0 8 C -28 40 -30 96 0 134" /></g>
      <ellipse cx="-14" cy="44" rx="6" ry="14" fill="#fff" opacity=".35" transform="rotate(14 -14 44)" />
      <path d="M -10 136 L 0 156 L 10 136 Z" fill="#d9b36a" opacity=".9" /><path d="M -18 130 L -14 150 L -6 134 Z M 18 130 L 14 150 L 6 134 Z" fill="#b88c46" opacity=".8" />
    </g></g>
  </svg>
}
const SIGIL_B: RzCfg['Sigil'] = ({ hue, gi, size }) => <div className="b-sg" style={{ height: size }}><Lantern hue={hue} id={`sg${gi}`} /></div>
export const CFG_B: RzCfg = {
  cls: 'rz-B',
  // карусель: имена облетают Лунные ворота эллипсом и по очереди опускаются в команды
  swirl: (i, s, o, K) => { const a = o * Math.PI * 2 + s * Math.PI * 6; return { x: 1030 + Math.cos(a) * (K === 8 ? 760 : 700), y: 540 + Math.sin(a) * 230 - Math.sin(s * Math.PI) * 30 } },
  layout: (gi, K) => K === 4 ? { cx: 1100 + (gi - 1.5) * 410, names: 650, sigil: 330, size: 190, pitch: 52 } : { cx: 1100 + ((gi % 4) - 1.5) * 410, names: gi < 4 ? 420 : 780, sigil: gi < 4 ? 210 : 570, size: 140, pitch: 44 },
  Sigil: SIGIL_B,
}

export function ConceptB({ state, onReady }: S1Props) {
  const P = preset(state), slots = useMemo(() => slotsB(P.n), [P.n])
  const apiRef = useRef<S1Api | null>(null), pills = useRef<HTMLElement[]>([])
  const K = P.rz ?? 0
  useRzTicker(apiRef, pills, K as 0 | 4 | 8, P.rzMode, CFG_B)
  const lit0 = Math.min(24, 4 + Math.min(P.from, P.n) * 2)
  const ring = useMemo(() => Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2 - Math.PI / 2; return { x: GATE.x + Math.cos(a) * GATE.rx, y: GATE.y + Math.sin(a) * GATE.ry } }), [])
  const bulbs = useMemo(() => [-1, 1].flatMap(side => ROPES.flatMap((_, k) => Array.from({ length: 9 }, (_, j) => { const px = side < 0 ? PL : PR, x = px + side * (40 + j * 76); return { x, y: ropeY(side as -1 | 1, k, x) + 4, o: (k * 9 + j + (side < 0 ? 0 : 1)) } }))).sort((a, b) => a.o - b.o), [])
  const stones = useMemo(() => Array.from({ length: 9 }, (_, i) => { const t = i / 8; return { x: 960 + (i % 2 ? 14 : -14) * (1 - t * 0.4), y: 1040 - t * 190, w: 120 - t * 70, h: 24 - t * 12 } }), [])
  const { root } = useEntrance(a => { apiRef.current = a; onReady(a) }, (tl, q) => {
    const T0 = 2.6, n = P.n
    tl.fromTo(q('.b-bg'), { opacity: 0 }, { opacity: 1, duration: 1.0 }, 0)
      .fromTo(q('.b-moon'), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out', transformOrigin: '0px 0px' }, 0.2)
      .fromTo(q('.b-ringg'), { opacity: 0 }, { opacity: 1, duration: 1.0 }, 0.5)
      .fromTo(q('.b-rb'), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: { each: 0.045, from: 'start' }, ease: 'back.out(3)', transformOrigin: '0px 0px' }, 0.8)
      .fromTo(q('.b-swag, .b-cordL'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.0)
      .fromTo(q('.b-letter'), { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(1.6)' }, 1.2)
      .fromTo(q('.b-letter-glow'), { opacity: 0.2 }, { opacity: 1, duration: 1.0, stagger: 0.05 }, 1.9)
      .fromTo(q('.b-stand'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.9)
      .fromTo(q(P.rules || P.rz ? '.b-wait' : '.b-wait, .b-count'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2)
      .fromTo(q(P.rz ? '.none' : '.b-team.settled'), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.06 }, 0.9)
    const arr = slots.map((_, i) => i).filter(i => i >= P.from && i < n)
    arr.forEach((i, k) => {
      const at = T0 + k * P.gap, tm = `.b-team[data-i="${i}"]`, lit = Math.min(24, 4 + (P.from + k + 1) * 2)
      tl.fromTo(q('.b-moon'), { filter: 'brightness(1)' }, { filter: 'brightness(1.16)', duration: 0.3, yoyo: true, repeat: 1 }, at)
        .fromTo(q('.b-rb'), { scale: 1 }, { scale: 1.9, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.012, transformOrigin: '0px 0px' }, at)
        .to(q('.b-rb.on'), { opacity: 1, duration: 0.01 }, at)
        .fromTo(q(`.b-spark[data-i="${i}"]`), { strokeDashoffset: 0.08, opacity: 1 }, { strokeDashoffset: -1.0, duration: 0.85, ease: 'power1.inOut' }, at + 0.15)
        .to(q(`.b-spark[data-i="${i}"]`), { opacity: 0, duration: 0.2 }, at + 0.85)
        .fromTo(q(`${tm} .cordg`), { scaleY: 0 }, { scaleY: 1, duration: 0.45, ease: 'power2.out', transformOrigin: '0px 0px' }, at + 0.9)
        .fromTo(q(`${tm} .lbody`), { scale: 0.18, opacity: 0, y: -10 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', transformOrigin: '0px 0px' }, at + 1.2)
        .fromTo(q(`${tm} .ribs`), { scaleX: 0.2 }, { scaleX: 1, duration: 0.7, ease: 'power2.out', transformOrigin: '0px 0px' }, at + 1.3)
        .fromTo(q(`${tm} .glow`), { opacity: 0 }, { opacity: 1, duration: 0.9 }, at + 1.4)
        .fromTo(q(`${tm} .b-lan`), { rotation: -5 }, { rotation: 0, duration: 1.6, ease: 'elastic.out(1,0.35)', transformOrigin: '50% 0%' }, at + 1.7)
        .fromTo(q(`${tm} .nm`), { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power1.inOut' }, at + 1.8)
      // свет по кольцу, верёвкам, дорожке
      tl.to(q('.b-rb'), { opacity: (j: number) => (j < lit ? 1 : 0.28), duration: 0.5 }, at + 0.3)
    })
    if (arr.length) tl.fromTo(q('.b-count b'), { scale: 1.8, color: '#ffe2a0' }, { scale: 1, color: '#f4fffa', duration: 0.5 }, T0 + 1.9)
    if (P.dead) {
      const i = P.teams.findIndex(t => t.id === P.dead), tm = `.b-team[data-i="${i}"]`
      tl.to(q(`${tm} .glow`), { opacity: 0.08, duration: 1.0 }, 2.2).to(q(`${tm} .lbody`), { filter: 'saturate(.2) brightness(.45)', y: 10, duration: 1.2 }, 2.2)
        .to(q(`${tm} .nm`), { opacity: 0.38, duration: 1.0 }, 2.2)
    }
    if (P.qrLit) tl.fromTo(q('.b-stand'), { '--lit': 0 }, { '--lit': 1, duration: 1.1 }, 1.2).fromTo(q('.b-aura'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, transformOrigin: '50% 50%' }, 1.2)
    if (P.locked) {
      tl.to(q('.b-rb'), { opacity: 1, duration: 0.8, stagger: 0.03 }, 1.2).fromTo(q('.b-gold'), { opacity: 0 }, { opacity: 1, duration: 1.4 }, 1.2)
        .to(q('.b-lan .glow'), { opacity: 1, scale: 1.12, duration: 1.0, transformOrigin: '50% 50%' }, 1.4)
        .fromTo(q('.b-ready'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2)
    }
    if (P.rules) {
      // фонари уходят в ворота; верёвки, огни и логотип гаснут; луна поднимается и растворяется в небе, ворота оседают в траву
      tl.to(q('.b-team .nm'), { opacity: 0, duration: 0.7 }, 1.0)
        .to(q('.b-team'), { x: (i: number) => (960 - slots[i].x) * 0.9, y: (i: number) => (GATE.y - slots[i].y) * 0.9, scale: 0.15, opacity: 0, duration: 1.5, stagger: 0.06, ease: 'power2.in', transformOrigin: '0px 0px' }, 1.1)
        .to(q('.b-stand, .b-count, .b-ready'), { opacity: 0, y: 40, duration: 0.9 }, 1.6)
        .to(q('.b-bulb, .b-ropes, .b-stones'), { opacity: 0, duration: 1.0 }, 2.2)
        .to(q('.b-logo'), { opacity: 0, y: -80, duration: 1.0, ease: 'power2.in' }, 2.4)
        .to(q('.b-rb'), { opacity: 0, duration: 0.8, stagger: 0.02 }, 2.5)
        .to(q('.b-moon'), { scale: 1.5, y: -130, opacity: 0, duration: 1.8, ease: 'power2.in', transformOrigin: '0px 0px' }, 3.0)
        .to(q('.b-ringg'), { y: 100, opacity: 0, duration: 1.6, ease: 'power2.in' }, 3.4)
        .to(q('.b-grade'), { opacity: 0, duration: 1.4 }, 3.6)
      handoffTl(tl, q, 4.6)
    }
    if (K && P.rzMode) rzBuild(tl, q, K as 4 | 8, P.rzMode, '.b-team, .b-count, .b-ropes, .b-bulb', at => { tl.fromTo(q('.b-moon'), { filter: 'brightness(1)' }, { filter: 'brightness(1.16)', duration: 0.3, yoyo: true, repeat: 1 }, at).fromTo(q('.b-rb'), { scale: 1 }, { scale: 1.8, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.01, transformOrigin: '0px 0px' }, at) })
    tl.to({}, { duration: 1.0 }, P.rules ? 6.6 : Math.max(T0 + arr.length * P.gap + 2.4, 3.0))
  }, null, [state])
  const nm = nameFs(P.n)
  return (
    <div className="lb3 lb3-b s1" ref={root}>
      <ForestBackdrop rects={[]} hazeK={0} />
      <div className="b-grade" />
      <svg className="lb3-bg b-bg" viewBox="0 0 1920 1080" aria-hidden>
        <defs>
          <linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#020a14" /><stop offset=".5" stopColor="#042019" /><stop offset=".8" stopColor="#0a3a2c" /><stop offset="1" stopColor="#031510" /></linearGradient>
          <radialGradient id="bMoonG"><stop offset="0" stopColor="#fff7dc" stopOpacity=".95" /><stop offset=".3" stopColor="#ffe6a8" stopOpacity=".5" /><stop offset="1" stopColor="#ffe6a8" stopOpacity="0" /></radialGradient>
          <radialGradient id="bMoon" cx="40%" cy="38%" r="70%"><stop offset="0" stopColor="#fffdf2" /><stop offset=".6" stopColor="#f3e2ae" /><stop offset="1" stopColor="#c9b27a" /></radialGradient>
          <linearGradient id="bWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1a0f08" /><stop offset=".35" stopColor="#6b4526" /><stop offset=".6" stopColor="#4a2e18" /><stop offset="1" stopColor="#140b06" /></linearGradient>
          <linearGradient id="bGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a3a2c" /><stop offset=".6" stopColor="#062a20" /><stop offset="1" stopColor="#020f0b" /></linearGradient>
          <linearGradient id="bText" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffbe6" /><stop offset=".5" stopColor="#ffe29a" /><stop offset="1" stopColor="#f0b350" /></linearGradient>
          <radialGradient id="bPool"><stop offset="0" stopColor="#ffd98a" stopOpacity=".5" /><stop offset="1" stopColor="#ffd98a" stopOpacity="0" /></radialGradient>
          <radialGradient id="bGoldG"><stop offset="0" stopColor="#ffd68a" stopOpacity=".3" /><stop offset="1" stopColor="#ffd68a" stopOpacity="0" /></radialGradient>
          <radialGradient id="bWarm" cx="50%" cy="55%" r="55%"><stop offset="0" stopColor="#ffd68a" stopOpacity=".34" /><stop offset="1" stopColor="#ffd68a" stopOpacity="0" /></radialGradient>
          <filter id="bBlur"><feGaussianBlur stdDeviation="14" /></filter><filter id="bBlur2"><feGaussianBlur stdDeviation="5" /></filter>
          <filter id="bNoise" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.3" numOctaves="3" seed="3" /><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.4 -1" /></filter>
        </defs>
        {/* луна и её свет */}
        <circle cx={GATE.x} cy={GATE.y} r="430" fill="url(#bMoonG)" opacity=".5" />
        <g transform={`translate(${GATE.x} ${GATE.y})`}><g className="b-moon">
          <circle r="210" fill="url(#bMoon)" />
          <circle cx="-70" cy="-50" r="34" fill="#cdb67f" opacity=".5" /><circle cx="50" cy="40" r="52" fill="#cdb67f" opacity=".38" /><circle cx="-20" cy="96" r="22" fill="#cdb67f" opacity=".45" /><circle cx="94" cy="-84" r="20" fill="#cdb67f" opacity=".4" />
        </g></g>
        {/* земля, дорожка из тёплых камней */}
        {stones.map((s, i) => <g className="b-stones" key={i}><ellipse cx={s.x} cy={s.y} rx={s.w} ry={s.h} fill="#17352c" stroke="#0a1d17" strokeWidth="2" /><ellipse className="b-stone" cx={s.x} cy={s.y} rx={s.w * 0.9} ry={s.h * 0.8} fill="url(#bPool)" opacity={i < 2 + (P.n / 12) * 7 ? 0.9 : 0.18} /></g>)}
        {/* Лунные ворота: столбы и плетёное кольцо */}
        <g className="b-ringg">
          {[PL, PR].map((x, i) => <g key={i}><rect x={x - 32} y="250" width="64" height="590" rx="14" fill="url(#bWood)" />
            {[0, 1, 2, 3, 4, 5, 6].map(j => <path key={j} d={`M ${x - 32} ${300 + j * 80} h 64`} stroke="#0a0502" strokeWidth="3" opacity=".6" />)}
            <rect x={x - 32} y="250" width="64" height="590" rx="14" filter="url(#bNoise)" opacity=".5" />
            <rect x={x - 42} y="236" width="84" height="26" rx="10" fill="#8a6428" stroke="#d9b36a" strokeWidth="2.4" /><rect x={x - 42} y="826" width="84" height="26" rx="10" fill="#8a6428" stroke="#d9b36a" strokeWidth="2.4" /></g>)}
          <ellipse cx={GATE.x} cy={GATE.y} rx={GATE.rx} ry={GATE.ry} fill="none" stroke="#0e0804" strokeWidth="38" />
          <ellipse cx={GATE.x} cy={GATE.y} rx={GATE.rx} ry={GATE.ry} fill="none" stroke="url(#bWood)" strokeWidth="30" />
          {[0, 1, 2].map(j => <ellipse key={j} cx={GATE.x} cy={GATE.y} rx={GATE.rx + (j - 1) * 7} ry={GATE.ry + (j - 1) * 7} fill="none" stroke={j === 1 ? '#9b6a3a' : '#2f1c0e'} strokeWidth="3" strokeDasharray={j === 1 ? '70 22' : '40 40'} opacity=".8" />)}
          {ring.filter((_, i) => i % 2 === 0).map((p, i) => <g key={`l${i}`} transform={`translate(${p.x} ${p.y}) rotate(${(i * 47) % 360})`}><ellipse cx="14" cy="-6" rx="15" ry="6" fill="#2f7a4a" stroke="#144a2a" strokeWidth="1.2" /><ellipse cx="-12" cy="7" rx="12" ry="5" fill="#3f9a5c" stroke="#144a2a" strokeWidth="1.2" /></g>)}
          {ring.map((p, i) => <g key={i} transform={`translate(${p.x} ${p.y})`}><circle className={`b-rb${i < lit0 ? ' on' : ''}`} r="8" fill="#ffe2a0" opacity={i < lit0 ? 1 : 0.28} style={{ filter: 'drop-shadow(0 0 7px #ffc766)' }} /></g>)}
        </g>
        {/* верёвки с огоньками */}
        <g className="b-ropes" fill="none" stroke="#c9a566" strokeWidth="2.4" opacity=".85">
          {[-1, 1].flatMap(side => ROPES.map((_, k) => { const px = side < 0 ? PL : PR, ex = side < 0 ? -30 : 1950; const pts = Array.from({ length: 21 }, (_, j) => { const x = px + (ex - px) * (j / 20); return `${x.toFixed(0)} ${ropeY(side as -1 | 1, k, x).toFixed(0)}` }); return <path key={`${side}${k}`} d={`M ${pts.join(' L ')}`} /> }))}
        </g>
        {bulbs.map((b, i) => <circle key={i} className="b-bulb" cx={b.x} cy={b.y} r="4.5" fill="#ffe2a0" opacity={i < 10 + P.n * 4 ? 0.9 : 0.25} style={{ filter: 'drop-shadow(0 0 6px #ffc766)' }} />)}
        {slots.map((s, i) => <ellipse key={`p${i}`} cx={s.x} cy={s.y + 80} rx="140" ry="120" fill="url(#bPool)" opacity=".35" />)}
        <g className="b-gold" opacity="0"><ellipse cx="960" cy={GATE.y} rx="980" ry="500" fill="url(#bGoldG)" /></g>
        {/* спарки: путь из лунного круга к верёвке */}
        {slots.map((s, i) => i >= P.from && <path key={`k${i}`} className="b-spark" data-i={i} d={compComet(s)} pathLength={1} fill="none" stroke="#fff6cf" strokeWidth="7" strokeLinecap="round" strokeDasharray="0.07 1.2" opacity="0" style={{ filter: 'drop-shadow(0 0 10px #ffd37a)' }} />)}
        {/* логотип на гирлянде */}
        <g className="b-logo">
          <path className="b-swag" d="M 380 66 C 640 140 1280 140 1540 66" fill="none" stroke="#c9a566" strokeWidth="3" />
          {Array.from({ length: 15 }, (_, i) => { const t = i / 14, x = 380 + t * 1160, y = 66 + Math.sin(t * Math.PI) * 54 + 4; return <circle key={i} className="b-swag" cx={x} cy={y + 2} r="5" fill="#ffe2a0" style={{ filter: 'drop-shadow(0 0 6px #ffc766)' }} /> })}
          {LOGO.map(l => <g key={l.i}>
            <line className="b-cordL" x1={l.x} y1={swagY(l.x) + 2} x2={l.x} y2="112" stroke="#c9a566" strokeWidth="2" />
            <text className="b-letter-glow" x={l.x} y="214" textAnchor="middle" fontFamily="Philosopher, sans-serif" fontWeight="700" fontSize="170" fill="#ffd98a" filter="url(#bBlur2)" opacity=".85">{l.c}</text>
            <text className="b-letter" x={l.x} y="214" textAnchor="middle" fontFamily="Philosopher, sans-serif" fontWeight="700" fontSize="170" fill="url(#bText)" stroke="#8a5a22" strokeWidth="3">{l.c}</text>
          </g>)}
        </g>
      </svg>
      {/* стенд с QR: ровная светлая плита на резном стенде с фонарём */}
      <div className="b-stand" style={{ left: 64, top: 806, ['--lit' as string]: P.qrLit || P.rz ? 1 : 0.3 }}>
        <svg viewBox="0 0 270 270" aria-hidden>
          <ellipse className="b-aura" cx="135" cy="125" rx="200" ry="170" fill="url(#bPool)" opacity={P.qrLit || P.rz ? 1 : 0} />
          <rect x="14" y="6" width="242" height="256" rx="18" fill="#2a1a0e" stroke="#d9b36a" strokeWidth="4" />
          <rect x="14" y="6" width="242" height="256" rx="18" fill="none" stroke="#ffe2a0" strokeWidth="2" opacity="var(--lit)" style={{ filter: 'drop-shadow(0 0 8px #ffc766)' }} />
          {[34, 80, 135, 190, 236].map((x, i) => <circle key={i} cx={x} cy={i % 2 ? 16 : 20} r="4.5" fill="#ffe2a0" opacity=".75" style={{ filter: 'drop-shadow(0 0 5px #ffc766)' }} />)}
        </svg>
        <div className="b-qrbox"><Qr size={184} ink="#0d1a15" /></div>
        <div className="b-qrcap">Сканируй, чтобы играть</div>
      </div>
      {/* команды: фонарь на шнуре от верёвки, имя снаружи */}
      {slots.map((s, i) => { const t: T5 = P.teams[i], settled = i < P.from
        return <div key={t.id} className={`b-team${settled ? ' settled' : ''} side${s.side < 0 ? 'L' : 'R'}`} data-i={i} style={{ left: s.x, top: s.ay, ['--tc' as string]: tcol(t.hue), ['--sc' as string]: s.sc, ['--nm' as string]: `${t.name.length > 26 ? Math.round(nm * 0.84) : nm}px`, ['--nw' as string]: P.n <= 6 ? '270px' : '204px' }}>
          <Lantern hue={t.hue} id={t.id} /><div className="nm"><span>{t.name}</span></div>
        </div> })}
      {P.n === 0 && <div className="b-wait"><b>Праздник вот-вот начнётся</b><span>Сканируйте код слева — ворота откроются для вашей команды</span></div>}
      {P.n > 0 && !P.rz && !P.locked && <div className="b-count">Огней на празднике: <b>{P.n}</b></div>}
      {P.locked && <div className="b-ready">Все в сборе · состав закрыт</div>}
      {P.rules && <HandoffTitle />}
      {K > 0 && P.rzMode && <><div className="rz-veil rz-vB" /><RzLayer K={K as 4 | 8} cfg={CFG_B} pills={pills} /></>}
      {P.rzMode === 'back' && <button type="button" className="lb3-grp-btn">СОСТАВЫ КОМАНД</button>}
    </div>
  )
}
