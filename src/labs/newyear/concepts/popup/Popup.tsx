// ═══ CONCEPT 2 · КНИГА-РАСКЛАДУШКА ═══
// Весь экран — разворот новогодней книжки-панорамы из вырезанной бумаги.
// Всё, что появляется, поднимается на сгибе страницы (pop-up), выдвигается
// язычком или раскрывается клапаном; смена раунда — перелистывание. Ели —
// вырезанные силуэты настоящих елей в три слоя бумаги разных оттенков.
import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { DecoratedTree } from '../../engine/DecoratedTree'
import { Particles, useCues } from '../../engine/stage'
import type { ParticleField } from '../../engine/particles'
import { FakeQR, useCountdown } from '../../engine/bits'
import { ANAGRAM, GAME, QUESTION, ROUND, SCORES, TEAMS_JOINED, TIMER_SEC, type ScreenId } from '../../content'
import type { Concept } from '../types'
import './popup.css'

// координаты — внутри разворота (1792 × 990), сгиб на x = 896
const BOOK = { x: 64, y: 50, w: 1792, h: 990 }
const PAPER = ['#b3263a', '#d9a441', '#1f4a3a', '#f3ead8', '#2c4a7a', '#e46b4f']
const PAPER_SNOW = { layers: [
  { count: 40, size: [2.5, 4] as [number, number], speed: [26, 40] as [number, number], opacity: 0.9, paper: true },
  { count: 18, size: [4, 6] as [number, number], speed: [40, 60] as [number, number], opacity: 1, paper: true },
], wind: 8, color: '#fffaf0' }

/** Слой, поднимающийся на сгибе страницы: шарнир — у основания. */
function Pop({ t, ox, oy, children, className, style, z }: {
  t: number; ox: number; oy: number; children: ReactNode; className?: string; style?: CSSProperties; z?: number
}) {
  return (
    <div className={`p-pop ${className ?? ''}`}
      style={{ transformOrigin: `${ox}px ${oy}px`, '--t': `${t}s`, zIndex: z, ...style } as CSSProperties}>
      {children}
    </div>
  )
}

function PaperTree({ seed, h, x, base, color, t, snow = 0.35, spread = 0.33, z, ornaments }: {
  seed: number; h: number; x: number; base: number; color: string; t: number; snow?: number; spread?: number; z?: number
  ornaments?: boolean
}) {
  return (
    <Pop t={t} ox={x} oy={base} z={z} className="p-shadowed">
      <DecoratedTree
        opts={{ seed, height: h, spread, flat: color, flatSnow: '#fbf6ea', snow, density: 0.75, needle: 1.25, trunk: 0.05 }}
        baseX={x} baseY={base}
        ornaments={ornaments ? { kind: 'paper', colors: ['#b3263a', '#d9a441', '#2c4a7a', '#e46b4f'], count: 18, size: 1.4, seed: seed + 2 } : undefined}
      />
    </Pop>
  )
}

function Book({ children, turned }: { children: ReactNode; turned?: boolean }) {
  return (
    <div className="p-table">
      <div className={`p-book${turned ? ' is-turned' : ''}`} style={{ left: BOOK.x, top: BOOK.y, width: BOOK.w, height: BOOK.h }}>
        <div className="p-cover" />
        <div className="p-page p-page-l" />
        <div className="p-page p-page-r" />
        <div className="p-gutter" />
        {children}
        <div className="p-grain" />
      </div>
    </div>
  )
}

function Bunting({ t = 0.2, y = 34, sag = 120 }: { t?: number; y?: number; sag?: number }) {
  const flags = 17
  const pts = useMemo(() => Array.from({ length: flags }, (_, i) => {
    // флажки висят ровно на верёвке-параболе (та же кривая, что в SVG)
    const f = (i + 0.5) / flags
    const x = 90 + f * (BOOK.w - 180)
    const yy = y - 6 + 4 * f * (1 - f) * (sag + 3)
    const ang = (Math.atan((4 * (sag + 3) * (1 - 2 * f)) / (BOOK.w - 180)) * 180) / Math.PI
    return { x, y: yy, ang, c: PAPER[i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2] }
  }), [y, sag])
  return (
    <div className="p-bunting" style={{ '--t': `${t}s` } as CSSProperties}>
      <svg className="p-twine" width={BOOK.w} height={y + sag + 20} aria-hidden="true">
        <path d={`M 90 ${y - 6} Q ${BOOK.w / 2} ${y + sag * 2} ${BOOK.w - 90} ${y - 6}`} fill="none" stroke="#7a5a3a" strokeWidth="3" />
      </svg>
      {pts.map((p, i) => (
        <span key={i} className="p-flag" style={{ left: p.x, top: p.y, '--ang': `${p.ang}deg`, '--c': p.c, '--ph': `${(i % 5) * -0.7}s` } as CSSProperties} />
      ))}
    </div>
  )
}

function House({ x, base, t }: { x: number; base: number; t: number }) {
  return (
    <Pop t={t} ox={x} oy={base} className="p-shadowed" z={4}>
      <div className="p-house" style={{ left: x - 130, top: base - 250 }}>
        <div className="p-roof" />
        <div className="p-roof-snow" />
        <div className="p-chimney" />
        <div className="p-walls">
          <span className="p-win" /><span className="p-win" /><span className="p-door" />
        </div>
      </div>
    </Pop>
  )
}

function Drifts({ t, tone = '#f7f0e2' }: { t: number; tone?: string }) {
  return (
    <Pop t={t} ox={BOOK.w / 2} oy={BOOK.h} className="p-shadowed" z={7}>
      <svg className="p-drifts" width={BOOK.w} height="220" viewBox={`0 0 ${BOOK.w} 220`} style={{ top: BOOK.h - 220 }} aria-hidden="true">
        <path fill={tone} d={`M0 120 C 180 40, 320 70, 470 96 S 760 30, 900 80 S 1220 120, 1380 64 S 1660 70, ${BOOK.w} 110 L ${BOOK.w} 220 L 0 220 Z`} />
        <path fill="#ece2cf" d={`M0 170 C 220 120, 420 150, 620 160 S 980 120, 1200 150 S 1600 140, ${BOOK.w} 160 L ${BOOK.w} 220 L 0 220 Z`} />
      </svg>
    </Pop>
  )
}

function Ribbon({ children, t, y, w = 980, tone = '#b3263a', className }: { children: ReactNode; t: number; y: number; w?: number; tone?: string; className?: string }) {
  return (
    <div className={`p-ribbon ${className ?? ''}`} style={{ top: y, width: w, marginLeft: -w / 2, '--t': `${t}s`, '--rb': tone } as CSSProperties}>
      <span className="p-ribbon-tail p-ribbon-tail-l" /><span className="p-ribbon-tail p-ribbon-tail-r" />
      <div className="p-ribbon-face">{children}</div>
    </div>
  )
}

function Popper({ side, t }: { side: 'l' | 'r'; t: number }) {
  return (
    <div className={`p-popper p-popper-${side}`} style={{ '--t': `${t}s` } as CSSProperties} aria-hidden="true">
      <span className="p-popper-body" /><span className="p-popper-twist" /><span className="p-popper-string" />
    </div>
  )
}

const FOREST = (t0: number, light = false) => (
  <>
    {[[31, 330, 300, '#a8c0ab'], [32, 380, 520, '#9fb8a4'], [33, 300, 760, '#a8c0ab'], [34, 360, 1040, '#9fb8a4'], [35, 320, 1280, '#a8c0ab'], [36, 390, 1500, '#9fb8a4']]
      .map(([s, h, x, c], i) => <PaperTree key={`b${i}`} seed={s as number} h={h as number} x={x as number} base={812} color={c as string} t={t0 + i * 0.06} z={2} snow={0.45} />)}
    {[[41, 470, 430, '#3f6e57'], [42, 500, 1320, '#457a5f']]
      .map(([s, h, x, c], i) => <PaperTree key={`m${i}`} seed={s as number} h={h as number} x={x as number} base={846} color={c as string} t={t0 + 0.45 + i * 0.08} z={3} snow={0.4} />)}
    {!light && [[51, 660, 170, '#1f4a3a'], [52, 700, 1640, '#1d4436']]
      .map(([s, h, x, c], i) => <PaperTree key={`f${i}`} seed={s as number} h={h as number} x={x as number} base={930} color={c as string} t={t0 + 0.75 + i * 0.08} z={6} snow={0.32} spread={0.32} />)}
  </>
)

// ── экраны ────────────────────────────────────────────────

function Lobby() {
  return (
    <div className="p-scene">
      <Book>
        <Bunting />
        {FOREST(0.35)}
        <House x={880} base={840} t={1.0} />
        <Drifts t={1.25} />
        <Ribbon t={1.7} y={150} w={1000}>
          <div className="p-logo">Quiz Party</div>
        </Ribbon>
        <div className="p-sub p-fade" style={{ '--t': '2.2s' } as CSSProperties}>{GAME.subtitle} · {GAME.date}</div>
        <div className="p-tag" style={{ '--t': '2.3s' } as CSSProperties}>
          <span className="p-tag-hole" />
          <FakeQR size={138} fg="#1d2b4a" bg="#fbf6ea" />
          <div className="p-tag-copy">
            <div className="p-tag-label">Комната</div>
            <div className="p-tag-code">{GAME.room}</div>
            <div className="p-tag-url">{GAME.url}</div>
          </div>
        </div>
        <div className="p-card p-joined" style={{ '--t': '2.5s' } as CSSProperties}>
          <div className="p-card-title">В игре {TEAMS_JOINED.length} команд</div>
          <ul>{TEAMS_JOINED.slice(0, 6).map(t => <li key={t}>{t}</li>)}</ul>
        </div>
      </Book>
      <Particles z={40} snow={PAPER_SNOW} />
    </div>
  )
}

function Intro() {
  const [turn, setTurn] = useState(false)
  useCues([[0.5, () => setTurn(true)]])
  return (
    <div className={`p-scene p-intro${turn ? ' is-turn' : ''}`}>
      <Book>
        {/* новый разворот: номер раунда, вырезанный в три слоя */}
        <div className="p-act">
          <div className="p-num" aria-hidden="true">
            <span className="p-num-l3">{ROUND.number}</span>
            <span className="p-num-l2">{ROUND.number}</span>
            <span className="p-num-l1">{ROUND.number}</span>
          </div>
          <div className="p-act-copy">
            <div className="p-kicker">Раунд {ROUND.number} из {ROUND.total}</div>
            <h1 className="p-act-title">{ROUND.title}</h1>
            <div className="p-act-rules">{ROUND.rules}</div>
          </div>
        </div>
        <PaperTree seed={61} h={520} x={1500} base={930} color="#1f4a3a" t={2.3} z={6} />
        <PaperTree seed={62} h={380} x={1680} base={930} color="#3f6e57" t={2.45} z={5} />
        <Drifts t={2.5} />
        {/* прошлый разворот: левая страница, которую накроет перевёрнутый лист */}
        <div className="p-oldleft" aria-hidden="true">
          <span className="p-oldleft-num">1</span>
          <span className="p-oldleft-cap">Раунд 1 сыгран</span>
        </div>
        {/* страница, которая переворачивается: на ней — прошлый разворот */}
        <div className="p-leaf" aria-hidden="true">
          <div className="p-leaf-front">
            <div className="p-leaf-art">
              <span className="p-leaf-moon" />
              <span className="p-leaf-hill" />
            </div>
          </div>
          <div className="p-leaf-back" />
        </div>
      </Book>
      <Particles z={40} snow={PAPER_SNOW} />
    </div>
  )
}

function QuestionCard({ label, settled, compact }: { label?: string; settled?: boolean; compact?: boolean }) {
  return (
    <Pop t={settled ? -1 : 0.4} ox={896} oy={700} z={10} className={`p-shadowed${settled ? ' is-settled' : ''}`}>
      <div className={`p-qcard${compact ? ' is-compact' : ''}`}>
        <span className="p-qcard-tab p-qcard-tab-l" /><span className="p-qcard-tab p-qcard-tab-r" />
        <div className="p-qcard-label">{label ?? QUESTION.label}</div>
        <div className="p-qcard-text">{QUESTION.text}</div>
      </div>
    </Pop>
  )
}

function Question() {
  return (
    <div className="p-scene">
      <Book>
        <Bunting t={0} />
        {FOREST(0.1, true)}
        <QuestionCard />
        <div className="p-tabs">
          {QUESTION.options.map((o, i) => (
            <div key={o.key} className="p-pull" style={{ '--t': `${1.3 + i * 0.12}s`, '--c': PAPER[[0, 1, 4, 5][i]] } as CSSProperties}>
              <span className="p-pull-key">{o.key}</span>
              <span className="p-pull-text">{o.text}</span>
            </div>
          ))}
        </div>
        <div className="p-stamp-note p-fade" style={{ '--t': '2s' } as CSSProperties}>Ответили {QUESTION.answered} из {QUESTION.teams}</div>
      </Book>
      <Particles z={40} snow={PAPER_SNOW} />
    </div>
  )
}

function Timer() {
  const { sec, remaining, done } = useCountdown()
  const N = TIMER_SEC
  const gone = N - Math.ceil(remaining)
  return (
    <div className={`p-scene p-timer${remaining <= 10 ? ' is-warn' : ''}${done ? ' is-done' : ''}`}>
      <Book>
        <Bunting t={0} />
        {FOREST(0, true)}
        <div className="p-qstrip">
          <span className="p-qstrip-label">{QUESTION.label}</span>
          <span className="p-qstrip-text">{QUESTION.text}</span>
        </div>
        <div className="p-rosette">
          {Array.from({ length: N }, (_, i) => (
            <span key={i} className={`p-petal${i < gone || done ? ' is-folded' : ''}`}
              style={{ '--a': `${(i / N) * 360}deg`, '--c': i % 2 ? '#b3263a' : '#d9a441' } as CSSProperties}>
              <i />
            </span>
          ))}
          <div className="p-rosette-core">
            <div className="p-rosette-num" key={done ? 'x' : sec}>{done ? '0' : sec}</div>
            <div className="p-rosette-cap">{done ? 'время вышло' : 'секунд'}</div>
          </div>
        </div>
      </Book>
      <Particles z={40} snow={PAPER_SNOW} />
    </div>
  )
}

function Answer() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  useCues([
    [1.55, () => {
      fx?.burst({ x: 250, y: 900, angle: -1.0, spread: 0.35, speed: [1500, 2400], count: 120, colors: PAPER, material: 'paper', streamers: 7, smoke: false, size: [12, 20], shapes: ['rect', 'circle', 'strip'] })
      fx?.burst({ x: 1670, y: 900, angle: -2.14, spread: 0.35, speed: [1500, 2400], count: 120, colors: PAPER, material: 'paper', streamers: 7, smoke: false, size: [12, 20], shapes: ['rect', 'circle', 'strip'] })
    }],
  ], [fx])
  return (
    <div className="p-scene p-answer">
      <Book>
        <Bunting t={0} />
        {FOREST(0, true)}
        <QuestionCard settled compact label="Правильный ответ" />
        <div className="p-burst" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => <span key={i} style={{ '--a': `${i * 22.5}deg`, '--c': i % 2 ? '#d9a441' : '#f3ead8' } as CSSProperties} />)}
        </div>
        <div className="p-reveal">
          <div className="p-reveal-under">
            <div className="p-reveal-key">{QUESTION.correct}</div>
            <div className="p-reveal-text">{QUESTION.answer}</div>
            <div className="p-reveal-fact">{QUESTION.fact}</div>
          </div>
          <div className="p-flap"><div className="p-flap-front">Открыть ↑</div><div className="p-flap-back" /></div>
        </div>
      </Book>
      <Popper side="l" t={1.4} />
      <Popper side="r" t={1.45} />
      <Particles z={40} onReady={setFx} seed={12} />
    </div>
  )
}

function Scoreboard() {
  return (
    <div className="p-scene">
      <Book>
        <Bunting t={0} />
        {FOREST(0, true)}
        <div className="p-ledger">
          <div className="p-ledger-head">
            <span className="p-kicker">После раунда {ROUND.number}</span>
            <h2>Турнирная таблица</h2>
          </div>
          <ol className="p-lrows">
            {SCORES.map((s, i) => {
              const order = SCORES.length - 1 - i
              return (
                <li key={s.name} className={i === 0 ? 'is-lead' : ''} style={{ '--t': `${0.6 + order * 0.28}s` } as CSSProperties}>
                  <span className="p-l-place">{i + 1}</span>
                  <span className="p-l-name">{s.name}</span>
                  <span className="p-l-delta">{s.delta ? `+${s.delta}` : ''}</span>
                  <span className="p-l-score" style={{ '--rot': `${((i * 37) % 9) - 4}deg` } as CSSProperties}>{s.score}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </Book>
    </div>
  )
}

/** соответствие перемешанных букв местам в слове (повторы — по порядку) */
export function scrambleMap(shuffled: string, word: string) {
  const used = new Set<number>()
  return [...shuffled].map(ch => {
    const j = [...word].findIndex((w, k) => w === ch && !used.has(k))
    used.add(j)
    return j
  })
}

function Special() {
  const [solve, setSolve] = useState(false)
  useCues([[3.4, () => setSolve(true)]])
  const map = scrambleMap(ANAGRAM.shuffled, ANAGRAM.word)
  const step = 176
  const x0 = 896 - (ANAGRAM.word.length * step - 24) / 2
  return (
    <div className={`p-scene p-scr${solve ? ' is-solve' : ''}`}>
      <Book>
        {FOREST(0, true)}
        <div className="p-scr-head p-fade" style={{ '--t': '0.2s' } as CSSProperties}>
          <span className="p-kicker">Специальный раунд</span>
          <h2>{ANAGRAM.title}</h2>
          <p>{ANAGRAM.rules} · {ANAGRAM.word.length} букв</p>
        </div>
        <svg className="p-scr-twine" width={BOOK.w} height="80" aria-hidden="true">
          <path d={`M 120 20 Q 896 90 ${BOOK.w - 120} 20`} fill="none" stroke="#7a5a3a" strokeWidth="3" />
        </svg>
        {[...ANAGRAM.shuffled].map((ch, i) => {
          const j = map[i]
          const xi = x0 + i * step
          const dx = (j - i) * step
          const sag = Math.sin(((xi + 76) / BOOK.w) * Math.PI) * 35
          return (
            <div key={i}>
              <div className="p-letter" style={{
                left: xi, top: 372 + sag, '--dx': `${dx}px`, '--dy': `${-sag + 96}px`, '--lift': `${-150 - Math.abs(j - i) * 20}px`,
                '--t': `${0.5 + i * 0.09}s`, '--d': `${Math.abs(j - i) * 0.05}s`, '--sw': `${(i % 2 ? 1 : -1) * 3}deg`,
              } as CSSProperties}>
                <span className="p-letter-face">{ch}</span>
              </div>
              <span className="p-pin" style={{ left: xi + 64, top: 340 + sag, '--t': `${0.5 + i * 0.09}s` } as CSSProperties} />
            </div>
          )
        })}
        <div className="p-scr-done">Правильно: <b>{ANAGRAM.word.toLowerCase()}</b></div>
      </Book>
      <Particles z={40} snow={PAPER_SNOW} />
    </div>
  )
}

function Finale() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  useCues([
    [2.3, () => {
      fx?.burst({ x: 250, y: 920, angle: -1.0, spread: 0.35, speed: [1600, 2500], count: 140, colors: PAPER, material: 'paper', streamers: 8, size: [12, 20] })
      fx?.burst({ x: 1670, y: 920, angle: -2.14, spread: 0.35, speed: [1600, 2500], count: 140, colors: PAPER, material: 'paper', streamers: 8, size: [12, 20] })
    }],
    [4.4, () => fx?.burst({ x: 960, y: -30, xSpread: 820, angle: Math.PI / 2, spread: 0.3, speed: [60, 220], count: 200, colors: PAPER, material: 'paper', shapes: ['circle', 'rect', 'star'], size: [10, 16] })],
  ], [fx])
  const [first, second, third] = SCORES
  const fireworks = [
    { x: 330, y: 250, c: '#d9a441', t: 1.2, s: 1 }, { x: 1460, y: 210, c: '#b3263a', t: 1.5, s: 1.2 },
    { x: 620, y: 140, c: '#2c4a7a', t: 1.8, s: 0.8 }, { x: 1200, y: 330, c: '#e46b4f', t: 2.1, s: 0.9 },
  ]
  return (
    <div className="p-scene p-finale">
      <Book>
        {fireworks.map((f, i) => (
          <div key={i} className="p-firework" style={{ left: f.x, top: f.y, '--c': f.c, '--t': `${f.t}s`, '--s': f.s } as CSSProperties} aria-hidden="true">
            {Array.from({ length: 12 }, (_, k) => <span key={k} style={{ '--a': `${k * 30}deg` } as CSSProperties} />)}
          </div>
        ))}
        {FOREST(0.2)}
        <PaperTree seed={71} h={600} x={896} base={930} color="#1f4a3a" t={0.6} z={5} snow={0.3} spread={0.36} ornaments />
        <Drifts t={0.9} />
        <Ribbon t={2.6} y={90} w={1180} className="p-win-ribbon">
          <div className="p-win-kicker">Победитель вечера</div>
          <div className="p-win-name">{first.name}</div>
        </Ribbon>
        <div className="p-win-score p-fade" style={{ '--t': '3.2s' } as CSSProperties}>{first.score} балла</div>
        <div className="p-podium">
          {[second, first, third].map((t, i) => (
            <div key={t.name} className={`p-medal p-medal-${[2, 1, 3][i]}`} style={{ '--t': `${3.4 + i * 0.15}s` } as CSSProperties}>
              <div className="p-medal-disc">{[2, 1, 3][i]}</div>
              <div className="p-medal-name">{t.name}</div>
              <div className="p-medal-score">{t.score}</div>
            </div>
          ))}
        </div>
        <div className="p-greeting">С Новым годом!</div>
      </Book>
      <Popper side="l" t={2.2} />
      <Popper side="r" t={2.25} />
      <Particles z={40} onReady={setFx} seed={22} />
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

export const popup: Concept = {
  meta: {
    id: 'popup', num: 2, name: 'Книга-раскладушка',
    tagline: 'Новогодняя книжка-панорама из вырезанной бумаги',
    idea: 'Экран — разворот бумажной книжки-панорамы, как из детства, но сделанной дизайнером: плотная бумага, тени слоёв, сгиб посередине. Ничего не появляется из воздуха: всё поднимается на сгибе, выдвигается язычком, раскрывается клапаном.',
    metaphor: 'Книжка, которую листают всей командой: раунды — развороты, ответ — клапан, который можно поднять.',
    composition: 'Разворот с корешком по центру; декорации стоят на нижней трети страницы слоями (дальний, средний, ближний), информация — на отдельной поднятой карточке перед ними.',
    light: 'Мягкий ровный «настольный» свет сверху-слева: глубина строится не свечением, а тенями между слоями бумаги; тёплое окно домика из кальки.',
    materials: 'Плотная бумага с зерном, калька, бечёвка, прищепки, штамп красными чернилами, бумажный конфетти и снег из дырокола.',
    motion: 'Шарнир и сгиб: слои поднимаются с лёгким перебором и оседают, флажки качаются от сквозняка, лепестки розетки складываются, буквы снимают с прищепок и перевешивают дугой.',
    transitions: 'Смена раунда = перелистывание страницы: лист поднимается за край, тень бежит по развороту, на новой странице встаёт номер раунда в три слоя.',
    trees: 'Вырезанные силуэты настоящих елей с кружевным краем хвои, три слоя бумаги (шалфейный, зелёный, тёмно-хвойный) и бумажный снег на лапах; в финале — большая ель с бумажными шарами.',
    hierarchy: {
      primary: 'Поднятая карточка с вопросом / розетка таймера / страница-табель.',
      secondary: 'Бумажный лес и домик — опущены на нижний край, без украшений в игре.',
      atmosphere: 'Флажки, бумажный снег, зерно бумаги, тени слоёв.',
    },
    special: '«Скрэмбл» — буквы-карточки на прищепках; при разгадке их снимают и дугой раскладывают по местам.',
  },
  Screen,
}
