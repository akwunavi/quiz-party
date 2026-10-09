// ═══ «Три попытки» — лабораторный адаптер ═══
// Сцена — Reveal3Scene.tsx (общая с игрой). Здесь — тестовый вечер (data.ts) и перематываемый таймлайн лаборатории.
import { useMemo } from 'react'
import { REVEAL } from './data'
import { useEntrance, type S1Props } from './common'
import { Reveal3Scene, revealBuild, revealFs, type RevealView, type RvState } from './Reveal3Scene'

export const REVEAL_STATES = [
  { id: 'intro', name: 'Вступление раунда' }, { id: 'p1', name: 'Фаза 1: две картинки · 2 балла' }, { id: 'p2', name: 'Фаза 2: третья картинка · 1 балл' },
  { id: 'p3', name: 'Фаза 3: четвёртая · 0,5 балла (последние секунды)' }, { id: 'over', name: 'Попытки исчерпаны: время вышло' }, { id: 'review', name: 'Разбор: слово и ответы команд' },
]
export const REVEAL_VARIANTS = [
  { id: 'A', name: 'A · Три бутона', note: 'Продолжение утверждённого экрана: картинки в рамах из ветвей, слово — на спилах ветки, время — одуванчик. Фазы — три бутона на одном стебле с баллами: текущий раскрыт, отыгранные увяли, будущие закрыты.' },
]

const prevOf = (st: string) => (st === 'p2' ? [0, 1] : st === 'p3' ? [2] : [])
const shownOf = (st: string) => (st === 'p1' ? [0, 1] : st === 'p2' ? [2] : st === 'p3' || st === 'over' ? [3] : [0, 1, 2, 3])
function timerFor(state: string) {
  if (state === 'p1') return { start: 30, from: 1.2, run: 8 }
  if (state === 'p2') return { start: 20, from: 2.4, run: 8 }
  if (state === 'p3') return { start: 10, from: 2.4, run: 6 }
  return null
}

export function Reveal3({ state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const fs = useMemo(() => revealFs(state, shownOf(state).length, prevOf(state).length, state === 'over'), [state])
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => revealBuild(tl, q, state, fs), tm, [state, fs])
  const n = nOv ?? (state === 'over' ? 0 : nLive)
  const v: RevealView = {
    state: state as RvState, imgs: REVEAL.imgs, shown: shownOf(state), prev: prevOf(state), still: state === 'over',
    groups: [REVEAL.word.split('')], open: REVEAL.open, phases: REVEAL.phases.map(p => ({ n: p.n, sec: p.sec, pts: p.pts })),
    note: REVEAL.note, answers: REVEAL.answers.map(a => ({ ...a, ok: a.ok as boolean | null })), intro: REVEAL.intro,
  }
  return <Reveal3Scene v={v} n={n} fs={fs} rootRef={root} />
}
