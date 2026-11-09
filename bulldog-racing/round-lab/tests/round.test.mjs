// Тесты лаборатории раунда. Запуск из корня репозитория: node --test bulldog-racing/round-lab/tests/round.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const LIBD = path.join(REPO, 'bulldog-racing/assets/dogs/');
const J = p => JSON.parse(readFileSync(p, 'utf8'));
const readText = async p => readFileSync(path.join(REPO, p), 'utf8');
const SRC = p => path.join(REPO, 'bulldog-racing/round-lab/src', p);
const { loadRaceV3 } = await import(SRC('raceV3.mjs'));
const { createBetting, distribute, scoreBets, podium } = await import(SRC('rules.mjs'));
const { createSelectionPlayer, dogRule } = await import(SRC('selection.mjs'));
const { ButterflyManager } = await import(SRC('butterfly.mjs'));
const { createGame, DOGS, TIMING } = await import(SRC('game.mjs'));
const { createVisual } = await import(path.join(REPO, 'bulldog-racing/runtime/dog_visual.mjs'));
const { visualAt, categoryOf } = await import(path.join(REPO, 'race-v3-p3-lab/src/visual.mjs'));
const phase = await import(LIBD + 'rocky/runtime/phase_v2.mjs');
const IDS = DOGS.map(d => d[0]);
const selData = { pupsGates: J(LIBD + 'pups/selection/gates.json').gates, rockyDelay: J(LIBD + 'rocky/selection/idle_exit_DELAY_MAP.json') };
const selAtlas = Object.fromEntries(IDS.map(id => [id, J(LIBD + id + '/selection/selection_atlas.json')]));
const visuals = () => Object.fromEntries(IDS.map(id => {
  const contract = J(LIBD + id + '/contract/' + id + '.contract.json'), atlas = J(LIBD + id + '/atlas/atlas.json'), extras = {};
  if (id === 'frenk') extras.startArrays = J(LIBD + id + '/contract/frenk_start_shift_arrays.json'), extras.stopMeta = J(LIBD + id + '/contract/frenk_stop_v4_shift_arrays.json');
  if (id === 'zefir') extras.stopList = J(LIBD + id + '/atlas/stopB_montage_list.json');
  if (id === 'luna') extras.stopShift = J(LIBD + id + '/contract/stop_shift.json');
  if (id === 'rocky') extras.phase = phase;
  return [id, createVisual(id, { contract, atlas, extras }, { visualAt, categoryOf })];
}));
const sig = r => JSON.stringify({ s: r.effectiveSeed, p: r.places, c: r.dogs.map(d => d.crossing), e: r.end, seg: r.dogs.map(d => d.segments.map(s => [s.kind, +s.t0.toFixed(6), +s.t1.toFixed(6)])) });

// ------------------------------------------------------------------ ставки
test('ставки: выбор меняется до старта, несколько команд на одну собаку, счётчик, блокировка после старта', () => {
  const b = createBetting(5);
  b.choose(1, 3); b.choose(2, 3); b.choose(3, 5);
  assert.deepEqual(b.counts(), [0, 0, 2, 0, 1]);
  const r = b.choose(2, 1); assert.deepEqual([r.from, r.to], [3, 1]); assert.deepEqual(b.counts(), [1, 0, 1, 0, 1]);
  b.choose(1, null); assert.deepEqual(b.counts(), [1, 0, 0, 0, 1]);
  b.setTeams(8); assert.equal(b.teams.size, 8); assert.deepEqual(b.counts(), [1, 0, 0, 0, 1]);   // расширение не теряет ставки
  assert.throws(() => b.choose(1, 6)); assert.throws(() => b.choose(99, 1));
  b.lock(); assert.throws(() => b.choose(1, 2), /закрыты/); assert.throws(() => b.setTeams(3));
  assert.deepEqual(b.counts(), [1, 0, 0, 0, 1]);
});
test('тестовые раскладки команд', () => {
  const sum = a => a.reduce((x, y) => x + y, 0);
  for (const mode of ['random', 'even', 'all-one', 'skewed', 'none']) for (const n of [1, 5, 12, 24]) {
    const b = createBetting(n); for (const [t, d] of distribute(n, mode, (() => { let x = 7; return () => (x = (x * 16807) % 2147483647) / 2147483647; })())) b.choose(t, d);
    assert.equal(sum(b.counts()), mode === 'none' ? 0 : n, mode + n);
  }
  const b = createBetting(10); for (const [t, d] of distribute(10, 'all-one')) b.choose(t, d); assert.deepEqual(b.counts(), [0, 0, 10, 0, 0]);
});
test('очки: 5 − место выбранной собаки, без ставки 0; тройка из мест', () => {
  const places = [2, 4, 0, 3, 1];                                           // порядок финиша: собаки №3, №5, №1, №4, №2
  const s = scoreBets([[1, 3], [2, 3], [3, 5], [4, 1], [5, 4], [6, 2], [7, null]], places);
  assert.deepEqual(s.map(x => x.points), [5, 5, 4, 3, 2, 1, 0]);
  assert.deepEqual(podium(places), { first: 2, second: 4, third: 0, rest: [3, 1] });
});

// ------------------------------------------------------------------ экран выбора
test('выбор: правила выхода из IDLE пяти собак — ожидание, индексы в атласе, возврат в цикл', () => {
  const maxDoc = { frenk: 106, zefir: 58, rocky: 91, pups: 87, luna: 89 };
  for (const id of IDS) {
    const rule = dogRule(id, selData), A = selAtlas[id].clips; let mx = 0;
    for (let p = 0; p < rule.loop.length; p++) {
      const P = createSelectionPlayer(id, selData, p); const f0 = P.tick(); assert.equal(f0.clip, 'idle');
      assert.ok(P.pick()); assert.equal(P.pick(), false, 'повторный выбор во время реакции игнорируется'); mx = Math.max(mx, P.waitFrames);
      let n = 0, sawSel = false, prev = null;
      while (P.busy() && n++ < 3000) {
        const f = P.tick(); assert.ok(f.index >= 0 && f.index < A[f.clip].count, `${id} ${f.clip} ${f.index}`);
        if (f.clip === 'sel') sawSel = true; if (f.kind === 'exit' && prev) assert.ok(Math.abs(f.index - prev) <= 1 || (id === 'zefir' && prev === 105 && f.index === 11) /* документированный шов петли f109→f15 */, `${id}: скачок IDLE ${prev}->${f.index}`); prev = f.kind === 'exit' ? f.index : null;
      }
      assert.ok(sawSel && !P.busy());
      for (let k = 0; k < 400; k++) { const f = P.tick(); assert.equal(f.clip, 'idle'); assert.ok(f.index >= 0 && f.index < A.idle.count); }
    }
    assert.equal(mx, maxDoc[id], id + ' макс. ожидание');
  }
});
test('выбор: Рокки совпадает с картой лаборатории на всех 240 фазах', () => {
  for (let p = 0; p < 240; p++) { const P = createSelectionPlayer('rocky', selData, p); P.tick(); P.pick(); assert.equal(P.waitFrames, selData.rockyDelay.delayByPhase[p].waitFrames, 'фаза ' + p); }
});
test('выбор: SELECTED проигрывается целиком и в порядке кадров', () => {
  for (const id of IDS) { const P = createSelectionPlayer(id, selData, 10); P.tick(); P.pick(); const sel = []; while (P.busy()) { const f = P.tick(); if (f.clip === 'sel') sel.push(f.index); }
    assert.deepEqual(sel, Array.from({ length: selAtlas[id].clips.sel.count }, (_, i) => i), id); }
});

// ------------------------------------------------------------------ Race V3: длительность, воспроизводимость
test('Race V3: длительность D от 20 до 240 с, воспроизводимость по seed, выбор собак исход не меняет', async () => {
  for (const D of [20, 30, 42, 90, 180, 240]) {
    const V = await loadRaceV3(readText, D); let lastEnd = 0;
    for (let s = 1; s <= 120; s++) {
      const seed = s * 7919 + 13, a = V.resolveRace(seed), b = V.resolveRace(seed);
      assert.equal(sig(a), sig(b), `D=${D} seed=${seed} не воспроизводится`);
      assert.deepEqual([...a.places].sort(), [0, 1, 2, 3, 4]);
      const order = [...a.dogs].sort((x, y) => x.crossing - y.crossing || x.index - y.index).map(d => d.index); assert.deepEqual(order, a.places);
      lastEnd += a.end;
    }
    assert.ok(lastEnd / 120 > D, 'средняя длительность растёт с D');
  }
  const V = await loadRaceV3(readText, 60);
  const mk = () => createGame({ V3: V, selectionData: selData, teamCount: 6, seed: 4242 }), g1 = mk(), g2 = mk();
  for (let t = 1; t <= 6; t++) g2.choose(t, 1 + (t % 5));
  g1.finishSelection(); g2.finishSelection();
  for (const g of [g1, g2]) { g.skip(); while (g.phase !== 'race') g.update(0.5); }
  assert.equal(sig(g1.race), sig(g2.race), 'ставки не влияют на гонку');
});
test('длительность задаётся ведущим: больше D → дольше гонка; без искусственного потолка 40 с', async () => {
  const ends = {}; for (const D of [30, 60, 120, 240]) { const V = await loadRaceV3(readText, D); ends[D] = V.resolveRace(777).end; }
  assert.ok(ends[30] < ends[60] && ends[60] < ends[120] && ends[120] < ends[240], JSON.stringify(ends)); assert.ok(ends[240] > 200);
});

// ------------------------------------------------------------------ визуальные фазы на гонках разных длительностей
test('фазы RUN → STOP → действие → START → RUN, кадры существуют, нет MISSING/OVERFLOW (5 собак × D 20…180)', async () => {
  const V = visuals(), atlas = Object.fromEntries(IDS.map(id => [id, J(LIBD + id + '/atlas/atlas.json')]));
  const stats = {};
  for (const D of [20, 42, 90, 180]) {
    const V3 = await loadRaceV3(readText, D);
    for (let s = 1; s <= 60; s++) {
      const race = V3.resolveRace(s * 7919 + 13);
      race.dogs.forEach((dog, i) => {
        const id = IDS[i], v = V[id], segs = dog.segments; let prevKind = null, maxJump = 0, prevShift = 0;
        for (let t = 0; t < race.end; t += 1 / 24) {
          const x = v.at(segs, t + 1e-6);
          assert.ok(x.sheet != null && x.index != null, `${id} D${D} s${s} t=${t.toFixed(2)} нет ячейки (${x.window}/${x.role})`);
          assert.ok(!x.overflow && x.role !== 'missing', `${id} ${x.status}`);
          maxJump = Math.max(maxJump, Math.abs(x.shiftPx - prevShift)); prevShift = x.shiftPx;
        }
        stats[id] = Math.max(stats[id] ?? 0, maxJump);
        // порядок окон: действие всегда окружено STOP до и START после; перед каждым STOP — RUN
        segs.forEach((sg, k) => {
          if (['BUTTERFLY', 'ROLL', 'SNIFF_PEE'].includes(sg.kind)) { assert.ok(['STOP', 'BASE'].includes(segs[k - 1]?.kind), `${sg.kind} не после STOP/BASE`); assert.ok(segs[k + 1]?.kind === 'RETURN' || segs[k + 1]?.kind === 'BASE' || segs[k + 1]?.kind === 'START', 'после действия'); }
          if (sg.kind === 'STOP' && sg.eventIndex >= 0) assert.ok(segs[k - 1]?.kind === 'RUN', 'перед STOP — RUN');
        });
        // фаза RUN перед каждым STOP/FINISH
        segs.forEach(sg => { if ((sg.kind === 'STOP' && sg.eventIndex >= 0) || sg.kind === 'FINISH_DECELERATE') {
          const b = v.at(segs, sg.t0 - 1e-6), a = v.at(segs, sg.t0 + 1e-6); assert.ok(b.sheet != null && a.sheet != null);
          if (id === 'rocky') assert.equal(phase.sourceForCell(b.index), 68, 'Рокки: #68 перед STOP');
          if (id === 'luna') assert.equal(b.frame, 'run71'); if (id === 'frenk') assert.equal(b.frame, 'run96'); if (id === 'zefir') assert.equal(b.frame, 'run88'); } });
      });
    }
  }
  for (const [id, j] of Object.entries(stats)) assert.ok(j < 30, `${id}: максимальный скачок сдвига спрайта ${j.toFixed(1)} px за кадр`);
});
test('старт: каждая собака стоит в RACE_STAND (окно BASE), а не в случайной фазе RUN', async () => {
  const V = visuals(), V3 = await loadRaceV3(readText, 42), race = V3.resolveRace(4242);
  race.dogs.forEach((dog, i) => { const x = V[IDS[i]].at(dog.segments, 0); assert.equal(x.window, 'BASE'); assert.equal(x.role, 'hold');
    const c = x.clip; assert.ok(['RACE_STAND', 'BASE'].includes(c), IDS[i] + ' ' + c); });
});

// ------------------------------------------------------------------ бабочка
test('бабочка: один объект на каждое событие BUTTERFLY, создаётся и исчезает вместе с телом клипа, без событий — нет', async () => {
  const V = visuals(); let events = 0;
  for (const D of [30, 60]) { const V3 = await loadRaceV3(readText, D);
    for (let s = 1; s <= 80; s++) { const race = V3.resolveRace(s * 31 + 5);
      race.dogs.forEach((dog, i) => { const id = IDS[i], bf = new ButterflyManager(), c = V[id].contract.clips.BUTTERFLY, n = c.sampler === 'table' ? c.labels.length : c.count;
        const expected = dog.segments.filter(x => x.kind === 'BUTTERFLY').length; events += expected; let seen = 0, maxAlive = 0;
        for (let t = 0; t < race.end; t += 1 / 24) { const x = V[id].at(dog.segments, t + 1e-6); const b = bf.update(i, x, n, t, () => ({ x: 0, y: 0 })); if (b) { seen++; assert.ok(b.alpha >= 0 && b.alpha <= 1); } maxAlive = Math.max(maxAlive, bf.active.size); }
        const created = bf.log.filter(e => e.ev === 'create').length, destroyed = bf.log.filter(e => e.ev === 'destroy').length;
        assert.equal(created, expected, `${id}: создано ${created}, событий ${expected}`); assert.equal(destroyed, expected); assert.equal(bf.active.size, 0); assert.ok(maxAlive <= 1);
        if (!expected) assert.equal(seen, 0); else assert.ok(seen >= n * 0.9 * expected, 'бабочка видна всё тело клипа'); }); } }
  assert.ok(events > 50);
});

// ------------------------------------------------------------------ полный сценарий
test('сценарий: выбор → завершение → переход → отсчёт → гонка → финиш → пьедестал; места из Race V3; одинаковый seed — одинаковый результат', async () => {
  const run = async (seed, D, teams) => {
    const V3 = await loadRaceV3(readText, D), g = createGame({ V3, selectionData: selData, teamCount: teams, seed, D });
    for (const [t, d] of distribute(teams, 'even')) g.choose(t, d);
    for (let i = 0; i < 24 * 8; i++) g.update(1 / 24);                          // собаки реагируют на выбор
    assert.ok(g.finishSelection()); assert.equal(g.betting.state, 'locked'); assert.throws(() => g.choose(1, 2));
    const seq = [g.phase]; let n = 0; while (g.phase !== 'podium' && n++ < 100000) { g.update(1 / 12); if (seq.at(-1) !== g.phase) seq.push(g.phase); }
    for (let i = 0; i < 24 * 8; i++) g.update(1 / 24);
    return { g, seq };
  };
  const a = await run(2026, 42, 7), b = await run(2026, 42, 7);
  assert.deepEqual(a.seq, ['locking', 'transition', 'countdown', 'race', 'finish', 'podiumTransition', 'podium']);
  assert.deepEqual(a.g.results.places, b.g.results.places); assert.deepEqual(a.g.results.crossing, b.g.results.crossing);
  assert.deepEqual(a.g.results.places, a.g.race.places, 'места = расчёт Race V3');
  assert.equal(a.g.podium().first, a.g.race.places[0]); assert.equal(a.g.podiumShown, 3);
  assert.equal(a.g.results.scores.length, 7); assert.equal(a.g.results.scores.reduce((s, x) => s + x.points, 0), a.g.betting.snapshot().reduce((s, [, d]) => s + 5 - a.g.race.places.indexOf(d - 1), 0));
  const c = await run(2026, 120, 3); assert.ok(c.g.race.end > a.g.race.end, 'длинная гонка длиннее');
  const d = await run(31337, 20, 12); assert.ok(d.g.phase === 'podium'); assert.ok([...d.g.results.places].sort().join() === '0,1,2,3,4');
});
test('сценарий: все собаки выбраны одной командой/никем — сценарий не ломается', async () => {
  for (const mode of ['all-one', 'none', 'skewed']) {
    const V3 = await loadRaceV3(readText, 30), g = createGame({ V3, selectionData: selData, teamCount: 9, seed: 99 });
    for (const [t, d] of distribute(9, mode)) g.choose(t, d);
    g.finishSelection(); let n = 0; while (g.phase !== 'podium' && n++ < 100000) g.update(1 / 6);
    assert.equal(g.phase, 'podium', mode);
    if (mode === 'none') assert.ok(g.results.scores.every(s => s.points === 0));
  }
});
