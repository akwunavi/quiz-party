// Static validator of a character visual contract against the CURRENT V3 constants (parsed from dog4-v3-lab/model.mjs).
// Runs at asset-acceptance time. The runtime never truncates: a contract that fails here must not be integrated.
import {CANON,ACTION_WINDOW_FRAMES,FPS} from './canonical.mjs';
import {naturalFrames,naturalSeconds,sample} from './visual.mjs';
const EPS=1e-9;
const REQUIRED=['BASE','START','RUN','STOP','FINISH_DECELERATE','BUTTERFLY','ROLL','SNIFF_PEE','RETURN'];
const ACTIONS=['BUTTERFLY','ROLL','SNIFF_PEE'];
const OK_STATUS=/^(approved|reference|accepted_working)/;

export function validateContract(c){
  const errors=[],warnings=[],incomplete=[],fits={},info={};
  const err=m=>errors.push(m),warn=m=>warnings.push(m);
  const fps=c.fps??FPS,W=c.windows??{},clips=c.clips??{};
  if(fps!==FPS)err(`fps ${fps} != V3 FPS ${FPS}`);
  for(const k of REQUIRED)if(!W[k])err(`window '${k}' is not described (describe it or mark status:'missing')`);
  const [rmin,rmax]=c.limits?.retimeRateBounds??[1,1];
  const clipExists=n=>!!clips[n];
  // ---- references and samplers
  for(const [k,w] of Object.entries(W)){
    for(const f of ['clip','body','hold','pad']) if(w[f]&&!clipExists(w[f]))err(`window ${k}.${f} -> unknown clip '${w[f]}'`);
    if(w.tail&&!clipExists(w.tail.clip))err(`window ${k}.tail -> unknown clip '${w.tail.clip}'`);
  }
  for(const [n,s] of Object.entries(clips)){try{sample(s,0);}catch(e){err(`clip ${n}: ${e.message}`);}}
  // ---- placement rules of the four operations
  const stationary=k=>k==='BASE'||ACTIONS.includes(k)||k==='RETURN';
  const moving=k=>k==='START'||k==='RUN'||k==='STOP'||k==='FINISH_DECELERATE';
  for(const [k,w] of Object.entries(W)){
    if(w.pad&&!stationary(k))err(`${k}: pad is allowed only in stationary windows (a moving window cannot hold a pose)`);
    if(w.tail&&k!=='STOP'&&k!=='FINISH_DECELERATE')err(`${k}: tail is allowed only for STOP/FINISH_DECELERATE (continues into the next stationary window)`);
    if(w.lead!=null&&k!=='START')err(`${k}: lead is allowed only for START`);
    for(const [what,r] of [['rate',w.rate],['tail.rate',w.tail?.rate],...Object.entries(w.tailRateByNext??{}).map(([n,v])=>[`tailRateByNext.${n}`,v])]) if(r!=null&&(r<rmin-EPS||r>rmax+EPS))err(`${k}.${what}=${r} outside retime bounds [${rmin}, ${rmax}]`);
  }
  const lead=W.START?.lead??0;
  if(!Number.isInteger(lead)||lead<0)err(`START.lead must be a non-negative integer, got ${lead}`);
  if(c.keys&&lead>c.keys.releaseIdx)err(`START.lead ${lead} > releaseIdx ${c.keys.releaseIdx}: push-off would precede the physical START`);
  // ---- asset status: explicit, never silent
  for(const k of REQUIRED){
    const w=W[k];if(!w)continue;
    const used=[w.clip,w.body,w.hold].filter(Boolean);
    if(w.status==='missing'){incomplete.push({window:k,status:c.assetStatus?.[k]??'missing'});if(!c.assetStatus?.[k]?.startsWith('missing'))err(`${k}: status 'missing' must be declared in assetStatus`);continue;}
    if(w.mergeInto){info[k]=`merged into ${w.mergeInto}`;continue;}
    for(const u of used){const st=c.assetStatus?.[u];if(!st)err(`clip '${u}' has no assetStatus`);else if(!OK_STATUS.test(st)){incomplete.push({window:k,clip:u,status:st});warn(`${k}/${u}: ${st}`);}}
    if(w.provisional){incomplete.push({window:k,status:'provisional'});}
  }
  // ---- window fits (frames). Canonical windows come from V3; they are never read from the contract.
  const stopW=W.STOP,mv=stopW?.clip?clips[stopW.clip]:null;
  if(mv&&stopW?.clip){
    const secs=naturalFrames(mv)/(fps*(stopW.rate??1));
    fits.STOP_moving={naturalSeconds:+secs.toFixed(6),canonicalSeconds:+CANON.STOP.toFixed(6),ok:Math.abs(secs-CANON.STOP)<1e-6};
    if(!fits.STOP_moving.ok)err(`STOP moving part ${secs.toFixed(4)} s != canonical ${CANON.STOP.toFixed(4)} s (moving windows cannot be padded; retime or move the excess into a tail)`);
  }
  const tailNat=stopW?.tail&&clips[stopW.tail.clip]?naturalFrames(clips[stopW.tail.clip]):0;
  const tailFramesFor=k=>stopW?.tail?tailNat/(stopW.tailRateByNext?.[k]??stopW.tail.rate??1):0;
  const startFor=W.START?.clip?clips[W.START.clip]:null;
  if(startFor&&!W.START.spillFromStart&&!c.keys){      // reference style: START clip must equal the canonical START window
    const s=naturalSeconds(startFor)/(W.START.rate??1);fits.START={naturalSeconds:+s.toFixed(6),canonicalSeconds:CANON.START,ok:Math.abs(s-CANON.START)<1e-6};
    if(!fits.START.ok)err(`START clip ${s} s != canonical ${CANON.START} s`);
  }
  for(const k of ['BUTTERFLY','ROLL','SNIFF_PEE']){
    const w=W[k];if(!w){continue;}
    const win=ACTION_WINDOW_FRAMES[k];
    if(w.status==='missing'){fits[k]={verdict:'NO_CLIP'};continue;}
    const body=clips[w.body];if(!body)continue;                        // unknown clip already reported above
    const fr=naturalFrames(body)/(w.rate??1);
    if(!w.pad){           // no pad: the clip itself must equal the window (reference style)
      const secs=naturalSeconds(body)+(k==='SNIFF_PEE'&&W.RETURN&&!W.RETURN.mergeInto?naturalSeconds(clips[W.RETURN.body]):0);
      const canon=k==='SNIFF_PEE'?CANON.SNIFF+(W.RETURN&&!W.RETURN.mergeInto?CANON.RETURN:0):CANON[k];
      fits[k]={mode:'exact',naturalSeconds:+secs.toFixed(6),canonicalSeconds:+canon.toFixed(6),verdict:Math.abs(secs-canon)<1e-6?'FITS':'NO_FIT'};
      if(fits[k].verdict==='NO_FIT')err(`${k}: clip ${secs} s != canonical window ${canon} s and no pad is declared`);
      continue;
    }
    const tailFrames=tailFramesFor(k);
    const after={window:+win.toFixed(2),body:+fr.toFixed(2),stopTail:+tailFrames.toFixed(2),lead,sum:+(fr+tailFrames+lead).toFixed(2)};
    after.slack=+(win-after.sum).toFixed(2);after.verdict=after.slack>=-EPS?'FITS':'NO_FIT';
    const early={window:+win.toFixed(2),sum:+(fr+lead).toFixed(2)};early.slack=+(win-early.sum).toFixed(2);early.verdict=early.slack>=-EPS?'FITS':'NO_FIT';
    fits[k]={afterStop:after,earlyFromBase:early,verdict:after.verdict==='FITS'&&early.verdict==='FITS'?'FITS':'NO_FIT'};
    if(after.verdict==='NO_FIT'){after.requiredRateOverTailAndBody=+((fr+tailFrames)/(win-lead)).toFixed(4);err(`${k}: after STOP ${after.sum} frames > window ${after.window} (needs retime x${after.requiredRateOverTailAndBody} over tail+body, bounds [${rmin}, ${rmax}])`);}
    if(early.verdict==='NO_FIT')err(`${k}: early path does not fit (${early.sum} > ${early.window})`);
  }
  if(W.FINISH_DECELERATE?.tail&&clips[W.FINISH_DECELERATE.tail.clip]){
    const tf=naturalFrames(clips[W.FINISH_DECELERATE.tail.clip])/(W.FINISH_DECELERATE.tail.rate??1),win=CANON.BASE_FINISH*fps;
    fits.FINISH={tailFrames:tf,baseFrames:win,slack:+(win-tf).toFixed(2),verdict:tf<=win+EPS?'FITS':'NO_FIT'};
    if(fits.FINISH.verdict==='NO_FIT')err(`FINISH tail ${tf} frames > BASE ${win}`);
  }
  // ---- RUN phase at the physical STOP grid, derived lead
  if(c.run&&c.keys){
    const cyc=c.run.cycle,P=cyc.frames;
    if(Math.abs(P/fps-CANON.LOOP)>EPS)err(`RUN cycle ${P} frames = ${(P/fps).toFixed(4)} s != LOOP ${CANON.LOOP} s`);
    const k=c.keys,first=Math.round((CANON.START+CANON.RUN_JOIN)*fps);
    const runFrameAtIdx=idx=>{const n=k.runFrameAtJoin+(idx-k.visualJoinFirstRunIdx);return cyc.firstSrc+((((n-cyc.firstSrc)%P)+P)%P);};
    const want=c.run.stopEntry.previousRunFrame;let derived=null;
    for(let d=0;d<=k.releaseIdx;d++)if(runFrameAtIdx(first-1+d)===want){derived=d;break;}
    info.derivedLead=derived;info.runFrameBeforeFirstStopAtDeclaredLead=runFrameAtIdx(first-1+lead);
    if(derived!==lead)err(`declared lead ${lead} != derived lead ${derived} (RUN frame before first STOP would be #${runFrameAtIdx(first-1+lead)}, required #${want})`);
    const slots=[];for(let s=0;s<12;s++)slots.push(runFrameAtIdx(first-1+lead+s*P));
    if(!slots.every(f=>f===want))err(`STOP entry phase differs on later grid slots: ${slots.join(',')}`);
    const joinPhys=k.visualJoinFirstRunIdx-lead,avail=first-joinPhys;
    info.runFramesBeforeFirstStop=avail;if(avail<1)err(`visual join (phys frame ${joinPhys}) is not complete before the first STOP slot (frame ${first})`);
    const sc=clips[W.START.clip];
    if(sc?.labels){
      const lab=sc.labels[k.visualJoinFirstRunIdx];
      if(lab!==`run${k.runFrameAtJoin}`)err(`START table idx ${k.visualJoinFirstRunIdx} is '${lab}', expected run${k.runFrameAtJoin}`);
      const want_loop=Array.from({length:P},(_,i)=>`run${cyc.firstSrc+i}`);
      if(JSON.stringify(sc.loop)!==JSON.stringify(want_loop))err('START loop labels differ from the declared RUN cycle');
    }
  }
  const ok=errors.length===0;
  return {character:c.character,ok,errors,warnings,incomplete,fits,info};
}
