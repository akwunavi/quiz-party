// Загрузка библиотеки пяти собак (контракты, атласы гонки, атласы экрана выбора) для браузера.
import { createVisual } from '../../runtime/dog_visual.mjs';
import { visualAt, categoryOf } from '../../../race-v3-p3-lab/src/visual.mjs';
const LIB = new URL('../../assets/dogs/', import.meta.url).href;
export const IDS = ['frenk', 'zefir', 'rocky', 'pups', 'luna'];
const J = p => fetch(p).then(r => { if (!r.ok) throw new Error(p + ' ' + r.status); return r.json(); });
const IMG = u => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('img ' + u)); i.src = u; });
export async function loadLibrary(onProgress = () => {}) {
  const D = {}; let n = 0;
  for (const id of IDS) {
    const base = LIB + id + '/', contract = await J(base + 'contract/' + id + '.contract.json'), atlas = await J(base + 'atlas/atlas.json'), selAtlas = await J(base + 'selection/selection_atlas.json');
    const extras = {};
    if (id === 'frenk') { extras.startArrays = await J(base + 'contract/frenk_start_shift_arrays.json'); extras.stopMeta = await J(base + 'contract/frenk_stop_v4_shift_arrays.json'); }
    if (id === 'zefir') extras.stopList = await J(base + 'atlas/stopB_montage_list.json');
    if (id === 'luna') extras.stopShift = await J(base + 'contract/stop_shift.json');
    if (id === 'rocky') extras.phase = await import(base + 'runtime/phase_v2.mjs');
    const rels = atlas.kind === 'labelled' ? Object.values(atlas.sheets) : Object.values(atlas.clips).map(c => c.sheet);
    const sheets = {}; for (const r of new Set(rels)) sheets[r] = await IMG(base + r);
    const sel = {}; for (const [k, c] of Object.entries(selAtlas.clips)) sel[k] = await IMG(base + c.sheet);
    D[id] = { id, contract, atlas, sheets, selAtlas, sel, V: createVisual(id, { contract, atlas, extras }, { visualAt, categoryOf }), base };
    onProgress(++n / IDS.length);
  }
  const data = { pupsGates: (await J(LIB + 'pups/selection/gates.json')).gates, rockyDelay: await J(LIB + 'rocky/selection/idle_exit_DELAY_MAP.json') };
  const layout = await J(new URL('../../../dog4-v3-lab/layout.json', import.meta.url).href);
  return { D, data, layout };
}
