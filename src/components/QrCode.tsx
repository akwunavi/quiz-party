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
export default function QrCode({ value, className, title, quiet, ink }: {
  value: string
  className?: string
  title?: string
  /** Белая подложка и тихая зона в 4 модуля (требование стандарта) — для тем,
   *  где QR стоит на своей плитке (новогодние темы), а не на прозрачном фоне. */
  quiet?: boolean
  /** Цвет модулей; по умолчанию var(--accent) — подхватывает тему. */
  ink?: string
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
      viewBox={quiet ? `-4 -4 ${matrix.size + 8} ${matrix.size + 8}` : `0 0 ${matrix.size} ${matrix.size}`}
      style={{ aspectRatio: '1 / 1', shapeRendering: 'crispEdges' }}
      role="img"
      aria-label={title ?? 'QR-код'}
    >
      {title && <title>{title}</title>}
      {quiet && <rect x={-4} y={-4} width={matrix.size + 8} height={matrix.size + 8} fill="#ffffff" />}
      {cells.map(c => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} fill={ink ?? 'var(--accent)'} />
      ))}
    </svg>
  )
}
