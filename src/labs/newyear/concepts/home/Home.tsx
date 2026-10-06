// ═══ CONCEPT 4 · ТЁПЛЫЙ ДОМ ═══
// Гостиная в новогоднюю ночь: обои, паркет, окно со снегом, ель в углу со
// старыми стеклянными игрушками и гирляндой-«фонариками», фольговые буквы
// «С Новым годом!», часы с маятником. Главная сцена — телевизор: камера
// наезжает в экран, как в детстве перед курантами. Движение — работа камеры
// внутри комнаты (наезд, отъезд, панорама) и тёплый свет.
import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { DecoratedTree } from '../../engine/DecoratedTree'
import { Particles, useCues, useTime } from '../../engine/stage'
import type { ParticleField } from '../../engine/particles'
import { FakeQR, useCountdown } from '../../engine/bits'
import { rng } from '../../engine/rng'
import { GAME, MELODY, QUESTION, ROUND, SCORES, TEAMS_JOINED, TIMER_SEC, type ScreenId } from '../../content'
import type { Concept } from '../types'
import './home.css'

// ── камера: прямоугольник комнаты (2400×1350), который попадает в кадр ──
type Rect = [number, number, number]                  // x, y, ширина (высота — 16:9)
const CAM: Record<string, Rect> = {
  lobbyA: [0, 0, 2400], lobbyB: [100, 20, 2150],
  tv: [1003, 532, 515], answer: [880, 430, 900],
  special: [540, 230, 740], finale: [100, 10, 2200],
}
const camT = ([x, y, w]: Rect) => { const s = 1920 / w; return `translate(${(-x * s).toFixed(1)}px, ${(-y * s).toFixed(1)}px) scale(${s.toFixed(4)})` }

const BULBS = ['rgba(255,70,60,1)', 'rgba(255,196,60,1)', 'rgba(70,210,120,1)', 'rgba(80,150,255,1)', 'rgba(255,120,210,1)']
const PAPER = ['#d8432f', '#e0b13c', '#3fa36a', '#3a7bd5', '#e86fb0', '#f4efe6']
const WINDOW = { x: 148, y: 228, w: 384, h: 564 }

function FoilBanner({ text, className, width = 1260 }: { text: string; className?: string; width?: number }) {
  const letters = [...text]
  return (
    <div className={`h-banner ${className ?? ''}`} style={{ width }} aria-label={text}>
      <svg className="h-banner-string" width={width} height="80" aria-hidden="true"><path d={`M 0 6 Q ${width / 2} 90 ${width} 6`} fill="none" stroke="#c9b27a" strokeWidth="2" /></svg>
      {letters.map((ch, i) => {
        const f = (i + 0.5) / letters.length
        return (
          <span key={i} className={`h-foil${ch === ' ' ? ' is-gap' : ''}`} style={{
            left: f * width, top: 4 + 4 * f * (1 - f) * 42, '--ph': `${-(i % 6) * 0.45}s`, '--hue': `${(i * 47) % 360}deg`,
          } as CSSProperties}>{ch}</span>
        )
      })}
    </div>
  )
}

function Clock() {
  return (
    <div className="h-clock">
      <div className="h-clock-face"><span className="h-hand h-hand-h" /><span className="h-hand h-hand-m" /></div>
      <div className="h-clock-pend"><span /></div>
    </div>
  )
}

function Window({ fireworks }: { fireworks?: boolean }) {
  return (
    <div className="h-window" style={{ left: WINDOW.x - 24, top: WINDOW.y - 24, width: WINDOW.w + 48, height: WINDOW.h + 48 }}>
      <div className="h-night">
        <div className="h-houses" />
        <div className="h-lamp"><span /></div>
        {fireworks && [0, 1, 2].map(i => (
          <div key={i} className="h-fw" style={{ left: [90, 250, 170][i], top: [110, 70, 190][i], '--d': `${i * 0.9}s`, '--c': ['#ffcf6a', '#ff6b5a', '#8fd0ff'][i] } as CSSProperties}>
            {Array.from({ length: 14 }, (_, k) => <i key={k} style={{ '--a': `${k * (360 / 14)}deg` } as CSSProperties} />)}
          </div>
        ))}
      </div>
      <div className="h-mullion-v" /><div className="h-mullion-h" />
      <div className="h-tulle h-tulle-l" /><div className="h-tulle h-tulle-r" />
    </div>
  )
}

function Turntable({ spinning, label }: { spinning: boolean; label: string }) {
  return (
    <div className={`h-turntable${spinning ? ' is-spin' : ''}`}>
      <div className="h-tt-base" />
      <div className="h-platter"><div className="h-disc" style={{ '--lb': label } as CSSProperties}><i /></div><div className="h-disc-shine" /></div>
      <div className="h-arm" />
    </div>
  )
}

/** Экран кинескопа: содержимое рисуется в «родных» 1156×914, в комнате — масштаб 0.268 */
function CRT({ children, on = true, flick, className }: { children: ReactNode; on?: boolean; flick?: boolean; className?: string }) {
  return (
    <div className={`h-crt${on ? ' is-on' : ''}${flick ? ' is-flick' : ''} ${className ?? ''}`}>
      <div className="h-crt-content">{children}</div>
      <div className="h-crt-static" />
      <div className="h-crt-glass" />
    </div>
  )
}

function Room({ cam, children, tv, wall, midnight, fireworks, chase, className }: {
  cam: { from: Rect; to: Rect; dur?: number; delay?: number }
  children?: ReactNode; tv: ReactNode; wall?: ReactNode; midnight?: boolean; fireworks?: boolean; chase?: boolean; className?: string
}) {
  return (
    <div className={`h-set${midnight ? ' is-midnight' : ''} ${className ?? ''}`} style={{
      '--from': camT(cam.from), '--to': camT(cam.to), '--dur': `${cam.dur ?? 0.01}s`, '--delay': `${cam.delay ?? 0}s`,
    } as CSSProperties}>
      <div className="h-wall" />
      <div className="h-cornice" />
      <div className="h-floor"><div className="h-rug" /></div>
      <div className="h-baseboard" />
      <Window fireworks={fireworks} />
      <div className="h-snowwrap">
        <Particles z={1} snow={{ layers: [
          { count: 50, size: [1.2, 2.4], speed: [26, 40], opacity: 0.8 },
          { count: 18, size: [2.6, 3.6], speed: [40, 60], opacity: 0.95 },
        ], wind: 10, clip: WINDOW }} />
      </div>
      <FoilBanner text="С НОВЫМ ГОДОМ!" />
      <Clock />
      <div className="h-sideboard"><span /><span /></div>
      <div className="h-mandarins"><i /><i /><i /><i /></div>
      {wall}
      <div className="h-tvglow" />
      <div className="h-tv">
        <div className="h-tv-legs" />
        <div className="h-tv-cab">
          <div className="h-tv-panel"><i /><i /><b /></div>
        </div>
        {tv}
      </div>
      <DecoratedTree className="h-tree"
        opts={{ seed: 131, height: 900, spread: 0.36, color: [140, 30, 17], droop: 1.15, lightX: -0.7, innerGlow: 0.7 }}
        baseX={1990} baseY={1015} displayHeight={880}
        ornaments={{ kind: 'vintage', colors: ['#c8323a', '#e0b13c', '#2f9a8f', '#c9ced8', '#d86aa8', '#3a6fd0'], count: 40, size: 1.25 }}
        lights={{ colors: BULBS, count: 70, mode: chase ? 'chase' : 'twinkle', spiral: 5, size: 1.1 }}
        topper={<div className="h-star" />} />
      <div className="h-gifts"><i /><i /><i /></div>
      {children}
    </div>
  )
}

function Bokeh({ variant }: { variant: 'wide' | 'close' }) {
  const dots = useMemo(() => {
    const r = rng(variant === 'wide' ? 4 : 9)
    return Array.from({ length: variant === 'wide' ? 9 : 14 }, (_, i) => ({
      x: variant === 'wide' ? r() * 1920 : (i % 2 ? 1700 + r() * 240 : r() * 260),
      y: variant === 'wide' ? 960 + r() * 140 : r() * 1080,
      s: 50 + r() * 70, c: BULBS[i % BULBS.length], d: r() * 3,
    }))
  }, [variant])
  return (
    <div className={`h-bokeh is-${variant}`} aria-hidden="true">
      {dots.map((d, i) => <span key={i} style={{ left: d.x, top: d.y, width: d.s, height: d.s, '--c': d.c, '--d': `${-d.d}s` } as CSSProperties} />)}
    </div>
  )
}

// ── содержимое экрана телевизора ──

function TvLogo() {
  return (
    <div className="h-tv-logo">
      <div className="h-tv-sparkles" />
      <div className="h-tv-logo-k">{GAME.subtitle}</div>
      <div className="h-tv-logo-t">Quiz Party</div>
      <div className="h-tv-logo-d">{GAME.date}</div>
    </div>
  )
}

function TvRound() {
  return (
    <div className="h-tv-round">
      <div className="h-tv-sparkles" />
      <div className="h-tv-kicker">Раунд {ROUND.number} из {ROUND.total}</div>
      <div className="h-tv-roundnum">{ROUND.number}</div>
      <div className="h-tv-title">{ROUND.title}</div>
      <div className="h-tv-rules">{ROUND.rules}</div>
    </div>
  )
}

function TvQuestion({ answer }: { answer?: boolean }) {
  return (
    <div className={`h-tv-q${answer ? ' is-answer' : ''}`}>
      <div className="h-tv-label">{answer ? 'Правильный ответ' : QUESTION.label}</div>
      <div className="h-tv-qtext">{QUESTION.text}</div>
      <div className="h-tv-opts">
        {QUESTION.options.map((o, i) => (
          <div key={o.key} className={`h-tv-opt${o.key === QUESTION.correct ? ' is-correct' : ''}`} style={{ '--t': `${0.9 + i * 0.15}s` } as CSSProperties}>
            <b>{o.key}</b><span>{o.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── экраны ────────────────────────────────────────────────

function Lobby() {
  return (
    <div className="h-scene">
      <Room cam={{ from: CAM.lobbyA, to: CAM.lobbyB, dur: 9 }}
        tv={<CRT><TvLogo /></CRT>}
        wall={
          <div className="h-postcard">
            <div className="h-postcard-k">Заходите в игру</div>
            <FakeQR size={124} fg="#2a1a12" bg="#fff8ea" />
            <div className="h-postcard-code"><span>комната</span>{GAME.room}</div>
            <div className="h-postcard-url">{GAME.url}</div>
          </div>
        } />
      <Bokeh variant="wide" />
      <div className="h-guests"><b>Уже в гостях</b>{TEAMS_JOINED.map(t => <span key={t}>{t}</span>)}</div>
    </div>
  )
}

function Intro() {
  const [flick, setFlick] = useState(false)
  const [card, setCard] = useState(false)
  useCues([[1.7, () => setFlick(true)], [2.15, () => { setFlick(false); setCard(true) }]])
  return (
    <div className="h-scene">
      <Room cam={{ from: CAM.lobbyB, to: CAM.tv, dur: 2.3, delay: 0.2 }} className="is-dolly"
        tv={<CRT flick={flick} className={card ? 'is-poweron' : ''}>{card ? <TvRound /> : <TvLogo />}</CRT>} />
      <Bokeh variant="close" />
    </div>
  )
}

function Question() {
  return (
    <div className="h-scene">
      <Room cam={{ from: CAM.tv, to: CAM.tv }} tv={<CRT className="is-poweron"><TvQuestion /></CRT>} />
      <Bokeh variant="close" />
    </div>
  )
}

function KremlinDial({ remaining, done }: { remaining: number; done: boolean }) {
  // стрелка идёт к XII — к «полуночи»: полкруга = 30 секунд
  const elapsed = TIMER_SEC - remaining
  const ang = -180 + (elapsed / TIMER_SEC) * 180
  const R = 250
  const a0 = (ang - 90) * (Math.PI / 180)
  const sector = `M 0 0 L ${Math.cos(a0) * R} ${Math.sin(a0) * R} A ${R} ${R} 0 0 1 0 ${-R} Z`
  return (
    <svg className="h-dial" width="600" height="600" viewBox="-300 -300 600 600" aria-hidden="true">
      <defs>
        <radialGradient id="hdial"><stop offset="0" stopColor="#1b2f62" /><stop offset="1" stopColor="#0b1735" /></radialGradient>
        <linearGradient id="hgold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff1c2" /><stop offset="0.5" stopColor="#e2b450" /><stop offset="1" stopColor="#9a6a20" /></linearGradient>
      </defs>
      <circle r="286" fill="url(#hgold)" />
      <circle r="270" fill="url(#hdial)" />
      {!done && remaining > 0 && <path d={sector} className="h-dial-sector" />}
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2
        const long = i % 5 === 0
        return <line key={i} x1={Math.sin(a) * (long ? 222 : 236)} y1={-Math.cos(a) * (long ? 222 : 236)} x2={Math.sin(a) * 254} y2={-Math.cos(a) * 254} stroke="#e8c070" strokeWidth={long ? 6 : 2.5} />
      })}
      {['XII', 'III', 'VI', 'IX'].map((n, i) => (
        <text key={n} x={Math.sin((i * Math.PI) / 2) * 182} y={-Math.cos((i * Math.PI) / 2) * 182 + 16} className="h-dial-num">{n}</text>
      ))}
      <g transform={`rotate(${ang})`}><line x1="0" y1="30" x2="0" y2="-236" className="h-dial-hand" /></g>
      <circle r="14" fill="url(#hgold)" />
    </svg>
  )
}

function Timer() {
  const { sec, remaining, done } = useCountdown()
  return (
    <div className={`h-scene${remaining <= 5 ? ' is-warn' : ''}`}>
      <Room cam={{ from: CAM.tv, to: CAM.tv }} tv={
        <CRT className="is-poweron">
          <div className={`h-tv-timer${done ? ' is-done' : ''}`}>
            <div className="h-tv-timer-q">{QUESTION.text}</div>
            <KremlinDial remaining={remaining} done={done} />
            <div className="h-tv-timer-num" key={done ? 'x' : sec}>{done ? 'Время!' : sec}</div>
          </div>
        </CRT>
      } />
      <Bokeh variant="close" />
    </div>
  )
}

function Answer() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  const [cheer, setCheer] = useState(false)
  useCues([
    [1.3, () => {
      setCheer(true)
      fx?.burst({ x: 210, y: 1000, angle: -1.15, spread: 0.3, speed: [1700, 2600], count: 110, colors: PAPER, material: 'paper', streamers: 9, smoke: true, size: [11, 18] })
      fx?.burst({ x: 1710, y: 1000, angle: -1.99, spread: 0.3, speed: [1700, 2600], count: 110, colors: PAPER, material: 'paper', streamers: 9, smoke: true, size: [11, 18] })
    }],
  ], [fx])
  return (
    <div className="h-scene">
      <Room cam={{ from: CAM.tv, to: CAM.answer, dur: 1.6, delay: 0.9 }} chase={cheer}
        tv={<CRT className="is-poweron"><div className="h-tv-ans">
          <div className="h-tv-label">Правильный ответ</div>
          <div className="h-tv-anskey">{QUESTION.correct}</div>
          <div className="h-tv-anstext">{QUESTION.answer}</div>
          <div className="h-tv-ansfact">{QUESTION.fact}</div>
        </div></CRT>} />
      <Bokeh variant="wide" />
      <Particles z={30} onReady={setFx} seed={14} />
    </div>
  )
}

function Scoreboard() {
  return (
    <div className="h-scene">
      <Room cam={{ from: CAM.tv, to: CAM.tv }} tv={
        <CRT className="is-poweron">
          <div className="h-tv-score">
            <div className="h-tv-label">После раунда {ROUND.number}</div>
            <div className="h-tv-score-h">Турнирная таблица</div>
            <ol>
              {SCORES.map((s, i) => (
                <li key={s.name} className={i === 0 ? 'is-lead' : ''} style={{ '--t': `${0.5 + (SCORES.length - 1 - i) * 0.3}s` } as CSSProperties}>
                  <b>{i + 1}</b><span>{s.name}</span><em>{s.delta ? `+${s.delta}` : ''}</em><strong>{s.score}</strong>
                </li>
              ))}
            </ol>
          </div>
        </CRT>
      } />
      <Bokeh variant="close" />
    </div>
  )
}

/** Рулетка: прыжки подсветки по пластинкам, к концу — реже, остановка на выбранной */
function useRoulette(n: number, target: number, start: number, dur: number) {
  const t = useTime(30)
  return useMemo(() => {
    const r = rng(77)
    const times: number[] = []
    let acc = 0
    while (acc < dur) { const f = acc / dur; acc += 0.07 + f * f * 0.5; times.push(acc) }
    const path: number[] = []
    let cur = 0
    for (let i = 0; i < times.length; i++) {
      let nx = Math.floor(r() * n)
      if (nx === cur) nx = (nx + 1) % n
      cur = i === times.length - 1 ? target : nx
      path.push(cur)
    }
    const local = t - start
    if (local < 0) return { idx: -1, landed: false }
    const i = times.findIndex(x => x > local)
    if (i === -1) return { idx: target, landed: true }
    return { idx: path[Math.max(0, i - 1)], landed: false }
  }, [t, n, target, start, dur])
}

function Special() {
  const flat = MELODY.themes.flatMap((th, ti) => Array.from({ length: th.tracks }, (_, k) => ({ ti, k })))
  const target = flat.findIndex(x => x.ti === MELODY.playing.theme && x.k === MELODY.playing.track)
  const { idx, landed } = useRoulette(flat.length, target, 1.6, 3.6)
  const played = new Set(['1-0', '2-1', '0-0'])
  return (
    <div className="h-scene">
      <Room cam={{ from: CAM.lobbyB, to: CAM.special, dur: 1.6, delay: 0 }} tv={<CRT><TvLogo /></CRT>}
        wall={
          <div className="h-melody">
            <div className="h-melody-head">{MELODY.title}</div>
            {MELODY.themes.map((th, ti) => (
              <div key={th.name} className={`h-sleeve h-sleeve-${ti}`}>
                <div className="h-sleeve-cover"><span>{th.name}</span></div>
                <div className="h-tracks">
                  {Array.from({ length: th.tracks }, (_, k) => {
                    const fi = flat.findIndex(x => x.ti === ti && x.k === k)
                    return <i key={k} className={`${played.has(`${ti}-${k}`) ? 'is-played' : ''}${fi === idx ? ' is-hot' : ''}${landed && fi === target ? ' is-picked' : ''}`} />
                  })}
                </div>
              </div>
            ))}
            <div className={`h-nowplaying${landed ? ' is-on' : ''}`}>♪ {MELODY.themes[MELODY.playing.theme].name} · трек {MELODY.playing.track + 1}</div>
          </div>
        }>
        <Turntable spinning={landed} label={['#d8432f', '#3a7bd5', '#e0b13c'][MELODY.playing.theme]} />
      </Room>
      <Bokeh variant="close" />
    </div>
  )
}

function Finale() {
  const [fx, setFx] = useState<ParticleField | null>(null)
  const [midnight, setMidnight] = useState(false)
  useCues([
    [0.6, () => setMidnight(true)],
    [1.6, () => { fx?.emit({ x: 300, y: 860, rate: 70 }); fx?.emit({ x: 1640, y: 870, rate: 70 }) }],
    [2.4, () => fx?.burst({ x: 960, y: -30, xSpread: 860, angle: Math.PI / 2, spread: 0.3, speed: [60, 220], count: 160, colors: PAPER, material: 'paper', shapes: ['circle', 'rect'], size: [10, 16] })],
  ], [fx])
  const [first, second, third] = SCORES
  return (
    <div className={`h-scene h-finale${midnight ? ' is-midnight' : ''}`}>
      <Room cam={{ from: CAM.lobbyB, to: CAM.finale, dur: 6 }} midnight={midnight} fireworks chase
        tv={<CRT className="is-poweron"><div className="h-tv-midnight">
          <KremlinDial remaining={0} done />
          <div className="h-tv-midnight-t">00:00</div>
        </div></CRT>} />
      <Bokeh variant="wide" />
      <div className="h-sparkler h-sparkler-l" /><div className="h-sparkler h-sparkler-r" />
      {/* «нижняя плашка» эфира: победитель объявлен как в новогодней трансляции */}
      <div className="h-win">
        <div className="h-win-k">Победитель вечера</div>
        <div className="h-win-name">{first.name}</div>
        <div className="h-win-s"><b>{first.score} балла</b> · 2. {second.name} — {second.score} · 3. {third.name} — {third.score}</div>
      </div>
      <Particles z={30} onReady={setFx} seed={24} />
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

export const home: Concept = {
  meta: {
    id: 'home', num: 4, name: 'Тёплый дом',
    tagline: 'Гостиная в новогоднюю ночь — ретро и уют',
    idea: 'Самый тёплый и личный мир: комната, где все когда-то встречали Новый год. Ель в углу со старыми стеклянными игрушками, гирлянда-«фонарики», фольговые буквы на стене, снег за окном — и телевизор, в который смотрит вся семья. Игра идёт по телевизору.',
    metaphor: 'Новогодняя ночь у телевизора: раунды — передачи, таймер — куранты, табло — «турнирная таблица» в эфире.',
    composition: 'Настоящий интерьер с глубиной: окно слева, телевизор в центре, ель в правом углу. Камера живёт внутри комнаты — общий план в лобби и финале, наезд в экран в игре, отъезд на ответе.',
    light: 'Тёплый вольфрамовый свет, разноцветные «фонарики» гирлянды, голубоватое свечение кинескопа на стене. В полночь верхний свет гаснет — остаются гирлянда, экран и бенгальские огни.',
    materials: 'Обои с узором, ёлочный паркет, ковёр, лакированное дерево, кинескоп со строчками, фольга, советское стекло (сосульки, шишки, шары с «рефлектором»), бумажный серпантин.',
    motion: 'Камера: медленный наезд в лобби, проезд в экран, отъезд к залу на ответе. Внутри — то, что движется в комнате: маятник часов, фольговые буквы колышутся от тёплого воздуха, снег за окном, пластинка крутится на 33 оборота.',
    transitions: 'Смена раунда = камера въезжает в телевизор, экран «переключает канал» (рябь), включается заставка раунда в духе «Голубого огонька».',
    trees: 'Живая ель (Picea abies) с провисшими лапами, тёплым светом изнутри, спиралью цветной гирлянды, советскими игрушками и рубиновой звездой.',
    hierarchy: {
      primary: 'Экран телевизора: вопрос, циферблат-таймер, таблица.',
      secondary: 'Деревянный корпус телевизора и край комнаты — рамка кадра.',
      atmosphere: 'Боке гирлянды на переднем плане, снег за окном, маятник, фольговые буквы.',
    },
    special: '«Угадай мелодию» — темы стали конвертами пластинок на стене, рулетка прыгает по пластинкам, выбранная начинает крутиться на проигрывателе.',
  },
  Screen,
}
