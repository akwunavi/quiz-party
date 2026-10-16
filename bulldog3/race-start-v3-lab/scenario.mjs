import {FPS} from './model.mjs';

export const profiles = [
  {name:'VERY SLOW',base:.75}, {name:'SLOW',base:.90},
  {name:'NORMAL',base:1.00}, {name:'FAST',base:1.10},
  {name:'VERY FAST',base:1.25},
];
export const end = 3.5;
export function dogFor(index,profile){
  const p0=0, speed=profile.base/42;
  const start0=.5, start1=1.5;
  const p1=speed/2, p2=p1+speed*(end-start1);
  return {index,name:profile.name,base:profile.base,variations:[1,1,1,1],
    segments:[
      {kind:'BASE',t0:0,t1:start0,p0,p1:p0,base:profile.base},
      {kind:'START',t0:start0,t1:start1,p0,p1,base:profile.base},
      {kind:'RUN',t0:start1,t1:end,p0:p1,p1:p2,base:profile.base},
    ],end,crossing:Infinity,complete:Infinity};
}
export const dogs=profiles.map((profile,i)=>dogFor(i,profile));
export const compareDogs=[dogFor(0,profiles[2]),dogFor(1,profiles[2])];
export const frames=Math.round(end*FPS);
