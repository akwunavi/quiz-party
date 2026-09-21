// ═══ Картинка-вариант в ряду, выравненном по высоте ═══
// Вынесено из HostScreen.tsx (9.51) — общий узел для проектора и
// предпросмотра в редакторе.
import { useState, type CSSProperties, type ReactNode } from 'react'

/** Картинка-вариант в ряду, выравненном по высоте.
 *  Та же механика, что у FitImg: ширину карточки задаёт пропорция снимка,
 *  поэтому при общей высоте ряда все варианты выглядят одинаково крупными.
 *  Раньше выравнивание было сделано только для сеток вопроса, а варианты
 *  с картинками остались рваными — недосмотр, а не решение. */
export function FitAnswer({ src, badge, children }: {
  src: string; badge: string; children?: ReactNode
}) {
  const [ar, setAr] = useState(1.5)
  return (
    <div className="img-answer" style={{ flexGrow: ar, flexBasis: 0 } as CSSProperties}>
      <span className="ia-frame">
        <span className="ia-key">{badge}</span>
        <img src={src} alt="" onLoad={e => {
          const el = e.currentTarget
          if (el.naturalWidth && el.naturalHeight) setAr(el.naturalWidth / el.naturalHeight)
        }} />
      </span>
      {children}
    </div>
  )
}
