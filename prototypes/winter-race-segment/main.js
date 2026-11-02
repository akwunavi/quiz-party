// One isolated 2.5D world renderer. All scenery and dogs share world X; only
// the final camera transform changes. The 24-Hz source poses follow wall time.
const canvas=document.getElementById('stage');let ctx=canvas.getContext('2d',{alpha:false});
const W=1920,H=1080,S=37;
const mainCtx=ctx,worldCanvas=document.createElement('canvas');
worldCanvas.width=1280;worldCanvas.height=720;
const worldCtx=worldCanvas.getContext('2d',{alpha:false});
const dogs=[
  {name:'Фрэнк',key:'frank',speed:4.70,lead:0,bottom:203},
  {name:'Зефир',key:'zephyr',speed:4.90,lead:.35,bottom:209},
  {name:'Пупс',key:'pups',speed:5.12,lead:-.25,bottom:200},
  {name:'Фрэнк',key:'frank',speed:4.77,lead:.85,bottom:203},
  {name:'Зефир',key:'zephyr',speed:4.83,lead:-.7,bottom:209},
];
const images={};for(const key of ['frank','zephyr','pups']){images[key]=new Image();images[key].src=`./assets/${key}-run.png`}
const play=document.getElementById('play'),stats=document.getElementById('stats');
let time=0,playing=false,base=0,start=0,last=0,measure=[];
const color={ink:'#1d3542',snow:'#f5f7ef',gold:'#f3c776',pine:'#215b59'};
function racerX(t,i){let d=dogs[i],pause=i===2?Math.max(0,Math.min(1.2,t-6)):0;return d.lead+d.speed*(t-pause)+Math.min(t,1.2)*.4}
function median(a){return [...a].sort((x,y)=>x-y)[2]}
const cameraPath=[13];let cameraVelocity=0;
for(let k=1;k<=18*120+1;k++){
  const t=k/120,target=13+.70*median(dogs.map((_,i)=>racerX(t,i))),previous=cameraPath.at(-1);
  const desired=Math.max(-4.3,Math.min(4.3,(target-previous)/.42));
  cameraVelocity+=Math.max(-5/120,Math.min(5/120,desired-cameraVelocity));
  cameraPath.push(previous+cameraVelocity/120);
}
function cameraX(t){const u=Math.max(0,Math.min(18,t))*120,k=Math.min(cameraPath.length-2,Math.floor(u));return cameraPath[k]+(cameraPath[k+1]-cameraPath[k])*(u-k)}
function sx(x,c,scale=S){return W*.52+(x-c)*scale}
function line(x1,y1,x2,y2,col,width=1){ctx.strokeStyle=col;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
function fillPoly(points,col){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(...points[0]);for(let i=1;i<points.length;i++)ctx.lineTo(...points[i]);ctx.closePath();ctx.fill()}
function ellipse(x,y,rx,ry,col){ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill()}
function rect(x,y,w,h,col){ctx.fillStyle=col;ctx.fillRect(x,y,w,h)}
function round(x,y,w,h,r,col){ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
function gradient(y1,y2,stops){const g=ctx.createLinearGradient(0,y1,0,y2);for(const [p,v] of stops)g.addColorStop(p,v);return g}
function mountain(c){
  const p=c*.16;fillPoly([[-200-p,430],[70-p,225],[230-p,330],[450-p,135],[710-p,345],[960-p,220],[1160-p,325],[1450-p,120],[1770-p,340],[2120-p,190],[2200,480],[-200,480]],'#a9c4c8');
  fillPoly([[-200-p,450],[80-p,275],[230-p,355],[455-p,180],[690-p,375],[950-p,245],[1180-p,365],[1455-p,155],[1710-p,370],[2030-p,230],[2200,500],[-200,500]],'#d6e6e6');
  for(let i=0;i<9;i++){let x=i*260-150-p;fillPoly([[x,405],[x+120,285+(i%3)*27],[x+245,425]],i%2?'#c0d7db':'#c7dfe1')}
}
function sky(c,t){
  rect(0,0,W,H,gradient(0,500,[[0,'#0d283b'],[.46,'#355c70'],[1,'#d2e1df']]));
  ellipse(1600-c*.05,116,60,60,'#f8edd4');
  ctx.save();ctx.globalAlpha=.18;ellipse(1600-c*.05,116,130,130,'#fff0c9');ctx.restore();
  for(let i=0;i<26;i++){let x=(i*229+41)%W,y=26+(i*79)%186;ellipse(x,y,i%5===0?2:1,i%5===0?2:1,'#dceceb')}
  mountain(c);
  fillPoly([[0,400],[270,380],[630,405],[950,371],[1330,402],[1690,376],[1920,400],[1920,530],[0,530]],'#e9f0eb');
  for(let i=0;i<14;i++){const x=i*155-(c*.32%155)-90;ellipse(x,430+(i%3)*7,145,27,'#cedfe1')}
}
function tree(x,y,h,variant=0){
  const w=h*.45;ellipse(x,y+3,w*.66,8,'#6d9c9d');rect(x-8,y-h*.22,16,h*.24,'#694e3c');
  for(let k=0;k<4;k++){
    const top=y-h+k*h*.17,bot=top+h*.43,wide=w*(.54+k*.17);
    fillPoly([[x,top],[x-wide,bot],[x+wide,bot]],k%2?'#1c5955':'#2c746d');
    fillPoly([[x,top],[x-wide,bot],[x,bot-8]],'#3b827a');
    ctx.strokeStyle='#e9f4ed';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-wide*.70,bot-6);ctx.quadraticCurveTo(x-wide*.25,bot-12,x,bot-9);ctx.moveTo(x+wide*.12,bot-9);ctx.lineTo(x+wide*.72,bot-5);ctx.stroke();
  }
  if(variant%4===0){for(let j=0;j<8;j++){let q=(j*1.37+variant)%5;ellipse(x+Math.sin(j*12+variant)*w*.55,y-h*.1-q*h*.14,3,3,j%2?'#f8d184':'#d05d52')}}
}
const treeCache=new Map();
function cachedTree(x,y,h,variant){
  const key=`${h}/${variant}`;
  if(!treeCache.has(key)){
    const el=document.createElement('canvas');el.width=Math.ceil(h*1.2);el.height=Math.ceil(h+22);
    const main=ctx;ctx=el.getContext('2d');try{tree(el.width/2,h+12,h,variant)}finally{ctx=main}
    treeCache.set(key,el);
  }
  const el=treeCache.get(key);ctx.drawImage(el,x-el.width/2,y-h-12);
}
function lamppost(x,y){
  rect(x-4,y-151,8,151,'#473c35');fillPoly([[x-12,y-150],[x+12,y-150],[x+7,y-162],[x-7,y-162]],'#b88f60');
  round(x-10,y-143,20,31,3,'#f1cf91');ctx.save();ctx.shadowColor='#ffce78';ctx.shadowBlur=30;ellipse(x,y-127,11,14,'#ffe2a0');ctx.restore();
  line(x-18,y-116,x+18,y-116,'#5e4333',5);
}
function bunting(x1,x2,y,t){
  line(x1,y,x2,y+Math.sin(t*.5)*3,'#916e4f',3);
  const count=Math.max(2,Math.floor((x2-x1)/27));for(let j=0;j<count;j++){let x=x1+j*(x2-x1)/count;fillPoly([[x,y+2],[x+13,y+2],[x+7,y+21+Math.sin(t*2+j)*2]],['#d26253','#e9b95e','#3e7975'][j%3])}
}
function spectator(x,y,n,t){
  const coat=['#ae3e43','#bd7b37','#286979','#6d5a88','#385a62','#d39b5c'][n%6],skin=['#f1c59e','#c9906f','#e0aa82'][n%3];
  ellipse(x,y+1,17,6,'#49616b');round(x-13,y-38,26,35,8,coat);ellipse(x,y-48,11,12,skin);
  const hat=['#b84c4d','#f1c778','#33787b','#f2e9dc'][n%4];round(x-13,y-59,26,13,6,hat);ellipse(x,y-61,4,4,'#f6e8d6');
  const wave=n%5===0?Math.sin(t*3+n)*8:0;line(x-12,y-31,x-20,y-13-wave,coat,6);line(x+12,y-32,x+21,y-12+wave,coat,6);
  if(n%6===0){line(x+22,y-14,x+25,y-55+wave,'#745844',2);fillPoly([[x+25,y-55+wave],[x+46,y-48+wave],[x+25,y-37+wave]],n%2?'#e5b752':'#c85652')}
  ellipse(x-3,y-48,1.4,1.4,'#243c42');ellipse(x+4,y-48,1.4,1.4,'#243c42');
}
function fanNear(x,y,n,t){
  const scale=.9+(n%3)*.15;ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
  const colors=['#c6534b','#c98745','#397982','#74658e','#b75566'];
  const coat=colors[n%5],skin=['#e6b18a','#c98767','#f1ca9e'][n%3];
  ellipse(0,1,27,7,'#4e6269');
  fillPoly([[-21,-3],[21,-3],[17,-57],[-13,-60]],coat);
  fillPoly([[-24,-8],[24,-8],[16,-27],[-16,-27]],'rgba(20,48,60,.25)');
  ellipse(0,-68,16,17,skin);
  if(n%3===0){fillPoly([[-20,-80],[20,-80],[13,-104],[-13,-103]],'#f2dfb3');ellipse(0,-106,6,6,'#fff0d5')}
  else {round(-18,-90,36,16,8,n%2?'#f0c879':'#e9e5d2');ellipse(0,-94,5,5,'#f8f1df')}
  round(-18,-52,38,9,4,'#e5d4ad');
  const swing=Math.sin(t*3.2+n*1.7)*11;
  if(n%2===0){line(-16,-48,-33,-77+swing,coat,9);ellipse(-35,-79+swing,7,7,skin)}
  else {line(-16,-48,-34,-32,coat,9)}
  line(16,-48,32,-49-swing,coat,9);ellipse(34,-49-swing,7,7,skin);
  if(n%4===0){line(33,-50-swing,41,-130-swing,'#715a45',3);fillPoly([[41,-130-swing],[81,-119-swing],[41,-104-swing]],n%8?'#e7bd68':'#c55c53')}
  ctx.restore();
}
function grandstand(wx,width,style,c,t){
  const x=sx(wx,c),w=width*S;if(x+w<-100||x>W+100)return;
  const y=344,base=style===0?'#6b4a35':'#465e63',face=style===0?'#8c5d3b':'#628087';
  // Deep timber roof, two visible seating levels, and a recessed opening.
  fillPoly([[x-28,y-14],[x+w+26,y-14],[x+w+11,y+51],[x-12,y+51]],'#3b4246');
  fillPoly([[x-32,y-17],[x+w+29,y-17],[x+w-5,y-174],[x+6,y-174]],'#533d34');
  fillPoly([[x-45,y-162],[x+w+44,y-162],[x+w+23,y-187],[x-29,y-187]],'#f2f2e8');
  line(x-29,y-186,x+w+24,y-186,'#c9dedf',8);
  for(let k=0;k<5;k++){let xx=x+k*w/4;rect(xx-7,y-145,14,193,base);rect(xx-4,y-138,8,177,face)}
  for(let row=0;row<2;row++){
    const yy=y-4-row*58;fillPoly([[x,yy],[x+w,yy],[x+w+13,yy+15],[x-13,yy+15]],row?'#9d6e4d':'#b17c51');
    line(x-9,yy+12,x+w+9,yy+12,'#e0b778',5);
    for(let k=0;k<Math.floor(width*1.05);k++){
      const xx=x+20+k*31+((row%2)*14);if(xx>x+w-12)break;spectator(xx,yy-13,k+row*19+style*7,t);
    }
  }
  // Brass lamps and warm garland are part of the timber structure.
  for(let k=0;k<Math.floor(w/42);k++){let xx=x+14+k*42,yy=y-158+Math.sin(k*.65)*7;ctx.save();ctx.shadowColor='#ffd281';ctx.shadowBlur=13;ellipse(xx,yy,4,5,k%3?'#ffda91':'#e96258');ctx.restore()}
  bunting(x+8,x+w-8,y-110,t);
  rect(x+12,y+30,w-24,19,face);line(x+12,y+30,x+w-12,y+30,'#e5c184',3);
}
const standCache=new Map();
function cachedStand(wx,width,style,c,t){
  const x=sx(wx,c),w=width*S;if(x+w<-100||x>W+100)return;
  const key=`${width}/${style}`;
  if(!standCache.has(key)){
    const el=document.createElement('canvas');el.width=Math.ceil(w+130);el.height=420;
    const main=ctx;ctx=el.getContext('2d');
    try{grandstand(wx,width,style,wx+(W*.52-55)/S,0)}finally{ctx=main}
    standCache.set(key,el);
  }
  ctx.drawImage(standCache.get(key),x-55,0);
  for(let k=0;k<Math.floor(width/2.3);k++){
    const xx=x+45+k*78;if(xx>x+w-40)break;fanNear(xx,368,k+style*11,t);
  }
}
function lodge(wx,c){
  const x=sx(wx,c);if(x<-420||x>W+420)return;const y=331;
  rect(x-140,y-95,280,113,'#6c4b3e');for(let j=0;j<5;j++)rect(x-135+j*55,y-93,11,110,'#9a6f4c');
  fillPoly([[x-172,y-92],[x,y-208],[x+172,y-92]],'#794940');fillPoly([[x-182,y-99],[x,y-223],[x+182,y-99],[x+158,y-98],[x,y-200],[x-158,y-98]],'#f2f1e8');
  round(x-38,y-75,76,83,8,'#2e535a');round(x-22,y-65,44,53,4,'#ffcf85');
  for(let j=-1;j<=1;j+=2){round(x+j*95-23,y-68,46,47,4,'#2e535a');rect(x+j*95-17,y-61,34,31,'#efc57d');line(x+j*95,y-61,x+j*95,y-30,'#624b3e',4)}
  ctx.font='bold 24px Georgia,serif';ctx.textAlign='center';ctx.fillStyle='#f4d79e';ctx.fillText('СНЕЖНЫЙ КУБОК',x,y-108);ctx.textAlign='left';
}
function clockTower(wx,c){
  const x=sx(wx,c);if(x<-150||x>W+150)return;const y=369;
  rect(x-52,y-205,104,219,'#587276');rect(x-43,y-198,86,205,'#7b8f8c');
  for(let i=0;i<4;i++)line(x-43,y-142+i*43,x+43,y-142+i*43,'#506b70',3);
  fillPoly([[x-77,y-204],[x,y-280],[x+77,y-204]],'#5c4a43');
  fillPoly([[x-82,y-208],[x,y-290],[x+82,y-208],[x+72,y-205],[x,y-275],[x-72,y-205]],'#f4f0e7');
  ellipse(x,y-159,38,38,'#36545b');ellipse(x,y-159,31,31,'#fae3b0');
  line(x,y-159,x+13,y-171,'#5d4b42',4);line(x,y-159,x-4,y-181,'#5d4b42',4);
  for(let i=0;i<12;i++){let a=i*Math.PI/6;ellipse(x+26*Math.sin(a),y-159-26*Math.cos(a),1.5,1.5,'#82694b')}
  round(x-16,y-81,32,75,3,'#304e59');rect(x-11,y-75,22,58,'#f5d195');
  for(let side of [-1,1]){ctx.save();ctx.shadowColor='#ffd38d';ctx.shadowBlur=18;ellipse(x+side*45,y-87,7,11,'#ffe0a3');ctx.restore()}
}
function forest(c){
  const positions=[24,27,30,33,36,39,42,46,49,52,55,58,61];
  for(let i=0;i<positions.length;i++){let x=sx(positions[i]+((i*7)%3)*.35,c);if(x<-100||x>W+100)continue;cachedTree(x,388+(i%3)*10,124+(i*17)%65,i)}
  for(let i=0;i<6;i++){let x=sx(31+i*4.3,c);if(x<0||x>W)continue;fillPoly([[x-38,407],[x,380],[x+35,407]],'#edf6ef');ellipse(x,405,45,8,'#c9dfe2')}
}
function scenery(c,t){
  sky(c,t);
  cachedStand(-5,25,0,c,t);lodge(16,c);
  forest(c);
  cachedStand(62,29,1,c,t);clockTower(82,c);
  for(let wx of [-5,7,21,62,75,91]){let x=sx(wx,c);if(x>-30&&x<W+30)lamppost(x,388)}
}
function track(c,t){
  // Five continuous beveled snow/ice lanes; each has upper surface, exposed
  // front lip, packed-snow edging and independent world-space seams.
  const top=390,step=120;
  ctx.save();ctx.transform(1,-.025,0,1,0,24);
  rect(0,top-18,W,630,'#a1c3c8');
  for(let lane=0;lane<5;lane++){
    const y=top+lane*step;
    rect(0,y,W,step,gradient(y,y+step,[[0,'#dce9e7'],[.25,'#c5dcdf'],[.75,'#abd0d5'],[1,'#8cb8c0']]));
    rect(0,y+step-17,W,17,gradient(y+step-17,y+step,[[0,'#8caeb6'],[1,'#638e99']]));
    line(0,y+3,W,y+3,'#f8ffff',4);line(0,y+step-17,W,y+step-17,'#719da5',2);
    for(let wx=-10;wx<=110;wx+=3.4){let x=sx(wx,c,S*(.87+lane*.03));if(x<-70||x>W+70)continue;
      line(x,y+8,x+14,y+step-21,'rgba(65,111,124,.14)',1.5);
      fillPoly([[x+14,y+18],[x+62,y+17],[x+30,y+23]],'rgba(248,255,255,.13)');
    }
    for(let wx=-10;wx<110;wx+=4.8){let x=sx(wx,c);if(x<-100||x>W+100)continue;
      fillPoly([[x-55,y+step-17],[x-10,y+step-22],[x+25,y+step-19],[x+65,y+step-17]],'#e9f2ee');
    }
  }
  rect(0,top+step*5,W,60,'#d6e4df');line(0,top+step*5,W,top+step*5,'#f7faf2',7);
  for(let wx=0;wx<=100;wx+=10){let x=sx(wx,c);if(x<-20||x>W+20)continue;
    for(let lane=0;lane<5;lane++){const y=top+lane*step;line(x,y+15,x+5,y+step-31,'rgba(249,255,252,.45)',3)}
  }
  ctx.restore();
}
function frontRail(lane,c){
  const y=390+(lane+1)*120-8;
  ctx.save();ctx.transform(1,-.025,0,1,0,24);
  line(0,y,W,y,'rgba(239,249,243,.76)',5);
  line(0,y+7,W,y+7,'rgba(91,139,148,.65)',3);
  for(let wx=-10;wx<110;wx+=7.5){const x=sx(wx,c);if(x<-15||x>W+15)continue;
    rect(x-4,y-5,8,16,'#a9d0d1');round(x-6,y-8,12,5,2,'#f5faf2');
  }
  ctx.restore();
}
function drawDog(i,t,c){
  const d=dogs[i],frame=Math.floor(t*24+i*2)%12,img=images[d.key],x=sx(racerX(t,i),c),ground=390+i*120+98-.025*x+24;
  const height=132+i*10,width=height*384/216,dy=ground-height*d.bottom/216;
  // Contact shadow is attached to the same world anchor as the feet.
  ctx.save();ctx.shadowColor='#315f69';ctx.shadowBlur=22;ctx.globalAlpha=.16;ellipse(x+4,ground+4,width*.34,12,'#24424b');ctx.shadowBlur=0;ctx.globalAlpha=.25;ellipse(x,ground+2,width*.22,5,'#2b4c53');ctx.restore();
  if(img.complete&&img.naturalWidth)ctx.drawImage(img,(frame%4)*384,Math.floor(frame/4)*216,384,216,x-width/2,dy,width,height);
  // Loose snow is tied to the moving feet and never changes the sprite frames.
  const puff=(frame%6)/6;ctx.save();ctx.globalAlpha=.18*(1-puff);
  ellipse(x-width*.30-puff*20,ground-2-puff*8,6+puff*9,2+puff*4,'#f8ffff');
  ellipse(x-width*.34-puff*28,ground-8-puff*12,3+puff*4,3+puff*4,'#f8ffff');ctx.restore();
  frontRail(i,c);
  return {name:d.name,x:racerX(t,i),screenX:x,frame};
}
function overlay(t,c,participants){
  const bar=gradient(0,94,[[0,'rgba(10,31,42,.92)'],[1,'rgba(16,48,60,.75)']]);rect(0,0,W,94,bar);
  ctx.fillStyle='#f6dfae';ctx.font='bold 35px Georgia,serif';ctx.fillText('СНЕЖНЫЙ КУБОК',35,58);
  ctx.fillStyle='#e4efec';ctx.font='16px system-ui';ctx.fillText('НОВОГОДНИЙ ЗАБЕГ',37,81);
  ctx.font='bold 26px ui-monospace,monospace';ctx.fillText(`${t.toFixed(1)} c`,W-150,55);
  const rank=[...participants].sort((a,b)=>b.x-a.x);round(570,18,870,57,15,'rgba(12,35,45,.42)');
  ctx.font='bold 21px system-ui';for(let i=0;i<rank.length;i++){
    const p=rank[i],col=p.name==='Фрэнк'?'#e9b38e':p.name==='Зефир'?'#f0e8d5':'#a7c8d2';
    ellipse(605+i*169,48,12,12,col);ctx.fillStyle='#f6f8f2';ctx.fillText(`${i+1} ${p.name}`,625+i*169,55);
  }
  rect(0,1041,W,39,'rgba(13,39,50,.72)');ctx.fillStyle='#f1efe6';ctx.font='18px system-ui';
  ctx.fillText('ПЯТЬ ДОРОЖЕК  •  ТРИ УЧАСТКА  •  ЗИМНИЙ МАРШРУТ',37,1066);
}
function snowfall(t){ctx.save();for(let i=0;i<52;i++){
  const x=((i*211+Math.floor(t*16)*(i%3+1))%2040)-60,y=((i*97+Math.floor(t*(16+i%5*3)))%970)+85;
  ctx.globalAlpha=.28+(i%5)*.09;ellipse(x,y,i%8===0?2.6:1.3,i%8===0?2.6:1.3,'#f5fbfa');
}ctx.restore()}
function renderAt(t){time=Math.min(18,Math.max(0,t));const c=cameraX(time);
  // Depth scenery is painted at 720p; alpha dogs, feet, snow and HUD remain
  // crisp at 1080p. Both layers use the exact same world camera and clock.
  ctx=worldCtx;ctx.setTransform(2/3,0,0,2/3,0,0);scenery(c,time);track(c,time);
  ctx=mainCtx;ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(worldCanvas,0,0,W,H);
  const participants=[];for(let i=0;i<5;i++)participants.push(drawDog(i,time,c));
  snowfall(time);overlay(time,c,participants);
  const sample=measure.slice(-120),fps=sample.length>1?1000*(sample.length-1)/(sample.at(-1).at-sample[0].at):0;
  stats.textContent=`t=${time.toFixed(2)} c · camera X=${c.toFixed(2)} · browser FPS≈${fps.toFixed(1)} · ${participants.map(p=>`${p.name} ${p.x.toFixed(1)} / RUN ${p.frame}`).join(' | ')}`;
  return {t:time,cameraX:c,dogs:participants};
}
function tick(now){if(playing){const next=Math.min(18,base+(now-start)/1000);measure.push({at:now,frame:Math.floor(next*24)});if(measure.length>2000)measure.shift();renderAt(next);last=now;if(next===18){playing=false;play.textContent='▶ Старт'}}requestAnimationFrame(tick)}
play.onclick=()=>{playing=!playing;if(playing){base=time;start=performance.now();measure=[];last=0}play.textContent=playing?'Ⅱ Пауза':'▶ Старт'};
document.getElementById('reset').onclick=()=>{playing=false;play.textContent='▶ Старт';renderAt(0)};
Promise.all(Object.values(images).map(i=>i.decode())).then(()=>renderAt(0));requestAnimationFrame(tick);
window.winterRace={renderAt,canvas,get time(){return time},get measure(){return measure},get ready(){return Object.values(images).every(i=>i.complete&&i.naturalWidth)}};
