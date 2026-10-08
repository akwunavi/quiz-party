// ═══ 01 · Обсерватория — «небесную механику можно переписать» ═══
// Грамматика леса: камера на уровне глаз ВНУТРИ купола, тёмная масса телескопа
// по диагонали слева (как ствол в лесу), за щелью — небо и горы в дымке,
// столб звёздного света падает на пол, единственный тёплый акцент — лампа.
// A: ночь в куполе, телескоп доводит прицел, в луче плывёт пыль.
// B: пыль замирает, пламя лампы клонится к щели — тяготение поменяло
//    направление; звёзды из щели срываются и осыпаются на пол светом.
// C: купол расходится створками, свет с пола поднимается обратно в небо:
//    30 звёзд — кольцом таймера вокруг полюса, четыре — висят в зале над
//    вариантами, остальные возвращаются на небо.
// D: вопрос проступает в открытом небе, созвездие связывает варианты.
// E: всё висит и дышит, кольцо считает.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, css, seeded, noise2, phaseOf, Letters, glowSprite, pathLen, type SceneProps } from './kit'

const P = { x: 1160, y: 178 }, RING = 112
const OX = [760, 1040, 1320, 1600], OYS = [748, 716, 738, 708], OY = 790
const PIVOT = { x: 330, y: 880 }, AIM = (Math.atan2(P.y - PIVOT.y, P.x - PIVOT.x) * 180) / Math.PI
// щель купола — трапеция, сужается к зениту
const SLIT = { t0: 1010, t1: 1310, b0: 850, b1: 1470, by: 880 }
const inSlit = (x: number, y: number) => { const k = y / SLIT.by; return x > SLIT.t0 + (SLIT.b0 - SLIT.t0) * k + 14 && x < SLIT.t1 + (SLIT.b1 - SLIT.t1) * k - 14 }

type Star = { x: number; y: number; s: number; b: number; ph: number; fall: boolean; k: number; fx: number; fy: number; tx: number; ty: number; role: 'ring' | 'opt' | 'sky'; idx: number }
function makeStars() {
  const r = seeded(1609), sky: Star[] = [], fallers: Star[] = []
  for (let i = 0; i < 1300; i++) {
    const x = r() * 1920, y = r() * 900 * Math.pow(r(), 0.6)
    const s: Star = { x, y, s: r() < 0.05 ? 2.4 : r() < 0.3 ? 1.5 : 0.9, b: 0.35 + r() * 0.65, ph: r() * 10, fall: false, k: r(), fx: 0, fy: 0, tx: x, ty: y, role: 'sky', idx: 0 }
    if (y < 820 && inSlit(x, y) && fallers.length < 240) { s.fall = true; s.s = Math.max(s.s, 1.3); fallers.push(s) } else sky.push(s)
  }
  fallers.forEach(s => { s.fx = 820 + r() * 700; s.fy = 952 + r() * 50 })
  // кому кем стать после подъёма: 30 — кольцо, 4 — варианты, остальные — новое небо
  const ord = [...fallers].sort((a, b) => a.k - b.k)
  ord.slice(0, 30).forEach((s, i) => { s.role = 'ring'; s.idx = i; const a = -Math.PI / 2 + (i / 30) * Math.PI * 2; s.tx = P.x + Math.cos(a) * RING; s.ty = P.y + Math.sin(a) * RING })
  ord.slice(30, 34).forEach((s, i) => { s.role = 'opt'; s.idx = i; s.tx = OX[i]; s.ty = OYS[i] })
  ord.slice(34).forEach(s => { s.tx = 520 + r() * 1400; s.ty = 30 + r() * 560 })
  return { sky, fallers }
}

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const skyCv = useRef<HTMLCanvasElement>(null)
  const roomCv = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const { sky, fallers } = makeStars()
    const nz = noise2(41), rd = seeded(77)
    const dust = Array.from({ length: 70 }, () => ({ u: rd(), v: rd(), s: 0.8 + rd() * 1.6, ph: rd() * 20 }))
    const st = { rot: 0, freeze: 0, fall: 0, rise: 0, pool: 0, lit: 30, phase: 'normal', ringOn: 0, optGlow: 0 }
    const sx = skyCv.current!.getContext('2d')!, rx = roomCv.current!.getContext('2d')!
    const sprW = glowSprite('230,236,255'), sprWarm = glowSprite('255,190,120')
    let frozenT = 0, frame = 0
    const draw = () => {
      const t = gsap.ticker.time
      // ── небо (позади купола): мерцание медленное — хватает каждого второго кадра
      if ((frame++ & 1) === 0) { sx.clearRect(0, 0, 1920, 1080)
      for (const s of sky) {
        const tw = 0.75 + 0.25 * Math.sin(t * 1.3 + s.ph * 5)
        sx.globalAlpha = s.b * tw; sx.fillStyle = '#eef1ff'
        const dx = Math.sin(st.rot) * (s.y - 900) * 0.04
        sx.fillRect(s.x + dx, s.y, s.s, s.s)
      }
      sx.globalAlpha = 1 }
      // ── зал (перед куполом): пыль в луче + падающие/поднимающиеся звёзды
      rx.clearRect(0, 0, 1920, 1080); rx.globalCompositeOperation = 'lighter'
      if (st.freeze < 1) frozenT = t; const dt = frozenT
      for (const d of dust) { // столб света: от щели к полу, наклон вправо
        const y = 120 + d.v * 820, x0 = 1000 + (y / 880) * 260, w = 220 + (y / 880) * 160
        const x = x0 + d.u * w + (nz(d.ph + dt * 0.08, 1) - 0.5) * 60
        const yy = y + (nz(2, d.ph + dt * 0.06) - 0.5) * 40
        rx.globalAlpha = 0.35 * (1 - st.rise); rx.drawImage(sprW, x - d.s * 3, yy - d.s * 3, d.s * 6, d.s * 6)
      }
      for (const s of fallers) {
        const f = Math.min(1, Math.max(0, st.fall * 1.5 - s.k * 0.5))
        const g = f * f // падение с ускорением
        let x = s.x + (s.fx - s.x) * g, y = s.y + (s.fy - s.y) * g
        const rr = Math.min(1, Math.max(0, st.rise * 1.4 - (1 - s.k) * 0.4))
        const e = 1 - Math.pow(1 - rr, 3)
        if (rr > 0) { x = s.fx + (s.tx - s.fx) * e; y = s.fy + (s.ty - s.fy) * e }
        if (rr >= 1 && s.role === 'opt') y += Math.sin(t * 1.1 + s.idx * 1.7) * 6
        let a = s.b, sz = s.s * 4
        if (s.role === 'ring' && rr > 0.98) { const on = s.idx < st.lit; a = on ? 1 : 0.16; sz = on ? 9 : 5 }
        if (s.role === 'opt' && rr > 0) { sz = s.s * 4 + st.optGlow * 26; a = 1 }
        if (f > 0.02 && f < 1 && rr === 0) { // хвост падения
          rx.globalAlpha = 0.4 * a; rx.strokeStyle = '#dfe6ff'; rx.lineWidth = 1.2
          rx.beginPath(); rx.moveTo(x, y); rx.lineTo(x, y - 60 * f); rx.stroke()
        }
        if (f >= 1 && rr === 0) a *= 0.7 + 0.3 * Math.sin(t * 3 + s.ph * 4) // лужа света на полу мерцает
        const warm = s.role === 'ring' && st.phase !== 'normal' && rr > 0.98
        const spr = warm || s.role === 'opt' && rr > 0.5 ? sprWarm : sprW
        rx.globalAlpha = a; rx.drawImage(spr, x - sz, y - sz, sz * 2, sz * 2)
      }
      rx.globalAlpha = 1; rx.globalCompositeOperation = 'source-over'
    }
    gsap.ticker.add(draw)

    const q = gsap.utils.selector(root)
    const lines = q('.o-const path')
    lines.forEach(p => { const L = pathLen(p); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }) })
    // SVG-группы крутим вокруг точки в координатах viewBox (svgOrigin), а не CSS-origin
    gsap.set(q('.o-scope'), { svgOrigin: `${PIVOT.x} ${PIVOT.y}`, rotation: AIM })
    gsap.set(q('.o-flame'), { svgOrigin: '1830 846' })
    q('.o-pool').forEach((el, i) => gsap.set(el, { svgOrigin: `${OX[i]} 985` }))
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
      .fromTo(q('.o-cam'), { scale: 1.08, x: 30, y: 20 }, { scale: 1.02, x: 0, y: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .fromTo(q('.o-far'), { x: 20 }, { x: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .fromTo(q('.o-scope'), { rotation: AIM + 9 }, { rotation: AIM - 1, duration: 3.0, ease: 'power2.inOut' }, 0.3)
      .addLabel('B', 3.6)
      // предвосхищение: телескоп встаёт в упор с отдачей, пыль замирает, пламя клонится к щели
      .to(q('.o-scope'), { rotation: AIM + 0.6, duration: 0.3, ease: 'back.out(3)' }, 'B')
      .to(st, { freeze: 1, duration: 0.6 }, 'B')
      .to(q('.o-flame'), { rotation: -34, duration: 1.2, ease: 'power3.inOut' }, 'B+=0.3')
      .to(q('.o-lampglow'), { opacity: 0.55, duration: 1.2 }, 'B+=0.3')
      .to(st, { rot: 0.25, duration: 1.4, ease: 'power2.in' }, 'B+=0.4')
      .to(st, { fall: 1, duration: 2.6, ease: 'none' }, 'B+=1.0')
      .fromTo(q('.o-floorglow'), { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'power2.in' }, 'B+=1.8')
      .to(q('.o-shaft'), { opacity: 0.25, duration: 1.6 }, 'B+=1.2')
      .addLabel('C', 7.4)
      // купол расходится: тяжёлые створки, разгон — ход — дожим
      .to(q('.o-half-l'), { x: -560, duration: 2.2, ease: 'power3.inOut' }, 'C')
      .to(q('.o-half-r'), { x: 560, duration: 2.2, ease: 'power3.inOut' }, 'C')
      .to(q('.o-half-l'), { x: -540, duration: 0.5, ease: 'sine.out' }, 'C+=2.2')
      .to(q('.o-half-r'), { x: 540, duration: 0.5, ease: 'sine.out' }, 'C+=2.2')
      .to(q('.o-shaft'), { opacity: 0, duration: 1.2 }, 'C+=0.4')
      .to(q('.o-flame'), { rotation: 0, duration: 1.6, ease: 'elastic.out(1, 0.5)' }, 'C+=0.6')
      .to(q('.o-lampglow'), { opacity: 1, duration: 1.2 }, 'C+=0.6')
      .to(st, { rise: 1, duration: 2.6, ease: 'none' }, 'C+=0.8')
      .to(q('.o-floorglow'), { opacity: 0, duration: 1.6 }, 'C+=1.0')
      .to(q('.o-scope'), { rotation: AIM - 3, duration: 2.4, ease: 'power2.inOut' }, 'C+=0.8') // телескоп провожает звёзды
      .fromTo(q('.o-pool'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 1.4, stagger: 0.1, ease: 'power2.out' }, 'C+=2.2')
      .to(st, { optGlow: 1, duration: 1.2, ease: 'power2.out' }, 'C+=2.4')
      .addLabel('D', 10.6)
      .fromTo(q('.o-q .split'), { opacity: 0, y: -18, color: '#bcd0ff' }, { opacity: 1, y: 0, color: '#f4f2ff', duration: 1.0, stagger: { each: 0.014, from: 'random' }, ease: 'power3.out' }, 'D')
      .to(lines, { strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: 'power2.inOut' }, 'D+=0.3')
      .fromTo(q('.o-num'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 'D+=0.2')
      .fromTo(q('.o-opt'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }, 'D+=0.8')
      .fromTo(q('.o-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.4')
      .addLabel('E', 13.2)
      .to(q('.o-cam'), { scale: 1.0, duration: 4, ease: 'sine.inOut' }, 'E')
      .to({}, { duration: 4 }, 'E')

    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        st.lit = n; st.phase = phaseOf(n)
        root.current?.setAttribute('data-ph', st.phase)
      },
      dispose: () => gsap.ticker.remove(draw),
    })
    return () => { gsap.ticker.remove(draw); tl.kill() }
  }, [onReady])

  // рёбра купола сходятся к зениту за кадром
  const ribsL = [-120, 120, 360, 600, 820], ribsR = [1540, 1760, 1980, 2200]
  const rib = (x: number) => `M ${x} 880 Q ${x + (1160 - x) * 0.18} 300 ${1160 + (x - 1160) * 0.12} -120`
  const halfL = `M -40 -40 L ${SLIT.t0} -40 L ${SLIT.b0} ${SLIT.by} Q 400 905 -40 890 Z`
  const halfR = `M 1960 -40 L ${SLIT.t1} -40 L ${SLIT.b1} ${SLIT.by} Q 1800 905 1960 890 Z`
  return (
    <div className="o-root" ref={root} data-ph="normal">
      <div className="o-cam lay">
        <div className="o-skybg lay" />
        <svg className="lay o-far" viewBox="0 0 1920 1080" aria-hidden>
          <defs>
            <linearGradient id="o-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a4a8c" stopOpacity="0" /><stop offset="1" stopColor="#3a4a8c" stopOpacity=".45" /></linearGradient>
          </defs>
          <path d="M 0 860 L 180 800 L 340 830 L 560 760 L 760 812 L 980 744 L 1200 806 L 1420 772 L 1660 820 L 1920 780 L 1920 900 L 0 900 Z" fill="#1a2148" />
          <path d="M 0 880 L 240 846 L 520 872 L 820 830 L 1100 868 L 1380 836 L 1700 870 L 1920 850 L 1920 900 L 0 900 Z" fill="#11163a" />
          <rect y="640" width="1920" height="260" fill="url(#o-haze)" />
        </svg>
        <canvas ref={skyCv} className="lay" width={1920} height={1080} />
        <svg className="lay" viewBox="0 0 1920 1080" aria-hidden>
          <defs>
            <linearGradient id="o-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#030409" /><stop offset=".8" stopColor="#080a18" /><stop offset="1" stopColor="#0e1128" /></linearGradient>
            <linearGradient id="o-shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfdcff" stopOpacity=".22" /><stop offset="1" stopColor="#cfdcff" stopOpacity="0" /></linearGradient>
            <linearGradient id="o-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d1026" /><stop offset="1" stopColor="#05060e" /></linearGradient>
            <radialGradient id="o-fglow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#b9c8ff" stopOpacity=".55" /><stop offset="1" stopColor="#b9c8ff" stopOpacity="0" /></radialGradient>
            <radialGradient id="o-warm" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffb866" stopOpacity=".5" /><stop offset="1" stopColor="#ffb866" stopOpacity="0" /></radialGradient>
            <linearGradient id="o-tube" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5b6aa6" /><stop offset=".12" stopColor="#1d2240" /><stop offset=".7" stopColor="#0a0c18" /><stop offset="1" stopColor="#05060c" /></linearGradient>
          </defs>
          {/* пол и рельс купола */}
          <path d="M 0 880 Q 960 900 1920 880 L 1920 1080 L 0 1080 Z" fill="url(#o-floor)" />
          <ellipse cx="1100" cy="1010" rx="980" ry="70" fill="none" stroke="#2a3160" strokeWidth="3" opacity=".7" />
          <ellipse cx="1100" cy="975" rx="560" ry="46" className="o-floorglow" fill="url(#o-fglow)" />
          {OX.map(x => <ellipse key={x} className="o-pool" cx={x} cy="985" rx="120" ry="16" fill="url(#o-warm)" />)}
          {/* столб звёздного света от щели */}
          <polygon className="o-shaft" points="1010,0 1310,0 1640,960 1180,960" fill="url(#o-shaft)" />
          {/* створки купола с рёбрами */}
          <g className="o-half-l"><path d={halfL} fill="url(#o-wall)" />
            {ribsL.map(x => <g key={x}><path d={rib(x)} stroke="#020308" strokeWidth="22" fill="none" /><path d={rib(x)} stroke="#2a3264" strokeWidth="2" fill="none" transform="translate(9 0)" opacity=".6" /></g>)}
            <path d={`M ${SLIT.t0} -40 L ${SLIT.b0} ${SLIT.by}`} stroke="#6a7cc4" strokeWidth="3" opacity=".7" /></g>
          <g className="o-half-r"><path d={halfR} fill="url(#o-wall)" />
            {ribsR.map(x => <g key={x}><path d={rib(x)} stroke="#020308" strokeWidth="22" fill="none" /><path d={rib(x)} stroke="#2a3264" strokeWidth="2" fill="none" transform="translate(-9 0)" opacity=".6" /></g>)}
            <path d={`M ${SLIT.t1} -40 L ${SLIT.b1} ${SLIT.by}`} stroke="#6a7cc4" strokeWidth="3" opacity=".7" />
          </g>
          <g className="o-lamp">
            {/* лампа на картографическом столе — единственный тёплый свет */}
            <ellipse className="o-lampglow" cx="1830" cy="860" rx="260" ry="200" fill="url(#o-warm)" />
            <rect x="1700" y="880" width="260" height="14" fill="#1a1410" /><rect x="1716" y="894" width="10" height="200" fill="#120d09" />
            <rect x="1812" y="846" width="36" height="34" rx="6" fill="#3a2a18" />
            <g className="o-flame"><path d="M 1830 806 C 1842 822 1840 838 1830 846 C 1820 838 1818 822 1830 806 Z" fill="#ffd28a" /></g>
          </g>
          {/* телескоп — тёмная масса переднего плана, вращается вокруг монтировки */}
          <path d="M 236 1080 L 282 914 L 378 914 L 424 1080 Z" fill="#05060c" /><path d="M 282 914 L 378 914" stroke="#2c3566" strokeWidth="2" />
          <path d="M 280 930 L 300 846 L 316 846 L 312 930 Z M 380 930 L 360 846 L 344 846 L 348 930 Z" fill="#090b16" />
          <g className="o-scope">
            <rect x={PIVOT.x - 250} y={PIVOT.y + 40} width="16" height="190" fill="#090b16" />
            <rect x={PIVOT.x - 272} y={PIVOT.y + 190} width="60" height="70" rx="6" fill="#0b0d1a" stroke="#2c3566" strokeWidth="2" />
            <path d={`M ${PIVOT.x - 300} ${PIVOT.y - 46} L ${PIVOT.x + 330} ${PIVOT.y - 58} L ${PIVOT.x + 330} ${PIVOT.y + 58} L ${PIVOT.x - 300} ${PIVOT.y + 46} Z`} fill="url(#o-tube)" />
            <path d={`M ${PIVOT.x + 320} ${PIVOT.y - 74} L ${PIVOT.x + 500} ${PIVOT.y - 78} L ${PIVOT.x + 500} ${PIVOT.y + 78} L ${PIVOT.x + 320} ${PIVOT.y + 74} Z`} fill="url(#o-tube)" />
            <path d={`M ${PIVOT.x - 300} ${PIVOT.y - 46} L ${PIVOT.x + 330} ${PIVOT.y - 58} M ${PIVOT.x + 320} ${PIVOT.y - 74} L ${PIVOT.x + 500} ${PIVOT.y - 78}`} stroke="#8a9ad8" strokeWidth="2" opacity=".55" />
            <ellipse cx={PIVOT.x + 500} cy={PIVOT.y} rx="14" ry="78" fill="#03040a" stroke="#4a5690" strokeWidth="2" />
            {[-180, 60, 250].map(d => <rect key={d} x={PIVOT.x + d} y={PIVOT.y - 62} width="10" height="124" fill="#0c0e1c" stroke="#3a4475" strokeWidth="1.5" />)}
            <rect x={PIVOT.x - 360} y={PIVOT.y - 22} width="64" height="44" rx="4" fill="#0a0c18" stroke="#3a4475" strokeWidth="1.5" />
            <rect x={PIVOT.x - 20} y={PIVOT.y - 92} width="240" height="20" rx="6" fill="#0a0c18" stroke="#3a4475" strokeWidth="1.5" />
            <circle cx={PIVOT.x} cy={PIVOT.y} r="30" fill="#0c0e1c" stroke="#4a5690" strokeWidth="2.5" />
          </g>
          {/* созвездие, связывающее варианты */}
          <g className="o-const" fill="none" stroke="#ffd9a8" strokeWidth="1.6" opacity=".55">
            {[0, 1, 2].map(i => <path key={i} d={`M ${OX[i]} ${OYS[i]} L ${OX[i + 1]} ${OYS[i + 1]}`} />)}
          </g>
        </svg>
        <canvas ref={roomCv} className="lay" width={1920} height={1080} />
        <div className="o-dial" style={css({ left: P.x, top: P.y })}><span className="o-num" ref={tnum}>30</span></div>
        <p className="o-q"><Letters text={QUESTION.text} /></p>
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className="o-opt" style={css({ left: OX[i], top: OY })}><b>{o.key}</b><span>{o.text}</span></div>
        ))}
        <div className="o-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
