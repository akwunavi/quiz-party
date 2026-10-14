// Read-only feasibility check of the PROPOSED character visual contract against the CURRENT V3 constants.
// Changes nothing in V3. Run: node contract_check.mjs   (writes contract_check_results.json)
import {readFileSync,writeFileSync} from 'node:fs';
const FPS=24, EPS=1e-9;
const here=u=>new URL(u,import.meta.url);
const contract=JSON.parse(readFileSync(here('./frenk_visual_contract.example.json')));
const layout=JSON.parse(readFileSync(here('../../dog4-v3-lab/layout.json')));
const model=readFileSync(here('../../dog4-v3-lab/model.mjs'),'utf8');
const ev=e=>{if(!/^[0-9+\-*/(). ]+$/.test(e))throw new Error('bad expr '+e);return Function('return ('+e+')')();};
const grab=(name)=>{const m=model.match(new RegExp('(?:const|let)\\s[^;]*?\\b'+name+'=([^,;\\n]+)'));if(!m)throw new Error('constant '+name+' not found');return ev(m[1]);};
const C={START:grab('START'),STOP:grab('STOP'),RUN_JOIN:grab('RUN_JOIN'),LOOP:grab('LOOP'),BUTTERFLY:grab('BUTTERFLY'),ROLL:grab('ROLL'),SNIFF:grab('SNIFF'),RETURN:grab('RETURN')};
const out={canonical:C,checks:{}};
const fail=[];const ok=(name,cond,info)=>{out.checks[name]={pass:!!cond,...info};if(!cond)fail.push(name);};
// 0. asserted canonical constants == real V3 constants
ok('canonical_matches_V3',Math.abs(C.START-1)<EPS&&Math.abs(C.STOP-37/24)<EPS&&Math.abs(C.RUN_JOIN-23/24)<EPS&&Math.abs(C.LOOP-.5)<EPS&&Math.abs(C.BUTTERFLY-121/24)<EPS&&Math.abs(C.ROLL-145/24)<EPS,{});
// 1. RUN phase at the physical STOP grid, derived lead
const cyc=contract.run.cycle, P=cyc.frames;
ok('run_period_equals_LOOP',Math.abs(P/FPS-C.LOOP)<EPS,{periodFrames:P});
const k=contract.START.keys, firstStopPhys=Math.round((C.START+C.RUN_JOIN)*FPS);       // physical frame (0 = physical START begin) of first STOP
const runFrameAtIdx=idx=>{const n=k.runFrameAtJoin+(idx-k.visualJoinFirstRunIdx);return cyc.firstSrc+(((n-cyc.firstSrc)%P)+P)%P;};
const want=contract.run.stopEntry.previousRunFrame;
const leadFor=d=>runFrameAtIdx(firstStopPhys-1+d);                               // visual idx = physical frame + lead
let lead=null;for(let d=0;d<=contract.START.lead.max;d++)if(leadFor(d)===want){lead=d;break;}
const table=Array.from({length:13},(_,d)=>({lead:d,runFrameBeforeFirstStop:leadFor(d)}));
ok('lead_found_and_matches_contract',lead===contract.START.lead.frames,{derivedLead:lead,contractLead:contract.START.lead.frames,frameBeforeFirstStopAtLead0:leadFor(0),table});
// 1b. all subsequent grid slots k*12 frames later: same phase
const slots=[];for(let s=0;s<12;s++)slots.push(runFrameAtIdx(firstStopPhys-1+lead+s*P));
ok('every_grid_slot_has_stop_entry_phase',slots.every(f=>f===want),{slots});
// 1c. visual join must complete before the first STOP: RUN frames available before STOP at the first slot
const joinPhys=k.visualJoinFirstRunIdx-lead, runFramesBeforeStop=firstStopPhys-joinPhys;
ok('join_before_first_stop',runFramesBeforeStop>=1,{joinPhysFrame:joinPhys,runFramesBeforeFirstStop:runFramesBeforeStop,firstStopPhysFrame:firstStopPhys});
// 2. pre-push-off engine drift (canvas px) for START curve u^3-u^4/2 and category speeds
const course=layout.finishX-layout.startX+layout.finishControlOffset, V0=course/42;
const drift=(mult,tau)=>V0*mult*(tau**3-.5*tau**4)*C.START;     // START=1 s: v*START/2*2*(u^3-u^4/2)
const cats={VERY_SLOW:.75,SLOW:.88,NORMAL:1,FAST:1.12,VERY_FAST:1.25};
const prePush=(d)=>Object.fromEntries(Object.entries(cats).map(([n,m])=>[n,+drift(m,Math.max(0,(k.releaseIdx-d)/FPS)).toFixed(2)]));
const budget=contract.limits.maxPrePushOffsetCanvasPx;
ok('pre_push_drift_within_budget_at_lead',Math.max(...Object.values(prePush(lead)))<=budget,{budget,atLead0:prePush(0),atLead:prePush(lead),courseCanvasPx:course});
// 3. window fit: tail + body + lead <= canonical window (stationary windows); moving windows need rate within bounds
const [rmin,rmax]=contract.limits.retimeRateBounds;
const win={BUTTERFLY:C.BUTTERFLY*FPS,ROLL:C.ROLL*FPS,SNIFF_PEE:(C.SNIFF+C.RETURN)*FPS};
const tail=contract.STOP.plan.tail.frames, tailN=tail[1]-tail[0]+1, stopIn=contract.STOP.plan.inWindow, stopInN=stopIn[1]-stopIn[0]+1;
ok('STOP_moving_part_equals_canonical_window',stopInN===Math.round(C.STOP*FPS),{movingFrames:stopInN,canonicalFrames:C.STOP*FPS});
const fits={};
for(const [name,a] of Object.entries(contract.ACTIONS)){
  if(!a){fits[name]={status:'NO_CLIP'};continue;}
  const w=win[name],body=a.bodyFrames;
  const afterStop={window:+w.toFixed(2),body,stopTail:tailN,lead,sum:body+tailN+lead,slack:+(w-(body+tailN+lead)).toFixed(2)};
  afterStop.requiredRate=afterStop.slack>=0?1:+((body+tailN)/(w-lead)).toFixed(3);  // >1 = faster than natural
  afterStop.verdict=afterStop.slack>=0?'FITS':(afterStop.requiredRate<=rmax?'FITS_WITH_RETIME':'NO_FIT');
  const early={window:+w.toFixed(2),body,lead,slack:+(w-(body+lead)).toFixed(2)};early.verdict=early.slack>=0?'FITS':'NO_FIT';
  fits[name]={afterStop,earlyFromBase:early};
}
const fin={window_frames:Math.round(C.STOP*FPS)+36,clip:73};fin.slack=fin.window_frames-fin.clip;fin.verdict=fin.slack>=0?'FITS':'NO_FIT';
fits.FINISH_DECELERATE_plus_BASE=fin;
out.windowFit=fits;
ok('no_NO_FIT_verdicts',!JSON.stringify(fits).includes('NO_FIT'),{note:'FITS_WITH_RETIME entries need an eye test of the retimed segment'});
// 4. alternatives for the #93/#96 mismatch (reported, not asserted)
const R=JSON.parse(readFileSync(here('../race_start_run_join_v1/analysis/flow_roughness_all.json')));
const best={};for(let d=0;d<=8;d++){let b=null;for(const [f,m,r] of R){const idx=m+(firstStopPhys-1+d)-(f+6);const fr=cyc.firstSrc+((((idx-cyc.firstSrc)%P)+P)%P);if(fr===want&&(!b||r<b.roughness))b={pair:`g3f${f} -> RUN #${m}`,roughness:+r.toFixed(1)};}best[d]={...b,prePushOffsetNormalCanvasPx:prePush(d).NORMAL};}
out.bestJoinPairByLead=best;
out.alternatives={retimeInsteadOfLead:{joinIdxNeeded:k.visualJoinFirstRunIdx-lead,gallopFramesCompressed:`${k.visualJoinFirstRunIdx-k.releaseIdx} -> ${k.visualJoinFirstRunIdx-lead-k.releaseIdx}`,rate:+((k.visualJoinFirstRunIdx-k.releaseIdx)/(k.visualJoinFirstRunIdx-lead-k.releaseIdx)).toFixed(3)},
  rateSlewInsideRunAtFirstSlot:{extraFramesNeeded:(want-runFrameAtIdx(firstStopPhys-1)+P)%P,availableFrames:firstStopPhys-k.visualJoinFirstRunIdx,rate:+(1+((want-runFrameAtIdx(firstStopPhys-1)+P)%P)/Math.max(1,firstStopPhys-1-k.visualJoinFirstRunIdx)).toFixed(2)}};
out.failed=fail;writeFileSync(here('./contract_check_results.json'),JSON.stringify(out,null,1));
console.log(JSON.stringify({failed:fail,lead,fits,bestJoinPairByLead:best,alternatives:out.alternatives,prePush:{lead0:prePush(0),lead:prePush(lead)}},null,1));
process.exit(fail.length?1:0);
