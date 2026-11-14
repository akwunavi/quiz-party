// ═══ «Книга» (ny_book) — ПРОТОТИП этапа 2: проигрыватель с пластинкой в окне трека «Угадай мелодию» ═══
// Вращается ТОЛЬКО пока трек реально играет: spinning приходит из usePlaybackActive (события playing/pause/waiting/ended
// КОНКРЕТНОЙ операции общего <audio>), а не из стадии игры. Нового таймера нет.
export function Vinyl({ spinning, label, track }: { spinning: boolean; label?: string; track?: number }) {
  return (
    <div className={`bk-vinyl${spinning ? ' is-spin' : ''}`} aria-hidden="true">
      <div className="bk-vinyl-plinth" />
      <div className="bk-vinyl-disc">
        <span className="bk-vinyl-label"><b>{track ?? ''}</b><i>{label ?? ''}</i></span>
      </div>
      <span className="bk-vinyl-arm" />
    </div>
  )
}
