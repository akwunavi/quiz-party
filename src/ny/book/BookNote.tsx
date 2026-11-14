// ═══ «Книга»: пояснение к ответу — кегль подгоняется под ДОСТУПНУЮ высоту подложки (useFitText, диапазон), текст не режется и не вылезает ═══
import { useFitText } from '../../hooks/useFitText'
import { bookUnit } from './adaptive/safeArea'

export function BookNote({ text, className = '' }: { text: string; className?: string }) {
  const fit = useFitText<HTMLParagraphElement>([text], { range: () => {
    const u = bookUnit({ w: window.innerWidth, h: window.innerHeight })
    return { min: 14 * u, max: 27 * u }
  } })
  return <div className="bk-note-box"><p ref={fit} className={`answer-note bk-note ${className}`}>{text}</p></div>
}
