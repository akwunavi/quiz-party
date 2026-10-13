// Seeded pre-race planner for the isolated V3 only. All choices precede playback.
import {PRESETS,buildDog} from './model.mjs';
export const CATEGORIES=[['VERY_FAST',1.25,.05],['FAST',1.12,.20],['NORMAL',1,.50],['SLOW',.88,.20],['VERY_SLOW',.75,.05]];
export const MIN_SPACING=.25, SEPARATION=.08, MAX_ATTEMPTS=4096;
export const MAX_SEED_CANDIDATES=64;
export class RaceScheduleError extends Error{
  constructor(details){super(`No admissible race in ${details.candidatesChecked} seed candidates from ${details.requestedSeed}`);this.name='RaceScheduleError';this.code='NO_ADMISSIBLE_SCENARIO';this.details=details;}
}
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function pickCategory(random){let n=random();for(const [name,base,weight] of CATEGORIES){n-=weight;if(n<0)return {name,base};}return {name:'VERY_SLOW',base:.75};}
function pickKind(random,hasSniff){const n=random();if(hasSniff)return n<.40/.75?'BUTTERFLY':'ROLL';return n<.40?'BUTTERFLY':n<.75?'ROLL':'SNIFF_PEE';}
function positions(random,count){
  // Sorted order statistics conditioned on the required distance between events.
  const slack=.96-(count-1)*MIN_SPACING;
  return Array.from({length:count},random).sort((a,b)=>a-b).map((u,i)=>u*slack+i*MIN_SPACING);
}
function stationary(dog){return dog.segments.filter(s=>['BUTTERFLY','ROLL','SNIFF_PEE','RETURN'].includes(s.kind));}
export function planSeed(seed){
  if(!Number.isSafeInteger(seed)||seed<0||seed>0xffffffff)throw new RangeError('seed must be a uint32');
  const random=rng(seed),plans=[];
  for(let i=0;i<5;i++){
    const u=random(),count=u<.70?1:u<.90?2:3,initial=pickCategory(random),kinds=[];
    for(let j=0;j<count;j++)kinds.push(pickKind(random,kinds.includes('SNIFF_PEE')));
    const after=Array.from({length:count},()=>pickCategory(random));
    plans.push({name:`DOG ${i+1} · ${initial.name} · ${count} событ.`,base:initial.base,initialCategory:initial.name,
      afterBases:after.map(x=>x.base),afterCategories:after.map(x=>x.name),variations:Array.from({length:4},()=>.98+.04*random()),kinds});
  }
  return plans;
}
export function generateRace(seed){
  const plans=planSeed(seed),rejections={fit:0,vertical:0,allStopped:0},previous=PRESETS.RANDOM;
  for(let attempt=0;attempt<MAX_ATTEMPTS;attempt++){
    const random=rng((seed^Math.imul(attempt+1,0x9e3779b9)^0x51c0ffee)>>>0);
    // Draw complete coordinate sets before building any lane.
    const positionsByDog=plans.map(plan=>positions(random,plan.kinds.length));
    PRESETS.RANDOM={name:`SEED ${seed}`,dogs:plans.map((plan,i)=>({...plan,events:plan.kinds.map((kind,j)=>[kind,positionsByDog[i][j]])}))};
    let dogs;
    try{dogs=[0,1,2,3,4].map(i=>buildDog('RANDOM',i));}catch{rejections.fit++;continue;}
    const spans=dogs.map(stationary);
    let vertical=false;
    for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)for(const a of spans[i])for(const b of spans[j]){
      if(Math.max(a.t0,b.t0)<Math.min(a.t1,b.t1)-1e-9&&Math.abs(a.p0-b.p0)<SEPARATION){vertical=true;break;}
    }
    const edges=spans.flat().flatMap(s=>[s.t0,s.t1]).sort((a,b)=>a-b);
    const allStopped=edges.some((t,i)=>i&&spans.every(ss=>ss.some(s=>s.t0<(t+edges[i-1])/2&&(t+edges[i-1])/2<s.t1)));
    if(vertical)rejections.vertical++;
    if(allStopped)rejections.allStopped++;
    if(vertical||allStopped)continue;
    const places=[...dogs].sort((a,b)=>a.crossing-b.crossing||a.index-b.index).map(d=>d.index);
    return {seed,attempt,rejections,dogs,places,end:Math.max(...dogs.map(d=>d.end)),plans:PRESETS.RANDOM.dogs};
  }
  if(previous)PRESETS.RANDOM=previous;else delete PRESETS.RANDOM;
  const error=new Error(`Unable to schedule seed ${seed} in ${MAX_ATTEMPTS} position attempts: ${JSON.stringify(rejections)}`);
  error.code='POSITION_EXHAUSTED';error.seed=seed;error.rejections=rejections;throw error;
}
export function resolveRace(requestedSeed,{maxCandidates=MAX_SEED_CANDIDATES}={}){
  // Validate before arithmetic, so neither Number coercion nor uint32 wrap changes a request.
  if(!Number.isSafeInteger(requestedSeed)||requestedSeed<0||requestedSeed>0xffffffff)throw new RangeError('requestedSeed must be a uint32');
  if(!Number.isSafeInteger(maxCandidates)||maxCandidates<1)throw new RangeError('maxCandidates must be a positive integer');
  const rejected=[];
  for(let offset=0;offset<maxCandidates&&requestedSeed+offset<=0xffffffff;offset++){
    const effectiveSeed=requestedSeed+offset;
    try{
      const race=generateRace(effectiveSeed);
      return {...race,requestedSeed,effectiveSeed,candidatesChecked:offset+1,rejectedCandidates:rejected};
    }catch(error){
      if(error.code!=='POSITION_EXHAUSTED')throw error;
      rejected.push({seed:effectiveSeed,code:error.code,reason:error.message,rejections:error.rejections});
    }
  }
  throw new RaceScheduleError({requestedSeed,candidatesChecked:rejected.length,rejectedCandidates:rejected,
    searchLimit:maxCandidates,lastCheckedSeed:rejected.at(-1)?.seed??null});
}
