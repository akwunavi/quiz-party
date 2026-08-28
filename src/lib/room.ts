// ═══ Комнаты: id сессии живёт в hash-URL (#/admin?room=<uuid>) ═══
// Читается напрямую из location, чтобы gameActions/хуки не тянули проп
// через десять слоёв. Последняя комната запоминается для удобства.
export function getRoomId(): string | null {
  const q = window.location.hash.split('?')[1]
  const fromUrl = q ? new URLSearchParams(q).get('room') : null
  return fromUrl
}

export function roomUrl(route: string, roomId: string): string {
  // Переход в комнату собирает адрес заново и терял прочие параметры —
  // в том числе dev=1. Флаг переносим явно; сам режим при этом ещё и
  // запоминается в localStorage (см. devSeed.isDevMode).
  const dev = window.location.href.includes('dev=1') ? '&dev=1' : ''
  return `#${route}?room=${roomId}${dev}`
}

export function rememberRoom(id: string) { localStorage.setItem('qp-room', id) }
export function lastRoom(): string | null { return localStorage.getItem('qp-room') }
