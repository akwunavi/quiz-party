// ═══ CONCEPT 2 · КНИГА-РАСКЛАДУШКА · набор для 14 состояний ═══
// Экран — разворот новогодней книжки из вырезанной бумаги. Всё, что
// появляется, ПОДНИМАЕТСЯ на сгибе (pop-up), выдвигается язычком или
// раскрывается клапаном; смена сцены — складывание объёмных деталей и
// перелистывание страницы. Игра (карточки, фото, варианты) — на переднем
// плане, ели и флажки отступают по мере роста плотности экрана.
import { useMemo, type CSSProperties, type ReactNode } from 'react'
import { DecoratedTree } from '../../engine/DecoratedTree'
import { Particles } from '../../engine/stage'
import { FakeQR } from '../../engine/bits'
import type { SnowCfg } from '../../engine/particles'
import type { Kit, Density } from '../../game/kit'
import type { DemoTeam } from '../../game/data'
import type { Concept } from '../types'
import { meta } from './meta'
import './popup-world.css'
import './popup.css'

const BOOK = { x: 64, y: 50, w: 1792, h: 990 }
const PAPER = ['#b3263a', '#d9a441', '#1f4a3a', '#f3ead8', '#2c4a7a', '#e46b4f']

const snow = (n: number): SnowCfg => ({ layers: [
  { count: n, size: [2.5, 4], speed: [26, 40], opacity: 0.9, paper: true },
  { count: Math.round(n / 2), size: [4, 6], speed: [40, 60], opacity: 1, paper: true },
], wind: 8, color: '#fffaf0' })

/** Слой, поднимающийся на сгибе: шарнир у основания. */
function Pop({ t, ox, oy, children, className, z }: { t: number; ox: number; oy: number; children: ReactNode; className?: string; z?: number }) {
  return (
    <div className={`p-pop ${className ?? ''}`} style={{ transformOrigin: `${ox}px ${oy}px`, '--t': `${t}s`, zIndex: z } as CSSProperties}>
      {children}
    </div>
  )
}

function PaperTree({ seed, h, x, base, color, t, snow: sn = 0.35, spread = 0.33, z }: {
  seed: number; h: number; x: number; base: number; color: string; t: number; snow?: number; spread?: number; z?: number
}) {
  return (
    <Pop t={t} ox={x} oy={base} z={z} className="p-shadowed">
      <DecoratedTree opts={{ seed, height: h, spread, flat: color, flatSnow: '#fbf6ea', snow: sn, density: 0.75, needle: 1.25, trunk: 0.05 }}
        baseX={x} baseY={base} />
    </Pop>
  )
}

function Bunting({ t = 0.2, y = 30, sag = 90 }: { t?: number; y?: number; sag?: number }) {
  const flags = 17
  const pts = useMemo(() => Array.from({ length: flags }, (_, i) => {
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
      {pts.map((p, i) => <span key={i} className="p-flag" style={{ left: p.x, top: p.y, '--ang': `${p.ang}deg`, '--c': p.c, '--ph': `${(i % 5) * -0.7}s` } as CSSProperties} />)}
    </div>
  )
}

function House({ x, base, t }: { x: number; base: number; t: number }) {
  return (
    <Pop t={t} ox={x} oy={base} className="p-shadowed" z={4}>
      <div className="p-house" style={{ left: x - 130, top: base - 250 }}>
        <div className="p-roof" /><div className="p-roof-snow" /><div className="p-chimney" />
        <div className="p-walls"><span className="p-win" /><span className="p-win" /><span className="p-door" /></div>
      </div>
    </Pop>
  )
}

function Drifts({ t, h = 220 }: { t: number; h?: number }) {
  return (
    <Pop t={t} ox={BOOK.w / 2} oy={BOOK.h} className="p-shadowed" z={7}>
      <svg className="p-drifts" width={BOOK.w} height={h} viewBox={`0 0 ${BOOK.w} 220`} preserveAspectRatio="none" style={{ top: BOOK.h - h }} aria-hidden="true">
        <path fill="#f7f0e2" d={`M0 120 C 180 40, 320 70, 470 96 S 760 30, 900 80 S 1220 120, 1380 64 S 1660 70, ${BOOK.w} 110 L ${BOOK.w} 220 L 0 220 Z`} />
        <path fill="#ece2cf" d={`M0 170 C 220 120, 420 150, 620 160 S 980 120, 1200 150 S 1600 140, ${BOOK.w} 160 L ${BOOK.w} 220 L 0 220 Z`} />
      </svg>
    </Pop>
  )
}

/** Лес разной плотности: пустой экран — полный лес с домиком, плотный — только
 *  сугроб и две ёлочки в углах (игре нужно место). */
function Scenery({ density, scene }: { density: Density; scene: string }) {
  if (density === 'sparse') return (
    <>
      {[[31, 330, 300, '#a8c0ab'], [32, 380, 520, '#9fb8a4'], [33, 300, 760, '#a8c0ab'], [34, 360, 1040, '#9fb8a4'], [35, 320, 1280, '#a8c0ab'], [36, 390, 1500, '#9fb8a4']]
        .map(([s, h, x, c], i) => <PaperTree key={`b${scene}${i}`} seed={s as number} h={h as number} x={x as number} base={812} color={c as string} t={0.15 + i * 0.06} z={2} snow={0.45} />)}
      {[[41, 470, 430, '#3f6e57'], [42, 500, 1320, '#457a5f']]
        .map(([s, h, x, c], i) => <PaperTree key={`m${scene}${i}`} seed={s as number} h={h as number} x={x as number} base={846} color={c as string} t={0.5 + i * 0.08} z={3} snow={0.4} />)}
      <House key={`h${scene}`} x={900} base={846} t={0.85} />
      {[[51, 640, 150, '#1f4a3a'], [52, 680, 1650, '#1d4436']]
        .map(([s, h, x, c], i) => <PaperTree key={`f${scene}${i}`} seed={s as number} h={h as number} x={x as number} base={940} color={c as string} t={0.9 + i * 0.08} z={6} snow={0.32} spread={0.32} />)}
      <Drifts key={`d${scene}`} t={1.0} />
    </>
  )
  if (density === 'medium') return (
    <>
      <PaperTree key={`l${scene}`} seed={61} h={520} x={95} base={965} color="#1f4a3a" t={0.2} z={2} />
      <PaperTree key={`r${scene}`} seed={62} h={560} x={1700} base={965} color="#1d4436" t={0.32} z={2} />
      <Drifts key={`d${scene}`} t={0.4} h={150} />
    </>
  )
  return (
    <>
      <PaperTree key={`l${scene}`} seed={63} h={300} x={70} base={985} color="#1f4a3a" t={0.1} z={2} />
      <PaperTree key={`r${scene}`} seed={64} h={320} x={1722} base={985} color="#1d4436" t={0.2} z={2} />
      <Drifts key={`d${scene}`} t={0.25} h={96} />
    </>
  )
}

function World({ density, scene, children }: { density: Density; scene: string; children: ReactNode }) {
  return (
    <div className={`p-scene p-d-${density}`} data-scene={scene}>
      <div className="p-table">
        <div className="p-book" style={{ left: BOOK.x, top: BOOK.y, width: BOOK.w, height: BOOK.h }}>
          <div className="p-cover" />
          <div className="p-page p-page-l" /><div className="p-page p-page-r" /><div className="p-gutter" />
          <Bunting t={0.1} y={density === 'dense' ? 8 : 30} sag={density === 'dense' ? 22 : 90} />
          <Scenery density={scene === 'randomizer' ? 'sparse' : density} scene={scene === 'randomizer' ? 'lobby' : scene} />
          {density !== 'dense' && (
            <div className="p-snow"><Particles z={10} snow={snow(density === 'sparse' ? 40 : 22)} /></div>
          )}
          <div className="p-content">{children}</div>
          <div className="p-grain" />
        </div>
      </div>
    </div>
  )
}

/** Подключённые команды — бумажная гирлянда вымпелов с ласточкиным хвостом:
 *  висят на бечёвке, имя написано на вымпеле. Рядов столько, чтобы вымпелы
 *  оставались крупными: 1–4 команды — одна нить, 5–8 — две, дальше — три. */
const FLAG_W = 270, FLAG_GAP = 22, FLAG_SAG = 30
function Pennants({ teams }: { teams: DemoTeam[] }) {
  const rowsN = Math.ceil(teams.length / 4)
  const per = Math.ceil(teams.length / rowsN)
  const rows: DemoTeam[][] = Array.from({ length: rowsN }, (_, r) => teams.slice(r * per, (r + 1) * per))
  return (
    <div className="p-teams">
      <div className="p-teams-tag"><span>ПОДКЛЮЧИЛИСЬ</span><b>{teams.length}</b></div>
      {rows.map((row, r) => {
        const W = row.length * FLAG_W + (row.length - 1) * FLAG_GAP
        const y = (f: number) => 4 * FLAG_SAG * f * (1 - f)
        return (
          <div key={r} className="p-teams-row" style={{ width: W, height: FLAG_SAG + 150 } as CSSProperties}>
            <svg className="p-teams-twine" width={W} height={FLAG_SAG + 8} aria-hidden="true">
              <path d={`M 0 3 Q ${W / 2} ${3 + 2 * FLAG_SAG} ${W} 3`} fill="none" stroke="#7a5a3a" strokeWidth="3" />
            </svg>
            {row.map((t, i) => {
              const cx = i * (FLAG_W + FLAG_GAP) + FLAG_W / 2
              const f = cx / W
              const ang = (Math.atan((4 * FLAG_SAG * (1 - 2 * f)) / W) * 180) / Math.PI
              const n = t.name.length
              return (
                <div key={t.id} className={`p-flag-team${t.alive ? '' : ' is-away'}${n > 22 ? ' is-long' : n > 14 ? ' is-mid' : ''}`}
                  style={{ left: i * (FLAG_W + FLAG_GAP), top: 3 + y(f), width: FLAG_W, '--tc': t.color, '--ang': `${ang}deg`, '--rot': `${ang}deg`, '--i': r * 4 + i } as CSSProperties}>
                  <span className="p-flag-pin" />
                  <span className="p-flag-name">{t.icon && <i>{t.icon}</i>}{t.name}</span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

/** QR — настольная карточка-«домик»: стоит на снегу, лист прямой, подложка белая,
 *  вокруг кода тихая зона. Карточка проявляется со дна (без сдвига и поворота),
 *  сам код неподвижен. */
function QrCard({ lit }: { lit?: boolean }) {
  return (
    <div className={`p-qr${lit ? ' is-lit' : ''}`}>
      <div className="p-qr-face"><div className="p-qr-tile"><FakeQR size={320} fg="#1d2b4a" bg="#ffffff" /></div></div>
      <div className="p-qr-flap" />
    </div>
  )
}

/** Таймер-розетка: бумажный диск с зубчатым венцом; красный сектор — сколько
 *  осталось; число — карточка, которая «щёлкает» каждую секунду. */
function Rosette({ t, size }: { t: import('../../game/timer').GameTimer; size: 'top' | 'big' | 'mini' }) {
  return (
    <div className={`p-ros is-${size}${t.low ? ' is-low' : ''}${t.zero ? ' is-zero' : ''}${t.running ? ' is-run' : ''}`}
      style={{ '--f': t.frac } as CSSProperties} role="timer" aria-label={`Осталось ${t.left} с`}>
      <span className="p-ros-crown" /><span className="p-ros-disc" /><span className="p-ros-wedge" />
      <span className="p-ros-card"><b key={t.left} className="p-ros-num">{t.left}</b></span>
      <span className="p-ros-pin" />
    </div>
  )
}

/** Перелистывание: объёмные детали складываются, лист переходит на левую страницу,
 *  под ним меняется сцена, затем детали встают. */
function Transition({ phase, kind }: { phase: string; kind: 'rules' | 'round' }) {
  if (phase === 'before' || phase === 'done') return null
  return (
    <div className={`p-turn is-${phase} is-${kind}`} aria-hidden="true">
      <div className="p-leaf">
        <div className="p-leaf-front"><span className="p-leaf-rule" /></div>
        <div className="p-leaf-back">{kind === 'round' && <span className="p-leaf-seal">1</span>}</div>
      </div>
    </div>
  )
}

const kit: Kit = { id: 'popup', World, Teams: Pennants, Qr: QrCard, Timer: Rosette, Transition, timing: { out: 0, cover: 0.8, in: 1.45, done: 2.6 } }

export const popup: Concept = { meta, kit }
