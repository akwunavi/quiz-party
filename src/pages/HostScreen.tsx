import { createPortal } from 'react-dom'
import { RoomPicker } from './RoomPicker'
import { getRoomId } from '../lib/room'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { listPacks, loadPack, metaLine, displayRoundNumber, type LoadedPack } from '../lib/packLoader'
import {
  selectPackAndStart, gotoRound, gotoQuestion, revealAnswer, finishGame, resetGame, setPhase,
  startTimer, gotoAnswers, showScoreboard, startBreak, startAnswerTime, setFinaleStep,
} from '../lib/gameActions'
import { ThemeLayer } from '../components/ThemeLayer'
import { SnowCurtain } from '../components/NewYearScene'
import { CrosswordView } from '../components/CrosswordView'
import { computeTotals, computeRoundScores } from '../lib/totals'
import { autocheck } from '../lib/autocheck'
import { supabase } from '../lib/supabase'
import { useTeams, isAlive } from '../hooks/useTeams'
import { useAnswers } from '../hooks/useAnswers'
import type { Pack, Question, CrosswordGrid, JeopardyTheme } from '../types/quiz'
import { SprintBoard } from './rounds/SprintRound'
import { SnakeTimer } from '../components/SnakeTimer'
import { rankTeams } from '../lib/ranking'
import { MelodyBoard } from './rounds/MelodyRound'
import { RaceBoard } from './rounds/RaceRound'

// ═══ Экран хоста (проектор) ═══
// Правила экрана: без скроллов; все кнопки — справа внизу; имя пакета — мелко
// в правом нижнем углу; крупные заголовки с темовым декором; вопрос появляется
// «ветром» по словам; текст+1-2 картинки — сплит-раскладка; аудио/видео автоплей.

export function HostScreen() {
  const { gameState, loading: gsLoading, roomId } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])
  if (!gsLoading && !roomId) return <RoomPicker route="/" />
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
  if (theme === 'potter') return <div className="title-deco">⚡ ✦ 🪄 ✦ ⚡</div>
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
    const base = `${location.origin}${location.pathname}#/player?room=${getRoomId() ?? ''}`
    return gameState?.pack_id ? `${base}&pack=${gameState.pack_id}` : base
  }, [gameState?.pack_id])

  if (!gameState) return <div className="host-screen grid-bg">Загрузка…</div>

  // ── Лобби / выбор пакета ──
  const paperMode = pack?.settings?.play_mode === 'paper'
  if (gameState.phase === 'lobby' || !gameState.pack_id || !pack) {
    return (
      <div className="host-screen grid-bg">
        <Title theme={pack?.theme ?? 'classic'}
          lines={(pack?.theme ?? 'classic') === 'classic' ? ['QUIZ', 'PARTY'] : ['QUIZ PARTY']} />
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
            {/* раскладка ЖК: QR с подписью слева, команды колонкой справа.
                На бумаге телефоны не нужны — QR только путал бы гостей. */}
            <div className={`lobby-row${paperMode ? ' no-qr' : ''}`}>
              {!paperMode && <div className="qr-card hud-frame" data-pulse={teams.length}>
                <img alt="QR" className="lobby-qr"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=1&data=${encodeURIComponent(playerUrl)}`} />
                <div className="qr-caption">
                  <div className="qr-caption-big">ПОДКЛЮЧАЙСЯ<br />К ИГРЕ</div>
                  <div className="mono-tag">ОТСКАНИРУЙ QR</div>
                </div>
              </div>}
              <div className="lobby-teams">
                {teams.length > 0 && <div className="mono-tag">ПОДКЛЮЧИЛИСЬ ({teams.length})</div>}
                {teams.length === 0
                  ? <span style={{ opacity: .5 }}>ждём команды…</span>
                  : teams.map(t => (
                    <span key={t.id} className="lobby-team team-chip-fx"
                      style={{ ['--tc' as string]: t.color, opacity: isAlive(t) ? 1 : .4 }}>
                      {t.name}
                    </span>
                  ))}
              </div>
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
      <div className="host-screen grid-bg round-intro">
        {round.rules_audio && <audio autoPlay src={mediaUrl(round.rules_audio)} />}
        {round.mechanic === 'crossword' && grid ? (
          <div className="cw-layout">
            {/* только пустая сетка — без слов и определений */}
            <CrosswordView grid={grid}
              cellSize={Math.max(18, Math.min(44,
                Math.floor(Math.min(innerWidth * .48 / grid.cols, innerHeight * .8 / grid.rows))))} />
            <div className="side">
              <div className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)}</div>
              <Title theme={pack.theme} lines={round.title_lines} />
              <div className="meta-line" style={{ alignSelf: 'flex-start' }}>{metaLine(round)}</div>
              {round.rules.map((r, i) => (
                <div key={i} className="rule-item" style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>{r}
                </div>
              ))}
            </div>
          </div>
        ) : (<>
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
        </>)}
        <div className="host-actions">
          <button onClick={() => void gotoQuestion(0)}>
            {round.mechanic === 'jeopardy' ? 'Начать раунд →'
              : round.mechanic === 'race' ? 'К скачкам →'
              : round.mechanic === 'melody' ? 'К трекам →'
              : round.mechanic === 'sprint' ? 'Поехали →'
              : 'Первый вопрос →'}</button>
        </div>
      </div>
    )
  }

  // ── «120 секунд»: все вопросы на слайде ──
  if (gameState.phase === 'question' && round.mechanic === 'sprint') {
    return (
      <div className="host-screen grid-bg">
        <SprintBoard pack={pack} round={round} gameState={gameState}
          timerNode={<Timer startedAt={gameState.timer_started_at}
            seconds={round.timer_seconds} theme={pack.theme} />} />
        <div className="host-actions">
          <button className="ghost dark" onClick={() => void gotoAnswers(0)}>К ответам →</button>
        </div>
      </div>
    )
  }

  // ── «Скачки бульдогов» ──
  if (gameState.phase === 'question' && round.mechanic === 'race') {
    return <RaceBoard pack={pack} round={round} gameState={gameState} />
  }

  // ── «Угадай мелодию» ──
  if (gameState.phase === 'question' && round.mechanic === 'melody') {
    return <MelodyBoard pack={pack} round={round} gameState={gameState} />
  }

  // ── Своя игра: сетка плиток ──
  if (gameState.phase === 'question' && round.mechanic === 'jeopardy') {
    return <JeopardyBoard pack={pack} round={round} gameState={gameState} />
  }

  // ── Вопрос ──
  if (gameState.phase === 'question' && q) {
    const media = q.media.question ?? []
    const imgs = media.filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
    const avs = media.filter(m => /\.(mp3|mp4|webm|wav)$/i.test(m))
    const split = !!q.question_text.trim() && imgs.length === 1 && !q.media.hidden
    const choices = q.answer.mode === 'choice' ? q.answer.choices
      : q.answer.mode === 'order' ? q.answer.choices : null
    const isNY = pack.theme === 'new_year'
    const timeLow = !!gameState.timer_started_at &&
      (Date.now() - new Date(gameState.timer_started_at).getTime()) / 1000 > round.timer_seconds - 10
    const frameCls = isNY && round.mechanic !== 'rebus' ? `q-frame${timeLow ? ' low' : ''}` : ''
    // подписи-буквы на картинках нужны, когда картинок столько же, сколько вариантов/пар
    const lettered = !q.media.hidden && imgs.length > 1 && (
      (q.answer.mode === 'choice' && q.answer.choices.length === imgs.length) ||
      (q.answer.mode === 'match' && q.answer.left.length === imgs.length))
    const revealMode = (pack.settings?.answers_reveal && round.answers_reveal === 'after_question'
      ? round.answers_reveal : round.answers_reveal) ?? 'after_round'

    return (
      <div className={`host-screen grid-bg${imgs.length && !q.media.hidden ? ' has-media' : ''}${
        (choices && !lettered) || (q.answer.mode === 'match'
          && (q.answer.right_labels ?? []).some(Boolean)) ? ' has-choices' : ''}`}>
        {round.mechanic !== 'jeopardy' && <>
          <QuestionAudio startedAt={gameState.timer_started_at} seconds={round.timer_seconds} q={q} round={round} pack={pack} timerRunning={!!gameState.timer_started_at} />
          <AutoAdvance round={round} gameState={gameState}
            isLast={gameState.question_index + 1 >= round.questions.length} />
          <AutoReveal enabled={revealMode === 'after_question' && !gameState.reveal}
            startedAt={gameState.timer_started_at} seconds={round.timer_seconds} />
        </>}
        <div className="host-topbar">
          <span className="qnum">Р{displayRoundNumber(pack, gameState.round_number)} · ВОПРОС{' '}
            <b>{gameState.question_index + 1}</b> / {round.questions.length}</span>
          {round.mechanic !== 'jeopardy' &&
            <Timer key={q.id} startedAt={gameState.timer_started_at} seconds={round.timer_seconds} theme={pack.theme} />}
        </div>

        {split ? (
          <div className={frameCls}>
            {isNY && <Icicles seed={q.id} low={timeLow} />}
            <div className="q-split">
            <WindText key={q.id} text={q.question_text} />
            <div className="q-media-grid n1">
              {imgs.map((m, i) => (
                <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" />
                  {q.answer.mode === 'match' && <figcaption>{i + 1}</figcaption>}</figure>
              ))}
            </div>
            </div>
          </div>
        ) : (
          <>
            <div className={frameCls}>
              {isNY && <Icicles seed={q.id} low={timeLow} />}
              <WindText key={q.id} text={q.question_text} />
            </div>
            {!q.media.hidden && imgs.length > 0 && (
              lettered
                /* картинки-варианты и сопоставление: подпись-буква/номер прямо на карточке */
                ? <div className={`img-answers n${Math.min(imgs.length, 5)}`}>
                    {imgs.map((m, i) => (
                      <div key={i} className="img-answer">
                        <span className="ia-frame">
                          <span className="ia-key">
                            {q.answer.mode === 'match' ? i + 1 : (choices?.[i]?.key ?? '')}
                          </span>
                          <img src={mediaUrl(m)} alt="" />
                        </span>
                        {q.answer.mode === 'choice' && choices?.[i]?.text &&
                          <span className="ia-text">{choices[i].text}</span>}
                      </div>
                    ))}
                  </div>
                : <div className={`q-media-grid n${Math.min(imgs.length, 4)}${round.mechanic === 'rebus' ? ' rebus' : ''}`}>
                    {imgs.map((m, i) => (
                      <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" /></figure>
                    ))}
                  </div>
            )}
          </>
        )}

        {avs.map((m, i) => /\.(mp4|webm)$/i.test(m)
          ? (q.media.hidden
            ? <video key={i} autoPlay src={mediaUrl(m)} style={{ width: 1, height: 1, opacity: 0 }} />
            : <video key={i} autoPlay controls src={mediaUrl(m)} style={{ maxHeight: '46vh', borderRadius: 14 }} />)
          : <audio key={i} autoPlay src={mediaUrl(m)} />)}

        {q.answer.mode === 'match' && (q.answer.right_labels ?? []).some(Boolean) && (
          <div className="choices-grid">
            {q.answer.right.map((r, i) => (
              <div key={r} className="choice-plate" style={{ animationDelay: `${0.3 + i * 0.3}s` }}>
                <span className="key">{r}</span>{(q.answer as { right_labels?: string[] }).right_labels?.[i] ?? ''}
              </div>
            ))}
          </div>
        )}
        {choices && !lettered && (
          <div className="choices-grid">
            {choices.map((c, i) => (
              <div key={c.key} className="choice-plate" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
                <span className="key">{c.key}</span>{c.text}
              </div>
            ))}
          </div>
        )}

        {(revealMode === 'after_question' || round.mechanic === 'jeopardy') && gameState.reveal && (
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
          {(revealMode === 'after_question' || round.mechanic === 'jeopardy') && !gameState.reveal &&
            <button onClick={() => void revealAnswer()}>Показать ответ</button>}
          {gameState.question_index + 1 < round.questions.length
            ? <button onClick={() => void gotoQuestion(gameState.question_index + 1)}>Дальше →</button>
            : revealMode === 'after_round'
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
    return <Finale pack={pack} gameId={gameState.game_id} gameState={gameState} />
  }

  return <div className="host-screen grid-bg">
    <div className="mono-tag">ФАЗА: {gameState.phase}</div>
    {gameState.phase === 'question' && !q &&
      <p style={{ opacity: .7 }}>В этом раунде нет вопросов — добавь их в редакторе</p>}
    <div className="host-actions">
      <button onClick={() => void setPhase('round_intro')}>← К титулу раунда</button>
    </div>
  </div>
}

/** «Назад»: предыдущий вопрос или титул раунда; между раундами не ходит (п.12). */
function BackBtn({ gameState }: { gameState: NonNullable<ReturnType<typeof useGameState>['gameState']> }) {
  return gameState.question_index > 0
    ? <button className="ghost" onClick={() => void gotoQuestion(gameState.question_index - 1)}>← Назад</button>
    : <button className="ghost" onClick={() => void setPhase('round_intro')}>← К титулу</button>
}

/** Ледяная рамка с сосульками (только НГ-тема). */
function Icicles({ seed, low }: { seed: string; low: boolean }) {
  const items = useMemo(() => {
    let s = 0
    for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
    const n = 60
    return Array.from({ length: n }, (_, i) => ({
      left: (i + 0.5) * (100 / n) + (rnd() - 0.5) * 2.5,
      len: 8 + rnd() * 34,
      delay: rnd() * 0.5,
      sway: 3 + rnd() * 3,
    }))
  }, [seed])
  return (
    <div className="icicles">
      {items.map((it, i) => (
        <span key={i} className="icicle" style={{
          left: `${it.left}%`, height: it.len, ['--len' as string]: `${it.len}px`,
          animationDelay: `${it.delay}s, ${it.delay}s`,
          animationDuration: `${it.sway}s, .7s`,
        }} />
      ))}
    </div>
  )
}

/** Класс размера по длине текста: чем короче вопрос, тем крупнее буквы. */
export function lenClass(text: string): string {
  const n = (text ?? '').trim().length
  if (n <= 70) return ''
  if (n <= 140) return ' len-m'
  if (n <= 240) return ' len-l'
  return ' len-xl'
}

/** Появление текста «ветром»: по словам с каскадной задержкой. */
function WindText({ text }: { text: string }) {
  const words = text.split(/(\s+)/)
  let idx = 0
  return (
    <p className={`q-text${lenClass(text)}`}>
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
    const R = 44, C = 2 * Math.PI * R
    const frac = Math.max(0, Math.min(1, left / seconds))
    // Рождественский венок: хвойное кольцо + ягоды + бант; «выгорает» по кругу
    const needles = Array.from({ length: 40 }, (_, i) => {
      const ang = (i / 40) * Math.PI * 2
      const len = 7 + (i % 3) * 3
      return { x1: 55 + Math.cos(ang) * (R - 5), y1: 55 + Math.sin(ang) * (R - 5),
        x2: 55 + Math.cos(ang) * (R + len - 5), y2: 55 + Math.sin(ang) * (R + len - 5),
        rot: (ang * 180) / Math.PI }
    })
    const berries = Array.from({ length: 7 }, (_, i) => {
      const ang = (i / 7) * Math.PI * 2 + 0.4
      return { cx: 55 + Math.cos(ang) * R, cy: 55 + Math.sin(ang) * R }
    })
    return (
      <div className={`ny-wreath${low ? ' low' : ''}`}>
        <svg viewBox="0 0 110 110">
          {needles.map((n, i) => (
            <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2}
              stroke={i % 4 === 0 ? '#1f6b3a' : '#2f8f4e'} strokeWidth="3" strokeLinecap="round" />
          ))}
          <circle className="wr-bg" cx="55" cy="55" r={R} />
          <circle className="wr-fg" cx="55" cy="55" r={R}
            strokeDasharray={C} strokeDashoffset={C * (1 - frac)} />
          {berries.map((b, i) => <circle key={i} className="wr-berry" cx={b.cx} cy={b.cy} r="3.4" />)}
          <path className="wr-bow" d="M46,99 q9,-9 18,0 q-9,5 -18,0" />
        </svg>
        <span className="val">{left}</span>
      </div>
    )
  }
  // ГП: круговой таймер-змея, ползущая к своему хвосту
  if (theme === 'potter') return <SnakeTimer left={left} seconds={seconds} low={low} />
  return (
    <div className={`timer-wrap${low ? ' low' : ''}`}>
      <span className={`timer-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
}

/** Стабильное перемешивание: порядок фиксирован для конкретного вопроса. */
/** Ребус: подсвечиваем 3 последние буквы первого слова и 3 первые второго. */
function rebusCaption(word: string | undefined, isFirst: boolean) {
  const w = (word ?? '').trim()
  if (!w) return null
  const cut = isFirst ? Math.max(0, w.length - 3) : 3
  const plain = isFirst ? w.slice(0, cut) : w.slice(cut)
  const hot = isFirst ? w.slice(cut) : w.slice(0, cut)
  return isFirst
    ? <>{plain}<b className="rebus-hot">{hot}</b></>
    : <><b className="rebus-hot">{hot}</b>{plain}</>
}

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


function displayAnswer(q: Question): string {
  const empty = '⚠ ответ не заполнен в редакторе'
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display
  if (Array.isArray(d)) return d.join(' · ')
  if (typeof d === 'string' && d) return d
  if (typeof a.correct === 'string' && a.correct) return String(a.correct).split('/')[0].trim()
  if (typeof a.word === 'string' && a.word) return a.word.toUpperCase()
  if (typeof a.correct_choice === 'string' && a.correct_choice) return a.correct_choice
  if (typeof a.correct_order === 'string' && a.correct_order) return a.correct_order
  if (Array.isArray(a.correct_pairs) && a.correct_pairs.length)
    return (a.correct_pairs as string[]).join('  ')
  return empty
}

export function mediaUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const base = import.meta.env.VITE_SUPABASE_URL
  return `${base}/storage/v1/object/public/quiz-media/${path.replace(/^\//, '')}`
}

/** Озвучка → (по окончании) старт таймера → фоновая музыка (если у вопроса нет своего AV).
 *  Перенос логики старого RoundShell: музыка глушится при смене вопроса/уходе с фазы;
 *  скрытая вкладка (второй проектор) молчит. */
function QuestionAudio({ q, round, timerRunning, pack, startedAt, seconds }: {
  startedAt?: string | null
  seconds?: number
  q: LoadedPack['rounds'][number]['questions'][number]
  round: LoadedPack['rounds'][number]
  timerRunning: boolean
  pack?: LoadedPack
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
    const bg = (round.settings as { bg_music?: string }).bg_music ?? pack?.settings?.bg_music
    if (!timerRunning || !bg || hasOwnAV || document.hidden) return
    const a = new Audio(mediaUrl(bg))
    a.loop = true; a.volume = 0.6
    a.play().catch(() => {})
    // по истечении таймера музыка играет ЕЩЁ 3 СЕК и мягко глохнет
    let fade: number | undefined
    const total = (seconds ?? round.timer_seconds ?? 60) * 1000
    const msLeft = startedAt ? total - (Date.now() - new Date(startedAt).getTime()) : total
    const stop = window.setTimeout(() => {
      fade = window.setInterval(() => {
        a.volume = Math.max(0, a.volume - 0.1)
        if (a.volume <= 0.01) { if (fade) clearInterval(fade); a.pause() }
      }, 80)
    }, Math.max(0, msLeft) + 3000)
    return () => { clearTimeout(stop); if (fade) clearInterval(fade); a.pause() }
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
  const paper = pack.settings?.play_mode === 'paper'
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
      <div className="answer-pulse"><Title theme={pack.theme}
        lines={[paper ? 'СДАВАЙТЕ БЛАНКИ' : 'ОТВЕЧАЙТЕ!']} /></div>
      <div className="meta-line">{paper
        ? 'ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ'
        : 'КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ'}</div>
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
  }, [revealed, step, rows.length, rows.map(r => r.answer_text).join('|')])

  const choices = q.answer.mode === 'choice' ? q.answer.choices : null
  const imgChoices = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))

  return (
    <div className="host-screen grid-bg" style={{ justifyContent: 'flex-start' }}>
      <div className="host-topbar">
        <span className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)} :: ОТВЕТЫ</span>
        <span className="qnum">ВОПРОС <b>{step + 1}</b> / {total}</span>
      </div>
      <div className="answers-layout" style={{ marginTop: 60 }}>
        <div style={{ flex: 1.4, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <p className={`q-text${lenClass(q.question_text)}`}>{q.question_text}</p>
          {revealed && (
            <div className="answer-reveal hud-frame">
              <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
              {q.answer.mode === 'match' ? (
                <MatchAnswer q={q} />
              ) : choices && imgChoices.length === choices.length ? (
                <StagedChoices q={q} choices={choices} imgs={imgChoices} />
              ) : choices ? (
                <StagedChoices q={q} choices={choices} />
              ) : q.answer.mode === 'order' ? (
                <div className="order-answer">
                  {q.answer.correct_order.split('').map((k, i) => {
                    const c = (q.answer as { choices: { key: string; text: string }[] })
                      .choices.find(x => x.key === k)
                    return (
                      <div key={i} className="oi">
                        <b>{i + 1}.</b>{c?.text ?? ''}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="answer-main">{displayAnswer(q)}</div>
              )}
              {round.mechanic === 'rebus' && (
                <div className="rebus-answer">
                  {(q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
                    .map((m, i) => (
                      <figure key={i} className="q-img">
                        <img src={mediaUrl(m)} alt="" />
                        <figcaption>{rebusCaption(i === 0 ? q.service.word1 : q.service.word2, i === 0)}</figcaption>
                      </figure>
                    ))}
                </div>
              )}
              {q.answer_note && <div style={{ opacity: .75 }}>{q.answer_note}</div>}
              {q.answer.mode === 'choice' && !(q.answer as { correct_choice?: string }).correct_choice &&
                <div style={{ color: '#ff8fa3' }}>⚠ в редакторе не отмечен верный вариант</div>}
              <div className="q-media-grid answer-media">
                {(q.media.answer ?? []).map((m, i) => <img key={i} src={mediaUrl(m)} alt="" />)}
              </div>
            </div>
          )}
        </div>
        {pack.settings?.play_mode !== 'paper' && <div className="team-answers">
          <div className="mono-tag">ОТВЕТЫ КОМАНД</div>
          {rows.length === 0 && <div style={{ color: 'var(--dim)' }}>нет ответов</div>}
          {rows.map(a => {
            const team = teams.find(t => t.id === a.team_id) ?? allTeams.find(t => t.id === a.team_id)
            // приоритет: ручная оценка админа → автопроверка на лету
            const shown = a.is_correct ?? (revealed ? autocheck(q.answer, a.answer_text) : null)
            return (
              <div key={a.id} className="team-answer" style={{
                borderLeft: `5px solid ${shown === true ? 'var(--ok)' : shown === false ? 'var(--danger)' : 'var(--dim)'}`,
              }}>
                <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
                <span className="text">{a.answer_text || '—'}
                  {a.stake != null && a.stake !== 0 &&
                    <span style={{ color: 'var(--accent)', fontSize: '.7em' }}> · {a.stake}</span>}</span>
                {shown != null &&
                  <span className="mark" style={{ color: shown ? 'var(--ok)' : 'var(--danger)' }}>
                    {shown ? '✓' : '✗'}</span>}
              </div>
            )
          })}
        </div>}
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

/** Автопоказ ответа: как только таймер вышел — открываем ответ сам. */
/** Показ вариантов с интригой (п.5):
 *  0 сек — на экране два ЗАВЕДОМО НЕВЕРНЫХ варианта;
 *  3 сек — доезжают оставшиеся (среди них правильный), но ещё без подсветки;
 *  5.5 сек — подсветка верного и приглушение неверных, плавно.
 *  Место под все варианты зарезервировано сразу (visibility), поэтому
 *  раскладка не дёргается и по позиции ничего не угадывается. */
function StagedChoices({ q, choices, imgs }: {
  q: LoadedPack['rounds'][number]['questions'][number]
  choices: { key: string; text: string }[]
  imgs?: string[]
}) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    setStage(0)
    const t1 = setTimeout(() => setStage(1), 3000)
    const t2 = setTimeout(() => setStage(2), 5500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [q.id])

  const correctKey = (q.answer as { correct_choice?: string }).correct_choice ?? ''
  const wrongs = choices.filter(c => c.key !== correctKey)
  // первые двое неверных выбираются стабильно — одинаково на всех проекторах
  const firstWave = new Set(shuffleStable(wrongs.map(c => c.key), q.id).slice(0, 2))

  const cls = (key: string) => {
    const shown = stage >= 1 || firstWave.has(key)
    if (!shown) return ' hidden-yet'
    if (stage < 2) return ''
    return key === correctKey ? ' correct' : ' dimmed'
  }
  const delay = (key: string) => (firstWave.has(key) ? 0 : 0.25 * choices
    .filter(c => !firstWave.has(c.key)).findIndex(c => c.key === key))

  if (imgs) return (
    <div className="choice-imgs">
      {choices.map((c, i) => (
        <div key={c.key} className={`choice-img${cls(c.key)}`}
          style={{ animationDelay: `${delay(c.key)}s` }}>
          <img src={mediaUrl(imgs[i])} alt="" />
          <span className="key">{c.key}{c.text ? ` — ${c.text}` : ''}</span>
        </div>
      ))}
    </div>
  )
  return (
    <div className="choices-grid" style={{ width: '100%', marginTop: 0, paddingTop: 0 }}>
      {choices.map(c => (
        <div key={c.key} className={`choice-plate${cls(c.key)}`}
          style={{ animationDelay: `${delay(c.key)}s` }}>
          <span className="key">{c.key}</span>{c.text}
        </div>
      ))}
    </div>
  )
}

function AutoReveal({ enabled, startedAt, seconds }: {
  enabled: boolean; startedAt: string | null; seconds: number
}) {
  useEffect(() => {
    if (!enabled || !startedAt || document.hidden) return
    const ms = new Date(startedAt).getTime() + seconds * 1000 - Date.now()
    const t = setTimeout(() => { void revealAnswer() }, Math.max(0, ms))
    return () => clearTimeout(t)
  }, [enabled, startedAt, seconds])
  return null
}

/** Автопролистывание: через N сек после конца таймера — следующий вопрос. */
function AutoAdvance({ round, gameState, isLast }: {
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  isLast: boolean
}) {
  const sec = (round.settings as { autoAdvanceSec?: number }).autoAdvanceSec ?? 0
  useEffect(() => {
    if (!sec || !gameState.timer_started_at || isLast || document.hidden) return
    const started = new Date(gameState.timer_started_at).getTime()
    const fireAt = started + (round.timer_seconds + sec) * 1000
    const ms = fireAt - Date.now()
    if (ms <= 0) return
    const t = setTimeout(() => { void gotoQuestion(gameState.question_index + 1) }, ms)
    return () => clearTimeout(t)
  }, [gameState.timer_started_at, gameState.question_index, sec])
  return null
}

/** Своя игра: доска тем и плиток. Клик по плитке — играет трек, ответ по кнопке.
 *  Открытые плитки гаснут. Тем может быть любое количество (1..6). */
function JeopardyBoard({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const themes = (round.settings as { themes?: JeopardyTheme[] }).themes ?? []
  const [active, setActive] = useState<{ t: number; i: number } | null>(null)
  const [opened, setOpened] = useState<string[]>([])

  if (themes.length === 0) return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">СВОЯ ИГРА</div>
      <p>Темы не заполнены — добавь их в редакторе раунда</p>
      <div className="host-actions">
        <button onClick={() => void setPhase('round_intro')}>← К титулу</button>
      </div>
    </div>
  )

  const rows = Math.max(...themes.map(t => t.tiles.length))
  return (
    <div className="host-screen grid-bg jp-screen">
      <h1 className="neon-title jp-title">{round.title_lines.join(' ') || 'СВОЯ ИГРА'}</h1>
      <div className="jp-board" style={{
        gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))`,
        gridTemplateRows: `auto repeat(${rows}, minmax(0, 1fr))`,
      }}>
        {themes.map((t, ti) => (
          <div key={`h${ti}`} className="jp-theme-name" style={{ gridColumn: ti + 1, gridRow: 1 }}>
            {t.name || `Тема ${ti + 1}`}
          </div>
        ))}
        {themes.map((t, ti) => t.tiles.map((tile, i) => {
          const done = opened.includes(`${ti}-${i}`)
          return (
            <button key={`${ti}-${i}`} className={`jp-tile${done ? ' done' : ''}`} disabled={done}
              style={{ gridColumn: ti + 1, gridRow: i + 2 }}
              onClick={() => {
                // синхронизируем номер открытой плитки с игроками:
                // они шлют ответ по question_index, модалка читает по нему же
                const flat = themes.slice(0, ti).reduce((s, x) => s + x.tiles.length, 0) + i
                void gotoQuestion(flat)
                setActive({ t: ti, i })
              }}>{done ? '·' : tile.value}</button>
          )
        }))}
      </div>
      <div className="host-actions">
        <button onClick={() => {
          if (gameState.round_number + 1 < pack.rounds.length) void gotoRound(gameState.round_number + 1)
          else void finishGame(gameState.pack_id)
        }}>Завершить раунд →</button>
      </div>
      {active && (
        <TileModal packTheme={pack.theme} round={round} gameState={gameState}
          theme={themes[active.t]} tile={themes[active.t].tiles[active.i]}
          refKey={`t${themes.slice(0, active.t).reduce((s, x) => s + x.tiles.length, 0) + active.i}`}
          onClose={() => { setOpened(o => [...o, `${active.t}-${active.i}`]); setActive(null) }} />
      )}
    </div>
  )
}

/** Модалка плитки (перенос из старого Round4): автозапуск трека с обратным
 *  отсчётом клипа, живые ответы команд по скорости, ✓/✗, переслушать. */
function TileModal({ round, gameState, theme, tile, refKey, onClose, packTheme }: {
  packTheme?: string
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  theme: JeopardyTheme
  tile: { value: number; audio: string; correct: string }
  refKey: string
  onClose: () => void
}) {
  const clipSeconds = (round.settings as { clipSeconds?: number }).clipSeconds ?? 30
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const [remaining, setRemaining] = useState(clipSeconds)
  const [playing, setPlaying] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const teams = useTeams(gameState.game_id)

  const play = () => {
    audioRef.current?.pause()
    if (timerRef.current) clearInterval(timerRef.current)
    if (document.hidden || !tile.audio) { setPlaying(false); return }
    const audio = new Audio(mediaUrl(tile.audio))
    audioRef.current = audio
    setRemaining(clipSeconds); setPlaying(true)
    audio.play().catch(() => setPlaying(false))
    timerRef.current = window.setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          audio.pause(); setPlaying(false); return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  useEffect(() => {
    play()
    return () => { audioRef.current?.pause(); if (timerRef.current) clearInterval(timerRef.current) }
  }, [refKey])

  const rows = answers
    .filter(a => a.question_ref === `q-${refKey}`)
    .sort((x, y) => +new Date(x.updated_at) - +new Date(y.updated_at))

  const grade = async (id: string, correct: boolean) => {
    await supabase.from('answers').update({ is_correct: correct }).eq('id', id)
  }

  return createPortal(
    <div className={`jp-overlay theme-${packTheme ?? 'classic'}`}>
      <div className="jp-modal hud-frame">
        <div className="jp-modal-head">
          <div>
            <div className="jp-modal-theme">{theme.name}</div>
            <div className="mono-tag">ПЛИТКА · {tile.value}</div>
          </div>
          <div className={`jp-count${playing ? ' on' : ''}`}>{String(remaining).padStart(2, '0')}</div>
        </div>

        {showAnswer && (
          <div className="answer-reveal hud-frame" style={{ padding: '12px 18px' }}>
            <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
            <div className="answer-main" style={{ fontSize: 'clamp(24px,3vw,40px)' }}>{tile.correct}</div>
          </div>
        )}

        <div className="jp-answers">
          <div className="mono-tag">ОТВЕТЫ (ПО СКОРОСТИ)</div>
          {rows.length === 0 && <div style={{ color: 'var(--dim)' }}>ждём ответы…</div>}
          {rows.map((a, pos) => {
            const team = teams.find(t => t.id === a.team_id)
            return (
              <div key={a.id} className="jp-answer" style={{
                borderLeft: `3px solid ${a.is_correct === true ? 'var(--ok)' : a.is_correct === false ? 'var(--danger)' : 'var(--dim)'}`,
              }}>
                <span className="pos">#{pos + 1}</span>
                <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
                <span className="txt">{a.answer_text || '—'}</span>
                <button className="jp-grade ok" disabled={a.is_correct != null}
                  onClick={() => void grade(a.id, true)}>✓</button>
                <button className="jp-grade no" disabled={a.is_correct != null}
                  onClick={() => void grade(a.id, false)}>✗</button>
              </div>
            )
          })}
        </div>

        <div className="jp-modal-foot">
          {!showAnswer && <button onClick={() => setShowAnswer(true)}>Показать ответ</button>}
          <button className="ghost" onClick={play}>↻ Переслушать</button>
          <button className="ghost dark" onClick={onClose}>Закрыть плитку</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** Сопоставление на экране ответа: картинка №N с правильной буквой (перенос MatchAnswerGrid). */
function MatchAnswer({ q }: { q: LoadedPack['rounds'][number]['questions'][number] }) {
  if (q.answer.mode !== 'match') return null
  const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  const pairs = q.answer.correct_pairs
  return (
    <div className={`match-answer n${Math.min(q.answer.left.length, 6)}`}>
      {q.answer.left.map((l, i) => {
        const right = pairs.find(p => p.startsWith(l))?.slice(l.length) ?? '—'
        return (
          <div key={l} className="mi">
            {imgs[i] && <img src={mediaUrl(imgs[i])} alt="" />}
            <div className="mi-label">{l} → {right}</div>
          </div>
        )
      })}
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
  // табло по настройке показывается ВСЕГДА, включая последний раунд
  // (раньше на последнем молча пропускалось — предварительные итоги терялись)
  if (s.show_scoreboard_after && gameState.phase !== 'scoreboard')
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
  const rows = rankTeams(teams, totals, answers)
  const ranked = rows.map(r => r.team)
  // раскрытие интригой: с последнего места, по одной строке каждые 2.2 сек
  const [revealed, setRevealed] = useState(0)
  useEffect(() => {
    setRevealed(0)
    if (ranked.length === 0) return
    const t = setInterval(() => setRevealed(p => (p >= ranked.length ? p : p + 1)), 2200)
    return () => clearInterval(t)
  }, [ranked.length, gameState.round_number])
  const visible = ranked.slice(Math.max(0, ranked.length - revealed))
  const medals = ['🥇', '🥈', '🥉']
  return (
    <div className="host-screen grid-bg sb-screen">
      <div className="mono-tag">ПОЛОЖЕНИЕ КОМАНД</div>
      {/* заголовок намеренно НЕ через Title: он был крупнее самой таблицы */}
      <h2 className="sb-title">ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ</h2>
      <table className="score-table">
        <thead>
          <tr>
            <th></th><th>Команда</th>
            {scored.map((r, i) => <th key={r.id}>Р{i + 1}</th>)}
            <th>Σ</th>
          </tr>
        </thead>
        <tbody>
          {visible.map(t => {
            const row = rows.find(r => r.team.id === t.id)
            const place = row?.place ?? 1
            return (
            <tr key={t.id} className={`sb-row${place === 1 ? ' leader' : ''}`}>
              {/* при равных очках место общее: 1, 2, 2, 4 */}
              <td>{medals[place - 1] ?? place}{row?.shared && <span className="sb-eq">=</span>}</td>
              <td style={{ color: t.color, fontFamily: 'var(--font-display)' }}>{t.name}</td>
              {(perRound.get(t.id) ?? scored.map(() => 0)).map((v, i) => <td key={i}>{v}</td>)}
              <td className="total">{totals.get(t.id) ?? 0}</td>
            </tr>
          )})}
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

function Finale({ pack, gameId, gameState }: {
  pack: LoadedPack; gameId: string
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const teams = useTeams(gameId)
  const answers = useAnswers(gameId)
  const totals = computeTotals(pack, teams, answers)
  const roundScores = computeRoundScores(pack, teams, answers)
  const rows = rankTeams(teams, totals, answers)

  // Шаг и сценарий живут в сессии: ведущий может вести финал с телефона,
  // стоя у сцены, — для награждения в баре это обязательно.
  const bar = !!gameState.reveal
  const step = gameState.question_index ?? 0

  // раунды, идущие в зачёт, и победитель каждого из них
  const scored = pack.rounds.map((r, i) => ({ r, i })).filter(x => !x.r.off_scoreboard)
  const roundWinners = scored.map(({ r, i }) => {
    let best: (typeof teams)[number] | null = null, bestVal = -Infinity
    for (const t of teams) {
      const v = roundScores.get(t.id)?.[i] ?? 0
      if (v > bestVal) { bestVal = v; best = t }
    }
    return { round: r, idx: i, team: best, score: bestVal }
  })

  // ── СЦЕНАРИЙ «ШОУ»: нарезка раундов по 15 сек → победитель (10 сек) → таблица
  const SLIDE = 15_000, WINNER = 10_000
  const winnerStep = roundWinners.length
  useEffect(() => {
    if (bar || step > winnerStep) return
    const ms = step === winnerStep ? WINNER : SLIDE
    const t = setTimeout(() => void setFinaleStep(step + 1), ms)
    return () => clearTimeout(t)
  }, [bar, step, winnerStep])

  const colors = ['#ffd700', '#ff2fa0', '#00e5ff', '#b6ff3c', '#ff8c42']
  const fireworks = (
    <>
      {Array.from({ length: 5 }, (_, bi) => (
        <div key={bi} className="fw-burst" style={{
          left: `${12 + bi * 19}%`, top: `${18 + (bi % 3) * 14}%`,
        }}>
          <span className="fw-flash" style={{
            background: `radial-gradient(circle, ${colors[bi % colors.length]}55, transparent 70%)`,
            ['--dur' as string]: `${2.2 + bi * 0.3}s`, ['--delay' as string]: `${bi * 0.45}s`,
          }} />
          {Array.from({ length: 10 }, (_, si) => (
            <span key={si} className="fw-spark" style={{
              background: colors[(bi + si) % colors.length],
              ['--a' as string]: `${si * 36}deg`,
              ['--dur' as string]: `${2.2 + bi * 0.3}s`, ['--delay' as string]: `${bi * 0.45}s`,
            }} />
          ))}
        </div>
      ))}
    </>
  )

  const fullTable = (
    <div className="fin-breakdown">
      <div className="mono-tag">РАЗБИВКА ПО РАУНДАМ</div>
      <table className="fin-table">
        <thead><tr><th />{pack.rounds.map((r, i) => !r.off_scoreboard &&
          <th key={r.id}>Р{displayRoundNumber(pack, i)}</th>)}<th>Σ</th></tr></thead>
        <tbody>
          {rows.map(({ team: t, place, shared }) => (
            <tr key={t.id} className={place <= 3 ? 'top3' : ''}>
              <td className="fin-pos">{place}{shared && <span className="sb-eq">=</span>}</td>
              <td style={{ color: t.color }}>{t.name}</td>
              {pack.rounds.map((r, ri) => !r.off_scoreboard && (
                <td key={r.id}>{roundScores.get(t.id)?.[ri] ?? 0}</td>
              ))}
              <td><b>{totals.get(t.id) ?? 0}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // ── СЦЕНАРИЙ «БАР»: 3 место → 2 → 1 → таблица, каждый шаг по команде ведущего
  if (bar) {
    // Идём по МЕСТАМ (3 → 2 → 1), а не по позициям в списке: при ничьей
    // одно место могут занимать несколько команд, и все они выходят вместе.
    const places = [3, 2, 1]
    if (step >= places.length) return (
      <div className="host-screen grid-bg fin-screen">
        {fireworks}
        <div className="mono-tag">ИТОГИ ИГРЫ</div>
        <Title theme={pack.theme} lines={['РЕЗУЛЬТАТЫ']} />
        {fullTable}
        <div className="host-actions">
          <button onClick={() => { if (confirm('Начать новую игру?')) void resetGame() }}>⟲ Новая игра</button>
        </div>
      </div>
    )
    const place = places[step]
    const winners = rows.filter(r => r.place === place)
    return (
      <div className="host-screen grid-bg fin-screen" onClick={() => void setFinaleStep(step + 1)}>
        {place === 1 && fireworks}
        <div className="mono-tag">НАГРАЖДЕНИЕ</div>
        <div className={`fin-award p${place}`}>
          <div className="fin-award-place">{place} МЕСТО</div>
          <div className="fin-award-medal">{['🥇', '🥈', '🥉'][place - 1]}</div>
          {winners.length > 0
            ? <>
                {winners.map(r => (
                  <div key={r.team.id} className="fin-award-name"
                    style={{ color: r.team.color }}>{r.team.name}</div>
                ))}
                <div className="fin-award-score">{winners[0].total}</div>
              </>
            : <div className="fin-award-name">—</div>}
        </div>
        <div className="fin-hint">дальше — по команде ведущего</div>
      </div>
    )
  }

  // ── СЦЕНАРИЙ «ШОУ» ──
  if (step < winnerStep) {
    const w = roundWinners[step]
    return (
      <div className="host-screen grid-bg fin-screen" onClick={() => void setFinaleStep(step + 1)}>
        <div className="mono-tag">ВСПОМИНАЕМ ИГРУ</div>
        <div className="fin-slide">
          <div className="fin-slide-round">
            Раунд {displayRoundNumber(pack, w.idx)} · {w.round.title_lines.join(' ')}
          </div>
          <div className="fin-slide-label">лучший результат</div>
          <div className="fin-slide-team" style={{ color: w.team?.color }}>
            {w.team?.name ?? '—'}
          </div>
          <div className="fin-slide-score">{Math.max(0, w.score)}</div>
        </div>
        {/* полоска времени: видно, сколько осталось до следующего слайда */}
        <div className="fin-progress" key={step}><i style={{ animationDuration: '15s' }} /></div>
        <div className="fin-dots">
          {roundWinners.map((_, i) => <span key={i} className={i === step ? 'on' : ''} />)}
        </div>
      </div>
    )
  }

  if (step === winnerStep) {
    // победителей может быть несколько — ничья на первом месте
    const champs = rows.filter(r => r.place === 1)
    return (
      <div className="host-screen grid-bg fin-screen" onClick={() => void setFinaleStep(step + 1)}>
        {fireworks}
        <div className="mono-tag">
          {champs.length > 1 ? 'ПОБЕДИТЕЛИ ИГРЫ' : 'ПОБЕДИТЕЛЬ ИГРЫ'}
        </div>
        <div className="fin-award p1">
          <div className="fin-award-medal">🥇</div>
          {champs.length > 0
            ? champs.map(r => (
                <div key={r.team.id} className="fin-award-name"
                  style={{ color: r.team.color }}>{r.team.name}</div>
              ))
            : <div className="fin-award-name">—</div>}
          <div className="fin-award-score">{champs[0]?.total ?? 0}</div>
        </div>
        <div className="fin-progress" key="w"><i style={{ animationDuration: '10s' }} /></div>
      </div>
    )
  }

  return (
    <div className="host-screen grid-bg fin-screen">
      {fireworks}
      <div className="mono-tag">ИТОГИ ИГРЫ</div>
      <Title theme={pack.theme} lines={['РЕЗУЛЬТАТЫ']} />
      {fullTable}
      <div className="host-actions">
        <button onClick={() => { if (confirm('Начать новую игру?')) void resetGame() }}>⟲ Новая игра</button>
      </div>
    </div>
  )
}
