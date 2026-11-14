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
