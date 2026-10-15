// Selection-screen sequence of Frenk (Bulldog No.1) with the alpha WebM files, drawn on four contrasting backgrounds at once.
// IDLE = DOG1_IDLE_v1_alpha_loop220.webm (f8->f118->f9, loops); SELECTED = f20..f121; RETURN = r2..r121 (approved grade);
// after RETURN the IDLE loop resumes at its index 1 (source f9): r121 takes the place of f8.
const FPS=24, $=id=>document.getElementById(id), cv=$('c'), ctx=cv.getContext('2d');
const SRC={idle:'../DOG1_IDLE_v1_alpha_loop220.webm',sel:'../DOG1_SELECTED_v1_alpha_f20-f121.webm',ret:'../DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm'};
const N={idle:220,sel:102,ret:120};
const V={};
for(const [k,u] of Object.entries(SRC)){const v=document.createElement('video');v.src=u;v.muted=true;v.playsInline=true;v.preload='auto';V[k]=v;}
await Promise.all(Object.values(V).map(v=>new Promise((res,rej)=>{if(v.readyState>=2)res();else{v.addEventListener('loadeddata',res,{once:true});v.addEventListener('error',()=>rej(new Error('video '+v.src)),{once:true});}})));
const W=638,H=360,BG=[['#ffffff','белый'],['#000000','чёрный'],['#00b140','зелёный'],['checker','шахматка']];
const checker=(()=>{const c=document.createElement('canvas');c.width=40;c.height=40;const g=c.getContext('2d');g.fillStyle='#bbb';g.fillRect(0,0,40,40);g.fillStyle='#777';g.fillRect(0,0,20,20);g.fillRect(20,20,20,20);return ctx.createPattern(c,'repeat');})();
function draw(video,label){
  ctx.fillStyle='#15181b';ctx.fillRect(0,0,cv.width,40);ctx.fillStyle='#ffe9a0';ctx.font='bold 20px system-ui';ctx.fillText(label,10,27);
  BG.forEach(([bg,name],i)=>{const x=(i%2)*W,y=40+Math.floor(i/2)*H;ctx.fillStyle=bg==='checker'?checker:bg;ctx.fillRect(x,y,W,H);ctx.drawImage(video,x,y,W,H);
    ctx.fillStyle=bg==='#ffffff'?'#333':'#fff';ctx.font='13px system-ui';ctx.fillText(name,x+8,y+H-10);});
}
// deterministic timeline: [clip, frameIndex, caption]
export function timeline(idleBefore=1,idleAfter=3){
  const t=[];for(let c=0;c<idleBefore;c++)for(let i=0;i<N.idle;i++)t.push(['idle',i,`IDLE цикл ${c+1}`]);
  for(let i=0;i<N.sel;i++)t.push(['sel',i,'SELECTED']);for(let i=0;i<N.ret;i++)t.push(['ret',i,'RETURN_TO_IDLE']);
  for(let c=0;c<idleAfter;c++)for(let i=c===0?1:0;i<N.idle;i++)t.push(['idle',i,`IDLE после возврата, цикл ${c+1}`]);
  return t;
}
const seekTo=(v,i)=>new Promise(res=>{v.pause();const done=()=>res();v.addEventListener('seeked',done,{once:true});v.currentTime=(i+0.5)/FPS;});
async function renderFrame(clip,i,caption){await seekTo(V[clip],i);draw(V[clip],`${caption} · кадр ${i+1}/${N[clip]} · alpha WebM`);}
// real-time run: plays the sequence with native playback, logs every presented frame (requestVideoFrameCallback)
function runRealtime({idleBefore=1,idleAfter=3}={}){
  return new Promise(async resolve=>{
    const log=[];let phase='idle',cycles=0,cur=null;
    let gen=0;const watch=(v,name)=>{const my=++gen;const cb=(now,m)=>{if(cur!==v||my!==gen)return;   // one callback chain per start()
      log.push({clip:name,wall:now,media:m.mediaTime,presented:m.presentedFrames});draw(v,`${name} · реальное время`);v.requestVideoFrameCallback(cb);};v.requestVideoFrameCallback(cb);};
    const start=async(name,from=0,loop=false)=>{const v=V[name];v.loop=loop;await seekTo(v,from);cur=v;draw(v,`${name} · реальное время`);log.push({clip:name,wall:performance.now(),media:from/FPS,presented:0,seeked:true});watch(v,name);await v.play();};  // the seeked frame is shown at once (no held frame, no skipped first frame)
    let idleLoops=0;  // IDLE cycles are counted by the wrap of currentTime
    let lastT=0;const onIdle=()=>{const t=V.idle.currentTime;if(t+0.5<lastT){idleLoops++;if(phase==='idle'&&idleLoops>=idleBefore){phase='sel';V.idle.pause();start('sel');}if(phase==='after'&&idleLoops>=idleAfter){V.idle.pause();cur=null;resolve(log);}}lastT=t;requestAnimationFrame(onIdle);};
    V.sel.onended=()=>{phase='ret';start('ret');};
    V.ret.onended=()=>{phase='after';idleLoops=0;lastT=0;start('idle',1,true);};
    await start('idle',0,true);requestAnimationFrame(onIdle);
  });
}
window.selPlayer={ready:true,N,timeline,renderFrame,runRealtime};
$('st').textContent='готово';
$('play').onclick=()=>runRealtime({idleBefore:1,idleAfter:1000});
await renderFrame('idle',0,'IDLE');
