// ═══ Этап 5 — путь игры: содержимое ═══
// Данные — из общего тестового вечера (labs/magic2/data.ts): 12 команд, 6 раундов, составы рандомайзера, правила.
// Форма настоящая: лобби (HostScreen: чипы команд с иконкой/цветом, мёртвые — полупрозрачные, QR всегда маленький
// в левом нижнем углу, «ждём команды…»), рандомайзер (AdminPage.TeamRandomizer: имена → 2–8 команд → «Составы
// команд · N · M чел.»), правила (InfoSlide: пункты, раунды, статистика, сноска), табло (rankTeams: ничья по сумме
// решается по более ПОЗДНИМ раундам, нумерация плотная: после двух вторых мест идёт третье), финал.
import { TEAMS, total, GROUPS, SB_BEFORE, SB_AFTER, RULES, ROUNDS, PLAYER_URL, LAST } from '../magic2/data'
import { MEL2, JP2 } from '../../forest/stage2/data'
import type { RoundIntroData } from '../../forest/stage1/data'

export { GROUPS, RULES, ROUNDS, PLAYER_URL, LAST, MEL2, JP2 }
export const tcol = (hue: number) => `hsl(${hue} 52% 66%)`
export type T5 = { id: string; name: string; color: string; hue: number; alive: boolean; score: number[] }
export const ALL: T5[] = TEAMS.map(t => ({ id: t.id, name: t.name, color: tcol(t.hue), hue: t.hue, alive: t.alive, score: t.score }))
export const byId = (id: string) => ALL.find(t => t.id === id)!
export const tot = (t: T5, upto = 6) => t.score.slice(0, upto).reduce((a, b) => a + b, 0)

/** место по правилам игры: сортировка по сумме, при равенстве — по более поздним раундам; номер места плотный */
export function rank(teams: T5[], upto: number): { t: T5; place: number; sum: number }[] {
  const s = [...teams].sort((a, b) => {
    const d = tot(b, upto) - tot(a, upto); if (d) return d
    for (let i = upto - 1; i >= 0; i--) { const e = b.score[i] - a.score[i]; if (e) return e }
    return a.name.localeCompare(b.name)
  })
  let place = 0, prev: number | null = null
  return s.map(t => { const sum = tot(t, upto); if (prev === null || sum !== prev) place += 1; prev = sum; return { t, place, sum } })
}
export const BEFORE = rank(ALL, 1), AFTER = rank(ALL, 2), FINAL = rank(ALL, 6)
export { SB_BEFORE, SB_AFTER, total }

/** вечер: раунды по порядку (номер в зачёте), механика, название */
export const NIGHT = ROUNDS
export const WIN_ROUNDS = NIGHT.map((r, i) => { // победитель каждого раунда — для «ретро» в финале
  let best = ALL[0], v = -1
  for (const t of ALL) if (t.score[i] > v) { v = t.score[i]; best = t }
  return { round: r, team: best, pts: v }
})

/** вступления раундов, которых нет в этапе 1 (там уже утверждены «120 секунд», «Блиц», «Три попытки») */
const meta = (s: string) => s
export const INTROS5: Record<string, RoundIntroData> = {
  crossword: { num: '1', titleLines: ['Литературный', 'кроссворд'], meta: meta('8 вопросов · 45 сек · 1 балл'), rules: ['Определения читаем по одному — слово вписывается на телефоне в сетку', 'Буквы на пересечениях подсказывают соседние слова', 'Ответы и проверка — после раунда'] },
  standard: { num: '2', titleLines: ['Кино и литература'], meta: meta('7 вопросов · 30 сек · 1 балл'), rules: ['Один вопрос — одна команда-капитан с телефона', 'Ответ можно исправить два раза, пока идёт время', 'Верный ответ — 1 балл'] },
  jeopardy: { num: '3', titleLines: ['Своя игра'], meta: meta('5 тем · цены 100–500 · 1,5 балла за плитку'), rules: ['Команды выбирают тему и цену по очереди', 'Звучит отрывок — отвечает первая нажавшая команда', 'Верно — очки цены, неверно — минус'] },
  melody: { num: '4', titleLines: ['Угадай мелодию'], meta: meta('4 темы · 16 треков · ставки 2–10 секунд'), rules: ['Рулетка выбирает трек', 'Команды ставят: за сколько секунд угадают', 'Чем меньше ставка, тем больше баллов — 2, 1 или 0,5'] },
  anagram: { num: '6', titleLines: ['Скрэмбл'], meta: meta('3 вопроса · 30 сек · 2 балла'), rules: ['Буквы фразы перемешаны — соберите её по определению', 'Каждые 10 секунд одна буква встаёт на место', 'В гонке балл получает первая команда'] },
}
export const STATS = RULES.stats
