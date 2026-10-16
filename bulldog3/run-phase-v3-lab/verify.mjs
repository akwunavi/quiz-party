import {RACES,stateAt,frameFor,FPS} from '../race-start-v3-lab/model.mjs';
import {speedDogs} from './speed_scenarios.mjs';
import {runCells,skipAfterCells,visualRunFrame,sourceForCell} from './phase.mjs';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const report={fps:FPS,races:{},fiveSpeedCategories:[],issues:[]};
for(const [preset,race] of Object.entries(RACES)){
  const dogs=[];
  for(const dog of race.dogs){
    const runs=[];
    for(const [ix,segment] of dog.segments.entries()){
      if(segment.kind!=='RUN')continue;
      const n=runCells(segment),skips=skipAfterCells(segment);
      const displayed=Array.from({length:n},(_,i)=>sourceForCell(visualRunFrame(segment,segment.t0+i/FPS)));
      const oldLast=sourceForCell(frameFor(segment,segment.t1-1/FPS)[1]);
      const unchangedIntro=displayed.slice(0,23).every((s,i)=>s===sourceForCell(i<11?i:11+(i-11)%12));
      const last=displayed.at(-1),lastChange=n-1-skips.at(-1);
      const actual=stateAt(dog,segment.t1-1/FPS);
      const next=dog.segments[ix+1];
      if(n<155||skips.length!==6||oldLast!==62||last!==68||lastChange<24||!unchangedIntro||!['STOP','FINISH_DECELERATE'].includes(next.kind))
        report.issues.push(`${preset}/${dog.index} RUN ${ix}: incorrect schedule/seam`);
      for(let i=1;i<n;i++){
        if(i<11)continue;
        const delta=(displayed[i]-displayed[i-1]+12)%12;
        if(![1,2].includes(delta))report.issues.push(`${preset}/${dog.index} RUN ${ix}: phase reversal at ${i}`);
      }
      if(Math.abs(actual.progress-stateAt(dog,segment.t1-1/FPS).progress)>1e-12)report.issues.push('model progress changed');
      runs.push({cells:n,stopAt:segment.t1,stopKind:next.kind,oldLastSource:oldLast,newLastSource:last,
        skipAfterCells:skips,lastSkipFramesBeforeStop:lastChange,unchangedIntro,
        lastWorldProgress:actual.progress});
    }
    dogs.push({index:dog.index,base:dog.base,crossing:dog.crossing,complete:dog.complete,runs});
  }
  report.races[preset]={places:race.places,dogs};
}
for(const dog of speedDogs){
  const seams=[];
  for(const [i,segment] of dog.segments.entries()){
    const s=stateAt(dog,segment.t1-1/FPS),next=stateAt(dog,segment.t1);
    const gap=Math.abs(segment.p1-dog.segments[i+1]?.p0||0);
    if(gap>1e-10)report.issues.push(`${dog.name}: world progress discontinuity ${segment.kind}`);
    seams.push({from:segment.kind,to:dog.segments[i+1]?.kind??null,worldGap:gap});
  }
  const runs=dog.segments.filter(s=>s.kind==='RUN').map(s=>({cells:runCells(s),lastSource:sourceForCell(visualRunFrame(s,s.t1-1/FPS)),skips:skipAfterCells(s)}));
  report.fiveSpeedCategories.push({name:dog.name,base:dog.base,seams,runs});
}
await writeFile(path.join(root,'verification.json'),JSON.stringify(report,null,2)+'\n');
if(report.issues.length)throw new Error(report.issues.join('\n'));
console.log(`Verified ${Object.values(report.races).flatMap(r=>r.dogs.flatMap(d=>d.runs)).length} real V3 RUN segments and five speed categories; all stop entrances source #68.`);
