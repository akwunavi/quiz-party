// ═══ CONCEPT 4 · ТЁПЛЫЙ ДОМ · набор для 14 состояний ═══
// Гостиная в новогоднюю ночь: обои, окно со снегом, ель со старыми игрушками,
// телевизор. Чем плотнее экран, тем ближе камера: лобби — вся комната, правила
// и раунды — телевизор крупно, вопросы и доски — кинескоп на весь кадр в
// деревянной рамке. Игра — «передача»: синий экран, золото, рубиновые плашки.
// Движение — то, что делает телевизор: развёртка, рябь переключения канала,
// схлопывание в линию; и то, что делает дом: тёплый свет, мигающая гирлянда.
import { useMemo, type CSSProperties, type ReactNode } from 'react'
import { DecoratedTree } from '../../engine/DecoratedTree'
import { Particles } from '../../engine/stage'
import { FakeQR } from '../../engine/bits'
import type { Kit, Density } from '../../game/kit'
import type { DemoTeam } from '../../game/data'
import type { GameTimer } from '../../game/timer'
import type { Concept } from '../types'
import { meta } from './meta'
import './home-world.css'
import './home.css'

const BULBS = ['rgba(255,70,60,1)', 'rgba(255,196,60,1)', 'rgba(70,210,120,1)', 'rgba(80,150,255,1)', 'rgba(255,120,210,1)']
const WINDOW = { x: 110, y: 200, w: 300, h: 280 }

function Garland() {
  const bulbs = useMemo(() => Array.from({ length: 22 }, (_, i) => {
    const f = (i + 0.5) / 22
    return { x: 40 + f * 1840, y: 14 + 4 * f * (1 - f) * 48, c: BULBS[i % BULBS.length], d: (i % 5) * -0.37 }
  }), [])
  return (
    <div className="h-garland" aria-hidden="true">
      <svg width="1920" height="170"><path d="M 40 14 Q 960 110 1880 14" fill="none" stroke="#1a1f1a" strokeWidth="3" /></svg>
      {bulbs.map((b, i) => <span key={i} style={{ left: b.x, top: b.y, '--c': b.c, '--d': `${b.d}s` } as CSSProperties} />)}
    </div>
  )
}

function Room() {
  return (
    <div className="h-room" aria-hidden="true">
      <div className="h-wall" /><div className="h-cornice" />
      <div className="h-floor"><div className="h-rug" /></div>
      <div className="h-baseboard" />
      <div className="h-window" style={{ left: WINDOW.x - 20, top: WINDOW.y - 20, width: WINDOW.w + 40, height: WINDOW.h + 40 }}>
        <div className="h-night"><div className="h-houses" /><div className="h-lamp"><span /></div></div>
        <div className="h-mullion-v" /><div className="h-mullion-h" />
        <div className="h-tulle h-tulle-l" /><div className="h-tulle h-tulle-r" />
      </div>
      <div className="h-snowwrap"><Particles z={1} snow={{ layers: [
        { count: 40, size: [1.2, 2.4], speed: [26, 40], opacity: 0.8 }, { count: 14, size: [2.6, 3.6], speed: [40, 60], opacity: 0.95 },
      ], wind: 10, clip: WINDOW }} /></div>
      <Garland />
      <div className="h-tvglow" />
      <div className="h-tvprop"><div className="h-tvprop-screen" /><i /><span className="h-tvprop-feet" /></div>
      <DecoratedTree className="h-tree"
        opts={{ seed: 131, height: 900, spread: 0.36, color: [140, 30, 17], droop: 1.15, lightX: -0.7, innerGlow: 0.7 }}
        baseX={1770} baseY={1010} displayHeight={800}
        ornaments={{ kind: 'vintage', colors: ['#c8323a', '#e0b13c', '#2f9a8f', '#c9ced8', '#d86aa8', '#3a6fd0'], count: 40, size: 1.2 }}
        lights={{ colors: BULBS, count: 64, mode: 'twinkle', spiral: 5, size: 1.05 }}
        topper={<div className="h-star" />} />
    </div>
  )
}

function World({ density, scene, children }: { density: Density; scene: string; children: ReactNode }) {
  // «комната» — только лобби; любой другой экран — минимум телевизор крупно
  const d: Density = scene === 'lobby' || scene === 'randomizer' ? 'sparse' : density === 'sparse' ? 'medium' : density
  return (
    <div className={`h-scene h-d-${d}`}>
      <Room />
      <div className="h-tvbody">
        <div className="h-screen">
          {children}
          <div className="h-scan" /><div className="h-vignette" /><div className="h-glass" />
        </div>
      </div>
    </div>
  )
}

/** Подключённые команды — рождественские чулки на каминной полке: имя на белой
 *  манжете, цвет чулка — цвет команды. Полок столько, чтобы чулки оставались
 *  крупными: 1–4 команды — одна полка, 5–8 — две, дальше — три (чулки мельче). */
function Stockings({ teams }: { teams: DemoTeam[] }) {
  const rowsN = Math.ceil(teams.length / 4)
  const per = Math.ceil(teams.length / rowsN)
  const rows: DemoTeam[][] = Array.from({ length: rowsN }, (_, r) => teams.slice(r * per, (r + 1) * per))
  return (
    <div className="h-teams" style={{ '--s': rowsN >= 3 ? 0.82 : 1 } as CSSProperties}>
      <div className="h-plate"><span>ПОДКЛЮЧИЛИСЬ</span><b>{teams.length}</b></div>
      {rows.map((row, r) => (
        <div key={r} className="h-mantel">
          <div className="h-plank" />
          <div className="h-socks">
            {row.map((t, i) => {
              const n = t.name.length
              return (
                <div key={t.id} className={`h-sock${t.alive ? '' : ' is-away'}${n > 22 ? ' is-long' : n > 14 ? ' is-mid' : ''}`}
                  style={{ '--tc': t.color, '--i': r * 4 + i } as CSSProperties}>
                  <span className="h-hook" />
                  <div className="h-cuff"><span className="h-cuff-name">{t.icon && <i>{t.icon}</i>}{t.name}</span></div>
                  <div className="h-leg" />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/** QR — на экране телевизора: плитка прямая, белая, с тихой зоной; рамка кинескопа,
 *  развёртка и блики лежат ВОКРУГ плитки, поверх неё нет ничего. */
function TvQr({ lit }: { lit?: boolean }) {
  return (
    <div className={`h-qr${lit ? ' is-lit' : ''}`}>
      <div className="h-qr-tile"><FakeQR size={340} fg="#0b1735" bg="#ffffff" /></div>
    </div>
  )
}

const ROMAN = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

/** Таймер-циферблат Спасской башни: золотое кольцо, римские цифры, стрелка
 *  идёт по кругу, рубиновая дуга — сколько осталось, окошко с секундами. */
function Dial({ t, size }: { t: GameTimer; size: 'top' | 'big' | 'mini' }) {
  const R = 41, C = 2 * Math.PI * R
  const ang = (1 - t.frac) * 360
  return (
    <div className={`h-dial is-${size}${t.low ? ' is-low' : ''}${t.zero ? ' is-zero' : ''}`} role="timer" aria-label={`Осталось ${t.left} с`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="h-dial-rim" cx="50" cy="50" r="48.5" />
        <circle className="h-dial-face" cx="50" cy="50" r="45" />
        <circle className="h-dial-track" cx="50" cy="50" r={R} />
        <circle className="h-dial-arc" cx="50" cy="50" r={R} strokeDasharray={`${C * t.frac} ${C}`} transform="rotate(-90 50 50)" />
        {ROMAN.map((r, i) => {
          const a = (i * 30 - 90) * Math.PI / 180
          return <text key={r} className="h-dial-num" x={50 + Math.cos(a) * 33.5} y={50 + Math.sin(a) * 33.5 + 2.4} textAnchor="middle">{r}</text>
        })}
        <g transform={`rotate(${ang} 50 50)`}><path className="h-dial-hand" d="M 50 54 L 48.2 50 L 50 10 L 51.8 50 Z" /></g>
        <circle className="h-dial-hub" cx="50" cy="50" r="4" />
      </svg>
      <span className="h-dial-win"><b>{t.left}</b></span>
    </div>
  )
}

/** Переключение канала: картинка схлопывается в линию (собственно содержимое, CSS
 *  по классам .gs-tr), поверх — рябь и бегущая полоса помех. */
function Transition({ phase, kind }: { phase: string; kind: 'rules' | 'round' }) {
  if (phase === 'before' || phase === 'done') return null
  return (
    <div className={`h-tr is-${phase} is-${kind}`} aria-hidden="true">
      <div className="h-tr-static" /><div className="h-tr-bar" /><div className="h-tr-line" />
      {kind === 'round' && <div className="h-tr-card">КАНАЛ 1</div>}
    </div>
  )
}

const kit: Kit = { id: 'home', World, Teams: Stockings, Qr: TvQr, Timer: Dial, Transition, timing: { out: 0, cover: 0.55, in: 1.25, done: 2.3 } }

export const home: Concept = { meta, kit }
