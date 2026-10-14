// Regression suite T1-T10 for the P3 lab prototype. Every test returns {id,title,status,scope,details}.
// status: PASS | FAIL | PARTIAL | NOT_RUN. `scope` says exactly what the result does and does not prove.
import {readFileSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {RACES,stateAt,frameFor} from '../../dog4-v3-lab/model.mjs';
import {visualAt,timelineOf} from '../src/visual.mjs';
import {validateContract} from '../src/validator.mjs';
import {CANON} from '../src/canonical.mjs';
import {dog4Contract,frenkContract} from '../src/loader.mjs';
import {races,rng,deepFreeze,signature,cloneContract,clone,retimeVariant,framesMeta,categoryDogs,startWorldSeries,smoothBox,fmt,layout,SC,seedsOf,REPO} from './lib.mjs';
const here=u=>new URL(u,import.meta.url);

export function t1(N){
  const rs=races(N),before=rs.map(signature);
  rs.forEach(r=>r.dogs.forEach(d=>deepFreeze(d.segments)));                       // visual layer gets read-only data
  const d4=dog4Contract(),fr=frenkContract(),rnd=rng(11);let calls=0;
  for(const r of rs.slice(0,Math.min(N,2000)))for(const d of r.dogs)for(let i=0;i<60;i++){const t=rnd()*d.end;visualAt(d4,d.segments,t);visualAt(fr,d.segments,t);calls+=2;}
  const after=rs.map(signature);
  const mism=before.filter((s,i)=>s!==after[i]).length;
  // import graph: V3 lab files must not mention the P3 lab
  const v3dir=new URL('dog4-v3-lab/',REPO),bad=[];
  for(const f of readdirSync(v3dir).filter(f=>/\.(mjs|html)$/.test(f))){const s=readFileSync(new URL(f,v3dir),'utf8');if(/race-v3-p3-lab|visual\.mjs|character-visual/.test(s))bad.push(f);}
  const scen=readFileSync(new URL('dog4-v3-lab/scenario.mjs',REPO),'utf8')+readFileSync(new URL('dog4-v3-lab/model.mjs',REPO),'utf8');
  const charInPhysics=/character|contract|frenk/i.test(scen);
  let gitClean=null;
  try{const out=execFileSync('git',['status','--porcelain','--','dog4-v3-lab','docs/bulldog-race/APPROVED_RULES.md'],{cwd:new URL('.',REPO),encoding:'utf8'});gitClean=out.trim()==='';}catch{gitClean=null;}
  const ok=mism===0&&bad.length===0&&!charInPhysics&&gitClean!==false;
  return {id:'T1',title:'physics independent of characters / metadata',status:ok?'PASS':'FAIL',
    scope:'STRUCTURAL: segments/crossing/places/effectiveSeed hashes of real V3 races before vs after 2 contracts were applied to frozen (read-only) segments; V3 files do not import the lab; no character words in physics sources; V3 files unmodified in git. Does not exercise a model change (none exists).',
    details:{races:N,visualCalls:calls,signatureMismatches:mism,v3FilesReferencingLab:bad,characterWordsInPhysicsSources:charInPhysics,v3GitClean:gitClean}};
}

export function t2(){
  const c=dog4Contract();let n=0,bad=0,firstBad=null;const cmp=(label,d,t)=>{const a=stateAt(d,t),b=visualAt(c,d.segments,t);n++;if(a.clip!==b.clip||a.frame!==b.frame){bad++;firstBad??={label,t,legacy:[a.clip,a.frame],p3:[b.clip,b.frame]};}};
  const dogs=[];for(const [k,r] of Object.entries(RACES))r.dogs.forEach(d=>dogs.push([`preset ${k}/${d.index}`,d,1/96]));
  races(300).forEach((r,i)=>r.dogs.forEach(d=>dogs.push([`seed#${i}/${d.index}`,d,1/48])));
  for(const [label,d,step] of dogs){
    for(let t=-0.2;t<=d.end+0.2;t+=step)cmp(label,d,t);
    for(const s of d.segments)for(const e of [0,1e-12,-1e-12,1e-10,-1e-10,5e-10,-5e-10,2e-9,-2e-9])for(const b of [s.t0,s.t1])cmp(label+' boundary',d,b+e);
  }
  // every frame of every clip of every window is reachable and identical: probe each segment at all 24-fps ticks and half ticks
  return {id:'T2',title:'Bulldog 4 golden: P3 identity metadata == legacy frameFor/stateAt',status:bad===0?'PASS':'FAIL',
    scope:'Exact equality of [clip, frame] on 5 presets x 5 dogs (1/96 s grid) + 300 random races x 5 dogs (1/48 s grid) + every segment boundary +/- 5e-10..2e-9. Dog4 pixel output is not rendered (no Dog4 assets in this checkout).',
    details:{samples:n,mismatches:bad,firstMismatch:firstBad}};
}

export function t3(){
  const fr=frenkContract(),d4=dog4Contract(),rs=races(60),srcDir=here('../src/');
  const noClock=readdirSync(srcDir).every(f=>!/Date\.now|performance\.|Math\.random|requestAnimationFrame|setTimeout|setInterval|new Date/.test(readFileSync(new URL(f,srcDir),'utf8')));
  // order independence: same query set evaluated ascending / shuffled / descending with fresh timelines
  const rnd=rng(5);let calls=0,diff=0;
  for(const [name,c] of [['frenk',fr],['dog4',d4]])for(const r of rs.slice(0,40))for(const d of r.dogs.slice(0,2)){
    const ts=Array.from({length:300},()=>rnd()*d.end);
    const ev=(cc,order)=>{const m=new Map();for(const i of order)m.set(i,JSON.stringify(visualAt(cc,d.segments,ts[i])));return m;};
    const idx=ts.map((_,i)=>i),asc=[...idx].sort((a,b)=>ts[a]-ts[b]),desc=[...asc].reverse(),sh=[...idx].sort(()=>rnd()-.5);
    const A=ev(cloneContract(c),asc),B=ev(cloneContract(c),sh),C=ev(cloneContract(c),desc);
    for(const i of idx){calls++;if(A.get(i)!==B.get(i)||A.get(i)!==C.get(i))diff++;}
  }
  // tick robustness: frame at k/24 must not depend on how the float tick was produced (division, multiplication, accumulation)
  let tickBad=0,ticks=0;
  for(const r of rs.slice(0,30))for(const d of r.dogs.slice(0,2)){
    let acc=0;const dt=1/24;
    for(let k=0;k<Math.min(2000,Math.floor(d.end*24));k++){
      const forms=[k/24,k*dt,acc];acc+=dt;
      const res=forms.map(t=>JSON.stringify(visualAt(fr,d.segments,t)));ticks++;
      // physical window boundaries are floats of their own; compare only ticks strictly inside a 24-fps-aligned region by requiring all three forms agree
      if(res[0]!==res[1]||res[0]!==res[2])tickBad++;
    }
  }
  // sampling-grid invariance: value at t is a pure function of t (evaluate on 24/30/60/72/144 fps grids and compare against direct evaluation)
  let gridBad=0,gridN=0;
  for(const fps of [24,30,60,72,144])for(const r of rs.slice(0,8)){const d=r.dogs[0];for(let k=0;k*1/fps<d.end;k+=Math.max(1,Math.round(fps/12))){const t=k/fps;const a=JSON.stringify(visualAt(fr,d.segments,t)),b=JSON.stringify(visualAt(cloneContract(fr),d.segments,t));gridN++;if(a!==b)gridBad++;}}
  const ok=noClock&&diff===0&&gridBad===0&&tickBad===0;
  return {id:'T3',title:'independence from FPS / evaluation order',status:ok?'PASS':(tickBad>0&&diff===0&&gridBad===0&&noClock?'PARTIAL':'FAIL'),
    scope:'No clock/RNG/timer sources in lab src; results identical for ascending/shuffled/descending evaluation and for 5 sampling grids; frame at a 24-fps tick identical for 3 float constructions of the tick. A real renderer (rAF loop, interpolation) is not part of the lab, so rendering at different FPS is NOT exercised.',
    details:{noClockSources:noClock,orderCalls:calls,orderDiffs:diff,gridSamples:gridN,gridDiffs:gridBad,ticks,tickDiffs:tickBad}};
}

export function t4(N){
  const fr=frenkContract(),rs=races(N);let checked=0,bad=0,fin=0,first=null,tailBad=0;const byRunLen=new Map();
  for(const r of rs)for(const d of r.dogs){
    for(const s of d.segments){
      if(!(s.kind==='STOP'&&s.eventIndex>=0)&&s.kind!=='FINISH_DECELERATE')continue;
      const b=visualAt(fr,d.segments,s.t0-1e-6),a=visualAt(fr,d.segments,s.t0+1e-6),t=visualAt(fr,d.segments,s.t1+1e-6);
      checked++;if(s.kind==='FINISH_DECELERATE')fin++;
      const run=d.segments.find(x=>x.t1===s.t0&&x.kind==='RUN');if(run){const L=Math.round((run.t1-run.t0)*24);byRunLen.set(L,(byRunLen.get(L)||0)+1);}
      if(b.frame!=='run96'||a.frame!=='stop1'){bad++;first??={seed:r.effectiveSeed,lane:d.index,t:s.t0,before:b.frame,after:a.frame};}
      if(t.frame!=='stop38'||t.role!=='tail')tailBad++;
    }
  }
  const lens=[...byRunLen.keys()].sort((a,b)=>a-b);
  return {id:'T4',title:'phase: RUN frame before STOP == STOP entry, on every real STOP and FINISH',status:bad===0&&tailBad===0?'PASS':'FAIL',
    scope:'Real V3 races, Frenk contract applied to every lane. Checks label before STOP f1 = run96, first STOP frame = stop1, first tail frame = stop38. RUN lengths seen (frames) include the minimum 23.',
    details:{races:N,stopWindowsChecked:checked,ofWhichFinish:fin,phaseMismatches:bad,tailEntryMismatches:tailBad,firstMismatch:first,distinctRunLengthsFrames:lens.slice(0,8),minRunLengthFrames:lens[0]}};
}

export function t5(N){
  const fr=frenkContract(),rt=retimeVariant(fr),rs=races(N);
  const stat=()=>({windows:{},overflow:{},missing:0,padMinFrames:{}});
  const S={orig:stat(),retime:stat()};
  const kinds=['BUTTERFLY','SNIFF_PEE','ROLL','STOP','FINISH_DECELERATE'];
  for(const r of rs)for(const d of r.dogs)for(const [name,c] of [['orig',fr],['retime',rt]]){
    const items=timelineOf(c,d.segments),st=S[name];
    for(const it of items){
      if(it.role==='missing'){st.missing++;st.windows.ROLL=(st.windows.ROLL||0)+1;continue;}
      if(it.role==='body'&&it.window!=='START'&&it.window!=='RUN'){st.windows[it.window]=(st.windows[it.window]||0)+1;}
      if(it.overflow){const k=it.window+(it.role==='tail'?'(tail)':'');st.overflow[k]=(st.overflow[k]||0)+1;}
      if(it.role==='pad'){const f=(it.t1-it.t0)*24;st.padMinFrames[it.window]=Math.min(st.padMinFrames[it.window]??1e9,+f.toFixed(3));}
    }
  }
  // early vs after-stop BUTTERFLY counts
  let bfAfter=0,bfEarly=0,sniffAfter=0,sniffEarly=0;
  for(const r of rs)for(const d of r.dogs)for(const e of d.eventsActual){if(e.kind==='BUTTERFLY')(e.early?bfEarly++:bfAfter++);if(e.kind==='SNIFF_PEE')(e.early?sniffEarly++:sniffAfter++);}
  const origOver=Object.values(S.orig.overflow).reduce((a,b)=>a+b,0),rtOver=Object.values(S.retime.overflow).reduce((a,b)=>a+b,0);
  const v=validateContract(fr),vr=validateContract(rt);
  return {id:'T5',title:'no truncation: every clip fits its window',status:origOver===0?'PASS':'FAIL',
    scope:'FAIL is the honest result for the contract AS-IS: BUTTERFLY after STOP overflows by 11 frames at the original tempo. The tested retime variant (x1.0932) is reported separately and is NOT approved. ROLL has no Frenk clip: its windows are reported as MISSING_ASSET, not as a pass.',
    details:{races:N,lanes:N*5,eventCounts:{BUTTERFLY:{afterStop:bfAfter,early:bfEarly},SNIFF_PEE:{afterStop:sniffAfter,early:sniffEarly}},
      asIs:{overflowWindows:S.orig.overflow,missingAssetWindows:S.orig.missing,minPadFramesBySlot:S.orig.padMinFrames,validator:{ok:v.ok,errors:v.errors}},
      retimeVariantX1_0932_NOT_APPROVED:{overflowWindows:S.retime.overflow,missingAssetWindows:S.retime.missing,minPadFramesBySlot:S.retime.padMinFrames,validator:{ok:vr.ok,errors:vr.errors}}}};
}

export function t6(){
  const fr=frenkContract(),meta=framesMeta(fr),dogs=categoryDogs(),cats=['VERY_SLOW','SLOW','NORMAL','FAST','VERY_FAST'],res={};let worst=0,labelBad=0;
  dogs.forEach((d,i)=>{
    const s=startWorldSeries(fr,d,meta);let resid=0,raw=0;
    for(let k=1;k<=11;k++){resid=Math.max(resid,Math.abs(s[k].comp-s[k-1].comp));raw=Math.max(raw,Math.abs(s[k].anchor-s[k-1].anchor));}
    const tab=fr.clips.START.labels;for(const p of s)if(p.k<tab.length&&p.label!==tab[p.k]||p.localIdx!==p.k)labelBad++;
    res[cats[i]]={engineStepBeforePushOff_canvasPx_per_frame:fmt(raw),residualAfterShift_canvasPx_per_frame:fmt(resid,4)};worst=Math.max(worst,resid);
  });
  let stopNote={note:'results/stop_contact_analysis.json not generated (run analysis/stop_contacts.py)'};
  try{
    const j=JSON.parse(readFileSync(here('../results/stop_contact_analysis.json'),'utf8')),e=j.episodesByCategory.NORMAL,tail=e.filter(x=>x.phase==='tail'),win=e.filter(x=>x.phase==='window');
    stopNote={stanceEpisodesInWindow:win.length,windowFootSlideCanvasPx:win.map(x=>x.world_slide_canvas),tailFootSlideCanvasPx:tail.map(x=>x.world_slide_canvas),
      tailFootSlideTotalCanvasPx:+tail.reduce((a,x)=>a+Math.abs(x.world_slide_canvas),0).toFixed(1),finalSettleSpeedPxPerFrame:'4 -> 0 over frames 48-58',stationaryFromFrame:j.summary.stationaryFromFrame,
      runReferenceStanceFootSpeedPxPerFrame:j.runReference?.stanceFootLocalSpeed_canvasPx_per_frame??null,engineCruisePxPerFrame:j.cruisePxPerFrame_NORMAL,
      verdict:'STRICT FAIL: stance paws slide in the window (RUN-level) and keep sliding in the stationary tail (frames 39-40 and 48-58, ~29 px total); foot-lock shift would need ~129 px of body travel (leash 39 px)'};
  }catch(e){stopNote={error:String(e)};}
  return {id:'T6',title:'no sliding while the sprite stands (pre push-off) / paw contact',status:'PARTIAL',
    scope:'PASS only for the pre-push-off crouch (visual idx 0..11): residual ground step of anchor+shift <= 0.05 px/frame in all 5 categories, driven by visualAt on real V3 physics. Paw contact in STOP, the STOP tail and RUN is analysed separately (analysis/stop_contacts.py) and shows sliding that this contract does NOT remove; see STOP_CONTACT_REPORT.md.',
    details:{preCrouchStatus:worst<=0.05&&labelBad===0?'PASS':'FAIL',thresholdPxPerFrame:0.05,worstResidual:fmt(worst,4),labelMismatches:labelBad,perCategory:res,stopContactSummary:stopNote}};
}

export function t7(){
  const fr=frenkContract(),meta=framesMeta(fr),dogs=categoryDogs(),cats=['VERY_SLOW','SLOW','NORMAL','FAST','VERY_FAST'],lim=fr.limits,res={};let ok=true;
  dogs.forEach((d,i)=>{
    const s=startWorldSeries(fr,d,meta,52),xs=s.map(p=>p.x),sm=smoothBox(xs,4);let rm=-1e9,give=0;for(let k=12;k<12+45&&k<sm.length;k++){rm=Math.max(rm,sm[k]);give=Math.max(give,rm-sm[k]);}
    const step=xs[41]-xs[40],tail=xs[42]-xs[41];
    res[cats[i]]={rollbackPx:fmt(give,2),joinStepPx:fmt(step,2),stepAfterJoinPx:fmt(tail,2),labelAtJoin:[s[40].label,s[41].label]};
    if(give>lim.smoothedRollbackCanvasPx||Math.abs(step)>lim.joinStepCanvasPxAbs||s[40].label!=='g3f35'||s[41].label!=='run88')ok=false;
  });
  const R=JSON.parse(readFileSync(here('../../bulldog1-frenk/race_start_run_join_v1/analysis/flow_roughness_all.json'))).find(x=>x[0]===35&&x[1]===88)?.[2];
  return {id:'T7',title:'phase jumps at joins (START -> RUN #88)',status:ok?'PARTIAL':'FAIL',
    scope:'Computed metrics only (rollback <= 1 px, join step <= 2.7 px, join frames g3f35 -> run88, pair roughness as accepted by the architect). The visual (eye) acceptance has NOT been done; STOP -> action and action -> START joins are not measured here.',
    details:{limits:{rollback:lim.smoothedRollbackCanvasPx,step:lim.joinStepCanvasPxAbs},perCategory:res,pairFlowRoughness_f35_to_run88:R?fmt(R,1):null,roughnessNormReference:'10-11 (kit), original join 30.2'}};
}

export function t8(N){
  const rs=races(N).slice(0,Math.min(N,2000)),fr=frenkContract(),d4=dog4Contract(),before=rs.map(signature),rnd=rng(3);let calls=0,laneBad=0,wins=[0,0,0,0,0];
  for(const r of rs){
    wins[r.places[0]]++;
    for(let frLane=0;frLane<5;frLane++){for(const d of r.dogs){const c=d.index===frLane?fr:d4;for(let i=0;i<20;i++){visualAt(c,d.segments,rnd()*d.end);calls++;}}}
  }
  const after=rs.map(signature);const mism=before.filter((s,i)=>s!==after[i]).length;
  return {id:'T8',title:'no advantage from clip length (mixed lane assignment)',status:mism===0?'PASS':'FAIL',
    scope:'STRUCTURAL: results/places/crossing of V3 are unchanged for every placement of Frenk among Dog4 lanes. Win-rate per lane shown for information. The negative control (how much per-character physics WOULD change the odds) is in ../bulldog1-frenk/race_v3_character_contract_proposal/fairness_sim.',
    details:{races:rs.length,placementsPerRace:5,visualCalls:calls,signatureMismatches:mism,winsPerLane:wins}};
}

export function t9(N){
  const fr=frenkContract(),meta=framesMeta(fr),rs=races(N);
  let maxShift=0,maxDev=0;                                   // total shift (includes the constant stand-position offset of 125 src px) and deviation from that baseline
  const base=i=>i<12?125:125*(1-(2*Math.min(1,(i-12)/29)**3-Math.min(1,(i-12)/29)**4));
  for(const arr of Object.values(fr.shift.arrays))arr.forEach((v,i)=>{maxShift=Math.max(maxShift,Math.abs(v)*SC);maxDev=Math.max(maxDev,Math.abs(v-base(i))*SC);});
  const stopTailTravel=(meta.stop73.cx-meta.stop37.cx)*SC,stopTotal=(meta.stop73.cx-meta.stop1.cx)*SC;
  let crossings=0,bad=0,nonRun=0,maxShiftAtCross=0,first=null;
  for(const r of rs)for(const d of r.dogs){
    const v=visualAt(fr,d.segments,d.crossing);crossings++;
    const sh=Math.abs(v.shiftSrcPx??1e9)*SC;maxShiftAtCross=Math.max(maxShiftAtCross,sh);
    if(!String(v.frame).startsWith('run'))nonRun++;
    if(sh>0.5||!String(v.frame).startsWith('run')){bad++;first??={seed:r.effectiveSeed,lane:d.index,frame:v.frame,shiftPx:sh};}
  }
  const lim=fr.limits.maxVisualForwardOffsetCanvasPx;
  const ok=bad===0&&maxShift<=lim&&stopTailTravel<=lim;
  return {id:'T9',title:'leash and finish: visual offset bounded, zero at crossing',status:ok?'PASS':'FAIL',
    scope:'START shift arrays and the STOP tail baked body travel against the 39 px budget (smallest STOP-end-to-finish gap in 50,000 dog-runs = 3.34% of the course); at the analytic crossing time the sprite is in a RUN-loop frame with shift 0. STOP/tail shift is NOT defined (status UNDEFINED_NOT_BUILT), so the offset of the STOP tail is the clip own baked motion only.',
    details:{leashBudgetPx:lim,maxStartShiftTotalPx_includingConstantStandOffset:fmt(maxShift,2),maxStartShiftDeviationFromBaselinePx:fmt(maxDev,2),stopTailBakedForwardTravelPx:fmt(stopTailTravel,1),stopTotalBakedTravelPx:fmt(stopTotal,1),crossingsChecked:crossings,crossingsNotInRunLoop:nonRun,crossingViolations:bad,maxShiftAtCrossingPx:maxShiftAtCross,firstViolation:first}};
}

export function t10(){
  const d4=dog4Contract(),fr=frenkContract(),res={},fails=[];
  const rd4=validateContract(d4),rfr=validateContract(fr),rrt=validateContract(retimeVariant(fr));
  const mut=[
    ['wrong lead (2 instead of 3)',c=>{c.windows.START.lead=2;},/lead/],
    ['lead beyond push-off (13)',c=>{c.windows.START.lead=13;},/lead|push-off/],
    ['pad inside a moving window (START)',c=>{c.windows.START.pad='RACE_STAND';},/pad/],
    ['tail on an action window',c=>{c.windows.BUTTERFLY.tail={clip:'STOP_TAIL'};},/tail/],
    ['retime outside bounds (1.5)',c=>{c.windows.BUTTERFLY.rate=1.5;},/retime bounds/],
    ['RUN cycle of 13 frames',c=>{c.run.cycle.frames=13;},/cycle|LOOP/],
    ['window STOP removed',c=>{delete c.windows.STOP;},/STOP/],
    ['unknown clip reference',c=>{c.windows.BUTTERFLY.body='NOPE';},/unknown clip/],
    ['ROLL missing but not declared in assetStatus',c=>{delete c.assetStatus.ROLL;},/missing/],
    ['STOP moving part of 40 frames',c=>{c.clips.STOP.labels=[...c.clips.STOP.labels,'stopX','stopY','stopZ'];},/moving part|STOP moving/],
    ['asset status removed from a used clip',c=>{delete c.assetStatus.BUTTERFLY;},/assetStatus/],
    ['START join label shifted',c=>{c.keys.runFrameAtJoin=89;},/START table|lead/],
    ['FINISH tail longer than BASE',c=>{c.clips.STOP_TAIL.labels=[...c.clips.STOP_TAIL.labels,...c.clips.STOP_TAIL.labels.slice(0,5)];},/FINISH|tail/],
  ];
  const detected=[];
  for(const [name,f,re] of mut){const c=cloneContract(fr);f(c);const r=validateContract(c);const hit=!r.ok&&r.errors.some(e=>re.test(e));detected.push({fault:name,detected:hit,errors:r.errors.slice(0,2)});if(!hit)fails.push(name);}
  // Dog4 negative
  const c4=cloneContract(d4);c4.clips.BUTTERFLY.count=100;const r4=validateContract(c4);if(r4.ok)fails.push('Dog4 clip shorter than window');detected.push({fault:'Dog4 BUTTERFLY clip 100 frames without pad',detected:!r4.ok,errors:r4.errors.slice(0,1)});
  const ok=rd4.ok&&!rfr.ok&&rfr.errors.length===1&&rrt.ok&&fails.length===0;
  return {id:'T10',title:'contract validator',status:ok?'PASS':'FAIL',
    scope:'Dog4 identity metadata valid; Frenk as-is reports exactly one error (BUTTERFLY after STOP, -11 frames) plus incomplete assets; the x1.0932 variant validates; 14 injected faults all detected. The validator checks declarations and window arithmetic, not pixels.',
    details:{dog4:{ok:rd4.ok,errors:rd4.errors},frenkAsIs:{ok:rfr.ok,errors:rfr.errors,incompleteAssets:rfr.incomplete,warnings:rfr.warnings,derivedLead:rfr.info.derivedLead,fits:rfr.fits},frenkRetimeVariant:{ok:rrt.ok,errors:rrt.errors,fits:{BUTTERFLY:rrt.fits.BUTTERFLY}},injectedFaults:detected,undetectedFaults:fails}};
}
