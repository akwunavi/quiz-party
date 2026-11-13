// ═══ «Книга»: ЕДИНЫЙ таймер (утверждённые ассеты public/ny-book/timer_face.webp + timer-ring-hi.webp) ═══
// Плашка-пергамент с колокольчиком и бантом (без цифр) — пропорции 315×330 не искажаются; внутри — золотое кольцо, под кольцом CSS-дуга остатка времени
// (conic-gradient по --f), поверх — динамические цифры ТОЛЬКО секунд. Состояния: идёт (дуга красная), «мало» (≤10 с: дуга и цифры краснее, кольцо «теплеет»),
// конец (0: цифры красные, дуга пуста). Логика отсчёта — не здесь (Timer.tsx передаёт готовый NyTimer).
import type { CSSProperties } from 'react'
import type { NyTimer } from '../types'

export const TIMER_RATIO = 1

export function BookTimer({ t }: { t: NyTimer }) {
  return (
    <div className={`bk-tm${t.low ? ' is-low' : ''}${t.zero ? ' is-zero' : ''}${t.running ? ' is-run' : ''}`} style={{ '--f': t.frac } as CSSProperties} role="timer" aria-label={`Осталось ${t.left} с`}>
      <span className="bk-tm-arc" />
      <img className="bk-tm-ring" src={`${import.meta.env.BASE_URL}ny-book/timer-ring-hi.webp`} alt="" draggable={false} />
      <b key={t.left} className="bk-tm-num">{t.left}</b>
    </div>
  )
}
