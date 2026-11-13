// ═══ «Книга»: ЕДИНАЯ свиток-модалка «Угадай мелодию» и «Своей игры» (ассет public/ny-book/scroll.webp ← assets-src/scroll-modal.webp) ═══
// Один компонент на все модальные состояния обеих механик (ставки, прослушивание, ответ, плитка...): портал в body, затемнение, свиток-фон,
// текст и кнопки — обычный HTML внутри (children). Для других тем рисует прежний каркас (то, что было в MelodyRound/JeopardyRound).
// `load` — «тяжесть» содержимого ('m' по умолчанию, 'l' — длинные списки ставок/ответов): свиток чуть крупнее, но не больше экрана.
import type { CSSProperties, ReactNode, Ref } from 'react'
import { createPortal } from 'react-dom'

export type ScrollKind = 'mel' | 'jp'

export function ScrollModal({ theme, kind, load = 'm', modalRef, className = '', style, children }: {
  theme: string | undefined
  kind: ScrollKind
  load?: 'm' | 'l'
  modalRef?: Ref<HTMLDivElement>
  /** классы прежнего каркаса (hud-frame, qt-grow…) — в «Книге» не нужны */
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const book = theme === 'ny_book'
  const th = `theme-${theme ?? 'classic'}`
  return createPortal(
    book
      ? <div className={`${kind}-overlay mel-overlay bk-scroll-overlay ${th}`}>
          <div ref={modalRef} className={`${kind}-modal mel-modal bk-scroll`} data-load={load} data-kind={kind}>{children}</div>
        </div>
      : <div className={`${kind}-overlay ${th}`}>
          <div ref={modalRef} className={`${kind}-modal ${className}`.trim()} style={style}>{children}</div>
        </div>,
    document.body,
  )
}
