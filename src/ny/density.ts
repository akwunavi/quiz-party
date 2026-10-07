// Какая «дальность» декора у новогодних тем на каком экране игры (макеты: плотность
// экрана — чем больше игры, тем меньше леса/комнаты). Чистая функция, без сети.
import type { Density } from './types'

export type NyThemeKey = 'ny_book' | 'ny_home'
export const isNyTheme = (t: string | undefined | null): t is NyThemeKey => t === 'ny_book' || t === 'ny_home'

/** phase — gameState.phase; plain — вопрос без картинок и вариантов (самый пустой экран). */
export function nyDensity(theme: NyThemeKey, phase: string | undefined, plain = false): Density {
  switch (phase) {
    case 'lobby': return 'sparse'
    // экраны без макета (HANDOFF §3cl): заставка, перерыв, подсчёт, табло, финал, слайды — «средние»
    case 'intro': case 'round_intro': case 'info': case 'break': case 'counting':
    case 'scoreboard': case 'finale': case 'recap':
      return 'medium'
    case 'question': return plain ? (theme === 'ny_book' ? 'sparse' : 'medium') : 'dense'
    default: return 'dense'
  }
}

/** Механики со своим экраном вопроса — «пустым» текстовым вопросом не считаются. */
const OWN_SCREEN = new Set(['blitz', 'melody', 'jeopardy', 'sprint', 'race', 'four_pics', 'anagram', 'crossword'])

/** Вопрос без картинок и вариантов — текст в одной большой рамке (только свободный ответ
 *  в «обычной» механике; у механик со своим экраном — своя плотность, ревью 9.90). */
export function isPlainQuestion(
  q: { media?: { question?: string[] }; answer?: { mode?: string } } | undefined,
  mechanic?: string,
): boolean {
  if (!q) return false
  if (mechanic && OWN_SCREEN.has(mechanic)) return false
  const imgs = (q.media?.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  return imgs.length === 0 && q.answer?.mode === 'free_text'
}
