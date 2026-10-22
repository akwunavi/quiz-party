import {FPS,RACES,stateAt} from '../race-start-v3-lab/model.mjs';
import {visualRunFrame,sourceForCell} from '../run-phase-v3-lab/phase.mjs';
import {speedDogs} from './speed_profiles.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const a=JSON.parse(await readFile(path.join(root,'../roll-v3-lab/retiming.json'),'utf8'));
const b=JSON.parse(await readFile(path.join(root,'retiming.json'),'utf8'));
const expectedA=[...Array.from({length:113},(_,i)=>i+8),...Array(32).fill(null)];
const expectedB=[...Array(8).fill(null),...Array.from({length:121},(_,i)=>i),...Array(16).fill(null)];
const issues=[],profiles=[];
if(a.gameFrameToSource.length!==145||a.gameFrameToSource.some((v,i)=>v!==expectedA[i]))issues.push('Approved A frame map changed');
if(b.gameFrameToSource.length!==145||b.gameFrameToSource.some((v,i)=>v!==expectedB[i])||b.motionRetimed||b.scaleChanged)issues.push('B frame map/retiming differs from planned redistribution');
for(const dog of [RACES.A.dogs[3],...speedDogs]){
  const ix=dog.segments.findIndex(s=>s.kind==='ROLL'),[run,stop,roll,start,runAfter]=dog.segments.slice(ix-2,ix+3);
  const joins=[run.p1-stop.p0,stop.p1-roll.p0,roll.p1-start.p0,start.p1-runAfter.p0];
  const beforeSource=sourceForCell(visualRunFrame(run,run.t1-1/FPS));
  const states=[0,7,8,14,128,129,144].map(frame=>stateAt(dog,roll.t0+frame/FPS));
  if([run,stop,roll,start,runAfter].map(s=>s.kind).join(',')!=='RUN,STOP,ROLL,START,RUN'||
     beforeSource!==68||Math.abs(stop.t1-stop.t0-37/FPS)>1e-8||
     Math.abs(roll.t1-roll.t0-145/FPS)>1e-8||Math.abs(start.t1-start.t0-1)>1e-8||
     joins.some(x=>Math.abs(x)>1e-10)||states.some(s=>s.segment!=='ROLL'||s.speed!==0||Math.abs(s.progress-roll.p0)>1e-10))
    issues.push(`${dog.name}: Race V3 segment, phase or stationary progress mismatch`);
  profiles.push({name:dog.name,base:dog.base,preStopRunSource:beforeSource,
    stop:[stop.t0,stop.t1],roll:[roll.t0,roll.t1],restart:[start.t0,start.t1],
    rollProgress:roll.p0,positionDiscontinuities:joins,crossing:dog.crossing,complete:dog.complete});
}
const result={model:'Unmodified ../race-start-v3-lab/model.mjs',fps:FPS,
  maps:{A:{firstActive:0,lastActive:112,standAfter:32},B:{standBefore:8,sourceFirst:8,sourceLast:128,standAfter:16}},
  profiles,issues};
await writeFile(path.join(root,'verification.json'),JSON.stringify(result,null,2)+'\n');
if(issues.length)throw new Error(issues.join('\n'));
console.log('A unchanged; B 8+121+16=145; V3 preset and all five speed categories preserve event/start times, world anchor and RUN phase #68');
