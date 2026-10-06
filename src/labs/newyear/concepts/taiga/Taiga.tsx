// ═══ CONCEPT 5 · ТАЙГА ═══
// Дикий зимний лес ночью, северное сияние, тропа фонарей уходит в глубину.
// Пять планов глубины (дальний лес в дымке → опушка → ели у тропы →
// огромные ели у самой камеры). Движение — кинематографическое: камера
// летит сквозь лес (настоящий параллакс планов), ветер сбивает снег с лап,
// сияние течёт по небу. Время — это фонари, которые гаснут один за другим.
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Particles, Tree, useCues, useStage, useTime } from '../../engine/stage'
import type { ParticleField } from '../../engine/particles'
import { FakeQR, useCountdown } from '../../engine/bits'
import { rng } from '../../engine/rng'
import { GAME, QUESTION, RACE, ROUND, SCORES, TEAMS_JOINED, TIMER_SEC, type ScreenId } from '../../content'
import type { Concept } from '../types'
import './taiga.css'

const SNOW_CFG = { layers: [
  { count: 110, size: [1, 2] as [number, number], speed: [20, 40] as [number, number], opacity: 0.6 },
  { count: 50, size: [2, 3.4] as [number, number], speed: [40, 70] as [number, number], opacity: 0.8 },
  { count: 14, size: [5, 9] as [number, number], speed: [80, 120] as [number, number], opacity: 0.55, blur: 0.8 },
], wind: 40, gust: 120, color: 'rgba(240,246,255,1)' }

/** Северное сияние: занавеси света, складки текут по горизонтали. */
function Aurora({ intensity = 1, className }: { intensity?: number; className?: string }) {
  const { k, paused, reduced, clock } = useStage()
  const cv = useRef<HTMLCanvasElement>(null)
  const inten = useRef(intensity)
  inten.current = intensity
  useEffect(() => {
    const c = cv.current!
    const KK = Math.max(0.35, Math.min(0.7, k * 0.5))
    const W = 1920, H = 620
    c.width = Math.round(W * KK); c.height = Math.round(H * KK)
    const g = c.getContext('2d')!
    const ribbons = [
      { y: 330, amp: 60, f: 0.0021, sp: 0.07, h: 300, c0: [80, 255, 170], c1: [120, 90, 255], ph: 0 },
      { y: 250, amp: 80, f: 0.0016, sp: -0.05, h: 230, c0: [60, 230, 210], c1: [160, 100, 255], ph: 2 },
      { y: 410, amp: 40, f: 0.0031, sp: 0.09, h: 180, c0: [120, 255, 150], c1: [80, 200, 255], ph: 4 },
    ]
    let raf = 0
    const frame = () => {
      const t = reduced ? 3 : clock.now()
      const I = inten.current
      g.setTransform(1, 0, 0, 1, 0, 0)
      g.clearRect(0, 0, c.width, c.height)
      g.setTransform(KK, 0, 0, KK, 0, 0)
      g.globalCompositeOperation = 'lighter'
      for (const rb of ribbons) {
        for (let x = 0; x < W; x += 6) {
          const base = rb.y + Math.sin(x * rb.f + t * rb.sp * 6 + rb.ph) * rb.amp + Math.sin(x * rb.f * 2.7 - t * 0.3) * rb.amp * 0.3
          // складки занавеси: яркость меняется вдоль, бегущими волнами
          const fold = 0.5 + 0.5 * Math.sin(x * 0.018 + t * 0.9 + rb.ph) * Math.sin(x * 0.0063 - t * 0.4)
          const a = Math.max(0, fold) * 0.22 * I
          if (a < 0.01) continue
          const top = base - rb.h * (0.7 + 0.3 * fold)
          const gr = g.createLinearGradient(0, base, 0, top)
          gr.addColorStop(0, `rgba(${rb.c0.join(',')},${a * 1.4})`)
          gr.addColorStop(0.25, `rgba(${rb.c0.join(',')},${a})`)
          gr.addColorStop(1, `rgba(${rb.c1.join(',')},0)`)
          g.fillStyle = gr
          g.fillRect(x, top, 7, base - top + 6)
        }
      }
      if (!paused && !reduced) raf = requestAnimationFrame(frame)
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [k, paused, reduced, clock])
  return <canvas ref={cv} className={`t-aurora ${className ?? ''}`} aria-hidden="true" />
}

interface TreeSpot { s: number; h: number; x: number; y: number; flip?: boolean }
const FAR: TreeSpot[] = [[1, 150, 40, 700], [2, 190, 150, 702], [3, 160, 260, 698], [4, 210, 380, 704], [5, 170, 1460, 700], [6, 200, 1580, 703], [7, 180, 1700, 699], [8, 220, 1830, 704], [9, 150, 520, 700], [10, 160, 1350, 700]]
  .map(([s, h, x, y]) => ({ s: 300 + s, h, x, y }))
const EDGE: TreeSpot[] = [[1, 330, 120, 760], [2, 400, 300, 772], [3, 300, 470, 756], [4, 360, 1440, 766], [5, 420, 1620, 776], [6, 320, 1800, 760]]
  .map(([s, h, x, y]) => ({ s: 320 + s, h, x, y }))
const NEAR: TreeSpot[] = [[1, 720, 180, 1010], [2, 640, 1760, 1000]].map(([s, h, x, y]) => ({ s: 340 + s, h, x, y }))
const GIANT: TreeSpot[] = [[1, 1500, -140, 1260], [2, 1420, 2060, 1240]].map(([s, h, x, y]) => ({ s: 360 + s, h, x, y }))

function TreeAt({ t, opts, className }: { t: TreeSpot; opts: Partial<Parameters<typeof Tree>[0]['opts']>; className?: string }) {
  // ель ставится основанием в точку (x, y); габариты — как в treeBox
  const H = t.h, spread = opts.spread ?? 0.32
  const w = H * spread * 2 * 1.16 + H * 0.1
  return <Tree className={className} opts={{ seed: t.s, height: H, spread, ...opts }} style={{ left: t.x - w / 2, top: t.y - H * 1.05 }} />
}

const LANTERNS = Array.from({ length: 10 }, (_, i) => {
  // тропа: от камеры (низ кадра) к поляне; дальние — выше, меньше, ближе к оси
  const f = i / 9
  const depth = 1 - f
  const side = i % 2 ? 1 : -1
  return { i, x: 960 + side * (60 + depth * depth * 520), y: 780 + depth * depth * 250, s: 0.35 + depth * 0.9 }
})

function World({ cam = 'rest', aurora = 1, lanternsOut = 0, gust = false, dim = false }: {
  cam?: 'rest' | 'fly' | 'rise'; aurora?: number; lanternsOut?: number; gust?: boolean; dim?: boolean
}) {
  return (
    <div className={`t-world is-${cam}${gust ? ' is-gust' : ''}${dim ? ' is-dim' : ''}`}>
      <div className="t-sky"><div className="t-stars" /><div className="t-stars t-stars-2" /></div>
      <div className="t-plane t-p4"><Aurora intensity={aurora} /></div>
      <div className="t-plane t-p3">
        <div className="t-ridge" />
        {FAR.map(t => <TreeAt key={t.s} t={t} opts={{ spread: 0.28, density: 0.4, color: [200, 26, 18], fog: { color: '#1c3554', amount: 0.55 }, snow: 0.25 }} />)}
      </div>
      <div className="t-plane t-p2">
        <div className="t-snowfield" />
        <svg className="t-path" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true">
          <path d="M 700 1080 C 820 900, 900 800, 940 740 L 980 740 C 1020 800, 1100 900, 1220 1080 Z" />
        </svg>
        {EDGE.map(t => <TreeAt key={t.s} t={t} opts={{ spread: 0.3, density: 0.6, color: [168, 24, 16], snow: 0.55, fog: { color: '#22406a', amount: 0.25 } }} />)}
        {LANTERNS.map(l => (
          <div key={l.i} className={`t-lantern${l.i < lanternsOut ? ' is-out' : ''}`} style={{ left: l.x, top: l.y, '--s': l.s, '--d': `${-l.i * 0.37}s` } as CSSProperties}>
            <i /><b /><span />
          </div>
        ))}
      </div>
      <div className="t-plane t-p1">
        {NEAR.map(t => <TreeAt key={t.s} className="t-sway" t={t} opts={{ spread: 0.33, color: [155, 28, 14], snow: 0.7, droop: 1.2, lightX: 0.6 }} />)}
      </div>
      <div className="t-plane t-p0">
        {GIANT.map(t => <TreeAt key={t.s} className="t-sway t-sway-slow" t={t} opts={{ spread: 0.34, color: [150, 26, 10], snow: 0.6, droop: 1.25, density: 0.7 }} />)}
      </div>
    </div>
  )
}

// ── экраны ────────────────────────────────────────────────

function Lobby() {
  return (
    <div className="t-scene t-lobby">
      <World cam="rest" />
      <Particles z={20} snow={SNOW_CFG} />
      <div className="t-lobby-copy">
        <div className="t-kicker t-in" style={{ '--t': '0.8s' } as CSSProperties}>{GAME.subtitle}</div>
        <h1 className="t-logo t-in" style={{ '--t': '1.1s' } as CSSProperties}>Quiz Party</h1>
        <div className="t-date t-in" style={{ '--t': '1.5s' } as CSSProperties}>{GAME.date}</div>
      </div>
      <div className="t-join t-in" style={{ '--t': '2s' } as CSSProperties}>
        <FakeQR size={140} fg="#06101f" bg="#e9f1fb" />
        <div>
          <div className="t-join-label">Комната</div>
          <div className="t-join-code">{GAME.room}</div>
          <div className="t-join-url">{GAME.url}</div>
        </div>
      </div>
      <div className="t-teams t-in" style={{ '--t': '2.4s' } as CSSProperties}>
        <span>У костра</span>{TEAMS_JOINED.map(t => <em key={t}>{t}</em>)}
      </div>
    </div>
  )
}

function Intro() {
  return (
    <div className="t-scene t-intro">
      <World cam="fly" aurora={1.6} />
      <Particles z={20} snow={SNOW_CFG} />
      <div className="t-act">
        <div className="t-act-k">Раунд {ROUND.number} из {ROUND.total}</div>
        <div className="t-act-num">{ROUND.number}</div>
        <div className="t-act-title">{ROUND.title}</div>
        <div className="t-act-rules">{ROUND.rules}</div>
      </div>
    </div>
  )
}

function QBlock({ compact, label }: { compact?: boolean; label?: string }) {
  return (
    <div className={`t-q${compact ? ' is-compact' : ' t-in'}`} style={{ '--t': '0.5s' } as CSSProperties}>
      <div className="t-q-label">{label ?? QUESTION.label}</div>
      <div className="t-q-text">{QUESTION.text}</div>
    </div>
  )
}

function Cards({ answer }: { answer?: boolean }) {
  return (
    <div className={`t-cards${answer ? ' is-answer' : ''}`}>
      {QUESTION.options.map((o, i) => (
        <div key={o.key} className={`t-card${o.key === QUESTION.correct ? ' is-correct' : ' is-wrong'}${answer ? '' : ' t-light'}`} style={{ '--t': `${1.2 + i * 0.18}s`, '--i': i } as CSSProperties}>
          <span className="t-card-lamp" />
          <span className="t-card-key">{o.key}</span>
          <span className="t-card-text">{o.text}</span>
        </div>
      ))}
    </div>
  )
}

function Question() {
  return (
    <div className="t-scene">
      <World cam="rest" aurora={0.45} dim />
      <Particles z={20} snow={SNOW_CFG} />
      <QBlock />
      <Cards />
      <div className="t-answered t-in" style={{ '--t': '2s' } as CSSProperties}>Ответили {QUESTION.answered} из {QUESTION.teams} · {TIMER_SEC} секунд</div>
    </div>
  )
}

function Timer() {
  const { sec, remaining, done } = useCountdown()
  // фонари гаснут от дальнего к ближнему: темнота приходит из леса
  const out = done ? 10 : Math.floor(((TIMER_SEC - remaining) / TIMER_SEC) * 10)
  return (
    <div className={`t-scene${remaining <= 5 ? ' is-warn' : ''}`}>
      <World cam="rest" aurora={0.35 + (remaining / TIMER_SEC) * 0.4} lanternsOut={out} dim />
      <Particles z={20} snow={SNOW_CFG} />
      <QBlock compact />
      <div className="t-timer">
        <div className="t-timer-num" key={done ? 'x' : sec}>{done ? '0' : sec}</div>
        <div className="t-timer-cap">{done ? 'фонари погасли' : `секунд · горит фонарей: ${10 - out}`}</div>
      </div>
    </div>
  )
}

function Answer() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  const [gust, setGust] = useState(false)
  useCues([
    [0.7, () => setGust(true)],
    [0.8, () => {
      // ветер сбивает снег с лап ближних елей
      for (const [x, y] of [[180, 420], [260, 560], [1760, 440], [1680, 600], [120, 700], [1820, 720]]) {
        fx?.burst({ x, y, angle: -0.3, spread: 1.1, speed: [80, 420], count: 60, colors: ['#ffffff', '#e6f0ff', '#cfe0f7'], material: 'paper', shapes: ['circle'], size: [3, 7] })
      }
    }],
    [1.4, () => fx?.dust({ count: 70, area: { x: 300, y: 80, w: 1320, h: 420 }, color: 'rgba(170,255,220,1)', size: [1.5, 3], rise: 8 })],
  ], [fx])
  return (
    <div className="t-scene t-answer">
      <World cam="rest" aurora={gust ? 2 : 0.45} gust={gust} dim />
      <Particles z={20} snow={SNOW_CFG} />
      <QBlock compact label="Правильный ответ" />
      <Cards answer />
      <div className="t-ans">
        <div className="t-ans-text">{QUESTION.answer}</div>
        <div className="t-ans-fact">{QUESTION.fact}</div>
      </div>
      <Particles z={25} onReady={setFx} seed={15} />
    </div>
  )
}

function Scoreboard() {
  return (
    <div className="t-scene">
      <World cam="rest" aurora={0.6} dim />
      <Particles z={20} snow={SNOW_CFG} />
      <div className="t-score-head t-in" style={{ '--t': '0.3s' } as CSSProperties}>
        <span className="t-kicker">После раунда {ROUND.number}</span>
        <h2>Турнирная таблица</h2>
      </div>
      <ol className="t-rows">
        {SCORES.map((s, i) => (
          <li key={s.name} className={`t-row${i === 0 ? ' is-lead' : ''}`} style={{ '--t': `${0.7 + (SCORES.length - 1 - i) * 0.3}s` } as CSSProperties}>
            <span className="t-row-lamp" />
            <span className="t-row-place">{i + 1}</span>
            <span className="t-row-name">{s.name}</span>
            <span className="t-row-delta">{s.delta ? `+${s.delta}` : ''}</span>
            <span className="t-row-score">{s.score}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Dog({ color, mask, scarf }: { color: string; mask: string; scarf: string }) {
  return (
    <svg className="t-dog" viewBox="0 0 120 80" width="120" height="80" aria-hidden="true">
      <g className="t-dog-legs" fill={mask}>
        <rect className="t-leg t-leg-a" x="28" y="52" width="10" height="22" rx="4" />
        <rect className="t-leg t-leg-b" x="44" y="52" width="10" height="22" rx="4" />
        <rect className="t-leg t-leg-b" x="72" y="52" width="10" height="22" rx="4" />
        <rect className="t-leg t-leg-a" x="86" y="52" width="10" height="22" rx="4" />
      </g>
      <ellipse cx="60" cy="46" rx="40" ry="20" fill={color} />
      <path d="M 92 40 q 16 -4 20 6 q -6 4 -14 2" fill={scarf} className="t-scarf" />
      <circle cx="96" cy="32" r="18" fill={color} />
      <ellipse cx="104" cy="38" rx="9" ry="7" fill={mask} />
      <path d="M 84 20 l 6 -8 l 4 10 Z M 100 18 l 8 -8 l 2 12 Z" fill={mask} />
      <circle cx="98" cy="28" r="2.4" fill="#111" />
      <rect x="78" y="40" width="10" height="12" rx="3" fill={scarf} />
    </svg>
  )
}

function Special() {
  const t = useTime(30)
  const start = 1.6, dur = 6
  const p = Math.max(0, Math.min(1, (t - start) / dur))
  const r = useMemo(() => rng(31), [])
  const wobble = useMemo(() => RACE.dogs.map(() => [r() * 6, 0.5 + r()]), [r])
  const winner = RACE.finish.indexOf(Math.max(...RACE.finish))
  return (
    <div className={`t-scene t-race${p >= 1 ? ' is-done' : ''}`}>
      <World cam="rest" aurora={0.8} dim />
      <Particles z={20} snow={SNOW_CFG} />
      <div className="t-race-head t-in" style={{ '--t': '0.2s' } as CSSProperties}>
        <span className="t-kicker">Специальный раунд</span>
        <h2>{RACE.title}</h2>
        <p>{RACE.rules}</p>
      </div>
      <div className="t-track">
        <div className="t-finish"><span>Финиш</span></div>
        {RACE.dogs.map((d, i) => {
          // у каждого бульдога свой рисунок забега: рывки и передышки
          const [ph, sp] = wobble[i]
          const prog = Math.min(RACE.finish[i], p * RACE.finish[i] + Math.sin(p * Math.PI * 3 * sp + ph) * 0.04 * (1 - p) * p * 4)
          return (
            <div key={d.name} className={`t-lane${p >= 1 && i === winner ? ' is-win' : ''}`} style={{ '--i': i } as CSSProperties}>
              <span className="t-lane-name">{d.name}</span>
              <div className="t-runner" style={{ left: `${Math.max(0, prog) * 82}%` }}>
                <span className="t-kick" />
                <Dog {...d} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="t-race-win">Первым пришёл — {RACE.dogs[winner].name}</div>
    </div>
  )
}

function Finale() {
  const lanterns = useMemo(() => {
    const r = rng(55)
    return Array.from({ length: 26 }, (_, i) => ({ x: 120 + r() * 1680, s: 0.5 + r() * 0.8, d: 0.6 + r() * 4.5, dur: 9 + r() * 7, sw: (r() - 0.5) * 120, i }))
  }, [])
  const [first, second, third] = SCORES
  return (
    <div className="t-scene t-finale">
      <World cam="rise" aurora={2.2} />
      <Particles z={20} snow={SNOW_CFG} />
      <div className="t-skylanterns" aria-hidden="true">
        {lanterns.map(l => (
          <span key={l.i} style={{ left: l.x, '--s': l.s, '--d': `${l.d}s`, '--dur': `${l.dur}s`, '--sw': `${l.sw}px` } as CSSProperties} />
        ))}
      </div>
      <div className="t-fin">
        <div className="t-kicker">Победитель вечера</div>
        <div className="t-fin-name">{first.name}</div>
        <div className="t-fin-score">{first.score} балла</div>
        <div className="t-fin-rest">2 · {second.name} — {second.score}<i />3 · {third.name} — {third.score}</div>
      </div>
      <div className="t-fin-greet">С Новым годом</div>
    </div>
  )
}

function Screen({ screen }: { screen: ScreenId }) {
  switch (screen) {
    case 'lobby': return <Lobby />
    case 'intro': return <Intro />
    case 'question': return <Question />
    case 'timer': return <Timer />
    case 'answer': return <Answer />
    case 'scoreboard': return <Scoreboard />
    case 'special': return <Special />
    case 'finale': return <Finale />
  }
}

export const taiga: Concept = {
  meta: {
    id: 'taiga', num: 5, name: 'Тайга',
    tagline: 'Ночной лес, северное сияние и тропа фонарей',
    idea: 'Кинематографичный и самый «дикий» мир: настоящий зимний лес в пять планов глубины, северное сияние над поляной и тропа фонарей, уходящая в чащу. Праздник здесь — не гирлянды, а свет посреди огромной тихой природы.',
    metaphor: 'Ночной поход к поляне, где встречают Новый год. Раунды — переходы глубже в лес, время — фонари на тропе, финал — небесные фонарики над тайгой.',
    composition: 'Панорама с низким горизонтом и центральной перспективой: тропа ведёт взгляд к поляне, огромные ели у камеры обрамляют кадр по краям, вся информация — в небе над лесом.',
    light: 'Лунный холодный свет, северное сияние (зелёный → бирюза → фиолет), тёплые фонари на тропе и их пятна на снегу. В игре сияние приглушено, на ответе — вспыхивает.',
    materials: 'Снег с голубыми тенями, хвоя под тяжестью снега, светящиеся занавеси сияния, стекло и пламя фонарей, рисовая бумага небесных фонариков.',
    motion: 'Камера летит сквозь лес — планы расходятся с разной скоростью; ветер раскачивает ближние ели и порывами сбивает снег с лап; сияние медленно течёт складками; фонари дрожат пламенем.',
    transitions: 'Смена раунда = пролёт сквозь лес: ближние ели проносятся мимо камеры, камера выходит на поляну, и номер раунда загорается в небе светом сияния.',
    trees: 'Настоящая тайга: пять планов елей — силуэты в морозной дымке, опушка, ели у тропы и огромные заснеженные ели у самой камеры, которые качает ветер.',
    hierarchy: {
      primary: 'Текст в небе: вопрос, большие цифры таймера, табло.',
      secondary: 'Карточки-ответы с фонарями над снегом; тропа фонарей.',
      atmosphere: 'Северное сияние, звёзды, метель, ближние ели.',
    },
    special: '«Скачки бульдогов» — бульдоги в шарфах бегут по снежным дорожкам поляны, взбивая снег; финиш отмечен фонарями.',
  },
  Screen,
}
