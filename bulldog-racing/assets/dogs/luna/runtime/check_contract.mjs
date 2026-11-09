// Luna draft contract vs the UNCHANGED Race V3 / P3 code: validateContract + a T4-style sweep over real V3 races
// (RUN frame before every STOP and FINISH must be run71 and the STOP must start at its first label), plus where START begins (lead).
// usage: node check_contract.mjs CONTRACT.json N OUT.json   (reads ../../../race-v3-p3-lab and ../../../dog4-v3-lab, writes nothing there)
import {readFileSync,writeFileSync} from 'node:fs';
import {validateContract} from '../../../race-v3-p3-lab/src/validator.mjs';
import {visualAt} from '../../../race-v3-p3-lab/src/visual.mjs';
import {races} from '../../../race-v3-p3-lab/tests/lib.mjs';
const [,,cf,N,out]=process.argv;const c=JSON.parse(readFileSync(cf));
const v=validateContract(c);
let stops=0,fin=0,bad=0,first=null,startChecks=0,startBad=0,firstStart=null;
for(const r of races(+N))for(const d of r.dogs){
  for(const s of d.segments){
    if(s.kind==='START'){startChecks++;const pre=visualAt(c,d.segments,s.t0-7/24+1e-6),at=visualAt(c,d.segments,s.t0+1e-6);
      if(pre.frame!=='run18'||at.frame!=='run25'){startBad++;firstStart??={t:s.t0,pre:pre.frame,at:at.frame};}}
    if(!(s.kind==='STOP'&&s.eventIndex>=0)&&s.kind!=='FINISH_DECELERATE')continue;
    const b=visualAt(c,d.segments,s.t0-1e-6),a=visualAt(c,d.segments,s.t0+1e-6);stops++;if(s.kind==='FINISH_DECELERATE')fin++;
    if(b.frame!=='run71'||a.frame!==c.clips[c.windows.STOP.clip].labels[0]){bad++;first??={t:s.t0,before:b.frame,after:a.frame};}
  }
}
const res={validator:{ok:v.ok,errors:v.errors,info:v.info,incomplete:v.incomplete},sweep:{races:+N,stopsAndFinishes:stops,ofWhichFinish:fin,phaseMismatches:bad,firstMismatch:first,
  startsChecked:startChecks,startLeadMismatches:startBad,firstStartMismatch:firstStart}};
writeFileSync(out,JSON.stringify(res,null,1));console.log(JSON.stringify(res,null,1).slice(0,2500));
