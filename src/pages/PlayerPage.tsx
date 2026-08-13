import { useEffect, useMemo, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { loadPack, displayRoundNumber, type LoadedPack, type LoadedRound } from '../lib/packLoader'
import { registerTeam, heartbeat } from '../lib/gameActions'
import { enqueueAnswer } from '../lib/answerQueue'
import { ConnectionDot } from '../components/ConnectionDot'
import { ThemeLayer } from '../components/ThemeLayer'
import { CrosswordView, lettersFromAnswers } from '../components/CrosswordView'
import { supabase } from '../lib/supabase'
import type { AnswerSpec, Team, CrosswordGrid, Question, Answer } from '../types/quiz'

// ═══ Экран игрока — механика перенесена из старого проекта ═══
// Список ВСЕХ вопросов раунда карточками: открываются по мере зачитывания,
// ответы правятся весь раунд (лимит исправлений), ставки, локальный кеш.
// На фазе ответов — свой разбор с ✓/✗.

const TEAM_LS = 'qp-team'

export function PlayerPage() {
  const { gameState } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const [team, setTeam] = useState<Team | null>(() => {
    try { return JSON.parse(localStorage.getItem(TEAM_LS) ?? 'null') } catch { return null }
  })

  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])

  // если игра перезапущена — перепривязываем команду к новому game_id
  useEffect(() => {
    if (!team || !gameState) return
    if (team.game_id === gameState.game_id) return
    void supabase.from('teams')
      .update({ game_id: gameState.game_id, last_seen_at: new Date().toISOString() })
      .eq('id', team.id).then(() => {
        const t = { ...team, game_id: gameState.game_id }
        localStorage.setItem(TEAM_LS, JSON.stringify(t)); setTeam(t)
      })
  }, [team?.id, gameState?.game_id])

  useEffect(() => {
    if (!team) return
    void heartbeat(team.id)
    const t = setInterval(() => { void heartbeat(team.id) }, 5000)
    return () => clearInterval(t)
  }, [team?.id])

  return (
    <ThemeLayer theme={pack?.theme ?? 'classic'}>
      <PlayerInner gameState={gameState} pack={pack} team={team} setTeam={t => {
        localStorage.setItem(TEAM_LS, JSON.stringify(t)); setTeam(t)
      }} />
    </ThemeLayer>
  )
}

function PlayerInner({ gameState, pack, team, setTeam }: {
  gameState: ReturnType<typeof useGameState>['gameState']
  pack: LoadedPack | null; team: Team | null; setTeam: (t: Team) => void
}) {
  if (!gameState) return <Waiting message="ЗАГРУЗКА…" />
  if (!team) return <Register onDone={setTeam} gameId={gameState.game_id} />

  const round = pack?.rounds[gameState.round_number]
  const phase = gameState.phase

  if (!pack || phase === 'lobby') return <Waiting team={team} message="ОЖИДАЕМ НАЧАЛА ИГРЫ" />
  if (phase === 'round_intro') return <Waiting team={team}
    message={`РАУНД ${pack ? displayRoundNumber(pack, gameState.round_number) : ''}`} sub="Слушай правила" />
  if (phase === 'scoreboard') return <Waiting team={team} message="ПОДВОДИМ ИТОГИ…" />
  if (phase === 'break') return <Waiting team={team} message="ПЕРЕРЫВ" sub="Разомнись, налей выпить :)" />
  if (phase === 'finale') return <Waiting team={team} message="ИГРА ЗАВЕРШЕНА" sub="Спасибо за игру! Смотри на проектор 🎉" />
  if (phase === 'show_answers' && round)
    return <PlayerReview team={team} round={round} roundNumber={gameState.round_number}
      label={displayRoundNumber(pack, gameState.round_number)} />
  if ((phase === 'question' || phase === 'answer_time') && round)
    return <AnswerForm team={team} round={round} gameState={gameState}
      roundLabel={displayRoundNumber(pack, gameState.round_number)} />
  return <Waiting team={team} message="СМОТРИ НА ЭКРАН" />
}

// ═══ Список вопросов раунда (перенос старой механики) ═══
interface LocalState { answers: Record<number, string>; stakes: Record<number, number>; edits: Record<number, number> }

function AnswerForm({ team, round, gameState, roundLabel }: {
  team: Team; round: LoadedRound; roundLabel: string
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const questions = round.questions.filter(q => !q.hidden)
  if (questions.length === 0) return (
    <div className="pl-center"><ConnectionDot />
      <div className="pl-wait">В раунде нет вопросов</div>
      <div className="pl-wait-sub">Сообщите ведущему</div></div>
  )
  const isStakes = round.mechanic === 'stakes_unique' || round.mechanic === 'stakes_free'
  const uniqueStakes = round.mechanic === 'stakes_unique'
  const stakeValues = (round.settings as { stakesValues?: number[] }).stakesValues ?? []
  const collapsible = round.mechanic === 'test_stop' || isStakes || round.mechanic === 'crossword'
  const isCrossword = round.mechanic === 'crossword'
  const grid = (round.settings as { grid?: CrosswordGrid }).grid ?? null

  const [openIdx, setOpenIdx] = useState<number | null>(gameState.question_index)
  useEffect(() => {
    if (collapsible) setOpenIdx(gameState.question_index)
  }, [collapsible, gameState.question_index])

  const storageKey = `qp-answers-${gameState.game_id}-${round.id}`
  const [state, setState] = useState<LocalState>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) ?? '') } catch {
      return { answers: {}, stakes: {}, edits: {} }
    }
  })
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(state)) }, [state])

  // вопрос доступен, только если зачитан
  const unlocked = (i: number) =>
    gameState.phase === 'answer_time' ? true : i <= gameState.question_index
  const maxEdits = (round.settings as { maxEdits?: number }).maxEdits ?? 2
  const locked = (i: number) => maxEdits >= 0 && (state.edits[i] ?? 0) > maxEdits

  const push = (qIdx: number, text: string, stake?: number | null) => {
    const q = questions[qIdx]
    void enqueueAnswer({
      team_id: team.id, game_id: gameState.game_id,
      question_ref: `q-${q.id}`, round_number: gameState.round_number,
      answer_text: text, stake: stake ?? state.stakes[qIdx] ?? null,
    })
  }
  const setAnswer = (i: number, text: string) => {
    setState(s => ({ ...s, answers: { ...s.answers, [i]: text }, edits: { ...s.edits, [i]: (s.edits[i] ?? 0) + 1 } }))
    push(i, text)
  }
  // Стереть ответ можно ВСЕГДА, независимо от лимита правок (как в старом проекте)
  const clearAnswer = (i: number) => {
    setState(s => {
      const answers = { ...s.answers }; delete answers[i]
      return { ...s, answers }
    })
    push(i, '')
  }
  const setStake = (i: number, v: number) => {
    setState(s => ({ ...s, stakes: { ...s.stakes, [i]: v } }))
    if (state.answers[i]) push(i, state.answers[i], v)
  }
  const usedStakes = Object.entries(state.stakes)
    .filter(([k]) => Number(k) !== openIdx).map(([, v]) => v)

  // буквы кроссворда из своих ответов
  const cwLetters = useMemo(() => {
    if (!grid) return undefined
    const byWord: Record<string, string> = {}
    questions.forEach((q, i) => {
      if (q.answer.mode === 'crossword_word') byWord[q.answer.word.toUpperCase().replace(/Ё/g, 'Е')] = state.answers[i] ?? ''
    })
    return lettersFromAnswers(grid, byWord)
  }, [grid, state.answers])

  const currentPlacement = grid && questions[gameState.question_index]?.answer.mode === 'crossword_word'
    ? grid.words.find(w => w.word === (questions[gameState.question_index].answer as { word: string }).word
        .toUpperCase().replace(/Ё/g, 'Е').replace(/[^А-ЯA-Z0-9]/g, ''))
    : undefined

  return (
    <div className="pl-root">
      <PlayerHeader team={team} round={roundLabel} />
      <ConnectionDot />
      {gameState.phase === 'answer_time' &&
        <div className="pl-notice acc">ВРЕМЯ ОТВЕТОВ — ПРОВЕРЬТЕ И ДОЗАПОЛНИТЕ</div>}
      {isCrossword && grid && (
        <div className="pl-crossword">
          <CrosswordView grid={grid} letters={cwLetters}
            currentWordNumber={currentPlacement?.number} currentDir={currentPlacement?.dir}
            cellSize={Math.min(26, Math.floor((Math.min(innerWidth, 460) - 40) / grid.cols))} />
        </div>
      )}
      <div className="pl-list">
        <div className="pl-notice">Ответы можно вносить и править весь раунд</div>
        {questions.map((q, i) => {
          const isUnlocked = unlocked(i)
          const isLocked = locked(i)
          const isOpen = !collapsible || openIdx === i
          const placement = grid?.words.find(w => q.answer.mode === 'crossword_word' &&
            w.word === q.answer.word.toUpperCase().replace(/Ё/g, 'Е').replace(/[^А-ЯA-Z0-9]/g, ''))
          return (
            <div key={q.id} className="pl-card"
              style={{
                borderLeftColor: state.answers[i] ? 'var(--ok)' : isUnlocked ? 'var(--dim)' : 'transparent',
                opacity: isUnlocked ? 1 : .45,
              }}>
              <div className="pl-card-head"
                onClick={() => collapsible && isUnlocked && setOpenIdx(isOpen ? null : i)}>
                <span className="pl-qlabel">
                  {placement
                    ? <>№{placement.number} {placement.dir === 'across' ? 'ПО ГОРИЗОНТАЛИ' : 'ПО ВЕРТИКАЛИ'}</>
                    : <>ВОПРОС {i + 1}</>}
                  {!isUnlocked && <span className="dim"> · ещё не зачитан</span>}
                  {isLocked && <span className="err"> · 🔒</span>}
                </span>
                {collapsible && (
                  <span className="pl-preview">
                    {state.answers[i] && <b>{state.answers[i]}</b>}
                    {state.stakes[i] != null && <span className="acc"> · ст.{state.stakes[i]}</span>}
                    <span className="chev">{isOpen ? '▲' : '▼'}</span>
                  </span>
                )}
              </div>
              {isOpen && isUnlocked && (
                <div className="pl-card-body">
                  {q.question_text
                    ? <div className="pl-qtext">{q.question_text}</div>
                    : <div className="pl-qtext" style={{ opacity: .6 }}>Смотрите вопрос на экране</div>}
                  {isStakes && (
                    <div className="pl-stakes">
                      {stakeValues.map(v => (
                        <button key={v} className={state.stakes[i] === v ? 'sel' : ''}
                          disabled={uniqueStakes && usedStakes.includes(v)}
                          onClick={() => setStake(i, v)}>{v}</button>
                      ))}
                    </div>
                  )}
                  <Picker spec={q.answer} value={state.answers[i] ?? ''} locked={isLocked}
                    onChange={text => setAnswer(i, text)} />
                  <div className="pl-row-bottom">
                    {state.answers[i] && <span className="pl-sent">Отправлено: {state.answers[i]}</span>}
                    {state.answers[i] && (
                      <button className="pl-erase" onClick={() => clearAnswer(i)}>Стереть</button>
                    )}
                    {maxEdits >= 0 && (
                      <span className="pl-sent">
                        правок: {Math.max(0, (state.edits[i] ?? 0) - 1)}/{maxEdits}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Ввод по типу ответа (перенос MatchPicker/OrderPicker/choices старого проекта). */
function Picker({ spec, value, locked, onChange }: {
  spec: AnswerSpec; value: string; locked: boolean; onChange: (v: string) => void
}) {
  const [draft, setDraft] = useState(value)
  useEffect(() => setDraft(value), [value])

  if (spec.mode === 'choice') {
    return (
      <div className="pl-choices">
        {spec.choices.map(c => (
          <button key={c.key} disabled={locked}
            className={value === c.key ? 'sel' : ''}
            onClick={() => onChange(c.key)}>{c.key}</button>
        ))}
      </div>
    )
  }
  if (spec.mode === 'order') {
    const seq = value.split('')
    const left = spec.choices.map(c => c.key).filter(k => !seq.includes(k))
    return (
      <div>
        <div className="pl-slot">{seq.length ? seq.join(' → ') : 'Тапай по порядку'}</div>
        <div className="pl-choices">
          {left.map(k => <button key={k} disabled={locked} onClick={() => onChange(value + k)}>{k}</button>)}
          {value && <button className="ghost" onClick={() => onChange('')}>сброс</button>}
        </div>
        {spec.choices.map(c => <div key={c.key} className="pl-legend"><b>{c.key}</b> {c.text}</div>)}
      </div>
    )
  }
  if (spec.mode === 'match') {
    return <MatchPicker spec={spec} value={value} locked={locked} onChange={onChange} />
  }
  // free_text / crossword_word / none
  return (
    <div className="pl-input-col">
      <input value={draft} disabled={locked} onChange={e => setDraft(e.target.value)}
        placeholder="Ответ" />
      <button className="pl-send" disabled={locked || !draft.trim()}
        onClick={() => onChange(draft.trim())}>
        {value ? 'Изменить ответ' : 'Отправить'}
      </button>
    </div>
  )
}

function MatchPicker({ spec, value, locked, onChange }: {
  spec: Extract<AnswerSpec, { mode: 'match' }>; value: string; locked: boolean; onChange: (v: string) => void
}) {
  const pairs = Object.fromEntries(value.split(',').filter(Boolean).map(p => [p[0], p.slice(1)]))
  const [sel, setSel] = useState<string | null>(null)
  const used = new Set(Object.values(pairs))
  return (
    <div>
      <div className="pl-match">
        <div>{spec.left.map(l => (
          <button key={l} disabled={locked} className={sel === l ? 'sel' : pairs[l] ? 'done' : ''}
            onClick={() => setSel(l)}>{l}{pairs[l] ? `–${pairs[l]}` : ''}</button>
        ))}</div>
        <div>{spec.right.map(r => (
          <button key={r} disabled={locked || !sel || used.has(r)}
            onClick={() => {
              if (!sel) return
              const next = { ...pairs, [sel]: r }
              onChange(Object.entries(next).map(([k, v]) => `${k}${v}`).join(','))
              setSel(null)
            }}>{r}</button>
        ))}</div>
      </div>
      {value && <button className="ghost" onClick={() => onChange('')}>сброс</button>}
    </div>
  )
}

/** Разбор своих ответов на фазе показа ответов (перенос PlayerReview). */
function PlayerReview({ team, round, roundNumber, label }: {
  team: Team; round: LoadedRound; roundNumber: number; label: string
}) {
  const [marks, setMarks] = useState<Answer[]>([])
  useEffect(() => {
    let stop = false
    const load = async () => {
      const { data } = await supabase.from('answers').select('*')
        .eq('team_id', team.id).eq('round_number', roundNumber)
      if (!stop && data) setMarks(data as Answer[])
    }
    void load()
    const t = setInterval(load, 2000)
    return () => { stop = true; clearInterval(t) }
  }, [roundNumber, team.id])

  return (
    <div className="pl-root">
      <PlayerHeader team={team} round={label} />
      <div className="pl-notice acc">СЕЙЧАС УЗНАЕМ ПРАВИЛЬНЫЕ ОТВЕТЫ!</div>
      <div className="pl-list">
        {round.questions.filter(q => !q.hidden).map((q: Question, i) => {
          const a = marks.find(x => x.question_ref === `q-${q.id}`)
          return (
            <div key={q.id} className="pl-card" style={{
              borderLeftColor: a?.is_correct === true ? 'var(--ok)'
                : a?.is_correct === false ? 'var(--danger)' : 'var(--dim)',
            }}>
              <div className="pl-review-row">
                <span className="num">{i + 1}</span>
                <span className="txt">{a?.answer_text || '—'}</span>
                {a?.is_correct != null &&
                  <span className="mark" style={{ color: a.is_correct ? 'var(--ok)' : 'var(--danger)' }}>
                    {a.is_correct ? '✓' : '✗'}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PlayerHeader({ team, round }: { team: Team; round: string }) {
  return (
    <div className="pl-header">
      <span style={{ color: team.color }}>{team.name}</span>
      <span className="pl-round">РАУНД {round}</span>
    </div>
  )
}

const COLORS = ['#14b8a6', '#f43f5e', '#eab308', '#8b5cf6', '#3b82f6', '#f97316']

function Register({ onDone, gameId }: { onDone: (t: Team) => void; gameId: string }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [busy, setBusy] = useState(false)
  return (
    <div className="pl-center">
      <h2>Регистрация команды</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Название команды" />
      <div style={{ display: 'flex', gap: 8 }}>
        {COLORS.map(c => (
          <button key={c} onClick={() => setColor(c)} style={{
            width: 38, height: 38, borderRadius: 19, background: c, padding: 0,
            border: color === c ? '3px solid #fff' : '1px solid rgba(255,255,255,.3)',
          }} />
        ))}
      </div>
      <button disabled={!name.trim() || busy} onClick={async () => {
        setBusy(true)
        try { onDone(await registerTeam(name.trim(), color, gameId) as Team) }
        finally { setBusy(false) }
      }}>Играть!</button>
    </div>
  )
}

function Waiting({ message, sub, team }: { message: string; sub?: string; team?: Team }) {
  return (
    <div className="pl-center">
      <ConnectionDot />
      {team && <div className="pl-team-badge" style={{ color: team.color }}>{team.name}</div>}
      <div className="pl-wait">{message}</div>
      {sub && <div className="pl-wait-sub">{sub}</div>}
    </div>
  )
}
