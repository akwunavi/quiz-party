// RACE_STAND check for Bulldog No.2: RUN #30 held for 8 s, then the source run-up #31..#87 and the RUN loop #88..#99 x4,
// next to the RUN loop playing all the time. Game scale = the whole 1276x720 frame drawn at 207x116 (dog4-v3-lab/layout.json);
// x4 view for detail. Opaque source frames (studio background) - there is NO alpha yet.
const FPS=24,$=id=>document.getElementById(id),cv=$('c'),ctx=cv.getContext('2d');
const img=n=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=`./frames/r${String(n).padStart(3,'0')}.jpg`;});
const F={};await Promise.all(Array.from({length:74},(_,k)=>k+26).map(async n=>F[n]=await img(n)));
const arena=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src='../../race-v3-frenk-lab/dog4assets/arena.png';});
const HOLD=8*FPS,RUNUP=Array.from({length:57},(_,k)=>k+31),LOOP=Array.from({length:12},(_,k)=>k+88);
export const timeline=[...Array(HOLD).fill(30).map(n=>[n,'RACE_STAND = RUN #30 (удержание)']),...RUNUP.map(n=>[n,'исходный разгон RUN #31→#87']),...Array.from({length:48},(_,k)=>[LOOP[k%12],'цикл RUN #88–#99'])];
function draw(k){
  const [n,cap]=timeline[Math.min(k,timeline.length-1)],ref=LOOP[k%12],t=k/FPS;
  ctx.fillStyle='#15181b';ctx.fillRect(0,0,cv.width,cv.height);
  // game-scale strip: arena crop as context, sprites 207x116 (opaque, studio background)
  if(arena)ctx.drawImage(arena,300,380,1620,240,0,0,1920,240);else{ctx.fillStyle='#596b4c';ctx.fillRect(0,0,1920,240);}
  ctx.fillStyle='rgba(21,38,40,.75)';ctx.fillRect(0,0,1920,34);ctx.fillStyle='#fff4cc';ctx.font='bold 20px system-ui';
  ctx.fillText(`Игровой масштаб 207×116 (кадр целиком, без alpha) · ${t.toFixed(2)} с · ${cap}`,12,24);
  ctx.drawImage(F[n],520,80,207,116);ctx.drawImage(F[ref],1100,80,207,116);
  ctx.font='16px system-ui';ctx.fillText(`RUN #${n}`,520,216);ctx.fillText(`эталон: цикл RUN #${ref}`,1100,216);
  // x4 view
  ctx.fillStyle='#fff4cc';ctx.font='bold 20px system-ui';ctx.fillText('×4 (828×464) для деталей',12,280);
  ctx.drawImage(F[n],40,300,828,464);ctx.drawImage(F[ref],1052,300,828,464);
  ctx.font='18px system-ui';ctx.fillText(`${cap} · RUN #${n}`,40,790);ctx.fillText(`эталон внешности: цикл RUN #${ref}`,1052,790);
  // floor line of the RUN loop (paws, y≈671 of 720 in source px) for reference
  ctx.strokeStyle='rgba(255,90,90,.8)';ctx.setLineDash([8,6]);const fy=300+671*464/720;ctx.beginPath();ctx.moveTo(40,fy);ctx.lineTo(1880,fy);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#ff8a8a';ctx.font='14px system-ui';ctx.fillText('линия лап цикла RUN (y≈671 исх. px)',40,fy+18);
}
let k=0,t0=0,playing=false;
function tick(now){if(playing){k=Math.floor((now-t0)/1000*FPS);if(k>=timeline.length){k=timeline.length-1;playing=false;}draw(k);}requestAnimationFrame(tick);}
$('play').onclick=()=>{k=0;t0=performance.now();playing=true;};
window.rsCheck={ready:true,frames:timeline.length,draw};draw(0);$('st').textContent=`готово · ${timeline.length} кадров = ${(timeline.length/FPS).toFixed(1)} с`;requestAnimationFrame(tick);
