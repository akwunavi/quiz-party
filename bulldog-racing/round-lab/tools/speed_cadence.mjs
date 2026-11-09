// Частота смены ячеек RUN (кадров/с игрового времени), скорость по трассе и длина шага (px экрана 1920) на сиде 1 при D=30/42/60. Запуск: node speed_cadence.mjs
import {readFileSync} from 'node:fs';
import path from 'node:path';
const REPO='/home/user/wt-codex/',LIBD=REPO+'bulldog-racing/assets/dogs/';
const J=p=>JSON.parse(readFileSync(p,'utf8'));
const {loadRaceV3}=await import(REPO+'bulldog-racing/round-lab/src/raceV3.mjs');
const {createVisual}=await import(REPO+'bulldog-racing/runtime/dog_visual.mjs');
const {visualAt,categoryOf}=await import(REPO+'race-v3-p3-lab/src/visual.mjs');
const phase=await import(LIBD+'rocky/runtime/phase_v2.mjs');
const IDS=['frenk','zefir','rocky','pups','luna'];
const vis=Object.fromEntries(IDS.map(id=>{const c=J(LIBD+id+'/contract/'+id+'.contract.json'),a=J(LIBD+id+'/atlas/atlas.json'),e={};
 if(id==='frenk')e.startArrays=J(LIBD+id+'/contract/frenk_start_shift_arrays.json'),e.stopMeta=J(LIBD+id+'/contract/frenk_stop_v4_shift_arrays.json');
 if(id==='zefir')e.stopList=J(LIBD+id+'/atlas/stopB_montage_list.json');if(id==='luna')e.stopShift=J(LIBD+id+'/contract/stop_shift.json');if(id==='rocky')e.phase=phase;
 return [id,createVisual(id,{contract:c,atlas:a,extras:e},{visualAt,categoryOf})];}));

for(const D of [30,42,60]){const V3=await loadRaceV3(D);const race=V3.resolveRace(1);
 const res={};
 race.dogs.forEach((dog,i)=>{const id=IDS[i],v=vis[id];let changes=0,tRun=0,prev=null,dist=0,t0=null;
  for(let t=0;t<race.end;t+=1/240){ // дискретизируем плотно, считаем смены ячейки RUN-окна
   const s=V3.stateAt(dog,t);const x=v.at(dog.segments,t+1e-9);
   if(s.segment==='RUN'){const key=x.sheet+':'+x.index;if(prev!==null&&key!==prev)changes++;prev=key;tRun+=1/240;}else prev=null;}
  const run=dog.segments.filter(s=>s.kind==='RUN');let px=0,sec=0;run.forEach(s=>{px+=(s.p1-s.p0)*1170;sec+=s.t1-s.t0;});
  res[id]={cellsPerSec:+(changes/tRun).toFixed(2),speedPxPerSec:+(px/sec).toFixed(1),strideLenPx:+(px/sec*0.5).toFixed(1),base:dog.base};});
 console.log('D',D,JSON.stringify(res));}
