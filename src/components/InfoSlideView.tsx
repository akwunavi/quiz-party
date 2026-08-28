import type { InfoSlide } from '../types/quiz'

// ═══ ВНЕШНИЙ ВИД СЛАЙДА-БРИФИНГА ═══
//
// Вынесен отдельно НАРОЧНО: этой же разметкой рисуется и проектор, и превью
// в редакторе. Иначе превью показывало бы «примерно похожее», а ведущий
// узнавал бы о том, как слайд выглядит на самом деле, уже при гостях.
// Здесь нет ни загрузки данных, ни навигации — только показ.

export type RoundLine = { id: string; name: string; count: number }

export function InfoSlideView({ slide, rounds, mediaUrl }: {
  slide: InfoSlide
  rounds: RoundLine[]
  /** Преобразование пути в адрес — снаружи, чтобы файл не тянул Supabase. */
  mediaUrl: (p: string) => string
}) {
  const lines = (slide.body ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  const imgs = slide.images ?? []
  const layout = slide.layout ?? 'left'
  const showRounds = !!slide.show_rounds && rounds.length > 0

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
