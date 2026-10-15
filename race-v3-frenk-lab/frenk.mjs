// Frenk visual layer for the browser lab. Physics is NOT touched: it reads the unmodified V3 segments of a dog
// (dog4-v3-lab/model.mjs) and the unmodified P3 visualAt (race-v3-p3-lab/src/visual.mjs) with the LAB COPY of the
// Frenk contract (STOP V4). On top of visualAt it applies the STOP V4 visual-metadata proposal (sprite shifts),
// see characters/frenk.contract.lab.json -> shift.labRules. Missing clips are reported, never substituted (ROLL v1 is connected).
import {visualAt,categoryOf} from '../race-v3-p3-lab/src/visual.mjs';

const MOVING_STOP=new Set(['STOP','FINISH_DECELERATE']);
const STATIONARY=new Set(['BASE','BUTTERFLY','ROLL','SNIFF_PEE','RETURN']);

export async function loadFrenk(dir='./'){
  const get=p=>fetch(new URL(p,new URL(dir,location.href))).then(r=>{if(!r.ok)throw new Error(`${p}: HTTP ${r.status}`);return r.json();});
  const contract=await get('characters/frenk.contract.lab.json');
  const startArrays=await get('characters/'+contract.shift.arraysFile);
  const stopMeta=await get('characters/'+contract.shift.stopArraysFile);
  contract.shift.arrays=Object.fromEntries(Object.entries(startArrays.modes[contract.shift.mode]).map(([k,v])=>[k,v.C]));
  contract.shift.scaleCanvasPerSrc=startArrays.sprite_scale_canvas_per_src;
  const atlas=await get('assets/frenk_atlas.json');
  const sheets={};
  await Promise.all(Object.entries(atlas.sheets).map(([k,p])=>new Promise((res,rej)=>{const im=new Image();im.onload=()=>{sheets[k]=im;res();};im.onerror=()=>rej(new Error('image '+p));im.src=new URL(p,new URL(dir,location.href)).href;})));
  // shadow reference: the shadow follows the VISIBLE body, not the sprite box (a sprite shift that compensates the image
  // content, e.g. STOP V4 k73 -> RACE_STAND, must not move the shadow). Reference x per frame (sprite px):
  //  RUN frames -> mean of the RUN cycle (no jitter; in RUN the shadow is exactly the Bulldog №4 shadow, anchor - 50);
  //  RACE_STAND, SNIFF_PEE, BUTTERFLY (stand-based, feet planted) -> the RACE_STAND centroid (shadow does not slide);
  //  STOP V4 and RACE_START frames (body really travels inside the frame) -> the frame's own centroid.
  const fr=atlas.frames,runs=Object.keys(fr).filter(k=>/^run\d+$/.test(k));
  const runMean=runs.reduce((a,k)=>a+fr[k].cx,0)/runs.length,standCx=fr.RACE_STAND.cx;
  // STOP V4 / RACE_START: 5-frame moving average along the clip order, so a single-frame pose change does not make the shadow hop
  const smooth=new Map();
  for(const seq of [contract.clips.START.labels.filter(l=>!/^run/.test(l)),contract.clips.STOP.labels.filter(l=>l!=='RACE_STAND')])
    seq.forEach((l,i)=>{const w=seq.slice(Math.max(0,i-2),i+3);smooth.set(l,w.reduce((a,k)=>a+fr[k].cx,0)/w.length);});
  // RUN -> STOP V4 entry: the shadow reference starts at the RUN mean and blends into the STOP frames over the same
  // 8 frames in which the entry offset fades (stop shift[0] is category independent).
  const stopLabs=contract.clips.STOP.labels,e0=stopMeta.categories.NORMAL.stopShiftSrc[0],d0=runMean-e0*207/1276-smooth.get(stopLabs[0]);   // sprite px; e0 is in source px
  for(let i=0;i<8;i++){const u=i/8,w=1-u*u*(3-2*u);smooth.set(stopLabs[i],smooth.get(stopLabs[i])+d0*w);}
  // ROLL: own centroid (body really moves sideways when the dog lies down), 5-frame smoothed, and blended to the
  // RACE_STAND reference over the first/last 6 frames so the shadow does not hop at RACE_STAND <-> ROLL.
  if(contract.clips.ROLL){const r=contract.clips.ROLL.labels,n=r.length,s0=r.map((l,i)=>{const w=r.slice(Math.max(0,i-2),i+3);return w.reduce((a,k)=>a+fr[k].cx,0)/w.length;});
    r.forEach((l,i)=>{const ws=Math.max(0,1-i/6),we=Math.max(0,1-(n-1-i)/6);smooth.set(l,s0[i]+(standCx-s0[0])*ws+(standCx-s0[n-1])*we);});}
  const shadowRef=lab=>lab==null?standCx:/^run\d+$/.test(lab)?runMean:(lab==='RACE_STAND'||/^(sniffEv|bf)\d+$/.test(lab))?standCx:(smooth.get(lab)??fr[lab].cx);
  return {contract,stopMeta,atlas,sheets,oldC:contract.shift.arrays,shadowRef,runMean};
}

const segmentAt=(dog,t)=>{const s=dog.segments;let lo=0,hi=s.length;while(lo<hi){const m=(lo+hi)>>1;if(s[m].t1<=t+1e-9)lo=m+1;else hi=m;}return s[Math.min(lo,s.length-1)];};
// Stationary sprite offset in force at time t: set by the last finished STOP / FINISH_DECELERATE (by its speed category).
function offsetBefore(F,dog,t){
  let off=0,cat=null;
  for(const s of dog.segments){if(s.t1>t+1e-9)break;if(MOVING_STOP.has(s.kind)){cat=categoryOf(s.base);off=cat?F.stopMeta.categories[cat].stationaryShiftSrc:NaN;}}
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

// Draw Frenk at engine x (canvas px) on lane y. Shadow follows the visible sprite (anchor shadow + the same shift).
export function drawFrenk(ctx,F,layout,v,x,lane){
  const sc=layout.spriteWidth/1276, dx=v.shiftSrc*sc, sx=shadowX(F,layout,v,x);
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(sx,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  if(!v.label){                                                 // missing clip: explicit diagnostic, no substitute sprite
    ctx.strokeStyle='#ff3b30';ctx.lineWidth=4;ctx.strokeRect(x-layout.spriteAnchorX+dx,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
    ctx.fillStyle='rgba(255,59,48,.22)';ctx.fillRect(x-layout.spriteAnchorX+dx,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
    ctx.fillStyle='#ffdddd';ctx.font='bold 17px system-ui';ctx.fillText('ROLL: НЕТ КЛИПА',x-layout.spriteAnchorX+dx+12,lane-50);
    return;
  }
  const f=F.atlas.frames[v.label]; if(!f)throw new Error('Frenk atlas has no frame '+v.label);
  const {cellWidth:w,cellHeight:h,columns:c}=F.atlas, im=F.sheets[f.sheet];
  ctx.drawImage(im,(f.index%c)*w,Math.floor(f.index/c)*h,w,h,Math.round((x-layout.spriteAnchorX+dx)*1000)/1000,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
}
// Shadow centre (canvas px): RUN -> anchor-50 exactly as Bulldog №4; otherwise moved with the visible body reference.
export function shadowX(F,layout,v,x){
  const sc=layout.spriteWidth/1276,k=layout.spriteWidth/F.atlas.cellWidth;
  return x-50+v.shiftSrc*sc+(F.shadowRef(v.label)-F.runMean)*k;
}
// Visible position of the dog body (alpha-weighted centroid of the frame) and of the shadow centre, canvas px.
export function frenkGeometry(F,layout,v,x){
  const sc=layout.spriteWidth/1276,dx=v.shiftSrc*sc,f=v.label&&F.atlas.frames[v.label];
  return {bodyX:f?x-layout.spriteAnchorX+dx+f.cx*layout.spriteWidth/F.atlas.cellWidth:null,shadowX:shadowX(F,layout,v,x),spriteLeft:x-layout.spriteAnchorX+dx};
}
