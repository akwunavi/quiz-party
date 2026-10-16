// Bulldog No.2 BUTTERFLY lab: visual layer = lab_roll_v1 (RACE_STAND #30, RACE_START B, RUN, STOP B, ROLL v3; unchanged, imported)
// plus the approved BUTTERFLY v2 clip in the V3 BUTTERFLY window. The clip starts and ends in the unshifted RUN #30 frame, so it is
// drawn with the RACE_STAND sprite shift; window = clip frames from the window start (START B lead 0), then RACE_STAND (pad).
// The butterfly itself is a separate game object and is NOT drawn here. Physics is NOT touched.
import {loadDog2Roll,dog2RollVisual,drawDog2Roll} from '../lab_roll_v1/dog2roll.mjs';
const FPS=24,img=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});
export async function loadDog2Butterfly(base){
  const D=await loadDog2Roll(new URL('../lab_roll_v1/',base));
  D.butterfly=await fetch(new URL('assets/dog2_butterfly_atlas.json',base)).then(r=>r.json());
  D.butterflySheet=await img(new URL(D.butterfly.sheet,base).href);return D;
}
export function dog2ButterflyVisual(D,dog,t){
  const s=dog.segments.find(q=>t>=q.t0-1e-9&&t<q.t1-1e-9);
  if(s&&s.kind==='BUTTERFLY'){const k=Math.floor((t-s.t0)*FPS+1e-9),C=D.butterfly.clip;
    if(k<C.length){const key=C[k];return {atlas:'butterfly',key,shift:D.shiftStand,ref:D.butterfly.frames[key].cx,phase:'BUTTERFLY',label:key,idx:k};}
    return {atlas:'run',key:'r30',shift:D.shiftStand,ref:D.run.frames.r30.cx,phase:'RACE_STAND (pad BUTTERFLY)',label:'RACE_STAND #30',idx:null};}
  return dog2RollVisual(D,dog,t);
}
export function drawDog2Butterfly(ctx,D,layout,v,x,lane){
  if(v.atlas!=='butterfly')return drawDog2Roll(ctx,D,layout,v,x,lane);
  const A=D.butterfly,{cellWidth:w,cellHeight:h,columns:c}=A,f=A.frames[v.key],left=x-layout.spriteAnchorX+v.shift;
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(left+v.ref,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  ctx.drawImage(D.butterflySheet,(f.index%c)*w,Math.floor(f.index/c)*h,w,h,left,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
  return {bodyX:left+f.cx,shadowX:left+v.ref,left,bottom:lane-layout.spriteTopOffset+f.bottom};
}
