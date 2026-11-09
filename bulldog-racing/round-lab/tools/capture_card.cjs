// Запись реакции одной собаки на экране выбора в реальном времени (24 к/с, по тику на кадр) и кроп её карточки.
// usage: node capture_card.cjs <имя> <индекс собаки 0..4> <фаза IDLE при выборе> <подпись>
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [name,idx,pos,label]=[process.argv[2],+process.argv[3],+process.argv[4],process.argv[5]||''];
 const dir=`/tmp/cap/${name}`;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('http://localhost:8765/bulldog-racing/round-lab/index.html');await p.waitForFunction(()=>window.round&&window.round.ready,null,{timeout:150000});
 await p.evaluate(([i,pos,label])=>{round.pause(true);round.setPlayer(i,pos);round.OPTS.cardLabel={i,text:label};round.render();},[idx,pos,label]);
 const FR=1/24+1e-9;let n=0,picked=false,after=0,total=0;const save=async()=>{const u=await p.evaluate(dt=>{round.step(dt);const c=document.getElementById('cv'),i=arguments[0];return null;},FR);};
 for(let k=0;k<700;k++){
  if(k===12){await p.evaluate(i=>round.G.choose(1,i+1),idx);picked=true;}
  const r=await p.evaluate(([dt,i])=>{round.step(dt);const c=document.getElementById('cv'),t=document.createElement('canvas');const x=50+370*i;t.width=340;t.height=700;t.getContext('2d').drawImage(c,x,300,340,700,0,0,340,700);return {u:t.toDataURL('image/png'),busy:round.G.players[i].busy()};},[FR,idx]);
  fs.writeFileSync(`${dir}/${String(n++).padStart(4,'0')}.png`,Buffer.from(r.u.split(',')[1],'base64'));
  if(picked&&!r.busy){after++;if(after>36)break;}
 }
 await b.close();console.log('ok',name,n);})();
