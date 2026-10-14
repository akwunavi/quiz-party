// P3 visual layer (isolated lab prototype). Pure function of (contract, physical segments, t).
// It READS the physical segments produced by dog4-v3-lab/model.mjs and never writes anything back.
//   visualAt(contract, segments, t) -> { clip, frame, role, window, eventIndex, status, overflow, localIdx, shiftSrcPx, shiftStatus, category }
// Operations: lead (clip starts before its physical window), tail (clip continues into the next stationary window),
// pad (hold a stand pose inside a stationary window), retime (bounded rate), shift (per-frame sprite offset arrays).
// Nothing is ever silently truncated or substituted: overflow and missing assets are reported in the result.
const FPS_DEFAULT=24, EPS=1e-9;
const STATIONARY=new Set(['BASE','BUTTERFLY','ROLL','SNIFF_PEE','RETURN']);
const MOVING_STOP=new Set(['STOP','FINISH_DECELERATE']);
export const ACTION_KINDS=['BUTTERFLY','ROLL','SNIFF_PEE','RETURN'];
const CATEGORY_BY_BASE=[[.75,'VERY_SLOW'],[.88,'SLOW'],[1,'NORMAL'],[1.12,'FAST'],[1.25,'VERY_FAST']];
export const categoryOf=base=>{for(const [b,n] of CATEGORY_BY_BASE)if(Math.abs(b-base)<1e-9)return n;return null;};

function variableFrame(seconds,bands,count){            // same arithmetic as dog4-v3-lab/model.mjs (verified by T2)
  let t=Math.max(0,seconds),index=0;
  for(const [number,fps] of bands){
    const duration=number/fps;
    if(t<duration-EPS)return Math.min(count-1,index+Math.floor(t*fps+EPS));
    t-=duration;index+=number;
  }
  return count-1;
}
// A sampler turns LOCAL seconds into a frame (number for Dog4 clips, string label for table clips).
export function sample(spec,localSec,rate=1){
  const t=Math.max(0,localSec)*rate, fps=spec.fps??FPS_DEFAULT;
  switch(spec.sampler){
    case 'constant':return spec.frame;
    case 'linear':return Math.min(spec.count-1,Math.floor(t*fps+(spec.eps===false?0:EPS)));
    case 'bands':return variableFrame(t,spec.bands,spec.count);
    case 'prologueLoop':return t<spec.prologue/fps?Math.min(spec.prologue-1,Math.floor(t*fps)):spec.prologue+Math.floor((t-spec.prologue/fps)*fps+EPS)%spec.loop;
    case 'table':{
      const idx=Math.floor(t*fps+EPS),n=spec.labels.length;
      if(idx<n)return spec.labels[idx];
      if(spec.loop)return spec.loop[(idx-n)%spec.loop.length];
      return spec.labels[n-1];
    }
    default:throw new Error('unknown sampler '+spec.sampler);
  }
}
export function naturalFrames(spec){
  switch(spec.sampler){
    case 'constant':return 1;
    case 'linear':return spec.count;
    case 'bands':return spec.count;
    case 'table':return spec.labels.length;
    case 'prologueLoop':return Infinity;
    default:throw new Error('unknown sampler '+spec.sampler);
  }
}
export function naturalSeconds(spec){
  const fps=spec.fps??FPS_DEFAULT;
  switch(spec.sampler){
    case 'bands':return spec.bands.reduce((a,[n,f])=>a+n/f,0);
    case 'prologueLoop':return Infinity;
    case 'constant':return 0;
    default:return naturalFrames(spec)/fps;
  }
}
const clipOf=(contract,ref)=>{const c=contract.clips[ref];if(!c)throw new Error(`contract ${contract.character}: unknown clip '${ref}'`);return c;};
const statusOf=(contract,clipName)=>contract.assetStatus?.[clipName]??'unspecified';

// ---- timeline -------------------------------------------------------------------------------------------------------------
function windowsOf(contract,segments){
  const W=[];
  for(const s of segments){
    const prev=W.at(-1);
    if(s.kind==='RETURN'&&contract.windows.RETURN?.mergeInto==='SNIFF_PEE'&&prev&&prev.kind==='SNIFF_PEE'&&prev.eventIndex===s.eventIndex){prev.T1=s.t1;prev.merged=true;continue;}
    W.push({kind:s.kind,T0:s.t0,T1:s.t1,eventIndex:s.eventIndex,base:s.base,seg:s});
  }
  return W;
}
export function buildTimeline(contract,segments){
  const fps=contract.fps??FPS_DEFAULT;
  const W=windowsOf(contract,segments);
  const V0=W.map(w=>w.kind==='START'?w.T0-(contract.windows.START.lead||0)/fps:w.T0);
  const items=[];let tail=null,lastStartIdx=-1,startCategory=null,startBase=null;
  const push=it=>{items.push(it);return it;};
  for(let i=0;i<W.length;i++){
    const w=W[i],cfg=contract.windows[w.kind];
    if(!cfg)throw new Error(`contract ${contract.character}: no window config for ${w.kind}`);
    const v0=V0[i],v1=i+1<W.length?V0[i+1]:w.T1;
    if(v1<v0-EPS)throw new Error(`window ${w.kind} (${w.T0.toFixed(3)} s) is shorter than the lead of the next clip`);
    const base={window:w.kind,eventIndex:w.eventIndex};
    if(w.kind==='START'){
      startBase=w.base;startCategory=categoryOf(w.base);
      const it=push({...base,t0:v0,t1:v1,origin:v0,rate:cfg.rate??1,spec:clipOf(contract,cfg.clip),clip:cfg.clip,role:'body',startItem:true,category:startCategory,startBase:w.base});
      lastStartIdx=items.length-1;continue;
    }
    if(w.kind==='RUN'){
      if(cfg.spillFromStart&&lastStartIdx>=0){items[lastStartIdx].t1=v1;continue;}       // START clip continues (loop) through RUN
      push({...base,t0:v0,t1:v1,origin:v0,rate:cfg.rate??1,spec:clipOf(contract,cfg.clip),clip:cfg.clip,role:'body'});continue;
    }
    if(MOVING_STOP.has(w.kind)){
      const spec=clipOf(contract,cfg.clip);
      push({...base,t0:v0,t1:v1,origin:v0,rate:cfg.rate??1,spec,clip:cfg.clip,role:'move',provisional:!!cfg.provisional});
      tail=cfg.tail?{spec:clipOf(contract,cfg.tail.clip),clip:cfg.tail.clip,rate:cfg.tail.rate??1,rateByNext:cfg.tailRateByNext??null,frames:naturalFrames(clipOf(contract,cfg.tail.clip)),from:w.kind}:null;
      continue;
    }
    // stationary windows: BASE and actions
    let cursor=v0;
    if(tail){
      const trate=tail.rateByNext?.[w.kind]??tail.rate;       // retime of the tail may depend on which action follows (tested variant only)
      const dur=tail.frames/(fps*trate),end=cursor+dur;
      const over=end>v1+EPS;
      push({...base,t0:cursor,t1:Math.min(end,v1),origin:cursor,rate:trate,spec:tail.spec,clip:tail.clip,role:'tail',overflow:over,tailOf:tail.from});
      cursor=Math.min(end,v1);tail=null;
    }
    if(cursor>=v1-EPS)continue;
    if(w.kind==='BASE'){
      const hold=clipOf(contract,cfg.hold);
      push({...base,t0:cursor,t1:v1,origin:cursor,rate:1,spec:hold,clip:cfg.hold,role:'hold'});continue;
    }
    // action window (BUTTERFLY / ROLL / SNIFF_PEE / RETURN)
    if(cfg.status==='missing'||!cfg.body){
      push({...base,t0:cursor,t1:v1,origin:cursor,rate:1,spec:null,clip:w.kind,role:'missing',status:'MISSING_ASSET'});continue;
    }
    const spec=clipOf(contract,cfg.body),rate=cfg.rate??1,frames=naturalFrames(spec),fpsC=spec.fps??fps;
    if(cfg.pad){
      const dur=frames/(fpsC*rate),end=cursor+dur;
      const over=end>v1+EPS;
      push({...base,t0:cursor,t1:Math.min(end,v1),origin:cursor,rate,spec,clip:cfg.body,role:'body',overflow:over});
      if(end<v1-EPS)push({...base,t0:end,t1:v1,origin:end,rate:1,spec:clipOf(contract,cfg.pad),clip:cfg.pad,role:'pad'});
    }else{
      push({...base,t0:cursor,t1:v1,origin:cursor,rate,spec,clip:cfg.body,role:'body'});   // legacy behaviour: sampler clamps on its last frame
    }
  }
  return items;
}
const cache=new WeakMap();
function timelineFor(contract,segments){
  let byContract=cache.get(segments);if(!byContract){byContract=new Map();cache.set(segments,byContract);}
  let tl=byContract.get(contract);if(!tl){tl=buildTimeline(contract,segments);byContract.set(contract,tl);}
  return tl;
}
function shiftFor(contract,it,t){
  const sh=contract.shift;
  if(!it.startItem||!sh?.arrays)return {shiftSrcPx:0,shiftStatus:it.role==='move'||it.role==='tail'?(sh?.stopStatus??'none'):'none'};
  if(!it.category)return {shiftSrcPx:null,shiftStatus:'NO_ARRAY_FOR_CATEGORY'};
  const arr=sh.arrays[it.category];
  const idx=Math.floor((t-it.origin)*(contract.fps??FPS_DEFAULT)*it.rate+EPS);
  return {shiftSrcPx:arr[Math.min(Math.max(idx,0),arr.length-1)],shiftStatus:'array'};
}
export function visualAt(contract,segments,time){
  const end=segments.at(-1).t1;
  const t=Math.max(0,Math.min(time,end));                       // same clamp as V3 stateAt
  const items=timelineFor(contract,segments);
  let lo=0,hi=items.length;
  while(lo<hi){const mid=(lo+hi)>>1;if(items[mid].t1<=t+EPS)lo=mid+1;else hi=mid;}
  const it=items[Math.min(lo,items.length-1)];
  const sh=shiftFor(contract,it,t);
  if(it.role==='missing')return {clip:it.clip,frame:null,role:'missing',window:it.window,eventIndex:it.eventIndex,status:'MISSING_ASSET',overflow:false,localIdx:null,...sh,category:it.category??null};
  const local=t-it.origin;
  const frame=sample(it.spec,local,it.rate);
  const clipStatus=statusOf(contract,it.clip);
  return {clip:it.clip,frame,role:it.role,window:it.window,eventIndex:it.eventIndex,
    status:it.overflow?'OVERFLOW_TRUNCATED':(it.provisional?'PROVISIONAL':clipStatus),overflow:!!it.overflow,
    localIdx:Math.floor(Math.max(0,local)*(contract.fps??FPS_DEFAULT)*it.rate+EPS),...sh,category:it.category??null};
}
// Whole-timeline queries used by tests (no sampling needed).
export const timelineOf=(contract,segments)=>timelineFor(contract,segments);
export const isStationaryKind=k=>STATIONARY.has(k);
