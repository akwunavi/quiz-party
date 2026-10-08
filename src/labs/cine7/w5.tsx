// ═══ 05 · Город механизмов — «механизмы собирают себя сами» ═══
// Синька: город существует как архитектурный чертёж белой линией на прусской
// синей бумаге. A: камера медленно идёт по листу — фасады, сетка, размерные линии.
// B: нарисованная шестерня начинает вращаться и зацепляет соседние; детали
//    механизма слетаются со всех краёв листа (обратный взрыв-схема) и с
//    жёстким щелчком собираются в часовой механизм.
// C: чертёж перерисовывает себя: размерные линии размечают новую раскладку,
//    дома съезжают по направляющим и становятся основаниями вариантов.
// D: вопрос пишется чертёжным шрифтом строка за строкой, механизм стал таймером.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, phaseOf, css, pathLen, type SceneProps } from './kit'

function gear(r: number, teeth: number) {
  const pts: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.15
    const a0 = a - Math.PI / (teeth * 4), a1 = a + Math.PI / (teeth * 4)
    pts.push(`${(Math.cos(a0) * rr).toFixed(1)},${(Math.sin(a0) * rr).toFixed(1)}`, `${(Math.cos(a1) * rr).toFixed(1)},${(Math.sin(a1) * rr).toFixed(1)}`)
  }
  return `M ${pts.join(' L ')} Z`
}
const DIAL = { x: 340, y: 430 }
const PARTS = [ // деталь: [форма, x, y, откуда прилетает dx, dy, вращение]
  { k: 'g', r: 150, t: 24, x: 340, y: 430, fx: -900, fy: -300, rot: -220 },
  { k: 'g', r: 70, t: 12, x: 540, y: 300, fx: 600, fy: -700, rot: 300 },
  { k: 'g', r: 52, t: 10, x: 170, y: 640, fx: -500, fy: 700, rot: -260 },
  { k: 'p', r: 0, t: 0, x: 340, y: 430, fx: 0, fy: 900, rot: 90 },
]
const BLD = [ // фасады: x, ширина, высота, куда съезжают (итоговые основания вариантов)
  { x: 620, w: 260, h: 420, tx: 700, tw: 270, th: 250 }, { x: 900, w: 200, h: 560, tx: 990, tw: 270, th: 330 },
  { x: 1120, w: 300, h: 360, tx: 1280, tw: 270, th: 280 }, { x: 1440, w: 220, h: 480, tx: 1570, tw: 270, th: 360 },
]

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const needle = useRef<SVGGElement>(null)
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const draws = q('.c-draw')
    draws.forEach(p => { const L = pathLen(p); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }) })
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
      .fromTo(q('.c-cam'), { x: -160, y: 40, scale: 1.12 }, { x: 0, y: 0, scale: 1.04, duration: 4, ease: 'sine.inOut' }, 0)
      .addLabel('B', 3.4)
      // нарисованная шестерня оживает: доворот назад (предвосхищение) и разгон
      .to(q('.c-seed'), { rotation: -12, svgOrigin: '1520 260', duration: 0.35, ease: 'power2.out' }, 'B')
      .to(q('.c-seed'), { rotation: 400, svgOrigin: '1520 260', duration: 3.2, ease: 'power2.in' }, 'B+=0.35')
      .to(q('.c-seed2'), { rotation: -560, svgOrigin: '1640 352', duration: 3.2, ease: 'power2.in' }, 'B+=0.5')
      // детали прилетают со всех краёв листа и собираются с жёстким щелчком (без перелёта — металл)
      .fromTo(q('.c-part'), { x: (i: number) => PARTS[i].fx, y: (i: number) => PARTS[i].fy, rotation: (i: number) => PARTS[i].rot, opacity: 0.2 },
        { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.9, stagger: 0.16, ease: 'power3.inOut' }, 'B+=0.8')
      .to(q('.c-sheet'), { x: 5, duration: 0.04, yoyo: true, repeat: 5, ease: 'none' }, 'B+=2.6')
      .to(q('.c-sheet'), { x: 4, duration: 0.04, yoyo: true, repeat: 3, ease: 'none' }, 'B+=2.95')
      .addLabel('C', 6.8)
      // чертёж перерисовывает себя под новую раскладку
      .to(q('.c-cam'), { x: 0, y: 0, scale: 1, duration: 2.4, ease: 'power3.inOut' }, 'C')
      .to(q('.c-old'), { opacity: 0.1, duration: 1.2 }, 'C')
      .to(draws, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: 'power2.inOut' }, 'C+=0.2')
      .to(q('.c-bld'), { x: (i: number) => BLD[i].tx - BLD[i].x, duration: 1.8, stagger: 0.1, ease: 'power3.inOut' }, 'C+=0.6')
      .to(q('.c-bld rect.f'), { attr: { width: (i: number) => BLD[i].tw, height: (i: number) => BLD[i].th, y: (i: number) => 1000 - BLD[i].th }, duration: 1.8, stagger: 0.1, ease: 'power3.inOut' }, 'C+=0.6')
      .to(q('.c-part.g'), { rotation: (i: number) => (i % 2 ? -60 : 60), svgOrigin: (i: number) => `${PARTS[i].x} ${PARTS[i].y}`, duration: 2.4, ease: 'power1.inOut' }, 'C')
      .addLabel('D', 9.8)
      .fromTo(q('.c-q .ln'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, stagger: 0.35, ease: 'power1.inOut' }, 'D')
      .fromTo(q('.c-opt'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 'D+=0.9')
      .fromTo(q('.c-num, .c-needle'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 'D+=0.2')
      .fromTo(q('.c-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.6')
      .addLabel('E', 13)
      .to(q('.c-part.g'), { rotation: '+=40', svgOrigin: (i: number) => `${PARTS[i].x} ${PARTS[i].y}`, duration: 4, ease: 'none' }, 'E')
      .to({}, { duration: 4 }, 'E')
    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n).padStart(2, '0')
        needle.current?.setAttribute('transform', `rotate(${-150 + (n / QUESTION.total) * 300} ${DIAL.x} ${DIAL.y})`)
        root.current?.setAttribute('data-ph', phaseOf(n))
      },
    })
    return () => { tl.kill() }
  }, [onReady])

  const lines = ['Кто из писателей сжёг второй', 'том своей поэмы за девять', 'дней до смерти?']
  return (
    <div className="c-root" ref={root} data-ph="normal">
      <div className="c-paper" />
      <div className="c-cam lay"><div className="c-sheet lay">
        <svg className="lay" viewBox="0 0 1920 1080" aria-hidden>
          <defs><pattern id="c-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(220,235,255,.10)" strokeWidth="1" /></pattern>
            <pattern id="c-win" width="44" height="60" patternUnits="userSpaceOnUse" x="12" y="10"><rect x="10" y="12" width="20" height="32" fill="none" stroke="rgba(233,241,255,.45)" strokeWidth="1.5" /></pattern></defs>
          <rect x="-200" y="-200" width="2400" height="1500" fill="url(#c-grid)" />
          <g className="c-old">
            {[[80, 1000, 1840, 1000]].map((l, i) => <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}
            <path d="M 120 960 l 0 -40 m 0 20 l 1700 0 m 0 -20 l 0 40" className="dim" />
            <text x="900" y="950" className="note">22 400</text>
            <rect x="1560" y="900" width="320" height="140" className="frame" /><text x="1580" y="948" className="note">ЛИСТ 5 · ФАСАД ПО ГЛАВНОЙ</text><text x="1580" y="990" className="note">М 1:200</text>
            <path d="M 620 580 L 750 470 L 880 580 M 900 440 L 1000 300 L 1100 440 M 1000 300 L 1000 230 M 985 230 L 1015 230 M 1120 640 C 1120 540 1420 540 1420 640 M 1440 520 L 1440 440 L 1660 440 L 1660 520 M 1480 440 L 1550 380 L 1620 440" />
            <circle cx="1000" cy="372" r="34" /><path d={gear(22, 10)} transform="translate(1000 372)" />
            <path d="M 80 760 L 600 760 M 80 760 L 140 700 L 200 760 L 260 700 L 320 760 L 380 700 L 440 760 L 500 700 L 560 760 M 140 700 L 500 700" className="dim" />
            <path d="M 300 120 A 220 220 0 0 1 520 340 M 300 120 L 300 340 L 520 340" className="dim" /><text x="330" y="160" className="note">R 220</text>
            {Array.from({ length: 6 }, (_, k) => <path key={k} d={gear(18 + k * 6, 8 + k)} transform={`translate(${160 + k * 120} ${520 - (k % 2) * 60})`} />)}
            <g className="c-seed"><path d={gear(70, 14)} transform="translate(1520 260)" /><circle cx="1520" cy="260" r="18" /></g>
            <g className="c-seed2"><path d={gear(40, 9)} transform="translate(1640 352)" /><circle cx="1640" cy="352" r="10" /></g>
          </g>
          {BLD.map((b, i) => (
            <g key={i} className="c-bld">
              <rect className="f" x={b.x} y={1000 - b.h} width={b.w} height={b.h} fill="url(#c-win)" />
            </g>
          ))}
          {PARTS.map((p, i) => p.k === 'g'
            ? <g key={i} className="c-part g"><path d={gear(p.r, p.t)} transform={`translate(${p.x} ${p.y})`} /><circle cx={p.x} cy={p.y} r={p.r * 0.55} /><circle cx={p.x} cy={p.y} r={p.r * 0.14} /></g>
            : <g key={i} className="c-part p"><circle cx={p.x} cy={p.y} r="196" className="rim" /><circle cx={p.x} cy={p.y} r="186" />
              {Array.from({ length: 31 }, (_, k) => { const a = (-150 + k * 10 - 90) * Math.PI / 180; return <line key={k} x1={p.x + Math.cos(a) * 170} y1={p.y + Math.sin(a) * 170} x2={p.x + Math.cos(a) * (k % 5 ? 180 : 156)} y2={p.y + Math.sin(a) * (k % 5 ? 180 : 156)} /> })}</g>)}
          <g ref={needle} className="c-needle" transform={`rotate(150 ${DIAL.x} ${DIAL.y})`}><path d={`M ${DIAL.x - 6} ${DIAL.y + 24} L ${DIAL.x} ${DIAL.y - 176} L ${DIAL.x + 6} ${DIAL.y + 24} Z`} /><circle cx={DIAL.x} cy={DIAL.y} r="14" /></g>
          {/* новая раскладка — размечается размерными линиями */}
          <path className="c-draw" d="M 640 150 L 640 130 L 1820 130 L 1820 150 M 640 140 L 1820 140" />
          <path className="c-draw" d="M 630 170 L 610 170 L 610 520 L 630 520 M 620 170 L 620 520" />
          <path className="c-draw" d="M 640 560 L 1820 560" />
          <path className="c-draw" d="M 120 760 L 560 760 M 120 750 L 120 770 M 560 750 L 560 770" />
        </svg>
        <div className="c-num" style={css({ left: DIAL.x - 130, top: DIAL.y + 40 })}><span ref={tnum}>30</span></div>
        <div className="c-q">{lines.map((l, i) => <div key={i} className="ln">{l}</div>)}</div>
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className="c-opt" style={css({ left: BLD[i].tx, width: BLD[i].tw, top: 1000 - BLD[i].th + 24 })}><b>{o.key}</b><span>{o.text}</span></div>
        ))}
        <div className="c-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div></div>
    </div>
  )
}
