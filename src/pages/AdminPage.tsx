import { getRoomId } from '../lib/room'
import { RoomPicker } from './RoomPicker'
import { VERSION } from '../version'
import { useEffect, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { useTeams } from '../hooks/useTeams'
import { useAnswers } from '../hooks/useAnswers'
import { loadPack, metaLine, displayRoundNumber, type LoadedPack } from '../lib/packLoader'
import {
  gotoRound, slideForRound, gotoQuestion, revealAnswer, finishGame, resetGame,
  gotoAnswers, showScoreboard, startAnswerTime, setPhase, selectPackAndStart, startBreak,
  setFinaleStep, setFinaleMode, registerTeam, deleteTeam, renameTeam, startTimer, resetGameHard,
} from '../lib/gameActions'
import { afterRoundStep } from '../lib/flow'
import { loadRatings, summarize, type RatingRow } from '../lib/ratings'
import { useBlitz, saveBlitz } from '../lib/blitzApi'
import {
  initBlitz, showQuestion, answerCorrect, answerWrong, skip,
  pauseForCheck, resumeAfterCheck, finishNoQuestions, pickNext,
  remainingCount, currentTeam, toResults, MAX_ATTEMPTS, type BlitzState,
} from '../lib/blitzState'
import { blitzResults } from '../lib/blitz'
import { hideQuestion } from '../lib/editorApi'
import { enqueueAnswer } from '../lib/answerQueue'
import {
  isDevMode, disableDevMode, seedTeams, seedRoundAnswers, checkRoundScoring, clearSeed,
  type CheckRow,
} from '../lib/devSeed'
import { teamColor, nextFreeColor } from '../lib/teamColors'
import { supabase } from '../lib/supabase'
import { listPacks } from '../lib/packLoader'
import type { Answer, Pack, Team } from '../types/quiz'

// ═══ Админка (телефон ведущего) — перенос структуры старого AdminPage ═══
// ВЕДУЩИЙ: шапка со ссылками → строка статуса → экран по фазе →
// нижняя панель управления (назад/дальше, смена раунда, рандомайзер, сброс).

export function AdminPage() {
  const { gameState, loading: gsLoading, roomId } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const teams = useTeams(gameState?.game_id ?? null)
  const answers = useAnswers(gameState?.game_id ?? null, gameState?.round_number)

  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id, true).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])

  if (!gsLoading && !roomId) return <RoomPicker route="/admin" />
  if (!gameState) return <div className="cyber adm-center">// ЗАГРУЗКА…</div>

  const round = pack?.rounds[gameState.round_number]
  const phase = gameState.phase

  return (
    <div className="cyber adm-root">
      <div className="adm-header">
        <div className="adm-brand">ВЕДУЩИЙ <span style={{ opacity: .45, fontSize: 11 }}>v{VERSION}</span></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a className="adm-link" href="./" target="_blank" rel="noreferrer">ПРОЕКТОР ↗</a>
          <button className="adm-link" onClick={() => {
            const url = `${location.origin}${location.pathname}#/player?room=${getRoomId() ?? ''}`
            void navigator.clipboard?.writeText(url)
          }}>ССЫЛКА ИГРОКАМ</button>
        </div>
      </div>

      <div className="adm-status">
        {pack ? `${pack.name} · Р${displayRoundNumber(pack, gameState.round_number)}` : 'пакет не выбран'} · {phase}
        {round && (phase === 'question' || phase === 'show_answers')
          && round.mechanic !== 'melody' && round.mechanic !== 'jeopardy'
          ? ` · ${gameState.question_index + 1}/${round.questions.length}` : ''}
      </div>

      {!gameState.pack_id && <PackPicker />}

      {gameState.pack_id && phase === 'lobby' && pack && (
        <div className="adm-pad">
          <TeamRandomizer />
          <RoundPicker pack={pack} current={gameState.round_number} />
        </div>
      )}

      {phase === 'finale' && <FinalePanel pack={pack} gameId={gameState.game_id}
        teams={teams} gameState={gameState} />}

      {gameState.pack_id && phase !== 'lobby' && phase !== 'finale' && pack && round && (
        <RoundView pack={pack} round={round} gameState={gameState} teams={teams} answers={answers} />
      )}
    </div>
  )
}

// ── Выбор пакета (новое: раньше пакет был один, зашитый в код) ──
function PackPicker() {
  const [packs, setPacks] = useState<Pack[]>([])
  const [sel, setSel] = useState('')
  useEffect(() => { void listPacks().then(setPacks).catch(() => {}) }, [])
  return (
    <div className="adm-pad">
      <div className="adm-dim">ВЫБЕРИ ПАКЕТ</div>
      <select value={sel} onChange={e => setSel(e.target.value)} style={{ width: '100%' }}>
        <option value="">—</option>
        {packs.map(p => <option key={p.id} value={p.id}>{p.name} ({p.status})</option>)}
      </select>
      <button className="adm-btn primary" disabled={!sel}
        onClick={() => void selectPackAndStart(sel)}>НАЧАТЬ ИГРУ</button>
    </div>
  )
}

// ── Рандомайзер команд (перенос as is) ──
// палитра общая для всего проекта, см. lib/teamColors.ts

function TeamRandomizer() {
  const [namesText, setNamesText] = useState('')
  const [teamCount, setTeamCount] = useState('4')
  const [preview, setPreview] = useState<string[][] | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [open, setOpen] = useState(false)

  const shuffle = () => {
    const names = namesText.split('\n').map(s => s.trim()).filter(Boolean)
    if (names.length === 0) return
    const shuffled = [...names].sort(() => Math.random() - 0.5)
    const n = Math.max(2, Math.min(8, parseInt(teamCount, 10) || 2))
    const groups: string[][] = Array.from({ length: n }, () => [])
    shuffled.forEach((name, i) => groups[i % n].push(name))
    setPreview(groups)
  }

  const publish = async () => {
    if (!preview) return
    setPublishing(true)
    await supabase.from('game_sessions')
      .update({ random_groups: preview } as never).eq('id', getRoomId())
      .then(() => {}, () => {})
    setPublishing(false)
  }

  return (
    <div className="adm-box">
      <button className="adm-link" onClick={() => setOpen(o => !o)}>
        {open ? 'СКРЫТЬ РАНДОМАЙЗЕР КОМАНД' : '🎲 РАНДОМАЙЗЕР КОМАНД'}
      </button>
      {open && (<>
        <div className="adm-dim">ВСТАВЬ ИМЕНА — КАЖДОЕ С НОВОЙ СТРОКИ</div>
        <textarea rows={5} value={namesText} placeholder={'Ваня\nМаша\nПетя\n…'}
          onChange={e => { setNamesText(e.target.value); setPreview(null) }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="adm-dim">КОМАНД:</span>
          <input inputMode="numeric" value={teamCount} placeholder="2-8" style={{ width: 64, textAlign: 'center' }}
            onChange={e => { setTeamCount(e.target.value.replace(/[^0-9]/g, '')); setPreview(null) }} />
          <button className="adm-btn primary" onClick={shuffle}>🎲 ПЕРЕМЕШАТЬ</button>
          {/* очистка нужна ИМЕННО здесь: перед игрой, а не после финала */}
          <button className="adm-btn danger" onClick={() => {
            if (!confirm('ПОЛНАЯ ОЧИСТКА.\n\nБудут удалены все команды и ответы '
              + 'этой и прошлых игр. Восстановить нельзя. Продолжить?')) return
            if (!confirm('Точно удалить? Второе подтверждение.')) return
            void resetGameHard()
              .then(() => alert('Готово: команды и ответы удалены.'))
              .catch(e => alert(e instanceof Error ? e.message : 'не удалось очистить'))
          }}>🗑 ОЧИСТИТЬ КОМАНДЫ И ОТВЕТЫ</button>
        </div>
        {preview && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {preview.map((group, i) => (
              <div key={i} className="adm-group" style={{
                borderColor: teamColor(i),
                borderLeft: `3px solid ${teamColor(i)}`,
              }}>
                <div style={{ color: teamColor(i), fontSize: 13 }}>КОМАНДА {i + 1}</div>
                <div style={{ fontSize: 14, opacity: .85 }}>{group.join(', ') || '—'}</div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="adm-btn" onClick={shuffle}>↻ ЕЩЁ РАЗ</button>
              <button className="adm-btn ok" disabled={publishing} onClick={() => void publish()}>
                {publishing ? 'ПУБЛИКУЮ…' : '📺 ПОКАЗАТЬ НА ЭКРАНЕ'}
              </button>
            </div>
          </div>
        )}
      </>)}
    </div>
  )
}

function RoundPicker({ pack, current }: { pack: LoadedPack; current: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="adm-dim">ВЫБЕРИ РАУНД ДЛЯ СТАРТА</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {pack.rounds.map((r, i) => (
          pack.settings?.play_mode === 'paper'
            && (r.mechanic === 'melody' || r.mechanic === 'jeopardy') ? null :
          <button key={r.id} className={`adm-round${current === i ? ' active' : ''}`}
            onClick={() => void gotoRound(i,
              slideForRound(pack.settings?.info_slides, i) ?? undefined)}>
            Р{displayRoundNumber(pack, i)} {r.title_lines.join(' ')}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Экран раунда ──
function RoundView({ pack, round, gameState, teams, answers }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  teams: Team[]; answers: Answer[]
}) {
  const [showRoundSwitch, setShowRoundSwitch] = useState(false)
  const phase = gameState.phase
  const step = gameState.question_index
  const isJeopardy = round.mechanic === 'jeopardy'
  // интерактивные механики управляются с проектора; стандартный маршрут
  // «вопрос → время ответов → разбор» для них не существует
  const isBlitz = round.mechanic === 'blitz'
  const isInteractive = isJeopardy || isBlitz
    || round.mechanic === 'melody' || round.mechanic === 'race'
  const recapOn = !!(round.settings as { recap_before_answers?: boolean }).recap_before_answers
  // шаг после раунда берём из общего модуля: раньше здесь была своя копия
  // логики, которая игнорировала перерыв и расходилась с проектором
  const runAfterRound = () => {
    const st = afterRoundStep(pack, gameState.round_number, gameState.phase)
    if (st.kind === 'scoreboard') return void showScoreboard()
    if (st.kind === 'break') return void startBreak()
    if (st.kind === 'finale') return void finishGame(gameState.pack_id)
    return void gotoRound(gameState.round_number + 1,
      slideForRound(pack.settings?.info_slides, gameState.round_number + 1) ?? undefined)
  }
  const endRound = runAfterRound

  const grade = async (a: Answer, correct: boolean) => {
    await supabase.from('answers').update({ is_correct: correct }).eq('id', a.id)
  }

  const advance = () => {
    if (phase === 'round_intro') { void gotoQuestion(0); return }
    if (phase === 'question') {
      if (step + 1 < round.questions.length) { void gotoQuestion(step + 1); return }
      // Повтор вопросов слайдами — если включён в редакторе. Идёт ПЕРЕД
      // временем на ответы: зал ещё раз видит все вопросы, потом отвечает.
      if (recapOn && round.answers_reveal === 'after_round') { void setPhase('recap'); return }
      if (round.answers_reveal === 'after_round') void startAnswerTime()
      else void gotoAnswers(0)
      return
    }
    if (phase === 'recap') { void startAnswerTime(); return }
    if (phase === 'answer_time') { void gotoAnswers(0); return }
    // с табло и из перерыва идём по общему маршруту: с табло может быть
    // ещё перерыв, а вот из перерыва — только вперёд
    if (phase === 'scoreboard' || phase === 'break') runAfterRound()
  }
  const goBack = () => {
    if (phase === 'question' && step > 0) void gotoQuestion(step - 1)
    else if (phase === 'question') void setPhase('round_intro')
    else if (phase === 'recap') void gotoQuestion(round.questions.length - 1)
    else if (phase === 'answer_time') {
      if (recapOn) void setPhase('recap')
      else void gotoQuestion(round.questions.length - 1)
    }
  }

  return (
    <div className="adm-flex">
      {phase === 'show_answers' && (
        <AnswersView pack={pack} round={round} gameState={gameState}
          answers={answers} teams={teams} onGrade={grade} />
      )}

      {phase !== 'show_answers' && (
        <div className="adm-mid">
          <QuestionTextOnly round={round} gameState={gameState} />
          {(phase === 'question' || phase === 'recap' || phase === 'answer_time') && (
            <AnsweredIndicator round={round} gameState={gameState} answers={answers} teams={teams} />
          )}
        </div>
      )}

      <div className="adm-footer">
        {isBlitz && phase === 'question' && (
          <BlitzControls pack={pack} round={round} gameState={gameState} />
        )}

        {!isInteractive && phase !== 'show_answers' && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="adm-btn" onClick={goBack}>← НАЗАД</button>
            <button className="adm-btn primary" onClick={advance}>ДАЛЬШЕ →</button>
          </div>
        )}
        {isInteractive && phase === 'round_intro' && (
          <button className="adm-btn primary" onClick={() => void gotoQuestion(0)}>НАЧАТЬ РАУНД →</button>
        )}
        {isInteractive && phase !== 'round_intro' && (<>
          <div className="adm-dim">
            {round.mechanic === 'race' ? 'ЗАБЕГ УПРАВЛЯЕТСЯ С ПРОЕКТОРА'
              : round.mechanic === 'melody' ? 'РАУНД УПРАВЛЯЕТСЯ С ПРОЕКТОРА (ШАРЫ/МОДАЛКА)'
              : 'РАУНД УПРАВЛЯЕТСЯ ПЛИТКАМИ НА ПРОЕКТОРЕ'}
          </div>
          <button className="adm-btn primary" onClick={endRound}>
            ЗАВЕРШИТЬ РАУНД {`${(round.settings as { show_scoreboard_after?: boolean }).show_scoreboard_after ? '→ ТАБЛО' : '→'}`}
          </button>
        </>)}
        {phase !== 'show_answers' && (
          <div className="adm-row-btns">
            {/* повтор вопроса: перезапускает таймер, не сбивая номер вопроса.
                Нужен, когда команды не расслышали или зависла музыка */}
            {(phase === 'question' || phase === 'answer_time') && (
              <button className="adm-btn" onClick={() => void startTimer()}
                title="Заново запустить таймер на этом же вопросе">↻ ПОВТОР ВОПРОСА</button>
            )}
            <button className="adm-btn" onClick={() => void showScoreboard()}>ТАБЛО</button>
            <button className="adm-btn" onClick={() => void revealAnswer()}>ПОКАЗАТЬ ОТВЕТ</button>
          </div>
        )}

        <RatingsPanel pack={pack} gameState={gameState} />

        <InfoSlidesButtons pack={pack} gameState={gameState} />

        <DevSeedPanel pack={pack} gameState={gameState} />

        <button className="adm-link" onClick={() => setShowRoundSwitch(s => !s)}>
          {showRoundSwitch ? 'СКРЫТЬ СПИСОК РАУНДОВ' : 'СМЕНИТЬ РАУНД'}
        </button>
        {showRoundSwitch && <RoundPicker pack={pack} current={gameState.round_number} />}

        {/* на бумаге: сначала заводим команды, потом ставим им баллы.
            Блоки доступны всегда — команда может прийти в середине игры */}
        {pack.settings?.play_mode === 'paper' && <>
          <TeamsPanel gameId={gameState.game_id} teams={teams} />
          {phase !== 'lobby' &&
            <PaperScores pack={pack} gameState={gameState} teams={teams} />}
        </>}

        <TeamRandomizer />

        {round.mechanic === 'melody' && (
          <button className="adm-link" onClick={async () => {
            if (!confirm('Сбросить раунд «Угадай мелодию»: все плитки снова доступны?')) return
            await supabase.from('game_sessions').update({ melody: {} }).eq('id', getRoomId())
          }}>↻ СБРОСИТЬ ПЛИТКИ МЕЛОДИИ</button>
        )}
        <div className="adm-footer-links">
        <button className="adm-link" onClick={async () => {
          if (!confirm('Сменить пакет: игра вернётся в лобби с выбором пакета. Ответы и команды останутся.')) return
          await supabase.from('game_sessions').update({
            phase: 'lobby', round_number: 0, question_index: 0,
            timer_started_at: null, reveal: false, melody: {},
          }).eq('id', getRoomId())
        }}>⇄ СМЕНИТЬ ПАКЕТ</button>
        <button className="adm-link danger" onClick={() => {
          if (confirm('НОВАЯ ИГРА: сбросить состояние игры? Ответы останутся в БД.')) void resetGame()
        }}>⟲ НОВАЯ ИГРА (ПОЛНЫЙ СБРОС)</button>
        </div>
      </div>
    </div>
  )
}

// ── Проверка ответов (перенос AdminAnswersView) ──
function AnswersView({ pack, round, gameState, answers, teams, onGrade }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  answers: Answer[]; teams: Team[]
  onGrade: (a: Answer, correct: boolean) => Promise<void>
}) {
  const step = gameState.question_index
  const questions = round.questions.filter(q => !q.hidden)
  const total = questions.length
  const q = questions[step]
  const rows = answers.filter(a => a.question_ref === `q-${q?.id}`)
  const last = gameState.round_number + 1 >= pack.rounds.length
  const showSb = !!(round.settings as { show_scoreboard_after?: boolean }).show_scoreboard_after

  return (
    <div className="adm-answers">
      <div className="adm-answers-head">
        <div className="adm-brand">ОТВЕТЫ КОМАНД</div>
        <div className="adm-dim">ВОПРОС {step + 1} / {total}</div>
      </div>
      {q && <div className="adm-correct">Верный: <b>{correctOf(q)}</b></div>}

      {rows.length === 0 && <div className="adm-empty">ответов нет</div>}
      {rows.map(a => {
        const team = teams.find(t => t.id === a.team_id)
        return (
          <div key={a.id} className="adm-answer" style={{
            borderLeft: `4px solid ${a.is_correct === true ? '#22c55e' : a.is_correct === false ? '#ef4444' : (team?.color ?? '#333')}`,
          }}>
            <div className="adm-answer-top">
              <span style={{ color: team?.color, fontWeight: 700 }}>{team?.name ?? '—'}</span>
              <span className="adm-answer-text">{a.answer_text || '—'}
                {a.stake != null && <span className="acc"> · ст.{a.stake}</span>}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`adm-grade ok${a.is_correct === true ? ' on' : ''}`}
                onClick={() => void onGrade(a, true)}>✓ ВЕРНО</button>
              <button className={`adm-grade no${a.is_correct === false ? ' on' : ''}`}
                onClick={() => void onGrade(a, false)}>✗ НЕВЕРНО</button>
            </div>
          </div>
        )
      })}

      <div className="adm-answers-nav">
        <button className="adm-btn" disabled={step === 0}
          onClick={() => void gotoAnswers(step - 1, true)}>← НАЗАД</button>
        <button className="adm-btn primary" onClick={() => {
          if (step < total - 1) { void gotoAnswers(step + 1); return }
          // настройка раунда «показать табло» раньше игнорировалась здесь:
          // после разбора сразу уходили в финал или в табло независимо от неё
          if (showSb) { void showScoreboard(); return }
          if (last) void finishGame(gameState.pack_id)
          else void gotoRound(gameState.round_number + 1,
            slideForRound(pack.settings?.info_slides, gameState.round_number + 1) ?? undefined)
        }}>{step < total - 1 ? 'СЛЕД. ВОПРОС →'
          : showSb ? 'К ТАБЛО →' : last ? 'ФИНАЛ →' : 'СЛЕД. РАУНД →'}</button>
      </div>
    </div>
  )
}

function correctOf(q: LoadedPack['rounds'][number]['questions'][number]): string {
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display ?? a.correct ?? a.word ?? a.correct_choice ?? a.correct_order ??
    (Array.isArray(a.correct_pairs) ? (a.correct_pairs as string[]).join(' ') : '—')
  return Array.isArray(d) ? d.join(' · ') : String(d)
}

// ── Шпаргалка ведущего по фазам (перенос QuestionTextOnly) ──
function QuestionTextOnly({ round, gameState }: {
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const step = gameState.question_index
  const phase = gameState.phase
  if (phase === 'round_intro') return (
    <div className="adm-centered">
      <div className="adm-h1">{round.title_lines.join(' ')}</div>
      <div className="adm-dim">{metaLine(round)}</div>
      <div style={{ textAlign: 'left', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {round.rules.map((r, i) => <div key={i} style={{ fontSize: 14, opacity: .8 }}>{i + 1}. {r}</div>)}
      </div>
    </div>
  )
  if (phase === 'answer_time') return (
    <div className="adm-centered"><div className="adm-h1 ok">ВРЕМЯ ОТВЕТОВ</div></div>
  )
  if (phase === 'scoreboard') return (
    <div className="adm-centered"><div className="adm-h1">ТАБЛО</div>
      <div className="adm-dim">команды смотрят промежуточные результаты</div></div>
  )
  if (phase === 'break') return (
    <div className="adm-centered"><div className="adm-h1">ПЕРЕРЫВ</div>
      <div className="adm-dim">по кнопке ниже игра пойдёт дальше</div></div>
  )
  if (phase === 'question') {
    const q = round.questions[step]
    return (
      <div className="adm-centered">
        <div className="adm-dim">ВОПРОС {step + 1} / {round.questions.length}</div>
        <div className="adm-qtext">{q?.question_text || '(без текста — только медиа на проекторе)'}</div>
        {q && <div className="adm-correct">Верный: <b>{correctOf(q)}</b></div>}
        {q?.answer.mode === 'choice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 320, width: '100%' }}>
            {q.answer.choices.map(c => (
              <div key={c.key} style={{ fontSize: 14, opacity: .7 }}>{c.key} — {c.text}</div>
            ))}
          </div>
        )}
        {q?.answer_note && <div className="adm-dim">{q.answer_note}</div>}
      </div>
    )
  }
  return null
}

// ── «Ответили N из M» (перенос AnsweredIndicator) ──
function AnsweredIndicator({ round, gameState, answers, teams }: {
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  answers: Answer[]; teams: Team[]
}) {
  const q = round.questions[gameState.question_index]
  const filled = [...teams].sort((x, y) => x.name.localeCompare(y.name)).map(t => ({
    team: t,
    done: answers.some(a => a.team_id === t.id && a.question_ref === `q-${q?.id}` && a.answer_text?.trim()),
  }))
  const doneCount = filled.filter(f => f.done).length
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="adm-counter" style={{
        color: doneCount === teams.length && teams.length > 0 ? '#22c55e' : '#ea580c',
      }}>ОТВЕТИЛИ {doneCount} / {teams.length}</div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
        {filled.map(({ team, done }) => (
          <span key={team.id} className={`adm-chip${done ? ' done' : ''}`}>
            {done ? '✓ ' : ''}{team.name}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Бумажный режим: ручные баллы за раунд ──
/** Команды в админке. На бумаге это ЕДИНСТВЕННЫЙ способ их завести:
 *  QR никто не сканирует, значит регистрации с телефонов не будет. */
function TeamsPanel({ gameId, teams }: { gameId: string; teams: Team[] }) {

  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)

  const add = async () => {
    const n = name.trim()
    if (!n || busy) return
    setBusy(true)
    try {
      await registerTeam(n, nextFreeColor(teams.map(t => t.color)), gameId)
      setName('')
    } finally { setBusy(false) }
  }

  return (
    <div className="adm-box">
      <div className="adm-dim">КОМАНДЫ ({teams.length})</div>
      {teams.length === 0 && <div className="adm-dim">Ни одной команды. Добавь их здесь —
        на бумаге сами они не подключатся.</div>}
      {[...teams].sort((a, b) => a.name.localeCompare(b.name)).map(t => (
        <div key={t.id} className="paper-row">
          <span className="team-dot" style={{ background: t.color }} />
          <input defaultValue={t.name} style={{ flex: 1, minWidth: 0 }}
            onBlur={e => { const v = e.target.value.trim()
              if (v && v !== t.name) void renameTeam(t.id, v) }} />
          <button className="adm-btn danger" style={{ flex: '0 0 auto', padding: '8px 12px' }}
            onClick={() => { if (confirm(`Удалить «${t.name}» вместе с её баллами?`)) void deleteTeam(t.id) }}>✕</button>
        </div>
      ))}
      <div className="paper-row">
        <input placeholder="Название команды" value={name} style={{ flex: 1, minWidth: 0 }}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') void add() }} />
        <button className="adm-btn primary" style={{ flex: '0 0 auto' }}
          disabled={!name.trim() || busy} onClick={() => void add()}>+ ДОБАВИТЬ</button>
      </div>
    </div>
  )
}

function PaperScores({ pack, gameState, teams }: {
  pack: LoadedPack; teams: Team[]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const answers = useAnswers(gameState.game_id)
  // раунд, который правим: по умолчанию текущий, но можно вернуться к прошлым —
  // на бумаге ошибки в подсчёте всплывают уже после того, как раунд закрыт
  const [ri, setRi] = useState(gameState.round_number)
  useEffect(() => { setRi(gameState.round_number) }, [gameState.round_number])
  const [vals, setVals] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  // подтягиваем уже сохранённые баллы, иначе ведущий правит вслепую
  const stored = new Map<string, number>()
  for (const a of answers) {
    if (a.question_ref === `q-paper-${ri}`) stored.set(a.team_id, Number(a.stake ?? 0))
  }
  useEffect(() => { setVals({}); setSaved({}) }, [ri])

  const save = async (teamId: string) => {
    const raw = vals[teamId]
    const pts = Number(raw === undefined || raw === '' ? stored.get(teamId) ?? 0 : raw)
    if (Number.isNaN(pts)) return
    await supabase.from('answers').upsert({
      team_id: teamId, game_id: gameState.game_id, question_ref: `q-paper-${ri}`,
      round_number: ri, answer_text: String(pts), stake: pts, is_correct: true,
    } as never, { onConflict: 'team_id,game_id,question_ref' } as never)
    setSaved(v => ({ ...v, [teamId]: true }))
    setTimeout(() => setSaved(v => ({ ...v, [teamId]: false })), 1500)
  }

  const scored = pack.rounds.map((r, i) => ({ r, i })).filter(x => !x.r.off_scoreboard)
  const sum = teams.reduce((acc, t) => acc + (Number(vals[t.id] ?? stored.get(t.id) ?? 0) || 0), 0)

  return (
    <div className="adm-box">
      <div className="adm-dim">БАЛЛЫ ЗА РАУНД (БУМАГА)</div>
      {/* выбор раунда: правки задним числом — обязательный сценарий на бумаге */}
      <div className="paper-rounds">
        {scored.map(({ r, i }) => (
          <button key={r.id} className={`adm-round${i === ri ? ' active' : ''}`}
            onClick={() => setRi(i)}>Р{displayRoundNumber(pack, i)}</button>
        ))}
      </div>
      {ri !== gameState.round_number &&
        <div className="adm-warn">правишь ПРОШЛЫЙ раунд Р{displayRoundNumber(pack, ri)}</div>}
      {[...teams].sort((x, y) => x.name.localeCompare(y.name)).map(t => {
        const has = stored.has(t.id)
        return (
          <div key={t.id} className="paper-row">
            <span style={{ color: t.color, flex: 1 }}>{t.name}</span>
            <input inputMode="numeric" className={has ? 'has' : ''}
              style={{ width: 80, textAlign: 'center' }}
              value={vals[t.id] ?? (has ? String(stored.get(t.id)) : '')}
              placeholder="—"
              onChange={e => setVals(v => ({ ...v, [t.id]: e.target.value }))} />
            <button className={`adm-btn ok${saved[t.id] ? ' flash' : ''}`}
              style={{ flex: '0 0 auto', padding: '8px 14px' }}
              onClick={() => void save(t.id)}>{saved[t.id] ? '✔' : '✓'}</button>
          </div>
        )
      })}
      <div className="adm-dim">введено за раунд: {sum} · без оценки: {
        teams.filter(t => !stored.has(t.id) && !vals[t.id]).length}</div>
    </div>
  )
}

// ── Финал ──
function FinalePanel({ pack, gameId, teams, gameState }: {
  pack: LoadedPack | null; gameId: string; teams: Team[]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']> | null
}) {
  const answers = useAnswers(gameId)
  const bar = !!gameState?.reveal
  const step = gameState?.question_index ?? 0
  const scoredRounds = pack ? pack.rounds.filter(r => !r.off_scoreboard).length : 0
  const barLabels = ['ПОКАЗАТЬ 3 МЕСТО', 'ПОКАЗАТЬ 2 МЕСТО', 'ПОКАЗАТЬ ПОБЕДИТЕЛЯ', 'ПОКАЗАТЬ ТАБЛИЦУ']
  return (
    <div className="adm-pad">
      <div className="adm-h1">ФИНАЛ</div>
      <div className="adm-dim">Команд: {teams.length} · ответов: {answers.length}</div>
      {pack && <div className="adm-dim">Пакет: {pack.name}</div>}

      <div className="adm-box">
        <div className="adm-dim">СЦЕНАРИЙ</div>
        <div className="adm-two">
          <button className={`adm-btn${!bar ? ' primary' : ''}`}
            onClick={() => void setFinaleMode('show')}>ШОУ (АВТО)</button>
          <button className={`adm-btn${bar ? ' primary' : ''}`}
            onClick={() => void setFinaleMode('bar')}>НАГРАЖДЕНИЕ (БАР)</button>
        </div>
        <div className="adm-dim">
          {bar
            ? 'Ручной режим: 3 → 2 → 1 место, каждый шаг по твоей команде. Успеваешь вручить и сфотографировать.'
            : `Авто: ${scoredRounds} слайдов по раундам (15 сек) → победитель (10 сек) → общая таблица.`}
        </div>
      </div>

      <div className="adm-box">
        <div className="adm-dim">
          {bar ? `ШАГ ${Math.min(step + 1, 4)} ИЗ 4` : 'МОЖНО ПРОМОТАТЬ ВРУЧНУЮ'}
        </div>
        <div className="adm-two">
          <button className="adm-btn" disabled={step <= 0}
            onClick={() => void setFinaleStep(Math.max(0, step - 1))}>← НАЗАД</button>
          <button className="adm-btn primary"
            disabled={bar && step >= 3}
            onClick={() => void setFinaleStep(step + 1)}>
            {bar ? (barLabels[step] ?? 'ДАЛЬШЕ →') : 'ДАЛЬШЕ →'}
          </button>
        </div>
      </div>

      {/* Кнопка очистки ОДНА на всю админку — она в лобби, где и нужна
          перед игрой. Здесь был её дубль с тем же действием: две кнопки
          с одинаковым смыслом только путали. */}
      {/* Почему у команды столько баллов — видно здесь, а не «на глаз».
          Главная причина нулей: ответ есть, но ведущий не нажал верно/неверно. */}
      <details className="adm-why">
        <summary>Почему такие баллы?</summary>
        {teams.map(t => {
          const mine = answers.filter(a => a.team_id === t.id)
          const graded = mine.filter(a => a.is_correct !== null).length
          const pending = mine.filter(a => a.is_correct === null
            && !a.question_ref.endsWith('-bid')).length
          return (
            <div key={t.id} className="adm-why-row">
              <span style={{ color: t.color }}>{t.name}</span>
              <span className="adm-dim">
                ответов {mine.length} · оценено {graded}
                {pending > 0 && ` · НЕ ОЦЕНЕНО ${pending}`}
              </span>
            </div>
          )
        })}
        <div className="adm-dim">Неоценённые ответы баллов не приносят.</div>
      </details>

      <button className="adm-link danger" onClick={() => {
        if (confirm('Начать новую игру?\n\nКоманды и ответы сохранятся в базе. '
          + 'Полная очистка — кнопкой в лобби.')) void resetGame()
      }}>⟲ НОВАЯ ИГРА</button>
    </div>
  )
}

/** Панель репетиции: видна ТОЛЬКО при ?dev=1 в адресе.
 *  На боевой игре её не существует — случайно нажать нечего. */
function DevSeedPanel({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState('')
  const [check, setCheck] = useState<CheckRow[] | null>(null)
  if (!isDevMode()) return null

  const run = async (label: string, fn: () => Promise<string>) => {
    setBusy(label); setMsg(''); setCheck(null)
    try { setMsg(await fn()) } catch (e) { setMsg('Ошибка: ' + (e as Error).message) }
    finally { setBusy('') }
  }

  return (
    <div className="adm-dev">
      <div className="adm-dim">РЕПЕТИЦИЯ · ?dev=1</div>
      <div className="adm-dev-row">
        <button className="adm-btn" disabled={!!busy}
          onClick={() => void run('teams', async () => {
            const n = await seedTeams(gameState.game_id)
            return n ? `Создано команд: ${n}` : 'Демо-команды уже есть'
          })}>+ ДЕМО-КОМАНДЫ</button>
        <button className="adm-btn" disabled={!!busy}
          onClick={() => void run('answers', async () => {
            const r = await seedRoundAnswers(pack, gameState.round_number, gameState.game_id)
            return r.teams
              ? `Ответов: ${r.rows} за ${r.teams} команд`
              : 'Сначала создай демо-команды'
          })}>ЗАПОЛНИТЬ РАУНД</button>
      </div>
      <div className="adm-dev-row">
        <button className="adm-btn" disabled={!!busy}
          onClick={() => { disableDevMode(); location.reload() }}>ВЫКЛЮЧИТЬ РЕЖИМ</button>
      </div>
      <div className="adm-dev-row">
        <button className="adm-btn primary" disabled={!!busy}
          onClick={() => void run('check', async () => {
            const rows = await checkRoundScoring(pack, gameState.round_number, gameState.game_id)
            setCheck(rows)
            const bad = rows.filter(r => r.diff !== 0).length
            return bad ? `РАСХОЖДЕНИЙ: ${bad}` : 'Начисления сходятся'
          })}>СВЕРИТЬ БАЛЛЫ</button>
        <button className="adm-btn" disabled={!!busy}
          onClick={() => void run('clear', async () => {
            const n = await clearSeed(gameState.game_id)
            return n ? `Удалено команд: ${n}` : 'Демо-данных нет'
          })}>УДАЛИТЬ ДЕМО</button>
      </div>
      <div className="adm-dev-row">
        {/* Выключение кнопкой: править адрес руками неудобно, а при переходе
            в комнату он всё равно пересобирается. */}
        <button className="adm-btn" onClick={() => { disableDevMode(); location.reload() }}>
          ВЫКЛЮЧИТЬ РЕЖИМ РЕПЕТИЦИИ
        </button>
      </div>
      {msg && <div className="adm-dev-msg">{msg}</div>}
      {check && check.length > 0 && (
        <table className="adm-dev-table">
          <thead><tr><th>команда</th><th>ждали</th><th>вышло</th><th>Δ</th></tr></thead>
          <tbody>
            {check.map(r => (
              <tr key={r.team} className={r.diff === 0 ? '' : 'bad'}>
                <td>{r.team}</td><td>{r.expected}</td><td>{r.actual}</td><td>{r.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}


/** Показ слайдов-брифингов из админки. Работает в ЛЮБОЙ фазе: слайд не
 *  привязан к раунду, и вернуться можно туда же, откуда ушёл. */
function InfoSlidesButtons({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const slides = pack.settings?.info_slides ?? []
  const [open, setOpen] = useState(false)
  if (slides.length === 0) return null
  const active = gameState.phase === 'info'
  return (
    <div className="adm-slides">
      <button className="adm-link" onClick={() => setOpen(o => !o)}>
        {active ? '▣ СЛАЙД НА ЭКРАНЕ' : '▢ ПОКАЗАТЬ СЛАЙД'}
      </button>
      {open && (
        <div className="adm-slide-list">
          {slides.map((sl, i) => (
            <button key={sl.id} className="adm-btn"
              onClick={() => { void setFinaleStep(i); void setPhase('info'); setOpen(false) }}>
              {i + 1}. {sl.title || 'без названия'}
            </button>
          ))}
          {active && (
            <button className="adm-btn primary"
              onClick={() => { void setPhase('round_intro'); setOpen(false) }}>
              ← ВЕРНУТЬСЯ К РАУНДУ
            </button>
          )}
        </div>
      )}
    </div>
  )
}


/** Оценки команд: средняя по раундам, худшие вопросы, комментарии.
 *  Грузится по кнопке, а не сама: во время игры лишний опрос базы не нужен,
 *  а смотреть эти цифры ведущий будет в перерыве или после. */
function RatingsPanel({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<RatingRow[] | null>(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setBusy(true)
    try { setRows(await loadRatings(gameState.game_id)) }
    catch { setRows([]) }
    finally { setBusy(false) }
  }

  const sum = rows ? summarize(rows) : null
  const qText = new Map<string, string>()
  pack.rounds.forEach(r => r.questions.forEach((q, i) =>
    qText.set(`q-${q.id}`, `${i + 1}. ${q.question_text.slice(0, 60)}`)))

  return (
    <div className="adm-ratings">
      <button className="adm-link" onClick={() => {
        setOpen(o => !o); if (!rows) void load()
      }}>★ ОЦЕНКИ КОМАНД</button>
      {open && (
        <div className="adm-rt">
          <button className="adm-btn" disabled={busy} onClick={() => void load()}>
            {busy ? 'загружаю…' : 'обновить'}
          </button>
          {sum && sum.size === 0 && <div className="adm-dim">оценок пока нет</div>}
          {sum && [...sum.values()].sort((a, b) => a.roundNumber - b.roundNumber).map(s => {
            const round = pack.rounds[s.roundNumber]
            const worst = [...s.byQuestion.entries()]
              .sort((a, b) => a[1].avg - b[1].avg).slice(0, 3)
            return (
              <div key={s.roundNumber} className="adm-rt-round">
                <div className="adm-rt-head">
                  <b>Р{s.roundNumber + 1} {(round?.title_lines ?? []).join(' ')}</b>
                  <span className={`adm-rt-avg${(s.avg ?? 0) < 6 ? ' low' : ''}`}>
                    {s.avg == null ? '—' : s.avg.toFixed(1)}
                  </span>
                  <span className="adm-dim">{s.votes} голосов</span>
                </div>
                {worst.length > 0 && (
                  <div className="adm-rt-worst">
                    слабее всего:
                    {worst.map(([ref, v]) => (
                      <div key={ref}>
                        <b>{v.avg.toFixed(1)}</b> {qText.get(ref) ?? ref}
                      </div>
                    ))}
                  </div>
                )}
                {s.comments.map((c, i) => (
                  <div key={i} className="adm-rt-comment">«{c}»</div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


/** Пульт ведущего для блица.
 *
 *  Все действия идут через чистые переходы из blitzState: админка только
 *  вызывает их и сохраняет результат. Логику здесь не дублируем — иначе
 *  проектор и пульт разойдутся, как это уже было с маршрутом после раунда.
 *
 *  Вопрос показывается ведущим вручную, а не автоматически: ему нужно
 *  успеть прочитать вопрос вслух и убедиться, что команда готова. */
function BlitzControls({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const { state, setState } = useBlitz(gameState.game_id, gameState.round_number)
  const teams = useTeams(gameState.game_id)
  const [busy, setBusy] = useState(false)

  const settings = round.settings as { teamSeconds?: number; timeoutPenalty?: number }
  const bank = round.questions.map(q => ({ id: q.id, hidden: q.hidden }))
  const cur = state?.current
  const q = cur ? round.questions.find(x => x.id === cur.questionId) : undefined
  const active = state ? currentTeam(state) : undefined
  const activeName = teams.find(t => t.id === active)?.name ?? '—'

  const push = async (next: BlitzState) => {
    setBusy(true)
    setState(next)                       // мгновенно в интерфейсе
    try {
      await saveBlitz(gameState.game_id, gameState.round_number, next)
      // Раунд закрылся — отправляем БАЛЛЫ за места в общий зачёт.
      // Очки живут в blitz_state, а общий подсчёт читает только answers,
      // поэтому итог кладём готовой строкой `q-blitz`.
      if (next.finished && !state?.finished) {
        const rows = blitzResults(toResults(next), settings.timeoutPenalty ?? 10)
        await Promise.all(rows.map(r => enqueueAnswer({
          team_id: r.teamId, game_id: gameState.game_id,
          question_ref: 'q-blitz', round_number: gameState.round_number,
          answer_text: `место ${r.place}`, stake: r.score,
        })))
      }
    } finally { setBusy(false) }
  }

  // ── Раунд ещё не начат: кубик выбирает первую команду ──
  if (!state) {
    return (
      <div className="adm-blitz">
        <div className="adm-dim">БЛИЦ · раунд не начат</div>
        <button className="adm-btn primary" disabled={busy || teams.length < 2}
          onClick={() => {
            // Кубик кидается ОДИН раз: дальше ходы идут по кругу от него.
            const order = [...teams].sort(() => Math.random() - 0.5).map(t => t.id)
            void push(initBlitz(order, settings.teamSeconds ?? 60))
          }}>
          🎲 БРОСИТЬ КУБИК И НАЧАТЬ
        </button>
        {teams.length < 2 && <div className="adm-dim">нужно минимум две команды</div>}
      </div>
    )
  }

  if (state.finished) {
    const rows = blitzResults(toResults(state), settings.timeoutPenalty ?? 10)
    return (
      <div className="adm-blitz">
        <div className="adm-dim">БЛИЦ ОКОНЧЕН</div>
        {state.timedOutTeam && (
          <div className="adm-bz-warn">
            время вышло у «{teams.find(t => t.id === state.timedOutTeam)?.name}» ·
            штраф {settings.timeoutPenalty ?? 10} очков
          </div>
        )}
        <table className="adm-dev-table">
          <thead><tr><th>команда</th><th>очки</th><th>место</th><th>баллы</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.teamId}>
                <td>{teams.find(t => t.id === r.teamId)?.name ?? r.teamId}</td>
                <td>{r.points}</td>
                <td>{r.place}{r.shared ? '=' : ''}</td>
                <td>{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const left = remainingCount(bank, state.used)

  return (
    <div className="adm-blitz">
      <div className="adm-dim">ХОД: {activeName} · в банке {left}</div>

      {!cur && (
        <button className="adm-btn primary" disabled={busy || left === 0}
          onClick={() => {
            const next = pickNext(bank, state.used)
            if (!next) return void push(finishNoQuestions(state))
            void push(showQuestion(state, next.id, Date.now()))
          }}>
          {left === 0 ? 'ВОПРОСЫ КОНЧИЛИСЬ' : 'ПОКАЗАТЬ ВОПРОС →'}
        </button>
      )}

      {cur && (
        <>
          {/* Верный ответ у ведущего перед глазами: он и решает спорные */}
          <div className="adm-bz-q">{q?.question_text}</div>
          <div className="adm-bz-answer">ответ: <b>{displayAnswerText(q)}</b></div>
          <div className="adm-dim">попытка {cur.attempts + 1} из {MAX_ATTEMPTS}</div>
          <div className="adm-dev-row">
            <button className="adm-btn primary" disabled={busy}
              onClick={() => void push(answerCorrect(state, Date.now()))}>ВЕРНО ✓</button>
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(answerWrong(state, Date.now()))}>НЕВЕРНО ✗</button>
          </div>
          <div className="adm-dev-row">
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(skip(state, Date.now()))}>СКИП −1</button>
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(pauseForCheck(state, Date.now()))}>⏸ ПАУЗА</button>
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(resumeAfterCheck(state, Date.now()))}>▶ ДАЛЬШЕ</button>
          </div>
        </>
      )}

      <button className="adm-btn" disabled={busy}
        onClick={() => { if (confirm('Завершить блиц досрочно?')) void push(finishNoQuestions(state)) }}>
        ЗАВЕРШИТЬ РАУНД
      </button>

      <UsedQuestions round={round} used={state.used} />
    </div>
  )
}

/** Отыгранные вопросы с кнопкой «убрать навсегда».
 *
 *  Две пометки намеренно разные. «Сгорел» живёт в состоянии раунда и
 *  действует только эту игру — так вопросы не повторяются за вечер.
 *  «Убран навсегда» — это флаг hidden у самого вопроса, и ставит его
 *  ведущий руками. Система помечает, решает человек. */
function UsedQuestions({ round, used }: {
  round: LoadedPack['rounds'][number]; used: string[]
}) {
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState<string[]>([])
  if (used.length === 0) return null
  const items = used
    .map(id => round.questions.find(q => q.id === id))
    .filter((q): q is NonNullable<typeof q> => !!q)

  return (
    <div className="adm-bz-used">
      <button className="adm-link" onClick={() => setOpen(o => !o)}>
        ОТЫГРАНО: {used.length}
      </button>
      {open && items.map(q => {
        const removed = gone.includes(q.id) || q.hidden
        return (
          <div key={q.id} className={`adm-bz-used-row${removed ? ' gone' : ''}`}>
            <span>{q.question_text.slice(0, 60)}</span>
            <button className="adm-btn" disabled={removed}
              onClick={() => {
                if (!confirm('Убрать вопрос из банка навсегда?')) return
                setGone(g => [...g, q.id])
                void hideQuestion(q.id, true)
              }}>
              {removed ? 'убран' : 'убрать'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

/** Текст верного ответа для пульта: у блица вопросы простые, но формат
 *  ответа общий для всего проекта. */
function displayAnswerText(q?: { answer: unknown }): string {
  const a = q?.answer as { display?: string | string[]; correct?: string } | undefined
  if (!a) return '—'
  if (Array.isArray(a.display)) return a.display.join(' / ')
  return a.display ?? a.correct ?? '—'
}
