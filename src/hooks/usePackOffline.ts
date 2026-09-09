import { useCallback, useEffect, useState } from 'react'
import {
  checkPackOfflineStatus, downloadPackForOffline, requestPersistentStorage,
  type OfflineStatus, type PreloadProgress, type PersistResult,
} from '../lib/packPreload'
import type { LoadedPack } from '../lib/packLoader'
import { warmServiceWorker } from '../lib/sw'

/** Общее состояние офлайн-загрузки пакета — один вызов на экран (не на
 *  кнопку), чтобы кнопка в `.host-actions` и индикатор готовности в лобби
 *  показывали ОДНО И ТО ЖЕ состояние. Принимает `pack | null` и вызывается
 *  БЕЗ условия, до всех ранних `return` — как `usePreloadNext` в
 *  HostScreen.tsx (иначе снова падение React #310). */
export function usePackOffline(pack: LoadedPack | null) {
  const packId = pack?.id ?? null
  const [status, setStatus] = useState<OfflineStatus | null>(null)
  const [progress, setProgress] = useState<PreloadProgress | null>(null)
  const [persist, setPersist] = useState<PersistResult | null>(null)

  useEffect(() => {
    setStatus(null)
    setProgress(null)
    if (!pack) return
    let cancelled = false
    void checkPackOfflineStatus(pack).then(s => { if (!cancelled) setStatus(s) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- сверяемся только по id пакета, не по объекту целиком
  }, [packId])

  const start = useCallback(async () => {
    if (!pack) return
    if (persist == null) setPersist(await requestPersistentStorage())
    // Прогрев кеша Service Worker'а (шаг 8) — тем же нажатием, что качает
    // медиа пакета в IndexedDB (шаг 5). Не блокирует и не тормозит закачку
    // пакета — это отдельный, независимый кеш (сама страница, не медиа).
    void warmServiceWorker()
    const result = await downloadPackForOffline(pack, p => setProgress(p))
    setStatus({ total: result.total, have: result.total - result.failed.length })
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps -- persist читаем один раз за скачивание, повторный запрос браузеру не нужен
  }, [pack])

  return { status, progress, persist, start, running: progress?.running ?? false }
}
