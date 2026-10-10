// Экран обычного вопроса проектора в теме «Волшебный лес» (подключается из components/screens/QuestionScreen.tsx).
// Кнопки ведущего и побочные эффекты игры (звук, автопереход, автопоказ ответа) приходят слотами — как у остальных тем.
import { useMemo, type ReactNode } from 'react'
import { AudioGate } from '../../components/AudioGate'
import { mediaUrl } from '../../lib/media'
import { displayRoundNumber } from '../../lib/roundMeta'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Question } from '../../types/quiz'
import { AnswerAudio, QuestionVideo } from '../../components/screens/QuestionScreen'
import { ForestQuestion } from './ForestQuestion'
import { forestQFrom } from './fromQuestion'

export default function ForestQuestionScreen({ pack, round, roundIdx, q, qIndex, qCount, reveal, timerStartedAt, effectsSlot, actionsSlot, answerText }: {
  pack: LoadedPack; round: LoadedRound; roundIdx: number; q: Question; qIndex: number; qCount: number
  reveal: boolean; timerStartedAt: string | null
  effectsSlot?: ReactNode; actionsSlot?: ReactNode; answerText: string
}) {
  const fq = useMemo(() => forestQFrom(q, mediaUrl, answerText),
    // содержимое, а не ссылка на объект: пакет перечитывается, а сцену из-за этого пересобирать незачем
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q.id, q.question_text, JSON.stringify(q.media), JSON.stringify(q.answer), answerText])
  // видео вопроса и звук ответа — как в классическом экране (раньше Лес их молча пропускал)
  const media = q.media.question ?? []
  const videos = media.filter(m => /\.(mp4|webm)$/i.test(m))
  const ansSound = (q.media.answer ?? []).find(m => /\.(mp3|wav|m4a|ogg)$/i.test(m))
  const afterQuestion = (round.answers_reveal ?? 'after_round') === 'after_question'
  const vid = (hidden: boolean) => <QuestionVideo src={mediaUrl(videos[0])} hidden={hidden} waitFor={!!q.media.voice} go={!!timerStartedAt} />
  const name = round.title_lines.join(' ').replace(/\s+/g, ' ').trim()
  return (
    <div className="fo-screen">
      <AudioGate />
      {effectsSlot}
      <ForestQuestion q={fq} roundName={name || `Раунд ${displayRoundNumber(pack, roundIdx)}`} qno={`Вопрос ${qIndex + 1} из ${qCount}`}
        startedAt={timerStartedAt} seconds={round.timer_seconds} reveal={reveal}
        renderVideo={videos.length && !q.media.hidden ? () => vid(false) : undefined} />
      {videos.length > 0 && q.media.hidden && vid(true)}
      {reveal && afterQuestion && ansSound && <AnswerAudio src={mediaUrl(ansSound)} />}
      {actionsSlot}
    </div>
  )
}
