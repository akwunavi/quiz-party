// ═══ Набор концепции ═══
// Общие экраны повторяют СТРУКТУРУ продакшна (что на экране и в каком
// порядке), а всё, что делает мир миром — сцену, плотность декора,
// материал таймера, переход между состояниями, — даёт концепция.
import { createContext, useContext, type ComponentType, type ReactNode } from 'react'
import type { GameTimer } from './timer'
import type { DemoTeam } from './data'

export type Density = 'sparse' | 'medium' | 'dense'
/** Переход сцены: before — ещё старое состояние, out — старое уходит, cover — кадр закрыт материалом
 *  (страница, иней, рябь кинескопа), in — новое приходит, done — покой. */
export type TransitionPhase = 'before' | 'out' | 'cover' | 'in' | 'done'

export interface Kit {
  id: 'popup' | 'frost' | 'home'
  /** Сцена: фон, окружение и рамка кадра. density — сколько места отдать
   *  декору (в игре контента много — сцена отступает). */
  World: ComponentType<{ density: Density; scene: string; children: ReactNode }>
  /** Подключённые команды в материале мира (состав и порядок — как в игре). */
  Teams: ComponentType<{ teams: DemoTeam[] }>
  /** QR для входа. Сам код всегда неподвижный, прямой и контрастный; мир решает,
   *  на чём он «стоит». lit — окно составов открыто, код подсвечен. */
  Qr: ComponentType<{ lit?: boolean }>
  /** Таймер в материале мира. size: top — в шапке вопроса; big — один на
   *  экран; mini — в окне механики. */
  Timer: ComponentType<{ t: GameTimer; size: 'top' | 'big' | 'mini' }>
  /** Перекрытие кадра на смене состояния. Рендерится поверх всего. */
  Transition: ComponentType<{ phase: TransitionPhase; kind: 'rules' | 'round' }>
  /** Тайминг перехода (сек от начала): когда старое уходит, когда кадр
   *  закрыт (меняем содержимое), когда новое пришло. */
  timing: { out: number; cover: number; in: number; done: number }
}

const KitCtx = createContext<Kit | null>(null)
export const KitProvider = KitCtx.Provider
export function useKit(): Kit {
  const k = useContext(KitCtx)
  if (!k) throw new Error('Kit не задан')
  return k
}
