// ═══ 03 · Лес — «природа сознательна и сама перестраивает место» ═══
// Развитие прежнего концепта: та же ночная поляна у древнего дерева, бирюзовая
// биолюминесценция, светлячки, цветы-варианты и таймер-одуванчик — но с
// глубиной (туман, три плана стволов, лунные лучи сквозь крону) и с волей леса.
// A: поляна дышит. B: по корням древнего дерева бежит свет — лес «услышал»;
//    деревья среднего плана медленно расступаются, наклоняясь от центра.
// C: ветви с двух сторон тянутся навстречу и сплетаются аркой; светлячки
//    садятся на арку; из земли поднимаются четыре побега.
// D: вопрос разворачивается под аркой, побеги распускаются цветами-вариантами,
//    из корней вырастает одуванчик-таймер. E: лес покачивается и ждёт.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, seeded, noise2, phaseOf, Letters, css, pathLen, glowSprite, type SceneProps } from './kit'

const FX = [720, 1020, 1320, 1620]
const ARCH = 'M 470 980 C 430 700 470 420 640 280 C 820 140 1100 110 1300 150 C 1560 200 1760 360 1800 640 C 1820 800 1810 900 1800 980'
const archPt = (t: number) => { // грубая параметризация арки для светлячков
  const a = Math.PI * (1 - t)
  return { x: 1135 + Math.cos(a) * 660, y: 620 - Math.sin(a) * 480 }
}

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const seeds = useRef<SVGGElement>(null)
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const rnd = seeded(303), nz = noise2(9)
    const flies = Array.from({ length: 46 }, (_, i) => ({ x: 420 + rnd() * 1440, y: 160 + rnd() * 760, s: 2 + rnd() * 2.5, k: i / 46, ph: rnd() * 10 }))
    const st = { gather: 0, glow: 0.6, wake: 0 }
    const ctx = cv.current!.getContext('2d')!
    const spr = glowSprite('255,214,120')
    const draw = (time: number) => {
      ctx.clearRect(0, 0, 1920, 1080); ctx.globalCompositeOperation = 'lighter'
      for (const f of flies) {
        const wx = f.x + (nz(f.ph + time * 0.15, 1) - 0.5) * 160, wy = f.y + (nz(2, f.ph + time * 0.12) - 0.5) * 120
        const p = archPt(f.k), e = st.gather * st.gather * (3 - 2 * st.gather)
        const x = wx + (p.x - wx) * e, y = wy + (p.y - wy) * e
        const pulse = 0.55 + 0.45 * Math.sin(time * 2.2 + f.ph * 3)
        const r = f.s * (1 + st.glow) * 5
        ctx.globalAlpha = 0.95 * pulse; ctx.drawImage(spr, x - r, y - r, r * 2, r * 2)
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
    }
    const tick = () => draw(gsap.ticker.time)
    gsap.ticker.add(tick)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    const roots = q('.f-root-glow path'), arch = q('.f-arch path'), sprouts = q('.f-sprout')
    roots.forEach(p => { const L = pathLen(p); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }) })
    arch.forEach(p => { const L = pathLen(p); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }) })
    sprouts.forEach(p => { const L = pathLen(p); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }) })
    tl.addLabel('A', 0)
      .fromTo(q('.f-cam'), { scale: 1.1, x: 40 }, { scale: 1.03, x: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .fromTo(q('.f-far'), { x: 30 }, { x: 0, duration: 4, ease: 'sine.inOut' }, 0) // параллакс: дальний план медленнее
      .addLabel('B', 3.4)
      // предвосхищение: светлячки замирают и гаснут, лес «прислушивается»
      .to(st, { glow: 0.1, duration: 0.6, ease: 'power2.out' }, 'B')
      .to(roots, { strokeDashoffset: 0, duration: 1.6, stagger: 0.12, ease: 'power2.inOut' }, 'B+=0.4')
      .to(q('.f-mid'), { rotation: (i: number) => [-13, -9, -6, 7, 10, 14][i], duration: 2.6, stagger: { each: 0.08, from: 'center' }, ease: 'power3.inOut' }, 'B+=1.2')
      .to(q('.f-mid'), { rotation: (i: number) => [-11, -7.5, -5, 5.5, 8.5, 12][i], duration: 1.2, ease: 'sine.inOut' }, 'B+=3.8') // доводка: стволы пружинят назад
      .to(st, { glow: 1, duration: 1.2 }, 'B+=1.6')
      .addLabel('C', 7.0)
      .to(arch, { strokeDashoffset: 0, duration: 2.4, stagger: 0.15, ease: 'power2.inOut' }, 'C')
      .fromTo(q('.f-leaf'), { scale: 0 }, { scale: 1, duration: 0.6, stagger: { each: 0.04, from: 'edges' }, ease: 'back.out(2)' }, 'C+=1.4')
      .to(st, { gather: 1, duration: 2.6, ease: 'power2.inOut' }, 'C+=0.6')
      .to(sprouts, { strokeDashoffset: 0, duration: 1.4, stagger: 0.15, ease: 'power2.out' }, 'C+=1.2')
      .addLabel('D', 10.2)
      .fromTo(q('.f-q .split'), { opacity: 0, rotation: -40, y: 20, color: '#6ff2d6' }, { opacity: 1, rotation: 0, y: 0, color: '#eefff9', duration: 0.9, stagger: 0.016, ease: 'back.out(1.6)' }, 'D')
      .fromTo(q('.f-petal'), { scale: 0, rotation: -50, svgOrigin: '0 0' }, { scale: 1, rotation: 0, svgOrigin: '0 0', duration: 0.8, stagger: 0.03, ease: 'back.out(1.8)' }, 'D+=0.6')
      .fromTo(q('.f-opt b, .f-opt circle'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, 'D+=0.9')
      .fromTo(q('.f-dand span'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 'D+=1.4')
      .fromTo(q('.f-opt span'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 'D+=1.2')
      .fromTo(q('.f-dand-stem'), { scaleY: 0 }, { scaleY: 1, duration: 1.0, ease: 'power2.out', transformOrigin: '50% 100%' }, 'D+=0.3')
      .fromTo(q('.f-dand-head'), { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 'D+=1.1')
      .fromTo(q('.f-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.6')
      .addLabel('E', 13)
      .to(q('.f-mid'), { rotation: '+=1', duration: 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 'E')
      .to({}, { duration: 4 }, 'E')
    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        const ph = phaseOf(n); root.current?.setAttribute('data-ph', ph)
        seeds.current?.querySelectorAll('g').forEach((g, i) => g.classList.toggle('gone', i >= n))
      },
      dispose: () => gsap.ticker.remove(tick),
    })
    return () => { gsap.ticker.remove(tick); tl.kill() }
  }, [onReady])

  const mid = [560, 760, 930, 1380, 1560, 1760]
  return (
    <div className="f-root" ref={root} data-ph="normal">
      <div className="f-cam lay">
        <svg className="f-bg lay" viewBox="0 0 1920 1080" aria-hidden>
          <defs>
            <radialGradient id="f-moon" cx=".62" cy=".05" r=".8"><stop offset="0" stopColor="#3b8f80" /><stop offset=".4" stopColor="#123c35" /><stop offset="1" stopColor="#03100d" /></radialGradient>
            <linearGradient id="f-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c8fff1" stopOpacity=".28" /><stop offset="1" stopColor="#c8fff1" stopOpacity="0" /></linearGradient>
            <linearGradient id="f-fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6ff2d6" stopOpacity="0" /><stop offset="1" stopColor="#7fe8d4" stopOpacity=".22" /></linearGradient>
            <linearGradient id="f-bark" x1="0" x2="1"><stop offset="0" stopColor="#0d0805" /><stop offset=".55" stopColor="#3d2c1f" /><stop offset="1" stopColor="#170f09" /></linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#f-moon)" />
          <g className="f-far">{[480, 640, 820, 1020, 1180, 1340, 1500, 1660, 1830].map((x, i) => <rect key={x} x={x} y="0" width={18 + (i % 3) * 10} height="1080" fill="#0b2a25" opacity=".55" />)}</g>
          {[[1040, 120], [1330, 90], [760, 70]].map(([x, w], i) => <polygon key={i} points={`${x},0 ${x + w},0 ${x + w * 3.2},1080 ${x + w * 1.6},1080`} fill="url(#f-ray)" />)}
          <rect y="640" width="1920" height="440" fill="url(#f-fog)" />
        </svg>
        <svg className="lay" viewBox="0 0 1920 1080" aria-hidden>
          {mid.map((x, i) => <g key={x} className="f-mid" style={{ transformOrigin: `${x}px 1000px` }}><path d={`M ${x - 26} 1010 C ${x - 18} 700 ${x - 30} 300 ${x - 12} -20 L ${x + 16} -20 C ${x + 26} 300 ${x + 14} 700 ${x + 28} 1010 Z`} fill="#081d19" />
            <path d={`M ${x} 300 C ${x + (i < 3 ? -70 : 70)} 250 ${x + (i < 3 ? -120 : 120)} 260 ${x + (i < 3 ? -170 : 170)} 210`} stroke="#081d19" strokeWidth="9" fill="none" /></g>)}
        </svg>
        <svg className="lay f-fg" viewBox="0 0 1920 1080" aria-hidden>
          <path d="M 0 1080 L 0 960 C 300 930 500 1010 760 980 C 1000 950 1200 1010 1500 980 C 1700 960 1820 990 1920 970 L 1920 1080 Z" fill="#06120e" />
          <g fill="none" stroke="#1e3b2a" strokeLinecap="round"><path d="M 300 980 C 500 1000 640 940 900 1010" strokeWidth="18" /><path d="M 320 940 C 520 900 760 960 1100 930 C 1300 915 1500 960 1700 940" strokeWidth="12" /></g>
          <g className="f-root-glow" fill="none" stroke="#6ff2d6" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px #6ff2d6)' }}>
            <path d="M 360 900 C 500 990 640 930 900 1005" strokeWidth="5" /><path d="M 380 870 C 560 900 780 960 1100 930 C 1300 915 1500 960 1700 940" strokeWidth="4" />
            <path d="M 340 600 C 360 700 330 800 380 900" strokeWidth="4" /><path d="M 300 300 C 310 420 290 520 330 640" strokeWidth="3" />
          </g>
          <path d="M 0 1080 L 0 0 L 360 0 C 330 140 300 260 320 420 C 340 600 300 760 380 900 C 420 980 520 1020 560 1080 Z" fill="url(#f-bark)" />
          <path d="M 120 0 C 140 200 100 400 160 620 C 200 760 160 900 220 1080" fill="none" stroke="#5a4232" strokeWidth="4" opacity=".5" />
          <path d="M 300 0 L 1920 0 L 1920 90 C 1760 140 1620 70 1480 120 C 1320 170 1180 90 1000 130 C 820 170 660 100 520 140 C 420 170 360 120 300 150 Z" fill="#071a14" />
          {[[430, 960, 1], [480, 975, .7], [1640, 965, 1.1], [1700, 975, .8], [1780, 960, .6]].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><rect x="-5" y="-40" width="10" height="40" fill="#bfeee3" opacity=".8" /><path d="M -34 -38 Q 0 -80 34 -38 Z" fill="#6ff2d6" style={{ filter: 'drop-shadow(0 0 12px #6ff2d6)' }} /></g>))}
          <g className="f-arch" fill="none" strokeLinecap="round"><path d={ARCH} stroke="#26402f" strokeWidth="26" /><path d={ARCH} stroke="#3c5f44" strokeWidth="10" transform="translate(14 -10)" /><path d={ARCH} stroke="#4f7a58" strokeWidth="5" transform="translate(-10 12)" /></g>
          {Array.from({ length: 22 }, (_, i) => { const p = archPt(0.05 + (i / 21) * 0.9); return <path key={i} className="f-leaf" style={{ transformOrigin: `${p.x}px ${p.y}px` }} d={`M ${p.x} ${p.y} c 10 -16 30 -18 40 -6 c -12 12 -30 14 -40 6 z`} fill="#2f6b4c" transform={`rotate(${i * 37} ${p.x} ${p.y})`} /> })}
          {FX.map((x, i) => <path key={x} className="f-sprout" d={`M ${x} 990 C ${x - 20} 930 ${x + 24} 880 ${x} 820`} stroke="#4f8f6a" strokeWidth="6" fill="none" strokeLinecap="round" data-i={i} />)}
        </svg>
        <canvas ref={cv} width={1920} height={1080} />
        <p className="f-q"><Letters text={QUESTION.text} /></p>
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className="f-opt" style={css({ left: FX[i] })}>
            <svg viewBox="-60 -60 120 120" aria-hidden>{Array.from({ length: 7 }, (_, k) => <g key={k} transform={`rotate(${k * 51.4})`}><path className="f-petal" d="M 0 0 C 18 -14 16 -44 0 -56 C -16 -44 -18 -14 0 0 Z" /></g>)}<circle r="13" /></svg>
            <b>{o.key}</b><span>{o.text}</span>
          </div>
        ))}
        <div className="f-dand">
          <svg viewBox="-120 -120 240 420" aria-hidden>
            <path className="f-dand-stem" d="M 0 0 C 8 90 -12 190 6 300" />
            <g className="f-dand-head"><g ref={seeds}>{Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2; return <g key={i} style={css({ '--k': i })}><line x1="0" y1="0" x2={Math.cos(a) * 82} y2={Math.sin(a) * 82} /><circle cx={Math.cos(a) * 86} cy={Math.sin(a) * 86} r="6.5" /></g> })}</g><circle r="15" className="hd" /></g>
          </svg>
          <span ref={tnum}>30</span>
        </div>
        <div className="f-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
