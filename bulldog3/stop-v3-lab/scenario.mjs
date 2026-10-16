import {FPS} from './model.mjs';

export const RUN_FRAMES=31,STOP_FRAMES=37,STAND_FRAMES=24;
export const runDuration=RUN_FRAMES/FPS,stopDuration=STOP_FRAMES/FPS;
export const end=(RUN_FRAMES+STOP_FRAMES+STAND_FRAMES)/FPS;
export const profiles=[
  {name:'VERY SLOW',base:.75},
  {name:'SLOW',base:.90},
  {name:'NORMAL',base:1.00},
  {name:'FAST',base:1.10},
  {name:'VERY FAST',base:1.25},
];
export function dogFor(index,profile){
  const speed=profile.base/42,p0=.25,p1=p0+speed*runDuration,p2=p1+speed*stopDuration/2;
  const segments=[
    {kind:'RUN',t0:0,t1:runDuration,p0,p1,base:profile.base},
    {kind:'STOP',t0:runDuration,t1:runDuration+stopDuration,p0:p1,p1:p2,base:profile.base},
    {kind:'BASE',t0:runDuration+stopDuration,t1:end,p0:p2,p1:p2,base:profile.base},
  ];
  return {index,name:profile.name,base:profile.base,variations:[1,1,1,1],segments,end,crossing:Infinity,complete:Infinity};
}
export const dogs=profiles.map((p,i)=>dogFor(i,p));
