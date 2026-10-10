// ═══ Этап 3 — содержимое концептов (одинаковое для A/B/C механики) ═══
// Формы — настоящие: «Скрэмбл» считается чистыми функциями lib/anagram.ts (шаблон, перемешивание,
// порядок подсказок: первая буква не подсказывается, минимум две закрыты, при 30 с / 10 с — максимум 2);
// сопоставление и порядок — answer.mode 'match' (left/right/right_labels/correct_pairs, картинки
// вопроса по порядку left) и 'order' (choices/correct_order); кроссворд — CrosswordGrid из
// настоящего генератора (тот же, что в редакторе).
import { anagramQuestion, anagramShuffle, anagramTemplate, anagramHintOrder, hashStr } from '../../lib/anagram'
import { TEAMS } from '../../labs/magic2/data'
import { IMG } from '../content'
import moon from '../media/moon.jpg'

const tcol = (hue: number) => `hsl(${hue} 52% 66%)`
export const TEAM3 = TEAMS.slice(0, 5).map(t => ({ name: t.name, color: tcol(t.hue) }))

function mkScr(phrase: string, clue: string, guessed: number[]) {
  const seed = hashStr(phrase), tpl = anagramTemplate(phrase)
  const hintOrder = anagramHintOrder(tpl.letters, seed)
  return {
    title: 'Скрэмбл', num: 6, qn: 2, qcount: 3, timer: 30, hintEvery: 10, clue, guessed, phrase,
    ...anagramQuestion(phrase, anagramShuffle(tpl.letters, seed)),
    hintOrder, hints: hintOrder.slice(0, 2), // к 10 с до конца открыты две
  }
}
/** три длины ответа: обычный (16 букв, 2 слова), короткий (6), длинный (22 буквы, 3 слова) */
export const SCR_SETS = {
  normal: mkScr('Летучий голландец', 'Корабль-призрак, обречённый вечно скитаться по морям', [0, 2, 4]),
  short: mkScr('Кракен', 'Гигантский морской монстр из скандинавских легенд', [0, 1, 2, 3]),
  long: mkScr('Преступление и наказание', 'Роман Достоевского о студенте, который решился на убийство старухи-процентщицы', [1]),
}
export type ScrSet = typeof SCR_SETS.normal

/** «Сопоставление»: элемент слева — картинка вопроса (по порядку left) или текст; справа — варианты с буквами и подписями */
export type MItem = { kind: 'img'; src: string; w: number; h: number } | { kind: 'txt'; text: string }
const mi = (o: { src: string; w: number; h: number }): MItem => ({ kind: 'img', src: o.src, w: o.w, h: o.h })
const mt = (text: string): MItem => ({ kind: 'txt', text })
const KEYS6 = ['А', 'Б', 'В', 'Г', 'Д', 'Е']
const base = { title: 'Кино и космос', num: 2, qn: 5, qcount: 7, timer: 30 }
export const MATCH_SETS = {
  normal: { ...base, text: 'Соотнесите снимок и подпись',
    items: [mi(IMG.falcon), mi(IMG.collins), mi(IMG.hubble), mi({ src: moon, w: 800, h: 800 })],
    right: KEYS6.slice(0, 4), right_labels: ['Глубокое поле «Хаббла»: тысячи галактик', 'Ракета Falcon 9 на старте', 'Первая женщина — командир шаттла', 'Море Спокойствия'],
    correct_pairs: ['1Б', '2В', '3А', '4Г'] },
  long: { ...base, text: 'Соотнесите снимок и подпись',
    items: [mi(IMG.falcon), mi(IMG.collins), mi(IMG.hubble), mi({ src: moon, w: 800, h: 800 })],
    right: KEYS6.slice(0, 4), right_labels: ['Снимок «Хаббла» длиной в сотни часов выдержки: тысячи галактик на крошечном участке неба', 'Ракета многоразового использования: после старта первая ступень возвращается на Землю', 'Первая женщина — командир шаттла, дважды водившая корабли к орбитальным станциям', 'Тёмная равнина на Луне, где в июле 1969 года прилунился «Аполлон-11»'],
    correct_pairs: ['1Б', '2В', '3А', '4Г'] },
  mixed: { ...base, text: 'Соотнесите описание или снимок с названием',
    items: [mi(IMG.falcon), mt('Первая высадка человека на Луну, 1969 год'), mi(IMG.hubble), mt('Первая женщина — командир шаттла')],
    right: KEYS6.slice(0, 4), right_labels: ['Айлин Коллинз', '«Аполлон-11»', 'SpaceX', 'Космический телескоп «Хаббл»'],
    correct_pairs: ['1В', '2Б', '3Г', '4А'] },
  six: { ...base, text: 'Соотнесите описание или снимок с названием',
    items: [mi(IMG.falcon), mt('Орбитальная станция, работающая с 1998 года'), mi(IMG.collins), mt('Первый искусственный спутник Земли'), mi(IMG.hubble), mt('Марсоход, севший на Марс в 2021 году')],
    right: KEYS6, right_labels: ['МКС', 'Спутник-1', 'Айлин Коллинз', 'SpaceX', 'Телескоп «Хаббл»', '«Персеверанс»'],
    correct_pairs: ['1Г', '2А', '3В', '4Б', '5Д', '6Е'] },
}
export type MatchSet = typeof MATCH_SETS.normal
export const pairOf = (S: MatchSet, l: string) => S.correct_pairs.find(p => p.startsWith(l))!.slice(l.length)

/** «Порядок» (answer.mode 'order'): варианты с буквами, команды присылают последовательность букв; на показе — места 1…N */
export type OChoice = { key: string; text: string }
const obase = { title: 'Кино и литература', num: 2, qn: 6, qcount: 7, timer: 30 }
const NOV = [
  { key: 'А', text: '«Мастер и Маргарита»' }, { key: 'Б', text: '«Евгений Онегин»' }, { key: 'В', text: '«Мёртвые души»' },
  { key: 'Г', text: '«Преступление и наказание»' }, { key: 'Д', text: '«Тихий Дон»' },
]
export const ORDER_SETS = {
  normal: { ...obase, text: 'Расставьте романы в порядке публикации — от самого раннего', choices: NOV.slice(0, 4), correct_order: 'БВГА', media: false },
  long: { ...obase, text: 'Расставьте события в том порядке, в котором они происходили',
    choices: [
      { key: 'А', text: 'Первый человек в космосе: Юрий Гагарин облетел Землю за 108 минут' }, { key: 'Б', text: 'Запуск первого искусственного спутника Земли с радиомаяком на борту' },
      { key: 'В', text: 'Экипаж «Аполлона-11» высаживается в Море Спокойствия на Луне' }, { key: 'Г', text: 'Космический телескоп «Хаббл» выведен на орбиту шаттлом «Дискавери»' }],
    correct_order: 'БАВГ', media: false },
  five: { ...obase, text: 'Расставьте романы от самого позднего к самому раннему', choices: NOV, correct_order: 'АДГВБ', media: false },
  six: { ...obase, text: 'Расставьте планеты по удалению от Солнца — от ближайшей',
    choices: [{ key: 'А', text: 'Марс' }, { key: 'Б', text: 'Сатурн' }, { key: 'В', text: 'Венера' }, { key: 'Г', text: 'Юпитер' }, { key: 'Д', text: 'Меркурий' }, { key: 'Е', text: 'Земля' }],
    correct_order: 'ДВЕАГБ', media: false },
  media: { ...obase, text: 'Расставьте запуски в порядке времени — от самого раннего',
    choices: [{ key: 'А', text: '«Хаббл»' }, { key: 'Б', text: 'Спутник-1' }, { key: 'В', text: '«Аполлон-11»' }, { key: 'Г', text: 'Falcon Heavy' }],
    correct_order: 'БВАГ', media: true },
}
export type OrderSet = typeof ORDER_SETS.normal
