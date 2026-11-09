// Диагностическая лаборатория библиотеки пяти бульдогов. НЕ арена и НЕ production.
// Берёт настоящие контракты и атласы из bulldog-racing/assets/dogs/*, физику V3 из dog4-v3-lab (не изменена), кадр — из неизменённого P3,
// сдвиги — из runtime/dog_visual.mjs. Запуск из корня репозитория: python3 -m http.server 8000 → /bulldog-racing/lab/
import {PRESETS, RACES, stateAt} from '../../dog4-v3-lab/model.mjs';
import {resolveRace} from '../../dog4-v3-lab/scenario.mjs';
import {visualAt, categoryOf} from '../../race-v3-p3-lab/src/visual.mjs';
import {createVisual} from '../runtime/dog_visual.mjs';

const LIB = '../assets/dogs/';
const DOGS = [['frenk', 'Фрэнк №1'], ['zefir', 'Зефир №2'], ['rocky', 'Рокки №3'], ['pups', 'Пупс №4'], ['luna', 'Луна №5']];
const $ = id => document.getElementById(id);
const J = p => fetch(p).then(r => { if (!r.ok) throw new Error(p + ' ' + r.status); return r.json(); });
const IMG = u => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('img ' + u)); i.src = u; });
const layout = await J('../../dog4-v3-lab/layout.json');
const cv = $('cv'), ctx = cv.getContext('2d');

// ---------------------------------------------------------------- загрузка библиотек
const D = {};
for (const [id, name] of DOGS) {
  const base = LIB + id + '/';
  const contract = await J(base + 'contract/' + id + '.contract.json'), atlas = await J(base + 'atlas/atlas.json');
  const extras = {};
  if (id === 'frenk') extras.startArrays = await J(base + 'contract/frenk_start_shift_arrays.json'), extras.stopMeta = await J(base + 'contract/frenk_stop_v4_shift_arrays.json');
  if (id === 'zefir') extras.stopList = await J(base + 'atlas/stopB_montage_list.json');
  if (id === 'luna') extras.stopShift = await J(base + 'contract/stop_shift.json');
  if (id === 'rocky') extras.phase = await import(base + 'runtime/phase.mjs');
  const rels = atlas.kind === 'labelled' ? Object.values(atlas.sheets) : Object.values(atlas.clips).map(c => c.sheet);
  const sheets = {};
  for (const r of new Set(rels)) sheets[r] = await IMG(base + r);
  D[id] = {id, name, contract, atlas, sheets, V: createVisual(id, {contract, atlas, extras}, {visualAt, categoryOf}), base};
}
const sizes = await J('../reports/sizes.json').catch(() => null), raw = await J('../reports/validation_raw.json').catch(() => null);

// ---------------------------------------------------------------- рисование ячейки (как игра: ячейка растягивается в 207×116)
const SW = layout.spriteWidth, SH = layout.spriteHeight;
function drawCell(d, sheet, index, x, y, k = 1) {
  const A = d.atlas, cw = A.cellWidth, ch = A.cellHeight, cols = A.columns;
  ctx.drawImage(d.sheets[sheet], (index % cols) * cw, Math.floor(index / cols) * ch, cw, ch, x, y, SW * k, SH * k);
}
const bboxCache = new Map(), tmp = document.createElement('canvas'); tmp.width = SW; tmp.height = SH;
const tctx = tmp.getContext('2d', {willReadFrequently: true});
function bbox(d, sheet, index) {
  const key = d.id + sheet + index; if (bboxCache.has(key)) return bboxCache.get(key);
  tctx.clearRect(0, 0, SW, SH);
  const A = d.atlas; tctx.drawImage(d.sheets[sheet], (index % A.columns) * A.cellWidth, Math.floor(index / A.columns) * A.cellHeight, A.cellWidth, A.cellHeight, 0, 0, SW, SH);
  const px = tctx.getImageData(0, 0, SW, SH).data; let l = 1e9, r = -1, t = 1e9, b = -1;
  for (let yy = 0; yy < SH; yy++) for (let xx = 0; xx < SW; xx++) if (px[(yy * SW + xx) * 4 + 3] >= 128) { l = Math.min(l, xx); r = Math.max(r, xx); t = Math.min(t, yy); b = Math.max(b, yy); }
  const res = {l, r, t, b}; bboxCache.set(key, res); return res;
}
const cellOfFrame = (d, clip, frame) => {
  const A = d.atlas;
  if (A.kind === 'labelled') { const f = A.frames[frame]; return {sheet: A.sheets[f.sheet], index: f.index}; }
  return {sheet: A.clips[clip].sheet, index: frame};
};

// ---------------------------------------------------------------- режим: гонка
let mode = 'race', preset = 'A', race = RACES.A, t = 0, playing = false, ref = 0, refT = 0, rot = 0;
for (const k of Object.keys(PRESETS)) $('preset').add(new Option(PRESETS[k].name, k));
const timeLabel = s => `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, '0')}`;
function drawRace(elapsed) {
  ctx.fillStyle = '#d9d5c7'; ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = '#333'; ctx.font = 'bold 30px system-ui';
  ctx.fillText(`Диагностика: пять собак на физике V3 · ${PRESETS[preset]?.name ?? 'seed ' + race.requestedSeed} · время ${timeLabel(elapsed)}`, 28, 52);
  ctx.font = '20px system-ui'; ctx.fillStyle = '#555';
  ctx.fillText('нейтральная сцена, не арена; линия дорожки = линия лап (строка спрайта 110)', 28, 84);
  ctx.strokeStyle = '#666'; ctx.lineWidth = 3;
  for (const x of [layout.startX, layout.finishX]) { ctx.beginPath(); ctx.moveTo(x, 130); ctx.lineTo(x, 1000); ctx.stroke(); }
  const guides = $('guides').checked;
  for (const dog of race.dogs) {
    const laneY = layout.laneTop + dog.index * layout.laneStep, d = D[DOGS[(dog.index + rot) % 5][0]];
    ctx.fillStyle = dog.index % 2 ? 'rgba(0,0,0,.05)' : 'rgba(0,0,0,.09)'; ctx.fillRect(0, laneY - 111, 1920, 151);
    if (guides) { ctx.strokeStyle = 'rgba(200,40,40,.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(layout.startX - 60, laneY); ctx.lineTo(layout.finishX + 120, laneY); ctx.stroke(); }
    const s = stateAt(dog, elapsed), x = layout.startX + s.progress * (layout.finishX - layout.startX + layout.finishControlOffset);
    const v = d.V.at(dog.segments, elapsed);
    ctx.fillStyle = 'rgba(28,45,35,.30)'; ctx.beginPath(); ctx.ellipse(x - 50, laneY + 2, 59, 5, 0, 0, 7); ctx.fill();
    const k = d.id === 'luna' && $('luna93').checked ? 0.93 : 1;
    if (v.sheet != null) {
      ctx.save(); ctx.translate(x + v.shiftPx, laneY);
      ctx.drawImage(d.sheets[v.sheet], (v.index % d.atlas.columns) * d.atlas.cellWidth, Math.floor(v.index / d.atlas.columns) * d.atlas.cellHeight, d.atlas.cellWidth, d.atlas.cellHeight,
        -layout.spriteAnchorX * k, -layout.spriteTopOffset * k, SW * k, SH * k);
      ctx.restore();
      if (guides) { ctx.strokeStyle = 'rgba(40,90,200,.5)'; ctx.strokeRect(x + v.shiftPx - layout.spriteAnchorX, laneY - layout.spriteTopOffset, SW, SH); }
    } else { ctx.fillStyle = '#c00'; ctx.fillText('НЕТ КАДРА', x - 40, laneY - 40); }
    ctx.fillStyle = '#222'; ctx.font = 'bold 22px system-ui'; ctx.fillText(d.name, 20, laneY - 66);
    ctx.font = '17px system-ui'; ctx.fillStyle = '#444';
    ctx.fillText(`${v.window}/${v.role} · ${v.clip}:${v.frame}${v.frameOverridden ? ' (поправка фазы)' : ''} · сдвиг ${v.shiftPx.toFixed(1)}px`, 1500, laneY - 60);
    ctx.fillText(`${(s.progress * 100).toFixed(1)}% · ${v.status}`, 1500, laneY - 36);
  }
  $('clock').textContent = timeLabel(elapsed); $('scrub').value = String(Math.round(elapsed / race.end * 1000));
}
// ---------------------------------------------------------------- режим: стойки и размеры
function drawStand(elapsed) {
  ctx.fillStyle = '#d9d5c7'; ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = '#333'; ctx.font = 'bold 30px system-ui'; ctx.fillText('Стойки (RACE_STAND) и цикл RUN: одна линия лап; внизу — игровой масштаб ×1', 28, 52);
  const rows = [{y: 340, k: 1.8, label: 'RACE_STAND ×1.8'}, {y: 690, k: 1.8, label: 'RUN (цикл) ×1.8'}, {y: 900, k: 1, label: 'RUN ×1 (игровой размер)'}];
  for (const row of rows) {
    ctx.strokeStyle = 'rgba(200,40,40,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, row.y); ctx.lineTo(1920, row.y); ctx.stroke();
    ctx.fillStyle = '#555'; ctx.font = '18px system-ui'; ctx.fillText(row.label, 12, row.y - (row.k > 1 ? 215 : 120));
  }
  DOGS.forEach(([id, name], i) => {
    const d = D[id], c = d.contract, cx0 = 20 + i * 378;
    let stand, run;
    if (d.atlas.kind === 'labelled') {
      stand = cellOfFrame(d, 'RACE_STAND', c.clips[c.windows.BASE.hold].frame);
      const loop = c.clips.START.loop, fr = loop[Math.floor(elapsed * 24) % loop.length]; run = cellOfFrame(d, 'START', fr);
    } else {
      stand = {sheet: d.atlas.clips.BASE.sheet, index: 0};
      const rc = c.clips.RUN; run = {sheet: d.atlas.clips.RUN.sheet, index: rc.prologue + Math.floor(elapsed * 24) % rc.loop};
    }
    for (const [row, cell] of [[rows[0], stand], [rows[1], run], [rows[2], run]]) {
      const k = row.k, x = cx0, y = row.y - layout.spriteTopOffset * k;
      drawCell(d, cell.sheet, cell.index, x, y, k);
      const b = bbox(d, cell.sheet, cell.index);
      ctx.strokeStyle = 'rgba(40,90,200,.7)'; ctx.lineWidth = 1; ctx.strokeRect(x + b.l * k, y + b.t * k, (b.r - b.l + 1) * k, (b.b - b.t + 1) * k);
      if (row === rows[0]) { ctx.fillStyle = '#222'; ctx.font = 'bold 20px system-ui'; ctx.fillText(name, x, row.y + 28); ctx.font = '15px system-ui'; ctx.fillText(`${b.r - b.l + 1}×${b.b - b.t + 1}px, лапы строка ${b.b}`, x, row.y + 48); }
    }
  });
  ctx.fillStyle = '#444'; ctx.font = '16px system-ui'; ctx.fillText('красная — линия лап (строка спрайта 110), синяя рамка — силуэт (alpha ≥ 128)', 28, 1050);
}
// ---------------------------------------------------------------- режим: выбор (видео alpha)
const SEL = {
  frenk: {idle: 'alpha/DOG1_IDLE_v1_alpha_loop220.webm', sel: 'alpha/DOG1_SELECTED_v1_alpha_f20-f121.webm', ret: 'alpha/DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm'},
  zefir: {idle: 'alpha/DOG2_IDLE_MAIN_L1_alpha_loop131.webm', sel: 'alpha/DOG2_SELECTED_alpha_f1-f121.webm', selStart: 3, ret: 'alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm'},
  rocky: {idle: 'alpha/DOG3_IDLE_B_ALPHA_240.webm', sel: 'alpha/DOG3_SELECTED_ALPHA_121.webm', ret: 'alpha/DOG3_RETURN_D_ALPHA_97.webm'},
  pups: {idle: 'alpha/DOG4_IDLE_v1_alpha_loop240.webm', sel: 'alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm', ret: null},
  luna: {idle: 'alpha/DOG5_IDLE_alpha_f0-f120.webm', pingpong: [0, 48], sel: 'alpha/DOG5_SELECTED_alpha_s0-s120.webm', ret: 'alpha/DOG5_RETURN_TO_IDLE_G1_alpha_graded.webm'},
};
const players = {};
function buildSel() {
  const box = $('sel'); box.innerHTML = '';
  for (const [id, name] of DOGS) {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `<b>${name}</b><video muted playsinline></video><div class="st">IDLE</div><button>Выбрать</button>`;
    box.append(card);
    const v = card.querySelector('video'), st = card.querySelector('.st'), btn = card.querySelector('button'), S = SEL[id], base = D[id].base;
    const P = players[id] = {v, st, state: 'idle', want: false, dir: 1};
    const play = (src, st0 = 0) => { v.loop = false; v.src = base + src; v.onloadeddata = () => { v.currentTime = st0 / 24; v.play().catch(() => {}); }; };
    const toIdle = () => { P.state = 'idle'; st.textContent = 'IDLE'; P.dir = 1; v.src = base + S.idle; v.loop = !S.pingpong; v.onloadeddata = () => { v.currentTime = 0; if (!S.pingpong) v.play().catch(() => {}); }; };   // пинг-понг Луны ведётся перемоткой, play не нужен
    P.toIdle = toIdle;
    v.onended = () => {
      if (P.state === 'sel') { if (S.ret) { P.state = 'ret'; st.textContent = 'RETURN_TO_IDLE'; play(S.ret); } else toIdle(); }
      else if (P.state === 'ret') toIdle();
    };
    btn.onclick = () => { P.want = true; };
    // Луна: IDLE A = кадры 0→48→1 (пинг-понг), остальные — готовые петли. Выход: упрощённо — на границе цикла (у Луны — у ворот f0–f3).
    const tick = () => {
      if (mode === 'sel') {
        if (P.state === 'idle') {
          if (S.pingpong) { const [a, b] = S.pingpong, fr = v.currentTime * 24; if (fr >= b && P.dir > 0) P.dir = -1; if (fr <= 1 && P.dir < 0) P.dir = 1; const nowT = performance.now(), dt = P.last ? (nowT - P.last) / 1000 : 0; P.last = nowT; v.currentTime = Math.max(0, Math.min(b / 24, v.currentTime + P.dir * dt)); }
          const atGate = S.pingpong ? v.currentTime * 24 <= 3 : true;   // УПРОЩЕНО: ворота выхода из IDLE (selection.mjs у Фрэнка/Зефира/Пупса) здесь не воспроизводятся; только Луна ждёт ворота f0–f3
          if (P.want && atGate) { P.want = false; P.state = 'sel'; st.textContent = 'SELECTED'; play(S.sel, S.selStart || 0); }
        }
      }
      requestAnimationFrame(tick);
    };
    toIdle(); requestAnimationFrame(tick);
  }
}
buildSel();

// ---------------------------------------------------------------- управление
const frame = now => {
  if (mode === 'race') { if (playing) { t = Math.min(race.end, refT + (now - ref) / 1000 * Number($('speed').value)); if (t >= race.end) playing = false; $('play').textContent = playing ? 'Ⅱ' : '▶'; } drawRace(t); }
  if (mode === 'stand') drawStand(performance.now() / 1000);
  requestAnimationFrame(frame);
};
function setMode(m) {
  mode = m; cv.style.display = m === 'sel' ? 'none' : 'block'; $('sel').style.display = m === 'sel' ? 'grid' : 'none'; $('raceCtl').style.display = m === 'race' ? '' : 'none';
  for (const [b, mm] of [['mRace', 'race'], ['mStand', 'stand'], ['mSel', 'sel']]) $(b).classList.toggle('on', m === mm);
  if (m === 'sel') for (const id in players) players[id].toIdle();
  info();
}
$('mRace').onclick = () => setMode('race'); $('mStand').onclick = () => setMode('stand'); $('mSel').onclick = () => setMode('sel');
$('preset').onchange = () => { preset = $('preset').value; race = RACES[preset]; t = 0; playing = false; };
$('go').onclick = () => { race = resolveRace(Number($('seed').value)); preset = 'RANDOM'; t = 0; playing = false; };
$('play').onclick = () => { if (t >= race.end) t = 0; playing = !playing; ref = performance.now(); refT = t; };
$('reset').onclick = () => { playing = false; t = 0; };
$('speed').onchange = () => { ref = performance.now(); refT = t; };
$('scrub').oninput = () => { t = Number($('scrub').value) / 1000 * race.end; ref = performance.now(); refT = t; };
$('rot').onchange = () => { rot = Number($('rot').value); };
function info() {
  const el = $('info'); let h = '';
  if (sizes) {
    h += '<table><tr><th>собака</th><th>ячейка</th><th>стойка w×h</th><th>RUN длина</th><th>RUN высота</th><th>лапы стойки</th><th>лапы RUN мин–макс</th></tr>';
    for (const [id, name] of DOGS) { const s = sizes[id]; h += `<tr><td>${name}</td><td>${s.cell.join('×')}${s.stretchedToSprite ? ' → 207×116' : ''}</td><td>${s.raceStand.w}×${s.raceStand.h}</td><td>${s.runLoopMean.w}</td><td>${s.runLoopMean.h}</td><td>${s.raceStand.bottom}</td><td>${s.runLoopMean.bottom_min}–${s.runLoopMean.bottom_max}</td></tr>`; }
    h += '</table>';
  }
  if (raw) { h += '<p>Автопроверка: ' + DOGS.map(([id, n]) => { const p = raw.dogs[id].problems.filter(x => x.sev === 'error' || x.sev === 'partial'); return `${n}: ${p.length ? '<span class="warn">' + p.length + ' замеч.</span>' : 'ок'}`; }).join(' · ') + ' (подробно: reports/VALIDATION_REPORT.md)</p>'; }
  el.innerHTML = h;
}
info();
window.lab = {ready: true, setMode, seek: x => { t = x; }, play: () => { playing = true; ref = performance.now(); refT = t; }, pause: () => { playing = false; }, get end() { return race.end; }, D, press: id => { players[id].want = true; }, selectNow: () => { for (const id in players) players[id].want = true; }, setPreset: k => { $('preset').value = k; $('preset').onchange(); }};
requestAnimationFrame(frame);
