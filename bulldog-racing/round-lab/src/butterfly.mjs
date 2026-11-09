// Бабочка — САМОСТОЯТЕЛЬНЫЙ объект движка (в атлас собаки не встроена; клипы BUTTERFLY — только реакция собаки, у Пупса бабочка вырезана маской).
// Жизнь объекта привязана к телу клипа BUTTERFLY собаки по контракту (окно BUTTERFLY, роль body): создаётся на его первом кадре, исчезает на последнем.
// Траектория — эвристика относительно головы собаки (точка носа берётся из силуэта кадра): влетает сверху справа, зависает у морды,
// улетает. ЭТО НЕ ПРИНЯТАЯ ХУДОЖЕСТВЕННАЯ СИНХРОНИЗАЦИЯ — точное совпадение с взглядом собаки в каждом клипе требует приёмки пользователем.
const smooth = u => u * u * (3 - 2 * u);
// Профили по взгляду собаки в её клипе BUTTERFLY (подобраны по контактным листам кадров 09.11.2026 — см. reports/BUTTERFLY_*.png):
// near — где бабочка зависает относительно носа (px спрайта), [in,out] — когда собака смотрит на неё (прогресс тела клипа).
// Взгляд у всех вверх-вправо; у Луны почти вертикально вверх, у Рокки пологий. Подбор «на глаз» — приёмка за пользователем.
export const PROFILES = [
  { near: { x: 34, y: -28 }, win: [.20, .80] },   // Фрэнк
  { near: { x: 36, y: -24 }, win: [.20, .80] },   // Зефир
  { near: { x: 40, y: -20 }, win: [.20, .78] },   // Рокки
  { near: { x: 28, y: -32 }, win: [.18, .80] },   // Пупс
  { near: { x: 14, y: -48 }, win: [.15, .85] },   // Луна
];
export function butterflyPose(u, nose, seed = 0, tSec = 0, dogIndex = 0) {
  // u 0..1 — прогресс тела клипа; nose {x,y} — нос собаки на экране (px)
  const pr = PROFILES[dogIndex] ?? PROFILES[0], [uIn, uOut] = pr.win;
  const far = { x: pr.near.x + 80, y: pr.near.y - 70 }, near = pr.near;
  const k = u < uIn ? smooth(u / uIn) : u > uOut ? 1 - smooth((u - uOut) / (1 - uOut)) : 1;      // 0 — далеко, 1 — у морды
  const amp = 3 + 9 * (1 - k);                                                           // у морды трепещет мельче
  const x = nose.x + far.x + (near.x - far.x) * k + Math.sin(tSec * 5.1 + seed) * amp;
  const y = nose.y + far.y + (near.y - far.y) * k + Math.cos(tSec * 6.7 + seed * 1.7) * amp * .8 - Math.sin(u * Math.PI) * 6;
  const alpha = u < .06 ? u / .06 : u > .94 ? (1 - u) / .06 : 1;
  return { x, y, alpha, wing: Math.abs(Math.sin(tSec * 22 + seed)) };                     // wing 0..1 — раскрытие крыльев
}
export class ButterflyManager {
  constructor() { this.active = new Map(); this.log = []; this.nextId = 1; }
  /** v — результат visual.at для собаки; bodyFrames — число кадров тела клипа BUTTERFLY; nose — функция () => {x,y}; возвращает объект бабочки или null */
  update(dogIndex, v, bodyFrames, tSec, nose) {
    const on = v && v.window === 'BUTTERFLY' && v.role === 'body';
    const cur = this.active.get(dogIndex);
    if (!on) { if (cur) { this.active.delete(dogIndex); this.log.push({ ev: 'destroy', id: cur.id, dog: dogIndex, t: tSec }); } return null; }
    const u = Math.min(1, v.localIdx / Math.max(1, bodyFrames - 1));
    let b = cur;
    if (!b) { b = { id: this.nextId++, dog: dogIndex, seed: dogIndex * 1.3 + this.nextId, t0: tSec }; this.active.set(dogIndex, b); this.log.push({ ev: 'create', id: b.id, dog: dogIndex, t: tSec }); }
    return { id: b.id, ...butterflyPose(u, nose(), b.seed, tSec, dogIndex), u };
  }
  reset() { this.active.clear(); }
}
