// ═══ 02 · Библиотека — «написанное становится вещественным» ═══
// Грамматика леса: камера на уровне глаз в коридоре стеллажей, тёмный шкаф
// переднего плана слева и лестница справа, корешки уходят в дымку к холодному
// окну, тёплый свет — только свеча на столе.
// A: тишина; камера медленно входит в коридор, в луче из окна плывёт пыль.
// B: пламя вытягивается и замирает, страница перелистывается сама —
//    и буквы срываются: со страниц книги и из корешков на полках.
// C: рой букв кружит под окном и ложится строками — это вопрос.
// D: на опустевших страницах проступают варианты, над свечой — время.
// E: всё оседает; свеча сгорает вместе с таймером.
import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, seeded, noise2, phaseOf, Letters, css, type SceneProps } from './kit'

const V = { x: 1160, y: 530 } // точка схода коридора
const PROSE = [
  'Был тихий вечер, и в библиотеке горела одна свеча.', 'Книги стояли так плотно, что казалось, будто',
  'они слушают друг друга. Старый переплётчик', 'говорил, что ночью они переписывают себя,',
  'если на столе забыли открытую страницу.', 'Никто не верил ему, пока однажды утром',
]
const CYR = 'абвгдеёжзийклмнопрстуфхцчшщыэюяАБВГДЕЖЗИКЛМНОПРСТ'

/** Коридор стеллажей: процедурно, один раз, в отдельный холст. */
function paintCorridor(c: HTMLCanvasElement) {
  const x = c.getContext('2d')!, r = seeded(2024)
  const fog = [26, 24, 34], zMax = 8, sOf = (z: number) => (1 - 1 / z) / (1 - 1 / zMax)
  const mix = (a: number[], b: number[], k: number) => a.map((v, i) => Math.round(v + (b[i] - v) * k))
  const rgb = (a: number[]) => `rgb(${a[0]},${a[1]},${a[2]})`
  const PAL = [[92, 32, 26], [32, 58, 42], [30, 42, 74], [108, 74, 32], [58, 36, 20], [70, 50, 60], [40, 30, 22]]
  // потолок, пол, дальняя стена
  const far = { l: 1030, r: 1290, t: 400, b: 660 }
  x.fillStyle = '#0c0a0e'; x.fillRect(0, 0, 1920, 1080)
  const fl = x.createLinearGradient(0, far.b, 0, 1080); fl.addColorStop(0, '#2a2630'); fl.addColorStop(0.25, '#16110e'); fl.addColorStop(1, '#0a0705')
  x.fillStyle = fl; x.beginPath(); x.moveTo(far.l, far.b); x.lineTo(far.r, far.b); x.lineTo(2200, 1080); x.lineTo(-300, 1080); x.fill()
  x.strokeStyle = 'rgba(80,60,40,.25)'; x.lineWidth = 2
  for (let i = -8; i <= 8; i++) { x.beginPath(); x.moveTo(V.x + i * 30, far.b); x.lineTo(V.x + i * 260, 1080); x.stroke() }
  x.fillStyle = '#0a0809'; x.beginPath(); x.moveTo(far.l, far.t); x.lineTo(far.r, far.t); x.lineTo(2200, -200); x.lineTo(-300, -200); x.fill()
  x.strokeStyle = '#17121a'; x.lineWidth = 10
  for (let z = 1.4; z < zMax; z *= 1.45) { const s = sOf(z); const y = -200 + (far.t + 200) * s; x.beginPath(); x.moveTo(-300 + (far.l + 300) * s, y); x.lineTo(2200 + (far.r - 2200) * s, y); x.stroke() }
  x.fillStyle = '#15121a'; x.fillRect(far.l, far.t, far.r - far.l, far.b - far.t)
  // окно в торце: холодный свет
  const wg = x.createRadialGradient(V.x, 540, 10, V.x, 540, 260); wg.addColorStop(0, 'rgba(170,200,235,.55)'); wg.addColorStop(1, 'rgba(170,200,235,0)')
  x.fillStyle = wg; x.fillRect(800, 300, 720, 500)
  x.fillStyle = '#b8d2ee'; x.beginPath(); x.moveTo(1112, 650); x.lineTo(1112, 500); x.arc(V.x, 500, 48, Math.PI, 0); x.lineTo(1208, 650); x.fill()
  x.strokeStyle = '#2a2632'; x.lineWidth = 4; x.beginPath(); x.moveTo(V.x, 452); x.lineTo(V.x, 650); x.moveTo(1112, 560); x.lineTo(1208, 560); x.stroke()
  // стены-стеллажи: левая (near 260 → far 1030) и правая (near 2000 → far 1290)
  const walls = [{ n: 260, f: far.l }, { n: 2000, f: far.r }]
  const rows = [0.02, 0.17, 0.32, 0.47, 0.62, 0.77, 0.93]
  for (const w of walls) {
    const X = (s: number) => w.n + (w.f - w.n) * s
    const Yt = (s: number) => -200 + (far.t + 200) * s, Yb = (s: number) => 940 + (far.b - 940) * s
    const Y = (s: number, h: number) => Yt(s) + (Yb(s) - Yt(s)) * h
    x.fillStyle = '#0d0a09'; x.beginPath(); x.moveTo(X(0), Y(0, 0)); x.lineTo(X(1), Y(1, 0)); x.lineTo(X(1), Y(1, 1)); x.lineTo(X(0), Y(0, 1)); x.fill()
    for (let ri = 0; ri < rows.length - 1; ri++) {
      const h0 = rows[ri] + 0.012, h1 = rows[ri + 1]
      let z = 1
      while (z < zMax) {
        const th = (0.035 + r() * 0.05) * z * 0.9
        if (r() < 0.06) { z += th * 1.5; continue } // просвет на полке
        const s0 = sOf(z), s1 = sOf(Math.min(zMax, z + th)), hh = h1 - (h1 - h0) * (0.68 + r() * 0.3)
        const k = Math.pow((s0 + s1) / 2, 0.7) * 0.9
        const base = PAL[Math.floor(r() * PAL.length)].map(v => v * (0.55 + r() * 0.5))
        // тёплый подсвет от свечи у ближних нижних полок левой стены
        const warm = w.n < 1000 ? Math.max(0, 0.5 - s0 * 1.2) * Math.max(0, ri - 2) * 0.12 : 0
        const col = mix(mix(base, [150, 100, 50], warm), fog, k)
        x.fillStyle = rgb(col)
        x.beginPath(); x.moveTo(X(s0), Y(s0, hh)); x.lineTo(X(s1), Y(s1, hh)); x.lineTo(X(s1), Y(s1, h1)); x.lineTo(X(s0), Y(s0, h1)); x.fill()
        if (r() < 0.45 && s0 < 0.7) { // золотое тиснение на корешке
          x.strokeStyle = rgb(mix([150, 118, 64], fog, k)); x.lineWidth = Math.max(0.5, 2 * (1 - s0))
          const hb = hh + (h1 - hh) * 0.18; x.beginPath(); x.moveTo(X(s0), Y(s0, hb)); x.lineTo(X(s1), Y(s1, hb)); x.stroke()
        }
        x.strokeStyle = 'rgba(0,0,0,.45)'; x.lineWidth = 1; x.beginPath(); x.moveTo(X(s1), Y(s1, hh)); x.lineTo(X(s1), Y(s1, h1)); x.stroke()
        z += th
      }
      // доска полки
      x.fillStyle = rgb(mix([46, 32, 22], fog, 0.2)); x.beginPath(); x.moveTo(X(0), Y(0, h1)); x.lineTo(X(1), Y(1, h1)); x.lineTo(X(1), Y(1, h1 + 0.012)); x.lineTo(X(0), Y(0, h1 + 0.025)); x.fill()
    }
  }
  // воздушная перспектива: дымка к окну
  const hz = x.createRadialGradient(V.x, 540, 40, V.x, 540, 700); hz.addColorStop(0, 'rgba(120,140,170,.28)'); hz.addColorStop(0.5, 'rgba(60,60,80,.12)'); hz.addColorStop(1, 'rgba(0,0,0,0)')
  x.fillStyle = hz; x.fillRect(0, 0, 1920, 1080)
}

type Glyph = { ch: string; sx: number; sy: number; tx: number; ty: number; q: boolean; k: number; ph: number; rad: number; sz: number }

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const corridor = useRef<HTMLCanvasElement>(null)
  const swarm = useRef<HTMLCanvasElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const candle = useRef<HTMLDivElement>(null)
  const qChars = useMemo(() => QUESTION.text.replace(/ /g, '').split(''), [])
  useLayoutEffect(() => {
    paintCorridor(corridor.current!)
    const q = gsap.utils.selector(root)
    const r = seeded(99), nz = noise2(5)
    // куда встают буквы вопроса — меряем невидимую итоговую раскладку
    const qp = root.current!.querySelector('.l-q') as HTMLElement
    const finals = Array.from(qp.querySelectorAll<HTMLElement>('.split')).map(el => ({ x: qp.offsetLeft + el.offsetLeft + el.offsetWidth / 2, y: qp.offsetTop + el.offsetTop + el.offsetHeight * 0.72 }))
    const glyphs: Glyph[] = []
    const src = () => {
      const p = r()
      if (p < 0.45) return { x: 760 + r() * 860, y: 850 + r() * 150 } // страницы книги
      if (p < 0.75) { const s = r() * 0.8; return { x: 300 + (1030 - 300) * s, y: (-150 + 550 * s) + (1090 - 640 * s - (-150 + 550 * s)) * r() * 0.9 } } // левая стена
      const s = r() * 0.8; return { x: 1960 + (1290 - 1960) * s, y: (-150 + 550 * s) + (1090 - 640 * s - (-150 + 550 * s)) * r() * 0.9 }
    }
    qChars.forEach((ch, i) => { const s = src(); glyphs.push({ ch, sx: s.x, sy: s.y, tx: finals[i].x, ty: finals[i].y, q: true, k: r(), ph: r() * 20, rad: 180 + r() * 380, sz: 66 }) })
    for (let i = 0; i < 260; i++) { const s = src(); glyphs.push({ ch: CYR[Math.floor(r() * CYR.length)], sx: s.x, sy: s.y, tx: 700 + r() * 920, ty: 120 + r() * 220, q: false, k: r(), ph: r() * 20, rad: 160 + r() * 440, sz: 20 + r() * 26 }) }
    const dust = Array.from({ length: 60 }, () => ({ u: r(), v: r(), s: 1 + r() * 1.5, ph: r() * 20 }))
    const st = { lift: 0, form: 0, hand: 0, freeze: 0 }
    const ctx = swarm.current!.getContext('2d')!
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
    let frozenT = 0
    const draw = () => {
      const t = gsap.ticker.time
      if (st.freeze < 1) frozenT = t
      ctx.clearRect(0, 0, 1920, 1080)
      ctx.fillStyle = '#d9e4f2'
      for (const d of dust) { // луч из высокого окна: справа сверху вниз к столу
        const y = d.v * 900, x = 1500 - y * 0.42 + d.u * 260 + (nz(d.ph + frozenT * 0.07, 1) - 0.5) * 50
        ctx.globalAlpha = 0.28 * (1 - st.form); ctx.fillRect(x, y + (nz(3, d.ph + frozenT * 0.05) - 0.5) * 30, d.s, d.s)
      }
      if (st.lift <= 0) { ctx.globalAlpha = 1; return }
      for (const g of glyphs) {
        const l = Math.min(1, Math.max(0, st.lift * 1.6 - g.k * 0.6)); if (l <= 0) continue
        const le = l * l * (3 - 2 * l)
        // орбита роя под окном: эллипс, у каждой буквы свой радиус и фаза
        const a = g.ph + t * (0.35 + (g.rad % 7) * 0.03)
        const ox = 1160 + Math.cos(a) * g.rad * 1.1, oy = 470 + Math.sin(a) * g.rad * 0.32 + (nz(g.ph, t * 0.3) - 0.5) * 60
        let x = g.sx + (ox - g.sx) * le, y = g.sy + (oy - g.sy) * le
        const f = Math.min(1, Math.max(0, st.form * 1.5 - g.k * 0.5)), fe = 1 - Math.pow(1 - f, 3)
        x += (g.tx - x) * fe; y += (g.ty - y) * fe
        let alpha = g.q ? 1 : 0.55 * (1 - fe)
        if (g.q) alpha *= 1 - st.hand
        if (alpha <= 0.01) continue
        const size = g.q ? 22 + (g.sz - 22) * fe : g.sz
        ctx.globalAlpha = alpha
        ctx.font = `${g.q ? 500 : 400} ${size}px 'EB Garamond', serif`
        ctx.fillStyle = g.q ? '#f3e7cf' : '#c9b48c'
        ctx.save(); ctx.translate(x, y); ctx.rotate((1 - fe) * Math.sin(a * 1.3) * 0.6); ctx.fillText(g.ch, 0, 0); ctx.restore()
      }
      ctx.globalAlpha = 1
    }
    gsap.ticker.add(draw)

    gsap.set(q('.l-ink'), { clipPath: 'inset(0 100% 0 0)' })
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
      .fromTo(q('.l-cam'), { scale: 1.1, y: 20 }, { scale: 1.02, y: 0, duration: 4, ease: 'sine.inOut' }, 0)
      .fromTo(q('.l-far'), { scale: 1.04 }, { scale: 1, duration: 4, ease: 'sine.inOut' }, 0) // дальний план «подъезжает» медленнее
      .addLabel('B', 3.4)
      // предвосхищение: пламя вытягивается и замирает, пыль встаёт
      .to(q('.l-flame'), { scaleY: 1.6, scaleX: 0.8, duration: 0.7, ease: 'power2.out' }, 'B')
      .to(st, { freeze: 1, duration: 0.5 }, 'B')
      // страница перелистывается сама: разгон — перелёт — шлепок о левую
      .to(q('.l-leaf'), { rotationY: -178, duration: 1.1, ease: 'power2.inOut' }, 'B+=0.5')
      .to(q('.l-leaf'), { rotationY: -172, duration: 0.25, ease: 'power1.out' }, 'B+=1.6')
      .to(q('.l-leaf'), { rotationY: -180, duration: 0.3, ease: 'power2.in' }, 'B+=1.85')
      // буквы срываются: со страниц и из корешков
      .to(st, { lift: 1, duration: 3.0, ease: 'none' }, 'B+=1.4')
      .to(q('.l-prose'), { opacity: 0, duration: 1.4, stagger: 0.08, ease: 'power2.in' }, 'B+=1.5')
      .to(q('.l-flame'), { scaleY: 1, scaleX: 1, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, 'B+=1.6')
      .addLabel('C', 7.6)
      .to(st, { form: 1, duration: 2.8, ease: 'none' }, 'C')
      .to(q('.l-glow'), { opacity: 1, duration: 2 }, 'C')
      .addLabel('D', 10.4)
      .to(q('.l-q .split'), { opacity: 1, duration: 0.5, stagger: { each: 0.006, from: 'random' } }, 'D')
      .to(st, { hand: 1, duration: 0.6 }, 'D+=0.1')
      .to(q('.l-ink'), { clipPath: 'inset(0 0% 0 0)', duration: 0.9, stagger: 0.35, ease: 'power1.inOut' }, 'D+=0.4')
      .fromTo(q('.l-time'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 'D+=0.3')
      .fromTo(q('.l-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.6')
      .addLabel('E', 13)
      .to(q('.l-cam'), { scale: 1.0, duration: 4, ease: 'sine.inOut' }, 'E')
      .to({}, { duration: 4 }, 'E')

    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        const ph = phaseOf(n); root.current?.setAttribute('data-ph', ph)
        candle.current?.style.setProperty('--wax', String(Math.max(0, n) / 30))
      },
      dispose: () => gsap.ticker.remove(draw),
    })
    return () => { gsap.ticker.remove(draw); tl.kill() }
  }, [onReady, qChars])

  const opts = QUESTION.options
  return (
    <div className="l-root" ref={root} data-ph="normal">
      <div className="l-cam lay">
        <canvas ref={corridor} className="lay l-far" width={1920} height={1080} />
        <svg className="lay" viewBox="0 0 1920 1080" aria-hidden>
          <defs>
            <linearGradient id="l-ray" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfe0f5" stopOpacity=".2" /><stop offset="1" stopColor="#cfe0f5" stopOpacity="0" /></linearGradient>
            <radialGradient id="l-cg" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffbf6e" stopOpacity=".55" /><stop offset=".4" stopColor="#ff9d4a" stopOpacity=".16" /><stop offset="1" stopColor="#ff9d4a" stopOpacity="0" /></radialGradient>
            <linearGradient id="l-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2416" /><stop offset=".08" stopColor="#21140c" /><stop offset="1" stopColor="#0b0705" /></linearGradient>
            <radialGradient id="l-qglow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#0c0a0e" stopOpacity=".75" /><stop offset="1" stopColor="#0c0a0e" stopOpacity="0" /></radialGradient>
          </defs>
          <polygon points="1500,0 1780,0 1180,920 860,920" fill="url(#l-ray)" />
          <ellipse className="l-glow" cx="1160" cy="300" rx="640" ry="190" fill="url(#l-qglow)" opacity="0" />
          {/* лестница у правой стены — глубина и масштаб */}
          <g stroke="#070506" strokeWidth="22" strokeLinecap="round"><path d="M 1700 1100 L 1560 -20" /><path d="M 1860 1100 L 1720 -20" /></g>
          <g stroke="#070506" strokeWidth="12">{Array.from({ length: 9 }, (_, i) => { const y = 1040 - i * 125; const k = (1100 - y) / 1120; return <path key={i} d={`M ${1700 - 140 * k} ${y} L ${1860 - 140 * k} ${y}`} /> })}</g>
          {/* стол */}
          <path d="M 300 1080 L 470 880 L 1760 880 L 1920 1080 Z" fill="url(#l-desk)" />
          <path d="M 470 880 L 1760 880" stroke="#6b4628" strokeWidth="2" opacity=".6" />
          <ellipse cx="1170" cy="1012" rx="500" ry="34" fill="#050302" opacity=".75" />
          <ellipse cx="560" cy="860" rx="420" ry="300" fill="url(#l-cg)" />
          {/* шкаф переднего плана слева — самая тёмная масса кадра */}
          <path d="M -20 -20 L 270 -20 L 270 1100 L -20 1100 Z" fill="#060405" />
          <path d="M 262 -20 L 262 1100" stroke="#3a2618" strokeWidth="3" opacity=".7" />
          {[120, 330, 540, 750, 960].map(y => <rect key={y} x="0" y={y} width="270" height="16" fill="#120b08" />)}
        </svg>
        {/* раскрытая книга на столе, вид под углом */}
        <div className="l-book">
          <div className="l-pages">
            <div className="l-page l">
              {PROSE.map((p, i) => <div key={i} className="l-prose">{p}</div>)}
              <div className="l-ink"><b>{opts[0].key}</b> {opts[0].text}</div>
              <div className="l-ink"><b>{opts[1].key}</b> {opts[1].text}</div>
            </div>
            <div className="l-page r">
              {PROSE.map((p, i) => <div key={i} className="l-prose">{p}</div>)}
              <div className="l-ink"><b>{opts[2].key}</b> {opts[2].text}</div>
              <div className="l-ink"><b>{opts[3].key}</b> {opts[3].text}</div>
            </div>
            <div className="l-leaf">{PROSE.slice(0, 5).map((p, i) => <div key={i} className="l-prose">{p}</div>)}</div>
          </div>
        </div>
        {/* свеча — таймер: воск тает со временем, число — над пламенем */}
        <div className="l-candle" ref={candle} style={css({ '--wax': 1 })}>
          <div className="l-time"><span ref={tnum}>30</span></div>
          <div className="l-flamebox"><div className="l-flame" /></div>
          <div className="l-wax" />
          <div className="l-holder" />
        </div>
        <canvas ref={swarm} className="lay" width={1920} height={1080} />
        <p className="l-q"><Letters text={QUESTION.text} /></p>
        <div className="l-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
