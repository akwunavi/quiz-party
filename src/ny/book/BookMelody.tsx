// ═══ «Книга»: выбор трека в «Угадай мелодию» — ТРИ объёмные обложки по утверждённому ассету (public/ny-book/cover-*.webp) ═══
// Названия категорий и номера треков — динамические (HTML поверх картинки); плитки лежат в пергаментных панелях обложки (до 4 треков),
// при 5–6 треках — сетка 2×N поверх панелей. Сыгранный трек — приглушён, размыт, содержимое скрыто (подписей «сыграно» нет).
import type { CSSProperties } from 'react'

const COVERS = ['red', 'green', 'blue'] as const
// доли обложки (по ассету): зона названия и две колонки/две строки панелей плиток
const TITLE = { x: .2, y: .16, w: .74, h: .2 }
const PANEL = { x: [.215, .584], w: .336, y: [.4, .637], h: .213 }

export function BookMelodyCovers({ themes, played, highlighted, onPick, setRef, labelOf, hintOf }: {
  themes: { name: string; tracks: unknown[] }[]
  /** подпись плитки (по умолчанию — номер трека; у «Своей игры» — стоимость) */
  labelOf?: (ti: number, i: number) => string | number
  hintOf?: (ti: number) => string | undefined
  played: string[]
  highlighted: string | null
  onPick?: (key: string) => void
  setRef: (key: string, el: HTMLElement | null) => void
}) {
  const base = import.meta.env.BASE_URL
  return (
    <div className="bk-covs" style={{ '--n': themes.length } as CSSProperties}>
      {themes.map((t, ti) => {
        const n = t.tracks.length, many = n > 4
        const rows = Math.ceil(n / 2)
        return (
          <div key={ti} className="bk-cov" style={{ backgroundImage: `url(${base}ny-book/cover-${COVERS[ti % 3]}.webp)` } as CSSProperties}>
            <div className="bk-cov-title" style={{ left: `${TITLE.x * 100}%`, top: `${TITLE.y * 100}%`, width: `${TITLE.w * 100}%`, height: `${TITLE.h * 100}%` }}><span>{t.name || `Тема ${ti + 1}`}{hintOf?.(ti) && <small>{hintOf(ti)}</small>}</span></div>
            {many && <div className="bk-cov-back" style={{ left: `${(PANEL.x[0] - .012) * 100}%`, top: `${(PANEL.y[0] - .012) * 100}%`, width: `${(PANEL.x[1] + PANEL.w - PANEL.x[0] + .024) * 100}%`, height: `${(PANEL.y[1] + PANEL.h - PANEL.y[0] + .024) * 100}%` }} />}
            {t.tracks.map((_, i) => {
              const key = `${ti}-${i}`, done = played.includes(key), hot = highlighted === key
              const c = i % 2, r = Math.floor(i / 2)
              const st = many
                ? { left: `${PANEL.x[0] * 100}%`, width: `${(PANEL.x[1] + PANEL.w - PANEL.x[0]) / 2 * 100 - 1}%`, marginLeft: c ? `${((PANEL.x[1] + PANEL.w - PANEL.x[0]) / 2) * 100 + 1}%` : 0,
                    top: `${(PANEL.y[0] + (PANEL.y[1] + PANEL.h - PANEL.y[0]) * r / rows) * 100}%`, height: `${((PANEL.y[1] + PANEL.h - PANEL.y[0]) / rows - .012) * 100}%` }
                : { left: `${PANEL.x[c] * 100}%`, width: `${PANEL.w * 100}%`, top: `${PANEL.y[r] * 100}%`, height: `${PANEL.h * 100}%` }
              return (
                <button key={key} type="button" className={`bk-cov-tile${done ? ' is-used' : ''}${hot ? ' is-hot' : ''}${many ? ' is-many' : ''}`} style={st as CSSProperties}
                  disabled={!onPick || done} ref={el => setRef(key, el)} onClick={onPick ? () => onPick(key) : undefined} aria-label={`${t.name} · трек ${i + 1}`}>
                  <span>{labelOf ? labelOf(ti, i) : i + 1}</span>
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
