import { RoomPicker } from './RoomPicker'
import { useEffect, useMemo, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { loadPack, displayRoundNumber, type LoadedPack, type LoadedRound } from '../lib/packLoader'
import { registerTeam, heartbeat } from '../lib/gameActions'
import { enqueueAnswer } from '../lib/answerQueue'
import { ConnectionDot } from '../components/ConnectionDot'
import { ThemeLayer } from '../components/ThemeLayer'
import { CrosswordView, lettersFromAnswers } from '../components/CrosswordView'
import { supabase } from '../lib/supabase'
import type { AnswerSpec, Team, CrosswordGrid, Question, Answer, JeopardyTheme } from '../types/quiz'
import { spendsEdit } from '../lib/edits'
import { TEAM_PALETTE } from '../lib/teamColors'

// ═══ Экран игрока — механика перенесена из старого проекта ═══
// Список ВСЕХ вопросов раунда карточками: открываются по мере зачитывания,
// ответы правятся весь раунд (лимит исправлений), ставки, локальный кеш.
// На фазе ответов — свой разбор с ✓/✗.

const TEAM_LS = 'qp-team'

export function PlayerPage() {
  const { gameState, loading: gsLoading, roomId } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const [team, setTeam] = useState<Team | null>(() => {
    try { return JSON.parse(localStorage.getItem(TEAM_LS) ?? 'null') } catch { return null }
  })

  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])

  // Команда, сохранённая в телефоне, действительна только пока она ЕСТЬ в базе.
  // Раньше при новой игре телефон просто перепривязывал старую команду к новому
  // game_id — поэтому после полной очистки на экране снова всплывало старое
  // название, и помогал только сброс кеша браузера.
  useEffect(() => {
    if (!team || !gameState) return
    let alive = true
    void (async () => {
      const { data } = await supabase.from('teams')
        .select('id, game_id').eq('id', team.id).maybeSingle()
      if (!alive) return
      if (!data) {
        // команду удалили вместе с игрой — забываем её и просим зайти заново
        localStorage.removeItem(TEAM_LS)
        setTeam(null)
        return
      }
      if (data.game_id !== gameState.game_id) {
        await supabase.from('teams')
          .update({ game_id: gameState.game_id, last_seen_at: new Date().toISOString() })
          .eq('id', team.id)
        const t = { ...team, game_id: gameState.game_id }
        localStorage.setItem(TEAM_LS, JSON.stringify(t)); setTeam(t)
      }
    })()
    return () => { alive = false }
  }, [team?.id, gameState?.game_id])

  useEffect(() => {
    if (!team) return
    void heartbeat(team.id)
    const t = setInterval(() => { void heartbeat(team.id) }, 5000)
    return () => clearInterval(t)
  }, [team?.id])


  if (!gsLoading && !roomId) return <RoomPicker route="/player" forPlayer />
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
  if (phase === 'question' && round?.mechanic === 'race')
    return <RacePlayer team={team} gameState={gameState} round={round}
      roundLabel={displayRoundNumber(pack, gameState.round_number)} />
  if (phase === 'question' && round?.mechanic === 'melody')
    return <MelodyPlayer team={team} gameState={gameState}
      roundLabel={displayRoundNumber(pack, gameState.round_number)} />
  if (phase === 'question' && round?.mechanic === 'jeopardy')
    return <JeopardyPlayer team={team} gameState={gameState} round={round}
      roundLabel={displayRoundNumber(pack, gameState.round_number)} />
  if ((phase === 'question' || phase === 'answer_time') && round)
    return <AnswerForm team={team} round={round} gameState={gameState}
      roundLabel={displayRoundNumber(pack, gameState.round_number)} />
  return <Waiting team={team} message="СМОТРИ НА ЭКРАН" />
}

/** Своя игра у игрока: ведущий открывает плитку — команда пишет ответ.
 *  Ответ уходит с меткой плитки, которую ведущий видит в модалке по скорости. */
function JeopardyPlayer({ team, gameState, roundLabel, round }: {
  team: Team; roundLabel: string
  round?: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const [draft, setDraft] = useState('')
  const [sent, setSent] = useState<string | null>(null)
  // плитка считается открытой, когда ведущий её запустил (пошёл таймер).
  // Раньше поле ответа висело всегда — команда набирала ответ заранее,
  // ещё не услышав трек.
  const open = !!gameState.timer_started_at
  // стоимость открытой плитки: по сквозному номеру находим её в темах
  const themes = (round?.settings as { themes?: JeopardyTheme[] })?.themes ?? []
  let flat = gameState.question_index
  let value: number | null = null
  for (const t of themes) {
    if (flat < t.tiles.length) { value = t.tiles[flat]?.value ?? null; break }
    flat -= t.tiles.length
  }
  // при смене плитки очищаем поле, иначе уедет прошлый ответ
  useEffect(() => { setDraft(''); setSent(null) }, [gameState.question_index])

  if (!open) return (
    <div className="pl-root">
      <PlayerHeader team={team} round={roundLabel} />
      <ConnectionDot />
      <div className="pl-list">
        <div className="pl-notice acc">СВОЯ ИГРА</div>
        <div className="pl-card">
          <div className="pl-card-body" style={{ textAlign: 'center' }}>
            <div className="pl-wait">Ждём, пока ведущий откроет плитку</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="pl-root">
      <PlayerHeader team={team} round={roundLabel} />
      <ConnectionDot />
      <div className="pl-list">
        <div className="pl-notice acc">СВОЯ ИГРА · СЛУШАЙ ТРЕК НА ЭКРАНЕ</div>
        <div className="pl-card">
          <div className="pl-qlabel">
            ОТВЕТ НА ПЛИТКУ{value != null && <b className="pl-tile-value">{value}</b>}
          </div>
          <div className="pl-card-body">
            <div className="pl-input-col">
              <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Ответ" />
              <button className="pl-send" disabled={!draft.trim() || draft.trim() === sent} onClick={() => {
                void enqueueAnswer({
                  team_id: team.id, game_id: gameState.game_id,
                  question_ref: `q-t${gameState.question_index}`,  // номер открытой плитки, синхронно с проектором
                  round_number: gameState.round_number, answer_text: draft.trim(),
                })
                setSent(draft.trim())
              }}>{sent ? 'Изменить ответ' : 'Отправить'}</button>
            </div>
            {sent && <div className="pl-sent">Отправлено: {sent}</div>}
            <div className="ed-hint">Кто ответит быстрее — тот выше в списке у ведущего</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** «Угадай мелодию» у игрока: понятное состояние на каждой стадии. */
function MelodyPlayer({ team, gameState, roundLabel }: {
  team: Team; roundLabel: string
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const m = gameState.melody ?? {}
  const [draft, setDraft] = useState('')
  const [bid, setBid] = useState<number | null>(null)
  const [sent, setSent] = useState<string | null>(null)
  // сбрасываем поля только при СМЕНЕ ТРЕКА (иначе ответ стирался при переходе стадии)
  useEffect(() => { setBid(null); setDraft(''); setSent(null) }, [m.key])

  const send = (ref: string, text: string) => void enqueueAnswer({
    team_id: team.id, game_id: gameState.game_id, question_ref: ref,
    round_number: gameState.round_number, answer_text: text,
  })

  const stage = m.stage ?? 'idle'
  const myTurn = m.order?.[m.turn ?? 0] === team.id
  // моя команда уже играла этот трек и провалила ход
  const myIdx = m.order?.indexOf(team.id) ?? -1
  const alreadyFailed = myIdx > -1 && myIdx < (m.turn ?? 0)

  const Wait = ({ text, sub }: { text: string; sub?: string }) => (
    <div className="mel-wait">
      <div className="pl-wait">{text}</div>
      {sub && <div className="pl-wait-sub">{sub}</div>}
    </div>
  )

  return (
    <div className="pl-root">
      <PlayerHeader team={team} round={roundLabel} />
      <ConnectionDot />
      <div className="pl-list">
        {(<>
          {(stage === 'idle' || stage === 'done') && <Wait text="ЖДИТЕ СЛЕДУЮЩЕГО ТРЕКА" />}
          {stage === 'reveal' && (m.wonTeam === team.id
            ? <Wait text={`ВЫ УГАДАЛИ! +${m.wonPts ?? 0}`} sub="Баллы ваши — смотрите на экран" />
            : <Wait text="ТРЕК УГАДАН" sub="Увы, не вами. Ждите следующего" />)}
          {stage === 'spinning' && <Wait text="ВЫБИРАЕМ ТРЕК" sub="Смотрите на экран" />}
          {stage === 'listen' && <Wait text="СЛУШАЕМ 1 СЕКУНДУ" sub="Приготовьтесь к ставке" />}

          {stage === 'bidding' && (
            <div className="pl-card"><div className="pl-qlabel">ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?</div>
              <div className="pl-card-body">
                <div className="mel-keys">
                  {[2,3,4,5,6,7,8,9,10].map(v => (
                    <button key={v} className={bid === v ? 'sel' : ''}
                      onClick={() => { setBid(v); send(`q-mel-${m.key}-bid`, String(v)) }}>{v}</button>
                  ))}
                </div>
                <div className="mel-points-hint">2–5 сек → 2 балла · 6–10 сек → 1 балл</div>
                {bid && <div className="pl-sent">Ставка отправлена: {bid} сек · можно изменить</div>}
              </div>
            </div>
          )}

          {stage === 'bids' && (myTurn
            ? <Wait text="ВЫ ИГРАЕТЕ!" sub="Ждите включения музыки" />
            : alreadyFailed
              ? <Wait text="ВЫ НЕ УГАДАЛИ" sub="Ждём другую команду" />
              : <Wait text="ЖДЁМ ДРУГУЮ КОМАНДУ" sub="Если не угадают — ход перейдёт к вам, 0.5 балла" />)}

          {(stage === 'snippet' || stage === 'answering' || stage === 'passed') && (myTurn ? (
            <div className="pl-card">
              <div className="pl-qlabel">ВАШ ХОД — НАЗОВИТЕ ТРЕК</div>
              <div className="mel-points-hint">
                {m.turn === 0 ? `за верный ответ — ${(Number(bid) || 10) <= 5 ? 2 : 1} балла`
                  : 'за верный ответ — 0.5 балла'}
              </div>
              <div className="pl-card-body">
                <div className="pl-input-col">
                  <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Ответ" />
                  <button className="pl-send" disabled={!draft.trim() || draft.trim() === sent}
                    onClick={() => { send(`q-mel-${m.key}`, draft.trim()); setSent(draft.trim()) }}>
                    {sent ? 'Изменить ответ' : 'Отправить'}
                  </button>
                </div>
                {sent && <div className="pl-sent">Отправлено: {sent}</div>}
              </div>
            </div>
          ) : alreadyFailed
            ? <Wait text="ВЫ НЕ УГАДАЛИ" sub="Ждём вторую команду" />
            : <Wait text="ЖДЁМ ДРУГУЮ КОМАНДУ"
                sub="Слушайте трек — если не угадают, ход перейдёт к вам (0.5 балла)" />)}
        </>)}
      </div>
    </div>
  )
}

/** Скачки: команда жмёт номер бульдога 1–5, пока ставки открыты. */
function RacePlayer({ team, gameState, round, roundLabel }: {
  team: Team; roundLabel: string; round: LoadedRound
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const race = gameState.melody?.race ?? {}
  const s = round.settings as { dogs?: string[] }
  const dogs = (s.dogs ?? []).length === 5 ? s.dogs! : ['Френк', 'Батон', 'Пельмень', 'Турбо', 'Ракета']
  const [bet, setBet] = useState<number | null>(null)
  useEffect(() => { if (!race.stage || race.stage === 'betting') setBet(b => b) }, [race.stage])

  return (
    <div className="pl-root">
      <PlayerHeader team={team} round={roundLabel} />
      <ConnectionDot />
      <div className="pl-list">
        {!race.stage && <div className="pl-wait" style={{ padding: 30 }}>ЖДЁМ ОТКРЫТИЯ СТАВОК</div>}
        {race.stage === 'betting' && (
          <div className="pl-card"><div className="pl-qlabel">НА КОГО СТАВИМ?</div>
            <div className="pl-card-body">
              <div className="mel-points-hint">1 место — 5 баллов · 2 — 4 · … · 5 — 1</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {dogs.map((name, i) => (
                  <button key={i} className={`pl-send${bet === i + 1 ? '' : ' ghosted'}`}
                    style={bet === i + 1 ? {} : { opacity: .65 }}
                    onClick={() => {
                      setBet(i + 1)
                      void enqueueAnswer({
                        team_id: team.id, game_id: gameState.game_id,
                        question_ref: `q-race-${gameState.round_number}`,
                        round_number: gameState.round_number, answer_text: String(i + 1),
                      })
                    }}>№{i + 1} · {name}</button>
                ))}
              </div>
              {bet && <div className="pl-sent">Ставка: №{bet} {dogs[bet - 1]} · можно изменить</div>}
            </div>
          </div>
        )}
        {race.stage === 'running' && <div className="pl-wait" style={{ padding: 30 }}>
          БЕГУТ! СМОТРИТЕ НА ЭКРАН 🏁</div>}
        {race.stage === 'done' && <div className="pl-wait" style={{ padding: 30 }}>
          ЗАБЕГ ОКОНЧЕН — БАЛЛЫ НАЧИСЛЕНЫ</div>}
      </div>
    </div>
  )
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
  const collapsible = (round.mechanic === 'test_stop' || isStakes || round.mechanic === 'crossword')
    && round.mechanic !== 'sprint'
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
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(state)) }, [state, storageKey])
  // При смене раунда состояние ОБЯЗАНО перечитаться под новый ключ: без этого
  // на экране оставались ответы прошлого раунда, потому что useState с
  // инициализатором срабатывает только при первом монтировании.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      setState(saved ? JSON.parse(saved) : { answers: {}, stakes: {}, edits: {} })
    } catch { setState({ answers: {}, stakes: {}, edits: {} }) }
  }, [storageKey])

  // вопрос доступен, только если зачитан. В «120 секунд» — все сразу,
  // но после окончания таймера форма блокируется.
  const isSprint = round.mechanic === 'sprint'
  const sprintOver = isSprint && !!gameState.timer_started_at &&
    Date.now() > new Date(gameState.timer_started_at).getTime() + round.timer_seconds * 1000
  const unlocked = (i: number) =>
    isSprint ? !sprintOver
    : gameState.phase === 'answer_time' ? true : i <= gameState.question_index
  const maxEdits = (round.settings as { maxEdits?: number }).maxEdits ?? 2
  const locked = (i: number) => maxEdits >= 0 && (state.edits[i] ?? 0) >= maxEdits

  const push = (qIdx: number, text: string, stake?: number | null) => {
    const q = questions[qIdx]
    void enqueueAnswer({
      team_id: team.id, game_id: gameState.game_id,
      question_ref: `q-${q.id}`, round_number: gameState.round_number,
      answer_text: text, stake: stake ?? state.stakes[qIdx] ?? null,
    })
  }
  const setAnswer = (i: number, text: string) => {
    const spec = questions[i].answer
    setState(s => {
      // логика вынесена в lib/edits.ts и покрыта тестами
      const spend = spendsEdit(spec, s.answers[i] ?? '', text)
      return {
        ...s,
        answers: { ...s.answers, [i]: text },
        edits: spend ? { ...s.edits, [i]: (s.edits[i] ?? 0) + 1 } : s.edits,
      }
    })
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
    // Ставка уходит на сервер СРАЗУ, даже если ответа ещё нет. Раньше
    // отправка была только при уже введённом ответе: команда сначала
    // ставила ставку, потом отвечала — и ставка терялась, раунд давал 0.
    push(i, state.answers[i] ?? '', v)
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
                  {/* картинки у игрока НЕ показываем: они на проекторе,
                      а на телефоне только съедали экран под формой ответа */}
                  {isStakes && (uniqueStakes ? (<>
                    <div className="pl-stakes-label">
                      Ставка: сколько баллов ставишь на этот вопрос
                    </div>
                    <div className="pl-stakes">
                      {stakeValues.map(v => (
                        <button key={v} className={state.stakes[i] === v ? 'sel' : ''}
                          disabled={usedStakes.includes(v)}
                          onClick={() => setStake(i, v)}>{v}</button>
                      ))}
                    </div>
                  </>) : (
                    // свободные ставки бинарны: либо ×2, либо ничего.
                    // Ряд кнопок здесь только путал — оставили один переключатель.
                    <label className="pl-x2">
                      <input type="checkbox" checked={(state.stakes[i] ?? 0) > 0}
                        onChange={e => setStake(i, e.target.checked ? 2 : 0)} />
                      <span>Ставка ×2</span>
                      <i>верно — плюс 3, неверно — минус 2</i>
                    </label>
                  ))}
                  <Picker spec={q.answer} value={state.answers[i] ?? ''} locked={isLocked}
                    onChange={text => setAnswer(i, text)} />
                  <div className="pl-row-bottom">
                    {state.answers[i] && <span className="pl-sent">Отправлено: {state.answers[i]}</span>}
                    {state.answers[i] && (
                      <button className="pl-erase" onClick={() => clearAnswer(i)}>Стереть</button>
                    )}
                    {maxEdits >= 0 && (
                      <span className="pl-sent">
                        правок: {state.edits[i] ?? 0}/{maxEdits}
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

// палитра общая для всего проекта, см. lib/teamColors.ts
const COLORS = TEAM_PALETTE

function Register({ onDone, gameId }: { onDone: (t: Team) => void; gameId: string }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [busy, setBusy] = useState(false)
  return (
    <div className="pl-register">
      <h1>Регистрация команды</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Название команды" />
      <div className="colors">
        {COLORS.map(c => (
          <button key={c} className={`color-dot${color === c ? ' sel' : ''}`}
            onClick={() => setColor(c)} style={{ background: c, color: c }} />
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
