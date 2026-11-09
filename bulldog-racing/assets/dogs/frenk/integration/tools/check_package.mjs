// Static + simulated checks of the Frenk integration package (Node, no browser). node tools/check_package.mjs [SEEDS=2000]
// 1. P3 validator (race-v3-p3-lab/src/validator.mjs, unchanged) on the integration contract;
// 2. SHA-256 of every alpha source and atlas sheet = contract; STOP V4 arrays = stop_v4/metadata values;
// 3. every clip label is in the atlas, every atlas frame is used;
// 4. states: READY only with an accepted asset in a V3 window; NOT_READY / NOT_IN_V3_CONTRACT never referenced by a window;
// 5. runtime (runtime/frenk_visual.mjs, the code the browser lab runs) on N seeds of the unmodified V3 planner x every lane,
//    plus every speed category x every event: no diagnostic, no missing/overflow, every label in the atlas, finite shift/shadow.
// Writes ../results/check_package.json; exit code 1 on any failure.
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const PKG=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),B=path.resolve(PKG,'..'),ROOT=path.resolve(B,'..');
const J=p=>JSON.parse(readFileSync(p,'utf8')),sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const {validateContract}=await import(path.join(ROOT,'race-v3-p3-lab/src/validator.mjs'));
const {timelineOf,categoryOf}=await import(path.join(ROOT,'race-v3-p3-lab/src/visual.mjs'));
const {resolveRace,CATEGORIES}=await import(path.join(ROOT,'dog4-v3-lab/scenario.mjs'));
const {PRESETS,buildDog}=await import(path.join(ROOT,'dog4-v3-lab/model.mjs'));
const {shadowRefs,frenkVisual,shadowX}=await import(path.join(PKG,'runtime/frenk_visual.mjs'));
const layout=J(path.join(ROOT,'dog4-v3-lab/layout.json'));
const contract=J(path.join(PKG,'contract/frenk.contract.integration.json'));
const startArrays=J(path.join(PKG,'contract',contract.shift.arraysFile)),stopMeta=J(path.join(PKG,'contract',contract.shift.stopArraysFile));
const atlas=J(path.join(PKG,'atlas/frenk_atlas.json'));
const R={contractVersion:contract.contractVersion,generated:new Date().toISOString(),checks:{}},fail=[];
const check=(name,ok,detail)=>{R.checks[name]={ok,...(detail===undefined?{}:{detail})};if(!ok)fail.push(name);};

// 1. validator
const vc=structuredClone(contract);vc.shift.arrays=Object.fromEntries(Object.entries(startArrays.modes[vc.shift.mode]).map(([k,v])=>[k,v.C]));
const v=validateContract(vc);
check('p3Validator',v.ok&&v.warnings.length===0&&v.incomplete.length===0,{errors:v.errors,warnings:v.warnings,incomplete:v.incomplete,fits:v.fits,info:v.info});

// 2. hashes
const hashes=contract.alphaSources.map(s=>{let got;
  if(s.file.startsWith('git:')){const [,,rev,file]=s.file.match(/^git:([^@]+)@([0-9a-f]+):(.+)$/)||[];got=createHash('sha256').update(execFileSync('git',['-C',B,'show',`${rev}:${file}`],{maxBuffer:1<<28})).digest('hex');}
  else got=sha(path.join(ROOT,s.file));
  return {file:s.file,ok:got===s.sha256};});
const sheetHashes=Object.entries(contract.atlas.sheets).map(([k,s])=>({sheet:k,ok:sha(path.join(PKG,'contract',s.file))===s.sha256}));
check('alphaSourceHashes',hashes.every(h=>h.ok),hashes);
check('atlasSheetHashes',sheetHashes.every(h=>h.ok),sheetHashes);
const ref=J(path.join(B,'stop_v4/metadata/stop_v4_shift_arrays.json'));
check('stopV4ArraysEqualAccepted',JSON.stringify(ref.categories)===JSON.stringify(stopMeta.categories)&&ref.canvasPerSrc===stopMeta.canvasPerSrc);

// 3. labels <-> atlas
const used=new Set();for(const c of Object.values(contract.clips)){for(const l of c.labels??[])used.add(l);for(const l of c.loop??[])used.add(l);}
const missing=[...used].filter(l=>!atlas.frames[l]),unused=Object.keys(atlas.frames).filter(l=>!used.has(l));
check('labelsInAtlas',missing.length===0&&unused.length===0,{labels:used.size,missing,unused});

// 4. states
const OKS=/^(approved|accepted_working)/,winClips=w=>[w.clip,w.body,w.hold,w.pad].filter(Boolean);
const states=Object.entries(contract.states).map(([name,s])=>{
  let ok=true,why='';
  if(s.status==='READY'){const cl=s.clip&&contract.clips[s.clip]?s.clip:null;
    if(name==='RUN')ok=!!contract.clips.START.loop;else{ok=!!cl&&OKS.test(contract.assetStatus[cl]??'')&&Object.values(contract.windows).some(w=>winClips(w).includes(cl));why=ok?'':'no accepted clip in a V3 window';}}
  else{ok=!Object.values(contract.windows).some(w=>winClips(w).includes(name));why=ok?'':'non-ready state is referenced by a window';}
  return {state:name,status:s.status,ok,why};});
const required=['IDLE','SELECTED','FIRST_START','RUN','STOP','RACE_STAND','SNIFF_PEE','BUTTERFLY','ROLL','FINISH'];
check('states',states.every(s=>s.ok)&&required.every(r=>contract.states[r]),{states,missingDescriptions:required.filter(r=>!contract.states[r])});

// 5. runtime over races
const F={contract:vc,stopMeta,atlas,oldC:vc.shift.arrays,...shadowRefs(vc,stopMeta,atlas)};
function runDog(dog,acc){
  const tl=timelineOf(vc,dog.segments);
  for(const it of tl){if(it.role==='missing')acc.missing++;if(it.overflow)acc.overflow++;}
  const end=dog.segments.at(-1).t1;
  for(let k=0;k/24<=end+1e-9;k++){const t=k/24,f=frenkVisual(F,dog,t);acc.ticks++;
    if(f.diagnostic){acc.diag[f.diagnostic]=(acc.diag[f.diagnostic]||0)+1;}
    if(!f.label||!atlas.frames[f.label])acc.badLabel++;
    const sx=shadowX(F,layout,f,0);if(!Number.isFinite(f.shiftSrc)||!Number.isFinite(sx))acc.nonFinite++;}
  for(const e of dog.eventsActual)acc.events[e.kind]=(acc.events[e.kind]||0)+1;
  for(const s of dog.segments)acc.segments[s.kind]=(acc.segments[s.kind]||0)+1;
  acc.categories[categoryOf(dog.base)??'NONE']=(acc.categories[categoryOf(dog.base)??'NONE']||0)+1;
}
const newAcc=()=>({dogs:0,ticks:0,missing:0,overflow:0,badLabel:0,nonFinite:0,diag:{},events:{},segments:{},categories:{}});
const N=Number(process.argv[2]??2000),seeds=newAcc();
for(let s=1;s<=N;s++){const r=resolveRace(s*7919);for(const d of r.dogs){seeds.dogs++;runDog(d,seeds);}}
const okAcc=a=>a.missing===0&&a.overflow===0&&a.badLabel===0&&a.nonFinite===0&&Object.keys(a.diag).length===0;
check('runtimeRandomRaces',okAcc(seeds),{seeds:N,...seeds});
// every category x every event order (incl. events from BASE before the first STOP and two events in a row)
const grid=newAcc(),orders=[[['SNIFF_PEE',.22],['BUTTERFLY',.5],['ROLL',.76]],[['ROLL',.25],['BUTTERFLY',.7]],[['BUTTERFLY',.3]],[['SNIFF_PEE',.4]],[['ROLL',.35]],[['BUTTERFLY',.02],['ROLL',.5]],[['SNIFF_PEE',.03]],[]];
for(const [cat,base] of CATEGORIES)for(const [i,ev] of orders.entries()){
  PRESETS.__FRENK_PKG={name:'pkg',dogs:[{name:`${cat}-${i}`,base,variations:[1,1,1,1],events:ev}]};grid.dogs++;runDog(buildDog('__FRENK_PKG',0),grid);}
delete PRESETS.__FRENK_PKG;
check('runtimeCategoryEventGrid',okAcc(grid)&&Object.keys(grid.categories).length===5,grid);

R.ok=fail.length===0;R.failed=fail;
writeFileSync(path.join(PKG,'results/check_package.json'),JSON.stringify(R,null,1));
console.log(Object.entries(R.checks).map(([k,c])=>`${c.ok?'PASS':'FAIL'} ${k}`).join('\n'));
console.log('random races:',N,'seeds,',seeds.dogs,'dogs,',seeds.ticks,'ticks; events',JSON.stringify(seeds.events),'categories',JSON.stringify(seeds.categories));
process.exit(R.ok?0:1);
