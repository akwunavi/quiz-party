#!/usr/bin/env node
// Сверка контракта+адаптера Зефира с ЕГО принятой лабораторией (runtime/dog2stop.mjs, lab_stop_v1):
// кадр (метка атласа) и сдвиг спрайта должны совпасть в окнах BASE/START/RUN/STOP/FINISH_DECELERATE на реальных гонках V3.
// usage: node crosscheck_zefir.mjs [N=200]
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';import {fileURLToPath} from 'node:url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),REPO=path.resolve(HERE,'../..'),Z=path.join(REPO,'bulldog-racing/assets/dogs/zefir');
globalThis.location={href:'file:///x/'};
globalThis.fetch=async u=>{const f=path.join(Z,'atlas',path.basename(new URL(u).pathname));return {ok:true,json:async()=>JSON.parse(readFileSync(f))};};
globalThis.Image=class{set src(v){this.onload?.();}};
const {loadDog2Stop,dog2StopVisual}=await import(path.join(Z,'runtime/dog2stop.mjs'));
const {createVisual}=await import(path.join(REPO,'bulldog-racing/runtime/dog_visual.mjs'));
const {visualAt,categoryOf}=await import(path.join(REPO,'race-v3-p3-lab/src/visual.mjs'));
const {races}=await import(path.join(REPO,'race-v3-p3-lab/tests/lib.mjs'));
const N=+(process.argv[2]||200);
const D=await loadDog2Stop(new URL('file:///x/lab_stop_v1/'));
const c=JSON.parse(readFileSync(path.join(Z,'contract/zefir.contract.json'))),A=JSON.parse(readFileSync(path.join(Z,'atlas/atlas.json')));
const V=createVisual('zefir',{contract:c,atlas:A,extras:{stopList:JSON.parse(readFileSync(path.join(Z,'atlas/stopB_montage_list.json')))}},{visualAt,categoryOf});
const labOf=v=>v.atlas==='run'?v.key.replace(/^r/,'run'):(v.key[0]==='s'?'stopS':'stopT')+v.key.slice(1);
let n=0,bad=0,badShift=0,first=null,maxd=0;const byWin={};
for(const r of races(N))for(const d of r.dogs){const end=d.segments.at(-1).t1;
  for(let t=0;t<end;t+=1/24){
    const w=d.segments.find(s=>t+1e-6>=s.t0&&t+1e-6<s.t1)?.kind;if(!['BASE','START','RUN','STOP','FINISH_DECELERATE'].includes(w))continue;
    const a=dog2StopVisual(D,d,t+1e-6),b=V.at(d.segments,t+1e-6);n++;(byWin[w]??={n:0,bad:0}).n++;
    const la=labOf(a);const df=Math.abs((a.shift||0)-b.shiftPx);maxd=Math.max(maxd,df);
    if(la!==b.frame){bad++;byWin[w].bad++;first??={t,w,lab:la,contract:b.frame};}
    else if(df>1e-6){badShift++;first??={t,w,shiftLab:a.shift,shiftAdapter:b.shiftPx};}
  }}
const res={races:N,compared:n,frameMismatch:bad,shiftMismatch:badShift,maxShiftDiffPx:maxd,first,byWindow:byWin};
console.log(JSON.stringify(res,null,1));
writeFileSync(path.join(REPO,'bulldog-racing/reports/crosscheck_zefir.json'),JSON.stringify(res,null,1));
