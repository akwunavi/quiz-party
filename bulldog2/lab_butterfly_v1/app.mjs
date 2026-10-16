// Isolated BUTTERFLY lab for Bulldog No.2 on the real V3 arena (RACE_STAND → BUTTERFLY → RACE_STAND → RACE_START B → RUN; mid-race RUN → STOP B → …),
// physics, planner constants and Bulldog No.4 drawing are the UNMODIFIED dog4-v3-lab modules / the same draw code as lab_start_v1 (read only).
// View: every lane is shown relative to the start of ITS OWN BUTTERFLY window (τ = 0); each lane runs its own unmodified physics.
import {PRESETS,buildDog,stateAt} from '../../dog4-v3-lab/model.mjs';
import {CATEGORIES} from '../../dog4-v3-lab/scenario.mjs';
import {loadDog2Butterfly,dog2ButterflyVisual,drawDog2Butterfly} from './dog2butterfly.mjs';
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d',{alpha:false}),$=id=>document.getElementById(id);
const D4='../../race-v3-frenk-lab/dog4assets/';
const [manifest,layout]=await Promise.all([fetch(D4+'manifest.json').then(r=>r.json()),fetch('../../dog4-v3-lab/layout.json').then(r=>r.json())]);
const image=url=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url;});
const assets={};for(const [clip,meta] of Object.entries(manifest.clips))assets[clip]=await image(D4+meta.file.replace(/^.*\//,''));
assets.ARENA=await image(D4+'arena.png');
const D=await loadDog2Butterfly(new URL('./',location.href));
const COURSE=layout.finishX-layout.startX+layout.finishControlOffset,BASES=Object.fromEntries(CATEGORIES.map(([n,b])=>[n,b])),CATS=['VERY_FAST','FAST','NORMAL','SLOW','VERY_SLOW'];
function labRace(key,lanes){PRESETS[key]={name:key,dogs:lanes.map(l=>({name:l.name,base:l.base,variations:[1,1,1,1],events:l.events||[]}))};
  const dogs=lanes.map((l,i)=>buildDog(key,i));
  return {dogs,lanes,title:key,ref:dogs.map(d=>d.segments.find(s=>s.kind==='BUTTERFLY').t0)};}
const EV=[['BUTTERFLY',.35]],EARLY=[['BUTTERFLY',.01]];
const LAB={
  EARLY5:()=>labRace('D2_BF_EARLY5',CATS.map(c=>({char:'dog2',name:`№2 · ${c} · BUTTERFLY со стойки`,base:BASES[c],events:EARLY}))),
  MID5:()=>labRace('D2_BF_MID5',CATS.map(c=>({char:'dog2',name:`№2 · ${c} · BUTTERFLY на 35 %`,base:BASES[c],events:EV}))),
  PAIR:()=>labRace('D2_BF_PAIR',[{char:'dog4',name:'№4 · NORMAL · BUTTERFLY на 35 %',base:BASES.NORMAL,events:EV},{char:'dog2',name:'№2 · NORMAL · BUTTERFLY на 35 %',base:BASES.NORMAL,events:EV},
    {char:'dog4',name:'№4 · VERY_FAST · BUTTERFLY на 35 %',base:BASES.VERY_FAST,events:EV},{char:'dog2',name:'№2 · VERY_FAST · BUTTERFLY на 35 %',base:BASES.VERY_FAST,events:EV},
    {char:'dog2',name:'№2 · VERY_SLOW · BUTTERFLY на 35 %',base:BASES.VERY_SLOW,events:EV}])};
let race=null,tau=-2,playing=false,ref0=0,refT=0;const T0=-1,T1=+7.6;
function sprite(clip,frame,x,y){const {cellWidth:w,cellHeight:h,columns:c}=manifest;ctx.drawImage(assets[clip],(frame%c)*w,Math.floor(frame/c)*h,w,h,x,y,layout.spriteWidth,layout.spriteHeight);}
function laneState(i,ta){const dog=race.dogs[i],l=race.lanes[i],t=race.ref[i]+ta,s=stateAt(dog,t),x=layout.startX+s.progress*COURSE;
  return {t,x,segment:s.segment,s,v:l.char==='dog2'?dog2ButterflyVisual(D,dog,t):null};}
const laneY=i=>layout.laneTop+i*layout.laneStep;
function draw(ta){
  ctx.drawImage(assets.ARENA,0,0,layout.width,layout.height);
  ctx.fillStyle='rgba(21,38,40,.84)';ctx.fillRect(0,0,layout.width,155);ctx.fillStyle='#fff4cc';ctx.font='bold 39px system-ui';
  ctx.fillText(`BULLDOG №2 · BUTTERFLY · LAB · ${race.title}`,28,58);ctx.font='27px system-ui';
  ctx.fillText(`τ = ${ta>=0?'+':''}${ta.toFixed(2)} с от начала своего окна BUTTERFLY · физика V3 без изменений · окно 121 кадр · бабочку рисует игра (здесь не рисуется)`,30,110);
  race.dogs.forEach((dog,i)=>{const lane=laneY(i),l=race.lanes[i],L=laneState(i,ta);
    ctx.fillStyle=i%2?'rgba(20,39,40,.22)':'rgba(20,39,40,.32)';ctx.fillRect(0,lane-111,layout.width,151);
    ctx.strokeStyle='rgba(255,247,211,.62)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(layout.startX,lane+19);ctx.lineTo(layout.finishX,lane+19);ctx.stroke();
    ctx.fillStyle=l.char==='dog2'?'#bfe3ff':'#fff9dc';ctx.font='bold 27px system-ui';ctx.fillText(String(i+1).padStart(2,'0'),24,lane-66);ctx.font='23px system-ui';ctx.fillText(l.name,1480,lane-84);
    let info;
    if(l.char==='dog2'){drawDog2Butterfly(ctx,D,layout,L.v,L.x,lane);info=`${L.v.phase} · ${L.v.label}${L.v.idx!=null&&/STOP|ROLL|BUTTERFLY/.test(L.v.phase)?` · ${L.v.idx+1}`:''}`;}
    else{ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(L.x-50,lane+2,59,5,0,0,Math.PI*2);ctx.fill();sprite(L.s.clip,L.s.frame,L.x-layout.spriteAnchorX,lane-layout.spriteTopOffset);info=`${L.s.clip} ${L.s.frame}`;}
    ctx.fillStyle='#fff9e6';ctx.font='20px system-ui';ctx.fillText(`${L.segment}  ·  ${info}`,1480,lane-54);ctx.font="19px system-ui";ctx.fillText(`скорость ${(L.s.speed*42).toFixed(2)}× · x ${L.x.toFixed(1)}`,1480,lane-26);});
  $('clock').textContent=`τ ${ta.toFixed(2)} с`;
}
function build(){race=LAB[$('preset').value]();tau=T0;draw(tau);}
function tick(now){if(playing){tau=refT+(now-ref0)/1000;if(tau>T1){tau=T1;playing=false;}draw(tau);}requestAnimationFrame(tick);}
$('preset').onchange=()=>{playing=false;build();};$('play').onclick=()=>{ref0=performance.now();refT=T0;playing=true;};
build();requestAnimationFrame(tick);$('st').textContent='готово';
window.d2Bf={ready:true,T0,T1,select(k){$('preset').value=k;build();return race.lanes.map(l=>l.name);},draw,
  measure(ta){return race.dogs.map((d,i)=>{const L=laneState(i,ta),l=race.lanes[i],lane=laneY(i);
    if(l.char!=='dog2')return {lane:i,char:'dog4',t:L.t,x:L.x,segment:L.segment,speed:L.s.speed,clip:L.s.clip,frame:L.s.frame};
    const A=D[L.v.atlas],f=A.frames[L.v.key],left=L.x-layout.spriteAnchorX+L.v.shift;
    return {lane:i,char:'dog2',t:L.t,x:L.x,segment:L.segment,speed:L.s.speed,phase:L.v.phase,label:L.v.label,idx:L.v.idx,shift:L.v.shift,
      bodyX:left+f.cx,shadowX:left+L.v.ref,paw:lane-layout.spriteTopOffset+f.bottom,line:lane+19};});}};
