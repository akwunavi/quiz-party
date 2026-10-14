// Read-only: tune the position compensation for the decoupled f35->#88 variant. Imports V3 layout and Frenk frame meta only.
import {readFileSync,writeFileSync} from 'node:fs';
import {FPS} from '../../../dog4-v3-lab/model.mjs';
const layout=JSON.parse(readFileSync(new URL('../../../dog4-v3-lab/layout.json',import.meta.url)));
const META=JSON.parse(readFileSync(new URL('../../track_diag/frames_meta.json',import.meta.url)));
const SC=layout.spriteWidth/1276, V00=1/42, V0=V00, course=layout.finishX-layout.startX+layout.finishControlOffset;
const smoothIntegral=u=>u*u*u-.5*u*u*u*u;
const progressX=p=>layout.startX+p*course;
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i), loop=R(87,98);
const entry=[1,7,8,9,10,11,16].map(k=>`v1f${k}`);
function mk(gen3End,runFrom,visualJoin){
  const gen=R(2,gen3End).map(k=>`g3f${k}`), run=R(runFrom,98).concat(Array.from({length:4},()=>loop).flat()).map(n=>`run${n}`);
  return [...entry,...gen,...run];
}
const iPush=12, rampEnd=43, Tr=(rampEnd-iPush)/FPS;
let D=t=>{const x=Math.max(0,t);return x<=Tr?(V0*Tr/2)*2*smoothIntegral(x/Tr):V0*Tr/2*2*smoothIntegral(1)+V0*(x-Tr);};
const keysB=mk(35,88), keysA=mk(37,90);
const pos=(keys,C)=>keys.map((k,i)=>progressX(D((i-iPush)/FPS))-layout.spriteAnchorX+(META[k].cx+C[i])*SC);
const smoothBox=(xs,h)=>xs.map((_,i)=>{let a=0;for(let k=-h;k<=h;k++)a+=xs[Math.min(xs.length-1,Math.max(0,i+k))];return a/(2*h+1);});
function baseC(keys,f){return keys.map((_,i)=>{if(i<iPush)return 125;const u=Math.min(1,(i-iPush)/(rampEnd-iPush));return 125*(1-f(u));});}
const F={N1:u=>2*u**3-u**4, smoothstep:u=>u*u*(3-2*u), cubic:u=>u**3};
function derive(keys,C,{W=4,exW=2,passes=1,limit=Infinity}={}){
  let c=C.slice();
  for(let p=0;p<passes;p++){
    const xs=pos(keys,c), sm=smoothBox(xs,W), lo=iPush, hi=rampEnd;
    let env=[];for(let i=lo;i<=hi;i++)env.push(sm[i]);
    for(let i=env.length-2;i>=0;i--)env[i]=Math.min(env[i],env[i+1]);
    env=env.map(v=>Math.max(v,sm[lo]));
    const ex=env.map((v,k)=>v-sm[lo+k]);ex[0]=0;ex[ex.length-1]=0;
    const exs=ex.map((_,i)=>{let a=0;for(let k=-exW;k<=exW;k++)a+=ex[Math.min(ex.length-1,Math.max(0,i+k))];return a/(2*exW+1);});exs[0]=0;exs[exs.length-1]=0;
    for(let k=0;k<exs.length;k++)c[lo+k]+=Math.max(-limit/SC,Math.min(limit/SC,exs[k]/SC));
  }
  return c;
}
function metrics(keys,C,visualJoin){
  const xs=pos(keys,C), sm=smoothBox(xs,4);
  let rm=-1e9,give=0;for(let i=iPush;i<iPush+45;i++){rm=Math.max(rm,sm[i]);give=Math.max(give,rm-sm[i]);}
  const st=xs.slice(1).map((x,i)=>x-xs[i]);      // st[i]=x[i+1]-x[i]
  const joinStep=xs[visualJoin]-xs[visualJoin-1];
  const endStep=xs[rampEnd+1]-xs[rampEnd];       // first step after physics ramp end
  const d2end=Math.abs((xs[rampEnd+1]-xs[rampEnd])-(xs[rampEnd]-xs[rampEnd-1]));
  const extra=Math.max(...C.map((c,i)=>Math.abs(c-baseC(keys,F.N1)[i])))*1; // src px vs N1
  const skate=Math.max(...C.slice(iPush,rampEnd+1).map((c,i,a)=>i?Math.abs(c-a[i-1]):0))*FPS;     // src px/s
  const maxStepBack=Math.min(...st.slice(iPush,rampEnd+3));
  return {rollbackCanvasPx:+give.toFixed(3),joinStep:+joinStep.toFixed(2),endStep:+endStep.toFixed(2),d2AtRampEnd:+d2end.toFixed(2),minFrameStep:+maxStepBack.toFixed(2),maxExtraVsN1_srcPx:+extra.toFixed(1),peakCshiftRate_srcPxPerS:+skate.toFixed(1)};
}
const out={A_N2_reference:null,tests:[]};
const CA=derive(keysA,baseC(keysA,F.N1),{W:4,exW:2,passes:1});
out.A_N2_reference=metrics(keysA,CA,43);
const tests=[
 ['B N2 baseline (W4,ex2,1 pass)',F.N1,{W:4,exW:2,passes:1}],
 ['B N2, 2 passes',F.N1,{W:4,exW:2,passes:2}],
 ['B N2, ex smoothing 1',F.N1,{W:4,exW:1,passes:1}],
 ['B N2, ex smoothing 1, 2 passes',F.N1,{W:4,exW:1,passes:2}],
 ['B N2, ex smoothing 0 (none)',F.N1,{W:4,exW:0,passes:1}],
 ['B N2, W3 (7-frame)',F.N1,{W:3,exW:2,passes:1}],
 ['B N2, W3,ex1,2 passes',F.N1,{W:3,exW:1,passes:2}],
 ['B smoothstep base + N2',F.smoothstep,{W:4,exW:2,passes:1}],
 ['B cubic base + N2',F.cubic,{W:4,exW:2,passes:1}],
];
for(const [name,f,o] of tests){const C=derive(keysB,baseC(keysB,f),o);out.tests.push({name,...metrics(keysB,C,41)});}
for(const t of out.tests)console.log(t.name.padEnd(36),JSON.stringify(t));
console.log('A ref',JSON.stringify(out.A_N2_reference));
writeFileSync(new URL('./comp_tune_results.json',import.meta.url),JSON.stringify(out,null,1));

// ---- speed categories: reuse of the medium-speed array vs per-category arrays
function setSpeed(mult){const v=V00*mult;D=t=>{const x=Math.max(0,t);return x<=Tr?(v*Tr/2)*2*smoothIntegral(x/Tr):v*Tr/2*2*smoothIntegral(1)+v*(x-Tr);};}
setSpeed(1);
const Cmed=derive(keysB,baseC(keysB,F.N1),{W:4,exW:2,passes:2});
const cats={VERY_SLOW:.75,SLOW:.88,NORMAL:1,FAST:1.12,VERY_FAST:1.25};
out.speed_categories={};
for(const [k,m] of Object.entries(cats)){
  setSpeed(m);
  const reuse=metrics(keysB,Cmed,41), own=derive(keysB,baseC(keysB,F.N1),{W:4,exW:2,passes:2}), mo=metrics(keysB,own,41);
  const ownA=metrics(keysA,derive(keysA,baseC(keysA,F.N1),{W:4,exW:2,passes:1}),43);
  out.speed_categories[k]={reuse_medium_array:{rollback:reuse.rollbackCanvasPx,joinStep:reuse.joinStep},own_array_2pass:{rollback:mo.rollbackCanvasPx,joinStep:mo.joinStep,maxExtra:mo.maxExtraVsN1_srcPx},A_N2_own:{rollback:ownA.rollbackCanvasPx,joinStep:ownA.joinStep}};
}
setSpeed(1);
out.final={name:'B decoupled, N2 derived, 2 passes (W4,ex2)',metrics:metrics(keysB,Cmed,41),C_srcPx_idx0_45:Cmed.slice(0,46).map(x=>+x.toFixed(2)),speed:'NORMAL (base 1.0)'};
console.log(JSON.stringify(out.speed_categories,null,1));
writeFileSync(new URL('./comp_tune_results.json',import.meta.url),JSON.stringify(out,null,1));
