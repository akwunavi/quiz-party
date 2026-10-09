// ═══ Этап 1 — содержимое (одинаковое для всех трёх композиций механики) ═══
// Формы данных повторяют настоящие: «120 секунд» — SprintBoard (все вопросы на
// одном слайде, отсчёт «читаем вопросы», таймер, разбор по одному);
// «Блиц» — BlitzBoard/blitzState (часы у каждой команды, 3 попытки, банк, кубик);
// «Три попытки» — RevealRound/reveal.ts (фазы 1/2/3, картинки ЗАМЕНЯЮТСЯ, баллы 2/1/0,5).
import { IMG } from '../content'
import moon from '../media/moon.jpg'
import { TEAMS } from '../../labs/magic2/data'
import { metaLine, type LoadedRound } from '../../lib/roundMeta'

/** Вступление раунда — ровно те поля, что ведущий заполняет в редакторе раунда:
 *  номер (по порядку в зачёте), название (строки через «/»), «короткая подсказка» под
 *  заголовком (автотекст metaLine() или своя), правила — пронумерованным списком. */
export type RoundIntroData = { num: string; titleLines: string[]; meta: string; rules: string[] }
const autoMeta = (mechanic: string, n: number, timer: number, settings: Record<string, unknown>) =>
  metaLine({ mechanic, settings, timer_seconds: timer, meta_line_override: null, questions: Array.from({ length: n }, () => ({ hidden: false })) } as unknown as LoadedRound)

export const MOON = { src: moon, w: 800, h: 800, caption: 'Луна' }
export type SprintQ = { n: number; text: string; answer: string; img?: { src: string; w: number; h: number } }
export const SPRINT = {
  title: '120 секунд', total: 120, readDelay: 5,
  intro: { num: '3', titleLines: ['120 секунд'], meta: autoMeta('sprint', 8, 120, { pointsPerQuestion: 2, allCorrectBonus: 5 }),
    rules: ['Все восемь вопросов — на экране сразу', 'Отвечайте в любом порядке, пока идёт время', '2 балла за каждый верный ответ, +5 — если верны все восемь'] } as RoundIntroData,
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
/** Ответы команд в разборе «120 секунд» (как столбец «ответы команд» на ShowAnswers: до показа —
 *  только число ответивших, после — текст и ✓/✗ автопроверки; ведущий может поправить в админке). */
export type TeamAns = { team: string; color: string; text: string; ok: boolean }
export const SPRINT_TEAM_ANS: Record<number, TeamAns[]> = {
  3: [
    { team: TEAMS[0].name, color: tcol(TEAMS[0].hue), text: 'Булгаков', ok: true },
    { team: TEAMS[1].name, color: tcol(TEAMS[1].hue), text: 'М. А. Булгаков', ok: true },
    { team: TEAMS[2].name, color: tcol(TEAMS[2].hue), text: 'Пастернак', ok: false },
    { team: TEAMS[3].name, color: tcol(TEAMS[3].hue), text: 'Михаил Булгаков', ok: true },
    { team: TEAMS[4].name, color: tcol(TEAMS[4].hue), text: '—', ok: false },
  ],
  7: [
    { team: TEAMS[0].name, color: tcol(TEAMS[0].hue), text: 'георгин', ok: true },
    { team: TEAMS[1].name, color: tcol(TEAMS[1].hue), text: 'хризантема', ok: false },
    { team: TEAMS[2].name, color: tcol(TEAMS[2].hue), text: 'Георгин', ok: true },
    { team: TEAMS[4].name, color: tcol(TEAMS[4].hue), text: 'астра', ok: false },
  ],
}
export type BzTeam = { id: string; name: string; color: string; left: number; correct: number; missed: number; done: boolean }
export type BzFinal = { id: string; correct: number; missed: number; left: number; timedOut?: boolean }
/** Пять команд, порядок ходов задан кубиком; первая уже отыграла, вторая — в ходе. */
export const BLITZ = {
  title: 'Блиц', perTeam: 60, bank: 23, attemptsMax: 3,
  intro: { num: '5', titleLines: ['Блиц'], meta: autoMeta('blitz', 48, 30, { teamSeconds: 60, timeoutPenalty: 10 }),
    rules: ['У каждой команды своя минута — время идёт только в её ход', 'Три попытки на вопрос, пропуск — минус очко', 'У кого первым кончится время — штраф −10', 'Места по очкам: 10 / 7 / 5 / 3 балла'] } as RoundIntroData,
  teams: [
    { id: 't3', name: TEAMS[2].name, color: tcol(TEAMS[2].hue), left: 22, correct: 5, missed: 1, done: false },
    { id: 't1', name: TEAMS[0].name, color: tcol(TEAMS[0].hue), left: 38, correct: 3, missed: 1, done: false },
    { id: 't5', name: TEAMS[4].name, color: tcol(TEAMS[4].hue), left: 41, correct: 2, missed: 0, done: false },
    { id: 't2', name: TEAMS[1].name, color: tcol(TEAMS[1].hue), left: 30, correct: 1, missed: 2, done: false },
    { id: 't4', name: TEAMS[3].name, color: tcol(TEAMS[3].hue), left: 47, correct: 2, missed: 1, done: false },
  ] as BzTeam[],
  active: 't1',
  question: { text: 'Столица Норвегии?', answer: 'Осло', wrong: 'Стокгольм' },
  next: { text: 'Сколько будет семь умножить на восемь?', answer: '56' },
  /** Итог раунда: раунд закрылся, когда время кончилось у «Кота» (он доиграл открытый вопрос
   *  и получил штраф); у остальных остались секунды — по ним бонус 3/2/1 (lib/blitz.ts). */
  final: [{ id: 't3', correct: 5, missed: 1, left: 12 }, { id: 't1', correct: 7, missed: 1, left: 0, timedOut: true }, { id: 't5', correct: 4, missed: 0, left: 20 }, { id: 't2', correct: 3, missed: 2, left: 5 }, { id: 't4', correct: 2, missed: 1, left: 20 }] as BzFinal[],
  timeoutPenalty: 10,
}

/** Для проверки раскладки блица на 8 командах (в игре число команд любое; порядок — по кубику). */
export const BLITZ_EXTRA: BzTeam[] = [
  { id: 't6', name: 'Ёжики в тумане', color: tcol(28), left: 35, correct: 2, missed: 0, done: false },
  { id: 't7', name: 'Знатоки с Лиговского проспекта', color: tcol(190), left: 26, correct: 3, missed: 2, done: false },
  { id: 't8', name: 'Пять минут славы', color: tcol(330), left: 44, correct: 1, missed: 1, done: false },
]
export const BLITZ_EXTRA_FINAL: BzFinal[] = [{ id: 't6', correct: 3, missed: 0, left: 8 }, { id: 't7', correct: 5, missed: 3, left: 15 }, { id: 't8', correct: 1, missed: 1, left: 2 }]

export const REVEAL = {
  title: 'Три попытки', word: 'КОСМОС', open: [0], note: 'Ракета, астронавт, снимок «Хаббла» и Луна — всё это космос.',
  imgs: [IMG.falcon, IMG.collins, IMG.hubble, MOON],
  phases: [{ n: 1, sec: 30, pts: '2' }, { n: 2, sec: 20, pts: '1' }, { n: 3, sec: 10, pts: '0,5' }],
  intro: { num: '4', titleLines: ['Три попытки'], meta: autoMeta('four_pics', 6, 30, {}),
    rules: ['Отгадайте слово по картинкам', 'Фаза 1 — две картинки, 2 балла', 'Фаза 2 и 3 — новая картинка, 1 и 0,5 балла'] } as RoundIntroData,
  answers: [
    { team: TEAMS[0].name, color: tcol(TEAMS[0].hue), text: 'космос', phase: 1, ok: true },
    { team: TEAMS[1].name, color: tcol(TEAMS[1].hue), text: 'небо', phase: 1, ok: false },
    { team: TEAMS[2].name, color: tcol(TEAMS[2].hue), text: 'космос', phase: 2, ok: true },
    { team: TEAMS[3].name, color: tcol(TEAMS[3].hue), text: 'вселенная', phase: 3, ok: false },
    { team: TEAMS[4].name, color: tcol(TEAMS[4].hue), text: 'космос', phase: 3, ok: true },
  ],
}
