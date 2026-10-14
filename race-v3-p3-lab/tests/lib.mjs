import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolveRace} from '../../dog4-v3-lab/scenario.mjs';
import {buildDog,stateAt,PRESETS} from '../../dog4-v3-lab/model.mjs';
import {visualAt} from '../src/visual.mjs';
export {resolveRace,buildDog,stateAt,PRESETS,visualAt};
export const REPO=new URL('../../',import.meta.url);
export const layout=JSON.parse(readFileSync(new URL('dog4-v3-lab/layout.json',REPO)));
export const SC=layout.spriteWidth/1276,COURSE=layout.finishX-layout.startX+layout.finishControlOffset;
export const seedsOf=n=>Array.from({length:n},(_,i)=>(i+1)*7919+13);
let cache=[];
export function races(n){
  if(cache.length<n){for(const s of seedsOf(n).slice(cache.length))cache.push(resolveRace(s));}
  return cache.slice(0,n);
}
export function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
export function deepFreeze(o){if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.freeze(o);for(const v of Object.values(o))deepFreeze(v);}return o;}
export function signature(race){
  const h=createHash('sha1');
  h.update(JSON.stringify({requestedSeed:race.requestedSeed,effectiveSeed:race.effectiveSeed,places:race.places}));
  for(const d of race.dogs){h.update(JSON.stringify({c:d.crossing,e:d.eventsActual}));for(const s of d.segments)h.update(`${s.kind}|${s.t0}|${s.t1}|${s.p0}|${s.p1}|${s.eventIndex}|${s.base??''};`);}
  return h.digest('hex');
}
export const clone=o=>JSON.parse(JSON.stringify(o));
export function cloneContract(c){const k=clone({...c,shift:undefined});k.shift=c.shift;return k;}           // arrays shared, not copied
export function retimeVariant(c,rate=129/118){
  const k=cloneContract(c);k.windows.STOP.tailRateByNext={BUTTERFLY:rate};k.windows.BUTTERFLY.rate=rate;k.character+='+butterflyRetime';return k;
}
export const framesMeta=c=>JSON.parse(readFileSync(new URL(c.geometry.framesMeta,new URL('../characters/',import.meta.url))));
// Test dog: one dog per speed category, all quarter variations = 1 (the geometry used by the kit's shift arrays)
export function categoryDogs(){
  PRESETS.LABP5={name:'LAB categories',dogs:[.75,.88,1,1.12,1.25].map(b=>({name:'c'+b,base:b,variations:[1,1,1,1],events:[]}))};
  return [.75,.88,1,1.12,1.25].map((_,i)=>buildDog('LABP5',i));
}
export function startWorldSeries(contract,dog,meta,count=46){
  const seg=dog.segments.find(s=>s.kind==='START'),lead=contract.windows.START.lead||0,V0=seg.t0-lead/24,out=[];
  for(let k=0;k<count;k++){
    const t=V0+k/24+1e-7,p=stateAt(dog,t).progress,v=visualAt(contract,dog.segments,t),anchor=layout.startX+p*COURSE;
    const cx=meta[v.frame]?.cx;if(cx==null)throw new Error('no geometry for '+v.frame);
    out.push({k,t,label:v.frame,localIdx:v.localIdx,anchor,shift:v.shiftSrcPx,x:anchor-layout.spriteAnchorX+(cx+v.shiftSrcPx)*SC,comp:anchor+v.shiftSrcPx*SC});
  }
  return out;
}
export const smoothBox=(xs,h)=>xs.map((_,i)=>{let a=0;for(let k=-h;k<=h;k++)a+=xs[Math.min(xs.length-1,Math.max(0,i+k))];return a/(2*h+1);});
export const fmt=(x,d=3)=>+x.toFixed(d);
