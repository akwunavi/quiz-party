// ═══ Мелочи, общие для проектора, редактора и раундов ═══
//
// Обе функции лежали в HostScreen.tsx, и любой файл, которому нужен был
// адрес картинки, тянул за собой весь проектор (2400 строк). После разреза
// бандла по экранам это означало бы, что редактор скачивает проектор целиком
// ради одной строки. Здесь — чистые функции без React и без Supabase.

import { readMedia } from './packCache'
import { isLocalMode } from './transport/mode'

/** Абсолютный адрес файла в хранилище.
 *  Ссылка, начинающаяся с http, уходит как есть: так работает медиа,
 *  положенное в `public/` репозитория вместо Supabase. */
export function mediaUrl(path: string): string {
  // Офлайн-предзагрузка (шаг 5 плана офлайн-устойчивости, Part A): если
  // файл уже скачан в IndexedDB и его blob-URL прогрет через `primeMedia`,
  // отдаём его — проектор не ждёт сеть за каждой картинкой/треком раунда.
  // Пустая карта = сегодняшнее поведение не меняется.
  const hit = blobs.get(path)
  if (hit) return hit
  return mediaUrlNetwork(path)
}

// ═══ Прогретые blob-URL для текущего/следующего раунда ═══
// НЕ держим blob-URL на весь пакет одновременно всю игру — это сотни
// мегабайт в памяти проектора на весь вечер. `primeMedia` вызывается на
// границе раунда (текущий + следующий), `releaseMedia` — при выходе из
// раунда. См. HostScreen.tsx: usePreloadNext / usePrimeRoundMedia.
const blobs = new Map<string, string>()

/** Скачать файл (или взять уже прогретый Supabase-запрос) единым способом.
 *  Общая часть для `packPreload.ts` (докачка в IndexedDB) и
 *  `audioSource.toBlobUrl` (запасной путь для звука) — раньше каждый писал
 *  свой fetch с разбором ответа, теперь один источник правды. */
export async function fetchMediaBlob(path: string): Promise<Blob> {
  const url = mediaUrlNetwork(path)
  const res = await fetch(url, { mode: 'cors', credentials: 'omit' })
  if (!res.ok) {
    // Supabase на отсутствующий объект отвечает коротким JSON — отличаем
    // «файла нет» от «сеть заблокировала», это разные починки (см. audioSource.ts).
    const body = await res.text().catch(() => '')
    if (/not_found|Object not found/i.test(body) || res.status === 404 || res.status === 400) {
      throw new Error('ФАЙЛА НЕТ В ХРАНИЛИЩЕ')
    }
    throw new Error(`сервер ответил ${res.status}`)
  }
  return res.blob()
}

/** Сетевой адрес файла, ИГНОРИРУЯ прогретый blob-URL (для скачивания в кеш).
 *  В локальном режиме (шаг 6 плана офлайн-устойчивости, Part B) медиа лежит
 *  не в Supabase Storage, а на диске локального сервера бара — раздаётся
 *  им же, с того же origin, под `/api/media/*` (с поддержкой Range —
 *  важно для `<audio>`/`<video>` на iOS Safari, см. server.mjs). */
function mediaUrlNetwork(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const safe = path.replace(/^\//, '').split('/').map(encodeURIComponent).join('/')
  if (isLocalMode()) return `/api/media/${safe}`
  const base = import.meta.env.VITE_SUPABASE_URL
  return `${base}/storage/v1/object/public/quiz-media/${safe}`
}

/** Прогреть blob-URL для списка путей: читает блобы из IndexedDB (то, что
 *  уже скачано «Скачать пакет для офлайна»), создаёт `URL.createObjectURL`
 *  и кладёт в карту. Пути, которых нет в кеше, молча пропускаются — тогда
 *  `mediaUrl` вернётся к обычному сетевому адресу (как раньше). */
export async function primeMedia(paths: string[]): Promise<void> {
  await Promise.all(paths.map(async p => {
    if (blobs.has(p)) return
    try {
      const blob = await readMedia(p)
      if (blob) blobs.set(p, URL.createObjectURL(blob))
    } catch { /* IndexedDB недоступен — просто не прогреваем, сеть подхватит */ }
  }))
}

/** Освободить blob-URL для списка путей: `URL.revokeObjectURL` + чистка карты.
 *  ЛОВУШКА: не вызывай во время игры трека — `revokeObjectURL` в момент,
 *  когда `<audio>` ещё играет, обрывает звук. Вызывать только при реальном
 *  выходе из раунда, не раньше. */
export function releaseMedia(paths: string[]): void {
  for (const p of paths) {
    const url = blobs.get(p)
    if (url) { URL.revokeObjectURL(url); blobs.delete(p) }
  }
}

/** Ступень кегля для текста вопроса: чем длиннее, тем мельче. */
export function lenClass(text: string): string {
  const n = (text ?? '').trim().length
  if (n <= 70) return ''
  if (n <= 140) return ' len-m'
  if (n <= 240) return ' len-l'
  return ' len-xl'
}
