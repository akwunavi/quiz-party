import {PRESETS,RACES,stateAt} from './model.mjs';
import {resolveRace} from './scenario.mjs';
const canvas=document.getElementById('race'),ctx=canvas.getContext('2d',{alpha:false});
const $=id=>document.getElementById(id);
const [manifest,layout]=await Promise.all([fetch('./manifest.json').then(r=>r.json()),fetch('./layout.json').then(r=>r.json())]);
const image=url=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=url;});
const assets={};for(const [clip,meta] of Object.entries(manifest.clips))assets[clip]=await image(meta.file);
assets.ARENA=await image('./assets/arena.png');
let preset='A',t=0,playing=false,reference=0,referenceTime=0;
let randomRace=null;
const activeRace=()=>preset==='RANDOM'?randomRace:RACES[preset];
function selectRandom(seed){
  if(String(seed).trim()==='')throw new RangeError('Введите целое значение seed');
  const requested=Number(seed),next=resolveRace(requested);
  pause();randomRace=next;preset='RANDOM';$('preset').value='RANDOM';$('seed').value=String(requested);
  table();seek(0);$('status').textContent=`Seed ${requested} → ${next.effectiveSeed} · проверено ${next.candidatesChecked}`;
  return next;
}
const timeLabel=s=>`${Math.floor(s/60)}:${(s%60).toFixed(2).padStart(5,'0')}`;
function sprite(clip,frame,x,y){
  const {cellWidth:w,cellHeight:h,columns:c}=manifest;
  ctx.drawImage(assets[clip],(frame%c)*w,Math.floor(frame/c)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);
}
function draw(elapsed){
  const race=activeRace();
  ctx.drawImage(assets.ARENA,0,0,layout.width,layout.height);
  ctx.fillStyle='rgba(21,38,40,.84)';ctx.fillRect(0,0,layout.width,155);
  const name=preset==='RANDOM'?`SEED ${race.requestedSeed}${race.effectiveSeed===race.requestedSeed?'':` → ${race.effectiveSeed}`}`:PRESETS[preset].name;
  ctx.fillStyle='#fff4cc';ctx.font='bold 39px system-ui';ctx.fillText(`BULLDOG №4 · 5 ДОРОЖЕК · ${name}`,28,58);
  ctx.font='27px system-ui';ctx.fillText(`Время ${timeLabel(elapsed)}  ·  место по пересечению линии`,30,110);
  ctx.strokeStyle='rgba(255,250,217,.95)';ctx.lineWidth=5;
  ctx.beginPath();ctx.moveTo(layout.startX,170);ctx.lineTo(layout.startX,1006);ctx.moveTo(layout.finishX,170);ctx.lineTo(layout.finishX,1006);ctx.stroke();
  ctx.font='bold 22px system-ui';ctx.fillText('СТАРТ',layout.startX-34,189);ctx.fillText('ФИНИШ',layout.finishX-47,189);
  for(const dog of race.dogs){
    const lane=layout.laneTop+dog.index*layout.laneStep;
    ctx.fillStyle=dog.index%2?'rgba(20,39,40,.22)':'rgba(20,39,40,.32)';ctx.fillRect(0,lane-111,layout.width,151);
    ctx.strokeStyle='rgba(255,247,211,.62)';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
    ctx.fillStyle='#fff9dc';ctx.font='bold 27px system-ui';ctx.fillText(String(dog.index+1).padStart(2,'0'),24,lane-66);
    ctx.font='23px system-ui';ctx.fillText(dog.name,75,lane-66);
    // At progress 1 the approved BASE rear contour clears the visual finish line.
    // The same mapping applies during RUN, every event and finish deceleration.
    const s=stateAt(dog,elapsed),x=layout.startX+s.progress*(layout.finishX-layout.startX+layout.finishControlOffset);
    ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
    sprite(s.clip,s.frame,x-layout.spriteAnchorX,lane-layout.spriteTopOffset);
    ctx.fillStyle='#fff9e6';ctx.font='20px system-ui';
    const phase=s.complete?'BASE_STAND':s.segment==='RUN'&&s.finished?'RUN → FINISH':s.segment;
    ctx.fillText(phase,1660,lane-58);
    ctx.font='19px system-ui';
    const completed=dog.eventsActual.filter(e=>e.actionEnd<=elapsed+1e-8).length;
    ctx.fillText(`${Math.min(100,Math.max(0,s.progress*100)).toFixed(1)}% · ${completed}/${dog.events.length} событий`,1660,lane-27);
    if(s.finished){ctx.fillStyle='#fff3ad';ctx.font='bold 21px system-ui';ctx.fillText(`#${race.places.indexOf(dog.index)+1} · ${dog.crossing.toFixed(2)} с`,1660,lane+4);}
  }
  $('clock').textContent=timeLabel(elapsed);$('scrub').value=String(Math.round(elapsed/race.end*1000));
}
function seek(seconds){const race=activeRace();t=Math.max(0,Math.min(race.end,Number(seconds)));reference=performance.now();referenceTime=t;draw(t);return race.dogs.map(d=>stateAt(d,t));}
function pause(){playing=false;$('play').textContent='▶ Play';}
function tick(now){if(playing){const race=activeRace();t=Math.min(race.end,referenceTime+(now-reference)/1000*Number($('speed').value));draw(t);if(t>=race.end)pause();}requestAnimationFrame(tick);}
function table(){const race=activeRace();$('table').innerHTML='<tr><th>№</th><th>Сценарий</th><th>Базовый темп</th><th>Вариации сегментов</th><th>События</th><th>Финиш</th><th>Место</th></tr>'+race.dogs.map(d=>`<tr><td>${d.index+1}</td><td>${d.name}</td><td>${d.base.toFixed(2)}×</td><td>${d.variations.map(x=>x.toFixed(2)).join(' · ')}</td><td>${d.eventsActual.map(e=>e.kind+' '+Math.round(e.actual*100)+'%').join(', ')||'—'}</td><td>${d.crossing.toFixed(2)} с</td><td>${race.places.indexOf(d.index)+1}</td></tr>`).join('');}
$('preset').onchange=()=>{if($('preset').value==='RANDOM'){try{selectRandom($('seed').value);}catch(e){$('preset').value=preset;$('status').textContent=e.message;}}else{pause();preset=$('preset').value;table();seek(0);}};
$('generate').onclick=()=>{try{selectRandom($('seed').value);}catch(e){$('status').textContent=e.message;}};
$('play').onclick=()=>{if(playing){pause();return;}if(t>=activeRace().end)seek(0);playing=true;reference=performance.now();referenceTime=t;$('play').textContent='Ⅱ Пауза';};
$('reset').onclick=()=>{pause();seek(0);};
$('speed').onchange=()=>{reference=performance.now();referenceTime=t;};
$('scrub').oninput=()=>seek(Number($('scrub').value)/1000*activeRace().end);
table();window.raceV3={ready:true,select:key=>{if(key==='RANDOM')return selectRandom($('seed').value);pause();preset=key;$('preset').value=key;table();return seek(0);},selectRandom,seek,reset:()=>{pause();seek(0);},stateAt:(i,time)=>stateAt(activeRace().dogs[i],time),get preset(){return preset;},get race(){return activeRace();}};
$('status').textContent='Готово · пять дорожек · один clock';draw(0);requestAnimationFrame(tick);
