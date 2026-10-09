// ═══ Лобби · Концепт C — «Зеркальное озеро» ═══
// Озеро узнаёт каждую команду. Над водой висят светящиеся буквы QUIZ PARTY, под горизонтом они отражаются; отражение
// колышется. Новая команда — падающая из неба искра: у воды она рисует кольца, и из них поднимается светящийся шар цвета
// команды, имя проступает над гладью. Чем больше команд, тем больше колец на воде и ярче горизонт.
import { useEffect, useMemo, useRef } from 'react'
import { useEntrance, type S1Props, type S1Api } from '../../stage1/common'
import { ForestBackdrop } from '../../stage1/env'
import { Qr } from '../../../magic2/common'
import { preset, rnd, nameFs, tcol, type T5, type Pt } from './core'
import { RzLayer, rzBuild, useRzTicker, type RzCfg } from './Rz'
import { HandoffTitle, handoffTl } from './Handoff'

const HZ = 500
/** места на воде: ряды уходят вглубь (дальние — меньше и выше) */
export function slotsC(n: number): Pt[] {
  if (n === 0) return []
  const rows = n <= 4 ? 1 : n <= 8 ? 2 : 3
  const ys = rows === 1 ? [770] : rows === 2 ? [712, 884] : [650, 790, 930]
  const sc = rows === 1 ? [1.28] : rows === 2 ? [0.96, 1.1] : [0.8, 0.92, 1.02]
  const out: Pt[] = []
  for (let i = 0; i < n; i++) {
    const r = i % rows, col = Math.floor(i / rows), m = Math.ceil((n - r) / rows)
    const gap = Math.min(380, 1400 / m), off = rows > 1 && r % 2 ? gap * 0.22 : 0
    out.push({ x: 1140 + (col - (m - 1) / 2) * gap + off, y: ys[r], s: sc[r] })
  }
  return out
}
const LOGO_X = (() => { const adv: Record<string, number> = { Q: 0.735, U: 0.694, I: 0.304, Z: 0.599, ' ': 0.25, P: 0.577, A: 0.647, R: 0.616, T: 0.575, Y: 0.638 }, fs = 190, sp = 14, w = [...'QUIZ PARTY'].reduce((a, c) => a + adv[c] * fs + sp, -sp); let x = 1010 - w / 2; return [...'QUIZ PARTY'].flatMap((c, i) => { const cx = x + (adv[c] * fs) / 2; x += adv[c] * fs + sp; return c === ' ' ? [] : [{ c, i, x: cx }] }) })()

function Orb({ hue, id }: { hue: number; id: string }) {
  const c1 = `hsl(${hue} 90% 90%)`, c2 = `hsl(${hue} 78% 62%)`, c3 = `hsl(${hue} 62% 26%)`
  return <svg className="c-orb" viewBox="-80 -64 160 190" aria-hidden>
    <defs>
      <radialGradient id={`co-${id}`} cx="38%" cy="32%" r="75%"><stop offset="0" stopColor="#fffff4" /><stop offset=".2" stopColor={c1} /><stop offset=".6" stopColor={c2} /><stop offset="1" stopColor={c3} /></radialGradient>
      <radialGradient id={`cg-${id}`}><stop offset="0" stopColor={`hsl(${hue} 95% 76%)`} stopOpacity=".6" /><stop offset="1" stopColor={`hsl(${hue} 95% 60%)`} stopOpacity="0" /></radialGradient>
    </defs>
    <g className="rings" fill="none" stroke={`hsl(${hue} 80% 76%)`} strokeWidth="2">
      <ellipse className="rg" cx="0" cy="40" rx="48" ry="11" opacity=".55" /><ellipse className="rg" cx="0" cy="40" rx="70" ry="16" opacity=".32" /><ellipse className="rg" cx="0" cy="40" rx="94" ry="22" opacity=".16" />
    </g>
    <g transform="translate(0 40)"><g className="refl"><ellipse cx="0" cy="26" rx="26" ry="30" fill={`url(#co-${id})`} opacity=".3" style={{ filter: 'blur(3px)' }} /></g></g>
    <ellipse className="glow" cx="0" cy="4" rx="84" ry="78" fill={`url(#cg-${id})`} />
    <g transform="translate(0 6)"><g className="ball"><circle r="31" fill={`url(#co-${id})`} /><ellipse cx="-11" cy="-13" rx="9" ry="5.5" fill="#fff" opacity=".6" transform="rotate(-30 -11 -13)" /><path d="M -22 14 C -8 26 12 26 24 12" fill="none" stroke="#fff" strokeWidth="2" opacity=".28" /></g></g>
    <g transform="translate(0 40)"><g className="drops">{[[-26, -30], [-8, -48], [14, -40], [30, -22]].map(([x, y], i) => <circle key={i} className="dr" cx={x} cy={y} r={3 + (i % 2)} fill={`hsl(${hue} 90% 86%)`} opacity="0" />)}</g></g>
  </svg>
}
const SIGIL_C: RzCfg['Sigil'] = ({ hue, gi, size }) => <div className="c-sg" style={{ height: size }}><Orb hue={hue} id={`sg${gi}`} /></div>
export const CFG_C: RzCfg = {
  cls: 'rz-C',
  // водоворот: имена всплывают из озера и кружатся по эллипсу, сужающемуся к центру
  swirl: (i, s, o, K) => { const a = o * Math.PI * 2 + s * Math.PI * 7, rr = (K === 8 ? 720 : 680) * (1 - 0.18 * s); return { x: 1110 + Math.cos(a) * rr, y: 700 + Math.sin(a) * rr * 0.2 - Math.sin(s * Math.PI) * 60 } },
  layout: (gi, K) => K === 4 ? { cx: 1100 + (gi - 1.5) * 410, names: 650, sigil: 340, size: 190, pitch: 52 } : { cx: 1100 + ((gi % 4) - 1.5) * 410, names: gi < 4 ? 420 : 780, sigil: gi < 4 ? 215 : 575, size: 140, pitch: 44 },
  Sigil: SIGIL_C,
}

export function ConceptC({ state, onReady }: S1Props) {
  const P = preset(state), slots = useMemo(() => slotsC(P.n), [P.n])
  const apiRef = useRef<S1Api | null>(null), pills = useRef<HTMLElement[]>([]), reflRef = useRef<HTMLCanvasElement>(null)
  const K = P.rz ?? 0
  useRzTicker(apiRef, pills, K as 0 | 4 | 8, P.rzMode, CFG_C)
  const far = useMemo(() => Array.from({ length: 30 }, (_, i) => ({ x: 360 + i * 54 + rnd(i) * 30, h: 40 + rnd(i + 3) * 70 })), [])
  const glints = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ x: 380 + rnd(i) * 1460, y: HZ + 14 + Math.pow(rnd(i + 31), 1.7) * 520, w: 40 + rnd(i + 5) * 150 })), [])
  const reeds = useMemo(() => Array.from({ length: 34 }, (_, i) => ({ x: 1590 + rnd(i) * 360, h: 100 + rnd(i + 7) * 190, lean: (rnd(i + 3) - 0.5) * 50 })), [])
  const spores = useMemo(() => Array.from({ length: 22 }, (_, i) => ({ x: 380 + rnd(i + 70) * 1500, y: 90 + rnd(i + 80) * 380, r: 2 + rnd(i + 3) * 3.2 })), [])
  const { root } = useEntrance(a => { apiRef.current = a; onReady(a) }, (tl, q) => {
    const T0 = 3.0, n = P.n
    tl.fromTo(q('.c-bg'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0)
      .fromTo(q('.c-hglow'), { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0.4)
      .fromTo(q('.c-letter'), { opacity: 0, y: 36, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power2.out', transformOrigin: '50% 100%' }, 1.0)
      .fromTo(q('.c-lglow'), { opacity: 0 }, { opacity: 0.9, duration: 1.2, stagger: 0.06 }, 1.6)
      .fromTo(q('.c-refl-logo'), { opacity: 0 }, { opacity: 1, duration: 1.6 }, 1.5)
      .fromTo(q('.c-ripple-d'), { attr: { scale: 60 } }, { attr: { scale: 16 }, duration: 2.4, ease: 'power2.out' }, 1.2)
      .fromTo(q('.c-stele'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.9)
      .fromTo(q(P.rules || P.rz ? '.c-wait' : '.c-wait, .c-count'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2)
      .fromTo(q(P.rz ? '.none' : '.c-team.settled'), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.06 }, 0.9)
      .fromTo(q('.c-spore'), { opacity: 0 }, { opacity: 1, duration: 1.4, stagger: 0.04 }, 1.0)
    const arr = slots.map((_, i) => i).filter(i => i >= P.from && i < n)
    arr.forEach((i, k) => {
      const at = T0 + k * P.gap, tm = `.c-team[data-i="${i}"]`
      tl.fromTo(q(`.c-fall[data-i="${i}"]`), { strokeDashoffset: 0.1, opacity: 1 }, { strokeDashoffset: -1.0, duration: 0.8, ease: 'power2.in' }, at)
        .to(q(`.c-fall[data-i="${i}"]`), { opacity: 0, duration: 0.15 }, at + 0.8)
        .fromTo(q('.c-ripple-d'), { attr: { scale: 16 } }, { attr: { scale: 42 }, duration: 0.5, yoyo: true, repeat: 1 }, at + 0.75)
        .fromTo(q(`${tm} .rg`), { scale: 0.05, opacity: 0.9 }, { scale: 1, opacity: (j: number) => [0.55, 0.32, 0.16][j], duration: 1.6, stagger: 0.18, ease: 'power2.out', transformOrigin: '0px 0px' }, at + 0.8)
        .fromTo(q(`${tm} .ball`), { scale: 0.1, y: 30, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.6)', transformOrigin: '0px 0px' }, at + 1.05)
        .fromTo(q(`${tm} .refl`), { opacity: 0 }, { opacity: 1, duration: 1.0 }, at + 1.3)
        .fromTo(q(`${tm} .glow`), { opacity: 0 }, { opacity: 1, duration: 1.0 }, at + 1.2)
        .fromTo(q(`${tm} .dr`), { opacity: 1, y: 0 }, { opacity: 0, y: (j: number) => -26 - j * 6, duration: 0.7, ease: 'power2.out', stagger: 0.05 }, at + 1.0)
        .fromTo(q(`${tm} .nm`), { opacity: 0, y: 14, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' }, at + 1.5)
        .to(q('.c-hglow'), { opacity: 0.55 + 0.45 * Math.min(1, (P.from + k + 1) / 12), duration: 1.2 }, at + 1.0)
    })
    if (arr.length) tl.fromTo(q('.c-count b'), { scale: 1.8, color: '#ffe2a0' }, { scale: 1, color: '#f4fffa', duration: 0.5 }, T0 + 1.9)
    if (P.dead) {
      const i = P.teams.findIndex(t => t.id === P.dead), tm = `.c-team[data-i="${i}"]`
      tl.to(q(`${tm} .glow`), { opacity: 0.06, duration: 1.0 }, 2.2).to(q(`${tm} .ball`), { y: 16, scale: 0.8, filter: 'saturate(.2) brightness(.45)', duration: 1.4, transformOrigin: '0px 0px' }, 2.2)
        .to(q(`${tm} .rg`), { opacity: 0.05, duration: 1.0 }, 2.2).to(q(`${tm} .refl`), { opacity: 0.25, duration: 1.0 }, 2.2).to(q(`${tm} .nm`), { opacity: 0.38, duration: 1.0 }, 2.2)
    }
    if (P.qrLit) tl.fromTo(q('.c-stele'), { '--lit': 0 }, { '--lit': 1, duration: 1.1 }, 1.2).fromTo(q('.c-aura'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, transformOrigin: '50% 50%' }, 1.2)
    if (P.locked) {
      tl.fromTo(q('.c-team .rg'), { stroke: '#7ff4cf' }, { stroke: '#ffd68a', duration: 1.2, stagger: 0.02 }, 1.2)
        .fromTo(q('.c-team .rg'), { scale: 1 }, { scale: 1.25, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut', transformOrigin: '0px 0px' }, 1.2)
        .fromTo(q('.c-gold'), { opacity: 0 }, { opacity: 1, duration: 1.4 }, 1.2).fromTo(q('.c-ready'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2)
    }
    if (P.rules) {
      // шары поднимаются над гладью и рассыпаются; от центра расходятся кольца; озеро встаёт туманом и уходит, открывая чистый лес
      tl.to(q('.c-team .nm'), { opacity: 0, y: -20, duration: 0.7, stagger: 0.03 }, 1.0)
        .to(q('.c-team .ball'), { y: -360, opacity: 0, scale: 0.5, duration: 1.5, stagger: 0.06, ease: 'power2.in', transformOrigin: '0px 0px' }, 1.2)
        .to(q('.c-team .glow, .c-team .refl, .c-team .rg'), { y: -300, opacity: 0, duration: 1.4, stagger: 0.06 }, 1.2)
        .fromTo(q('.c-bigring'), { scale: 0.05, opacity: 0.9 }, { scale: 1, opacity: 0, duration: 2.2, stagger: 0.35, ease: 'power1.out', transformOrigin: '0px 0px' }, 1.4)
        .to(q('.c-stele, .c-count, .c-ready'), { opacity: 0, y: 30, duration: 0.9 }, 1.6)
        .to(q('.c-logo'), { opacity: 0, y: -60, duration: 0.9, ease: 'power2.in' }, 2.3)
        .fromTo(q('.c-mist'), { y: 1100 }, { y: -360, duration: 1.6, ease: 'power2.inOut' }, 2.6)
        .to(q('.c-wet, .c-hglow, .c-spore'), { opacity: 0, duration: 0.9 }, 3.6)
        .to(q('.c-mist'), { opacity: 0, duration: 1.4 }, 4.0)
      handoffTl(tl, q, 4.6)
    }
    if (K && P.rzMode) rzBuild(tl, q, K as 4 | 8, P.rzMode, '.c-team, .c-count', at => { tl.fromTo(q('.c-bigring'), { scale: 0.05, opacity: 0.8 }, { scale: 1, opacity: 0, duration: 1.6, ease: 'power1.out', transformOrigin: '0px 0px' }, at).fromTo(q('.c-ripple-d'), { attr: { scale: 16 } }, { attr: { scale: 46 }, duration: 0.5, yoyo: true, repeat: 1 }, at) })
    tl.to({}, { duration: 1.0 }, P.rules ? 6.6 : Math.max(T0 + arr.length * P.gap + 2.4, 3.0))
  }, null, [state])
  // отражение леса: один снимок холста фона (он уже нарисован) — дальше зеркало статично и дёшево
  useEffect(() => {
    let tries = 0, raf = 0
    const grab = () => {
      const src = root.current?.querySelector('canvas.s1-bg') as HTMLCanvasElement | null, dst = reflRef.current
      if (src && dst && tries++ < 40) { const x = dst.getContext('2d'); if (x) { x.clearRect(0, 0, 1920, 1080); x.drawImage(src, 0, 0) } }
      if (tries < 8) raf = requestAnimationFrame(grab)
    }
    raf = requestAnimationFrame(grab)
    return () => cancelAnimationFrame(raf)
  }, [root])
  const nm = nameFs(P.n)
  return (
    <div className="lb3 lb3-c s1" ref={root}>
      <ForestBackdrop rects={[{ x: 340, y: 180, w: 1360, h: 230 }]} hazeK={0.72} />
      <svg className="lb3-bg c-bg" viewBox="0 0 1920 1080" aria-hidden>
        <defs>
          <linearGradient id="cWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a6f5d" /><stop offset=".16" stopColor="#0a4034" /><stop offset=".6" stopColor="#04201b" /><stop offset="1" stopColor="#010b09" /></linearGradient>
          <linearGradient id="cWaterTint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f5a4b" stopOpacity=".05" /><stop offset=".5" stopColor="#04201b" stopOpacity=".35" /><stop offset="1" stopColor="#010b09" stopOpacity=".7" /></linearGradient>
          <linearGradient id="cRefFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset=".22" stopColor="#fff" stopOpacity=".32" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <mask id="cRefM"><rect x="0" y={HZ} width="1920" height="580" fill="url(#cRefFade)" /></mask>
          <radialGradient id="cHorizon" cx="50%" cy="100%" r="60%"><stop offset="0" stopColor="#b9fff0" stopOpacity=".7" /><stop offset=".4" stopColor="#6fe3c6" stopOpacity=".25" /><stop offset="1" stopColor="#6fe3c6" stopOpacity="0" /></radialGradient>
          <radialGradient id="cGoldG"><stop offset="0" stopColor="#ffd68a" stopOpacity=".42" /><stop offset="1" stopColor="#ffd68a" stopOpacity="0" /></radialGradient>
          <linearGradient id="cMist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8ff0d6" stopOpacity="0" /><stop offset=".7" stopColor="#8ff0d6" stopOpacity=".34" /><stop offset="1" stopColor="#8ff0d6" stopOpacity="0" /></linearGradient>
          <linearGradient id="cText" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2fffb" /><stop offset=".55" stopColor="#b6f6e4" /><stop offset="1" stopColor="#66d9bc" /></linearGradient>
          <linearGradient id="cStone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#52645c" /><stop offset=".5" stopColor="#2a3a33" /><stop offset="1" stopColor="#101a16" /></linearGradient>
          <radialGradient id="cPool"><stop offset="0" stopColor="#9ff8dc" stopOpacity=".5" /><stop offset="1" stopColor="#9ff8dc" stopOpacity="0" /></radialGradient>
          <filter id="cBlur"><feGaussianBlur stdDeviation="16" /></filter><filter id="cBlur2"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="cRipple" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.12" numOctaves="2" seed="5" result="n" /><feDisplacementMap className="c-ripple-d" in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G" /><feGaussianBlur stdDeviation="1.4" /></filter>
        </defs>
        <rect className="c-wet" x="0" y={HZ} width="1920" height="580" fill="url(#cWater)" />
      </svg>
      <div className="c-reflwrap c-wet"><canvas ref={reflRef} className="c-refl" width={1920} height={1080} /></div>
      <svg className="lb3-fg c-fg" viewBox="0 0 1920 1080" aria-hidden>
        <g className="c-wet"><rect x="0" y={HZ} width="1920" height="580" fill="url(#cWaterTint)" /></g>
        <ellipse className="c-hglow" cx="1020" cy={HZ} rx="1100" ry="210" fill="url(#cHorizon)" style={{ opacity: 0.55 + 0.45 * Math.min(1, P.from / 12) }} />
        <rect className="c-wet" x="0" y={HZ - 60} width="1920" height="90" fill="url(#cMist)" />
        {/* дальний берег: низкая тёмная кромка */}
        <g className="c-wet">{far.map((t, i) => <ellipse key={i} cx={t.x} cy={HZ - 4} rx={14 + t.h * 0.3} ry={4 + t.h * 0.08} fill="#010a08" />)}<path d="M 330 504 C 700 494 1200 498 1920 492 L 1920 506 L 330 506 Z" fill="#010a08" /></g>
        {spores.map((s, i) => <circle key={i} className="c-spore" cx={s.x} cy={s.y} r={s.r} fill="#c9fff0" opacity=".7" style={{ filter: 'drop-shadow(0 0 6px #7ff4cf)' }} />)}
        {/* блики на воде */}
        {glints.map((g, i) => <ellipse className="c-wet" key={i} cx={g.x} cy={g.y} rx={g.w} ry="1.8" fill="#bffcea" opacity={0.16 + rnd(i + 2) * 0.16} />)}
        {/* лилии */}
        {[[470, 600, 1], [1810, 640, 1.1], [1760, 960, 1.3], [420, 560, 0.7]].map(([x, y, s], i) => <g className="c-wet" key={i} transform={`translate(${x} ${y}) scale(${s})`}><ellipse rx="44" ry="11" fill="#14502f" stroke="#0a2c1a" strokeWidth="2" /><path d="M 0 0 L 40 -3" stroke="#041a0e" strokeWidth="3" /><circle cx="-8" cy="-6" r="7" fill="#f4c1d4" opacity=".9" /></g>)}
        {/* берег слева и тростник справа */}
        <g className="c-wet"><path d="M -20 790 C 120 770 240 790 330 830 C 390 860 380 960 360 1090 L -20 1090 Z" fill="#06180f" />
        <path d="M -20 840 C 140 820 270 850 330 890 C 360 930 340 1000 330 1090 L -20 1090 Z" fill="#0a2a1a" /></g>
        {[[120, 800, 60], [250, 835, 46], [330, 900, 52]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.5} fill="url(#cStone)" />)}
        {reeds.map((r, i) => <path className="c-wet" key={i} d={`M ${r.x} 1090 Q ${r.x + r.lean * 0.4} ${1090 - r.h * 0.6} ${r.x + r.lean} ${1090 - r.h}`} stroke="#010806" strokeWidth={4 + (i % 3)} fill="none" strokeLinecap="round" />)}
        {/* падающие искры: путь с неба к точке на воде */}
        {slots.map((s, i) => i >= P.from && <path key={`f${i}`} className="c-fall" data-i={i} d={`M ${s.x + 170} 30 C ${s.x + 110} 220, ${s.x + 30} 380, ${s.x} ${s.y + 40}`} pathLength={1} fill="none" stroke="#f2fffb" strokeWidth="6" strokeLinecap="round" strokeDasharray="0.09 1.2" opacity="0" style={{ filter: 'drop-shadow(0 0 12px #7ff4cf)' }} />)}
        {/* логотип над водой + отражение (колышется вместе с отражением леса) */}
        <g className="c-logo">
          <g className="c-refl-logo" mask="url(#cRefM)" filter="url(#cRipple)" opacity=".62"><g transform={`translate(0 ${HZ * 2}) scale(1 -1)`}>{LOGO_X.map(l => <text key={l.i} x={l.x} y="378" textAnchor="middle" fontFamily="Philosopher, sans-serif" fontWeight="700" fontSize="190" fill="url(#cText)">{l.c}</text>)}</g></g>
          {LOGO_X.map(l => <g key={l.i}>
            <text className="c-lglow" x={l.x} y="378" textAnchor="middle" fontFamily="Philosopher, sans-serif" fontWeight="700" fontSize="190" fill="#7ff4cf" filter="url(#cBlur2)" opacity="0">{l.c}</text>
            <text className="c-letter" x={l.x} y="378" textAnchor="middle" fontFamily="Philosopher, sans-serif" fontWeight="700" fontSize="190" fill="url(#cText)" stroke="#2a8f78" strokeWidth="2.5">{l.c}</text>
          </g>)}
        </g>
        <g className="c-gold" opacity="0"><ellipse cx="1020" cy={HZ} rx="1100" ry="260" fill="url(#cGoldG)" /></g>
        {[0, 1, 2].map(i => <ellipse key={i} className="c-bigring" cx="1110" cy="760" rx="900" ry="190" fill="none" stroke="#b9fff0" strokeWidth="3" opacity="0" />)}
      </svg>
      {/* стела с QR на берегу: стоит на суше, не на воде */}
      <div className="c-stele" style={{ left: 54, top: 640, ['--lit' as string]: P.qrLit || P.rz ? 1 : 0.35 }}>
        <svg viewBox="0 0 290 400" aria-hidden>
          <ellipse className="c-aura" cx="145" cy="190" rx="200" ry="240" fill="url(#cPool)" opacity={P.qrLit || P.rz ? 1 : 0} />
          <path d="M 18 396 L 14 70 C 14 28 60 8 145 8 C 230 8 276 28 276 70 L 272 396 Z" fill="url(#cStone)" stroke="#0a110e" strokeWidth="3" />
          <path d="M 30 84 C 30 48 70 26 145 26 C 220 26 260 48 260 84" fill="none" stroke="#9ff8dc" strokeWidth="2.4" opacity="var(--lit)" />
          <path d="M 40 392 V 372 M 70 392 V 366 M 220 392 V 366 M 250 392 V 372" stroke="#9ff8dc" strokeWidth="3" strokeLinecap="round" opacity="var(--lit)" />
        </svg>
        <div className="c-qrbox"><Qr size={206} ink="#0d1a15" /></div>
        <div className="c-qrcap">Сканируй, чтобы играть</div>
      </div>
      {/* команды: шары над водой, имя ниже */}
      {slots.map((s, i) => { const t: T5 = P.teams[i], settled = i < P.from
        return <div key={t.id} className={`c-team${settled ? ' settled' : ''}`} data-i={i} style={{ left: s.x, top: s.y, ['--tc' as string]: tcol(t.hue), ['--s' as string]: s.s, ['--nm' as string]: `${t.name.length > 26 ? Math.round(nm * 0.84) : nm}px` }}>
          <Orb hue={t.hue} id={t.id} /><div className="nm"><span>{t.name}</span></div>
        </div> })}
      {P.n === 0 && <div className="c-wait"><b>Озеро ждёт гостей</b><span>Сканируйте код слева — озеро запомнит вашу команду</span></div>}
      {P.n > 0 && !P.rz && !P.locked && <div className="c-count">Команд у озера: <b>{P.n}</b></div>}
      {P.locked && <div className="c-ready">Все в сборе · состав закрыт</div>}
      {P.rules && <><div className="c-mist" /><HandoffTitle /></>}
      {K > 0 && P.rzMode && <><div className="rz-veil rz-vC" /><RzLayer K={K as 4 | 8} cfg={CFG_C} pills={pills} /></>}
      {P.rzMode === 'back' && <button type="button" className="lb3-grp-btn">СОСТАВЫ КОМАНД</button>}
    </div>
  )
}
