// ═══ Настоящий таймер для декоративных таймеров Леса ═══
// Единственный источник времени — `timer_started_at` из общего состояния игры. Здесь та же арифметика, что в components/Timer.tsx
// (целые секунды вверх, «мало» с 10, ноль), но результат — число для рисунка (одуванчик, дерево, цветок): сам рисунок никакого
// отсчёта не ведёт и срок ответа не определяет. Гонг в конце — тот же playChime, ровно один раз на запуск.
import { useEffect, useRef, useState } from 'react'
import { playChime } from '../components/Timer'

export type ForestTimer = { left: number; frac: number; running: boolean; zero: boolean; low: boolean }
export function useRealTimer(startedAt: string | null, seconds: number, chime = true): ForestTimer {
  const [st, setSt] = useState<ForestTimer>({ left: seconds, frac: 1, running: false, zero: false, low: false })
  const rang = useRef(false)
  useEffect(() => {
    if (!startedAt) { setSt({ left: seconds, frac: 1, running: false, zero: false, low: false }); rang.current = false; return }
    const tick = () => {
      const elapsed = (Date.now() - new Date(startedAt).getTime()) / 1000
      const left = Math.max(0, Math.ceil(seconds - elapsed)), frac = Math.max(0, Math.min(1, (seconds - elapsed) / seconds))
      setSt(p => (p.left === left && Math.abs(p.frac - frac) < 0.004 ? p : { left, frac, running: left > 0, zero: left === 0, low: left <= 10 }))
      if (left === 0 && chime && !rang.current) { rang.current = true; playChime() }
    }
    tick()
    const t = setInterval(tick, 100)
    return () => clearInterval(t)
  }, [startedAt, seconds, chime])
  return st
}
