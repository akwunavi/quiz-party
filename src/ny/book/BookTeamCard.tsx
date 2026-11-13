// ═══ «Книга» (ny_book): ОДОБРЕННАЯ карточка команды — один переиспользуемый компонент ═══
// Ассет: public/ny-book/team-card.webp (обрезан без потерь из assets-src/team-card-approved.webp, 1453×662, альфа). Не рисуется CSS: это настоящая картинка,
// разрезанная border-image на три части по горизонтали — левый край (корешок, закладка со снежинкой, кисточка, хвоя и ягоды), растягиваемая середина
// (пергамент и золотые линии — тянутся ТОЛЬКО вдоль) и правый край (скошенный угол). Высота карточки задана, ширина — любая, края не деформируются.
// Имя команды — отдельный HTML-слой строго в полезной области пергамента; кегль подбирает useFitText(range): одна строка крупно или две строки, без многоточия.
import type { CSSProperties } from 'react'
import { useFitText } from '../../hooks/useFitText'
import { bookUnit } from './adaptive/safeArea'

/** Геометрия ассета (пиксели 1453×662): левый край, правый край, полезная область по вертикали. */
export const TC = { w: 1453, h: 662, left: 480, right: 153, top: 100, bottom: 222 } as const
/** Доля высоты карточки, занятая полезной областью пергамента. */
export const TC_INNER = (TC.h - TC.top - TC.bottom) / TC.h

export type TeamCardState = 'normal' | 'selected' | 'correct' | 'wrong' | 'none'

export function BookTeamCard({ name, ch, scene = false, em = false, state = 'normal', score, color, icon, away, className = '' }: {
  name: string
  /** высота карточки: в пикселях сцены 1920×1080 (scene), в «пикселях мокапа» --u или (em) в em — для плотных таблиц, где размер ведёт подгон кегля таблицы */
  ch: number
  scene?: boolean
  em?: boolean
  state?: TeamCardState
  /** очки справа (итоговые таблицы) */
  score?: string | number
  /** цвет команды — маленькая точка слева от имени, кожу не перекрашивает */
  color?: string
  icon?: string | null
  away?: boolean
  className?: string
}) {
  const unit = () => (scene ? 1 : bookUnit({ w: window.innerWidth, h: window.innerHeight }))
  const fit = useFitText<HTMLSpanElement>([name, ch, scene, score, em], { range: () => {
    const inner = ch * unit() * TC_INNER
    return { min: Math.max(9, inner / 2.3), max: Math.max(12, inner / 1.12) }
  } })
  const tch = em ? `${ch}em` : scene ? `${ch}px` : `calc(${ch} * var(--u))`
  const mark = state === 'correct' ? '✓' : state === 'wrong' ? '✗' : state === 'none' ? '…' : null
  return (
    <div className={`bk-tc bk-tc-${state}${em ? ' bk-tc-em' : ''}${em && name.length > 20 ? ' is-long' : ''}${away ? ' is-away' : ''}${className ? ' ' + className : ''}`} data-state={state} style={{ '--tch': tch } as CSSProperties}>
      <span className="bk-tc-box">
        {color && <i className="bk-tc-dot" style={{ background: color }} />}
        <span className="bk-tc-text"><span ref={em ? undefined : fit} className="bk-tc-name" data-bk-text="tc">{icon ? `${icon} ` : ''}{name}</span></span>
        {score != null && <b className="bk-tc-score">{score}</b>}
        {mark && <em className="bk-tc-mark" aria-label={state}>{mark}</em>}
      </span>
    </div>
  )
}
