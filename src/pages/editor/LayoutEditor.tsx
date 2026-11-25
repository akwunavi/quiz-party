// ═══ Редактор компоновки: рамки текста и картинок поверх ПРЕДПРОСМОТРА (сквозной с проектором, QuestionPreview) ═══
// Сам экран рисует QuestionScreen/BookManual — здесь только рамки с перетаскиванием/ресайзом (мышь и палец, pointer events), панель режимов и кнопки.
// Черновик живёт в QuestionPreview и подставляется в q.service.layout — экран перерисовывается теми же компонентами, что и на проекторе.
import { useEffect, useRef, useState } from 'react'
import { Hint, useHint } from '../../components/Hint'
import { Ic } from './layoutIcons'
import { pctStyle } from '../../components/ManualLayout'
import { sceneAreaCss, busyZones, themeHasFold } from '../../lib/layoutArea'
import { alignRects, bbox, distribute, nudge, pageLines, sameSize, snapMove, snapResize, SNAP_PX, type AlignMode, type GapMark, type GuideLine, type SnapCfg } from '../../lib/layoutSnap'
import { MIN_SIDE, clampRect, layoutWarnings, toV2, fallbackRects, fallbackAnswerRects, fallbackAnswerTiles, fallbackGridRects, type Rect, type Rects } from '../../lib/layoutRects'

type Mode = 'auto' | 'manual'

/** Снять с экрана текущие положения текста и картинок (авто-раскладка) в долях ВСЕГО экрана темы (v:2) — стартовая точка ручной правки. */
export function measureRects(theme: string | undefined, mechanic: string, screen: 'question' | 'answer', urls: string[], imgPaths: string[], hasText: boolean, hasNote = false, nTiles = 0, hasTimer = false): Rects {
  const area = document.querySelector('.lay-ed-area')?.getBoundingClientRect()
  const root = document.querySelector('.pv-backdrop .host-screen')
  if (screen === 'answer' && nTiles > 0 && mechanic !== 'four_pics') {
    // варианты/порядок/пары: текста «правильного ответа» и свободных картинок нет — только плитки (замеренные или запасная сетка), вопрос и команды
    const ex = area && area.width >= 4 ? measureExtra('answer', nTiles, false) : {}
    return { v: 2, imgs: [], images: [], note: hasNote ? fallbackAnswerRects([], true, false).note && toV2(fallbackAnswerRects([], true, themeHasFold(theme)), theme).note : undefined, tiles: ex.tiles ?? fallbackAnswerTiles(nTiles), ...(ex.recall ? { recall: ex.recall } : {}), ...(ex.teams ? { teams: ex.teams } : {}) }
  }
  if (!area || area.width < 4) return toV2(screen === 'answer' ? fallbackAnswerRects(imgPaths, hasNote, themeHasFold(theme)) : fallbackRects(imgPaths, hasText, themeHasFold(theme)), theme)
  const toRel = (r: DOMRect): Rect => clampRect({ x: (r.x - area.x) / area.width, y: (r.y - area.y) / area.height, w: r.width / area.width, h: r.height / area.height })
  let text: Rect | undefined
  if (screen === 'answer' && mechanic !== 'four_pics') {
    // подложка ответа = «ПРАВИЛЬНЫЙ ОТВЕТ» + слово ответа (без картинок и пояснения внутри .answer-block)
    // «Книга»: плашка — свиток (.answer-plate), рамка `text` = ТЕЛО свитка (хвоя и бант выступают за неё); иначе подпись + слово
    const pl = root?.querySelector<HTMLElement>('.answer-plate')?.getBoundingClientRect()
    const a = root?.querySelector<HTMLElement>('.answer-label')?.getBoundingClientRect(), m = root?.querySelector<HTMLElement>('.answer-main')?.getBoundingClientRect()
    if (pl && pl.width > 4) text = toRel(pl)
    else if (a && m) { const x = Math.min(a.x, m.x), y = Math.min(a.y, m.y), r = Math.max(a.right, m.right), b = Math.max(a.bottom, m.bottom); text = toRel(new DOMRect(x, y - 8, r - x, b - y + 16)) }
  } else {
    const t = root?.querySelector<HTMLElement>(screen === 'answer' ? '.rv-review-main .rv-word-wrap' : '.q-text')
    if (hasText && t) { const r = t.getBoundingClientRect(); if (r.width > 4 && r.height > 4) text = toRel(r) }
  }
  const images: Rect[] = []
  for (const url of urls) {
    const el = [...(root?.querySelectorAll('img') ?? [])].find(i => i.getAttribute('src') === url)
    if (!el) break
    const r = el.getBoundingClientRect(); if (r.width < 4) break
    images.push(toRel(r))
  }
  let note: Rect | undefined
  if (screen === 'answer' && hasNote) { const n = root?.querySelector<HTMLElement>('.bk-note-box, .answer-note'); if (n) { const r = n.getBoundingClientRect(); if (r.width > 4) note = toRel(r) } }
  if (mechanic === 'four_pics' && screen === 'question' && images.length !== urls.length) return toV2(fallbackGridRects(imgPaths, themeHasFold(theme)), theme)
  if (images.length !== urls.length || (hasText && !text && !(screen === 'answer' && nTiles > 0))) return toV2(screen === 'answer' ? fallbackAnswerRects(imgPaths, hasNote, themeHasFold(theme)) : fallbackRects(imgPaths, hasText, themeHasFold(theme)), theme)
  // плитки вариантов, таймер, вопрос и колонка команд — отдельные рамки (обычные механики)
  const extra = mechanic !== 'four_pics' ? measureExtra(screen, nTiles, hasTimer) : {}
  return { v: 2, imgs: [...imgPaths], text: text ? clampRect(text) : undefined, note: note ? clampRect(note) : undefined, images, ...extra }
}

type Target = { kind: 'text' } | { kind: 'note' } | { kind: 'img'; i: number } | { kind: 'tile'; i: number } | { kind: 'timer' } | { kind: 'recall' } | { kind: 'teams' }
const put = (r: Rects, t: Target, n: Rect): Rects => t.kind === 'text' ? { ...r, text: clampRect(n) } : t.kind === 'note' ? { ...r, note: clampRect(n) } : t.kind === 'timer' ? { ...r, timer: clampRect(n) } : t.kind === 'recall' ? { ...r, recall: clampRect(n) } : t.kind === 'teams' ? { ...r, teams: clampRect(n) }
  : t.kind === 'tile' ? { ...r, tiles: (r.tiles ?? []).map((x, i) => i === t.i ? clampRect(n) : x) } : { ...r, images: r.images.map((x, i) => i === t.i ? clampRect(n) : x) }
/** стартовые рамки по умолчанию держат картинки вне сгиба Книги (дальше рамки двигаются свободно) */

/** Снять положения плиток вариантов, таймера (экран вопроса) или плиток/вопроса/колонки команд (экран ответа) с экрана (авто-вид) — для кнопок и для первого входа в ручной режим. */
export function measureExtra(screen: 'question' | 'answer', nTiles: number, hasTimer: boolean, only?: 'tiles' | 'timer' | 'recall' | 'teams'): { tiles?: Rect[]; timer?: Rect; recall?: Rect; teams?: Rect } {
  const area = document.querySelector('.lay-ed-area')?.getBoundingClientRect(), root = document.querySelector('.pv-backdrop .host-screen')
  if (!area || area.width < 4 || !root) return {}
  const rel = (r: DOMRect): Rect => clampRect({ x: (r.x - area.x) / area.width, y: (r.y - area.y) / area.height, w: r.width / area.width, h: r.height / area.height })
  const out: { tiles?: Rect[]; timer?: Rect; recall?: Rect; teams?: Rect } = {}
  const want = (k: string) => !only || only === k
  if (nTiles > 0 && want('tiles')) {
    const sel = screen === 'answer' ? '.answer-block .choice-plate, .answer-block .choice-img, .answer-block .oi, .answer-block .mi' : '.choices-grid .choice-plate'
    const els = [...root.querySelectorAll<HTMLElement>(sel)]; if (els.length === nTiles) out.tiles = els.map(e => rel(e.getBoundingClientRect()))
  }
  if (screen === 'question' && hasTimer && want('timer')) { const tm = root.querySelector<HTMLElement>('.host-topbar > :not(.qnum):last-child'); if (tm) { const r = tm.getBoundingClientRect(); if (r.width > 4) out.timer = rel(r) } }
  if (screen === 'answer') {
    if (want('recall')) { const rc = root.querySelector<HTMLElement>('.answers-main > .q-recall'); if (rc) { const r = rc.getBoundingClientRect(); if (r.width > 4) out.recall = rel(r) } }
    if (want('teams')) { const tm = root.querySelector<HTMLElement>('.answers-layout > .team-answers'); if (tm) { const r = tm.getBoundingClientRect(); if (r.width > 4) out.teams = rel(r) } }
  }
  return out
}

const keyOf = (t: Target): string => (t.kind === 'img' || t.kind === 'tile' ? `${t.kind}${t.i}` : t.kind)
type Box = { key: string; t: Target; r: Rect; label: string }
/** Что рисуем поверх экрана во время жеста: направляющие, отрезки равных интервалов, метки «те же размеры». */
interface Guides { lines: GuideLine[]; gaps: GapMark[]; eqs: { r: Rect; txt: string }[] }
/** Состояние панели (свёрнута/развёрнута, сверху/снизу) помним между открытиями; localStorage может быть недоступен — тогда по умолчанию. */
const PREFS_KEY = 'qp-lay-panel'
interface PanelPrefs { open: boolean; dock: 'top' | 'bottom' }
const readPrefs = (): PanelPrefs => {
  try { const j = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}'); return { open: j.open === true, dock: j.dock === 'top' ? 'top' : 'bottom' } } catch { return { open: false, dock: 'bottom' } }
}
type Drag = { kind: 'move' | 'resize' | 'marquee'; keys: string[]; starts: Record<string, Rect>; sx: number; sy: number; base: string[] }

export function LayoutEditor({ theme, screen, onScreen, mode, onMode, draft, onDraft, dirty, status, saving, onSave, onCancel, onReset, tileKeys = [], hasTimer = false }: {
  /** буквы плиток вариантов (подписи рамок) и есть ли у экрана таймер, который можно двигать */
  tileKeys?: string[]; hasTimer?: boolean
  theme: string | undefined
  screen: 'question' | 'answer'; onScreen: (s: 'question' | 'answer') => void
  mode: Mode; onMode: (m: Mode) => void
  draft: Rects | null; onDraft: (r: Rects) => void
  dirty: boolean
  /** сообщение редактору: «раскладка сброшена» и т. п. */
  status: string | null
  saving: boolean
  onSave: () => void; onCancel: () => void; onReset: () => void
}) {
  const hint = useHint()
  const drag = useRef<Drag | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)
  const areaCss = sceneAreaCss(theme)
  const [sel, setSel] = useState<string[]>([])
  const [guides, setGuides] = useState<Guides | null>(null)
  const [marq, setMarq] = useState<Rect | null>(null)
  const [prefs, setPrefsState] = useState<PanelPrefs>(readPrefs)
  const [gest, setGest] = useState(false)   // идёт жест: панель не мешает рамкам (полупрозрачная, не ловит указатель)
  const pOpen = prefs.open, dock = prefs.dock
  const setPrefs = (p: Partial<PanelPrefs>) => setPrefsState(old => { const n = { ...old, ...p }; try { localStorage.setItem(PREFS_KEY, JSON.stringify(n)) } catch { /* без памяти — работаем дальше */ } return n })

  const boxes: Box[] = []
  const addBox = (t: Target, r: Rect, label: string) => boxes.push({ key: keyOf(t), t, r, label })
  if (mode === 'manual' && draft) {
    if (draft.text) addBox({ kind: 'text' }, draft.text, screen === 'answer' ? 'Ответ' : 'Текст')
    if (draft.note) addBox({ kind: 'note' }, draft.note, 'Пояснение')
    draft.images.forEach((r, i) => addBox({ kind: 'img', i }, r, `Картинка ${i + 1}`))
    draft.tiles?.forEach((r, i) => addBox({ kind: 'tile', i }, r, `Вариант ${tileKeys[i] ?? i + 1}`))
    if (draft.timer) addBox({ kind: 'timer' }, draft.timer, 'Таймер')
    if (draft.recall) addBox({ kind: 'recall' }, draft.recall, 'Вопрос')
    if (draft.teams) addBox({ kind: 'teams' }, draft.teams, 'Ответы команд')
  }
  const selKeys = sel.filter(k => boxes.some(b => b.key === k))
  // последние значения для обработчика клавиш (подписан один раз)
  const live = useRef({ draft, boxes, selKeys, mode, onDraft })
  live.current = { draft, boxes, selKeys, mode, onDraft }
  useEffect(() => { setSel([]); setGuides(null) }, [screen, mode])

  const cfgFor = (): SnapCfg | null => {
    const ar = areaRef.current?.getBoundingClientRect(); if (!ar || !ar.width || !ar.height) return null
    const pl = pageLines(theme)
    return { thrX: SNAP_PX / ar.width, thrY: SNAP_PX / ar.height, pageX: pl.x, pageY: pl.y }
  }
  const applyTo = (d: Rects, rects: Record<string, Rect>): Rects => boxes.reduce((acc, b) => (rects[b.key] ? put(acc, b.t, rects[b.key]) : acc), d)

  const down = (e: React.PointerEvent, key: string, kind: 'move' | 'resize') => {
    if (!draft || e.button !== 0) return
    const bx = boxes.find(b => b.key === key); if (!bx) return
    e.preventDefault(); e.stopPropagation()
    let keys = [key]
    if (kind === 'move') {
      const mod = e.shiftKey || e.ctrlKey || e.metaKey
      if (mod) {
        keys = selKeys.includes(key) ? selKeys.filter(k => k !== key) : [...selKeys, key]
        setSel(keys); if (!keys.includes(key)) return   // снятие выделения — без перетаскивания
      } else if (selKeys.includes(key)) keys = selKeys
      else setSel([key])
    } else setSel([key])
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    const starts: Record<string, Rect> = {}
    for (const k of keys) { const b = boxes.find(x => x.key === k); if (b) starts[k] = b.r }
    drag.current = { kind, keys, starts, sx: e.clientX, sy: e.clientY, base: [] }; setGest(true)
  }
  /** Рамка-выделение: тянем по пустому месту экрана. */
  const downBg = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    const base = e.shiftKey || e.ctrlKey || e.metaKey ? selKeys : []
    if (!base.length) setSel([])
    drag.current = { kind: 'marquee', keys: [], starts: {}, sx: e.clientX, sy: e.clientY, base }; setGest(true)
  }
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d || !draft) return
    if (e.buttons === 0) { up(); return } // кнопку отпустили вне окна/после контекстного меню — жест не залипает
    const ar = areaRef.current?.getBoundingClientRect(); if (!ar || !ar.width) return
    if (d.kind === 'marquee') {
      const a = { x: (d.sx - ar.x) / ar.width, y: (d.sy - ar.y) / ar.height }, b = { x: (e.clientX - ar.x) / ar.width, y: (e.clientY - ar.y) / ar.height }
      const m = { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y) }
      setMarq(m)
      const hit = boxes.filter(bx => bx.r.x < m.x + m.w && bx.r.x + bx.r.w > m.x && bx.r.y < m.y + m.h && bx.r.y + bx.r.h > m.y).map(bx => bx.key)
      setSel([...new Set([...d.base, ...hit])]); return
    }
    const dx = (e.clientX - d.sx) / ar.width, dy = (e.clientY - d.sy) / ar.height
    const cfg = e.altKey ? null : cfgFor()   // Alt — привязка выключена
    const others = boxes.filter(b => !d.keys.includes(b.key)).map(b => b.r)
    if (d.kind === 'move') {
      const g0 = bbox(d.keys.map(k => d.starts[k]))
      let g = { ...g0, x: Math.min(1 - g0.w, Math.max(0, g0.x + dx)), y: Math.min(1 - g0.h, Math.max(0, g0.y + dy)) }
      let gd: Guides | null = null
      if (cfg) { const r = snapMove(g, others, cfg); g = r.rect; gd = { lines: r.lines, gaps: r.gaps, eqs: [] } }
      const out: Record<string, Rect> = {}
      for (const k of d.keys) out[k] = { ...d.starts[k], x: d.starts[k].x + (g.x - g0.x), y: d.starts[k].y + (g.y - g0.y) }
      setGuides(gd); onDraft(applyTo(draft, out)); return
    }
    const key = d.keys[0], r0 = d.starts[key], t = boxes.find(b => b.key === key)?.t; if (!t) return
    // угол ◢ тянет размер свободно; Shift у картинки — с сохранением пропорций (тогда привязку не применяем: пропорции важнее)
    let w = Math.min(1 - r0.x, Math.max(MIN_SIDE, r0.w + dx)), h = Math.min(1 - r0.y, Math.max(MIN_SIDE, r0.h + dy))
    const prop = e.shiftKey && t.kind === 'img'
    if (prop) { const k = Math.max(w / r0.w, h / r0.h), kk = Math.min(k, (1 - r0.x) / r0.w, (1 - r0.y) / r0.h); w = r0.w * kk; h = r0.h * kk }
    let n: Rect = { ...r0, w, h }; let gd: Guides | null = null
    if (cfg && !prop) {
      const r = snapResize(n, others, cfg); n = r.rect
      const idx = [...new Set([...r.sameW, ...r.sameH])]   // у одной рамки — одна метка («= ширина · = высота»)
      const eqs = idx.map(i => ({ r: others[i], txt: [r.sameW.includes(i) ? '= ширина' : '', r.sameH.includes(i) ? '= высота' : ''].filter(Boolean).join(' · ') }))
      if (eqs.length) eqs.push({ r: n, txt: [r.sameW.length ? 'та же ширина' : '', r.sameH.length ? 'та же высота' : ''].filter(Boolean).join(' · ') })
      gd = { lines: r.lines, gaps: r.gaps, eqs }
    }
    setGuides(gd); onDraft(put(draft, t, n))
  }
  const up = () => { drag.current = null; setGuides(null); setMarq(null); setGest(false) }

  // стрелки двигают выбранные рамки: 0,2 % экрана (≈ 4 px на 1920), с Shift — 1 %
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const L = live.current
      if (L.mode !== 'manual' || !L.draft || !L.selKeys.length) return
      const tg = e.target as HTMLElement | null
      if (tg && (/^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName) || tg.isContentEditable)) return
      const st = e.shiftKey ? 0.01 : 0.002
      const v = e.key === 'ArrowLeft' ? [-st, 0] : e.key === 'ArrowRight' ? [st, 0] : e.key === 'ArrowUp' ? [0, -st] : e.key === 'ArrowDown' ? [0, st] : null
      if (!v) return
      e.preventDefault()
      const rects: Record<string, Rect> = {}
      for (const b of L.boxes) if (L.selKeys.includes(b.key)) rects[b.key] = nudge(b.r, v[0], v[1])
      L.onDraft(L.boxes.reduce((acc, b) => (rects[b.key] ? put(acc, b.t, rects[b.key]) : acc), L.draft))
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  /** Применить выравнивание к выбранным рамкам (в порядке выбора: первая — образец для «одинаковый размер»). */
  const arrange = (need: number, fn: (rs: Rect[]) => Rect[]) => {
    if (!draft) return
    if (selKeys.length < need) { hint.show(need === 3 ? 'Чтобы распределить, выдели три рамки или больше: Shift/Ctrl-клик по рамкам или обведи их мышью на пустом месте.' : 'Выдели две рамки или больше: Shift/Ctrl-клик по рамкам или обведи их мышью на пустом месте.'); return }
    const rs = fn(selKeys.map(k => boxes.find(b => b.key === k)!.r))
    const out: Record<string, Rect> = {}; selKeys.forEach((k, i) => { out[k] = rs[i] })
    onDraft(applyTo(draft, out))
  }
  const al = (m: AlignMode) => arrange(2, rs => alignRects(rs, m))

  return (
    <div className="lay-ed" onPointerMove={move} onPointerUp={up} onPointerCancel={up} onLostPointerCapture={up}>
      {/* та же рабочая область темы, что у проектора (layoutAreaCss): рамки — в долях этого прямоугольника */}
      <div ref={areaRef} className="lay-ed-area" style={areaCss ?? undefined}>
        {mode === 'manual' && draft && <div className="lay-bg" data-lay-bg onPointerDown={downBg} />}
        {boxes.map(b => (
          <div key={b.key} className={`lay-box ${b.t.kind}${selKeys.includes(b.key) ? ' sel' : ''}`} data-key={b.key} style={pctStyle(b.r)}
            onPointerDown={e => down(e, b.key, 'move')}>
            <span className="lay-tag">{b.label}</span>
            <i className="lay-handle" onPointerDown={e => down(e, b.key, 'resize')} />
          </div>
        ))}
        {mode === 'manual' && busyZones(theme).map((z, i) => <div key={i} className={`lay-busy ${z.id}`} style={pctStyle(z)} aria-hidden="true"><span>{z.label}</span></div>)}
        {/* умные направляющие: только во время жеста */}
        {guides?.lines.map((l, i) => <div key={`l${i}`} className={`lay-guide ${l.axis}`} style={l.axis === 'x' ? { left: `${l.at * 100}%`, top: `${l.from * 100}%`, height: `${(l.to - l.from) * 100}%` } : { top: `${l.at * 100}%`, left: `${l.from * 100}%`, width: `${(l.to - l.from) * 100}%` }} />)}
        {guides?.gaps.map((g, i) => <div key={`g${i}`} className={`lay-gap ${g.axis}`} style={g.axis === 'x' ? { left: `${g.from * 100}%`, width: `${(g.to - g.from) * 100}%`, top: `${g.at * 100}%` } : { top: `${g.from * 100}%`, height: `${(g.to - g.from) * 100}%`, left: `${g.at * 100}%` }} />)}
        {guides?.eqs.map((q, i) => <div key={`e${i}`} className="lay-eq" style={{ left: `${(q.r.x + q.r.w / 2) * 100}%`, top: `${(q.r.y + q.r.h) * 100}%` }}>{q.txt}</div>)}
        {marq && <div className="lay-marq" style={pctStyle(marq)} />}
      </div>
      <div className={`lay-panel ${pOpen ? 'open' : 'min'} dock-${dock}${gest ? ' gesture' : ''}`} role="toolbar" aria-label="Компоновка">
        <div className="lay-bar">
          <button type="button" className="lay-ib lay-toggle" aria-expanded={pOpen} title={pOpen ? 'Свернуть панель: останется одна строка' : 'Развернуть панель: выравнивание, режимы, подсказки'} onClick={() => setPrefs({ open: !pOpen })}><Ic n={pOpen ? 'down' : 'up'} /></button>
          <b className="lay-title">Компоновка</b>
          <span className="lay-seg" role="group" aria-label="Какой экран правим">
            <button type="button" className={screen === 'question' ? 'on' : ''} title="Правим экран вопроса" onClick={() => onScreen('question')}>Вопрос</button>
            <button type="button" className={screen === 'answer' ? 'on' : ''} title="Правим экран ответа" onClick={() => onScreen('answer')}>Ответ</button>
          </span>
          <span className="lay-seg" role="group" aria-label="Режим раскладки">
            <button type="button" className={mode === 'auto' ? 'on' : ''} title="Авто: экран раскладывается сам" onClick={() => onMode('auto')}>Авто</button>
            <button type="button" className={mode === 'manual' ? 'on' : ''} title="Вручную: рамки двигаешь сам" onClick={() => onMode('manual')}>Вручную</button>
          </span>
          <span className="lay-grow" />
          <button type="button" className="lay-btn" title="Сбросить этот экран в авто-раскладку" onClick={onReset}><Ic n="reset" /><span>Сбросить</span></button>
          <button type="button" className={`lay-btn ok${dirty ? '' : ' idle'}`} disabled={saving} title="Сохранить раскладку вопроса и ответа"
            onClick={() => (dirty ? onSave() : hint.show('Пока нечего сохранять: измени рамки или переключи режим.'))}><Ic n="save" /><span>{saving ? 'Сохраняю…' : 'Сохранить'}</span></button>
          <button type="button" className="lay-btn danger" title="Закрыть без сохранения" onClick={onCancel}><Ic n="cancel" /><span>Отменить</span></button>
          <button type="button" className="lay-ib" title={dock === 'bottom' ? 'Перенести панель наверх' : 'Перенести панель вниз'} onClick={() => setPrefs({ dock: dock === 'bottom' ? 'top' : 'bottom' })}><Ic n="dock" /></button>
        </div>
        <Hint text={hint.text} />
        {pOpen && (
          <div className="lay-body">
            {mode === 'manual' && draft && (
              <div className="lay-tools">
                <span className="lay-group" role="group" aria-label="Выравнивание выбранных рамок">
                  <span className="lay-gl">Выравнивание</span>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="По левому краю" onClick={() => al('left')}><Ic n="alignLeft" /></button>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="По центру (по горизонтали)" onClick={() => al('hcenter')}><Ic n="alignCenter" /></button>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="По правому краю" onClick={() => al('right')}><Ic n="alignRight" /></button>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="По верху" onClick={() => al('top')}><Ic n="alignTop" /></button>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="По середине (по вертикали)" onClick={() => al('vmiddle')}><Ic n="alignMiddle" /></button>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="По низу" onClick={() => al('bottom')}><Ic n="alignBottom" /></button>
                </span>
                <span className="lay-group" role="group" aria-label="Размеры выбранных рамок">
                  <span className="lay-gl">Размер</span>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="Одинаковая ширина — как у первой выбранной рамки" onClick={() => arrange(2, rs => sameSize(rs, 'w'))}><Ic n="sameW" /></button>
                  <button type="button" className={`lay-ib${selKeys.length < 2 ? ' idle' : ''}`} title="Одинаковая высота — как у первой выбранной рамки" onClick={() => arrange(2, rs => sameSize(rs, 'h'))}><Ic n="sameH" /></button>
                </span>
                <span className="lay-group" role="group" aria-label="Распределение выбранных рамок">
                  <span className="lay-gl">Промежутки</span>
                  <button type="button" className={`lay-ib${selKeys.length < 3 ? ' idle' : ''}`} title="Равные промежутки по горизонтали (от трёх рамок)" onClick={() => arrange(3, rs => distribute(rs, 'x'))}><Ic n="distH" /></button>
                  <button type="button" className={`lay-ib${selKeys.length < 3 ? ' idle' : ''}`} title="Равные промежутки по вертикали (от трёх рамок)" onClick={() => arrange(3, rs => distribute(rs, 'y'))}><Ic n="distV" /></button>
                </span>
                <span className="lay-chip" title="Сколько рамок выбрано: Shift/Ctrl-клик или обведи мышью на пустом месте">Выбрано: <b>{selKeys.length}</b></span>
              </div>
            )}
            {mode === 'manual' && draft && (tileKeys.length > 0 || hasTimer || screen === 'answer') && (
              <div className="lay-tools">
                <span className="lay-group" role="group" aria-label="Что двигаем вручную">
                  <span className="lay-gl">Вручную / авто</span>
                  {tileKeys.length > 0 && <button type="button" className={`lay-btn sm${draft.tiles ? ' on' : ''}`} aria-pressed={!!draft.tiles} title={draft.tiles ? 'Варианты двигаются вручную. Нажми — вернуть на штатные места (авто)' : 'Варианты на штатных местах. Нажми — двигать каждую плитку вручную'}
                    onClick={() => { if (draft.tiles) { onDraft({ ...draft, tiles: undefined }); return } const m = measureExtra(screen, tileKeys.length, false, 'tiles'); if (m.tiles) onDraft({ ...draft, tiles: m.tiles }); else hint.show('Не удалось снять положение плиток с экрана — закрой и открой компоновку.') }}><Ic n="tiles" /><span>Варианты</span></button>}
                  {screen === 'question' && hasTimer && <button type="button" className={`lay-btn sm${draft.timer ? ' on' : ''}`} aria-pressed={!!draft.timer} title={draft.timer ? 'Таймер двигается вручную. Нажми — вернуть на место' : 'Таймер на своём месте. Нажми — двигать и менять размер вручную'}
                    onClick={() => { if (draft.timer) { onDraft({ ...draft, timer: undefined }); return } const m = measureExtra('question', 0, true, 'timer'); if (m.timer) onDraft({ ...draft, timer: m.timer }); else hint.show('Не удалось снять положение таймера с экрана.') }}><Ic n="timer" /><span>Таймер</span></button>}
                  {screen === 'answer' && <button type="button" className={`lay-btn sm${draft.recall ? ' on' : ''}`} aria-pressed={!!draft.recall} title={draft.recall ? 'Текст вопроса двигается вручную. Нажми — вернуть на место' : 'Текст вопроса на своём месте. Нажми — двигать вручную'}
                    onClick={() => { if (draft.recall) { onDraft({ ...draft, recall: undefined }); return } const m = measureExtra('answer', 0, false, 'recall'); if (m.recall) onDraft({ ...draft, recall: m.recall }); else hint.show('На этом экране нет текста вопроса.') }}><Ic n="text" /><span>Вопрос</span></button>}
                  {screen === 'answer' && <button type="button" className={`lay-btn sm${draft.teams ? ' on' : ''}`} aria-pressed={!!draft.teams} title={draft.teams ? 'Колонка ответов команд двигается вручную. Нажми — вернуть на место' : 'Колонка ответов команд на своём месте. Нажми — двигать вручную'}
                    onClick={() => { if (draft.teams) { onDraft({ ...draft, teams: undefined }); return } const m = measureExtra('answer', 0, false, 'teams'); if (m.teams) onDraft({ ...draft, teams: m.teams }); else hint.show('Колонки команд на экране нет.') }}><Ic n="teams" /><span>Ответы команд</span></button>}
                </span>
              </div>
            )}
            {status && <div className="lay-note">{status}</div>}
            {mode === 'manual' && draft && (() => { const ws = layoutWarnings(draft, theme); return ws.length > 0 && (
              <details className="lay-warns"><summary><Ic n="warn" /> Перекрытия: {ws.length} — можно оставить, если так задумано</summary>
                {ws.map(w => <div key={w} className="lay-warn">{w}</div>)}</details>) })()}
            <details className="lay-helpbox"><summary><Ic n="help" /> Подсказки</summary>
              <ul className="lay-help">
                <li>Перетаскивай рамку — двигается, угол ◢ — размер. Ставить можно куда угодно, в том числе поверх сгиба и декора (штриховка): предупредим, но не запретим.</li>
                <li>Рамки сами прилипают к краям и центрам соседей и к центру экрана (розовые линии), размер — к размеру соседа («= ширина»), интервалы — к равным.</li>
                <li><b>Alt</b> во время жеста — без прилипания. <b>Shift</b> при растягивании картинки — сохранить пропорции.</li>
                <li>Несколько рамок: <b>Shift/Ctrl-клик</b> или обведи мышью на пустом месте, потом кнопки выравнивания. Стрелки двигают выбранные, <b>Shift+стрелки</b> — крупнее.</li>
                <li>Размеры — доли всего экрана: на любом экране одинаково.</li>
              </ul>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}
