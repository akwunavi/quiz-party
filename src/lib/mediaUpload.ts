// ═══ Загрузка медиа в Supabase Storage (bucket quiz-media) ═══
import { supabase } from './supabase'
import { compressImage } from './imageCompress'

/** Возвращает путь внутри бакета (его храним в question.media). */
export async function uploadMedia(packId: string, file: File): Promise<string> {
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
