// ═══ Настройки лаборатории (только макет, на игру не влияют) ═══
import { createContext, useContext } from 'react'

/** Резервная навигация проектора (Назад / Далее). По умолчанию ВЫКЛЮЧЕНА:
 *  проектор — чистый эфир, ходом игры управляет админка с телефона. Включается
 *  только этим флагом (или `?nav=1` в адресе лаборатории, или галочкой в шапке
 *  лаборатории — не на самом экране). Логика переходов игры не затрагивается. */
export const showProjectorNavigation = false

export interface LabOptions {
  /** показывать резервные кнопки Назад / Далее */
  nav: boolean
  /** сколько команд в лобби (проверка нагрузки: 3 / 8 / 12) */
  teams: number
  /** длинный текст вопроса (проверка нагрузки) */
  longText: boolean
}
export const DEFAULT_OPTIONS: LabOptions = { nav: showProjectorNavigation, teams: 8, longText: false }
export const LabOptionsCtx = createContext<LabOptions>(DEFAULT_OPTIONS)
export const useLabOptions = () => useContext(LabOptionsCtx)
