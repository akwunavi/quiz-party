// Browser check of the Bulldog No.2 start lab (headless Chromium): frame-exact render of t = 0..6 s at 24 fps for each preset
// (frames + per-lane measurements), written to OUT/<preset>/. usage: node tools/lab_check.mjs OUT [PRESET ...]
import {createRequire} from 'node:module';import {createServer} from 'node:http';import {readFile,writeFile,mkdir} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),ROOT=path.resolve(HERE,'../../..'),OUT=path.resolve(process.argv[2]),KEYS=process.argv.slice(3).length?process.argv.slice(3):['PAIR','ALL5','ALL5_A'];
const require=createRequire(process.env.PW_CORE||'/opt/node-tools/node_modules/');const {chromium}=require('playwright-core');
const mime={'.html':'text/html','.mjs':'text/javascript','.json':'application/json','.png':'image/png'};
const server=createServer(async(req,res)=>{try{const p=decodeURIComponent(new URL(req.url,'http://x').pathname);const f=path.resolve(ROOT,'.'+(p.endsWith('/')?p+'index.html':p));if(!f.startsWith(ROOT))throw 0;const b=await readFile(f);res.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream'});res.end(b);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await b.newPage({viewport:{width:1920,height:1140},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errors.push(m.text());});
await page.goto(`http://127.0.0.1:${server.address().port}/bulldog2/lab_start_v1/`);await page.waitForFunction(()=>window.d2Lab?.ready,null,{timeout:120000});
for(const key of KEYS){const dir=path.join(OUT,key,'frames');await mkdir(dir,{recursive:true});const lanes=await page.evaluate(k=>window.d2Lab.select(k),key);const rows=[];
  for(let k=0;k<=6*24;k++){const t=k/24;rows.push({t,lanes:await page.evaluate(t=>{window.d2Lab.draw(t);return window.d2Lab.measure(t);},t)});const png=await page.evaluate(()=>document.getElementById('c').toDataURL('image/png'));await writeFile(path.join(dir,`f${String(k).padStart(4,'0')}.png`),Buffer.from(png.split(',')[1],'base64'));}
  await writeFile(path.join(OUT,key,'measure.json'),JSON.stringify({lanes,rows}));}
await b.close();server.close();await writeFile(path.join(OUT,'errors.json'),JSON.stringify(errors));console.log('errors',errors.length,KEYS.join(','));
