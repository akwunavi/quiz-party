// ═══ Ледяная рамка с сосульками (только НГ-тема) ═══
// Вынесено из HostScreen.tsx (9.51) — общий узел для проектора и
// предпросмотра в редакторе.
import { useMemo } from 'react'

/** Ледяная рамка с сосульками (только НГ-тема). */
export function Icicles({ seed, low }: { seed: string; low: boolean }) {
  const items = useMemo(() => {
    let s = 0
    for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
    const n = 60
    return Array.from({ length: n }, (_, i) => ({
      left: (i + 0.5) * (100 / n) + (rnd() - 0.5) * 2.5,
      len: 8 + rnd() * 34,
      delay: rnd() * 0.5,
      sway: 3 + rnd() * 3,
    }))
  }, [seed])
  return (
    <div className="icicles">
      {items.map((it, i) => (
        <span key={i} className="icicle" style={{
          left: `${it.left}%`, height: it.len, ['--len' as string]: `${it.len}px`,
          animationDelay: `${it.delay}s, ${it.delay}s`,
          animationDuration: `${it.sway}s, .7s`,
        }} />
      ))}
    </div>
  )
}
