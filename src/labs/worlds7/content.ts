// ═══ Seven Worlds Lab — одинаковое содержимое для всех семи миров ═══
// Команды, «Своя игра» и «Угадай мелодию» — те же тестовые данные в формах
// продакшна, что и в Magic 2.0 Lab (../magic2/data.ts). Вопрос и ответ —
// один и тот же во всех мирах, чтобы сравнение было честным.
import { TEAMS, JOINING, JP, MELODY, team, type Team } from '../magic2/data'
export { TEAMS, JOINING, JP, MELODY, team, type Team }

export const GAME = { title: 'Quiz Party', room: 'BAR-7', steps: ['Наведите камеру телефона на код', 'Придумайте название команды', 'Ждите первый вопрос'] }
export const ROUND = { n: 2, name: 'Кино и литература', q: 5, of: 7 }
export const QUESTION = {
  text: 'Кто из писателей сжёг второй том своей поэмы за девять дней до смерти?',
  options: [
    { key: 'А', text: 'Александр Пушкин' }, { key: 'Б', text: 'Николай Гоголь' },
    { key: 'В', text: 'Михаил Лермонтов' }, { key: 'Г', text: 'Иван Тургенев' },
  ],
  correct: 'Б',
  fact: '«Мёртвые души», 1852 год',
  total: 30,
}
/** Кто что ответил (11 живых команд ответили, 8 — верно). */
export const PICKS: Record<string, string> = { t1: 'Б', t2: 'Б', t3: 'Б', t4: 'А', t5: 'Б', t6: 'Б', t7: 'В', t8: 'Б', t9: 'Г', t10: 'Б', t12: 'Б' }
export const RIGHT = TEAMS.filter(t => PICKS[t.id] === QUESTION.correct)
export const ANSWERED = Object.keys(PICKS).length
export const countFor = (k: string) => Object.values(PICKS).filter(v => v === k).length

/** Плитки «Своей игры»: состояние каждой — свободна / сыграна / выбрана. */
export const tileState = (c: number, r: number, sub: string) =>
  JP.played.includes(`${c}-${r}`) ? 'played' : c === JP.open.theme && r === JP.open.tile && sub !== 'board' ? 'sel' : 'free'
/** Треки мелодии. */
export const [MEL_C, MEL_R] = MELODY.pick.split('-').map(Number)
export const trackState = (c: number, r: number, sub: string) =>
  MELODY.played.includes(`${c}-${r}`) ? 'played' : c === MEL_C && r === MEL_R && sub !== 'board' ? 'sel' : 'free'

export type SceneId = 'lobby0' | 'lobby12' | 'qn' | 'qw' | 'answer' | 'jp' | 'melody' | 'timer'
export type Phase = 'normal' | 'warning' | 'zero'
export const phaseOf = (left: number): Phase => (left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal')
export type ViewProps = { scene: SceneId; sub: string; left: number; phase: Phase; play: number }
export type TimerProps = { left: number; total: number; phase: Phase; big?: boolean }
export type WorldMeta = {
  num: number; name: string; idea: string; place: string; laws: string; materials: string
  timer: string; jp: string; melody: string; teams: string; type: string
}
export type World = { meta: WorldMeta; View: (p: ViewProps) => JSX.Element; Timer: (p: TimerProps) => JSX.Element; fontNote?: string }
export const css = (o: Record<string, string | number>) => o as React.CSSProperties
