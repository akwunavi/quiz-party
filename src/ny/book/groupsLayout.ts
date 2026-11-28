// ═══ «Книга», модалка «Составы команд»: сетка по числу команд (чистая функция, без сети) ═══
// Карточки команд идут сеткой в полезной области большого свитка (ScrollModal, kind 'grp'). Единицы — «пиксели мокапа» (--u, 1920 → 1:1).
// Меньше команд — меньше колонок, крупнее карточка и текст; на 17–24 командах строки растут по содержимому, и если состав велик —
// прокрутка ВНУТРИ свитка (мягкий градиент снизу). Игровую логику не трогает: считает размеры по уже известному числу команд.

export interface GroupsLayout {
  /** колонок в сетке */
  cols: number
  /** высота плитки команды (--u) */
  ch: number
  /** кегль списка участников (--u) */
  fs: number
  /** предел ширины ячейки (--u): при 1–4 командах карточки не растягиваются на весь свиток; 0 — без предела */
  cell: number
  /** плотная сетка (13–24 команды): меньше отступы между и внутри карточек, всё обязано поместиться без прокрутки */
  tight?: boolean
}

export function groupsLayout(n: number): GroupsLayout {
  const t = Math.max(1, Math.floor(n))
  if (t === 1) return { cols: 1, ch: 120, fs: 32, cell: 560 }
  if (t === 2) return { cols: 2, ch: 110, fs: 30, cell: 430 }
  if (t === 3) return { cols: 3, ch: 96, fs: 26, cell: 296 }
  if (t === 4) return { cols: 2, ch: 92, fs: 26, cell: 430 }
  if (t <= 6) return { cols: 3, ch: 84, fs: 25, cell: 0 }
  if (t <= 8) return { cols: 4, ch: 76, fs: 22, cell: 0 }
  if (t === 9) return { cols: 3, ch: 66, fs: 21, cell: 0 }
  if (t <= 12) return { cols: 4, ch: 62, fs: 20, cell: 0 }
  if (t <= 18) return { cols: 6, ch: 50, fs: 19, cell: 0, tight: true }
  return { cols: 6, ch: 44, fs: 17, cell: 0, tight: true }
}

/** «1 команда · 2–4 команды · 5+ команд» */
export function teamsWord(n: number): string {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'команда'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'команды'
  return 'команд'
}
