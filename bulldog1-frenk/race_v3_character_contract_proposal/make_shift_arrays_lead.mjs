// COPY of ../race_start_run_integration_kit/make_kit_data.mjs with ONE change: env LEAD (visual lead frames, native mode). LEAD=0 reproduces the kit numbers exactly.
// Read-only generator of the per-frame sprite-shift arrays and metrics for Frenk RACE_START -> RUN (gen3 f35 -> RUN #88).
// Imports V3 layout.json / model FPS and Frenk track_diag meta only; changes nothing.
import {readFileSync,writeFileSync} from 'node:fs';
import {FPS} from '../../dog4-v3-lab/model.mjs';
const layout=JSON.parse(readFileSync(new URL('../../dog4-v3-lab/layout.json',import.meta.url)));
const META=JSON.parse(readFileSync(new URL('../track_diag/frames_meta.json',import.meta.url)));
const SC=layout.spriteWidth/1276, V00=1/42, course=layout.finishX-layout.startX+layout.finishControlOffset;
const smoothIntegral=u=>u*u*u-.5*u*u*u*u, progressX=p=>layout.startX+p*course;
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i), loop=R(87,98);
const entry=[1,7,8,9,10,11,16].map(k=>`v1f${k}`);
export const KEYS=[...entry,...R(2,35).map(k=>`g3f${k}`),...R(88,98).concat(Array.from({length:6},()=>loop).flat()).map(n=>`run${n}`)];
const iPush=12, visualJoin=41;
const CATS={VERY_SLOW:.75,SLOW:.88,NORMAL:1,FAST:1.12,VERY_FAST:1.25};
const smoothBox=(xs,h)=>xs.map((_,i)=>{let a=0;for(let k=-h;k<=h;k++)a+=xs[Math.min(xs.length-1,Math.max(0,i+k))];return a/(2*h+1);});
function model(mult,{physStart,rampStart,rampEnd}){ // engine: smooth ramp from physStart(idx) over (rampEnd-rampStart) frames beginning at rampStart
  const v=V00*mult,Tr=(rampEnd-rampStart)/FPS;
  return i=>{const x=Math.max(0,(i-rampStart)/FPS);return x<=Tr?(v*Tr/2)*2*smoothIntegral(x/Tr):v*Tr/2*2*smoothIntegral(1)+v*(x-Tr);};
}
function build(mult,mode){
  // mode 'contract': proposed per-character contract, physical velocityRamp idx 12 -> 43 (31 frames)
  // mode 'native'  : current V3 physics unchanged, START = 1.0 s from idx 0 (24 frames), sprite keeps playing (visual overrun to idx 41)
  const LEAD=+(process.env.LEAD||0); // visual lead (frames): the visual clip starts LEAD frames BEFORE the physical START window
  const cfg=mode==='contract'?{rampStart:12,rampEnd:43,decayEnd:43}:{rampStart:LEAD,rampEnd:24+LEAD,decayEnd:41};
  const D=model(mult,cfg),N=KEYS.length,anchor=KEYS.map((_,i)=>progressX(D(i)));
  const base=i=>{if(i<iPush)return 125;const u=Math.min(1,(i-iPush)/(cfg.decayEnd-iPush));return 125*(1-(2*u**3-u**4));};
  let C=KEYS.map((_,i)=>base(i));
  if(mode==='native'){const w=i=>{const u=Math.min(1,(i-iPush)/(cfg.decayEnd-iPush));return 1-(2*u**3-u**4);};
    for(let i=0;i<iPush;i++)C[i]=125-(anchor[i]-anchor[0])/SC;
    for(let i=iPush;i<N;i++)C[i]=base(i)-(anchor[iPush]-anchor[0])/SC*w(i);}
  const pos=c=>KEYS.map((k,i)=>anchor[i]-layout.spriteAnchorX+(META[k].cx+c[i])*SC);
  const hi=cfg.decayEnd;
  for(let pass=0;pass<2;pass++){   // derived envelope, 2 passes (W=9-frame box, 5-frame smoothing of the extra shift)
    const xs=pos(C),sm=smoothBox(xs,4);let env=[];for(let i=iPush;i<=hi;i++)env.push(sm[i]);
    for(let i=env.length-2;i>=0;i--)env[i]=Math.min(env[i],env[i+1]);env=env.map(x=>Math.max(x,sm[iPush]));
    const ex=env.map((x,k)=>x-sm[iPush+k]);ex[0]=0;ex[ex.length-1]=0;
    const exs=ex.map((_,i)=>{let a=0;for(let k=-2;k<=2;k++)a+=ex[Math.min(ex.length-1,Math.max(0,i+k))];return a/5;});exs[0]=0;exs[exs.length-1]=0;
    for(let k=0;k<exs.length;k++)C[iPush+k]+=exs[k]/SC;
  }
  const xs=pos(C),sm=smoothBox(xs,4);let rm=-1e9,give=0;for(let i=iPush;i<iPush+45;i++){rm=Math.max(rm,sm[i]);give=Math.max(give,rm-sm[i]);}
  const engineBefore=anchor[iPush]-anchor[0], tailStep=xs[hi+1]-xs[hi], d2=Math.abs((xs[hi+1]-xs[hi])-(xs[hi]-xs[hi-1]));
  return {C:C.slice(0,46).map(x=>+x.toFixed(2)),rollback_canvas_px:+give.toFixed(2),join_step_canvas_px:+(xs[visualJoin]-xs[visualJoin-1]).toFixed(2),
    step_after_decay_end_canvas_px:+tailStep.toFixed(2),second_difference_at_decay_end:+d2.toFixed(2),
    max_abs_shift_vs_base_src_px:+Math.max(...C.map((c,i)=>Math.abs(c-base(i)))).toFixed(1),
    engine_anchor_travel_before_push_off_canvas_px:+engineBefore.toFixed(2),cruise_speed_canvas_px_per_s:+(V00*mult*course).toFixed(1)};
}
const out={generated:'2026-10-14',note:'sprite shift arrays in SOURCE px (1276x720 frame), positive = move sprite right; idx 0 = first START frame (V1 f1); canvas px = src px * '+SC.toFixed(5),sprite_scale_canvas_per_src:SC,modes:{}};
for(const mode of ['contract','native']){out.modes[mode]={};for(const [k,m] of Object.entries(CATS))out.modes[mode][k]={speed_multiplier:m,...build(m,mode)};}
writeFileSync(new URL('./shift_arrays_lead'+(process.env.LEAD||0)+'.json',import.meta.url),JSON.stringify(out,null,1));
for(const mode of Object.keys(out.modes)){console.log('== '+mode);for(const [k,v] of Object.entries(out.modes[mode]))console.log(k.padEnd(10),JSON.stringify({...v,C:undefined}));}
