// Exact label sequence the P3 visual layer shows in a STOP -> BUTTERFLY -> START window, original tempo vs retime x(129/118).
// Synthetic physical segments with the canonical windows (STOP 37/24, BUTTERFLY 121/24, START 1): this is the lab's own output, not a model of it.
import {writeFileSync} from 'node:fs';
import {visualAt} from '../src/visual.mjs';
import {frenkContract} from '../src/loader.mjs';
import {retimeVariant,cloneContract} from '../tests/lib.mjs';
const T0=0,A=37/24,B=A+121/24,C=B+1;
const segs=[{kind:'STOP',t0:T0,t1:A,eventIndex:0,base:1},{kind:'BUTTERFLY',t0:A,t1:B,eventIndex:0},{kind:'START',t0:B,t1:C,eventIndex:0,base:1},{kind:'RUN',t0:C,t1:C+3,eventIndex:-1,base:1}];
const out={};
for(const [name,c] of [['original',frenkContract()],['retime',retimeVariant(frenkContract())]]){
  const seq=[];
  for(let i=0;i<121;i++){const v=visualAt(c,segs,A+i/24+1e-7);seq.push({i,frame:v.frame,role:v.role,status:v.status,overflow:v.overflow});}
  out[name]=seq;
}
writeFileSync(new URL('../results/butterfly_retime_labels.json',import.meta.url),JSON.stringify(out));
const show=s=>s.filter((x,i)=>i%10===0||x.role!=='body'&&x.role!=='tail').map(x=>`${x.i}:${x.frame}/${x.role}${x.overflow?'!':''}`).join(' ');
console.log('original',show(out.original).slice(0,600));console.log('retime  ',show(out.retime).slice(0,600));
const shown=n=>new Set(out[n].map(x=>x.frame));
console.log('original shows',[...shown('original')].filter(l=>/^bf/.test(l)).length,'of 93 bf frames; retime shows',[...shown('retime')].filter(l=>/^bf/.test(l)).length);
