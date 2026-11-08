const canvas=document.querySelector('#scene');
const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});
const W=1920,H=1080,play=document.querySelector('#play'),slider=document.querySelector('#camera'),dogToggle=document.querySelector('#dog'),stats=document.querySelector('#stats');
const files={track:'track_alpha.png',grandstand:'grandstand_alpha.png',chalet:'chalet_alpha.png',trees:'trees_alpha.png',lamps:'lamps_alpha.png',dog:'rocky-reference.png'};
const images={};let ready=false,playing=true,t=0,last=0,frameTimes=[],dropped=0,lastStat=0;
function loadImage(path){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=path;});}
Promise.all(Object.entries(files).map(async([key,file])=>images[key]=await loadImage(`assets/${file}`))).then(()=>{ready=true;stats.textContent='Готово: отдельные Blender-слои загружены.'}).catch(e=>stats.textContent=`Ошибка загрузки ассетов: ${e}`);
play.onclick=()=>{playing=!playing;play.textContent=playing?'Пауза':'Продолжить'};
slider.oninput=()=>{t=Number(slider.value);render()};
dogToggle.onchange=()=>render();
const stars=Array.from({length:72},(_,i)=>({x:(i*293+171)%W,y:(i*173+39)%410,r:1+(i%5===0),a:.25+(i%7)/10}));
const flakes=Array.from({length:58},(_,i)=>({x:(i*619+83)%W,y:(i*227+61)%H,r:1+(i%3),s:9+(i%5)*3}));
function sky(){
  let g=ctx.createLinearGradient(0,0,0,620);g.addColorStop(0,'#09142d');g.addColorStop(.55,'#1c3b59');g.addColorStop(1,'#557b89');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  for(const s of stars){ctx.globalAlpha=s.a;ctx.fillStyle='#f9e9cb';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
  let glow=ctx.createRadialGradient(1390,185,10,1390,185,530);glow.addColorStop(0,'#ffbc72aa');glow.addColorStop(1,'#e8984600');ctx.fillStyle=glow;ctx.fillRect(650,0,1200,590);
  ctx.fillStyle='#16354a';ctx.beginPath();ctx.moveTo(0,456);for(let x=0;x<=W;x+=65)ctx.lineTo(x,390+38*Math.sin(x*.009)+19*Math.sin(x*.026));ctx.lineTo(W,620);ctx.lineTo(0,620);ctx.fill();
}
function prop(name,worldX,y,w,h,parallax,camera,alpha=1){const x=worldX-camera*parallax;ctx.globalAlpha=alpha;ctx.drawImage(images[name],x-w/2,y,w,h);ctx.globalAlpha=1;}
function render(){
  if(!ready)return;const camera=t*80;sky();
  // Each object has its own world anchor and camera factor. No full-scene video.
  for(let k=-1;k<=2;k++){
    const base=k*2750;
    prop('trees',base+10,100,550,400,.48,camera,.92);
    prop('trees',base+1930,102,560,400,.48,camera,.80);
    prop('chalet',base+1590,137,380,295,.59,camera,.98);
    prop('grandstand',base+690,13,850,520,.65,camera,1);
  }
  // The five lanes are a separate Cycles render and move at track/world speed.
  ctx.drawImage(images.track,0,200,4096,700,-750-camera,385,4096,800);
  // Lamps are a distinct depth layer, kept behind the reference dog.
  for(let k=-1;k<=2;k++)prop('lamps',k*2750+790,178,780,370,.81,camera,.96);
  if(dogToggle.checked){
    const im=images.dog;
    // Approved Rocky race stand, copied unchanged. Crop is a draw operation only.
    ctx.fillStyle='#193b4770';ctx.beginPath();ctx.ellipse(960,799,82,11,0,0,Math.PI*2);ctx.fill();
    ctx.drawImage(im,255,10,710,673,892,665,140,132);
  }
  for(const f of flakes){ctx.globalAlpha=.23;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc((f.x-camera*.18+W*5)%W,(f.y+t*f.s)%H,f.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
  ctx.fillStyle='#e7e3d4';ctx.font='600 22px system-ui';ctx.fillText('СНЕЖНЫЙ КУБОК  /  ЗРИТЕЛЬСКИЙ СЕКТОР',44,1027);
}
function loop(now){
  if(last){let dt=now-last;if(dt>50)dropped++;frameTimes.push(dt);if(frameTimes.length>240)frameTimes.shift();if(playing){t=(t+Math.min(dt,.05*1000)/1000)%16;slider.value=t.toFixed(2)}}last=now;
  render();if(now-lastStat>1000){lastStat=now;let avg=frameTimes.reduce((a,b)=>a+b,0)/Math.max(1,frameTimes.length);stats.textContent=`Canvas ${W}×${H} · ${avg?(1000/avg).toFixed(1):'—'} FPS (rolling) · dropped intervals >50 ms: ${dropped} · camera ${t.toFixed(2)} s`;}
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop);
window.winterModule={canvas,render,setTime(v){t=v;slider.value=v;render()},metrics(){let s=[...frameTimes].sort((a,b)=>a-b),avg=frameTimes.reduce((a,b)=>a+b,0)/Math.max(frameTimes.length,1);return {resolution:[W,H],fps:1000/avg,p95FrameMs:s[Math.floor(s.length*.95)]||0,droppedIntervals:dropped,frames:frameTimes.length,time:t,ready}}};
