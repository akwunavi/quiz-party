// ═══ Magic 2.0 Concept Lab · Фаза 2 — общий тестовый вечер ═══
// Один и тот же вечер для всех пяти концептов, данные — в формах продакшна
// (types/quiz.ts). Кроссворд собран настоящим генератором (lib/crossword.ts),
// «Скрэмбл» — настоящими функциями (lib/anagram.ts), составы рандомайзера —
// как TeamRandomizer в админке (перемешать, раздать по кругу i % n).
import { generateCrossword } from '../../lib/crossword'
import { anagramQuestion, anagramShuffle, anagramTemplate, anagramHintOrder, hashStr } from '../../lib/anagram'
import type { CrosswordGrid } from '../../types/quiz'

export type Team = { id: string; name: string; hue: number; alive: boolean; score: number[] }

/** Тон команды (не неон): концепт превращает его в свой материал. */
const HUES = [32, 352, 205, 150, 270, 12, 185, 48, 320, 95, 228, 0]
const NAMES = [
  'Кот Шрёдингера', 'Сумерки разума', 'Три сосны', 'Чёрный квадрат',
  'Общество анонимных эрудитов имени Менделеева', 'Ночные философы', 'Бермудский треугольник', 'Знатоки по пятницам',
  'Мозговой штурм', 'Пятый элемент', 'Последний ряд', 'Тёмные лошадки',
]
/** Очки по раундам 1…6 (кроссворд, кино и литература, своя игра /100, мелодия, блиц, скрэмбл). */
const SCORES = [
  [6, 5, 4, 3, 6, 2], [5, 6, 3, 2, 5, 2], [4, 4, 5, 3, 4, 1], [5, 3, 2, 3, 3, 2],
  [3, 5, 3, 2, 4, 1], [4, 3, 3, 1, 4, 2], [2, 4, 1, 2, 3, 1], [3, 2, 2, 2, 2, 1],
  [2, 3, 1, 1, 3, 0], [1, 2, 2, 1, 2, 1], [1, 1, 0, 0, 1, 0], [2, 1, 0, 1, 1, 0],
]
export const TEAMS: Team[] = NAMES.map((name, i) => ({ id: `t${i + 1}`, name, hue: HUES[i], alive: i !== 10, score: SCORES[i] }))
export const team = (id: string) => TEAMS.find(t => t.id === id) ?? TEAMS[0]
export const JOINING = 't12'
export const total = (t: Team, upto = 6) => t.score.slice(0, upto).reduce((a, b) => a + b, 0)
const rankBy = (upto: number) => [...TEAMS].sort((a, b) => total(b, upto) - total(a, upto) || a.id.localeCompare(b.id))
export const RANKED = rankBy(6)
export const placeOf = (t: Team, upto = 6) => 1 + TEAMS.filter(x => total(x, upto) > total(t, upto)).length
/** Табло после раунда 2: порядок ДО (после раунда 1) и ПОСЛЕ — для FLIP-перестановки. */
export const SB_BEFORE = rankBy(1)
export const SB_AFTER = rankBy(2)

export const PLAYER_URL = 'https://akwunavi.github.io/quiz-party/#/player?room=bar'

// ── рандомайзер (TeamRandomizer: shuffle → i % n), 4 команды, 18 человек ──
const PEOPLE = ['Ваня', 'Маша', 'Петя', 'Оля', 'Саша', 'Дима', 'Катя', 'Лёша', 'Настя', 'Женя', 'Кирилл', 'Вера', 'Тимур', 'Аня', 'Гоша', 'Лиза', 'Миша', 'Соня']
export const GROUPS: string[][] = (() => {
  const a = [...PEOPLE]; let s = 31
  for (let i = a.length - 1; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]] }
  const g: string[][] = [[], [], [], []]
  a.forEach((n, i) => g[i % 4].push(n))
  return g
})()

// ── раунды вечера ──
export const ROUNDS = [
  { n: 1, name: 'Литературный кроссворд', mech: 'crossword', count: 8 },
  { n: 2, name: 'Кино и литература', mech: 'standard', count: 7 },
  { n: 3, name: 'Своя игра', mech: 'jeopardy', count: 0 },
  { n: 4, name: 'Угадай мелодию', mech: 'melody', count: 0 },
  { n: 5, name: 'Блиц', mech: 'blitz', count: 48 },
  { n: 6, name: 'Скрэмбл', mech: 'anagram', count: 3 },
]
export const RULES = {
  title: 'ПРАВИЛА',
  body: [
    'Играют команды до 8 человек — отвечает капитан с телефона',
    'На вопрос — 30 секунд, ответ можно исправить два раза',
    'Гуглить нельзя, советоваться внутри стола — можно',
    'Верный ответ — 1 балл, в особых раундах цена своя',
    'Ответы и баллы показываем после каждого раунда',
  ],
  stats: { rounds: 6, questions: 66, tracks: 16, minutes: 150 },
  note: 'Фотограф работает весь вечер — снимки пришлём в общий чат',
}

// ── раунд 1: кроссворд (настоящий генератор) ──
const CW_WORDS = [
  { word: 'Онегин', clue: 'Герой романа в стихах, отказавший Татьяне' },
  { word: 'Воланд', clue: 'Профессор чёрной магии на Патриарших' },
  { word: 'Маргарита', clue: 'Королева весеннего бала полнолуния' },
  { word: 'Печорин', clue: 'Герой нашего времени' },
  { word: 'Гоголь', clue: 'Автор «Мёртвых душ»' },
  { word: 'Нос', clue: 'Эта часть лица майора Ковалёва гуляла по Петербургу сама' },
  { word: 'Чичиков', clue: 'Скупал мёртвые души' },
  { word: 'Азазелло', clue: 'Рыжий спутник Воланда с клыком' },
]
const cw = generateCrossword(CW_WORDS, 1500, 19661966)
export const CW_GRID: CrosswordGrid = cw.grid ?? { rows: 1, cols: 1, words: [] }
export const CW_ROUND = {
  title: ['ЛИТЕРАТУРНЫЙ', 'КРОССВОРД'], meta: '8 вопросов · 45 сек · 1 балл',
  rules: ['Определения читаем по одному — слово вписывается на телефоне в сетку', 'Буквы на пересечениях подсказывают соседние слова', 'Ответы и проверка — после раунда'],
}
/** Вопрос кроссворда в игре: определение = текст вопроса, номер слова = номер вопроса. */
export const CW_Q = { number: CW_GRID.words[2]?.number ?? 3, clue: CW_GRID.words[2]?.clue ?? '', dir: CW_GRID.words[2]?.dir ?? 'across', len: CW_GRID.words[2]?.word.length ?? 0 }

// ── раунд 2: обычные вопросы ──
export const R2 = { n: 2, name: 'Кино и литература', count: 7, timer: 30 }
export const Q_MATCH = {
  index: 1, text: 'Соотнесите изобретение и изобретателя',
  items: ['lamp', 'phone', 'dynamite', 'radio'] as const,
  left: ['1', '2', '3', '4'], right: ['А', 'Б', 'В', 'Г'],
  right_labels: ['Белл', 'Эдисон', 'Попов', 'Нобель'],
  correct_pairs: ['1Б', '2А', '3Г', '4В'],
}
export const pairOf = (l: string) => Q_MATCH.correct_pairs.find(p => p.startsWith(l))!.slice(l.length)
export const Q_ONE = { index: 2, text: 'Этот механизм на ратуше показывает время, положение Солнца и Луны уже шестой век. В каком городе он висит?', art: 'orloj' as const }
export const Q_DENSE = {
  index: 3, text: 'На двух гравюрах — один и тот же город с разницей в три века. Какой?',
  media: [{ era: 'old' as const, cap: '1650' }, { era: 'new' as const, cap: '1950' }],
  choices: [{ key: 'А', text: 'Прага' }, { key: 'Б', text: 'Венеция' }, { key: 'В', text: 'Амстердам' }, { key: 'Г', text: 'Санкт-Петербург' }],
  correct: 'В',
}
export const Q_TEXT = { index: 4, text: 'Этот писатель сжёг второй том своей поэмы за девять дней до смерти. Назовите его фамилию.' }
export const Q_ORDER = {
  index: 6, text: 'Расставьте романы в порядке публикации — от самого раннего',
  choices: [
    { key: 'А', text: '«Мастер и Маргарита»' }, { key: 'Б', text: '«Евгений Онегин»' },
    { key: 'В', text: '«Мёртвые души»' }, { key: 'Г', text: '«Преступление и наказание»' },
  ],
  correct_order: 'БВГА',
}
export const MATCH_ANSWERS = [
  { team: 't1', text: '1Б 2А 3Г 4В', ok: true }, { team: 't3', text: '1Б 2А 3Г 4В', ok: true },
  { team: 't2', text: '1Б 2В 3Г 4А', ok: false }, { team: 't6', text: '1А 2Б 3Г 4В', ok: false },
  { team: 't4', text: '1Б 2А 3Г 4В', ok: true }, { team: 't9', text: '1Б 2А 3В 4Г', ok: false },
]
export const ORDER_ANSWERS = [
  { team: 't2', text: 'БВГА', ok: true }, { team: 't1', text: 'ВБГА', ok: false },
  { team: 't6', text: 'БВГА', ok: true }, { team: 't3', text: 'БГВА', ok: false }, { team: 't5', text: 'БВГА', ok: true },
]

// ── раунд 3: «Своя игра» — плитки-звуки, цена = баллы ──
export const JP = {
  themes: [
    { name: 'Кинозвуки', hint: 'угадайте фильм' }, { name: 'Голоса', hint: 'кто поёт?' },
    { name: 'Оркестр', hint: 'инструмент' }, { name: 'Мультфильмы' }, { name: 'Звуки города', hint: 'где это?' },
  ],
  values: [100, 200, 300, 400, 500],
  played: ['0-0', '1-0', '1-1', '2-0', '3-0', '3-1', '4-2', '0-3'],
  open: { theme: 0, tile: 2 },
  correct: '«Сталкер» — проезд на дрезине',
  clip: 30,
  answers: [
    { team: 't3', text: 'Сталкер', ok: true }, { team: 't1', text: 'Сталкер, Тарковский', ok: true },
    { team: 't6', text: 'Солярис', ok: false }, { team: 't2', text: 'Зеркало', ok: false },
  ],
}

// ── раунд 4: «Угадай мелодию» (MelodyRound: доска → рулетка → «слушаем 1 с» → ставки → ответ) ──
export const MELODY = {
  themes: ['Классика в кино', 'Саундтреки', 'Советская эстрада', 'Мюзиклы'],
  tracks: 4,
  played: ['0-0', '1-2', '2-1', '3-3'],
  pick: '2-2',
  bids: [{ team: 't4', sec: 3 }, { team: 't1', sec: 5 }, { team: 't6', sec: 6 }, { team: 't2', sec: 9 }],
  correct: '«Позвони мне, позвони» — Ирина Муравьёва',
  bidSec: 10, answerSec: 30,
}

// ── раунд 5: блиц («шахматные часы» у каждой команды, ход по кругу) ──
export const BLITZ = {
  order: ['t3', 't1', 't5', 't6', 't2', 't4', 't7', 't8'],
  left: { t3: 41, t1: 52, t5: 60, t6: 27, t2: 12, t4: 60, t7: 33, t8: 48 } as Record<string, number>,
  correct: { t3: 4, t1: 3, t5: 2, t6: 5, t2: 3, t4: 0, t7: 2, t8: 1 } as Record<string, number>,
  bankLeft: 31,
  q: { team: 't3', text: 'Сколько дней на Земле длится год на Меркурии?', a: '88', verdict: 'ok' as const },
}

// ── раунд 6: «Скрэмбл» (lib/anagram.ts) ──
export const SCR_PHRASE = 'Мастер и Маргарита'
const scrLetters = anagramTemplate(SCR_PHRASE).letters
export const SCRAMBLE = {
  clue: 'Роман, который автор правил до последних дней жизни',
  ...anagramQuestion(SCR_PHRASE, anagramShuffle(scrLetters, hashStr(SCR_PHRASE))),
  hints: anagramHintOrder(scrLetters, hashStr(SCR_PHRASE)).slice(0, 4),
  winners: ['t2', 't6', 't4'],
}

/** Последний ответ игры (финал, кадр «последнее состояние»). */
export const LAST = { round: 6, q: 3, of: 3, text: 'Как звали кота, который ездил в трамвае?', answer: 'Бегемот' }

export type TimerState = 'normal' | 'warning' | 'zero'
export const TIMER_LEFT: Record<TimerState, number> = { normal: 24, warning: 7, zero: 0 }
export const timerPhase = (left: number): TimerState => (left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal')
