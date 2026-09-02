import type { InfoSlide } from '../types/quiz'
import type { PackStats } from '../lib/duration'

// ═══ ВНЕШНИЙ ВИД СЛАЙДА-БРИФИНГА ═══
//
// Вынесен отдельно НАРОЧНО: этой же разметкой рисуется и проектор, и превью
// в редакторе. Иначе превью показывало бы «примерно похожее», а ведущий
// узнавал бы о том, как слайд выглядит на самом деле, уже при гостях.
// Здесь нет ни загрузки данных, ни навигации — только показ.

export type RoundLine = { id: string; name: string; count: number }

/** «85» → «1 ч 25 мин», «40» → «40 мин» — коротко и понятно с одного взгляда. */
function formatMinutes(total: number): string {
  if (total < 60) return `~${total} мин`
  const h = Math.floor(total / 60)
  const m = total % 60
  return m > 0 ? `~${h} ч ${m} мин` : `~${h} ч`
}

export function InfoSlideView({ slide, rounds, stats, mediaUrl }: {
  slide: InfoSlide
  rounds: RoundLine[]
  /** Сводная статистика пакета — блок «Раундов/Вопросов/…». Опционален:
   *  показывается только если slide.show_stats и есть что считать. */
  stats?: PackStats
  /** Преобразование пути в адрес — снаружи, чтобы файл не тянул Supabase. */
  mediaUrl: (p: string) => string
}) {
  const lines = (slide.body ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  const imgs = slide.images ?? []
  const layout = slide.layout ?? 'left'
  const showRounds = !!slide.show_rounds && rounds.length > 0
  const showStats = !!slide.show_stats && !!stats

  const text = (
    <div className="info-col">
      {lines.length > 0 && (
        <ul className="info-list">
          {lines.map((l, i) => (
            <li key={i} style={{ animationDelay: `${0.12 * i}s` }}>{l}</li>
          ))}
        </ul>
      )}
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
          <li style={{ animationDelay: `${0.12 * lines.length}s` }}>Раундов: {stats!.roundsCount}</li>
          <li style={{ animationDelay: `${0.12 * (lines.length + 1)}s` }}>
            Вопросов: {stats!.questionsCount}</li>
          {stats!.hasMiniGame && (
            <li style={{ animationDelay: `${0.12 * (lines.length + 2)}s` }}>Мини-игра: 1</li>
          )}
          {stats!.musicTracks > 0 && (
            <li style={{ animationDelay: `${0.12 * (lines.length + 3)}s` }}>
              Музыкальных треков: {stats!.musicTracks} шт</li>
          )}
          <li style={{ animationDelay: `${0.12 * (lines.length + 4)}s` }}>
            Примерное время игры: {formatMinutes(stats!.totalMinutes)}</li>
        </ul>
      )}
    </div>
  )

  const media = imgs.length > 0 ? (
    <div className={`q-media-grid n${Math.min(imgs.length, 4)}${
      imgs.length > 1 ? ' eq-row' : ''} info-media`}>
      {imgs.map((m, i) => (
        <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" /></figure>
      ))}
    </div>
  ) : null

  return (
    <div className={`host-screen grid-bg info-screen lay-${layout}${
      imgs.length ? ' has-media' : ''}`}>
      <div className="host-topbar">
        <span className="mono-tag">{slide.title || 'ПРАВИЛА'}</span>
      </div>
      <div className="info-body">
        {/* при раскладке «текст справа» картинки идут первыми в потоке —
            так порядок чтения совпадает с тем, что видно на экране */}
        {layout === 'right' ? <>{media}{text}</> : <>{text}{media}</>}
      </div>
      {slide.note?.trim() && <div className="info-note">{slide.note}</div>}
    </div>
  )
}
