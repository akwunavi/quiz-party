// ═══ Чистые хелперы по раунду/пакету — БЕЗ сети ═══
// Вынесены из packLoader.ts (9.43): тот безусловно импортирует ./supabase
// (loadPack — сетевой), а эти четыре функции чистые и нужны местам, которым
// сеть категорически не нужна — например, слою А pptxExport.ts (билд плана
// слайдов документирован как «без сети, без побочных эффектов», а рантайм-
// импорт из packLoader.ts тянул бы за собой инициализацию supabase-клиента,
// которая падает без env-переменных — именно это и обнаружилось в тестах).
// packLoader.ts реэкспортирует эти же функции, поэтому существующие импорты
// из '../lib/packLoader' (HostScreen.tsx/PlayerPage.tsx/AdminPage.tsx/
// RoundScreen.tsx) не трогаем и не переписываем.
import type { Pack, RoundBase, Question } from '../types/quiz'

export interface LoadedRound extends RoundBase {
  questions: Question[]
}
export interface LoadedPack extends Pack {
  rounds: LoadedRound[]
}

/** Значение настройки раунда с фолбэком на общие настройки пакета. */
export function roundSetting<T>(pack: LoadedPack, round: LoadedRound, key: string, fallback: T): T {
  const rs = round.settings as Record<string, unknown>
  if (rs[key] !== undefined && rs[key] !== null) return rs[key] as T
  const ps = (pack.settings ?? {}) as Record<string, unknown>
  if (ps[key] !== undefined && ps[key] !== null) return ps[key] as T
  return fallback
}

/** Раунды, участвующие в зачёте (для табло/финала). */
export function scoredRounds(pack: LoadedPack): LoadedRound[] {
  return pack.rounds.filter(r => !r.off_scoreboard)
}

/** Автогенерация metaLine: «10 ВОПРОСОВ · 30 СЕК · 1 БАЛЛ» */
export function metaLine(round: LoadedRound): string {
  if (round.meta_line_override) return round.meta_line_override
  if (round.mechanic === 'melody') {
    const themes = (round.settings as { themes?: { tracks: unknown[] }[] }).themes ?? []
    const tracks = themes.reduce((s, t) => s + t.tracks.length, 0)
    return `${themes.length} ТЕМ · ${tracks} ТРЕКОВ · СТАВКА СЕКУНДАМИ`
  }
  if (round.mechanic === 'jeopardy') {
    const themes = (round.settings as { themes?: { tiles: unknown[] }[] }).themes ?? []
    const tiles = themes.reduce((s, t) => s + t.tiles.length, 0)
    return `${themes.length} ТЕМ · ${tiles} ПЛИТОК · ЦЕНА = БАЛЛЫ`
  }
  if (round.mechanic === 'sprint') {
    const s = round.settings as { pointsPerQuestion?: number; allCorrectBonus?: number }
    const n = round.questions.filter(q => !q.hidden).length
    return `${n} ВОПРОСОВ · ${round.timer_seconds} СЕК · ${s.pointsPerQuestion ?? 2} БАЛЛА · +${s.allCorrectBonus ?? 5} ЗА ВСЕ`
  }
  const n = round.questions.filter(q => !q.hidden).length
  const parts = [`${n} ВОПРОС${n % 10 === 1 && n % 100 !== 11 ? '' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'А' : 'ОВ'}`,
    `${round.timer_seconds} СЕК`]
  const s = round.settings as Record<string, unknown>
  if (round.mechanic === 'stakes_unique' || round.mechanic === 'stakes_free') {
    const vals = (s.stakesValues as number[] | undefined) ?? []
    parts.push(`СТАВКИ ${Math.min(...vals)}–${Math.max(...vals)}`)
  } else if (round.mechanic === 'test_stop') {
    parts.push('СТОП ПОСЛЕ ОШИБКИ')
  } else if (round.mechanic === 'thematic_x2') {
    parts.push('×2 ЗА ТЕМУ')
  } else {
    parts.push(`${(s.pointsPerQuestion as number | undefined) ?? 1} БАЛЛ`)
  }
  return parts.join(' · ')
}

/** Видимый номер раунда: зачётные нумеруются с 1, вне зачёта — 0 (разогрев).
 *  ОДНА функция для проектора, игрока и админки — иначе рассинхрон. */
export function displayRoundNumber(pack: LoadedPack, idx: number): string {
  const r = pack.rounds[idx]
  if (!r) return String(idx)
  if (r.off_scoreboard) return '0'
  let n = 0
  for (let i = 0; i <= idx; i++) if (!pack.rounds[i].off_scoreboard) n++
  return String(n)
}
