// ═══ 01 · Обсерватория — «небесную механику можно переписать» ═══
// A: ночь над обсерваторией, телескоп медленно ищет полюс.
// B: небо раскручивается (треки длинной выдержки), останавливается — и звёзды
//    отпускают свои орбиты: падают к Полярной, как будто гравитацию перенаправили.
// C: часть звёзд застывает кольцом из 30 делений вокруг полюса (таймер), часть —
//    дугой небесного горизонта; четыре из них разгораются в варианты ответа.
// D: вопрос конденсируется из звёздной пыли. E: всё успокаивается, кольцо считает.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, css, seeded, phaseOf, Letters, type SceneProps } from './kit'

const P = { x: 960, y: 250 }, RING = 122
const ARC = { cx: 960, cy: 1170, rx: 1120, ry: 440 }
const arcY = (x: number) => ARC.cy - ARC.ry * Math.sqrt(Math.max(0, 1 - ((x - ARC.cx) / ARC.rx) ** 2))
const OPT_X = [680, 1010, 1340, 1670]

type Star = { r: number; a: number; s: number; b: number; role: 'ring' | 'arc' | 'fall'; tx: number; ty: number; k: number }
function makeStars() {
  const rnd = seeded(1609), out: Star[] = []
  for (let i = 0; i < 1500; i++) {
    const x = rnd() * 2400 - 240, y = rnd() * 1300 - 260
    const r = Math.hypot(x - P.x, y - P.y), a = Math.atan2(y - P.y, x - P.x)
    out.push({ r, a, s: rnd() < 0.06 ? 2.8 : rnd() < 0.35 ? 1.8 : 1.1, b: 0.5 + rnd() * 0.5, role: 'fall', tx: 0, ty: 0, k: rnd() })
  }
  // 30 ближайших к кольцу звёзд станут делениями таймера, 70 — небесным горизонтом
  const byRing = [...out].sort((p, q) => Math.abs(p.r - 340) - Math.abs(q.r - 340))
  byRing.slice(0, 30).forEach((s, i) => { s.role = 'ring'; const a = -Math.PI / 2 + (i / 30) * Math.PI * 2; s.tx = P.x + Math.cos(a) * RING; s.ty = P.y + Math.sin(a) * RING; s.k = i })
  byRing.slice(30, 100).forEach((s, i) => { s.role = 'arc'; const x = 120 + (i / 69) * 1680; s.tx = x; s.ty = arcY(x); s.k = i })
  return out
}

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const stars = makeStars()
    const st = { rot: 0, trail: 0, fall: 0, settle: 0, swallow: 0, pole: 0.6, lit: 30, phase: 'normal', band: 1 }
    const ctx = cv.current!.getContext('2d')!
    const draw = () => {
      ctx.clearRect(0, 0, 1920, 1080)
      // Млечный путь: мягкая диагональная полоса из точек, гаснет, когда звёзды уходят
      ctx.globalCompositeOperation = 'lighter'
      for (const s of stars) {
        const a = s.a + st.rot
        let x = P.x + Math.cos(a) * s.r, y = P.y + Math.sin(a) * s.r
        let alpha = s.b
        if (s.role === 'fall' && s.k < 0.14) { /* часть неба остаётся — фон не пустеет */ }
        else if (s.role === 'fall') {
          const f = Math.min(1, Math.max(0, st.fall * 1.25 - s.k * 0.25))
          const e = f * f * f
          x += (P.x - x) * e; y += (P.y - y) * e
          alpha *= 1 - st.swallow * Math.min(1, f * 1.4)
          if (f > 0 && f < 1) { // хвост падения — прямой, к полюсу
            ctx.strokeStyle = `rgba(214,226,255,${alpha * 0.55})`; ctx.lineWidth = s.s * 0.8
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - (P.x - x) * 0.18 * f, y - (P.y - y) * 0.18 * f); ctx.stroke()
          }
        } else {
          const f = st.settle
          const e = 1 - Math.pow(1 - f, 3)
          x += (s.tx - x) * e; y += (s.ty - y) * e
          if (s.role === 'ring') {
            const on = s.k < st.lit
            alpha = on ? 1 : 0.18 + (1 - e) * 0.6
          }
        }
        if (st.trail > 0.01 && st.fall < 0.02) { // треки длинной выдержки вокруг полюса
          ctx.strokeStyle = `rgba(200,214,255,${alpha * 0.5})`; ctx.lineWidth = s.s * 0.7
          ctx.beginPath(); ctx.arc(P.x, P.y, s.r, a - st.trail, a); ctx.stroke()
        }
        const warm = s.role === 'ring' && st.phase !== 'normal'
        ctx.fillStyle = warm ? (st.phase === 'zero' ? `rgba(120,110,150,${alpha})` : `rgba(255,${120 + s.k * 2},${90},${alpha})`) : `rgba(240,244,255,${alpha})`
        const sz = s.role === 'ring' ? s.s + st.settle * 1.6 : s.s
        ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2); ctx.fill()
      }
      // Полярная: копит свет поглощённых звёзд
      const g = ctx.createRadialGradient(P.x, P.y, 0, P.x, P.y, 60 + st.pole * 60)
      const pc = st.phase === 'zero' ? '150,140,190' : st.phase === 'warning' ? '255,170,140' : '255,246,226'
      g.addColorStop(0, `rgba(${pc},${0.9 * st.pole})`); g.addColorStop(0.15, `rgba(${pc},${0.35 * st.pole})`); g.addColorStop(1, `rgba(${pc},0)`)
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(P.x, P.y, 60 + st.pole * 60, 0, Math.PI * 2); ctx.fill()
      ctx.globalCompositeOperation = 'source-over'
    }
    gsap.ticker.add(draw)

    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
      .fromTo(q('.o-cam'), { scale: 1.08, y: 60 }, { scale: 1, y: 0, duration: 4, ease: 'power1.inOut' }, 0)
      .fromTo(q('.o-scope'), { rotation: -12, transformOrigin: '50% 100%' }, { rotation: 46, transformOrigin: '50% 100%', duration: 3.2, ease: 'power2.inOut' }, 0.2)
      .addLabel('B', 3.6)
      .to(q('.o-scope'), { rotation: 43, duration: 0.25, ease: 'power1.out' }, 'B') // предвосхищение: отдача
      .to(q('.o-scope'), { rotation: 50.5, duration: 0.5, ease: 'back.out(3)' }, 'B+=0.25')
      .to(st, { trail: 1.4, rot: 0.9, duration: 2.0, ease: 'power3.in' }, 'B+=0.35')
      .to(st, { trail: 0, duration: 0.18, ease: 'none' }, 'B+=2.35') // небо резко встало
      .to(q('.o-shake'), { x: 6, duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, 'B+=2.35')
      .to(st, { fall: 1, duration: 2.4, ease: 'none' }, 'B+=2.5')
      .to(st, { swallow: 1, pole: 1.8, duration: 2.4, ease: 'power2.in' }, 'B+=2.5')
      .addLabel('C', 7.2)
      .to(st, { settle: 1, duration: 2.2, ease: 'power3.out' }, 'C')
      .to(st, { pole: 1, duration: 1.6, ease: 'power2.out' }, 'C+=0.4')
      .fromTo(q('.o-slit-l'), { x: 0 }, { x: -120, duration: 1.6, ease: 'power3.inOut' }, 'C+=0.2')
      .fromTo(q('.o-slit-r'), { x: 0 }, { x: 120, duration: 1.6, ease: 'power3.inOut' }, 'C+=0.2')
      .fromTo(q('.o-slitgap'), { opacity: 0 }, { opacity: 0.5, duration: 1.2 }, 'C+=0.6')
      .fromTo(q('.o-beam'), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }, 'C+=1.2')
      .fromTo(q('.o-opt .o-planet'), { scale: 0.1 }, { scale: 1, duration: 1.2, stagger: 0.12, ease: 'back.out(1.6)' }, 'C+=1.6')
      .addLabel('D', 10.4)
      .fromTo(q('.o-q .split'), { opacity: 0, scale: 0.2, filter: 'blur(8px)', color: '#cfe0ff' }, { opacity: 1, scale: 1, filter: 'blur(0px)', color: '#f3f1ff', duration: 0.9, stagger: { each: 0.018, from: 'center' }, ease: 'power3.out' }, 'D')
      .fromTo(q('.o-num'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 'D+=0.2')
      .fromTo(q('.o-opt span'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 'D+=1.0')
      .fromTo(q('.o-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.4')
      .addLabel('E', 13)
      .to(q('.o-cam'), { scale: 1, y: -6, duration: 4, ease: 'sine.inOut' }, 'E')
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

  return (
    <div className="o-root" ref={root} data-ph="normal">
      <div className="o-sky" />
      <div className="o-cam lay"><div className="o-shake lay">
        <canvas ref={cv} width={1920} height={1080} />
        <div className="o-beam" />
        <svg className="o-dome" viewBox="0 0 1920 1080" aria-hidden>
          <defs><linearGradient id="o-domeg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a3566" /><stop offset="1" stopColor="#0c1230" /></linearGradient></defs>
          <path d="M 0 1080 L 0 1030 C 400 1010 700 1000 960 1000 C 1220 1000 1520 1010 1920 1030 L 1920 1080 Z" fill="#070b22" />
          <g transform="translate(330 1012) scale(.78)">
            <g className="o-scope"><rect x="-22" y="-470" width="44" height="330" rx="10" fill="#1a2350" stroke="#3a4a8a" strokeWidth="2" /><rect x="-30" y="-480" width="60" height="26" rx="6" fill="#26326a" /></g>
            <rect x="-250" y="-120" width="500" height="120" fill="#0d1434" />
            {[-180, -90, 0, 90, 180].map(x => <rect key={x} x={x - 9} y="-80" width="18" height="34" rx="9" fill="#ffcf7a" opacity=".75" />)}
            <path d="M -250 -120 A 250 250 0 0 1 250 -120 Z" fill="url(#o-domeg)" stroke="#3a4a8a" strokeWidth="2" />
            <clipPath id="o-domeclip"><path d="M -250 -120 A 250 250 0 0 1 250 -120 Z" /></clipPath>
            <rect className="o-slitgap" x="-34" y="-372" width="68" height="252" fill="#ffcf7a" opacity=".0" />
            <g clipPath="url(#o-domeclip)"><rect className="o-slit-l" x="-34" y="-380" width="34" height="262" fill="#212b5c" stroke="#3a4a8a" strokeWidth="2" /><rect className="o-slit-r" x="0" y="-380" width="34" height="262" fill="#212b5c" stroke="#3a4a8a" strokeWidth="2" /></g>
          </g>
        </svg>
        <div className="o-dial"><span className="o-num" ref={tnum}>30</span></div>
        <p className="o-q"><Letters text={QUESTION.text} /></p>
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className="o-opt" style={css({ left: OPT_X[i], top: arcY(OPT_X[i]) })}>
            <i className="o-planet" style={css({ '--h': [200, 32, 280, 160][i] })}><b>{o.key}</b></i><span>{o.text}</span>
          </div>
        ))}
        <div className="o-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div></div>
    </div>
  )
}
