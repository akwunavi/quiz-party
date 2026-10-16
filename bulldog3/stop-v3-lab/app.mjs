import {stateAt,FPS} from './model.mjs';
import {STOP_FRAMES,end,dogs} from './scenario.mjs';

const canvas=document.getElementById('race'),ctx=canvas.getContext('2d',{alpha:false});
const $=id=>document.getElementById(id);
const [manifest,layout]=await Promise.all([
  fetch('./manifest.json').then(r=>r.json()),
  fetch('./layout.json').then(r=>r.json()),
]);
const image=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
const assets={};
for(const [clip,meta] of Object.entries(manifest.clips))assets[clip]=await image(meta.file);
assets.ARENA=await image('./assets/arena.png');

// The segment equations and frameFor/stateAt implementation come unchanged from V3.
// This diagnostic supplies only the three segments that Rocky already has.
let t=0,playing=false,reference=0,referenceTime=0;
function sprite(clip,frame,x,y){
  const {cellWidth:w,cellHeight:h,columns:c}=manifest;
  ctx.drawImage(assets[clip],(frame%c)*w,Math.floor(frame/c)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);
}
function draw(time){
  ctx.drawImage(assets.ARENA,0,0,layout.width,layout.height);
  ctx.fillStyle='rgba(21,38,40,.84)';ctx.fillRect(0,0,layout.width,155);
  ctx.fillStyle='#fff4cc';ctx.font='bold 39px system-ui';ctx.fillText('РОККИ · STOP V3 · ПЯТЬ СКОРОСТЕЙ',28,58);
  ctx.font='27px system-ui';ctx.fillText(`Время ${time.toFixed(2)} с  ·  STOP ${STOP_FRAMES} кадр.  ·  24 FPS`,30,110);
  for(const dog of dogs){
    const lane=layout.laneTop+dog.index*layout.laneStep;
    ctx.fillStyle=dog.index%2?'rgba(20,39,40,.22)':'rgba(20,39,40,.32)';
    ctx.fillRect(0,lane-111,layout.width,151);
    ctx.strokeStyle='rgba(255,247,211,.62)';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
    const s=stateAt(dog,time);
    const x=layout.startX+s.progress*(layout.finishX-layout.startX+layout.finishControlOffset);
    ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
    sprite(s.clip,s.frame,x-layout.spriteAnchorX,lane-layout.spriteTopOffset);
    ctx.fillStyle='#fff9dc';ctx.font='bold 27px system-ui';ctx.fillText(`${dog.index+1} · ${dog.name} · ${dog.base.toFixed(2)}×`,24,lane-63);
    ctx.font='23px system-ui';ctx.fillText(`${s.segment} · frame ${s.frame}`,1570,lane-63);
  }
  $('clock').textContent=`${time.toFixed(2)} с / ${end.toFixed(2)} с`;
  $('scrub').value=String(Math.min(92,Math.floor(time*FPS)));
}
function seek(seconds){t=Math.max(0,Math.min(end,seconds));reference=performance.now();referenceTime=t;draw(t);return dogs.map(d=>stateAt(d,t));}
function pause(){playing=false;$('play').textContent='▶ Play';}
function tick(now){if(playing){t=Math.min(end,referenceTime+(now-reference)/1000);draw(t);if(t>=end)pause();}requestAnimationFrame(tick);}
$('play').onclick=()=>{if(playing){pause();return;}if(t>=end)seek(0);playing=true;reference=performance.now();referenceTime=t;$('play').textContent='Ⅱ Пауза';};
$('reset').onclick=()=>{pause();seek(0);};
$('scrub').oninput=()=>{pause();seek(Number($('scrub').value)/FPS);};
window.rockyStopLab={ready:true,seek,dogs,end,get time(){return t;}};
$('status').textContent='Готово: пять скоростей, неизменённая модель V3';
seek(0);requestAnimationFrame(tick);
