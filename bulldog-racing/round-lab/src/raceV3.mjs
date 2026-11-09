// Race V3 с длительностью забега как обычным параметром (без подмены текста исходников).
// D = courseSeconds — «время дистанции собаки с базовым темпом 1.00» в секундах (в оригинале 42 = 1/BASE_SPEED). Передаётся в модель опцией
// buildDog(..., {courseSeconds}) / resolveRace(seed, {courseSeconds}); без опции поведение модели прежнее. Всё остальное (планировщик, события,
// окна действий, места по пересечению линии) считает сама модель.
//   const V3 = await loadRaceV3(60); const race = V3.resolveRace(seed);
export const NOMINAL_D = 42;
const BASE = new URL('../../../dog4-v3-lab/', import.meta.url).href;
let mods = null;
export async function loadRaceV3(D = NOMINAL_D) {
  if (!(D >= 10 && D <= 600)) throw new RangeError('D must be 10..600 s');
  mods ??= { model: await import(BASE + 'model.mjs'), scenario: await import(BASE + 'scenario.mjs') };
  return { D, model: mods.model, scenario: mods.scenario, stateAt: mods.model.stateAt, resolveRace: (seed, opts = {}) => mods.scenario.resolveRace(seed, { ...opts, courseSeconds: D }) };
}
