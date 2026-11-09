// Интерактивная лаборатория раунда «Скачки бульдогов»: выбор → старт → гонка Race V3 → финиш → пьедестал.
// НЕ production и НЕ арена: нейтральные сцены. Гонку считает Race V3 (dog4-v3-lab, один параметр длительности — см. raceV3.mjs), кадры собак — контракты библиотеки.
import { loadRaceV3 } from './raceV3.mjs';
import { loadLibrary, IDS } from './library.mjs';
import { createGame, DOGS, TIMING } from './game.mjs';
import { distribute } from './rules.mjs';
import { createSelectionPlayer } from './selection.mjs';
import { ButterflyManager } from './butterfly.mjs';

const $ = id => document.getElementById(id);
const cv = $('cv'), ctx = cv.getContext('2d');
const ROOT = new URL('../../../', import.meta.url);
const readText = p => fetch(new URL(p, ROOT)).then(r => r.text());
$('status').textContent = 'Загрузка библиотеки собак…';
const lib = await loadLibrary(p => { $('status').textContent = `Загрузка библиотеки собак… ${Math.round(p * 100)}%`; });
const { D, data, layout } = lib;
const NAMES = DOGS.map(d => d[1]);
const TEAM_COLORS = ['#d94f4f', '#3f7fd0', '#3aa35a', '#c9962a', '#8e5bc4', '#2aa7a7', '#d4639a', '#6d7a8a', '#b5651d', '#4a4a9a', '#7aa32a', '#a33a3a', '#2f6b8a', '#9a7b2f', '#5f3a8a', '#3a8a6b', '#8a3a5f', '#6b8a3a', '#3a5f8a', '#8a6b3a', '#3a8a8a', '#8a3a3a', '#5a8a3a', '#3a3a8a'];
let V3 = await loadRaceV3(42);
const G = createGame({ V3, selectionData: data, teamCount: 6, seed: null, D: 42 });
const bf = new ButterflyManager();
// Диагностические условия отображения (для сравнительных роликов; по умолчанию — как в лаборатории): cam 'fixed'|'follow', zoom, label
const OPTS = { cam: 'fixed', zoom: 1, label: '', focus: null, cardLabel: null };
const SW = layout.spriteWidth, SH = layout.spriteHeight;

// ---------------------------------------------------------------- вспомогательное рисование
const ease = u => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const text = (s, x, y, size = 24, color = '#222', align = 'left', weight = 'normal') => { ctx.fillStyle = color; ctx.font = `${weight} ${size}px system-ui, sans-serif`; ctx.textAlign = align; ctx.fillText(s, x, y); ctx.textAlign = 'left'; };
function drawSel(id, fr, x, y, k) {                                // кадр экрана выбора/пьедестала (общий кроп, лапы выровнены)
  const d = D[id], sa = d.selAtlas, [cw, ch] = sa.cell, c = sa.columns;
  ctx.drawImage(d.sel[fr.clip], (fr.index % c) * cw, Math.floor(fr.index / c) * ch, cw, ch, x, y, cw * k, ch * k);
}
const SEL_CELL = D.frenk.selAtlas.cell, PAW_Y = 690 * D.frenk.selAtlas.scale;           // строка лап в ячейке выбора (≈276 из 283)
const noseCache = new Map(), tmp = document.createElement('canvas'); tmp.width = SW; tmp.height = SH; const tctx = tmp.getContext('2d', { willReadFrequently: true });
function noseOf(d, v) {                                                // нос собаки в пикселях спрайта 207×116: самая правая точка верхних 60% силуэта
  const key = d.id + v.sheet + v.index; if (noseCache.has(key)) return noseCache.get(key);
  const A = d.atlas; tctx.clearRect(0, 0, SW, SH);
  tctx.drawImage(d.sheets[v.sheet], (v.index % A.columns) * A.cellWidth, Math.floor(v.index / A.columns) * A.cellHeight, A.cellWidth, A.cellHeight, 0, 0, SW, SH);
  const px = tctx.getImageData(0, 0, SW, SH).data; let top = 1e9, bot = -1;
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) if (px[(y * SW + x) * 4 + 3] >= 128) { top = Math.min(top, y); bot = Math.max(bot, y); }
  const lim = top + (bot - top) * .6; let bx = -1, by = top;
  for (let y = top; y <= lim; y++) for (let x = SW - 1; x >= 0; x--) if (px[(y * SW + x) * 4 + 3] >= 128) { if (x > bx) { bx = x; by = y; } break; }
  const r = { x: bx, y: by }; noseCache.set(key, r); return r;
}
const bodyFramesOf = d => { const c = d.contract.clips.BUTTERFLY; return c.sampler === 'table' ? c.labels.length : c.count; };

// ---------------------------------------------------------------- сцены
function bgNeutral() { const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#e4e0d3'); g.addColorStop(1, '#cfcab9'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080); }
function drawSelectScene(alpha = 1, yOff = 0, counts = G.betting.counts()) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(0, yOff); bgNeutral();
  text('СКАЧКИ БУЛЬДОГОВ · ВЫБОР СОБАКИ', 960, 78, 46, '#2d2a24', 'center', 'bold');
  text(G.betting.state === 'open' ? 'Команды выбирают собаку — выбор можно менять до старта' : 'Выбор закрыт', 960, 118, 26, '#5b564a', 'center');
  const cw = 340, gap = 30, x0 = (1920 - (5 * cw + 4 * gap)) / 2, k = 1.4, dw = SEL_CELL[0] * k, dh = SEL_CELL[1] * k;
  DOGS.forEach(([id, name], i) => {
    const x = x0 + i * (cw + gap), y = 160, h = 780, sel = counts[i] > 0;
    ctx.fillStyle = sel ? '#fff7dc' : '#f5f2e9'; rr(x, y, cw, h, 22); ctx.fill(); ctx.strokeStyle = sel ? '#d39a1c' : '#b8b2a0'; ctx.lineWidth = sel ? 6 : 2; ctx.stroke();
    ctx.fillStyle = '#2d2a24'; rr(x + 16, y + 16, 64, 64, 14); ctx.fill(); text(String(i + 1), x + 48, y + 64, 44, '#fff', 'center', 'bold');
    text(name, x + 96, y + 62, 40, '#2d2a24', 'left', 'bold');
    const pawLine = y + 575;                      // лапы всех собак на одной линии
    ctx.fillStyle = 'rgba(0,0,0,.10)'; ctx.beginPath(); ctx.ellipse(x + cw / 2, pawLine + 4, 120, 14, 0, 0, 7); ctx.fill();
    drawSel(id, G.frames[i], x + (cw - dw) / 2, pawLine - PAW_Y * k, k);
    text('СТАВОК', x + cw / 2, y + h - 150, 22, '#6b6656', 'center'); text(String(counts[i]), x + cw / 2, y + h - 98, 64, sel ? '#b87a00' : '#8a8575', 'center', 'bold');
    const chips = [...G.betting.teams.entries()].filter(([, d]) => d === i + 1).map(([t]) => t);
    chips.slice(0, 12).forEach((t, j) => { const cx = x + 30 + (j % 6) * 48, cy = y + h - 58 + Math.floor(j / 6) * 38; ctx.fillStyle = TEAM_COLORS[(t - 1) % 24]; ctx.beginPath(); ctx.arc(cx + 14, cy, 16, 0, 7); ctx.fill(); text(String(t), cx + 14, cy + 6, 16, '#fff', 'center', 'bold'); });
    const st = G.players[i].busy() ? (G.frames[i].kind === 'sel' ? 'SELECTED' : G.frames[i].kind === 'ret' ? 'возврат' : 'выход к стойке…') : '';
    if (st) text(st, x + cw / 2, y + 120, 20, '#b87a00', 'center', 'bold');
    if (OPTS.cardLabel && OPTS.cardLabel.i === i) text(OPTS.cardLabel.text, x + cw / 2, y + h + 34, 24, '#2d2a24', 'center', 'bold');
  });
  ctx.restore();
}
function laneY(i) { return layout.laneTop + i * layout.laneStep; }
function drawTrackScene(t, race, mode = 'race', fade = 1, standOnly = false) {
  ctx.save(); bgNeutral();
  text('СКАЧКИ БУЛЬДОГОВ · 5 ДОРОЖЕК', 40, 62, 36, '#2d2a24', 'left', 'bold');
  ctx.strokeStyle = '#555'; ctx.lineWidth = 4;
  for (const x of [layout.startX, layout.finishX]) { ctx.beginPath(); ctx.moveTo(x, 150); ctx.lineTo(x, 1000); ctx.stroke(); }
  for (let r = 0; r < 12; r++) { ctx.fillStyle = r % 2 ? '#222' : '#eee'; ctx.fillRect(layout.finishX + 2, 150 + r * 71, 14, 71); }
  text('СТАРТ', layout.startX, 140, 22, '#444', 'center', 'bold'); text('ФИНИШ', layout.finishX, 140, 22, '#444', 'center', 'bold');
  let cam = null;
  if (OPTS.cam === 'follow' && race) { const xs = race.dogs.map(dg => layout.startX + stateOf(dg, t).progress * (layout.finishX - layout.startX + layout.finishControlOffset)), lead = OPTS.focus != null ? OPTS.focus : xs.indexOf(Math.max(...xs)); cam = { z: OPTS.zoom, x: (OPTS.focus != null ? xs[lead] + 40 : Math.max(...xs)) - 960 / OPTS.zoom * (OPTS.focus != null ? 1 : 0.8), y: laneY(lead) - 540 / OPTS.zoom * (OPTS.focus != null ? 1.05 : 0.9) }; ctx.save(); ctx.setTransform(cam.z, 0, 0, cam.z, -cam.x * cam.z, -cam.y * cam.z); }
  const order = race ? race.dogs.map((d, i) => [stateOf(d, t).progress, i]).sort((a, b) => b[0] - a[0]).map(a => a[1]) : [0, 1, 2, 3, 4];
  DOGS.forEach(([id, name], i) => {
    const ly = laneY(i), d = D[id], dog = race?.dogs[i];
    ctx.fillStyle = i % 2 ? 'rgba(0,0,0,.05)' : 'rgba(0,0,0,.09)'; ctx.fillRect(0, ly - 111, 1920, 151);
    if (cam) { ctx.fillStyle = 'rgba(0,0,0,.07)'; const x0 = Math.floor((cam.x - 100) / 160) * 160; for (let gx = x0; gx < cam.x + 1920 / cam.z + 200; gx += 160) if ((gx / 160) % 2 === 0) ctx.fillRect(gx, ly - 111, 80, 151); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let gx = x0; gx < cam.x + 1920 / cam.z + 200; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, ly + 14); ctx.lineTo(gx, ly + 26); ctx.stroke(); } }
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; for (let k = 0; k <= 10; k++) { const x = layout.startX + k * (layout.finishX - layout.startX) / 10; ctx.beginPath(); ctx.moveTo(x, ly + 14); ctx.lineTo(x, ly + 26); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.moveTo(layout.startX, ly + 20); ctx.lineTo(layout.finishX, ly + 20); ctx.stroke();
    ctx.fillStyle = '#2d2a24'; rr(24, ly - 100, 52, 52, 12); ctx.fill(); text(String(i + 1), 50, ly - 62, 34, '#fff', 'center', 'bold'); text(name, 90, ly - 62, 30, '#2d2a24', 'left', 'bold');
    const segs = dog ? dog.segments : [{ kind: 'BASE', t0: 0, t1: 1, p0: 0, p1: 0, eventIndex: -1 }];
    const st = dog ? stateOf(dog, t) : { progress: 0 }, x = layout.startX + st.progress * (layout.finishX - layout.startX + layout.finishControlOffset);
    const alpha = standOnly ? fade * ease((fadeLane(i))) : 1;
    ctx.globalAlpha = alpha;
    const v = dog ? d.V.at(segs, t) : d.V.at([{ kind: 'BASE', t0: 0, t1: 1000, p0: 0, p1: 0, eventIndex: -1, base: 1 }], 0);
    ctx.fillStyle = 'rgba(28,45,35,.30)'; ctx.beginPath(); ctx.ellipse(x - 50, ly + 2, 59, 5, 0, 0, 7); ctx.fill();
    if (v.sheet != null) ctx.drawImage(d.sheets[v.sheet], (v.index % d.atlas.columns) * d.atlas.cellWidth, Math.floor(v.index / d.atlas.columns) * d.atlas.cellHeight, d.atlas.cellWidth, d.atlas.cellHeight, x - layout.spriteAnchorX + v.shiftPx, ly - layout.spriteTopOffset, SW, SH);
    ctx.globalAlpha = 1;
    if (dog && mode === 'race') {
      const b = bf.update(i, v, bodyFramesOf(d), t, () => { const n = noseOf(d, v); return { x: x - layout.spriteAnchorX + v.shiftPx + n.x, y: ly - layout.spriteTopOffset + n.y }; });
      if (b) drawButterfly(b);
      const rank = order.indexOf(i) + 1, done = t >= dog.crossing;
      text(done ? `${G.race.places.indexOf(i) + 1} МЕСТО` : `${rank}-й · ${(st.progress * 100).toFixed(0)}%`, 1650, ly - 36, 24, done ? '#b87a00' : '#2d2a24', 'left', 'bold');
    }
  });
  if (cam) ctx.restore();
  ctx.restore();
}
const stateOf = (dog, t) => G.V3.stateAt(dog, t);
const fadeLane = i => (G.phase === 'transition' ? (G.phaseT / TIMING.transition - 0.55 - 0.07 * i) / 0.2 : 1);
function drawButterfly(b) {
  ctx.save(); ctx.globalAlpha = b.alpha; ctx.translate(b.x, b.y);
  const w = 6 + 9 * (0.35 + 0.65 * b.wing); ctx.fillStyle = '#ff9a2e'; ctx.strokeStyle = '#7a3b00'; ctx.lineWidth = 1.5;
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * w * .55, -3, w * .55, 7, s * .35, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(s * w * .4, 5, w * .38, 5, -s * .3, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = '#3a2000'; ctx.fillRect(-1.2, -8, 2.4, 17); ctx.restore();
}
function drawPodium(alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; bgNeutral();
  const res = G.results, pod = G.podium(); text('ФИНИШ · ПЬЕДЕСТАЛ', 960, 76, 46, '#2d2a24', 'center', 'bold');
  const steps = [{ place: 2, x: 560, h: 170, dog: pod.second }, { place: 1, x: 960, h: 250, dog: pod.first }, { place: 3, x: 1360, h: 110, dog: pod.third }], base = 880, k = 1.5, bw = 330;
  steps.forEach(s => {
    const shown = G.podiumShown >= (s.place === 3 ? 1 : s.place === 2 ? 2 : 3);
    ctx.fillStyle = s.place === 1 ? '#d9b44a' : s.place === 2 ? '#bfc4c9' : '#c08a5a'; ctx.fillRect(s.x - bw / 2, base - s.h, bw, s.h);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(s.x - bw / 2, base - s.h, bw, 8);
    text(String(s.place), s.x, base - s.h / 2 + 30, 90, '#fff', 'center', 'bold');
    if (!shown) return;
    const id = IDS[s.dog], fr = G.podiumFrames[s.dog], dw = SEL_CELL[0] * k;
    ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(s.x, base - s.h + 4, 130, 13, 0, 0, 7); ctx.fill();
    drawSel(id, fr, s.x - dw / 2, base - s.h - PAW_Y * k + 4, k);
    ctx.fillStyle = '#fff8e0'; rr(s.x - 150, base + 14, 300, 76, 14); ctx.fill(); ctx.strokeStyle = '#8a8575'; ctx.lineWidth = 2; ctx.stroke();
    text(`${s.place} место · №${s.dog + 1}`, s.x, base + 46, 28, '#2d2a24', 'center', 'bold'); text(NAMES[s.dog], s.x, base + 78, 28, '#5b564a', 'center');
  });
  ctx.fillStyle = '#e9e5d8'; rr(60, 150, 380, 330, 16); ctx.fill(); text('ИТОГ ГОНКИ', 80, 188, 26, '#2d2a24', 'left', 'bold');
  res.places.forEach((dog, pos) => text(`${pos + 1}. №${dog + 1} ${NAMES[dog]} — ${res.crossing[dog].toFixed(1)} с`, 80, 232 + pos * 44, 26, pos < 3 ? '#2d2a24' : '#7a7566'));
  ctx.fillStyle = '#e9e5d8'; rr(1480, 150, 400, 460, 16); ctx.fill(); text('ОЧКИ КОМАНД (5−место)', 1500, 188, 24, '#2d2a24', 'left', 'bold');
  res.scores.slice(0, 11).forEach((s, i) => { text(`К${s.team}`, 1500, 232 + i * 34, 22, TEAM_COLORS[(s.team - 1) % 24], 'left', 'bold'); text(s.dog ? `№${s.dog} ${NAMES[s.dog - 1]} · ${s.place} м.` : 'без ставки', 1560, 232 + i * 34, 22, '#444'); text(`+${s.points}`, 1860, 232 + i * 34, 22, '#2d2a24', 'right', 'bold'); });
  if (res.scores.length > 11) text(`… и ещё ${res.scores.length - 11}`, 1500, 232 + 11 * 34, 20, '#666');
  ctx.restore();
}
function drawFinishOverlay() {
  const res = G.results; ctx.fillStyle = 'rgba(30,28,22,.55)'; ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = '#fff8e0'; rr(600, 220, 720, 560, 24); ctx.fill(); text('ФИНИШ — ИТОГОВЫЕ МЕСТА', 960, 290, 40, '#2d2a24', 'center', 'bold');
  res.places.forEach((dog, pos) => { text(`${pos + 1}`, 680, 370 + pos * 70, 44, pos < 3 ? '#b87a00' : '#8a8575', 'left', 'bold'); text(`№${dog + 1} ${NAMES[dog]}`, 760, 370 + pos * 70, 38, '#2d2a24'); text(`${res.crossing[dog].toFixed(2)} с`, 1260, 370 + pos * 70, 34, '#5b564a', 'right'); });
}

// ---------------------------------------------------------------- кадр
function render() {
  const t = G.raceT, ph = G.phase;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (ph === 'select' || ph === 'locking') { drawSelectScene(); if (ph === 'locking') { ctx.fillStyle = 'rgba(30,28,22,.18)'; ctx.fillRect(0, 0, 1920, 1080); text('Выбор завершён — выбранные собаки реагируют…', 960, 1030, 34, '#2d2a24', 'center', 'bold'); } }
  else if (ph === 'transition') {
    const u = G.phaseT / TIMING.transition, a = ease(u / 0.4);
    if (u < 0.4) { bgNeutral(); drawSelectScene(1 - a, a * 500); }                         // 1) карточки уходят вниз и гаснут на нейтральном фоне
    else {                                                                                 // 2) нейтральная вуаль расходится, видна трасса; собаки проявляются по дорожкам
      drawTrackScene(0, null, 'stand', 1, true);
      const v = 1 - ease((u - 0.4) / 0.25); if (v > 0) { ctx.fillStyle = `rgba(228,224,211,${v})`; ctx.fillRect(0, 0, 1920, 1080); }
      text('К СТАРТОВОЙ ЛИНИИ', 960, 60, 30, `rgba(45,42,36,${ease((u - 0.4) / 0.2)})`, 'center', 'bold');
    }
  }
  else if (ph === 'countdown') {
    drawTrackScene(0, G.race, 'stand'); const c = Math.ceil(TIMING.countdown - G.phaseT); text(c > 0 ? String(c) : 'СТАРТ!', 960, 560, 220, 'rgba(45,42,36,.8)', 'center', 'bold');
  }
  else if (ph === 'race') { drawTrackScene(t, G.race, 'race'); if (G.raceSpeed !== 1) { ctx.fillStyle = '#b02a2a'; ctx.fillRect(1120, 28, 640, 44); text(`ЛАБОРАТОРНОЕ УСКОРЕНИЕ ×${G.raceSpeed}: анимации идут быстрее утверждённых 24 к/с`, 1440, 60, 22, '#fff', 'center', 'bold'); } text(`t = ${t.toFixed(1)} с  ·  seed ${G.seed}${G.race.effectiveSeed !== Number(G.seed) ? '→' + G.race.effectiveSeed : ''}  ·  D=${G.D} с  ·  ×${G.raceSpeed}`, 960, 62, 26, '#2d2a24', 'center'); }
  else if (ph === 'finish') { drawTrackScene(G.race.end, G.race, 'race'); drawFinishOverlay(); }
  else if (ph === 'podiumTransition') { const u = G.phaseT / TIMING.podiumTransition; drawTrackScene(G.race.end, G.race, 'race'); drawFinishOverlay(); drawPodium(ease(u)); }
  else if (ph === 'podium') drawPodium(1);
  if (OPTS.label) { ctx.fillStyle = 'rgba(30,28,22,.85)'; ctx.fillRect(0, 1000, 1920, 80); text(OPTS.label, 960, 1052, 38, '#fff', 'center', 'bold'); }
}

// ---------------------------------------------------------------- панель управления (тестовый режим)
function panel() {
  const counts = G.betting.counts(), open = G.betting.state === 'open' && G.phase === 'select';
  $('phase').textContent = { select: 'ВЫБОР', locking: 'ЗАВЕРШЕНИЕ ВЫБОРА', transition: 'ПЕРЕХОД К СТАРТУ', countdown: 'ОТСЧЁТ', race: 'ГОНКА', finish: 'ФИНИШ', podiumTransition: 'К ПЬЕДЕСТАЛУ', podium: 'ПЬЕДЕСТАЛ' }[G.phase];
  $('counts').textContent = counts.map((c, i) => `№${i + 1} ${NAMES[i]}: ${c}`).join(' · ');
  const tb = $('teams'); if (!tb._built || tb._n !== G.betting.teams.size || tb._open !== open) {
    tb._built = true; tb._n = G.betting.teams.size; tb._open = open; tb.innerHTML = '';
    for (const [team, dog] of G.betting.teams) {
      const row = document.createElement('div'); row.className = 'trow'; row.innerHTML = `<b style="color:${TEAM_COLORS[(team - 1) % 24]}">К${team}</b>`;
      for (let d = 1; d <= 5; d++) { const b = document.createElement('button'); b.textContent = d; b.dataset.t = team; b.dataset.d = d; b.disabled = !open; b.onclick = () => G.choose(team, d); row.append(b); }
      const x = document.createElement('button'); x.textContent = '✕'; x.disabled = !open; x.onclick = () => G.choose(team, null); row.append(x); tb.append(row);
    }
  }
  for (const b of tb.querySelectorAll('button[data-d]')) b.classList.toggle('on', G.betting.teams.get(+b.dataset.t) === +b.dataset.d);
  $('go').disabled = !(G.phase === 'select'); $('skip').disabled = !['locking', 'transition', 'countdown', 'finish'].includes(G.phase);
  const raceLive = G.race && G.phase === 'race' ? `лидер: №${G.race.dogs.map((d, i) => [G.V3.stateAt(d, G.raceT).progress, i]).sort((a, b) => b[0] - a[0])[0][1] + 1}` : '';
  $('live').textContent = raceLive + (G.results ? ' · места: ' + G.results.places.map(p => '№' + (p + 1)).join(' ') : '');
}
function setTeamCount(n) { G.betting.setTeams(n); $('teams')._built = false; }
$('teamN').onchange = () => { try { setTeamCount(+$('teamN').value); } catch (e) { $('status').textContent = e.message; } };
$('dist').onchange = () => {};
$('apply').onclick = () => { if (G.phase !== 'select') return; for (const [t, d] of distribute(G.betting.teams.size, $('dist').value, G.rng)) G.choose(t, d); };
$('go').onclick = () => { G.D = +$('D').value; G.raceSpeed = +$('speed').value; G.seed = $('seed').value.trim() === '' ? null : +$('seed').value; prepare().then(() => G.finishSelection()); };
$('skip').onclick = () => G.skip();
$('restart').onclick = () => { bf.reset(); G.restart(); $('teams')._built = false; };
$('speed').onchange = () => { G.raceSpeed = +$('speed').value; };
async function prepare() { if (!G.V3 || G.V3.D !== G.D) G.V3 = await loadRaceV3(G.D); }

let last = performance.now();
function frame(now) { const dt = Math.min(0.5, (now - last) / 1000); last = now; if (!window.__paused) G.update(dt); render(); requestAnimationFrame(frame); }
setInterval(panel, 150); panel();
$('status').textContent = 'Готово: выберите собак за команды и нажмите «Завершить выбор»';
window.round = { OPTS, G, D, bf, setPlayer: (i, pos) => { G.players[i] = createSelectionPlayer(DOGS[i][0], data, pos); G.frames[i] = G.players[i].tick(); }, loadRaceV3: d => loadRaceV3(d), prepare, setTeamCount, ready: true, step: dt => { G.update(dt); render(); }, pause: v => { window.__paused = v; }, render };
requestAnimationFrame(frame);
