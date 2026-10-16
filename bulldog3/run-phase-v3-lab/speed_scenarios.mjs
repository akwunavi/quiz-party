// Diagnostic profiles at the five Race V3 speed categories. Timing windows
// and progress integrals match model.mjs for constant variations [1,1,1,1].
// Actual preset A/B/C alignment is verified separately against RACES.
import {FPS} from '../race-start-v3-lab/model.mjs';
export const profiles=[['VERY SLOW',.75],['SLOW',.90],['NORMAL',1],['FAST',1.10],['VERY FAST',1.25]];
export function makeDog([name,base],index){
  const dog={index,name,base,variations:[1,1,1,1],segments:[],crossing:Infinity,complete:Infinity};
  let t=0,p=0;
  const v=base/42;
  const add=(kind,cells,dp)=>{const duration=cells/FPS;dog.segments.push({kind,t0:t,t1:t+duration,p0:p,p1:p+dp,base});t+=duration;p+=dp;};
  add('BASE',12,0);
  add('START',24,v/2);
  add('RUN',155,v*155/FPS);
  add('STOP',37,v*37/FPS/2);
  add('BUTTERFLY',121,0); // rendered as standing pose in this isolated seam lab
  add('START',24,v/2);
  add('RUN',155,v*155/FPS);
  add('FINISH_DECELERATE',37,v*37/FPS/2);
  add('BASE',48,0);
  dog.end=t;dog.complete=dog.segments.at(-1).t0;
  return dog;
}
export const speedDogs=profiles.map(makeDog);
