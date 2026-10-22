import {RACES,stateAt,FPS} from '../race-start-v3-lab/model.mjs';
import {speedDogs} from './speed_profiles.mjs';
import {visualRunFrame,sourceForCell} from '../run-phase-v3-lab/phase.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const map=JSON.parse(await readFile(path.join(root,'retiming.json'),'utf8')).gameFrameToSource;
const expected=[...Array(121).keys(),...Array.from({length:48},(_,i)=>119-i),...Array.from({length:8},(_,i)=>7-i),...Array(63).fill(null)];
const issues=[],profiles=[];
if(map.length!==240||map.some((n,i)=>n!==expected[i]))issues.push('Alpha atlas differs from approved f28ecee montage frame order');
for(const dog of [RACES.A.dogs[2],...speedDogs]){
  const a=dog.segments.find(s=>s.kind==='SNIFF_PEE'),ix=dog.segments.indexOf(a);
  const [run,stop,ret,start,runAfter]=[dog.segments[ix-2],dog.segments[ix-1],dog.segments[ix+1],dog.segments[ix+2],dog.segments[ix+3]];
  const lastRun=sourceForCell(visualRunFrame(run,run.t1-1/FPS));
  const joins=[run.p1-stop.p0,stop.p1-a.p0,a.p1-ret.p0,ret.p1-start.p0,start.p1-runAfter.p0];
  const kinds=[run.kind,stop.kind,a.kind,ret.kind,start.kind,runAfter.kind];
  const before=stateAt(dog,a.t0),mid=stateAt(dog,ret.t0),after=stateAt(dog,start.t0);
  const visualAt=t=>Math.max(0,Math.min(239,Math.floor((t-a.t0)*FPS+1e-7)));
  const boundaryVisual={first:visualAt(a.t0),lastSniff:visualAt(a.t1-1e-7),firstReturn:visualAt(ret.t0),lastReturn:visualAt(ret.t1-1e-7)};
  if(kinds.join(',')!=='RUN,STOP,SNIFF_PEE,RETURN,START,RUN'||lastRun!==68||
     Math.abs((stop.t1-stop.t0)-37/FPS)>1e-8||
     Math.abs((a.t1-a.t0)-7.260416666666666)>1e-8||
     Math.abs((ret.t1-ret.t0)-2.720833333333333)>1e-8||
     Math.abs((start.t1-start.t0)-1)>1e-8||
     joins.some(x=>Math.abs(x)>1e-10)||
     before.progress!==mid.progress||mid.progress!==after.progress||
     boundaryVisual.first!==0||boundaryVisual.lastReturn!==239)
    issues.push(`${dog.name}: V3 seam, window, phase or world-position mismatch`);
  profiles.push({name:dog.name,base:dog.base,runToStopSource:lastRun,
    segments:{stop:[stop.t0,stop.t1],sniff:[a.t0,a.t1],return:[ret.t0,ret.t1],restart:[start.t0,start.t1]},
    progress:{before:before.progress,returnStart:mid.progress,start:after.progress},
    progressDiscontinuities:joins,visualAtBoundary:boundaryVisual,
    crossing:dog.crossing,complete:dog.complete});
}
const result={model:'Unmodified Race V3 buildDog/stateAt in ../race-start-v3-lab/model.mjs',sourceRunPhase:'../run-phase-v3-lab/phase.mjs',fps:FPS,profiles,issues};
await writeFile(path.join(root,'verification.json'),JSON.stringify(result,null,2)+'\n');
if(issues.length)throw new Error(issues.join('\n'));
console.log('Actual V3 preset and five speeds: 37-frame STOP, 7.2604s SNIFF, 2.7208s RETURN, 24-frame START, phase #68 and progress continuity passed');
