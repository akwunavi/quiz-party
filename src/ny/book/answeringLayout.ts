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
  // 10.75: плитки КРУПНЕЕ (при 1–8 командах ≥ 124u, при 16 — 100, при 24 — 80 вместо 62). Текстовая область плитки = ширина колонки − 0.96·ch (края ассета масштабируются
  // вместе с высотой), поэтому растим и высоту, и колонку: меньше команд — меньше колонок и шире сетка. Бюджет по высоте тот же, ≤ 780u (см. тест).
  if (t === 0) return { cols: 1, ch: 0, timer: 330, title: 150, width: 0 }
  if (t === 1) return { cols: 1, ch: 190, timer: 300, title: 140, width: 760 }
  if (t === 2) return { cols: 2, ch: 170, timer: 300, title: 140, width: 1400 }
  if (t === 3) return { cols: 3, ch: 160, timer: 290, title: 130, width: 1500 }
  if (t === 4) return { cols: 2, ch: 150, timer: 270, title: 130, width: 1300 }
  if (t <= 6) return { cols: 3, ch: 140, timer: 250, title: 120, width: 1500 }
  if (t <= 8) return { cols: 3, ch: 124, timer: 230, title: 110, width: 1500 }
  if (t <= 12) return { cols: 3, ch: 100, timer: 200, title: 100, width: 1500 }
  if (t <= 16) return { cols: 4, ch: 100, timer: 180, title: 90, width: 1500 }
  if (t <= 20) return { cols: 4, ch: 90, timer: 150, title: 80, width: 1560 }
  if (t <= 24) return { cols: 4, ch: 80, timer: 130, title: 70, width: 1560 }
  return { cols: 6, ch: 56, timer: 120, title: 66, width: 1560 }
}
