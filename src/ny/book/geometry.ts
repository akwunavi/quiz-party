// ═══ «Книга» (ny_book): геометрия разворота и раскладка лобби — ЧИСТЫЕ функции, без DOM и сети ═══
// Прототип этапа 2 (docs-dev/book-redesign/PROTOTYPES.md). Числа — в пикселях сцены 1920×1080: книга, декор и fx
// масштабируются целиком режимом Stage fit="contain" (масштаб = min(w/1920, h/1080) = --u), поэтому книга ВСЕГДА
// видна целиком, а поля вёрстки (--bk-safe-*) совпадают с полями страниц.
import type { Density } from '../types'

export interface Rect { x: number; y: number; w: number; h: number }

export const SCENE = { w: 1920, h: 1080 } as const
/** Книга в сцене: обложка выступает за этот прямоугольник на 22–32 px. */
export const BOOK: Rect = { x: 64, y: 50, w: 1792, h: 990 }
/** Страницы в координатах КНИГИ. */
export const PAGE_L: Rect = { x: 0, y: 0, w: BOOK.w / 2, h: BOOK.h }
export const PAGE_R: Rect = { x: BOOK.w / 2, y: 0, w: BOOK.w / 2, h: BOOK.h }
/** Безопасная область игровой вёрстки в координатах СЦЕНЫ (в CSS — --bk-safe-t/-x/-b). */
export const SAFE = { t: 134, x: 250, b: 136 } as const

/** Сколько декора: лобби — максимум, игра (вопрос/ответы) — минимум, прочее — средне. */
export function bookDecor(phase: string | undefined): Density {
  switch (phase) {
    case undefined: case 'lobby': return 'sparse'
    case 'question': case 'show_answers': case 'answer_time': case 'recap': return 'dense'
    default: return 'medium'
  }
}

// ── Лобби: команды на правой странице без пустых мест ──
export type LobbyMode = 'invite' | 'cards' | 'list' | 'cols2' | 'cols3'
export interface LobbyLayout { mode: LobbyMode; cols: number; perCol: number; fontU: number; hidden: number }

/** Область команд на правой странице (координаты книги). */
export const TEAMS_BOX: Rect = { x: 960, y: 250, w: 740, h: 680 }
const MAX_PER_COL = 8
const MAX_COLS = 3

/** 0 → приглашение без пустых слотов; 1–4 → крупные карточки; 5–8 → список; 9–16 → две колонки; 17–24 → три;
 *  25+ → три колонки по 8, последняя ячейка — «+N ещё» (только когда уже не помещается). */
export function lobbyLayout(n: number): LobbyLayout {
  const k = Math.max(0, Math.floor(n))
  if (k === 0) return { mode: 'invite', cols: 0, perCol: 0, fontU: 0, hidden: 0 }
  if (k <= 4) return { mode: 'cards', cols: 1, perCol: k, fontU: 46, hidden: 0 }
  if (k <= 8) return { mode: 'list', cols: 1, perCol: k, fontU: k <= 6 ? 38 : 34, hidden: 0 }
  if (k <= 16) return { mode: 'cols2', cols: 2, perCol: Math.ceil(k / 2), fontU: k <= 10 ? 32 : 28, hidden: 0 }
  const cap = MAX_COLS * MAX_PER_COL
  if (k <= cap) return { mode: 'cols3', cols: 3, perCol: Math.ceil(k / 3), fontU: 24, hidden: 0 }
  return { mode: 'cols3', cols: 3, perCol: MAX_PER_COL, fontU: 24, hidden: k - (cap - 1) }
}

/** Высота строки команды (px сцены) — чтобы проверить, что раскладка влезает в TEAMS_BOX. */
export function lobbyRowH(l: LobbyLayout): number {
  if (l.mode === 'cards') return 118
  if (l.mode === 'list') return 62
  return l.mode === 'cols2' ? 62 : 56
}
