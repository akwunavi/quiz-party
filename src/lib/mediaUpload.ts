// ═══ Загрузка медиа в Supabase Storage (bucket quiz-media) ═══
import { supabase } from './supabase'
import { compressImage } from './imageCompress'

/** Возвращает путь внутри бакета (его храним в question.media). */
export const MAX_AUDIO_MB = 5
export const MAX_VIDEO_MB = 20
export const MAX_IMAGE_MB = 3

export async function uploadMedia(packId: string, file: File): Promise<string> {
  const isAudio = /^audio\//.test(file.type)
  const isVideo = /^video\//.test(file.type)
  const isAV = isAudio || isVideo
  const limitMb = isAudio ? MAX_AUDIO_MB : isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB
  if (file.size > limitMb * 1024 * 1024) {
    throw new Error(`Файл ${(file.size / 1048576).toFixed(1)} МБ — больше лимита ${limitMb} МБ. `
      + (isAV ? 'Сожми аудио (128 kbps) или обрежь фрагмент.' : 'Уменьши изображение.'))
  }
  const prepared = await compressImage(file)
  const safe = prepared.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `pack-${packId}/${Date.now()}-${safe}`
  const { error } = await supabase.storage.from('quiz-media')
    .upload(path, prepared, { upsert: false })
  if (error) throw error
  return path
}

export async function mediaExists(path: string): Promise<boolean> {
  if (/^https?:\/\//.test(path)) return true      // внешние ссылки не проверяем
  const dir = path.split('/').slice(0, -1).join('/')
  const name = path.split('/').pop()!
  const { data, error } = await supabase.storage.from('quiz-media')
    .list(dir, { search: name })
  if (error) return false
  return (data ?? []).some(f => f.name === name)
}


/** Суммарный объём медиа пакета в мегабайтах. */
export async function packMediaSize(packId: string): Promise<number> {
  const { data, error } = await supabase.storage.from('quiz-media')
    .list(`pack-${packId}`, { limit: 1000 })
  if (error) throw error
  const bytes = (data ?? []).reduce((s, f) =>
    s + Number((f.metadata as { size?: number } | null)?.size ?? 0), 0)
  return Math.round(bytes / 1048576 * 10) / 10
}

// ═══ УБОРКА ОСИРОТЕВШИХ ФАЙЛОВ ═══
// Удаление вопроса стирает строку в базе, но ФАЙЛ в хранилище остаётся:
// Supabase не знает, что на него больше никто не ссылается. За несколько
// пакетов так набегают десятки мегабайт мусора, а место в хранилище конечно.

/** Все пути к медиа, на которые ссылается пакет (вопросы, раунды, сам пакет). */
/** Все пути к медиа, на которые ссылается пакет.
 *
 *  ВАЖНО: обходим структуру ЦЕЛИКОМ, а не по списку известных полей.
 *  Прежняя версия перечисляла поля вручную (bg_music, media.question…) и
 *  не знала про треки «Своей игры», которые лежат в
 *  settings.themes[].tiles[].audio — из-за чего уборка считала их мусором
 *  и удаляла. Рекурсивный обход не сломается при добавлении новых полей. */
import { collectUsedPaths, type PackLike } from './usedPaths'

export type Orphan = { path: string; size: number }

/** Найти файлы пакета, на которые никто не ссылается. Ничего не удаляет. */
export async function findOrphans(pack: PackLike) {
  const { data, error } = await supabase.storage.from('quiz-media')
    .list(`pack-${pack.id}`, { limit: 1000 })
  if (error) throw error
  const used = collectUsedPaths(pack)
  const orphans: Orphan[] = []
  for (const f of data ?? []) {
    const full = `pack-${pack.id}/${f.name}`
    if (!used.has(full)) {
      orphans.push({ path: full, size: (f.metadata?.size as number) ?? 0 })
    }
  }
  return orphans
}

/** Удалить найденные файлы. Действие необратимо. */
export async function deleteOrphans(orphans: Orphan[]) {
  if (orphans.length === 0) return
  const { error } = await supabase.storage.from('quiz-media')
    .remove(orphans.map(o => o.path))
  if (error) throw error
}

/** Публичные ссылки на все медиа пакета — для выгрузки перед чисткой. */
export async function mediaLinks(pack: PackLike) {
  const { data } = await supabase.storage.from('quiz-media')
    .list(`pack-${pack.id}`, { limit: 1000 })
  return (data ?? []).map(f => {
    const path = `pack-${pack.id}/${f.name}`
    return { path, url: supabase.storage.from('quiz-media').getPublicUrl(path).data.publicUrl }
  })
}

/** Ссылки пакета, для которых В ХРАНИЛИЩЕ НЕТ ФАЙЛА.
 *  Обратная задача к поиску мусора: там ищем файлы без ссылок, здесь —
 *  ссылки без файлов. Именно так выглядит «звук пропал»: путь в базе есть,
 *  плеер по нему стучится, а Supabase отвечает «объект не найден». */
export async function findMissing(pack: PackLike) {
  const { data } = await supabase.storage.from('quiz-media')
    .list(`pack-${pack.id}`, { limit: 1000 })
  const present = new Set((data ?? []).map(f => `pack-${pack.id}/${f.name}`))
  const used = [...collectUsedPaths(pack)]
  // чужие пакеты (например, вопрос взят из банка) не проверяем: их файлы
  // лежат в другой папке и здесь их видно не будет
  return used.filter(p => p.startsWith(`pack-${pack.id}/`) && !present.has(p))
}
