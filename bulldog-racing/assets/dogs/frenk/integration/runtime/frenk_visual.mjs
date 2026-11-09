// Frenk (Bulldog No.1) visual layer for Race V3 — reference runtime of the integration package (contract frenk-integration-1.0.0).
// Physics is NOT touched: it reads the unmodified V3 segments of a dog (dog4-v3-lab/model.mjs: dog.segments) and the unmodified
// P3 visualAt (race-v3-p3-lab/src/visual.mjs) with ../contract/frenk.contract.integration.json, then applies the accepted
// sprite shifts (STOP V4 / stationary / RACE_START) and the shadow rule (shadow follows the visible body).
// Browser module (fetch + Image). The race-v3-frenk-lab page imports exactly this file.
import {visualAt,categoryOf} from '../../../race-v3-p3-lab/src/visual.mjs';

const MOVING_STOP=new Set(['STOP','FINISH_DECELERATE']);
const STATIONARY=new Set(['BASE','BUTTERFLY','ROLL','SNIFF_PEE','RETURN']);
const CONTRACT='contract/frenk.contract.integration.json';

// pkg: URL of the package root (…/bulldog1-frenk/integration_v1/), absolute or relative to the page
export async function loadFrenk(pkg=new URL('../',import.meta.url).href){
  const root=new URL(pkg,location.href),url=p=>new URL(p,root).href;
  const get=p=>fetch(url(p)).then(r=>{if(!r.ok)throw new Error(`${p}: HTTP ${r.status}`);return r.json();});
  const contract=await get(CONTRACT);
  const startArrays=await get('contract/'+contract.shift.arraysFile);
  const stopMeta=await get('contract/'+contract.shift.stopArraysFile);
  contract.shift.arrays=Object.fromEntries(Object.entries(startArrays.modes[contract.shift.mode]).map(([k,v])=>[k,v.C]));
  contract.shift.scaleCanvasPerSrc=startArrays.sprite_scale_canvas_per_src;
  const atlas=await get('atlas/frenk_atlas.json');
  const sheets={};
  await Promise.all(Object.entries(atlas.sheets).map(([k,p])=>new Promise((res,rej)=>{const im=new Image();im.onload=()=>{sheets[k]=im;res();};im.onerror=()=>rej(new Error('image '+p));im.src=url(p);})));
  return {contract,stopMeta,atlas,sheets,oldC:contract.shift.arrays,...shadowRefs(contract,stopMeta,atlas)};
}

// Shadow reference x per atlas label (sprite px), see contract.shadow.
export function shadowRefs(contract,stopMeta,atlas){
  const fr=atlas.frames,S=contract.shadow,cl=contract.clips,W=atlas.cellWidth;
  const runLabs=cl.START.loop,runSet=new Set(runLabs);
  const runMean=runLabs.reduce((a,k)=>a+fr[k].cx,0)/runLabs.length,standCx=fr.RACE_STAND.cx;
  const stand=new Set(['RACE_STAND',...cl.SNIFF_PEE.labels,...cl.BUTTERFLY.labels]);
  const half=(S.smoothed.window-1)/2,avg=(seq,i)=>{const w=seq.slice(Math.max(0,i-half),i+half+1);return w.reduce((a,k)=>a+fr[k].cx,0)/w.length;};
  const smooth=new Map();
  for(const seq of [cl.START.labels.filter(l=>!runSet.has(l)),cl.STOP.labels.filter(l=>l!=='RACE_STAND')])seq.forEach((l,i)=>smooth.set(l,avg(seq,i)));
  // RUN -> STOP entry: blend from the RUN mean into the STOP frames over the frames in which the entry offset fades
  const stopLabs=cl.STOP.labels,nB=S.stopEntryBlendFrames,e0=stopMeta.categories.NORMAL.stopShiftSrc[0];
  const d0=runMean-e0*W/1276-smooth.get(stopLabs[0]);       // e0 is in source px
  for(let i=0;i<nB;i++){const u=i/nB,w=1-u*u*(3-2*u);smooth.set(stopLabs[i],smooth.get(stopLabs[i])+d0*w);}
  // ROLL: own smoothed centroid, blended to RACE_STAND over the first/last frames (no hop at RACE_STAND <-> ROLL)
  if(cl.ROLL){const r=cl.ROLL.labels,n=r.length,nE=S.rollEdgeBlendFrames,s0=r.map((l,i)=>avg(r,i));
    r.forEach((l,i)=>{const ws=Math.max(0,1-i/nE),we=Math.max(0,1-(n-1-i)/nE);smooth.set(l,s0[i]+(standCx-s0[0])*ws+(standCx-s0[n-1])*we);});}
  const shadowRef=lab=>lab==null?standCx:runSet.has(lab)?runMean:stand.has(lab)?standCx:(smooth.get(lab)??fr[lab].cx);
  return {shadowRef,runMean,standCx};
}

const segmentAt=(dog,t)=>{const s=dog.segments;let lo=0,hi=s.length;while(lo<hi){const m=(lo+hi)>>1;if(s[m].t1<=t+1e-9)lo=m+1;else hi=m;}return s[Math.min(lo,s.length-1)];};
// Stationary sprite offset in force at time t: set by the last finished STOP / FINISH_DECELERATE (by its speed category).
function offsetBefore(F,dog,t){
  let off=0;
  for(const s of dog.segments){if(s.t1>t+1e-9)break;if(MOVING_STOP.has(s.kind)){const cat=categoryOf(s.base);off=cat?F.stopMeta.categories[cat].stationaryShiftSrc:NaN;}}
  return off;
}

// -> {label, shiftSrc, window, role, category, diagnostic|null}
export function frenkVisual(F,dog,t){
  const vv=visualAt(F.contract,dog.segments,t);
  if(vv.role==='missing'||vv.status==='MISSING_ASSET')
    return {label:null,shiftSrc:offsetBefore(F,dog,t),window:vv.window,role:'missing',category:null,diagnostic:`${vv.window}: клипа Фрэнка нет (MISSING_ASSET) — не подменяется`};
  if(vv.overflow)return {label:vv.frame,shiftSrc:0,window:vv.window,role:vv.role,category:null,diagnostic:`${vv.window}: OVERFLOW_TRUNCATED`};
  const seg=segmentAt(dog,t);let shift=0,cat=null,diag=null;
  if(MOVING_STOP.has(vv.window)&&vv.role!=='start'){
    cat=categoryOf(seg.base);const arr=cat&&F.stopMeta.categories[cat].stopShiftSrc;
    if(!arr)diag=`STOP: нет массива для base ${seg.base}`;else shift=arr[Math.min(vv.localIdx,arr.length-1)];
  }else if(vv.shiftStatus==='array'){
    cat=vv.category;const arr=F.oldC[cat];
    // the START item may begin before the physical START (lead): the offset is the one in force at the START item's start
    // and continues into RUN (spillFromStart): take the last START segment that begins no later than t + lead
    let startSeg=seg;for(const s of dog.segments){if(s.t0>t+0.2)break;if(s.kind==='START')startSeg=s;}
    const off=offsetBefore(F,dog,startSeg.t0-1e-6),k=(off+125)/125;
    if(!arr)diag=`START: нет массива для категории ${cat}`;else shift=arr[Math.min(vv.localIdx,arr.length-1)]*k;
  }else if(STATIONARY.has(vv.window)){shift=offsetBefore(F,dog,t);}
  else if(vv.shiftStatus==='NO_ARRAY_FOR_CATEGORY')diag='START: категория не определена';
  if(Number.isNaN(shift)){diag='сдвиг: категория STOP не определена';shift=0;}
  return {label:vv.frame,shiftSrc:shift,window:vv.window,role:vv.role,category:cat,diagnostic:diag};
}

// Draw Frenk at engine x (canvas px) on lane y: shadow (contract.shadow) then the sprite.
export function drawFrenk(ctx,F,layout,v,x,lane){
  const sc=layout.spriteWidth/1276, dx=v.shiftSrc*sc, sx=shadowX(F,layout,v,x), E=F.contract.shadow.ellipse;
  ctx.fillStyle=E.fill;ctx.beginPath();ctx.ellipse(sx,lane+E.dyFromLane,E.rx,E.ry,0,0,Math.PI*2);ctx.fill();
  if(!v.label){                                                 // missing clip: explicit diagnostic, no substitute sprite
    ctx.strokeStyle='#ff3b30';ctx.lineWidth=4;ctx.strokeRect(x-layout.spriteAnchorX+dx,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
    ctx.fillStyle='rgba(255,59,48,.22)';ctx.fillRect(x-layout.spriteAnchorX+dx,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
    ctx.fillStyle='#ffdddd';ctx.font='bold 17px system-ui';ctx.fillText(`${v.window}: НЕТ КЛИПА`,x-layout.spriteAnchorX+dx+12,lane-50);
    return;
  }
  const f=F.atlas.frames[v.label]; if(!f)throw new Error('Frenk atlas has no frame '+v.label);
  const {cellWidth:w,cellHeight:h,columns:c}=F.atlas, im=F.sheets[f.sheet];
  ctx.drawImage(im,(f.index%c)*w,Math.floor(f.index/c)*h,w,h,Math.round((x-layout.spriteAnchorX+dx)*1000)/1000,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
}
// Shadow centre (canvas px): RUN -> anchor-50 exactly as Bulldog No.4; otherwise moved with the visible body reference.
export function shadowX(F,layout,v,x){
  const sc=layout.spriteWidth/1276,k=layout.spriteWidth/F.atlas.cellWidth;
  return x-50+v.shiftSrc*sc+(F.shadowRef(v.label)-F.runMean)*k;
}
// Visible position of the dog body (alpha-weighted centroid of the frame) and of the shadow centre, canvas px.
export function frenkGeometry(F,layout,v,x){
  const sc=layout.spriteWidth/1276,dx=v.shiftSrc*sc,f=v.label&&F.atlas.frames[v.label];
  return {bodyX:f?x-layout.spriteAnchorX+dx+f.cx*layout.spriteWidth/F.atlas.cellWidth:null,shadowX:shadowX(F,layout,v,x),spriteLeft:x-layout.spriteAnchorX+dx};
}
