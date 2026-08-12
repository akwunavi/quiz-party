import { useEffect, useMemo, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { listPacks, loadPack, metaLine, type LoadedPack } from '../lib/packLoader'
import {
  selectPackAndStart, gotoRound, gotoQuestion, revealAnswer, finishGame, resetGame, setPhase,
  startTimer, gotoAnswers, showScoreboard, startBreak, startAnswerTime,
} from '../lib/gameActions'
import { ThemeLayer } from '../components/ThemeLayer'
import { SnowCurtain } from '../components/NewYearScene'
import { CrosswordView } from '../components/CrosswordView'
import { computeTotals, computeRoundScores } from '../lib/totals'
import { autocheck } from '../lib/autocheck'
import { supabase } from '../lib/supabase'
import { useTeams, isAlive } from '../hooks/useTeams'
import { useAnswers } from '../hooks/useAnswers'
import type { Pack, Question, CrosswordGrid } from '../types/quiz'

// ═══ Экран хоста (проектор) ═══
// Правила экрана: без скроллов; все кнопки — справа внизу; имя пакета — мелко
// в правом нижнем углу; крупные заголовки с темовым декором; вопрос появляется
// «ветром» по словам; текст+1-2 картинки — сплит-раскладка; аудио/видео автоплей.

export function HostScreen() {
  const { gameState } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])
  return (
    <ThemeLayer theme={pack?.theme ?? 'classic'} isProjector>
      {pack?.theme === 'new_year' &&
        <SnowCurtain trigger={`${gameState?.phase}-${gameState?.round_number}-${gameState?.question_index}`} />}
      <HostInner gameState={gameState} pack={pack} />
      {pack && <div className="pack-badge">{pack.name}</div>}
    </ThemeLayer>
  )
}

function Deco({ theme }: { theme: string }) {
  if (theme === 'new_year') return <div className="title-deco">🎄 ❄ 🎁 ❄ 🎄</div>
  return null
}

function HostInner({ gameState, pack }: {
  gameState: ReturnType<typeof useGameState>['gameState']
  pack: LoadedPack | null
}) {
  const [packs, setPacks] = useState<Pack[]>([])
  const [selectedId, setSelectedId] = useState('')
  useEffect(() => { void listPacks().then(setPacks).catch(() => setPacks([])) }, [])

  const teams = useTeams(gameState?.game_id ?? null)

  const playerUrl = useMemo(() => {
    const base = `${location.origin}${location.pathname}#/player`
    return gameState?.pack_id ? `${base}?pack=${gameState.pack_id}` : base
  }, [gameState?.pack_id])

  if (!gameState) return <div className="host-screen grid-bg">Загрузка…</div>

  // ── Лобби / выбор пакета ──
  if (gameState.phase === 'lobby' || !gameState.pack_id || !pack) {
    return (
      <div className="host-screen grid-bg">
        <Title theme={pack?.theme ?? 'classic'} lines={['QUIZ PARTY']} />
        <Deco theme={pack?.theme ?? 'classic'} />
        {!gameState.pack_id ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)}
              style={{ fontSize: '1.2rem' }}>
              <option value="">— выбрать пакет —</option>
              {packs.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status === 'ready' ? 'готов' : p.status === 'played' ? 'сыгран' : p.status})
                </option>
              ))}
            </select>
            <button disabled={!selectedId} style={{ fontSize: '1.2rem' }}
              onClick={() => {
                const p = packs.find(x => x.id === selectedId)
                if (p && p.status === 'draft' &&
                    !confirm('Пакет — черновик (валидатор не пройден). Играть как есть?')) return
                void selectPackAndStart(selectedId)
              }}>
              Начать игру
            </button>
          </div>
        ) : (
          <>
            <div className="qr-card hud-frame">
              <div className="mono-tag">ПОДКЛЮЧЕНИЕ ИГРОКОВ</div>
              <img alt="QR" className="lobby-qr"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=1&data=${encodeURIComponent(playerUrl)}`} />
            </div>
            <div className="lobby-teams">
              {teams.length === 0
                ? <span style={{ opacity: .5 }}>ждём команды…</span>
                : teams.map(t => (
                  <span key={t.id} className="lobby-team"
                    style={{ color: t.color, opacity: isAlive(t) ? 1 : .4 }}>
                    {t.name}
                  </span>
                ))}
            </div>
            <div className="host-actions">
              <button className="ghost dark" onClick={() => {
                if (confirm('Сбросить игру и выбрать другой пакет?')) void resetGame()
              }}>⟲ Сменить пакет</button>
              <button onClick={() => void gotoRound(0)}>К первому раунду →</button>
            </div>
          </>
        )}
      </div>
    )
  }

  const round = pack.rounds[gameState.round_number]
  if (!round) return <div className="host-screen grid-bg">Раунд не найден — проверь пакет</div>
  const q = round.questions[gameState.question_index]

  // ── Титул раунда ──
  if (gameState.phase === 'round_intro') {
    const grid = (round.settings as { grid?: CrosswordGrid }).grid
    return (
      <div className="host-screen grid-bg">
        <div className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)}</div>
        <Title theme={pack.theme} lines={round.title_lines} />
        <Deco theme={pack.theme} />
        <div className="meta-line">{metaLine(round)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '72vw' }}>
          {round.rules.map((r, i) => (
            <div key={i} className="rule-item" style={{ animationDelay: `${0.5 + i * 0.7}s` }}>
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>{r}
            </div>
          ))}
        </div>
        {round.rules_audio && <audio autoPlay src={mediaUrl(round.rules_audio)} />}
        {round.mechanic === 'crossword' && grid && (
          /* только пустая сетка — без слов, ответов и определений */
          <CrosswordView grid={grid} cellSize={Math.min(34, Math.floor(innerWidth * .5 / grid.cols))} />
        )}
        <div className="host-actions">
          <button onClick={() => void gotoQuestion(0)}>Первый вопрос →</button>
        </div>
      </div>
    )
  }

  // ── Вопрос ──
  if (gameState.phase === 'question' && q) {
    const media = q.media.question ?? []
    const imgs = media.filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
    const avs = media.filter(m => /\.(mp3|mp4|webm|wav)$/i.test(m))
    const split = !!q.question_text.trim() && imgs.length === 1 && !q.media.hidden
    const choices = q.answer.mode === 'choice' ? q.answer.choices
      : q.answer.mode === 'order' ? q.answer.choices : null

    return (
      <div className="host-screen grid-bg">
        <QuestionAudio q={q} round={round} timerRunning={!!gameState.timer_started_at} />
        <div className="host-topbar">
          <span className="qnum">Р{displayRoundNumber(pack, gameState.round_number)} · ВОПРОС{' '}
            <b>{gameState.question_index + 1}</b> / {round.questions.length}</span>
          <Timer key={q.id} startedAt={gameState.timer_started_at} seconds={round.timer_seconds} theme={pack.theme} />
        </div>

        {split ? (
          <div className="q-split">
            <WindText key={q.id} text={q.question_text} />
            <div className="q-media-grid">
              {imgs.map((m, i) => <img key={i} src={mediaUrl(m)} alt="" />)}
            </div>
          </div>
        ) : (
          <>
            <WindText key={q.id} text={q.question_text} />
            {!q.media.hidden && imgs.length > 0 && (
              <div className="q-media-grid" style={{ maxWidth: '92vw' }}>
                {imgs.map((m, i) => <img key={i} src={mediaUrl(m)} alt=""
                  style={{ maxHeight: imgs.length > 2 ? '34vh' : '48vh' }} />)}
              </div>
            )}
          </>
        )}

        {avs.map((m, i) => /\.(mp4|webm)$/i.test(m)
          ? (q.media.hidden
            ? <video key={i} autoPlay src={mediaUrl(m)} style={{ width: 1, height: 1, opacity: 0 }} />
            : <video key={i} autoPlay controls src={mediaUrl(m)} style={{ maxHeight: '46vh', borderRadius: 14 }} />)
          : <audio key={i} autoPlay src={mediaUrl(m)} />)}

        {choices && (
          <div className="choices-grid">
            {choices.map((c, i) => (
              <div key={c.key} className="choice-plate" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
                <span className="key">{c.key}</span>{c.text}
              </div>
            ))}
          </div>
        )}

        {round.answers_reveal === 'after_question' && gameState.reveal && (
          <div className="answer-reveal hud-frame">
            <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
            <div className="answer-main">{displayAnswer(q)}</div>
            {q.answer_note && <div style={{ opacity: .75 }}>{q.answer_note}</div>}
            <div className="q-media-grid" style={{ maxHeight: '26vh' }}>
              {(q.media.answer ?? []).map((m, i) => <img key={i} src={mediaUrl(m)} alt="" />)}
            </div>
          </div>
        )}

        <div className="host-actions">
          <BackBtn gameState={gameState} />
          {round.answers_reveal === 'after_question' && !gameState.reveal &&
            <button onClick={() => void revealAnswer()}>Показать ответ</button>}
          {gameState.question_index + 1 < round.questions.length
            ? <button onClick={() => void gotoQuestion(gameState.question_index + 1)}>Дальше →</button>
            : round.answers_reveal === 'after_round'
              ? <button onClick={() => void startAnswerTime()}>Время ответов →</button>
              : <AfterRoundNav pack={pack} gameState={gameState} />}
        </div>
      </div>
    )
  }

  if (gameState.phase === 'answer_time') {
    return <AnswerTime pack={pack} round={round} gameState={gameState} />
  }

  if (gameState.phase === 'show_answers' && q) {
    return <ShowAnswers pack={pack} round={round} q={q} gameState={gameState} />
  }

  if (gameState.phase === 'scoreboard') {
    return <ScoreboardScreen pack={pack} gameState={gameState} />
  }

  if (gameState.phase === 'break') {
    return <BreakScreen pack={pack} round={round} gameState={gameState} />
  }

  if (gameState.phase === 'finale') {
    return <Finale pack={pack} gameId={gameState.game_id} />
  }

  return <div className="host-screen grid-bg">Фаза: {gameState.phase}</div>
}

/** «Назад»: предыдущий вопрос или титул раунда; между раундами не ходит (п.12). */
function BackBtn({ gameState }: { gameState: NonNullable<ReturnType<typeof useGameState>['gameState']> }) {
  return gameState.question_index > 0
    ? <button className="ghost" onClick={() => void gotoQuestion(gameState.question_index - 1)}>← Назад</button>
    : <button className="ghost" onClick={() => void setPhase('round_intro')}>← К титулу</button>
}

/** Появление текста «ветром»: по словам с каскадной задержкой. */
function WindText({ text }: { text: string }) {
  const words = text.split(/(\s+)/)
  let idx = 0
  return (
    <p className="q-text">
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return w
        const delay = 0.12 * idx++
        return <span key={i} className="q-word" style={{ animationDelay: `${delay}s` }}>{w}</span>
      })}
    </p>
  )
}

/** Заголовок: в НГ-теме буквы выпадают снегом и обрастают сугробом. */
function Title({ theme, lines }: { theme: string; lines: string[] }) {
  if (theme !== 'new_year') {
    return (
      <h1 className="neon-title title-anim">
        {lines.map((l, i) => (
          <span key={i} style={i === lines.length - 1 && lines.length > 1 ? { color: 'var(--accent)' } : {}}>{l}<br /></span>
        ))}
      </h1>
    )
  }
  let n = 0
  return (
    <h1 className="neon-title">
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {[...line].map((ch, i) => ch === ' '
            ? <span key={i}>&nbsp;</span>
            : <span key={i} className="ny-letter" style={{ animationDelay: `${0.06 * n++}s` }}>{ch}</span>)}
        </span>
      ))}
    </h1>
  )
}

function Timer({ startedAt, seconds, theme }: { startedAt: string | null; seconds: number; theme?: string }) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    if (!startedAt) { setLeft(seconds); return }
    const tick = () => {
      const elapsed = (Date.now() - new Date(startedAt).getTime()) / 1000
      setLeft(Math.max(0, Math.ceil(seconds - elapsed)))
    }
    tick()
    const t = setInterval(tick, 250)
    return () => clearInterval(t)
  }, [startedAt, seconds])
  const low = left <= 10
  if (theme === 'new_year') {
    const R = 46, C = 2 * Math.PI * R
    const frac = Math.max(0, Math.min(1, left / seconds))
    return (
      <div className={`ny-timer${low ? ' low' : ''}`}>
        <svg viewBox="0 0 110 110">
          <circle className="ring-bg" cx="55" cy="55" r={R} />
          <circle className="ring-fg" cx="55" cy="55" r={R}
            strokeDasharray={C} strokeDashoffset={C * (1 - frac)} />
        </svg>
        <span className="val">{left}</span>
      </div>
    )
  }
  return (
    <div className="timer-wrap">
      <span className={`timer-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
}

/** Стабильное перемешивание: порядок фиксирован для конкретного вопроса. */
function shuffleStable<T>(arr: T[], seedStr: string): T[] {
  let s = 0
  for (const ch of seedStr) s = (s * 31 + ch.charCodeAt(0)) >>> 0
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function displayRoundNumber(pack: LoadedPack, idx: number): string {
  const r = pack.rounds[idx]
  if (r.off_scoreboard) return '0'
  let n = 0
  for (let i = 0; i <= idx; i++) if (!pack.rounds[i].off_scoreboard) n++
  return String(n)
}

function displayAnswer(q: Question): string {
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display
  if (Array.isArray(d)) return d.join(' · ')
  if (typeof d === 'string' && d) return d
  if (typeof a.correct === 'string' && a.correct) return String(a.correct).split('/')[0].trim()
  if (typeof a.word === 'string' && a.word) return a.word.toUpperCase()
  if (typeof a.correct_choice === 'string' && a.correct_choice) return a.correct_choice
  if (typeof a.correct_order === 'string' && a.correct_order) return a.correct_order
  if (Array.isArray(a.correct_pairs)) return (a.correct_pairs as string[]).join('  ')
  return '—'
}

export function mediaUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const base = import.meta.env.VITE_SUPABASE_URL
  return `${base}/storage/v1/object/public/quiz-media/${path.replace(/^\//, '')}`
}

/** Озвучка → (по окончании) старт таймера → фоновая музыка (если у вопроса нет своего AV).
 *  Перенос логики старого RoundShell: музыка глушится при смене вопроса/уходе с фазы;
 *  скрытая вкладка (второй проектор) молчит. */
function QuestionAudio({ q, round, timerRunning }: {
  q: LoadedPack['rounds'][number]['questions'][number]
  round: LoadedPack['rounds'][number]
  timerRunning: boolean
}) {
  const hasOwnAV = (q.media.question ?? []).some(m => /\.(mp3|mp4|webm|wav)$/i.test(m))

  // озвучка → startTimer
  useEffect(() => {
    if (timerRunning || document.hidden) return
    let cancelled = false
    if (q.media.voice) {
      const a = new Audio(mediaUrl(q.media.voice))
      const done = () => { if (!cancelled) void startTimer() }
      a.onended = done; a.onerror = done
      a.play().catch(done)
      return () => { cancelled = true; a.pause() }
    }
    if (!hasOwnAV) void startTimer()
    // вопросы со своим аудио/видео: таймер стартует кнопкой «Дальше» не нужен —
    // ведущий может запустить руками через админку; авто не трогаем (как в старом)
  }, [q.id])

  // фоновая музыка раунда, пока тикает таймер
  useEffect(() => {
    const bg = (round.settings as { bg_music?: string }).bg_music
    if (!timerRunning || !bg || hasOwnAV || document.hidden) return
    const a = new Audio(mediaUrl(bg))
    a.loop = true; a.volume = 0.6
    a.play().catch(() => {})
    return () => a.pause()
  }, [timerRunning, q.id])

  return null
}

/** «Время ответов»: минута на дозаполнение, крупный таймер, контроль связи —
 *  видно, чьи ответы уже долетели (перенос AnswerTimeSlide старого проекта). */
function AnswerTime({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const seconds = (round.settings as { answerTimeSeconds?: number }).answerTimeSeconds ?? 60
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const totalQ = round.questions.filter(q => !q.hidden).length

  // фоновая музыка на время раздумий — как в старом
  useEffect(() => {
    const bg = (round.settings as { bg_music?: string }).bg_music
    if (!bg || document.hidden) return
    const a = new Audio(mediaUrl(bg))
    a.loop = true; a.volume = 0.6
    a.play().catch(() => {})
    return () => a.pause()
  }, [round.id])

  return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)} :: ВРЕМЯ ОТВЕТОВ</div>
      <Title theme={pack.theme} lines={['ОТВЕЧАЙТЕ!']} />
      <div className="meta-line">КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ</div>
      <Timer startedAt={gameState.timer_started_at} seconds={seconds} theme={pack.theme} />
      <div className="answer-time-teams">
        {teams.map(t => {
          const got = answers.filter(a => a.team_id === t.id && a.answer_text?.trim()).length
          const done = got >= totalQ
          return (
            <div key={t.id} className={`at-team${done ? ' done' : ''}`}>
              <span style={{ color: t.color }}>{t.name}</span> · {got}/{totalQ}
            </div>
          )
        })}
      </div>
      <div className="host-actions">
        <button className="ghost dark" onClick={() => void gotoQuestion(round.questions.length - 1)}>← Назад</button>
        <button onClick={() => void gotoAnswers(0)}>К ответам →</button>
      </div>
    </div>
  )
}

/** Показ ответов раунда: вопрос остаётся, ответ появляется под ним,
 *  справа — ответы команд крупно (перенос старого ShowAnswers). */
function ShowAnswers({ pack, round, q, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  q: LoadedPack['rounds'][number]['questions'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const revealed = gameState.reveal
  const teams = useTeams(gameState.game_id)
  const [allTeams, setAllTeams] = useState<{ id: string; name: string; color: string }[]>([])
  useEffect(() => {
    void supabase.from('teams').select('id,name,color').then(({ data }) => setAllTeams(data ?? []))
  }, [])
  const rows = answers.filter(a => a.question_ref === `q-${q.id}`)
  const total = round.questions.length
  const step = gameState.question_index

  // подстраховка из старого: авто-раскрытие через 3 сек
  useEffect(() => {
    if (revealed || document.hidden) return
    const t = setTimeout(() => { void revealAnswer() }, 3000)
    return () => clearTimeout(t)
  }, [revealed, step])

  // автопроверка при раскрытии (только видимый проектор), финальное слово админа — поверх
  useEffect(() => {
    if (!revealed || document.hidden) return
    rows.forEach(a => {
      if (a.is_correct != null) return
      const ok = autocheck(q.answer, a.answer_text)
      if (ok === null) return
      void supabase.from('answers').update({ is_correct: ok }).eq('id', a.id).then(() => {})
    })
  }, [revealed, step, rows.length])

  const choices = q.answer.mode === 'choice' ? q.answer.choices : null

  return (
    <div className="host-screen grid-bg" style={{ justifyContent: 'flex-start' }}>
      <div className="host-topbar">
        <span className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)} :: ОТВЕТЫ</span>
        <span className="qnum">ВОПРОС <b>{step + 1}</b> / {total}</span>
      </div>
      <div className="answers-layout" style={{ marginTop: 60 }}>
        <div style={{ flex: 1.4, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <p className="q-text" style={{ fontSize: 'clamp(20px, 2.2vw, 32px)' }}>{q.question_text}</p>
          {revealed && (
            <div className="answer-reveal hud-frame">
              <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
              {choices ? (
                <div className="choices-grid" style={{ width: '100%' }}>
                  {shuffleStable(choices, q.id).map((c, i) => (
                    <div key={c.key}
                      className={`choice-plate${c.key === (q.answer as { correct_choice?: string }).correct_choice ? ' correct' : ''}`}
                      style={{ animationDelay: `${i * 0.4}s` }}>
                      <span className="key">{c.key}</span>{c.text}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="answer-main">{displayAnswer(q)}</div>
              )}
              {q.answer_note && <div style={{ opacity: .75 }}>{q.answer_note}</div>}
              <div className="q-media-grid" style={{ maxHeight: '30vh' }}>
                {(q.media.answer ?? []).map((m, i) => <img key={i} src={mediaUrl(m)} alt="" />)}
              </div>
            </div>
          )}
        </div>
        <div className="team-answers">
          <div className="mono-tag">ОТВЕТЫ КОМАНД</div>
          {rows.length === 0 && <div style={{ color: 'var(--dim)' }}>нет ответов</div>}
          {rows.map(a => {
            const team = teams.find(t => t.id === a.team_id) ?? allTeams.find(t => t.id === a.team_id)
            return (
              <div key={a.id} className="team-answer" style={{
                borderLeft: `5px solid ${a.is_correct === true ? 'var(--ok)' : a.is_correct === false ? 'var(--danger)' : 'var(--dim)'}`,
              }}>
                <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
                <span className="text">{a.answer_text || '—'}
                  {a.stake != null && <span style={{ color: 'var(--accent)', fontSize: 18 }}> · ставка {a.stake}</span>}</span>
                {a.is_correct != null &&
                  <span className="mark" style={{ color: a.is_correct ? 'var(--ok)' : 'var(--danger)' }}>
                    {a.is_correct ? '✓' : '✗'}</span>}
              </div>
            )
          })}
        </div>
      </div>
      <div className="host-actions">
        {step > 0 && <button className="ghost" onClick={() => void gotoAnswers(step - 1, true)}>← Назад</button>}
        {!revealed
          ? <button onClick={() => void revealAnswer()}>Показать ответ →</button>
          : step < total - 1
            ? <button onClick={() => void gotoAnswers(step + 1)}>Следующий вопрос →</button>
            : <AfterRoundNav pack={pack} gameState={gameState} />}
      </div>
    </div>
  )
}

/** Навигация после раунда: табло → перерыв → следующий раунд/финал (по флагам раунда). */
function AfterRoundNav({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const round = pack.rounds[gameState.round_number]
  const s = round.settings as { show_scoreboard_after?: boolean; break_after_minutes?: number }
  const last = gameState.round_number + 1 >= pack.rounds.length
  if (s.show_scoreboard_after && gameState.phase !== 'scoreboard' && !last)
    return <button onClick={() => void showScoreboard()}>К табло →</button>
  if (s.break_after_minutes && gameState.phase !== 'break')
    return <button onClick={() => void startBreak()}>Перерыв →</button>
  return last
    ? <button onClick={() => void finishGame(gameState.pack_id)}>Финальные итоги →</button>
    : <button onClick={() => void gotoRound(gameState.round_number + 1)}>Следующий раунд →</button>
}

/** Табло с разбивкой по раундам (перенос идеи старого Scoreboard, новогодний визуал). */
function ScoreboardScreen({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id)
  const totals = computeTotals(pack, teams, answers)
  const perRound = computeRoundScores(pack, teams, answers)
  const scored = pack.rounds.filter(r => !r.off_scoreboard)
  const ranked = [...teams].sort((a, b) => (totals.get(b.id) ?? 0) - (totals.get(a.id) ?? 0))
  return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">ПОЛОЖЕНИЕ КОМАНД</div>
      <Title theme={pack.theme} lines={['ТАБЛО']} />
      <table className="score-table">
        <thead>
          <tr>
            <th></th><th>Команда</th>
            {scored.map((r, i) => <th key={r.id}>Р{i + 1}</th>)}
            <th>Σ</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((t, pos) => (
            <tr key={t.id} className={pos === 0 ? 'leader' : ''}>
              <td>{pos === 0 ? '🏆' : pos + 1}</td>
              <td style={{ color: t.color, fontFamily: 'var(--font-display)' }}>{t.name}</td>
              {(perRound.get(t.id) ?? scored.map(() => 0)).map((v, i) => <td key={i}>{v}</td>)}
              <td className="total">{totals.get(t.id) ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="host-actions">
        <AfterRoundNav pack={pack} gameState={gameState} />
      </div>
    </div>
  )
}

/** Перерыв: гигантский таймер обратного отсчёта (по мотивам старого BreakScreen). */
function BreakScreen({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const minutes = (round.settings as { break_after_minutes?: number }).break_after_minutes ?? 10
  const [left, setLeft] = useState(minutes * 60)
  useEffect(() => {
    const started = gameState.timer_started_at ? new Date(gameState.timer_started_at).getTime() : Date.now()
    const tick = () => setLeft(Math.max(0, Math.round(minutes * 60 - (Date.now() - started) / 1000)))
    tick()
    const t = setInterval(tick, 500)
    return () => clearInterval(t)
  }, [gameState.timer_started_at, minutes])
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">АНТРАКТ</div>
      <Title theme={pack.theme} lines={['ПЕРЕРЫВ']} />
      <Deco theme={pack.theme} />
      <div className="break-timer">{mm}:{ss}</div>
      <div className="host-actions">
        <AfterRoundNav pack={pack} gameState={gameState} />
      </div>
    </div>
  )
}

function Finale({ pack, gameId }: { pack: LoadedPack; gameId: string }) {
  const teams = useTeams(gameId)
  const answers = useAnswers(gameId)
  const totals = computeTotals(pack, teams, answers)
  const ranked = [...teams].sort((a, b) => (totals.get(b.id) ?? 0) - (totals.get(a.id) ?? 0))
  const top = ranked.slice(0, 3)
  const colors = ['#ffd700', '#ff2fa0', '#00e5ff', '#b6ff3c', '#ff8c42']
  return (
    <div className="host-screen grid-bg">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className="firework" style={{
          left: `${6 + i * 6.5}%`, background: colors[i % colors.length],
          animationDelay: `${(i % 7) * 0.23}s`,
        }} />
      ))}
      <h1 className="round-title title-anim">ФИНАЛ</h1>
      <div className="pedestal">
        {[1, 0, 2].map(pos => top[pos] && (
          <div key={pos} className="step" style={{ paddingBottom: 18 + (2 - pos) * 26 }}>
            <div style={{ fontSize: '2rem' }}>{['🥇', '🥈', '🥉'][pos]}</div>
            <b style={{ color: top[pos].color }}>{top[pos].name}</b>
            <div className="num">{totals.get(top[pos].id) ?? 0}</div>
          </div>
        ))}
      </div>
      <ol style={{ fontSize: '1.2rem' }}>
        {ranked.map(t => <li key={t.id}><span style={{ color: t.color }}>{t.name}</span> — {totals.get(t.id) ?? 0}</li>)}
      </ol>
      <div className="host-actions">
        <button onClick={() => { if (confirm('Начать новую игру?')) void resetGame() }}>⟲ Новая игра</button>
      </div>
    </div>
  )
}
