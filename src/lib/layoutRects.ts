// ═══ Ручная компоновка вопроса «Книги»: ЧИСТЫЕ функции (без DOM и сети) ═══
// Хранение (БЕЗ миграции): существующий jsonb `pack_questions.service`, ключ `layout`:
//   { question?: Rects, answer?: Rects }      Rects = { v: 2, imgs: string[], text?: Rect, note?: Rect, images: Rect[] }
// v:2 (10.70) — Rect = ДОЛИ ВСЕГО ЭКРАНА (Книга: сцена 1920×1080; другие темы: окно), 0…1: рамки можно ставить куда угодно (поверх сгиба и декора). v:1 (доли рабочей области темы) читается
// и переводится в v:2 по области темы; пишется только v:2.
// `imgs` — пути картинок на момент настройки: если набор/порядок картинок изменился, раскладка считается устаревшей и применяется АВТО.
// Любая проблема (битая структура, другая версия, диапазоны) → null → авто-раскладка; проектор не падает.
import { SAFE, SCENE } from '../ny/book/geometry'
import { FOLD_GAP, TOP_BAND } from '../ny/book/adaptive/safeArea'
import { themeHasLayoutArea, workAreaFractions, busyZones } from './layoutArea'

export interface Rect { x: number; y: number; w: number; h: number }
/** text — текст вопроса (экран вопроса) или подложка «Правильный ответ» (экран ответа); note — пояснение к ответу (только экран ответа). */
export interface Rects { v: 2; imgs: string[]; text?: Rect; note?: Rect; images: Rect[]
  /** плитки вариантов (А/Б/В/Г…, правая колонка «сопоставления», порядок) — каждая отдельно; нет — плитки идут авто (10.71) */
  tiles?: Rect[]
  /** таймер: положение и размер (масштаб) рамки; нет — таймер на своём месте в шапке (10.71) */
  timer?: Rect
  /** экран ответа (10.71): текст вопроса сверху и колонка «ОТВЕТЫ КОМАНД» целиком — каждый своей рамкой; нет — на штатном месте */
  recall?: Rect; teams?: Rect }
/** v:1 — прежний формат: доли РАБОЧЕЙ области темы (читается и переводится в v:2; пишется только v:2). */
export interface RectsV1 { v: 1; imgs: string[]; text?: Rect; note?: Rect; images: Rect[] }
export type LayoutScreen = 'question' | 'answer'
export interface QuestionLayout { question?: Rects; answer?: Rects }

/** Рабочая область (px сцены 1920×1080) — та же, что у BookSafeArea.contentArea. */
export const WORK = { x: SAFE.x, y: TOP_BAND, w: SCENE.w - 2 * SAFE.x, h: SCENE.h - SAFE.b - TOP_BAND } as const
/** Зона сгиба в долях ширины рабочей области: картинки в неё не заходят (текст — может). */
export const FOLD = { from: 0.5 - FOLD_GAP / 2 / WORK.w, to: 0.5 + FOLD_GAP / 2 / WORK.w } as const
export const MIN_SIDE = 0.03   // v:2: свободный размер, но рамка не должна потеряться (≈ 58 px на 1920)
export const LAYOUT_KEY = 'layout'

/** Ключ картинки для layout.answer: КОРОТКИЙ ХЕШ пути, а не сам путь (service целиком уходит на телефоны — имена файлов ответа утекать не должны). */
export function imgKey(path: string): string {
  if (/^#[0-9a-f]{8}$/.test(path)) return path
  let h = 0x811c9dc5
  for (let i = 0; i < path.length; i++) { h ^= path.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 }
  return '#' + h.toString(16).padStart(8, '0')
}
const keyMatches = (stored: unknown, path: string) => stored === path || stored === imgKey(path)   // старые layout.answer с путями читаются без падения

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

/** Прямоугольник v:1 (доли рабочей области темы) → доли всего экрана (v:2). */
export function rectV1ToV2(r: Rect, theme: string | undefined): Rect {
  const a = workAreaFractions(theme)
  return clampRect({ x: a.x + r.x * a.w, y: a.y + r.y * a.h, w: r.w * a.w, h: r.h * a.h })
}
/** Раскладка v:1 → v:2 (структура сохраняется; рамки пересчитываются по области темы). */
export function toV2(r: RectsV1, theme: string | undefined): Rects {
  return { v: 2, imgs: [...r.imgs], text: r.text && rectV1ToV2(r.text, theme), note: r.note && rectV1ToV2(r.note, theme), images: r.images.map(x => rectV1ToV2(x, theme)) }
}

/** Проверить и нормализовать раскладку одного экрана (v:1 переводится в v:2 по теме). null — авто (нет данных / битая / устарела). Сгиб и декор рамкам не мешают. */
export function validateRects(raw: unknown, imgs: string[], theme?: string, nTiles = 0): Rects | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (r.v !== 1 && r.v !== 2) return null
  if (!Array.isArray(r.imgs) || r.imgs.length !== imgs.length || r.imgs.some((p, i) => !keyMatches(p, imgs[i]))) return null
  if (!Array.isArray(r.images) || r.images.length !== imgs.length) return null
  const images: Rect[] = []
  for (const v of r.images) { const x = readRect(v); if (!x) return null; images.push(x) }
  let text: Rect | undefined
  if (r.text != null) { const t = readRect(r.text); if (!t) return null; text = t }
  let note: Rect | undefined
  if (r.note != null) { const n = readRect(r.note); if (!n) return null; note = n }
  // 10.71: плитки и таймер — только в v:2. Плитки с другим числом (набор вариантов изменился) или битые → плитки авто, остальная раскладка живёт; битый таймер → таймер на месте.
  let tiles: Rect[] | undefined
  if (r.v === 2 && nTiles > 0 && Array.isArray(r.tiles) && r.tiles.length === nTiles) { const t = r.tiles.map(readRect); if (t.every((x): x is Rect => !!x)) tiles = t }
  const timer = r.v === 2 && r.timer != null ? readRect(r.timer) ?? undefined : undefined
  const recall = r.v === 2 && r.recall != null ? readRect(r.recall) ?? undefined : undefined
  const teams = r.v === 2 && r.teams != null ? readRect(r.teams) ?? undefined : undefined
  if (!text && !note && images.length === 0 && !tiles && !timer && !recall && !teams) return null
  const out: RectsV1 | Rects = { v: r.v as 1, imgs: [...imgs], text, note, images }
  if (r.v === 1) return toV2(out as RectsV1, theme)
  return { ...(out as unknown as Rects), v: 2, ...(tiles ? { tiles } : {}), ...(timer ? { timer } : {}), ...(recall ? { recall } : {}), ...(teams ? { teams } : {}) }
}

/** Раскладка экрана из service вопроса (валидная или null). */
export function screenLayout(service: unknown, screen: LayoutScreen, imgs: string[], theme?: string, nTiles = 0): Rects | null {
  const l = service && typeof service === 'object' ? (service as Record<string, unknown>)[LAYOUT_KEY] : null
  if (!l || typeof l !== 'object') return null
  return validateRects((l as Record<string, unknown>)[screen], imgs, theme, nTiles)
}

/** 'manual' — применяется; 'stale' — есть, но картинки изменились/данные битые (покажем «раскладка сброшена»); 'auto' — нет. */
export function layoutStatus(service: unknown, screen: LayoutScreen, imgs: string[], theme?: string, nTiles = 0): 'auto' | 'manual' | 'stale' {
  const l = service && typeof service === 'object' ? (service as Record<string, unknown>)[LAYOUT_KEY] : null
  const raw = l && typeof l === 'object' ? (l as Record<string, unknown>)[screen] : null
  if (raw == null) return 'auto'
  return validateRects(raw, imgs, theme, nTiles) ? 'manual' : 'stale'
}

type Service = Record<string, unknown>
const asService = (s: unknown): Service => (s && typeof s === 'object' && !Array.isArray(s) ? { ...(s as Service) } : {})

/** Новый service с заменой раскладки ОДНОГО экрана; null — удалить экран; когда не осталось ничего — ключ layout удаляется целиком. Другие ключи service не трогаем. */
export function withScreenLayout(service: unknown, screen: LayoutScreen, rects: Rects | null): Service {
  const out = asService(service)
  const cur = out[LAYOUT_KEY] && typeof out[LAYOUT_KEY] === 'object' ? { ...(out[LAYOUT_KEY] as Record<string, unknown>) } : {}
  // layout.answer хранит ХЕШИ картинок, не пути (утечка на телефон): пишем хеши, а ранее сохранённые пути переписываем при любом следующем сохранении
  const strip = (r: unknown) => (r && typeof r === 'object' && Array.isArray((r as Rects).imgs) ? { ...(r as Rects), imgs: (r as Rects).imgs.map(x => (typeof x === 'string' ? imgKey(x) : x)) } : r)
  if (rects) cur[screen] = screen === 'answer' ? strip(rects) : rects; else delete cur[screen]
  if (cur.answer) cur.answer = strip(cur.answer)
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
export function fallbackRects(imgs: string[], hasText: boolean, fold = true): RectsV1 {
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
/** Механики, у которых ручная раскладка ВОПРОСА включается ещё и «3 попытками» (RevealBoard: картинки + блок текста; буквенные ячейки остаются в своей зоне). */
const QUESTION_LAYOUT_EXTRA = new Set(['four_pics'])
/** Можно ли настраивать компоновку вопроса: причина отказа текстом или null. Только «Книга»; только обычный экран «текст + картинки» (без вариантов/пар/ребуса/скрытого медиа). */
export function layoutUnsupportedReason(theme: string | undefined, mechanic: string, q: { answer: { mode: string }; media: { hidden?: boolean; question?: string[] } }): string | null {
  if (!themeHasLayoutArea(theme)) return 'Для темы «Волшебный лес» ручная компоновка не подключена: вопрос рисуется её собственной сценой.'
  if (mechanic === 'four_pics') return null
  if (!QUESTION_SCREEN_MECHANICS.has(mechanic) && !QUESTION_LAYOUT_EXTRA.has(mechanic)) return 'У этой механики свой экран — компоновка вручную для неё не предусмотрена.'
  // 10.71: варианты, порядок и пары теперь тоже раскладываются вручную (плитки — каждая отдельно)
  if (q.media.hidden) return 'Медиа скрыто на экране — настраивать нечего.'
  if ((q.media.question ?? []).some(m => /\.(mp4|webm)$/i.test(m))) return 'У вопроса есть видео: его плеер живёт в потоке экрана — компоновка вручную не предусмотрена.'
  return null
}

/** Сколько плиток-вариантов на экране вопроса (каждой можно задать свою рамку): варианты и порядок текстом (если это не подписи на картинках), правая колонка «сопоставления» с подписями. */
export function tileCount(q: { answer: { mode: string; choices?: unknown[]; right?: unknown[]; right_labels?: unknown[] }; media: { hidden?: boolean; question?: string[] } }, nImgs: number): number {
  const a = q.answer
  if (a.mode === 'choice') return Array.isArray(a.choices) && nImgs > 1 && !q.media.hidden && a.choices.length === nImgs ? 0 : (a.choices?.length ?? 0)
  if (a.mode === 'order') return a.choices?.length ?? 0
  if (a.mode === 'match') return (a.right_labels ?? []).some(Boolean) ? (a.right?.length ?? 0) : 0
  return 0
}

/** Экран ПРАВИЛЬНОГО ОТВЕТА: причина отказа текстом или null. Поддержан обычный ответ «текст + картинки + пояснение» (свободный ответ, без вариантов/порядка/пар/ребуса/скрытого видео);
 *  ответы команд и шары-статусы остаются штатными. Условие общее для редактора, предпросмотра и проектора. */
export function answerLayoutUnsupportedReason(theme: string | undefined, mechanic: string, q: { answer: { mode: string }; media: { hidden?: boolean } }): string | null {
  if (!themeHasLayoutArea(theme)) return 'Для темы «Волшебный лес» ручная компоновка не подключена: ответ рисуется её собственной сценой.'
  if (mechanic === 'four_pics') return null
  if (!QUESTION_SCREEN_MECHANICS.has(mechanic)) return 'У этой механики свой разбор — компоновка ответа вручную для неё не предусмотрена.'
  // 10.71: варианты, порядок и пары тоже раскладываются вручную (плитки; ступени показа и подсветка верного остаются прежними)
  if (q.media.hidden) return 'Скрытое видео играет вместе с ответом — компоновка вручную не предусмотрена.'
  return null
}

/** Стартовая раскладка ответа, если замер экрана недоступен: подложка слева-сверху, картинки справа, пояснение снизу. */
export function fallbackAnswerRects(imgs: string[], hasNote: boolean, fold = true): RectsV1 {
  const n = imgs.length
  const images: Rect[] = []
  for (let i = 0; i < n; i++) { const r = clampRect({ x: 0.04 + (i % 2) * 0.24, y: 0.4 + Math.floor(i / 2) * 0.28, w: 0.22, h: 0.26 }); images.push(fold ? keepOffFold(r) : r) }
  return { v: 1, imgs: [...imgs], text: { x: 0.04, y: 0.04, w: 0.44, h: 0.3 }, note: hasNote ? { x: 0.04, y: 0.86, w: 0.44, h: 0.12 } : undefined, images }
}

/** «3 попытки»: стартовая раскладка картинок сеткой 2×2 по двум страницам (не на сгибе), без текста. */
export function fallbackGridRects(imgs: string[], fold = true): RectsV1 {
  const images = imgs.map((_, i) => { const r = clampRect({ x: i % 2 ? 0.55 : 0.05, y: i < 2 ? 0.04 : 0.5, w: 0.4, h: 0.44 }); return fold ? keepOffFold(r) : r })
  return { v: 1, imgs: [...imgs], images }
}

/** Сколько плиток на экране ОТВЕТА: варианты (текстом или картинками), строки порядка, пары сопоставления; у свободного ответа — 0. */
export function answerTileCount(q: { answer: { mode: string; choices?: unknown[]; correct_order?: string; left?: unknown[] } }): number {
  const a = q.answer
  if (a.mode === 'choice') return a.choices?.length ?? 0
  if (a.mode === 'order') return (a.correct_order ?? '').length
  if (a.mode === 'match') return a.left?.length ?? 0
  return 0
}

/** Вёрстку ответа ведёт общий AnswerScreen? Только раскрытый ответ поддержанного вида (до раскрытия — экран вопроса, в т.ч. для answer.mode==='anagram' вне «Скрэмбла»).
 *  Варианты/порядок/пары — только когда для них есть ручная раскладка (`manualAnswer`); без неё остаётся прежний экран ShowAnswers (авто-вид не меняется). */
export function answerUsesSharedScreen(theme: string | undefined, mechanic: string, q: { answer: { mode: string }; media: { hidden?: boolean } }, revealed: boolean, manualAnswer = false): boolean {
  const staged = q.answer.mode === 'choice' || q.answer.mode === 'order' || q.answer.mode === 'match'
  return revealed && !q.media.hidden && answerLayoutUnsupportedReason(theme, mechanic, q) === null && (!staged || manualAnswer)
}

// ── мягкие предупреждения (v:2): рамка поверх занятого места — НЕ запрет, а подсказка редактору ──
const inter = (a: Rect, b: Rect) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
/** Предупреждения о перекрытии рамок с таймером/плашкой/гирляндой, кнопками ведущего, сгибом и декором. Пустой список — всё чисто. Порог: пересечение > 4% площади рамки. */
export function layoutWarnings(rects: Rects, theme: string | undefined): string[] {
  const items: { name: string; r: Rect }[] = []
  if (rects.text) items.push({ name: 'Текст', r: rects.text })
  if (rects.note) items.push({ name: 'Пояснение', r: rects.note })
  rects.images.forEach((r, i) => items.push({ name: `Картинка ${i + 1}`, r }))
  rects.tiles?.forEach((r, i) => items.push({ name: `Вариант ${i + 1}`, r }))
  if (rects.recall) items.push({ name: 'Вопрос', r: rects.recall })
  if (rects.teams) items.push({ name: 'Ответы команд', r: rects.teams })
  const zones = busyZones(theme), out: string[] = []
  for (const it of items) {
    const area = it.r.w * it.r.h; const hit = new Set<string>()
    for (const z of zones) if (area > 0 && inter(it.r, z) / area > 0.04) hit.add(z.label)
    if (rects.timer && area > 0 && inter(it.r, rects.timer) / area > 0.04) hit.add('таймер')
    if (hit.size) out.push(`${it.name} лежит поверх: ${[...hit].join(', ')}`)
  }
  // сам таймер: поверх кнопок ведущего — предупреждение; на своём штатном месте (шапка) — нет
  if (rects.timer) { const bz = busyZones(theme).find(z => z.id === 'buttons'); if (bz && inter(rects.timer, bz) / (rects.timer.w * rects.timer.h) > 0.04) out.push('Таймер лежит поверх: кнопки ведущего и сугроб') }
  return out
}
