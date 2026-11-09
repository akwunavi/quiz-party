// Детерминированная запись сцен лаборатории в реальном времени (шаг игрового времени = 1/30 с, кадры из canvas).
// usage: node capture_scene.cjs <transition|butterfly:<dog>|podium> <имя>
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [scene,name]=[process.argv[2],process.argv[3]];const dir=`/tmp/cap/${name}`;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('http://localhost:8765/bulldog-racing/round-lab/index.html');await p.waitForFunction(()=>window.round&&window.round.ready,null,{timeout:150000});
 let n=0;const dt=1/30;
 const grab=async(extra)=>{const u=await p.evaluate(([dt,ex])=>{if(dt)round.step(dt);else round.render();return document.getElementById('cv').toDataURL('image/jpeg',0.88);},[extra===false?0:dt,0]);fs.writeFileSync(`${dir}/${String(n++).padStart(4,'0')}.jpg`,Buffer.from(u.split(',')[1],'base64'));};
 await p.evaluate(()=>round.pause(true));
 if(scene==='transition'){
  await p.evaluate(async()=>{const G=round.G;G.V3=await round.loadRaceV3(42);G.D=42;G.seed=1;G.raceSpeed=1;[[1,1],[2,2],[3,3],[4,4],[5,5],[6,3]].forEach(([t,d])=>G.choose(t,d));});
  for(let i=0;i<150;i++)await grab();                            // 5 с: собаки реагируют на выбор
  await p.evaluate(()=>round.G.finishSelection());
  for(let i=0;i<30*40;i++){await grab();const ph=await p.evaluate(()=>round.G.phase);if(ph==='race'){for(let k=0;k<20;k++)await grab();break;}}
 }
 if(scene.startsWith('butterfly:')){const i=+scene.split(':')[1];
  const info=await p.evaluate(async i=>{const R=round,G=R.G;let seed=null;for(let s=1;s<600&&seed==null;s++){const r=G.V3.resolveRace(s*101);if(r.dogs[i].segments.find(x=>x.kind==='BUTTERFLY'))seed=s*101;}
   G.seed=seed;G.race=G.V3.resolveRace(seed);G.betting.lock();G.phase='race';G.raceSpeed=1;R.OPTS.cam='follow';R.OPTS.zoom=2.6;R.OPTS.focus=i;
   const d=G.race.dogs[i],id=['frenk','zefir','rocky','pups','luna'][i],V=R.D[id].V;let a=null,z=null;for(let t=0;t<G.race.end;t+=1/48){const v=V.at(d.segments,t);if(v.window==='BUTTERFLY'&&v.role==='body'){if(a==null)a=t;z=t;}}
   G.raceT=a-1.2;R.OPTS.label=`${['Фрэнк','Зефир','Рокки','Пупс','Луна'][i]}: реакция на бабочку (seed ${seed}, реальное время)`;return {a,z};},i);
  const frames=Math.round((info.z-info.a+2.4)*30);for(let k=0;k<frames;k++)await grab();
 }
 if(scene==='podium'){
  await p.evaluate(async()=>{const G=round.G;G.V3=await round.loadRaceV3(30);G.D=30;G.seed=1;G.raceSpeed=1;[[1,3],[2,3],[3,1],[4,5],[5,2],[6,3]].forEach(([t,d])=>G.choose(t,d));G.betting.lock();G.race=G.V3.resolveRace(1);G.phase='race';G.phaseT=0;G.raceT=G.race.end-9;});
  for(let i=0;i<30*30;i++){await grab();const ph=await p.evaluate(()=>round.G.phase);if(ph==='podium'){for(let k=0;k<30*10;k++)await grab();break;}}
 }
 await b.close();console.log('ok',name,n);})();
