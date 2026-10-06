// Демо-содержимое для всех пяти миров — одно и то же, чтобы сравнивать
// именно визуальный язык, а не тексты. Механики — существующие в игре.

export const SCREENS = [
  { id: 'lobby', label: 'Lobby' },
  { id: 'intro', label: 'Round Intro' },
  { id: 'question', label: 'Question' },
  { id: 'timer', label: 'Timer' },
  { id: 'answer', label: 'Answer' },
  { id: 'scoreboard', label: 'Scoreboard' },
  { id: 'special', label: 'Special' },
  { id: 'finale', label: 'Finale' },
] as const
export type ScreenId = typeof SCREENS[number]['id']

export const GAME = {
  title: 'Quiz Party',
  subtitle: 'Новогодняя игра',
  date: '31 декабря · 20:00',
  room: '4821',
  url: 'quiz-party.ru',
}

export const TEAMS_JOINED = [
  'Оливье с ананасами', 'Дед Мороз и внуки', 'Мандариновый штурм', 'Бенгальские огни',
  'Снежный ком', 'Ёлки-палки', 'Пятый салат',
]

export const ROUND = {
  number: 2,
  total: 6,
  title: 'Кино под бой курантов',
  rules: '7 вопросов · 30 секунд · 1 балл',
}

export const QUESTION = {
  label: 'Раунд 2 · Вопрос 4',
  num: 4,
  of: 7,
  text: 'Какой фильм показывают по телевизору 31 декабря уже почти полвека?',
  options: [
    { key: 'А', text: 'Карнавальная ночь' },
    { key: 'Б', text: 'Ирония судьбы' },
    { key: 'В', text: 'Морозко' },
    { key: 'Г', text: 'Чародеи' },
  ],
  correct: 'Б',
  answer: 'Ирония судьбы, или С лёгким паром!',
  fact: 'Премьера — 1 января 1976 года, Первая программа ЦТ',
  answered: 6,
  teams: 8,
}

export const TIMER_SEC = 30

export interface TeamScore { name: string; score: number; delta: number }
export const SCORES: TeamScore[] = [
  { name: 'Оливье с ананасами', score: 34, delta: 4 },
  { name: 'Дед Мороз и внуки', score: 31, delta: 3 },
  { name: 'Мандариновый штурм', score: 29, delta: 4 },
  { name: 'Бенгальские огни', score: 27, delta: 2 },
  { name: 'Снежный ком', score: 24, delta: 3 },
  { name: 'Ёлки-палки', score: 22, delta: 1 },
  { name: 'Пятый салат', score: 19, delta: 2 },
  { name: 'Шампанское в 12', score: 15, delta: 0 },
]

// ── специальные раунды (существующие механики игры) ──
export const JEOPARDY = {
  title: 'Своя игра',
  themes: ['Ёлка', 'Подарки', 'Куранты', 'Салаты'],
  values: [100, 200, 300, 400],
  played: ['0-0', '1-1', '2-0', '3-2', '0-2'],
  open: { theme: 2, value: 3, text: 'Сколько раз бьют куранты в полночь Нового года?' },
}

export const BLITZ = {
  title: 'Блиц',
  rules: '5 вопросов подряд · 10 секунд на каждый',
  items: [
    { q: 'Сколько дней в високосном году?', a: '366' },
    { q: 'Дед Мороз живёт в…', a: 'Великом Устюге' },
    { q: 'Сколько лучей у снежинки?', a: 'Шесть' },
  ],
}

export const ANAGRAM = {
  title: 'Скрэмбл',
  rules: 'Соберите слово из перемешанных букв',
  word: 'МАНДАРИН',
  shuffled: 'НРДИАМАН',
}

export const MELODY = {
  title: 'Угадай мелодию',
  themes: [
    { name: 'Новогодние хиты', tracks: 4 },
    { name: 'Из мультфильмов', tracks: 4 },
    { name: 'Кино 80-х', tracks: 4 },
  ],
  playing: { theme: 0, track: 2, title: '«Пять минут»', artist: 'Людмила Гурченко' },
}

export const RACE = {
  title: 'Скачки бульдогов',
  rules: 'Ставьте на бульдога — финиш решает лотерея',
  dogs: [
    { name: 'Френк', color: '#f2e3c9', mask: '#b99a7d', scarf: '#d8432f' },
    { name: 'Борис', color: '#8a5a33', mask: '#4c2f17', scarf: '#e0b13c' },
    { name: 'Уголёк', color: '#3b3b40', mask: '#232326', scarf: '#3fa36a' },
    { name: 'Рыжик', color: '#e8e2d8', mask: '#c96f3b', scarf: '#3a7bd5' },
    { name: 'Сизый', color: '#9aa7b5', mask: '#6c7886', scarf: '#c04ac9' },
  ],
  /** итоговые доли пройденного пути к концу забега (лотерея — сценарий из сида) */
  finish: [0.94, 0.78, 1, 0.86, 0.71],
}
