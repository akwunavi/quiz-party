// ═══ 07 · Дворец отражений — «отражения живут сами и меняют реальность» ═══
// A: ночная галерея, в конце — высокое арочное зеркало, по бокам свечи,
//    полированный пол всё отражает. Камера медленно идёт к зеркалу.
// B: в зале свечи горят, а в зеркале их огни гаснут. Отражение показывает то,
//    чего в зале нет: на отражённой стене проступает надпись задом наперёд.
//    Стекло вздыхает — и надпись выходит из зеркала в зал, переворачиваясь.
// C: зеркала на боковых стенах поворачиваются к зрителю; в каждом своя
//    «реальность» своего оттенка; в центральном зеркале открывается бесконечный коридор.
// D: в боковых зеркалах проступают варианты (сначала отражёнными, потом
//    читаемыми), в центральном — время. Отражение числа на полу опережает его на секунду.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, phaseOf, css, type SceneProps } from './kit'

const SIDE = [ // боковые зеркала: где висят и какой оттенок их «реальности»
  { x: 250, y: 400, ry: 34, h: 210 }, { x: 250, y: 720, ry: 34, h: 30 },
  { x: 1670, y: 400, ry: -34, h: 300 }, { x: 1670, y: 720, ry: -34, h: 150 },
]

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const tref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    // пламя свечей дрожит само по себе — живая, а не механическая амбиентность
    const flick = gsap.to(q('.m-flame'), { scaleY: () => 0.85 + Math.random() * 0.3, duration: 0.18, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.05, repeat: -1, yoyo: true } })
    tl.addLabel('A', 0)
      .fromTo(q('.m-cam'), { scale: 1.0 }, { scale: 1.06, duration: 4, ease: 'sine.inOut' }, 0)
      .addLabel('B', 3.4)
      // в зеркале огни гаснут по одному — в зале продолжают гореть
      .to(q('.m-rflame'), { scaleY: 0, opacity: 0, duration: 0.35, stagger: 0.28, ease: 'power2.in' }, 'B')
      .to(q('.m-glass .m-room'), { opacity: 0.25, duration: 1.0 }, 'B+=0.6')
      // на отражённой стене проступает надпись задом наперёд
      .fromTo(q('.m-q'), { y: 330, scaleX: -0.46, scaleY: 0.46, opacity: 0 }, { opacity: 0.85, duration: 1.0, ease: 'power1.in' }, 'B+=1.0')
      // стекло «вздыхает»
      .to(q('.m-glass'), { scaleY: 0.975, scaleX: 1.012, duration: 0.25, ease: 'power2.out' }, 'B+=2.1')
      .to(q('.m-glass'), { scaleY: 1, scaleX: 1, duration: 0.8, ease: 'elastic.out(1.1, 0.4)' }, 'B+=2.35')
      // и надпись выходит из зеркала в зал, переворачиваясь в читаемую
      .to(q('.m-q'), { y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 1.7, ease: 'power3.inOut' }, 'B+=2.35')
      .addLabel('C', 7.2)
      .to(q('.m-cam'), { scale: 1, duration: 2.4, ease: 'power2.inOut' }, 'C')
      .fromTo(q('.m-side'), { rotationY: (i: number) => (i < 2 ? 88 : -88), autoAlpha: 0 }, { rotationY: (i: number) => SIDE[i].ry, autoAlpha: 1, duration: 1.6, stagger: 0.14, ease: 'power3.out' }, 'C')
      .fromTo(q('.m-tunnel i'), { scale: 1, opacity: 0 }, { scale: (i: number) => 1 - (i + 1) * 0.14, opacity: (i: number) => 0.7 - i * 0.1, duration: 1.6, stagger: 0.1, ease: 'power3.out' }, 'C+=0.6')
      .to(q('.m-glass .m-room'), { opacity: 0.05, duration: 1.0 }, 'C+=0.4')
      .addLabel('D', 10.2)
      .fromTo(q('.m-side .t'), { rotationY: 180, opacity: 0 }, { rotationY: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power3.inOut' }, 'D')
      .fromTo(q('.m-time'), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, 'D+=0.3')
      .fromTo(q('.m-floorref'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'sine.inOut' }, 'D+=0.6')
      .fromTo(q('.m-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.6')
      .addLabel('E', 13)
      .to({}, { duration: 4 }, 'E')
    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        if (tref.current) tref.current.textContent = String(Math.max(0, n - 1)) // отражение опережает время
        root.current?.setAttribute('data-ph', phaseOf(n))
      },
      dispose: () => flick.kill(),
    })
    return () => { flick.kill(); tl.kill() }
  }, [onReady])

  const candles = [620, 1300]
  return (
    <div className="m-root" ref={root} data-ph="normal">
      <div className="m-cam lay">
        <svg className="lay" viewBox="0 0 1920 1080" aria-hidden>
          <defs>
            <linearGradient id="m-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a1a30" /><stop offset="1" stopColor="#3b2440" /></linearGradient>
            <linearGradient id="m-side" x1="0" x2="1"><stop offset="0" stopColor="#140c18" /><stop offset="1" stopColor="#2a1a30" /></linearGradient>
            <linearGradient id="m-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4f2ff" /><stop offset=".4" stopColor="#a9a6c2" /><stop offset=".7" stopColor="#e6e3f6" /><stop offset="1" stopColor="#6f6a8a" /></linearGradient>
            <radialGradient id="m-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffcf9a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf9a" stopOpacity="0" /></radialGradient>
          </defs>
          <rect x="0" y="0" width="1920" height="1080" fill="#120a16" />
          <rect x="520" y="110" width="880" height="760" fill="url(#m-wall)" />
          <path d="M 0 0 L 520 110 L 520 870 L 0 1080 Z" fill="url(#m-side)" />
          <path d="M 1920 0 L 1400 110 L 1400 870 L 1920 1080 Z" fill="url(#m-side)" transform="" />
          {[600, 700, 800].map(y => <line key={y} x1="520" y1={y} x2="1400" y2={y} stroke="#4a3050" strokeWidth="1" opacity=".5" />)}
          <path d="M 520 110 L 1400 110" stroke="#6a4a70" strokeWidth="3" />
          <path d="M 0 1080 L 520 870 L 1400 870 L 1920 1080 Z" fill="#1a0f1e" />
          {Array.from({ length: 9 }, (_, i) => <line key={i} x1={520 + i * 110} y1="870" x2={-80 + i * 260} y2="1080" stroke="#3a2440" strokeWidth="2" />)}
          {candles.map(x => <circle key={x} cx={x} cy="560" r="220" fill="url(#m-glow)" />)}
        </svg>
        {/* центральное зеркало */}
        <div className="m-mirror">
          <div className="m-glass">
            <div className="m-room" />
            {candles.map(x => <i key={x} className="m-rflame" style={css({ left: (1920 - x) - 760 - 6 + (x < 960 ? -60 : 60) })} />)}
            <div className="m-tunnel">{Array.from({ length: 5 }, (_, i) => <i key={i} />)}</div>
            <div className="m-time"><span ref={tnum}>30</span></div>
          </div>
        </div>
        {/* отражение на полу: опережает время на секунду */}
        <div className="m-floorref"><span ref={tref}>29</span></div>
        {candles.map(x => <div key={x} className="m-candle" style={css({ left: x })}><i className="m-flame" /><b /></div>)}
        <div className="m-sides">
          {QUESTION.options.map((o, i) => (
            <div key={o.key} className="m-side" style={css({ left: SIDE[i].x, top: SIDE[i].y, '--h': SIDE[i].h })}>
              <div className="glass"><div className="t"><b>{o.key}</b><span>{o.text}</span></div></div>
            </div>
          ))}
        </div>
        <p className="m-q">{QUESTION.text}</p>
        <div className="m-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
