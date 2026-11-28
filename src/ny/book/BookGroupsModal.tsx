// ═══ «Книга»: модалка «Составы команд» (рандомайзер) на большом свитке ═══
// Тот же ассет и тот же каркас, что у модалок «Своей игры» и «Угадай мелодию» (ScrollModal, scroll.webp), только свиток шире (растянут по горизонтали)
// и внутри — заголовок золотым тиснением, итог мелко и сетка карточек команд (BookTeamCard + список участников).
// Закрытие — крестик, клик по затемнению и Esc (Esc вешает вызывающий GroupsModal). Данные и ключи не меняются.
import { useEffect, useRef, type CSSProperties } from 'react'
import { ScrollModal } from './ScrollModal'
import { BookTeamCard } from './BookTeamCard'
import { groupsLayout, teamsWord } from './groupsLayout'
import { teamColor } from '../../lib/teamColors'

export function BookGroupsModal({ groups, onClose }: { groups: string[][]; onClose: () => void }) {
  const players = groups.reduce((n, g) => n + g.length, 0)
  const lay = groupsLayout(groups.length)
  // Состав не поместился — сначала ужимаем кегль списка (--gm-k, не мельче 11u: проектор без мыши, прокрутить нечем),
  // и только если и так не влезает — внутри свитка включается прокрутка, а низ мягко гаснет (data-over).
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = scrollRef.current
    const grid = el?.firstElementChild as HTMLElement | null
    if (!el || !grid) return
    const floor = Math.max(0.5, 11 / lay.fs)
    const fit = () => {
      let k = 1
      grid.style.setProperty('--gm-k', '1')
      while (el.scrollHeight > el.clientHeight + 2 && k > floor + 0.001) { k = Math.max(floor, k - 0.04); grid.style.setProperty('--gm-k', k.toFixed(2)) }
      el.dataset.over = el.scrollHeight > el.clientHeight + 2 ? '1' : '0'
    }
    fit()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null
    ro?.observe(el)   // размер области не зависит от --gm-k (flex 1 1 0), поэтому подгонка не зацикливается
    window.addEventListener('resize', fit)
    return () => { ro?.disconnect(); window.removeEventListener('resize', fit) }
  }, [groups, lay.fs])
  return (
    <ScrollModal theme="ny_book" kind="grp" load="l" onClose={onClose}>
      <div className="bk-gm-head">
        <div className="bk-gm-titles">
          <h2 className="bk-gm-title">СОСТАВЫ КОМАНД</h2>
          <span className="bk-gm-sum">{groups.length} {teamsWord(groups.length)} · {players} чел.</span>
        </div>
        <button className="bk-gm-close" onClick={onClose} aria-label="Закрыть">✕</button>
      </div>
      <div className="bk-gm-scroll" ref={scrollRef}>
        <div className="bk-gm-grid" data-count={groups.length} style={{ '--gm-cols': lay.cols, '--gm-fs': lay.fs, '--gm-cw': lay.cell ? `calc(${lay.cell} * var(--u))` : '1fr', ...(lay.tight ? { '--gm-gy': 8, '--gm-in': 4, '--gm-pb': 6 } : {}) } as CSSProperties}>
          {groups.map((g, i) => (
            <div key={i} className="bk-gm-team">
              <BookTeamCard name={`Команда ${i + 1}`} ch={lay.ch} color={teamColor(i)} />
              {g.length
                ? <p className="bk-gm-players">{g.map((p, j) => <span key={j} className="bk-gm-p">{p}</span>)}</p>
                : <p className="bk-gm-players is-empty">состав пока пуст</p>}
            </div>
          ))}
        </div>
      </div>
    </ScrollModal>
  )
}
