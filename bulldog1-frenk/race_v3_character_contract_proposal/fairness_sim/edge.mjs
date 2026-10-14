import {resolveRace} from './scenario.mjs';
const N=10000;let dogs=0,early=0,evs=0;
let minRunBeforeStop=1e9,minGapActionToNextStop=1e9,crossInStart=0,crossInRun=0,crossInStop=0,minStopEndToFinish=1e9,minActionStartP=1,maxActionP=0;
let lastStartToCross=1e9, sameRunFirstStopFrames=new Set();
const pAt={};
for(let s=1;s<=N;s++){const r=resolveRace(s*7919+13);
 for(const d of r.dogs){dogs++;const segs=d.segments;
  for(let i=0;i<segs.length;i++){const g=segs[i];
   if(g.kind==='STOP'&&g.eventIndex>=0){evs++;const prev=segs[i-1];if(prev&&prev.kind==='RUN'){minRunBeforeStop=Math.min(minRunBeforeStop,prev.t1-prev.t0);}
     minStopEndToFinish=Math.min(minStopEndToFinish,1-g.p1);}
   if(['BUTTERFLY','ROLL','SNIFF_PEE'].includes(g.kind)){minActionStartP=Math.min(minActionStartP,g.p0);maxActionP=Math.max(maxActionP,g.p0);}
  }
  for(const e of d.eventsActual)if(e.early)early++;
  const cs=segs.find(g=>g.p0<1-1e-9&&g.p1>=1-1e-9);if(cs){if(cs.kind==='START')crossInStart++;else if(cs.kind==='RUN')crossInRun++;else crossInStop++;}
  // RUN length between START end and next STOP
  for(let i=1;i<segs.length;i++)if(segs[i-1].kind==='START'&&segs[i].kind==='RUN'&&segs[i+1]?.kind==='STOP'){sameRunFirstStopFrames.add(Math.round((segs[i].t1-segs[i].t0)*24));}
 }}
console.log({dogs,events:evs,earlyFirstEvents:early,earlyShare:(early/dogs).toFixed(4),minRunBeforeStop_s:minRunBeforeStop.toFixed(4),minRunBeforeStop_frames:(minRunBeforeStop*24).toFixed(2),crossInStart,crossInRun,crossInStop,minStopEndToFinishCourse:minStopEndToFinish.toFixed(4),minActionP:minActionStartP.toFixed(4),maxActionP:maxActionP.toFixed(4)});
console.log('distinct RUN-before-first-STOP lengths (frames) after a START, first 12:',[...sameRunFirstStopFrames].sort((a,b)=>a-b).slice(0,12));
