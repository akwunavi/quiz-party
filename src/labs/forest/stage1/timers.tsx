// ═══ Этап 1 — лесные таймеры ═══
// Все таймеры только РИСУЮТ число, которое им дали (логика отсчёта игры не меняется).
// Три состояния у каждого: обычное, последние 10 секунд (warning), ноль.
//  · Одуванчик — утверждённый таймер леса: семя улетает с каждым отрезком времени;
//    в тревогу оставшиеся семена дрожат и теплеют, на нуле — голая головка, стебель никнет.
//  · Кольцо бутонов — 12 цветков вокруг числа; каждые 10 с один закрывается в бутон.
//  · Лоза — горизонтальная ветвь, листья облетают от кончика к основанию.
//  · Луна — убывает с временем; в тревогу краснеет, на нуле — новолуние с тонким ободком.
export type TPhase = 'normal' | 'warning' | 'zero'
export const tphase = (n: number): TPhase => (n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal')
const pt = (a: number, r: number) => [Math.cos(a) * r, Math.sin(a) * r] as const

export function Dandelion({ n, total, size = 300, seeds = 30, label, hideNum }: { n: number; total: number; size?: number; seeds?: number; label?: string; hideNum?: boolean }) {
  const ph = tphase(n), left = n <= 0 ? 0 : Math.max(1, Math.ceil((n / total) * seeds))
  const R = 118, droop = ph === 'zero'
  return (
    <svg className={`tm-dand is-${ph}`} viewBox="-170 -170 340 520" width={size} height={size * 520 / 340} aria-label={`Осталось ${n} секунд`}>
      <defs>
        <radialGradient id="tmd-back"><stop offset=".35" stopColor="#6ed2b9" stopOpacity={droop ? 0.05 : 0.22} /><stop offset="1" stopColor="#6ed2b9" stopOpacity="0" /></radialGradient>
        <radialGradient id="tmd-core"><stop offset=".55" stopColor="#03100d" stopOpacity=".92" /><stop offset="1" stopColor="#03100d" stopOpacity="0" /></radialGradient>
      </defs>
      <path className="tm-stem" d={droop ? 'M 14 350 Q 30 220 22 96' : 'M 0 350 Q 16 220 0 80'} />
      <g className="tm-head" transform={droop ? 'translate(16 18) rotate(8)' : undefined}>
        <circle r={R * 1.5} fill="url(#tmd-back)" />
        {Array.from({ length: seeds }, (_, i) => {
          const a = -Math.PI / 2 + (i / seeds) * Math.PI * 2, gone = i >= left
          const [x1, y1] = pt(a, 80), [x2, y2] = pt(a, R), [ax, ay] = pt(a, 74)
          return (
            <g key={i} className={`tm-seed${gone ? ' gone' : ''}`} style={{ ['--dx' as string]: `${90 + (i % 5) * 14}px`, ['--dy' as string]: `${-120 - (i % 7) * 12}px`, ['--d' as string]: `${(i % 6) * 0.07}s` }}>
              <ellipse cx={ax} cy={ay} rx="5" ry="2" transform={`rotate(${(a * 180) / Math.PI} ${ax} ${ay})`} className="tm-achene" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} className="tm-beak" />
              {Array.from({ length: 9 }, (_, k) => { const b = a + (k - 4) * 0.11, [ex, ey] = [x2 + Math.cos(b) * 18, y2 + Math.sin(b) * 18]; return <line key={k} x1={x2} y1={y2} x2={ex} y2={ey} className="tm-tuft" /> })}
            </g>
          )
        })}
        <circle r="76" fill="url(#tmd-core)" />
        {droop && Array.from({ length: 36 }, (_, k) => { const a = k * 2.4, d = Math.sqrt(k / 36) * 44; return <circle key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r="1.6" className="tm-pit" /> })}
        {!hideNum && <text className="tm-num" y="2" dominantBaseline="middle" textAnchor="middle">{Math.max(0, n)}</text>}
      </g>
      {label && <text className="tm-cap" y="440" textAnchor="middle">{label}</text>}
    </svg>
  )
}

/** Кольцо из 12 цветков: каждый — 10 секунд. Закрывшийся — бутон. */
export function BudRing({ n, total = 120, size = 360 }: { n: number; total?: number; size?: number }) {
  const ph = tphase(n), buds = 12, open = n <= 0 ? 0 : Math.ceil((n / total) * buds)
  return (
    <svg className={`tm-ring is-${ph}`} viewBox="-200 -200 400 400" width={size} height={size} aria-label={`Осталось ${n} секунд`}>
      <defs><radialGradient id="tmr-core"><stop offset=".5" stopColor="#03100d" stopOpacity=".9" /><stop offset="1" stopColor="#03100d" stopOpacity="0" /></radialGradient></defs>
      <circle r="150" className="tm-ring-vine" />
      {Array.from({ length: buds }, (_, i) => {
        const a = -Math.PI / 2 + (i / buds) * Math.PI * 2, [x, y] = pt(a, 150), isOpen = i < open, last = isOpen && i === open - 1
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`} className={`tm-bud${isOpen ? ' open' : ''}${last ? ' last' : ''}`}>
            <path className="tm-bud-leaf" d="M 0 8 C -16 2 -18 -8 -8 -12 C -2 -6 0 0 0 8 Z" />
            <path className="tm-bud-leaf" d="M 0 8 C 16 2 18 -8 8 -12 C 2 -6 0 0 0 8 Z" />
            <g className="tm-petals">{Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx="0" cy="-17" rx="7" ry="15" transform={`rotate(${k * 60} 0 -6)`} />)}</g>
            <circle cy="-6" r="6" className="tm-bud-core" />
          </g>
        )
      })}
      <circle r="118" fill="url(#tmr-core)" />
      <text className="tm-num" y="4" dominantBaseline="middle" textAnchor="middle">{Math.max(0, n)}</text>
    </svg>
  )
}

/** Лоза-часы: листья облетают от кончика к основанию. */
export function VineTimer({ n, total, width = 1200 }: { n: number; total: number; width?: number }) {
  const ph = tphase(n), leaves = 40, keep = n <= 0 ? 0 : Math.ceil((n / total) * leaves)
  const y = (x: number) => 40 + Math.sin(x / 90) * 10
  return (
    <svg className={`tm-vine is-${ph}`} viewBox={`0 0 ${width} 90`} width={width} height="90" aria-label={`Осталось ${n} секунд`}>
      <path className="tm-vine-stem" d={`M 0 ${y(0)} ${Array.from({ length: 41 }, (_, i) => `L ${(i / 40) * (width - 20)} ${y((i / 40) * (width - 20))}`).join(' ')}`} />
      {Array.from({ length: leaves }, (_, i) => {
        const x = 20 + (i / leaves) * (width - 60), up = i % 2 === 0, gone = i >= keep
        return <path key={i} className={`tm-vleaf${gone ? ' gone' : ''}`} style={{ ['--d' as string]: `${(i % 5) * 0.05}s` }}
          d={`M ${x} ${y(x)} c 6 ${up ? -18 : 18} 24 ${up ? -22 : 22} 30 ${up ? -6 : 6} c -10 ${up ? 6 : -6} -22 ${up ? 8 : -8} -30 ${up ? 6 : -6} z`} />
      })}
    </svg>
  )
}

/** Луна убывает вместе со временем. */
export function MoonTimer({ n, total, size = 260 }: { n: number; total: number; size?: number }) {
  const ph = tphase(n), f = Math.max(0, Math.min(1, n / total)), R = 100
  // терминатор: эллипс, ширина которого идёт от +R (полная) к −R (новолуние)
  const k = (f * 2 - 1) * R
  const lit = f <= 0 ? '' : `M 0 ${-R} A ${R} ${R} 0 0 1 0 ${R} A ${Math.abs(k)} ${R} 0 0 ${k >= 0 ? 1 : 0} 0 ${-R} Z`
  return (
    <svg className={`tm-moon is-${ph}`} viewBox="-140 -140 280 280" width={size} height={size} aria-label={`Осталось ${n} секунд`}>
      <defs><radialGradient id="tmm-glow"><stop offset=".6" stopColor="#cfe9df" stopOpacity=".25" /><stop offset="1" stopColor="#cfe9df" stopOpacity="0" /></radialGradient>
        <radialGradient id="tmm-face" cx=".4" cy=".35"><stop offset="0" stopColor="#f4f1e2" /><stop offset=".8" stopColor="#c9cdbd" /><stop offset="1" stopColor="#9aa497" /></radialGradient></defs>
      <circle r="138" fill="url(#tmm-glow)" className="tm-moon-glow" />
      <circle r={R} className="tm-moon-dark" />
      {lit && <path d={lit} fill="url(#tmm-face)" className="tm-moon-lit" />}
      <circle r={R} className="tm-moon-rim" />
      <text className="tm-num" y="4" dominantBaseline="middle" textAnchor="middle">{Math.max(0, n)}</text>
    </svg>
  )
}
