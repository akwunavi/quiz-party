// Выгружает ВСЕ уникальные пары соседних кадров экрана выбора (по всем стартовым фазам IDLE каждой собаки), для попиксельной проверки скачков.
import {readFileSync} from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const REPO=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..'),L=REPO+'/bulldog-racing/assets/dogs/';
const J=p=>JSON.parse(readFileSync(p,'utf8'));
const {createSelectionPlayer,dogRule}=await import(REPO+'/bulldog-racing/round-lab/src/selection.mjs');
const data={pupsGates:J(L+'pups/selection/gates.json').gates,rockyDelay:J(L+'rocky/selection/idle_exit_DELAY_MAP.json')};
const out={};
for(const id of ['frenk','zefir','rocky','pups','luna']){
  const N=dogRule(id,data).loop.length,pairs=new Map();let maxWait=0;
  for(let p=0;p<N;p++){const P=createSelectionPlayer(id,data,p);let prev=P.tick();P.pick();maxWait=Math.max(maxWait,P.waitFrames);
    let n=0,after=0;while((P.busy()||after<30)&&n++<3000){const f=P.tick();if(!P.busy())after++;
      const key=`${prev.clip}:${prev.index}>${f.clip}:${f.index}|${prev.kind}>${f.kind}`;pairs.set(key,(pairs.get(key)||0)+1);prev=f;}}
  out[id]={maxWait,pairs:[...pairs.entries()].map(([k,c])=>{const [a,kk]=k.split('|');const [x,y]=a.split('>');const [cx,ix]=x.split(':');const [cy,iy]=y.split(':');return {from:[cx,+ix],to:[cy,+iy],kinds:kk,count:c};})};
}
process.stdout.write(JSON.stringify(out));
