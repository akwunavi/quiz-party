// STOP V4 visual metadata PROPOSAL (not applied anywhere): per-category sprite shift for the STOP window, the constant
// shift of stationary windows (RACE_STAND / actions) and the rescaled START arrays. Physics is NOT changed: STOP stays 37/24 s.
// Clip in the STOP window: STOP V4 source k38..k73 (36 frames) + approved RACE_STAND as frame 37.
// Visual path = engine anchor path while the dog brakes (idx 0..11), then the visual speed is faded to 0 by idx 15 (= source k53,
// the first standing frame), so the standing dog does not creep while the anchor finishes its STOP. Units: SOURCE px (1276x720),
// positive = sprite right; canvas px = src * 207/1276.
// node build_stop_v4_metadata.mjs  ->  stop_v4_shift_arrays.json
import {readFileSync,writeFileSync} from 'node:fs';
const REPO=new URL('../../../',import.meta.url);
const layout=JSON.parse(readFileSync(new URL('dog4-v3-lab/layout.json',REPO),'utf8'));
const old=JSON.parse(readFileSync(new URL('bulldog1-frenk/race_v3_character_contract_proposal/shift_arrays_lead3.json',REPO),'utf8'));
const SC=layout.spriteWidth/1276, COURSE=layout.finishX-layout.startX+layout.finishControlOffset;
const STOP=37/24, N=37, BASE_SPEED=1/42;
const brakingIntegral=u=>u-u*u*u+.5*u*u*u*u, smooth=u=>u*u*(3-2*u);
const STAND_CX_SRC=733.39, STOP_END_CX_SRC=628.61;        // alpha centroids: approved RACE_STAND (working alpha) vs STOP V4 k73          // RACE_STAND (approved, 1276 frame) vs STOP V4 k73, alpha-centroid of the colour mask
const FADE_FROM=11, FADE_TO=15;
const ENTRY_OFFSET_SRC=628.64-649.15, ENTRY_FRAMES=8;      // alpha centroids RUN #97 vs STOP V4 k38: k38 starts where #97 would be, offset fades out over 8 frames                           // indices in the STOP window (k49 .. k53)
const out={generated:new Date().toISOString().slice(0,10),note:'PROPOSAL. Not part of the contract until accepted. See ../RESULT.md.',
  units:'source px of the 1276x720 frame; positive = sprite right',canvasPerSrc:SC,stopFrames:N,
  stopClip:['k38..k73 of DOG1_STOP_v4_kling_source.mp4','RACE_STAND'],fade:{from:FADE_FROM,to:FADE_TO},categories:{}};
for(const [cat,v] of Object.entries(old.modes.native)){
  const mult=v.speed_multiplier, D=COURSE*BASE_SPEED*mult*STOP/2;           // canvas px travelled by the anchor in STOP
  const anchor=i=>D*2*brakingIntegral(Math.min(1,i/N));
  // visual position: integrate anchor speed * w(t), w=1 before FADE_FROM, smooth fade to 0 at FADE_TO (fine steps)
  const vis=[0];let pos=0;const sub=200;
  for(let i=0;i<N-1;i++){for(let s=0;s<sub;s++){const f=i+(s+.5)/sub;const w=f<=FADE_FROM?1:f>=FADE_TO?0:1-smooth((f-FADE_FROM)/(FADE_TO-FADE_FROM));pos+=(anchor(i+(s+1)/sub)-anchor(i+s/sub))*w;}vis.push(pos);}
  const stop=vis.map((p,i)=>+((p-anchor(i))/SC+ENTRY_OFFSET_SRC*(1-smooth(Math.min(1,i/ENTRY_FRAMES)))).toFixed(2));
  const endShift=stop[N-2];                                  // k73 (idx 35) is the last STOP V4 frame
  const Cstat=+(endShift-(STAND_CX_SRC-STOP_END_CX_SRC)).toFixed(2);
  stop[N-1]=Cstat;                                          // idx 36 is the approved RACE_STAND image: same screen point as k73
  const k=(v.C[0]+Cstat)/v.C[0];
  out.categories[cat]={speedMultiplier:mult,anchorTravelCanvasPx:+D.toFixed(2),visualTravelCanvasPx:+vis[N-1].toFixed(2),
    stopShiftSrc:stop,stationaryShiftSrc:Cstat,startScale:+k.toFixed(4),startShiftSrc:v.C.map(c=>+(c*k).toFixed(2)),
    maxVisualSpeedCanvasPxPerFrame:+Math.max(...vis.slice(1).map((p,i)=>p-vis[i])).toFixed(3)};
}
writeFileSync(new URL('./stop_v4_shift_arrays.json',import.meta.url),JSON.stringify(out,null,1));
for(const [c,o] of Object.entries(out.categories))console.log(c,'anchor',o.anchorTravelCanvasPx,'visual',o.visualTravelCanvasPx,'stopEnd',o.stopShiftSrc.at(-1),'Cstat',o.stationaryShiftSrc,'START C0',o.startShiftSrc[0],'scale',o.startScale);
