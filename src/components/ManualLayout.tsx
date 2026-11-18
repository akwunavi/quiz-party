// ═══ Ручная компоновка вопроса — ОДИН механизм для всех тем (lib/layoutRects.ts + lib/layoutArea.ts) ═══
// Контейнер = ВЕСЬ экран темы (sceneAreaCss: Книга — сцена 1920×1080, остальные — окно; раскладка v:2) позиционируется абсолютно внутри .host-screen; рамки текста и картинок — в % контейнера.
// Тот же компонент рисует проектор и предпросмотр редактора. Текст вписывается useFitText (режим диапазона: только уменьшение, без !important на кегле),
// картинка — object-fit: contain в своей рамке, без растяжения. Внешний вид темы вне ручной раскладки не меняется: компонент монтируется ТОЛЬКО когда layout валиден.
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { WindText } from './QuestionText'
import { useFitText } from '../hooks/useFitText'
import { sceneAreaCss } from '../lib/layoutArea'
import type { Rect, Rects } from '../lib/layoutRects'

export const pctStyle = (r: Rect): CSSProperties => ({ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` })

/** Плитка варианта: та же разметка `.choice-plate`, что и в потоке экрана, но в своей рамке; кегль текста подгоняется под рамку (useFitText, диапазон). */
function LayTile({ k, text, rect, i }: { k: string; text: string; rect: Rect; i: number }) {
  const tile = useRef<HTMLDivElement>(null)
  const fit = useFitText<HTMLSpanElement>([text, rect.w, rect.h], { range: () => { const h = tile.current?.clientHeight ?? 60; return { min: 9, max: Math.max(12, h * 0.4) } } })
  return (
    <div ref={tile} className="lay-tile" data-lay="tile" data-lay-i={i} style={pctStyle(rect)}>
      <div className="choice-plate lay-plate"><span className="key">{k}</span><span className="lay-tile-t"><span ref={fit} className="lay-tile-tx">{text}</span></span></div>
    </div>
  )
}

/** Таймер в своей рамке: рисунок темы масштабируется, чтобы вписаться в рамку (положение и размер — как у остальных рамок). */
function LayTimer({ rect, children }: { rect: Rect; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null), inner = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const b = box.current, el = inner.current, area = b?.parentElement
    if (!b || !el || !area) return
    const fit = () => { const nw = el.offsetWidth, nh = el.offsetHeight; if (!nw || !nh) return
      const k = Math.min(rect.w * area.clientWidth / nw, rect.h * area.clientHeight / nh); el.style.transform = `scale(${k})` }
    fit(); const ro = new ResizeObserver(fit); ro.observe(area); ro.observe(el)
    return () => ro.disconnect()
  }, [rect.w, rect.h])
  return <div ref={box} className="lay-timer" data-lay="timer" style={{ left: `${rect.x * 100}%`, top: `${rect.y * 100}%`, width: `${rect.w * 100}%`, height: `${rect.h * 100}%` }}><div ref={inner} className="lay-timer-in">{children}</div></div>
}

export function ManualLayout({ theme, text, urls, rects, seed, tiles, timer, badges }: {
  theme: string | undefined; text: string; urls: string[]; rects: Rects; seed: string
  /** плитки вариантов (ключ + текст) — рисуются в рамках rects.tiles, если они заданы */
  tiles?: { key: string; text: string }[]
  /** готовый узел таймера — рисуется в рамке rects.timer, если она задана */
  timer?: ReactNode
  /** подписи-буквы/номера на картинках-вариантах и парах */
  badges?: { mark: string; caption?: string }[]
}) {
  const area = sceneAreaCss(theme)
  if (!area) return null
  const range = () => {
    const vh = window.innerHeight
    const hPx = rects.text ? rects.text.h * vh : 0    // v:2: рамка — доля всего экрана
    return { min: Math.max(14, vh * 0.02), max: Math.max(18, Math.min(hPx * 0.6, vh * 0.09)) }
  }
  return (
    <div className="lay-area" data-lay-area="1" style={area}>
      {rects.text && text.trim() && (
        <div className="lay-text" data-lay="text" style={pctStyle(rects.text)}>
          <WindText key={seed} text={text} range={range} role="manual" />
        </div>
      )}
      {urls.map((u, i) => rects.images[i] && (
        <div key={i} className="lay-img" data-lay="img" data-lay-i={i} style={pctStyle(rects.images[i])}>
          <img src={u} alt="" draggable={false} />
          {badges?.[i]?.mark && <span className="ia-key lay-badge">{badges[i].mark}</span>}
          {badges?.[i]?.caption && <span className="ia-text lay-cap">{badges[i].caption}</span>}
        </div>
      ))}
      {rects.tiles && tiles && tiles.length === rects.tiles.length && tiles.map((t, i) => <LayTile key={t.key + i} k={t.key} text={t.text} rect={rects.tiles![i]} i={i} />)}
      {rects.timer && timer && <LayTimer rect={rects.timer}>{timer}</LayTimer>}
    </div>
  )
}

/** Ручная раскладка ЭКРАНА ОТВЕТА: подложка «Правильный ответ» (text), картинки ответа, пояснение (note). Ответы команд и шары остаются штатными. */
export function ManualAnswer({ theme, answer, note, urls, rects, noteNode, plate }: { theme: string | undefined; answer: string; note: string | null; urls: string[]; rects: Rects; noteNode?: (text: string) => React.ReactNode
  /** «3 попытки»: вместо «ПРАВИЛЬНЫЙ ОТВЕТ» + слова в рамке `text` лежат буквенные ячейки ответа (RevealCells) */
  plate?: React.ReactNode }) {
  const area = sceneAreaCss(theme)
  const fit = useFitText<HTMLDivElement>([answer, rects.text?.w, rects.text?.h], { range: () => { const vh = window.innerHeight; const h = rects.text ? rects.text.h * vh : 0; return { min: Math.max(14, vh * 0.02), max: Math.max(20, Math.min(h * 0.55, vh * 0.1)) } } })
  if (!area) return null
  return (
    <div className="lay-area lay-answer-area" data-lay-area="1" style={area}>
      {rects.text && plate && (
        <div className="lay-text lay-cells" data-lay="text" style={pctStyle(rects.text)}>{plate}</div>
      )}
      {rects.text && !plate && (
        <div className="lay-text lay-answer answer-block" data-lay="text" style={pctStyle(rects.text)}>
          <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
          <div className="answer-main" ref={fit}>{answer}</div>
        </div>
      )}
      {rects.note && note && (
        <div className="lay-anote" data-lay="note" style={pctStyle(rects.note)}>{noteNode ? noteNode(note) : <div className="answer-note">{note}</div>}</div>
      )}
      {urls.map((u, i) => rects.images[i] && (
        <div key={i} className="lay-img" data-lay="img" data-lay-i={i} style={pctStyle(rects.images[i])}><img src={u} alt="" draggable={false} /></div>
      ))}
    </div>
  )
}

/** «3 попытки»: рамки картинок по ИХ индексам (видны только открытые в этой фазе) — буквенные ячейки остаются в своей зоне потока. */
export function ManualPics({ theme, items, rects }: { theme: string | undefined; items: { i: number; url: string }[]; rects: Rects }) {
  const area = sceneAreaCss(theme)
  if (!area) return null
  return (
    <div className="lay-area" data-lay-area="1" style={area}>
      {items.map(({ i, url }) => rects.images[i] && (
        <div key={i} className="lay-img" data-lay="img" data-lay-i={i} style={pctStyle(rects.images[i])}><img src={url} alt="" draggable={false} /></div>
      ))}
    </div>
  )
}
