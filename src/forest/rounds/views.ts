// ═══ Лес в игре: настоящее состояние раунда → «вид» утверждённой сцены (чистые функции, без сети и DOM) ═══
// Ничего не считают заново: время — из тех же функций, что боевые экраны (liveLeft, revealVisibleIndices…), итоги
// блица — blitzResults (та же функция, что пишет зачёт), баллы фаз — revealPointsFor (та же, что считает табло).
import {
  currentTeam, liveLeft, remainingCount, toResults, MAX_ATTEMPTS,
  type BlitzState, type BlitzQuestion,
} from '../../lib/blitzState'
import { blitzResults } from '../../lib/blitz'
import { revealPhaseSec, revealVisibleIndices } from '../../lib/reveal'
import { revealPointsFor } from '../../lib/scoring'
import type { RevealSettings } from '../../types/quiz'
import type { BlitzView, BzResult, BzState, BzTeam } from '../stage1/BlitzScene'
import type { RvPhase, RvState } from '../stage1/Reveal3Scene'
import type { SprintState } from '../stage1/SprintScene'
import { hueOf, tcol } from '../util'

/** Цвет подписи команды в Лесу: мягкий тон из её цвета (как в лобби и лаборатории). */
export const teamTone = (hex: string | undefined) => tcol(hueOf(hex ?? ''))

/** «120 секунд», слайд вопросов: до старта — «читаем», дальше по оставшимся секундам. */
export function sprintBoardState(started: boolean, left: number): SprintState {
  if (!started) return 'read'
  if (left <= 0) return 'over'
  return left <= 10 ? 'warning' : 'active'
}

export type BlitzInput = {
  state: BlitzState | null
  teams: { id: string; name: string; color: string }[]
  bank: BlitzQuestion[]
  now: number
  teamSeconds: number
  penalty: number
  /** текст вопроса и ответ по id */
  question: (id: string) => { text: string; answer: string } | undefined
}
const secs = (ms: number) => Math.max(0, Math.ceil(ms / 1000))

/** Блиц: то же разбиение на «кубик / ход / вердикт / пауза / итог», что у BlitzScreen и BlitzBoard. */
export function blitzSceneView(i: BlitzInput): BlitzView {
  const s = i.state
  const base = { maxAttempts: MAX_ATTEMPTS, perTeam: Math.max(1, i.teamSeconds), penalty: i.penalty, attempts: 0, q: '', answer: '', results: null, fruitTeam: null }
  if (!s) {
    // кубик ещё не брошен (проектор бросает его сам, когда команд хотя бы две)
    return { ...base, state: 'rolling', active: null, bank: remainingCount(i.bank, []),
      teams: i.teams.map(t => ({ id: t.id, name: t.name, color: teamTone(t.color), left: secs(i.teamSeconds * 1000), correct: 0, missed: 0 })) }
  }
  const ordered: BzTeam[] = s.order.map(id => i.teams.find(t => t.id === id)).filter((t): t is NonNullable<typeof t> => !!t)
    .map(t => ({ id: t.id, name: t.name, color: teamTone(t.color), left: secs(liveLeft(s, t.id, i.now)), correct: s.correct[t.id] ?? 0, missed: s.missed[t.id] ?? 0 }))
  const bank = remainingCount(i.bank, s.used)
  if (s.finished) {
    const rows = blitzResults(toResults(s), i.penalty)
    const results = new Map<string, BzResult>(rows.map(r => [r.teamId, { ...r, timedOut: s.timedOutTeam === r.teamId, left: secs(s.left[r.teamId] ?? 0) }]))
    return { ...base, state: 'complete', teams: ordered, active: null, bank, results }
  }
  const cur = s.current
  const started = cur != null || Object.values(s.correct).some(v => v > 0) || Object.values(s.missed).some(v => v > 0)
  if (!started) return { ...base, state: 'dice', teams: ordered, active: null, bank }
  const active = currentTeam(s) ?? null
  if (!cur) {
    const lr = s.lastReveal, rq = lr ? i.question(lr.questionId) : undefined
    if (!lr || !rq) return { ...base, state: 'next', teams: ordered, active, bank }
    const asking = lr.verdict === 'ok' ? 'ответили верно!' : lr.verdict === 'skip' ? 'вопрос пропущен' : 'не угадали'
    return { ...base, state: 'between', teams: ordered, active, bank, between: { asking, q: rq.text, answer: rq.answer } }
  }
  const q = i.question(cur.questionId)
  const common = { ...base, teams: ordered, active, bank, q: q?.text ?? '', answer: q?.answer ?? '' }
  if (cur.verdict === 'ok') {
    // верно: плод завязывается сразу, как в утверждённом кадре (в зачёт ход уйдёт через окно на исправление)
    return { ...common, state: 'right', fruitTeam: active, teams: ordered.map(t => (t.id === active ? { ...t, correct: t.correct + 1 } : t)) }
  }
  if (cur.verdict === 'no') {
    const used = cur.attempts + 1
    return { ...common, state: 'wrong', attempts: used, finalWrong: used >= MAX_ATTEMPTS }
  }
  const left = ordered.find(t => t.id === active)?.left ?? 0
  const st: BzState = left <= 0 ? 'timeout' : left <= 10 ? 'warning' : 'question'
  return { ...common, state: st, attempts: cur.attempts }
}

/** «Три попытки»: состояние сцены. Время фазы 3 вышло, а разбора ещё нет (запас на «00») — «попытки исчерпаны». */
export function revealSceneState(phase: 1 | 2 | 3 | 'review', running: boolean, left: number): RvState {
  if (phase === 'review') return 'review'
  if (phase === 3 && running && left <= 0) return 'over'
  return phase === 1 ? 'p1' : phase === 2 ? 'p2' : 'p3'
}

/** Какие картинки видны и какие уходят при смене фазы; если набор не сменился (картинок меньше трёх) — рамы стоят. */
export function revealFrames(count: number, phase: 1 | 2 | 3 | 'review') {
  const shown = revealVisibleIndices(count, phase)
  const prevPh = phase === 2 ? 1 : phase === 3 ? 2 : null
  const prev = prevPh ? revealVisibleIndices(count, prevPh) : []
  const same = prev.length === shown.length && prev.every((x, k) => x === shown[k])
  return { shown, prev: same ? [] : prev, still: same }
}

/** Стебель фаз: баллы — той же функцией, что считает табло; секунды — по настройкам раунда. */
export function revealPhases(s: RevealSettings, short: boolean, cur?: { phase: number; sec?: number }): RvPhase[] {
  return ([1, 2, 3] as const).map(n => ({
    n, sec: cur && cur.phase === n && cur.sec != null ? cur.sec : revealPhaseSec(s, n, short),
    pts: String(revealPointsFor(n)).replace('.', ','),
  }))
}
