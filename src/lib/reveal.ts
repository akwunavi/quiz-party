// ═══ «3 попытки»: 2–4 картинки → слово ═══
//
// Переходы фаз — общие для проектора и админки, ЧИСТЫЕ (без сети, без
// Date.now() по умолчанию — параметр `now`), тот же приём, что у мелодии
// (lib/melody.ts) и «Своей игры» (lib/jeopardyRef.ts): если бы каждый
// экран считал следующую фазу по-своему, они рано или поздно разошлись бы
// (см. HANDOFF.md про блиц). Автопереход по таймеру — ТОЛЬКО на проекторе
// (RevealRound.tsx), админка двигает фазу вручную кнопкой.
//
// Фазы: 1 (2 картинки, верно → 2 балла) → 2 (3 картинки → 1 балл) →
// 3 (4 картинки → 0.5 балла) → 'review' (разбор, все буквы открыты).
// Фазы 2/3 укорачиваются (`short`), если ВСЕ команды успели ответить ещё
// на фазе 1 — ждать полное время незачем.
import type { RevealSettings, RevealState } from '../types/quiz'

/** Запас между истечением времени фазы и реальным переключением: даёт
 *  ведущему/залу увидеть «00» на таймере, а не прыжок в пустоту. */
export const REVEAL_GRACE_MS = 3000

export const REVEAL_DEFAULTS = { p1Sec: 30, p2Sec: 20, p3Sec: 10, shortSec: 10 } as const

/** Длительность конкретной фазы с учётом настроек раунда и укорачивания. */
export function revealPhaseSec(s: RevealSettings, phase: 1 | 2 | 3, short: boolean): number {
  if (phase === 1) return s.p1Sec ?? REVEAL_DEFAULTS.p1Sec
  if (short) return s.shortSec ?? REVEAL_DEFAULTS.shortSec
  return phase === 2 ? (s.p2Sec ?? REVEAL_DEFAULTS.p2Sec) : (s.p3Sec ?? REVEAL_DEFAULTS.p3Sec)
}

/** Старт вопроса: всегда с фазы 1, не укорочена. */
export function revealStart(qid: string, s: RevealSettings, now = Date.now()): RevealState {
  return {
    qid, phase: 1, startedAt: new Date(now).toISOString(),
    phaseSec: revealPhaseSec(s, 1, false),
  }
}

/** Дедлайн текущей фазы в мс, 0 — если фаза не идёт (например, review). */
export function revealDeadline(rv: RevealState): number {
  if (!rv.startedAt || !rv.phaseSec) return 0
  return new Date(rv.startedAt).getTime() + rv.phaseSec * 1000
}

/** Момент, когда автопереход РЕАЛЬНО должен сработать — с запасом на «00». */
export function revealSwitchAt(rv: RevealState): number {
  const d = revealDeadline(rv)
  return d ? d + REVEAL_GRACE_MS : 0
}

/** Следующая фаза. `allAnswered` учитывается только на переходе 1→2 (решает,
 *  укорачивать ли фазы 2/3) — дальше `short` просто переносится как было. */
export function revealNext(
  rv: RevealState, s: RevealSettings, allAnswered: boolean, now = Date.now(),
): RevealState {
  if (rv.phase === 1) {
    const short = allAnswered
    return { ...rv, phase: 2, startedAt: new Date(now).toISOString(),
      phaseSec: revealPhaseSec(s, 2, short), short }
  }
  if (rv.phase === 2) {
    const short = !!rv.short
    return { ...rv, phase: 3, startedAt: new Date(now).toISOString(),
      phaseSec: revealPhaseSec(s, 3, short), short }
  }
  if (rv.phase === 3) {
    return { ...rv, phase: 'review', startedAt: undefined, phaseSec: undefined }
  }
  // review → review: идемпотентно, кнопка «Дальше» на разборе уже уводит
  // к следующему вопросу отдельным действием, а не через revealNext
  return rv
}

/** Сколько картинок показывать на текущей фазе (максимум — сколько есть). */
export function revealVisible(count: number, phase: 1 | 2 | 3 | 'review'): number {
  if (phase === 1) return Math.min(2, count)
  if (phase === 2) return Math.min(3, count)
  return Math.min(4, count)
}

/** Слово(-а) ответа → группы букв по словам (пробел разделяет группы).
 *  "КРАСНАЯ ПЛОЩАДЬ" → [['К','Р',...],['П','Л',...]]. */
export function revealGroups(word: string): string[][] {
  return (word ?? '').trim().toUpperCase().split(/\s+/).filter(Boolean)
    .map(w => w.split(''))
}

/** Открыта ли буква с данным ПЛОСКИМ индексом (без учёта пробелов). */
export function revealLetterOpen(
  flatIdx: number, open: number[] | undefined, phase: 1 | 2 | 3 | 'review',
): boolean {
  if (phase === 'review') return true
  return (open ?? []).includes(flatIdx)
}

/** Все команды успели ответить (непустым текстом) — решает, укорачивать ли
 *  фазы 2/3. Пустой список команд — никогда true: некому было отвечать. */
export function revealAllAnswered(
  teamIds: string[], rows: { team_id: string; answer_text: string }[],
): boolean {
  if (teamIds.length === 0) return false
  return teamIds.every(id => {
    const row = rows.find(r => r.team_id === id)
    return !!row && !!row.answer_text.trim()
  })
}
