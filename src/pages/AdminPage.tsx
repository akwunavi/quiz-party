import { getRoomId } from '../lib/room'
import { RoomPicker } from './RoomPicker'
import { VERSION } from '../version'
import { useEffect, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { useTeams } from '../hooks/useTeams'
import { useAnswers } from '../hooks/useAnswers'
import { loadPack, metaLine, displayRoundNumber, type LoadedPack } from '../lib/packLoader'
import {
  gotoRound, gotoQuestion, revealAnswer, finishGame, resetGame,
  gotoAnswers, showScoreboard, startAnswerTime, setPhase, selectPackAndStart, startBreak,
  setFinaleStep, setFinaleMode, registerTeam, deleteTeam, renameTeam, startTimer, resetGameHard,
} from '../lib/gameActions'
import { afterRoundStep } from '../lib/flow'
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
const TEAM_COLORS = ['#ea580c', '#3b82f6', '#22c55e', '#a855f7', '#ec4899', '#eab308']

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
        </div>
        {preview && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {preview.map((group, i) => (
              <div key={i} className="adm-group" style={{
                borderColor: TEAM_COLORS[i % TEAM_COLORS.length],
                borderLeft: `3px solid ${TEAM_COLORS[i % TEAM_COLORS.length]}`,
              }}>
                <div style={{ color: TEAM_COLORS[i % TEAM_COLORS.length], fontSize: 13 }}>КОМАНДА {i + 1}</div>
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
            onClick={() => void gotoRound(i)}>
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
  const isInteractive = isJeopardy || round.mechanic === 'melody' || round.mechanic === 'race'
  // шаг после раунда берём из общего модуля: раньше здесь была своя копия
  // логики, которая игнорировала перерыв и расходилась с проектором
  const runAfterRound = () => {
    const st = afterRoundStep(pack, gameState.round_number, gameState.phase)
    if (st.kind === 'scoreboard') return void showScoreboard()
    if (st.kind === 'break') return void startBreak()
    if (st.kind === 'finale') return void finishGame(gameState.pack_id)
    return void gotoRound(gameState.round_number + 1)
  }
  const endRound = runAfterRound

  const grade = async (a: Answer, correct: boolean) => {
    await supabase.from('answers').update({ is_correct: correct }).eq('id', a.id)
  }

  const advance = () => {
    if (phase === 'round_intro') { void gotoQuestion(0); return }
    if (phase === 'question') {
      if (step + 1 < round.questions.length) void gotoQuestion(step + 1)
      else if (round.answers_reveal === 'after_round') void startAnswerTime()
      else void gotoAnswers(0)
      return
    }
    if (phase === 'answer_time') { void gotoAnswers(0); return }
    // с табло и из перерыва идём по общему маршруту: с табло может быть
    // ещё перерыв, а вот из перерыва — только вперёд
    if (phase === 'scoreboard' || phase === 'break') runAfterRound()
  }
  const goBack = () => {
    if (phase === 'question' && step > 0) void gotoQuestion(step - 1)
    else if (phase === 'question') void setPhase('round_intro')
    else if (phase === 'answer_time') void gotoQuestion(round.questions.length - 1)
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
          {(phase === 'question' || phase === 'answer_time') && (
            <AnsweredIndicator round={round} gameState={gameState} answers={answers} teams={teams} />
          )}
        </div>
      )}

      <div className="adm-footer">
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
          else void gotoRound(gameState.round_number + 1)
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
  const PALETTE = ['#ffd700', '#ff2fa0', '#00e5ff', '#b6ff3c', '#ff8c42',
    '#9d7bff', '#ff5c5c', '#40e0d0', '#f7a1c4', '#7cf5a0']
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)

  const add = async () => {
    const n = name.trim()
    if (!n || busy) return
    setBusy(true)
    try {
      await registerTeam(n, PALETTE[teams.length % PALETTE.length], gameId)
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

      <button className="adm-link danger" onClick={() => {
        if (confirm('Начать новую игру?\n\nКоманды и ответы этой игры сохранятся в базе.')) void resetGame()
      }}>⟲ НОВАЯ ИГРА</button>
      <button className="adm-link danger" onClick={() => {
        if (!confirm('ПОЛНАЯ ОЧИСТКА.\n\nБудут УДАЛЕНЫ все команды и все ответы этой игры. '
          + 'Восстановить нельзя. Продолжить?')) return
        if (!confirm('Точно удалить? Второе подтверждение.')) return
        void resetGameHard()
      }}>🗑 НОВАЯ ИГРА С ОЧИСТКОЙ</button>
    </div>
  )
}
