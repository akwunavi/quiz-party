// Бабочка арены (10.55): ЧИСТАЯ траектория и разметка листа кадров. Сама бабочка — художественный спрайт `public/arena/butterfly.webp` (требования — arena-brief/BUTTERFLY_SPEC.md);
// пока файла нет, ArenaRenderer рисует прежний значок (временно, без замены примитивами). Время жизни и фазу (u) отдаёт ButterflyManager из vendor — он не менялся.
// Траектория привязана к носу КОНКРЕТНОЙ собаки (nose — экранные px текущего кадра) и зависит только от u, номера собаки и времени гонки: после перезагрузки проектора кадр тот же
// (прежняя vendor-формула брала seed из счётчика созданных бабочек — он зависел от того, что проектор уже видел).
import * as VB from '../vendor/butterfly.mjs'
const PROFILES = (VB as unknown as { PROFILES: { near: { x: number; y: number }; win: [number, number] }[] }).PROFILES

const smooth = (u: number) => u * u * (3 - 2 * u)
export interface BfPose { x: number; y: number; alpha: number; heading: number }
/** u 0..1 — ход тела клипа BUTTERFLY; nose — нос собаки; tSec — время гонки; dog — номер собаки (0..4). */
export function butterflyArtPose(u: number, nose: { x: number; y: number }, tSec: number, dog: number): BfPose {
  const pr = PROFILES[dog] ?? PROFILES[0], [uIn, uOut] = pr.win, ph = dog * 1.7 + 0.6
  const k = u < uIn ? smooth(u / uIn) : u > uOut ? 1 - smooth((u - uOut) / (1 - uOut)) : 1          // 0 — далеко, 1 — висит у морды
  const far = { x: pr.near.x + 96, y: pr.near.y - 84 }
  const meander = 1 - k * 0.8                                                                          // в пути петляет шире, у морды — тихо
  const x = nose.x + far.x + (pr.near.x - far.x) * k + (Math.sin(tSec * 2.3 + ph) * 9 + Math.sin(tSec * 4.1 + ph * 2) * 4) * meander + Math.sin(tSec * 3.1 + ph) * 2.5
  const y = nose.y + far.y + (pr.near.y - far.y) * k + (Math.sin(tSec * 3.7 + ph * 1.3) * 7 + Math.cos(tSec * 6.1 + ph) * 3) * meander + Math.sin(tSec * 5.3 + ph) * 2 - Math.sin(u * Math.PI) * 6
  const alpha = u < 0.07 ? u / 0.07 : u > 0.93 ? (1 - u) / 0.07 : 1
  return { x, y, alpha, heading: 0 }
}
/** Курс (угол, рад) по конечной разности траектории; крылья от курса не зависят. */
export function butterflyHeading(at: (t: number) => { x: number; y: number }, tSec: number): number {
  const a = at(tSec - 0.04), b = at(tSec + 0.04); return Math.atan2(b.y - a.y, b.x - a.x)
}
/** Лист кадров `public/arena/butterfly.webp` (scripts/arena/prep_butterfly.py): кадры одной строкой, ячейка BF_CELL_W×BF_CELL_H, число кадров = ширина листа / BF_CELL_W; крылья машут на BF_FPS независимо от полёта.
 *  Бабочка смотрит вправо; точка привязки (тело) — BF_ANCHOR в долях ячейки: вокруг неё идут поворот по курсу и зеркало при полёте влево. Ширина на экране — BF_DRAW_W px (морда бульдога ≈ 60 px). */
export const BF_CELL_W = 192, BF_CELL_H = 134, BF_FPS = 11, BF_DRAW_W = 64, BF_ANCHOR = { x: 0.8, y: 0.62 }
export const bfFrame = (tSec: number, dog: number, frames: number) => Math.floor(tSec * BF_FPS + dog * 3) % Math.max(1, frames)
