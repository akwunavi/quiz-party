// ═══ Разбор ответов обычных вопросов в «Волшебном лесу» (phase show_answers): подключение утверждённых разборов этапа 4 ═══
// Всё сетевое и всё, что решает (ответы, команды, автопоказ через 3 с, проверка `checked`, запись is_correct, звук ответа,
// скрытое видео), — в HostScreen.ShowAnswers, как и прежде; сюда приходят готовые значения. Вердикт — та же формула
// (is_correct ведущего, иначе autocheck) и только после `checked`. Кнопки ведущего — прежняя разметка .host-actions.
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { mediaUrl } from '../../lib/media'
import { ForestReviewGame, type ReviewInput } from '../../forest/stage4/ReviewGame'
import { forestScene } from '../../forest/shell'
import { ForestQuestion } from '../../forest/question/ForestQuestion'
import { forestQFrom } from '../../forest/question/fromQuestion'
import { reviewKind, reviewRows } from '../../forest/stage4/review'
import type { LoadedRound } from '../../lib/packLoader'
import type { Answer, Question } from '../../types/quiz'

/** расшифровка ребуса — те же правила, что у прежнего экрана (rebusCaption в HostScreen): у первого слова выделены последние 3 буквы, у второго — первые 3 */
function rebusCaps(w1?: string, w2?: string): { plain: string; hot: string; first: boolean }[] | undefined {
  const cap = (word: string | undefined, first: boolean) => {
    const w = (word ?? '').trim(); if (!w) return null
    const cut = first ? Math.max(0, w.length - 3) : 3
    return first ? { plain: w.slice(0, cut), hot: w.slice(cut), first } : { plain: w.slice(cut), hot: w.slice(0, cut), first }
  }
  const a = cap(w1, true), b = cap(w2, false)
  return a || b ? [a ?? { plain: '', hot: '', first: true }, b ?? { plain: '', hot: '', first: false }] : undefined
}
const isPic = (m: string) => !/\.(mp3|mp4|webm|wav|m4a|ogg)$/i.test(m)
const isSound = (m: string) => /\.(mp3|wav|m4a|ogg)$/i.test(m)

export function ForestAnswers({ round, q, step, answers, teams, allTeams, revealed, checked, paper, revealMs, answerText, effects, video, actions }: {
  round: LoadedRound; q: Question; step: number
  answers: Answer[]
  teams: { id: string; name: string; color: string; icon?: string | null }[]
  allTeams: { id: string; name: string; color: string }[]
  revealed: boolean; checked: boolean; paper: boolean
  /** revealDoneMs(q) из HostScreen: когда ответ считается показанным целиком */
  revealMs: number
  /** displayAnswer(q) */
  answerText: string
  /** звук ответа (AnswerAudio) — как у прежнего разбора */
  effects?: ReactNode
  /** скрытое видео вопроса (RevealVideo) — только после показа */
  video?: ReactNode
  actions: ReactNode
}) {
  const inp = useMemo<ReviewInput>(() => {
    const qm = q.media.question ?? [], am = q.media.answer ?? []
    const qPics = qm.filter(isPic), aPics = am.filter(isPic)
    const reveal = aPics.length ? aPics : qPics
    const hiddenVideo = !!q.media.hidden && qm.some(m => /\.(mp4|webm)$/i.test(m))
    const kind = reviewKind(q, round.mechanic, { qImgs: qPics.length, revealImgs: reveal.length, video: hiddenVideo })
    const a = q.answer
    const options = a.mode === 'choice' || a.mode === 'order' ? a.choices.map(c => ({ key: c.key, text: c.text })) : []
    return {
      kind, title: round.title_lines.join(' ').replace(/\s+/g, ' ').trim(), qn: step + 1, qcount: round.questions.length,
      question: q.question_text.trim(), answer: answerText,
      options, correctKey: a.mode === 'choice' ? a.correct_choice : '', correctOrder: a.mode === 'order' ? a.correct_order : '',
      left: a.mode === 'match' ? a.left : [], right: a.mode === 'match' ? a.right : [], rightLabels: a.mode === 'match' ? a.right_labels ?? [] : [],
      pairs: a.mode === 'match' ? a.correct_pairs : [],
      qImgs: q.media.hidden ? [] : qPics.map(mediaUrl), aImgs: reveal.map(mediaUrl),
      allImgs: (kind === 'imgopt' || !q.media.hidden ? qPics : []).map(mediaUrl),
      hasAudio: qm.some(isSound), note: q.answer_note?.trim() ?? '',
      captions: round.mechanic === 'rebus' ? rebusCaps(q.service.word1, q.service.word2) : undefined,
    }
    // содержимое, а не ссылка на объект: пакет перечитывается, а сцену из-за этого пересобирать незачем
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id, q.question_text, JSON.stringify(q.media), JSON.stringify(q.answer), q.answer_note, answerText, round.mechanic, round.title_lines.join('|'), round.questions.length, step])
  const { rows, answered } = reviewRows(q, teams, allTeams, answers, checked)
  // до показа верного ответа экран остаётся ровно экраном вопроса (без таймера); разбор с командами — после показа
  const fq = useMemo(() => forestQFrom(q, mediaUrl, answerText),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q.id, q.question_text, JSON.stringify(q.media), JSON.stringify(q.answer), answerText])
  // Переход «ждём ответ → правильный ответ»: сцена вопроса не рвётся, а растворяется, пока проступает разбор
  // (раньше один экран исчезал и сразу появлялся другой с чужим фоном — выглядело как моргание)
  const [preOn, setPreOn] = useState(true)
  useEffect(() => {
    if (!revealed) { setPreOn(true); return }
    const t = setTimeout(() => setPreOn(false), 1000)
    return () => clearTimeout(t)
  }, [revealed, q.id])
  // на время растворения возвращаем общий лес оболочки: сквозь тающую сцену вопроса должен проступать он, а не чёрный фон
  useEffect(() => { if (revealed) forestScene.set({ hidden: false }) }, [revealed])
  const pre = (revealed ? preOn : true) && (
    <div className={`fo-x ${revealed ? 'fo-xout' : ''}`}>
      <ForestQuestion q={fq} roundName={round.title_lines.join(' ').replace(/\s+/g, ' ').trim()} qno={`Вопрос ${step + 1} из ${round.questions.length}`}
        startedAt={null} seconds={round.timer_seconds} reveal={false} calm from="E" noTimer />
    </div>)
  if (!revealed) return <>{effects}{pre}{actions}</>
  return (
    <>
      {effects}
      {pre}
      <div className="fo-x fo-xin">
        <ForestReviewGame key={q.id} inp={inp} rows={paper ? null : rows} answered={answered} revealed={revealed} checked={checked}
          revealMs={revealMs} video={video} />
      </div>
      {actions}
    </>
  )
}
