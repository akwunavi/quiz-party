// Isolated start lab for Bulldog No.2 next to Bulldog No.4 on the real V3 arena. Physics, planner constants and Bulldog No.4
// drawing are the UNMODIFIED dog4-v3-lab modules / the same draw code as race-v3-frenk-lab (read only). Dog 2 lanes use the same
// physical segments; only the sprite source differs (dog2.mjs). Only the start of the race is relevant (no STOP for No.2 yet).
import {PRESETS,buildDog,stateAt} from '../../dog4-v3-lab/model.mjs';
import {CATEGORIES} from '../../dog4-v3-lab/scenario.mjs';
import {loadDog2,dog2Visual,drawDog2,VARIANTS} from './dog2.mjs';
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d',{alpha:false}),$=id=>document.getElementById(id);
const D4='../../race-v3-frenk-lab/dog4assets/';
const [manifest,layout]=await Promise.all([fetch(D4+'manifest.json').then(r=>r.json()),fetch('../../dog4-v3-lab/layout.json').then(r=>r.json())]);
const image=url=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url;});
const assets={};for(const [clip,meta] of Object.entries(manifest.clips))assets[clip]=await image(D4+meta.file.replace(/^.*\//,''));
assets.ARENA=await image(D4+'arena.png');
const D=await loadDog2(new URL('./',location.href));
const COURSE=layout.finishX-layout.startX+layout.finishControlOffset,BASES=Object.fromEntries(CATEGORIES.map(([n,b])=>[n,b])),CATS=['VERY_FAST','FAST','NORMAL','SLOW','VERY_SLOW'];
function labRace(key,lanes){PRESETS[key]={name:key,dogs:lanes.map(l=>({name:l.name,base:l.base,variations:[1,1,1,1],events:[]}))};
  return {dogs:lanes.map((l,i)=>buildDog(key,i)),lanes,title:key};}
const LAB={
  PAIR:()=>labRace('D2_PAIR',[{char:'dog4',name:'№4 · NORMAL',base:BASES.NORMAL},{char:'dog2',v:'B',name:'№2 · NORMAL · B',base:BASES.NORMAL},
    {char:'dog4',name:'№4 · VERY_FAST',base:BASES.VERY_FAST},{char:'dog2',v:'B',name:'№2 · VERY_FAST · B',base:BASES.VERY_FAST},{char:'dog2',v:'B',name:'№2 · VERY_SLOW · B',base:BASES.VERY_SLOW}]),
  ALL5:()=>labRace('D2_ALL5',CATS.map(c=>({char:'dog2',v:'B',name:`№2 · ${c} · B`,base:BASES[c]}))),
  ALL5_A:()=>labRace('D2_ALL5_A',CATS.map(c=>({char:'dog2',v:'A',name:`№2 · ${c} · A`,base:BASES[c]}))),
  ALL5_LINEAR:()=>labRace('D2_ALL5_LIN',CATS.map(c=>({char:'dog2',v:'B',mode:'linear',name:`№2 · ${c} · B без компенсации`,base:BASES[c]})))};
let race=null,t=0,playing=false,ref0=0,refT=0;
const timeLabel=s=>`${Math.floor(s/60)}:${(s%60).toFixed(2).padStart(5,'0')}`;
function sprite(clip,frame,x,y){const {cellWidth:w,cellHeight:h,columns:c}=manifest;ctx.drawImage(assets[clip],(frame%c)*w,Math.floor(frame/c)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);}
function laneState(i,time){const dog=race.dogs[i],l=race.lanes[i],s=stateAt(dog,time),x=layout.startX+s.progress*COURSE;
  if(l.char!=='dog2')return {x,segment:s.segment,s};return {x,segment:s.segment,s,v:dog2Visual(D,dog,time,l.v,0,l.mode||'surge')};}
function draw(time){
  ctx.drawImage(assets.ARENA,0,0,layout.width,layout.height);
  ctx.fillStyle='rgba(21,38,40,.84)';ctx.fillRect(0,0,layout.width,155);ctx.fillStyle='#fff4cc';ctx.font='bold 39px system-ui';
  ctx.fillText(`BULLDOG №2 · СТАРТ · LAB · ${race.title}`,28,58);ctx.font='27px system-ui';ctx.fillText(`Время ${timeLabel(time)} · физика V3 без изменений · RACE_STAND = RUN #30`,30,110);
  ctx.strokeStyle='rgba(255,250,217,.95)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(layout.startX,170);ctx.lineTo(layout.startX,1006);ctx.stroke();
  ctx.font='bold 22px system-ui';ctx.fillText('СТАРТ',layout.startX-34,189);
  race.dogs.forEach((dog,i)=>{const lane=layout.laneTop+i*layout.laneStep,l=race.lanes[i],L=laneState(i,time);
    ctx.fillStyle=i%2?'rgba(20,39,40,.22)':'rgba(20,39,40,.32)';ctx.fillRect(0,lane-111,layout.width,151);
    ctx.strokeStyle='rgba(255,247,211,.62)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
    ctx.fillStyle=l.char==='dog2'?'#bfe3ff':'#fff9dc';ctx.font='bold 27px system-ui';ctx.fillText(String(i+1).padStart(2,'0'),24,lane-66);ctx.font='23px system-ui';ctx.fillText(l.name,75,lane-66);
    let info;
    if(l.char==='dog2'){const g=drawDog2(ctx,D,layout,L.v,L.x,lane);info=`${L.v.phase} · RUN #${L.v.n}`;}
    else{ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(L.x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();sprite(L.s.clip,L.s.frame,L.x-layout.spriteAnchorX,lane-layout.spriteTopOffset);info=`${L.segment} · ${L.s.clip} ${L.s.frame}`;}
    ctx.fillStyle='#fff9e6';ctx.font='20px system-ui';ctx.fillText(`${L.segment}  ·  ${info}`,1480,lane-58);ctx.font='19px system-ui';ctx.fillText(`скорость ${(L.s.speed*42).toFixed(2)}× · x ${L.x.toFixed(1)}`,1480,lane-27);});
  $('clock').textContent=timeLabel(time);
}
function build(){race=LAB[$('preset').value]();t=0;draw(0);}
function tick(now){if(playing){t=refT+(now-ref0)/1000;if(t>6){t=6;playing=false;}draw(t);}requestAnimationFrame(tick);}
$('preset').onchange=()=>{playing=false;build();};$('play').onclick=()=>{t=0;ref0=performance.now();refT=0;playing=true;};
build();requestAnimationFrame(tick);$('st').textContent='готово';
window.d2Lab={ready:true,select(k){$('preset').value=k;build();return race.lanes.map(l=>l.name);},draw,
  measure(time){return race.dogs.map((d,i)=>{const L=laneState(i,time),l=race.lanes[i];if(l.char!=='dog2')return {lane:i,char:'dog4',x:L.x,segment:L.segment,speed:L.s.speed};
    const f=D.atlas.frames['r'+L.v.n],left=L.x-layout.spriteAnchorX+L.v.shift;return {lane:i,char:'dog2',variant:l.v,x:L.x,segment:L.segment,speed:L.s.speed,phase:L.v.phase,n:L.v.n,idx:L.v.idx,shift:L.v.shift,bodyX:left+f.cx,shadowX:left+L.v.ref,bottom:lane0(i)+f.bottom};});}};
function lane0(i){return layout.laneTop+i*layout.laneStep-layout.spriteTopOffset;}
