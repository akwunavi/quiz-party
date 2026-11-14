// ═══ «Книга»: ЕДИНЫЙ таймер по утверждённому образцу timer-sample-0049 ═══
// Основа — public/ny-book/timer-plate.webp (из assets-src/derived: образец без цифр и дуги — золотая рамка, пергамент, песочные часы, венок со снегом, бант, ягоды, шишка);
// поверх: красная CSS-дуга остатка по окружности внутри рамки (conic-gradient по --f) и цифры секунд HTML по центру пергамента (без минут).
// Состояния: идёт, «мало» (≤10 с: дуга и цифры краснее, свечение), конец (0). Логика отсчёта — не здесь (Timer.tsx передаёт готовый NyTimer).
import type { CSSProperties } from 'react'
import type { NyTimer } from '../types'

export const TIMER_RATIO = 1010 / 990

export function BookTimer({ t }: { t: NyTimer }) {
  return (
    <div className={`bk-tm${t.low ? ' is-low' : ''}${t.zero ? ' is-zero' : ''}${t.running ? ' is-run' : ''}`} style={{ '--f': t.frac } as CSSProperties} role="timer" aria-label={`Осталось ${t.left} с`}>
      <img className="bk-tm-face" src={`${import.meta.env.BASE_URL}ny-book/timer-plate.webp`} alt="" draggable={false} />
      <span className="bk-tm-arc" />
      <b key={t.left} className="bk-tm-num" data-len={String(t.left).length}>{t.left}</b>
    </div>
  )
}
