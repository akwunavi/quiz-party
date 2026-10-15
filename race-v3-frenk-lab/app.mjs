// Isolated browser lab: Frenk (Bulldog №1) next to Bulldog №4 on the real V3 arena.
// Physics, scenario planner and Bulldog №4 drawing are the UNMODIFIED dog4-v3-lab modules / identical draw code.
// Frenk lanes use the same physical segments; only the sprite source differs (frenk.mjs).
import {PRESETS,RACES,buildDog,stateAt} from '../dog4-v3-lab/model.mjs';
import {resolveRace,CATEGORIES} from '../dog4-v3-lab/scenario.mjs';
import {loadFrenk,frenkVisual,drawFrenk,frenkGeometry} from './frenk.mjs';
const canvas=document.getElementById('race'),ctx=canvas.getContext('2d',{alpha:false});
const $=id=>document.getElementById(id);
const [manifest,layout]=await Promise.all([fetch('./dog4assets/manifest.json').then(r=>r.json()),fetch('../dog4-v3-lab/layout.json').then(r=>r.json())]);
const image=url=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=url;});
const assets={};for(const [clip,meta] of Object.entries(manifest.clips))assets[clip]=await image(meta.file);
assets.ARENA=await image('./dog4assets/arena.png');
const F=await loadFrenk('./');
const COURSE=layout.finishX-layout.startX+layout.finishControlOffset;
const BASES=Object.fromEntries(CATEGORIES.map(([n,b])=>[n,b])), CAT_ORDER=['VERY_FAST','FAST','NORMAL','SLOW','VERY_SLOW'];

// ---- lab presets (custom 5-lane races built with the unmodified buildDog). char: 'dog4' | 'frenk'
function labRace(key,lanes){
  PRESETS[key]={name:key,dogs:lanes.map(l=>({name:l.name,base:l.base,variations:[1,1,1,1],events:l.events}))};
  const dogs=lanes.map((l,i)=>buildDog(key,i));
  const places=[...dogs].sort((a,b)=>a.crossing-b.crossing||a.index-b.index).map(d=>d.index);
  return {dogs,places,end:Math.max(...dogs.map(d=>d.end)),chars:lanes.map(l=>l.char),title:key};
}
const LAB={
  CHAIN_ALL:()=>labRace('CHAIN_ALL',CAT_ORDER.map(c=>({char:'frenk',name:`ФРЭНК · ${c} · SNIFF`,base:BASES[c],events:[['SNIFF_PEE',.35]]}))),
  BUTTERFLY_ALL:()=>labRace('BUTTERFLY_ALL',CAT_ORDER.map(c=>({char:'frenk',name:`ФРЭНК · ${c} · BUTTERFLY`,base:BASES[c],events:[['BUTTERFLY',.35]]}))),
  PAIR:()=>labRace('PAIR',[
    {char:'dog4',name:'№4 · NORMAL · SNIFF',base:1,events:[['SNIFF_PEE',.35]]},
    {char:'frenk',name:'ФРЭНК · NORMAL · SNIFF',base:1,events:[['SNIFF_PEE',.35]]},
    {char:'dog4',name:'№4 · NORMAL · BUTTERFLY',base:1,events:[['BUTTERFLY',.35]]},
    {char:'frenk',name:'ФРЭНК · NORMAL · BUTTERFLY',base:1,events:[['BUTTERFLY',.35]]},
    {char:'frenk',name:'ФРЭНК · NORMAL · ROLL (нет клипа)',base:1,events:[['ROLL',.35]]}]),
};
let preset='PAIR',t=0,playing=false,reference=0,referenceTime=0,race=null,frenkLane=-1;
function build(){
  if(preset==='RANDOM'){
    const r=resolveRace(Number($('seed').value));                      // identical planner and physics as dog4-v3-lab
    race={...r,chars:r.dogs.map((d,i)=>i===frenkLane?'frenk':'dog4'),title:`SEED ${r.requestedSeed}${r.effectiveSeed===r.requestedSeed?'':' → '+r.effectiveSeed}`};
  }else race=LAB[preset]();
  diagnostics=[];table();seek(0);
}
let diagnostics=[];
const timeLabel=s=>`${Math.floor(s/60)}:${(s%60).toFixed(2).padStart(5,'0')}`;
function sprite(clip,frame,x,y){
  const {cellWidth:w,cellHeight:h,columns:c}=manifest;
  ctx.drawImage(assets[clip],(frame%c)*w,Math.floor(frame/c)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);
}
function draw(elapsed){
  ctx.drawImage(assets.ARENA,0,0,layout.width,layout.height);
  ctx.fillStyle='rgba(21,38,40,.84)';ctx.fillRect(0,0,layout.width,155);
  ctx.fillStyle='#fff4cc';ctx.font='bold 39px system-ui';ctx.fillText(`ФРЭНК + BULLDOG №4 · LAB · ${race.title}`,28,58);
  ctx.font='27px system-ui';ctx.fillText(`Время ${timeLabel(elapsed)}  ·  физика V3 без изменений`,30,110);
  ctx.strokeStyle='rgba(255,250,217,.95)';ctx.lineWidth=5;
  ctx.beginPath();ctx.moveTo(layout.startX,170);ctx.lineTo(layout.startX,1006);ctx.moveTo(layout.finishX,170);ctx.lineTo(layout.finishX,1006);ctx.stroke();
  ctx.font='bold 22px system-ui';ctx.fillText('СТАРТ',layout.startX-34,189);ctx.fillText('ФИНИШ',layout.finishX-47,189);
  for(const dog of race.dogs){
    const lane=layout.laneTop+dog.index*layout.laneStep, isFrenk=race.chars[dog.index]==='frenk';
    ctx.fillStyle=dog.index%2?'rgba(20,39,40,.22)':'rgba(20,39,40,.32)';ctx.fillRect(0,lane-111,layout.width,151);
    ctx.strokeStyle='rgba(255,247,211,.62)';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
    ctx.fillStyle=isFrenk?'#ffd08a':'#fff9dc';ctx.font='bold 27px system-ui';ctx.fillText(String(dog.index+1).padStart(2,'0'),24,lane-66);
    ctx.font='23px system-ui';ctx.fillText(dog.name,75,lane-66);
    const s=stateAt(dog,elapsed),x=layout.startX+s.progress*COURSE;
    let phase=s.complete?'BASE_STAND':s.segment==='RUN'&&s.finished?'RUN → FINISH':s.segment;
    if(isFrenk){
      const v=frenkVisual(F,dog,elapsed);drawFrenk(ctx,F,layout,v,x,lane);
      phase+=`  ·  ${v.label??'—'}`;
      if(v.diagnostic){ctx.fillStyle='#ff6b5e';ctx.font='bold 19px system-ui';ctx.fillText('⚠ '+v.diagnostic,720,lane-66);if(!diagnostics.includes(v.diagnostic))diagnostics.push(v.diagnostic);}
    }else{
      ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
      sprite(s.clip,s.frame,x-layout.spriteAnchorX,lane-layout.spriteTopOffset);
    }
    ctx.fillStyle='#fff9e6';ctx.font='20px system-ui';ctx.fillText(phase,1560,lane-58);
    ctx.font='19px system-ui';
    const completed=dog.eventsActual.filter(e=>e.actionEnd<=elapsed+1e-8).length;
    ctx.fillText(`${Math.min(100,Math.max(0,s.progress*100)).toFixed(1)}% · ${completed}/${dog.events.length} событий`,1560,lane-27);
    if(s.finished){ctx.fillStyle='#fff3ad';ctx.font='bold 21px system-ui';ctx.fillText(`#${race.places.indexOf(dog.index)+1} · ${dog.crossing.toFixed(2)} с`,1560,lane+4);}
  }
  $('clock').textContent=timeLabel(elapsed);$('scrub').value=String(Math.round(elapsed/race.end*1000));
  $('diag').textContent=diagnostics.length?'Диагностика: '+diagnostics.join(' · '):'';
}
function seek(seconds){t=Math.max(0,Math.min(race.end,Number(seconds)));reference=performance.now();referenceTime=t;draw(t);}
function pause(){playing=false;$('play').textContent='▶ Play';}
function tick(now){if(playing){t=Math.min(race.end,referenceTime+(now-reference)/1000*Number($('speed').value));draw(t);if(t>=race.end)pause();}requestAnimationFrame(tick);}
function table(){$('table').innerHTML='<tr><th>№</th><th>Персонаж</th><th>Сценарий</th><th>Темп</th><th>События</th><th>Финиш</th><th>Место</th></tr>'+race.dogs.map(d=>`<tr><td>${d.index+1}</td><td>${race.chars[d.index]==='frenk'?'Фрэнк':'№4'}</td><td>${d.name}</td><td>${d.base.toFixed(2)}×</td><td>${d.eventsActual.map(e=>e.kind+' '+Math.round(e.actual*100)+'%').join(', ')||'—'}</td><td>${d.crossing.toFixed(3)} с</td><td>${race.places.indexOf(d.index)+1}</td></tr>`).join('');}
$('preset').onchange=()=>{pause();preset=$('preset').value;try{build();}catch(e){$('status').textContent=e.message;}};
$('generate').onclick=()=>{pause();preset='RANDOM';$('preset').value='RANDOM';try{build();}catch(e){$('status').textContent=e.message;}};
$('frenklane').onchange=()=>{frenkLane=Number($('frenklane').value);if(preset==='RANDOM')build();};
$('play').onclick=()=>{if(playing){pause();return;}if(t>=race.end)seek(0);playing=true;reference=performance.now();referenceTime=t;$('play').textContent='Ⅱ Пауза';};
$('reset').onclick=()=>{pause();seek(0);};
$('speed').onchange=()=>{reference=performance.now();referenceTime=t;};
$('scrub').oninput=()=>seek(Number($('scrub').value)/1000*race.end);
build();
window.frenkLab={ready:true,
  select(key,{seed,lane}={}){pause();if(seed!==undefined)$('seed').value=String(seed);if(lane!==undefined){frenkLane=lane;$('frenklane').value=String(lane);}preset=key;$('preset').value=key;build();return race.dogs.map(d=>({crossing:d.crossing,place:race.places.indexOf(d.index)+1,end:d.end}));},
  seek,get race(){return race;},
  frenkAt(i,time){const d=race.dogs[i],s=stateAt(d,time),x=layout.startX+s.progress*COURSE,v=frenkVisual(F,d,time);return {x,segment:s.segment,...v,...frenkGeometry(F,layout,v,x)};},
  dog4At(i,time){const d=race.dogs[i],s=stateAt(d,time);return {x:layout.startX+s.progress*COURSE,segment:s.segment,clip:s.clip,frame:s.frame};},
  get diagnostics(){return diagnostics.slice();}};
$('status').textContent='Готово';
requestAnimationFrame(tick);
