// Сквозная проверка в браузере: выбор → блокировка → переход → отсчёт → гонка → финиш → пьедестал на разных D и раскладках команд, дважды на один seed.
// usage: node e2e.cjs <out.json>
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:8765/bulldog-racing/round-lab/index.html');await p.waitForFunction(()=>window.round&&window.round.ready,null,{timeout:150000});
 const cfgs=[{seed:11,D:20,teams:5,mode:'all-one'},{seed:12,D:42,teams:8,mode:'skewed'},{seed:13,D:120,teams:3,mode:'even'},{seed:14,D:30,teams:12,mode:'random'},{seed:11,D:20,teams:5,mode:'all-one'}];
 const out=[];
 for(const c of cfgs){
  const r=await p.evaluate(async c=>{const R=round,G=R.G;R.pause(true);G.restart();G.V3=await R.loadRaceV3(c.D);G.D=c.D;G.seed=c.seed;G.raceSpeed=1;R.setTeamCount(c.teams);
   // раскладка и смена выбора до блокировки
   const rng=(()=>{let x=c.seed*7+1;return()=>(x=(x*16807)%2147483647)/2147483647;})();
   for(let t=1;t<=c.teams;t++){const d=c.mode==='all-one'?3:c.mode==='even'?((t-1)%5)+1:1+Math.floor(rng()*5);G.choose(t,d);}
   const before=G.betting.counts().slice();G.choose(1,5);G.choose(1,2);const after=G.betting.counts().slice();
   for(let i=0;i<24*6;i++)G.update(1/24);
   G.finishSelection();let locked=false;try{G.choose(1,4);}catch(e){locked=true;}
   const seq=[G.phase];let n=0;const raceStarts=[];
   while(G.phase!=='podium'&&n++<400000){const ph=G.phase;if(['locking','transition','countdown','finish'].includes(ph)&&G.phaseT>0.5)G.skip();G.raceSpeed=ph==='race'?8:1;G.update(1/15);R.render();if(seq.at(-1)!==G.phase)seq.push(G.phase);
     if(G.phase==='race'&&G.raceT===0){const starts=G.race.dogs.map((d,i)=>R.D[['frenk','zefir','rocky','pups','luna'][i]].V.at(d.segments,0));raceStarts.push(starts.map(s=>s.window+'/'+s.role));}}
   for(let i=0;i<24*8;i++){G.update(1/24);}
   R.render();
   const ref=G.V3.resolveRace(c.seed);
   return {cfg:c,seq,locked,countsBefore:before,countsAfter:after,places:G.results.places,refPlaces:ref.places,crossing:G.results.crossing.map(x=>+x.toFixed(3)),end:+G.race.end.toFixed(2),podium:G.podium(),shown:G.podiumShown,starts:raceStarts[0],scoreSum:G.results.scores.reduce((s,x)=>s+x.points,0)};},c);
  out.push(r);console.log(JSON.stringify({cfg:r.cfg,places:r.places,ok:JSON.stringify(r.places)===JSON.stringify(r.refPlaces)&&r.locked&&r.seq.join()==='locking,transition,countdown,race,finish,podiumTransition,podium'&&r.starts.every(s=>s==='BASE/hold'),end:r.end}));}
 const rep=JSON.stringify(out[0].crossing)===JSON.stringify(out[4].crossing)&&JSON.stringify(out[0].places)===JSON.stringify(out[4].places);
 console.log('воспроизводимость seed 11 (прогон 1 и 5):',rep,'ошибки страницы:',JSON.stringify(errs));
 fs.writeFileSync(process.argv[2]||'/tmp/e2e.json',JSON.stringify({runs:out,reproducible:rep,pageErrors:errs},null,1));await b.close();})();
