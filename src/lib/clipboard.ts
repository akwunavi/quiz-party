// ═══ Копирование в буфер обмена с фолбэком ═══
//
// navigator.clipboard недоступен в insecure context (http без TLS — так
// вечером подключаются к локальному серверу в баре) и в части webview.
// Фолбэк — старый execCommand('copy') через скрытую textarea. ВАЖНО: он
// требует, чтобы вызов был синхронно внутри пользовательского жеста
// (клика) — нельзя откладывать его в setTimeout или отдельный microtask,
// иначе браузер молча откажет.
export async function copyText(t: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(t)
      return true
    } catch {
      // падаем на fallback ниже
    }
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = t
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    ta.style.top = '0'
    ta.style.left = '0'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
