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
