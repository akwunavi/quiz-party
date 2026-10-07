// ═══ CONCEPT 3 · ИНЕЙ · набор для 14 состояний ═══
// Экран — стекло зимнего окна в синий час. За стеклом — лес; на стекле —
// иней и панели матового стекла. Игра живёт на панелях; лес за ними «наводится
// на резкость» (расфокус = плотный экран). Движение — физика холода: иней
// наползает от кромок, дыхание проталивает пятно, надпись выводят пальцем,
// смена сцены — стекло замерзает и оттаивает.
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { DecoratedTree } from '../../engine/DecoratedTree'
import { Particles, Tree, useStage } from '../../engine/stage'
import type { SnowCfg } from '../../engine/particles'
import { renderFrost } from '../../engine/frost'
import type { Kit, Density } from '../../game/kit'
import type { GameTimer } from '../../game/timer'
import type { Concept } from '../types'
import { meta } from './meta'
import './frost-world.css'
import './frost.css'

const snow = (n: number): SnowCfg => ({ layers: [
  { count: n, size: [1, 2.2], speed: [18, 34], opacity: 0.55, blur: 0.5 },
  { count: Math.round(n / 3), size: [2.5, 4], speed: [30, 50], opacity: 0.7, blur: 0.5 },
  { count: Math.max(2, Math.round(n / 14)), size: [16, 26], speed: [22, 34], opacity: 0.55, crystal: true },
], wind: -6, color: 'rgba(235,246,255,1)' })

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
  return (
    <div className={`f-frost ${className ?? ''}`} style={style} aria-hidden="true">
      <div className="f-milk" />
      <canvas ref={cv} />
    </div>
  )
}

const FAR: [number, number, number][] = [[81, 230, 140], [82, 280, 360], [83, 210, 560], [84, 300, 820], [85, 240, 1060], [86, 320, 1320], [87, 260, 1560], [88, 300, 1800]]

/** Лес за стеклом. Не пересоздаётся при смене состояния — меняется только
 *  фокус (класс плотности): камера наводится то на лес, то на панель. */
function Forest({ density }: { density: Density }) {
  return (
    <div className={`f-world is-${density}`}>
      <div className="f-sky"><div className="f-moon" /></div>
      <div className="f-far">
        {FAR.map(([s, h, x]) => (
          <Tree key={s} opts={{ seed: s, height: h, spread: 0.3, color: [205, 30, 26], density: 0.45, fog: { color: '#2a5580', amount: 0.62 }, frost: 0.2 }}
            style={{ left: x - h * 0.4, top: 905 - h * 1.05 }} />
        ))}
      </div>
      <div className="f-ground" />
      <div className="f-mid">
        <DecoratedTree className="f-spruce-a" opts={{ seed: 91, height: 900, spread: 0.33, color: [182, 24, 36], frost: 0.85, snow: 0.18, droop: 1.15, lightX: -0.6 }}
          baseX={1480} baseY={985} displayHeight={900}
          ornaments={{ kind: 'ice', colors: ['#ffffff'], count: 26, size: 1.1 }}
          lights={{ colors: ['rgba(255,226,170,1)', 'rgba(220,240,255,1)'], count: 46, mode: 'twinkle', size: 0.7 }} />
        <DecoratedTree className="f-spruce-b" opts={{ seed: 92, height: 640, spread: 0.31, color: [186, 22, 38], frost: 0.9, snow: 0.22, droop: 1.2, lightX: -0.6 }}
          baseX={1790} baseY={1000} displayHeight={640} />
        <DecoratedTree className="f-spruce-c" opts={{ seed: 93, height: 460, spread: 0.3, color: [190, 20, 40], frost: 0.9, snow: 0.25, droop: 1.2, lightX: -0.6 }}
          baseX={1200} baseY={968} displayHeight={460} />
      </div>
      <div className="f-fg">
        <Tree className="f-bough f-bough-a" opts={{ seed: 95, height: 700, spread: 0.36, color: [178, 24, 32], frost: 0.9, snow: 0.1, droop: 1.1 }} displayHeight={1500} />
        <Tree className="f-bough f-bough-b" opts={{ seed: 96, height: 700, spread: 0.36, color: [180, 22, 30], frost: 0.9, snow: 0.1, droop: 1.1 }} displayHeight={1300} />
      </div>
    </div>
  )
}

function World({ density, children }: { density: Density; scene: string; children: ReactNode }) {
  return (
    <div className={`f-scene f-d-${density}`}>
      <Forest density={density} />
      <Particles z={8} snow={snow(density === 'sparse' ? 90 : density === 'medium' ? 50 : 30)} />
      <FrostGlass className="f-frost-edge" />
      <div className="f-glare" aria-hidden="true" />
      <div className="f-content">{children}</div>
    </div>
  )
}

/** Таймер-линза: кольцо льда, стеклянный диск, число гравировкой. Мало времени —
 *  кольцо и число становятся шампанскими, а иней ползёт от краёв экрана к
 *  центру; ноль — линза затягивается инеем. */
function Lens({ t, size }: { t: GameTimer; size: 'top' | 'big' | 'mini' }) {
  const R = 46, C = 2 * Math.PI * R
  const frost = t.low ? Math.min(0.62, ((10 - t.left) / 10) * 0.62 + 0.08) : 0
  return (
    <div className={`f-lens is-${size}${t.low ? ' is-low' : ''}${t.zero ? ' is-zero' : ''}`} role="timer" aria-label={`Осталось ${t.left} с`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="f-lens-track" cx="50" cy="50" r={R} />
        <circle className="f-lens-arc" cx="50" cy="50" r={R} strokeDasharray={`${C * t.frac} ${C}`} transform="rotate(-90 50 50)" />
        {Array.from({ length: 12 }, (_, i) => <line key={i} className="f-lens-tick" x1="50" y1="2" x2="50" y2="6" transform={`rotate(${i * 30} 50 50)`} />)}
      </svg>
      <span className="f-lens-num">{t.left}</span>
      <span className="f-lens-rime" />
      {size === 'top' && t.low && <FrostGlass level={frost} className="f-frost-timer" seed={7} />}
    </div>
  )
}

/** Смена состояния: стекло замерзает от кромок к центру, содержимое меняется
 *  под инеем, затем иней тает от центра. */
function Transition({ phase, kind }: { phase: string; kind: 'rules' | 'round' }) {
  if (phase === 'done') return null
  return (
    <div className={`f-tr is-${phase} is-${kind}`} aria-hidden="true">
      <FrostGlass className="f-frost-wipe" seed={kind === 'round' ? 5 : 4} />
    </div>
  )
}

const kit: Kit = { id: 'frost', World, Timer: Lens, Transition, timing: { out: 0, cover: 0.95, in: 1.45, done: 2.7 } }

export const frost: Concept = { meta, kit }
