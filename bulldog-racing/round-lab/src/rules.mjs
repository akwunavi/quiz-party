// Правила выбора и ставок раунда (чистая логика, без DOM) — повторяют действующую механику Quiz Party (RaceRound.tsx / PlayerPage.RacePlayer / raceActions.ts):
//  * команда ставит на собаку №1..5 ответом `q-race-<раунд>`; ставку можно менять, пока ставки открыты; несколько команд могут выбрать одну собаку;
//  * сид гонки рождается в момент «Старт» (до этого исхода нет нигде) — выбор исход не меняет;
//  * после финиша очки команды = 5 − (место выбранной собаки), 1 место = 5 … 5 место = 1; команда без ставки — 0.
export const DOG_COUNT = 5;
export function createBetting(teamCount = 6) {
  let state = 'open', teams = new Map();                       // teamId -> 1..5 | null
  const ids = n => Array.from({ length: n }, (_, i) => i + 1);
  const setTeams = n => { if (state !== 'open') throw new Error('ставки закрыты'); const old = teams; teams = new Map(ids(n).map(i => [i, old.get(i) ?? null])); };
  setTeams(teamCount);
  return {
    get state() { return state; },
    get teams() { return new Map(teams); },
    setTeams,
    /** команда выбирает собаку (1..5) или снимает выбор (null); возвращает {changed, from, to} */
    choose(team, dog) {
      if (state !== 'open') throw new Error('ставки закрыты — выбор заблокирован');
      if (!teams.has(team)) throw new RangeError('нет команды ' + team);
      if (dog != null && !(Number.isInteger(dog) && dog >= 1 && dog <= DOG_COUNT)) throw new RangeError('собака 1..5');
      const from = teams.get(team); teams.set(team, dog ?? null); return { changed: from !== (dog ?? null), from, to: dog ?? null };
    },
    counts() { const c = Array(DOG_COUNT).fill(0); for (const d of teams.values()) if (d) c[d - 1]++; return c; },
    lock() { state = 'locked'; },
    reset() { state = 'open'; for (const k of teams.keys()) teams.set(k, null); },
    snapshot() { return [...teams.entries()]; },
  };
}
/** Тестовые раскладки команд по собакам: random | all-one | even | skewed | none */
export function distribute(teamCount, mode, rng = Math.random) {
  const out = []; 
  for (let t = 1; t <= teamCount; t++) {
    let d;
    if (mode === 'all-one') d = 3;
    else if (mode === 'even') d = ((t - 1) % DOG_COUNT) + 1;
    else if (mode === 'skewed') d = rng() < .6 ? 1 : 1 + Math.floor(rng() * DOG_COUNT);
    else if (mode === 'none') d = null;
    else d = 1 + Math.floor(rng() * DOG_COUNT);
    out.push([t, d]);
  }
  return out;
}
/** places — индексы собак (0..4) по порядку финиша (из Race V3); возвращает очки по командам */
export function scoreBets(choices, places) {
  const posOf = new Map(places.map((dog, pos) => [dog, pos]));
  return choices.map(([team, dog]) => ({ team, dog, place: dog ? posOf.get(dog - 1) + 1 : null, points: dog ? 5 - posOf.get(dog - 1) : 0 }));
}
export function podium(places) { return { first: places[0], second: places[1], third: places[2], rest: places.slice(3) }; }
