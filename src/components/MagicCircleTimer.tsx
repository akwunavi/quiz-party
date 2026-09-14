// ═══ «Магический круг» — таймер темы Magic (шаг 15: комета по орбите) ═══
// Было: 8 рун гасли по кругу статичными скачками opacity — ни одна не
// двигалась сама по себе, пока не истекали последние секунды (см. HANDOFF
// §3bl). Ведущий в живой игре назвал это «безжизненно». Теперь по кольцу
// мерцают звёзды-метки (крутятся всегда, независимо от отсчёта — «жизнь»
// не завязана на секунды), а «комета» с хвостом из тающих точек облетает
// круг ровно за отведённое время и гасит звёзды на своём пути — прогресс
// читается и по положению кометы, и по числу погасших звёзд одновременно.
// Никакой франшизной символики — только отвлечённые звёзды и свет.
// Сигнатура — та же, что была у прежней версии/у SnakeTimer (left/seconds/
// low), подключается на любое место без переделки вызывающего кода.
const STARS = 16
const TRAIL = 6

export function MagicCircleTimer({ left, seconds, low }: {
  left: number; seconds: number; low: boolean
}) {
  const total = Math.max(1, seconds)
  const elapsed = Math.max(0, Math.min(1, 1 - left / total))
  const angle = elapsed * 360
  const C = 100, R = 78
  const pos = (deg: number) => {
    const rad = (deg - 90) * Math.PI / 180
    return { x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) }
  }
  return (
    <div className={`mg-circle-timer${low ? ' low' : ''}`}>
      <div className="mg-circle-glow" aria-hidden />
      <svg viewBox="0 0 200 200" aria-hidden>
        <circle cx={C} cy={C} r={R} fill="none"
          stroke="rgba(201,166,104,.22)" strokeWidth="1" strokeDasharray="2 7" />
        {Array.from({ length: STARS }, (_, i) => {
          const a = i * (360 / STARS)
          const { x, y } = pos(a)
          // погасла, если комета уже прошла этот угол
          const dim = a < angle - 0.01
          return (
            <circle key={i} cx={x} cy={y} r={dim ? 1.5 : 2.6}
              className={`mg-star${dim ? ' dim' : ''}`}
              style={{ animationDelay: `${-(a / 360) * 2.6}s` }} />
          )
        })}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '100px 100px' }}>
          {Array.from({ length: TRAIL }, (_, i) => {
            const { x, y } = pos(-i * 5.5)
            const t = i / TRAIL
            return (
              <circle key={i} cx={x} cy={y}
                r={i === 0 ? 4.4 : Math.max(0.6, 3.4 * (1 - t))}
                className={i === 0 ? 'mg-comet-head' : 'mg-comet-tail'}
                style={{ opacity: i === 0 ? 1 : Math.max(0.06, 0.55 * (1 - t)) }} />
            )
          })}
        </g>
      </svg>
      <span className={`mg-circle-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
}
