// Headless Chromium render of Zefir's selection lab, frame exact (seek per frame), for given scenarios:
//   LOOP3            — 3 full IDLE cycles;
//   CLICK_<idx>      — 1 IDLE cycle, then click at loop index idx of the 2nd cycle, exit path, SELECTED.
// usage: node tools/lab_check.mjs OUT SCENARIO... -> OUT/<scenario>/frames/f%04d.png + timeline.json
import {createRequire} from 'node:module';import {createServer} from 'node:http';import {readFile,writeFile,mkdir} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),ROOT=path.resolve(HERE,'../..'),OUT=path.resolve(process.argv[2]),KEYS=process.argv.slice(3);
const require=createRequire(process.env.PW_CORE||'/opt/node-tools/node_modules/');const {chromium}=require('playwright-core');
const mime={'.html':'text/html','.mjs':'text/javascript','.json':'application/json','.png':'image/png','.webm':'video/webm'};
const server=createServer(async(req,res)=>{try{const p=decodeURIComponent(new URL(req.url,'http://x').pathname);const f=path.resolve(ROOT,'.'+(p.endsWith('/')?p+'index.html':p));if(!f.startsWith(ROOT))throw 0;const b=await readFile(f);
  const range=req.headers.range;if(range){const [s,e]=range.replace('bytes=','').split('-');const a=+s,z=e?+e:b.length-1;res.writeHead(206,{'content-type':mime[path.extname(f)]||'application/octet-stream','content-range':`bytes ${a}-${z}/${b.length}`,'accept-ranges':'bytes','content-length':z-a+1});res.end(b.subarray(a,z+1));}
  else{res.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream','accept-ranges':'bytes'});res.end(b);}}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
const page=await b.newPage({viewport:{width:1300,height:800},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errors.push(m.text());});
await page.goto(`http://127.0.0.1:${server.address().port}/lab_select_v1/`);await page.waitForFunction(()=>window.zSel?.ready,null,{timeout:120000});
for(const key of KEYS){const dir=path.join(OUT,key,'frames');await mkdir(dir,{recursive:true});
  const t=await page.evaluate(k=>k==='LOOP3'?window.zSel.timeline(3,null):window.zSel.timeline(1,Number(k.split('_')[1])),key);
  for(let i=0;i<t.length;i++){await page.evaluate(st=>window.zSel.show(st),t[i]);const png=await page.evaluate(()=>document.getElementById('c').toDataURL('image/png'));
    await writeFile(path.join(dir,`f${String(i).padStart(4,'0')}.png`),Buffer.from(png.split(',')[1],'base64'));}
  await writeFile(path.join(OUT,key,'timeline.json'),JSON.stringify(t));}
await b.close();server.close();await writeFile(path.join(OUT,'errors.json'),JSON.stringify(errors));console.log('errors',errors.length,KEYS.join(','));
