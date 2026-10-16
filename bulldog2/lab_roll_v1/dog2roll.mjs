// Bulldog No.2 ROLL lab: visual layer = lab_stop_v1 (RACE_STAND #30, RACE_START B, RUN, STOP B; unchanged, imported) plus the
// approved ROLL v3 clip in the V3 ROLL window. ROLL frames are drawn with the RACE_STAND sprite shift (the clip starts and ends
// in the unshifted RUN #30 source frame, the same frame RACE_STAND is cut from), so no transition and no extra metadata is needed.
// Window: clip frames 0..N-1 from the window start (START B lead 0), then RACE_STAND until START (pad at the end).
// Physics is NOT touched (unmodified dog4-v3-lab/model.mjs segments).
import {loadDog2Stop,dog2StopVisual,drawDog2Stop} from '../lab_stop_v1/dog2stop.mjs';
const FPS=24,img=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});
export async function loadDog2Roll(base){
  const D=await loadDog2Stop(new URL('../lab_stop_v1/',base));
  D.roll=await fetch(new URL('assets/dog2_roll_atlas.json',base)).then(r=>r.json());
  D.rollSheet=await img(new URL(D.roll.sheet,base).href);D.ROLL=D.roll.clip;   // labels in clip order
  return D;
}
export function dog2RollVisual(D,dog,t){
  const s=dog.segments.find(q=>t>=q.t0-1e-9&&t<q.t1-1e-9);
  if(s&&s.kind==='ROLL'){const k=Math.floor((t-s.t0)*FPS+1e-9);
    if(k<D.ROLL.length){const key=D.ROLL[k],f=D.roll.frames[key];return {atlas:'roll',key,shift:D.shiftStand,ref:f.cx,phase:'ROLL',label:key,idx:k};}
    return {atlas:'run',key:'r30',shift:D.shiftStand,ref:D.run.frames.r30.cx,phase:'RACE_STAND (pad ROLL)',label:'RACE_STAND #30',idx:null};}
  return dog2StopVisual(D,dog,t);
}
export function drawDog2Roll(ctx,D,layout,v,x,lane){
  if(v.atlas!=='roll')return drawDog2Stop(ctx,D,layout,v,x,lane);
  const A=D.roll,{cellWidth:w,cellHeight:h,columns:c}=A,f=A.frames[v.key],left=x-layout.spriteAnchorX+v.shift;
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(left+v.ref,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  ctx.drawImage(D.rollSheet,(f.index%c)*w,Math.floor(f.index/c)*h,w,h,left,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
  return {bodyX:left+f.cx,shadowX:left+v.ref,left,bottom:lane-layout.spriteTopOffset+f.bottom};
}
