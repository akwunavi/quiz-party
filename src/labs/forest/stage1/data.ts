// ═══ Этап 1 — содержимое (одинаковое для всех трёх композиций механики) ═══
// Формы данных повторяют настоящие: «120 секунд» — SprintBoard (все вопросы на
// одном слайде, отсчёт «читаем вопросы», таймер, разбор по одному);
// «Блиц» — BlitzBoard/blitzState (часы у каждой команды, 3 попытки, банк, кубик);
// «Три попытки» — RevealRound/reveal.ts (фазы 1/2/3, картинки ЗАМЕНЯЮТСЯ, баллы 2/1/0,5).
import { IMG } from '../content'
import moon from '../media/moon.jpg'
import { TEAMS } from '../../magic2/data'

export const MOON = { src: moon, w: 800, h: 800, caption: 'Луна' }
export type SprintQ = { n: number; text: string; answer: string; img?: { src: string; w: number; h: number } }
export const SPRINT = {
  title: '120 секунд', total: 120, readDelay: 5,
  rules: 'Восемь вопросов сразу на экране. Отвечайте в любом порядке — у вас 120 секунд.',
  questions: [
    { n: 1, text: 'Какая река — самая длинная в Европе?', answer: 'Волга' },
    { n: 2, text: 'Сколько клавиш у классического фортепиано?', answer: '88' },
    { n: 3, text: 'Кто написал роман «Мастер и Маргарита»?', answer: 'Михаил Булгаков' },
    { n: 4, text: 'Какой химический элемент обозначают буквой K?', answer: 'Калий' },
    { n: 5, text: 'Как называется этот кофейный напиток?', answer: 'Эспрессо', img: IMG.coffee },
    { n: 6, text: 'Какой город называют Северной Пальмирой?', answer: 'Санкт-Петербург' },
    { n: 7, text: 'Как называется этот цветок?', answer: 'Георгин', img: IMG.dahlia },
    { n: 8, text: 'Какой русский писатель в 1852 году сжёг второй том своей поэмы?', answer: 'Николай Гоголь' },
  ] as SprintQ[],
}

const tcol = (hue: number) => `hsl(${hue} 52% 66%)`
export type BzTeam = { id: string; name: string; color: string; left: number; correct: number; missed: number; done: boolean }
/** Пять команд, порядок ходов задан кубиком; первая уже отыграла, вторая — в ходе. */
export const BLITZ = {
  title: 'Блиц', perTeam: 60, bank: 23, attemptsMax: 3,
  rules: 'У каждой команды своя минута. Три попытки на вопрос, пропуск — минус очко. Время идёт только у той команды, чей ход.',
  teams: [
    { id: 't3', name: TEAMS[2].name, color: tcol(TEAMS[2].hue), left: 0, correct: 5, missed: 1, done: true },
    { id: 't1', name: TEAMS[0].name, color: tcol(TEAMS[0].hue), left: 38, correct: 3, missed: 1, done: false },
    { id: 't5', name: TEAMS[4].name, color: tcol(TEAMS[4].hue), left: 60, correct: 0, missed: 0, done: false },
    { id: 't2', name: TEAMS[1].name, color: tcol(TEAMS[1].hue), left: 60, correct: 0, missed: 0, done: false },
    { id: 't4', name: TEAMS[3].name, color: tcol(TEAMS[3].hue), left: 60, correct: 0, missed: 0, done: false },
  ] as BzTeam[],
  active: 't1',
  question: { text: 'Столица Норвегии?', answer: 'Осло', wrong: 'Стокгольм' },
  next: { text: 'Сколько будет семь умножить на восемь?', answer: '56' },
  /** Итог раунда — как после того, как часы кончились у всех. */
  final: [{ id: 't3', correct: 5, missed: 1 }, { id: 't1', correct: 7, missed: 1 }, { id: 't5', correct: 4, missed: 0 }, { id: 't2', correct: 3, missed: 2 }, { id: 't4', correct: 2, missed: 1 }],
}

export const REVEAL = {
  title: 'Три попытки', word: 'КОСМОС', open: [0], note: 'Ракета, астронавт, снимок «Хаббла» и Луна — всё это космос.',
  imgs: [IMG.falcon, IMG.collins, IMG.hubble, MOON],
  phases: [{ n: 1, sec: 30, pts: '2' }, { n: 2, sec: 20, pts: '1' }, { n: 3, sec: 10, pts: '0,5' }],
  rules: 'Отгадайте слово по картинкам. Фаза 1 — две картинки и 2 балла; дальше картинки сменяются, а баллов меньше.',
  answers: [
    { team: TEAMS[0].name, color: tcol(TEAMS[0].hue), text: 'космос', phase: 1, ok: true },
    { team: TEAMS[1].name, color: tcol(TEAMS[1].hue), text: 'небо', phase: 1, ok: false },
    { team: TEAMS[2].name, color: tcol(TEAMS[2].hue), text: 'космос', phase: 2, ok: true },
    { team: TEAMS[3].name, color: tcol(TEAMS[3].hue), text: 'вселенная', phase: 3, ok: false },
    { team: TEAMS[4].name, color: tcol(TEAMS[4].hue), text: 'космос', phase: 3, ok: true },
  ],
}
