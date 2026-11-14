// ═══ «Книга» (ny_book) — ПРОТОТИП этапа 2: новая сцена разворота ═══
// docs-dev/book-redesign/PROTOTYPES.md. Две сцены (PLAN §1.1): стол — Stage fit="cover" (на весь экран), книга + декор +
// снег — Stage fit="contain" (всегда целиком, масштаб = --u вёрстки). Декор — ВРЕМЕННЫЕ растровые ассеты
// (public/ny-book/_tmp, assets.ts), смонтированы ВСЕГДА: плотность (лобби — максимум, игра — минимум) переключает
// только opacity по data-decor, без перемонтажа (AUDIT §4, F13). Лаборатория рисует старую сцену BookWorld.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Particles } from '../engine/stage'
import type { ParticleField, SnowCfg } from '../engine/particles'
import type { Density } from '../types'
import { BOOK } from './geometry'
import { BOOK_ASSETS, bookAssetUrl, type BookAssetId } from './assets'
import { pageTurnKey, type TurnSnap } from './motion'
import { bookFlags } from './copy'

const BASE = import.meta.env.BASE_URL

/** Стол под книгой: тёмное дерево, тёплый свет лампы, боке. Сцена cover. */
export function BookTable() {
  return (
    <div className="bk-table" aria-hidden="true">
      <div className="bk-table-wood" />
      <div className="bk-table-bokeh">
        {BOKEH.map(([x, y, r], i) => <span key={i} style={{ left: x, top: y, width: r, height: r } as CSSProperties} />)}
      </div>
      <div className="bk-table-lamp" />
    </div>
  )
}
const BOKEH: [number, number, number][] = [[40, 120, 90], [1840, 90, 120], [120, 860, 70], [1790, 900, 100], [960, 1050, 80], [30, 520, 60], [1890, 520, 70]]

type On = Density[]
interface Place { id: BookAssetId; x: number; y: number; h: number; on: On; front?: boolean; lamps?: number }

// Координаты — сцена 1920×1080 (левый верх ассета, высота; ширина — по пропорции). Ели разной высоты, не зеркальные.
const DECOR: Place[] = [
  { id: 'tree-2', x: 20, y: 1028 - 620, h: 620, on: ['sparse'], lamps: 10 },
  { id: 'tree-4', x: 196, y: 1040 - 340, h: 340, on: ['sparse'], front: true, lamps: 6 },
  { id: 'tree-3', x: 1620, y: 1030 - 460, h: 460, on: ['sparse'], lamps: 8 },
  { id: 'tree-1', x: 1726, y: 1046 - 300, h: 300, on: ['sparse'], front: true, lamps: 5 },
  { id: 'tree-4', x: 40, y: 1040 - 360, h: 360, on: ['medium'], lamps: 5 },
  { id: 'tree-1', x: 1660, y: 1040 - 380, h: 380, on: ['medium'], lamps: 5 },
  // игровые экраны (dense): заснеженные ёлки в нижних боковых областях разворота — за полями контента (x < 250 и x > 1670), текст не перекрывают
  { id: 'tree-4', x: 34, y: 1040 - 330, h: 330, on: ['dense'], lamps: 5 },
  { id: 'tree-1', x: 1700, y: 1042 - 340, h: 340, on: ['dense'], lamps: 5 },
  { id: 'corner-l', x: 36, y: 28, h: 250, on: ['sparse'] },
  { id: 'corner-r', x: 1600, y: 28, h: 260, on: ['sparse'] },
]

/** Лобби: утверждённые ассеты листа ведущего (домик с дымом, фонари, холм, забор — public/ny-book/*.webp, нарезка lobby-cut). Видны только при плотности `sparse`
 *  (лобби); лежат ПОД контентом, чтобы QR/логотип/команды не перекрывались. Дым — отдельный слой с мягким подъёмом и затуханием; фонари тёплым свечением мерцают. */
/** Сплошной снежный сугроб вдоль нижнего края ОБЕИХ страниц (ассет snow-hill-hi.webp 2000×245, пропорции не меняются): сегменты с перекрытием, каждый второй
 *  отражён по горизонтали — швы и «провалы» у скошенных краёв ассета закрыты соседями; контейнер обрезан по полям страниц, под корешком разрыва нет.
 *  back — под домиком/забором/фонарём, front — поверх их оснований (стоят «внутри снега»). */
function SnowStrip({ b, kind }: { b: string; kind: 'back' | 'front' }) {
  const n = kind === 'back' ? 3 : 5
  return (
    <div className={`bk-ls-snow ${kind}`}>
      {Array.from({ length: n }, (_, i) => (
        <img key={i} className={i % 2 ? 'm' : ''} style={{ left: `${(i / (n - 1)) * 100}%` }} src={b + 'snow-hill-hi.webp'} alt="" draggable={false} />
      ))}
      {kind === 'front' && <span className="bk-ls-gutter" />}
    </div>
  )
}

function LobbyScenery() {
  const b = import.meta.env.BASE_URL + 'ny-book/'
  return (
    <div className="bk-lobby-scenery" aria-hidden="true">
      <SnowStrip b={b} kind="back" />
      <div className="bk-ls-house"><img src={b + 'house-hi.webp'} alt="" draggable={false} />
        <img className="bk-ls-smoke" src={b + 'smoke-hi.webp'} alt="" draggable={false} /><img className="bk-ls-smoke s2" src={b + 'smoke-hi.webp'} alt="" draggable={false} /><span className="bk-ls-glow" /></div>
      <div className="bk-ls-lantern l1"><img src={b + 'lantern-hi.webp'} alt="" draggable={false} /><span className="bk-ls-lglow" /></div>
      <img className="bk-ls-fence" src={b + 'fence-hi.webp'} alt="" draggable={false} />
      <img className="bk-ls-fence f2" src={b + 'fence-hi.webp'} alt="" draggable={false} />
      <SnowStrip b={b} kind="front" />
    </div>
  )
}

/** Гирлянда: хвоя с лампочками, лампочки — DOM-узлы по координатам из манифеста (мерцание CSS). */
function Garland({ id, x, y, w, on, lamps = 18 }: { id: BookAssetId; x: number; y: number; w: number; on: On; lamps?: number }) {
  const a = BOOK_ASSETS[id]
  const h = Math.round((w * a.h) / a.w)
  return (
    <div className="bk-garland" data-on={on.join(' ')} style={{ left: x, top: y, width: w, height: h }}>
      <img src={bookAssetUrl(BASE, id)} alt="" decoding="async" draggable={false} />
      {a.lamps.slice(0, lamps).map(([lx, ly], i) => (
        <span key={i} className="bk-lamp" style={{ left: `${lx * 100}%`, top: `${ly * 100}%`, '--i': i } as CSSProperties} />
      ))}
    </div>
  )
}

function Decor({ p, i }: { p: Place; i: number }) {
  const a = BOOK_ASSETS[p.id]
  const w = Math.round((p.h * a.w) / a.h)
  return (
    <div className={`bk-deco${p.front ? ' is-front' : ''}`} data-on={p.on.join(' ')} style={{ left: p.x, top: p.y, width: w, height: p.h }}>
      <img src={bookAssetUrl(BASE, p.id)} alt="" decoding="async" draggable={false} />
      {a.lamps.slice(0, p.lamps ?? 0).map(([lx, ly], k) => (
        <span key={k} className="bk-lamp is-small" style={{ left: `${lx * 100}%`, top: `${ly * 100}%`, '--i': k + i * 3 } as CSSProperties} />
      ))}
    </div>
  )
}

/** Искорки на страницах — по плотности (лобби больше всего). */
const SPARKS: [number, number, Density][] = [
  [330, 210, 'sparse'], [1610, 330, 'sparse'], [880, 120, 'sparse'], [1220, 150, 'sparse'], [600, 300, 'sparse'], [1440, 250, 'sparse'],
  [180, 640, 'medium'], [1760, 600, 'medium'], [1020, 90, 'medium'], [150, 400, 'dense'], [1780, 380, 'dense'],
]
const ORDER: Density[] = ['dense', 'medium', 'sparse']
const sparkOn = (d: Density): On => ORDER.slice(ORDER.indexOf(d))

const SNOW: Record<Density, number> = { sparse: 70, medium: 34, dense: 12 }
const snowCfg = (n: number): SnowCfg => ({ layers: [
  // три слоя глубины: дальний — мелкий, медленный и бледный; средний; ближний — крупный, быстрый (в лобби ближнего чуть больше)
  { count: Math.round(n * 0.9), size: [1.2, 2.2], speed: [14, 24], opacity: 0.5 },
  { count: n, size: [1.8, 3.4], speed: [24, 38], opacity: 0.78 },
  { count: Math.round(n / 3), size: [3.6, 6], speed: [40, 62], opacity: 0.92 },
], wind: 12, color: '#fffaf0' })

/** Снег: canvas смонтирован ВСЕГДА, плотность меняется setSnow без пересоздания слоя. */
function BookSnow({ density }: { density: Density }) {
  const f = useRef<ParticleField | null>(null)
  const cfg = useMemo(() => snowCfg(SNOW[density]), [density])
  useEffect(() => { f.current?.setSnow(cfg) }, [cfg])
  return <div className="bk-snow"><Particles z={1} snow={cfg} onReady={p => { f.current = p }} seed={11} /></div>
}

/** Разворот книги: переплёт, толщина страниц, пергамент, сгиб, свет; декор и снег; слот контента. */
export function BookPages({ decor, children }: { decor: Density; children?: ReactNode }) {
  // ПРОТОТИП: флаги редизайна (?bkfont / ?bkqn / ?bkrules) → data-bk-* на <html>; при размонтировании убираются
  useEffect(() => {
    const f = bookFlags(), d = document.documentElement.dataset
    d.bkFont = f.font; d.bkQn = f.qn; d.bkRules = f.rules
    return () => { delete d.bkFont; delete d.bkQn; delete d.bkRules }
  }, [])
  return (
    <div className="bk-scene" data-decor={decor}>
      <div className="bk-book" style={{ left: BOOK.x, top: BOOK.y, width: BOOK.w, height: BOOK.h }}>
        <div className="bk-cover"><span className="bk-corner is-tl" /><span className="bk-corner is-tr" /><span className="bk-corner is-bl" /><span className="bk-corner is-br" /></div>
        <div className="bk-edges" />
        <div className="bk-page bk-page-l" /><div className="bk-page bk-page-r" />
        <div className="bk-gutter" />
        <div className="bk-light" />
      </div>
      <div className="bk-decor-back">{DECOR.filter(p => !p.front).map((p, i) => <Decor key={`${p.id}${i}`} p={p} i={i} />)}</div>
      <div className="bk-floor" aria-hidden="true"><SnowStrip b={BASE + 'ny-book/'} kind="front" /></div>
      <LobbyScenery />
      <div className="bk-sparks">{SPARKS.map(([x, y, d], i) => <span key={i} className="bk-spark" data-on={sparkOn(d).join(' ')} style={{ left: x, top: y, '--i': i } as CSSProperties} />)}</div>
      <div className="bk-content" style={{ left: BOOK.x, top: BOOK.y, width: BOOK.w, height: BOOK.h }}>{children}</div>
      <div className="bk-decor-front">{DECOR.filter(p => p.front).map((p, i) => <Decor key={`${p.id}${i}`} p={p} i={i + 20} />)}</div>
      {/* большая гирлянда с бантом — лобби; на остальных экранах — узкая, выше заголовков */}
      <Garland id="garland-long" x={960 - 640} y={-14} w={1280} on={['sparse']} />
      <Garland id="garland-long" x={960 - 520} y={-46} w={1040} on={['medium', 'dense']} lamps={14} />
      <BookSnow density={decor} />
    </div>
  )
}

/** Перелистывание: лист только на СМЕНЕ вопроса (pageTurnKey), не на опросе и не на первом снимке. Без листа (экран сразу в конечном кадре) — если вкладка
 *  пряталась/засыпала с прошлого снимка или стала видимой меньше 2 с назад. (Раньше «живость» считали по времени последней перерисовки — на тихом экране без
 *  перерисовок через 6 с лист пропадал; теперь — только по настоящей видимости вкладки.) */
function usePageTurn(snap: TurnSnap | null): number {
  const prev = useRef<{ snap: TurnSnap | null }>({ snap: null })
  const vis = useRef({ hiddenSinceSnap: false, visibleAt: performance.now() })
  const [seq, setSeq] = useState(0)
  const k = snap ? `${snap.game_id}|${snap.phase}|${snap.round_number}|${snap.question_index}` : ''
  useEffect(() => {
    const on = () => { if (document.hidden) vis.current.hiddenSinceSnap = true; else vis.current.visibleAt = performance.now() }
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])
  useEffect(() => {
    if (!snap) return
    const now = performance.now()
    const v = vis.current
    const key = !document.hidden && !v.hiddenSinceSnap && now - v.visibleAt > 2000 ? pageTurnKey(prev.current.snap, snap) : null
    prev.current = { snap }
    v.hiddenSinceSnap = false
    if (key) setSeq(n => n + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k])
  return seq
}

function PageTurnLeaf({ seq }: { seq: number }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDone(false)
    const t = window.setTimeout(() => setDone(true), 2500)    // страховка, если animationend не придёт
    return () => clearTimeout(t)
  }, [seq])
  if (!seq || done) return null
  return (
    <div className="bk-turn" key={seq} aria-hidden="true">
      <div className="bk-turn-leaf" onAnimationEnd={() => setDone(true)}><i /><i /></div>
    </div>
  )
}

/** Слой поверх игры в тех же книжных координатах: QR (выше затемнения окна составов) и перелистывание. */
export function BookPagesFx({ turn, children }: { turn?: TurnSnap | null; children?: ReactNode }) {
  const seq = usePageTurn(turn ?? null)
  return (
    <div className="bk-scene bk-fxscene">
      <div className="bk-content" style={{ left: BOOK.x, top: BOOK.y, width: BOOK.w, height: BOOK.h }}>
        {children}
        <PageTurnLeaf seq={seq} />
      </div>
    </div>
  )
}
