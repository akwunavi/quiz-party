// ═══ «Книга»: ручная компоновка вопроса (рамки текста и картинок по долям рабочей области, lib/layoutRects.ts) ═══
// Тот же компонент рисует проектор и предпросмотр редактора. Рамки — абсолютные, в единицах сцены (--u), внутри .host-screen (position: relative в CSS).
// Текст вписывается useFitText (режим диапазона: только уменьшение, без !important); картинка — object-fit: contain в своей рамке, без растяжения.
import type { CSSProperties } from 'react'
import { WindText } from '../../components/QuestionText'
import { bookUnit } from './adaptive/safeArea'
import { WORK, rectToScene, type Rect, type Rects } from '../../lib/layoutRects'

export function rectStyle(r: Rect): CSSProperties {
  const s = rectToScene(r)
  const u = 'var(--u)'
  return { left: `calc(var(--bk-ox) + ${s.x} * ${u})`, top: `calc(var(--bk-oy) + ${s.y} * ${u})`, width: `calc(${s.w} * ${u})`, height: `calc(${s.h} * ${u})` }
}

export function BookManual({ text, urls, rects, seed }: { text: string; urls: string[]; rects: Rects; seed: string }) {
  const range = () => {
    const u = bookUnit({ w: window.innerWidth, h: window.innerHeight })
    const hPx = rects.text ? rects.text.h * WORK.h * u : 0
    return { min: 22 * u, max: Math.max(24 * u, Math.min(hPx * 0.6, 96 * u)) }
  }
  return (
    <div className="bk-manual" data-bk-manual="1">
      {rects.text && text.trim() && (
        <div className="bk-man-text" data-lay="text" style={rectStyle(rects.text)}>
          <WindText key={seed} text={text} range={range} role="manual" />
        </div>
      )}
      {urls.map((u, i) => rects.images[i] && (
        <div key={i} className="bk-man-img" data-lay="img" data-lay-i={i} style={rectStyle(rects.images[i])}>
          <img src={u} alt="" draggable={false} />
        </div>
      ))}
    </div>
  )
}
