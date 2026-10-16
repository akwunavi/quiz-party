// Frame-exact browser render of the RACE_STAND check page -> OUT/frames/*.png (encode with ffmpeg at 24 fps). usage: node tools/record.mjs OUT
import {createRequire} from 'node:module';import {createServer} from 'node:http';import {readFile,mkdir} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),ROOT=path.resolve(HERE,'../../..'),OUT=path.resolve(process.argv[2]);
const require=createRequire(process.env.PW_CORE||'/opt/node-tools/node_modules/');const {chromium}=require('playwright-core');
const mime={'.html':'text/html','.mjs':'text/javascript','.jpg':'image/jpeg','.png':'image/png'};
const server=createServer(async(req,res)=>{try{const p=decodeURIComponent(new URL(req.url,'http://x').pathname);let f=path.resolve(ROOT,'.'+(p.endsWith('/')?p+'index.html':p));
  if(p.startsWith('/race-v3-frenk-lab/dog4assets/'))f=path.resolve(ROOT,'.'+p);const b=await readFile(f);res.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream'});res.end(b);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await b.newPage({viewport:{width:1920,height:960}});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
await page.goto(`http://127.0.0.1:${server.address().port}/bulldog2/race_stand_check/`);await page.waitForFunction(()=>window.rsCheck?.ready,null,{timeout:60000});
await mkdir(path.join(OUT,'frames'),{recursive:true});const N=await page.evaluate(()=>window.rsCheck.frames);
for(let k=0;k<N;k++){await page.evaluate(k=>window.rsCheck.draw(k),k);await page.locator('#c').screenshot({path:path.join(OUT,'frames',`f${String(k).padStart(4,'0')}.png`)});}
await b.close();server.close();console.log('errors',errors.length,'frames',N);
