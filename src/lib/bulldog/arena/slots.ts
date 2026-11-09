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
  /** Что внутри и условия съёмки/отрисовки — попадает в ASSET_BRIEF. */
  note: string
}
export const SLOTS: SlotSpec[] = [
  { id: 'forest_far', file: 'forest_far.webp', title: 'Дальний хвойный склон с огоньками посёлка', parallax: 0.30, bottomY: BERM_Y - 40, tileW: 3840, tileH: 300, mode: 'tile',
    note: 'бесшовно по горизонтали; плотные заснеженные ели + крыши и тёплые окна далёких шале в просветах; воздушная дымка (мягче и светлее переднего плана); фон прозрачный сверху (небо и горы за ним)' },
  { id: 'village_mid', file: 'village_mid.webp', title: 'Зимняя деревня: шале, колокольня, дым из труб', parallax: 0.55, bottomY: BERM_Y - 10, tileW: 2880, tileH: 420, mode: 'sequence',
    note: '4 модуля, стыкуются в любом порядке (одинаковый профиль снега и фонарь на стыке); шале с тёплыми окнами, балконы, гирлянды, колокольня, ели между домами; без зрителей' },
  { id: 'stands', file: 'stands.webp', title: 'Трибуны/навесы (без зрителей)', parallax: 0.92, bottomY: BERM_Y + 2, tileW: 2400, tileH: 340, mode: 'sequence',
    note: '3 модуля стыкуются в любом порядке; многоуровневые деревянные трибуны B (тёмно-синие металлические элементы, световые панели), навесы с гирляндами C; ярусы пустые — зрители отдельным слоем' },
  { id: 'crowd', file: 'crowd.webp', title: 'Зрители: три ряда отдельными слоями', parallax: 0.92, bottomY: BERM_Y + 2, tileW: 2400, tileH: 340, mode: 'sequence',
    note: 'те же 3 модуля по ширине, что и трибуны; КАЖДЫЙ из 3 рядов — отдельный PNG (rows 1–3), чтобы код качал ряды независимо; 2 позы на ряд (руки вниз / руки вверх)' },
  { id: 'spruce_set', file: 'spruce_set.webp', title: 'Крупные ели (спрайты)', parallax: 0.80, bottomY: BERM_Y + 2, tileW: 2400, tileH: 640, mode: 'sequence',
    note: '6–8 отдельных елей разной высоты на прозрачном фоне; ставятся кодом за ограждением; никогда не перед дорожками' },
]
export interface LoadedSlot { spec: SlotSpec; img: HTMLImageElement }
/** Грузит доступные слои; отсутствующие возвращает списком (их просто нет в кадре). */
export async function loadSlots(base: string): Promise<{ loaded: LoadedSlot[]; missing: SlotSpec[] }> {
  const loaded: LoadedSlot[] = [], missing: SlotSpec[] = []
  await Promise.all(SLOTS.map(spec => new Promise<void>(res => { const img = new Image(); img.onload = () => { loaded.push({ spec, img }); res() }; img.onerror = () => { missing.push(spec); res() }; img.src = `${base}${spec.file}` })))
  loaded.sort((a, b) => a.spec.parallax - b.spec.parallax); return { loaded, missing }
}
/** Положение тайла/модуля i слоя при камере camX: слева направо, покрывая кадр. Чистая функция — тестируется без холста. */
export function slotPlacements(spec: SlotSpec, camX: number, viewW = ARENA.W): { x: number; index: number }[] {
  const off = camX * spec.parallax, first = Math.floor(off / spec.tileW), out: { x: number; index: number }[] = []
  for (let i = first; i * spec.tileW - off < viewW; i++) out.push({ x: i * spec.tileW - off, index: ((i % 4) + 4) % 4 })
  return out
}
export const GUIDE = { HZ, BERM_Y }
