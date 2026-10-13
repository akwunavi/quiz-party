// Frenk track diagnostic: isolated adapter. It does NOT modify V3 and does not copy its engine.
// It imports the V3 model only to (1) read the layout constants through layout.json and
// (2) self-test that the three motion integrals used here equal V3's own stateAt() on a V3-native timeline.
import {readFileSync,writeFileSync} from 'node:fs';
import {buildDog,stateAt,FPS} from '../../dog4-v3-lab/model.mjs';
const layout=JSON.parse(readFileSync(new URL('../../dog4-v3-lab/layout.json',import.meta.url)));
const META=JSON.parse(readFileSync(new URL('./frames_meta.json',import.meta.url)));
const SC=layout.spriteWidth/1276;                       // 0.1622: source px -> canvas px
const V0=1/42;                                         // V3 BASE_SPEED (medium, all bands = 1 for this diagnostic)
const smoothIntegral=u=>u*u*u-.5*u*u*u*u, brakingIntegral=u=>u-u*u*u+.5*u*u*u*u;   // same formulas as V3 model.mjs
const progressX=p=>layout.startX+p*(layout.finishX-layout.startX+layout.finishControlOffset);

// ---------- self test against V3 itself (V3-native START 1 s / STOP 37/24 s) ----------
export function selfTest(){
  const dog=buildDog('A',1);       // BUTTERFLY dog: RUN -> STOP -> BUTTERFLY -> START
  let worst=0,n=0;
  for(const s of dog.segments){
    if(s.kind!=='START'&&s.kind!=='STOP')continue;
    for(let i=0;i<=20;i++){
      const t=s.t0+(s.t1-s.t0)*i/20,u=i/20;
      const mine=s.kind==='START'?s.p0+(s.p1-s.p0)*2*smoothIntegral(u):s.p0+(s.p1-s.p0)*2*brakingIntegral(u);
      worst=Math.max(worst,Math.abs(mine-stateAt(dog,Math.min(t,dog.end-1e-9)).progress));n++;
    }
  }
  return {samples:n,maxAbsErr:worst};
}

// ---------- Frenk timeline (24 fps, one entry per displayed frame) ----------
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const loop=R(87,98);
const seg=[];
const push=(kind,keys)=>keys.forEach(k=>seg.push({kind,key:k}));
push('RUN_PRE',[...loop,...loop,...R(87,96).map(n=>n)].map(n=>`run${n}`));
push('STOP',R(1,73).map(i=>`stop${i}`));
push('EVENT',Array(24).fill('stand'));                                   // placeholder for the event slot: RACE_STAND held 1.0 s
push('ENTRY',[1,7,8,9,10,11,16].map(k=>`v1f${k}`));
push('GEN3',R(2,37).map(k=>`g3f${k}`));
push('RUN',[...R(90,98),...Array.from({length:6},()=>loop).flat()].map(n=>`run${n}`));
const N=seg.length, idx=kind=>seg.map((s,i)=>s.kind===kind?i:-1).filter(i=>i>=0);
const iStop=idx('STOP')[0], iEvent=idx('EVENT')[0], iEntry=idx('ENTRY')[0], iGen=idx('GEN3')[0], iRun=idx('RUN')[0];
const iPush=iGen+(7-2);                                   // gen3 f7: first front paw lifted
const dt=1/FPS;

function build(variant){
  const speed=V0, Tstop=73/24;
  const ramp=variant.ramp==='segment'?{i0:iEntry}:{i0:iPush};            // where the START velocity ramp begins
  const Tr=((variant.rampEnd??iRun)-ramp.i0)/FPS;
  const rows=[];let p=0.10;
  for(let i=0;i<N;i++){
    const s=seg[i];
    if(i>0){
      const prev=seg[i-1];
      if(s.kind==='ENTRY'||s.kind==='GEN3'||i===iRun){
        const D=t=>{const x=Math.max(0,t);return x<=Tr?(speed*Tr/2)*2*smoothIntegral(x/Tr):speed*Tr/2*2*smoothIntegral(1)+speed*(x-Tr);};
        p+=D((i-ramp.i0)/FPS)-D((i-1-ramp.i0)/FPS);}
      else if(s.kind==='RUN_PRE'||s.kind==='RUN')p+=speed*dt;
      else if(s.kind==='STOP'){const u0=(i-1-iStop)/FPS/Tstop,u1=(i-iStop)/FPS/Tstop;p+=(speed*Tstop/2)*2*(brakingIntegral(Math.min(u1,1))-brakingIntegral(u0));}
      else if(s.kind==='EVENT'){/* stationary */}
    }
    rows.push({i,t:i*dt,kind:s.kind,key:s.key,p});
  }
  // compensation C (source px, sprite shift): 0 / proportional / derived
  for(const r of rows){
    const m=META[r.key];r.cx=m.cx;r.y1=m.y1;r.paw=m.paw;
    let C=0;
    if(variant.comp!=='none'){
      if(r.kind==='ENTRY'||(r.kind==='GEN3'&&r.i<iPush))C=125;
      else if(r.kind==='GEN3'||(r.kind==='RUN'&&r.i<=iRun)){}
      if(r.kind==='GEN3'&&r.i>=iPush){const u=(r.i-iPush)/(iRun-iPush);C=125*(1-(2*u**3-u**4));}
    }
    r.C=C;
  }
  if(variant.comp==='derived'){
    // lower monotone envelope of the 9-frame smoothed screen position from push-off to join (floored at start)
    const W=9,xs=rows.map(r=>progressX(r.p)+(r.cx+r.C)*SC);   // canvas px of dog centre with proportional C
    const sm=xs.map((_,i)=>{let a=0,c=0;for(let k=-4;k<=4;k++){const j=Math.min(N-1,Math.max(0,i+k));a+=xs[j];c++;}return a/c;});
    const lo=iPush,hi=iRun;let env=[];
    for(let i=lo;i<=hi;i++)env.push(sm[i]);
    for(let i=env.length-2;i>=0;i--)env[i]=Math.min(env[i],env[i+1]);
    env=env.map(v=>Math.max(v,sm[lo]));
    const ex=env.map((v,k)=>v-sm[lo+k]);ex[0]=0;ex[ex.length-1]=0;
    const exs=ex.map((_,i)=>{let a=0;for(let k=-2;k<=2;k++)a+=ex[Math.min(ex.length-1,Math.max(0,i+k))];return a/5;});exs[0]=0;exs[exs.length-1]=0;
    for(let k=0;k<exs.length;k++)rows[lo+k].C+=exs[k]/SC;      // back to source px
  }
  for(const r of rows){
    r.anchorX=progressX(r.p);                                     // physical (engine) anchor on the 1920 canvas
    r.left=r.anchorX-layout.spriteAnchorX+r.C*SC;                 // sprite left edge, canvas px
    r.dogX=r.left+r.cx*SC;                                        // dog centre, canvas px
    r.pawX=r.left+r.paw*SC;                                       // leading-paw contact x, canvas px
  }
  return rows;
}
const VARIANTS={
  N0_V3native_nocomp:{ramp:'segment',comp:'none'},
  N1_proportional:{ramp:'pushoff',comp:'proportional'},
  N2_derived:{ramp:'pushoff',comp:'derived'},
  N3_matched_ramp:{ramp:'pushoff',comp:'proportional',rampEnd:iPush+13},   // velocity ramp ends where the gallop is at full stride (gen3 f20)
};
const out={layout,SC,V0,idx:{iStop,iEvent,iEntry,iGen,iPush,iRun,N},selfTest:selfTest(),variants:{}};
for(const [k,v] of Object.entries(VARIANTS))out.variants[k]={params:v,rows:build(v)};
writeFileSync(new URL('./timeline.json',import.meta.url),JSON.stringify(out));
console.log('selfTest',out.selfTest,'N',N,'idx',out.idx);
