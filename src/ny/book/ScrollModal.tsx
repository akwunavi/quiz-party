// ═══ «Книга»: ЕДИНАЯ свиток-модалка «Угадай мелодию» и «Своей игры» (ассет public/ny-book/scroll.webp ← assets-src/scroll-modal.webp) ═══
// Один компонент на все модальные состояния обеих механик (ставки, прослушивание, ответ, плитка...): портал в body, затемнение, свиток-фон,
// текст и кнопки — обычный HTML внутри (children). Для других тем рисует прежний каркас (то, что было в MelodyRound/JeopardyRound).
// `load` — «тяжесть» содержимого ('m' по умолчанию, 'l' — длинные списки ставок/ответов): свиток чуть крупнее, но не больше экрана.
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode, type Ref } from 'react'
import { createPortal } from 'react-dom'

export type ScrollKind = 'mel' | 'jp'

/** Ступени «ужима» содержимого свитка: масштаб единицы --u внутри `.bk-sm-in` (кегль, отступы, плитки — всё в calc(N * var(--u)), значит ужимается разом). */
export const FIT_STEPS = [1, .94, .88, .82, .76, .7, .64] as const

/** Первая ступень, при которой содержимое помещается в пергаментную область (чистая — для теста): `need(k)` — высота содержимого при масштабе k. */
export function pickFitStep(need: (k: number) => number, room: number): number {
  for (const k of FIT_STEPS) if (need(k) <= room + 1) return k
  return FIT_STEPS[FIT_STEPS.length - 1]
}

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
  const inRef = useRef<HTMLDivElement>(null)
  // «Книга»: содержимое центрируется по пергаменту; если не помещается — ужимается ступенями (на любом экране, не только 1920). Хук — ДО любых return.
  useLayoutEffect(() => {
    const el = inRef.current
    if (!el) return
    const need = (k: number) => { el.style.setProperty('--k', String(k)); return el.scrollHeight }
    const k = pickFitStep(need, el.clientHeight)
    el.style.setProperty('--k', String(k))
    el.dataset.fit = String(k)
  })
  return createPortal(
    book
      ? <div className={`${kind}-overlay mel-overlay bk-scroll-overlay ${th}`}>
          <div ref={modalRef} className={`${kind}-modal mel-modal bk-scroll`} data-load={load} data-kind={kind}><div ref={inRef} className="bk-sm-in">{children}</div></div>
        </div>
      : <div className={`${kind}-overlay ${th}`}>
          <div ref={modalRef} className={`${kind}-modal ${className}`.trim()} style={style}>{children}</div>
        </div>,
    document.body,
  )
}
