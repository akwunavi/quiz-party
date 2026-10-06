// ═══ CONCEPT 1 · ГАЛА-СЦЕНА ═══
// Новогодний концерт в театре: бархатный занавес, софиты, огромная пихта в
// центре сцены, глянцевый пол с отражением, рампа. Движение — это работа
// осветителей и машинерии сцены: прожекторы ищут и находят, занавес
// собирается складками, декорации опускаются со штанкетов, пушки стреляют
// фольгой. Ничего не «плавает» просто так.
import { useState, type CSSProperties } from 'react'
import { DecoratedTree } from '../../engine/DecoratedTree'
import { Particles, useCues } from '../../engine/stage'
import type { ParticleField } from '../../engine/particles'
import { FakeQR, useCountdown } from '../../engine/bits'
import {
  GAME, JEOPARDY, QUESTION, ROUND, SCORES, TEAMS_JOINED, TIMER_SEC, type ScreenId,
} from '../../content'
import type { Concept } from '../types'
import './gala.css'

const GOLD = ['#e8c77a', '#f6e6bd', '#c9973f', '#fff1cf']
const FOIL = ['#e8c77a', '#f6e6bd', '#c9973f', '#a51f33', '#fff8e6']

// ── декорации ─────────────────────────────────────────────

type CurtainState = 'open' | 'wide' | 'half' | 'closed'
function Curtains({ state }: { state: CurtainState }) {
  const N = 16
  return (
    <div className={`g-curtains is-${state}`} aria-hidden="true">
      {(['l', 'r'] as const).map(side => (
        <div key={side} className={`g-cside g-cside-${side}`}>
          {Array.from({ length: N }, (_, i) => (
            <div key={i} className="g-strip" style={{ '--i': i, '--n': N } as CSSProperties} />
          ))}
        </div>
      ))}
      <div className="g-valance"><div className="g-swags" /><div className="g-fringe" /></div>
    </div>
  )
}

interface BeamDef { x: number; a0: number; a1: number; c?: string; w?: number; dur?: number; delay?: number; on?: number }
function Beams({ beams, className }: { beams: BeamDef[]; className?: string }) {
  return (
    <div className={`g-beams ${className ?? ''}`} aria-hidden="true">
      {beams.map((b, i) => (
        <div key={i} className="g-beam" style={{
          left: b.x, '--a0': `${b.a0}deg`, '--a1': `${b.a1}deg`, '--c': b.c ?? 'rgba(255,236,205,0.5)',
          '--w': `${b.w ?? 520}px`, '--dur': `${b.dur ?? 9}s`, '--d': `${b.delay ?? 0}s`, '--on': `${b.on ?? 0}s`,
        } as CSSProperties} />
      ))}
    </div>
  )
}

function Backdrop() {
  return (
    <div className="g-backdrop" aria-hidden="true">
      <div className="g-cyc" />
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className="g-bokeh" style={{
          left: 180 + ((i * 137) % 1560), top: 160 + ((i * 89) % 380),
          '--s': `${26 + ((i * 17) % 40)}px`, '--d': `${(i % 5) * 0.9}s`,
        } as CSSProperties} />
      ))}
    </div>
  )
}

function Floor() {
  return (
    <div className="g-floor" aria-hidden="true">
      <div className="g-boards" />
      <div className="g-footlights">
        {Array.from({ length: 22 }, (_, i) => <span key={i} style={{ '--i': i } as CSSProperties} />)}
      </div>
    </div>
  )
}

function Star() {
  return (
    <div className="g-star">
      <svg viewBox="-50 -50 100 100" width="92" height="92" aria-hidden="true">
        <defs>
          <linearGradient id="gstar" x1="0" y1="-1" x2="0" y2="1">
            <stop offset="0" stopColor="#fff6d6" /><stop offset="0.5" stopColor="#e8c77a" /><stop offset="1" stopColor="#9a6a24" />
          </linearGradient>
        </defs>
        <polygon fill="url(#gstar)" stroke="#fff3cf" strokeWidth="1.2"
          points={Array.from({ length: 10 }, (_, k) => {
            const r = k % 2 ? 17 : 42; const a = -Math.PI / 2 + (k * Math.PI) / 5
            return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`
          }).join(' ')} />
      </svg>
    </div>
  )
}

function GalaTree({ mode = 'full', x = 960, baseY = 960, height = 800, chase = false, progress = 0 }: {
  mode?: 'full' | 'dim' | 'far'; x?: number; baseY?: number; height?: number; chase?: boolean; progress?: number
}) {
  return (
    <DecoratedTree
      className={`g-tree is-${mode}`}
      opts={{ seed: 21, height: 900, spread: 0.37, color: [148, 34, 19], droop: 0.72, innerGlow: 0.9, lightX: -0.25 }}
      displayHeight={height}
      baseX={x} baseY={baseY}
      ornaments={{ kind: 'glass', colors: ['#d4ad55', '#f1dfb0', '#9c1b2b', '#b98a35', '#e9d39a'], count: 46, size: 1.05 }}
      lights={{ colors: ['rgba(255,206,140,1)', 'rgba(255,232,190,1)'], count: 150, mode: chase ? 'chase' : 'breath', spiral: 7, size: 0.85, progress }}
      topper={<Star />}
      reflection={{ opacity: 0.22, blur: 3 }}
    >
      <Gifts x={(900 * 0.37 * 2 * 1.16 + 900 * 0.1) / 2 * (height / 900)} y={(900 * 1.05) * (height / 900)} s={height / 800} />
    </DecoratedTree>
  )
}

const GIFTS = [
  { dx: -230, w: 120, h: 92, bx: '#8c1a2d', rb: '#e8c77a' },
  { dx: -130, w: 92, h: 128, bx: '#efe1bd', rb: '#9c1b2b' },
  { dx: 150, w: 132, h: 84, bx: '#13294f', rb: '#e8c77a' },
  { dx: 250, w: 86, h: 110, bx: '#c9973f', rb: '#7a1424' },
  { dx: -40, w: 70, h: 58, bx: '#1f3d2e', rb: '#f1dfb0' },
]
function Gifts({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <div className="g-gifts" style={{ left: x, top: y }}>
      {GIFTS.map((g, i) => (
        <div key={i} className="g-gift" style={{
          left: g.dx * s - (g.w * s) / 2, width: g.w * s, height: g.h * s, '--bx': g.bx, '--rb': g.rb,
        } as CSSProperties} />
      ))}
    </div>
  )
}

function Plate({ k, text, className, style }: { k: string; text: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`g-plate ${className ?? ''}`} style={style}>
      <span className="g-plate-key">{k}</span>
      <span className="g-plate-text">{text}</span>
    </div>
  )
}

function BulbRing({ n, lit, size, warn }: { n: number; lit: number; size: number; warn: boolean }) {
  return (
    <div className={`g-ring${warn ? ' is-warn' : ''}`} style={{ width: size, height: size }}>
      {Array.from({ length: n }, (_, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2
        return (
          <span key={i} className={`g-bulb${i < lit ? '' : ' is-off'}`} style={{
            left: size / 2 + Math.cos(a) * (size / 2 - 14), top: size / 2 + Math.sin(a) * (size / 2 - 14),
          }} />
        )
      })}
    </div>
  )
}

// ── экраны ────────────────────────────────────────────────

function Lobby() {
  const [curtain, setCurtain] = useState<CurtainState>('closed')
  useCues([[0.6, () => setCurtain('open')]])
  return (
    <div className="g-scene g-lobby">
      <Backdrop />
      <Beams className="is-lobby" beams={[
        { x: 520, a0: -24, a1: 12, dur: 11, on: 0.2 },
        { x: 1400, a0: 22, a1: -10, dur: 13, delay: -3, on: 0.45 },
        { x: 960, a0: -6, a1: 6, dur: 8, c: 'rgba(180,205,255,0.32)', on: 0.7 },
        { x: 240, a0: -30, a1: -8, dur: 15, c: 'rgba(255,190,150,0.35)', on: 0.9 },
        { x: 1680, a0: 30, a1: 8, dur: 12, c: 'rgba(255,190,150,0.35)', on: 1.05 },
      ]} />
      <GalaTree x={1190} baseY={968} height={830} />
      <Floor />
      <Particles z={6} snow={{ layers: [
        { count: 60, size: [1.5, 3], speed: [30, 55], opacity: 0.5, blur: 0.5 },
        { count: 26, size: [3, 5], speed: [55, 85], opacity: 0.75, blur: 0.4 },
      ], wind: 6, color: 'rgba(255,240,215,1)' }} />
      <div className="g-lobby-copy">
        <div className="g-kicker g-rise" style={{ '--t': '1.6s' } as CSSProperties}>{GAME.subtitle}</div>
        <h1 className="g-logo g-rise" style={{ '--t': '1.8s' } as CSSProperties}>Quiz<br />Party</h1>
        <div className="g-date g-rise" style={{ '--t': '2.1s' } as CSSProperties}>{GAME.date}</div>
        <div className="g-join g-rise" style={{ '--t': '2.4s' } as CSSProperties}>
          <FakeQR size={150} fg="#1a0d08" bg="#f6e6bd" />
          <div>
            <div className="g-join-label">Комната</div>
            <div className="g-join-code">{GAME.room}</div>
            <div className="g-join-url">{GAME.url}</div>
          </div>
        </div>
      </div>
      <div className="g-marquee" aria-label="Команды в зале">
        <div className="g-marquee-track">
          {[...TEAMS_JOINED, ...TEAMS_JOINED].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
      <Curtains state={curtain} />
    </div>
  )
}

function Intro() {
  const [curtain, setCurtain] = useState<CurtainState>('open')
  const [stage, setStage] = useState(0)
  useCues([
    [0.15, () => setCurtain('closed')],
    [1.5, () => setStage(1)],
    [1.9, () => setStage(2)],
  ])
  return (
    <div className={`g-scene g-intro is-s${stage}`}>
      <Backdrop />
      <GalaTree mode="dim" />
      <Floor />
      <Curtains state={curtain} />
      <div className="g-iris" aria-hidden="true" />
      <div className="g-intro-copy">
        <div className="g-kicker">Акт II · Раунд {ROUND.number} из {ROUND.total}</div>
        <h1 className="g-intro-title">
          <span className="g-line"><span>Кино</span></span>
          <span className="g-line"><span>под бой курантов</span></span>
        </h1>
        <div className="g-rule" />
        <div className="g-intro-rules">{ROUND.rules}</div>
      </div>
    </div>
  )
}

function QuestionPanel({ compact, label }: { compact?: boolean; label?: string }) {
  return (
    <div className={`g-panel${compact ? ' is-compact' : ''}`}>
      <span className="g-cable g-cable-l" /><span className="g-cable g-cable-r" />
      <div className="g-panel-inner">
        <div className="g-panel-label">{label ?? QUESTION.label}</div>
        <div className="g-panel-q">{QUESTION.text}</div>
      </div>
    </div>
  )
}

function Question() {
  return (
    <div className="g-scene g-question">
      <Backdrop />
      <Beams beams={[
        { x: 420, a0: 16, a1: 18, dur: 6, c: 'rgba(255,236,205,0.32)', on: 0.1 },
        { x: 1500, a0: -16, a1: -18, dur: 6, c: 'rgba(255,236,205,0.32)', on: 0.25 },
      ]} />
      <GalaTree mode="far" />
      <Floor />
      <Curtains state="wide" />
      <QuestionPanel />
      <div className="g-plates">
        {QUESTION.options.map((o, i) => (
          <Plate key={o.key} k={o.key} text={o.text} className="g-lift" style={{ '--t': `${1.4 + i * 0.14}s` } as CSSProperties} />
        ))}
      </div>
      <div className="g-mini-timer g-rise" style={{ '--t': '1.9s' } as CSSProperties}>
        <BulbRing n={30} lit={30} size={118} warn={false} />
        <span>{TIMER_SEC}</span>
      </div>
      <div className="g-answered g-rise" style={{ '--t': '2.1s' } as CSSProperties}>Ответили {QUESTION.answered} из {QUESTION.teams}</div>
    </div>
  )
}

function Timer() {
  const { sec, remaining, done } = useCountdown()
  const warn = remaining <= 10
  return (
    <div className={`g-scene g-timer${warn ? ' is-warn' : ''}${done ? ' is-done' : ''}`}>
      <Backdrop />
      <Beams className="g-beams-focus" beams={[
        { x: 520, a0: -20, a1: -21, dur: 5, c: 'rgba(255,226,190,0.42)' },
        { x: 1400, a0: 20, a1: 21, dur: 5, c: 'rgba(255,226,190,0.42)' },
      ]} />
      <GalaTree mode="far" progress={done ? 1 : 0} />
      <Floor />
      <Curtains state="wide" />
      <QuestionPanel compact />
      <div className="g-bigtimer">
        <BulbRing n={TIMER_SEC} lit={Math.ceil(remaining)} size={500} warn={warn} />
        <div className="g-bigtimer-num" key={done ? 'done' : sec}>{done ? '0' : sec}</div>
        <div className="g-bigtimer-cap">{done ? 'Время вышло' : 'секунд'}</div>
      </div>
    </div>
  )
}

function Answer() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  useCues([
    [1.25, () => {
      fx?.burst({ x: 150, y: 960, angle: -1.05, spread: 0.32, speed: [1700, 2700], count: 140, colors: FOIL, material: 'foil', streamers: 6, smoke: true, size: [12, 20] })
      fx?.burst({ x: 1770, y: 960, angle: -2.09, spread: 0.32, speed: [1700, 2700], count: 140, colors: FOIL, material: 'foil', streamers: 6, smoke: true, size: [12, 20] })
    }],
    [1.9, () => fx?.burst({ x: 960, y: -40, xSpread: 760, angle: Math.PI / 2, spread: 0.3, speed: [60, 220], count: 120, colors: GOLD, material: 'gold', shapes: ['circle', 'rect'], size: [8, 13] })],
  ], [fx])
  return (
    <div className="g-scene g-answer">
      <Backdrop />
      <Beams className="g-beams-snap" beams={[
        { x: 300, a0: 14, a1: 14, dur: 4, c: 'rgba(255,236,205,0.5)' },
        { x: 1620, a0: -14, a1: -14, dur: 4, c: 'rgba(255,236,205,0.5)' },
        { x: 960, a0: 0, a1: 0, dur: 4, c: 'rgba(255,250,235,0.45)', w: 700 },
      ]} />
      <GalaTree mode="far" chase />
      <Floor />
      <Curtains state="wide" />
      <QuestionPanel compact label="Правильный ответ" />
      <div className="g-plates g-plates-answer">
        {QUESTION.options.map((o, i) => (
          <Plate key={o.key} k={o.key} text={o.text}
            className={o.key === QUESTION.correct ? 'is-correct' : 'is-wrong'}
            style={{ '--i': i } as CSSProperties} />
        ))}
      </div>
      <div className="g-answer-banner">
        <div className="g-answer-key">{QUESTION.correct}</div>
        <div className="g-answer-text">{QUESTION.answer}</div>
        <div className="g-answer-fact">{QUESTION.fact}</div>
      </div>
      <div className="g-flash" aria-hidden="true" />
      <Particles z={30} onReady={setFx} seed={11} />
    </div>
  )
}

function Scoreboard() {
  const rows = SCORES
  return (
    <div className="g-scene g-score">
      <Backdrop />
      <Beams beams={[
        { x: 700, a0: 6, a1: 6, dur: 4, c: 'rgba(255,236,205,0.3)', on: 0.1 },
        { x: 1220, a0: -6, a1: -6, dur: 4, c: 'rgba(255,236,205,0.3)', on: 0.1 },
      ]} />
      <GalaTree mode="far" />
      <Floor />
      <Curtains state="wide" />
      <div className="g-score-head g-rise" style={{ '--t': '0.3s' } as CSSProperties}>
        <span className="g-kicker">После раунда {ROUND.number}</span>
        <h2>Турнирная таблица</h2>
      </div>
      <ol className="g-rows">
        {rows.map((r, i) => {
          const order = rows.length - 1 - i                          // снизу вверх: интрига к лидеру
          return (
            <li key={r.name} className={`g-row${i === 0 ? ' is-lead' : ''}`}
              style={{ '--t': `${0.8 + order * 0.32 + (i === 0 ? 0.5 : 0)}s`, '--from': i % 2 ? '1' : '-1' } as CSSProperties}>
              <span className="g-row-place">{i + 1}</span>
              <span className="g-row-name">{r.name}</span>
              <span className="g-row-delta">{r.delta ? `+${r.delta}` : '—'}</span>
              <span className="g-row-score">{r.score}</span>
            </li>
          )
        })}
      </ol>
      <div className="g-leadspot" aria-hidden="true" />
    </div>
  )
}

function Special() {
  const [open, setOpen] = useState(false)
  useCues([[3.6, () => setOpen(true)]])
  const played = new Set(JEOPARDY.played)
  return (
    <div className={`g-scene g-jeo${open ? ' is-open' : ''}`}>
      <Backdrop />
      <Beams className="g-beams-hunt" beams={[
        { x: 560, a0: -20, a1: 22, dur: 3.2, c: 'rgba(255,236,205,0.42)', on: 0.2 },
        { x: 1360, a0: 22, a1: -16, dur: 3.6, c: 'rgba(255,236,205,0.42)', on: 0.3 },
      ]} />
      <GalaTree mode="far" />
      <Floor />
      <Curtains state="wide" />
      <div className="g-jeo-head g-rise" style={{ '--t': '0.2s' } as CSSProperties}>
        <span className="g-kicker">Специальный раунд</span>
        <h2>{JEOPARDY.title}</h2>
      </div>
      <div className="g-board">
        {JEOPARDY.themes.map((th, r) => (
          <div key={th} className="g-board-row">
            <div className="g-board-theme g-led" style={{ '--t': `${0.5 + r * 0.12}s` } as CSSProperties}>{th}</div>
            {JEOPARDY.values.map((v, c) => {
              const isPlayed = played.has(`${r}-${c}`)
              const isPick = r === JEOPARDY.open.theme && c === JEOPARDY.open.value
              return (
                <div key={v} className={`g-tile g-led${isPlayed ? ' is-played' : ''}${isPick ? ' is-pick' : ''}`}
                  style={{ '--t': `${0.7 + c * 0.16 + r * 0.05}s` } as CSSProperties}>
                  {isPlayed ? '' : v}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="g-jeo-open" aria-hidden={!open}>
        <div className="g-jeo-open-tag">{JEOPARDY.themes[JEOPARDY.open.theme]} · {JEOPARDY.values[JEOPARDY.open.value]}</div>
        <div className="g-jeo-open-q">{JEOPARDY.open.text}</div>
      </div>
    </div>
  )
}

function Finale() {
  const [curtain, setCurtain] = useState<CurtainState>('closed')
  const [fx, setFx] = useState<ParticleField | null>(null)
  const [lit, setLit] = useState(false)
  const volley = (n: number) => {
    fx?.burst({ x: 120, y: 980, angle: -1.0, spread: 0.3, speed: [1900, 2900], count: 150 + n * 20, colors: FOIL, material: 'foil', streamers: 8, smoke: true, sparks: 30, size: [12, 22] })
    fx?.burst({ x: 1800, y: 980, angle: -2.14, spread: 0.3, speed: [1900, 2900], count: 150 + n * 20, colors: FOIL, material: 'foil', streamers: 8, smoke: true, sparks: 30, size: [12, 22] })
  }
  useCues([
    [1.4, () => { setCurtain('wide'); setLit(true) }],
    [1.8, () => volley(0)],
    [3.4, () => volley(1)],
    [3.6, () => fx?.dust({ count: 70, area: { x: 200, y: 100, w: 1520, h: 800 }, color: 'rgba(255,214,140,1)', size: [2, 4], rise: 12 })],
    [5.2, () => fx?.burst({ x: 960, y: -30, xSpread: 820, angle: Math.PI / 2, spread: 0.3, speed: [80, 260], count: 220, colors: GOLD, material: 'gold', shapes: ['circle', 'rect', 'star'], size: [9, 15] })],
  ], [fx])
  const [first, second, third] = SCORES
  return (
    <div className={`g-scene g-finale${lit ? ' is-lit' : ''}`}>
      <div className="g-camera">
        <Backdrop />
        <Beams className="g-beams-finale" beams={[
          { x: 300, a0: -26, a1: 18, dur: 4.2, on: 1.2 },
          { x: 760, a0: 20, a1: -18, dur: 3.8, on: 1.3, c: 'rgba(255,214,170,0.45)' },
          { x: 1160, a0: -20, a1: 18, dur: 4.4, on: 1.35, c: 'rgba(255,214,170,0.45)' },
          { x: 1620, a0: 26, a1: -18, dur: 4, on: 1.25 },
        ]} />
        <GalaTree mode="full" chase={lit} />
        <Floor />
        <Curtains state={curtain} />
      </div>
      <div className="g-finale-copy">
        <div className="g-kicker">Победитель вечера</div>
        <div className="g-winner">{first.name}</div>
        <div className="g-winner-score">{first.score} балла</div>
      </div>
      <div className="g-podium">
        {[second, first, third].map((t, i) => (
          <div key={t.name} className={`g-ped g-ped-${[2, 1, 3][i]}`}>
            <div className="g-ped-name">{t.name}</div>
            <div className="g-ped-block"><span>{[2, 1, 3][i]}</span><em>{t.score}</em></div>
          </div>
        ))}
      </div>
      <div className="g-greeting">С Новым годом!</div>
      <Particles z={40} onReady={setFx} seed={21} />
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

export const gala: Concept = {
  meta: {
    id: 'gala', num: 1, name: 'Гала-сцена',
    tagline: 'Новогодний концерт в большом театре',
    idea: 'Игра как прямой эфир праздничного концерта: бархат, софиты, рампа и одна огромная пихта в центре сцены. Каждый экран — сценическое событие, которое делают осветители и машинерия.',
    metaphor: 'Театральная сцена. Ведущий — конферансье, раунды — акты, табло — поклон артистов.',
    composition: 'Симметрия портала: занавес и падуга обрамляют кадр, ель — центральная ось, игровая информация опускается на штанкете между елью и зрителем.',
    light: 'Тёплые софиты в дымке, холодный задник-циклорама, рампа снизу. Свет ведёт взгляд: лучи находят вопрос, правильный ответ, лидера.',
    materials: 'Бархат со складками, позолота, глянцевый чёрный пол с отражением, стеклянные игрушки, фольга.',
    motion: 'Только то, что движется на настоящей сцене: прожекторы ищут и замирают, занавес собирается волной складок, панель опускается на тросах и покачивается, пушки стреляют фольгой и серпантином.',
    transitions: 'Смена акта = занавес закрывается, ирис пушки-«следилки» раскрывается на занавесе с названием раунда.',
    trees: 'Одна пихта Нордмана высотой в портал: плотная, тёмная, с тёплым светом изнутри, спиралью гирлянды и золотыми стеклянными шарами; отражается в полу.',
    hierarchy: {
      primary: 'Текст на панели-штанкете, таймер-кольцо из лампочек, табло.',
      secondary: 'Ель в центре сцены — в игре приглушена и отодвинута вглубь.',
      atmosphere: 'Лучи в дымке, боке задника, сценический снег, рампа.',
    },
    special: '«Своя игра» — табло-LED-стена из позолоченных ячеек; прожектор выбирает ячейку, она переворачивается вопросом.',
  },
  Screen,
}
