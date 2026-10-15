// Full-chain test timeline: RUN -> STOP V4 -> RACE_STAND -> SNIFF_PEE V3.2 -> RACE_START (f35->RUN#88, lead 3) -> RUN.
// Physics: unmodified dog4-v3-lab/model.mjs (canonical windows, STOP 37/24); one lane, NORMAL speed (base 1.0), one SNIFF_PEE event.
// Visual: unmodified P3 visualAt with an IN-MEMORY copy of the Frenk contract where STOP = STOP V4 (k38..k73 + RACE_STAND, no tail);
// sprite shifts from ../metadata/stop_v4_shift_arrays.json (PROPOSAL). Writes ./chain_timeline.json and ./frenk.contract.stopv4.proposal.json.
import {readFileSync,writeFileSync} from 'node:fs';
const R=new URL('../../../',import.meta.url);
const {buildDog,stateAt,PRESETS}=await import(new URL('dog4-v3-lab/model.mjs',R));
const {visualAt}=await import(new URL('race-v3-p3-lab/src/visual.mjs',R));
const {loadContract}=await import(new URL('race-v3-p3-lab/src/loader.mjs',R));
const {validateContract}=await import(new URL('race-v3-p3-lab/src/validator.mjs',R));
const layout=JSON.parse(readFileSync(new URL('dog4-v3-lab/layout.json',R),'utf8'));
const meta=JSON.parse(readFileSync(new URL('../metadata/stop_v4_shift_arrays.json',import.meta.url),'utf8'));
const COURSE=layout.finishX-layout.startX+layout.finishControlOffset, px=p=>layout.startX+p*COURSE;
const MODE=process.env.MODE||'v4';                          // v4 = proposal; v1 = accepted contract as is (STOP v1 + tail, old shifts) for before/after
const c=loadContract(new URL('race-v3-p3-lab/characters/frenk.contract.json',R).href);
if(MODE==='v4'){
const STOP_LABELS=[...Array.from({length:36},(_,i)=>`v4k${38+i}`),'RACE_STAND'];
c.clips.STOP={sampler:'table',fps:24,labels:STOP_LABELS}; delete c.clips.STOP_TAIL;
delete c.windows.STOP.tail; c.windows.FINISH_DECELERATE={clip:'STOP',provisional:true};
c.assetStatus.STOP='proposal: STOP V4 k38-k73 + RACE_STAND (37 frames = canonical STOP), working alpha';
delete c.assetStatus.STOP_TAIL; c.assetStatus.FINISH_DECELERATE='provisional: reuse of STOP V4, not approved (FINISH not started)';
c.assetStatus.SNIFF_PEE='working: V3.2 EVENT (200 frames), working alpha';
c.shift.stopStatus='proposal: bulldog1-frenk/stop_v4/metadata/stop_v4_shift_arrays.json';
}
const v=validateContract(c);
const saved=JSON.parse(JSON.stringify(c)); delete saved.shift.arrays; delete saved.shift.scaleCanvasPerSrc;
saved.role+=' | STOP V4 PROPOSAL copy, not the accepted contract'; saved.shift.stopArraysFile='../../bulldog1-frenk/stop_v4/metadata/stop_v4_shift_arrays.json';
if(MODE==='v4')writeFileSync(new URL('./frenk.contract.stopv4.proposal.json',import.meta.url),JSON.stringify(saved,null,1));
PRESETS.CHAIN={name:'chain',dogs:[{name:'frenk',base:1.0,variations:[1,1,1,1],events:[[process.env.EVENT||'SNIFF_PEE',.35]]}]};
const dog=buildDog('CHAIN',0), seg=dog.segments;
const FIN=process.env.FOCUS==='finish';
const stop=FIN?seg.find(s=>s.kind==='FINISH_DECELERATE'):seg.find(s=>s.kind==='STOP');
const st2=FIN?{t1:seg.at(-1).t1-1.5}:seg.find(s=>s.kind==='START'&&s.t0>stop.t0);
const cat='NORMAL';
const M=MODE==='v4'?meta.categories[cat]:{stopShiftSrc:[0],stationaryShiftSrc:0,startShiftSrc:c.shift.arrays[cat]};
const ticks=[];
for(let k=0;;k++){
  const t=stop.t0-1.25+k/24; if(t>st2.t1+1.5)break;
  const s=stateAt(dog,t+1e-7),vv=visualAt(c,seg,t+1e-7);
  let shift=0,src='run';
  if((vv.window==='STOP'||vv.window==='FINISH_DECELERATE')&&vv.role!=='start'){shift=M.stopShiftSrc[Math.min(vv.localIdx,M.stopShiftSrc.length-1)];src='stop';}
  else if(vv.shiftStatus==='array'){shift=M.startShiftSrc[Math.min(vv.localIdx,M.startShiftSrc.length-1)];src='start';}
  else if(['BASE','SNIFF_PEE','RETURN','BUTTERFLY','ROLL'].includes(vv.window)){shift=M.stationaryShiftSrc;src='stationary';}
  ticks.push({k,t:+t.toFixed(5),tRel:+(t-stop.t0).toFixed(4),x:px(s.progress),phys:s.segment,window:vv.window,role:vv.role,label:vv.frame,idx:vv.localIdx,shiftSrc:shift,shiftKind:src,status:vv.status});
}
const tag=(process.env.EVENT&&process.env.EVENT!=='SNIFF_PEE'?'_'+process.env.EVENT:'')+(FIN?'_finish':'');
writeFileSync(new URL(MODE==='v4'?`./chain_timeline${tag}.json`:`./chain_timeline_v1_before${tag}.json`,import.meta.url),JSON.stringify({category:cat,layout,segments:seg.map(s=>({kind:s.kind,t0:s.t0,t1:s.t1})),validator:v,ticks}));
console.log('validator ok',v.ok,'errors',v.errors,'fits',JSON.stringify(v.fits));
console.log('ticks',ticks.length,'segments',seg.map(s=>s.kind+':'+(s.t1-s.t0).toFixed(2)).join(' '));

