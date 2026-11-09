// Контроллер сценария раунда: выбор → завершение выбора → переход → отсчёт → гонка Race V3 → финиш → пьедестал.
// Не содержит физики и отрисовки: гонку считает Race V3 (race = V3.resolveRace(seed)), кадры собак даёт visual.at (контракты библиотеки),
// кадры экрана выбора — createSelectionPlayer. Время — в секундах, вызывается update(dtRealSec).
import { createBetting, scoreBets, podium } from './rules.mjs';
import { createSelectionPlayer } from './selection.mjs';
export const DOGS = [['frenk', 'Фрэнк'], ['zefir', 'Зефир'], ['rocky', 'Рокки'], ['pups', 'Пупс'], ['luna', 'Луна']];
export const TIMING = { transition: 3.2, countdown: 3.0, finishHold: 3.0, podiumTransition: 2.6, podiumStep: 1.3, lockGuard: 30 };
export function createGame({ V3, selectionData, teamCount = 6, seed = null, rng = Math.random, raceSpeed = 1, D = 42 }) {
  const G = { V3, phase: 'select', phaseT: 0, betting: createBetting(teamCount), seed, D, raceSpeed, race: null, raceT: 0, results: null, rng,
              reacted: new Set(), log: [], podiumShown: 0, podiumPlayers: null };
  const mkPlayers = () => DOGS.map(([id], i) => createSelectionPlayer(id, selectionData, Math.floor(rng() * 40) + i * 7));
  G.players = mkPlayers(); G.frames = G.players.map(p => p.tick()); G.acc = 0;
  const setPhase = p => { G.log.push({ phase: p, t: G.phaseT }); G.phase = p; G.phaseT = 0; };
  G.choose = (team, dog) => {
    const r = G.betting.choose(team, dog);
    if (r.changed && dog && !G.reacted.has(dog - 1) && G.players[dog - 1].pick()) G.reacted.add(dog - 1);    // собака реагирует на ПЕРВЫЙ выбор
    return r;
  };
  /** «Завершить выбор»: ставки закрываются, выбранные собаки без реакции получают SELECTED, затем сцена переходит к старту */
  G.finishSelection = () => {
    if (G.phase !== 'select') return false;
    G.betting.lock();
    G.betting.counts().forEach((c, i) => { if (c > 0 && !G.reacted.has(i) && G.players[i].pick()) G.reacted.add(i); });
    setPhase('locking'); return true;
  };
  G.startRace = () => {                                           // сид рождается ЗДЕСЬ (если не задан для воспроизведения)
    if (G.seed == null || G.seed === '') G.seed = Math.floor(rng() * 0xffffffff);
    G.race = G.V3.resolveRace(Number(G.seed)); G.raceT = 0; setPhase('race'); G.log.push({ ev: 'seed', seed: G.seed, effective: G.race.effectiveSeed });
  };
  G.skip = () => {                                                // кнопка «Пропустить» (только для лаборатории)
    if (G.phase === 'locking') { G.phaseT = TIMING.lockGuard; }
    else if (G.phase === 'transition') { G.phaseT = TIMING.transition; }
    else if (G.phase === 'countdown') { G.phaseT = TIMING.countdown; }
    else if (G.phase === 'finish') { G.phaseT = TIMING.finishHold; }
  };
  G.update = dt => {
    G.phaseT += dt;
    G.acc += dt; while (G.acc >= 1 / 24) { G.acc -= 1 / 24; G.frames = G.players.map(p => p.tick()); if (G.podiumPlayers) G.podiumFrames = G.podiumPlayers.map(p => p.tick()); }
    if (G.phase === 'locking') { if (!G.players.some((p, i) => G.betting.counts()[i] > 0 && p.busy()) || G.phaseT > TIMING.lockGuard) setPhase('transition'); }
    else if (G.phase === 'transition' && G.phaseT >= TIMING.transition) setPhase('countdown');
    else if (G.phase === 'countdown' && G.phaseT >= TIMING.countdown) G.startRace();
    else if (G.phase === 'race') {
      G.raceT = Math.min(G.race.end, G.raceT + dt * G.raceSpeed);
      if (G.raceT >= G.race.end) { G.results = { places: G.race.places, crossing: G.race.dogs.map(d => d.crossing), scores: scoreBets(G.betting.snapshot(), G.race.places) }; setPhase('finish'); }
    }
    else if (G.phase === 'finish' && G.phaseT >= TIMING.finishHold) { G.podiumPlayers = mkPlayers(); G.podiumFrames = G.podiumPlayers.map(p => p.tick()); G.podiumShown = 0; setPhase('podiumTransition'); }
    else if (G.phase === 'podiumTransition' && G.phaseT >= TIMING.podiumTransition) setPhase('podium');
    else if (G.phase === 'podium') {
      const shown = Math.min(3, Math.floor(G.phaseT / TIMING.podiumStep));
      if (shown > G.podiumShown) { G.podiumShown = shown; if (shown === 3) G.podiumPlayers[G.results.places[0]].pick(); }  // победитель реагирует (SELECTED), когда открыт
    }
    return G.phase;
  };
  G.podium = () => G.results && podium(G.results.places);
  G.restart = (keepTeams = true) => { const n = G.betting.teams.size; G.betting = createBetting(n); G.phase = 'select'; G.phaseT = 0; G.race = null; G.raceT = 0; G.results = null; G.reacted = new Set(); G.players = mkPlayers(); G.podiumPlayers = null; G.log.push({ ev: 'restart' }); void keepTeams; };
  return G;
}
