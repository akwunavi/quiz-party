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
export function measureRects(theme: string | undefined, mechanic: string, screen: 'question' | 'answer', urls: string[], imgPaths: string[], hasText: boolean, hasNote = false): Rects {
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
  if (images.length !== urls.length || (hasText && !text)) return toV2(screen === 'answer' ? fallbackAnswerRects(imgPaths, hasNote, themeHasFold(theme)) : fallbackRects(imgPaths, hasText, themeHasFold(theme)), theme)
  return { v: 2, imgs: [...imgPaths], text: text ? clampRect(text) : undefined, note: note ? clampRect(note) : undefined, images }
}

type Target = { kind: 'text' } | { kind: 'note' } | { kind: 'img'; i: number }
const get = (r: Rects, t: Target): Rect | undefined => (t.kind === 'text' ? r.text : t.kind === 'note' ? r.note : r.images[t.i])
const put = (r: Rects, t: Target, n: Rect): Rects => t.kind === 'text' ? { ...r, text: clampRect(n) } : t.kind === 'note' ? { ...r, note: clampRect(n) } : { ...r, images: r.images.map((x, i) => i === t.i ? clampRect(n) : x) }
/** стартовые рамки по умолчанию держат картинки вне сгиба Книги (дальше рамки двигаются свободно) */

export function LayoutEditor({ theme, screen, onScreen, mode, onMode, draft, onDraft, dirty, status, saving, onSave, onCancel, onReset }: {
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
  }

  return (
    <div className="lay-ed" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {/* та же рабочая область темы, что у проектора (layoutAreaCss): рамки — в долях этого прямоугольника */}
      <div ref={areaRef} className="lay-ed-area" style={areaCss ?? undefined}>
        {boxes.map(b => (
          <div key={b.t.kind === 'img' ? `i${b.t.i}` : b.t.kind} className={`lay-box ${b.t.kind}`} style={pctStyle(b.r)}
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
        {status && <div className="lay-note">{status}</div>}
        {mode === 'manual' && draft && layoutWarnings(draft, theme).map(w => <div key={w} className="lay-warn">⚠ {w} — можно оставить, если так задумано.</div>)}
        <Hint text={hint.text} />
        <div className="lay-help">Перетаскивай рамку — двигается, угол ◢ — размер. Рамки можно ставить куда угодно в пределах экрана — и поверх сгиба, и поверх декора (штриховкой показаны таймер, кнопки, сгиб и ёлки: о перекрытии предупредим, но не запретим). Shift при растягивании картинки — сохранить пропорции. Размеры — доли всего экрана: на любом экране одинаково.</div>
      </div>
    </div>
  )
}
