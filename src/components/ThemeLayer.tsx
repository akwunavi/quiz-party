// ═══ Слой темы: обёртка с CSS-классом + снег для «Нового года» ═══
// Снег — только на проекторе (isProjector), телефоны получают лишь палитру (ТЗ 8б).
import { useEffect, useRef } from 'react'
import type { ThemeKey } from '../types/quiz'

export function ThemeLayer({ theme, isProjector, children }: {
  theme: ThemeKey; isProjector?: boolean; children: React.ReactNode
}) {
  return (
    <div className={`theme-${theme}`}>
      {theme === 'new_year' && isProjector && <Snow />}
      {children}
    </div>
  )
}

function Snow() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = innerWidth, h = canvas.height = innerHeight
    const onResize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight }
    addEventListener('resize', onResize)
    const flakes = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 1 + Math.random() * 2.6, s: .4 + Math.random() * 1.1, drift: Math.random() * .6 - .3,
    }))
    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(255,255,255,.85)'
      for (const f of flakes) {
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill()
        f.y += f.s; f.x += f.drift
        if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w }
        if (f.x > w + 4) f.x = -4
        if (f.x < -4) f.x = w + 4
      }
      raf = requestAnimationFrame(tick)
    }
    // reduced motion — уважение к настройке системы
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} className="snow-canvas" />
}
