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
  /** Маршрут: явные места модулей (x — левый край модуля В КООРДИНАТАХ СЛОЯ, т.е. на экране x − camX·parallax). Есть — вместо периодической укладки. */
  route?: { x: number; module: number; scale?: number }[]
  /** Нижний срез исходника: строки ниже `from` плавно гаснут до `to` (собственный забор и сугробы ассета не дают «двойного забора»). Считается один раз при загрузке. */
  fadeBottom?: { from: number; to: number }
  /** Сколько строк исходника рисовать сверху (ниже — прозрачная пустота файла). Нет — вся высота. */
  contentH?: number
  /** Лёгкое притемнение слоя (0…0.2) цветом сумерек: окружение не перетягивает взгляд с собак. Считается при загрузке. */
  dim?: number
}
/** Деревня: параллакс как у трибуны (идут по одной «линии» маршрута), ширина кадра на экране и посадка по низу. */
export const VILLAGE_PARALLAX = 0.92, VILLAGE_W = 1037, VILLAGE_BOTTOM = BERM_Y - 18, VILLAGE_SRC_H = 723
export const SLOTS: SlotSpec[] = [
  { id: 'forest_far', file: 'forest_far.webp', title: 'Дальний хвойный склон с огоньками посёлка', parallax: 0.30, bottomY: BERM_Y - 40, tileW: 3840, tileH: 300, mode: 'tile', modules: 1,
    note: 'бесшовно по горизонтали; плотные заснеженные ели + крыши и тёплые окна далёких шале в просветах; воздушная дымка (мягче и светлее переднего плана); фон прозрачный сверху (небо и горы за ним)' },
  { id: 'village_mid', file: 'village_mid.webp', title: 'Зимняя деревня (один цельный кадр 1920×819): шале, рынок, часовая башня, ели, дым', parallax: VILLAGE_PARALLAX, bottomY: VILLAGE_BOTTOM, tileW: VILLAGE_W, tileH: Math.round(VILLAGE_SRC_H * VILLAGE_W / 1920), mode: 'sequence', modules: 1,
    route: [{ x: 1880, module: 0 }], fadeBottom: { from: 636, to: 690 }, contentH: VILLAGE_SRC_H, dim: 0.1,
    note: 'готовый ассет 1920×819 RGBA, один экземпляр на маршруте; собственный забор и сугробы внизу кадра садятся ЗА ограждение арены (не двойной забор); дым статичный, горы по бокам остаются видны' },
  { id: 'village_2', file: 'village_2.webp', title: 'Вторая деревня: другой силуэт и ритм домов', parallax: VILLAGE_PARALLAX, bottomY: VILLAGE_BOTTOM, tileW: 1080, tileH: 450, mode: 'sequence', modules: 1,
    route: [{ x: 4950, module: 0 }],
    note: 'ЖДЁТ АССЕТА (arena-brief/P2_VILLAGE2_SPRUCES_PLAN.md): RGBA ≈1920×800, тот же свет/стиль/боковой ракурс, ДРУГОЙ силуэт (например низкая длинная линия домов с рынком и каток-павильоном, без часовой башни), без собственного забора внизу или с гасимой кромкой; рисуется ширина 1080 px' },
  { id: 'stands_crowd', file: 'stands_crowd.webp', title: 'Трибуна с публикой (вариант A)', parallax: 0.92, bottomY: BERM_Y + 30, tileW: 1596, tileH: 365, mode: 'sequence', modules: 2,
    dim: 0.1, route: [{ x: 250, module: 0, scale: 0.9 }, { x: 3162, module: 1, scale: 0.74 }, { x: 6650, module: 0, scale: 0.84 }, { x: 8450, module: 1, scale: 0.95 }],
    note: 'модуль 2282×522 исходных px (≈1596×365 при 1×; трибуна ≈1300 px + зазор ≈290 px, в котором видны горы): низкая фронтальная трибуна с публикой, снежная крыша, гирлянды, баннеры; файл = обычный и зеркальный модули; нижние ~30 px прячет борт, публика остаётся над перилами ограждения' },
  { id: 'stands', file: 'stands.webp', title: 'Трибуны/навесы (без зрителей)', parallax: 0.92, bottomY: BERM_Y + 2, tileW: 2400, tileH: 340, mode: 'sequence', modules: 3,
    note: '3 модуля стыкуются в любом порядке; многоуровневые деревянные трибуны B (тёмно-синие металлические элементы, световые панели), навесы с гирляндами C; ярусы пустые — зрители отдельным слоем' },
  { id: 'crowd', file: 'crowd.webp', title: 'Зрители: три ряда отдельными слоями', parallax: 0.92, bottomY: BERM_Y + 2, tileW: 2400, tileH: 340, mode: 'sequence', modules: 3,
    note: 'те же 3 модуля по ширине, что и трибуны; КАЖДЫЙ из 3 рядов — отдельный PNG (rows 1–3), чтобы код качал ряды независимо; 2 позы на ряд (руки вниз / руки вверх)' },
  { id: 'spruce_set', file: 'spruce_set.webp', title: 'Крупные заснеженные ели: отдельные группы-разделители', parallax: 0.94, bottomY: BERM_Y - 8, tileW: 520, tileH: 420, mode: 'sequence', modules: 4,
    route: [{ x: 1465, module: 0, scale: 0.7 }, { x: 2950, module: 1, scale: 0.75 }, { x: 4400, module: 2, scale: 0.9 }, { x: 6070, module: 3, scale: 0.9 }, { x: 7800, module: 1 }],
    note: 'ЖДЁТ АССЕТА: лист из 4 модулей по горизонтали (2–3 крупные заснеженные ели разной высоты на группу, тёплые лампочки на нижних ветвях, прозрачный фон); на экране модуль 520×420 px, верхушка ниже крыши трибуны; стоят за ограждением, дорожек не касаются (низ у борта)' },
]
export interface LoadedSlot { spec: SlotSpec; img: HTMLImageElement | HTMLCanvasElement }
/** Готовит слой: мягко гасит низ по `fadeBottom` (альфа-маска на копии; файл не меняется). */
export function prepareSlotImage(spec: SlotSpec, img: HTMLImageElement): HTMLImageElement | HTMLCanvasElement {
  const f = spec.fadeBottom; if (!f && !spec.dim) return img
  const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height; const c = cv.getContext('2d')!
  c.drawImage(img, 0, 0)
  if (spec.dim) { c.globalCompositeOperation = 'source-atop'; c.fillStyle = `rgba(40,24,96,${spec.dim})`; c.fillRect(0, 0, cv.width, cv.height) }
  if (!f) return cv
  c.globalCompositeOperation = 'destination-in'
  const g = c.createLinearGradient(0, 0, 0, cv.height), k = (y: number) => Math.min(1, Math.max(0, y / cv.height))
  g.addColorStop(0, '#fff'); g.addColorStop(k(f.from), '#fff'); g.addColorStop(k(f.to), 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  c.fillStyle = g; c.fillRect(0, 0, cv.width, cv.height); return cv
}
/** Грузит доступные слои; отсутствующие возвращает списком (их просто нет в кадре). */
export async function loadSlots(base: string, files?: string[]): Promise<{ loaded: LoadedSlot[]; missing: SlotSpec[] }> {
  const loaded: LoadedSlot[] = [], missing: SlotSpec[] = []
  await Promise.all(SLOTS.map(spec => new Promise<void>(res => {
    if (files && !files.includes(spec.file)) { missing.push(spec); res(); return } const img = new Image(); img.onload = () => { loaded.push({ spec, img: prepareSlotImage(spec, img) }); res() }; img.onerror = () => { missing.push(spec); res() }; img.src = `${base}${spec.file}` })))
  loaded.sort((a, b) => a.spec.parallax - b.spec.parallax); return { loaded, missing }
}
/** Какой модуль файла стоит в плитке i: детерминированно, без одного и того же модуля подряд (при ≥ 2 модулях). */
export function moduleOf(i: number, modules: number): number {
  if (modules <= 1) return 0
  const n = ((i % 1000003) + 1000003) % 1000003
  return modules === 2 ? n % 2 : (n + Math.floor(n / modules)) % modules
}
/** Положение плиток слоя при камере camX: слева направо, покрывая кадр. Чистая функция — тестируется без холста. */
export function slotPlacements(spec: SlotSpec, camX: number, viewW = ARENA.W): { x: number; i: number; module: number; scale: number }[] {
  const off = camX * spec.parallax
  if (spec.route) return spec.route.filter(r => r.x - off < viewW && r.x + spec.tileW * (r.scale ?? 1) - off > 0).map((r, k) => ({ x: r.x - off, i: k, module: r.module, scale: r.scale ?? 1 }))
  const first = Math.floor(off / spec.tileW), out: { x: number; i: number; module: number; scale: number }[] = []
  for (let i = first; i * spec.tileW - off < viewW; i++) out.push({ x: i * spec.tileW - off, i, module: moduleOf(i, spec.modules), scale: 1 })
  return out
}
export const GUIDE = { HZ, BERM_Y }
