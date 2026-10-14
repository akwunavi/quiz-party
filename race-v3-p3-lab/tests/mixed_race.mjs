// Local mixed race: Frenk (lane 0, P3 visual layer + Frenk contract) + four Bulldog 4 (identity contract) on the REAL V3 physics.
// node tests/mixed_race.mjs [races=10000]  -> results/mixed_race_summary.json, results/mixed_race_demo_*.txt, results/mixed_race_demo_*.json
import {writeFileSync} from 'node:fs';
import {resolveRace,stateAt,races,rng,signature,retimeVariant,fmt} from './lib.mjs';
import {visualAt,timelineOf} from '../src/visual.mjs';
import {dog4Contract,frenkContract} from '../src/loader.mjs';
const N=+process.argv[2]||10000;
const FR=frenkContract(),RT=retimeVariant(FR),D4=dog4Contract(),rs=races(N),rnd=rng(77);
const R=new URL('../results/',import.meta.url);
const items=(c,dog)=>timelineOf(c,dog.segments).map(it=>{
  const a=visualAt(c,dog.segments,it.t0+1e-7),b=visualAt(c,dog.segments,Math.max(it.t0+1e-7,it.t1-1e-7));
  return {t0:+it.t0.toFixed(4),t1:+it.t1.toFixed(4),window:it.window,eventIndex:it.eventIndex,role:it.role,clip:it.clip,first:a.frame,last:b.frame,status:a.status,overflow:!!it.overflow,
          frames:+((it.t1-it.t0)*24).toFixed(2)};
});
const planOf=d=>d.eventsActual.map(e=>`${e.kind}@${e.desired.toFixed(2)}${e.early?'(early)':''}`);
function laneReport(c,dog){
  const it=timelineOf(c,dog.segments);let missing=0,over=0,raw=0,prov=0,sniff=0;
  for(const x of it){
    if(x.role==='missing')missing++; if(x.overflow)over++; if(x.provisional)prov++;
    if(x.clip==='SNIFF_PEE'&&x.role==='body')sniff++;
  }
  return {missing,overflow:over,provisional:prov,sniffWindows:sniff};
}
const S={races:N,frenkLane:0,asIs:{fullyDisplayable:0,withMissingROLL:0,withOverflow:0,withSniffNoAlpha:0},retime:{fullyDisplayable:0,withMissingROLL:0,withOverflow:0},
  eventsFrenk:{},dog4Lanes:{samples:0,mismatches:0},physics:{signatureStable:true},identitySwap:{checked:0,mismatches:0}};
const before=rs.map(signature);let demo=[];
for(let n=0;n<rs.length;n++){
  const r=rs[n],fr=r.dogs[0];
  const a=laneReport(FR,fr),b=laneReport(RT,fr);
  for(const e of fr.eventsActual){const k=e.kind+(e.early?'/early':'/afterStop');S.eventsFrenk[k]=(S.eventsFrenk[k]||0)+1;}
  if(a.missing)S.asIs.withMissingROLL++; if(a.overflow)S.asIs.withOverflow++; if(a.sniffWindows)S.asIs.withSniffNoAlpha++;
  if(!a.missing&&!a.overflow)S.asIs.fullyDisplayable++;
  if(b.missing)S.retime.withMissingROLL++; if(b.overflow)S.retime.withOverflow++; if(!b.missing&&!b.overflow)S.retime.fullyDisplayable++;
  if(n<1500)for(let l=1;l<5;l++){const d=r.dogs[l];for(let i=0;i<30;i++){const t=rnd()*d.end,x=stateAt(d,t),y=visualAt(D4,d.segments,t);S.dog4Lanes.samples++;if(x.clip!==y.clip||x.frame!==y.frame)S.dog4Lanes.mismatches++;}}
  const kinds=fr.eventsActual.map(e=>e.kind),after=fr.eventsActual.filter(e=>!e.early).map(e=>e.kind);
  if(demo.length<3){
    if(!demo.some(x=>x.tag==='butterfly+sniff')&&after.includes('BUTTERFLY')&&kinds.includes('SNIFF_PEE')&&!kinds.includes('ROLL'))demo.push({tag:'butterfly+sniff',n});
    else if(!demo.some(x=>x.tag==='roll')&&kinds.includes('ROLL'))demo.push({tag:'roll',n});
    else if(!demo.some(x=>x.tag==='clean-sniff')&&after.includes('SNIFF_PEE')&&!kinds.includes('ROLL')&&!kinds.includes('BUTTERFLY'))demo.push({tag:'clean-sniff',n});
  }
}
const after=rs.map(signature);S.physics.signatureStable=before.every((s,i)=>s===after[i]);
// identity swap: put Frenk in every lane of 500 races; physics identical, Dog4 contract elsewhere
for(const r of rs.slice(0,500))for(let L=0;L<5;L++){S.identitySwap.checked++;const s0=signature(r);for(const d of r.dogs){visualAt(d.index===L?FR:D4,d.segments,d.end*.5);}if(signature(r)!==s0)S.identitySwap.mismatches++;}
S.verdict={physicsUnchanged:S.physics.signatureStable&&S.identitySwap.mismatches===0,dog4LaneIdentity:S.dog4Lanes.mismatches===0,
  note:'Fully displayable = no ROLL window (no clip) and no truncated window. The race itself (places, crossings) is always the same: the physics never reads the character.'};
writeFileSync(new URL('mixed_race_summary.json',R),JSON.stringify(S,null,1));
console.log(JSON.stringify(S,null,1));
for(const {tag,n} of demo){
  const r=rs[n],out={tag,requestedSeed:r.requestedSeed,effectiveSeed:r.effectiveSeed,places:r.places,lanes:[]};
  const L=[];L.push(`MIXED RACE DEMO  [${tag}]  requestedSeed=${r.requestedSeed} effectiveSeed=${r.effectiveSeed}  places(lane order)=${r.places.map(i=>i+1).join(' > ')}`);
  L.push('lane 1 = Bulldog 1 (Frenk, P3 contract); lanes 2-5 = Bulldog 4 (identity contract). Physical timeline is V3, unchanged.\n');
  for(const d of r.dogs){
    const c=d.index===0?FR:D4;const it=items(c,d);
    L.push(`LANE ${d.index+1} ${d.index===0?'FRENK':'DOG4 '}  base=${d.base}  crossing=${d.crossing.toFixed(3)} s  events: ${planOf(d).join(', ')||'-'}`);
    if(d.index===0){
      L.push('   visual items (t0..t1 s | window | role | clip | first..last frame | frames | status)');
      for(const x of it)L.push(`   ${x.t0.toFixed(3).padStart(8)}..${x.t1.toFixed(3).padStart(8)} | ${x.window.padEnd(17)} | ${x.role.padEnd(7)} | ${String(x.clip).padEnd(10)} | ${String(x.first)}..${String(x.last)} | ${String(x.frames).padStart(7)} | ${x.status}${x.overflow?'  <<< OVERFLOW (truncated)':''}`);
    }
    out.lanes.push({lane:d.index+1,character:d.index===0?'frenk':'dog4',crossing:d.crossing,events:planOf(d),items:d.index===0?it:undefined,segments:d.segments.map(s=>({kind:s.kind,t0:s.t0,t1:s.t1,eventIndex:s.eventIndex}))});
    L.push('');
  }
  const rep=laneReport(FR,r.dogs[0]),repR=laneReport(RT,r.dogs[0]);
  L.push(`FRENK lane check as-is: missing windows=${rep.missing} truncated windows=${rep.overflow} provisional=${rep.provisional}`);
  L.push(`FRENK lane check with the NOT-APPROVED BUTTERFLY retime x1.0932: missing=${repR.missing} truncated=${repR.overflow}`);
  writeFileSync(new URL(`mixed_race_demo_${tag}_seed${r.effectiveSeed}.txt`,R),L.join('\n')+'\n');
  writeFileSync(new URL(`mixed_race_demo_${tag}_seed${r.effectiveSeed}.json`,R),JSON.stringify(out));
  console.log('demo written',tag,r.effectiveSeed);
}
