// ═══ «Рабочая область темы» для ручной компоновки (общий механизм всех тем) ═══
// Раскладка хранится в долях рабочей области (lib/layoutRects.ts); у каждой темы своя область — поля декора, слот таймера, плашка вопроса, кнопки ведущего.
// Книга — та же область, что BookSafeArea (единицы сцены --u, учитывает поля contain-сцены). Остальные темы — доли окна, выведенные из их CSS:
//   сверху 17vh (кольцо таймера 168px на 1080 + плашка «Р1 · ВОПРОС», 01-base/22-question), снизу 11vh (.host-actions: right 28 / bottom 24, 11-projector-media padding-bottom 96px),
//   по бокам 4vw. Одна и та же раскладка в разных темах выглядит по ПРОПОРЦИЯМ близко, но не пиксель в пиксель — у тем разные поля и декор (это ожидаемо).
// «Волшебный лес» рисует вопрос своим экраном внутри кадра 1920×1080 (ForestQuestionScreen) — ручная раскладка для него не подключена (null).
import { SAFE, SCENE } from '../ny/book/geometry'
import { TOP_BAND } from '../ny/book/adaptive/safeArea'

export interface AreaCss { left: string; top: string; width: string; height: string }
export interface AreaBox { x: number; y: number; w: number; h: number }

const GENERIC = { l: 4, t: 17, r: 4, b: 11 }   // vw / vh, %

/** Тема поддерживает ручную раскладку (есть рабочая область)? */
export const themeHasLayoutArea = (theme: string | undefined): boolean => theme !== 'enchanted_forest' && !!theme
/** Книга: между страницами есть сгиб — картинки не должны на него заходить. */
export const themeHasFold = (theme: string | undefined): boolean => theme === 'ny_book'

/** CSS-прямоугольник рабочей области (для контейнера внутри .host-screen / оверлея редактора). */
export function layoutAreaCss(theme: string | undefined): AreaCss | null {
  if (!themeHasLayoutArea(theme)) return null
  if (theme === 'ny_book') {
    const u = 'var(--u)'
    return { left: `calc(var(--bk-ox) + ${SAFE.x} * ${u})`, top: `calc(var(--bk-oy) + ${TOP_BAND} * ${u})`, width: `calc(${SCENE.w - 2 * SAFE.x} * ${u})`, height: `calc(${SCENE.h - SAFE.b - TOP_BAND} * ${u})` }
  }
  return { left: `${GENERIC.l}vw`, top: `${GENERIC.t}vh`, width: `${100 - GENERIC.l - GENERIC.r}vw`, height: `${100 - GENERIC.t - GENERIC.b}vh` }
}

/** Та же область в пикселях окна (для тестов и расчётов). */
export function layoutAreaPx(theme: string | undefined, vw: number, vh: number): AreaBox | null {
  if (!themeHasLayoutArea(theme)) return null
  if (theme === 'ny_book') {
    const u = Math.min(vw / SCENE.w, vh / SCENE.h), ox = Math.max(0, (vw - SCENE.w * u) / 2), oy = Math.max(0, (vh - SCENE.h * u) / 2)
    return { x: ox + SAFE.x * u, y: oy + TOP_BAND * u, w: (SCENE.w - 2 * SAFE.x) * u, h: (SCENE.h - SAFE.b - TOP_BAND) * u }
  }
  return { x: vw * GENERIC.l / 100, y: vh * GENERIC.t / 100, w: vw * (100 - GENERIC.l - GENERIC.r) / 100, h: vh * (100 - GENERIC.t - GENERIC.b) / 100 }
}

// ── v:2 — раскладка в долях ВСЕГО экрана (10.70) ──
/** «Экран» раскладки v:2: Книга — вся сцена 1920×1080 (с полями contain-сцены --bk-ox/--bk-oy), остальные темы — всё окно. */
export function sceneAreaCss(theme: string | undefined): AreaCss | null {
  if (!themeHasLayoutArea(theme)) return null
  if (theme === 'ny_book') return { left: 'var(--bk-ox)', top: 'var(--bk-oy)', width: `calc(${SCENE.w} * var(--u))`, height: `calc(${SCENE.h} * var(--u))` }
  return { left: '0', top: '0', width: '100vw', height: '100vh' }
}

/** Рабочая область темы (прежний v:1) в долях ВСЕГО экрана v:2 — для чтения старых раскладок и стартовых рамок. */
export function workAreaFractions(theme: string | undefined): AreaBox {
  if (theme === 'ny_book') return { x: SAFE.x / SCENE.w, y: TOP_BAND / SCENE.h, w: (SCENE.w - 2 * SAFE.x) / SCENE.w, h: (SCENE.h - SAFE.b - TOP_BAND) / SCENE.h }
  return { x: GENERIC.l / 100, y: GENERIC.t / 100, w: (100 - GENERIC.l - GENERIC.r) / 100, h: (100 - GENERIC.t - GENERIC.b) / 100 }
}

/** «Занятые» места экрана (доли экрана v:2): таймер/плашка, кнопки ведущего, сгиб, декор по краям. Рамки МОЖНО ставить поверх — редактор лишь предупреждает. */
export interface BusyZone { id: 'timer' | 'buttons' | 'fold' | 'decor'; label: string; x: number; y: number; w: number; h: number }
export function busyZones(theme: string | undefined): BusyZone[] {
  if (theme === 'ny_book') {
    const W = SCENE.w, H = SCENE.h
    return [
      { id: 'timer', label: 'таймер, плашка номера вопроса и гирлянда', x: 0, y: 0, w: 1, h: TOP_BAND / H },
      { id: 'buttons', label: 'кнопки ведущего и сугроб', x: (W - 560) / W, y: (H - SAFE.b) / H, w: 560 / W, h: SAFE.b / H },
      { id: 'fold', label: 'сгиб книги', x: (W / 2 - 60) / W, y: TOP_BAND / H, w: 120 / W, h: (H - TOP_BAND - SAFE.b) / H },
      { id: 'decor', label: 'ёлки по краям', x: 0, y: TOP_BAND / H, w: SAFE.x * 0.7 / W, h: 1 - TOP_BAND / H },
      { id: 'decor', label: 'ёлки по краям', x: 1 - SAFE.x * 0.7 / W, y: TOP_BAND / H, w: SAFE.x * 0.7 / W, h: 1 - TOP_BAND / H },
    ]
  }
  return [
    { id: 'timer', label: 'таймер и плашка номера вопроса', x: 0, y: 0, w: 1, h: GENERIC.t / 100 },
    { id: 'buttons', label: 'кнопки ведущего', x: 0.62, y: 1 - GENERIC.b / 100, w: 0.38, h: GENERIC.b / 100 },
  ]
}
