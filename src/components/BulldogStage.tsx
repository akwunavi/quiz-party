// Canvas-сцена «Скачки бульдогов» (проектор). Вся логика кадров — lib/bulldog/stage.ts; здесь только жизненный цикл canvas.
import { useEffect, useRef } from 'react'
import { StageRenderer, type StageInput, type StageStats } from '../lib/bulldog/stage'
import { serverNow } from '../lib/serverClock'

export function BulldogStage({ input, onStats }: { input: StageInput; onStats?: (s: StageStats) => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const rend = useRef<StageRenderer | null>(null)
  const inputRef = useRef(input); inputRef.current = input
  useEffect(() => {
    const cv = ref.current!; const r = new StageRenderer(cv, serverNow); rend.current = r; r.setInput(inputRef.current)
    let raf = 0, last = 0
    const loop = (t: number) => {
      r.draw(t)
      if (onStats && t - last > 1000) { last = t; onStats(r.stats) }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); r.destroy(); rend.current = null }     // память: все ImageBitmap закрываются при уходе с экрана
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { rend.current?.setInput(input) })
  return <div className="bulldog-stage"><canvas ref={ref} className="bulldog-canvas" /></div>
}
