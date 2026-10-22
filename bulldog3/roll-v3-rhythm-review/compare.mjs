import {FPS,RACES,stateAt} from '../race-start-v3-lab/model.mjs';

const layout=await fetch('../race-start-v3-lab/layout.json').then(r=>r.json());
const a=await fetch('../roll-v3-lab/retiming.json').then(r=>r.json());
const b=await fetch('./retiming.json').then(r=>r.json());
const load=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
const assets={
  arena:await load('../race-start-v3-lab/assets/arena.png'),
  A:await load('../roll-v3-lab/assets/rocky-roll.png'),
  B:await load('./assets/rocky-roll-B.png'),
};
const canvas=document.getElementById('race'),ctx=canvas.getContext('2d',{alpha:false});
const dog=RACES.A.dogs[3],roll=dog.segments.find(s=>s.kind==='ROLL');
const length=roll.t1-roll.t0;

function sprite(im,frame,x,y){
  ctx.drawImage(im,(frame%24)*178,Math.floor(frame/24)*100,178,100,
                x-layout.spriteAnchorX,y-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
}
function lane(im,label,map,y,frame,state){
  const x=layout.startX+state.progress*(layout.finishX-layout.startX+layout.finishControlOffset);
  ctx.fillStyle='rgba(18,43,45,.37)';ctx.fillRect(0,y-122,1920,158);
  ctx.strokeStyle='rgba(255,247,211,.78)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(layout.startX,y+19);ctx.lineTo(layout.finishX,y+19);ctx.stroke();
  ctx.fillStyle='rgba(28,45,35,.38)';ctx.beginPath();ctx.ellipse(x-50,y+2,59,5,0,0,Math.PI*2);ctx.fill();
  sprite(im,frame,x,y);
  ctx.fillStyle='#fff9db';ctx.font='bold 34px system-ui';ctx.fillText(label,45,y-76);
  const source=map[frame];ctx.font='25px system-ui';ctx.fillText(source===null?'RACE_STAND':`исходник #${source}`,1500,y-76);
}
function seek(seconds){
  const relative=Math.max(0,Math.min(length-1/FPS,seconds));
  const state=stateAt(dog,roll.t0+relative),frame=state.frame;
  ctx.drawImage(assets.arena,0,0,1920,1080);
  ctx.fillStyle='rgba(21,38,40,.87)';ctx.fillRect(0,0,1920,155);
  ctx.fillStyle='#fff4cc';ctx.font='bold 41px system-ui';ctx.fillText('РОККИ · ROLL V2 · СРАВНЕНИЕ РИТМА',36,61);
  ctx.font='28px system-ui';ctx.fillText(`Одно окно Race V3: 145 кадров / 6,04 с · игровая скорость и масштаб`,36,111);
  lane(assets.A,'A · текущий',a.gameFrameToSource,442,frame,state);
  lane(assets.B,'B · распределённая пауза',b.gameFrameToSource,735,frame,state);
  ctx.fillStyle='rgba(21,38,40,.86)';ctx.fillRect(0,920,1920,160);
  ctx.fillStyle='#fff4cc';ctx.font='29px system-ui';ctx.fillText(`Кадр ${frame+1}/145 · ${relative.toFixed(2)} с · мировая позиция обеих собак одинакова`,35,986);
  ctx.font='25px system-ui';ctx.fillText('A: исходник #8–120 + стойка 32 кадра     B: стойка 8 + исходник #0–120 + стойка 16',35,1035);
  return {frame,progress:state.progress,segment:state.segment,speed:state.speed};
}
window.rollCompare={ready:true,seek,length,roll};seek(0);
