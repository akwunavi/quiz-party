import { useMemo } from 'react'
import { encodeQr } from '../lib/qr'

/**
 * QR-код, нарисованный локально (без внешнего сервиса) — см.
 * `src/lib/qr.ts` и HANDOFF.md, офлайн-устойчивость. Раньше картинка была
 * `<img src="https://api.qrserver.com/...">`: при офлайне (или в будущем
 * локальном режиме без интернета) сервис недоступен и QR в лобби не
 * появлялся вовсе.
 *
 * Тёмные модули красятся через `var(--accent)` — подхватывают тему сами.
 * Фон — прозрачный, его задаёт CSS контейнера-обёртки (см.
 * `.lobby-qr-corner` в `27-lobby.css`, там уже есть белый фон и рамка).
 *
 * ВАЖНО: `<svg>` и `<img>` по-разному считают intrinsic-размеры (`width:
 * auto`/`height: auto` в CSS ведёт себя иначе). Чтобы вписаться в старые
 * правила `.lobby-qr-corner` без их правки, `viewBox` квадратный и задаём
 * `aspectRatio: 1/1` инлайном — это подстраховка, чтобы `height: auto` из
 * CSS сработало так же, как раньше работало для растрового `<img>`.
 */
export default function QrCode({ value, className, title }: {
  value: string
  className?: string
  title?: string
}) {
  const matrix = useMemo(() => encodeQr(value), [value])

  const cells: { x: number; y: number }[] = []
  for (let y = 0; y < matrix.size; y++) {
    for (let x = 0; x < matrix.size; x++) {
      if (matrix.isDark(x, y)) cells.push({ x, y })
    }
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${matrix.size} ${matrix.size}`}
      style={{ aspectRatio: '1 / 1', shapeRendering: 'crispEdges' }}
      role="img"
      aria-label={title ?? 'QR-код'}
    >
      {title && <title>{title}</title>}
      {cells.map(c => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} fill="var(--accent)" />
      ))}
    </svg>
  )
}
