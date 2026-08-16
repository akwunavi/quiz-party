// ═══ Комнаты: id сессии живёт в hash-URL (#/admin?room=<uuid>) ═══
// Читается напрямую из location, чтобы gameActions/хуки не тянули проп
// через десять слоёв. Последняя комната запоминается для удобства.
export function getRoomId(): string | null {
  const q = window.location.hash.split('?')[1]
  const fromUrl = q ? new URLSearchParams(q).get('room') : null
  return fromUrl
}

export function roomUrl(route: string, roomId: string): string {
  return `#${route}?room=${roomId}`
}

export function rememberRoom(id: string) { localStorage.setItem('qp-room', id) }
export function lastRoom(): string | null { return localStorage.getItem('qp-room') }
