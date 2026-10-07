// ═══ Таймер игры в лаборатории: ЛОГИКА как в components/Timer.tsx ═══
// left = max(0, ceil(seconds − elapsed)); «мало времени» — left ≤ 10
// (HostScreen.timeLow и Timer.low); на нуле — гонг (5 пиков + тон) и, если
// показ ответа «после вопроса», автопоказ. Лаборатория меняет только
// СКОРОСТЬ проигрывания (демо) и умеет встать в START / WARNING / ZERO.
import { createContext, useContext } from 'react'
import { useTime } from '../engine/stage'

export type TimerMode = 'run' | 'start' | 'warn' | 'zero'
export const TimerModeCtx = createContext<TimerMode>('run')

export interface GameTimer {
  seconds: number
  /** целые секунды на экране — ровно как Timer.tsx */
  left: number
  /** доля оставшегося времени 0..1 (плавная, для рисования) */
  frac: number
  low: boolean
  zero: boolean
  running: boolean
  /** во сколько раз ускорен показ */
  speed: number
}

/** Демо-скорость: любой таймер проигрывается примерно за 12 секунд. */
export const demoSpeed = (seconds: number) => Math.max(1, Math.round((seconds / 12) * 4) / 4)

export function timerAt(seconds: number, elapsed: number, speed: number, running: boolean): GameTimer {
  const rest = Math.max(0, seconds - elapsed)
  const left = Math.max(0, Math.ceil(rest - 1e-9))
  return { seconds, left, frac: rest / seconds, low: left <= 10, zero: left === 0, running: running && left > 0, speed }
}

/** startAt — секунда сцены, когда таймер «запустили» (в игре — timer_started_at). */
export function useGameTimer(seconds: number, startAt = 0.6, speedOverride?: number): GameTimer {
  const mode = useContext(TimerModeCtx)
  const t = useTime(20)
  const speed = speedOverride ?? demoSpeed(seconds)
  if (mode === 'start') return timerAt(seconds, 0, speed, false)
  if (mode === 'warn') return timerAt(seconds, seconds - 7.5, speed, false)
  if (mode === 'zero') return timerAt(seconds, seconds, speed, false)
  return timerAt(seconds, Math.max(0, (t - startAt) * speed), speed, t >= startAt)
}
