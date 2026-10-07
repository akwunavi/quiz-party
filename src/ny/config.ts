// ═══ Резервная навигация проектора в новогодних темах ═══
// Эталон (мокапы, §3ck): на проекторе нет кнопок Назад/Далее — ходом игры управляет админка
// с телефона. Но если пульт недоступен, нужен запасной выход. По умолчанию ВЫКЛЮЧЕНО;
// включается ТОЛЬКО этим флагом, адресом `?nav=1` (открыть проектор с этим параметром) или
// записью `qp-ny-nav=1` в localStorage браузера проектора. Постоянного переключателя на
// самом экране нет. Логику переходов игры флаг не трогает — он лишь показывает кнопки,
// которые уже есть в разметке (.host-actions).
export const showProjectorNavigation = false

export function nyNavEnabled(): boolean {
  if (showProjectorNavigation) return true
  try {
    if (typeof location !== 'undefined' && /[?&]nav=1/.test(location.href)) return true
    if (typeof localStorage !== 'undefined' && localStorage.getItem('qp-ny-nav') === '1') return true
  } catch { /* приватный режим — резерв просто выключен */ }
  return false
}
