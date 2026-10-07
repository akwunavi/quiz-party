// ═══ Слоты сцены: положить кусок картинки в слой сцены из экрана игры ═══
// Команды лобби лежат В сцене (под затемнением окна составов), QR — в слое поверх
// игры (выше затемнения). Экран игры (HostScreen) живёт отдельным DOM, поэтому
// содержимое переносится порталом в узел-слот внутри масштабируемой сцены.
import { useLayoutEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export const NY_SLOT_BG = 'ny-slot-bg'
export const NY_SLOT_FX = 'ny-slot-fx'

export function NySlot({ where, children }: { where: typeof NY_SLOT_BG | typeof NY_SLOT_FX; children: ReactNode }) {
  const [el, setEl] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const n = document.getElementById(where)
    if (n !== el) setEl(n)
  })
  return el ? createPortal(children, el) : null
}
