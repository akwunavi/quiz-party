// ═══ Этап 2 — содержимое «Своей игры» и «Угадай мелодию» ═══
// Формы данных повторяют настоящие (types/quiz.ts):
//  · «Своя игра» — JeopardyTheme { name, hint?, tiles: { value, audio, correct }[] }; плитка — ЗВУК
//    (клип 30 с, settings.clipSeconds), ответы команд по скорости, «Показать ответ» и ✓/✗ ведущего,
//    сыгранная плитка гаснет; цены по умолчанию из редактора — 0,5 / 1 / 1,5 / 2.
//  · «Угадай мелодию» — MelodyTheme { name, tracks: { audio, correct }[] }; рулетка → «слушаем
//    1 секунду» → ставки секундами (2–5 с → 2 балла, 6–10 с → 1, ход второй команде → 0,5) →
//    отрывок длиной в ставку → ответ → (передача хода) → ответ на экране; таймеры — bidSec 10,
//    answerSec 30, passAnswerSec 10 (lib/melody.ts, MelodyRound.tsx).
import { TEAMS } from '../../magic2/data'

const tcol = (hue: number) => `hsl(${hue} 52% 66%)`
const T = TEAMS.map((t, i) => ({ id: `t${i + 1}`, name: t.name, color: tcol(t.hue) }))
export const TEAM = (id: string) => T.find(t => t.id === id)!
export const fmtVal = (v: number) => String(v).replace('.', ',')
export const balla = (v: number) => (v === 1 ? 'балл' : v < 1 || v % 1 ? 'балла' : v >= 2 && v <= 4 ? 'балла' : 'баллов')

export const JP2 = {
  title: 'Своя игра',
  themes: [
    { name: 'Кинозвуки', hint: 'угадайте фильм' }, { name: 'Голоса', hint: 'кто поёт?' },
    { name: 'Оркестр и народные инструменты', hint: 'какой инструмент' }, { name: 'Мультфильмы' }, { name: 'Звуки большого города', hint: 'где это?' },
  ],
  values: [0.5, 1, 1.5, 2],
  /** сыгранные плитки «тема-плитка» */
  played: ['0-0', '1-0', '1-1', '2-0', '3-0', '3-1', '4-2'],
  open: { ti: 0, i: 2 },
  correct: '«Сталкер» — проезд на дрезине',
  clip: 30,
  /** ответы по скорости (как в модалке плитки: #1, #2 …) */
  answers: [
    { team: 't3', text: 'Сталкер', ok: true }, { team: 't1', text: 'Сталкер, Тарковский', ok: true },
    { team: 't5', text: 'Солярис', ok: false }, { team: 't2', text: 'Зеркало', ok: false },
  ],
}

export const MEL2 = {
  title: 'Угадай мелодию',
  themes: ['Классика в кино', 'Саундтреки', 'Советская эстрада', 'Мюзиклы'],
  tracks: 4,
  played: ['0-0', '1-2', '2-1', '3-3'],
  pick: '2-2',
  bidSec: 10, answerSec: 30, passAnswerSec: 10, spinSec: 5,
  /** ставки: меньше секунд — играет раньше */
  bids: [{ team: 't4', sec: 3 }, { team: 't1', sec: 5 }, { team: 't5', sec: 6 }, { team: 't2', sec: 9 }],
  /** кто уже поставил в момент «ставки идут» */
  bidding: ['t4', 't1', 't2'],
  correct: '«Позвони мне, позвони» — Ирина Муравьёва',
  firstAnswer: 'Песня из «Карнавала»… «Позвони мне»',
  wrongAnswer: '«Старый клён»',
  secondAnswer: 'Позвони мне, позвони',
}
export const ALL_TEAMS = T
