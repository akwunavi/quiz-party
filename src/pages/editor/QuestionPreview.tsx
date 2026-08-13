// ═══ Полноэкранный предпросмотр вопроса: ровно как увидят на проекторе ═══
import { ThemeLayer } from '../../components/ThemeLayer'
import { mediaUrl } from '../HostScreen'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Question } from '../../types/quiz'

export function QuestionPreview({ pack, round, q, onClose }: {
  pack: LoadedPack; round: LoadedRound; q: Question; onClose: () => void
}) {
  const media = q.media.question ?? []
  const imgs = media.filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  const split = !!q.question_text.trim() && imgs.length === 1 && !q.media.hidden
  const choices = q.answer.mode === 'choice' || q.answer.mode === 'order' ? q.answer.choices : null
  const isNY = pack.theme === 'new_year'
  const frameCls = isNY && round.mechanic !== 'rebus' ? 'q-frame' : ''

  return (
    <div className="pv-backdrop">
      <button className="pv-close ico" data-tip="Закрыть" onClick={onClose}>✕</button>
      <ThemeLayer theme={pack.theme} isProjector>
        <div className="host-screen grid-bg">
          <div className="host-topbar">
            <span className="qnum">ПРЕДПРОСМОТР · ВОПРОС <b>1</b></span>
            <span className="timer-num timer-ico">{round.timer_seconds}</span>
          </div>
          {split ? (
            <div className={frameCls}>
              <div className="q-split">
                <p className="q-text">{q.question_text}</p>
                <div className="q-media-grid n1">
                  {imgs.map((m, i) => (
                    <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" />
                      {q.answer.mode === 'match' && <figcaption>{i + 1}</figcaption>}</figure>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={frameCls}><p className="q-text">{q.question_text}</p></div>
              {!q.media.hidden && imgs.length > 0 && (
                <div className={`q-media-grid n${Math.min(imgs.length, 4)}${round.mechanic === 'rebus' ? ' rebus' : ''}${choices ? ' with-choices' : ''}`}>
                  {imgs.map((m, i) => (
                    <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" />
                      {q.answer.mode === 'match' && <figcaption>{i + 1}</figcaption>}</figure>
                  ))}
                </div>
              )}
            </>
          )}
          {q.answer.mode === 'match' && (q.answer.right_labels ?? []).some(Boolean) && (
            <div className="choices-grid">
              {q.answer.right.map((r, i) => (
                <div key={r} className="choice-plate">
                  <span className="key">{r}</span>{(q.answer as { right_labels?: string[] }).right_labels?.[i] ?? ''}
                </div>
              ))}
            </div>
          )}
          {choices && (
            <div className="choices-grid">
              {choices.map(c => (
                <div key={c.key} className="choice-plate">
                  <span className="key">{c.key}</span>{c.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </ThemeLayer>
    </div>
  )
}
