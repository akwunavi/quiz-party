// ═══ Контракт концепта Magic 2.0 ═══
// Общие экраны (screens.tsx) дают настоящую структуру механик и «зацепки»
// (классы x-*, переменные --i/--sx/--tx…). Концепт приносит МИР (слой сцены,
// живущий через все состояния), свой ТАЙМЕР и свою грамматику связей.
import type { ComponentType } from 'react'
import type { TimerState } from './data'

export type StateId =
  | 'lobby' | 'randomizer' | 'rules' | 'cw' | 'match' | 'one' | 'dense' | 'text' | 'jp' | 'melody'
  | 'blitz' | 'scramble' | 'matchA' | 'orderA' | 'timer' | 'board' | 'roundT' | 'final'

export type WorldProps = { st: StateId; sub: string; timer: TimerState; left: number; play: number }
export type TimerProps = { left: number; total: number; phase: TimerState; size: 'q' | 'big' | 'mini' }

/** Как рисовать связь пары: свет, нить, побег, свинцовая жилка — или вообще без линии. */
export type LinkShape = 'beam' | 'none' | 'vine' | 'thread' | 'lead'

export type ConceptMeta = {
  num: number; name: string; idea: string; world: string
  laws: string; materials: [string, string][]; persists: string; transitions: string; reveals: string
  timer: string; teams: string; type: string
}

export type Kit = {
  meta: ConceptMeta
  cls: string
  World: ComponentType<WorldProps>
  Timer: ComponentType<TimerProps>
  link: LinkShape
  /** Сколько копий слоя «откуда» рисовать для перехода (осколки витража). */
  shards?: number
}
