// ═══ «Кроссворд» в «Волшебном лесу»: подключение утверждённой сцены к настоящей игре (проектор) ═══
// Данные — те же, что у прежних экранов: сетка round.settings.grid, определение = текст вопроса, ответы команд
// (useAnswers в ShowAnswers), вердикт — ровно та же формула, что в ShowAnswers (is_correct ведущего, иначе autocheck),
// и только когда ShowAnswers объявил проверку (`checked`). Звук, автопоказ, автопроверка, запись is_correct, кнопки —
// остаются в HostScreen (приходят слотами); здесь ничего не пишется в сеть.
import { useMemo, type ReactNode } from 'react'
import { QuestionVideo, AnswerAudio } from '../../components/screens/QuestionScreen'
import { AudioGate } from '../../components/AudioGate'
import { autocheck } from '../../lib/autocheck'
import { mediaUrl } from '../../lib/media'
import { useRealTimer } from '../../forest/useTimer'
import { hueOf, tcol } from '../../forest/util'
import { cwModel, questionNums } from '../../forest/stage3/cwModel'
import { CrosswordQuestionGame, CrosswordReviewGame } from '../../forest/stage3/CrosswordGame'
import type { CwTallyRow, CwTeamRow } from '../../forest/stage3/CrosswordC'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Answer, CrosswordGrid, GameState, Question } from '../../types/quiz'

const isAv = (m: string) => /\.(mp3|mp4|webm|wav)$/i.test(m)
const isSound = (m: string) => /\.(mp3|wav|m4a|ogg)$/i.test(m)
export const crosswordGridOf = (round: LoadedRound) => (round.settings as { grid?: CrosswordGrid | null } | null)?.grid ?? null

function useCw(round: LoadedRound) {
  const grid = crosswordGridOf(round)!
  const m = useMemo(() => cwModel(grid), [grid])
  const nums = useMemo(() => questionNums(grid, round.questions), [grid, round.questions])
  return { m, nums }
}
const cardImg = (src: string, i: number) => <div key={i} className="cwC-sc"><img src={src} alt="" /></div>

/** Экран вопроса кроссворда. effectsSlot/actionsSlot — те же, что у QuestionScreen (звук, автопоказ, автопролистывание, кнопки). */
export function ForestCrosswordQuestion({ pack, round, q, qIndex, qCount, gameState, effectsSlot, actionsSlot }: {
  pack: LoadedPack; round: LoadedRound; q: Question; qIndex: number; qCount: number; gameState: GameState
  effectsSlot?: ReactNode; actionsSlot?: ReactNode
}) {
  const { m, nums } = useCw(round)
  const startedAt = gameState.timer_started_at
  // гонг в конце — у одуванчика (кольцо timerSlot здесь не монтируется)
  const tm = useRealTimer(startedAt, round.timer_seconds, true)
  // та же формула, что в QuestionScreen: показан ли ответ на экране вопроса
  const revealMode = (pack.settings?.answers_reveal && round.answers_reveal === 'after_question'
    ? round.answers_reveal : round.answers_reveal) ?? 'after_round'
  const open = revealMode === 'after_question' && gameState.reveal
  const past = new Set(nums.slice(0, qIndex).filter((x): x is number => x != null))
  const media = q.media.question ?? []
  const imgs = q.media.hidden ? [] : media.filter(x => !isAv(x))
  const vids = media.filter(x => /\.(mp4|webm)$/i.test(x))
  const amedia = q.media.answer ?? []
  const apics = open ? amedia.filter(x => !isSound(x)) : []
  const asound = open ? amedia.find(isSound) : undefined
  const shownImgs = apics.length ? apics : imgs
  const word = q.answer.mode === 'crossword_word' ? q.answer.word : ''
  const sideItems = [
    ...shownImgs.slice(0, 4).map((x, i) => cardImg(mediaUrl(x), i)),
    ...(q.media.hidden ? [] : vids.map((x, i) => <div key={'v' + i} className="cwC-sc"><QuestionVideo src={mediaUrl(x)} hidden={false} waitFor={!!q.media.voice} go={!!startedAt} /></div>)),
  ]
  return (
    <>
      <AudioGate />
      {effectsSlot}
      {asound && <AnswerAudio src={mediaUrl(asound)} />}
      {/* видео «как аудио» — звук без картинки, как в QuestionScreen */}
      {q.media.hidden && vids.map((x, i) => <QuestionVideo key={i} src={mediaUrl(x)} hidden waitFor={!!q.media.voice} go={!!startedAt} />)}
      <CrosswordQuestionGame m={m} title={round.title_lines.join(' ')} qn={qIndex + 1} qcount={qCount} cur={nums[qIndex] ?? null} past={past}
        clue={q.question_text.trim()} answer={open ? word.toUpperCase() : null} note={q.answer_note ?? ''}
        n={startedAt ? tm.left : round.timer_seconds} total={round.timer_seconds} side={sideItems} sideN={sideItems.length} />
      {actionsSlot}
    </>
  )
}

/** Разбор кроссворда (ShowAnswers): все сетевые хуки, автопоказ, автопроверка и запись is_correct — в ShowAnswers. */
export function ForestCrosswordAnswers({ pack, round, q, step, answers, teams, allTeams, revealed, checked, paper, effects, imgs, video, actions }: {
  pack: LoadedPack; round: LoadedRound; q: Question; step: number
  answers: Answer[]
  teams: { id: string; name: string; color: string; icon?: string | null }[]
  allTeams: { id: string; name: string; color: string }[]
  revealed: boolean; checked: boolean; paper: boolean
  /** звук/видео ответа — как у ShowAnswers */
  effects?: ReactNode
  /** картинки: до показа — вопроса, после — ответа (или вопроса) */
  imgs: string[]
  /** скрытое видео вопроса, показанное вместе с ответом (RevealVideo) */
  video?: ReactNode
  actions: ReactNode
}) {
  void pack
  const { m, nums } = useCw(round)
  const verdictOf = (qq: Question, a: Answer | undefined) => a ? (a.is_correct ?? autocheck(qq.answer, a.answer_text)) : null
  // команды игры + те, кого уже нет в списке, но их ответ есть (как ShowAnswers берёт имя из allTeams)
  const rowsQ = answers.filter(a => a.question_ref === `q-${q.id}`)
  const list = [...teams, ...allTeams.filter(t => !teams.some(x => x.id === t.id) && answers.some(a => a.team_id === t.id))]
  const col = (c: string) => tcol(hueOf(c))
  const rows: CwTeamRow[] = paper ? [] : list.map(t => {
    const a = rowsQ.find(r => r.team_id === t.id)
    const text = a?.answer_text?.trim() || null
    return { key: t.id, name: `${'icon' in t && t.icon ? `${t.icon} ` : ''}${t.name}`, color: col(t.color), answer: text, verdict: verdictOf(q, a) }
  })
  const answered = rowsQ.filter(a => a.answer_text?.trim()).length
  const reviewed = new Set(nums.slice(0, step).filter((x): x is number => x != null))
  const isLast = step >= round.questions.length - 1
  let tally: CwTallyRow[] | null = null
  if (isLast && !paper && list.length) {
    tally = list.map((t, i) => {
      const pips = m.nums.map(num => {
        const qi = nums.indexOf(num), qq = round.questions[qi]
        return qq ? verdictOf(qq, answers.find(a => a.question_ref === `q-${qq.id}` && a.team_id === t.id)) : null
      })
      return { key: t.id, name: t.name, color: col(t.color), pips, sum: pips.filter(v => v === true).length, i }
    }).sort((a, b) => b.sum - a.sum || a.i - b.i)
  }
  return (
    <>
      {effects}
      <CrosswordReviewGame m={m} title={round.title_lines.join(' ')} qn={step + 1} qcount={round.questions.length}
        cur={nums[step] ?? null} reviewed={reviewed} revealed={revealed} checked={checked} clue={q.question_text.trim()}
        note={q.answer_note ?? ''} rows={rows} answered={answered} tally={tally}
        side={[...(video ? [<div key="v" className="cwC-sc">{video}</div>] : []), ...imgs.slice(0, video ? 1 : 2).map((x, i) => cardImg(mediaUrl(x), i))]}
        sideN={Math.min(2, imgs.length + (video ? 1 : 0))} />
      {actions}
    </>
  )
}
