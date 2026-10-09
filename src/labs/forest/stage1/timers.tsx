// ═══ Этап 1 — лесные таймеры ═══
// Все таймеры только РИСУЮТ число, которое им дали (логика отсчёта игры не меняется).
// Три состояния у каждого: обычное, последние 10 секунд (warning), ноль.
//  · Одуванчик — утверждённый таймер леса: семя улетает с каждым отрезком времени;
//    в тревогу оставшиеся семена дрожат и теплеют, на нуле — голая головка, стебель никнет.
export type TPhase = 'normal' | 'warning' | 'zero'
export const tphase = (n: number): TPhase => (n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal')
const pt = (a: number, r: number) => [Math.cos(a) * r, Math.sin(a) * r] as const

/** Розетка листьев одуванчика у земли: ланцетные листья с «львиными зубцами», в перспективе. */
function rosette(base: number) {
  const leaves = [-160, -128, -52, -18, 196, 228].map((deg, i) => ({ a: (deg * Math.PI) / 180, L: 120 + (i % 3) * 26 }))
  return leaves.map(({ a, L }, li) => {
    const T = 6, W = 22, pts: string[] = []
    for (const sd of [1, -1]) {
      const ks = Array.from({ length: T + 1 }, (_, k) => (sd === 1 ? k : T - k))
      for (const k of ks) {
        const t = k / T, w = W * Math.pow(Math.sin(Math.PI * Math.min(t, 0.98)), 0.7) * (0.6 + 0.4 * t)
        const tip = (tt: number, ww: number) => { const x = Math.cos(a) * L * tt - Math.sin(a) * ww * sd, y = Math.sin(a) * L * tt + Math.cos(a) * ww * sd; return `${x.toFixed(1)} ${(base + y * 0.34).toFixed(1)}` }
        pts.push(tip(t, w))
        if (k > 0 && k < T) pts.push(tip(t - 0.55 / T, w * 0.45))
      }
    }
    const mid = `M 0 ${base} L ${(Math.cos(a) * L * 0.9).toFixed(1)} ${(base + Math.sin(a) * L * 0.9 * 0.34).toFixed(1)}`
    return <g key={li} className={`tm-ros l${li % 3}`}><path d={`M ${pts.join(' L ')} Z`} /><path className="tm-ros-rib" d={mid} /></g>
  })
}

export function Dandelion({ n, total, size = 300, seeds = 30, label, hideNum, rooted = 0, stem = 350 }: { n: number; total: number; size?: number; seeds?: number; label?: string; hideNum?: boolean; /** длина стебля от центра головы до земли (единиц рисунка); по умолчанию 350 */ stem?: number; /** насколько (в единицах рисунка) стебель уходит вниз к земле; >0 — с розеткой листьев и травой */ rooted?: number }) {
  const ph = tphase(n), left = n <= 0 ? 0 : Math.max(1, Math.ceil((n / total) * seeds))
  const R = 118, droop = ph === 'zero', base = stem + rooted, H = base + 170
  return (
    <svg className={`tm-dand is-${ph}${rooted ? ' rooted' : ''}`} viewBox={`-170 -170 340 ${H}`} width={size} height={size * H / 340} aria-label={`Осталось ${n} секунд`}>
      <defs>
        <radialGradient id="tmd-back"><stop offset=".35" stopColor="#6ed2b9" stopOpacity={droop ? 0.05 : 0.22} /><stop offset="1" stopColor="#6ed2b9" stopOpacity="0" /></radialGradient>
        <radialGradient id="tmd-core"><stop offset=".55" stopColor="#03100d" stopOpacity=".92" /><stop offset="1" stopColor="#03100d" stopOpacity="0" /></radialGradient>
      </defs>
      {rooted > 0 && <>
        <ellipse className="tm-ground" cx="0" cy={base + 6} rx="150" ry="26" />
        {rosette(base)}
      </>}
      {rooted > 0 ? <>
        <path className="tm-stem-back" d={droop ? `M 0 ${base} C -8 ${base - rooted * 0.6} 34 230 22 96` : `M 0 ${base} C -12 ${base - rooted * 0.6} 18 210 0 80`} />
        <path className="tm-stem tm-stem-hi" d={droop ? `M 0 ${base} C -8 ${base - rooted * 0.6} 34 230 22 96` : `M 0 ${base} C -12 ${base - rooted * 0.6} 18 210 0 80`} />
      </> : <path className="tm-stem" d={droop ? 'M 14 350 Q 30 220 22 96' : 'M 0 350 Q 16 220 0 80'} />}
      {rooted > 0 && Array.from({ length: 11 }, (_, k) => { const x = -120 + k * 24 + (k % 3) * 5, h = 22 + (k * 7) % 26; return <path key={k} className="tm-grass" d={`M ${x} ${base + 10} q ${(k % 2 ? 6 : -6)} ${-h * 0.6} ${(k % 2 ? 12 : -10)} ${-h}`} /> })}
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
      {label && <text className="tm-cap" y={440 + rooted} textAnchor="middle">{label}</text>}
    </svg>
  )
}
