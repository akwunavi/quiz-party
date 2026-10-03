// ═══ Какие поля вопроса показывать для каждой механики ═══
//
// Правило простое: если поле в механике НЕ работает, его не должно быть на
// экране — иначе редактор заполняет его и удивляется, что на игре ничего не
// изменилось. Обратное так же верно: если поле работает, прятать его нельзя.
//
// Раскладка вынесена из формы отдельным модулем ради тестов. Раньше она жила
// прямо в JSX, и кроссворду по недосмотру запрещались медиа вопроса и
// озвучка — хотя проектор для кроссворда рисует ОБЫЧНЫЙ экран вопроса
// (особый у него только титул раунда с сеткой) и оба поля отрабатывает.
import type { AnswerSpec, MechanicKey } from '../types/quiz'

export interface QuestionFields {
  /** тип ответа задан механикой и не выбирается руками */
  fixedMode: boolean
  /** слот медиа вопроса (картинки, видео, звук) */
  questionMedia: boolean
  /** слот отдельной озвучки вопроса */
  voice: boolean
  mediaLabel: string
  mediaMax: number
  mediaAccept?: string
}

/** `mode` — тип ответа вопроса: у сопоставления пар бывает до шести
 *  (9.76), и картинок к нему — столько же, по одной на пару. */
export function questionFields(mech: MechanicKey, mode?: AnswerSpec['mode']): QuestionFields {
  // Мелодия: вопрос — это сам трек, поэтому слот один и только звук, а
  // отдельная озвучка поверх трека не играет.
  if (mech === 'melody') return {
    fixedMode: true, questionMedia: true, voice: false,
    mediaLabel: 'Трек (mp3)', mediaMax: 1, mediaAccept: 'audio/*',
  }
  // Ребус: ровно две картинки, из которых складывается слово.
  if (mech === 'rebus') return {
    fixedMode: false, questionMedia: true, voice: true,
    mediaLabel: 'Две картинки ребуса', mediaMax: 2,
  }
  // Кроссворд: тип ответа задан (слово в сетку), а медиа и озвучка —
  // обычные. Определение можно сопроводить картинкой или начитать голосом.
  if (mech === 'crossword') return {
    fixedMode: true, questionMedia: true, voice: true,
    mediaLabel: 'Медиа вопроса (до 4)', mediaMax: 4,
  }
  // «3 попытки»: ответ всегда слово в сетку (как у кроссворда — переиспользуем
  // тот же режим, отдельный AnswerSpec не заводим), картинок 2–4, озвучки нет
  // (вопрос — это сами картинки, ведущий не читает вслух отдельный текст).
  if (mech === 'four_pics') return {
    fixedMode: true, questionMedia: true, voice: false,
    mediaLabel: 'Картинки (2–4, порядок = порядок показа)', mediaMax: 4,
  }
  // «Скрэмбл»: тип ответа задан (фраза + перемешивание), текст вопроса —
  // необязательная подсказка мелко над доской, картинка — одна, чтобы не
  // отнимать высоту у доски плиток; озвучка работает как у обычного вопроса.
  if (mech === 'anagram') return {
    fixedMode: true, questionMedia: true, voice: true,
    mediaLabel: 'Картинка к вопросу (необязательно)', mediaMax: 1,
  }
  if (mode === 'match') return {
    fixedMode: false, questionMedia: true, voice: true,
    mediaLabel: 'Медиа вопроса (до 6 — по картинке на пару)', mediaMax: MATCH_MAX_PAIRS,
  }
  return {
    fixedMode: false, questionMedia: true, voice: true,
    mediaLabel: 'Медиа вопроса (до 4)', mediaMax: 4,
  }
}

/** Сопоставление: сколько пар можно задать (9.76 — было ровно 4). */
export const MATCH_MIN_PAIRS = 2
export const MATCH_MAX_PAIRS = 6
const MATCH_RIGHT = ['А', 'Б', 'В', 'Г', 'Д', 'Е']

/** Подогнать сопоставление под `n` пар: левые 1..n, правые А..(n-я буква).
 *  Пары и подписи, ссылающиеся на убранные номера/буквы, отбрасываются;
 *  уцелевшие сохраняются как были. */
export function resizeMatch<T extends { left: string[]; right: string[];
  correct_pairs: string[]; right_labels?: string[] }>(spec: T, n: number): T {
  const k = Math.max(MATCH_MIN_PAIRS, Math.min(MATCH_MAX_PAIRS, Math.round(n)))
  const left = Array.from({ length: k }, (_, i) => String(i + 1))
  const right = MATCH_RIGHT.slice(0, k)
  const correct_pairs = spec.correct_pairs.filter(p =>
    left.some(l => p.startsWith(l) && right.includes(p.slice(l.length))))
  const labels = spec.right_labels
  return {
    ...spec, left, right, correct_pairs,
    ...(labels ? { right_labels: right.map((_, i) => labels[i] ?? '') } : {}),
  }
}
