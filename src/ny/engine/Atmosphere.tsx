// ═══ Атмосфера фона новогодних тем (ANIM-01, уровень «Живой», 10.39) ═══
// Лёгкий слой ПОД игровой вёрсткой (внутри бэкдропа): пылинки в медленном луче света, мягкое мерцание окон домика
// («Книга»), искорки; в «Тёплом доме» — тёплые пылинки и дыхание света. Текст он не перекрывает (игровая вёрстка и
// плашки лежат выше), «уменьшить движение» и скрытая вкладка — слой замирает/не рисует.
import { useEffect, useRef } from 'react'
import { useStage } from './stage'

const W = 1920, H = 1080

export function Atmosphere({ theme }: { theme: 'ny_book' | 'ny_home' }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const { reduced } = useStage()
  useEffect(() => {
    const c = ref.current
    const g = c?.getContext('2d')
    if (!c || !g) return
    const book = theme === 'ny_book'
    const N = 80
    const P = Array.from({ length: N }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 1.2 + Math.random() * 2.6, v: .12 + Math.random() * .3, ph: Math.random() * 6.28 }))
    const dust = book ? '255,244,205' : '255,214,150'
    const beam = book ? '255,236,170' : '255,196,120'
    let raf = 0
    const t0 = performance.now()
    const draw = (t: number) => {
      g.clearRect(0, 0, W, H)
      const bx = ((t * 40) % 2600) - 400
      const lg = g.createLinearGradient(bx, 0, bx + 500, 700)
      lg.addColorStop(0, `rgba(${beam},0)`); lg.addColorStop(.5, `rgba(${beam},.09)`); lg.addColorStop(1, `rgba(${beam},0)`)
      g.fillStyle = lg; g.fillRect(0, 0, W, H)
      for (const p of P) {
        const x = (p.x + Math.sin(t * .4 + p.ph) * 40 + t * 6) % W
        const y = (p.y - t * p.v * 40 + H * 400) % H
        const near = Math.max(0, 1 - Math.abs((x - bx) - y * .7) / 320)
        g.fillStyle = `rgba(${dust},${(.22 + .5 * near) * (.5 + .5 * Math.sin(t * 1.3 + p.ph))})`
        g.beginPath(); g.arc(x, y, p.r, 0, 6.28); g.fill()
      }
      if (book) {
        // мягкое мерцание окон домика (центры окон в координатах сцены)
        for (const wx of [899, 1028]) {
          const a = .3 + .2 * Math.sin(t * 1.6 + wx)
          const rg = g.createRadialGradient(wx, 820, 4, wx, 820, 120)
          rg.addColorStop(0, `rgba(255,214,120,${a})`); rg.addColorStop(1, 'rgba(255,214,120,0)')
          g.fillStyle = rg; g.fillRect(wx - 130, 690, 260, 260)
        }
        // редкие искорки на снегу над гирляндой
        for (let i = 0; i < 26; i++) {
          const k = i * 77.7, x = (k * 13.1) % W, y = 160 + (k * 7.3) % 120
          const a = Math.max(0, Math.sin(t * 2.2 + k)) ** 6 * .9
          g.fillStyle = `rgba(255,255,255,${a})`; g.fillRect(x - 5, y - 1, 10, 2); g.fillRect(x - 1, y - 5, 2, 10)
        }
      } else {
        // «Тёплый дом»: дыхание тёплого света по центру комнаты
        const a = .10 + .06 * Math.sin(t * .9)
        const rg = g.createRadialGradient(W / 2, H * .55, 80, W / 2, H * .55, 760)
        rg.addColorStop(0, `rgba(255,190,110,${a})`); rg.addColorStop(1, 'rgba(255,190,110,0)')
        g.fillStyle = rg; g.fillRect(0, 0, W, H)
      }
    }
    if (reduced) { draw(8); return }
    const loop = () => {
      if (!document.hidden) draw((performance.now() - t0) / 1000)
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [theme, reduced])
  return <canvas ref={ref} width={W} height={H} aria-hidden="true" className="ny-atmos" />
}
