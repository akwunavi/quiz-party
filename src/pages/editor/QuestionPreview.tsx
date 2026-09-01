// ═══ Полноэкранный предпросмотр вопроса: ровно как увидят на проекторе ═══
import { ThemeLayer } from '../../components/ThemeLayer'
import { mediaUrl, lenClass } from '../../lib/media'
import { useFitText } from '../../hooks/useFitText'
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
  // тот же автоподгон кегля, что на проекторе: предпросмотр должен показывать
  // ровно то, что увидит зал, включая уменьшённый под длинный вопрос шрифт
  const fitSplit = useFitText<HTMLParagraphElement>([q.question_text])
  const fitPlain = useFitText<HTMLParagraphElement>([q.question_text])

  // «120 секунд»: предпросмотр показывает ВЕСЬ слайд, как на проекторе
  if (round.mechanic === 'sprint') {
    const qs = round.questions.filter(x => !x.hidden)
    const half = Math.ceil(qs.length / 2)
    return (
      <div className="pv-backdrop">
        <button className="pv-close ico" data-tip="Закрыть" onClick={onClose}>✕</button>
        <ThemeLayer theme={pack.theme} isProjector>
          <div className="host-screen grid-bg">
            <div className="sprint-screen">
              <div className="host-topbar sprint-topbar">
                <span className="qnum">{round.title_lines.join(' ')}</span>
              </div>
              <div className="sprint-col">
                {qs.slice(0, half).map((x, i) => (
                  <div key={x.id} className="sprint-card">
                    <span className="sprint-num">{i + 1}</span>
                    <div className="sprint-text">{x.question_text}</div>
                  </div>
                ))}
              </div>
              <div className="sprint-center">
                <div className="ny-wreath"><span className="val">{round.timer_seconds}</span></div>
              </div>
              <div className="sprint-col">
                {qs.slice(half).map((x, i) => (
                  <div key={x.id} className="sprint-card">
                    <span className="sprint-num">{half + i + 1}</span>
                    <div className="sprint-text">{x.question_text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ThemeLayer>
      </div>
    )
  }

  return (
    <div className="pv-backdrop">
      <button className="pv-close ico" data-tip="Закрыть" onClick={onClose}>✕</button>
      <ThemeLayer theme={pack.theme} isProjector>
        {/* классы те же, что на проекторе: has-media/has-choices управляют
            вертикальной раскладкой, без них текст улетал вверх */}
        <div className={`host-screen grid-bg${imgs.length && !q.media.hidden ? ' has-media' : ''}${choices ? ' has-choices' : ''}`}>
          <div className="host-topbar">
            <span className="qnum">ПРЕДПРОСМОТР · ВОПРОС <b>1</b></span>
            <span className="timer-num timer-ico">{round.timer_seconds}</span>
          </div>
          {split ? (
            /* Структура ровно как на проекторе (8.40): картинка РЯДОМ с рамкой
               вопроса, а не внутри неё. Пока предпросмотр жил по старой
               схеме, редактор показывал не то, что увидит зал. */
            <div className="q-split">
              <div className={frameCls}>
                <p ref={fitSplit} className={`q-text${lenClass(q.question_text)}`}>{q.question_text}</p>
              </div>
              <div className="q-media-grid n1">
                {imgs.map((m, i) => (
                  <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" />
                    {q.answer.mode === 'match' && <figcaption>{i + 1}</figcaption>}</figure>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className={frameCls}>
                <p ref={fitPlain} className={`q-text${lenClass(q.question_text)}`}>{q.question_text}</p>
              </div>
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
