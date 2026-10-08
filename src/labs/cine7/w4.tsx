// ═══ 04 · Архипелаг — «гравитация, масштаб и геометрия неустойчивы» ═══
// A: закат на высоте; над морем облаков далёкий остров, с него в облака падает
//    тонкий водопад. B: водопад застывает; с облаков отрываются камни; мир
//    переворачивается на 180° — остров теперь висит вниз головой, водопад
//    течёт «вверх». C: масштаб ломается — остров рывком вырастает на пол-кадра,
//    от его днища отрываются четыре камня, у каждого своя «вниз».
// D: слова вопроса приходят каждое в своём масштабе и успокаиваются в строку.
// E: камни-варианты дрейфуют, водяной столб-таймер тает вверх.
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, phaseOf, css, seeded, type SceneProps } from './kit'

function Rock({ w, flip = false, grass = '#7fa36a', fall = false }: { w: number; flip?: boolean; grass?: string; fall?: boolean }) {
  return (
    <svg viewBox="0 0 400 300" style={{ width: w, height: w * 0.75, transform: flip ? 'scaleY(-1)' : undefined }} aria-hidden>
      <defs><linearGradient id={`a-rock-${w}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6b98e" /><stop offset=".25" stopColor="#7a6c8a" /><stop offset="1" stopColor="#2b2f4f" /></linearGradient></defs>
      <path d="M 10 70 C 60 56 140 52 200 52 C 270 52 340 58 390 70 C 380 110 330 150 300 180 C 270 210 240 270 210 296 C 190 280 170 230 140 200 C 100 160 30 120 10 70 Z" fill={`url(#a-rock-${w})`} />
      <path d="M 70 92 l 30 50 M 150 100 l 10 70 M 250 96 l -16 80 M 320 90 l -30 50" stroke="#2b2f4f" strokeWidth="4" opacity=".5" />
      <ellipse cx="200" cy="64" rx="192" ry="20" fill={grass} /><ellipse cx="200" cy="58" rx="180" ry="12" fill="#a6c98a" />
      {fall && <rect className="a-fall" x="300" y="66" width="14" height="420" rx="7" />}
    </svg>
  )
}

const OPT = [{ x: 470, y: 720, r: -9, w: 290 }, { x: 860, y: 640, r: 6, w: 240 }, { x: 1250, y: 710, r: -4, w: 270 }, { x: 1620, y: 630, r: 11, w: 230 }]

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const col = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const rnd = seeded(404)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    const words = q('.a-q .w')
    tl.addLabel('A', 0)
      .fromTo(q('.a-world'), { x: -60 }, { x: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .fromTo(q('.a-stream'), { backgroundPositionY: '0px' }, { backgroundPositionY: '240px', duration: 3.6, ease: 'none' }, 0)
      .addLabel('B', 3.6)
      // водопад застывает: поток останавливается, капли повисают
      .to(q('.a-stream'), { backgroundPositionY: '250px', duration: 0.4, ease: 'power3.out' }, 'B')
      .fromTo(q('.a-drop'), { y: 0, opacity: 0 }, { y: (i: number) => -30 - i * 14, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power2.out' }, 'B+=0.2')
      .fromTo(q('.a-pebble'), { y: 0 }, { y: (i: number) => -60 - (i % 3) * 30, rotation: (i: number) => (i % 2 ? 30 : -24), duration: 1.4, stagger: 0.05, ease: 'power2.out' }, 'B+=0.4')
      // мир переворачивается: небо и облака уходят вниз, остров повисает
      .to(q('.a-world'), { rotation: 180, duration: 2.4, ease: 'power3.inOut' }, 'B+=1.0')
      .to(q('.a-isle-wrap'), { rotation: 180, duration: 2.4, ease: 'power3.inOut' }, 'B+=1.0')
      .to(q('.a-stream'), { backgroundPositionY: '-200px', duration: 2.4, ease: 'none' }, 'B+=1.0')
      .addLabel('C', 7.0)
      // масштаб ломается: остров вырастает и встаёт над кадром
      .to(q('.a-isle-wrap'), { x: 305, y: -470, duration: 1.8, ease: 'power3.inOut' }, 'C')
      .to(q('.a-isle'), { scale: 4.2, duration: 1.8, ease: 'power4.inOut' }, 'C')
      .to(q('.a-stream'), { opacity: 0.35, duration: 1.2 }, 'C+=0.6')
      .to(q('.a-world'), { rotation: 172, duration: 1.8, ease: 'power2.inOut' }, 'C')
      // от днища отрываются камни — каждый со своей гравитацией
      .fromTo(q('.a-opt'), { x: (i: number) => 960 - OPT[i].x, y: (i: number) => 150 - OPT[i].y, scale: 0.2, rotation: 180, opacity: 0 },
        { x: 0, y: 0, scale: 1, rotation: (i: number) => OPT[i].r, opacity: 1, duration: 1.8, stagger: 0.14, ease: 'power3.out' }, 'C+=1.0')
      .addLabel('D', 10.2)
      .fromTo(words, { scale: () => 0.25 + rnd() * 2.6, opacity: 0, y: () => (rnd() - 0.5) * 90 }, { scale: 1, opacity: 1, y: 0, duration: 1.2, stagger: 0.05, ease: 'elastic.out(1, 0.6)' }, 'D')
      .fromTo(q('.a-opt .lbl'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.1 }, 'D+=0.8')
      .fromTo(q('.a-timer'), { y: 260, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 'D+=0.3')
      .fromTo(q('.a-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.6')
      .addLabel('E', 13)
      .to(q('.a-opt'), { y: (i: number) => (i % 2 ? -10 : 10), duration: 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 'E')
      .to({}, { duration: 4 }, 'E')
    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        if (col.current) col.current.style.transform = `scaleY(${Math.max(0.001, n / QUESTION.total)})`
        root.current?.setAttribute('data-ph', phaseOf(n))
      },
    })
    return () => { tl.kill() }
  }, [onReady])

  const pebbles = [[520, 640], [760, 660], [1020, 650], [1420, 655], [1610, 640], [880, 670], [1180, 660]]
  return (
    <div className="a-root" ref={root} data-ph="normal">
      <div className="a-world lay">
        <div className="a-sky" />
        <div className="a-sun" />
        <div className="a-clouds far" /><div className="a-clouds mid" />
        {pebbles.map(([x, y], i) => <i key={i} className="a-pebble" style={css({ left: x, top: y })} />)}
        <div className="a-clouds near" />
      </div>
      <div className="a-isle-wrap lay">
        <div className="a-isle" style={css({ left: 1180, top: 400 })}><Rock w={170} fall /><div className="a-stream" />{Array.from({ length: 5 }, (_, i) => <i key={i} className="a-drop" style={css({ top: 170 + i * 40 })} />)}</div>
      </div>
      <div className="a-ui lay">
        <p className="a-q">{QUESTION.text.split(' ').map((w, i) => <span key={i} className="w">{w}</span>)}</p>
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className="a-opt" style={css({ left: OPT[i].x, top: OPT[i].y })}>
            <Rock w={OPT[i].w} grass={['#7fa36a', '#6f9f8a', '#9aa86a', '#7f9fa0'][i]} />
            <div className="lbl" style={css({ rotate: `${-OPT[i].r}deg` })}><b>{o.key}</b>{o.text}</div>
          </div>
        ))}
        <div className="a-timer"><div className="tube"><div className="water" ref={col} /></div><span ref={tnum}>30</span></div>
        <div className="a-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
