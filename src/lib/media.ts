// ═══ Мелочи, общие для проектора, редактора и раундов ═══
//
// Обе функции лежали в HostScreen.tsx, и любой файл, которому нужен был
// адрес картинки, тянул за собой весь проектор (2400 строк). После разреза
// бандла по экранам это означало бы, что редактор скачивает проектор целиком
// ради одной строки. Здесь — чистые функции без React и без Supabase.

/** Абсолютный адрес файла в хранилище.
 *  Ссылка, начинающаяся с http, уходит как есть: так работает медиа,
 *  положенное в `public/` репозитория вместо Supabase. */
export function mediaUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const base = import.meta.env.VITE_SUPABASE_URL
  // Путь ОБЯЗАН быть закодирован. В именах файлов встречаются пробелы
  // («song r7 9 1 .mp3»), а ссылка с пробелами невалидна: браузер её
  // «чинит» по-своему, и запрос падает с невнятной ошибкой безопасности.
  // Кодируем каждый сегмент отдельно, чтобы не съесть разделители «/».
  const safe = path.replace(/^\//, '').split('/').map(encodeURIComponent).join('/')
  return `${base}/storage/v1/object/public/quiz-media/${safe}`
}

/** Ступень кегля для текста вопроса: чем длиннее, тем мельче. */
export function lenClass(text: string): string {
  const n = (text ?? '').trim().length
  if (n <= 70) return ''
  if (n <= 140) return ' len-m'
  if (n <= 240) return ' len-l'
  return ' len-xl'
}
