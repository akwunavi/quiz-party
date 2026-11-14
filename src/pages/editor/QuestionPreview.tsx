// ═══ Полноэкранный предпросмотр вопроса: ровно как увидят на проекторе ═══
//
// Тонкая оболочка: маршрутизирует по round.mechanic на ТЕ ЖЕ компоненты,
// что рендерит боевой проектор (HostScreen.tsx + rounds/*.tsx) — до 9.51 тут
// жила независимая копия разметки, которая не знала ни про масштаб картинки,
// ни про рамку темы, ни про шесть из тринадцати механик (HANDOFF.md).
//
// НИКАКИХ классов вопроса/вариантов/спринта здесь напрямую не пишем — если
// понадобилась своя вёрстка, это симптом, что где-то опять заводится копия
// вместо переиспользования (см. preview-no-copy.test.ts).
import { useState } from 'react'
import { isForestTheme } from '../../forest/config'
import { ThemeLayer } from '../../components/ThemeLayer'
import { Timer } from '../../components/Timer'
import { QuestionScreen } from '../../components/screens/QuestionScreen'
import { AfterRoundNav } from '../../components/AfterRoundNav'
import { SprintBoard } from '../rounds/SprintRound'
import { RevealBoard } from '../rounds/RevealRound'
import { JeopardyBoard } from '../rounds/JeopardyRound'
import { MelodyBoard } from '../rounds/MelodyRound'
import { RaceBoard } from '../rounds/RaceRound'
import { BlitzBoard } from '../rounds/BlitzRound'
import { AnagramBoard } from '../rounds/AnagramRound'
import { initBlitz, showQuestion } from '../../lib/blitzState'
import { previewTeams, previewAnswers, previewGameState, previewStages } from '../../lib/previewState'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import { serverNow } from '../../lib/serverClock'
import { useLayoutEdit } from './useLayoutEdit'
import { AnswerScreen } from '../../components/screens/AnswerScreen'
import { autocheck } from '../../lib/autocheck'

export function QuestionPreview({ pack, round, qIndex, onClose, canEdit = false, whyReadOnly, onSaved }: {
  /** права на правку пакета (lib/packRights) — для кнопки «Компоновка» */
  canEdit?: boolean; whyReadOnly?: string | null; onSaved?: () => void
  pack: LoadedPack; round: LoadedRound
  /** Индекс вопроса в round.questions — не используется механиками без
   *  списка вопросов (jeopardy/melody/race), там доска/тема задаются
   *  настройками раунда целиком. */
  qIndex: number
  onClose: () => void
}) {
  const stages = previewStages(round.mechanic)
  const [stageState, setStageKey] = useState(stages[0]?.key)
  const q0 = round.questions[qIndex]
  const lay = useLayoutEdit({ pack, round, q: q0, canEdit, whyReadOnly, onSaved })
  // «3 попытки» в режиме «Компоновка»: вкладка «Вопрос» показывает ВСЕ картинки (фаза 3), «Ответ» — разбор; вкладки фаз на это время не действуют
  const stageKey = lay.open && round.mechanic === 'four_pics' ? (lay.screen === 'answer' ? 'review' : 'phase3') : stageState
  // «3 попытки» получает раунд с подставленным черновиком компоновки (RevealBoard читает q из round.questions)
  const roundView = round.mechanic === 'four_pics' && lay.qView ? { ...round, questions: round.questions.map((x, i) => (i === qIndex ? lay.qView! : x)) } : round
  const teams = previewTeams()
  const answers = previewAnswers(round, qIndex, stageKey, teams)
  const preview = { teams, answers }
  const roundIdx = Math.max(0, pack.rounds.findIndex(r => r.id === round.id))
  const gameState = previewGameState(pack, round, roundIdx, qIndex, stageKey)
  const q = lay.qView

  return (
    <div className="pv-backdrop">
      <button className="pv-close ico" data-tip="Закрыть" onClick={onClose}>✕</button>
      {lay.button && <div className="pv-stages pv-lay">{lay.button}</div>}
      {lay.overlay}
      {stages.length > 1 && (
        <div className="pv-stages">
          {stages.map(st => (
            <button key={st.key} type="button"
              className={`pv-stage${st.key === stageKey ? ' active' : ''}`}
              onClick={() => setStageKey(st.key)}>{st.label}</button>
          ))}
        </div>
      )}
      {/* phase="question": без него фон Magic-сцены в ГП отличался бы от
          боевого — [data-phase] управляет плотностью декора (34-magic-
          environment.css), предпросмотр раньше звал ThemeLayer без phase. */}
      <ThemeLayer theme={pack.theme} isProjector={!isForestTheme(pack.theme)} phase="question">
        {(() => {
          switch (round.mechanic) {
            case 'sprint':
              return <SprintBoard pack={pack} round={round} gameState={gameState} preview={preview}
                timerNode={<Timer startedAt={null} seconds={round.timer_seconds} theme={pack.theme} />} />
            case 'four_pics':
              return <RevealBoard pack={pack} round={roundView} gameState={gameState} preview={preview}
                timerNode={(seconds, key, chime) => <Timer key={key} startedAt={null}
                  seconds={seconds} theme={pack.theme} chime={chime} />} />
            case 'jeopardy':
              return <JeopardyBoard pack={pack} round={round} gameState={gameState} preview={preview} />
            case 'melody':
              return <MelodyBoard pack={pack} round={round} gameState={gameState} preview={preview} />
            case 'race':
              return <RaceBoard pack={pack} round={round} gameState={gameState} preview={preview} />
            case 'blitz':
              return <BlitzPreview round={round} teams={teams} />
            case 'anagram':
              if (!q) return (
                <div className="host-screen grid-bg">
                  <p style={{ opacity: .7 }}>В этом раунде нет вопросов — добавь их в редакторе</p>
                </div>
              )
              // ТОТ ЖЕ компонент, что на проекторе; гонг таймера выключен —
              // в предпросмотре звук не запускается ни в одной механике
              return <AnagramBoard key={q.id} pack={pack} round={round} roundIdx={roundIdx}
                q={q} qIndex={qIndex} qCount={round.questions.length}
                gameState={gameState} preview={preview}
                timerSlot={<Timer startedAt={gameState.timer_started_at} seconds={round.timer_seconds}
                  theme={pack.theme} chime={false} />}
                effectsSlot={null}
                actionsSlot={<PreviewActions pack={pack} round={round} gameState={gameState} />} />
            default:
              if (!q) return (
                <div className="host-screen grid-bg">
                  <p style={{ opacity: .7 }}>В этом раунде нет вопросов — добавь их в редакторе</p>
                </div>
              )
              // вкладка «Ответ» редактора компоновки: тот же AnswerScreen, что на проекторе (показан ответ, проверка выполнена)
              if (lay.open && lay.screen === 'answer') return (
                <AnswerScreen pack={pack} round={round} q={q} step={qIndex} total={round.questions.length} roundIdx={roundIdx} paper={false}
                  rows={teams.map((t, i) => ({ id: `pv-ans-${i}`, team_id: t.id, game_id: '', question_ref: `q-${q.id}`, round_number: round.position, answer_text: ['ответ команды', 'почти', 'не знаем'][i % 3], stake: null, is_correct: null, updated_at: '', created_at: '' }))}
                  teamOf={id => teams.find(t => t.id === id)} checked revealLive={false} shownOf={a => autocheck(q.answer, a.answer_text)}
                  actions={<PreviewActions pack={pack} round={round} gameState={gameState} />} />
              )
              return (
                <QuestionScreen pack={pack} round={round} roundIdx={roundIdx}
                  q={q} qIndex={qIndex} qCount={round.questions.length}
                  timeLow={false} reveal={false} timerRunning={false}
                  timerSlot={<Timer startedAt={null} seconds={round.timer_seconds} theme={pack.theme} />}
                  effectsSlot={null}
                  actionsSlot={<PreviewActions pack={pack} round={round} gameState={gameState} />} />
              )
          }
        })()}
      </ThemeLayer>
    </div>
  )
}

/** Кнопки ведущего — та же разметка `.host-actions`, что на проекторе (Р1,
 *  HANDOFF.md): видны, чтобы было заметно, если контент на них налезает, но
 *  некликабельны (`.pv-actions-frozen`, 07-editor.css — `pointer-events:
 *  none` + приглушение). Реальные обработчики здесь не нужны: клик всё
 *  равно не долетит. */
function PreviewActions({ pack, round, gameState }: {
  pack: LoadedPack; round: LoadedRound
  gameState: ReturnType<typeof previewGameState>
}) {
  const revealMode = (pack.settings?.answers_reveal && round.answers_reveal === 'after_question'
    ? round.answers_reveal : round.answers_reveal) ?? 'after_round'
  const isLast = round.questions.length <= 1
  return (
    <div className="host-actions pv-actions-frozen">
      <button className="ghost">← Назад</button>
      {revealMode === 'after_question' && <button>Показать ответ</button>}
      {!isLast
        ? <button>Дальше →</button>
        : revealMode === 'after_round'
          ? <button>Время ответов →</button>
          : <AfterRoundNav pack={pack} gameState={gameState} />}
    </div>
  )
}

/** Блиц: синтетическая очередь из фиктивных команд, ход первой на первом
 *  НЕ скрытом вопросе раунда (`showQuestion` — та же чистая функция, что
 *  использует боевой проектор, HANDOFF.md — «новая механика — пять
 *  подключений», предпросмотр теперь входит в их число). */
function BlitzPreview({ round, teams }: { round: LoadedRound; teams: ReturnType<typeof previewTeams> }) {
  const order = teams.map(t => t.id)
  const teamSeconds = (round.settings as { teamSeconds?: number }).teamSeconds ?? 60
  let state = initBlitz(order, teamSeconds)
  const firstQ = round.questions.find(x => !x.hidden)
  if (firstQ) state = showQuestion(state, firstQ.id, serverNow())
  return (
    <BlitzBoard teams={teams} state={state} bank={round.questions}
      questionText={firstQ?.question_text} />
  )
}
