// ═══ Новогодняя сцена: слои графики для проектора ═══
// Дальние ёлки-силуэты + сугробы (SVG), гирлянда с мерцанием (SVG+CSS),
// снегопад с параллаксом (canvas). Всё — декоративный слой, логики не касается.
import { useEffect, useRef } from 'react'

export function NewYearScene() {
  return (
    <>
      <Garland />
      <Forest />
      <Snowfall />
    </>
  )
}

/** Гирлянда по верхней кромке: провис-кривая + лампочки, мерцающие вразнобой. */
function Garland() {
  const bulbs = Array.from({ length: 22 }, (_, i) => i)
  const colors = ['#ff5a5f', '#ffd166', '#7cc7ff', '#8ce99a', '#f9a8d4']
  return (
    <svg className="ny-garland" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden>
      <path d="M0,10 Q125,70 250,20 T500,20 T750,20 T1000,10"
        fill="none" stroke="#2f4f2f" strokeWidth="2.5" />
      {bulbs.map(i => {
        const t = i / (bulbs.length - 1)
        const x = t * 1000
        // повторяем форму провиса синусом — лампочки «сидят» на проводе
        const y = 18 + Math.abs(Math.sin(t * Math.PI * 4)) * 34
        return (
          <g key={i}>
            <line x1={x} y1={y - 6} x2={x} y2={y} stroke="#2f4f2f" strokeWidth="1.5" />
            <circle className="ny-bulb" cx={x} cy={y + 5} r="6"
              fill={colors[i % colors.length]}
              style={{ animationDelay: `${(i % 5) * 0.4 + Math.random() * 0.3}s` }} />
          </g>
        )
      })}
    </svg>
  )
}

/** Ёлочный лес силуэтом + снежные наносы по нижней кромке. */
function Forest() {
  const trees = [
    { x: 60, s: 1.0, o: .30 }, { x: 180, s: 1.5, o: .22 }, { x: 320, s: .85, o: .34 },
    { x: 700, s: 1.25, o: .26 }, { x: 850, s: .95, o: .32 }, { x: 950, s: 1.6, o: .20 },
  ]
  return (
    <svg className="ny-forest" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden>
      {trees.map((t, i) => (
        <g key={i} transform={`translate(${t.x},${300 - 150 * t.s}) scale(${t.s})`} opacity={t.o}>
          <path d="M40,0 L70,55 L54,55 L82,105 L60,105 L92,155 L-12,155 L20,105 L-2,105 L26,55 L10,55 Z"
            fill="#bfe3ff" />
        </g>
      ))}
      {/* наносы: три перекрывающихся волны */}
      <path d="M0,300 C120,258 210,286 320,268 C450,246 520,282 640,266 C760,250 860,280 1000,262 L1000,300 Z"
        fill="#e8f4ff" opacity=".14" />
      <path d="M0,300 C160,276 260,296 400,282 C540,268 660,294 800,280 C900,270 950,286 1000,278 L1000,300 Z"
        fill="#f2f9ff" opacity=".10" />
    </svg>
  )
}

/** Снегопад: три слоя с разной скоростью/размером — эффект глубины. */
function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = innerWidth, h = canvas.height = innerHeight
    const onResize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight }
    addEventListener('resize', onResize)

    // три слоя параллакса: дальний мелкий и медленный, ближний крупный и быстрый
    const layers = [
      { n: 45, r: [0.8, 1.6], s: [0.25, 0.5], a: 0.35, sway: 14 },
      { n: 30, r: [1.8, 2.8], s: [0.6, 1.0], a: 0.6, sway: 22 },
      { n: 14, r: [3.2, 5.0], s: [1.1, 1.8], a: 0.85, sway: 34 },
    ]
    const flakes = layers.flatMap((L, li) =>
      Array.from({ length: L.n }, () => ({
        li, x: Math.random() * w, y: Math.random() * h,
        r: L.r[0] + Math.random() * (L.r[1] - L.r[0]),
        s: L.s[0] + Math.random() * (L.s[1] - L.s[0]),
        phase: Math.random() * Math.PI * 2,
        swaySpeed: 0.4 + Math.random() * 0.6,
      })))

    let raf = 0, t = 0
    const tick = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        const L = layers[f.li]
        ctx.globalAlpha = L.a
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        const drift = Math.sin(t * f.swaySpeed + f.phase) * L.sway
        ctx.arc(f.x + drift, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
        f.y += f.s
        if (f.y > h + 6) { f.y = -6; f.x = Math.random() * w }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} className="ny-snow" />
}

/** Снежная штора между экранами (переход). */
export function SnowCurtain({ trigger }: { trigger: string }) {
  return <div key={trigger} className="ny-curtain" aria-hidden />
}
