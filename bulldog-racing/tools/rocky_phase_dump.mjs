// Выгружает последовательности ячеек RUN Рокки (натуральная, принятый phase.mjs, phase_v2) для длин V3 → JSON (читает rocky_phase_eval.py)
import path from 'node:path';import {fileURLToPath} from 'node:url';
const REPO=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'),R=p=>path.join(REPO,'bulldog-racing/assets/dogs/rocky/runtime',p);
const P2=await import(R('phase_v2.mjs')),P1=await import(R('phase.mjs'));
const natural=n=>Array.from({length:n},(_,i)=>i<11?i:11+((i-11)%12));
const seqOf=(P,n)=>{const s={t0:0,t1:n/24};return Array.from({length:n},(_,i)=>{const c=P.visualRunFrame(s,i/24+1e-6);return c;});};
const out={};
for(const n of [23,35,47,59,71,83,95,107,119,131,143,155,167,239,1007]){
  out[n]={natural:natural(n),v2:seqOf(P2,n).map((c,i)=>c??natural(n)[i]),plan:P2.skipPlan(n)};
  if(n>=155)out[n].accepted=seqOf(P1,n);
}
process.stdout.write(JSON.stringify(out));
