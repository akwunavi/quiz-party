// Race V3 с настраиваемой длительностью забега. Физику НЕ переписываем: берём исходники dog4-v3-lab/model.mjs и scenario.mjs как есть
// и подменяем в тексте ровно ОДНУ константу — BASE_SPEED (нормированная дистанция в секунду, ее и описывает комментарий в model.mjs).
// D = «время дистанции собаки с базовым темпом 1.00» в секундах (в оригинале 42). Окна действий, STOP, START, RUN, 24 к/с и места по
// пересечению линии считает сама модель. Всё остальное (планировщик, события, места) — байт в байт оригинал.
//   const V3 = await loadRaceV3(readText, 60); const race = V3.resolveRace(seed);
const enc = s => 'data:text/javascript;base64,' + (typeof Buffer !== 'undefined' ? Buffer.from(s, 'utf8').toString('base64') : btoa(unescape(encodeURIComponent(s))));
const cache = new Map();
export const NOMINAL_D = 42;
export async function loadRaceV3(readText, D = NOMINAL_D) {
  if (!(D >= 10 && D <= 600)) throw new RangeError('D must be 10..600 s');
  if (cache.has(D)) return cache.get(D);
  const modelSrc = await readText('dog4-v3-lab/model.mjs'), scenSrc = await readText('dog4-v3-lab/scenario.mjs');
  if (!/const BASE_SPEED=1\/42;/.test(modelSrc)) throw new Error('model.mjs: BASE_SPEED не найден — модель изменилась, лаборатория не знает, что подменять');
  const model = await import(enc(modelSrc.replace('const BASE_SPEED=1/42;', `const BASE_SPEED=1/${D};`)));
  if (!/from '\.\/model\.mjs'/.test(scenSrc)) throw new Error('scenario.mjs: импорт модели не найден');
  const scen = await import(enc(scenSrc.replace(/from '\.\/model\.mjs'/, `from '${enc(modelSrc.replace('const BASE_SPEED=1/42;', `const BASE_SPEED=1/${D};`))}'`)));
  const api = { D, model, stateAt: model.stateAt, resolveRace: scen.resolveRace, scenario: scen };
  cache.set(D, api); return api;
}
