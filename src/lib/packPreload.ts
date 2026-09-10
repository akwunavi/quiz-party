// ═══ Докачка пакета целиком в офлайн-кеш (IndexedDB) ═══
// Часть шага 5 плана офлайн-устойчивости (issue #4/#5, Part A). Кнопка
// «Скачать пакет для офлайна» — в AdminPage (Служебное) и на лобби
// проектора. Отдельно от `media.ts:primeMedia/releaseMedia`: то — прогрев
// blob-URL для ТЕКУЩЕГО/СЛЕДУЮЩЕГО раунда в памяти (чтобы не копить
// blob-URL на весь вечер), а это — разовая полная закачка ВСЕГО пакета на
// диск (IndexedDB) заранее, до начала игры, пока сеть ещё есть.

import { collectUsedPaths } from './usedPaths'
import { hasMedia, saveMedia, savePack, estimateSize } from './packCache'
import { fetchMediaBlob } from './media'
import type { LoadedPack } from './packLoader'

const CONCURRENCY = 4
const RETRY_DELAYS_MS = [400, 1200]  // 2 повтора: 0.4с, потом 1.2с

/** `fetchMediaBlob` кидает `Error('Failed to fetch')` дословно от браузера,
 *  когда соединение оборвалось/не установилось (не 404 — это отдельная,
 *  понятная ошибка «ФАЙЛА НЕТ В ХРАНИЛИЩЕ», её не ретраим, повтор не
 *  поможет). При 4 параллельных скачиваниях на небольшом self-hosted
 *  сервере (см. HANDOFF) такие обрывы — обычное дело, не признак того,
 *  что файла нет. Один обрыв не должен сразу попадать в «не скачалось». */
async function fetchWithRetry(path: string): Promise<Blob> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetchMediaBlob(path)
    } catch (e) {
      const permanent = e instanceof Error && e.message === 'ФАЙЛА НЕТ В ХРАНИЛИЩЕ'
      if (permanent || attempt >= RETRY_DELAYS_MS.length) throw e
      await new Promise(r => setTimeout(r, RETRY_DELAYS_MS[attempt]))
    }
  }
}

export interface PreloadProgress {
  total: number
  done: number
  bytes: number
  failed: string[]
  running: boolean
}

export interface OfflineStatus {
  total: number
  have: number
}

/** Сколько файлов пакета уже лежит в офлайн-кеше — БЕЗ скачивания. */
export async function checkPackOfflineStatus(pack: LoadedPack): Promise<OfflineStatus> {
  const paths = [...collectUsedPaths(pack)]
  let have = 0
  for (const p of paths) { if (await hasMedia(p)) have++ }
  return { total: paths.length, have }
}

export type PersistResult = 'granted' | 'denied' | 'unsupported'

/** `navigator.storage.persist()` — иначе браузер может вычистить IndexedDB
 *  под давлением памяти, и скачанный пакет пропадёт без предупреждения. */
export async function requestPersistentStorage(): Promise<PersistResult> {
  const persist = navigator.storage?.persist
  if (!persist) return 'unsupported'
  try {
    const granted = await persist.call(navigator.storage)
    return granted ? 'granted' : 'denied'
  } catch {
    return 'unsupported'
  }
}

export { estimateSize }

/** Скачать всё медиа пакета в IndexedDB, докачивая только недостающее
 *  (`hasMedia` перед каждым файлом — повторный вызов не перекачивает то,
 *  что уже есть). Параллельность ограничена `CONCURRENCY`: в баре узкий
 *  канал, десятки одновременных запросов его забьют. */
export async function downloadPackForOffline(
  pack: LoadedPack,
  onProgress: (p: PreloadProgress) => void,
): Promise<PreloadProgress> {
  const paths = [...collectUsedPaths(pack)]
  const progress: PreloadProgress = { total: paths.length, done: 0, bytes: 0, failed: [], running: true }
  onProgress({ ...progress, failed: [...progress.failed] })

  // Сам JSON пакета — тоже в офлайн-кеш (на случай, если сеть пропадёт ДО
  // старта: loadPack уже умеет читать его оттуда, см. packLoader.ts).
  try { await savePack(pack.id, pack) } catch { /* IndexedDB недоступен — качаем медиа всё равно */ }

  let cursor = 0
  async function worker() {
    while (cursor < paths.length) {
      const path = paths[cursor++]
      try {
        if (!(await hasMedia(path))) {
          const blob = await fetchWithRetry(path)
          await saveMedia(path, blob, blob.type)
          progress.bytes += blob.size
        }
      } catch (e) {
        progress.failed.push(`${path} — ${e instanceof Error ? e.message : 'ошибка'}`)
      }
      progress.done++
      onProgress({ ...progress, failed: [...progress.failed] })
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, paths.length) || 0 }, () => worker())
  await Promise.all(workers)
  progress.running = false
  onProgress({ ...progress, failed: [...progress.failed] })
  return progress
}
