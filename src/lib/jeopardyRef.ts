// ═══ Ключ ответа на плитку «Своей игры» ═══
//
// Ответы лежат в таблице `answers`, где уникальность — по паре
// (team_id, question_ref). Ключ раньше выглядел как `q-t<плитка>`, БЕЗ номера
// раунда: пока раунд «Своей игры» в паке один, всё сходилось, но два таких
// раунда начали бы перетирать ответы друг друга — команда отвечает на плитку
// №3 во втором раунде, и запись ложится поверх ответа из первого. Молча:
// ошибки не будет, просто в зачёте появятся чужие баллы.
//
// Новый ключ — `q-t<раунд>-<плитка>`. Старый формат ЧИТАЕТСЯ по-прежнему,
// иначе уже сыгранные игры потеряли бы свои ответы.
//
// Номер плитки — сквозной по раунду: темы слева направо, внутри темы сверху
// вниз. Так его считают и проектор, и телефон игрока.

/** Ключ для записи нового ответа. */
export function jeopardyRef(roundNumber: number, tile: number): string {
  return `q-t${roundNumber}-${tile}`
}

// ── Состояние ОТКРЫТОЙ плитки (8.86) ────────────────────────────────────
// До 8.86 «какая плитка открыта» и «показан ли ответ» жили в useState вкладки
// проектора: пульт ведущего в телефоне об этом не знал вообще и управлять
// плиткой не мог. Теперь состояние общее (game_sessions.melody.jp — тот же
// jsonb-мешок механик, где уже живут скачки, миграция не нужна), а переходы —
// чистые функции ниже, одни на проектор и на пульт.
import type { MelodyState } from '../types/quiz'

/** Сквозной номер открытой плитки, или null — плитка закрыта. */
export function jpOpenTile(m: MelodyState | undefined): number | null {
  const t = m?.jp?.tile
  return typeof t === 'number' ? t : null
}

/** Открыть плитку: ответ ещё не показан, трек начинает играть заново. */
export function jpOpen(m: MelodyState, tile: number): MelodyState {
  return { ...m, jp: { tile, answer: false, replay: (m.jp?.replay ?? 0) + 1 } }
}

/** Закрыть плитку — назад к доске. */
export function jpClose(m: MelodyState): MelodyState {
  return { ...m, jp: { tile: null, answer: false, replay: m.jp?.replay ?? 0 } }
}

/** «Показать ответ»: зал видит правильный ответ и сами ответы команд. */
export function jpShowAnswer(m: MelodyState): MelodyState {
  return { ...m, jp: { ...m.jp, answer: true } }
}

/** «Переслушать»: не состояние, а событие — считаем нажатия, любое изменение
 *  числа проектор понимает как «запусти трек с начала ещё раз». */
export function jpReplay(m: MelodyState): MelodyState {
  return { ...m, jp: { ...m.jp, replay: (m.jp?.replay ?? 0) + 1 } }
}

/** Сквозной номер → (тема, плитка). Пульт ведущего и телефон знают только
 *  сквозной номер, а темы/плитки лежат в настройках раунда — разбор один на
 *  всех, чтобы номера тем не разъехались между экранами. */
export function jpLocate<T>(themes: { tiles: T[] }[], flat: number):
{ ti: number; i: number; tile: T; key: string } | null {
  if (!Number.isInteger(flat) || flat < 0) return null
  let rest = flat
  for (let ti = 0; ti < themes.length; ti++) {
    if (rest < themes[ti].tiles.length) {
      return { ti, i: rest, tile: themes[ti].tiles[rest], key: `${ti}-${rest}` }
    }
    rest -= themes[ti].tiles.length
  }
  return null
}

/** Номер плитки из ключа, или null, если ключ не про этот раунд.
 *  Старый формат (`q-t<плитка>`) считается принадлежащим любому раунду:
 *  номера раунда в нём нет, а отбор по колонке round_number всё равно идёт
 *  снаружи — так читаются игры, сыгранные до перехода на новый ключ. */
export function jeopardyTile(ref: string, roundNumber: number): number | null {
  const withRound = /^q-t(\d+)-(\d+)$/.exec(ref)
  if (withRound) return Number(withRound[1]) === roundNumber ? Number(withRound[2]) : null
  const legacy = /^q-t(\d+)$/.exec(ref)
  return legacy ? Number(legacy[1]) : null
}
