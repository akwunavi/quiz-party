// ═══ «Книга»: выбор трека в «Угадай мелодию» — ТРИ объёмные обложки по утверждённому ассету (public/ny-book/cover-*.webp) ═══
// Названия категорий и номера треков — динамические (HTML поверх картинки); плитки лежат в пергаментных панелях обложки (до 4 треков),
// при 5–6 треках — сетка 2×N поверх панелей. Сыгранный трек — приглушён, размыт, содержимое скрыто (подписей «сыграно» нет).
import { useEffect, useRef, useState, type CSSProperties } from 'react'

// ── «Бегущая гирлянда + свеча» (рулетка «Угадай мелодию»): только оформление поверх уже выбранного пути подсветки (useMelodySpin); выбор трека и случайность не затронуты ──
const BULBS = 11
/** детерминированный «шум» из строки (искры одного и того же трека повторяются — без Math.random в рендере) */
function hash01(s: string, n: number): number {
  let h = 2166136261 ^ n
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13
  return ((h >>> 0) % 10000) / 10000
}
/** две нити лампочек (сверху и снизу обложки): провисают дугой, зажигаются по очереди слева направо */
function Garland() {
  return (
    <div className="bk-gl" aria-hidden="true">
      {[0, 1].map(row => Array.from({ length: BULBS }, (_, i) => {
        const t = i / (BULBS - 1), sag = 4 * t * (1 - t)
        return <i key={`${row}-${i}`} style={{ '--i': row ? BULBS - 1 - i : i, left: `${5 + t * 90}%`, top: row ? `${95.5 - sag * 1.6}%` : `${2.4 + sag * 1.6}%` } as CSSProperties} />
      }))}
    </div>
  )
}
/** вспышка-искры на выбранном треке и мягкий «искристый снег» над обложкой — живут, пока подсветка стоит на итоге (новый запуск рулетки их пересоздаёт, накопления нет) */
function Sparks({ id }: { id: string }) {
  return (
    <>
      <span className="bk-spk" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => {
          const a = hash01(id, i) * Math.PI * 2, r = 28 + hash01(id, i + 40) * 55
          return <i key={i} style={{ '--dx': `${Math.cos(a) * r}cqw`, '--dy': `${Math.sin(a) * r}cqw`, '--s': `${.5 + hash01(id, i + 80)}` } as CSSProperties} />
        })}
      </span>
    </>
  )
}
function SparkSnow({ id }: { id: string }) {
  return (
    <div className="bk-snow" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => <i key={i} style={{ left: `${3 + hash01(id, i + 120) * 94}%`, '--d': `${1.6 + hash01(id, i + 160) * 1.6}s`, '--w': `${hash01(id, i + 200) * 0.9}s`, '--x': `${(hash01(id, i + 240) - .5) * 8}cqw` } as CSSProperties} />)}
    </div>
  )
}

const COVERS = ['red', 'green', 'blue'] as const
// доли обложки (по ассету): зона названия и две колонки/две строки панелей плиток
const TITLE = { x: .2, y: .16, w: .74, h: .2 }
const PANEL = { x: [.215, .584], w: .336, y: [.4, .637], h: .213 }

export function BookMelodyCovers({ themes, played, highlighted, onPick, setRef, labelOf, hintOf, spinning = false, landed = false }: {
  themes: { name: string; tracks: unknown[] }[]
  /** подпись плитки (по умолчанию — номер трека; у «Своей игры» — стоимость) */
  labelOf?: (ti: number, i: number) => string | number
  hintOf?: (ti: number) => string | undefined
  played: string[]
  highlighted: string | null
  onPick?: (key: string) => void
  setRef: (key: string, el: HTMLElement | null) => void
  /** рулетка идёт — гирлянды бегут, подсвеченная обложка «светится» (только оформление) */
  spinning?: boolean
  /** подсветка встала на выбранный трек — вспышка, искры, обложка «открывается» */
  landed?: boolean
}) {
  const base = import.meta.env.BASE_URL
  // «след свечи»: предыдущая подсвеченная плитка гаснет не мгновенно, а за ~0.5 с — на замедлении рулетки это даёт мягкий шлейф
  const [trail, setTrail] = useState<string | null>(null)
  const prevHot = useRef<string | null>(null)
  useEffect(() => {
    if (!spinning) { prevHot.current = null; setTrail(null); return }
    if (prevHot.current && prevHot.current !== highlighted) setTrail(prevHot.current)
    prevHot.current = highlighted
  }, [spinning, highlighted])
  return (
    <div className={`bk-covs${spinning ? ' is-spinning' : ''}`} style={{ '--n': themes.length } as CSSProperties}>
      {themes.map((t, ti) => {
        const lit = spinning && !!highlighted && highlighted.startsWith(`${ti}-`)
        const won = lit && landed
        const n = t.tracks.length, many = n > 4
        const rows = Math.ceil(n / 2)
        return (
          <div key={ti} className={`bk-cov${lit ? ' is-lit' : ''}${won ? ' is-won' : ''}`} style={{ backgroundImage: `url(${base}ny-book/cover-${COVERS[ti % 3]}.webp)` } as CSSProperties}>
            <div className="bk-cov-title" style={{ left: `${TITLE.x * 100}%`, top: `${TITLE.y * 100}%`, width: `${TITLE.w * 100}%`, height: `${TITLE.h * 100}%` }}><span>{t.name || `Тема ${ti + 1}`}{hintOf?.(ti) && <small>{hintOf(ti)}</small>}</span></div>
            {many && <div className="bk-cov-back" style={{ left: `${(PANEL.x[0] - .012) * 100}%`, top: `${(PANEL.y[0] - .012) * 100}%`, width: `${(PANEL.x[1] + PANEL.w - PANEL.x[0] + .024) * 100}%`, height: `${(PANEL.y[1] + PANEL.h - PANEL.y[0] + .024) * 100}%` }} />}
            {spinning && <Garland />}
            {won && <SparkSnow id={highlighted!} />}
            {t.tracks.map((_, i) => {
              const key = `${ti}-${i}`, done = played.includes(key), hot = highlighted === key
              const c = i % 2, r = Math.floor(i / 2)
              const st = many
                ? { left: `${PANEL.x[0] * 100}%`, width: `${(PANEL.x[1] + PANEL.w - PANEL.x[0]) / 2 * 100 - 1}%`, marginLeft: c ? `${((PANEL.x[1] + PANEL.w - PANEL.x[0]) / 2) * 100 + 1}%` : 0,
                    top: `${(PANEL.y[0] + (PANEL.y[1] + PANEL.h - PANEL.y[0]) * r / rows) * 100}%`, height: `${((PANEL.y[1] + PANEL.h - PANEL.y[0]) / rows - .012) * 100}%` }
                : { left: `${PANEL.x[c] * 100}%`, width: `${PANEL.w * 100}%`, top: `${PANEL.y[r] * 100}%`, height: `${PANEL.h * 100}%` }
              return (
                <button key={key} type="button" className={`bk-cov-tile${done ? ' is-used' : ''}${hot ? ' is-hot' : ''}${hot && landed ? ' is-won' : ''}${spinning && !hot && trail === key ? ' is-trail' : ''}${many ? ' is-many' : ''}`} style={st as CSSProperties}
                  disabled={!onPick || done} ref={el => setRef(key, el)} onClick={onPick ? () => onPick(key) : undefined} aria-label={`${t.name} · трек ${i + 1}`}>
                  <span>{labelOf ? labelOf(ti, i) : i + 1}</span>
                  {hot && landed && <Sparks id={key} />}
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
