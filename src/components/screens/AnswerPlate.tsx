// ═══ Плашка «ПРАВИЛЬНЫЙ ОТВЕТ» — ОДИН компонент для всех мест, где она рисуется (проектор, AnswerScreen, предпросмотр, ручная рамка `text`) ═══
// Другие темы: прежняя разметка (подпись + слово, как было до 10.75) — без обёрток и классов, вид не меняется.
// «Книга»: горизонтальный свиток с бантом и хвоей (hscroll-bow.webp, 9-slice — рулоны не тянутся). Красная разрядка мелко сверху, ответ — на пергаменте
// по центру; высота свитка — ступень по длине ответа (ny/book/answerPlate.ts), кегль внутри — useFitText. Хук живёт в BookAnswerPlate —
// собственном компоненте без ранних return (React #310).
import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useFitText } from '../../hooks/useFitText'
import { bookUnit } from '../../ny/book/adaptive/safeArea'
import { answerFitRange, answerPlateSize } from '../../ny/book/answerPlate'

const LABEL = 'ПРАВИЛЬНЫЙ ОТВЕТ'

function BookAnswerPlate({ answer, label, frame }: { answer: string; label: string; frame: boolean }) {
  const box = useRef<HTMLDivElement | null>(null)
  const fit = useFitText<HTMLDivElement>([answer, frame], { range: () => {
    const u = bookUnit({ w: window.innerWidth, h: window.innerHeight })
    return answerFitRange(box.current?.clientHeight ?? 0, u, frame ? null : 66)
  } })
  const style = frame ? undefined : ({ '--sh': `calc(${answerPlateSize(answer.trim().length)} * var(--u))` } as CSSProperties)
  return (
    <div className={`answer-plate${frame ? ' ap-frame' : ''}`} style={style}>
      <div className="answer-label">{label}</div>
      <div className="ap-fit" ref={box}><div className="answer-main" ref={fit}>{answer}</div></div>
    </div>
  )
}

export function AnswerPlate({ book, answer, label = LABEL, between, frame = false }: {
  book: boolean; answer: string; label?: string
  /** видео/звук ответа: в прежних темах — между подписью и словом (как было), в «Книге» — под свитком */
  between?: ReactNode
  /** ручная рамка `text`: размер свитка — от рамки (CSS, cqh/cqw), а не ступень по длине */
  frame?: boolean
}) {
  if (book) return <><BookAnswerPlate answer={answer} label={label} frame={frame} />{between}</>
  return (
    <>
      <div className="answer-label">{label}</div>
      {between}
      <div className={`answer-main${answer.length > 70 ? ' am-xl' : answer.length > 36 ? ' am-l' : ''}`}>{answer}</div>
    </>
  )
}
