// Общие типы новогодних тем (Книга / Тёплый дом): их используют и боевой проектор,
// и лаборатория макетов (src/labs/newyear) — картинка в лаборатории и в игре
// собирается из одних и тех же компонентов.
export type Density = 'sparse' | 'medium' | 'dense'

/** Команда для показа в лобби (подмножество Team + «жива ли», как isAlive в игре). */
export interface NyTeam { id: string; name: string; icon: string | null; color: string; alive: boolean }

/** То, что нужно таймеру-рисунку: целые секунды и доля остатка (логика — components/Timer.tsx). */
export interface NyTimer {
  seconds: number
  left: number
  frac: number
  low: boolean
  zero: boolean
  running: boolean
}
