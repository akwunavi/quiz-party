// Read-only: how Frenk's visual START looks if V3's CURRENT physics (START = 1.0 s from segment start, unchanged) is kept.
import {readFileSync,writeFileSync} from 'node:fs';
import {FPS} from '../../../dog4-v3-lab/model.mjs';
const layout=JSON.parse(readFileSync(new URL('../../../dog4-v3-lab/layout.json',import.meta.url)));
const META=JSON.parse(readFileSync(new URL('../../track_diag/frames_meta.json',import.meta.url)));
const SC=layout.spriteWidth/1276, V00=1/42, course=layout.finishX-layout.startX+layout.finishControlOffset;
const smoothIntegral=u=>u*u*u-.5*u*u*u*u, progressX=p=>layout.startX+p*course;
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i), loop=R(87,98);
const entry=[1,7,8,9,10,11,16].map(k=>`v1f${k}`);
const keys=[...entry,...R(2,35).map(k=>`g3f${k}`),...R(88,98).concat(Array.from({length:4},()=>loop).flat()).map(n=>`run${n}`)];
const iPush=12, visualJoin=41, physStart=0, T=1.0;
function engine(mult){const v=V00*mult;return t=>{const x=Math.max(0,t);return x<=T?(v*T/2)*2*smoothIntegral(x/T):v*T/2*2*smoothIntegral(1)+v*(x-T);};}
const smoothBox=(xs,h)=>xs.map((_,i)=>{let a=0;for(let k=-h;k<=h;k++)a+=xs[Math.min(xs.length-1,Math.max(0,i+k))];return a/(2*h+1);});
const baseAt=i=>{if(i<iPush)return 125;const u=Math.min(1,(i-iPush)/(visualJoin-iPush));return 125*(1-(2*u**3-u**4));};
function run(mult,mode){
  const D=engine(mult), N=keys.length;
  const anchor=keys.map((_,i)=>progressX(D((i-physStart)/FPS)));
  let C=keys.map((_,i)=>{if(i<iPush)return 125;const u=Math.min(1,(i-iPush)/(visualJoin-iPush));return 125*(1-(2*u**3-u**4));});
  const pos=c=>keys.map((k,i)=>anchor[i]-layout.spriteAnchorX+(META[k].cx+c[i])*SC);
  if(mode==='hold_static'){   // keep the crouching sprite still until push-off: C absorbs the engine drift
    for(let i=0;i<iPush;i++)C[i]=125-(anchor[i]-anchor[0])/SC;
    for(let i=iPush;i<N;i++){const u=Math.min(1,(i-iPush)/(visualJoin-iPush)),w=1-(2*u**3-u**4);C[i]=125*(1-(2*u**3-u**4))-(anchor[iPush]-anchor[0])/SC*w;}
  }
  for(let pass=0;pass<2;pass++){   // same derived envelope as N2, two passes, from push-off to visual join
    const xs=pos(C),sm=smoothBox(xs,4);let env=[];for(let i=iPush;i<=visualJoin;i++)env.push(sm[i]);
    for(let i=env.length-2;i>=0;i--)env[i]=Math.min(env[i],env[i+1]);env=env.map(v=>Math.max(v,sm[iPush]));
    const ex=env.map((v,k)=>v-sm[iPush+k]);ex[0]=0;ex[ex.length-1]=0;
    const exs=ex.map((_,i)=>{let a=0;for(let k=-2;k<=2;k++)a+=ex[Math.min(ex.length-1,Math.max(0,i+k))];return a/5;});exs[0]=0;exs[exs.length-1]=0;
    for(let k=0;k<exs.length;k++)C[iPush+k]+=exs[k]/SC;
  }
  const xs=pos(C),sm=smoothBox(xs,4);let rm=-1e9,give=0;for(let i=iPush;i<iPush+45;i++){rm=Math.max(rm,sm[i]);give=Math.max(give,rm-sm[i]);}
  const slide=Math.max(...xs.slice(0,iPush+1))-Math.min(...xs.slice(0,iPush+1));         // sprite travel while still crouched (before push-off), canvas px
  const joinStep=xs[visualJoin]-xs[visualJoin-1];
  const engineSlideBefore=anchor[iPush]-anchor[0];
  const catchUpRate=Math.max(...xs.slice(iPush,visualJoin+1).map((x,i,a)=>i?(x-a[i-1])*FPS:0));
  return {rollback:+give.toFixed(2),joinStep:+joinStep.toFixed(2),spriteTravelBeforePushOff:+slide.toFixed(2),engineAnchorTravelBeforePushOff:+engineSlideBefore.toFixed(2),
    maxExtraVsBase_srcPx:+Math.max(...C.map((c,i)=>Math.abs(c-baseAt(i)))).toFixed(1),
    peakSpriteSpeedAfterPushOff_canvasPxPerS:+catchUpRate.toFixed(1),cruiseSpeed_canvasPxPerS:+(V00*mult*course).toFixed(1),C:C.slice(0,46).map(x=>+x.toFixed(2))};
}
const cats={VERY_SLOW:.75,SLOW:.88,NORMAL:1,FAST:1.12,VERY_FAST:1.25}, out={};
for(const mode of ['follow_engine','hold_static']){out[mode]={};for(const [k,m] of Object.entries(cats))out[mode][k]=run(m,mode);}
for(const mode of Object.keys(out)){console.log('== '+mode);for(const [k,v] of Object.entries(out[mode]))console.log(k.padEnd(10),JSON.stringify({...v,C:undefined}));}
writeFileSync(new URL('./native_check_results.json',import.meta.url),JSON.stringify(out,null,1));
