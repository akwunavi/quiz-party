import type { InfoSlide } from '../types/quiz'
import type { PackStats } from '../lib/duration'
import { useFitText } from '../hooks/useFitText'

export type RoundLine = { id: string; name: string; count: number }
type BlockKey = 'media' | 'meta' | 'label'

function formatMinutes(total: number): string {
  if (total < 60) return `~${total} мин`
  const h = Math.floor(total / 60)
  const m = total % 60
  return m > 0 ? `~${h} ч ${m} мин` : `~${h} ч`
}

/** Правила (если есть) больше не участвуют в этой сетке — они полосой на
 *  всю ширину НАД ней (см. .ib-rules-band в JSX ниже). Здесь остаются
 *  только картинка и доп.блок раундов/статистики — их максимум два, и
 *  раскладка либо «рядом» (left/right — порядок в `present`), либо
 *  «друг под другом» (full — свой заказчик для случая, когда рядом тесно). */
function buildGrid(present: BlockKey[], layout: 'left' | 'right' | 'full') {
  const letter = new Map(present.map((k, i) => [k, String.fromCharCode(97 + i)]))
  const areaOf = (k: BlockKey) => letter.get(k) ?? '.'
  if (present.length <= 1) {
    return { columns: '1fr', rows: '1fr', areas: [areaOf(present[0])], areaOf }
  }
  if (layout === 'full') {
    return { columns: '1fr', rows: '1fr 1fr', areas: present.map(areaOf), areaOf }
  }
  return { columns: '1fr 1fr', rows: '1fr', areas: [present.map(areaOf).join(' ')], areaOf }
}

export function InfoSlideView({ slide, rounds, stats, mediaUrl }: {
  slide: InfoSlide
  rounds: RoundLine[]
  stats?: PackStats
  mediaUrl: (p: string) => string
}) {
  const lines = (slide.body ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  const imgs = slide.images ?? []
  const layout = slide.layout ?? 'left'
  const showRounds = !!slide.show_rounds && rounds.length > 0
  const showStats = !!slide.show_stats && !!stats
  const hasMeta = showRounds || showStats
  const hasNote = !!slide.note?.trim()
  const hasMedia = imgs.length > 0
  const hasRules = lines.length > 0

  /* Без картинки блок раундов/статистики раньше занимал вторую строку
     ОДИН, во всю ширину — рядом с полосой правил над ним это смотрелось
     пусто, «не играет». Слева от него — большой заголовок «ПРАВИЛА» тем
     же языком глитча, что у других заголовков экрана (.neon-title,
     см. 15-projector-interactive.css), просто заполняет пару и держит
     раскладку симметричной. Появляется только когда нечем занять место —
     если есть картинка, она и так уже даёт вторую колонку. `layout`
     («слева»/«справа») тут ни при чём: это поле про картинку, а не про
     заголовок, поэтому порядок для label+meta не зависит от него. */
  const present: BlockKey[] = hasMedia
    ? (layout === 'right' ? [...(hasMeta ? (['meta'] as const) : []), 'media']
      : ['media', ...(hasMeta ? (['meta'] as const) : [])])
    : (hasMeta ? ['label', 'meta'] : [])

  const fitRules = useFitText<HTMLUListElement>([lines.length, present.length === 0])
  const fitMeta = useFitText<HTMLDivElement>(
    [rounds.length, showRounds, showStats, present.length])

  if (!hasRules && present.length === 0 && !hasNote) {
    return (
      <div className={`host-screen grid-bg info-screen lay-${layout}`}>
        <div className="host-topbar"><span className="mono-tag">{slide.title || 'ПРАВИЛА'}</span></div>
      </div>
    )
  }

  const grid = buildGrid(present, layout)

  const blockNode = (key: BlockKey) => {
    switch (key) {
      case 'label':
        return (
          <div key={key} className="info-block ib-label" style={{ gridArea: grid.areaOf('label') }}>
            <span className="neon-title ib-label-text">{slide.title || 'ПРАВИЛА'}</span>
          </div>
        )
      case 'media':
        return (
          <div key={key} className={`q-media-grid n${Math.min(imgs.length, 4)}${
            imgs.length > 1 ? ' eq-row' : ''} info-media`} style={{ gridArea: grid.areaOf('media') }}>
            {imgs.map((m, i) => (
              <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" /></figure>
            ))}
          </div>
        )
      case 'meta':
        return (
          <div key={key} className="info-block ib-meta" style={{ gridArea: grid.areaOf('meta') }}>
            <div className="ib-meta-fit" ref={fitMeta}>
              {showRounds && (
                <div className="info-rounds">
                  {rounds.map((r, i) => (
                    <div key={r.id} className="info-round">
                      <span className="ir-num">{i + 1}</span>
                      <span className="ir-name">{r.name}</span>
                      <span className="ir-count">{r.count} вопр.</span>
                    </div>
                  ))}
                </div>
              )}
              {showStats && (
                <ul className="info-stats">
                  <li>Раундов: {stats!.roundsCount}</li>
                  <li>Вопросов: {stats!.questionsCount}</li>
                  {stats!.hasMiniGame && <li>Мини-игра: 1</li>}
                  {stats!.musicTracks > 0 && <li>Музыкальных треков: {stats!.musicTracks} шт</li>}
                  <li>Примерное время игры: {formatMinutes(stats!.totalMinutes)}</li>
                </ul>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`host-screen grid-bg info-screen lay-${layout}${hasMedia ? ' has-media' : ''}`}
      data-blocks={present.length}>
      <div className="host-topbar">
        <span className="mono-tag">{slide.title || 'ПРАВИЛА'}</span>
      </div>
      <div className="info-stack">
        {hasRules && (
          <div className={`info-block ib-rules-band${present.length === 0 ? ' solo' : ''}`}>
            <ul className="info-list" ref={fitRules}>
              {lines.map((l, i) => (
                <li key={i} style={{ animationDelay: `${0.12 * i}s` }}>{l}</li>
              ))}
            </ul>
          </div>
        )}
        {present.length > 0 && (
          <div className="info-body" style={{
            gridTemplateColumns: grid.columns, gridTemplateRows: grid.rows,
            gridTemplateAreas: grid.areas.map(r => `"${r}"`).join(' '),
          }}>
            {present.map(blockNode)}
          </div>
        )}
      </div>
      {hasNote && <div className="info-note-corner">{slide.note}</div>}
    </div>
  )
}
