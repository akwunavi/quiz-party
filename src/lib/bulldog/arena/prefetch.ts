// Ранний прогрев файлов арены (трибуна, деревни, ели, бабочка ≈ 2 МБ): вызывается, когда на проекторе показан раунд «Скачки» ИЛИ раунд перед ним (экран правил) —
// к «Старту» файлы уже в HTTP-кеше/Service Worker, и подготовка не ждёт сеть. Ошибки глотаются (арена загрузит сама, а при провале — прежняя трасса). Один раз за сессию.
export const ARENA_FILES = ['stands_crowd.webp', 'village_mid.webp', 'village_2.webp', 'spruce_set.webp', 'butterfly.webp']
let done = false
export function prefetchArena(base: string, fetchFn: typeof fetch = fetch): void {
  if (done) return; done = true
  for (const f of ARENA_FILES) void fetchFn(`${base}arena/${f}`).then(r => r.blob()).catch(() => { done = false })
}
export const resetPrefetchForTests = () => { done = false }
