// Экран выбора: покадровая логика IDLE → (выход к стойке) → SELECTED → RETURN_TO_IDLE → IDLE для пяти собак. Чистый модуль: без DOM и таймеров,
// движок вызывает tick() 24 раза в секунду. Кадры — индексы в атласах selection/ (idle/sel/ret). Новых кадров не создаётся.
// Правила выхода из IDLE:
//   Фрэнк, Зефир — готовые модули библиотеки (runtime/selection.mjs); Пупс — createSelection-правило (ворота из gates.json, только вперёд);
//   Рокки — карта выходов 240 фаз (selection/idle_exit_DELAY_MAP.json, лаборатория idle-exit-lab: макс. 91 кадр = 3,79 с);
//   Луна — IDLE A (f0→f48→f1, 96 фаз): SELECTED начинается у ворот f0–f3, только вперёд (макс. 89 кадров = 3,71 с).
// ВНИМАНИЕ: правила Рокки и Луны перенесены из лабораторных материалов в код, пользователем как production-правила не приняты.
import * as FR from '../../assets/dogs/frenk/runtime/selection.mjs';
import * as ZE from '../../assets/dogs/zefir/runtime/selection.mjs';

const R = (a, b) => { const o = []; if (b >= a) for (let k = a; k <= b; k++) o.push(k); else for (let k = a; k >= b; k--) o.push(k); return o; };

// ---- описания собак: loop (кадры IDLE по кругу), exit(pos) -> кадры IDLE до входа в SELECTED, sel, ret, reentry
export function dogRule(id, data = {}) {
  switch (id) {
    case 'frenk': return {
      loop: FR.IDLE_LOOP.map(f => f - 8), exit: pos => FR.exitPath(pos).map(f => f - 8),
      sel: R(20, 121).map(f => f - 20), ret: FR.RETURN.map(f => f - 2), reentry: [], afterPos: 1 };
    case 'zefir': return {
      loop: ZE.IDLE_LOOP.map(f => f - 4), exit: pos => ZE.exitPath(pos).map(f => f - 4),
      sel: ZE.SELECTED.map(s => s - 4), ret: ZE.RETURN.map(m => m - 1), reentry: ZE.REENTRY.map(f => f - 4), afterPos: 0 };
    case 'pups': {
      const gates = new Set(data.pupsGates);
      return { loop: R(0, 239), exit: pos => { const o = []; let k = pos; while (!gates.has(k)) { k = (k + 1) % 240; o.push(k); } return o; },
        sel: R(0, 120), ret: [], reentry: [], afterPos: 1 };
    }
    case 'rocky': {
      const map = data.rockyDelay.delayByPhase, src = p => p <= 120 ? p : 240 - p;
      const exit = pos => {
        const e = map[pos], s = src(pos);
        switch (e.method) {
          case 'direct': return [];
          case 'forward': { const o = []; let p = pos; while (p !== e.entryPhase) { p = (p + 1) % 240; o.push(src(p)); } return o; }
          case 'reverse': return R(s - 1, e.entrySourceFrame);
          case 'finish_to_74_then_reverse': return [...(s < 74 ? R(s + 1, 74) : []), ...R(73, 58)];
          case 'finish_to_113_then_reverse': return [...(s < 113 ? R(s + 1, 113) : []), ...R(112, 58)];
          default: throw new Error('rocky: метод ' + e.method);
        }
      };
      return { loop: Array.from({ length: 240 }, (_, p) => src(p)), exit, sel: R(0, 120), ret: R(0, 96), reentry: [], afterPos: 0 };
    }
    case 'luna': {
      const f = p => p <= 48 ? p : 96 - p;
      return { loop: Array.from({ length: 96 }, (_, p) => f(p)),
        exit: pos => { const o = []; let p = pos; while (f(p) > 3) { p = (p + 1) % 96; o.push(f(p)); } return o; },
        sel: R(0, 120), ret: R(0, 120), reentry: [], afterPos: 1 };
    }
    default: throw new Error('unknown dog ' + id);
  }
}

// ---- проигрыватель: tick() -> {clip:'idle'|'sel'|'ret', index, kind}; pick() -> true, если выбор принят (занят — false)
// resume: значение pos, после которого следующий tick показывает нужный кадр цикла (Фрэнк/Пупс/Луна — продолжают с индекса 1, Зефир/Рокки — с 0)
const RESUME = { frenk: 0, zefir: -1, pups: 0, rocky: -1, luna: 0 };
export function createSelectionPlayer(id, data, startPos = 0) {
  const rule = dogRule(id, data), N = rule.loop.length;
  let pos = startPos % N, queue = [], first = true, waitMax = 0, chain = false;
  function tick() {
    if (queue.length) {
      const q = queue.shift();
      if (!queue.length) { pos = RESUME[id]; chain = false; }
      return { clip: q.clip, index: q.i, kind: q.kind };
    }
    if (first) first = false; else pos = ((pos + 1) % N + N) % N;
    return { clip: 'idle', index: rule.loop[pos], kind: 'idle', pos };
  }
  function pick() {
    if (queue.length || chain) return false;
    const ex = rule.exit(pos); waitMax = ex.length;
    queue = [...ex.map(i => ({ clip: 'idle', i, kind: 'exit' })), ...rule.sel.map(i => ({ clip: 'sel', i, kind: 'sel' })),
             ...rule.ret.map(i => ({ clip: 'ret', i, kind: 'ret' })), ...rule.reentry.map(i => ({ clip: 'idle', i, kind: 'reent' }))];
    chain = true; return true;
  }
  return { tick, pick, busy: () => chain, get pos() { return pos; }, get waitFrames() { return waitMax; }, rule };
}
