// Жизненный цикл ресурсов сцены: N раз «зашли на экран гонки → дали загрузиться/пошли в переход → ушли». После ухода должно остаться: 0 открытых
// ImageBitmap, 0 лишних слушателей/кадровых циклов, 0 canvas; RSS не растёт. usage: node lifecycle.cjs [cycles=8]   (нужен `npx vite --port 5199`)
const {chromium}=require('playwright');const {execSync}=require('child_process')
const rss=()=>Math.round(+execSync("ps -eo rss,args | grep -iE 'chrom|headless_shell' | grep -v grep | awk '{s+=$1} END {print s}'").toString().trim()/1024)
;(async()=>{const N=+(process.argv[2]||8);const b=await chromium.launch({args:['--enable-precise-memory-info']});const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[]
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())})
 await p.addInitScript(()=>{const w=window;w.__bm={open:0,made:0};const cib=w.createImageBitmap.bind(w);w.createImageBitmap=async(...a)=>{const bm=await cib(...a);w.__bm.open++;w.__bm.made++;const c=bm.close.bind(bm);let done=false;bm.close=()=>{if(!done){done=true;w.__bm.open--}c()};return bm}
  w.__raf=new Set();const r=w.requestAnimationFrame.bind(w),c=w.cancelAnimationFrame.bind(w);w.requestAnimationFrame=f=>{const id=r(t=>{w.__raf.delete(id);f(t)});w.__raf.add(id);return id};w.cancelAnimationFrame=id=>{w.__raf.delete(id);c(id)}
  w.__ls=0;const ae=EventTarget.prototype.addEventListener,re=EventTarget.prototype.removeEventListener;const reg=new Map();EventTarget.prototype.addEventListener=function(t,f,o){const k=this;if(f){let m=reg.get(k);if(!m)reg.set(k,m=new Set());const key=t+'|'+(f.__id??(f.__id=Math.random()));if(!m.has(key)){m.add(key);w.__ls++}}return ae.call(this,t,f,o)};EventTarget.prototype.removeEventListener=function(t,f,o){const m=reg.get(this);if(f&&m){const key=t+'|'+f.__id;if(m.delete(key))w.__ls--}return re.call(this,t,f,o)}})
 await p.goto('http://127.0.0.1:5199/quiz-party/e2e/bulldog/harness.html');await p.waitForSelector('canvas.bulldog-canvas');await p.waitForTimeout(6000)
 const st=()=>p.evaluate(()=>({bitmaps:window.__bm.open,made:window.__bm.made,raf:window.__raf.size,listeners:window.__ls,canvases:document.querySelectorAll('canvas').length,heapMB:Math.round(performance.memory.usedJSHeapSize/1048576)}))
 const rows=[];const first=await st();rows.push({phase:'на экране выбора',rss:rss(),...first})
 await p.evaluate(()=>window.harness.set({show:false}));await p.waitForTimeout(800);const base=await st();rows.push({phase:'после ухода с экрана',rss:rss(),...base});console.log(JSON.stringify(rows.at(-1)))
 for(let i=1;i<=N;i++){
  await p.evaluate(()=>window.harness.set({show:true,stage:undefined}));await p.waitForSelector('canvas.bulldog-canvas');await p.waitForTimeout(i%2?5000:3000)
  if(i%2===0){await p.evaluate(()=>window.harness.startNow({courseSec:30,seed:77}));await p.waitForTimeout(5200)}   // половину циклов уходим из гонки (переход/отсчёт/бег)
  const during=await st()
  await p.evaluate(()=>window.harness.set({show:false}));await p.waitForTimeout(900);const after=await st();const r={cycle:i,during:{bitmaps:during.bitmaps,heapMB:during.heapMB},rssAfter:rss(),...after};rows.push(r);console.log(JSON.stringify(r))}
 const f=rows.filter(r=>r.cycle),leak=f.at(-1).rssAfter-f[0].rssAfter
 console.log('SUMMARY',JSON.stringify({cycles:N,openBitmapsAfterLeave:[...new Set(f.map(r=>r.bitmaps))],rafAfterLeave:[...new Set(f.map(r=>r.raf))],canvasesAfterLeave:[...new Set(f.map(r=>r.canvases))],listenersDelta:f.at(-1).listeners-base.listeners,rssFirstToLastMB:leak,errors:errs.slice(0,3)}))
 await b.close()})()
