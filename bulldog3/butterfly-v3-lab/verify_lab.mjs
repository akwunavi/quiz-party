import {RACES,stateAt,FPS} from '../race-start-v3-lab/model.mjs';
import {speedDogs} from '../run-phase-v3-lab/speed_scenarios.mjs';
import {visualRunFrame,sourceForCell} from '../run-phase-v3-lab/phase.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const retiming=JSON.parse(await readFile(path.join(root,'retiming.json'),'utf8'));
const dogs=[RACES.A.dogs[1],...speedDogs],issues=[],profiles=[];
if(retiming.gameFrameToSource.length!==121||retiming.leadStandFrames+retiming.tailStandFrames+93!==121)
  issues.push('BUTTERFLY atlas does not occupy exactly 121 V3 cells');
if(retiming.gameFrameToSource.filter(n=>n!==null).some((n,i)=>n!==12+i))
  issues.push('Source motion is not continuous 12..104');
for(const dog of dogs){
  const action=dog.segments.find(s=>s.kind==='BUTTERFLY');
  const ix=dog.segments.indexOf(action),stop=dog.segments[ix-1],start=dog.segments[ix+1];
  const run=dog.segments[ix-2];
  const lastRun=sourceForCell(visualRunFrame(run,run.t1-1/FPS));
  const actionStart=stateAt(dog,action.t0),actionEnd=stateAt(dog,action.t1-1/FPS);
  const startStart=stateAt(dog,start.t0);
  const continuity=[stop.p1-action.p0,action.p1-start.p0];
  if(lastRun!==68||stop.kind!=='STOP'||start.kind!=='START'||
     Math.abs((stop.t1-stop.t0)-37/FPS)>1e-8||
     Math.abs((action.t1-action.t0)-121/FPS)>1e-8||
     Math.abs((start.t1-start.t0)-1)>1e-8||
     continuity.some(x=>Math.abs(x)>1e-10)||actionStart.frame!==0||actionEnd.frame!==120||
     actionStart.progress!==actionEnd.progress||startStart.progress!==actionEnd.progress)
    issues.push(`${dog.name}: model event, phase or progress mismatch`);
  profiles.push({name:dog.name,base:dog.base,runToStopSource:lastRun,
    stop:{t0:stop.t0,t1:stop.t1,frames:37},butterfly:{t0:action.t0,t1:action.t1,frames:121,worldStart:actionStart.progress,worldEnd:actionEnd.progress},
    restart:{t0:start.t0,t1:start.t1,frames:24},worldDiscontinuities:continuity});
}
const result={model:'unaltered Race V3 stateAt from ../race-start-v3-lab/model.mjs',fps:FPS,profiles,issues};
await writeFile(path.join(root,'verification.json'),JSON.stringify(result,null,2)+'\n');
if(issues.length)throw new Error(issues.join('\n'));
console.log('Actual Race V3 A event and five speed profiles: phase, 37/121/24-frame windows and world continuity passed.');
