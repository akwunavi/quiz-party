// ═══ 06 · Затонувшая академия — «вода меняет свойства и управляет пространством» ═══
// Грамматика леса: камера на уровне глаз в затопленном зале, разбитая колонна
// переднего плана слева, колоннада уходит в зелёную мглу к светлому порталу,
// сверху — лучи, по камню — блики. Тёплый акцент — золото надписей.
// A: зал под водой: взвесь плывёт, пузыри поднимаются из трещин пола.
// B: вода замирает — взвесь и пузыри встают; по залу проходит волна давления,
//    и вода начинает отступать ВВЕРХ: снизу открывается сухой камень, капли падают.
// C: вода поднимается под своды и держится там потолком; блики ложатся на пол,
//    с балюстрады стекает вода — проступает золото, клепсидра наполняется.
// D: вопрос «выпадает» из водяного потолка, время — в клепсидре.
// E: зал сухой, вода над головой дышит; клепсидра пустеет вместе с таймером.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, seeded, noise2, phaseOf, Letters, css, type SceneProps } from './kit'

const V = { x: 1170, y: 520 }
const PX = [760, 1040, 1320, 1600]
const zMax = 7, sOf = (z: number) => (1 - 1 / z) / (1 - 1 / zMax)
const FAR = { l: 1060, r: 1280, t: 300, b: 640 }

function Colonnade() {
  // колонны по обе стороны: ближние крупные и светлее, дальние тонут в мгле
  const cols: JSX.Element[] = []
  for (const side of [-1, 1]) {
    const nx = side < 0 ? 300 : 2020, fx = side < 0 ? FAR.l : FAR.r
    for (let z = 1.25; z < zMax; z *= 1.32) {
      const s = sOf(z), x = nx + (fx - nx) * s, w = 120 * (1 - s) + 10
      const yb = 1000 + (FAR.b - 1000) * s, yt = -100 + (FAR.t + 100) * s
      const k = Math.round(40 + 60 * s)
      cols.push(<g key={`${side}${z}`} opacity={1 - s * 0.55}>
        <rect x={x - w / 2} y={yt} width={w} height={yb - yt} fill={`url(#a-col)`} />
        <rect x={x - w * 0.62} y={yb - w * 0.35} width={w * 1.24} height={w * 0.35} fill="#3a352d" />
        <rect x={x - w * 0.62} y={yt + 30 * (1 - s)} width={w * 1.24} height={w * 0.3} fill="#4a443a" />
        <rect x={x - w / 2} y={yt} width={w} height={yb - yt} fill={`rgb(${k / 3},${k / 2.6},${k / 2.4})`} opacity={s * 0.8} />
      </g>)
    }
  }
  return <>{cols}</>
}

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const clep = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = root.current!
    const q = gsap.utils.selector(root)
    const r = seeded(606), nz = noise2(12)
    const snow = Array.from({ length: 130 }, () => ({ x: r() * 1920, y: r() * 1080, s: 1 + r() * 2.2, ph: r() * 30, sp: 0.4 + r() }))
    const bub = Array.from({ length: 34 }, () => ({ x: 560 + r() * 1300, y0: 980 - r() * 60, s: 2 + r() * 5, ph: r() * 900, sp: 40 + r() * 60 }))
    const st = { wl: 1110, freeze: 0, dry: 0 }
    const ctx = cv.current!.getContext('2d')!
    let frozenT = 0
    const draw = () => {
      const t = gsap.ticker.time
      if (st.freeze < 1) frozenT = t
      el.style.setProperty('--wl', `${st.wl}px`)
      ctx.clearRect(0, 0, 1920, 1080)
      ctx.globalCompositeOperation = 'lighter'
      // блики: под водой — на стенах и полу, после — проекция водяного потолка на сухой пол
      {
        const tc = frozenT * (1 - st.dry) + t * st.dry
        ctx.lineWidth = 2
        for (let i = 0; i < 18; i++) {
          ctx.strokeStyle = `rgba(190,255,240,${0.06 + 0.05 * st.dry})`
          ctx.beginPath()
          for (let x = 300; x <= 2000; x += 80) {
            const y = 660 + i * 22 + (nz(x * 0.004 + tc * 0.3, i * 0.7) - 0.5) * 70
            const xx = V.x + (x - V.x) * (0.4 + i * 0.04)
            if (x === 300) ctx.moveTo(xx, y); else ctx.lineTo(xx, y)
          }
          ctx.stroke()
        }
      }
      // взвесь и пузыри: в воде висят/плывут; ниже уровня воды — падают каплями
      ctx.fillStyle = '#cfeee6'
      for (const p of snow) {
        const x = p.x + (nz(p.ph, frozenT * 0.05) - 0.5) * 120
        let y = (p.y + frozenT * 8 * p.sp) % 1080
        let a = 0.45
        if (y > st.wl) { const d = y - st.wl; y += d * d * 0.004; a *= Math.max(0, 1 - d / 500) }
        if (a <= 0.01 || y > 1080) continue
        ctx.globalAlpha = a; ctx.fillRect(x, y, p.s, p.s)
      }
      ctx.strokeStyle = '#d8fff6'
      for (const b of bub) {
        let y = b.y0 - ((frozenT * b.sp + b.ph) % 900)
        let a = 0.55
        if (y > st.wl) { const d = y - st.wl; y += d * d * 0.005; a *= Math.max(0, 1 - d / 400) }
        if (a <= 0.01 || y > 1080) continue
        ctx.globalAlpha = a; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(b.x + Math.sin(frozenT + b.ph) * 6, y, b.s, 0, Math.PI * 2); ctx.stroke()
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
    }
    gsap.ticker.add(draw)

    gsap.set(q('.a-gold'), { '--wet': 1 })
    gsap.set(q('.a-ring'), { svgOrigin: `${V.x} 540` })
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
      .fromTo(q('.a-cam'), { scale: 1.08, x: -30 }, { scale: 1.02, x: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .fromTo(q('.a-far'), { x: -14 }, { x: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .addLabel('B', 3.6)
      // предвосхищение: вода «схватывается» — всё встаёт
      .to(st, { freeze: 1, duration: 0.5, ease: 'power2.out' }, 'B')
      .fromTo(q('.a-ring'), { scale: 0.15, opacity: 1 }, { scale: 4, opacity: 0, duration: 1.6, ease: 'power2.out' }, 'B+=0.6')
      .to(q('.a-cam'), { y: 5, duration: 0.06, yoyo: true, repeat: 5, ease: 'none' }, 'B+=0.7')
      // вода уходит вверх: медленный разгон…
      .to(st, { wl: 660, duration: 2.6, ease: 'power2.in' }, 'B+=1.2')
      .addLabel('C', 7.4)
      // …ход и мягкая доводка с перелётом, как у тяжёлой жидкости
      .to(st, { wl: 128, duration: 2.0, ease: 'power3.out' }, 'C')
      .to(st, { wl: 150, duration: 1.0, ease: 'sine.inOut' }, 'C+=2.0')
      .to(st, { dry: 1, duration: 2.0 }, 'C+=0.4')
      .to(q('.a-gold'), { '--wet': 0, duration: 1.6, stagger: 0.15, ease: 'power1.inOut' }, 'C+=0.6')
      .fromTo(q('.a-stream'), { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: 'power2.in' }, 'C+=1.0')
      .fromTo(clep.current, { '--fill': 0 }, { '--fill': 1, duration: 1.8, ease: 'power1.inOut' }, 'C+=1.3')
      .to(q('.a-stream'), { opacity: 0, duration: 0.5 }, 'C+=3.0')
      .addLabel('D', 10.6)
      // вопрос выпадает из водяного потолка: буква — как капля, с отскоком
      .fromTo(q('.a-q .split'), { opacity: 0, y: -60, color: '#9ff0e0' }, { opacity: 1, y: 0, color: '#f2faf6', duration: 0.8, stagger: { each: 0.012, from: 'random' }, ease: 'back.out(2.2)' }, 'D')
      .fromTo(q('.a-time'), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 'D+=0.3')
      .fromTo(q('.a-gold .t'), { opacity: 0.35 }, { opacity: 1, duration: 0.8, stagger: 0.1 }, 'D+=0.5')
      .fromTo(q('.a-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.4')
      .addLabel('E', 13.2)
      .to(q('.a-cam'), { scale: 1, duration: 4, ease: 'sine.inOut' }, 'E')
      .to({}, { duration: 4 }, 'E')

    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        el.setAttribute('data-ph', phaseOf(n))
        clep.current?.style.setProperty('--lvl', String(Math.max(0, n) / 30))
      },
      dispose: () => gsap.ticker.remove(draw),
    })
    return () => { gsap.ticker.remove(draw); tl.kill() }
  }, [onReady])

  return (
    <div className="a-root" ref={root} data-ph="normal" style={css({ '--wl': '1110px' })}>
      <div className="a-cam lay">
        <svg className="lay a-far" viewBox="0 0 1920 1080" aria-hidden>
          <defs>
            <linearGradient id="a-col" x1="0" x2="1"><stop offset="0" stopColor="#2c2822" /><stop offset=".35" stopColor="#8a8070" /><stop offset=".6" stopColor="#6a6254" /><stop offset="1" stopColor="#24201b" /></linearGradient>
            <linearGradient id="a-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a6458" /><stop offset=".3" stopColor="#3e382f" /><stop offset="1" stopColor="#1a1714" /></linearGradient>
            <linearGradient id="a-refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8f4ec" stopOpacity=".5" /><stop offset="1" stopColor="#e8f4ec" stopOpacity="0" /></linearGradient>
            <linearGradient id="a-fg" x1="0" x2="1"><stop offset="0" stopColor="#080706" /><stop offset=".7" stopColor="#1a1714" /><stop offset="1" stopColor="#3a342b" /></linearGradient>
            <radialGradient id="a-portal" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f1f7ee" stopOpacity=".95" /><stop offset=".35" stopColor="#bfe2d6" stopOpacity=".45" /><stop offset="1" stopColor="#bfe2d6" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="#211e1a" />
          <path d={`M ${FAR.l} ${FAR.b} L ${FAR.r} ${FAR.b} L 2400 1080 L -480 1080 Z`} fill="url(#a-floor)" />
          {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M ${V.x + (i - 6) * 18} ${FAR.b} L ${V.x + (i - 6) * 320} 1080`} stroke="#15120f" strokeWidth="2" opacity=".6" />)}
          {[700, 760, 840, 950].map(y => <path key={y} d={`M 0 ${y} L 1920 ${y}`} stroke="#15120f" strokeWidth="2" opacity=".5" />)}
          <rect x={FAR.l} y={FAR.t} width={FAR.r - FAR.l} height={FAR.b - FAR.t} fill="#2c2924" />
          <ellipse cx={V.x} cy="540" rx="420" ry="320" fill="url(#a-portal)" />
          <path d={`M 1120 640 L 1120 470 A 50 50 0 0 1 1220 470 L 1220 640 Z`} fill="#eef6ee" />
          <path d="M 1120 640 L 1220 640 L 1300 1000 L 1040 1000 Z" fill="url(#a-refl)" />
          <Colonnade />
          {/* разбитая колонна переднего плана */}
          <path d="M -20 1100 L -20 -20 L 250 -20 L 250 120 L 228 160 L 262 210 L 240 1100 Z" fill="url(#a-fg)" />
          <path d="M 230 -20 L 232 1100" stroke="#5a5244" strokeWidth="3" opacity=".6" />
          {[90, 150].map(x => <path key={x} d={`M ${x} -20 L ${x} 1100`} stroke="#060504" strokeWidth="10" opacity=".7" />)}
          {/* балюстрада: перила и столбики между панелями */}
          <rect x="560" y="700" width="1240" height="22" fill="#5c5446" /><rect x="560" y="722" width="1240" height="6" fill="#2a2620" />
          <rect x="560" y="868" width="1240" height="40" fill="#3e382f" /><rect x="540" y="908" width="1280" height="172" fill="#24201b" />
          {[620, 900, 1180, 1460, 1740].map(x => <rect key={x} x={x - 14} y="728" width="28" height="140" fill="#4a4338" />)}
          {/* клепсидра: стеклянный цилиндр на подставке */}
          <rect x="320" y="880" width="140" height="200" fill="#1c1915" /><rect x="306" y="868" width="168" height="16" fill="#4a4338" />
          <rect x="340" y="370" width="100" height="500" rx="10" fill="rgba(200,240,235,.06)" stroke="#9fc8c0" strokeWidth="2" opacity=".8" />
          <rect x="332" y="358" width="116" height="14" rx="4" fill="#5c5446" />
        </svg>
        {/* надписи балюстрады и вода в клепсидре — ПОД водяным слоем, чтобы тонуть вместе с залом */}
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className="a-gold" style={css({ left: PX[i] })}><div className="t"><b>{o.key}</b><span>{o.text}</span></div></div>
        ))}
        <div className="a-clep" ref={clep} style={css({ '--lvl': 1, '--fill': 0 })}><div className="w" /></div>
        <div className="a-stream" />
        {/* вода: тонировка, лучи, кольцо давления — обрезаны по уровню воды */}
        <div className="a-water">
          <div className="tint" /><div className="deep" />
          <svg className="lay" viewBox="0 0 1920 1080" aria-hidden>
            <defs><linearGradient id="a-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d6fff4" stopOpacity=".3" /><stop offset="1" stopColor="#d6fff4" stopOpacity="0" /></linearGradient></defs>
            {[[820, 140], [1180, 110], [1500, 160]].map(([x, w], i) => <polygon key={i} className="a-rayp" points={`${x},0 ${x + w},0 ${x + w * 1.9 - 260},1080 ${x - 260},1080`} fill="url(#a-ray)" />)}
            <g className="a-ring"><ellipse cx={V.x} cy="540" rx="240" ry="120" fill="none" stroke="#d8fff4" strokeWidth="18" opacity=".12" /><ellipse cx={V.x} cy="540" rx="240" ry="120" fill="none" stroke="#d8fff4" strokeWidth="2" opacity=".5" /></g>
          </svg>
        </div>
        <canvas ref={cv} width={1920} height={1080} />
        {/* поверхность воды, видимая снизу: зеркальная кромка */}
        <div className="a-surface"><svg viewBox="0 0 3840 60" preserveAspectRatio="none" aria-hidden>
          <path d={`M 0 30 ${Array.from({ length: 48 }, (_, i) => `Q ${i * 80 + 40} ${i % 2 ? 14 : 46} ${i * 80 + 80} 30`).join(' ')}`} fill="none" stroke="#e6fff8" strokeWidth="4" />
          <path d={`M 0 30 ${Array.from({ length: 48 }, (_, i) => `Q ${i * 80 + 40} ${i % 2 ? 14 : 46} ${i * 80 + 80} 30`).join(' ')} L 3840 0 L 0 0 Z`} fill="rgba(160,240,225,.18)" />
        </svg></div>
        <div className="a-time"><span ref={tnum}>30</span></div>
        <p className="a-q"><Letters text={QUESTION.text} /></p>
        <div className="a-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
