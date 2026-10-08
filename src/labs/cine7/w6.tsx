// ═══ 06 · Затонувшая академия — «вода меняет свои свойства и распоряжается пространством» ═══
// A: под водой — мраморная колоннада, сверху светится поверхность, по колоннам
//    бегут каустики. B: вода замирает, а затем ВСЯ уходит вверх: поверхность
//    поднимается и становится потолком, зал высыхает, в воздухе повисают капли.
// C: с водяного потолка тянутся капли; из воды под потолком отделяется плоская
//    линза и повисает в воздухе, из неё вниз медленно текут четыре струи.
// D: вопрос проявляется в линзе (преломлённые слова выпрямляются), струи
//    наполняют чаши вариантов. E: капли таймера по одной падают в линзу.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, phaseOf, css, noise2, type SceneProps } from './kit'

const NICHE = [360, 760, 1160, 1560], COLS = [160, 560, 960, 1360, 1760]
const DROPS = Array.from({ length: 30 }, (_, i) => 330 + i * 44)

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const nz = noise2(66)
    const st = { under: 1, surf: 0, still: 0 }
    const ctx = cv.current!.getContext('2d')!
    const draw = (t: number) => {
      ctx.clearRect(0, 0, 1920, 1080)
      const speed = 1 - st.still
      const tt = t * 0.35 * speed + st.still * 3
      // каустики: под водой — по всей сцене, после ухода воды — только в потолке
      const yMax = st.under > 0.01 ? 1080 * st.under + st.surf : st.surf
      ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 2.2; ctx.lineCap = 'round'
      for (let i = 0; i < 32; i++) {
        const y0 = (i / 32) * 1100 - 20
        if (y0 > yMax) break
        ctx.strokeStyle = `rgba(210,255,246,${0.10 + 0.08 * Math.sin(i)})`
        ctx.beginPath()
        for (let x = -20; x <= 1960; x += 60) {
          const y = y0 + (nz(x * 0.004 + tt, i * 0.7) - 0.5) * 70
          if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'
    }
    const tick = () => draw(gsap.ticker.time)
    gsap.ticker.add(tick)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
      .fromTo(q('.u-cam'), { scale: 1.1, y: -30 }, { scale: 1.02, y: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .fromTo(q('.u-ray'), { opacity: 0.25 }, { opacity: 0.6, duration: 2, yoyo: true, repeat: 1, stagger: 0.3, ease: 'sine.inOut' }, 0)
      .addLabel('B', 3.4)
      // вода замирает — каустики встают, свет перестаёт дрожать
      .to(st, { still: 1, duration: 0.8, ease: 'power3.out' }, 'B')
      // и вся уходит вверх: поверхность поднимается и становится потолком
      .to(q('.u-water'), { yPercent: -84, duration: 2.6, ease: 'power3.inOut' }, 'B+=0.9')
      .to(st, { under: 0, surf: 170, duration: 2.6, ease: 'power3.inOut' }, 'B+=0.9')
      .to(q('.u-dry'), { opacity: 1, duration: 2.0 }, 'B+=1.5')
      .fromTo(q('.u-hang'), { y: (i: number) => 200 + i * 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, stagger: 0.05, ease: 'power2.out' }, 'B+=1.4')
      .to(st, { still: 0, duration: 1.2 }, 'B+=3.0')
      .addLabel('C', 6.8)
      // из потолка отделяется линза и повисает
      .fromTo(q('.u-lens'), { y: -260, scaleY: 0.2, opacity: 0 }, { y: 0, scaleY: 1, opacity: 1, duration: 1.8, ease: 'elastic.out(1, 0.55)' }, 'C')
      .fromTo(q('.u-drop'), { y: -60, scale: 0 }, { y: 0, scale: 1, duration: 0.8, stagger: { each: 0.025, from: 'center' }, ease: 'back.out(2)' }, 'C+=0.6')
      .to(q('.u-hang'), { y: 460, opacity: 0, duration: 0.9, stagger: 0.04, ease: 'power2.in' }, 'C+=0.4')
      .fromTo(q('.u-stream'), { scaleY: 0 }, { scaleY: 1, duration: 1.6, stagger: 0.12, ease: 'power2.in' }, 'C+=1.4')
      .addLabel('D', 9.8)
      // преломлённые слова выпрямляются: волна гаснет слева направо
      .fromTo(q('.u-q .word'), { y: (i: number) => Math.sin(i * 1.3) * 36, skewX: (i: number) => Math.sin(i * 0.9) * 22, opacity: 0 },
        { y: 0, skewX: 0, opacity: 1, duration: 1.4, stagger: 0.06, ease: 'elastic.out(1, 0.5)' }, 'D')
      .fromTo(q('.u-opt .bowl'), { y: 140, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, stagger: 0.1, ease: 'power3.out' }, 'C+=1.6')
      .fromTo(q('.u-fill'), { scaleY: 0 }, { scaleY: 1, duration: 1.0, stagger: 0.12, ease: 'power2.out' }, 'D+=0.4')
      .fromTo(q('.u-opt .t'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 'D+=0.9')
      .fromTo(q('.u-tn, .u-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=0.4')
      .addLabel('E', 13)
      .to(q('.u-lens'), { y: -6, duration: 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 'E')
      .to({}, { duration: 4 }, 'E')
    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        q('.u-drop').forEach((d, i) => d.classList.toggle('gone', i >= n))
        root.current?.setAttribute('data-ph', phaseOf(n))
      },
      dispose: () => gsap.ticker.remove(tick),
    })
    return () => { gsap.ticker.remove(tick); tl.kill() }
  }, [onReady])

  return (
    <div className="u-root" ref={root} data-ph="normal">
      <div className="u-cam lay">
        <div className="u-hall lay">
          <div className="u-sky" />
          <svg className="lay" viewBox="0 0 1920 1080" aria-hidden>
            <defs>
              <linearGradient id="u-col" x1="0" x2="1"><stop offset="0" stopColor="#9fb3ad" /><stop offset=".45" stopColor="#f2f5ef" /><stop offset="1" stopColor="#8aa39c" /></linearGradient>
              <linearGradient id="u-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d8e2dc" /><stop offset="1" stopColor="#a9bcb5" /></linearGradient>
            </defs>
            <rect y="900" width="1920" height="180" fill="url(#u-floor)" />
            {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 240} y1="900" x2={i * 240 - 120} y2="1080" stroke="#93a8a1" strokeWidth="2" />)}
            {COLS.map(x => <g key={x}><rect x={x - 46} y="180" width="92" height="720" fill="url(#u-col)" />
              {[0, 1, 2, 3].map(k => <line key={k} x1={x - 30 + k * 20} y1="200" x2={x - 30 + k * 20} y2="880" stroke="#c9d6d0" strokeWidth="2" />)}
              <rect x={x - 62} y="160" width="124" height="28" fill="#eef3ee" /><rect x={x - 62} y="890" width="124" height="20" fill="#dfe8e3" /></g>)}
            <path d="M 100 160 L 1820 160 L 1820 130 L 100 130 Z" fill="#e6ede8" />
          </svg>
          <div className="u-dry" />
        </div>
        <div className="u-water">
          <div className="u-tint" />
          {[300, 820, 1340].map((x, i) => <div key={x} className="u-ray" style={css({ left: x, '--r': `${-12 + i * 10}deg` })} />)}
          <svg className="u-edge" viewBox="0 0 1920 120" preserveAspectRatio="none" aria-hidden><path d="M 0 0 L 1920 0 L 1920 60 C 1700 100 1500 30 1280 70 C 1060 110 860 40 640 76 C 420 112 220 44 0 70 Z" /></svg>
        </div>
        <canvas ref={cv} width={1920} height={1080} />
        {Array.from({ length: 14 }, (_, i) => <i key={i} className="u-hang" style={css({ left: 200 + i * 118, top: 420 + (i % 4) * 90 })} />)}
        <div className="u-drops">{DROPS.map((x, i) => <i key={i} className="u-drop" style={css({ left: x })} />)}<span className="u-tn" ref={tnum}>30</span></div>
        <div className="u-lens"><p className="u-q">{QUESTION.text.split(' ').map((w, i) => <span key={i} className="word">{w}</span>)}</p></div>
        {NICHE.map((x, i) => <div key={x} className="u-stream" style={css({ left: x - 9 })} data-i={i} />)}
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className="u-opt" style={css({ left: NICHE[i] })}>
            <div className="bowl"><div className="u-fill" /></div>
            <div className="t"><b>{o.key}</b><span>{o.text}</span></div>
          </div>
        ))}
        <div className="u-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
