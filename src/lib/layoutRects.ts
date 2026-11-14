// ═══ Ручная компоновка вопроса «Книги»: ЧИСТЫЕ функции (без DOM и сети) ═══
// Хранение (БЕЗ миграции): существующий jsonb `pack_questions.service`, ключ `layout`:
//   { question?: Rects, answer?: Rects }      Rects = { v: 1, imgs: string[], text?: Rect, images: Rect[] }
// Rect — ДОЛИ рабочей области разворота (0…1), не пиксели: одна правка одинаково выглядит на любом окне.
// `imgs` — пути картинок на момент настройки: если набор/порядок картинок изменился, раскладка считается устаревшей и применяется АВТО.
// Любая проблема (битая структура, другая версия, диапазоны) → null → авто-раскладка; проектор не падает.
import { SAFE, SCENE } from '../ny/book/geometry'
import { FOLD_GAP, TOP_BAND } from '../ny/book/adaptive/safeArea'
import { themeHasLayoutArea } from './layoutArea'

export interface Rect { x: number; y: number; w: number; h: number }
export interface Rects { v: 1; imgs: string[]; text?: Rect; images: Rect[] }
export type LayoutScreen = 'question' | 'answer'
export interface QuestionLayout { question?: Rects; answer?: Rects }

/** Рабочая область (px сцены 1920×1080) — та же, что у BookSafeArea.contentArea. */
export const WORK = { x: SAFE.x, y: TOP_BAND, w: SCENE.w - 2 * SAFE.x, h: SCENE.h - SAFE.b - TOP_BAND } as const
/** Зона сгиба в долях ширины рабочей области: картинки в неё не заходят (текст — может). */
export const FOLD = { from: 0.5 - FOLD_GAP / 2 / WORK.w, to: 0.5 + FOLD_GAP / 2 / WORK.w } as const
export const MIN_SIDE = 0.06
export const LAYOUT_KEY = 'layout'

const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const c01 = (v: number) => Math.min(1, Math.max(0, v))

/** Привести прямоугольник к допустимому: внутри 0…1, не меньше MIN_SIDE. */
export function clampRect(r: Rect): Rect {
  const w = Math.min(1, Math.max(MIN_SIDE, r.w)), h = Math.min(1, Math.max(MIN_SIDE, r.h))
  return { x: Math.min(1 - w, c01(r.x)), y: Math.min(1 - h, c01(r.y)), w, h }
}

/** Картинке нельзя лежать на сгибе: сдвигаем к ближайшей стороне, а если по ширине не помещается ни слева, ни справа — сужаем. */
export function keepOffFold(r: Rect): Rect {
  const cx = r.x + r.w / 2
  if (r.x >= FOLD.to || r.x + r.w <= FOLD.from) return r
  if (cx < 0.5) { const w = Math.max(MIN_SIDE, Math.min(r.w, FOLD.from - r.x)); return { ...r, w, x: Math.min(r.x, FOLD.from - w) } }
  const x = Math.max(r.x, FOLD.to); return { ...r, x, w: Math.max(MIN_SIDE, Math.min(r.w, 1 - x)) }
}

function readRect(v: unknown): Rect | null {
  if (!v || typeof v !== 'object') return null
  const r = v as Record<string, unknown>
  if (!num(r.x) || !num(r.y) || !num(r.w) || !num(r.h)) return null
  if (r.w <= 0 || r.h <= 0) return null
  return clampRect({ x: r.x, y: r.y, w: r.w, h: r.h })
}

/** Проверить и нормализовать раскладку одного экрана. null — авто (нет данных / битая / устарела). */
export function validateRects(raw: unknown, imgs: string[], fold = true): Rects | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (r.v !== 1) return null
  if (!Array.isArray(r.imgs) || r.imgs.length !== imgs.length || r.imgs.some((p, i) => p !== imgs[i])) return null
  if (!Array.isArray(r.images) || r.images.length !== imgs.length) return null
  const images: Rect[] = []
  for (const v of r.images) { const x = readRect(v); if (!x) return null; images.push(fold ? keepOffFold(x) : x) }
  let text: Rect | undefined
  if (r.text != null) { const t = readRect(r.text); if (!t) return null; text = t }
  if (!text && images.length === 0) return null
  return { v: 1, imgs: [...imgs], text, images }
}

/** Раскладка экрана из service вопроса (валидная или null). */
export function screenLayout(service: unknown, screen: LayoutScreen, imgs: string[], fold = true): Rects | null {
  const l = service && typeof service === 'object' ? (service as Record<string, unknown>)[LAYOUT_KEY] : null
  if (!l || typeof l !== 'object') return null
  return validateRects((l as Record<string, unknown>)[screen], imgs, fold)
}

/** 'manual' — применяется; 'stale' — есть, но картинки изменились/данные битые (покажем «раскладка сброшена»); 'auto' — нет. */
export function layoutStatus(service: unknown, screen: LayoutScreen, imgs: string[], fold = true): 'auto' | 'manual' | 'stale' {
  const l = service && typeof service === 'object' ? (service as Record<string, unknown>)[LAYOUT_KEY] : null
  const raw = l && typeof l === 'object' ? (l as Record<string, unknown>)[screen] : null
  if (raw == null) return 'auto'
  return validateRects(raw, imgs, fold) ? 'manual' : 'stale'
}

type Service = Record<string, unknown>
const asService = (s: unknown): Service => (s && typeof s === 'object' && !Array.isArray(s) ? { ...(s as Service) } : {})

/** Новый service с заменой раскладки ОДНОГО экрана; null — удалить экран; когда не осталось ничего — ключ layout удаляется целиком. Другие ключи service не трогаем. */
export function withScreenLayout(service: unknown, screen: LayoutScreen, rects: Rects | null): Service {
  const out = asService(service)
  const cur = out[LAYOUT_KEY] && typeof out[LAYOUT_KEY] === 'object' ? { ...(out[LAYOUT_KEY] as Record<string, unknown>) } : {}
  if (rects) cur[screen] = rects; else delete cur[screen]
  if (Object.keys(cur).length) out[LAYOUT_KEY] = cur; else delete out[LAYOUT_KEY]
  return out
}

/** Сохранение формы вопроса устаревшим снимком: поля service берём из формы, а ключ layout — ТОЛЬКО из свежей версии (база). */
export function mergeServiceKeepLayout(formService: unknown, freshService: unknown): Service {
  const out = asService(formService)
  delete out[LAYOUT_KEY]
  const fresh = asService(freshService)
  if (fresh[LAYOUT_KEY] !== undefined) out[LAYOUT_KEY] = fresh[LAYOUT_KEY]
  return out
}

// ── перевод долей ⇄ px сцены ──
export const rectToScene = (r: Rect): Rect => ({ x: WORK.x + r.x * WORK.w, y: WORK.y + r.y * WORK.h, w: r.w * WORK.w, h: r.h * WORK.h })
export const sceneToRect = (r: Rect): Rect => clampRect({ x: (r.x - WORK.x) / WORK.w, y: (r.y - WORK.y) / WORK.h, w: r.w / WORK.w, h: r.h / WORK.h })

/** Начальная ручная раскладка, когда замер авто-вида недоступен: текст сверху, картинки рядом под ним (не на сгибе). */
export function fallbackRects(imgs: string[], hasText: boolean, fold = true): Rects {
  const n = imgs.length
  const text: Rect | undefined = hasText ? { x: 0.05, y: 0.02, w: 0.9, h: n ? 0.3 : 0.9 } : undefined
  const images: Rect[] = []
  if (n) {
    const top = hasText ? 0.36 : 0.03, hh = hasText ? 0.6 : 0.94
    const side = n === 1 ? [[0.55, 0.42]] : null
    for (let i = 0; i < n; i++) {
      const colW = 0.9 / n
      { const r = clampRect(side ? { x: side[0][0], y: top, w: side[0][1], h: hh } : { x: 0.05 + i * colW, y: top, w: colW - 0.02, h: hh }); images.push(fold ? keepOffFold(r) : r) }
    }
  }
  return { v: 1, imgs: [...imgs], text, images }
}

const QUESTION_SCREEN_MECHANICS = new Set(['standard', 'test_stop', 'stakes_unique', 'stakes_free', 'thematic_x2', 'crossword'])
/** Можно ли настраивать компоновку вопроса: причина отказа текстом или null. Только «Книга»; только обычный экран «текст + картинки» (без вариантов/пар/ребуса/скрытого медиа). */
export function layoutUnsupportedReason(theme: string | undefined, mechanic: string, q: { answer: { mode: string }; media: { hidden?: boolean; question?: string[] } }): string | null {
  if (!themeHasLayoutArea(theme)) return 'Для темы «Волшебный лес» ручная компоновка не подключена: вопрос рисуется её собственной сценой.'
  if (!QUESTION_SCREEN_MECHANICS.has(mechanic)) return 'У этой механики свой экран — компоновка вручную для неё не предусмотрена.'
  if (q.answer.mode === 'choice' || q.answer.mode === 'order' || q.answer.mode === 'match') return 'У вопроса с вариантами, порядком или парами свой экран — компоновка вручную не предусмотрена.'
  if (q.media.hidden) return 'Медиа скрыто на экране — настраивать нечего.'
  if ((q.media.question ?? []).some(m => /\.(mp4|webm)$/i.test(m))) return 'У вопроса есть видео: его плеер живёт в потоке экрана — компоновка вручную не предусмотрена.'
  return null
}
