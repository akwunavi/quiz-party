// ═══ «УГАДАЙ МЕЛОДИЮ»: аукцион секунд ═══
// Состояние — в game_state.melody, единый автомат с ДЕДЛАЙНАМИ (не setTimeout),
// поэтому проектор и телефоны всегда в одной стадии, даже после перезагрузки.
//
// spinning (барабан по плиткам, БЕЗ модалки) → listen (1 сек трека)
// → bidding (ставки 2–10) → bids (показ, кто играет) → snippet (интервал играет)
// → answering (ответ + фоновая музыка) → passed (вторая слушает трек целиком)
// → done (трек закрыт)
import { getRoomId } from '../../lib/room'
import { playAudio, createAudio } from '../../lib/audioSource'
import { afterRoundStep } from '../../lib/flow'
import { showScoreboard, startBreak, finishGame } from '../../lib/gameActions'
import { createPortal } from 'react-dom'
import { SnakeTimer } from '../../components/SnakeTimer'
import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { supabase } from '../../lib/supabase'
import { mediaUrl } from '../HostScreen'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, MelodySettings, MelodyState, MelodyTheme } from '../../types/quiz'

/** Завершение раунда мелодии: дальше по пакету или в финал. */
async function finishMelodyRound(gameState: GameState, pack: LoadedPack) {
  // Раньше отсюда прыгали СРАЗУ в следующий раунд, минуя общий маршрут:
  // настройки «показать табло» и «перерыв» у музыкального раунда просто
  // игнорировались. Теперь шаг считает тот же модуль, что и везде.
  await supabase.from('game_sessions').update({ melody: {} }).eq('id', getRoomId())
  const step = afterRoundStep(pack, gameState.round_number, 'show_answers')
  if (step.kind === 'scoreboard') return void showScoreboard()
  if (step.kind === 'break') return void startBreak()
  if (step.kind === 'finale') return void finishGame(gameState.pack_id)
  await supabase.from('game_sessions').update({
    phase: 'round_intro', round_number: gameState.round_number + 1,
    question_index: 0, timer_started_at: null, reveal: false, melody: {},
  }).eq('id', getRoomId())
}

// Единый аудио-элемент: «разблокируется» первым кликом по проектору и дальше
// переиспользуется — autoplay-политика браузера больше не блокирует треки,
// запущенные выбором с телефона (там нет жеста на проекторе).
let sharedAudio: HTMLAudioElement | null = null
export function unlockAudio() {
  if (sharedAudio) return
  sharedAudio = createAudio()
  // тихий пинок, чтобы браузер пометил элемент как «разрешённый жестом»
  sharedAudio.play().catch(() => {})
  sharedAudio.pause()
}
function playShared(src: string): HTMLAudioElement {
  if (!sharedAudio) sharedAudio = createAudio()
  sharedAudio.pause()
  sharedAudio.loop = false
  sharedAudio.volume = 1
  // тот же запасной путь, что и в «Своей игре»: при блокировке прямого
  // запроса файл скачивается и играется из памяти
  void playAudio(sharedAudio, src)
  return sharedAudio
}

async function saveMelody(next: MelodyState) {
  await supabase.from('game_sessions').update({ melody: next }).eq('id', getRoomId())
}
const inSec = (s: number) => new Date(Date.now() + s * 1000).toISOString()

export function MelodyBoard({ pack, round, gameState }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
}) {
  const s = round.settings as MelodySettings
  const themes = s.themes ?? []
  const m: MelodyState = gameState.melody ?? {}
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const played = m.played ?? []
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 200); return () => clearInterval(t) }, [])

  const deadline = m.deadline ? new Date(m.deadline).getTime() : 0
  const left = deadline ? Math.max(0, Math.ceil((deadline - now) / 1000)) : 0
  // максимум, который видели в этой фазе → доля остатка для песочных часов
  const phaseMax = useRef(0)
  useEffect(() => { phaseMax.current = 0 }, [m.stage, m.key])
  if (left > phaseMax.current) phaseMax.current = left
  const total = phaseMax.current
  const expired = !!deadline && now >= deadline

  const [ti, i] = (m.key ?? '0-0').split('-').map(Number)
  const track = themes[ti]?.tracks[i]
  const bidRef = `q-mel-${m.key}-bid`
  const ansRef = `q-mel-${m.key}`
  const bids = answers.filter(a => a.question_ref === bidRef)

  // ставки, дошедшие ПОСЛЕ дедлайна (полинг ~2 сек), пересобирают очередь,
  // пока трек ещё не запущен кнопкой «Играем N сек»
  useEffect(() => {
    if (m.stage !== 'bids') return
    const bidders = bids
      .map(a => ({ id: a.team_id, sec: Number(a.answer_text) || 99, at: a.updated_at }))
      .sort((x, y) => x.sec - y.sec || +new Date(x.at) - +new Date(y.at))
      .map(b => b.id)
    const order = [...bidders, ...teams.map(t => t.id).filter(id => !bidders.includes(id))]
    if (JSON.stringify(order) !== JSON.stringify(m.order)) {
      void saveMelody({ ...m, order, turn: 0 })
    }
  }, [m.stage, bids.map(b => `${b.team_id}:${b.answer_text}`).join('|')])

  // ── snippet: интервал играет от РЕАЛЬНОГО старта звука ровно bid секунд ──
  // Сторож стадии snippet. Переход был завязан ТОЛЬКО на событие окончания
  // звука: если аудио не загрузилось, вкладка была скрыта или браузер не дал
  // автовоспроизведение — экран замирал навсегда, и выйти было нельзя.
  useEffect(() => {
    if (m.stage !== 'snippet') return
    const sec = m.snippetSec ?? 5
    const t = window.setTimeout(() => {
      void saveMelody({ ...m, stage: 'answering', deadline: inSec(s.answerSec ?? 30) })
    }, (sec + 10) * 1000)          // фрагмент + 10 сек запаса
    return () => clearTimeout(t)
  }, [m.stage, m.key, m.snippetSec])

  useEffect(() => {
    if (m.stage !== 'snippet' || !track?.audio || document.hidden) return
    const sec = m.snippetSec ?? 5
    const a = playShared(mediaUrl(track.audio))
    audioRef.current = a
    let stop: number | undefined
    let advanced = false
    const advance = () => {
      if (advanced) return
      advanced = true
      a.pause()
      void saveMelody({ ...m, stage: 'answering', deadline: inSec(s.answerSec ?? 30) })
    }
    a.addEventListener('playing', () => {
      // с этого момента и тикает счётчик на экране
      void saveMelody({ ...m, deadline: inSec(sec) })
      stop = window.setTimeout(advance, sec * 1000)
    }, { once: true })
    const guard = window.setTimeout(advance, (sec + 4) * 1000)
    return () => { if (stop) clearTimeout(stop); clearTimeout(guard) }
  }, [m.stage, m.key])

  // ── единственный обработчик переходов: сработал дедлайн — двигаем стадию ──
  useEffect(() => {
    if (!expired || document.hidden) return
    if (m.stage === 'spinning') {
      void saveMelody({ ...m, stage: 'listen', deadline: inSec(2) })
    } else if (m.stage === 'bidding') {
      const bidders = bids
        .map(a => ({ id: a.team_id, sec: Number(a.answer_text) || 99, at: a.updated_at }))
        .sort((x, y) => x.sec - y.sec || +new Date(x.at) - +new Date(y.at))
        .map(b => b.id)
      // команды без ставки — в конец очереди: если первая не угадает,
      // ход всё равно есть кому передать
      const order = [...bidders, ...teams.map(t => t.id).filter(id => !bidders.includes(id))]
      void saveMelody({ ...m, stage: 'bids', order, turn: 0, deadline: undefined })
    } else if (m.stage === 'answering' || m.stage === 'passed') {
      void saveMelody({ ...m, deadline: undefined })   // время вышло — судит ведущий
    }
  }, [expired, m.stage])

  // ── 1 секунда трека на стадии listen ──
  useEffect(() => {
    if (m.stage !== 'listen' || !track?.audio || document.hidden) return
    const a = playShared(mediaUrl(track.audio))
    audioRef.current = a
    let stop: number | undefined
    let advanced = false
    const advance = () => {
      if (advanced) return
      advanced = true
      a.pause()
      void saveMelody({ ...m, stage: 'bidding', deadline: inSec(s.bidSec ?? 10) })
    }
    // секунда считается от РЕАЛЬНОГО начала звука
    a.addEventListener('playing', () => { stop = window.setTimeout(advance, 1000) }, { once: true })
    // страховка: если звук так и не пошёл (нет файла) — не зависаем
    const guard = window.setTimeout(advance, 4000)
    return () => { if (stop) clearTimeout(stop); clearTimeout(guard) }
  }, [m.stage, m.key])


  // ── фоновая музыка на время размышления ──
  useEffect(() => {
    const bg = (round.settings as { bg_music?: string }).bg_music ?? pack.settings?.bg_music
    // stopAfterTimer: по истечении времени музыка играет ещё 3 сек и глохнет
    if ((m.stage !== 'answering' && m.stage !== 'bidding') || !bg || document.hidden) return
    const a = playShared(mediaUrl(bg))
    a.loop = true; a.volume = .45
    return () => { a.pause(); a.loop = false; a.volume = 1 }
  }, [m.stage])

  // ── вторая команда: трек целиком, по окончании — окно на ответ ──
  useEffect(() => {
    if (m.stage !== 'passed' || m.deadline || !track?.audio || document.hidden) return
    const a = playShared(mediaUrl(track.audio))
    audioRef.current = a
    a.onended = () => void saveMelody({ ...m, deadline: inSec(s.passAnswerSec ?? 10) })
    return () => { a.pause(); a.onended = null }
  }, [m.stage])

  if (themes.length === 0) return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">УГАДАЙ МЕЛОДИЮ</div>
      <p>Темы не заполнены — добавь их в редакторе раунда</p>
    </div>
  )

  const allKeys = themes.flatMap((t, x) => t.tracks.map((_, y) => `${x}-${y}`))
  const freeKeys = allKeys.filter(k => !played.includes(k))
  const idle = !m.stage || m.stage === 'idle' || m.stage === 'done'

  const startSpin = () => {
    const target = freeKeys[Math.floor(Math.random() * freeKeys.length)]
    // одна плитка осталась — крутить нечего, запускаем сразу
    if (freeKeys.length === 1) {
      void saveMelody({ ...m, key: target, stage: 'listen', deadline: inSec(3),
        order: undefined, turn: 0, chooser: undefined })
      return
    }
    void saveMelody({ ...m, key: target, stage: 'spinning',
      deadline: inSec(Math.min(s.spinSec ?? 5, 8)), order: undefined, turn: 0, chooser: undefined })
  }

  const currentId = m.order?.[m.turn ?? 0]
  const currentTeam = teams.find(t => t.id === currentId)
  const bidSec = Number(bids.find(b => b.team_id === currentId)?.answer_text) || 0
  const ans = answers.find(a => a.question_ref === ansRef && a.team_id === currentId)

  const grade = async (correct: boolean) => {
    if (!ans) return
    const isFirst = (m.turn ?? 0) === 0
    const pts = correct ? (isFirst ? (bidSec <= 5 ? 2 : 1) : 0.5) : 0
    await supabase.from('answers').update({ is_correct: correct, stake: pts }).eq('id', ans.id)
    if (correct) {
      // не закрываем модалку: показываем результат, закрытие — кнопкой
      await saveMelody({ ...m, stage: 'reveal', deadline: undefined,
        played: [...played, m.key!], wonPts: pts, wonTeam: currentId, chooser: undefined })
    } else await saveMelody({ ...m, deadline: undefined })  // время стоп, ждём передачи хода
  }
  const pass = async () => {
    if ((m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1) {
      await saveMelody({ ...m, stage: 'passed', turn: 1, deadline: undefined })
    } else {
      await saveMelody({ ...m, stage: 'done', deadline: undefined, played: [...played, m.key!] })
    }
  }

  return (
    <div className="host-screen grid-bg mel-screen" onPointerDown={unlockAudio}>
      <MelodyGrid themes={themes} played={played} spinning={m.stage === 'spinning'}
        spinKey={m.key} spinLeft={left} spinTotal={s.spinSec ?? 10} />

      {idle && (
        <div className="host-actions">
          {freeKeys.length > 0
            ? <button onClick={startSpin}>{played.length === 0 ? 'Стартуем!' : 'Следующий трек'}</button>
            : <>
                <div className="mono-tag">ВСЕ ТРЕКИ ОТЫГРАНЫ</div>
                <button onClick={() => void finishMelodyRound(gameState, pack)}>
                  Завершить раунд →</button>
              </>}
        </div>
      )}

      {/* модалка появляется только с момента прослушивания, на барабане её нет */}
      {/* ПОРТАЛ в document.body: модалка физически не может стать «частью страницы»,
          какие бы transform/overflow ни появились у предков */}
      {m.stage && !idle && m.stage !== 'spinning' && createPortal(
        <div className={`mel-overlay theme-${pack.theme ?? 'classic'}`}>
          <div className="mel-modal">
            <div className="mel-modal-head">
              <div className="mel-modal-theme">{themes[ti]?.name} · трек {i + 1}</div>
              {!!deadline && (
                // те же часы, что у большого таймера: --r = доля остатка
                <div className="mel-count">
                  {pack.theme === 'potter'
                    ? <SnakeTimer left={left} seconds={total} low={left <= 5} />
                    : left}
                </div>
              )}
            </div>

            {m.stage === 'listen' && <div className="mel-big">СЛУШАЕМ 1 СЕКУНДУ…</div>}

            {m.stage === 'bidding' && (<>
              <div className="mel-big">ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?</div>
              <div className="mel-points-hint">2–5 сек → 2 балла · 6–10 сек → 1 балл ·
                передача хода → 0.5 балла</div>
              <div className="mel-bids">
                {[...teams].sort((a, b) => a.name.localeCompare(b.name)).map(t => {
                  const b = bids.find(x => x.team_id === t.id)
                  return <div key={t.id} className={`mel-bid-row${b ? ' win' : ''}`}>
                    <span style={{ color: t.color }}>{t.name}</span>
                    <b>{b ? 'ставка принята ✓' : '…'}</b><span /></div>
                })}
              </div>
            </>)}

            {m.stage === 'bids' && (<>
              <div className="mono-tag">СТАВКИ КОМАНД</div>
              <div className="mel-bids">
                {(m.order ?? []).map((id, pos) => {
                  const t = teams.find(x => x.id === id)
                  const b = bids.find(x => x.team_id === id)
                  return (
                    <div key={id} className={`mel-bid-row${pos === 0 ? ' win' : ''}`}>
                      <span style={{ color: t?.color }}>{t?.name}</span>
                      <b>{b?.answer_text} сек</b>
                      {pos === 0 ? <span className="mel-win-tag">ИГРАЕТ</span> : <span />}
                    </div>
                  )
                })}
                {(m.order ?? []).length === 0 && <div style={{ opacity: .6 }}>ставок нет</div>}
              </div>
              <div className="mel-actions">
                <button disabled={!currentId}
                  onClick={() => void saveMelody({ ...m, stage: 'snippet',
                    snippetSec: bidSec || 5, deadline: undefined })}>
                  Играем {bidSec || 5} сек →
                </button>
                <button className="ghost dark"
                  onClick={() => void saveMelody({ ...m, stage: 'done', deadline: undefined,
                    played: [...played, m.key!] })}>Пропустить трек</button>
              </div>
            </>)}

            {m.stage === 'snippet' && (<>
              <div className="mel-big" style={{ color: currentTeam?.color }}>
                {currentTeam?.name} · играет {bidSec} сек
              </div>
              {/* если звук не пошёл — ведущий переводит стадию руками */}
              <div className="mel-actions">
                <button onClick={() => void saveMelody({ ...m, stage: 'answering',
                  deadline: inSec(s.answerSec ?? 30) })}>Принимаем ответ →</button>
              </div>
            </>)}

            {m.stage === 'reveal' && (<>
              <div className="answer-reveal" style={{ padding: '18px 28px' }}>
                <div className="answer-label">ВЕРНО ✓ · +{m.wonPts ?? 0}</div>
                <div className="answer-main">{track?.correct}</div>
              </div>
              <div className="mel-big" style={{ color: teams.find(t => t.id === m.wonTeam)?.color }}>
                {teams.find(t => t.id === m.wonTeam)?.name} забирает баллы
              </div>
              <div className="mel-actions">
                <button onClick={() => void saveMelody({ ...m, stage: 'done' })}>К доске →</button>
              </div>
            </>)}
            {/* Аварийный выход. Доступен на любой стадии: интернет у команд
                отваливается, ответы не долетают, и ведущему нужен способ
                двигаться дальше, не перезапуская игру. */}
            {m.stage !== 'reveal' && m.stage !== 'done' && (
              <button className="mel-escape" onClick={async () => {
                if (!confirm('Закрыть трек и вернуться к доске?\n\n'
                  + 'Баллы за него никто не получит.')) return
                await saveMelody({ ...m, stage: 'done', deadline: undefined,
                  played: [...played, m.key!] })
              }}>аварийно закрыть трек</button>
            )}

            {(m.stage === 'answering' || m.stage === 'passed') && (<>
              <div className="mel-big" style={{ color: currentTeam?.color }}>
                {m.stage === 'passed' ? 'ХОД ПЕРЕДАН · ' : ''}{currentTeam?.name ?? '—'}
              </div>
              <div className="mel-points-hint">
                {m.stage === 'passed' ? 'за верный ответ — 0.5 балла'
                  : `ставка ${bidSec} сек → за верный ответ ${bidSec <= 5 ? 2 : 1} балла`}
              </div>
              <div className="mel-answer">
                {ans?.answer_text ? <>Ответ: <b>{ans.answer_text}</b></>
                  : <span style={{ opacity: .6 }}>ждём ответ…</span>}
              </div>
              {ans?.is_correct === true && (
                <div className="answer-reveal hud-frame">
                  <div className="answer-label">ВЕРНО ✓</div>
                  <div className="answer-main">{track?.correct}</div>
                </div>
              )}
              {ans?.is_correct === false && (
                <div className="mel-wrong">
                  ✗ НЕВЕРНО · ответ не раскрываем
                  {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1
                    ? ' — передайте ход второй команде' : ' — трек закрывается'}
                </div>
              )}
              <div className="mel-actions">
                <button disabled={!ans} onClick={() => void grade(true)}>✓ Верно</button>
                <button className="ghost" onClick={async () => {
                  // «не верно» и «дальше» — одно действие: отметить и передать/закрыть
                  if (ans && ans.is_correct == null)
                    await supabase.from('answers').update({ is_correct: false, stake: 0 }).eq('id', ans.id)
                  await pass()
                }}>
                  {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1 ? '✗ Передать ход →' : '✗ Закрыть трек'}
                </button>
              </div>
            </>)}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

/** Барабан: подсветка бежит по плиткам и замедляется к концу. */
function MelodyGrid({ themes, played, spinning, spinKey, spinLeft, spinTotal }: {
  themes: MelodyTheme[]; played: string[]
  spinning: boolean; spinKey?: string; spinLeft: number; spinTotal: number
}) {
  const keys = themes.flatMap((t, ti) => t.tracks.map((_, i) => `${ti}-${i}`))
  const free = keys.filter(k => !played.includes(k))
  const [cursor, setCursor] = useState(0)

  // один управляющий цикл на всю анимацию: ритм считаем из ref, чтобы не плодить таймеры
  const leftRef = useRef(spinLeft)
  leftRef.current = spinLeft
  useEffect(() => {
    if (!spinning || free.length === 0 || spinLeft <= 0) return
    let stop = false
    let timer: number | undefined
    const step = () => {
      if (stop) return
      setCursor(c => {
        // прыгаем в случайную, но не в ту же самую
        let n = Math.floor(Math.random() * free.length)
        if (free.length > 1 && n === c) n = (n + 1) % free.length
        return n
      })
      const p = 1 - Math.max(0, leftRef.current) / Math.max(1, spinTotal)
      // 180мс в начале → ~900мс в конце: видно каждую плитку, без мельтешения
      timer = window.setTimeout(step, 180 + p * p * 720)
    }
    timer = window.setTimeout(step, 180)
    return () => { stop = true; if (timer) clearTimeout(timer) }
  }, [spinning])

  const highlighted = spinning
    ? (spinLeft <= 1 ? spinKey : free[cursor % Math.max(1, free.length)])
    : undefined

  return (
    <div className="mel-board" style={{
      gridTemplateColumns: `repeat(${themes.length}, minmax(0,1fr))`,
      // строки с гарантированной высотой: плитки делят место и НЕ наезжают
      gridTemplateRows: `auto repeat(${Math.max(...themes.map(t => t.tracks.length), 1)}, minmax(0, 1fr))`,
    }}>
      {themes.map((t, ti) => (
        <div key={`h${ti}`} className="mel-theme">{t.name || `Тема ${ti + 1}`}</div>
      ))}
      {themes.map((t, ti) => t.tracks.map((_, i) => {
        const key = `${ti}-${i}`
        const done = played.includes(key)
        const hot = highlighted === key
        return (
          <div key={key} className={`mel-tile${done ? ' done' : ''}${hot ? ' spin' : ''}`}
            data-c={String((ti % 4))} style={{ gridColumn: ti + 1, gridRow: i + 2 }}>
            {/* нейтральная «морда» плитки: вид целиком задаёт тема
                (НГ — ёлочный шар, киберпанк — неон-чип, ГП — письмо с печатью) */}
            <span className="mel-face">{done ? '' : i + 1}</span>
          </div>
        )
      }))}
    </div>
  )
}
