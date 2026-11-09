// Детерминированная запись роликов лаборатории: кадры берутся шагом dt = 1/FPS игрового времени прямо из canvas, а не с экрана,
// поэтому ролик идёт в реальном времени независимо от скорости рендера (запись экрана Playwright давала 25 к/с против 24 к/с анимации).
// usage: node capture.cjs <имя> '<json настройки>'   (нужен глобальный playwright и http-сервер из корня репозитория на :8765)
// настройки: {D, speed, seed, t0, secs, cam, zoom, label, fps, mode:'race'}
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const name=process.argv[2],cfg=Object.assign({D:42,speed:1,seed:1,t0:8,secs:12,cam:'fixed',zoom:1,label:'',fps:30},JSON.parse(process.argv[3]||'{}'));
 const dir=`/tmp/cap/${name}`;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('http://localhost:8765/bulldog-racing/round-lab/index.html');await p.waitForFunction(()=>window.round&&window.round.ready,null,{timeout:150000});
 await p.evaluate(async c=>{const R=round,G=R.G;R.pause(true);G.V3=await R.loadRaceV3(c.D);G.D=c.D;G.seed=c.seed;G.raceSpeed=c.speed;G.betting.lock();G.race=G.V3.resolveRace(c.seed);G.phase='race';G.phaseT=0;G.raceT=c.t0;
   R.OPTS.cam=c.cam;R.OPTS.zoom=c.zoom;R.OPTS.label=c.label;R.render();},cfg);
 const n=Math.round(cfg.secs*cfg.fps);
 for(let i=0;i<n;i++){const u=await p.evaluate(dt=>{round.step(dt);return document.getElementById('cv').toDataURL('image/jpeg',0.88);},1/cfg.fps);
  fs.writeFileSync(`${dir}/${String(i).padStart(4,'0')}.jpg`,Buffer.from(u.split(',')[1],'base64'));}
 await b.close();console.log('ok',name,n);})();
