// Frenk selection lab (APPROVED entry A, 23.10.2026; entry B = archive): approved IDLE loop (f8->f118->f9) plays continuously; "Выбрать" at ANY moment -> exitPath to the stand f12 ->
// SELECTED (entry A or B) once -> RETURN_TO_IDLE once -> IDLE again from loop index 1 (f9), forever. Approved alpha clips, exact seeking,
// no crossfade. Drawn at 638x360 on white / black / green / beige. window.fSel = deterministic API for tools/lab_check.mjs.
import {IDLE_LOOP,exitPath,RETURN,chain,selFrames} from './selection.mjs';
const FPS=24,$=id=>document.getElementById(id),cv=$('c'),ctx=cv.getContext('2d');
const A='../selection_alpha_v1/';
const SRC={idle:[A+'DOG1_IDLE_v1_alpha_f8-f118.webm',7],sel:[A+'DOG1_SELECTED_v1_alpha_f20-f121.webm',19],selEarly:['alpha/DOG1_SELECTED_v1_alpha_f1-f24_entry.webm',0],ret:[A+'DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm',1]};
const V={};for(const [k,[u]] of Object.entries(SRC)){const v=document.createElement('video');v.src=u;v.muted=true;v.preload='auto';V[k]=v;}
await Promise.all(Object.values(V).map(v=>new Promise((res,rej)=>{if(v.readyState>=2)res();else{v.addEventListener('loadeddata',res,{once:true});v.addEventListener('error',()=>rej(new Error(v.src)),{once:true});}})));
const W=638,H=360,BG=[['#ffffff','белый'],['#000000','чёрный'],['#00b140','зелёный'],['#decba4','бежевый']];
const NAME={idle:'IDLE f',sel:'SELECTED f',selEarly:'SELECTED f',ret:'RETURN r'};
const seek=(v,i)=>new Promise(res=>{v.pause();v.addEventListener('seeked',()=>res(),{once:true});v.currentTime=(i+0.5)/FPS;});
async function show(st){const v=V[st.clip];await seek(v,st.f-SRC[st.clip][1]-1);
  ctx.fillStyle='#15181b';ctx.fillRect(0,0,cv.width,40);ctx.fillStyle='#ffe9a0';ctx.font='bold 19px system-ui';
  ctx.fillText(`${st.phase} · ${NAME[st.clip]}${st.f}${st.click?' · ◀ ВЫБОР':''}`,10,27);
  BG.forEach(([bg,name],i)=>{const x=(i%2)*W,y=40+Math.floor(i/2)*H;ctx.fillStyle=bg;ctx.fillRect(x,y,W,H);ctx.drawImage(v,x,y,W,H);
    ctx.fillStyle=bg==='#ffffff'||bg==='#decba4'?'#333':'#fff';ctx.font='13px system-ui';ctx.fillText(name,x+8,y+H-10);});}
let playing=false,idx=0,queue=null,timer=null;
async function step(){if(!playing)return;let st;
  if(queue){st=queue.shift();if(!queue.length){queue=null;idx=1;$('st').textContent='RETURN закончен, IDLE снова в цикле (с f9)';}}
  else{st={clip:'idle',f:IDLE_LOOP[idx],phase:'IDLE',i:idx};idx=(idx+1)%IDLE_LOOP.length;}
  await show(st);if(playing)timer=setTimeout(step,1000/FPS);}
$('play').onclick=()=>{if(playing)return;playing=true;$('st').textContent='IDLE';step();};
$('pick').onclick=()=>{if(queue)return;const at=(idx-1+IDLE_LOOP.length)%IDLE_LOOP.length,v=$('entry').value;
  queue=[...exitPath(at).map(f=>({clip:'idle',f,phase:'IDLE → к стойке f12'})),...selFrames(v).map(s=>({...s,phase:`SELECTED (вход ${v})`})),...RETURN.map(f=>({clip:'ret',f,phase:'RETURN_TO_IDLE'}))];
  $('st').textContent=`выбор на IDLE f${IDLE_LOOP[at]}: ещё ${exitPath(at).length} кадров IDLE до SELECTED`;if(!playing){playing=true;step();}};
$('reset').onclick=()=>{playing=false;clearTimeout(timer);idx=0;queue=null;show({clip:'idle',f:IDLE_LOOP[0],phase:'IDLE'});};
await show({clip:'idle',f:IDLE_LOOP[0],phase:'IDLE'});$('st').textContent='готово';
window.fSel={ready:true,chain,show,IDLE_LOOP,exitPath};
