import {FPS,RACES,stateAt} from '../race-start-v3-lab/model.mjs';
import {visualRunFrame,sourceForCell} from '../run-phase-v3-lab/phase.mjs';
import {speedDogs} from './speed_profiles.mjs';

const layout=await fetch('../race-start-v3-lab/layout.json').then(r=>r.json());
const retiming=await fetch('./retiming.json').then(r=>r.json());
const load=src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
const assets={};
for(const [key,path] of Object.entries({
  arena:'../race-start-v3-lab/assets/arena.png',
  BASE:'../race-start-v3-lab/assets/rocky-base.png',
  START:'../race-start-v3-lab/assets/rocky-start.png',
  RUN:'../race-start-v3-lab/assets/rocky-run.png',
  STOP:'../stop-v3-lab/assets/stop.png',
  ROLL:'./assets/rocky-roll-B.png',
}))assets[key]=await load(path);
const canvas=document.getElementById('race'),ctx=canvas.getContext('2d',{alpha:false}),$=id=>document.getElementById(id);
const dog=RACES.A.dogs[3],stop=dog.segments.find(s=>s.kind==='STOP');
const action=dog.segments.find(s=>s.kind==='ROLL');
const restart=dog.segments.find(s=>s.kind==='START'&&!s.initial);
const modes={chain:{dog,t0:stop.t0-3,t1:restart.t1+3},action:{dog,t0:action.t0,t1:action.t1},speeds:{dogs:speedDogs,t0:0,t1:Math.max(...speedDogs.map(d=>d.end))}};
let mode='chain',time=0,playing=false,reference=0,referenceTime=0;

function sprite(clip,frame,x,y){
  const w=178,h=100,c=24,im=assets[clip];
  ctx.drawImage(im,(frame%c)*w,Math.floor(frame/c)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);
}
function at(d,absolute){
  const s=stateAt(d,absolute);
  if(s.segment==='RUN'){
    const segment=d.segments.find(x=>x.kind==='RUN'&&x.t0<=absolute+1e-8&&x.t1>absolute-1e-8);
    s.frame=visualRunFrame(segment,absolute);s.source=sourceForCell(s.frame);
  }
  if(s.segment==='ROLL'){
    s.source=retiming.gameFrameToSource[s.frame]??'STAND';
  }
  return s;
}
function drawDog(d,absolute,lane,label){
  const s=at(d,absolute),x=layout.startX+s.progress*(layout.finishX-layout.startX+layout.finishControlOffset);
  ctx.fillStyle='rgba(20,39,40,.31)';ctx.fillRect(0,lane-111,layout.width,151);
  ctx.strokeStyle='rgba(255,247,211,.70)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  sprite(s.clip,s.frame,x-layout.spriteAnchorX,lane-layout.spriteTopOffset);
  if(!window.rockyRollLab?.closeup){
    ctx.font='bold 27px system-ui';ctx.fillStyle='#fff9dc';ctx.fillText(label,28,lane-74);
    ctx.font='24px system-ui';ctx.fillText(`${s.segment} · ${s.clip} ${s.source??s.frame} · p=${s.progress.toFixed(4)}`,1310,lane-74);
  }
  return s;
}
function draw(relative){
  const c=modes[mode],absolute=c.t0+relative;
  ctx.drawImage(assets.arena,0,0,1920,1080);
  ctx.fillStyle='rgba(21,38,40,.86)';ctx.fillRect(0,0,1920,155);
  ctx.fillStyle='#fff4cc';ctx.font='bold 39px system-ui';ctx.fillText('РОККИ · ROLL V2 · ВАРИАНТ B',28,58);
  ctx.font='27px system-ui';ctx.fillText(`Модель ${absolute.toFixed(3)} с · предпросмотр ${relative.toFixed(3)} с · 24 FPS`,28,111);
  if(mode==='speeds')for(const d of speedDogs)drawDog(d,absolute,365+d.index*145,`${d.index+1} · ${d.name} · ${d.base.toFixed(2)}×`);
  else drawDog(c.dog,absolute,620,mode==='action'?'ROLL · ИГРОВОЙ МАСШТАБ':'RUN → STOP → ROLL → STAND → START → RUN');
  $('clock').textContent=`${relative.toFixed(2)} / ${(c.t1-c.t0).toFixed(2)} с`;
  $('scrub').value=String(Math.floor(relative*FPS));
}
function seek(seconds){time=Math.max(0,Math.min(modes[mode].t1-modes[mode].t0,seconds));reference=performance.now();referenceTime=time;draw(time);return (modes[mode].dogs??[modes[mode].dog]).map(d=>at(d,modes[mode].t0+time));}
function pause(){playing=false;$('play').textContent='▶ Play';}
function select(next){pause();mode=next;$('mode').value=next;$('scrub').max=String(Math.ceil((modes[next].t1-modes[next].t0)*FPS)-1);seek(0);}
function tick(now){if(playing){time=Math.min(modes[mode].t1-modes[mode].t0,referenceTime+(now-reference)/1000);draw(time);if(time>=modes[mode].t1-modes[mode].t0)pause();}requestAnimationFrame(tick);}
$('mode').onchange=()=>select($('mode').value);
$('play').onclick=()=>{if(playing){pause();return;}if(time>=modes[mode].t1-modes[mode].t0)seek(0);playing=true;reference=performance.now();referenceTime=time;$('play').textContent='Ⅱ Пауза';};
$('reset').onclick=()=>{pause();seek(0);};
$('scrub').oninput=()=>{pause();seek(Number($('scrub').value)/FPS);};
window.rockyRollLab={ready:true,seek,select,modes,at,stateAt,layout,get mode(){return mode},get time(){return time}};
$('status').textContent='Вариант B: подготовка перед переворотом, утверждённые клипы, визуальная фазировка RUN и неизменённый stateAt Race V3';
select('chain');requestAnimationFrame(tick);
