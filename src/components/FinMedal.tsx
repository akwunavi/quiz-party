// ═══ Медаль у места в итоговой таблице (DESIGN-01, 10.38) ═══
// Круглая медаль-розетка с лентой и звездой — золото/серебро/бронза. Показывается только в новогодних темах
// (`.fin-medal` скрыт по умолчанию, включается в 41/43-файлах), в остальных темах таблица прежняя.
const PAL = {
  1: ['#f6d56a', '#b8861b', '#7b5410'],
  2: ['#eef2f6', '#9aa7b4', '#5b6671'],
  3: ['#ecae7a', '#a8612c', '#6b3a17'],
} as const

export function FinMedal({ place }: { place: 1 | 2 | 3 }) {
  const [l, m, d] = PAL[place]
  const id = `fm${place}`
  let star = ''
  for (let i = 0; i < 10; i++) {
    const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 7 : 17
    star += `${i ? 'L' : 'M'}${(50 + Math.cos(a) * r).toFixed(1)} ${(54 + Math.sin(a) * r).toFixed(1)}`
  }
  return (
    <svg className={`fin-medal m${place}`} viewBox="0 0 100 124" aria-hidden="true">
      <defs><radialGradient id={id} cx="35%" cy="30%"><stop offset="0" stopColor={l} /><stop offset=".6" stopColor={m} /><stop offset="1" stopColor={d} /></radialGradient></defs>
      <path d="M30 56 L18 120 L40 108 L50 123 L60 108 L82 120 L70 56Z" fill="#b3263a" stroke="#7a1626" strokeWidth="2" />
      <circle cx="50" cy="48" r="40" fill={`url(#${id})`} stroke={d} strokeWidth="3" />
      <circle cx="50" cy="48" r="31" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
      <path d={`${star}Z`} transform="translate(0 -6)" fill="rgba(255,255,255,.92)" />
    </svg>
  )
}
