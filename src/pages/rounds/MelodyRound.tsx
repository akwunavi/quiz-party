// ═══ «УГАДАЙ МЕЛОДИЮ»: аукцион секунд ═══
// Состояние — в game_state.melody, единый автомат с ДЕДЛАЙНАМИ (не setTimeout),
// поэтому проектор и телефоны всегда в одной стадии, даже после перезагрузки.
//
// spinning (барабан по плиткам, БЕЗ модалки) → listen (1 сек трека, со
// случайной точки m.startSec — см. lib/melody.ts:melodyPreviewCeiling)
// → bidding (ставки 2–10) → bids (показ, кто играет) → snippet (интервал
// играет С ТОЙ ЖЕ точки m.startSec, не с начала) → answering (ответ +
// фоновая музыка) → passed (вторая слушает трек целиком, с начала)
// → done (трек закрыт)
import { getRoomId } from '../../lib/room'
import { playAudio, createAudio } from '../../lib/audioSource'
import { afterRoundStep } from '../../lib/flow'
import { showScoreboard, startBreak, finishGame } from '../../lib/gameActions'
import { createPortal } from 'react-dom'
import { MagicCircleTimer } from '../../components/MagicCircleTimer'
import { TileCard } from '../../components/TileCard'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { room } from '../../lib/transport'
import { mediaUrl } from '../../lib/media'
// Переходы стадий — общие с пультом ведущего в админке (8.86). Раньше жили
// здесь inline; пульт писал бы свои копии тех же объектов и рано или поздно
// разошёлся бы с проектором.
import { saveMelody, gradeMelody, passMelody } from '../../lib/melodyActions'
import {
  melodySpin, melodyPick, melodyPlaySnippet, melodyAcceptAnswer, melodyClose, melodyPass,
  melodyToBoard, melodyIdle, melodyFree,
} from '../../lib/melody'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, MelodySettings, MelodyState, MelodyTheme, ThemeKey } from '../../types/quiz'
import type { PreviewCtx } from '../../lib/previewState'

/** Завершение раунда мелодии: дальше по пакету или в финал. */
async function finishMelodyRound(gameState: GameState, pack: LoadedPack) {
  // Раньше отсюда прыгали СРАЗУ в следующий раунд, минуя общий маршрут:
  // настройки «показать табло» и «перерыв» у музыкального раунда просто
  // игнорировались. Теперь шаг считает тот же модуль, что и везде.
  await room.patchSession(getRoomId(), { melody: {} })
  const step = afterRoundStep(pack, gameState.round_number, 'show_answers')
  if (step.kind === 'scoreboard') return void showScoreboard()
  if (step.kind === 'break') return void startBreak()
  if (step.kind === 'finale')
    return void finishGame(gameState.pack_id, pack.settings?.play_mode === 'paper')
  await room.patchSession(getRoomId(), {
    phase: 'round_intro', round_number: gameState.round_number + 1,
    question_index: 0, timer_started_at: null, reveal: false, melody: {},
  })
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
function playShared(src: string, startAt = 0): HTMLAudioElement {
  if (!sharedAudio) sharedAudio = createAudio()
  sharedAudio.pause()
  sharedAudio.loop = false
  sharedAudio.volume = 1
  // тот же запасной путь, что и в «Своей игре»: при блокировке прямого
  // запроса файл скачивается и играется из памяти
  void playAudio(sharedAudio, src, startAt)
  return sharedAudio
}

/** Заглушить общий трек. Нужен, когда ход уходит дальше сам: иначе музыка
 *  продолжает играть уже над следующей командой. */
function stopShared() {
  if (!sharedAudio) return
  try { sharedAudio.pause(); sharedAudio.currentTime = 0 } catch { /* уже мёртв */ }
}

const inSec = (s: number) => new Date(Date.now() + s * 1000).toISOString()


/** Трек на показе ответа: ровно 15 секунд с начала.
 *  Длину держим фиксированной, а не «до конца файла»: полноразмерная песня
 *  растянула бы раунд, а короткий отрывок доиграет и остановится сам.
 *  Отсчёт от появления ответа, поэтому музыка и текст идут вместе. */
function RevealTrack({ src }: { src: string }) {
  useEffect(() => {
    const a = createAudio()
    a.src = src
    a.currentTime = 0
    let cancelled = false
    // play() асинхронный: pause() до его старта не делает ничего,
    // и трек заиграл бы уже на следующем экране.
    a.play().then(() => {
      if (cancelled) { try { a.pause(); a.src = '' } catch { /* уже мёртв */ } }
    }).catch(() => {})
    const t = setTimeout(() => { try { a.pause() } catch { /* уже мёртв */ } }, 15_000)
    return () => {
      cancelled = true
      clearTimeout(t)
      try { a.pause(); a.src = '' } catch { /* уже мёртв */ }
    }
  }, [src])
  return <div className="mel-reveal-track">♪ играет 15 секунд</div>
}

export function MelodyBoard({ pack, round, gameState, preview }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
  /** Предпросмотр в редакторе: все эффекты, пишущие в игру (переходы стадий,
   *  звук, начисление баллов), выключены — экран показывает готовую
   *  фиктивную стадию и ничего не меняет в живой сессии (HANDOFF.md). */
  preview?: PreviewCtx
}) {
  const s = round.settings as MelodySettings
  const themes = s.themes ?? []
  const m: MelodyState = gameState.melody ?? {}
  // Хуки вызываются БЕЗУСЛОВНО (React #310) — меняется только аргумент.
  const liveTeams = useTeams(preview ? null : gameState.game_id)
  const liveAnswers = useAnswers(preview ? null : gameState.game_id, gameState.round_number)
  const teams = preview ? preview.teams : liveTeams
  const answers = preview ? preview.answers : liveAnswers
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
    if (preview || m.stage !== 'bids') return
    const bidders = bids
      .map(a => ({ id: a.team_id, sec: Number(a.answer_text) || 99, at: a.updated_at }))
      .sort((x, y) => x.sec - y.sec || +new Date(x.at) - +new Date(y.at))
      .map(b => b.id)
    const order = [...bidders, ...teams.map(t => t.id).filter(id => !bidders.includes(id))]
    if (JSON.stringify(order) !== JSON.stringify(m.order)) {
      void saveMelody({ ...m, order, turn: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, m.stage, bids.map(b => `${b.team_id}:${b.answer_text}`).join('|')])

  // ── snippet: интервал играет от РЕАЛЬНОГО старта звука ровно bid секунд ──
  // Сторож стадии snippet. Переход был завязан ТОЛЬКО на событие окончания
  // звука: если аудио не загрузилось, вкладка была скрыта или браузер не дал
  // автовоспроизведение — экран замирал навсегда, и выйти было нельзя.
  useEffect(() => {
    if (preview || m.stage !== 'snippet') return
    const sec = m.snippetSec ?? 5
    const t = window.setTimeout(() => {
      void saveMelody({ ...m, stage: 'answering', deadline: inSec(s.answerSec ?? 30) })
    }, (sec + 10) * 1000)          // фрагмент + 10 сек запаса
    return () => clearTimeout(t)
  }, [preview, m.stage, m.key, m.snippetSec])

  useEffect(() => {
    if (preview || m.stage !== 'snippet' || !track?.audio || document.hidden) return
    const sec = m.snippetSec ?? 5
    // та же точка старта, что была на «слушаем 1 секунду» (m.startSec) —
    // не с начала трека, а именно оттуда, где уже был сюрприз-отрывок
    const a = playShared(mediaUrl(track.audio), m.startSec ?? 0)
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
  }, [preview, m.stage, m.key])

  // ── единственный обработчик переходов: сработал дедлайн — двигаем стадию ──
  useEffect(() => {
    if (preview || !expired || document.hidden) return
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
      // Время на ответ вышло. Дальше два разных случая, и раньше они были
      // склеены в один: экран просто замирал, музыка играла, а форма у
      // игрока оставалась открытой, пока ведущий что-нибудь не нажмёт.
      const submitted = answers.some(a =>
        a.question_ref === `q-mel-${m.key}` && a.team_id === m.order?.[m.turn ?? 0]
        && !!a.answer_text?.trim())
      if (submitted) {
        // Ответ есть — судит ведущий, время просто останавливаем.
        void saveMelody({ ...m, deadline: undefined })
      } else {
        // Ответа нет — ход уходит дальше сам. Музыку глушим: иначе трек
        // продолжает играть уже над следующей командой.
        stopShared()
        void saveMelody(melodyPass(m))
      }
    }
  }, [preview, expired, m.stage, answers])

  // ── 1 секунда трека на стадии listen — со случайной точки m.startSec ──
  useEffect(() => {
    if (preview || m.stage !== 'listen' || !track?.audio || document.hidden) return
    const requested = m.startSec ?? 0
    const a = playShared(mediaUrl(track.audio), requested)
    audioRef.current = a
    let stop: number | undefined
    let advanced = false
    const advance = () => {
      if (advanced) return
      advanced = true
      a.pause()
      void saveMelody({ ...m, stage: 'bidding', deadline: inSec(s.bidSec ?? 10) })
    }
    // Страховка на файл КОРОЧЕ заявленной длины (round.settings.trackSec):
    // точка старта уже выбрана в melodySpin/melodyPick по НОМИНАЛЬНОЙ длине,
    // а реальную браузер знает только после метаданных. Если он успел
    // сказать — подрезаем и ЗАПОМИНАЕМ исправленное значение (снипет по
    // ставке должен стартовать с той же, уже проверенной точки, не заново
    // рисковать). Не успел за короткий бюджет (400мс, метаданные для уже
    // закешированного трека приходят почти мгновенно) — играем как выбрали,
    // не задерживаем игру ради подстраховки.
    let metaChecked = false
    const checkReal = () => {
      if (metaChecked) return
      metaChecked = true
      const dur = a.duration
      if (!dur || !isFinite(dur)) return
      const safe = Math.min(requested, Math.max(0, dur - 10))
      if (safe !== requested) {
        try { a.currentTime = safe } catch { /* не критично — сыграет как есть */ }
        void saveMelody({ ...m, startSec: safe })
      }
    }
    a.addEventListener('loadedmetadata', checkReal, { once: true })
    const metaGuard = window.setTimeout(checkReal, 400)
    // секунда считается от РЕАЛЬНОГО начала звука
    a.addEventListener('playing', () => { stop = window.setTimeout(advance, 1000) }, { once: true })
    // страховка: если звук так и не пошёл (нет файла) — не зависаем
    const guard = window.setTimeout(advance, 4000)
    return () => {
      if (stop) clearTimeout(stop)
      clearTimeout(guard); clearTimeout(metaGuard)
      a.removeEventListener('loadedmetadata', checkReal)
    }
  }, [preview, m.stage, m.key])


  // ── фоновая музыка на время размышления ──
  useEffect(() => {
    const bg = (round.settings as { bg_music?: string }).bg_music ?? pack.settings?.bg_music
    // stopAfterTimer: по истечении времени музыка играет ещё 3 сек и глохнет
    if (preview || (m.stage !== 'answering' && m.stage !== 'bidding') || !bg || document.hidden) return
    const a = playShared(mediaUrl(bg))
    a.loop = true; a.volume = .45
    return () => { a.pause(); a.loop = false; a.volume = 1 }
  }, [preview, m.stage])

  // ── вторая команда: трек целиком, по окончании — окно на ответ ──
  useEffect(() => {
    if (preview || m.stage !== 'passed' || m.deadline || !track?.audio || document.hidden) return
    const a = playShared(mediaUrl(track.audio))
    audioRef.current = a
    a.onended = () => void saveMelody({ ...m, deadline: inSec(s.passAnswerSec ?? 10) })
    return () => { a.pause(); a.onended = null }
  }, [preview, m.stage])

  // Хук стоит ВЫШЕ раннего выхода намеренно. Пока он был ниже, раунд без
  // тем рендерился с другим набором хуков — React #310 на проекторе в тот
  // момент, когда темы приезжают из пакета и заглушка сменяется доской.
  const [manualPick, setManualPick] = useState(false)

  if (themes.length === 0) return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">УГАДАЙ МЕЛОДИЮ</div>
      <p>Темы не заполнены — добавь их в редакторе раунда</p>
    </div>
  )

  const freeKeys = melodyFree(themes, played)
  const idle = melodyIdle(m)

  /** Открыть выбранную плитку без рулетки. */
  const pickManually = (key: string) => {
    setManualPick(false)
    void saveMelody(melodyPick(m, key, s.trackSec ?? 30))
  }

  const startSpin = () => {
    const target = freeKeys[Math.floor(Math.random() * freeKeys.length)]
    void saveMelody(melodySpin(m, target, freeKeys.length, s.spinSec ?? 5, s.trackSec ?? 30))
  }

  const currentId = m.order?.[m.turn ?? 0]
  const currentTeam = teams.find(t => t.id === currentId)
  const bidSec = Number(bids.find(b => b.team_id === currentId)?.answer_text) || 0
  const ans = answers.find(a => a.question_ref === ansRef && a.team_id === currentId)

  // не закрываем модалку: показываем результат, закрытие — кнопкой
  const grade = async (correct: boolean) => {
    if (!ans) return
    await gradeMelody(m, ans, correct, bidSec)
  }

  return (
    <div className="host-screen grid-bg mel-screen" onPointerDown={preview ? undefined : unlockAudio}>
      <MelodyGrid themes={themes} played={played} spinning={m.stage === 'spinning'}
        spinKey={m.key} spinLeft={left} spinTotal={s.spinSec ?? 10}
        onPick={preview ? undefined : (manualPick ? pickManually : undefined)} theme={pack.theme} />

      {/* Кнопки этого блока запускают рулетку/спин — реальная запись в
          живую сессию. В предпросмотре не рендерятся вовсе (HANDOFF.md). */}
      {!preview && idle && (
        <div className="host-actions">
          {freeKeys.length > 0
            ? (manualPick
                ? <>
                    <div className="mono-tag">ВЫБЕРИТЕ ПЛИТКУ НА ЭКРАНЕ</div>
                    <button className="ghost" onClick={() => setManualPick(false)}>Отмена</button>
                  </>
                : <>
                    <button onClick={startSpin}>
                      {played.length === 0 ? 'Стартуем!' : 'Рулетка'}
                    </button>
                    {/* Второй путь: ведущий сам решает, какой трек следующий.
                        Иногда нужно подвести к теме или подстроиться под зал,
                        и ждать рулетку ради этого незачем. */}
                    <button className="ghost" onClick={() => setManualPick(true)}>
                      Выбрать вручную
                    </button>
                  </>)
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
                    ? <MagicCircleTimer left={left} seconds={total} low={left <= 5} />
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
              {!preview && <div className="mel-actions">
                <button disabled={!currentId}
                  onClick={() => void saveMelody(melodyPlaySnippet(m, bidSec))}>
                  Играем {bidSec || 5} сек →
                </button>
                <button className="ghost dark"
                  onClick={() => void saveMelody(melodyClose(m))}>Пропустить трек</button>
              </div>}
            </>)}

            {m.stage === 'snippet' && (<>
              <div className="mel-big" style={{ color: currentTeam?.color }}>
                {currentTeam?.name} · играет {bidSec} сек
              </div>
              {/* если звук не пошёл — ведущий переводит стадию руками */}
              {!preview && <div className="mel-actions">
                <button onClick={() => void saveMelody(melodyAcceptAnswer(m, s.answerSec ?? 30))}>
                  Принимаем ответ →</button>
              </div>}
            </>)}

            {m.stage === 'reveal' && (<>
              <div className="answer-reveal" style={{ padding: '18px 28px' }}>
                <div className="answer-label">ВЕРНО ✓ · +{m.wonPts ?? 0}</div>
                <div className="answer-main">{track?.correct}</div>
              </div>
              {/* Дослушать трек: 15 секунд с начала, вместе с показом ответа.
                  Раньше музыка обрывалась в момент угадывания, и зал не
                  успевал узнать песню. В предпросмотре звук НЕ запускаем —
                  play() асинхронный, «запустить и заглушить» не работает
                  (HANDOFF.md), а надпись про 15 секунд не нужна редактору. */}
              {!preview && track?.audio && <RevealTrack src={mediaUrl(track.audio)} />}
              <div className="mel-big" style={{ color: teams.find(t => t.id === m.wonTeam)?.color }}>
                {teams.find(t => t.id === m.wonTeam)?.name} забирает баллы
              </div>
              {!preview && <div className="mel-actions">
                <button onClick={() => void saveMelody(melodyToBoard(m))}>К доске →</button>
              </div>}
            </>)}
            {/* Аварийный выход. Доступен на любой стадии: интернет у команд
                отваливается, ответы не долетают, и ведущему нужен способ
                двигаться дальше, не перезапуская игру. Не рендерится в
                предпросмотре — как и остальные кнопки, пишущие в игру. */}
            {!preview && m.stage !== 'reveal' && m.stage !== 'done' && (
              <button className="mel-escape" onClick={async () => {
                if (!confirm('Закрыть трек и вернуться к доске?\n\n'
                  + 'Баллы за него никто не получит.')) return
                await saveMelody(melodyClose(m))
              }}>Закрыть</button>
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
              {!preview && <div className="mel-actions">
                <button disabled={!ans} onClick={() => void grade(true)}>✓ Верно</button>
                <button className="ghost" onClick={() => void passMelody(m, ans)}>
                  {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1 ? '✗ Передать ход →' : '✗ Закрыть трек'}
                </button>
              </div>}
            </>)}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

/** Барабан: подсветка бежит по плиткам и замедляется к концу. */
function MelodyGrid({ themes, played, spinning, spinKey, spinLeft, spinTotal, onPick, theme }: {
  themes: MelodyTheme[]; played: string[]
  spinning: boolean; spinKey?: string; spinLeft: number; spinTotal: number
  /** Ручной выбор плитки. Не задан — плитки не кликабельны. */
  onPick?: (key: string) => void
  /** Только для маркера-огонька Magic (шаг 11) — остальным темам не нужен. */
  theme?: ThemeKey
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

  // ── Magic: блуждающий огонёк, физически перелетающий на "горячую"
  // плитку барабана. Карта key→элемент — обычный ref (не state): позиции
  // плиток не влияют на рендер, только на позиционирование маркера.
  // Хук стоит здесь, ВЫШЕ любых ранних return — в этом компоненте их и
  // нет вовсе, но правило то же, что и везде в проекте (React #310).
  const tileRefs = useRef(new Map<string, HTMLElement>())
  const boardRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    if (theme !== 'potter' || !spinning || !highlighted) return
    const board = boardRef.current, tile = tileRefs.current.get(highlighted), marker = markerRef.current
    if (!board || !tile || !marker) return
    const b = board.getBoundingClientRect(), t = tile.getBoundingClientRect()
    const x = t.left - b.left + t.width / 2, y = t.top - b.top + t.height / 2
    marker.style.transform = `translate(${x}px, ${y}px)`
  }, [theme, spinning, highlighted])
  const nearEnd = spinning && spinLeft <= 1

  return (
    <div className={`mel-board${spinning ? ' spinning' : ''}`} ref={boardRef} style={{
      gridTemplateColumns: `repeat(${themes.length}, minmax(0,1fr))`,
      // строки с гарантированной высотой: плитки делят место и НЕ наезжают
      gridTemplateRows: `auto repeat(${Math.max(...themes.map(t => t.tracks.length), 1)}, minmax(0, 1fr))`,
    }}>
      {theme === 'potter' && spinning && (
        <span ref={markerRef} className={`mg-wisp mel-marker${nearEnd ? ' flare' : ''}`} aria-hidden />
      )}
      {themes.map((t, ti) => (
        <div key={`h${ti}`} className="mel-theme">{t.name || `Тема ${ti + 1}`}</div>
      ))}
      {themes.map((t, ti) => t.tracks.map((_, i) => {
        const key = `${ti}-${i}`
        const done = played.includes(key)
        const hot = highlighted === key
        const interactive = !!onPick && !done
        // Разворот по ховеру — только в режиме «Выбрать вручную» (Р2), и
        // НЕ на «горячей» плитке барабана: во время spin она уже дымится/
        // пульсирует (chipPulse/mgGemHot/ballSwing), разворот поверх этого
        // дал бы визуальный конфликт двух одновременных эффектов на одном
        // узле — см. разбор в HANDOFF. Р2 про выбор ДО старта спина, не
        // про сам процесс спина, поэтому запрет только на `.spin` не
        // нарушает решение пользователя.
        const flip = interactive && !hot
        return (
          <TileCard key={key} kind="melody" done={done} hot={hot} colorIndex={ti % 4}
            interactive={interactive} flip={flip}
            label={done ? '' : i + 1}
            onClick={onPick ? () => onPick(key) : undefined}
            elRef={el => { if (el) tileRefs.current.set(key, el); else tileRefs.current.delete(key) }}
            style={{ gridColumn: ti + 1, gridRow: i + 2 }} />
        )
      }))}
    </div>
  )
}
