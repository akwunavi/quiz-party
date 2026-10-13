// Regression and statistical validation for the isolated seeded race.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {PRESETS,buildDog,stateAt} from './model.mjs';
import {generateRace,planSeed,SEPARATION,MIN_SPACING} from './scenario.mjs';
const TARGET=Number(process.argv[2]??10000),FIRST=20261013;
const count={1:0,2:0,3:0},initial={},after={},types={},winsByCount={1:0,2:0,3:0},winsByLastSpeed={};
const winner=[],ends=[],gaps=[],attempts=[],crossingStates={RUN:0,START:0},failures=[];
let early=0,late=0,close=0,simultaneous=0,nearStarts=0,allStoppedAttempts=0,verticalAttempts=0,fitAttempts=0,seed=FIRST;
const mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
const quantile=(a,q)=>{const v=[...a].sort((x,y)=>x-y),p=(v.length-1)*q,i=Math.floor(p);return v[i]+(v[Math.min(i+1,v.length-1)]-v[i])*(p-i);};
const inc=(o,k)=>o[k]=(o[k]??0)+1;
function spans(d){return d.segments.filter(s=>['BUTTERFLY','ROLL','SNIFF_PEE','RETURN'].includes(s.kind));}
function check(r){
  assert.equal(r.dogs.length,5);
  assert.deepEqual(generateRace(r.seed).places,r.places);
  assert.deepEqual(generateRace(r.seed).dogs.map(d=>d.crossing),r.dogs.map(d=>d.crossing));
  const sorted=[...r.dogs].sort((a,b)=>a.crossing-b.crossing||a.index-b.index);
  assert.deepEqual(r.places,sorted.map(d=>d.index));
  const stationary=r.dogs.map(spans),edges=stationary.flat().flatMap(s=>[s.t0,s.t1]).sort((a,b)=>a-b);
  let hasSimultaneous=false;
  for(let k=1;k<edges.length;k++){
    const t=(edges[k-1]+edges[k])/2,active=stationary.map(ss=>ss.filter(s=>s.t0<t&&t<s.t1));
    assert.ok(active.some(ss=>!ss.length),'all five dogs stationary in actions');
    for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)for(const a of active[i])for(const b of active[j])
      assert.ok(Math.abs(a.p0-b.p0)>=SEPARATION-1e-9,'vertical stopped pair');
    if(active.filter(x=>x.length).length>=2)hasSimultaneous=true;
  }
  if(hasSimultaneous)simultaneous++;
  const starts=r.dogs.flatMap(d=>d.eventsActual.map(e=>({lane:d.index,t:e.actionStart,p:e.actual})));
  if(starts.some((a,i)=>starts.some((b,j)=>j>i&&a.lane!==b.lane&&Math.abs(a.t-b.t)<=1&&Math.abs(a.p-b.p)>=SEPARATION)))nearStarts++;
  for(const d of r.dogs){
    assert.ok(d.events.length>=1&&d.events.length<=3);
    assert.ok(d.events.filter(e=>e[0]==='SNIFF_PEE').length<=1);
    assert.equal(d.eventsActual.length,d.events.length);
    assert.ok(d.events.every((e,i)=>i===0||e[1]-d.events[i-1][1]>=MIN_SPACING-1e-10));
    assert.ok(Math.abs(stateAt(d,d.crossing).progress-1)<1e-7);
    assert.ok(stateAt(d,d.crossing-1e-5).progress<1);
    assert.ok(d.segments.some(s=>s.kind==='FINISH_DECELERATE'&&s.t0>=d.crossing));
    assert.ok(stateAt(d,r.end).complete);
    for(let j=1;j<d.segments.length;j++){
      const a=d.segments[j-1],b=d.segments[j];
      assert.ok(Math.abs(a.t1-b.t0)<1e-8&&Math.abs(a.p1-b.p0)<1e-8,'time or position discontinuity');
      assert.ok(b.p1>=b.p0-1e-9,'backwards position');
    }
    for(const s of d.segments)if(['BUTTERFLY','ROLL','SNIFF_PEE','RETURN','BASE'].includes(s.kind))assert.equal(s.p0,s.p1);
    for(const e of d.eventsActual){
      if(e.early){early++;assert.equal(e.stopStart,null);}
      else assert.ok(Math.abs(e.actual-e.desired)<.02,'unreported event-position shift');
      if(e.desired>=.95)late++;
      assert.ok(e.actual<1);
    }
    inc(count,d.events.length);inc(initial,d.initialCategory);
    d.afterCategories.forEach(c=>inc(after,c));d.events.forEach(e=>inc(types,e[0]));
    const seg=d.segments.find(s=>s.p0<1&&s.p1>=1);if(seg)inc(crossingStates,seg.kind);
    for(const fps of [24,30,60,120]){
      const sampled=Math.ceil((d.crossing-1e-9)*fps)/fps;
      assert.ok(stateAt(d,sampled).progress>=1-1e-8);
      assert.ok(stateAt(d,sampled-1/fps).progress<1+1e-8);
    }
  }
  const champion=sorted[0];inc(winsByCount,champion.events.length);
  inc(winsByLastSpeed,champion.afterCategories.at(-1));
  winner.push(champion.crossing);ends.push(r.end);const gap=sorted[1].crossing-champion.crossing;gaps.push(gap);if(gap<1)close++;
  attempts.push(r.attempt);verticalAttempts+=r.rejections.vertical;allStoppedAttempts+=r.rejections.allStopped;fitAttempts+=r.rejections.fit;
}
assert.ok(Number.isSafeInteger(TARGET)&&TARGET>0);
// Targeted regressions use a temporary diagnostic preset, never production.
for(const p of [.001,.95,.99]){
  PRESETS.LATE={dogs:[{name:'late',base:1.25,variations:[1,1,1,1],afterBases:[1.25],events:[['ROLL',p]]}]};
  const d=buildDog('LATE',0),s=d.segments.find(s=>s.p0<1&&s.p1>=1);
  assert.ok(d.eventsActual.length===1&&Math.abs(stateAt(d,d.crossing).progress-1)<1e-7);
  if(p===.001)assert.ok(d.eventsActual[0].early&&d.segments.filter(s=>s.kind==='STOP').length===0);
  if(p===.99)assert.equal(s.kind,'START');
}
delete PRESETS.LATE;
for(;winner.length<TARGET;seed++){
  try{check(generateRace(seed));}
  catch(e){
    if(e.message.startsWith('Unable to schedule')){failures.push({seed,error:e.message.split(' [')[0]});continue;}
    throw new Error(`seed ${seed}: ${e.stack}`);
  }
  if(winner.length%1000===0)console.log(`validated ${winner.length}/${TARGET}, seeds through ${seed}`);
}
const result={runs:TARGET,firstSeed:FIRST,lastAcceptedSeed:seed-1,rejectedSeeds:failures.length,rejectionExamples:failures.slice(0,10),
  counts:count,initialSpeeds:initial,afterSpeeds:after,eventTypes:types,winsByEventCount:winsByCount,winsByFinalSpeed:winsByLastSpeed,
  meanWinner:mean(winner),medianWinner:quantile(winner,.5),medianEnd:quantile(ends,.5),p95End:quantile(ends,.95),maxEnd:Math.max(...ends),
  meanFirstSecondGap:mean(gaps),closeFinishesUnderOneSecond:close/TARGET,earlyEvents:early,lateEventsAtOrBeyond95Percent:late,
  racesWithSimultaneousDifferentPlaceEvents:simultaneous,racesWithActionStartsWithinOneSecondAtDifferentPlaces:nearStarts,
  positionAttempts:attempts.reduce((s,v)=>s+v,0),maxPositionAttempts:Math.max(...attempts),
  rejectedPositionAttempts:{vertical:verticalAttempts,allFiveStationary:allStoppedAttempts,fit:fitAttempts},crossingStates};
await writeFile(new URL('./random_results.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
