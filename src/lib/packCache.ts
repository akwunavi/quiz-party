// ═══ Офлайн-кеш пакета: IndexedDB, без внешних зависимостей ═══
//
// Почему IndexedDB, а не Cache API (Service Worker) или localStorage:
//   - localStorage — синхронный, лимит ~5-10 МБ на источник. Пакет с
//     десятками картинок/треков в него не влезает; попытка записи тихо
//     проваливалась (см. историю packLoader.ts до этого шага — весь JSON
//     пакета писался туда в `catch { /* пусто */ }`).
//   - Cache API создан для пар "HTTP-запрос → HTTP-ответ" и рассчитан на
//     Service Worker. Он умеет отдавать Blob, но НЕ умеет отвечать на
//     Range-запросы (частичный контент, код 206) сам — это должен делать
//     перехватчик fetch внутри SW. На iOS Safari `<audio>`/`<video>`,
//     запрошенные из Cache API без такого перехватчика, ведут себя
//     непредсказуемо: где-то не сикается, где-то не проигрывается вовсе.
//   - IndexedDB хранит Blob как есть. Из него делается `URL.createObjectURL`
//     — обычный blob-URL, а браузер сам умеет отдавать по нему произвольный
//     `seek`/Range без единого сетевого запроса, потому что это уже не сеть.
//     Для аудио/видео в баре без интернета годится только этот вариант.
//
// ВАЖНО (см. CLAUDE.md/HANDOFF): не упрощай это обратно в Cache API — уже
// разбирались, почему это не работает на iOS.

const DB_NAME = 'qp-cache'
const DB_VERSION = 1
const STORE_PACKS = 'packs'
const STORE_MEDIA = 'media'
const STORE_META = 'meta'

export interface CachedPackEntry<TPack = unknown> {
  pack: TPack
  savedAt: number
  version: number
}

export interface CachedMediaEntry {
  blob: Blob
  type: string
  size: number
  savedAt: number
}

let dbPromise: Promise<IDBDatabase> | null = null

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('IndexedDB недоступен в этом браузере')); return }
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_PACKS)) db.createObjectStore(STORE_PACKS)
      if (!db.objectStoreNames.contains(STORE_MEDIA)) db.createObjectStore(STORE_MEDIA)
      if (!db.objectStoreNames.contains(STORE_META)) db.createObjectStore(STORE_META)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error ?? new Error('не удалось открыть IndexedDB'))
  })
}

function getDb(): Promise<IDBDatabase> {
  if (!dbPromise) dbPromise = openDb()
  return dbPromise
}

async function withStore<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await getDb()
  return new Promise<T>((resolve, reject) => {
    const t = db.transaction(store, mode)
    let result: T
    const req = fn(t.objectStore(store))
    req.onsuccess = () => { result = req.result }
    req.onerror = () => reject(req.error ?? new Error(`${store}: операция не выполнена`))
    t.oncomplete = () => resolve(result)
    t.onerror = () => reject(t.error ?? new Error(`${store}: транзакция не выполнена`))
  })
}

/** Сохранить весь JSON пакета целиком. */
export async function savePack<TPack>(packId: string, pack: TPack): Promise<void> {
  const entry: CachedPackEntry<TPack> = { pack, savedAt: Date.now(), version: 1 }
  await withStore(STORE_PACKS, 'readwrite', s => s.put(entry, packId))
}

/** Прочитать пакет из офлайн-кеша. `null`, если его там нет. */
export async function readPack<TPack>(packId: string): Promise<TPack | null> {
  const entry = await withStore<CachedPackEntry<TPack> | undefined>(STORE_PACKS, 'readonly', s => s.get(packId))
  return entry?.pack ?? null
}

/** Стереть пакет и служебные записи по нему (медиа НЕ трогает — оно общее по путям). */
export async function clearPack(packId: string): Promise<void> {
  await withStore(STORE_PACKS, 'readwrite', s => s.delete(packId))
  await withStore(STORE_META, 'readwrite', s => s.delete(packId))
}

/** Сохранить один медиа-файл по его пути в хранилище. */
export async function saveMedia(path: string, blob: Blob, type: string): Promise<void> {
  const entry: CachedMediaEntry = { blob, type, size: blob.size, savedAt: Date.now() }
  await withStore(STORE_MEDIA, 'readwrite', s => s.put(entry, path))
}

/** Прочитать блоб медиа-файла. `null`, если не скачан. */
export async function readMedia(path: string): Promise<Blob | null> {
  const entry = await withStore<CachedMediaEntry | undefined>(STORE_MEDIA, 'readonly', s => s.get(path))
  return entry?.blob ?? null
}

/** Есть ли файл уже в офлайн-кеше — без чтения самого блоба. */
export async function hasMedia(path: string): Promise<boolean> {
  const key = await withStore<IDBValidKey | undefined>(STORE_MEDIA, 'readonly', s => s.getKey(path))
  return key !== undefined
}

/** Пути медиа этого пакета, которые уже лежат в кеше (по префиксу `pack-<id>/`). */
export async function listMediaPaths(packId: string): Promise<string[]> {
  const db = await getDb()
  return new Promise<string[]>((resolve, reject) => {
    const t = db.transaction(STORE_MEDIA, 'readonly')
    const s = t.objectStore(STORE_MEDIA)
    const prefix = `pack-${packId}/`
    const out: string[] = []
    const cursorReq = s.openKeyCursor()
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result
      if (!cursor) return
      const key = String(cursor.key)
      if (key.startsWith(prefix)) out.push(key)
      cursor.continue()
    }
    cursorReq.onerror = () => reject(cursorReq.error ?? new Error('не удалось перечислить медиа'))
    t.oncomplete = () => resolve(out)
    t.onerror = () => reject(t.error ?? new Error('транзакция не выполнена'))
  })
}

/** Занятое место / квота браузера (для «хватит ли места на пакет»). */
export async function estimateSize(): Promise<{ usage: number; quota: number }> {
  if (!navigator.storage?.estimate) return { usage: 0, quota: 0 }
  const { usage, quota } = await navigator.storage.estimate()
  return { usage: usage ?? 0, quota: quota ?? 0 }
}

/** Произвольный служебный ключ — прогресс/статистика докачки по пакету. */
export async function saveMeta<T>(key: string, value: T): Promise<void> {
  await withStore(STORE_META, 'readwrite', s => s.put(value, key))
}

export async function readMeta<T>(key: string): Promise<T | null> {
  const v = await withStore<T | undefined>(STORE_META, 'readonly', s => s.get(key))
  return v ?? null
}
