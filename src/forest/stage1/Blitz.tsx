// ═══ «Блиц» — лабораторный адаптер ═══
// Сцена — BlitzScene.tsx (общая с игрой). Здесь — тестовый вечер (data.ts) и перематываемый таймлайн лаборатории.
import { BLITZ, BLITZ_EXTRA, BLITZ_EXTRA_FINAL, type BzTeam } from './data'
// итоги — той же чистой функцией, что проектор и пульт в игре (очки → штраф → бонус за время → места → баллы)
import { blitzResults } from '../../lib/blitz'
import { useEntrance, type S1Props } from './common'
import { BlitzScene, blitzBuild, type BlitzView, type BzResult, type BzState } from './BlitzScene'

export const BLITZ_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'dice', name: 'Кубик: кто начинает' }, { id: 'question', name: 'Вопрос, идёт время команды' },
  { id: 'wrong', name: 'Неверно — попытки ещё есть' }, { id: 'right', name: 'Верно' }, { id: 'between', name: 'Пауза: правильный ответ, ход дальше' },
  { id: 'warning', name: 'У команды последние 10 секунд' }, { id: 'timeout', name: 'Время команды вышло' }, { id: 'complete', name: 'Итог раунда' },
]
export const BLITZ_VARIANTS = [
  { id: 'C', name: 'C · Деревца-часы', note: 'У каждой команды деревце: высота кроны — сколько времени осталось, с каждой секундой облетает лист. Плоды — очки. Сравнить команды можно одним взглядом. На итоге кроны вырастают по набранным очкам.' },
]

/** Команды в порядке ходов (как выпал кубик). 3 — первые три, 8 — пять основных + три. */
function teamsFor(count: number): BzTeam[] {
  const all = [...BLITZ.teams, ...BLITZ_EXTRA]
  return (count <= 3 ? all.slice(0, 3) : count >= 8 ? all.slice(0, 8) : all.slice(0, 5)).map(t => ({ ...t }))
}
const FINAL = [...BLITZ.final, ...BLITZ_EXTRA_FINAL]
type LabView = { teams: BzTeam[]; active: string | null; attempts: number; between: boolean }
function viewOf(state: string, count = 5): LabView {
  const base = teamsFor(count)
  const v: LabView = { teams: base, active: BLITZ.active, attempts: 0, between: false }
  if (state === 'dice') { v.teams = base.map(t => ({ ...t, left: 60, correct: 0, missed: 0, done: false })); v.active = null }
  if (state === 'wrong') v.attempts = 1
  if (state === 'right') v.teams = base.map(t => t.id === 't1' ? { ...t, correct: 4 } : t)
  if (state === 'between') { v.between = true; v.active = 't5'; v.teams = base.map(t => t.id === 't1' ? { ...t, correct: 4, left: 31 } : t) }
  if (state === 'warning') v.teams = base.map(t => t.id === 't1' ? { ...t, left: 9 } : t)
  if (state === 'timeout') { v.teams = base.map(t => t.id === 't1' ? { ...t, left: 0 } : t); v.attempts = 2 }
  if (state === 'complete') { v.active = null; v.teams = base.map(t => { const f = FINAL.find(x => x.id === t.id)!; return { ...t, left: f.left, correct: f.correct, missed: f.missed } }) }
  return v
}
function resultsOf(teams: BzTeam[]): Map<string, BzResult> {
  const rows = blitzResults(teams.map(t => { const f = FINAL.find(x => x.id === t.id)!; return { teamId: t.id, correct: f.correct, missed: f.missed, timedOut: !!f.timedOut, leftMs: f.left * 1000 } }), BLITZ.timeoutPenalty)
  return new Map(rows.map(r => { const f = FINAL.find(x => x.id === r.teamId)!; return [r.teamId, { ...r, timedOut: !!f.timedOut, left: f.left }] }))
}

function timerFor(state: string) {
  if (state === 'question') return { start: 38, from: 1.0, run: 8 }
  if (state === 'warning') return { start: 9, from: 0.3, run: 6 }
  return null
}

export function Blitz({ state, nOv, onReady, teams: count = 5 }: S1Props) {
  const tc = count
  const lv = viewOf(state, tc)
  const tm = timerFor(state)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => blitzBuild(tl, q, state, lv.teams.length), tm, [state, tc])
  const live = state === 'question' || state === 'warning'
  const nActive = nOv ?? (live ? nLive : lv.teams.find(t => t.id === BLITZ.active)?.left ?? 0)
  const leftOf = (t: BzTeam) => (t.id === BLITZ.active && state !== 'between' && state !== 'complete' && state !== 'dice' ? nActive : t.left)
  const v: BlitzView = {
    state: state as BzState, teams: lv.teams.map(t => ({ ...t, left: leftOf(t) })), active: lv.active, attempts: lv.attempts, maxAttempts: BLITZ.attemptsMax,
    q: BLITZ.question.text, answer: BLITZ.question.answer,
    between: lv.between ? { asking: 'ответили верно!', q: BLITZ.question.text, answer: BLITZ.question.answer } : undefined,
    bank: BLITZ.bank, perTeam: BLITZ.perTeam, penalty: BLITZ.timeoutPenalty,
    results: state === 'complete' ? resultsOf(lv.teams) : null, fruitTeam: BLITZ.active, intro: BLITZ.intro,
  }
  return <BlitzScene v={v} rootRef={root} />
}
