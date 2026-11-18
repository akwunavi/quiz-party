// ═══ Редактор компоновки: рамки текста и картинок поверх ПРЕДПРОСМОТРА (сквозной с проектором, QuestionPreview) ═══
// Сам экран рисует QuestionScreen/BookManual — здесь только рамки с перетаскиванием/ресайзом (мышь и палец, pointer events), панель режимов и кнопки.
// Черновик живёт в QuestionPreview и подставляется в q.service.layout — экран перерисовывается теми же компонентами, что и на проекторе.
import { useRef } from 'react'
import { Hint, useHint } from '../../components/Hint'
import { pctStyle } from '../../components/ManualLayout'
import { sceneAreaCss, busyZones, themeHasFold } from '../../lib/layoutArea'
import { MIN_SIDE, clampRect, layoutWarnings, toV2, fallbackRects, fallbackAnswerRects, fallbackGridRects, type Rect, type Rects } from '../../lib/layoutRects'

type Mode = 'auto' | 'manual'

/** Снять с экрана текущие положения текста и картинок (авто-раскладка) в долях ВСЕГО экрана темы (v:2) — стартовая точка ручной правки. */
export function measureRects(theme: string | undefined, mechanic: string, screen: 'question' | 'answer', urls: string[], imgPaths: string[], hasText: boolean, hasNote = false, nTiles = 0, hasTimer = false): Rects {
  const area = document.querySelector('.lay-ed-area')?.getBoundingClientRect()
  const root = document.querySelector('.pv-backdrop .host-screen')
  if (!area || area.width < 4) return toV2(screen === 'answer' ? fallbackAnswerRects(imgPaths, hasNote, themeHasFold(theme)) : fallbackRects(imgPaths, hasText, themeHasFold(theme)), theme)
  const toRel = (r: DOMRect): Rect => clampRect({ x: (r.x - area.x) / area.width, y: (r.y - area.y) / area.height, w: r.width / area.width, h: r.height / area.height })
  let text: Rect | undefined
  if (screen === 'answer' && mechanic !== 'four_pics') {
    // подложка ответа = «ПРАВИЛЬНЫЙ ОТВЕТ» + слово ответа (без картинок и пояснения внутри .answer-block)
    const a = root?.querySelector<HTMLElement>('.answer-label')?.getBoundingClientRect(), m = root?.querySelector<HTMLElement>('.answer-main')?.getBoundingClientRect()
    if (a && m) { const x = Math.min(a.x, m.x), y = Math.min(a.y, m.y), r = Math.max(a.right, m.right), b = Math.max(a.bottom, m.bottom); text = toRel(new DOMRect(x, y - 8, r - x, b - y + 16)) }
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
const get = (r: Rects, t: Target): Rect | undefined => (t.kind === 'text' ? r.text : t.kind === 'note' ? r.note : t.kind === 'timer' ? r.timer : t.kind === 'recall' ? r.recall : t.kind === 'teams' ? r.teams : t.kind === 'tile' ? r.tiles?.[t.i] : r.images[t.i])
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
  const drag = useRef<{ t: Target; kind: 'move' | 'resize'; sx: number; sy: number; r0: Rect } | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)
  const areaCss = sceneAreaCss(theme)

  const down = (e: React.PointerEvent, t: Target, kind: 'move' | 'resize') => {
    if (!draft) return
    const r0 = get(draft, t); if (!r0) return
    e.preventDefault(); e.stopPropagation()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    drag.current = { t, kind, sx: e.clientX, sy: e.clientY, r0 }
  }
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d || !draft) return
    const ar = areaRef.current?.getBoundingClientRect(); if (!ar || !ar.width) return
    const dx = (e.clientX - d.sx) / ar.width, dy = (e.clientY - d.sy) / ar.height
    const n = d.kind === 'move'
      ? { ...d.r0, x: Math.min(1 - d.r0.w, Math.max(0, d.r0.x + dx)), y: Math.min(1 - d.r0.h, Math.max(0, d.r0.y + dy)) }
      : (() => {
          // угол ◢ тянет размер свободно; Shift у картинки — с сохранением пропорций
          let w = Math.min(1 - d.r0.x, Math.max(MIN_SIDE, d.r0.w + dx)), h = Math.min(1 - d.r0.y, Math.max(MIN_SIDE, d.r0.h + dy))
          if (e.shiftKey && d.t.kind === 'img') { const k = Math.max(w / d.r0.w, h / d.r0.h) , kk = Math.min(k, (1 - d.r0.x) / d.r0.w, (1 - d.r0.y) / d.r0.h); w = d.r0.w * kk; h = d.r0.h * kk }
          return { ...d.r0, w, h }
        })()
    onDraft(put(draft, d.t, n))
  }
  const up = () => { drag.current = null }

  const boxes: { t: Target; r: Rect; label: string }[] = []
  if (mode === 'manual' && draft) {
    if (draft.text) boxes.push({ t: { kind: 'text' }, r: draft.text, label: screen === 'answer' ? 'Ответ' : 'Текст' })
    if (draft.note) boxes.push({ t: { kind: 'note' }, r: draft.note, label: 'Пояснение' })
    draft.images.forEach((r, i) => boxes.push({ t: { kind: 'img', i }, r, label: `Картинка ${i + 1}` }))
    draft.tiles?.forEach((r, i) => boxes.push({ t: { kind: 'tile', i }, r, label: `Вариант ${tileKeys[i] ?? i + 1}` }))
    if (draft.timer) boxes.push({ t: { kind: 'timer' }, r: draft.timer, label: 'Таймер' })
    if (draft.recall) boxes.push({ t: { kind: 'recall' }, r: draft.recall, label: 'Вопрос' })
    if (draft.teams) boxes.push({ t: { kind: 'teams' }, r: draft.teams, label: 'Ответы команд' })
  }

  return (
    <div className="lay-ed" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {/* та же рабочая область темы, что у проектора (layoutAreaCss): рамки — в долях этого прямоугольника */}
      <div ref={areaRef} className="lay-ed-area" style={areaCss ?? undefined}>
        {boxes.map(b => (
          <div key={b.t.kind === 'img' || b.t.kind === 'tile' ? `${b.t.kind}${b.t.i}` : b.t.kind} className={`lay-box ${b.t.kind}`} style={pctStyle(b.r)}
            onPointerDown={e => down(e, b.t, 'move')}>
            <span className="lay-tag">{b.label}</span>
            <i className="lay-handle" onPointerDown={e => down(e, b.t, 'resize')} />
          </div>
        ))}
        {mode === 'manual' && busyZones(theme).map((z, i) => <div key={i} className={`lay-busy ${z.id}`} style={pctStyle(z)} aria-hidden="true"><span>{z.label}</span></div>)}
      </div>
      <div className="lay-panel" role="toolbar" aria-label="Компоновка">
        <div className="lay-row">
          <b>Компоновка</b>
          <span className="lay-seg">
            <button type="button" className={screen === 'question' ? 'on' : ''} onClick={() => onScreen('question')}>Вопрос</button>
            <button type="button" className={screen === 'answer' ? 'on' : ''} onClick={() => onScreen('answer')}>Ответ</button>
          </span>
          <span className="lay-seg">
            <button type="button" className={mode === 'auto' ? 'on' : ''} onClick={() => onMode('auto')}>Авто</button>
            <button type="button" className={mode === 'manual' ? 'on' : ''} onClick={() => onMode('manual')}>Вручную</button>
          </span>
        </div>
        <div className="lay-row">
          <button type="button" onClick={onReset}>Сбросить</button>
          <button type="button" className="primary" disabled={saving}
            onClick={() => (dirty ? onSave() : hint.show('Пока нечего сохранять: измени рамки или переключи режим.'))}>{saving ? 'Сохраняю…' : 'Сохранить'}</button>
          <button type="button" onClick={onCancel}>Отмена</button>
        </div>
        {mode === 'manual' && draft && (tileKeys.length > 0 || hasTimer || screen === 'answer') && (
          <div className="lay-row">
            {tileKeys.length > 0 && (draft.tiles
              ? <button type="button" onClick={() => onDraft({ ...draft, tiles: undefined })}>Варианты — авто</button>
              : <button type="button" onClick={() => { const m = measureExtra(screen, tileKeys.length, false, 'tiles'); if (m.tiles) onDraft({ ...draft, tiles: m.tiles }); else hint.show('Не удалось снять положение плиток с экрана — закрой и открой компоновку.') }}>Варианты вручную</button>)}
            {screen === 'question' && hasTimer && (draft.timer
              ? <button type="button" onClick={() => onDraft({ ...draft, timer: undefined })}>Таймер — на месте</button>
              : <button type="button" onClick={() => { const m = measureExtra('question', 0, true, 'timer'); if (m.timer) onDraft({ ...draft, timer: m.timer }); else hint.show('Не удалось снять положение таймера с экрана.') }}>Таймер вручную</button>)}
            {screen === 'answer' && (draft.recall
              ? <button type="button" onClick={() => onDraft({ ...draft, recall: undefined })}>Вопрос — на месте</button>
              : <button type="button" onClick={() => { const m = measureExtra('answer', 0, false, 'recall'); if (m.recall) onDraft({ ...draft, recall: m.recall }); else hint.show('На этом экране нет текста вопроса.') }}>Вопрос вручную</button>)}
            {screen === 'answer' && (draft.teams
              ? <button type="button" onClick={() => onDraft({ ...draft, teams: undefined })}>Ответы команд — на месте</button>
              : <button type="button" onClick={() => { const m = measureExtra('answer', 0, false, 'teams'); if (m.teams) onDraft({ ...draft, teams: m.teams }); else hint.show('Колонки команд на экране нет.') }}>Ответы команд вручную</button>)}
          </div>
        )}
        {status && <div className="lay-note">{status}</div>}
        {mode === 'manual' && draft && layoutWarnings(draft, theme).map(w => <div key={w} className="lay-warn">⚠ {w} — можно оставить, если так задумано.</div>)}
        <Hint text={hint.text} />
        <div className="lay-help">Перетаскивай рамку — двигается, угол ◢ — размер. Рамки можно ставить куда угодно в пределах экрана — и поверх сгиба, и поверх декора (штриховкой показаны таймер, кнопки, сгиб и ёлки: о перекрытии предупредим, но не запретим). Shift при растягивании картинки — сохранить пропорции. Размеры — доли всего экрана: на любом экране одинаково.</div>
      </div>
    </div>
  )
}
