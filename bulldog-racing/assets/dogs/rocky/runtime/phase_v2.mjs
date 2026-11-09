// Рокки: фазировка RUN перед STOP/FINISH для ЛЮБОЙ длины RUN-отрезка (расширение принятого phase.mjs).
// Принятый phase.mjs не меняется и остаётся источником истины: для отрезков >= 155 кадров эта функция вызывает его напрямую
// (поведение длинных пробегов идентично побайтно — проверяет tests/rocky_phase.test.mjs).
//
// Цель та же: последний кадр RUN перед STOP/FINISH = исходный #68. Кадры RUN и STOP, START->RUN (ячейки 0-10) не трогаются;
// меняется только порядок показа ячеек цикла: несколько раз кадр пропускается (a -> a+2).
// Нужное число пропусков K = (17 - n) mod 12 (для всех длин V3 n = 23 + 12m это K = 6).
//
// Лестница схем (берётся первая, которая помещается; всё детерминировано длиной n):
//   T1  n 107..143: схема принятого phase.mjs без изменений параметров (пропуск только #64->#66, первый пропуск после ячейки 23,
//       хвост 24 ячейки без пропусков, между пропусками >= 11) — раньше эти длины просто не рассматривались (порог 155 был осторожным).
//   T2  n 83, 95: те же пропуски #64->#66, но короче хвост/раньше первый пропуск (23/12 -> 12/12 -> 12/6).
//   T3  n 23..71: #64 встречается раз в 12 кадров, на 6 пропусков его не хватает -> пропуски на любом кадре цикла, выбор по цене
//       шва (1 - IoU(a, a+2), измерено по силуэтам атласа), между пропусками >= 2 ячеек, равномерно; хвост 12 -> 6 -> 1 ячейка;
//       для n = 23 (всего 12 ячеек цикла) допускается первый пропуск сразу после ячейки 11.
import * as accepted from './phase.mjs';

const FIRST_LOOP_CELL = 11;
// IoU силуэтов кадров (a, a+2) цикла RUN Рокки в игровых ячейках 178x100 (tools/rocky_phase_eval.py пересчитывает из атласа).
// Чем выше, тем незаметнее пропуск именно в этом месте шага. Лучший — #64->#66 (его и выбрал принятый phase.mjs).
export const SKIP_IOU = {61: .71, 62: .722, 63: .737, 64: .748, 65: .712, 66: .722, 67: .694, 68: .684, 69: .694, 70: .713, 71: .74, 72: .74};
// Выключатель: отрезки короче minCorrectedCells показываются натуральным циклом P3 (без коррекции). По умолчанию корректируются все (>= 23).
export const CONFIG = { minCorrectedCells: 23 };
const cache = new Map();
const srcAt = (cell, adv) => 61 + ((cell - FIRST_LOOP_CELL + 2 + adv) % 12);      // исходный кадр в ячейке cell при adv пропусках до неё

export function neededSkips(n) { return (((17 - n) % 12) + 12) % 12; }

// схема принятого алгоритма (только #64 -> #66), параметры варьируются лестницей T1/T2
function plan64(n, K, first, guard, gap) {
  let states = [{ cells: [], cost: 0 }];
  for (let k = 1; k <= K; k++) {
    const target = first + k * (n - first - guard) / (K + 1), next = [];
    for (let i = first; i <= n - guard - 1; i++) {
      if ((i - 11 + k - 1) % 12 !== 1) continue;
      let best = null;
      for (const s of states) {
        const prev = s.cells.at(-1) ?? -Infinity, g = i - prev;
        if (g < gap) continue;
        const cost = s.cost + (i - target) ** 2 + (g < 18 ? 100 : 0);
        if (!best || cost < best.cost) best = { cells: [...s.cells, i], cost };
      }
      if (best) next.push(best);
    }
    states = next;
  }
  return states.length ? states.reduce((b, c) => c.cost < b.cost ? c : b).cells : null;
}

// T3: пропуск на любом кадре цикла, цена по SKIP_IOU, равномерно
function planAny(n, K, guard, cmin = 12, gap = 2, lam = 0.002) {
  const hi = n - 1 - guard;
  if (hi - cmin + 1 < (K - 1) * gap + 1) return null;
  const ideal = (hi - cmin) / K;
  const dp = Array.from({ length: K + 1 }, () => new Map());
  dp[0].set(-1e9, { cost: 0, cells: [] });
  for (let k = 1; k <= K; k++) for (let c = cmin; c <= hi; c++) {
    let best = null;
    for (const [pc, st] of dp[k - 1]) {
      const g = c - pc; if (k > 1 && g < gap) continue;
      const cost = st.cost + (1 - SKIP_IOU[srcAt(c, k - 1)]) * 10 + (k > 1 ? lam * (g - ideal) ** 2 : lam * (c - cmin - ideal / 2) ** 2);
      if (!best || cost < best.cost) best = { cost, cells: [...st.cells, c] };
    }
    if (best) dp[k].set(c, best);
  }
  let b = null; for (const st of dp[K].values()) if (!b || st.cost < b.cost) b = st;
  return b && b.cells;
}

// -> { cells: [после каких ячеек пропущен кадр], tier } | null (отрезок слишком короткий для схемы — показывается натуральный цикл)
export function skipPlan(n) {
  if (cache.has(n)) return cache.get(n);
  let res = null;
  const K = neededSkips(n);
  if (K === 0) res = { cells: [], tier: 'none' };
  else {
    for (const [tier, first, guard] of [['T1', 23, 24], ['T2', 23, 12], ['T2', 12, 12], ['T2', 12, 6]]) {
      const c = K === 6 && plan64(n, 6, first, guard, 11); if (c) { res = { cells: c, tier: `${tier}(${first}/${guard})` }; break; }
    }
    if (!res) for (const [guard, cmin] of [[12, 12], [6, 12], [1, 12], [1, 11]]) { const c = planAny(n, K, guard, cmin); if (c) { res = { cells: c, tier: `T3(guard ${guard}, first ${cmin})` }; break; } }
  }
  cache.set(n, res);
  return res;
}

const cellsOf = seg => {
  const f = (seg.t1 - seg.t0) * 24, n = Math.round(f);
  if (Math.abs(f - n) > 1e-5) throw new Error('RUN duration is not an integral number of V3 cells');
  return n;
};

// ячейка атласа RUN в момент time (как phase.mjs:visualRunFrame; null -> натуральный порядок P3)
export function visualRunFrame(segment, time) {
  const n = cellsOf(segment);
  if (n >= 155 && n % 12 === 11) return accepted.visualRunFrame(segment, time);   // принятое поведение, без изменений
  const plan = n > FIRST_LOOP_CELL && n >= CONFIG.minCorrectedCells ? skipPlan(n) : null;
  if (!plan) return null;
  const i = Math.max(0, Math.min(n - 1, Math.floor((time - segment.t0) * 24 + 1e-7)));
  const adv = plan.cells.filter(c => i > c).length;
  return i < FIRST_LOOP_CELL ? i : FIRST_LOOP_CELL + ((i - FIRST_LOOP_CELL + adv) % 12);
}
export const visualSource = (segment, time) => { const c = visualRunFrame(segment, time); return c == null ? null : accepted.sourceForCell(c); };
export const sourceForCell = accepted.sourceForCell;
