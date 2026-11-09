// Слоты авторской графики арены. Шале, ели, трибуны и зрители рисует художник (уровень концептов B+C), а не код: здесь описано, КУДА встанет каждый слой
// (параллакс, высота, привязка), и загрузчик, который подключает готовые PNG/WebP из `public/arena/`. Нет файла — слой не рисуется (никаких заглушек из примитивов).
// Те же данные использует лист требований к графике (ASSET_BRIEF): размеры и привязки там — из этого списка.
import { ARENA } from './camera'
import { BERM_Y, HZ } from './art'

export interface SlotSpec {
  id: string; file: string; title: string
  /** Параллакс: доля хода камеры (0 — стоит, 1 — едет вместе с трассой). */
  parallax: number
  /** Нижняя кромка слоя в экранных пикселях кадра 1920×1080 (ось Y вниз). */
  bottomY: number
  /** Размер тайла в пикселях КАДРА 1920×1080 (1:1) и способ укладки. */
  tileW: number; tileH: number; mode: 'tile' | 'sequence'
  /** Сколько модулей лежит в файле по горизонтали (файл делится поровну). Для 'tile' — 1. */
  modules: number
  /** Что внутри и условия съёмки/отрисовки — попадает в ASSET_BRIEF. */
  note: string
}
export const SLOTS: SlotSpec[] = [
  { id: 'forest_far', file: 'forest_far.webp', title: 'Дальний хвойный склон с огоньками посёлка', parallax: 0.30, bottomY: BERM_Y - 40, tileW: 3840, tileH: 300, mode: 'tile', modules: 1,
    note: 'бесшовно по горизонтали; плотные заснеженные ели + крыши и тёплые окна далёких шале в просветах; воздушная дымка (мягче и светлее переднего плана); фон прозрачный сверху (небо и горы за ним)' },
  { id: 'village_mid', file: 'village_mid.webp', title: 'Зимняя деревня: шале, колокольня, дым из труб', parallax: 0.55, bottomY: BERM_Y - 10, tileW: 2752, tileH: 400, mode: 'sequence', modules: 3,
    note: '3 модуля (вариант A) или 4 (вариант B); края каждого модуля свободны (120 px) — стык закрывают ели/фонари спрайтами; шале с тёплыми окнами, балконы, гирлянды, колокольня, ели между домами; без зрителей' },
  { id: 'stands_crowd', file: 'stands_crowd.webp', title: 'Трибуна с публикой (вариант A)', parallax: 0.92, bottomY: BERM_Y + 30, tileW: 1596, tileH: 365, mode: 'sequence', modules: 2,
    note: 'модуль 2282×522 исходных px (≈1596×365 при 1×; трибуна ≈1300 px + зазор ≈290 px, в котором видны горы): низкая фронтальная трибуна с публикой, снежная крыша, гирлянды, баннеры; файл = обычный и зеркальный модули; нижние ~30 px прячет борт, публика остаётся над перилами ограждения' },
  { id: 'stands', file: 'stands.webp', title: 'Трибуны/навесы (без зрителей)', parallax: 0.92, bottomY: BERM_Y + 2, tileW: 2400, tileH: 340, mode: 'sequence', modules: 3,
    note: '3 модуля стыкуются в любом порядке; многоуровневые деревянные трибуны B (тёмно-синие металлические элементы, световые панели), навесы с гирляндами C; ярусы пустые — зрители отдельным слоем' },
  { id: 'crowd', file: 'crowd.webp', title: 'Зрители: три ряда отдельными слоями', parallax: 0.92, bottomY: BERM_Y + 2, tileW: 2400, tileH: 340, mode: 'sequence', modules: 3,
    note: 'те же 3 модуля по ширине, что и трибуны; КАЖДЫЙ из 3 рядов — отдельный PNG (rows 1–3), чтобы код качал ряды независимо; 2 позы на ряд (руки вниз / руки вверх)' },
  { id: 'spruce_set', file: 'spruce_set.webp', title: 'Крупные ели (спрайты)', parallax: 0.80, bottomY: BERM_Y + 2, tileW: 2400, tileH: 640, mode: 'sequence', modules: 6,
    note: '6–8 отдельных елей разной высоты на прозрачном фоне; ставятся кодом за ограждением; никогда не перед дорожками' },
]
export interface LoadedSlot { spec: SlotSpec; img: HTMLImageElement }
/** Грузит доступные слои; отсутствующие возвращает списком (их просто нет в кадре). */
export async function loadSlots(base: string, files?: string[]): Promise<{ loaded: LoadedSlot[]; missing: SlotSpec[] }> {
  const loaded: LoadedSlot[] = [], missing: SlotSpec[] = []
  await Promise.all(SLOTS.map(spec => new Promise<void>(res => {
    if (files && !files.includes(spec.file)) { missing.push(spec); res(); return } const img = new Image(); img.onload = () => { loaded.push({ spec, img }); res() }; img.onerror = () => { missing.push(spec); res() }; img.src = `${base}${spec.file}` })))
  loaded.sort((a, b) => a.spec.parallax - b.spec.parallax); return { loaded, missing }
}
/** Какой модуль файла стоит в плитке i: детерминированно, без одного и того же модуля подряд (при ≥ 2 модулях). */
export function moduleOf(i: number, modules: number): number {
  if (modules <= 1) return 0
  const n = ((i % 1000003) + 1000003) % 1000003
  return modules === 2 ? n % 2 : (n + Math.floor(n / modules)) % modules
}
/** Положение плиток слоя при камере camX: слева направо, покрывая кадр. Чистая функция — тестируется без холста. */
export function slotPlacements(spec: SlotSpec, camX: number, viewW = ARENA.W): { x: number; i: number; module: number }[] {
  const off = camX * spec.parallax, first = Math.floor(off / spec.tileW), out: { x: number; i: number; module: number }[] = []
  for (let i = first; i * spec.tileW - off < viewW; i++) out.push({ x: i * spec.tileW - off, i, module: moduleOf(i, spec.modules) })
  return out
}
export const GUIDE = { HZ, BERM_Y }
