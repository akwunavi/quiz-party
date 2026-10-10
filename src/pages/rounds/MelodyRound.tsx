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
import { createAudio, preloadAudio, preloadAudioAll } from '../../lib/audioSource'
import { unlockAudio, playShared, stopShared } from '../../lib/sharedAudio'
import { afterRoundStep } from '../../lib/flow'
import { showScoreboard, startBreak, finishGame } from '../../lib/gameActions'
import { createPortal } from 'react-dom'
import { MagicCircleTimer } from '../../components/MagicCircleTimer'
import { TileCard } from '../../components/TileCard'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { room } from '../../lib/transport'
import { mediaUrl } from '../../lib/media'
// Переходы стадий — общие с пультом ведущего в админке (8.86). Раньше жили
// здесь inline; пульт писал бы свои копии тех же объектов и рано или поздно
// разошёлся бы с проектором.
import { updateMelody, melodyClick, gradeMelody, passMelody } from '../../lib/melodyActions'
import {
  melodySpin, melodyPick, melodyPlaySnippetIfFresh, melodyAcceptAnswer, melodyRevealMiss, melodyPass, melodySpinPath, melodySpinAt, melodySpinSeed,
  melodyToBoard, melodyIdle, melodyFree, guardMelody, melodyOrderFromBids, melodyBidSec,
  melodyEmergencyClose, MELODY_MAX_BID_SEC,
} from '../../lib/melody'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, MelodySettings, MelodyState, MelodyTheme, ThemeKey } from '../../types/quiz'
import type { PreviewCtx } from '../../lib/previewState'
import gsap from 'gsap'
import { isForestTheme } from '../../forest/config'
import { useEntrance } from '../../forest/stage1/common'
import { MelodyScene, MelPanel, melBuild, MEL_STAGE, type MelView, type MelPanelData, type MelTeamV } from '../../forest/stage2/Melody'
import { melLayout, melBellPos } from '../../forest/stage2/layout'
import { melodyPoints } from '../../lib/melody'

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

// Единый аудио-элемент и его поколение — вынесены в lib/sharedAudio.ts
// (HANDOFF.md §3bu), чтобы regression-тест гонки импортировал РЕАЛЬНЫЙ код,
// а не копию.

const inSec = (s: number) => new Date(Date.now() + s * 1000).toISOString()

/** Длина трека на показе ответа — одно число на RevealTrack и на автопереход
 *  дальше, к доске. Раньше было продублировано как магическая константа
 *  15_000 в двух местах — не расходится, потому что теперь оно одно. */
const REVEAL_TRACK_MS = 15_000

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
    const t = setTimeout(() => { try { a.pause() } catch { /* уже мёртв */ } }, REVEAL_TRACK_MS)
    return () => {
      cancelled = true
      clearTimeout(t)
      try { a.pause(); a.src = '' } catch { /* уже мёртв */ }
    }
  }, [src])
  return <div className="mel-reveal-track">♪ играет 15 секунд</div>
}

type BoardProps = {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
  /** Предпросмотр в редакторе: все эффекты, пишущие в игру (переходы стадий,
   *  звук, начисление баллов), выключены — экран показывает готовую
   *  фиктивную стадию и ничего не меняет в живой сессии (HANDOFF.md). */
  preview?: PreviewCtx
}

/** «Угадай мелодию». Тема «Волшебный лес» на проекторе — утверждённая композиция «Колокольчики» (src/forest/stage2),
 *  остальные темы — прежняя доска с модалкой. Автомат стадий, звук, таймеры и запись — общие (useMelodyBoard ниже),
 *  различается только отрисовка. Предпросмотр редактора — всегда прежний вид. */
export function MelodyBoard(props: BoardProps) {
  return isForestTheme(props.pack.theme) && !props.preview ? <ForestMelodyBoard {...props} /> : <ClassicMelodyBoard {...props} />
}

/** Весь автомат стадий мелодии на проекторе: эффекты переходов, звук, предзагрузка, действия ведущего.
 *  Перенесено из MelodyBoard как есть — обе отрисовки вызывают ровно эту функцию. */
function useMelodyBoard({ pack, round, gameState, preview }: BoardProps) {
  const s = round.settings as MelodySettings
  const themes = s.themes ?? []
  const m: MelodyState = gameState.melody ?? {}
  // Хуки вызываются БЕЗУСЛОВНО (React #310) — меняется только аргумент.
  const liveTeams = useTeams(preview ? null : gameState.game_id)
  const liveAnswers = useAnswers(preview ? null : gameState.game_id, gameState.round_number)
  const teams = preview ? preview.teams : liveTeams
  const answers = preview ? preview.answers : liveAnswers
  const played = m.played ?? []
  const bgMusic = (round.settings as { bg_music?: string }).bg_music ?? pack.settings?.bg_music
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
  // пока трек ещё не запущен кнопкой «Играем N сек».
  // 9.61 (HANDOFF §3bw): раньше защиту от отката «клик уже перевёл в
  // snippet, а устаревшая пересборка order прилетела следом» держал
  // ref-guard, работавший ТОЛЬКО на проекторе (пульт в админке не был
  // защищён вовсе). Теперь условие проверяется CAS-записью на СВЕЖЕМ
  // состоянии (guardMelody) — работает одинаково для обоих экранов,
  // отдельный ref не нужен.
  useEffect(() => {
    if (preview || m.stage !== 'bids') return
    const order = melodyOrderFromBids(bids, teams.map(t => t.id))
    if (JSON.stringify(order) === JSON.stringify(m.order)) return
    void updateMelody(gameState, guardMelody(
      { key: m.key, stage: 'bids' },
      cur => (JSON.stringify(cur.order) === JSON.stringify(order) ? null : { ...cur, order, turn: 0 }),
    ))
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
      void updateMelody(gameState, guardMelody(
        { key: m.key, stage: 'snippet' },
        cur => melodyAcceptAnswer(cur, s.answerSec ?? 30),
      ))
    }, (sec + 10) * 1000)          // фрагмент + 10 сек запаса
    return () => clearTimeout(t)
  }, [preview, m.stage, m.key, m.snippetSec])

  useEffect(() => {
    if (preview || m.stage !== 'snippet' || !track?.audio || document.hidden) return
    const sec = m.snippetSec ?? 5
    // та же точка старта, что была на «слушаем 1 секунду» (m.startSec) —
    // не с начала трека, а именно оттуда, где уже был сюрприз-отрывок
    const h = playShared(mediaUrl(track.audio), { startAt: m.startSec ?? 0, keepTail: sec })
    let stop: number | undefined
    let advanced = false
    const advance = () => {
      if (advanced) return
      advanced = true
      h.stop()
      void updateMelody(gameState, guardMelody(
        { key: m.key, stage: 'snippet' },
        cur => melodyAcceptAnswer(cur, s.answerSec ?? 30),
      ))
    }
    const offPlaying = h.on('playing', () => {
      // с этого момента и тикает счётчик на экране. Тот же соседний баг:
      // если ведущий уже нажал «Принимаем ответ →» на этом же экране (или
      // «Закрыть трек»), а playing-событие только сейчас долетело — не
      // затираем стадию 'answering'/'done' обратно в 'snippet' устаревшим
      // спредом {...m}. guardMelody + доп. проверка "дедлайн ещё не стоит"
      // делает запись идемпотентной, если событие всё же долетит повторно.
      void updateMelody(gameState, guardMelody(
        { key: m.key, stage: 'snippet' },
        cur => (cur.deadline ? null : { ...cur, deadline: inSec(sec) }),
      ))
      stop = window.setTimeout(advance, sec * 1000)
      // звук пошёл — дальше отрывок закрывает обычный таймер на sec секунд;
      // страховка нужна только на «так и не заиграло», иначе при долгой
      // буферизации (>8 с) она обрезала бы отрывок посередине (ревью 9.85)
      clearTimeout(guard)
    })
    // метаданные файла ждутся до 6 с (audioSource.seekSafely) — страховка
    // с запасом на них, как у «слушаем 1 секунду» (ревью 9.83)
    const guard = window.setTimeout(advance, (sec + 8) * 1000)
    return () => {
      if (stop) clearTimeout(stop)
      clearTimeout(guard)
      // Подписка привязана к ЭТОЙ операции (SharedPlayback.on) — событие от
      // чужой/устаревшей операции сюда не долетит (см. lib/sharedAudio.ts).
      // Явная отписка на случай, если эффект размонтируется раньше, чем
      // событие произошло.
      offPlaying()
      h.stop()
    }
  }, [preview, m.stage, m.key])

  // ── единственный обработчик переходов: сработал дедлайн — двигаем стадию ──
  useEffect(() => {
    if (preview || !expired || document.hidden) return
    if (m.stage === 'spinning') {
      void updateMelody(gameState, guardMelody(
        { key: m.key, stage: 'spinning' }, cur => ({ ...cur, stage: 'listen', deadline: inSec(2) }),
      ))
    } else if (m.stage === 'bidding') {
      void updateMelody(gameState, guardMelody(
        { key: m.key, stage: 'bidding' },
        cur => ({
          ...cur, stage: 'bids', order: melodyOrderFromBids(bids, teams.map(t => t.id)),
          turn: 0, deadline: undefined,
        }),
      ))
    } else if (m.stage === 'answering' || m.stage === 'passed') {
      // Время на ответ вышло. Дальше два разных случая, и раньше они были
      // склеены в один: экран просто замирал, музыка играла, а форма у
      // игрока оставалась открытой, пока ведущий что-нибудь не нажмёт.
      const currentAns = answers.find(a =>
        a.question_ref === `q-mel-${m.key}` && a.team_id === m.order?.[m.turn ?? 0])
      // Ответ уже оценён ведущим (gradeMelody/passMelody уже отработали и
      // сами перевели стадию) — опрос answers мог долететь РАНЬШЕ, чем
      // опрос gameState подхватит новую стадию. Ничего не пишем — переход
      // целиком на совести gradeMelody/passMelody (HANDOFF.md).
      if (currentAns?.is_correct != null) return
      const submitted = !!currentAns?.answer_text?.trim()
      const stageNow = m.stage, turnNow = m.turn ?? 0, deadlineNow = m.deadline
      if (submitted) {
        // Ответ есть — судит ведущий, время просто останавливаем. Доп.
        // проверка "тот же дедлайн" — идемпотентность на повтор эффекта.
        void updateMelody(gameState, guardMelody(
          { key: m.key, stage: stageNow, turn: turnNow },
          cur => (cur.deadline === deadlineNow ? { ...cur, deadline: undefined } : null),
        ))
      } else {
        // Ответа нет — ход уходит дальше сам. Музыку глушим: иначе трек
        // продолжает играть уже над следующей командой.
        stopShared()
        void updateMelody(gameState, guardMelody(
          { key: m.key, stage: stageNow, turn: turnNow }, cur => melodyPass(cur),
        ))
      }
    }
  }, [preview, expired, m.stage, answers])

  // ── 1 секунда трека на стадии listen — со случайной точки m.startSec ──
  useEffect(() => {
    if (preview || m.stage !== 'listen' || !track?.audio || document.hidden) return
    const requested = m.startSec ?? 0
    // keepTail: после точки старта должно остаться место под самый длинный
    // отрывок по ставке. Точка подрезается по РЕАЛЬНОЙ длине файла ДО
    // запуска звука (audioSource.seekSafely, 9.83): раньше подрезка шла
    // через 400 мс после старта — если файл короче номинальной длины,
    // браузер успевал прыгнуть в конец и остановиться, и «1 секунда»
    // проходила в тишине (HANDOFF §3cf).
    const h = playShared(mediaUrl(track.audio), { startAt: requested, keepTail: MELODY_MAX_BID_SEC })
    let stop: number | undefined
    let advanced = false
    let started = false
    // Исправленная точка копится ЗДЕСЬ и уходит в ту же запись, что и
    // переход стадии (HANDOFF §3bu, F9) — отрывок по ставке стартует
    // с той же, уже проверенной точки.
    let correctedStart: number | undefined
    void h.result.then(r => {
      if (r.ok && r.startAt != null && Math.abs(r.startAt - requested) > 0.01) correctedStart = r.startAt
    })
    const advance = () => {
      if (advanced) return
      advanced = true
      h.stop()
      void updateMelody(gameState, guardMelody(
        { key: m.key, stage: 'listen' },
        cur => ({
          ...cur,
          ...(correctedStart != null ? { startSec: correctedStart } : {}),
          stage: 'bidding', deadline: inSec(s.bidSec ?? 10),
        }),
      ))
    }
    // секунда считается от РЕАЛЬНОГО начала звука; повторный `playing`
    // (докачка посреди) отсчёт не перезапускает
    const offPlaying = h.on('playing', () => {
      if (started) return
      started = true
      stop = window.setTimeout(advance, 1000)
    })
    // страховка: если звук так и не пошёл (нет файла) — не зависаем.
    // Метаданные ждём до 6 с (seekSafely), поэтому и потолок чуть больше
    const guard = window.setTimeout(advance, 8000)
    return () => {
      if (stop) clearTimeout(stop)
      clearTimeout(guard)
      offPlaying()
      // защита на будущее: штатно звук останавливает advance() ДО записи
      // новой стадии, но если эффект размонтируется/перезапустится другим
      // путём, трек не должен утечь в следующую стадию (bidding).
      h.stop()
    }
  }, [preview, m.stage, m.key])


  // ── фоновая музыка на время размышления ──
  useEffect(() => {
    // stopAfterTimer: по истечении времени музыка играет ещё 3 сек и глохнет
    if (preview || (m.stage !== 'answering' && m.stage !== 'bidding') || !bgMusic || document.hidden) return
    const h = playShared(mediaUrl(bgMusic), { loop: true, volume: .45 })
    return () => h.stop()
  }, [preview, m.stage, bgMusic])

  // ── вторая команда: трек целиком, по окончании — окно на ответ ──
  useEffect(() => {
    if (preview || m.stage !== 'passed' || m.deadline || !track?.audio || document.hidden) return
    const h = playShared(mediaUrl(track.audio))
    const off = h.on('ended', () => void updateMelody(gameState, guardMelody(
      { key: m.key, stage: 'passed' }, cur => (cur.deadline ? null : { ...cur, deadline: inSec(s.passAnswerSec ?? 10) }),
    )))
    return () => { off(); h.stop() }
  }, [preview, m.stage])

  // ── предзагрузка: трек качается ЗАРАНЕЕ, до того как он реально понадобится ──
  // spinning/listen — самый ранний момент, когда ключ трека уже известен, но
  // звук ещё не запускается (spinning вообще без звука, listen — 1 секунда).
  // audioSource.preloadAudio сам гарантирует «ровно один раз на трек».
  useEffect(() => {
    if (preview || (m.stage !== 'spinning' && m.stage !== 'listen') || !track?.audio) return
    preloadAudio(mediaUrl(track.audio))
  }, [preview, m.key, m.stage])

  // ── ВСЕ треки раунда — в память при первом входе на доску (9.85) ──
  // Раньше трек качался только когда рулетка его выбрала: за 5 секунд
  // вращения на слабом Wi-Fi бара он мог не успеть. Теперь ведущий видит
  // прогресс «♪ треки 12/20» и может потянуть время, пока не скачается всё.
  const [loadState, setLoadState] = useState<{ done: number; failed: number; total: number } | null>(null)
  const trackUrls = themes.flatMap(t => t.tracks.map(tr => tr.audio)).filter(Boolean).map(a => mediaUrl(a))
  const trackSig = trackUrls.join('|')
  useEffect(() => {
    if (preview || trackUrls.length === 0) return
    return preloadAudioAll(trackUrls, setLoadState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, trackSig])

  // фоновая музыка размышления — прогреваем при монтировании доски, не ждём стадии
  useEffect(() => {
    if (preview || !bgMusic) return
    preloadAudio(mediaUrl(bgMusic))
  }, [preview, bgMusic])

  // ── разбор: закрыть модалку самой, когда трек доиграл (15 сек) ──
  // Кнопка «К доске →» остаётся — ведущий может закрыть раньше (трек не
  // воспроизвёлся, он торопится). Оба пути идемпотентны: melodyToBoard
  // просто выставляет stage:'done', повторный вызов ничего не ломает.
  const revealAdvancedRef = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (preview || m.stage !== 'reveal') return
    const key = m.key
    revealAdvancedRef.current = undefined
    const t = window.setTimeout(() => {
      if (revealAdvancedRef.current === key) return
      revealAdvancedRef.current = key
      void updateMelody(gameState, guardMelody({ key: m.key, stage: 'reveal' }, cur => melodyToBoard(cur)))
    }, REVEAL_TRACK_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, m.stage, m.key])

  // Хук стоит ВЫШЕ раннего выхода намеренно. Пока он был ниже, раунд без
  // тем рендерился с другим набором хуков — React #310 на проекторе в тот
  // момент, когда темы приезжают из пакета и заглушка сменяется доской.
  const [manualPick, setManualPick] = useState(false)

  const freeKeys = melodyFree(themes, played)
  const idle = melodyIdle(m)

  /** Аудио выбранного трека по ключу «тема-трек» — для предзагрузки ДО записи
   *  стадии: ключ известен локально, сеть на него ждать не нужно. */
  const preloadTrack = (key: string) => {
    const [pti, pi] = key.split('-').map(Number)
    const audio = themes[pti]?.tracks[pi]?.audio
    if (audio) preloadAudio(mediaUrl(audio))
  }

  // Клик ведущего (Р2, HANDOFF §3bw): устаревшая кнопка не молчит. На
  // проекторе нет отдельного статус-бара (в отличие от AdminPage/runAction),
  // поэтому здесь — предупреждение в консоль; сама кнопка не виснет.
  const click = (fn: () => Promise<void>) => { void fn().catch(err => console.warn(err instanceof Error ? err.message : err)) }

  /** Открыть выбранную плитку без рулетки. */
  const pickManually = (key: string) => {
    setManualPick(false)
    preloadTrack(key)
    click(() => melodyClick(gameState, cur => (
      melodyIdle(cur) && !(cur.played ?? []).includes(key) ? melodyPick(cur, key, s.trackSec ?? 30) : null
    )))
  }

  const startSpin = () => {
    const initialTarget = freeKeys[Math.floor(Math.random() * freeKeys.length)]
    preloadTrack(initialTarget)
    click(() => melodyClick(gameState, cur => {
      if (!melodyIdle(cur)) return null
      // пересчитать свободные плитки на момент реальной записи — если
      // изначально выбранная уже занята (гонка с другим экраном), взять
      // случайную из АКТУАЛЬНО свободных, не с устаревшего снимка.
      const free = melodyFree(themes, cur.played ?? [])
      const target = free.includes(initialTarget) ? initialTarget : free[Math.floor(Math.random() * free.length)]
      if (!target) return null
      return melodySpin(cur, target, free.length, s.spinSec ?? 5, s.trackSec ?? 30)
    }))
  }

  const currentId = m.order?.[m.turn ?? 0]
  const currentTeam = teams.find(t => t.id === currentId)
  const bidSec = melodyBidSec(bids, m)
  const ans = answers.find(a => a.question_ref === ansRef && a.team_id === currentId)

  // не закрываем модалку: показываем результат, закрытие — кнопкой
  const grade = async (correct: boolean) => {
    if (!ans) return
    await gradeMelody(gameState, ans, correct, bidSec)
  }
  return { s, themes, m, teams, answers, played, deadline, left, total, ti, i, track, bids, loadState, manualPick, setManualPick,
    freeKeys, idle, click, pickManually, startSpin, currentId, currentTeam, bidSec, ans, grade }
}

const EmptyMelody = () => (
  <div className="host-screen grid-bg">
    <div className="mono-tag">УГАДАЙ МЕЛОДИЮ</div>
    <p>Темы не заполнены — добавь их в редакторе раунда</p>
  </div>
)

function ClassicMelodyBoard(props: BoardProps) {
  const { pack, gameState, preview } = props
  const { s, themes, m, teams, played, deadline, left, total, ti, i, track, bids, loadState, manualPick, setManualPick,
    freeKeys, idle, click, pickManually, startSpin, currentId, currentTeam, bidSec, ans, grade } = useMelodyBoard(props)
  if (themes.length === 0) return <EmptyMelody />

  return (
    <div className="host-screen grid-bg mel-screen" onPointerDown={preview ? undefined : unlockAudio}>
      <MelodyGrid themes={themes} played={played} spinning={m.stage === 'spinning'}
        spinKey={m.key} spinDeadline={deadline} spinTotalMs={m.spinMs ?? Math.min(s.spinSec ?? 5, 8) * 1000}
        onPick={preview ? undefined : (manualPick ? pickManually : undefined)} theme={pack.theme} />

      {/* Кнопки этого блока запускают рулетку/спин — реальная запись в
          живую сессию. В предпросмотре не рендерятся вовсе (HANDOFF.md). */}
      {!preview && idle && (
        <div className="host-actions">
          {/* прогресс скачивания треков раунда (9.85): пока не 100% — можно
              потянуть время; ошибки — трек доиграет сетью, но предупреждаем */}
          {loadState && loadState.total > 0 && (
            <span className={`mel-load${loadState.done + loadState.failed >= loadState.total ? ' ready' : ''}${loadState.failed ? ' warn' : ''}`}>
              {loadState.done + loadState.failed < loadState.total
                ? `♪ треки ${loadState.done}/${loadState.total}…`
                : loadState.failed
                  ? `♪ ${loadState.done}/${loadState.total} · не скачалось ${loadState.failed}`
                  : '♪ все треки загружены'}
            </span>
          )}
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
              {/* На listen дедлайн декоративный (не синхронизирован с
                  реальным стартом звука) — ведущий прямо попросил убрать
                  тут таймер совсем, не пытаться сделать его точным. */}
              {!!deadline && m.stage !== 'listen' && (
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
                {/* 9.61: CAS + guardMelody защищает от отката «эффект
                    пересборки order прилетел ПОСЛЕ клика» на ОБОИХ экранах
                    (проектор и пульт) — отдельный ref-guard (F10, §3bv)
                    больше не нужен, пересчёт секунд — по СВЕЖИМ bids/cur
                    в момент записи (Р3). 9.62 (находка 4): melodyPlaySnippetIfFresh
                    ДОПОЛНИТЕЛЬНО не пишет вовсе, если ЛОКАЛЬНЫЕ bids этого
                    экрана ещё не знают лидера свежего cur.order — секунды
                    иначе посчитались бы по чужой/устаревшей ставке. */}
                <button disabled={!currentId}
                  onClick={() => click(() => melodyClick(gameState, guardMelody(
                    { key: m.key, stage: 'bids' }, cur => melodyPlaySnippetIfFresh(cur, bids),
                  )))}>
                  Играем {bidSec || 5} сек →
                </button>
                <button className="ghost dark"
                  onClick={() => click(() => melodyClick(gameState,
                    guardMelody({ key: m.key, stage: 'bids' }, cur => melodyRevealMiss(cur))))}>Пропустить трек</button>
              </div>}
            </>)}

            {m.stage === 'snippet' && (<>
              <div className="mel-big" style={{ color: currentTeam?.color }}>
                {currentTeam?.name} · играет {bidSec} сек
              </div>
              {/* если звук не пошёл — ведущий переводит стадию руками */}
              {!preview && <div className="mel-actions">
                <button onClick={() => click(() => melodyClick(gameState, guardMelody(
                  { key: m.key, stage: 'snippet' }, cur => melodyAcceptAnswer(cur, s.answerSec ?? 30),
                )))}>
                  Принимаем ответ →</button>
              </div>}
            </>)}

            {m.stage === 'reveal' && (<>
              <div className="answer-reveal" style={{ padding: '18px 28px' }}>
                {/* 9.76: никто не угадал — ответ всё равно показываем */}
                <div className="answer-label">{m.wonTeam ? `ВЕРНО ✓ · +${m.wonPts ?? 0}` : 'ПРАВИЛЬНЫЙ ОТВЕТ'}</div>
                <div className="answer-main">{track?.correct}</div>
              </div>
              {/* Дослушать трек: 15 секунд с начала, вместе с показом ответа.
                  Раньше музыка обрывалась в момент угадывания, и зал не
                  успевал узнать песню. В предпросмотре звук НЕ запускаем —
                  play() асинхронный, «запустить и заглушить» не работает
                  (HANDOFF.md), а надпись про 15 секунд не нужна редактору. */}
              {!preview && track?.audio && <RevealTrack src={mediaUrl(track.audio)} />}
              <div className="mel-big" style={{ color: teams.find(t => t.id === m.wonTeam)?.color }}>
                {m.wonTeam ? `${teams.find(t => t.id === m.wonTeam)?.name ?? '—'} забирает баллы`
                  : 'Никто не угадал'}
              </div>
              {!preview && <div className="mel-actions">
                <button onClick={() => click(() => melodyClick(gameState,
                  guardMelody({ key: m.key, stage: 'reveal' }, cur => melodyToBoard(cur))))}>К доске →</button>
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
                // 9.62 (находка 5): условие — ЛЮБАЯ активная стадия ТОГО ЖЕ
                // трека, не конкретно та, что была на момент клика. confirm()
                // может провисеть несколько секунд, за которые короткая
                // цепочка автостадий (spinning→listen→bidding) переключится
                // сама — проверка «та же стадия» после этого никогда бы не
                // совпала, и кнопка молчала бы «устарела» вместо закрытия.
                const keyNow = m.key
                click(() => melodyClick(gameState, melodyEmergencyClose(keyNow)))
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
                  {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1
                    ? '✗ НЕВЕРНО · ответ не раскрываем — передайте ход второй команде'
                    : '✗ НЕВЕРНО · дальше — правильный ответ'}
                </div>
              )}
              {/* 9.62 (находка 6): grade/passMelody теперь тоже могут бросить
                  «кнопка устарела» (Р2, updateMelodyBag) — обёрнуты через
                  click(), как остальные кнопки на этом экране, а не голым
                  void, иначе двойной тап/гонка с пультом дают необработанное
                  отклонение промиса в консоли браузера. */}
              {!preview && <div className="mel-actions">
                <button disabled={!ans} onClick={() => click(() => grade(true))}>✓ Верно</button>
                <button className="ghost" onClick={() => click(() => passMelody(gameState, ans))}>
                  {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1 ? '✗ Передать ход →' : '✗ Показать ответ →'}
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

/** Подсветка барабана по времени (общая для прежней доски и Леса): путь — чистая melodySpinPath с зерном из ключа
 *  трека и дедлайна (одинаковый на всех экранах), время — от дедлайна стадии. `landed` — подсветка уже встала на
 *  выбранный трек последним прыжком (дальше она не сдвинется). Перенесено из MelodyGrid как есть. */
function useMelodySpin(themes: MelodyTheme[], played: string[], spinning: boolean, spinKey: string | undefined,
  spinDeadline: number, spinTotalMs: number) {
  const keys = themes.flatMap((t, ti) => t.tracks.map((_, i) => `${ti}-${i}`))
  const free = keys.filter(k => !played.includes(k))
  const [cursor, setCursor] = useState(-1)
  const [landed, setLanded] = useState(false)

  const freeSig = free.join(',')
  useEffect(() => {
    if (!spinning || !spinKey || free.length === 0) { setCursor(-1); setLanded(false); return }
    const target = free.indexOf(spinKey)
    if (target < 0) { setCursor(-1); setLanded(false); return }
    const end = spinDeadline || Date.now() + spinTotalMs
    const start = end - spinTotalMs
    const spin = melodySpinPath(free.length, target, spinTotalMs, melodySpinSeed(`${spinKey}|${end}`))
    const lastJump = spin.times[spin.times.length - 1] ?? 0
    let raf = 0
    const tick = () => {
      const elapsed = Date.now() - start
      setCursor(melodySpinAt(spin, elapsed))
      setLanded(elapsed >= lastJump)
      if (elapsed < spinTotalMs) raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, spinKey, spinDeadline, spinTotalMs, freeSig])

  const highlighted = spinning && cursor >= 0 ? free[cursor] : undefined
  return { highlighted, landed: spinning && landed && highlighted === spinKey }
}

/** Барабан: подсветка прыгает по случайным свободным плиткам, плавно
 *  замедляется и последним прыжком встаёт на выбранный трек. Путь — чистая
 *  melodySpinPath с зерном из ключа трека и дедлайна (одинаковый на всех
 *  экранах), время — от дедлайна стадии, длительность — та, что записал
 *  melodySpin (`spinMs`), поэтому экран, открытый посреди вращения,
 *  подхватывает его с нужного места. */
function MelodyGrid({ themes, played, spinning, spinKey, spinDeadline, spinTotalMs, onPick, theme }: {
  themes: MelodyTheme[]; played: string[]
  spinning: boolean; spinKey?: string
  /** конец стадии spinning (мс), 0 — неизвестен */
  spinDeadline: number
  /** полная длительность барабана, мс — та же, что заложил melodySpin */
  spinTotalMs: number
  /** Ручной выбор плитки. Не задан — плитки не кликабельны. */
  onPick?: (key: string) => void
  /** Только для маркера-огонька Magic (шаг 11) — остальным темам не нужен. */
  theme?: ThemeKey
}) {
  const { highlighted } = useMelodySpin(themes, played, spinning, spinKey, spinDeadline, spinTotalMs)

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
  const nearEnd = spinning && !!spinDeadline && Date.now() >= spinDeadline - 1000

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

// ═══ «Волшебный лес»: «Колокольчики» на настоящем автомате стадий ═══
// Стадия, очередь, ставки, ответы — из общего состояния игры и тех же хуков, что у прежней доски (useMelodyBoard).
// Сцена добавляет только два коротких перехода-картинки: «неверно — ход второй» (~2,2 с, когда ведущий передал ход)
// и «назад к доске» (~1,7 с, когда трек закрыт). Звук, дедлайны и запись от них не зависят. Обновили страницу
// посреди трека — сразу текущая стадия.
const MEL_WRONG_MS = 2200, MEL_BACK_MS = 1700
const ACTIVE = new Set(['listen', 'bidding', 'bids', 'snippet', 'answering', 'passed', 'reveal'])
const WRONG_PASS = '✗ Неверно · ответ не раскрываем — ход переходит второй команде'

function ForestMelodyBoard(props: BoardProps) {
  const { pack, round, gameState } = props
  const b = useMelodyBoard(props)
  const { s, themes, m, teams, answers, played, deadline, left, total, ti, i, track, bids, idle, currentTeam, bidSec, ans } = b
  const layout = useMemo(() => melLayout(themes.map(t => t.tracks.length)), [themes])
  const spinTotalMs = m.spinMs ?? Math.min(s.spinSec ?? 5, 8) * 1000
  const { highlighted: hot, landed } = useMelodySpin(themes, played, m.stage === 'spinning', m.key, deadline, spinTotalMs)

  let target: MelView = 'idle'
  if (!idle && m.stage) {
    if (m.stage === 'answering') target = ans?.is_correct === false ? 'wrong' : 'answering'
    else if (m.stage === 'reveal') target = m.wonTeam ? 'reveal' : 'miss'
    else target = m.stage as MelView
  }
  const [view, setView] = useState<MelView>(target)
  const targetRef = useRef(target); targetRef.current = target
  const prev = useRef({ stage: m.stage, key: m.key })
  const lastKey = useRef(m.key)
  if (!idle && m.key) lastKey.current = m.key
  useEffect(() => {
    const p = prev.current
    prev.current = { stage: m.stage, key: m.key }
    let t: number | undefined
    if (idle && p.key === m.key && p.stage && ACTIVE.has(p.stage)) { setView('back'); t = window.setTimeout(() => setView(targetRef.current), MEL_BACK_MS) }
    else if (m.stage === 'passed' && p.stage === 'answering' && p.key === m.key) { setView('wrong'); t = window.setTimeout(() => setView(targetRef.current), MEL_WRONG_MS) }
    else setView(targetRef.current)
    return () => { if (t) clearTimeout(t) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m.stage, m.key])
  // внутри стадии (ответ пришёл, ведущий отметил промах) — сразу; переход «назад/неверно» прерывает только новая стадия
  useEffect(() => {
    setView(v => ((v === 'back' && target === 'idle') || (v === 'wrong' && target === 'passed') ? v : target))
  }, [target])

  const key = lastKey.current ?? '0-0'
  const [kti, ki] = key.split('-').map(Number)
  const sel = layout[kti] ? melBellPos(layout[kti], ki) : { x: 0, y: 0 }
  const intro = useRef(true)
  const { root } = useEntrance(a => a.tl.play(), (tl, q) => {
    melBuild(tl, q, view, sel, { intro: intro.current })
    intro.current = false
  }, null, [view, themes.length])
  // рулетка встала на итог — колокол вспыхивает (в лаборатории это момент таймлайна, здесь — настоящего времени)
  useEffect(() => {
    if (!landed || !m.key || !root.current) return
    const el = root.current.querySelector(`.ml2a-t[data-k="${m.key}"] .ml2a-sway`)
    if (el) gsap.fromTo(el, { '--g': 1 }, { '--g': 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' })
  }, [landed, m.key, root])

  if (themes.length === 0) return <EmptyMelody />

  const tv = (id?: string): MelTeamV | null => {
    if (!id) return null
    const t = teams.find(x => x.id === id)
    return { id, name: t?.name ?? '—', color: t?.color }
  }
  // таймер — там же, где у прежней доски (есть дедлайн, кроме «слушаем 1 секунду»); полный срок — из настроек раунда
  const full = m.stage === 'bidding' ? (s.bidSec ?? 10) : m.stage === 'answering' ? (s.answerSec ?? 30)
    : m.stage === 'passed' ? (s.passAnswerSec ?? 10) : m.stage === 'snippet' ? (m.snippetSec ?? 5) : total
  const wrongView = view === 'wrong' && m.stage === 'passed'
  const timer = deadline && m.stage !== 'listen' && !wrongView ? { n: left, total: Math.max(full, left, 1), seeds: m.stage === 'answering' ? 30 : 10 } : null
  const firstId = m.order?.[0]
  const firstAns = answers.find(a => a.question_ref === `q-mel-${m.key}` && a.team_id === firstId)
  const firstBid = Number(bids.find(x => x.team_id === firstId)?.answer_text) || 0
  const pass = (m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1
  const d: MelPanelData = {
    themeName: themes[ti]?.name ?? '', trackNo: i + 1, timer,
    bidding: [...teams].sort((a, c) => a.name.localeCompare(c.name)).map(t => ({ team: { id: t.id, name: t.name, color: t.color }, has: bids.some(x => x.team_id === t.id) })),
    bids: (m.order ?? []).map(id => { const bb = bids.find(x => x.team_id === id); return { team: tv(id) ?? { id, name: '—' }, sec: bb ? Number(bb.answer_text) || null : null } }),
    cur: wrongView ? tv(firstId) : currentTeam ? { id: currentTeam.id, name: currentTeam.name, color: currentTeam.color } : tv(m.order?.[m.turn ?? 0]),
    bidSec: wrongView ? firstBid : bidSec,
    winPts: melodyPoints(wrongView ? firstBid : bidSec, true),
    answer: wrongView ? (firstAns?.answer_text || null) : (ans?.answer_text || null),
    wrong: wrongView ? WRONG_PASS : ans?.is_correct === false ? (pass ? WRONG_PASS : '✗ Неверно · дальше — правильный ответ') : null,
    correctNow: !wrongView && ans?.is_correct === true && (m.stage === 'answering' || m.stage === 'passed'),
    correct: track?.correct ?? '', wonTeam: tv(m.wonTeam), wonPts: m.wonPts ?? 0,
  }
  const remain = melodyFree(themes, played).length
  const preview = props.preview
  const stOf = (k: string) => {
    if (k === key && MEL_STAGE.has(view)) return 'taken'
    if (played.includes(k)) return `done${k === key && view === 'back' ? ' just' : ''}`
    if (view === 'spinning' && hot === k) return landed ? 'won' : 'hot'
    return 'av'
  }
  return (
    <div style={{ display: 'contents' }} onPointerDown={preview ? undefined : unlockAudio}>
      <MelodyScene rootRef={root} cls={view} view={view} title={round.title_lines.join(' ') || 'Угадай мелодию'}
        sub={remain === 0 ? ' · все треки отыграны' : ` · осталось треков: ${remain}`}
        themes={themes.map(t => ({ name: t.name || '', tracks: t.tracks.length }))} layout={layout} stOf={stOf}
        pickNo={ki + 1} hot={view === 'spinning' ? hot ?? null : null} landed={landed} n={timer ? timer.n : null}
        panel={<MelPanel view={view} d={d} />} onPick={!preview && idle && b.manualPick ? b.pickManually : undefined}>
        {/* дослушать трек на разборе: тот же RevealTrack и в тех же условиях, что в модалке прежней доски; надпись не видна */}
        {!preview && m.stage === 'reveal' && track?.audio && <div hidden><RevealTrack src={mediaUrl(track.audio)} /></div>}
        <ForestMelodyActions b={b} pack={pack} gameState={gameState} />
      </MelodyScene>
    </div>
  )
}

/** Кнопки ведущего — те же действия, что у прежней доски и её модалки. На проекторе Леса скрыты стилем (?nav=1 — вернуть);
 *  основной пульт — телефон ведущего (AdminPage). */
function ForestMelodyActions({ b, pack, gameState }: { b: ReturnType<typeof useMelodyBoard>; pack: LoadedPack; gameState: GameState }) {
  const { m, idle, played, freeKeys, manualPick, setManualPick, loadState, click, startSpin, currentId, bidSec, bids, ans, grade } = b
  if (idle) return (<>
    {/* прогресс скачивания — сведения, а не управление: остаётся видимым, даже когда кнопки проектора скрыты */}
    {loadState && loadState.total > 0 && (
      <span className={`ml2-load ml2-chip${loadState.failed ? ' warn' : ''}`}>
        {loadState.done + loadState.failed < loadState.total ? `♪ треки ${loadState.done}/${loadState.total}…`
          : loadState.failed ? `♪ ${loadState.done}/${loadState.total} · не скачалось ${loadState.failed}` : '♪ все треки загружены'}
      </span>
    )}
    <div className="host-actions ml2-actions">
      {freeKeys.length > 0
        ? (manualPick
            ? <><span className="ml2-load">выберите колокольчик на экране</span><button className="ghost" onClick={() => setManualPick(false)}>Отмена</button></>
            : <><button onClick={startSpin}>{played.length === 0 ? 'Стартуем!' : 'Рулетка'}</button>
                <button className="ghost" onClick={() => setManualPick(true)}>Выбрать вручную</button></>)
        : <button onClick={() => void finishMelodyRound(gameState, pack)}>Завершить раунд →</button>}
    </div>
  </>)
  return (
    <div className="host-actions ml2-actions">
      {m.stage === 'bids' && <>
        <button disabled={!currentId} onClick={() => click(() => melodyClick(gameState, guardMelody(
          { key: m.key, stage: 'bids' }, cur => melodyPlaySnippetIfFresh(cur, bids))))}>Играем {bidSec || 5} сек →</button>
        <button className="ghost dark" onClick={() => click(() => melodyClick(gameState,
          guardMelody({ key: m.key, stage: 'bids' }, cur => melodyRevealMiss(cur))))}>Пропустить трек</button>
      </>}
      {m.stage === 'snippet' && <button onClick={() => click(() => melodyClick(gameState, guardMelody(
        { key: m.key, stage: 'snippet' }, cur => melodyAcceptAnswer(cur, b.s.answerSec ?? 30))))}>Принимаем ответ →</button>}
      {(m.stage === 'answering' || m.stage === 'passed') && <>
        <button disabled={!ans} onClick={() => click(() => grade(true))}>✓ Верно</button>
        <button className="ghost" onClick={() => click(() => passMelody(gameState, ans))}>
          {(m.turn ?? 0) === 0 && (m.order?.length ?? 0) > 1 ? '✗ Передать ход →' : '✗ Показать ответ →'}
        </button>
      </>}
      {m.stage === 'reveal' && <button onClick={() => click(() => melodyClick(gameState,
        guardMelody({ key: m.key, stage: 'reveal' }, cur => melodyToBoard(cur))))}>К доске →</button>}
      {m.stage !== 'spinning' && m.stage !== 'reveal' && m.stage !== 'done' && (
        <button className="ghost dark" onClick={() => {
          if (!confirm('Закрыть трек и вернуться к доске?\n\nБаллы за него никто не получит.')) return
          const keyNow = m.key
          click(() => melodyClick(gameState, melodyEmergencyClose(keyNow)))
        }}>Закрыть</button>
      )}
    </div>
  )
}
