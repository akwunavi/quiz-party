// Fingerprint of everything the lab draws for Frenk: for each preset/seed, every Frenk lane, every 1/24 s tick:
// label, sprite shift, shadow x, body x, diagnostic; plus SHA-1 of the canvas at fixed times. Used to prove that moving the
// lab onto the integration package changes nothing.  node tools/dump_visual.mjs OUT.json
import {createRequire} from 'node:module';import {createServer} from 'node:http';import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';import path from 'node:path';import {fileURLToPath} from 'node:url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),ROOT=path.resolve(HERE,'../..');
const require=createRequire(process.env.PW_CORE||'/opt/node-tools/node_modules/');const {chromium}=require('playwright-core');
const mime={'.html':'text/html','.mjs':'text/javascript','.json':'application/json','.png':'image/png'};
const server=createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://x').pathname);
  const f=path.resolve(ROOT,'.'+(p.endsWith('/')?p+'index.html':p));if(!f.startsWith(ROOT))throw 0;const b=await readFile(f);
  res.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream'});res.end(b);}catch{if(!res.headersSent)res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1920,height:1300},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
await page.goto(`http://127.0.0.1:${server.address().port}/race-v3-frenk-lab/`);await page.waitForFunction(()=>window.frenkLab?.ready,null,{timeout:120000});
const out={errors,runs:[]};
const cases=[...['ALL_EVENTS','CHAIN_ALL','BUTTERFLY_ALL','ROLL_ALL','PAIR'].map(k=>({key:k})),...[20261013,1069078,7].flatMap(seed=>[0,2,4].map(lane=>({key:'RANDOM',seed,lane})))];
for(const c of cases){
  const r=await page.evaluate(({key,seed,lane})=>{const L=window.frenkLab;L.select(key,{seed,lane});const race=L.race,lanes=race.chars.map((ch,i)=>ch==='frenk'?i:-1).filter(i=>i>=0);
    const ticks=[];for(let k=0;k/24<=race.end;k++){const t=k/24;for(const i of lanes){const v=L.frenkAt(i,t);ticks.push([i,k,v.label,+v.shiftSrc.toFixed(6),+v.shadowX.toFixed(4),v.bodyX==null?null:+v.bodyX.toFixed(4),v.diagnostic||null]);}}
    return {end:race.end,crossings:race.dogs.map(d=>d.crossing),ticks};},c);
  const shots=[];for(const t of [1,r.end*0.3,r.end*0.55,r.end*0.8,r.end]){await page.evaluate(t=>window.frenkLab.seek(t),t);shots.push(createHash('sha1').update(await page.locator('#race').screenshot()).digest('hex'));}
  out.runs.push({...c,end:r.end,crossings:r.crossings,ticks:r.ticks.length,ticksHash:createHash('sha1').update(JSON.stringify(r.ticks)).digest('hex'),labels:[...new Set(r.ticks.map(x=>x[2]))].length,diagnostics:[...new Set(r.ticks.map(x=>x[6]).filter(Boolean))],shots,_ticks:r.ticks});
}
await browser.close();server.close();
await writeFile(process.argv[2],JSON.stringify(out));
console.log('errors',errors.length,out.runs.map(r=>`${r.key}${r.seed?':'+r.seed+'/'+r.lane:''} ticks=${r.ticks} diag=${r.diagnostics.length}`).join('\n'));
