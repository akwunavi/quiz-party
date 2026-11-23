// ═══ ЗНАЧОК КОМАНДЫ: эмодзи → файл SVG (Twemoji) ═══
// Раньше значок рисовался как ТЕКСТ — шрифтом устройства: на iPhone это Apple,
// на проекторе (Chrome/Windows/Android TV) Noto/Segoe — тот же символ выглядел
// по-разному, а в шрифте темы «Книга» вообще подменялся. Теперь все
// предлагаемые значки лежат в public/emoji/ картинками, и везде рисуется ОДИН
// и тот же файл. В БД по-прежнему лежит сам символ (teams.icon) — миграция не нужна.
// Значок вне списка (старая запись) рисуется текстом, как раньше.
import { TEAM_EMOJI_GROUPS } from './teamEmoji'

const KNOWN = new Set(TEAM_EMOJI_GROUPS.flatMap(g => g.items))

/** Имя файла в public/emoji/ (кодовые точки через «-», без FE0F) или null, если значка нет в наборе. */
export function teamIconFile(icon: string | null | undefined): string | null {
  if (!icon || !KNOWN.has(icon)) return null
  return [...icon].map(c => c.codePointAt(0)!.toString(16)).filter(c => c !== 'fe0f').join('-') + '.svg'
}

/** Адрес картинки значка от base (import.meta.env.BASE_URL) или null. */
export function teamIconUrl(base: string, icon: string | null | undefined): string | null {
  const f = teamIconFile(icon)
  return f ? `${base}emoji/${f}` : null
}
