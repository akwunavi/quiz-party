// Read-only integration check. Imports V3 model.mjs / layout.json and Frenk track_diag meta; modifies nothing.
import {readFileSync,writeFileSync} from 'node:fs';
import {buildDog,stateAt,FPS} from '../../../dog4-v3-lab/model.mjs';
const layout=JSON.parse(readFileSync(new URL('../../../dog4-v3-lab/layout.json',import.meta.url)));
const META=JSON.parse(readFileSync(new URL('../../track_diag/frames_meta.json',import.meta.url)));
const SC=layout.spriteWidth/1276, V0=1/42;
const smoothIntegral=u=>u*u*u-.5*u*u*u*u;
const progressX=p=>layout.startX+p*(layout.finishX-layout.startX+layout.finishControlOffset);
const course=layout.finishX-layout.startX+layout.finishControlOffset;
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const loop=R(87,98), iPushRel=5;
function variant(name,{gen3End,rampEndRel}){
  // relative index within START window: 0..6 entry (V1 f1,7-11,16), gen3 f2.. from 7
  const entry=[1,7,8,9,10,11,16].map(k=>`v1f${k}`), gen=R(2,gen3End).map(k=>`g3f${k}`);
  const run=(gen3End===37?[...R(90,98)]:[...R(88,98)]).concat(Array.from({length:4},()=>loop).flat()).map(n=>`run${n}`);
  const keys=[...entry,...gen,...run], iPush=7+iPushRel, visualJoin=entry.length+gen.length, rampEnd=rampEndRel;
  const Tr=(rampEnd-iPush)/FPS, rows=[];
  const D=t=>{const x=Math.max(0,t);return x<=Tr?(V0*Tr/2)*2*smoothIntegral(x/Tr):V0*Tr/2*2*smoothIntegral(1)+V0*(x-Tr);};
  keys.forEach((k,i)=>{
    const p=D((i-iPush)/FPS);                         // engine progress relative to START entry (p at push-off = 0)
    let C=125;
    if(i>=iPush){const u=Math.min(1,(i-iPush)/(rampEnd-iPush));C=125*(1-(2*u**3-u**4));}
    const m=META[k];
    rows.push({i,key:k,p,C,cx:m.cx,dogX:progressX(p)-layout.spriteAnchorX+(m.cx+C)*SC});
  });
  return {name,keys,iPush,visualJoin,rampEnd,Tr,rows};
}
function metrics(v){
  const xs=v.rows.map(r=>r.dogX), N=xs.length;
  const sm=xs.map((_,i)=>{let a=0;for(let k=-4;k<=4;k++)a+=xs[Math.min(N-1,Math.max(0,i+k))];return a/9;});
  let rm=-1e9,give=0;for(let i=v.iPush;i<v.iPush+45&&i<N;i++){rm=Math.max(rm,sm[i]);give=Math.max(give,rm-sm[i]);}
  const j=v.visualJoin, step=xs[j]-xs[j-1], steps=[];for(let i=v.iPush;i<v.iPush+45&&i<N;i++)steps.push(xs[i]-xs[i-1]);
  const minStep=Math.min(...steps.slice(0,v.rampEnd-v.iPush+6)), pawlessCx=v.rows[j].cx-v.rows[j-1].cx;
  return {visualJoinIdx:j,rampEndIdx:v.rampEnd,rampFrames:v.rampEnd-v.iPush,rampSeconds:+(v.Tr).toFixed(4),
    joinStepCanvasPx:+step.toFixed(2),smoothedRollbackCanvasPx:+give.toFixed(2),minFrameStepCanvasPx:+minStep.toFixed(2),
    C_at_join_frames:v.rows.slice(j-1,j+3).map(r=>+r.C.toFixed(1)),runFrameAtRampEnd:v.keys[v.rampEnd],progressAtIdx:{i43:+v.rows[43].p.toFixed(8),i60:+v.rows[60].p.toFixed(8)}};
}
const A=variant('A original f37->#90 (ramp end = join = idx 43)',{gen3End:37,rampEndRel:43});
const Bc=variant('B coupled f35->#88 (ramp end = join = idx 41)',{gen3End:35,rampEndRel:41});
const Bd=variant('B decoupled f35->#88 (physics ramp end stays idx 43)',{gen3End:35,rampEndRel:43});
const out={course_px:course,SC,V0,vs:{}};
for(const v of [A,Bc,Bd])out.vs[v.name]=metrics(v);
// engine identity
const maxDiff=(X,Y)=>Math.max(...X.rows.slice(0,60).map((r,i)=>Math.abs(r.p-Y.rows[i].p)));
out.engine_progress_max_abs_diff={A_vs_Bdecoupled:maxDiff(A,Bd),A_vs_Bcoupled:maxDiff(A,Bc)};
out.sprite_frame_at_index43={A:A.keys[43],Bdecoupled:Bd.keys[43],Bcoupled:Bc.keys[43]};
out.frames_different_between_A_and_Bdecoupled=A.keys.slice(0,50).map((k,i)=>k===Bd.keys[i]?null:[i,k,Bd.keys[i]]).filter(Boolean);
// effect of a shorter coupled ramp on crossing time (analytic: a START of ramp T loses T/2 s against cruise)
const dT=(A.Tr-Bc.Tr);
out.coupled_ramp_effect={rampShorterSeconds:+dT.toFixed(5),crossingEarlierPerSTART_seconds:+(dT/2).toFixed(5),distanceGainPerSTART_canvasPx_atBase1:+((V0*dT/2)*course).toFixed(3),perDogWithNevents:{0:+(dT/2).toFixed(4),1:+(dT).toFixed(4),2:+(1.5*dT).toFixed(4),3:+(2*dT).toFixed(4)}};
// V3 self-test: our integral equals stateAt() of V3's own START
const dog=buildDog('A',1);let worst=0;
for(const s of dog.segments){if(s.kind!=='START')continue;for(let i=0;i<=20;i++){const t=s.t0+(s.t1-s.t0)*i/20,u=i/20;worst=Math.max(worst,Math.abs(s.p0+(s.p1-s.p0)*2*smoothIntegral(u)-stateAt(dog,Math.min(t,dog.end-1e-9)).progress));}}
out.v3_selftest_START_max_abs_err=worst;
// per-frame compensation array for the decoupled variant (source px), indices 0..45
out.per_frame_C_B_decoupled_src_px=Bd.rows.slice(0,46).map(r=>+r.C.toFixed(2));
out.per_frame_C_A_src_px=A.rows.slice(0,46).map(r=>+r.C.toFixed(2));

// ---- derived compensation (same algorithm as track_diag/adapter.mjs N2) applied to a variant
function derived(v){
  const rows=v.rows.map(r=>({...r})), N=rows.length, W=9;
  const xs=rows.map(r=>progressX(r.p)+(r.cx+r.C)*SC);
  const sm=xs.map((_,i)=>{let a=0;for(let k=-4;k<=4;k++)a+=xs[Math.min(N-1,Math.max(0,i+k))];return a/9;});
  const lo=v.iPush,hi=v.rampEnd;let env=[];for(let i=lo;i<=hi;i++)env.push(sm[i]);
  for(let i=env.length-2;i>=0;i--)env[i]=Math.min(env[i],env[i+1]);
  env=env.map(x=>Math.max(x,sm[lo]));
  const ex=env.map((x,k)=>x-sm[lo+k]);ex[0]=0;ex[ex.length-1]=0;
  const exs=ex.map((_,i)=>{let a=0;for(let k=-2;k<=2;k++)a+=ex[Math.min(ex.length-1,Math.max(0,i+k))];return a/5;});exs[0]=0;exs[exs.length-1]=0;
  for(let k=0;k<exs.length;k++)rows[lo+k].C+=exs[k]/SC;
  for(const r of rows)r.dogX=progressX(r.p)-layout.spriteAnchorX+(r.cx+r.C)*SC;
  return {...v,rows};
}
out.derived_N2={};
for(const v of [A,Bc,Bd]){const d=derived(v);out.derived_N2[v.name]={...metrics(d),maxExtraShift_srcPx:+Math.max(...d.rows.map((r,i)=>Math.abs(r.C-v.rows[i].C))).toFixed(2)};}
out.per_frame_C_B_decoupled_derived_src_px=derived(Bd).rows.slice(0,46).map(r=>+r.C.toFixed(2));
writeFileSync(new URL('./check_results.json',import.meta.url),JSON.stringify(out,null,1));
console.log(JSON.stringify(out,null,1));
