// ═══ CONCEPT 3 · ИНЕЙ ═══
// Экран — это стекло зимнего окна в синий час. За стеклом — заиндевевшие
// голубые ели и тишина; на стекле — иней. Движение — физика холода:
// иней нарастает от кромок, проталина появляется от дыхания, камера
// переводит фокус между веткой у самого стекла и лесом за ним. Финал —
// единственный тёплый момент: золотой свет встаёт за елями, иней тает.
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { DecoratedTree } from '../../engine/DecoratedTree'
import { Particles, Tree, useCues, useStage } from '../../engine/stage'
import type { ParticleField } from '../../engine/particles'
import { renderFrost } from '../../engine/frost'
import { FakeQR, useCountdown } from '../../engine/bits'
import { BLITZ, GAME, QUESTION, ROUND, SCORES, TEAMS_JOINED, TIMER_SEC, type ScreenId } from '../../content'
import type { Concept } from '../types'
import './frost.css'

const ICE = ['#e8f6ff', '#bfe3ff', '#ffffff', '#9fd0f5', '#e9d3a0']
const SNOW = { layers: [
  { count: 90, size: [1, 2.2] as [number, number], speed: [18, 34] as [number, number], opacity: 0.55, blur: 0.5 },
  { count: 30, size: [2.5, 4] as [number, number], speed: [30, 50] as [number, number], opacity: 0.7, blur: 0.5 },
  { count: 7, size: [16, 26] as [number, number], speed: [22, 34] as [number, number], opacity: 0.55, crystal: true },
], wind: -6, color: 'rgba(235,246,255,1)' }

/** Стекло с инеем: level 0 — чистое, 1 — замёрзло целиком. */
function FrostGlass({ level, className, seed = 3 }: { level?: number; className?: string; seed?: number }) {
  const { k } = useStage()
  const cv = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    const src = renderFrost(seed, Math.min(1.5, Math.max(0.5, k)))
    const c = cv.current!
    c.width = src.width; c.height = src.height
    c.getContext('2d')!.drawImage(src, 0, 0)
  }, [k, seed])
  const style = level === undefined ? undefined : ({ '--clear': `${Math.round((1 - level) * 100)}%` } as CSSProperties)
  // матовая «дымка» (размытие того, что за стеклом) + сам узор — под одной маской
  return (
    <div className={`f-frost ${className ?? ''}`} style={style} aria-hidden="true">
      <div className="f-milk" />
      <canvas ref={cv} />
    </div>
  )
}

function World({ focus = 'mid', dim = false, warm = false }: { focus?: 'fg' | 'mid' | 'bg'; dim?: boolean; warm?: boolean }) {
  return (
    <div className={`f-world is-${focus}${dim ? ' is-dim' : ''}${warm ? ' is-warm' : ''}`}>
      <div className="f-sky"><div className="f-moon" /><div className="f-sunrise" /></div>
      <div className="f-far">
        {[[81, 230, 140], [82, 280, 360], [83, 210, 560], [84, 300, 820], [85, 240, 1060], [86, 320, 1320], [87, 260, 1560], [88, 300, 1800]].map(([s, h, x]) => (
          <Tree key={s} opts={{ seed: s, height: h, spread: 0.3, color: [205, 30, 26], density: 0.45, fog: { color: '#2a5580', amount: 0.62 }, frost: 0.2 }}
            style={{ left: x - h * 0.4, top: 905 - h * 1.05 }} />
        ))}
      </div>
      <div className="f-ground" />
      <div className="f-mid">
        <DecoratedTree className="f-spruce-a"
          opts={{ seed: 91, height: 900, spread: 0.33, color: [182, 24, 36], frost: 0.85, snow: 0.18, droop: 1.15, lightX: -0.6 }}
          baseX={1480} baseY={985} displayHeight={900}
          ornaments={{ kind: 'ice', colors: ['#ffffff'], count: 26, size: 1.1 }}
          lights={{ colors: ['rgba(255,226,170,1)', 'rgba(220,240,255,1)'], count: 46, mode: 'twinkle', size: 0.7 }} />
        <DecoratedTree className="f-spruce-b"
          opts={{ seed: 92, height: 640, spread: 0.31, color: [186, 22, 38], frost: 0.9, snow: 0.22, droop: 1.2, lightX: -0.6 }}
          baseX={1790} baseY={1000} displayHeight={640} />
        <DecoratedTree className="f-spruce-c"
          opts={{ seed: 93, height: 460, spread: 0.3, color: [190, 20, 40], frost: 0.9, snow: 0.25, droop: 1.2, lightX: -0.6 }}
          baseX={1200} baseY={968} displayHeight={460} />
      </div>
      {/* ветка у самого стекла — макро, вне фокуса */}
      <div className="f-fg">
        <Tree className="f-bough f-bough-a" opts={{ seed: 95, height: 700, spread: 0.36, color: [178, 24, 32], frost: 0.9, snow: 0.1, droop: 1.1 }} displayHeight={1500} />
        <Tree className="f-bough f-bough-b" opts={{ seed: 96, height: 700, spread: 0.36, color: [180, 22, 30], frost: 0.9, snow: 0.1, droop: 1.1 }} displayHeight={1300} />
      </div>
    </div>
  )
}

function Glare() { return <div className="f-glare" aria-hidden="true" /> }

// ── экраны ────────────────────────────────────────────────

function Lobby() {
  return (
    <div className="f-scene f-lobby">
      <World focus="mid" />
      <Particles z={8} snow={SNOW} />
      <FrostGlass className="f-frost-edge" />
      <Glare />
      <div className="f-lobby-copy">
        <div className="f-kicker f-etch" style={{ '--t': '1.4s' } as CSSProperties}>{GAME.subtitle}</div>
        <h1 className="f-logo f-etch" style={{ '--t': '1.6s' } as CSSProperties}>Quiz<br />Party</h1>
        <div className="f-date f-etch" style={{ '--t': '2s' } as CSSProperties}>{GAME.date}</div>
        <div className="f-glass f-join f-condense" style={{ '--t': '2.3s' } as CSSProperties}>
          <FakeQR size={150} fg="#0b1d33" bg="#eef7ff" />
          <div>
            <div className="f-join-label">Комната</div>
            <div className="f-join-code">{GAME.room}</div>
            <div className="f-join-url">{GAME.url}</div>
          </div>
        </div>
      </div>
      <div className="f-teams f-etch" style={{ '--t': '2.8s' } as CSSProperties}>
        <span>В зале</span>{TEAMS_JOINED.map(t => <em key={t}>{t}</em>)}
      </div>
    </div>
  )
}

function Intro() {
  return (
    <div className="f-scene f-intro">
      <World focus="bg" />
      <Particles z={8} snow={SNOW} />
      <FrostGlass className="f-frost-cover" seed={5} />
      <div className="f-finger">
        <div className="f-finger-num">{ROUND.number}</div>
        <div className="f-finger-kicker">раунд {ROUND.number} из {ROUND.total}</div>
        <div className="f-finger-title">{ROUND.title}</div>
        <div className="f-finger-rules">{ROUND.rules}</div>
      </div>
    </div>
  )
}

function QuestionPanel({ compact, label }: { compact?: boolean; label?: string }) {
  return (
    <div className={`f-glass f-qpanel${compact ? ' is-compact' : ' f-condense'}`} style={{ '--t': '0.5s' } as CSSProperties}>
      <div className="f-qlabel">{label ?? QUESTION.label}</div>
      <div className="f-qtext">{QUESTION.text}</div>
    </div>
  )
}

function Options({ answer }: { answer?: boolean }) {
  return (
    <div className={`f-options${answer ? ' is-answer' : ''}`}>
      {QUESTION.options.map((o, i) => (
        <div key={o.key} className={`f-glass f-opt${o.key === QUESTION.correct ? ' is-correct' : ' is-wrong'}${answer ? '' : ' f-condense'}`}
          style={{ '--t': `${1.1 + i * 0.12}s`, '--i': i } as CSSProperties}>
          <span className="f-opt-key">{o.key}</span>
          <span className="f-opt-text">{o.text}</span>
        </div>
      ))}
    </div>
  )
}

function Question() {
  return (
    <div className="f-scene">
      <World focus="bg" dim />
      <Particles z={8} snow={SNOW} />
      <FrostGlass className="f-frost-edge" />
      <QuestionPanel />
      <Options />
      <div className="f-answered f-etch" style={{ '--t': '1.8s' } as CSSProperties}>ответили {QUESTION.answered} из {QUESTION.teams}</div>
      <div className="f-mini f-etch" style={{ '--t': '1.6s' } as CSSProperties}><b>{TIMER_SEC}</b> сек</div>
    </div>
  )
}

function Timer() {
  const { sec, frac, remaining, done } = useCountdown()
  const R = 230, C = 2 * Math.PI * R
  return (
    <div className={`f-scene f-timer${remaining <= 5 ? ' is-warn' : ''}${done ? ' is-done' : ''}`}>
      <World focus="bg" dim />
      <Particles z={8} snow={SNOW} />
      {/* иней нарастает от кромок вместе со временем */}
      <FrostGlass className="f-frost-timer" level={done ? 0.97 : 0.18 + frac * 0.72} seed={7} />
      <QuestionPanel compact />
      <div className="f-clock">
        <svg width={560} height={560} viewBox="-280 -280 560 560" aria-hidden="true">
          <circle r={R} className="f-clock-track" />
          <circle r={R} className="f-clock-ice" strokeDasharray={`${C * (1 - frac)} ${C}`} transform="rotate(-90)" />
          {Array.from({ length: TIMER_SEC }, (_, i) => {
            const a = (i / TIMER_SEC) * Math.PI * 2 - Math.PI / 2
            return <line key={i} className={i < Math.ceil(remaining) ? 'is-on' : ''} x1={Math.cos(a) * (R + 22)} y1={Math.sin(a) * (R + 22)} x2={Math.cos(a) * (R + 38)} y2={Math.sin(a) * (R + 38)} />
          })}
        </svg>
        <div className="f-clock-num" key={done ? 'x' : sec}>{done ? '0' : sec}</div>
        <div className="f-clock-cap">{done ? 'стекло замёрзло' : 'секунд'}</div>
      </div>
    </div>
  )
}

function Answer() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  useCues([
    [1.7, () => fx?.burst({ x: 960, y: 700, angle: -Math.PI / 2, spread: Math.PI, speed: [500, 1300], count: 160, colors: ICE, material: 'foil', shapes: ['star', 'rect', 'circle'], size: [6, 12], sparks: 40 })],
    [1.9, () => fx?.dust({ count: 60, area: { x: 300, y: 250, w: 1320, h: 600 }, color: 'rgba(230,245,255,1)', size: [1.5, 3.5], rise: 10 })],
  ], [fx])
  return (
    <div className="f-scene f-answer">
      <World focus="bg" dim />
      <Particles z={8} snow={SNOW} />
      <FrostGlass className="f-frost-edge" />
      <QuestionPanel compact label="Правильный ответ" />
      <Options answer />
      {/* иней затягивает неверные варианты, верный остаётся проталиной */}
      <div className="f-glass f-reveal">
        <div className="f-reveal-key">{QUESTION.correct}</div>
        <div className="f-reveal-text">{QUESTION.answer}</div>
        <div className="f-reveal-fact">{QUESTION.fact}</div>
        <span className="f-caustic" />
      </div>
      <Particles z={30} onReady={setFx} seed={13} />
    </div>
  )
}

function Scoreboard() {
  const max = Math.max(...SCORES.map(s => s.score))
  return (
    <div className="f-scene f-score">
      <World focus="bg" dim />
      <Particles z={8} snow={SNOW} />
      <FrostGlass className="f-frost-edge" />
      <div className="f-score-head f-etch" style={{ '--t': '0.2s' } as CSSProperties}>
        <span className="f-kicker">после раунда {ROUND.number}</span>
        <h2>Турнирная таблица</h2>
      </div>
      <ol className="f-rows">
        {SCORES.map((s, i) => {
          const order = SCORES.length - 1 - i
          return (
            <li key={s.name} className={`f-glass f-row${i === 0 ? ' is-lead' : ''}`}
              style={{ '--t': `${0.6 + order * 0.26}s`, '--w': `${(s.score / max) * 100}%` } as CSSProperties}>
              <span className="f-row-bar" />
              <span className="f-row-place">{i + 1}</span>
              <span className="f-row-name">{s.name}</span>
              <span className="f-row-delta">{s.delta ? `+${s.delta}` : ''}</span>
              <span className="f-row-score">{s.score}</span>
              {i === 0 && <span className="f-caustic" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Special() {
  // Блиц: карточки приходят из глубины в фокус, полоса времени замерзает
  const per = 3.6
  return (
    <div className="f-scene f-blitz">
      <World focus="bg" dim />
      <Particles z={8} snow={SNOW} />
      <FrostGlass className="f-frost-edge" />
      <div className="f-blitz-head f-etch" style={{ '--t': '0.1s' } as CSSProperties}>
        <span className="f-kicker">специальный раунд</span>
        <h2>{BLITZ.title}</h2>
        <p>{BLITZ.rules}</p>
      </div>
      <div className="f-cards">
        {BLITZ.items.map((it, i) => (
          <div key={i} className="f-glass f-card" style={{ '--in': `${0.6 + i * per}s`, '--out': `${0.6 + (i + 1) * per - 0.45}s`, '--last': i === BLITZ.items.length - 1 ? 1 : 0 } as CSSProperties}>
            <div className="f-card-count">{i + 1} / 5</div>
            <div className="f-card-q">{it.q}</div>
            <div className="f-card-a">{it.a}</div>
            <span className="f-card-bar" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Finale() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  const [warm, setWarm] = useState(false)
  useCues([
    [1.2, () => setWarm(true)],
    [2.6, () => fx?.dust({ count: 120, area: { x: 100, y: 80, w: 1720, h: 900 }, color: 'rgba(255,224,160,1)', size: [1.5, 4], rise: 26, life: [3, 6] })],
    [3.2, () => fx?.burst({ x: 960, y: -20, xSpread: 880, angle: Math.PI / 2, spread: 0.25, speed: [40, 160], count: 180, colors: ['#e9d3a0', '#fff4d8', '#ffffff', '#cfe9ff'], material: 'gold', shapes: ['star', 'circle'], size: [6, 11] })],
  ], [fx])
  const [first, second, third] = SCORES
  return (
    <div className={`f-scene f-finale${warm ? ' is-warm' : ''}`}>
      <World focus="mid" warm={warm} />
      <Particles z={8} snow={SNOW} />
      <FrostGlass className="f-frost-melt" seed={9} />
      <div className="f-finale-copy">
        <div className="f-kicker">победитель вечера</div>
        <div className="f-winner">{first.name}</div>
        <div className="f-winner-score">{first.score} балла</div>
      </div>
      <div className="f-podium">
        {[second, first, third].map((t, i) => (
          <div key={t.name} className={`f-glass f-pod f-pod-${[2, 1, 3][i]}`} style={{ '--t': `${3 + i * 0.2}s` } as CSSProperties}>
            <span className="f-pod-place">{[2, 1, 3][i]}</span>
            <span className="f-pod-name">{t.name}</span>
            <span className="f-pod-score">{t.score}</span>
          </div>
        ))}
      </div>
      <div className="f-greeting">С Новым годом</div>
      <Particles z={30} onReady={setFx} seed={23} />
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

export const frost: Concept = {
  meta: {
    id: 'frost', num: 3, name: 'Иней',
    tagline: 'Зимнее окно в синий час — современный минимализм',
    idea: 'Самый тихий и дорогой из пяти миров: экран — стекло, за ним заиндевевшие голубые ели и синий час, на стекле — иней. Холодная палитра и одна тёплая нота (шампань), которая полностью раскрывается только в финале.',
    metaphor: 'Окно в новогоднюю ночь. Время — это мороз: чем меньше секунд, тем сильнее затягивает стекло.',
    composition: 'Асимметрия и воздух: текст слева, ели — правая треть, макро-ветка у стекла в углу кадра; много пустого пространства синего часа.',
    light: 'Холодная луна и синий час, мягкое отражение на стекле. Тёплая шампань — редкие огоньки и финал, когда за елями встаёт золотой свет.',
    materials: 'Стекло с фаской и матированием, иней-дендриты, лёд, прозрачные стеклянные шары, алмазная пыль.',
    motion: 'Физика холода: иней растёт от кромок, панели «конденсируются» из матового в прозрачное, камера переводит фокус с ветки у стекла на лес, алмазная пыль медленно висит в воздухе.',
    transitions: 'Смена раунда = стекло замерзает целиком, а номер и название раунда проступают, как написанные пальцем на инее.',
    trees: 'Голубые колючие ели (Picea pungens), покрытые изморозью: иней на кончиках каждой хвоинки, редкий снег; дальний лес — силуэты в морозной дымке; на переднем плане — расфокусированная ветка у самого стекла.',
    hierarchy: {
      primary: 'Матовые стеклянные панели с вопросом, таймер-кольцо, строки табло.',
      secondary: 'Заиндевевшие ели справа — в игре уходят в расфокус.',
      atmosphere: 'Иней по краям стекла, алмазная пыль, снег за окном, блик на стекле.',
    },
    special: '«Блиц» — карточки вопросов приходят из глубины в фокус, полоска времени замерзает, ответ проступает под вопросом.',
  },
  Screen,
}
