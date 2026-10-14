// STOP visual test, step 1: physics + P3 visual layer -> per-tick timelines for variants A/B/C (Frenk) and the Dog4 reference lane.
// Runs inside the patched COPY of V3 made by prepare.sh (only STOP and BUTTERFLY durations of lane 0 are overridden); the P3 lab is imported read-only.
// REPO=/path/to/repo node export_timelines.mjs  ->  timelines.json
import {writeFileSync} from 'node:fs';
import {resolveRace} from './scenario.mjs';
import {buildDog,stateAt,PRESETS} from './model.mjs';
const REPO=process.env.REPO,SEED=+(process.env.SEED||1069078);
const {visualAt}=await import(`${REPO}/race-v3-p3-lab/src/visual.mjs`);
const {frenkContract}=await import(`${REPO}/race-v3-p3-lab/src/loader.mjs`);
const layout=JSON.parse((await import('node:fs')).readFileSync(`${REPO}/dog4-v3-lab/layout.json`,'utf8'));
const COURSE=layout.finishX-layout.startX+layout.finishControlOffset,px=p=>layout.startX+p*COURSE;
const race=resolveRace(SEED);const plan=PRESETS.RANDOM.dogs[0];
PRESETS.DEMO={name:'demo',dogs:[{...plan}]};
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
function contractFor(N){            // STOP clip frames 1..N inside the physical STOP window, N+1..73 as tail (none if N=73)
  const c=frenkContract();
  c.clips.STOP={sampler:'table',fps:24,labels:R(1,N).map(i=>`stop${i}`)};
  if(N<73){c.clips.STOP_TAIL={sampler:'table',fps:24,labels:R(N+1,73).map(i=>`stop${i}`)};c.windows.STOP.tail={clip:'STOP_TAIL'};c.windows.FINISH_DECELERATE.tail={clip:'STOP_TAIL'};}
  else{delete c.clips.STOP_TAIL;delete c.windows.STOP.tail;delete c.windows.FINISH_DECELERATE.tail;}
  return c;
}
const V={
  REF:{name:'Bulldog 4 (reference, canonical windows)',cfg:{},contract:null},
  A:{name:'A: STOP 37/24, rest of the clip in the stationary tail',cfg:{STOP:37/24,BUTTERFLY:132/24},contract:contractFor(37)},
  B:{name:'B: STOP 63/24, 10-frame stationary tail',cfg:{STOP:63/24,BUTTERFLY:106/24},contract:contractFor(63)},
  C:{name:'C: STOP 73/24, whole clip inside the physical STOP',cfg:{STOP:73/24,BUTTERFLY:96/24},contract:contractFor(73)}
};
const out={seed:SEED,effectiveSeed:race.effectiveSeed,lane0:{name:plan.name,base:plan.base,variations:plan.variations,events:plan.events},layout,variants:{}};
for(const [key,v] of Object.entries(V)){
  globalThis.__CFG={0:v.cfg};
  const dog=buildDog('DEMO',0);
  const stop=dog.segments.find(s=>s.kind==='STOP'&&s.eventIndex===0),act=dog.segments.find(s=>s.kind==='BUTTERFLY'),st2=dog.segments.find(s=>s.kind==='START'&&s.eventIndex===0);
  const t0=stop.t0-1.5,t1=st2.t1+2.6,ticks=[];
  for(let k=0;;k++){
    const t=t0+k/24;if(t>t1)break;
    const s=stateAt(dog,t+1e-7),row={k,tRel:+(t-stop.t0).toFixed(5),p:s.progress,x:px(s.progress),speed:s.speed*COURSE};
    if(v.contract){const vv=visualAt(v.contract,dog.segments,t+1e-7);Object.assign(row,{label:vv.frame,role:vv.role,window:vv.window,status:vv.status,overflow:vv.overflow,shiftSrc:vv.shiftSrcPx,idx:vv.localIdx});}
    else Object.assign(row,{clip:s.clip,frame:s.frame,window:s.segment});
    ticks.push(row);
  }
  if(v.contract&&ticks.some(r=>r.overflow||r.status==='MISSING_ASSET'))throw new Error('overflow/missing in '+key);
  out.variants[key]={name:v.name,cfg:v.cfg,physical:{stopStart:stop.t0,stopEnd:stop.t1,stopSeconds:stop.t1-stop.t0,actionSeconds:act.t1-act.t0,startEnd:st2.t1,crossing:dog.crossing,
    stopStartX:px(stop.p0),stopEndX:px(stop.p1),engineTravelInStopPx:px(stop.p1)-px(stop.p0),eventP:act.p0},ticks};
  console.log(key,'stop',(stop.t1-stop.t0).toFixed(3),'s travel',(px(stop.p1)-px(stop.p0)).toFixed(1),'px crossing',dog.crossing.toFixed(3),'ticks',ticks.length);
}
writeFileSync(new URL('./timelines.json',import.meta.url),JSON.stringify(out));
