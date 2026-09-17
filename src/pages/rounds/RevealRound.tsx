// ═══ «3 ПОПЫТКИ»: 2–4 картинки → слово ═══
// Состояние — в game_state.melody.rv (общий мешок механик, см. types/quiz.ts).
// Переходы фаз — чистые функции lib/reveal.ts, общие с пультом ведущего
// (AdminPage.tsx:RevealControls) — тот же приём, что у мелодии/скачек:
// два экрана, считающие следующую фазу каждый по-своему, рано или поздно
// разойдутся (см. HANDOFF.md про блиц).
//
// Автопереход по таймеру — ТОЛЬКО здесь (на проекторе). Админка двигает
// фазу вручную кнопкой — если бы оба экрана дёргали переход одновременно,
// фаза могла бы перепрыгнуть.
import { useEffect, useRef, type ReactNode } from 'react'
import { room } from '../../lib/transport'
import { autocheck } from '../../lib/autocheck'
import { gotoQuestion } from '../../lib/gameActions'
import { mediaScaleVar, mediaUrl } from '../../lib/media'
import { FitImg } from '../../components/FitImg'
import { AfterRoundNav } from '../../components/AfterRoundNav'
import { useFitText } from '../../hooks/useFitText'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import { displayRoundNumber } from '../../lib/roundMeta'
import { saveReveal, clearReveal } from '../../lib/revealActions'
import {
  revealStart, revealNext, revealSwitchAt, revealVisible, revealGroups,
  revealLetterOpen, revealAllAnswered,
} from '../../lib/reveal'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, MelodyState, RevealSettings, RevealState } from '../../types/quiz'

export function RevealBoard({ pack, round, gameState, timerNode }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
  /** Timer живёt в HostScreen.tsx и не экспортируется (импорт оттуда тянул
   *  бы весь проектор в чужой чанк) — проектор передаёт готовую фабрику:
   *  seconds/chime меняются по фазам, поэтому нужна функция, не одна нода. */
  timerNode: (seconds: number, key: string, chime: boolean) => ReactNode
}) {
  const s = round.settings as RevealSettings
  const bag: MelodyState = gameState.melody ?? {}
  const q = round.questions[gameState.question_index]
  const paperMode = pack.settings?.play_mode === 'paper'
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const isLast = gameState.question_index + 1 >= round.questions.length

  // rv стадии ПРЕДЫДУЩЕГО вопроса иногда доживает в состоянии (например, на
  // бумаге — пока ведущий не нажал «▶ ПРОЧИТАЛ», эффект ниже не пишет
  // новое состояние): без этой развязки на новом вопросе на миг мелькнул
  // бы экран разбора старого.
  const rawRv: RevealState = bag.rv ?? {}
  const rv: RevealState = q && rawRv.qid === q.id ? rawRv : {}
  const rows = q ? answers.filter(a => a.question_ref === `q-${q.id}`) : []

  const bagRef = useRef(bag)
  bagRef.current = bag
  const advancedRef = useRef<string | undefined>(undefined)
  const checkedRef = useRef<string | undefined>(undefined)

  // ── старт фазы 1 при смене вопроса (или после «▶ ПРОЧИТАЛ» на бумаге) ──
  useEffect(() => {
    if (!q || rawRv.qid === q.id) return
    if (paperMode && !gameState.timer_started_at) return
    void saveReveal(bagRef.current, revealStart(q.id, s))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, rawRv.qid, paperMode, gameState.timer_started_at])

  // ── автопереход по таймеру: строго один раз на фазу ──
  useEffect(() => {
    if (!q || !rv.phase || rv.phase === 'review') return
    const key = `${rv.qid}:${rv.phase}`
    const switchAt = revealSwitchAt(rv)
    if (!switchAt) return
    const tick = () => {
      if (document.hidden || Date.now() < switchAt || advancedRef.current === key) return
      advancedRef.current = key
      const allAnswered = rv.phase === 1 && !paperMode
        && revealAllAnswered(teams.map(t => t.id), rows)
      void saveReveal(bagRef.current, revealNext(rv, s, allAnswered))
    }
    tick()
    const t = window.setInterval(tick, 300)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, rv.qid, rv.phase, rv.startedAt, rv.phaseSec])

  // ── вход в разбор: автопроверка неоценённых ответов, один раз на вопрос ──
  useEffect(() => {
    if (!q || rv.phase !== 'review' || checkedRef.current === q.id) return
    checkedRef.current = q.id
    rows.forEach(a => {
      if (a.is_correct != null) return
      const ok = autocheck(q.answer, a.answer_text)
      if (ok === null) return
      void room.patchAnswer(a.id, { is_correct: ok }).catch(() => {})
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, rv.phase, rows.length])

  // ── выход из раунда: доска не должна остаться «занятой» на следующей игре ──
  useEffect(() => () => { void clearReveal(bagRef.current) }, [])

  const word = q?.answer.mode === 'crossword_word' ? q.answer.word : ''
  const groups = useFitText<HTMLDivElement>([word, rv.phase])

  if (!q) return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">3 ПОПЫТКИ</div>
      <p style={{ opacity: .7 }}>В этом раунде нет вопросов — добавь их в редакторе</p>
    </div>
  )

  const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  const phase = rv.phase ?? 1
  const visible = revealVisible(imgs.length, phase)
  const letterGroups = revealGroups(word)
  const openLetters = q.service.openLetters

  const manualNext = () => {
    if (rv.phase === 'review') {
      if (!isLast) void gotoQuestion(gameState.question_index + 1)
      return
    }
    void saveReveal(bag, revealNext(rv, s, false))
  }

  let flat = -1

  return (
    <div className="host-screen grid-bg has-media rv-screen">
      <div className="host-topbar">
        <span className="qnum">Р{displayRoundNumber(pack, gameState.round_number)} · ВОПРОС{' '}
          <b>{gameState.question_index + 1}</b> / {round.questions.length}
          {rv.phase !== 'review' && <> · ФАЗА {phase}</>}</span>
        {rv.phase !== 'review' && rv.phaseSec != null
          && timerNode(rv.phaseSec, `${rv.qid}-${rv.phase}`, rv.phase === 3)}
      </div>

      <div className={visible <= 3 ? `q-media-grid n${visible} eq-row` : 'q-media-grid rv-2x2'}
        style={mediaScaleVar(q)}>
        {imgs.slice(0, visible).map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
      </div>

      <div className="rv-word-wrap">
        <div className="rv-word" ref={groups}>
          {letterGroups.map((g, gi) => (
            <span className="rv-group" key={gi}>
              {g.map((ch, k) => {
                flat++
                const isOpen = revealLetterOpen(flat, openLetters, phase)
                return <span key={k} className={`rv-cell${isOpen ? ' open' : ''}`}>
                  {isOpen ? ch : '?'}</span>
              })}
            </span>
          ))}
        </div>
      </div>

      {rv.phase === 'review' && (
        <div className="rv-review">
          <div className="rv-answer">{word}</div>
          {q.answer_note && <div className="rv-note">{q.answer_note}</div>}
        </div>
      )}
      {rv.phase === 'review' && (
        <div className="rv-teams">
          {rows.map(a => {
            const team = teams.find(t => t.id === a.team_id)
            return <span key={a.id} style={{ color: team?.color }}>
              {team?.name ?? '—'}: {a.answer_text || '—'}
              {a.stake != null && ` · фаза ${a.stake}`}
              {a.is_correct === true ? ' ✓' : a.is_correct === false ? ' ✗' : ''}
            </span>
          })}
        </div>
      )}

      <div className="host-actions">
        {rv.phase === 'review' && isLast
          ? <AfterRoundNav pack={pack} gameState={gameState} />
          : <button onClick={manualNext}>Дальше →</button>}
      </div>
    </div>
  )
}
