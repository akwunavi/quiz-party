// Замеры ПРОЕКТОРНОЙ сцены в составе приложения (стенд e2e/bulldog/harness.html на vite dev): память (RSS браузера), FPS, фазы, повторные прогоны.
// usage: node measure-app.cjs <out.json> [D=30]    (нужен запущенный `npx vite --port 5199` и глобальный playwright)
const {chromium}=require('playwright');const {execSync}=require('child_process');const fs=require('fs');
const rss=()=>Math.round(+execSync("ps -eo rss,args | grep -iE 'chrom|headless_shell' | grep -v grep | awk '{s+=$1} END {print s}'").toString().trim()/1024);
(async()=>{const D=+(process.argv[3]||30),out=[];
 const b=await chromium.launch({args:['--enable-precise-memory-info']});const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 const fps=ms=>p.evaluate(ms=>new Promise(res=>{const ts=[];const t0=performance.now();const f=n=>{ts.push(n);if(n-t0<ms)requestAnimationFrame(f);else{const d=ts.slice(1).map((x,i)=>x-ts[i]).sort((a,b)=>a-b);res({fps:+(1000*d.length/(ts.at(-1)-ts[0])).toFixed(1),p95ms:Math.round(d[Math.floor(d.length*.95)]),maxMs:Math.round(d.at(-1))});}};requestAnimationFrame(f);}),ms);
 const snap=async(label,shot)=>{await p.waitForTimeout(400);const r={label,rssMB:rss(),heapMB:await p.evaluate(()=>Math.round(performance.memory.usedJSHeapSize/1048576)),...(await fps(1500)),stage:await p.evaluate(()=>window.__stats)};if(shot)await p.screenshot({path:`/tmp/labshots/app_${shot}.png`});out.push(r);console.log(JSON.stringify(r));};
 const base0=rss();
 await p.goto('http://127.0.0.1:5199/quiz-party/e2e/bulldog/harness.html');await p.waitForSelector('canvas.bulldog-canvas');
 await p.waitForTimeout(12000);await snap('1 выбор: загрузка, 5 IDLE','select');
 for(let run=1;run<=3;run++){
  await p.evaluate(([D,run])=>window.harness.startNow({courseSec:D,seed:run*1000+7}),[D,run]);
  await p.waitForTimeout(1500);await snap(`прогон ${run}: переход`,run===1?'transition':null);
  await p.waitForTimeout(2800);await snap(`прогон ${run}: отсчёт`,run===1?'countdown':null);
  await p.waitForTimeout(9000);await snap(`прогон ${run}: гонка`,run===1?'race':null);
  // дождаться финиша (D=30 → гонка ≈ 45–55 с) и пьедестала
  const t0=Date.now();while(Date.now()-t0<150000){const ok=await p.evaluate(()=>document.querySelector('.host-actions')===null);await p.waitForTimeout(1000);if((Date.now()-t0)>62000)break;}
  await p.waitForTimeout(8000);await snap(`прогон ${run}: финиш/пьедестал`,run===1?'podium':null);
  await p.evaluate(()=>window.harness.set({stage:undefined}));await p.waitForTimeout(3000);await snap(`после прогона ${run}: снова выбор`,null);
 }
 console.log('baseline browser',base0,'errors',JSON.stringify(errs.slice(0,5)));
 fs.writeFileSync(process.argv[2]||'/tmp/app_mem.json',JSON.stringify({out,errs},null,1));await b.close();})();
