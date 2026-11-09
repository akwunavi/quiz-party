// Visual mapping only. The approved 24 FPS RUN frames and Race V3 stateAt stay intact.
// Six one-frame advances are distributed through each RUN segment; each occurs
// on source #64 -> #66, avoiding a phase jump at the STOP/FINISH boundary.
const cache = new Map();
const FIRST = 23;
const LAST_GUARD = 24;

export function sourceForCell(cell) {
  return cell < 11 ? 52 + cell : 61 + ((cell - 11 + 2) % 12);
}

export function runCells(segment) {
  const n = Math.round((segment.t1 - segment.t0) * 24);
  if (Math.abs((segment.t1 - segment.t0) * 24 - n) > 1e-5)
    throw new Error('RUN duration is not an integral number of V3 cells');
  if (n < 155) throw new Error(`RUN has only ${n} cells; six advances need separate review`);
  return n;
}

export function skipAfterCells(segment) {
  const n = runCells(segment);
  if (cache.has(n)) return cache.get(n);
  // Six advances from +0 to +6. At advance k, the source at cell i is #64;
  // the following display is #66 instead of #65. Keep all advances at least
  // one second away from STOP/FINISH and preserve the accepted START seam.
  let states = [{cells: [], cost: 0}];
  for (let k = 1; k <= 6; k++) {
    const target = FIRST + k * (n - FIRST - LAST_GUARD) / 7;
    const next = [];
    for (let i = FIRST; i <= n - LAST_GUARD - 1; i++) {
      if ((i - 11 + k - 1) % 12 !== 1) continue;
      let best = null;
      for (const state of states) {
        const prev = state.cells.at(-1) ?? -Infinity;
        const gap = i - prev;
        if (gap < 11) continue;
        const closePenalty = gap < 18 ? 100 : 0;
        const cost = state.cost + (i - target) ** 2 + closePenalty;
        if (!best || cost < best.cost) best = {cells: [...state.cells, i], cost};
      }
      if (best) next.push(best);
    }
    states = next;
  }
  if (!states.length) throw new Error(`No six-advance RUN schedule for ${n} cells`);
  const result = states.reduce((best, current) => current.cost < best.cost ? current : best).cells;
  cache.set(n, result);
  return result;
}

export function visualRunFrame(segment, time) {
  const n = runCells(segment);
  const i = Math.max(0, Math.min(n - 1, Math.floor((time - segment.t0) * 24 + 1e-7)));
  const advances = skipAfterCells(segment).filter(cell => i > cell).length;
  return i < 11 ? i : 11 + ((i - 11 + advances) % 12);
}

export function visualSource(segment, time) {
  return sourceForCell(visualRunFrame(segment, time));
}
