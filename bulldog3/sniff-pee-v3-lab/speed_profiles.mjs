// Five diagnostic V3 speed categories with the same SNIFF_PEE event at 40%.
// buildDog is the unmodified V3 implementation; this temporary preset is
// removed immediately after construction.
import {PRESETS,buildDog} from '../race-start-v3-lab/model.mjs';

export const profiles=[['VERY SLOW',.75],['SLOW',.90],['NORMAL',1],['FAST',1.10],['VERY FAST',1.25]];
const key='ROCKY_SNIFF_FIVE_SPEED_DIAGNOSTIC';
PRESETS[key]={dogs:profiles.map(([name,base])=>({name,base,variations:[1,1,1,1],events:[['SNIFF_PEE',.40]]}))};
export const speedDogs=profiles.map((_,i)=>buildDog(key,i));
delete PRESETS[key];
