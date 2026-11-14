// ═══ Ручная компоновка вопроса — ОДИН механизм для всех тем (lib/layoutRects.ts + lib/layoutArea.ts) ═══
// Контейнер-«рабочая область темы» (поля декора, слот таймера и кнопки не входят) позиционируется абсолютно внутри .host-screen; рамки текста и картинок — в % контейнера.
// Тот же компонент рисует проектор и предпросмотр редактора. Текст вписывается useFitText (режим диапазона: только уменьшение, без !important на кегле),
// картинка — object-fit: contain в своей рамке, без растяжения. Внешний вид темы вне ручной раскладки не меняется: компонент монтируется ТОЛЬКО когда layout валиден.
import type { CSSProperties } from 'react'
import { WindText } from './QuestionText'
import { layoutAreaCss } from '../lib/layoutArea'
import type { Rect, Rects } from '../lib/layoutRects'

export const pctStyle = (r: Rect): CSSProperties => ({ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` })

export function ManualLayout({ theme, text, urls, rects, seed }: { theme: string | undefined; text: string; urls: string[]; rects: Rects; seed: string }) {
  const area = layoutAreaCss(theme)
  if (!area) return null
  const range = () => {
    const vh = window.innerHeight
    const hPx = rects.text ? rects.text.h * vh * 0.72 : 0    // 72vh — высота рабочей области обычных тем (у Книги близко: 0.69)
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
        </div>
      ))}
    </div>
  )
}
