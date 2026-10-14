import {resolveRace} from './scenario.mjs';
const N=+process.argv[2]||10000;
const seeds=[];for(let s=1;s<=N;s++)seeds.push(s*7919+13);
function runAll(cfg){globalThis.__CFG=cfg;return seeds.map(sd=>{try{const r=resolveRace(sd);return {w:r.places[0],c:r.dogs.map(d=>d.crossing),ev:r.dogs[0].eventsActual.length,es:r.effectiveSeed}}catch(e){return null}});}
const base=runAll({});
const cases={
 'B-naive START 31/24 (+0.146 s lost per START)':{0:{START:31/24}},
 'B-proposed START 31/24 + runJoin 7/24':{0:{START:31/24,RUN_JOIN:7/24}},
 'natural START31/24+STOP73/24':{0:{START:31/24,STOP:73/24}},
 'natural SNIFF+RETURN 8.333 s':{0:{SNIFF:8.3333,RETURN:0}},
 'natural START+STOP+SNIFF':{0:{START:31/24,STOP:73/24,SNIFF:8.3333,RETURN:0}},
 'B-equalized: START 31/24, every action shortened by the extra START/2 (0.1458 s)':{0:{START:31/24,BUTTERFLY:121/24-7/48,ROLL:145/24-7/48,SNIFF:(48/24+82/48+20/24+55/32+24/24)-7/48}},
};
const n0=base.filter(Boolean).length;let bw=base.filter(x=>x&&x.w===0).length;
console.log('seeds',N,'valid',n0,'baseline lane0 win%',(100*bw/n0).toFixed(2));
// effective seed equality check
for(const [k,cfg] of Object.entries(cases)){
  const v=runAll(cfg);let w=0,nn=0,dc=0,seedChanged=0,flips=0;
  for(let i=0;i<N;i++){if(!base[i]||!v[i])continue;nn++;if(v[i].w===0)w++;dc+=v[i].c[0]-base[i].c[0];if(v[i].es!==base[i].es)seedChanged++;if((v[i].w===0)!==(base[i].w===0))flips++;}
  console.log(k.padEnd(48),'lane0 win%',(100*w/nn).toFixed(2),'Δwin% vs baseline',(100*(w-bw)/nn).toFixed(2),'mean Δcrossing lane0',(dc/nn).toFixed(3)+' s','effectiveSeed changed in',seedChanged,'races, winner flips',flips);
}
