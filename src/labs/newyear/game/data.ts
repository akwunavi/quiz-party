// ═══ Демо-игра для лаборатории: данные РОВНО в формах настоящей игры ═══
// Типы — из src/types/quiz.ts, сетка кроссворда — настоящим генератором
// (lib/crossword.ts), перемешивание «Скрэмбла» — настоящей функцией
// (lib/anagram.ts), строка параметров раунда — настоящим metaLine. Здесь нет
// ни сети, ни записи состояния: только содержимое, которое экран показал бы.
import type {
  ChoiceAnswer, CrosswordGrid, FreeTextAnswer, InfoSlide, JeopardyTheme, MatchAnswer,
  MelodyTheme, OrderAnswer, Question, AnagramAnswer, RoundBase,
} from '../../../types/quiz'
import { generateCrossword } from '../../../lib/crossword'
import { anagramShuffle, anagramTemplate, hashStr } from '../../../lib/anagram'
import { metaLine } from '../../../lib/roundMeta'
import { teamColor } from '../../../lib/teamColors'
import type { PhotoKind } from './Photo'

export const PACK_NAME = 'Новогодний квиз · 31.12'
export const PLAYER_URL = 'quiz-party.ru/#/player?room=elka'

// ── команды (лобби: порядок регистрации, одна команда отвалилась) ──
export interface DemoTeam { id: string; name: string; icon: string | null; color: string; alive: boolean }
const TEAM_NAMES: [string, string | null][] = [
  ['Оливье с ананасами', '🥗'], ['Дед Мороз и внуки', '🎅'], ['Мандариновый штурм', '🍊'],
  ['Бенгальские огни', '✨'], ['Снежный ком', '⛄'], ['Ёлки-палки', '🎄'], ['Пятый салат', null],
  ['Шампанское в 12', '🥂'],
]
export const TEAMS: DemoTeam[] = TEAM_NAMES.map(([name, icon], i) => ({
  id: `t${i + 1}`, name, icon, color: teamColor(i), alive: i !== 7,
}))

/** Лобби для проверки нагрузки: те же 8 команд, плюс четыре с ДЛИННЫМИ названиями. */
const EXTRA_NAMES: [string, string | null][] = [
  ['Сборная Дедов Морозов района', '🧣'], ['Команда имени Снегурочки', '❄️'], ['Три мандарина и ёлка', null],
  ['Новый год к нам мчится', '🚀'],
]
export function teamsFor(n: number): DemoTeam[] {
  const all = [...TEAM_NAMES, ...EXTRA_NAMES].map(([name, icon], i) => ({
    id: `t${i + 1}`, name, icon, color: teamColor(i), alive: i !== 7,
  }))
  return all.slice(0, Math.max(1, Math.min(all.length, n)))
}

// ── рандомайзер: имена вставили в админке, перемешали на 4 команды ──
// (как TeamRandomizer: по кругу i % n после перемешивания)
const NAMES = ['Ваня', 'Маша', 'Петя', 'Оля', 'Саша', 'Дима', 'Катя', 'Лёша', 'Настя', 'Женя',
  'Кирилл', 'Вера', 'Тимур', 'Аня', 'Гоша', 'Лиза', 'Миша', 'Соня']
function shuffled<T>(xs: T[], seed: number): T[] {
  const a = [...xs]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
export const RANDOM_GROUPS: string[][] = (() => {
  const n = 4
  const g: string[][] = Array.from({ length: n }, () => [])
  shuffled(NAMES, 31).forEach((name, i) => g[i % n].push(name))
  return g
})()

// ── слайд-брифинг «Правила» (show_at: 'lobby' — сразу после лобби) ──
export const RULES_SLIDE: InfoSlide = {
  id: 'rules', title: 'ПРАВИЛА', images: [], show_rounds: true, show_stats: true, layout: 'left', show_at: 'lobby',
  body: [
    'Играют команды до 8 человек — отвечает капитан с телефона',
    'На вопрос — 30 секунд, ответ можно исправить два раза',
    'Гуглить нельзя, советоваться внутри стола — можно',
    'Верный ответ — 1 балл, в особых раундах цена своя',
    'Ответы и баллы показываем после каждого раунда',
  ].join('\n'),
  note: 'Фотограф работает весь вечер — снимки пришлём в общий чат',
}
export const RULES_ROUNDS = [
  { id: 'r1', name: 'Новогодний кроссворд', count: 8 },
  { id: 'r2', name: 'Кино под бой курантов', count: 10 },
  // как InfoScreen: count = видимые вопросы раунда. У «Своей игры» и мелодии
  // содержимое живёт в настройках раунда (плитки, треки), вопросов нет —
  // продакшн честно пишет «0 вопр.». Оставлено как в игре.
  { id: 'r3', name: 'Своя игра', count: 0 },
  { id: 'r4', name: 'Угадай мелодию', count: 0 },
  { id: 'r5', name: 'Блиц', count: 64 },
  { id: 'r6', name: 'Скрэмбл', count: 6 },
]
export const RULES_STATS = { roundsCount: 6, questionsCount: 49, musicTracks: 41, minutes: 160 }

// ── Раунд 1: кроссворд ──
const CW_WORDS = [
  { word: 'Мандарин', clue: 'Цитрус, без которого не обходится новогодний стол' },
  { word: 'Гирлянда', clue: 'Цепочка огоньков на ёлке' },
  { word: 'Снегурочка', clue: 'Внучка Деда Мороза' },
  { word: 'Куранты', clue: 'Часы на Спасской башне' },
  { word: 'Оливье', clue: 'Салат, названный в честь повара' },
  { word: 'Хлопушка', clue: 'Бумажный цилиндр с конфетти' },
  { word: 'Сани', clue: 'Транспорт Деда Мороза' },
  { word: 'Шампанское', clue: 'Его открывают под бой часов' },
]
const cw = generateCrossword(CW_WORDS, 1500, 20261231)
export const CROSSWORD_GRID: CrosswordGrid = cw.grid ?? { rows: 1, cols: 1, words: [] }
function round(p: Partial<RoundBase> & Pick<RoundBase, 'mechanic' | 'title_lines'>, questions: number): RoundBase & { questions: Question[] } {
  return {
    id: 'r', pack_id: 'p', position: 1, rules: [], rules_audio: null, timer_seconds: 30, settings: {},
    off_scoreboard: false, answers_reveal: 'after_round', meta_line_override: null, status: 'ready',
    ...p,
    questions: Array.from({ length: questions }, (_, i) => ({
      id: `q${i}`, round_id: 'r', position: i, question_text: '', media: {}, is_final_question: false,
      answer: { mode: 'none', display: '' }, answer_note: null, service: {}, status: 'ready', hidden: false,
    })),
  }
}
export const CROSSWORD_ROUND = round({
  mechanic: 'crossword', title_lines: ['НОВОГОДНИЙ', 'КРОССВОРД'], timer_seconds: 45,
  settings: { grid: CROSSWORD_GRID },
  rules: [
    'Определения читаем по одному — слово вписывается на телефоне в сетку',
    'Буквы на пересечениях подсказывают соседние слова',
    'Ответы и проверка — после раунда',
  ],
}, CW_WORDS.length)
export const CROSSWORD_META = metaLine(CROSSWORD_ROUND as never)

// ── Раунд 2: «Кино под бой курантов» — обычные вопросы ──
export const Q_ROUND = { number: 2, count: 10, timer: 30 }

export interface DemoQuestion {
  id: string
  index: number
  text: string
  media: { kind: PhotoKind; ratio: number; caption?: string }[]
  answer: FreeTextAnswer | ChoiceAnswer | MatchAnswer | OrderAnswer
  note?: string
}

export const Q_MATCH: DemoQuestion = {
  id: 'q-match', index: 3,
  text: 'Сопоставьте кадр и новогодний фильм',
  media: [
    { kind: 'banya', ratio: 4 / 3 }, { kind: 'clock', ratio: 4 / 3 },
    { kind: 'forest', ratio: 4 / 3 }, { kind: 'institute', ratio: 4 / 3 },
  ],
  answer: {
    mode: 'match', left: ['1', '2', '3', '4'], right: ['А', 'Б', 'В', 'Г'],
    right_labels: ['Карнавальная ночь', 'Ирония судьбы, или С лёгким паром!', 'Морозко', 'Чародеи'],
    correct_pairs: ['1Б', '2А', '3В', '4Г'], display: '1Б 2А 3В 4Г',
  },
}

export const Q_ONE_IMAGE: DemoQuestion = {
  id: 'q-one', index: 4,
  text: 'На этой открытке 1957 года — главные часы страны. Сколько раз они бьют в полночь 31 декабря, прежде чем звучит гимн?',
  media: [{ kind: 'postcard-kremlin', ratio: 3 / 4 }],
  answer: { mode: 'free_text', correct: '12 / двенадцать', display: '12 ударов' },
}

export const Q_TWO_IMAGES: DemoQuestion = {
  id: 'q-two', index: 5,
  text: 'Две советские открытки — 1955 и 1962 годов. Какой новый персонаж появился на новогодних открытках после 1961 года?',
  media: [{ kind: 'postcard-moroz', ratio: 2 / 3 }, { kind: 'postcard-space', ratio: 2 / 3 }],
  answer: {
    mode: 'choice', correct_choice: 'А', display: 'Космонавт',
    choices: [
      { key: 'А', text: 'Космонавт в скафандре' }, { key: 'Б', text: 'Снегурочка с лукошком' },
      { key: 'В', text: 'Мальчик — Новый год' }, { key: 'Г', text: 'Ёлочный Петрушка' },
    ],
  },
}

export const Q_OPEN: DemoQuestion = {
  id: 'q-open', index: 6,
  text: 'Этот салат придумал повар московского ресторана «Эрмитаж» в 1860-х, и рецепт он унёс с собой. Как называется салат, без которого не обходится новогодний стол?',
  media: [],
  answer: { mode: 'free_text', correct: 'оливье / столичный', display: 'Оливье' },
}

export const Q_ORDER: DemoQuestion = {
  id: 'q-order', index: 8,
  text: 'Расставьте премьеры в хронологическом порядке — от самой ранней',
  media: [],
  answer: {
    mode: 'order', correct_order: 'БВАГ', display: ['Карнавальная ночь', 'Голубой огонёк', 'Ирония судьбы', 'Чародеи'],
    choices: [
      { key: 'А', text: '«Ирония судьбы» по телевизору' }, { key: 'Б', text: '«Карнавальная ночь» в кино' },
      { key: 'В', text: 'Первый «Голубой огонёк»' }, { key: 'Г', text: '«Чародеи» по телевизору' },
    ],
  },
}

/** Ответы команд на экране разбора (ShowAnswers): текст как с телефона. */
export interface DemoAnswer { team: string; text: string; ok: boolean }
export const MATCH_TEAM_ANSWERS: DemoAnswer[] = [
  { team: 't1', text: '1Б 2А 3В 4Г', ok: true }, { team: 't3', text: '1Б 2Г 3В 4А', ok: false },
  { team: 't2', text: '1Б 2А 3В 4Г', ok: true }, { team: 't5', text: '1А 2Б 3В 4Г', ok: false },
  { team: 't4', text: '1Б 2А 3Г 4В', ok: false }, { team: 't6', text: '1Б 2А 3В 4Г', ok: true },
]
export const ORDER_TEAM_ANSWERS: DemoAnswer[] = [
  { team: 't2', text: 'БВАГ', ok: true }, { team: 't1', text: 'ВБАГ', ok: false },
  { team: 't6', text: 'БВАГ', ok: true }, { team: 't3', text: 'БАВГ', ok: false },
  { team: 't5', text: 'БВАГ', ok: true },
]

// ── «Своя игра»: плитки — звуковые фрагменты (tile.audio), цена = баллы ──
export const JEOPARDY: { themes: JeopardyTheme[]; opened: string[]; pick: { theme: number; tile: number }; clipSeconds: number } = {
  themes: [
    { name: 'Ёлочные игрушки', hint: 'угадайте по звуку', tiles: [100, 200, 300, 400, 500].map(v => ({ value: v, audio: '', correct: '' })) },
    { name: 'Новогоднее кино', tiles: [100, 200, 300, 400, 500].map(v => ({ value: v, audio: '', correct: '' })) },
    { name: 'Мультфильмы', hint: 'песни героев', tiles: [100, 200, 300, 400, 500].map(v => ({ value: v, audio: '', correct: '' })) },
    { name: 'Под бой курантов', tiles: [100, 200, 300, 400, 500].map(v => ({ value: v, audio: '', correct: '' })) },
    { name: 'Зимние звуки', hint: 'что звучит?', tiles: [100, 200, 300, 400, 500].map(v => ({ value: v, audio: '', correct: '' })) },
  ],
  opened: ['0-0', '0-1', '1-0', '2-0', '2-1', '3-0', '4-2', '1-3'],
  pick: { theme: 1, tile: 2 },
  clipSeconds: 30,
}
JEOPARDY.themes[1].tiles[2].correct = '«Ирония судьбы» — песня «Если у вас нету тёти»'
export const JEOPARDY_ANSWERS: DemoAnswer[] = [
  { team: 't3', text: 'Ирония судьбы', ok: true }, { team: 't1', text: 'Ирония судьбы, или С лёгким паром', ok: true },
  { team: 't5', text: 'Служебный роман', ok: false },
]

// ── «Угадай мелодию»: темы × треки, рулетка, аукцион секундами ──
export const MELODY: { themes: MelodyTheme[]; played: string[]; pick: string; bids: { team: string; sec: number }[]; bidSec: number; answerSec: number } = {
  themes: [
    { name: 'Новогодние хиты', tracks: Array.from({ length: 4 }, () => ({ audio: '', correct: '' })) },
    { name: 'Из мультфильмов', tracks: Array.from({ length: 4 }, () => ({ audio: '', correct: '' })) },
    { name: 'Кино 80-х', tracks: Array.from({ length: 4 }, () => ({ audio: '', correct: '' })) },
    { name: 'Зарубежное Рождество', tracks: Array.from({ length: 4 }, () => ({ audio: '', correct: '' })) },
  ],
  played: ['0-0', '1-2', '2-1', '3-3'],
  pick: '0-2',
  // ставки (сек) — порядок «кто меньше, тот первый»
  bids: [{ team: 't4', sec: 4 }, { team: 't1', sec: 5 }, { team: 't6', sec: 7 }, { team: 't2', sec: 9 }],
  bidSec: 10,
  answerSec: 30,
}
MELODY.themes[0].tracks[2].correct = '«Пять минут» — Людмила Гурченко'

// ── Блиц: «шахматные часы» у каждой команды, ход по кругу ──
export const BLITZ = {
  teamSeconds: 60,
  order: ['t3', 't1', 't5', 't6', 't2'],
  /** остаток времени к началу демо (сек) */
  left: { t3: 41, t1: 52, t5: 60, t6: 27, t2: 12 } as Record<string, number>,
  correct: { t3: 4, t1: 3, t5: 2, t6: 5, t2: 3 } as Record<string, number>,
  missed: { t3: 1, t1: 0, t5: 1, t6: 2, t2: 1 } as Record<string, number>,
  bankLeft: 64,
  questions: [
    { team: 't3', q: 'Сколько лучей у снежинки?', a: 'Шесть', verdict: 'ok' as const },
    { team: 't1', q: 'В каком городе официальная резиденция Деда Мороза?', a: 'Великий Устюг', verdict: 'no' as const },
  ],
}

// ── «Скрэмбл»: фраза, сохранённое перемешивание, подсказка раз в 10 с ──
const AN_PHRASE = 'Голубой огонёк'
const anLetters = anagramTemplate(AN_PHRASE).letters
export const SCRAMBLE = {
  clue: 'Новогодняя телепередача, впервые вышедшая в эфир в 1962 году',
  answer: { mode: 'anagram', phrase: AN_PHRASE, order: anagramShuffle(anLetters, hashStr(AN_PHRASE)) } as AnagramAnswer,
  timer: 60,
  hintIntervalSec: 10,
  index: 2, count: 6, round: 6,
  winners: ['t2', 't6', 't4'],
}

export const teamById = (id: string) => TEAMS.find(t => t.id === id) ?? TEAMS[0]
