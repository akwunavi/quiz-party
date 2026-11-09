// Единый «визуальный слой» пяти бульдогов для Race V3. Чистый ES-модуль: без сети, без DOM, работает в Node и в браузере.
// Физику (dog.segments из dog4-v3-lab/model.mjs) не трогает: читает сегменты, выбирает кадр (неизменённый P3 visualAt) и
// сдвиг спрайта по ПРИНЯТЫМ правилам собаки (у Фрэнка, Зефира и Луны они разные — см. DISPLAY_CONTRACT.md).
//
//   const V = createVisual('zefir', {contract, atlas, extras}, {visualAt, categoryOf});
//   V.at(dog.segments, t) -> {window, role, clip, frame, sheet, index, shiftPx, status, overflow}
//     sheet/index — ячейка в листе атласа (24 в ряд, ячейка atlas.cellWidth × atlas.cellHeight);
//     shiftPx — горизонтальный сдвиг спрайта в пикселях спрайта 207×116 (+ вправо), 0 если правил нет.
//
// extras по собакам: frenk {startArrays, stopMeta}; zefir {stopList} (stopB_montage_list.json); luna {stopShift}; pups/rocky {}.
const SPRITE_W = 207, SRC_W = 1276, K = SPRITE_W / SRC_W;
const MOVING_STOP = new Set(['STOP', 'FINISH_DECELERATE']);
const STATIONARY = new Set(['BASE', 'BUTTERFLY', 'ROLL', 'SNIFF_PEE', 'RETURN']);
const smoothstep = u => { u = Math.min(1, Math.max(0, u)); return u * u * (3 - 2 * u); };
const segmentAt = (segs, t) => { let lo = 0, hi = segs.length; while (lo < hi) { const m = (lo + hi) >> 1; if (segs[m].t1 <= t + 1e-9) lo = m + 1; else hi = m; } return segs[Math.min(lo, segs.length - 1)]; };

export function createVisual(dogId, { contract, atlas, extras = {} }, { visualAt, categoryOf }) {
  const FR = atlas.frames;
  const shiftRule = SHIFT[dogId]?.({ contract, atlas, extras, categoryOf }) ?? (() => 0);
  const frameRule = FRAME[dogId]?.({ contract, atlas, extras }) ?? null;      // принятая поправка КАДРА, которую P3 не выражает
  const cellOf = (clip, frame) => {
    if (atlas.kind === 'labelled') { const f = FR[frame]; return f ? { sheet: atlas.sheets[f.sheet], index: f.index } : null; }
    const c = atlas.clips[clip]; return c && Number.isInteger(frame) && frame >= 0 && frame < c.count ? { sheet: c.sheet, index: frame } : null;
  };
  return {
    dogId, contract, atlas, rockyPhase: extras.phase,
    at(segments, t) {
      const v = visualAt(contract, segments, t);
      if (v.role === 'missing') return { ...v, sheet: null, index: null, shiftPx: 0 };
      const ov = frameRule ? frameRule(v, segments, t) : null;
      if (ov != null) { v.frame = ov; v.frameOverridden = true; }
      const cell = cellOf(v.clip, v.frame);
      const shiftPx = v.overflow ? 0 : shiftRule(v, segments, t);
      return { ...v, sheet: cell?.sheet ?? null, index: cell?.index ?? null, shiftPx };
    },
  };
}

// ------------------------------------------------------------------ правила сдвига по собакам
const SHIFT = {
  // Фрэнк: порт frenkVisual (race-v3-frenk-lab / integration_v1/runtime/frenk_visual.mjs): массивы START по категории,
  // массивы STOP по категории, стационарный сдвиг от последнего STOP. Единицы массивов — пиксели исходного кадра 1276.
  frenk({ contract, extras, categoryOf }) {
    const { startArrays, stopMeta } = extras;
    const arrays = Object.fromEntries(Object.entries(startArrays.modes[contract.shift.mode]).map(([k, v]) => [k, v.C]));
    contract.shift.arrays = arrays;           // visualAt читает эти массивы для статуса 'array'
    const offsetBefore = (segs, t) => {
      let off = 0;
      for (const s of segs) { if (s.t1 > t + 1e-9) break; if (MOVING_STOP.has(s.kind)) { const c = categoryOf(s.base); off = c ? stopMeta.categories[c].stationaryShiftSrc : NaN; } }
      return off;
    };
    return (vv, segs, t) => {
      const seg = segmentAt(segs, t); let shift = 0;
      if (MOVING_STOP.has(vv.window) && vv.role !== 'start') {
        const cat = categoryOf(seg.base), arr = cat && stopMeta.categories[cat].stopShiftSrc;
        if (arr) shift = arr[Math.min(vv.localIdx, arr.length - 1)];
      } else if (vv.shiftStatus === 'array') {
        const arr = arrays[vv.category]; let startSeg = seg;
        for (const s of segs) { if (s.t0 > t + 0.2) break; if (s.kind === 'START') startSeg = s; }
        const off = offsetBefore(segs, startSeg.t0 - 1e-6), k = (off + 125) / 125;
        if (arr) shift = arr[Math.min(vv.localIdx, arr.length - 1)] * k;
      } else if (STATIONARY.has(vv.window)) shift = offsetBefore(segs, t);
      return Number.isNaN(shift) ? 0 : shift * K;
    };
  },

  // Зефир: порт dog2.mjs / dog2stop.mjs. Стойка и все действия рисуются со сдвигом стойки; START гасит качание корпуса
  // (surge) и плавно отпускает его к стыку; STOP — свои сдвиги монтажа (shift_src_px) с плавным выходом на сдвиг стойки.
  zefir({ atlas, extras }) {
    const fr = atlas.frames, LOOP = Array.from({ length: 12 }, (_, k) => 88 + k);
    const cxRun = LOOP.reduce((a, n) => a + fr['run' + n].cx, 0) / 12, shiftStand = cxRun - fr.run30.cx;
    const list = extras.stopList, labelOf = e => /^RUN#/.test(e.label) ? 'run' + e.label.slice(4) : /^v2 k/.test(e.label) ? 'stopS' + e.label.slice(4) : /^v1 k/.test(e.label) ? 'stopT' + e.label.slice(4) : 'run30';
    const stop = list.map(e => ({ cx: fr[labelOf(e)].cx, shift0: (/^RACE_STAND/.test(e.label) ? 44 : e.shift_src_px) * K }));
    const endCorr = shiftStand - stop[36].shift0;
    stop.forEach((s, i) => { s.shift = s.shift0 + endCorr * smoothstep((i - 22) / 14); });
    const N = 42;
    return (vv) => {
      if (MOVING_STOP.has(vv.window)) return stop[Math.min(36, vv.localIdx)].shift;
      if (vv.clip === 'START' && vv.localIdx < N && (vv.window === 'START' || vv.window === 'RUN')) {
        const cx = fr[vv.frame].cx, w = 1 - smoothstep(vv.localIdx / N); return -(cx - cxRun) * w;
      }
      if (vv.clip === 'START') return 0;                     // цикл RUN
      return shiftStand;                                      // стойка и действия
    };
  },

  // Луна: stop_shift.json — сдвиг на каждый кадр STOP (37 движущихся + 22 хвоста), вход 0, выход ≈ −1 px; остальное 0.
  luna({ extras }) {
    const sh = extras.stopShift.shiftSpritePx;
    return (vv) => {
      if (vv.clip === 'STOP') return sh[Math.min(vv.localIdx, 36)] ?? 0;
      if (vv.clip === 'STOP_TAIL') return sh[37 + Math.min(vv.localIdx, 21)] ?? 0;
      return 0;
    };
  },
};

// ------------------------------------------------------------------ поправки кадра, принятые вне P3
const FRAME = {
  // Рокки: фазировка RUN перед STOP/FINISH (run-phase-v3-lab/phase.mjs, принята 23.10.2026): шесть однокадровых пропусков
  // на длинном RUN-отрезке, чтобы последним кадром перед торможением был исходный #68. P3 такого не умеет.
  rocky({ extras }) {
    const { visualRunFrame } = extras.phase;
    return (v, segs, t) => {
      if (v.clip !== 'RUN' || v.window !== 'RUN') return null;
      const seg = segmentAt(segs, t);
      if (seg.kind !== 'RUN') return null;
      try { return visualRunFrame(seg, t); } catch { return null; }      // отрезок короче 155 кадров в V3 не бывает; иначе — натуральный P3
    };
  },
};
