import { useEffect, useState } from 'react'

export function Timer({ startedAt, seconds }: { startedAt: string | null; seconds: number }) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    if (!startedAt) { setLeft(seconds); return }
    const tick = () => {
      const elapsed = (Date.now() - new Date(startedAt).getTime()) / 1000
      setLeft(Math.max(0, Math.ceil(seconds - elapsed)))
    }
    tick()
    const t = setInterval(tick, 250)
    return () => clearInterval(t)
  }, [startedAt, seconds])
  const danger = left <= 10
  return (
    <div style={{
      fontSize: '3rem', fontVariantNumeric: 'tabular-nums', fontWeight: 700,
      color: danger ? '#f43f5e' : 'inherit',
    }}>{left}</div>
  )
}
