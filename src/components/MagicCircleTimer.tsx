// ═══ «Магический круг» — таймер темы Magic ═══
// Восемь абстрактных рун по кругу гаснут по часовой стрелке по мере того,
// как истекает время (left/seconds), последняя мерцает перед нулём.
// Никакой франшизной символики — только отвлечённые метки-«деления».
// Сигнатура — та же, что у SnakeTimer (left/seconds/low), чтобы подключаться
// на любое место без переделки вызывающего кода.
const RUNES = 8

export function MagicCircleTimer({ left, seconds, low }: {
  left: number; seconds: number; low: boolean
}) {
  const total = Math.max(1, seconds)
  const elapsed = Math.max(0, Math.min(1, 1 - left / total))
  const C = 100, R1 = 60, R2 = 78
  const marks = Array.from({ length: RUNES }, (_, i) => {
    const from = i / RUNES, to = (i + 1) / RUNES
    if (elapsed <= from) return 1
    if (elapsed >= to) return 0
    return 1 - (elapsed - from) / (to - from)
  })
  // руна, которая ГАСНЕТ прямо сейчас (частично лита) — та, что мерцает
  // в последние секунды, а не случайная
  const fadingIndex = marks.findIndex(l => l > 0 && l < 1)
  return (
    <div className={`mg-circle-timer${low ? ' low' : ''}`}>
      <svg viewBox="0 0 200 200" aria-hidden>
        <circle cx={C} cy={C} r={(R1 + R2) / 2} fill="none"
          stroke="rgba(201,166,104,.22)" strokeWidth="1" strokeDasharray="2 7" />
        {marks.map((lit, i) => {
          const angle = (-90 + i * (360 / RUNES)) * (Math.PI / 180)
          const x1 = C + R1 * Math.cos(angle), y1 = C + R1 * Math.sin(angle)
          const x2 = C + R2 * Math.cos(angle), y2 = C + R2 * Math.sin(angle)
          const dx = C + (R2 + 10) * Math.cos(angle), dy = C + (R2 + 10) * Math.sin(angle)
          const isFading = low && i === fadingIndex
          return (
            <g key={i} className={`mg-rune${isFading ? ' fading' : ''}`}
              style={{ opacity: Math.max(lit, 0.14) }}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} strokeLinecap="round" strokeWidth="4"
                stroke={lit > 0 ? '#f3dfa8' : '#544a38'} />
              <circle cx={dx} cy={dy} r="4" fill={lit > 0 ? '#f3dfa8' : '#544a38'} />
            </g>
          )
        })}
      </svg>
      <span className={`mg-circle-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
}
