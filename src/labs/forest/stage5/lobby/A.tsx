// ═══ Лобби · Концепт A — «Сердце леса» ═══
// Древний ствол — монумент поляны. Логотип врезан в кору и зажигается светом, поднимающимся от «сердца» в дупле.
// Каждая прибывшая команда — это световой побег: от сердца по земле бежит жила света, на конце вырастает светящийся
// гриб-фонарь цвета команды, имя прожигается рядом с ним. Чем больше команд, тем ярче корни, светлее поляна и теплее ствол.
import { useMemo, useRef } from 'react'
import { useEntrance, type S1Props, type S1Api } from '../../stage1/common'
import { ForestBackdrop } from '../../stage1/env'
import { Qr } from '../../../magic2/common'
import { preset, rnd, nameFs, tcol, type T5, type Pt } from './core'
import { RzLayer, rzBuild, useRzTicker, type RzCfg } from './Rz'
import { HandoffTitle, handoffTl } from './Handoff'

const HEART = { x: 960, y: 628 }

/** раскладка: до 4 — один ряд (лампа над именем); 5–8 — два ряда, 9–12 — три ряда: лампа слева от имени */
export function slotsA(n: number): (Pt & { compact: boolean; lx: number })[] {
  if (n === 0) return []
  const compact = n > 4
  const rows = n <= 4 ? 1 : n <= 8 ? 2 : 3
  const ys = rows === 1 ? [872] : rows === 2 ? [812, 948] : [758, 866, 976]
  const sc = rows === 1 ? [1.32] : rows === 2 ? [0.92, 1.0] : [0.82, 0.9, 0.96]
  const out: (Pt & { compact: boolean; lx: number })[] = []
  for (let i = 0; i < n; i++) {
    const r = i % rows, col = Math.floor(i / rows), m = Math.ceil((n - r) / rows)
    const gap = compact ? Math.min(400, 1400 / m) : Math.min(440, 1400 / m)
    const off = rows > 1 && r % 2 ? 46 : 0
    const x = 1128 + (col - (m - 1) / 2) * gap + off
    out.push({ x, y: ys[r], s: sc[r], compact, lx: compact ? x - 120 * sc[r] : x })
  }
  return out
}
const veinD = (x: number, y: number) => `M 960 700 C 960 ${770 + Math.abs(x - 960) * 0.05}, ${x - (x - 960) * 0.28} ${y + 52}, ${x} ${y}`

function Taper({ pts, w, fill }: { pts: [number, number][]; w: number; fill: string }) {
  const L: string[] = [], R: string[] = []
  pts.forEach(([x, y], i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]
    const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, k = (w * Math.pow(1 - i / (pts.length - 1), 0.85) + 2) / 2
    L.push(`${(x + (-dy / d) * k).toFixed(1)} ${(y + (dx / d) * k).toFixed(1)}`); R.push(`${(x - (-dy / d) * k).toFixed(1)} ${(y - (dx / d) * k).toFixed(1)}`)
  })
  return <path d={`M ${L.join(' L ')} L ${R.reverse().join(' L ')} Z`} fill={fill} />
}
const curve = (p: [number, number][], n = 14) => {
  const out: [number, number][] = []
  for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; out.push([u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]]) }
  return out
}
const ROOTS: { p: [[number, number], [number, number], [number, number], [number, number]]; w: number }[] = [
  { p: [[640, 868], [560, 912], [440, 930], [300, 985]], w: 112 }, { p: [[700, 890], [660, 950], [600, 1000], [540, 1070]], w: 84 },
  { p: [[1280, 868], [1360, 912], [1480, 930], [1620, 985]], w: 112 }, { p: [[1220, 890], [1260, 950], [1320, 1000], [1380, 1070]], w: 84 },
  { p: [[820, 905], [800, 965], [770, 1015], [740, 1075]], w: 66 }, { p: [[1100, 905], [1120, 965], [1150, 1015], [1180, 1075]], w: 66 },
  { p: [[570, 850], [500, 880], [420, 888], [350, 915]], w: 60 }, { p: [[1350, 850], [1420, 880], [1500, 888], [1570, 915]], w: 60 },
]
const TRUNK = 'M 520 905 C 626 840 672 700 680 520 C 688 340 692 160 664 -20 L 1256 -20 C 1228 160 1232 340 1240 520 C 1248 700 1294 840 1400 905 Z' 

/** гриб-фонарь команды: ножка, шляпка и два малыша растут по очереди; свет — отдельным слоем */
function Lamp({ hue, id }: { hue: number; id: string }) {
  const c1 = `hsl(${hue} 80% 84%)`, c2 = `hsl(${hue} 64% 54%)`, c3 = `hsl(${hue} 56% 22%)`
  return <svg className="a-lamp" viewBox="-64 -112 128 126" aria-hidden>
    <defs>
      <radialGradient id={`ac-${id}`} cx="46%" cy="36%" r="72%"><stop offset="0" stopColor={c1} /><stop offset=".5" stopColor={c2} /><stop offset="1" stopColor={c3} /></radialGradient>
      <radialGradient id={`ag-${id}`}><stop offset="0" stopColor={`hsl(${hue} 92% 74%)`} stopOpacity=".6" /><stop offset="1" stopColor={`hsl(${hue} 92% 60%)`} stopOpacity="0" /></radialGradient>
      <linearGradient id={`as-${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={`hsl(${hue} 26% 62%)`} /><stop offset=".45" stopColor={`hsl(${hue} 30% 88%)`} /><stop offset="1" stopColor={`hsl(${hue} 24% 52%)`} /></linearGradient>
    </defs>
    <ellipse className="glow" cx="0" cy="-52" rx="74" ry="66" fill={`url(#ag-${id})`} />
    <g transform="translate(0 5)"><g className="stalk"><path d="M -8 0 C -7 -15 -7 -27 -6 -41 L 6 -41 C 7 -27 7 -15 8 0 Z" fill={`url(#as-${id})`} /></g></g>
    <g transform="translate(-48 4)"><g className="kid"><path d="M -4 0 C -4 -8 -3 -13 -2 -20 L 2 -20 C 3 -13 4 -8 4 0 Z" fill={`url(#as-${id})`} /><path d="M -11 -18 C -11 -34 -6 -42 0 -42 C 6 -42 11 -34 11 -18 C 5 -15 -5 -15 -11 -18 Z" fill={`url(#ac-${id})`} /></g></g>
    <g transform="translate(50 6)"><g className="kid"><path d="M -4 0 C -4 -8 -3 -13 -2 -18 L 2 -18 C 3 -13 4 -8 4 0 Z" fill={`url(#as-${id})`} /><path d="M -10 -16 C -10 -30 -6 -37 0 -37 C 6 -37 10 -30 10 -16 C 5 -13 -5 -13 -10 -16 Z" fill={`url(#ac-${id})`} /></g></g>
    <g transform="translate(0 -30)"><g className="cap">
      <path d="M -45 -3 C -45 -50 -21 -75 0 -75 C 21 -75 45 -50 45 -3 C 29 4 -29 4 -45 -3 Z" fill={`url(#ac-${id})`} />
      <path d="M -44 -3 C -29 4 29 4 44 -3 C 29 8 -29 8 -44 -3 Z" fill={`hsl(${hue} 50% 24%)`} opacity=".9" />
      <ellipse cx="-15" cy="-53" rx="13" ry="6" fill="#fff" opacity=".4" transform="rotate(-22 -15 -53)" />
      <circle cx="16" cy="-40" r="4" fill="#fff" opacity=".42" /><circle cx="-3" cy="-28" r="3" fill="#fff" opacity=".35" /><circle cx="27" cy="-22" r="2.6" fill="#fff" opacity=".3" />
    </g></g>
  </svg>
}

const SIGIL_A: RzCfg['Sigil'] = ({ hue, size }) => <div className="a-sg" style={{ height: size }}><Lamp hue={hue} id={`sg${hue}`} /></div>
export const CFG_A: RzCfg = {
  cls: 'rz-A',
  // вихрь имён поднимается по стволу спиралью и опускается вокруг кроны
  swirl: (i, s, o, K) => { const a = o * Math.PI * 2 + s * Math.PI * 7, R = K === 8 ? 760 : 720; return { x: 1030 + Math.cos(a) * R * (0.92 - 0.2 * s), y: 560 + Math.sin(a) * 260 + (1 - s) * 40 } },
  layout: (gi, K) => K === 4 ? { cx: 1100 + (gi - 1.5) * 410, names: 650, sigil: 360, size: 170, pitch: 52 } : { cx: 1100 + ((gi % 4) - 1.5) * 410, names: gi < 4 ? 420 : 780, sigil: gi < 4 ? 215 : 575, size: 130, pitch: 44 },
  Sigil: SIGIL_A,
}

export function ConceptA({ state, onReady }: S1Props) {
  const P = preset(state), slots = useMemo(() => slotsA(P.n), [P.n])
  const apiRef = useRef<S1Api | null>(null), pills = useRef<HTMLElement[]>([])
  const K = P.rz ?? 0
  useRzTicker(apiRef, pills, K as 0 | 4 | 8, P.rzMode, CFG_A)
  const veins = useMemo(() => slots.map(s => veinD(s.lx, s.y - 4)), [slots])
  const fire = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ x: 380 + rnd(i) * 1500, y: 300 + rnd(i + 40) * 640, r: 3 + rnd(i + 9) * 4 })), [])
  const { root } = useEntrance(a => { apiRef.current = a; onReady(a) }, (tl, q) => {
    const T0 = 2.4, n = P.n
    // вход: лес проявляется, сердце бьётся, свет поднимается по стволу и зажигает логотип, зажигается указатель с QR
    tl.fromTo(q('.a-bg'), { opacity: 0 }, { opacity: 1, duration: 1.0 }, 0)
      .fromTo(q('.a-heart'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', transformOrigin: '0px 0px' }, 0.4)
      .fromTo(q('.a-heart'), { scale: 1 }, { scale: 1.5, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut', transformOrigin: '0px 0px' }, 1.0)
      .fromTo(q('.a-lit rect'), { attr: { y: 700, height: 0 } }, { attr: { y: 100, height: 600 }, duration: 1.5, ease: 'power1.in' }, 1.1)
      .fromTo(q('.a-stele'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.8)
      .fromTo(q(P.rules || P.rz ? '.a-wait' : '.a-wait, .a-count'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 2.0)
      .fromTo(q(P.rz ? '.none' : '.a-team.settled'), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.06 }, 0.8)
      .fromTo(q('.a-fire'), { opacity: 0 }, { opacity: 1, duration: 1.4, stagger: 0.04 }, 1.0)
    // прибытия
    const arr = slots.map((_, i) => i).filter(i => i >= P.from && i < n)
    arr.forEach((i, k) => {
      const at = T0 + k * P.gap, tm = `.a-team[data-i="${i}"]`
      tl.to(q('.a-warm'), { opacity: 0.12 + 0.5 * Math.min(1, (P.from + k + 1) / 12), duration: 1.4 }, at + 1.0)
        .fromTo(q('.a-heart'), { scale: 1 }, { scale: 1.45, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut', transformOrigin: '0px 0px' }, at)
        .fromTo(q('.a-logo-halo'), { opacity: 0.55 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }, at)
        .fromTo(q(`.a-vein[data-i="${i}"]`), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.95, ease: 'power1.inOut' }, at + 0.1)
        .fromTo(q(`.a-comet[data-i="${i}"]`), { strokeDashoffset: 0.07, opacity: 1 }, { strokeDashoffset: -1.0, duration: 0.95, ease: 'power1.inOut' }, at + 0.1)
        .fromTo(q(`.a-comet[data-i="${i}"]`), { opacity: 1 }, { opacity: 0, duration: 0.25 }, at + 0.95)
        .fromTo(q(`${tm} .stalk`), { scaleY: 0 }, { scaleY: 1, duration: 0.55, ease: 'power2.out', transformOrigin: '0px 0px' }, at + 0.9)
        .fromTo(q(`${tm} .cap`), { scale: 0.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.9)', transformOrigin: '0px 0px' }, at + 1.2)
        .fromTo(q(`${tm} .kid`), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2)', transformOrigin: '0px 0px' }, at + 1.5)
        .fromTo(q(`${tm} .glow`), { opacity: 0 }, { opacity: 1, duration: 0.9 }, at + 1.3)
        .fromTo(q(`${tm} .nm`), { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power1.inOut' }, at + 1.7)
        .fromTo(q(`.a-pool[data-i="${i}"]`), { opacity: 0 }, { opacity: 1, duration: 1.0 }, at + 1.4)
    })
    tl.fromTo(q('.a-count b'), { scale: 1.8, color: '#ffe2a0' }, { scale: 1, color: '#f4fffa', duration: 0.5 }, T0 + 1.9)
    // отключение: жила гаснет, шляпка закрывается, имя тускнеет
    if (P.dead) {
      const i = P.teams.findIndex(t => t.id === P.dead), tm = `.a-team[data-i="${i}"]`
      tl.to(q(`.a-vein[data-i="${i}"]`), { opacity: 0.12, duration: 1.0 }, 2.2)
        .to(q(`${tm} .glow`), { opacity: 0.1, duration: 1.0 }, 2.2).to(q(`${tm} .cap`), { filter: 'saturate(.25) brightness(.55)', scaleY: 0.86, duration: 1.2, transformOrigin: '0px 0px' }, 2.2)
        .to(q(`${tm} .nm`), { opacity: 0.38, duration: 1.0 }, 2.2).to(q(`.a-pool[data-i="${i}"]`), { opacity: 0, duration: 1.0 }, 2.2)
    }
    if (P.qrLit) tl.fromTo(q('.a-stele'), { '--lit': 0 }, { '--lit': 1, duration: 1.1 }, 1.2).fromTo(q('.a-aura'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, transformOrigin: '50% 50%' }, 1.2)
    if (P.locked) {
      tl.fromTo(q('.a-gold'), { opacity: 0 }, { opacity: 1, duration: 1.6 }, 1.2)
        .fromTo(q('.a-vein'), { stroke: '#7ff4cf' }, { stroke: '#ffd68a', duration: 1.4, stagger: 0.05 }, 1.4)
        .fromTo(q('.a-lit rect'), { opacity: 1 }, { opacity: 1, duration: 0.01 }, 1.4)
        .fromTo(q('.a-ready'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2)
    }
    if (P.rules) {
      // свет втягивается из лампочек обратно в сердце, лампы закрываются, сердце вспыхивает, ствол раскрывается створками
      tl.to(q('.a-vein'), { strokeDashoffset: 1, duration: 0.9, stagger: 0.04, ease: 'power1.in' }, 1.0)
        .to(q('.a-pool, .a-team .glow, .a-team .nm'), { opacity: 0, duration: 0.7 }, 1.0)
        .to(q('.a-team .cap'), { scale: 0.1, opacity: 0, duration: 0.6, stagger: 0.04, ease: 'power2.in', transformOrigin: '0px 0px' }, 1.1)
        .to(q('.a-team .stalk, .a-team .kid'), { scale: 0, duration: 0.5, stagger: 0.03, transformOrigin: '0px 0px' }, 1.3)
        .to(q('.a-stele, .a-fire, .a-count, .a-ready'), { opacity: 0, y: 30, duration: 0.9 }, 1.6)
        .to(q('.a-heart'), { scale: 2.6, duration: 0.9, ease: 'power2.in', transformOrigin: '0px 0px' }, 2.2)
        .fromTo(q('.a-beam'), { opacity: 0, scaleX: 0.1 }, { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out', transformOrigin: '50% 50%' }, 3.0)
        .to(q('.a-halfL'), { x: -760, opacity: 0, duration: 1.7, ease: 'power3.in' }, 3.1)
        .to(q('.a-halfR'), { x: 760, opacity: 0, duration: 1.7, ease: 'power3.in' }, 3.1)
        .to(q('.a-beam'), { opacity: 0, scaleX: 3, duration: 1.2, ease: 'power1.in', transformOrigin: '50% 50%' }, 3.9)
      handoffTl(tl, q, 4.4)
    }
    if (K && P.rzMode) rzBuild(tl, q, K as 4 | 8, P.rzMode, '.a-team, .a-count', at => { tl.fromTo(q('.a-heart'), { scale: 1 }, { scale: 1.7, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut', transformOrigin: '0px 0px' }, at) })
    tl.to({}, { duration: 1.0 }, P.rules ? 6.4 : Math.max(T0 + arr.length * P.gap + 2.4, 3.0))
  }, null, [state])
  const nm = nameFs(P.n)
  const warm0 = 0.12 + 0.5 * Math.min(1, Math.min(P.from, P.n) / 12)
  return (
    <div className="lb3 lb3-a s1" ref={root}>
      <ForestBackdrop rects={[]} hazeK={0} />
      <svg className="lb3-bg a-bg" viewBox="0 0 1920 1080" aria-hidden>
        <defs>
          <linearGradient id="aBark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0f0805" /><stop offset=".2" stopColor="#38230f" /><stop offset=".48" stopColor="#6e4828" /><stop offset=".76" stopColor="#3a2412" /><stop offset="1" stopColor="#120a05" /></linearGradient>
          <linearGradient id="aRoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a4526" /><stop offset=".6" stopColor="#35200f" /><stop offset="1" stopColor="#150c06" /></linearGradient>
          <radialGradient id="aHeartG"><stop offset="0" stopColor="#fff6cf" /><stop offset=".28" stopColor="#ffd37a" /><stop offset=".7" stopColor="#d89a3a" stopOpacity=".35" /><stop offset="1" stopColor="#d89a3a" stopOpacity="0" /></radialGradient>
          <radialGradient id="aWarm" cx="50%" cy="75%" r="60%"><stop offset="0" stopColor="#ffd68a" stopOpacity=".55" /><stop offset="1" stopColor="#ffd68a" stopOpacity="0" /></radialGradient>
          <radialGradient id="aPool"><stop offset="0" stopColor="#9ff8dc" stopOpacity=".5" /><stop offset="1" stopColor="#9ff8dc" stopOpacity="0" /></radialGradient>
          <radialGradient id="aHollow" cx="50%" cy="70%" r="70%"><stop offset="0" stopColor="#6b3a14" /><stop offset=".5" stopColor="#1f1008" /><stop offset="1" stopColor="#060302" /></radialGradient>
          <linearGradient id="aShaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d6fff0" stopOpacity=".3" /><stop offset="1" stopColor="#d6fff0" stopOpacity="0" /></linearGradient>
          <linearGradient id="aTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#010a08" stopOpacity=".92" /><stop offset=".45" stopColor="#010a08" stopOpacity=".5" /><stop offset="1" stopColor="#010a08" stopOpacity="0" /></linearGradient>
          <linearGradient id="aShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity=".6" /><stop offset=".3" stopColor="#000" stopOpacity="0" /><stop offset=".78" stopColor="#000" stopOpacity="0" /><stop offset=".94" stopColor="#7cf0d0" stopOpacity=".16" /><stop offset="1" stopColor="#000" stopOpacity=".5" /></linearGradient>
          <linearGradient id="aText" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff4cf" /><stop offset=".55" stopColor="#ffd37a" /><stop offset="1" stopColor="#e3a24a" /></linearGradient>
          <linearGradient id="aSt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#455a50" /><stop offset=".5" stopColor="#26352e" /><stop offset="1" stopColor="#0f1815" /></linearGradient>
          <filter id="aNoise" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.016 0.2" numOctaves="3" seed="7" /><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.6 -1.05" /></filter>
          <filter id="aNoiseL" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.03 0.1" numOctaves="2" seed="21" /><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 .86  0 0 0 0 .5  0 0 0 1.6 -0.9" /></filter>
          <filter id="aBlur"><feGaussianBlur stdDeviation="18" /></filter><filter id="aBlur2"><feGaussianBlur stdDeviation="6" /></filter>
          <clipPath id="aTrunk"><path d={TRUNK} /></clipPath>
          <clipPath id="aHalfL"><rect x="-400" y="-100" width="1362" height="1300" /></clipPath><clipPath id="aHalfR"><rect x="958" y="-100" width="1400" height="1300" /></clipPath>
          <g id="aT">
        {/* корни: толстые контрфорсы ствола */}
        {ROOTS.map((r, i) => <Taper key={i} pts={curve(r.p)} w={r.w} fill="url(#aRoot)" />)}
        {/* ствол */}
        <path d={TRUNK} fill="url(#aBark)" />
        <g clipPath="url(#aTrunk)">
          <rect width="1920" height="1080" filter="url(#aNoise)" opacity=".66" /><rect width="1920" height="1080" filter="url(#aNoiseL)" opacity=".16" />
          {[742, 790, 846, 1062, 1116, 1170].map((x, i) => <g key={i}><path d={`M ${x} -20 C ${x + 16} 220 ${x - 12} 480 ${x + 10} 860`} stroke="#0a0502" strokeWidth={4 + (i % 3) * 3} fill="none" opacity=".55" /><path d={`M ${x + 6} -20 C ${x + 22} 220 ${x - 6} 480 ${x + 16} 860`} stroke="#9c6b3a" strokeWidth="2" fill="none" opacity=".22" /></g>)}
          <rect width="1920" height="1080" fill="url(#aShade)" />
          <ellipse cx="960" cy="800" rx="360" ry="330" fill="url(#aWarm)" className="a-warm" style={{ opacity: warm0 }} />
          <rect width="1920" height="420" fill="url(#aTop)" />
        </g>
        <path d="M 520 905 C 626 840 672 700 680 520 C 688 340 692 160 664 -20" fill="none" stroke="#a6f3d8" strokeWidth="2.5" opacity=".2" />
        {/* дупло: сердце леса */}
        <path d="M 898 704 C 888 604 922 548 960 548 C 998 548 1032 604 1022 704 Z" fill="url(#aHollow)" stroke="#120904" strokeWidth="6" />
        <path d="M 894 704 C 884 602 920 544 960 544 C 1000 544 1036 602 1026 704" fill="none" stroke="#3f8a4c" strokeWidth="4" opacity=".7" strokeDasharray="10 9" />
        <g transform={`translate(${HEART.x} ${HEART.y + 18})`}><g className="a-heart"><circle r="64" fill="url(#aHeartG)" /><circle r="13" fill="#fff8de" /></g></g>
        {/* логотип, врезанный в кору: тёмная резьба + свет, поднимающийся от сердца */}
        <g className="a-logo-wrap">
          <g fontFamily="Philosopher, sans-serif" fontWeight="700" textAnchor="middle" fontSize="168" letterSpacing="10">
            <text x="963" y="305" fill="#0a0502" opacity=".95">QUIZ</text><text x="963" y="491" fill="#0a0502" opacity=".95">PARTY</text>
            <text x="960" y="300" fill="#3b2412" stroke="#120904" strokeWidth="2">QUIZ</text><text x="960" y="486" fill="#3b2412" stroke="#120904" strokeWidth="2">PARTY</text>
          </g>
          <clipPath id="aLitC" className="a-lit"><rect x="560" y="700" width="800" height="0" /></clipPath>
          <g clipPath="url(#aLitC)">
            <g className="a-logo-halo" fontFamily="Philosopher, sans-serif" fontWeight="700" textAnchor="middle" fontSize="168" letterSpacing="10" filter="url(#aBlur2)" fill="#ffd37a" opacity=".85"><text x="960" y="300">QUIZ</text><text x="960" y="486">PARTY</text></g>
            <g fontFamily="Philosopher, sans-serif" fontWeight="700" textAnchor="middle" fontSize="168" letterSpacing="10" fill="url(#aText)"><text x="960" y="300">QUIZ</text><text x="960" y="486">PARTY</text></g>
          </g>
        </g>
          </g>
        </defs>
        {/* косые лучи сквозь крону */}
        <g opacity=".75">{[0, 1, 2, 3].map(i => <path key={i} d={`M ${1180 + i * 170} -10 L ${1320 + i * 190} 980 L ${1480 + i * 200} 980 L ${1300 + i * 170} -10 Z`} fill="url(#aShaft)" filter="url(#aBlur)" />)}</g>
        <ellipse cx="960" cy="925" rx="560" ry="46" fill="#000" opacity=".5" filter="url(#aBlur)" />
        <use href="#aT" className="a-halfL" clipPath={P.rules ? 'url(#aHalfL)' : undefined} />
        {P.rules && <use href="#aT" className="a-halfR" clipPath="url(#aHalfR)" />}
        {/* свет земли */}
        {slots.map((s, i) => <ellipse key={`p${i}`} className="a-pool" data-i={i} cx={s.lx} cy={s.y + 6} rx={120 * s.s} ry={26 * s.s} fill="url(#aPool)" opacity={i >= P.from ? 0 : 1} />)}
        {veins.map((d, i) => { const dead = P.teams[i]?.id === P.dead; return <g key={`v${i}`}>
          <path className="a-vein" data-i={i} d={d} pathLength={1} fill="none" stroke="#7ff4cf" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="1 1" opacity={dead ? 0.85 : 0.62} style={{ filter: 'drop-shadow(0 0 5px rgba(127,244,207,.8))' }} />
          {i >= P.from && <path className="a-comet" data-i={i} d={d} pathLength={1} fill="none" stroke="#fff6cf" strokeWidth="7" strokeLinecap="round" strokeDasharray="0.07 1.2" opacity="0" style={{ filter: 'drop-shadow(0 0 10px #ffd37a)' }} />}
        </g> })}
        <g className="a-gold" opacity="0"><ellipse cx="960" cy="860" rx="900" ry="200" fill="#ffd68a" opacity=".13" filter="url(#aBlur)" /></g>
      </svg>
      <svg className="lb3-fg" viewBox="0 0 1920 1080" aria-hidden>
        {fire.map((f, i) => <circle key={i} className="a-fire" cx={f.x} cy={f.y} r={f.r} fill="#fff1b8" opacity={i < 8 + P.n * 1.6 ? 0.8 : 0} style={{ filter: 'drop-shadow(0 0 6px #ffd37a)' }} />)}
      </svg>
      {/* указатель с QR: каменная стела у корней, QR — на ровной светлой плите */}
      <div className="a-stele" style={{ left: 64, top: 640, ['--lit' as string]: P.qrLit || P.rz ? 1 : 0.35 }}>
        <svg viewBox="0 0 290 400" aria-hidden>
          <ellipse className="a-aura" cx="145" cy="190" rx="200" ry="240" fill="url(#aPool)" opacity={P.qrLit || P.rz ? 1 : 0} />
          <path d="M 18 396 L 14 70 C 14 28 60 8 145 8 C 230 8 276 28 276 70 L 272 396 Z" fill="url(#aSt)" stroke="#0a110e" strokeWidth="3" />
          <path d="M 30 84 C 30 48 70 26 145 26 C 220 26 260 48 260 84" fill="none" stroke="#8ff3cf" strokeWidth="2.4" opacity="var(--lit)" />
          <path d="M 14 70 C 40 52 100 46 145 50 C 190 46 250 52 276 70 L 276 92 C 250 78 190 72 145 76 C 100 72 40 78 14 92 Z" fill="#2e6b3a" opacity=".85" />
          <path d="M 40 392 V 372 M 70 392 V 366 M 220 392 V 366 M 250 392 V 372" stroke="#8ff3cf" strokeWidth="3" strokeLinecap="round" opacity="var(--lit)" />
        </svg>
        <div className="a-qrbox"><Qr size={206} ink="#0d1a15" /></div>
        <div className="a-qrcap">Сканируй, чтобы играть</div>
      </div>
      {/* команды */}
      {slots.map((s, i) => { const t: T5 = P.teams[i], settled = i < P.from
        return <div key={t.id} className={`a-team${settled ? ' settled' : ''}${s.compact ? ' compact' : ''}`} data-i={i} style={{ left: s.x, top: s.y, ['--tc' as string]: tcol(t.hue), ['--s' as string]: s.s, ['--nm' as string]: `${t.name.length > 26 ? Math.round(nm * 0.84) : nm}px` }}>
          <Lamp hue={t.hue} id={t.id} /><div className="nm"><span>{t.name}</span></div>
        </div> })}
      {P.n === 0 && <div className="a-wait"><b>Игра вот-вот начнётся</b><span>Сканируйте код слева и назовите свою команду</span></div>}
      {P.n > 0 && !P.rz && !P.locked && <div className="a-count">В лесу команд: <b>{P.n}</b></div>}
      {P.locked && <div className="a-ready">Все в сборе · состав закрыт</div>}
      {P.rules && <><div className="a-beam" /><HandoffTitle /></>}
      {K > 0 && P.rzMode && <><div className="rz-veil rz-vA" /><RzLayer K={K as 4 | 8} cfg={CFG_A} pills={pills} /></>}
      {P.rzMode === 'back' && <button type="button" className="lb3-grp-btn">СОСТАВЫ КОМАНД</button>}
    </div>
  )
}
