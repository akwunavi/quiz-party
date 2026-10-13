// Diagnostic-only audit of the existing V3 model. Does not modify race logic.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {PRESETS,RACES,buildDog,stateAt,frameFor} from './model.mjs';
const seed=Number(process.argv[2]??20261013)>>>0,runs=Number(process.argv[3]??10000);
if(!Number.isInteger(runs)||runs<1)throw new Error('runs must be a positive integer');
function mulberry32(value){let a=value>>>0;return()=>{a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rng=mulberry32(seed),pick=(a,b)=>a+(b-a)*rng();
function eventKinds(count,stress,weights){
  const choose=()=>{const u=rng();return u<weights[0]?'BUTTERFLY':u<weights[0]+weights[1]?'ROLL':'SNIFF_PEE';};
  if(stress&&count===2&&rng()<.5){const kind=rng()<.5?'ROLL':'SNIFF_PEE';return [kind,kind];}
  return Array.from({length:count},choose);
}
function eventPositions(count){
  if(count===0)return [];
  if(count===1)return [pick(.18,.78)];
  if(count===3)return [pick(.18,.25),pick(.43,.50),pick(.70,.78)];
  let a,b;do{a=pick(.18,.78);b=pick(.18,.78);}while(Math.abs(a-b)<.22);
  return [a,b].sort((x,y)=>x-y);
}
function makeConfig(spec,index){
  const u=rng();let count=0;
  const probabilities=spec.countWeights??(spec.maxEvents===3?[.20,.45,.27,.08]:[.20,.45,.35]);
  let cumulative=0;for(let j=0;j<probabilities.length;j++){cumulative+=probabilities[j];if(u<cumulative){count=j;break;}}
  const kinds=eventKinds(count,spec.stress,spec.eventWeights??[.45,.35,.20]),positions=eventPositions(count);
  return {name:`sample ${index+1}`,base:pick(...spec.base),variations:Array.from({length:4},()=>pick(.98,1.02)),events:kinds.map((kind,i)=>[kind,positions[i]])};
}
const quantile=(a,q)=>{const x=[...a].sort((m,n)=>m-n),v=(x.length-1)*q,i=Math.floor(v);return x[i]+(x[Math.min(i+1,x.length-1)]-x[i])*(v-i);};
const average=a=>a.reduce((s,v)=>s+v,0)/a.length;
const round=(v,n=3)=>Number(v.toFixed(n));
function reachHalf(dog){
  const s=dog.segments.find(x=>x.p1>=.5-1e-12);assert.ok(s);
  let lo=s.t0,hi=s.t1;
  for(let k=0;k<30;k++){const mid=(lo+hi)/2;if(stateAt(dog,mid).progress>=.5)hi=mid;else lo=mid;}
  return hi;
}
function category(dog){
  if(!dog.events.length)return 'CLEAN';
  const unique=[...new Set(dog.events.map(x=>x[0]))];
  return unique.length===1?`${dog.events.length}x${unique[0]}`:'MIXED';
}
function simulate(spec,n){
  const wins=[],last=[],ends=[],gaps=[],close=[];
  const ranks=Array.from({length:5},()=>[0,0,0,0,0]);
  const categories={},losses={},counts={zero:0,one:0,two:0,three:0};
  let eligibleOne=0,winOne=0,eligibleTwo=0,winTwo=0,halfLocked=0,halfLeaderWon=0,repeatLast=0,repeatEligible=0,allStopped=0;
  let oneCleanPairs=0,oneBeatsCleanPairs=0,twoLowPairs=0,twoBeatsLowPairs=0;
  PRESETS.SIM={dogs:[]};
  for(let raceIndex=0;raceIndex<n;raceIndex++){
    const configs=Array.from({length:5},(_,i)=>makeConfig(spec,i));PRESETS.SIM.dogs=configs;
    const dogs=[0,1,2,3,4].map(i=>buildDog('SIM',i));
    const sorted=[...dogs].sort((a,b)=>a.crossing-b.crossing||a.index-b.index);
    for(let place=0;place<5;place++)ranks[sorted[place].index][place]++;
    wins.push(sorted[0].crossing);last.push(sorted[4].crossing);
    ends.push(Math.max(...dogs.map(d=>d.end)));const gap=sorted[1].crossing-sorted[0].crossing;gaps.push(gap);close.push(gap<1?1:0);
    const zero=dogs.some(d=>d.events.length===0),one=dogs.some(d=>d.events.length===1),two=dogs.some(d=>d.events.length===2),low=dogs.some(d=>d.events.length<=1);
    if(zero&&one){eligibleOne++;if(sorted[0].events.length===1)winOne++;}
    if(two&&low){eligibleTwo++;if(sorted[0].events.length===2)winTwo++;}
    for(const a of dogs)for(const b of dogs){
      if(a.events.length===1&&b.events.length===0){oneCleanPairs++;if(a.crossing<b.crossing)oneBeatsCleanPairs++;}
      if(a.events.length===2&&b.events.length<=1){twoLowPairs++;if(a.crossing<b.crossing)twoBeatsLowPairs++;}
    }
    const repeating=dogs.filter(d=>d.events.length===2&&d.events[0][0]===d.events[1][0]&&['ROLL','SNIFF_PEE'].includes(d.events[0][0]));
    if(repeating.length){repeatEligible++;if(repeating.includes(sorted[4]))repeatLast++;}
    const half=Math.min(...dogs.map(reachHalf));
    const atHalf=dogs.map(d=>stateAt(d,half));
    const halfLeader=atHalf.map((s,i)=>({i,p:s.progress})).sort((a,b)=>b.p-a.p||a.i-b.i)[0].i;
    if(halfLeader===sorted[0].index)halfLeaderWon++;
    const champion=sorted[0];
    if(dogs.filter(d=>d!==champion).every(d=>half+(1-atHalf[d.index].progress)/(1/42*d.base*Math.max(...d.variations))>champion.crossing+1))halfLocked++;
    const midpoints=dogs.flatMap(d=>d.segments.filter(s=>['BUTTERFLY','SNIFF_PEE','ROLL','RETURN'].includes(s.kind)).flatMap(s=>[s.t0,s.t1])).sort((a,b)=>a-b);
    if(midpoints.some((x,i)=>i&&dogs.every(d=>['BUTTERFLY','SNIFF_PEE','ROLL','RETURN'].includes(stateAt(d,(x+midpoints[i-1])/2).segment))))allStopped++;
    for(const d of dogs){
      counts[['zero','one','two','three'][d.events.length]]++;
      const c=category(d);categories[c]??={dogs:0,wins:0,last:0};categories[c].dogs++;if(d===sorted[0])categories[c].wins++;if(d===sorted[4])categories[c].last++;
      if(d.events.length){
        const cfg=configs[d.index],saved=cfg.events;cfg.events=[];const clean=buildDog('SIM',d.index).crossing;
        for(const e of saved){cfg.events=[e];const loss=buildDog('SIM',d.index).crossing-clean;const x=losses[e[0]]??={min:Infinity,max:-Infinity,sum:0,count:0};x.min=Math.min(x.min,loss);x.max=Math.max(x.max,loss);x.sum+=loss;x.count++;}
        cfg.events=saved;
      }
    }
  }
  delete PRESETS.SIM;
  return {runs:n,spec,meanWinner:round(average(wins)),meanLast:round(average(last)),medianEnd:round(quantile(ends,.5)),p90End:round(quantile(ends,.9)),p95End:round(quantile(ends,.95)),maxEnd:round(Math.max(...ends)),meanTopGap:round(average(gaps)),closeUnder1:round(average(close),4),oneWinsWithClean:{rate:round(winOne/eligibleOne,4),eligible:eligibleOne},twoWinsWithLow:{rate:eligibleTwo?round(winTwo/eligibleTwo,4):null,eligible:eligibleTwo},oneVsCleanPairRate:round(oneBeatsCleanPairs/oneCleanPairs,4),twoVsLowPairRate:twoLowPairs?round(twoBeatsLowPairs/twoLowPairs,4):null,halfLocked:round(halfLocked/n,4),halfLeaderWon:round(halfLeaderWon/n,4),allFiveStopped:round(allStopped/n,4),repeatLongLast:{rate:repeatEligible?round(repeatLast/repeatEligible,4):null,eligible:repeatEligible},eventCounts:counts,ranks,categories:Object.fromEntries(Object.entries(categories).map(([k,v])=>[k,{dogs:v.dogs,winRate:round(v.wins/v.dogs,4),lastRate:round(v.last/v.dogs,4)}])),losses:Object.fromEntries(Object.entries(losses).map(([k,v])=>[k,{min:round(v.min),mean:round(v.sum/v.count),max:round(v.max),samples:v.count}]))};
}
function fixedBaseline(){
  return Object.fromEntries(Object.entries(RACES).map(([key,race])=>[key,{crossings:race.dogs.map(d=>round(d.crossing)),order:race.places.map(i=>i+1),end:round(race.end),profiles:race.dogs.map(d=>({base:d.base,variations:d.variations,events:d.events}))}]));
}
function invariants(){
  let maxFrozenError=0,maxDerivativeError=0,frameGrid={};
  for(const [key,race] of Object.entries(RACES)){
    const forward=race.dogs.map(d=>buildDog(key,d.index).crossing);
    const reverse=[...race.dogs].reverse().map(d=>buildDog(key,d.index).crossing).reverse();assert.deepEqual(forward,reverse);
    for(const dog of race.dogs){
      assert.equal(dog.segments.filter(s=>s.kind==='START').length,dog.events.length+1);
      assert.equal(dog.segments.filter(s=>s.kind==='STOP').length,dog.events.length);
      for(let i=1;i<dog.segments.length;i++){assert.ok(Math.abs(dog.segments[i].t0-dog.segments[i-1].t1)<1e-8);assert.ok(Math.abs(dog.segments[i].p0-dog.segments[i-1].p1)<1e-8);}
      for(const s of dog.segments){
        if(['BASE','BUTTERFLY','SNIFF_PEE','ROLL','RETURN'].includes(s.kind)){
          maxFrozenError=Math.max(maxFrozenError,Math.abs(s.p1-s.p0));assert.equal(s.p0,s.p1);
        }
        if(['STOP','FINISH_DECELERATE','START'].includes(s.kind)){
          const a=stateAt(dog,s.t0+1e-6),m=stateAt(dog,(s.t0+s.t1)/2),b=stateAt(dog,s.t1-1e-6);
          assert.ok(a.progress<=m.progress&&m.progress<=b.progress);
          if(s.kind==='START')assert.ok(a.speed<m.speed&&m.speed<b.speed);
          else assert.ok(a.speed>m.speed&&m.speed>b.speed);
          const h=1e-4,derivative=(stateAt(dog,(s.t0+s.t1)/2+h).progress-stateAt(dog,(s.t0+s.t1)/2-h).progress)/(2*h);
          maxDerivativeError=Math.max(maxDerivativeError,Math.abs(derivative-m.speed));
        }
      }
      for(const e of dog.eventsActual){assert.equal(dog.segments.filter(s=>s.kind===e.kind&&s.eventIndex===dog.eventsActual.indexOf(e)).length,1);}
      assert.ok(Math.abs(stateAt(dog,dog.crossing).progress-1)<1e-7);
      assert.ok(dog.segments.find(s=>s.kind==='FINISH_DECELERATE').t0>=dog.crossing);
      assert.ok(stateAt(dog,race.end).complete);
    }
    for(const fps of [24,30,60,120]){
      const sampled=race.dogs.map(d=>Math.ceil((d.crossing-1e-9)*fps)/fps);
      sampled.forEach((time,i)=>{
        assert.ok(stateAt(race.dogs[i],time).progress>=1-1e-8);
        if(time>0)assert.ok(stateAt(race.dogs[i],time-1/fps).progress<1+1e-8);
      });
      const maxError=Math.max(...sampled.map((v,i)=>v-race.dogs[i].crossing));
      const order=sampled.map((t,i)=>({t,i})).sort((a,b)=>a.t-b.t||a.i-b.i).map(x=>x.i+1);
      frameGrid[`${key}/${fps}`]={maxDetectionError:round(maxError,5),sameOrder:order.every((x,i)=>x===race.places[i]+1)};
    }
  }
  assert.deepEqual(Object.values(fixedBaseline()).map(x=>x.order),[[4,1,2,3,5],[1,2,3,4,5],[1,2,3,4,5]]);
  const original=PRESETS.A.dogs[0].events;PRESETS.A.dogs[0].events=[['ROLL',.99]];
  const late=buildDog('A',0),lateStart=late.segments.find(s=>s.kind==='START'&&s.eventIndex===0);
  PRESETS.A.dogs[0].events=original;
  let lo=lateStart.t0,hi=lateStart.t1;
  for(let i=0;i<50;i++){const mid=(lo+hi)/2;if(stateAt(late,mid).progress>=1)hi=mid;else lo=mid;}
  return {maxFrozenError,maxDerivativeError:round(maxDerivativeError,9),frameGrid,lateEventReproducer:{requested:.99,actionProgress:round(late.eventsActual[0].actual,6),startP0:round(lateStart.p0,6),startP1:round(lateStart.p1,6),actualCrossing:round(hi,6),recordedCrossing:round(late.crossing,6),delay:round(late.crossing-hi,6),progressAtRecordedCrossing:round(stateAt(late,late.crossing).progress,6)}};
}
const configs={
  B:{base:[.96,1.16],maxEvents:3,stress:false},
  C:{base:[.94,1.23],maxEvents:3,stress:false},
  D:{base:[.96,1.16],maxEvents:2,stress:false},
  E:{base:[.96,1.16],maxEvents:2,stress:true},
  F:{base:[.94,1.23],maxEvents:1,stress:false,countWeights:[.20,.80],eventWeights:[.55,.35,.10]},
};
const result={seed,runsPerSyntheticConfig:runs,assumptions:{baseSpeed:1/42,segmentVariation:[.98,1.02],eventWeights:{BUTTERFLY:.45,ROLL:.35,SNIFF_PEE:.20},eventProgress:[.18,.78],minimumEventSeparation:.22,countWeightsMax3:[.20,.45,.27,.08],countWeightsMax2:[.20,.45,.35],stressRepeatChanceGivenTwo:.5},fixedV3:fixedBaseline(),invariants:invariants(),synthetic:{}};
for(const [key,spec] of Object.entries(configs)){result.synthetic[key]=simulate(spec,runs);console.error(key,'done',result.synthetic[key].meanWinner,result.synthetic[key].p95End);}
await writeFile(new URL('./balance_results.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log('Wrote balance_results.json',seed,runs);
