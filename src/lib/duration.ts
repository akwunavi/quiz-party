// ═══ ОЦЕНКА ДЛИТЕЛЬНОСТИ РАУНДА И ПАКЕТА ═══
// Отдельный модуль без зависимостей: его можно тестировать, не поднимая
// клиент Supabase.
import type { MechanicKey, JeopardySettings, MelodySettings } from '../types/quiz'

/** Раунд для оценки времени: только то, что реально нужно формуле,
 *  не полный RoundBase — так функцию проще тестировать и переиспользовать. */
export interface DurationRound {
  mechanic?: MechanicKey
  questions: { hidden?: boolean }[]
  timer_seconds: number
  answers_reveal?: string
  settings?: unknown
}

/** Оценка длительности раунда в минутах: таймер + разбор + вступление.
 *
 *  ВАЖНО: формула зависит от механики. Раньше была одна формула
 *  «N вопросов × время на вопрос» для всех механик разом — она неверна
 *  сразу для трёх:
 *   - jeopardy и melody хранят контент не в round.questions (там пусто),
 *     а в round.settings.themes[].tiles/tracks — старая формула возвращала 0;
 *   - blitz: round.questions — это БАНК вопросов на весь раунд (десятки
 *     штук), а не то, сколько реально прозвучит за игру: реально раунд идёт,
 *     пока каждая команда не отходит свой круг по teamSeconds.
 *  См. HANDOFF.md — разбор бага при версии 8.50. */
export function estimateRoundMinutes(round: DurationRound, teamCount?: number): number {
  const intro = 40 // заставка и правила
  const mechanic = round.mechanic ?? 'standard'

  if (mechanic === 'race') {
    const s = (round.settings ?? {}) as { betSec?: number; raceSec?: number }
    const seconds = intro + (s.betSec ?? 30) + (s.raceSec ?? 18)
    return Math.max(1, Math.round(seconds / 60))
  }

  if (mechanic === 'jeopardy') {
    const s = (round.settings ?? {}) as JeopardySettings
    const tilesCount = (s.themes ?? []).reduce((sum, t) => sum + (t.tiles?.length ?? 0), 0)
    if (tilesCount === 0) return 0
    const timer = round.timer_seconds || 45
    const seconds = intro + tilesCount * (timer + 18) // 18 — открытие плитки/проверка
    return Math.max(1, Math.round(seconds / 60))
  }

  if (mechanic === 'melody') {
    const s = (round.settings ?? {}) as MelodySettings
    const tracksCount = (s.themes ?? []).reduce((sum, t) => sum + (t.tracks?.length ?? 0), 0)
    if (tracksCount === 0) return 0
    // Длина самого отрывка нигде не хранится (это mp3, редактор её не знает) —
    // 25 сек это ОЦЕНКА типичного фрагмента, не точное число.
    const snippetSec = 25
    const perTrack = (s.spinSec ?? 5) + (s.bidSec ?? 10) + (s.answerSec ?? 30) + snippetSec
    const seconds = intro + tracksCount * perTrack
    return Math.max(1, Math.round(seconds / 60))
  }

  if (mechanic === 'blitz') {
    const s = (round.settings ?? {}) as { teamSeconds?: number }
    // Число команд функция может не знать (вызов из редактора, где игры ещё
    // нет) — дефолт 6, см. HANDOFF.md §3g: «в живых играх 6 команд максимум».
    const seconds = intro + (teamCount ?? 6) * (s.teamSeconds ?? 60)
    return Math.max(1, Math.round(seconds / 60))
  }

  // standard, test_stop, rebus, stakes_unique, stakes_free, thematic_x2,
  // crossword, sprint — старая формула для них верна.
  const n = round.questions.filter(q => !q.hidden).length
  if (n === 0) return 0
  const timer = round.timer_seconds || 45
  const reveal = round.answers_reveal === 'never' ? 0
    : round.answers_reveal === 'after_round' ? 12 : 10   // сек на разбор одного
  const answerTime = round.answers_reveal === 'after_round' ? 60 : 0  // «время ответов»
  const seconds = intro + answerTime + n * (timer + 8 + reveal)  // +8 — переход/чтение
  return Math.max(1, Math.round(seconds / 60))
}

/** Раунд для сводной статистики пакета: минимум того, что нужно для подсчёта. */
export interface RoundLike extends DurationRound {
  id?: string
  mechanic: MechanicKey
  off_scoreboard?: boolean
}

export interface PackStats {
  roundsCount: number
  questionsCount: number
  hasMiniGame: boolean      // есть хотя бы один раунд mechanic === 'race'
  musicTracks: number       // всего аудио-дорожек в jeopardy-плитках + melody-треках
  totalMinutes: number      // оценка длительности всей игры
}

/** Статистика пакета для слайда-брифинга: сколько раундов, вопросов, есть ли
 *  мини-игра, сколько музыкальных дорожек и сколько примерно займёт игра.
 *  teamCount — реальное число команд, известно только на проекторе (в
 *  редакторе игры ещё нет, там сработает дефолт внутри estimateRoundMinutes). */
export function packStats(pack: { rounds: RoundLike[] }, teamCount?: number): PackStats {
  const rounds = pack.rounds
  const roundsCount = rounds.length

  // jeopardy и melody не хранят вопросы в round.questions — их учитывать
  // здесь нельзя, иначе число вопросов будет врать (0 или мусор).
  const questionsCount = rounds
    .filter(r => r.mechanic !== 'race' && r.mechanic !== 'jeopardy' && r.mechanic !== 'melody')
    .reduce((sum, r) => sum + r.questions.filter(q => !q.hidden).length, 0)

  const hasMiniGame = rounds.some(r => r.mechanic === 'race')

  const musicTracks = rounds.reduce((sum, r) => {
    if (r.mechanic === 'jeopardy') {
      const s = (r.settings ?? {}) as JeopardySettings
      return sum + (s.themes ?? []).reduce((t, th) => t + (th.tiles?.length ?? 0), 0)
    }
    if (r.mechanic === 'melody') {
      const s = (r.settings ?? {}) as MelodySettings
      return sum + (s.themes ?? []).reduce((t, th) => t + (th.tracks?.length ?? 0), 0)
    }
    return sum
  }, 0)

  const roundsMinutes = rounds.reduce((sum, r) => sum + estimateRoundMinutes(r, teamCount), 0)
  const breaksMinutes = rounds.reduce((sum, r) =>
    sum + ((r.settings as { break_after_minutes?: number } | undefined)?.break_after_minutes ?? 0), 0)
  const totalMinutes = Math.round(roundsMinutes + breaksMinutes)

  return { roundsCount, questionsCount, hasMiniGame, musicTracks, totalMinutes }
}
