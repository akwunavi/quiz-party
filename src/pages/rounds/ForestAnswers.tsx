// ═══ Разбор ответов обычных вопросов в «Волшебном лесу» (phase show_answers): подключение утверждённых разборов этапа 4 ═══
// Всё сетевое и всё, что решает (ответы, команды, автопоказ через 3 с, проверка `checked`, запись is_correct, звук ответа,
// скрытое видео), — в HostScreen.ShowAnswers, как и прежде; сюда приходят готовые значения. Вердикт — та же формула
// (is_correct ведущего, иначе autocheck) и только после `checked`. Кнопки ведущего — прежняя разметка .host-actions.
import { useMemo, type ReactNode } from 'react'
import { mediaUrl } from '../../lib/media'
import { ForestReviewGame, type ReviewInput } from '../../forest/stage4/ReviewGame'
import { reviewKind, reviewRows } from '../../forest/stage4/review'
import type { LoadedRound } from '../../lib/packLoader'
import type { Answer, Question } from '../../types/quiz'

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
    }
    // содержимое, а не ссылка на объект: пакет перечитывается, а сцену из-за этого пересобирать незачем
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id, q.question_text, JSON.stringify(q.media), JSON.stringify(q.answer), q.answer_note, answerText, round.mechanic, round.title_lines.join('|'), round.questions.length, step])
  const { rows, answered } = reviewRows(q, teams, allTeams, answers, checked)
  return (
    <>
      {effects}
      <ForestReviewGame key={q.id} inp={inp} rows={paper ? null : rows} answered={answered} revealed={revealed} checked={checked}
        revealMs={revealMs} video={video} />
      {actions}
    </>
  )
}
