import assert from 'node:assert/strict';
import {writeFile,readFile} from 'node:fs/promises';
import {PRESETS,buildDog,stateAt} from './model.mjs';
import {generateRace,resolveRace,RaceScheduleError,SEPARATION,MIN_SPACING} from './scenario.mjs';
const START=20261013,N=Number(process.argv[2]??10000);
const accepted=resolveRace(START),direct=generateRace(START);
assert.equal(accepted.requestedSeed,START);assert.equal(accepted.effectiveSeed,START);assert.equal(accepted.candidatesChecked,1);
assert.deepEqual(accepted.dogs.map(d=>d.crossing),direct.dogs.map(d=>d.crossing));
const missing=20261423,chosen=resolveRace(missing),next=generateRace(missing+1);
assert.equal(chosen.requestedSeed,missing);assert.equal(chosen.effectiveSeed,missing+1);
assert.equal(chosen.candidatesChecked,2);assert.equal(chosen.rejectedCandidates[0].code,'POSITION_EXHAUSTED');
assert.deepEqual(chosen.dogs.map(d=>d.crossing),next.dogs.map(d=>d.crossing));
assert.deepEqual(resolveRace(missing).dogs.map(d=>d.crossing),chosen.dogs.map(d=>d.crossing));
assert.throws(()=>resolveRace(missing,{maxCandidates:1}),e=>e instanceof RaceScheduleError&&e.code==='NO_ADMISSIBLE_SCENARIO'&&e.details.candidatesChecked===1&&e.details.rejectedCandidates[0].seed===missing);
const count={1:0,2:0,3:0},initial={},after={},types={},effectiveSeen=new Set(),fallbacks=[];
const inc=(o,k)=>o[k]=(o[k]??0)+1;
for(let requested=START;requested<START+N;requested++){
  const r=resolveRace(requested);effectiveSeen.add(r.effectiveSeed);
  if(r.effectiveSeed!==requested)fallbacks.push({requestedSeed:requested,effectiveSeed:r.effectiveSeed,candidatesChecked:r.candidatesChecked,reasons:r.rejectedCandidates.map(x=>x.code)});
  assert.equal(r.candidatesChecked,r.effectiveSeed-requested+1);
  assert.equal(r.rejectedCandidates.length,r.candidatesChecked-1);
  assert.equal(r.dogs.length,5);assert.equal(r.places.length,5);
  for(const d of r.dogs){
    assert.ok(d.events.length>=1&&d.events.length<=3);
    assert.ok(d.events.filter(x=>x[0]==='SNIFF_PEE').length<=1);
    assert.ok(d.events.every((x,i)=>!i||x[1]-d.events[i-1][1]>=MIN_SPACING-1e-10));
    assert.ok(Math.abs(stateAt(d,d.crossing).progress-1)<1e-7);
    assert.ok(stateAt(d,r.end).complete);
    for(let i=0;i<d.events.length;i++){
      const start=d.segments.find(s=>s.kind==='START'&&s.eventIndex===i);
      assert.equal(start.base,d.afterBases[i]);
      assert.ok(stateAt(d,start.t0).speed<1e-9);
      assert.ok(stateAt(d,start.t1-1e-5).speed>0);
      assert.equal(d.segments.filter(s=>s.kind==='STOP'&&s.eventIndex===i).length,d.eventsActual[i].early?0:1);
    }
    for(let j=1;j<d.segments.length;j++)assert.ok(Math.abs(d.segments[j].p0-d.segments[j-1].p1)<1e-8);
    inc(count,d.events.length);inc(initial,d.initialCategory);d.afterCategories.forEach(x=>inc(after,x));d.events.forEach(x=>inc(types,x[0]));
  }
  const spans=r.dogs.map(d=>d.segments.filter(s=>['BUTTERFLY','ROLL','SNIFF_PEE','RETURN'].includes(s.kind)));
  for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)for(const a of spans[i])for(const b of spans[j])
    if(Math.max(a.t0,b.t0)<Math.min(a.t1,b.t1)-1e-9)assert.ok(Math.abs(a.p0-b.p0)>=SEPARATION-1e-9);
  const edges=spans.flat().flatMap(x=>[x.t0,x.t1]).sort((a,b)=>a-b);
  for(let j=1;j<edges.length;j++){const t=(edges[j-1]+edges[j])/2;assert.ok(spans.some(ss=>!ss.some(s=>s.t0<t&&t<s.t1)));}
  if((requested-START+1)%1000===0)console.log(`resolved ${requested-START+1}/${N}`);
}
PRESETS.LATE={dogs:[{name:'late',base:1.25,variations:[1,1,1,1],afterBases:[1.25],events:[['ROLL',.99]]}]};
const late=buildDog('LATE',0);delete PRESETS.LATE;
assert.equal(late.segments.find(s=>s.p0<1&&s.p1>=1).kind,'START');
assert.ok(Math.abs(stateAt(late,late.crossing).progress-1)<1e-7);
for(const fps of [24,30,60,120])assert.ok(stateAt(late,Math.ceil(late.crossing*fps)/fps).progress>=1);
const baseline=JSON.parse(await readFile(new URL('./random_results.json',import.meta.url)));
const asRate=(obj,total)=>Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v/total]));
const differences={};for(const [name,observed,reference] of [['counts',count,baseline.counts],['initialSpeeds',initial,baseline.initialSpeeds],['afterSpeeds',after,baseline.afterSpeeds],['eventTypes',types,baseline.eventTypes]]){
  const sum=a=>Object.values(a).reduce((s,v)=>s+v,0),o=asRate(observed,sum(observed)),b=asRate(reference,sum(reference));
  differences[name]=Object.fromEntries(Object.keys(o).map(k=>[k,Number(((o[k]-b[k])*100).toFixed(4))]));
  assert.ok(Object.values(differences[name]).every(x=>Math.abs(x)<.2),`${name} distribution drift over 0.2 percentage points`);
}
const result={requestedRaces:N,firstRequestedSeed:START,lastRequestedSeed:START+N-1,uniqueEffectiveSeeds:effectiveSeen.size,
  fallbackCount:fallbacks.length,maxCandidatesChecked:Math.max(1,...fallbacks.map(x=>x.candidatesChecked)),fallbackExamples:fallbacks.slice(0,10),
  eventCounts:count,initialSpeeds:initial,afterSpeeds:after,eventTypes:types,differenceFromPreviousAcceptedSampleInPercentagePoints:differences,
  preservedValidSeed:START,rejectedExample:{requestedSeed:chosen.requestedSeed,effectiveSeed:chosen.effectiveSeed,candidatesChecked:chosen.candidatesChecked,
    reason:chosen.rejectedCandidates[0].reason},lateStartCrossing:late.crossing};
await writeFile(new URL('./fallback_results.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
