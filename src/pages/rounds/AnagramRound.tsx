// ═══ «СКРЭМБЛ» (anagram): доска плиток на проекторе ═══
//
// Механика — «обычный раунд со своей доской» (HANDOFF §3ca): состояние в
// уже существующих полях сессии (question_index, timer_started_at,
// reveal), в мешок `melody` НЕ пишется ничего. Этот компонент вообще ничего
// не пишет в сеть — звук вопроса, автопоказ ответа, автопролистывание и
// кнопки ведущего приходят слотами из HostScreen.tsx (как у QuestionScreen),
// а подсказки и победитель гонки — чистые функции lib/anagram.ts от
// (timer_started_at, now, q.id) и answers, одинаковые на всех экранах.
//
// Разметка — та же вложенность, что у обычного вопроса (host-topbar →
// контент → host-actions), иначе не сработают проверенные правила высот.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AudioGate } from '../../components/AudioGate'
import { FitImg } from '../../components/FitImg'
import { useFitText } from '../../hooks/useFitText'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import { useQuestionShown } from '../../hooks/useQuestionShown'
import { displayRoundNumber } from '../../lib/roundMeta'
import { mediaScaleVar, mediaUrl } from '../../lib/media'
import {
  anagramQuestion, anagramHintOrder, anagramHintsOpen, anagramHintTile, anagramMaxHints,
  anagramWinner, anagramStartIso, anagramElapsedMs, formatRaceTime, isAnagramCorrect, hashStr,
} from '../../lib/anagram'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { AnagramSettings, GameState, Question } from '../../types/quiz'
import type { PreviewCtx } from '../../lib/previewState'

/** Страховка посадки плитки, если `transitionend` не придёт (вкладка в
 *  фоне, переход отключён чужим правилом). Отсчёт — от `transitionstart`
 *  (+ длительность перехода + запас), а НЕ от установки transform: на
 *  тяжёлой сцене (декор темы, 3840, слабый ТВ) переход реально стартует
 *  через 400–600 мс после установки — замерено в headless Chromium, и
 *  таймер «от установки» сажал плитку на полпути (HANDOFF §3ca). */
const LAND_AFTER_START_MS = 400
const LAND_NO_START_MS = 2500

/** '0.7s, 0s' → 700 (максимум из списка длительностей). */
function transitionMs(el: HTMLElement): number {
  return Math.max(0, ...getComputedStyle(el).transitionDuration.split(',').map(x => {
    const v = parseFloat(x)
    return Number.isFinite(v) ? (x.trim().endsWith('ms') ? v : v * 1000) : 0
  }))
}

function motionReduced(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    && !document.documentElement.classList.contains('fx-force-motion')
}

export function AnagramBoard({
  pack, round, roundIdx, q, qIndex, qCount, gameState, timerSlot, effectsSlot, actionsSlot, preview,
}: {
  pack: LoadedPack
  round: LoadedRound
  roundIdx: number
  q: Question
  qIndex: number
  qCount: number
  gameState: GameState
  timerSlot?: ReactNode
  effectsSlot?: ReactNode
  actionsSlot?: ReactNode
  /** Предпросмотр в редакторе: ни одного сетевого запроса (хуки получают
   *  null), команды/ответы — фиктивные. Записей в сеть тут нет и в бою. */
  preview?: PreviewCtx
}) {
  // ── все хуки — до любого раннего return (React #310) ──
  const liveTeams = useTeams(preview ? null : gameState.game_id)
  const liveAnswers = useAnswers(preview ? null : gameState.game_id, gameState.round_number)
  const shown = useQuestionShown(preview ? null : gameState.game_id)
  const teams = preview ? preview.teams : liveTeams
  const answers = preview ? preview.answers : liveAnswers

  const s = (round.settings ?? {}) as AnagramSettings
  const spec = q.answer.mode === 'anagram' ? q.answer : null
  const phrase = spec?.phrase ?? ''
  const orderKey = (spec?.order ?? []).join(',')
  const { template, letters, order, tiles } = useMemo(
    () => anagramQuestion(phrase, spec?.order ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phrase, orderKey])
  const hintOrder = useMemo(() => anagramHintOrder(letters, hashStr(q.id)), [letters, q.id])

  const startedAt = gameState.timer_started_at
  const reveal = gameState.reveal
  const timerSec = round.timer_seconds
  const intervalSec = s.hintIntervalSec ?? 10
  const paperMode = pack.settings?.play_mode === 'paper'
  const race = (s.mode ?? 'standard') === 'race' && !paperMode

  // Тик — только пока таймер идёт и ответ не показан: после этого экран
  // «успокаивается» (подсказки после конца таймера замирают сами).
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    setNow(Date.now())
    if (!startedAt || reveal) return
    const end = Date.parse(startedAt) + timerSec * 1000
    if (!(Date.now() < end)) return
    const t = setInterval(() => {
      const n = Date.now()
      setNow(n)
      if (n >= end) clearInterval(t)
    }, 250)
    return () => clearInterval(t)
  }, [startedAt, reveal, timerSec])

  const open = anagramHintsOpen({
    nowMs: now, startedAtIso: startedAt, intervalSec, timerSec,
    maxHints: anagramMaxHints(letters.length),
  })
  const hinted = hintOrder.slice(0, open)
  const hintedKey = hinted.join(',')
  // Плитки, которые ДОЛЖНЫ оказаться в клетках: при показе ответа — все,
  // иначе — плитки открытых подсказок.
  const targets = useMemo(() => reveal
    ? tiles.map((_, p) => p)
    : hinted.map(i => anagramHintTile(order, i)).filter(p => p >= 0),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [reveal, hintedKey, tiles.length, orderKey])
  const targetsKey = targets.join(',')

  // Севшие плитки: плитка спрятана (.used), буква видна в клетке.
  const [landed, setLanded] = useState<ReadonlySet<number>>(() => new Set())
  // Все плитки сели после показа ответа — пул убирается из раскладки
  // (.an-board.done), useFitText пересчитывает кегль под одни клетки.
  const allLanded = reveal && tiles.every((_, p) => landed.has(p))
  const boardRef = useFitText<HTMLDivElement>([q.id, reveal, letters.length, allLanded])
  const firstRun = useRef(true)
  const timers = useRef(new Map<number, number>())

  // ── FLIP-перелёт плитки в клетку ──
  // Только transform (раскладку не трогает — useFitText не сбивается).
  // Первый проход на этом вопросе (перезагрузка проектора посреди вопроса)
  // и reduced-motion — без полёта, сразу конечное состояние.
  useLayoutEffect(() => {
    const board = boardRef.current
    const want = new Set(targets)
    const instant = firstRun.current || motionReduced() || !board
    firstRun.current = false
    // плитки, которые больше не цель (повтор вопроса сбросил старт), —
    // обратно в пул
    if (board) {
      board.querySelectorAll<HTMLElement>('.an-tile').forEach(el => {
        const p = Number(el.dataset.p)
        if (!want.has(p)) { el.style.transform = ''; el.classList.remove('fly') }
      })
    }
    setLanded(prev => {
      const kept = new Set([...prev].filter(p => want.has(p)))
      if (instant) targets.forEach(p => kept.add(p))
      return kept.size === prev.size && [...kept].every(p => prev.has(p)) ? prev : kept
    })
    if (instant || !board) return
    const pending = targets.filter(p => !landed.has(p))
    if (!pending.length) return
    // после useFitText (он тоже в rAF) — меряем уже подогнанную раскладку
    const raf = requestAnimationFrame(() => {
      for (const p of pending) {
        const tile = board.querySelector<HTMLElement>(`.an-tile[data-p="${p}"]`)
        const cell = board.querySelector<HTMLElement>(`.an-cell[data-i="${order[p]}"]`)
        if (!tile || !cell) { setLanded(prev => new Set(prev).add(p)); continue }
        const a = tile.getBoundingClientRect(), b = cell.getBoundingClientRect()
        const dx = (b.left + b.width / 2) - (a.left + a.width / 2)
        const dy = (b.top + b.height / 2) - (a.top + a.height / 2)
        const sx = a.width ? b.width / a.width : 1
        const sy = a.height ? b.height / a.height : 1
        tile.classList.add('fly')
        tile.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
        const durMs = transitionMs(tile)
        let done = false
        const arm = (ms: number) => {
          clearTimeout(timers.current.get(p))
          timers.current.set(p, window.setTimeout(land, ms))
        }
        const land = () => {
          if (done) return
          done = true
          clearTimeout(timers.current.get(p))
          timers.current.delete(p)
          tile.removeEventListener('transitionend', onEnd)
          tile.removeEventListener('transitionstart', onStart)
          setLanded(prev => (prev.has(p) ? prev : new Set(prev).add(p)))
        }
        const onEnd = (e: TransitionEvent) => { if (e.propertyName === 'transform') land() }
        const onStart = (e: TransitionEvent) => {
          if (e.propertyName === 'transform') arm(durMs + LAND_AFTER_START_MS)
        }
        tile.addEventListener('transitionend', onEnd)
        tile.addEventListener('transitionstart', onStart)
        // перехода нет вовсе (длительность 0) — садимся сразу
        arm(durMs > 0 ? LAND_NO_START_MS : 0)
      }
    })
    return () => cancelAnimationFrame(raf)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetsKey, q.id])

  useEffect(() => {
    const t = timers.current
    return () => { t.forEach(id => clearTimeout(id)); t.clear() }
  }, [])

  // ── вычисления для разметки (без хуков) ──
  const media = q.media.question ?? []
  const imgs = q.media.hidden ? [] : media.filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m)).slice(0, 1)
  const clue = q.question_text.trim()
  const rows = answers.filter(a => a.question_ref === `q-${q.id}`)
  const hintedSet = new Set(hinted)
  const landedCells = new Map<number, number>()   // клетка → плитка
  landed.forEach(p => landedCells.set(order[p], p))
  const winner = race ? anagramWinner(rows, phrase) : null
  const winnerTeam = winner ? teams.find(t => t.id === winner) : undefined
  const start = anagramStartIso(shown, q.id, startedAt)
  const winnerRow = winner ? rows.find(r => r.team_id === winner) : undefined
  const winnerMs = winnerRow ? anagramElapsedMs(winnerRow, start.iso) : NaN
  const rightTeams = race ? [] : rows
    .filter(a => (a.is_correct ?? isAnagramCorrect(a.answer_text, phrase)) === true)
    .map(a => teams.find(t => t.id === a.team_id))
    .filter((t): t is NonNullable<typeof t> => !!t)
  // на бумаге ответов в базе нет — результат зачитывает ведущий по бланкам
  const showResult = allLanded && !paperMode

  return (
    <div className={`host-screen grid-bg an-screen mode-${race ? 'race' : 'standard'}${
      imgs.length ? ' has-media' : ''}${clue ? '' : ' no-clue'}`}>
      <AudioGate />
      {effectsSlot}
      <div className="host-topbar">
        <span className="qnum">Р{displayRoundNumber(pack, roundIdx)} · ВОПРОС{' '}
          <b>{qIndex + 1}</b> / {qCount}{race && <> · ГОНКА</>}</span>
        {timerSlot}
      </div>

      {clue && <div className="an-clue">{clue}</div>}
      {imgs.length > 0 && (
        <div className="q-media-grid n1" style={mediaScaleVar(q)}>
          {imgs.map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
        </div>
      )}

      <div className="an-board-wrap">
        <div className={`an-board${allLanded ? ' done' : ''}`} ref={boardRef}>
          <div className="an-tiles">
            {tiles.map((ch, p) => (
              <span key={p} data-p={p}
                className={`an-tile${landed.has(p) ? ' used' : ''}`}>{ch}</span>
            ))}
          </div>
          <div className="an-words">
            {template.words.map((w, wi) => (
              <span className="an-word" key={wi}>
                {w.map((c, ci) => {
                  if (c.kind === 'fixed') return <span key={ci} className="an-cell fixed">{c.ch}</span>
                  const p = landedCells.get(c.idx)
                  const on = p != null
                  const isHint = hintedSet.has(c.idx) && on
                  return <span key={ci} data-i={c.idx}
                    className={`an-cell${isHint ? ' hint' : ''}${on && !isHint ? ' filled' : ''}`}>
                    {on ? letters[c.idx] : ''}</span>
                })}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showResult && (
        <div className="an-result">
          {race
            ? winnerTeam
              ? <div className="an-res-line">
                  <span className="an-res-label">БАЛЛ ПОЛУЧАЕТ</span>
                  <span className="an-res-team" style={{ color: winnerTeam.color }}>
                    {winnerTeam.icon ? `${winnerTeam.icon} ` : ''}{winnerTeam.name}</span>
                  {Number.isFinite(winnerMs) && winnerMs >= 0 &&
                    <span className="an-res-time">{start.approx ? '≈ ' : ''}ЗА {formatRaceTime(winnerMs)}</span>}
                </div>
              : <div className="an-res-line"><span className="an-res-label">НИКТО НЕ УГАДАЛ</span></div>
            : rightTeams.length
              ? <div className="an-res-line wrap">
                  <span className="an-res-label">УГАДАЛИ</span>
                  {rightTeams.map(t => (
                    <span key={t.id} className="an-res-chip" style={{ color: t.color, borderColor: t.color }}>
                      {t.icon ? `${t.icon} ` : ''}{t.name}</span>
                  ))}
                </div>
              : <div className="an-res-line"><span className="an-res-label">НИКТО НЕ УГАДАЛ</span></div>}
          {q.answer_note && <div className="an-res-note">{q.answer_note}</div>}
        </div>
      )}

      {actionsSlot}
    </div>
  )
}
