// Замеры памяти и FPS лаборатории раунда (Chromium, Playwright). Память — RSS всех процессов браузера (ps) + куча JS; FPS — по requestAnimationFrame.
// ВАЖНО: headless-Chromium с программным рендером — цифры FPS ориентировочные, на реальной видеокарте обычно лучше.
// usage: node measure_memory.cjs <out.json>   (http-сервер из корня репозитория на :8765)
const {chromium}=require('playwright');const {execSync}=require('child_process');const fs=require('fs');
const rss=()=>{const o=execSync("ps -eo rss,args | grep -iE 'chrom|headless_shell' | grep -v grep | awk '{s+=$1} END {print s}'").toString().trim();return Math.round(+o/1024);};
(async()=>{const out=[];
 const b=await chromium.launch({args:['--enable-precise-memory-info']});const p=await b.newPage({viewport:{width:1920,height:1080}});
 const fps=ms=>p.evaluate(ms=>new Promise(res=>{const ts=[];const t0=performance.now();const f=n=>{ts.push(n);if(n-t0<ms)requestAnimationFrame(f);else{const d=ts.slice(1).map((x,i)=>x-ts[i]);d.sort((a,b)=>a-b);res({fps:+(1000*d.length/(ts.at(-1)-ts[0])).toFixed(1),p95ms:+d[Math.floor(d.length*.95)].toFixed(0),maxMs:+d.at(-1).toFixed(0)});}};requestAnimationFrame(f);}),ms);
 const heap=()=>p.evaluate(()=>Math.round(performance.memory.usedJSHeapSize/1048576));
 const snap=async(label,withFps=true)=>{await p.waitForTimeout(600);const r={label,browserRssMB:rss(),jsHeapMB:await heap()};if(withFps)Object.assign(r,await fps(3000));out.push(r);console.log(JSON.stringify(r));};
 await snap('0 пустая страница',false);
 await p.goto('http://localhost:8765/bulldog-racing/round-lab/index.html');
 await p.waitForFunction(()=>window.round&&window.round.ready,null,{timeout:150000});
 const atl=await p.evaluate(()=>{let n=0,px=0,sel=0,race=0;for(const d of Object.values(round.D)){for(const im of Object.values(d.sheets)){n++;race+=im.naturalWidth*im.naturalHeight*4;}for(const im of Object.values(d.sel)){n++;sel+=im.naturalWidth*im.naturalHeight*4;}}return {imagesLoaded:n,raceSheetsDecodedMB:Math.round(race/1048576),selectionSheetsDecodedMB:Math.round(sel/1048576),frames:Object.values(round.D).reduce((a,d)=>a+Object.values(d.selAtlas.clips).reduce((s,c)=>s+c.count,0),0)};});
 out.push({label:'атласы',...atl});console.log(JSON.stringify(atl));
 await snap('1 экран выбора загружен, 5 IDLE играют');
 await p.evaluate(()=>{const G=round.G;[[1,1],[2,2],[3,3],[4,4],[5,5],[6,3]].forEach(([t,d])=>G.choose(t,d));});await p.waitForTimeout(6000);await snap('2 все пять реагируют (SELECTED/RETURN)');
 await p.evaluate(()=>{round.G.D=60;round.G.seed=1;round.G.raceSpeed=1;});await p.evaluate(async()=>{round.G.V3=await round.loadRaceV3(60);round.G.finishSelection();});
 await p.waitForFunction(()=>round.G.phase==='transition',null,{timeout:60000});await snap('3 переход к старту');
 await p.waitForFunction(()=>round.G.phase==='race',null,{timeout:60000});await p.waitForTimeout(8000);await snap('4 гонка (D=60, ×1), середина');
 // длинная гонка: D=240, ×8 — дрейф памяти
 await p.evaluate(async()=>{const G=round.G;G.V3=await round.loadRaceV3(240);G.D=240;G.race=G.V3.resolveRace(7);G.raceT=0;G.raceSpeed=8;G.phase='race';});
 for(let i=1;i<=3;i++){await p.waitForTimeout(8000);await snap(`5.${i} длинная гонка D=240 ×8, +${i*8} с (t=${Math.round(await p.evaluate(()=>round.G.raceT))})`);}
 await p.waitForFunction(()=>round.G.phase==='podium',null,{timeout:120000});await p.waitForTimeout(6000);await snap('6 пьедестал');
 for(let k=0;k<3;k++){await p.evaluate(()=>{round.G.restart();});await p.evaluate(async k=>{const G=round.G;G.V3=await round.loadRaceV3(30);G.D=30;G.seed=k+3;G.raceSpeed=8;[[1,1],[2,2]].forEach(([t,d])=>G.choose(t,d));G.finishSelection();},k);for(let w=0;w<400;w++){const ph=await p.evaluate(()=>{const G=round.G;if(['locking','transition','countdown','finish'].includes(G.phase))G.skip();return G.phase;});if(ph==='podium')break;await p.waitForTimeout(250);};}
 await snap('7 после трёх полных перезапусков раунда');
 fs.writeFileSync(process.argv[2]||'/tmp/mem.json',JSON.stringify(out,null,1));await b.close();})();
