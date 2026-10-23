// Pups selection lab, full chain: graded IDLE loop plays continuously; "Выбрать" at ANY moment -> IDLE plays FORWARD to the next gate
// -> SELECTED s0..s120 once -> IDLE from REENTRY, forever. Alpha clips, exact seeking, no crossfade, no still pause.
// Drawn at 638x360 on white / black / green / beige. window.pSel = deterministic API for tools/lab_check.mjs.
import {IDLE_LOOP,SELECTED,exitPath,chain,GATES,REENTRY} from './selection.mjs';
const FPS=24,$=id=>document.getElementById(id),cv=$('c'),ctx=cv.getContext('2d');
const SRC={idle:'../idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm',sel:'../selected_v4_game/alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm'};
const V={};for(const [k,u] of Object.entries(SRC)){const v=document.createElement('video');v.src=u;v.muted=true;v.preload='auto';V[k]=v;}
await Promise.all(Object.values(V).map(v=>new Promise((res,rej)=>{if(v.readyState>=2)res();else{v.addEventListener('loadeddata',res,{once:true});v.addEventListener('error',()=>rej(new Error(v.src)),{once:true});}})));
const W=638,H=360,BG=[['#ffffff','белый'],['#000000','чёрный'],['#00b140','зелёный'],['#decba4','бежевый']];
const seek=(v,i)=>new Promise(res=>{v.pause();v.addEventListener('seeked',()=>res(),{once:true});v.currentTime=(i+0.5)/FPS;});
async function show(st){const v=V[st.clip];await seek(v,st.f);
  ctx.fillStyle='#15181b';ctx.fillRect(0,0,cv.width,40);ctx.fillStyle='#ffe9a0';ctx.font='bold 19px system-ui';
  ctx.fillText(`${st.phase} · ${st.clip==='idle'?'IDLE f':'SELECTED s'}${st.f}${st.click?' · ◀ ВЫБОР':''}${st.clip==='idle'&&GATES.includes(st.f)?' · стойка':''}`,10,27);
  BG.forEach(([bg,name],i)=>{const x=(i%2)*W,y=40+Math.floor(i/2)*H;ctx.fillStyle=bg;ctx.fillRect(x,y,W,H);ctx.drawImage(v,x,y,W,H);
    ctx.fillStyle=bg==='#ffffff'||bg==='#decba4'?'#333':'#fff';ctx.font='13px system-ui';ctx.fillText(name,x+8,y+H-10);});}
let playing=false,idx=0,queue=null,timer=null;
async function step(){if(!playing)return;let st;
  if(queue){st=queue.shift();if(!queue.length){queue=null;idx=REENTRY;$('st').textContent=`SELECTED закончен, IDLE снова в цикле (с f${REENTRY})`;}}
  else{st={clip:'idle',f:IDLE_LOOP[idx],phase:'IDLE'};idx=(idx+1)%IDLE_LOOP.length;}
  await show(st);if(playing)timer=setTimeout(step,1000/FPS);}
$('play').onclick=()=>{if(playing)return;playing=true;$('st').textContent='IDLE';step();};
$('pick').onclick=()=>{if(queue)return;const at=(idx-1+IDLE_LOOP.length)%IDLE_LOOP.length,p=exitPath(at);
  queue=[...p.map(f=>({clip:'idle',f,phase:'IDLE → к стойке (вперёд)'})),...SELECTED.map(s=>({clip:'sel',f:s,phase:'SELECTED'}))];
  $('st').textContent=`выбор на IDLE f${at}: ещё ${p.length} кадров (${(p.length/24).toFixed(2)} с) до SELECTED`;if(!playing){playing=true;step();}};
$('reset').onclick=()=>{playing=false;clearTimeout(timer);idx=0;queue=null;show({clip:'idle',f:0,phase:'IDLE'});};
await show({clip:'idle',f:0,phase:'IDLE'});$('st').textContent='готово';
window.pSel={ready:true,chain,show,IDLE_LOOP,exitPath};
