import {RACES,stateAt,FPS} from '../race-start-v3-lab/model.mjs';
import {speedDogs} from './speed_profiles.mjs';
import {visualRunFrame,sourceForCell} from '../run-phase-v3-lab/phase.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const edit=JSON.parse(await readFile(path.join(root,'retiming.json'),'utf8'));
const expected=[...Array.from({length:113},(_,i)=>i+8),...Array(32).fill(null)];
const issues=[],profiles=[];
if(edit.gameFrameToSource.length!==145||edit.gameFrameToSource.some((v,i)=>v!==expected[i])||edit.motionRetimed||edit.scaleChanged)
  issues.push('ROLL frame sequence or scale differs from approved source #8–120 plus stand');
for(const dog of [RACES.A.dogs[3],...speedDogs]){
  const segments=dog.segments,ix=segments.findIndex(s=>s.kind==='ROLL');
  const [run,stop,roll,start,runAfter]=segments.slice(ix-2,ix+3);
  const kinds=[run,stop,roll,start,runAfter].map(s=>s.kind);
  const lastRun=sourceForCell(visualRunFrame(run,run.t1-1/FPS));
  const progress=[stop.p1,roll.p0,roll.p1,start.p0];
  const joins=[run.p1-stop.p0,stop.p1-roll.p0,roll.p1-start.p0,start.p1-runAfter.p0];
  const sampled=[roll.t0,roll.t0+1,roll.t0+3,roll.t1-1/FPS].map(t=>stateAt(dog,t));
  if(kinds.join(',')!=='RUN,STOP,ROLL,START,RUN'||lastRun!==68||
    Math.abs(stop.t1-stop.t0-37/FPS)>1e-8||Math.abs(roll.t1-roll.t0-145/FPS)>1e-8||
    Math.abs(start.t1-start.t0-1)>1e-8||joins.some(n=>Math.abs(n)>1e-10)||
    sampled.some(s=>s.segment!=='ROLL'||s.speed!==0||Math.abs(s.progress-roll.p0)>1e-10)||
    progress.some(n=>Math.abs(n-progress[0])>1e-10))issues.push(`${dog.name}: timeline, RUN phase or position mismatch`);
  profiles.push({name:dog.name,base:dog.base,runToStopSource:lastRun,
    segments:{run:[run.t0,run.t1],stop:[stop.t0,stop.t1],roll:[roll.t0,roll.t1],start:[start.t0,start.t1],runAfter:[runAfter.t0,runAfter.t1]},
    joins,rollProgress:progress,rollSampledFrames:sampled.map(s=>s.frame),crossing:dog.crossing,complete:dog.complete});
}
const result={model:'Unmodified ../race-start-v3-lab/model.mjs',sourceRunPhase:'../run-phase-v3-lab/phase.mjs',fps:FPS,profiles,issues};
await writeFile(path.join(root,'verification.json'),JSON.stringify(result,null,2)+'\n');
if(issues.length)throw new Error(issues.join('\n'));
console.log('V3 preset and five speeds: RUN phase #68, STOP 37f, ROLL 145f, START 24f, stationary world anchor and continuous progress passed');
