// Тесты фазировки RUN Рокки (phase_v2.mjs). Запуск из корня репозитория: node --test bulldog-racing/tests/rocky_phase.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import path from 'node:path';import {fileURLToPath} from 'node:url';
const REPO=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const R=p=>path.join(REPO,'bulldog-racing/assets/dogs/rocky/runtime',p);
const P2=await import(R('phase_v2.mjs')),P1=await import(R('phase.mjs'));
const {races}=await import(path.join(REPO,'race-v3-p3-lab/tests/lib.mjs'));
const {visualAt,categoryOf}=await import(path.join(REPO,'race-v3-p3-lab/src/visual.mjs'));
const {createVisual}=await import(path.join(REPO,'bulldog-racing/runtime/dog_visual.mjs'));
const seg=n=>({t0:3,t1:3+n/24});
const lens=(from,to)=>{const a=[];for(let n=from;n<=to;n+=12)a.push(n);return a;};           // все длины V3: n = 23 + 12m
const seqOf=(P,n)=>Array.from({length:n},(_,i)=>P.visualRunFrame(seg(n),3+i/24+1e-6));
const loopIdx=c=>(c-11)%12;

test('длинные пробеги (>=155) побайтно совпадают с принятым phase.mjs',()=>{
  for(const n of lens(155,2003))assert.deepEqual(seqOf(P2,n),seqOf(P1,n),'n='+n);
});
test('перед STOP всегда исходный #68 — для всех длин V3 от 23 до 2003',()=>{
  for(const n of lens(23,2003)){const s=seqOf(P2,n);assert.equal(P2.sourceForCell(s.at(-1)),68,'n='+n);}
});
test('ячейки 0-10 (принятый START→RUN) не тронуты, пропуски только после ячейки 11',()=>{
  for(const n of lens(23,400)){const s=seqOf(P2,n);for(let i=0;i<=11&&i<n;i++)assert.equal(s[i],i,`n=${n} cell ${i}`);}
});
test('нет повторов и застывших лап: каждый шаг +1 кадр цикла, пропуск +2; ровно 6 пропусков, между ними >= 2 ячеек',()=>{
  for(const n of lens(23,700)){const s=seqOf(P2,n),skips=[];
    for(let i=11;i<n-1;i++){const d=((loopIdx(s[i+1])-loopIdx(s[i]))%12+12)%12;assert.ok(d===1||d===2,`n=${n} i=${i} шаг ${d}`);if(d===2)skips.push(i);}
    assert.equal(skips.length,6,'n='+n);for(let k=1;k<6;k++)assert.ok(skips[k]-skips[k-1]>=2,`n=${n} gap`);}
});
test('граница 143/155: схема T1 для 107..143 даёт #68 и не отличается по виду от длинных',()=>{
  for(const n of [107,119,131,143,155,167]){assert.match(P2.skipPlan(n).tier,/^T1/);}
  for(const n of [143,155]){const s=seqOf(P2,n);let m=0;for(let i=11;i<n-1;i++)if(((loopIdx(s[i+1])-loopIdx(s[i]))%12+12)%12===2)m++;assert.equal(m,6);}
});
test('кадры не выдуманы: каждая ячейка 0..22 существует, STOP не затронут',()=>{
  for(const n of lens(23,400))for(const c of seqOf(P2,n))assert.ok(Number.isInteger(c)&&c>=0&&c<23);
});
test('2500 реальных гонок V3: перед каждым STOP/FINISH — #68, физика не тронута',()=>{
  const c=JSON.parse(readFileSync(path.join(REPO,'bulldog-racing/assets/dogs/rocky/contract/rocky.contract.json'))),
        A=JSON.parse(readFileSync(path.join(REPO,'bulldog-racing/assets/dogs/rocky/atlas/atlas.json')));
  const V=createVisual('rocky',{contract:c,atlas:A,extras:{phase:P2}},{visualAt,categoryOf});
  let stops=0,short=0;
  for(const race of races(2500))for(const d of race.dogs){
    const before=JSON.stringify(d.segments);
    for(const s of d.segments){if(!((s.kind==='STOP'&&s.eventIndex>=0)||s.kind==='FINISH_DECELERATE'))continue;
      const v=V.at(d.segments,s.t0-1e-6);assert.equal(P2.sourceForCell(v.index),68);stops++;
      const prev=d.segments[d.segments.indexOf(s)-1];if(prev.kind==='RUN'&&(prev.t1-prev.t0)*24<155)short++;}
    assert.equal(JSON.stringify(d.segments),before);}
  assert.ok(stops>20000&&short>2000,`stops ${stops}, short ${short}`);
});
test('остальные четыре собаки побайтно не изменены относительно коммита 6dc3518',()=>{
  const base='6dc3518';let checked=0;
  for(const dog of ['frenk','zefir','pups','luna']){
    const tree=execFileSync('git',['-C',REPO,'ls-tree','-r',base,`bulldog-racing/assets/dogs/${dog}`],{encoding:'utf8',maxBuffer:1e8}).trim().split('\n');
    for(const line of tree){const [meta,file]=line.split('\t');const blob=meta.split(' ')[2];
      const now=execFileSync('git',['-C',REPO,'hash-object',file],{encoding:'utf8'}).trim();assert.equal(now,blob,file);checked++;}}
  assert.ok(checked>100);
});
