// ═══ КАКИЕ ФАЙЛЫ ПАКЕТ РЕАЛЬНО ИСПОЛЬЗУЕТ ═══
// Отдельный модуль без зависимостей — чтобы можно было покрыть тестами,
// не поднимая клиент Supabase. Ошибка здесь стоит дорого: по этому списку
// кнопка уборки решает, какие файлы удалить.

export type PackLike = {
  id: string
  settings?: unknown
  rounds: { settings?: unknown; rules_audio?: string | null; questions: { media?: unknown }[] }[]
}

export function collectUsedPaths(pack: PackLike): Set<string> {
  const used = new Set<string>()
  // путь к медиа выглядит как pack-<uuid>/<время>-<имя>.<расширение>
  const looksLikeMedia = (v: string) =>
    /^pack-[^/]+\/.+/.test(v) || /\.(mp3|wav|m4a|ogg|opus|flac|mp4|webm|png|jpe?g|webp|gif|avif)$/i.test(v)

  const walk = (v: unknown, depth = 0) => {
    if (depth > 12 || v == null) return
    if (typeof v === 'string') { if (looksLikeMedia(v)) used.add(v); return }
    if (Array.isArray(v)) { v.forEach(x => walk(x, depth + 1)); return }
    if (typeof v === 'object') {
      for (const x of Object.values(v as Record<string, unknown>)) walk(x, depth + 1)
    }
  }

  walk(pack.settings)
  for (const r of pack.rounds) {
    walk(r.rules_audio)
    walk(r.settings)          // сюда попадают темы «Своей игры» и мелодии
    for (const q of r.questions) walk(q.media)
  }
  return used
}

