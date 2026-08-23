// ═══ ЗАГРУЗКА ЗВУКА С ЗАПАСНЫМ ПУТЁМ ═══
// Симптом: <audio src="…supabase.co/…"> падает с ошибкой безопасности
//   «Request had a target IP address space of `unknown`».
// Так Chrome отвечает, когда не может классифицировать сеть — типично при
// VPN, корпоративном прокси или расширении, меняющем маршрутизацию.
//
// Важное различие: этот запрет действует на ЗАПРОС МЕДИА-ЭЛЕМЕНТА. Обычный
// fetch() из того же кода часто проходит. Поэтому: пробуем как есть, а при
// отказе скачиваем файл через fetch и играем из памяти (blob). Для игры
// это незаметно, а звук появляется там, где раньше была тишина.

const cache = new Map<string, string>()

/** Скачать файл и вернуть локальную ссылку на него. */
async function toBlobUrl(url: string): Promise<string> {
  const hit = cache.get(url)
  if (hit) return hit
  const res = await fetch(url, { mode: 'cors', credentials: 'omit' })
  if (!res.ok) {
    // Supabase на отсутствующий объект отвечает коротким JSON — отличаем
    // «файла нет» от «сеть заблокировала», это разные починки
    const body = await res.text().catch(() => '')
    if (/not_found|Object not found/i.test(body) || res.status === 404 || res.status === 400) {
      throw new Error('ФАЙЛА НЕТ В ХРАНИЛИЩЕ')
    }
    throw new Error(`сервер ответил ${res.status}`)
  }
  const blobUrl = URL.createObjectURL(await res.blob())
  cache.set(url, blobUrl)
  return blobUrl
}

export type PlayResult = { ok: true } | { ok: false; reason: string }

/** Воспроизвести звук, при необходимости через запасной путь. */
export async function playAudio(el: HTMLAudioElement, url: string): Promise<PlayResult> {
  // 1) как есть
  try {
    el.src = url
    await el.play()
    return { ok: true }
  } catch (e) {
    const name = e instanceof Error ? e.name : ''
    // запрет автозапуска запасным путём не лечится — нужен клик
    if (name === 'NotAllowedError') {
      return { ok: false, reason: 'браузер не разрешил звук — кликните по экрану' }
    }
  }
  // 2) через скачивание в память
  try {
    el.src = await toBlobUrl(url)
    await el.play()
    return { ok: true }
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error && /ФАЙЛА НЕТ/.test(e.message)
        ? 'файла нет в хранилище — трек нужно загрузить заново в редакторе'
        : e instanceof Error && /Failed to fetch|NetworkError/i.test(e.message)
          ? 'файл не скачивается: запрос блокирует браузер, VPN или расширение'
          : `не удалось воспроизвести: ${e instanceof Error ? e.message : 'ошибка'}`,
    }
  }
}

/** Диагностика одного файла: что именно отвечает сервер. */
export async function probeMedia(url: string) {
  const out: string[] = [url]
  try {
    const res = await fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit' })
    out.push(`fetch: ${res.status} ${res.statusText}`)
    out.push(`тип: ${res.headers.get('content-type') ?? '—'}`)
    out.push(`размер: ${res.headers.get('content-length') ?? '—'}`)
  } catch (e) {
    out.push(`fetch НЕ ПРОШЁЛ: ${e instanceof Error ? e.message : 'ошибка'}`)
  }
  return out.join('\n')
}
