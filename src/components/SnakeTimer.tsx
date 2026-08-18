// ═══ Круговой таймер-ЗМЕЯ (тема «Волшебная школа») ═══
// Змея обвивает круг и ползёт к собственному хвосту: хвост закреплён вверху,
// голова идёт по часовой стрелке и в момент 0 смыкается с хвостом (уроборос).
// Тело — один <path> (лента с переменной толщиной), поэтому кадр стоит одну
// правку атрибута: анимация плавная даже на слабом проекторном ноуте.
import { useEffect, useRef, useState } from 'react'

const C = 100          // центр вьюбокса 200×200
const R = 72           // радиус кольца
const N = 260          // сэмплов вдоль тела
const WMAX = 12.5      // полутолщина тела у шеи
const WAVES = 9        // «волны» тела (лёгкая чешуйчатая волнистость)
const AMP = 0.9        // амплитуда волны, px
const ARC0 = 80        // стартовая длина тела в градусах

type Geom = { body: string; mid: string; hx: number; hy: number; rot: number }

function build(elapsed: number, phase: number): Geom {
  const arc = ARC0 + Math.max(0, Math.min(1, elapsed)) * (360 - ARC0)
  const head = -90 + arc                       // хвост закреплён в 12 часов
  const pts: { cx: number; cy: number; nx: number; ny: number; w: number }[] = []
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1)                      // 0 — голова, 1 — кончик хвоста
    const ang = ((head - t * arc) * Math.PI) / 180
    // толщина: шея чуть тоньше головы, максимум на 20% длины, к хвосту — остриё
    const w = WMAX * (t < 0.2 ? 0.86 + 0.14 * (t / 0.2) : 1 - 0.97 * Math.pow((t - 0.2) / 0.8, 1.9))
    const rr = R + AMP * Math.sin(2 * Math.PI * (t * WAVES) + phase)
    const cx = C + rr * Math.cos(ang), cy = C + rr * Math.sin(ang)
    const nx = Math.cos(ang), ny = Math.sin(ang)
    pts.push({ cx, cy, nx, ny, w })
  }
  const outer = pts.map(p => `${(p.cx + p.nx * p.w).toFixed(2)},${(p.cy + p.ny * p.w).toFixed(2)}`)
  const inner = pts.slice().reverse()
    .map(p => `${(p.cx - p.nx * p.w).toFixed(2)},${(p.cy - p.ny * p.w).toFixed(2)}`)
  const h = pts[0], h2 = pts[8]
  return {
    body: `M${outer.join('L')}L${inner.join('L')}Z`,
    mid: `M${pts.map(p => `${p.cx.toFixed(2)},${p.cy.toFixed(2)}`).join('L')}`,
    hx: h.cx, hy: h.cy,
    rot: (Math.atan2(h.cy - h2.cy, h.cx - h2.cx) * 180) / Math.PI,
  }
}

export function SnakeTimer({ left, seconds, low }: { left: number; seconds: number; low: boolean }) {
  const elapsed = 1 - Math.max(0, Math.min(1, left / Math.max(1, seconds)))
  // фаза ползёт сама по себе: тело «переливается», голова остаётся на месте
  const [phase, setPhase] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    let stop = false
    const loop = () => {
      if (stop) return
      setPhase(-(Date.now() / 700) % (Math.PI * 2))
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => { stop = true; cancelAnimationFrame(raf.current) }
  }, [])
  const g = build(elapsed, phase)
  const uid = low ? 'lo' : 'ok'
  return (
    <div className={`snake-timer${low ? ' low' : ''}`}>
      <svg viewBox="0 0 200 200" aria-hidden>
        <defs>
          <linearGradient id={`sn-g-${uid}`} x1="0" y1="0" x2=".3" y2="1">
            <stop offset="0" stopColor={low ? '#c2593f' : '#3ab97c'} />
            <stop offset=".45" stopColor={low ? '#8d2f22' : '#177a4a'} />
            <stop offset="1" stopColor={low ? '#521410' : '#0b4229'} />
          </linearGradient>
          <clipPath id={`sn-c-${uid}`}><path d={g.body} /></clipPath>
          <filter id={`sn-f-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3"
              floodColor={low ? '#b23a2a' : '#0f7a4d'} floodOpacity=".55" />
          </filter>
        </defs>
        {/* путь, по которому ползёт змея */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="#d3a62526"
          strokeWidth="1.2" strokeDasharray="2 8" />
        <g filter={`url(#sn-f-${uid})`}>
          <path d={g.body} fill={`url(#sn-g-${uid})`} stroke="#06301c" strokeWidth="1.1" />
          <g clipPath={`url(#sn-c-${uid})`}>
            {/* чешуя: тёмные пояса + блик по хребту, оба следуют изгибу тела */}
            <path d={g.mid} fill="none" stroke="#062e1c" strokeWidth="26"
              strokeDasharray="5 10" opacity=".34" />
            <path d={g.mid} fill="none" stroke="#8ff0c0" strokeWidth="3.4" opacity=".22" />
            <path d={g.mid} fill="none" stroke="#062e1c" strokeWidth="26"
              strokeDasharray="1.6 14" opacity=".34" />
          </g>
          {/* голова: клиновидная морда, золотые глаза со щелевидным зрачком, язык */}
          <g transform={`translate(${g.hx.toFixed(2)},${g.hy.toFixed(2)}) rotate(${g.rot.toFixed(2)})`}>
            <path d="M17.5,0 Q15,-6.4 6,-9.6 Q-4,-12.4 -11,-10 L-11,10 Q-4,12.4 6,9.6 Q15,6.4 17.5,0 Z"
              fill={low ? '#a83c2c' : '#1f8a55'} stroke="#06301c" strokeWidth="1.1" />
            <path d="M17.5,0 Q9,-3 -8,-3.4 L-8,3.4 Q9,3 17.5,0 Z" fill="#0d4f31" opacity=".55" />
            <path className="sn-tongue" d="M17,0 l12,-4.5 M17,0 l12,4.5"
              stroke="#e0243a" strokeWidth="2.1" fill="none" strokeLinecap="round" />
            <ellipse cx="1" cy="-6" rx="3.6" ry="3.1" fill="#f7cf55" stroke="#06301c" strokeWidth=".8" />
            <ellipse cx="1" cy="6" rx="3.6" ry="3.1" fill="#f7cf55" stroke="#06301c" strokeWidth=".8" />
            <ellipse cx="1.8" cy="-6" rx="1" ry="2.4" fill="#101010" />
            <ellipse cx="1.8" cy="6" rx="1" ry="2.4" fill="#101010" />
            <circle cx="13" cy="-2.6" r=".9" fill="#06301c" />
            <circle cx="13" cy="2.6" r=".9" fill="#06301c" />
          </g>
        </g>
      </svg>
      <span className={`snake-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
}
