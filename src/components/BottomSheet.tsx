import type { ReactNode } from 'react'

/** Универсальная шторка снизу для мобильных экранов игрока — вместо
 *  инлайн-раскладки на весь экран (раньше цвета/значки занимали место
 *  постоянно, даже когда игрок их уже выбрал). Закрывается тапом по
 *  подложке или крестиком, без стейта — открытость решает вызывающий код. */
export function BottomSheet({ title, onClose, children }: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="pl-sheet-backdrop" onClick={onClose}>
      <div className="pl-sheet" onClick={e => e.stopPropagation()}>
        <div className="pl-sheet-head">
          <span>{title}</span>
          <button type="button" className="pl-sheet-close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>
        <div className="pl-sheet-body">{children}</div>
      </div>
    </div>
  )
}
