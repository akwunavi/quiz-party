// Diagnostic-only three-dog comparison. It never changes model.mjs or approved clips.
import {FPS,frameFor} from './model.mjs';
const canvas=document.getElementById('comparison'),ctx=canvas.getContext('2d',{alpha:false});
const [manifest,layout]=await Promise.all([fetch('./manifest.json').then(r=>r.json()),fetch('./layout.json').then(r=>r.json())]);
const load=url=>new Promise((yes,no)=>{const im=new Image();im.onload=()=>yes(im);im.onerror=no;im.src=url;});
const assets={};for(const [name,meta] of Object.entries(manifest.clips))assets[name]=await load(meta.file);
assets.ARENA=await load('./assets/arena.png');
export const RUN_SECONDS=23/24+6*12/24,STOP_SECONDS=37/24,HOLD_SECONDS=1.5,SECTION_SECONDS=RUN_SECONDS+STOP_SECONDS+HOLD_SECONDS,TOTAL_SECONDS=2*SECTION_SECONDS;
export const LANES=[{name:'VERY_SLOW',speed:.75,rhythm:.90},{name:'NORMAL',speed:1,rhythm:1},{name:'VERY_FAST',speed:1.25,rhythm:1.10}];
export function runFrame(seconds,method,rhythm){
  if(method==='A'||seconds<23/24)return frameFor({kind:'RUN',t0:0},seconds)[1];
  return 11+Math.floor((seconds-23/24)*FPS*rhythm+1e-9)%12;
}
export function diagnosticState(seconds,method,speed,rhythm){
  const t=Math.max(0,Math.min(SECTION_SECONDS,seconds)),units=(layout.finishX-layout.startX+layout.finishControlOffset)/42;
  if(t<RUN_SECONDS)return {phase:'RUN',clip:'RUN',frame:runFrame(t,method,rhythm),x:720+units*speed*t};
  if(t<RUN_SECONDS+STOP_SECONDS){const u=(t-RUN_SECONDS)/STOP_SECONDS;
    const braking=u-u*u*u+.5*u*u*u*u;
    return {phase:'STOP',clip:'STOP',frame:frameFor({kind:'STOP',t0:RUN_SECONDS},t)[1],x:720+units*speed*(RUN_SECONDS+STOP_SECONDS*2*braking/2)};
  }
  return {phase:'BASE_STAND',clip:'BASE',frame:0,x:720+units*speed*(RUN_SECONDS+STOP_SECONDS/2)};
}
function sprite(clip,frame,x,y){const {cellWidth:w,cellHeight:h,columns:c}=manifest;
  ctx.drawImage(assets[clip],frame%c*w,Math.floor(frame/c)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);
}
export function draw(seconds){
  const t=Math.max(0,Math.min(TOTAL_SECONDS,seconds));
  const section=t<SECTION_SECONDS?0:1,method=section?'B':'A',local=t-section*SECTION_SECONDS;
  ctx.drawImage(assets.ARENA,0,0,layout.width,layout.height);
  ctx.fillStyle='rgba(21,38,40,.86)';ctx.fillRect(0,0,layout.width,155);
  ctx.fillStyle='#fff4cc';ctx.font='bold 38px system-ui';
  ctx.fillText(method==='A'?'A · текущий RUN: 1.00× для всех':'B · опытный RUN: 0.90–1.10×',28,58);
  ctx.font='26px system-ui';ctx.fillText(`Одинаковая физическая скорость и STOP · ${local.toFixed(2)} c · переход RUN → STOP: ${RUN_SECONDS.toFixed(3)} c`,30,108);
  for(let i=0;i<LANES.length;i++){
    const lane=layout.laneTop+(i+1)*layout.laneStep,d=LANES[i],s=diagnosticState(local,method,d.speed,d.rhythm);
    ctx.fillStyle=i%2?'rgba(20,39,40,.22)':'rgba(20,39,40,.32)';ctx.fillRect(0,lane-111,layout.width,151);
    ctx.strokeStyle='rgba(255,247,211,.62)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
    ctx.fillStyle='#fff9dc';ctx.font='bold 28px system-ui';ctx.fillText(`${d.name} · ${d.speed.toFixed(2)}×`,30,lane-62);
    ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(s.x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
    sprite(s.clip,s.frame,s.x-layout.spriteAnchorX,lane-layout.spriteTopOffset);
    ctx.font='24px system-ui';ctx.fillStyle='#fff9e6';ctx.fillText(`${s.phase} · кадр ${String(s.frame).padStart(2,'0')} · X ${s.x.toFixed(1)} px`,1450,lane-40);
  }
  ctx.fillStyle='rgba(21,38,40,.76)';ctx.fillRect(0,940,1920,95);
  ctx.fillStyle='#fff5d3';ctx.font='24px system-ui';ctx.fillText('Сравнение движения лап и входа в STOP. Остальные клипы и модель гонки не менялись.',30,995);
}
window.runCompare={ready:true,draw,total:TOTAL_SECONDS,run:RUN_SECONDS,diagnosticState,runFrame};draw(0);
