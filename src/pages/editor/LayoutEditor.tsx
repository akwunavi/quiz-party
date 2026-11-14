// ═══ Редактор компоновки: рамки текста и картинок поверх ПРЕДПРОСМОТРА (сквозной с проектором, QuestionPreview) ═══
// Сам экран рисует QuestionScreen/BookManual — здесь только рамки с перетаскиванием/ресайзом (мышь и палец, pointer events), панель режимов и кнопки.
// Черновик живёт в QuestionPreview и подставляется в q.service.layout — экран перерисовывается теми же компонентами, что и на проекторе.
import { useRef } from 'react'
import { Hint, useHint } from '../../components/Hint'
import { bookOffset } from '../../ny/book/adaptive/safeArea'
import { rectStyle } from '../../ny/book/BookManual'
import { WORK, clampRect, keepOffFold, sceneToRect, fallbackRects, type Rect, type Rects } from '../../lib/layoutRects'

type Mode = 'auto' | 'manual'

/** Снять с экрана текущие положения текста и картинок (авто-раскладка) в долях рабочей области — стартовая точка ручной правки. */
export function measureRects(urls: string[], imgPaths: string[], hasText: boolean): Rects {
  const v = { w: window.innerWidth, h: window.innerHeight }, { u, ox, oy } = bookOffset(v)
  const root = document.querySelector('.pv-backdrop .host-screen')
  const toRel = (r: DOMRect): Rect => sceneToRect({ x: (r.x - ox) / u, y: (r.y - oy) / u, w: r.width / u, h: r.height / u })
  let text: Rect | undefined
  const t = root?.querySelector<HTMLElement>('.q-text')
  if (hasText && t) { const r = t.getBoundingClientRect(); if (r.width > 4 && r.height > 4) text = toRel(r) }
  const images: Rect[] = []
  for (const url of urls) {
    const el = [...(root?.querySelectorAll('img') ?? [])].find(i => i.getAttribute('src') === url)
    if (!el) break
    const r = el.getBoundingClientRect(); if (r.width < 4) break
    images.push(keepOffFold(toRel(r)))
  }
  if (images.length !== urls.length || (hasText && !text)) return fallbackRects(imgPaths, hasText)
  return { v: 1, imgs: [...imgPaths], text: text ? clampRect(text) : undefined, images }
}

type Target = { kind: 'text' } | { kind: 'img'; i: number }
const get = (r: Rects, t: Target): Rect | undefined => (t.kind === 'text' ? r.text : r.images[t.i])
const put = (r: Rects, t: Target, n: Rect): Rects => t.kind === 'text' ? { ...r, text: clampRect(n) } : { ...r, images: r.images.map((x, i) => i === t.i ? keepOffFold(clampRect(n)) : x) }

export function LayoutEditor({ screen, onScreen, mode, onMode, draft, onDraft, dirty, status, saving, onSave, onCancel, onReset }: {
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
  const { u } = bookOffset({ w: window.innerWidth, h: window.innerHeight })

  const down = (e: React.PointerEvent, t: Target, kind: 'move' | 'resize') => {
    if (!draft) return
    const r0 = get(draft, t); if (!r0) return
    e.preventDefault(); e.stopPropagation()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    drag.current = { t, kind, sx: e.clientX, sy: e.clientY, r0 }
  }
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d || !draft) return
    const dx = (e.clientX - d.sx) / (WORK.w * u), dy = (e.clientY - d.sy) / (WORK.h * u)
    const n = d.kind === 'move'
      ? { ...d.r0, x: Math.min(1 - d.r0.w, Math.max(0, d.r0.x + dx)), y: Math.min(1 - d.r0.h, Math.max(0, d.r0.y + dy)) }
      : { ...d.r0, w: Math.min(1 - d.r0.x, Math.max(0.06, d.r0.w + dx)), h: Math.min(1 - d.r0.y, Math.max(0.06, d.r0.h + dy)) }
    onDraft(put(draft, d.t, n))
  }
  const up = () => { drag.current = null }

  const boxes: { t: Target; r: Rect; label: string }[] = []
  if (mode === 'manual' && draft && screen === 'question') {
    if (draft.text) boxes.push({ t: { kind: 'text' }, r: draft.text, label: 'Текст' })
    draft.images.forEach((r, i) => boxes.push({ t: { kind: 'img', i }, r, label: `Картинка ${i + 1}` }))
  }

  return (
    <div className="lay-ed" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {boxes.map(b => (
        <div key={b.t.kind === 'text' ? 't' : `i${b.t.i}`} className={`lay-box ${b.t.kind}`} style={rectStyle(b.r)}
          onPointerDown={e => down(e, b.t, 'move')}>
          <span className="lay-tag">{b.label}</span>
          <i className="lay-handle" onPointerDown={e => down(e, b.t, 'resize')} />
        </div>
      ))}
      {mode === 'manual' && screen === 'question' && <div className="lay-fold" aria-hidden="true" />}
      <div className="lay-panel" role="toolbar" aria-label="Компоновка">
        <div className="lay-row">
          <b>Компоновка</b>
          <span className="lay-seg">
            <button type="button" className={screen === 'question' ? 'on' : ''} onClick={() => onScreen('question')}>Вопрос</button>
            <button type="button" className={screen === 'answer' ? 'on' : ''}
              onClick={() => { onScreen('question'); hint.show('Экран правильного ответа пока всегда в авто-раскладке: он собирается в игре из нескольких блоков (ответ, пояснение, ответы команд) и в предпросмотре не показывается.') }}>Ответ</button>
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
        <Hint text={hint.text} />
        <div className="lay-help">Перетаскивай рамку — двигается, угол ◢ — размер. Картинки не заходят на сгиб, текст — может. Размеры — доли страницы: на любом экране одинаково.</div>
      </div>
    </div>
  )
}
