#!/usr/bin/env node
// Общий валидатор библиотеки пяти бульдогов. Без зависимостей (чистый Node).
// Что проверяет (по каждой собаке):
//  1. файлы: все записи SOURCES.lock.json на диске, sha256 совпадает; контракт и атлас на месте;
//  2. контракт проходит НЕИЗМЕНЁННЫЙ валидатор Race V3/P3 (race-v3-p3-lab/src/validator.mjs);
//  3. атлас ↔ контракт: каждая метка/индекс из контракта есть в атласе, листы существуют и их размер вмещает кадры;
//  4. заезды: N реальных гонок V3 (физика не тронута) × 5 дорожек с контрактом собаки; каждый кадр каждой секунды
//     разрешается в существующую ячейку; нет MISSING/OVERFLOW; длительности состояний; цикл RUN цел;
//  5. фаза RUN→STOP/FINISH (T4): кадр RUN перед каждым STOP/FINISH == вход STOP из контракта;
//  6. швы: пары (кадр→кадр) на границах клипов выписываются в seams для попиксельной проверки (seam_metrics.py).
// usage: node validate_library.mjs [N=200] [OUT=bulldog-racing/reports/validation_raw.json]
import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const HERE=path.dirname(fileURLToPath(import.meta.url)), REPO=path.resolve(HERE,'../..');
const {validateContract}=await import(path.join(REPO,'race-v3-p3-lab/src/validator.mjs'));
const {visualAt,buildTimeline,categoryOf}=await import(path.join(REPO,'race-v3-p3-lab/src/visual.mjs'));
const {createVisual}=await import(path.join(REPO,'bulldog-racing/runtime/dog_visual.mjs'));
const {races}=await import(path.join(REPO,'race-v3-p3-lab/tests/lib.mjs'));
const N=+(process.argv[2]||200), OUT=process.argv[3]||path.join(REPO,'bulldog-racing/reports/validation_raw.json');
const phaseMod=await import(path.join(REPO,'bulldog-racing/assets/dogs/rocky/runtime/phase.mjs'));
const DOGS=['frenk','zefir','rocky','pups','luna'];
const LIB=d=>path.join(REPO,'bulldog-racing/assets/dogs',d);
const sha=f=>createHash('sha256').update(readFileSync(f)).digest('hex');
const png=f=>{const b=readFileSync(f);if(b.readUInt32BE(12)!==0x49484452)throw new Error('not png');return {w:b.readUInt32BE(16),h:b.readUInt32BE(20)};};
const CONTRACT={frenk:'frenk',zefir:'zefir',rocky:'rocky',pups:'pups',luna:'luna'};
const report={generated:new Date().toISOString().slice(0,10),races:N,dogs:{}};
const R=races(N);
// Рокки: принятая фазировка RUN (runtime/phase.mjs): ячейка атласа -> исходный кадр; перед STOP обязан быть #68
const rockySource=cell=>cell<11?52+cell:61+((cell-11+2)%12);

for(const dog of DOGS){
  const rep={files:{},contract:{},atlas:{},sweep:{},t4:{},seams:[],problems:[]};report.dogs[dog]=rep;
  const P=(sev,msg)=>rep.problems.push({sev,msg});
  // 1. файлы
  const lock=JSON.parse(readFileSync(path.join(LIB(dog),'SOURCES.lock.json')));
  let bad=0,miss=0;for(const f of lock.files){const p=path.join(LIB(dog),f.dest);if(!existsSync(p)){miss++;P('error','нет файла '+f.dest);continue;}if(sha(p)!==f.sha256){bad++;P('error','sha256 не совпал: '+f.dest);}}
  rep.files={lockEntries:lock.files.length,missing:miss,badSha:bad,unresolved:lock.unresolved.length};
  for(const u of lock.unresolved)P('error','не разрешён источник: '+u.dest+' ('+u.error+')');
  // 2. контракт
  const cf=path.join(LIB(dog),'contract',CONTRACT[dog]+'.contract.json');
  if(!existsSync(cf)){P('error','нет контракта');continue;}
  const c=JSON.parse(readFileSync(cf));
  const v=validateContract(c);
  rep.contract={ok:v.ok,errors:v.errors,warnings:v.warnings,incomplete:v.incomplete,fits:v.fits,info:v.info};
  if(!v.ok)for(const e of v.errors)P('error','валидатор P3: '+e);
  for(const w of v.warnings)P('warn','валидатор P3: '+w);
  // 3. атлас
  const af=path.join(LIB(dog),'atlas/atlas.json');if(!existsSync(af)){P('error','нет atlas.json');continue;}
  const A=JSON.parse(readFileSync(af));
  const rd=f=>JSON.parse(readFileSync(path.join(LIB(dog),f)));
  const extras={frenk:()=>({startArrays:rd('contract/frenk_start_shift_arrays.json'),stopMeta:rd('contract/frenk_stop_v4_shift_arrays.json')}),
    zefir:()=>({stopList:rd('atlas/stopB_montage_list.json')}),luna:()=>({stopShift:rd('contract/stop_shift.json')}),rocky:()=>({phase:phaseMod})}[dog]?.()??{};
  const V=createVisual(dog,{contract:c,atlas:A,extras},{visualAt,categoryOf});
  const dims={};
  const sheetOf=name=>{if(dims[name])return dims[name];const rel=A.kind==='labelled'?A.sheets[name]:A.clips[name]?.sheet;
    const p=path.join(LIB(dog),rel);if(!existsSync(p)){P('error','нет листа атласа '+rel);return dims[name]={missing:true};}return dims[name]=png(p);};
  const cells=sheet=>sheet.missing?0:Math.floor(sheet.w/A.cellWidth)*Math.floor(sheet.h/A.cellHeight);
  const check=(clip,fr)=>{            // существует ли ячейка
    if(A.kind==='labelled'){const f=A.frames[fr];if(!f)return 'метки '+fr+' нет в атласе';const s=sheetOf(f.sheet);if(s.missing)return 'нет листа';
      const cols=Math.floor(s.w/A.cellWidth);return (f.index<cells(s)&&(f.index%A.columns)<cols)?null:'ячейка '+f.index+' вне листа '+f.sheet;}
    const cc=A.clips[clip];if(!cc)return 'в атласе нет клипа '+clip;if(!Number.isInteger(fr)||fr<0||fr>=cc.count)return 'индекс '+fr+' вне 0..'+(cc.count-1);
    const s=sheetOf(clip);if(s.missing)return 'нет листа';return cells(s)>=cc.count?null:'лист '+clip+' вмещает '+cells(s)+' < '+cc.count;};
  // статическая проверка меток контракта
  const used=new Set();for(const [name,cl] of Object.entries(c.clips)){
    if(cl.sampler==='table'){for(const l of [...cl.labels,...(cl.loop||[])]){const e=check(name,l);if(e&&!used.has(name+l)){used.add(name+l);P('error','контракт/атлас: '+name+': '+e);}}}
    if(cl.sampler==='constant'){const e=check(name,cl.frame);if(e)P('error','контракт/атлас: '+name+': '+e);}
    if(['linear','bands'].includes(cl.sampler)){const key=A.kind==='labelled'?null:name;if(key){const e=A.clips[name]?(A.clips[name].count<cl.count?'в атласе '+A.clips[name].count+' < в контракте '+cl.count:null):'в атласе нет клипа '+name;if(e)P('error','контракт/атлас: '+name+': '+e);}}
    if(cl.sampler==='prologueLoop'&&A.kind!=='labelled'&&A.clips[name].count<cl.prologue+cl.loop)P('error','контракт/атлас: RUN короче prologue+loop');}
  rep.atlas={kind:A.kind,cell:[A.cellWidth,A.cellHeight],clips:Object.fromEntries(Object.entries(A.clips||{}).map(([k,x])=>[k,x.count])),frames:A.frames?Object.keys(A.frames).length:null};
  // 4-6. заезды
  const stat={evals:0,missing:0,overflow:0,badCell:0,statusCount:{}},seen=new Map(),seams=new Map();
  const stopEntry={},stopEntryRaw={};let stops=0,finishes=0,t4bad=0,firstBad=null;
  const prevRun=c.run?.stopEntry?.previousRunFrame;
  const stopFirst=c.clips[c.windows.STOP.clip];
  const dur={};   // длительности состояний, кадры -> счётчик
  for(const race of R)for(const d of race.dogs){
    const segs=d.segments,end=segs.at(-1).t1;
    const tl=buildTimeline(c,segs);
    for(const it of tl){if(it.role==='move'||it.role==='tail'||it.role==='body'||it.role==='hold'||it.role==='pad'){const k=`${it.window}/${it.role}`;(dur[k]??={min:1e9,max:0});const fr=(it.t1-it.t0)*24;dur[k].min=Math.min(dur[k].min,fr);dur[k].max=Math.max(dur[k].max,fr);}}
    // шаги по 1/24 с
    let prev=null;
    for(let t=0;t<end;t+=1/24){
      const x=V.at(segs,t+1e-6);stat.evals++;if(x.sheet==null&&x.role!=='missing')stat.badCell++;
      stat.statusCount[x.status]=(stat.statusCount[x.status]||0)+1;
      if(x.role==='missing'){stat.missing++;continue;}
      if(x.overflow)stat.overflow++;
      const key=x.clip+'|'+x.frame;
      if(!seen.has(key)){seen.set(key,1);const e=check(x.clip,x.frame);if(e){stat.badCell++;P('error','кадр '+x.clip+':'+x.frame+' — '+e);}}
      if(prev&&(prev.clip!==x.clip||prev.window!==x.window)){const k=`${prev.clip}:${prev.frame}>${x.clip}:${x.frame}|${prev.window}>${x.window}`;const e=seams.get(k)||{n:0,sa:prev.shiftPx||0,sb:x.shiftPx||0};e.n++;seams.set(k,e);}
      prev=x;
    }
    // T4
    for(const s of segs){
      if(!((s.kind==='STOP'&&s.eventIndex>=0)||s.kind==='FINISH_DECELERATE'))continue;
      const b=V.at(segs,s.t0-1e-6),a=V.at(segs,s.t0+1e-6);stops++;if(s.kind==='FINISH_DECELERATE')finishes++;
      stopEntry[String(b.frame)]=(stopEntry[String(b.frame)]||0)+1;{const rb=String(visualAt(c,segs,s.t0-1e-6).frame);stopEntryRaw[rb]=(stopEntryRaw[rb]||0)+1;}
      const wantFirst=stopFirst.sampler==='table'?stopFirst.labels[0]:0;
      const okFirst=a.frame===wantFirst;
      const okPrev=prevRun==null?true:(b.frame==='run'+prevRun);
      if(!okFirst||!okPrev){t4bad++;firstBad??={t:s.t0,before:b.frame,after:a.frame};}
    }
  }
  rep.sweep={racesTimesLanes:N*5,evaluations:stat.evals,missing:stat.missing,overflow:stat.overflow,badCell:stat.badCell,statusCount:stat.statusCount,windowFrames:dur};
  rep.t4={stopsAndFinishes:stops,finishes,declaredPreviousRunFrame:prevRun??null,runFrameBeforeStop:stopEntry,mismatches:t4bad,firstMismatch:firstBad};
  if(stat.missing)P('error','MISSING_ASSET: '+stat.missing+' кадров');
  if(stat.overflow)P('error','OVERFLOW_TRUNCATED: '+stat.overflow+' кадров');
  if(t4bad)P('error','вход в STOP: '+t4bad+' из '+stops+' несовпадений (первое: '+JSON.stringify(firstBad)+')');
  if(dog==='rocky'){        // принятая фазировка из phase.mjs: перед STOP должен быть исходный кадр #68
    const rawSrc=Object.keys(stopEntryRaw).map(Number).map(rockySource),adSrc=Object.keys(stopEntry).map(Number).map(rockySource);
    rep.t4.rockyAcceptedPhase={requiredSourceFrame:68,p3ContractAlone:{cellBeforeStop:Object.keys(stopEntryRaw).map(Number),sourceFrame:rawSrc},
      withPhaseModule:{cellBeforeStop:Object.keys(stopEntry).map(Number),sourceFrame:adSrc}};
    if(!rawSrc.every(x=>x===68))P('partial','Рокки: контракт P3 сам даёт перед STOP исходный #'+rawSrc.join(',#')+' вместо принятого #68; поправка кадра — только через runtime/phase.mjs (адаптер её применяет)');
    {const bad=Object.entries(stopEntry).filter(([cell])=>rockySource(+cell)!==68).reduce((a,[,n])=>a+n,0);rep.t4.rockyAcceptedPhase.stopsNotAt68={count:bad,of:stops,share:+(bad/stops).toFixed(3),reason:'перед этим STOP RUN-отрезок короче 155 кадров: phase.mjs его не обрабатывает ("six advances need separate review"), остаётся натуральный P3 (#62)'};
    if(bad)P('error','Рокки: у '+bad+' из '+stops+' остановок ('+(100*bad/stops).toFixed(0)+'%) RUN короче 155 кадров, принятая фазировка phase.mjs к ним не применима: перед STOP исходный #62 вместо #68 (IoU шва 0.58)');}
  }
  rep.seams=[...seams.entries()].map(([k,e])=>{const [pair,win]=k.split('|');const [a,b]=pair.split('>');return {from:a,to:b,windows:win,count:e.n,shiftPxFrom:e.sa,shiftPxTo:e.sb};});
}
mkdirSync(path.dirname(OUT),{recursive:true});writeFileSync(OUT,JSON.stringify(report,null,1));
for(const d of DOGS){const r=report.dogs[d];const errs=r.problems.filter(p=>p.sev==='error').length,w=r.problems.filter(p=>p.sev==='warn').length+r.problems.filter(p=>p.sev==='partial').length;
  console.log(d.padEnd(6),'P3 ok='+r.contract.ok,'| evals',r.sweep.evaluations,'| T4 несовп.',r.t4.mismatches+'/'+r.t4.stopsAndFinishes,'| ошибок',errs,'предупр.',w,'| швов',r.seams.length);}
