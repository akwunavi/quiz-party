// ═══ «Книга»: экран «Отвечайте!» — раскладка по числу команд (чистая функция, без сети) ═══
// Карточки команд (BookTeamCard) идут сеткой под таймером; чем больше команд, тем мельче карточка,
// заголовок и таймер — всё должно оставаться ВНУТРИ страницы (между гирляндой и сугробами).
// Единицы — «пиксели мокапа» (--u, 1920 → 1:1). Бюджет по высоте (замерен на стенде e2e/book, сцены 09n*): ≈ 780u между отступами.
// Игровую логику не трогает: считает только размеры по уже известному числу команд.

export interface AnsweringLayout {
  /** число колонок сетки */
  cols: number
  /** высота карточки команды (в --u) */
  ch: number
  /** диаметр таймера (в --u) */
  timer: number
  /** кегль заголовка «ОТВЕЧАЙТЕ!» (в --u) */
  title: number
  /** ширина сетки (в --u) */
  width: number
}

export function answeringLayout(n: number): AnsweringLayout {
  const t = Math.max(0, Math.floor(n))
  if (t === 0) return { cols: 1, ch: 0, timer: 330, title: 150, width: 0 }
  if (t <= 2) return { cols: t, ch: 100, timer: 300, title: 140, width: 300 * t + 40 }
  if (t <= 4) return { cols: t, ch: 96, timer: 290, title: 130, width: 1300 }
  if (t <= 8) return { cols: 4, ch: 90, timer: 250, title: 120, width: 1300 }
  if (t <= 12) return { cols: 4, ch: 80, timer: 230, title: 110, width: 1300 }
  if (t <= 16) return { cols: 4, ch: 70, timer: 200, title: 100, width: 1300 }
  if (t <= 24) return { cols: 4, ch: 62, timer: 170, title: 90, width: 1300 }
  return { cols: 6, ch: 52, timer: 150, title: 84, width: 1560 }
}
