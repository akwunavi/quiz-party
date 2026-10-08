// ═══ Этап 3 — содержимое концептов (одинаковое для A/B/C механики) ═══
// Формы — настоящие: «Скрэмбл» считается чистыми функциями lib/anagram.ts (шаблон, перемешивание,
// порядок подсказок: первая буква не подсказывается, минимум две закрыты, при 30 с / 10 с — максимум 2);
// сопоставление и порядок — answer.mode 'match' (left/right/right_labels/correct_pairs, картинки
// вопроса по порядку left) и 'order' (choices/correct_order); кроссворд — CrosswordGrid из
// настоящего генератора (тот же, что в редакторе).
import { anagramQuestion, anagramShuffle, anagramTemplate, anagramHintOrder, hashStr } from '../../../lib/anagram'
import { CW_GRID } from '../../magic2/data'
import { TEAMS } from '../../magic2/data'
import { IMG } from '../content'
import moon from '../media/moon.jpg'

const tcol = (hue: number) => `hsl(${hue} 52% 66%)`
export const TEAM3 = TEAMS.slice(0, 5).map(t => ({ name: t.name, color: tcol(t.hue) }))

const PHRASE = 'Летучий голландец'
const seed = hashStr(PHRASE)
export const SCR = {
  title: 'Скрэмбл', num: 6, qn: 2, qcount: 3, timer: 30, hintEvery: 10,
  clue: 'Корабль-призрак, обречённый вечно скитаться по морям',
  ...anagramQuestion(PHRASE, anagramShuffle(anagramTemplate(PHRASE).letters, seed)),
  hintOrder: anagramHintOrder(anagramTemplate(PHRASE).letters, seed),
  guessed: [0, 2, 4],
}
export const SCR_HINTS = SCR.hintOrder.slice(0, 2) // к 10 с до конца открыты две

export const MATCH = {
  title: 'Кино и космос', num: 2, qn: 5, qcount: 7, timer: 30,
  text: 'Соотнесите снимок и подпись',
  left: ['1', '2', '3', '4'],
  imgs: [IMG.falcon, IMG.collins, IMG.hubble, { src: moon, w: 800, h: 800, caption: 'Луна' }],
  right: ['А', 'Б', 'В', 'Г'],
  right_labels: ['Глубокое поле «Хаббла»: тысячи галактик', 'Ракета Falcon 9 на старте', 'Первая женщина — командир шаттла', 'Море Спокойствия'],
  correct_pairs: ['1Б', '2В', '3А', '4Г'],
}
export const pairOf = (l: string) => MATCH.correct_pairs.find(p => p.startsWith(l))!.slice(l.length)

export const ORDER = {
  title: 'Кино и литература', num: 2, qn: 6, qcount: 7, timer: 30,
  text: 'Расставьте романы в порядке публикации — от самого раннего',
  choices: [
    { key: 'А', text: '«Мастер и Маргарита»', year: '1966' }, { key: 'Б', text: '«Евгений Онегин»', year: '1833' },
    { key: 'В', text: '«Мёртвые души»', year: '1842' }, { key: 'Г', text: '«Преступление и наказание» — роман в шести частях с эпилогом', year: '1866' },
  ],
  correct_order: 'БВГА',
}

export const CW = {
  title: 'Литературный кроссворд', num: 1, qcount: CW_GRID.words.length, timer: 45, grid: CW_GRID,
  /** активное слово (вопрос 3), уже разобранные на разборе — 1 и 2 */
  active: 2, solvedBefore: [0, 1],
}
