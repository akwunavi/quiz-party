// Bulldog No.2 SNIFF_PEE lab: visual layer = lab_butterfly_v1 (RACE_STAND #30, RACE_START B, RUN, STOP B, ROLL v3, BUTTERFLY v2; unchanged,
// imported) plus the approved SNIFF_PEE v1 clip (Kling 4.0). V3 places two stationary windows back to back, SNIFF_PEE (7.2604 s) and
// RETURN (2.7208 s); the ONE clip plays continuously through both: frame index = floor((t - t0 of the SNIFF_PEE window)·24), counted on
// across the RETURN window, then RACE_STAND #30 (pad) until START B. The clip starts and ends in the unshifted RUN #30 frame, so it is drawn
// with the RACE_STAND sprite shift. Physics is NOT touched.
import {loadDog2Butterfly,dog2ButterflyVisual,drawDog2Butterfly} from '../lab_butterfly_v1/dog2butterfly.mjs';
const FPS=24,img=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});
export async function loadDog2Sniff(base){
  const D=await loadDog2Butterfly(new URL('../lab_butterfly_v1/',base));
  D.sniff=await fetch(new URL('assets/dog2_sniff_atlas.json',base)).then(r=>r.json());
  D.sniffSheet=await img(new URL(D.sniff.sheet,base).href);
  // Rhythm variant (?v=V1_LONG_HOLD | V2_LEAD_AND_HOLD): another ORDER of the same atlas frames (STAND = RACE_STAND #30); default = accepted clip.
  const v=new URL(location.href).searchParams.get('v');D.sniffVariant=v||'CURRENT';
  if(v){const R=await fetch(new URL('assets/rhythm_variants.json',base)).then(r=>r.json());if(!R.variants[v])throw new Error('unknown variant '+v);D.sniff.clip=R.variants[v];}
  return D;
}
export function dog2SniffVisual(D,dog,t){
  const s=dog.segments.find(q=>t>=q.t0-1e-9&&t<q.t1-1e-9);
  if(s&&(s.kind==='SNIFF_PEE'||s.kind==='RETURN')){
    const sp=s.kind==='SNIFF_PEE'?s:dog.segments.find(q=>q.kind==='SNIFF_PEE'&&q.eventIndex===s.eventIndex);
    const k=Math.floor((t-sp.t0)*FPS+1e-9),C=D.sniff.clip,win=s.kind;
    if(k<C.length&&C[k]==='STAND')return {atlas:'run',key:'r30',shift:D.shiftStand,ref:D.run.frames.r30.cx,phase:'RACE_STAND (lead SNIFF_PEE)',window:win,label:'RACE_STAND #30',idx:k};
    if(k<C.length){const key=C[k];return {atlas:'sniff',key,shift:D.shiftStand,ref:D.sniff.frames[key].cx,phase:'SNIFF_PEE clip',window:win,label:key,idx:k};}
    return {atlas:'run',key:'r30',shift:D.shiftStand,ref:D.run.frames.r30.cx,phase:'RACE_STAND (pad SNIFF_PEE+RETURN)',window:win,label:'RACE_STAND #30',idx:null};}
  return dog2ButterflyVisual(D,dog,t);
}
export function drawDog2Sniff(ctx,D,layout,v,x,lane){
  if(v.atlas!=='sniff')return drawDog2Butterfly(ctx,D,layout,v,x,lane);
  const A=D.sniff,{cellWidth:w,cellHeight:h,columns:c}=A,f=A.frames[v.key],left=x-layout.spriteAnchorX+v.shift;
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(left+v.ref,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  ctx.drawImage(D.sniffSheet,(f.index%c)*w,Math.floor(f.index/c)*h,w,h,left,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
  return {bodyX:left+f.cx,shadowX:left+v.ref,left,bottom:lane-layout.spriteTopOffset+f.bottom};
}
