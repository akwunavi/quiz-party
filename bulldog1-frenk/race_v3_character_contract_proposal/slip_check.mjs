// Before the push-off (visual idx 0..11, crouch): how much ground motion does the ENGINE impose on the sprite, with and without the shift array?
// engine step = d(anchor); residual = d(anchor + C*SC) (C = shift array, src px). The clip's own baked body motion (cx) is reported separately: it is a property of the clip, not of the contract.
import {readFileSync,writeFileSync} from 'node:fs';
const here=u=>new URL(u,import.meta.url);
const layout=JSON.parse(readFileSync(here('../../dog4-v3-lab/layout.json')));
const META=JSON.parse(readFileSync(here('../track_diag/frames_meta.json')));
const SC=layout.spriteWidth/1276,V00=1/42,course=layout.finishX-layout.startX+layout.finishControlOffset;
const si=u=>u*u*u-.5*u*u*u*u;
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i),loop=R(87,98);
const KEYS=[...[1,7,8,9,10,11,16].map(k=>`v1f${k}`),...R(2,35).map(k=>`g3f${k}`),...R(88,98).concat(Array.from({length:6},()=>loop).flat()).map(n=>`run${n}`)];
const CATS={VERY_SLOW:.75,SLOW:.88,NORMAL:1,FAST:1.12,VERY_FAST:1.25};
const res={};
for(const lead of [0,3]){
  const A=JSON.parse(readFileSync(here(`./shift_arrays_lead${lead}.json`))).modes.native;res[`lead${lead}`]={};
  for(const [name,m] of Object.entries(CATS)){
    const v=V00*m,anchor=i=>{const x=Math.max(0,(i-lead)/24);const T=1;return x<=T?(v*T/2)*2*si(x/T):v*T/2*2*si(1)+v*(x-T);};
    const C=A[name].C,eng=i=>layout.startX+anchor(i)*course,comp=i=>eng(i)+C[i]*SC;    // engine anchor, and anchor+shift (everything except the clip's own baked body motion)
    let resid=0,raw=0,baked=0,bakedAt=-1;
    for(let i=1;i<=11;i++){resid=Math.max(resid,Math.abs(comp(i)-comp(i-1)));raw=Math.max(raw,Math.abs(eng(i)-eng(i-1)));}
    for(let i=1;i<=11;i++){const d=Math.abs(META[KEYS[i]].cx-META[KEYS[i-1]].cx)*SC;if(d>baked){baked=d;bakedAt=i;}}
    res[`lead${lead}`][name]={engineStepMaxBeforePushOff_canvasPx_per_frame:+raw.toFixed(3),engineMinusShiftResidualStep_canvasPx_per_frame:+resid.toFixed(3),clipBakedBodyStepMax_canvasPx_per_frame:+baked.toFixed(3),clipBakedStepAtIdx:bakedAt};
  }
}
writeFileSync(here('./slip_check_results.json'),JSON.stringify(res,null,1));console.log(JSON.stringify(res,null,1));
