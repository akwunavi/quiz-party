// Balance addendum simulation (measurement only, runs on a patched COPY of V3 made by prepare.sh).
// Compares, for a character whose own START/STOP/action windows differ from the canonical ones:
//   M0  no compensation
//   M1  constant individual speed coefficient k (calibrated so that the MEAN crossing time equals the canonical dog's)
//   M2  event-debt compensation: ahead -> stationary hold (exact), behind -> smooth speed bump  m(t)=1+beta*sin^2(pi*t/W), beta<=betaMax, beta*pi/W<=rMax, spent on the
//       RUN windows that follow the event (time-credit model; see ADDENDUM.md for the accuracy note)
// node balance_sim.mjs [seeds=10000]  -> balance_results.json
import {writeFileSync} from 'node:fs';
import {resolveRace} from './scenario.mjs';
import {buildDog,PRESETS} from './model.mjs';
const N=+process.argv[2]||10000;
const P={betaMax:0.08,rMax:0.02,Wmin:4};      // M2 limits: speed bump <= 8 %, relative speed change <= 2 %/s, only on RUN windows >= 4 s
const seeds=Array.from({length:N},(_,i)=>(i+1)*7919+13);
const C={START:1,STOP:37/24,BUTTERFLY:121/24,ROLL:145/24,SNIFF:48/24+82/48+20/24+55/32+24/24,RETURN:16/48+68/40+8/24+17/48};
const CHARS={
  A63_frenk_STOP_moving_part:{note:'as A but STOP window = 63/24 s (the part of the clip in which the body still moves)',cfg:{START:31/24,STOP:63/24,SNIFF:8.3333,RETURN:0,BUTTERFLY:3.875}},
  A_frenk_natural:{note:'Frenk windows as shot: START 31/24, STOP 73/24, SNIFF+EVENT 8.333 s (RETURN merged), BUTTERFLY 3.875 s; ROLL has no clip (canonical)',cfg:{START:31/24,STOP:73/24,SNIFF:8.3333,RETURN:0,BUTTERFLY:3.875}},
  B_long_clips_hypothetical:{note:'HYPOTHETICAL slow-clip character: START 1.3, STOP 2.2, every action +1.0 s (event cost +1.5 s)',cfg:{START:1.3,STOP:2.2,SNIFF:C.SNIFF+1,RETURN:C.RETURN,BUTTERFLY:C.BUTTERFLY+1,ROLL:C.ROLL+1}}
};
function runRaces(cfg0,count=N){
  globalThis.__CFG=cfg0?{0:cfg0}:{};const out=[];
  for(const s of seeds.slice(0,count)){
    const r=resolveRace(s),d=r.dogs[0],seq=[];
    for(const g of d.segments){
      const dur=g.t1-g.t0;
      if(g.kind==='START')seq.push({t:'D',e:g.eventIndex,d:dur/2-C.START/2});
      else if(g.kind==='STOP'&&g.eventIndex>=0)seq.push({t:'D',e:g.eventIndex,d:dur/2-C.STOP/2});
      else if(['BUTTERFLY','ROLL','SNIFF_PEE','RETURN'].includes(g.kind)){const canon={BUTTERFLY:C.BUTTERFLY,ROLL:C.ROLL,SNIFF_PEE:C.SNIFF,RETURN:C.RETURN}[g.kind];seq.push({t:'D',e:g.eventIndex,d:dur-canon});}
      else if(g.kind==='RUN')seq.push({t:'R',usable:g.crossing!==undefined?g.crossing-g.t0:dur});
    }
    out.push({es:r.effectiveSeed,cross:r.dogs.map(x=>x.crossing),n:d.eventsActual.length,seq});
  }
  return out;
}
function settleM2(rec){          // returns {cross, holds, credits, residual, betaUsed[], maxRate}
  let pool=0,holds=0,credits=0;const buckets=new Map();let betaUsed=[],maxRate=0;
  const flush=()=>{for(const [,v] of buckets){if(v<0)holds+=-v;else pool+=v;}buckets.clear();};
  for(const it of rec.seq){
    if(it.t==='D')buckets.set(it.e,(buckets.get(it.e)||0)+it.d);
    else{
      flush();
      let credit=0;
      if(it.usable>=P.Wmin){const beta=Math.min(P.betaMax,P.rMax*it.usable/Math.PI);credit=Math.min(pool,.5*beta*it.usable);}
      if(credit>1e-9){const bu=2*credit/it.usable;betaUsed.push(bu);maxRate=Math.max(maxRate,bu*Math.PI/it.usable);}
      pool-=credit;credits+=credit;
    }
  }
  flush();                                                  // debts after the last RUN (none in practice: the last window is a RUN that ends at the crossing)
  return {cross:rec.cross[0]+holds-credits,holds,credits,residual:pool,betaUsed,maxRate};
}
const winner=cs=>cs.reduce((b,c,i)=>c<cs[b]?i:b,0);
const mean=a=>a.reduce((x,y)=>x+y,0)/Math.max(1,a.length),sd=a=>{const m=mean(a);return Math.sqrt(mean(a.map(x=>(x-m)**2)));};
const pct=(a,p)=>{const s=[...a].sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.floor(p*s.length))];};
function strata(base,rec,getCross){
  const S={1:[],2:[],'3+':[]};let swapped=0;
  rec.forEach((r,i)=>{if(r.es!==base[i].es){swapped++;return;}const k=r.n>=3?'3+':String(r.n);S[k].push(getCross(r,i)-base[i].cross[0]);});
  const out={};for(const [k,v] of Object.entries(S))out[k]={races:v.length,meanDelta_s:+mean(v).toFixed(3),sdDelta_s:+sd(v).toFixed(3),p5_s:+pct(v,.05).toFixed(3),p95_s:+pct(v,.95).toFixed(3),absP95_s:+pct(v.map(Math.abs),.95).toFixed(3)};
  return {strata:out,effectiveSeedChanged:swapped};
}
function overall(base,rec,getCross){
  let w0=0,w=0,flips=0,n=0,all=[];
  rec.forEach((r,i)=>{n++;const b=base[i],cs=[...r.cross];cs[0]=getCross(r,i);const wi=winner(cs);if(winner(b.cross)===0)w0++;if(wi===0)w++;if(r.es===b.es&&((winner(b.cross)===0)!==(wi===0)))flips++;if(r.es===b.es)all.push(cs[0]-b.cross[0]);});
  return {baseWin_pct:+(100*w0/n).toFixed(2),win_pct:+(100*w/n).toFixed(2),deltaWin_pp:+(100*(w-w0)/n).toFixed(2),winnerFlipsLane0:flips,meanDelta_s:+mean(all).toFixed(3),sdDelta_s:+sd(all).toFixed(3)};
}
function solo(cfg,k=1,base=1){
  PRESETS.SOLO={name:'solo',dogs:[{name:'s',base,variations:[1,1,1,1],events:[]}]};
  globalThis.__CFG=cfg||k!==1?{0:{...(cfg||{}),k}}:{};
  const d=buildDog('SOLO',0);return {cross:d.crossing,seq:d.segments.filter(g=>g.kind==='START'||g.kind==='RUN').map(g=>g.kind==='START'?{t:'D',e:-1,d:(g.t1-g.t0)/2-C.START/2}:{t:'R',usable:g.crossing!==undefined?g.crossing-g.t0:g.t1-g.t0})};
}
const res={races:N,m2Limits:P,chars:{}};
console.log('baseline...');const base=runRaces(null);
for(const [name,ch] of Object.entries(CHARS)){
  console.log(name,'M0...');const m0=runRaces(ch.cfg);
  // M1: calibrate k so that the mean paired crossing delta is 0 (linear in 1/k)
  const paired=(rec,f)=>mean(rec.map((r,i)=>r.es===base[i].es?f(r,i)-base[i].cross[0]:null).filter(x=>x!==null));
  const d1=paired(m0,r=>r.cross[0]);
  const probe=1.02,m1p=runRaces({...ch.cfg,k:probe},1500);
  const dp=mean(m1p.map((r,i)=>r.es===base[i].es?r.cross[0]-base[i].cross[0]:null).filter(x=>x!==null)),d0=mean(m0.slice(0,1500).map((r,i)=>r.es===base[i].es?r.cross[0]-base[i].cross[0]:null).filter(x=>x!==null));
  let slope=(dp-d0)/(1/probe-1),k=1/(1+(0-d1)/slope);       // d(k)=d1+slope*(1/k-1)
  k=1/(1+(-d1)/slope);
  console.log(name,'M1 k0',k.toFixed(5),'...');
  let m1=runRaces({...ch.cfg,k});let dk=paired(m1,r=>r.cross[0]);
  if(Math.abs(dk)>0.01){const s2=(dk-d1)/(1/k-1);const k2=1/(1+(-d1)/s2);k=k2;m1=runRaces({...ch.cfg,k});dk=paired(m1,r=>r.cross[0]);}
  console.log(name,'k',k.toFixed(5),'mean delta',dk.toFixed(4));
  const m2=m0.map(r=>settleM2(r));
  const M={
    M0_none:{...overall(base,m0,r=>r.cross[0]),...strata(base,m0,r=>r.cross[0])},
    M1_constantK:{k:+k.toFixed(5),calibratedMeanDelta_s:+dk.toFixed(4),...overall(base,m1,r=>r.cross[0]),...strata(base,m1,r=>r.cross[0])},
    M2_debtRepay:{...overall(base,m0,(r,i)=>m2[i].cross),...strata(base,m0,(r,i)=>m2[i].cross),
      holdsMean_s:+mean(m2.map(x=>x.holds)).toFixed(3),creditsMean_s:+mean(m2.map(x=>x.credits)).toFixed(3),
      unpaidDebt:{races:m2.filter(x=>x.residual>0.01).length,mean_s:+mean(m2.map(x=>x.residual)).toFixed(4),p95_s:+pct(m2.map(x=>x.residual),.95).toFixed(3),max_s:+Math.max(...m2.map(x=>x.residual)).toFixed(3)},
      betaApplied:{p50:+pct(m2.flatMap(x=>x.betaUsed),.5).toFixed(4),p95:+pct(m2.flatMap(x=>x.betaUsed),.95).toFixed(4),max:+Math.max(...m2.flatMap(x=>x.betaUsed)).toFixed(4)},
      maxRelativeSpeedChangePerSecond:+Math.max(...m2.map(x=>x.maxRate)).toFixed(4)}
  };
  // zero-event races: a lone dog that never stops, two speed categories
  const zero={};
  for(const b of [1,1.25]){
    const cb=solo(null,1,b).cross,c0=solo(ch.cfg,1,b),c1=solo(ch.cfg,k,b).cross,s=settleM2(c0.seq?{cross:[c0.cross],seq:c0.seq}:null);
    zero['base'+b]={M0_s:+(c0.cross-cb).toFixed(3),M1_s:+(c1-cb).toFixed(3),M2_s:+(s.cross-cb).toFixed(3)};
  }
  M.zeroEvents=zero;
  res.chars[name]={note:ch.note,cfg:ch.cfg,...M};
}
writeFileSync(new URL('./balance_results.json',import.meta.url),JSON.stringify(res,null,1));
console.log(JSON.stringify(res,null,1));
