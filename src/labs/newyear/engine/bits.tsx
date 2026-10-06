// Мелкие общие детали сцен: QR-заглушка и демо-таймер.
import { useMemo, type CSSProperties } from 'react'
import { rng } from './rng'
import { useTime } from './stage'
import { TIMER_SEC } from '../content'

/** Узор «как QR» (декоративный, не сканируется) — место под настоящий код. */
export function FakeQR({ size, fg, bg, style, className }: { size: number; fg: string; bg: string; style?: CSSProperties; className?: string }) {
  const cells = useMemo(() => {
    const r = rng(4821)
    const N = 25
    const out: [number, number][] = []
    const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7)
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!finder(x, y) && r() < 0.48) out.push([x, y])
    return out
  }, [])
  const N = 25
  const fin = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} fill={fg} />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill={bg} />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill={fg} />
    </g>
  )
  return (
    <svg className={className} style={style} width={size} height={size} viewBox={`-2 -2 ${N + 4} ${N + 4}`} aria-label="QR-код комнаты (макет)">
      <rect x={-2} y={-2} width={N + 4} height={N + 4} fill={bg} rx={1.5} />
      {cells.map(([x, y]) => <rect key={`${x}.${y}`} x={x} y={y} width={1.02} height={1.02} fill={fg} />)}
      {fin(0, 0)}{fin(N - 7, 0)}{fin(0, N - 7)}
    </svg>
  )
}

/** Демо-обратный отсчёт: TIMER_SEC → 0, пауза, по кругу. Логика игрового
 *  таймера не трогается — это только картинка для макета. */
export function useCountdown(total = TIMER_SEC, startDelay = 0.8, hold = 3.5) {
  const t = useTime(20)
  const cycle = total + hold
  const local = Math.max(0, t - startDelay)
  const inCycle = local % cycle
  const elapsed = Math.min(total, inCycle)
  const remaining = total - elapsed
  return {
    remaining,
    sec: Math.ceil(remaining - 1e-6),
    frac: elapsed / total,
    done: inCycle >= total,
    started: t >= startDelay,
  }
}
