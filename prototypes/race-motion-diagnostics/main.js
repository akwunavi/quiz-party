const canvas=document.getElementById('stage'),ctx=canvas.getContext('2d',{alpha:false});
const names=['Фрэнк','Зефир','Пупс'],keys=['frank','zephyr','pups'],colors=['#c97447','#d7d3c5','#94a6b4'];
const sprites=keys.map(key=>{const image=new Image();image.src=`./assets/${key}-run.png`;return image});
const mode=document.getElementById('mode'),play=document.getElementById('play'),readout=document.getElementById('stats');
const duration=18;let time=0,playing=false,playStart=0,playBase=0,last=0,metrics=[];
function worldX(t,i){const speed=[4.7,4.9,5.1][i],lead=[0,.3,-.2][i],pause=i===2?Math.max(0,Math.min(t-6,1.2)):0;return lead+speed*(t-pause)+Math.min(t,1.2)*.4}
function median(a){return [...a].sort((x,y)=>x-y)[1]}
const old=[1.5];for(let k=1;k<=duration*60+1;k++){const t=k/60,target=median(names.map((_,i)=>worldX(t,i)))+1,prev=old.at(-1),d=(target-prev)*(1-Math.exp(-1/60/.85));old.push(prev+Math.max(-5.5/60,Math.min(5.5/60,d)))}
function cameraX(t,kind){if(kind==='fixed')return 43;if(kind==='corrected')return 13+.70*median(names.map((_,i)=>worldX(t,i)));const x=t*60,k=Math.min(old.length-2,Math.floor(x));return old[k]+(old[k+1]-old[k])*(x-k)}
function size(){const b=canvas.getBoundingClientRect();canvas.width=Math.round(b.width);canvas.height=Math.round(b.height)}
addEventListener('resize',()=>{size();renderAt(time)});size();
function paint(t,kind,ox,w,h){
  const c=cameraX(t,kind),span=kind==='fixed'?102:44,px=w/span,gy=h*.19,laneH=h*.235;
  ctx.save();ctx.beginPath();ctx.rect(ox,0,w,h);ctx.clip();ctx.fillStyle='#dce9e9';ctx.fillRect(ox,0,w,h);
  for(let i=0;i<3;i++){
    const y=gy+i*laneH;ctx.fillStyle=i%2?'#b4d4dc':'#c7e2e6';ctx.fillRect(ox,y,w,laneH*.86);
    ctx.strokeStyle='#6d929b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ox,y+laneH*.86);ctx.lineTo(ox+w,y+laneH*.86);ctx.stroke();
  }
  for(let x=0;x<=100;x+=5){const sx=ox+w/2+(x-c)*px;if(sx<ox||sx>ox+w)continue;ctx.strokeStyle='#668c92';ctx.lineWidth=x%10?1:2;ctx.beginPath();ctx.moveTo(sx,gy);ctx.lineTo(sx,gy+laneH*2.86);ctx.stroke();ctx.fillStyle='#23404b';ctx.font='13px monospace';ctx.fillText(String(x),sx+3,gy+17)}
  for(let i=0;i<3;i++){
    const x=worldX(t,i),sx=ox+w/2+(x-c)*px,y=gy+i*laneH+laneH*.77;
    const dogH=kind==='fixed'?Math.min(84,laneH*.56):Math.min(154,laneH*.76),dogW=dogH*384/216;
    ctx.fillStyle='#526d78';ctx.beginPath();ctx.ellipse(sx,y-3,dogW*.25,5,0,0,Math.PI*2);ctx.fill();
    const image=sprites[i],frame=Math.floor(t*24)%12;if(image.complete&&image.naturalWidth)ctx.drawImage(image,(frame%4)*384,Math.floor(frame/4)*216,384,216,sx-dogW/2,y-dogH,dogW,dogH);
    ctx.fillStyle='#172b34';ctx.font='bold 17px system-ui';ctx.fillText(`${names[i]}  X=${x.toFixed(1)}`,Math.min(ox+w-160,Math.max(ox+8,sx-45)),y+23);
  }
  ctx.fillStyle='#102633';ctx.fillRect(ox,0,w,44);ctx.fillStyle='#fff';ctx.font='bold 19px system-ui';ctx.fillText(({fixed:'НЕПОДВИЖНАЯ · широкий обзор',legacy:'ПРЕЖНЯЯ · камера догоняет',corrected:'ИСПРАВЛЕННАЯ · камера 70% скорости группы'})[kind],ox+16,29);
  ctx.restore();return c;
}
function renderAt(t,kind=mode.value,compare=false){time=Math.max(0,Math.min(duration,t));ctx.clearRect(0,0,canvas.width,canvas.height);
  let c;if(compare){paint(time,compare==='fixed'?'fixed':'legacy',0,canvas.width/2,canvas.height);c=paint(time,'corrected',canvas.width/2,canvas.width/2,canvas.height)}else c=paint(time,kind,0,canvas.width,canvas.height);
  const dt=.25,cVel=(cameraX(Math.min(duration,time+dt),kind)-cameraX(Math.max(0,time-dt),kind))/(Math.min(duration,time+dt)-Math.max(0,time-dt)||1);
  const rows=names.map((name,i)=>{const v=(worldX(Math.min(duration,time+dt),i)-worldX(Math.max(0,time-dt),i))/(Math.min(duration,time+dt)-Math.max(0,time-dt)||1);return `${name}: world ${v.toFixed(2)} · screen ${(v-cVel).toFixed(2)} units/s · RUN #${Math.floor(time*24)%12}`});
  const recent=metrics.slice(-120),fps=recent.length>1?1000*(recent.length-1)/(recent.at(-1).at-recent[0].at):0,miss=recent.filter(x=>x.gap>50).length;
  readout.textContent=`t=${time.toFixed(2)}s · camera X=${c.toFixed(2)} · camera speed=${cVel.toFixed(2)} units/s · browser FPS≈${fps.toFixed(1)} · long frames(>50ms)=${miss}/${recent.length}\n${rows.join('\n')}`;
  return {t:time,kind,cameraX:c,cameraSpeed:cVel,dogs:names.map((name,i)=>({name,x:worldX(time,i),runFrame:Math.floor(time*24)%12}))};
}
function tick(now){if(playing){const next=Math.min(duration,playBase+(now-playStart)/1000);metrics.push({at:now,gap:last?now-last:0,expectedFrame:Math.floor(next*24)});if(metrics.length>2000)metrics.shift();renderAt(next);last=now;if(next===duration){playing=false;play.textContent='▶ Play'}}requestAnimationFrame(tick)}
play.onclick=()=>{playing=!playing;if(playing){playBase=time;playStart=performance.now();last=0;metrics=[]}play.textContent=playing?'Ⅱ Пауза':'▶ Play'};
document.getElementById('reset').onclick=()=>{playing=false;play.textContent='▶ Play';renderAt(0)};mode.onchange=()=>renderAt(time);
Promise.all(sprites.map(s=>s.decode())).then(()=>renderAt(0));requestAnimationFrame(tick);
window.motionLab={renderAt,canvas,get time(){return time},get metrics(){return metrics},get ready(){return sprites.every(x=>x.complete&&x.naturalWidth)}};
