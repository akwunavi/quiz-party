// ═══ UUID v4 с фолбэком для insecure context ═══
//
// Нельзя просто звать `crypto.randomUUID()` напрямую: он существует только
// в secure context (https:// или http://localhost). На голом локальном IP
// (http://192.168.x.x — так к серверу ведущего подключаются телефоны гостей
// в следующих шагах плана офлайн-устойчивости) браузер эту функцию не даёт,
// и вызов падает с TypeError. `crypto.getRandomValues` работает и там, и
// там — поэтому фолбэк собирает UUID v4 руками из случайных байт.
export function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40 // версия 4
  b[8] = (b[8] & 0x3f) | 0x80 // вариант RFC 4122
  const hex = Array.from(b, byte => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
