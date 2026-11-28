// ═══ «Книга»: пояснение к ответу — ЕДИНЫЙ вид на всех экранах ответа (10.76) ═══
// Сверху мелкая красная разрядка «ПОЯСНЕНИЕ» (как «ПРАВИЛЬНЫЙ ОТВЕТ» на свитке, но мельче), под ней тонкий золотой разделитель с ромбиком (как под заголовком
// раунда), ниже курсивный текст по центру цветом чернил. Без подложки, без рамок, без цветных полос (зелёная полоса `.answer-note` — остаток киберпанка).
// Кегль подгоняется под ДОСТУПНУЮ высоту блока (useFitText, диапазон): длинное пояснение не режется и не вылезает. Блок, у которого высоту задаёт рамка
// ручной раскладки (`.lay-anote`), занимает рамку целиком; в потоке — ровно по содержимому.
import { useFitText } from '../../hooks/useFitText'
import { bookUnit } from './adaptive/safeArea'

function Head() {
  return (
    <>
      <div className="bk-note-label">ПОЯСНЕНИЕ</div>
      <div className="bk-note-rule bk-rt-rule" aria-hidden="true"><i /><b>❖</b><i /></div>
    </>
  )
}

export function BookNote({ text, className = '' }: { text: string; className?: string }) {
  const fit = useFitText<HTMLParagraphElement>([text], { range: () => {
    const u = bookUnit({ w: window.innerWidth, h: window.innerHeight })
    return { min: 14 * u, max: 27 * u }
  } })
  return (
    <div className="bk-note-box">
      <Head />
      {/* область подгона — отдельный блок под подписью и разделителем: подгон меряет ЕЁ высоту, а не всего блока */}
      <div className="bk-note-fit"><p ref={fit} className={`answer-note bk-note ${className}`}>{text}</p></div>
    </div>
  )
}

/** То же оформление без подгона кегля — для плашки «Скрэмбла», где размер задаёт сама плашка. */
export function BookNoteStatic({ text }: { text: string }) {
  return (
    <div className={`bk-note-box is-static${text.length > 260 ? ' is-xs' : text.length > 150 ? ' is-s' : ''}`}>
      <Head />
      <div className="bk-note-fit"><p className="answer-note bk-note">{text}</p></div>
    </div>
  )
}
