// Zefir selection-screen lab: approved IDLE MAIN_L1 (alpha of the unchanged user source) looping; "Выбрать" at ANY moment ->
// the exit path of selection.mjs (IDLE's own frames to FRONT_STAND f4) -> SELECTED candidate s4..s121 (lab-only alpha).
// Drawn at selection-screen lab scale 638x360 (half of 1276x720, as Frenk's player) on white / black / green / beige.
// Frames are shown by exact seeking (no blending, no crossfade). window.zSel = deterministic API for tools/lab_check.mjs.
import {IDLE_LOOP,exitPath,SELECTED,timeline} from './selection.mjs';
const FPS=24,$=id=>document.getElementById(id),cv=$('c'),ctx=cv.getContext('2d');
const SRC={idle:'../selection_alpha_v1/DOG2_IDLE_alpha_f1-f121.webm',sel:'../selection_alpha_v1/DOG2_SELECTED_alpha_f1-f121.webm'};
const V={};for(const [k,u] of Object.entries(SRC)){const v=document.createElement('video');v.src=u;v.muted=true;v.preload='auto';V[k]=v;}
await Promise.all(Object.values(V).map(v=>new Promise((res,rej)=>{if(v.readyState>=2)res();else{v.addEventListener('loadeddata',res,{once:true});v.addEventListener('error',()=>rej(new Error(v.src)),{once:true});}})));
const W=638,H=360,BG=[['#ffffff','белый'],['#000000','чёрный'],['#00b140','зелёный'],['#decba4','бежевый']];
const seek=(v,f)=>new Promise(res=>{v.pause();v.addEventListener('seeked',()=>res(),{once:true});v.currentTime=(f-1+0.5)/FPS;});
async function show(st,extra=''){const v=V[st.clip];await seek(v,st.f);
  ctx.fillStyle='#15181b';ctx.fillRect(0,0,cv.width,40);ctx.fillStyle='#ffe9a0';ctx.font='bold 19px system-ui';
  ctx.fillText(`${st.phase} · ${st.clip==='idle'?'IDLE':'SELECTED'} f${st.f}${st.click?' · ◀ ВЫБОР':''}${extra}`,10,27);
  BG.forEach(([bg,name],i)=>{const x=(i%2)*W,y=40+Math.floor(i/2)*H;ctx.fillStyle=bg;ctx.fillRect(x,y,W,H);ctx.drawImage(v,x,y,W,H);
    ctx.strokeStyle='rgba(255,0,120,.55)';ctx.beginPath();ctx.moveTo(x,y+PAW*H/720);ctx.lineTo(x+W,y+PAW*H/720);ctx.stroke();
    ctx.fillStyle=bg==='#ffffff'||bg==='#decba4'?'#333':'#fff';ctx.font='13px system-ui';ctx.fillText(name,x+8,y+H-10);});}
const PAW=Number(new URL(location.href).searchParams.get('paw')||0)||0;   // reference paw line (source px) drawn as a guide, from tools/metrics
// interactive: IDLE loops until "Выбрать", then the exit path and SELECTED
let playing=false,idx=0,queue=null,timer=null;
async function step(){if(!playing)return;let st;
  if(queue){st=queue.shift();if(!queue.length){playing=false;queue=null;$('st').textContent='SELECTED закончен';}}
  else{st={clip:'idle',f:IDLE_LOOP[idx],phase:'IDLE',i:idx};idx=(idx+1)%IDLE_LOOP.length;}
  await show(st);if(playing)timer=setTimeout(step,1000/FPS);}
$('play').onclick=()=>{if(playing)return;playing=true;queue=null;$('st').textContent='IDLE';step();};
$('pick').onclick=()=>{if(queue)return;const at=(idx-1+IDLE_LOOP.length)%IDLE_LOOP.length;
  queue=[...exitPath(at).map(f=>({clip:'idle',f,phase:'IDLE → к FRONT_STAND'})),...SELECTED.map(f=>({clip:'sel',f,phase:'SELECTED'}))];
  $('st').textContent=`выбор на IDLE f${IDLE_LOOP[at]}: ещё ${exitPath(at).length} кадров IDLE до SELECTED`;if(!playing){playing=true;step();}};
$('reset').onclick=()=>{playing=false;clearTimeout(timer);idx=0;queue=null;show({clip:'idle',f:IDLE_LOOP[0],phase:'IDLE'});};
await show({clip:'idle',f:IDLE_LOOP[0],phase:'IDLE'});$('st').textContent='готово';
window.zSel={ready:true,timeline,show,IDLE_LOOP,exitPath,SELECTED};
