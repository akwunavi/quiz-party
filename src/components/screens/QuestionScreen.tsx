// ═══ Экран обычного вопроса (проектор) ═══
// Вынесено из HostScreen.tsx (9.51, объединение предпросмотра с боевым
// экраном) — тот же узел рендерит и проектор, и предпросмотр вопроса в
// редакторе (см. HANDOFF.md, план объединения предпросмотра). Управление
// игрой (звук, таймер, автопереход, кнопки ведущего) НЕ живёт здесь —
// вызывающая сторона передаёт готовые слоты, поэтому этот компонент можно
// смонтировать и вне игры, без единого побочного эффекта.
//
// Механики standard/test_stop/rebus/stakes_unique/stakes_free/thematic_x2/
// crossword — все идут этим экраном. У sprint/four_pics/jeopardy/melody/
// race/blitz — свои экраны (rounds/*.tsx), сюда не попадают.
import { useEffect, useRef, type ReactNode } from 'react'
import { AudioGate } from '../AudioGate'
import { FitImg } from '../FitImg'
import { FitAnswer } from '../FitAnswer'
import { Icicles } from '../Icicles'
import { WindText } from '../QuestionText'
import { mediaUrl, mediaScaleVar } from '../../lib/media'
import { choicesLenClass } from '../../lib/questionLayout'
import { displayRoundNumber } from '../../lib/roundMeta'
import { createAudio } from '../../lib/audioSource'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Question } from '../../types/quiz'

/** Правильный ответ вопроса одной строкой — для экрана разбора и предпросмотра.
 *  Общая функция: ShowAnswers/RecapSlides/BlitzScreen в HostScreen.tsx и
 *  TileModal читают её же, чтобы формулировка не разъезжалась между экранами. */
export function displayAnswer(q: Question): string {
  const empty = '⚠ ответ не заполнен в редакторе'
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display
  if (Array.isArray(d)) return d.join(' · ')
  if (typeof d === 'string' && d) return d
  if (typeof a.correct === 'string' && a.correct) return String(a.correct).split('/')[0].trim()
  if (typeof a.word === 'string' && a.word) return a.word.toUpperCase()
  if (typeof a.correct_choice === 'string' && a.correct_choice) return a.correct_choice
  if (typeof a.correct_order === 'string' && a.correct_order) return a.correct_order
  if (Array.isArray(a.correct_pairs) && a.correct_pairs.length)
    return (a.correct_pairs as string[]).join('  ')
  return empty
}

/** Звук, приложенный к ОТВЕТУ, — играет на экране разбора целиком. */
export function AnswerAudio({ src }: { src: string }) {
  useEffect(() => {
    if (document.hidden) return
    let cancelled = false
    const a = createAudio()
    a.src = src
    a.loop = false
    a.play().then(() => {
      if (cancelled) { try { a.pause(); a.src = '' } catch { /* уже мёртв */ } }
    }).catch(() => {})
    return () => {
      cancelled = true
      try { a.pause(); a.src = '' } catch { /* уже мёртв */ }
    }
  }, [src])
  return null
}

/** Видео вопроса. Если у вопроса есть озвучка — ждём её окончания
 *  (признак: пошёл таймер), иначе играем сразу. Аудио вопроса здесь НЕ
 *  рендерим: им управляет эффект в effectsSlot, иначе трек играл бы дважды. */
export function QuestionVideo({ src, hidden, waitFor, go }: {
  src: string; hidden: boolean; waitFor: boolean; go: boolean
}) {
  const ref = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (waitFor && !go) return
    ref.current?.play().catch(() => {})
  }, [waitFor, go])
  return (
    <video ref={ref} src={src} controls={!hidden}
      autoPlay={!waitFor}
      style={hidden
        ? { width: 1, height: 1, opacity: 0 }
        : { maxHeight: '46vh', borderRadius: 14 }} />
  )
}

export function QuestionScreen({
  pack, round, roundIdx, q, qIndex, qCount, timeLow, reveal, timerRunning,
  timerSlot, effectsSlot, actionsSlot,
}: {
  pack: LoadedPack
  round: LoadedRound
  /** Индекс раунда в пакете (для номера «Р1/Р2…» — displayRoundNumber
   *  считает по позиции в pack.rounds, а не по round.position из базы). */
  roundIdx: number
  q: Question
  qIndex: number
  qCount: number
  /** Последние 10 сек таймера — красная рамка/сосульки в НГ. */
  timeLow: boolean
  /** Показан ли верный ответ (gameState.reveal). */
  reveal: boolean
  /** Таймер вопроса идёт (влияет на старт скрытого видео-«как аудио»). */
  timerRunning: boolean
  /** Таймер в шапке — готовая нода (`null` для механик без своего таймера
   *  в этом месте, сюда jeopardy никогда не попадает). */
  timerSlot?: ReactNode
  /** Побочные эффекты игры (звук вопроса, автопролистывание, автопоказ
   *  ответа) — управление игрой, не вёрстка. `null` в предпросмотре. */
  effectsSlot?: ReactNode
  /** Кнопки ведущего (`.host-actions`) — целиком, включая обёртку. В
   *  предпросмотре — та же разметка, но приглушённая и некликабельная (Р1,
   *  HANDOFF.md), чтобы было видно, налезает ли контент на кнопки. */
  actionsSlot?: ReactNode
}) {
  const media = q.media.question ?? []
  const imgs = media.filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  const avs = media.filter(m => /\.(mp3|mp4|webm|wav)$/i.test(m))
  const split = !!q.question_text.trim() && imgs.length === 1 && !q.media.hidden
  const choices = q.answer.mode === 'choice' ? q.answer.choices
    : q.answer.mode === 'order' ? q.answer.choices : null
  const isNY = pack.theme === 'new_year'
  // Обёртка вопроса была пустым div только в киберпанке: в НГ там сосульки,
  // в ГП своё оформление. Даём классике рамку — разметка не меняется,
  // добавляется только класс на уже существующий контейнер.
  const isCyber = pack.theme === 'classic'
  // Есть ли вообще текст вопроса: у ребусов его не бывает, и в обычных
  // вопросах поле могут оставить пустым, когда всё говорит картинка.
  const hasText = !!q.question_text.trim()
  const isPotter = pack.theme === 'potter'
  const frameCls = isPotter && round.mechanic !== 'rebus' ? 'mg-frame'
    : isNY && round.mechanic !== 'rebus' ? `q-frame${timeLow ? ' low' : ''}`
    : isCyber ? 'cyber-frame' : ''
  // подписи-буквы на картинках нужны, когда картинок столько же, сколько вариантов/пар
  const lettered = !q.media.hidden && imgs.length > 1 && (
    (q.answer.mode === 'choice' && q.answer.choices.length === imgs.length) ||
    (q.answer.mode === 'match' && q.answer.left.length === imgs.length))
  const revealMode = (pack.settings?.answers_reveal && round.answers_reveal === 'after_question'
    ? round.answers_reveal : round.answers_reveal) ?? 'after_round'

  return (
    <div className={`host-screen grid-bg${hasText ? '' : ' no-qtext'}${
      imgs.length && !q.media.hidden ? ' has-media' : ''}${
      (choices && !lettered) || (q.answer.mode === 'match'
        && (q.answer.right_labels ?? []).some(Boolean)) ? ' has-choices' : ''}`}>
      <AudioGate />
      {effectsSlot}
      <div className="host-topbar">
        <span className="qnum">Р{displayRoundNumber(pack, roundIdx)} · ВОПРОС{' '}
          <b>{qIndex + 1}</b> / {qCount}</span>
        {timerSlot}
      </div>

      {split ? (
        /* Картинка лежит РЯДОМ с рамкой вопроса, а не внутри неё.
           Пока она была вложена в рамку, экран выглядел так: рамка держит
           свою высоту, картинка тянется на 68vh и вылезает за её нижний
           край — прямо под плитки вариантов. Теперь колонки делят место
           честно: слева рамка с текстом, справа картинка во всю
           доступную высоту, и наезжать друг на друга им нечем. */
        <div className="q-split">
          <div className={frameCls}>
            {isNY && <Icicles seed={q.id} low={timeLow} />}
            {isCyber && <span className="cf-scan" aria-hidden="true" />}
            {isCyber && <span className="cf-hud-corner" aria-hidden="true">SYS.QUERY</span>}
            <WindText key={q.id} text={q.question_text} />
          </div>
          <div className="q-media-grid n1" style={mediaScaleVar(q)}>
            {imgs.map((m, i) => (
              <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" />
                {q.answer.mode === 'match' && <figcaption>{i + 1}</figcaption>}</figure>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Пустой текст — пустая рамка. У ребусов текста нет никогда, но
              так же бывает и в обычных вопросах, где всё сказано картинкой.
              Раньше на экране висел пустой контейнер и съедал высоту,
              которая нужна изображениям. */}
          {hasText && (
            <div className={frameCls}>
              {isNY && <Icicles seed={q.id} low={timeLow} />}
              {isCyber && <span className="cf-scan" aria-hidden="true" />}
              {isCyber && <span className="cf-hud-corner" aria-hidden="true">SYS.QUERY</span>}
              <WindText key={q.id} text={q.question_text} />
            </div>
          )}
          {!q.media.hidden && imgs.length > 0 && (
            lettered
              /* картинки-варианты и сопоставление: подпись-буква/номер прямо на карточке */
              ? <div className={`img-answers n${Math.min(imgs.length, 5)}${
                    imgs.length > 1 ? ' eq-row' : ''}`}>
                  {imgs.map((m, i) => (
                    <FitAnswer key={i} src={mediaUrl(m)}
                      badge={q.answer.mode === 'match' ? String(i + 1) : (choices?.[i]?.key ?? '')}>
                      {q.answer.mode === 'choice' && choices?.[i]?.text &&
                        <span className="ia-text">{choices[i].text}</span>}
                    </FitAnswer>
                  ))}
                </div>
              : <div className={`q-media-grid n${Math.min(imgs.length, 4)}${
                    round.mechanic === 'rebus' ? ' rebus' : ''}${
                    // Ребус тоже идёт выключным рядом. Раньше он был из него
                    // исключён ради равной ШИРИНЫ половин, но на экране это
                    // читалось хуже: снимки в паре разной высоты и мельче
                    // отведённого места. Равная высота важнее — её и просили.
                    imgs.length > 1 ? ' eq-row' : ''}${
                    // 4 картинки — один ряд, больше — два ряда (см. .wrap2,
                    // 22-question.css). Сейчас недостижимо (mediaMax у
                    // вопроса — 4), но правило универсальное.
                    imgs.length > 4 ? ' wrap2' : ''}`}
                  style={mediaScaleVar(q)}>
                  {imgs.map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
                </div>
          )}
        </>
      )}

      {/* Медиа вопроса ждёт озвучку: пока её читают, видео молчит.
          Запуск привязан к таймеру — они стартуют одновременно. */}
      {avs.map((m, i) => /\.(mp4|webm)$/i.test(m)
        ? <QuestionVideo key={i} src={mediaUrl(m)} hidden={!!q.media.hidden}
            waitFor={!!q.media.voice} go={timerRunning} />
        : null)}

      {q.answer.mode === 'match' && (q.answer.right_labels ?? []).some(Boolean) && (
        <div className={`choices-grid${
          choicesLenClass((q.answer.right_labels ?? []) as string[])}`}>
          {q.answer.right.map((r, i) => (
            <div key={r} className="choice-plate" style={{ animationDelay: `${0.3 + i * 0.3}s` }}>
              <span className="key">{r}</span>{(q.answer as { right_labels?: string[] }).right_labels?.[i] ?? ''}
            </div>
          ))}
        </div>
      )}
      {choices && !lettered && (
        <div className={`choices-grid${choicesLenClass(choices.map(c => c.text))}`}>
          {choices.map((c, i) => (
            <div key={c.key} className="choice-plate" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
              <span className="key">{c.key}</span>{c.text}
            </div>
          ))}
        </div>
      )}

      {(revealMode === 'after_question' || round.mechanic === 'jeopardy') && reveal && (
        <div className="answer-reveal hud-frame">
          <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
          <div className="answer-main">{displayAnswer(q)}</div>
          {q.answer_note && <div style={{ opacity: .75 }}>{q.answer_note}</div>}
          {/* Раньше сюда как <img> уходило ВСЁ медиа ответа, включая mp3:
              звук не играл, а на экране висела битая картинка. Теперь
              картинки показываем, звук играем. */}
          {(() => {
            const amedia = q.media.answer ?? []
            const pics = amedia.filter(m => !/\.(mp3|wav|m4a|ogg)$/i.test(m))
            const sound = amedia.find(m => /\.(mp3|wav|m4a|ogg)$/i.test(m))
            return (<>
              {sound && <AnswerAudio src={mediaUrl(sound)} />}
              {pics.length > 0 && (
                <div className="q-media-grid" style={{ maxHeight: '26vh' }}>
                  {pics.map((m, i) => <img key={i} src={mediaUrl(m)} alt="" />)}
                </div>
              )}
            </>)
          })()}
        </div>
      )}

      {actionsSlot}
    </div>
  )
}
