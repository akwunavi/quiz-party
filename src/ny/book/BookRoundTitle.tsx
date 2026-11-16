// ═══ «Книга»: заголовок заставки раунда — золотое тиснение, хвойная веточка с бантом сверху, орнаментный разделитель снизу ═══
// Целиком в зоне ОДНОЙ страницы (ширина зоны меньше полустраницы — через сгиб не заходит). Кегль подбирается замером (useFitText, режим диапазона: наибольший, при котором
// заголовок помещается в зону по ширине и высоте), длинные слова получают мягкие переносы по слогам (lib/softHyphen.ts), а не уменьшаются до мелких. Перенос — только
// между словами или по слогам; одно слово не режется посреди слога. Анимаций нет (глитч киберпанка в «Книге» отключён), reduced-motion учитывать нечего.
import { useEffect, useMemo, useState } from 'react'
import { useFitText } from '../../hooks/useFitText'
import { softHyphenate } from '../../lib/softHyphen'
import { bookUnit } from './adaptive/safeArea'

export function BookRoundTitle({ lines, size = 'lg' }: { lines: string[]; size?: 'lg' | 'sm' }) {
  const text = useMemo(() => lines.map(l => softHyphenate(l)), [lines])
  const [lo, hi] = size === 'lg' ? [30, 132] : [30, 64]
  // Заставка раунда въезжает с transform (масштаб/сдвиг): Range-замер ширины в этот момент искажён и подбор мог уйти в «не влезает». Повторяем подбор, когда вход закончился.
  const [settled, setSettled] = useState(0)
  useEffect(() => { const ts = [window.setTimeout(() => setSettled(1), 400), window.setTimeout(() => setSettled(2), 1600)]; return () => ts.forEach(clearTimeout) }, [])
  const fit = useFitText<HTMLDivElement>([text.join('|'), size, settled], { range: () => {
    const u = bookUnit({ w: window.innerWidth, h: window.innerHeight })
    return { min: lo * u, max: hi * u }
  } })
  return (
    <div className={`bk-rt bk-rt-${size}`}>
      <div className="bk-rt-orn" aria-hidden="true">
        <i className="bk-rt-sprig l" /><svg className="bk-rt-bow" viewBox="0 0 120 70" focusable="false">
          <path className="lp" d="M60 36 C40 4 8 6 8 28 C8 52 40 52 60 36Z" /><path className="lp" d="M60 36 C80 4 112 6 112 28 C112 52 80 52 60 36Z" />
          <path className="tl" d="M54 40 L36 68 L50 62 L58 44Z" /><path className="tl" d="M66 40 L84 68 L70 62 L62 44Z" /><ellipse className="kn" cx="60" cy="37" rx="9" ry="10" />
        </svg><i className="bk-rt-sprig r" />
      </div>
      <div className="bk-rt-box">
        {/* не <h1 class="neon-title">: общие правила заставки раунда (кегль !important, глитч киберпанка) на этот заголовок не должны действовать */}
        <div ref={fit} className="bk-rt-h" role="heading" aria-level={1} lang="ru">
          {text.map((l, i) => <span key={i} className="bk-rt-line">{l}<br /></span>)}
        </div>
      </div>
      <div className="bk-rt-rule" aria-hidden="true"><i /><b>❖</b><i /></div>
    </div>
  )
}
