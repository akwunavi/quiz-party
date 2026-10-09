// ═══ «120 секунд» — лабораторный адаптер ═══
// Сама сцена — SprintScene.tsx (общая с игрой). Здесь — только тестовый вечер (data.ts) и перематываемый таймлайн
// лаборатории со «своим» таймером состояния.
import { SPRINT, SPRINT_TEAM_ANS } from './data'
import { useEntrance, type S1Props } from './common'
import { SprintScene, sprintBuild, type SprintState } from './SprintScene'

export const SPRINT_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'read', name: 'Читаем вопросы (5 с)' }, { id: 'active', name: 'Идёт время' },
  { id: 'warning', name: 'Последние 10 секунд' }, { id: 'over', name: 'Время вышло' },
  { id: 'review', name: 'Разбор: вопрос 3, ответы скрыты' }, { id: 'reveal', name: 'Разбор: ответ и ответы команд' }, { id: 'reveal7', name: 'Разбор: вопрос с картинкой' },
]
export const SPRINT_VARIANTS = [
  { id: 'A', name: 'A · Поляна с одуванчиком', note: 'Две колонки вопросов висят на лианах, в центре — крупный одуванчик: 24 семени по 5 секунд. Разбор — один вопрос крупно по центру, внизу 8 семян-меток прогресса.' },
]

const QS = SPRINT.questions

function timerFor(state: string) {
  if (state === 'read') return { start: 5, from: 0.4, run: 5 }
  if (state === 'active') return { start: 87, from: 1.6, run: 12 }
  if (state === 'warning') return { start: 9, from: 0.3, run: 6 }
  return null
}
const fixedN = (state: string) => (state === 'over' ? 0 : state === 'intro' || state === 'review' || state === 'reveal' || state === 'reveal7' ? null : undefined)

export function Sprint({ state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => sprintBuild(tl, q, state), tm, [state])
  const fx = fixedN(state)
  const n = fx === null ? null : nOv ?? (fx === 0 ? 0 : nLive)
  const rq = QS[state === 'reveal7' ? 6 : 2]
  const ans = (SPRINT_TEAM_ANS[rq.n] ?? []).map(a => ({ ...a, ok: a.ok as boolean | null }))
  return (
    <SprintScene state={state as SprintState} n={n} rootRef={root} title={SPRINT.title} total={SPRINT.total} questions={QS} intro={SPRINT.intro}
      review={{ q: rq, shown: state !== 'review', verdicts: true, answers: ans, qImgs: rq.img ? [rq.img] : [], aImgs: rq.img ? [rq.img] : [] }} />
  )
}
