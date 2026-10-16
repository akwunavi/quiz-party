import {FPS,RACES,stateAt} from '../race-start-v3-lab/model.mjs';
import {visualRunFrame,sourceForCell,skipAfterCells} from './phase.mjs';
import {speedDogs} from './speed_scenarios.mjs';

const layout=await fetch('../race-start-v3-lab/layout.json').then(r=>r.json());
const load=src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
const assets={};
for(const [key,path] of Object.entries({
  arena:'../race-start-v3-lab/assets/arena.png',
  BASE:'../race-start-v3-lab/assets/rocky-base.png',
  START:'../race-start-v3-lab/assets/rocky-start.png',
  RUN:'../race-start-v3-lab/assets/rocky-run.png',
  STOP:'../stop-v3-lab/assets/stop.png',
}))assets[key]=await load(path);
const canvas=document.getElementById('race'),ctx=canvas.getContext('2d',{alpha:false});
const $=id=>document.getElementById(id);
const eventDog=RACES.A.dogs[1],finishDog=RACES.A.dogs[0];
const eventStop=eventDog.segments.find(s=>s.kind==='STOP');
const restart=eventDog.segments.find(s=>s.kind==='START'&&!s.initial);
const finishStop=finishDog.segments.find(s=>s.kind==='FINISH_DECELERATE');
const modes={
  chain:{dog:eventDog,t0:eventStop.t0-3,t1:restart.t1+3},
  finish:{dog:finishDog,t0:finishStop.t0-3,t1:finishStop.t1+2},
  compare:{dog:eventDog,t0:eventStop.t0-6,t1:eventStop.t1+1},
  speeds:{dogs:speedDogs,t0:0,t1:speedDogs[0].end},
};
let mode='chain',time=0,playing=false,reference=0,referenceTime=0;
const sheet={w:178,h:100,columns:24};
function sprite(clip,frame,x,y){
  const im=assets[clip],{w,h,columns}=sheet;
  ctx.drawImage(im,(frame%columns)*w,Math.floor(frame/columns)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);
}
function frameForView(dog,absolute,newPhase){
  const s=stateAt(dog,absolute),seg=dog.segments.find(x=>x.kind===s.segment&&x.t0<=absolute+1e-8&&x.t1>absolute-1e-8);
  if(s.clip==='RUN'&&newPhase){s.frame=visualRunFrame(seg,absolute);s.source=sourceForCell(s.frame);}
  else if(s.clip==='RUN')s.source=sourceForCell(s.frame);
  if(!assets[s.clip]){s.clip='BASE';s.frame=0;}
  return s;
}
function dogAt(dog,absolute,lane,newPhase,label){
  const s=frameForView(dog,absolute,newPhase);
  const x=layout.startX+s.progress*(layout.finishX-layout.startX+layout.finishControlOffset);
  ctx.fillStyle='rgba(20,39,40,.31)';ctx.fillRect(0,lane-111,layout.width,151);
  ctx.strokeStyle='rgba(255,247,211,.70)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  sprite(s.clip,s.frame,x-layout.spriteAnchorX,lane-layout.spriteTopOffset);
  ctx.font='bold 29px system-ui';ctx.fillStyle='#fff9dc';ctx.fillText(label,28,lane-74);
  ctx.font='25px system-ui';ctx.fillText(`${s.segment} · ${s.clip} ${s.source??s.frame} · p=${s.progress.toFixed(4)}`,1350,lane-74);
  return s;
}
function draw(relative){
  const config=modes[mode],absolute=config.t0+relative;
  ctx.drawImage(assets.arena,0,0,1920,1080);
  ctx.fillStyle='rgba(21,38,40,.86)';ctx.fillRect(0,0,1920,155);
  ctx.fillStyle='#fff4cc';ctx.font='bold 39px system-ui';ctx.fillText('РОККИ · RUN PHASE · RACE V3',28,58);
  ctx.font='27px system-ui';ctx.fillText(`Модель ${absolute.toFixed(3)} с · кадр предпросмотра ${Math.floor(relative*FPS)} · 24 FPS`,28,111);
  if(mode==='speeds'){
    for(const d of speedDogs)dogAt(d,absolute,365+d.index*145,true,`${d.index+1} · ${d.name} · ${d.base.toFixed(2)}×`);
  }else if(mode==='compare'){
    dogAt(config.dog,absolute,470,false,'ПРЕЖНЯЯ ФАЗА');
    dogAt(config.dog,absolute,800,true,'НОВАЯ ФАЗА');
  }else dogAt(config.dog,absolute,620,true,mode==='finish'?'FINISH · НОВАЯ ФАЗА':'ВОЗВРАТ В RUN · НОВАЯ ФАЗА');
  $('clock').textContent=`${relative.toFixed(2)} / ${(config.t1-config.t0).toFixed(2)} с`;
  $('scrub').value=String(Math.floor(relative*FPS));
}
function seek(seconds){time=Math.max(0,Math.min(modes[mode].t1-modes[mode].t0,seconds));reference=performance.now();referenceTime=time;draw(time);return (modes[mode].dogs??[modes[mode].dog]).map(d=>stateAt(d,modes[mode].t0+time));}
function pause(){playing=false;$('play').textContent='▶ Play';}
function select(next){pause();mode=next;$('mode').value=next;$('scrub').max=String(Math.ceil((modes[next].t1-modes[next].t0)*FPS)-1);seek(0);}
function tick(now){if(playing){time=Math.min(modes[mode].t1-modes[mode].t0,referenceTime+(now-reference)/1000);draw(time);if(time>=modes[mode].t1-modes[mode].t0)pause();}requestAnimationFrame(tick);}
$('mode').onchange=()=>select($('mode').value);
$('play').onclick=()=>{if(playing){pause();return;}if(time>=modes[mode].t1-modes[mode].t0)seek(0);playing=true;reference=performance.now();referenceTime=time;$('play').textContent='Ⅱ Пауза';};
$('reset').onclick=()=>{pause();seek(0);};
$('scrub').oninput=()=>{pause();seek(Number($('scrub').value)/FPS);};
window.rockyPhaseLab={ready:true,seek,select,modes,stateAt,skipAfterCells,get mode(){return mode},get time(){return time}};
$('status').textContent='Готово: три режима, неизменённый Race V3 stateAt. Действия без клипа показаны стойкой.';
select('chain');requestAnimationFrame(tick);
