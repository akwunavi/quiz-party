// ═══ AdaptiveMedia: 1–4 картинки по реальным пропорциям (ADAPTIVE.md) — только «Книга» ═══
// Контейнер заполняет отведённое место; после загрузки берутся naturalWidth/Height, planMedia (чистая функция) считает ячейки и рамки
// ТОЧНО по пропорции файла (никакого растяжения), подписи — на одной линии. Прозрачные PNG/WebP — без подложки (data-alpha).
// Пока файлы не загружены, контейнер невидим (нет прыжка раскладки); если файл не грузится 2.5 с — показываем что есть.
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { hasAlpha } from '../../../lib/imgAlpha'
import { FOLD_GAP, bookUnit } from './safeArea'
import { planMedia } from './mediaPlan'

export interface MediaItem { src: string; marker?: string; caption?: string }

export function AdaptiveMedia({ items, spansFold = false, lettered = false }: {
  items: MediaItem[]
  /** контейнер лежит на обеих страницах → колонки разводятся на ширину сгиба */
  spansFold?: boolean
  /** есть маркеры/подписи → под каждой картинкой зона подписи одной высоты */
  lettered?: boolean
}) {
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [ratios, setRatios] = useState<(number | null)[]>(() => items.map(() => null))
  const [alpha, setAlpha] = useState<boolean[]>(() => items.map(() => false))
  const [late, setLate] = useState(false)
  const key = items.map(i => i.src).join('|')
  useEffect(() => { setRatios(items.map(() => null)); setAlpha(items.map(() => false)); setLate(false)
    const t = window.setTimeout(() => setLate(true), 2500); return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  useLayoutEffect(() => {
    const el = box.current; if (!el) return
    const measure = () => setSize(s => (s.w === el.clientWidth && s.h === el.clientHeight ? s : { w: el.clientWidth, h: el.clientHeight }))
    measure()
    const ro = new ResizeObserver(measure); ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const u = bookUnit({ w: window.innerWidth, h: window.innerHeight })
  const ready = ratios.every(r => r != null) || late
  const plan = planMedia({
    ratios: ratios.map(r => r ?? 1.5), width: size.w, height: size.h, gap: 20 * u,
    colGap: spansFold ? FOLD_GAP * u : 20 * u, captionH: lettered ? 64 * u : 0,
  })
  return (
    <div ref={box} className="bk-media" data-bk-container="media" data-ready={ready ? '1' : '0'} style={{ opacity: ready ? 1 : 0 }}>
      {plan.map((p, i) => (
        <figure key={i} className="bk-cell" style={{ left: p.cell.x, top: p.cell.y, width: p.cell.w, height: p.cell.h } as CSSProperties}>
          <div className="bk-photo" data-alpha={alpha[i] ? '' : undefined}
            style={{ left: p.photo.x - p.cell.x, top: p.photo.y - p.cell.y, width: p.photo.w, height: p.photo.h }}>
            <img src={items[i].src} alt="" data-bk-photo draggable={false} onLoad={e => {
              const im = e.currentTarget
              if (im.naturalWidth && im.naturalHeight) setRatios(r => r.map((x, k) => (k === i ? im.naturalWidth / im.naturalHeight : x)))
              setAlpha(a => a.map((x, k) => (k === i ? hasAlpha(im) : x)))
            }} />
          </div>
          {p.caption && (
            <figcaption className="bk-cap" style={{ top: p.caption.y - p.cell.y, height: p.caption.h }}>
              {items[i].marker && <span className="bk-cap-key">{items[i].marker}</span>}
              {items[i].caption && <span className="bk-cap-text">{items[i].caption}</span>}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
