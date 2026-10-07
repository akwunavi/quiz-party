// ═══ Magic 2.0 Concept Lab — общий тестовый контент ═══
// Один и тот же набор для всех трёх концептов: переключение концепта не
// меняет ни игрового состояния, ни текста, ни таймера. Формы данных — как в
// продакшне (types/quiz.ts): сопоставление (left/right/right_labels/
// correct_pairs), «Своя игра» (темы × плитки), «Скрэмбл» (lib/anagram.ts).
import { anagramQuestion, anagramShuffle, anagramTemplate, anagramHintOrder, hashStr } from '../../lib/anagram'

export type Team = { id: string; name: string; hue: number; alive: boolean; score: number[] }

/** Тон команды — НЕ неон: приглушённые «природные» оттенки (эмаль, камень,
 *  пламя). Концепты превращают тон в свой материал. */
const HUES = [32, 352, 205, 150, 270, 12, 185, 48, 320, 95, 228, 0]
const NAMES = [
  'Кот Шрёдингера', 'Сумерки разума', 'Три сосны', 'Чёрный квадрат',
  'Общество анонимных эрудитов имени Менделеева', 'Ночные философы', 'Бермудский треугольник', 'Знатоки по пятницам',
  'Мозговой штурм', 'Пятый элемент', 'Последний ряд', 'Тёмные лошадки',
]
// очки по 6 раундам (сумма решает места; одна ничья на 4–5 месте — как в жизни)
const SCORES = [
  [6, 5, 4, 3, 6, 2], [5, 6, 3, 2, 5, 2], [4, 4, 5, 3, 4, 1], [5, 3, 2, 3, 3, 2],
  [3, 5, 3, 2, 4, 1], [4, 3, 3, 1, 4, 2], [2, 4, 1, 2, 3, 1], [3, 2, 2, 2, 2, 1],
  [2, 3, 1, 1, 3, 0], [1, 2, 2, 1, 2, 1], [1, 1, 0, 0, 1, 0], [2, 1, 0, 1, 1, 0],
]
export const TEAMS: Team[] = NAMES.map((name, i) => ({ id: `t${i + 1}`, name, hue: HUES[i], alive: i !== 10, score: SCORES[i] }))
/** Команда, которая «подключается» в демо лобби (идёт последней). */
export const JOINING = 't12'
export const total = (t: Team) => t.score.reduce((a, b) => a + b, 0)
export const RANKED = [...TEAMS].sort((a, b) => total(b) - total(a))
export const placeOf = (t: Team) => 1 + RANKED.filter(x => total(x) > total(t)).length
export const ROUND_NAMES = ['Разминка', 'Кино и литература', 'Своя игра', 'Угадай мелодию', 'Картинки', 'Скрэмбл']
export const QR_URL = 'https://akwunavi.github.io/quiz-party/#/player?room=bar'

export const META = { round: 2, roundName: 'Кино и литература', q: 4, of: 7, timer: 30 }

export const Q_TEXT = 'Этот писатель сжёг второй том своей поэмы за девять дней до смерти. Назовите его фамилию.'

export const Q_DENSE = {
  text: 'На двух гравюрах — один и тот же город с разницей в три века. Какой?',
  media: [{ kind: 'old' as const, cap: '1650' }, { kind: 'new' as const, cap: '1950' }],
  choices: [
    { key: 'А', text: 'Прага' }, { key: 'Б', text: 'Венеция' },
    { key: 'В', text: 'Амстердам' }, { key: 'Г', text: 'Санкт-Петербург' },
  ],
  correct: 'В',
}

/** Сопоставление: картинки 1…4 ↔ подписи А…Г (как MatchAnswer в продакшне). */
export const Q_MATCH = {
  text: 'Соотнесите изобретение и изобретателя',
  left: ['1', '2', '3', '4'],
  items: ['lamp', 'phone', 'dynamite', 'radio'] as const,
  right: ['А', 'Б', 'В', 'Г'],
  right_labels: ['Белл', 'Эдисон', 'Попов', 'Нобель'],
  correct_pairs: ['1Б', '2А', '3Г', '4В'],
}
export const pairOf = (l: string) => Q_MATCH.correct_pairs.find(p => p.startsWith(l))!.slice(l.length)
export const MATCH_ANSWERS: { team: string; text: string; ok: boolean }[] = [
  { team: 't1', text: '1Б 2А 3Г 4В', ok: true }, { team: 't3', text: '1Б 2А 3Г 4В', ok: true },
  { team: 't2', text: '1Б 2В 3Г 4А', ok: false }, { team: 't6', text: '1А 2Б 3Г 4В', ok: false },
  { team: 't4', text: '1Б 2А 3Г 4В', ok: true }, { team: 't9', text: '1Б 2А 3В 4Г', ok: false },
]

/** «Своя игра»: 5 тем × 5 плиток; часть уже сыграна. Открывается «Кинозвуки · 300». */
export const JP = {
  themes: [
    { name: 'Кинозвуки', hint: 'угадайте фильм' }, { name: 'Голоса', hint: 'кто поёт?' },
    { name: 'Оркестр', hint: 'инструмент' }, { name: 'Мультфильмы' }, { name: 'Звуки города', hint: 'где это?' },
  ],
  values: [100, 200, 300, 400, 500],
  played: ['0-0', '1-0', '1-1', '2-0', '3-0', '3-1', '4-2', '0-3'],
  open: { theme: 0, tile: 2 },
  correct: '«Сталкер» — проезд на дрезине',
  countdown: 30,
  answers: [
    { team: 't3', text: 'Сталкер', ok: true, sec: 4.2 }, { team: 't1', text: 'Сталкер, Тарковский', ok: true, sec: 6.8 },
    { team: 't6', text: 'Солярис', ok: false, sec: 9.1 }, { team: 't2', text: 'Зеркало', ok: false, sec: 12.4 },
  ],
}

/** «Скрэмбл» — настоящая логика lib/anagram.ts. */
export const SCR_PHRASE = 'Мастер и Маргарита'
const scrLetters = anagramTemplate(SCR_PHRASE).letters
export const SCRAMBLE = {
  clue: 'Роман, который автор правил до последних дней жизни',
  ...anagramQuestion(SCR_PHRASE, anagramShuffle(scrLetters, hashStr(SCR_PHRASE))),
  hints: anagramHintOrder(scrLetters, hashStr(SCR_PHRASE)).slice(0, 3),
}

/** Последний ответ игры (финал, кадр «LAST ANSWER»). */
export const LAST = { round: 6, q: 3, of: 3, text: 'Как звали кота, который ездил в трамвае?', answer: 'Бегемот' }

/** Демо-таймер: секунды по состоянию, как Timer.tsx (целые вверх, «мало» с 10, ноль). */
export type TimerState = 'normal' | 'warning' | 'zero'
export const TIMER_LEFT: Record<TimerState, number> = { normal: 24, warning: 7, zero: 0 }
export const timerPhase = (left: number): TimerState => (left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal')
