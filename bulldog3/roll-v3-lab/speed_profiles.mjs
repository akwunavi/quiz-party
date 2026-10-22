// Diagnostic V3 dogs; use the unmodified buildDog model at five speeds.
import {PRESETS,buildDog} from '../race-start-v3-lab/model.mjs';

export const profiles=[['VERY SLOW',.75],['SLOW',.90],['NORMAL',1],['FAST',1.10],['VERY FAST',1.25]];
const key='ROCKY_ROLL_FIVE_SPEED_DIAGNOSTIC';
PRESETS[key]={dogs:profiles.map(([name,base])=>({name,base,variations:[1,1,1,1],events:[['ROLL',.35]]}))};
export const speedDogs=profiles.map((_,i)=>buildDog(key,i));
delete PRESETS[key];
