import { useEffect, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { useTeams } from '../hooks/useTeams'
import { useAnswers } from '../hooks/useAnswers'
import { loadPack, metaLine, displayRoundNumber, type LoadedPack } from '../lib/packLoader'
import {
  gotoRound, gotoQuestion, revealAnswer, finishGame, resetGame,
  gotoAnswers, showScoreboard, startAnswerTime, setPhase, selectPackAndStart,
} from '../lib/gameActions'
import { supabase } from '../lib/supabase'
import { listPacks } from '../lib/packLoader'
import type { Answer, Pack, Team } from '../types/quiz'

// ═══ Админка (телефон ведущего) — перенос структуры старого AdminPage ═══
// ВЕДУЩИЙ: шапка со ссылками → строка статуса → экран по фазе →
// нижняя панель управления (назад/дальше, смена раунда, рандомайзер, сброс).

export function AdminPage() {
  const { gameState } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const teams = useTeams(gameState?.game_id ?? null)
  const answers = useAnswers(gameState?.game_id ?? null, gameState?.round_number)

  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id, true).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])

  if (!gameState) return <div className="cyber adm-center">// ЗАГРУЗКА…</div>

  const round = pack?.rounds[gameState.round_number]
  const phase = gameState.phase

  return (
    <div className="cyber adm-root">
      <div className="adm-header">
        <div className="adm-brand">ВЕДУЩИЙ</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a className="adm-link" href="./" target="_blank" rel="noreferrer">ПРОЕКТОР ↗</a>
          <button className="adm-link" onClick={() => {
            const url = `${location.origin}${location.pathname}#/player${gameState.pack_id ? `?pack=${gameState.pack_id}` : ''}`
            void navigator.clipboard?.writeText(url)
          }}>ССЫЛКА ИГРОКАМ</button>
        </div>
      </div>

      <div className="adm-status">
        {pack ? `${pack.name} · Р${displayRoundNumber(pack, gameState.round_number)}` : 'пакет не выбран'} · {phase}
        {round && (phase === 'question' || phase === 'show_answers')
          ? ` · ${gameState.question_index + 1}/${round.questions.length}` : ''}
      </div>

      {!gameState.pack_id && <PackPicker />}

      {gameState.pack_id && phase === 'lobby' && pack && (
        <div className="adm-pad">
          <TeamRandomizer />
          <RoundPicker pack={pack} current={gameState.round_number} />
        </div>
      )}

      {phase === 'finale' && <FinalePanel pack={pack} gameId={gameState.game_id} teams={teams} />}

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
    await supabase.from('game_state')
      .update({ random_groups: preview } as never).eq('id', 1)
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
    if (phase === 'scoreboard' || phase === 'break') {
      if (gameState.round_number + 1 < pack.rounds.length) void gotoRound(gameState.round_number + 1)
      else void finishGame(gameState.pack_id)
    }
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
        {!isJeopardy && phase !== 'show_answers' && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="adm-btn" onClick={goBack}>← НАЗАД</button>
            <button className="adm-btn primary" onClick={advance}>ДАЛЬШЕ →</button>
          </div>
        )}
        {isJeopardy && phase !== 'round_intro' && (
          <div className="adm-dim">РАУНД УПРАВЛЯЕТСЯ ПЛИТКАМИ НА ПРОЕКТОРЕ</div>
        )}
        {isJeopardy && phase === 'round_intro' && (
          <button className="adm-btn primary" onClick={() => void gotoQuestion(0)}>НАЧАТЬ РАУНД →</button>
        )}
        {phase !== 'show_answers' && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="adm-btn" onClick={() => void showScoreboard()}>ТАБЛО</button>
            <button className="adm-btn" onClick={() => void revealAnswer()}>ПОКАЗАТЬ ОТВЕТ</button>
          </div>
        )}

        <button className="adm-link" onClick={() => setShowRoundSwitch(s => !s)}>
          {showRoundSwitch ? 'СКРЫТЬ СПИСОК РАУНДОВ' : 'СМЕНИТЬ РАУНД'}
        </button>
        {showRoundSwitch && <RoundPicker pack={pack} current={gameState.round_number} />}

        <TeamRandomizer />

        <button className="adm-link danger" onClick={() => {
          if (confirm('НОВАЯ ИГРА: сбросить состояние игры? Ответы останутся в БД.')) void resetGame()
        }}>⟲ НОВАЯ ИГРА (ПОЛНЫЙ СБРОС)</button>
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
          if (step < total - 1) void gotoAnswers(step + 1)
          else if (last) void finishGame(gameState.pack_id)
          else void showScoreboard()
        }}>{step < total - 1 ? 'СЛЕД. ВОПРОС →' : last ? 'ФИНАЛ →' : 'К ТАБЛО →'}</button>
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
  if (phase === 'scoreboard') return <div className="adm-centered"><div className="adm-h1">ТАБЛО</div></div>
  if (phase === 'break') return <div className="adm-centered"><div className="adm-h1">ПЕРЕРЫВ</div></div>
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
  const filled = teams.map(t => ({
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

// ── Финал ──
function FinalePanel({ pack, gameId, teams }: { pack: LoadedPack | null; gameId: string; teams: Team[] }) {
  const answers = useAnswers(gameId)
  return (
    <div className="adm-pad">
      <div className="adm-h1">ФИНАЛ</div>
      <div className="adm-dim">Команд: {teams.length} · ответов: {answers.length}</div>
      {pack && <div className="adm-dim">Пакет: {pack.name}</div>}
      <button className="adm-link danger" onClick={() => {
        if (confirm('Начать новую игру?')) void resetGame()
      }}>⟲ НОВАЯ ИГРА</button>
    </div>
  )
}
