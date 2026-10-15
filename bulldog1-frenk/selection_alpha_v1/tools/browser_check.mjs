// Browser check of the selection-screen sequence (headless Chromium, real VP9-alpha decoding):
//  1) frame-exact render of IDLE x1 -> SELECTED -> RETURN_TO_IDLE -> IDLE x3 on four backgrounds -> frames dir (+ MP4 at 24 fps)
//  2) real-time playback with native <video> playback, every presented frame logged (requestVideoFrameCallback) + screen recording
// usage: [ONLY_REALTIME=1] [NO_RECORD=1] node tools/browser_check.mjs OUTDIR     (writes OUTDIR/frames/, OUTDIR/realtime.json, OUTDIR/realtime.webm)
import {createRequire} from 'node:module';import {createServer} from 'node:http';import {readFile,writeFile,mkdir,rename,readdir} from 'node:fs/promises';
import path from 'node:path';import {fileURLToPath} from 'node:url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),ROOT=path.resolve(HERE,'../../..'),OUT=path.resolve(process.argv[2]);
const require=createRequire(process.env.PW_CORE||'/opt/node-tools/node_modules/');const {chromium}=require('playwright-core');
const mime={'.html':'text/html','.mjs':'text/javascript','.webm':'video/webm','.json':'application/json','.png':'image/png'};
const server=createServer(async(req,res)=>{try{const p=decodeURIComponent(new URL(req.url,'http://x').pathname);const f=path.resolve(ROOT,'.'+(p.endsWith('/')?p+'index.html':p));if(!f.startsWith(ROOT))throw 0;
  const b=await readFile(f);const r=req.headers.range;const type=mime[path.extname(f)]||'application/octet-stream';
  if(r){const [s,e]=r.replace('bytes=','').split('-');const a=+s,z=e?+e:b.length-1;res.writeHead(206,{'content-type':type,'content-range':`bytes ${a}-${z}/${b.length}`,'accept-ranges':'bytes','content-length':z-a+1});res.end(b.subarray(a,z+1));}
  else{res.writeHead(200,{'content-type':type,'accept-ranges':'bytes','content-length':b.length});res.end(b);}}catch{if(!res.headersSent)res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/bulldog1-frenk/selection_alpha_v1/player/`;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
await mkdir(path.join(OUT,'frames'),{recursive:true});await mkdir(path.join(OUT,'rec'),{recursive:true});
const errors=[];
// 1) frame-exact (skip with ONLY_REALTIME=1)
if(!process.env.ONLY_REALTIME){const page=await browser.newPage({viewport:{width:1276,height:800}});page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto(url);await page.waitForFunction(()=>window.selPlayer?.ready,null,{timeout:60000});
 const tl=await page.evaluate(()=>window.selPlayer.timeline(1,3));
 for(const [k,[clip,i,cap]] of tl.entries()){await page.evaluate(([c,i,cap])=>window.selPlayer.renderFrame(c,i,cap),[clip,i,cap]);await page.locator('#c').screenshot({path:path.join(OUT,'frames',`f${String(k).padStart(5,'0')}.png`)});}
 await writeFile(path.join(OUT,'timeline.json'),JSON.stringify(tl));await page.close();}
// 2) real time
{const rec=!process.env.NO_RECORD;const ctx=await browser.newContext({viewport:{width:1276,height:800},...(rec?{recordVideo:{dir:path.join(OUT,'rec'),size:{width:1276,height:800}}}:{})});const page=await ctx.newPage();
 page.on('pageerror',e=>errors.push(String(e)));await page.goto(url);await page.waitForFunction(()=>window.selPlayer?.ready,null,{timeout:60000});
 const log=await page.evaluate(()=>window.selPlayer.runRealtime({idleBefore:1,idleAfter:3}));
 await writeFile(path.join(OUT,'realtime.json'),JSON.stringify({log}));const v=page.video();await ctx.close();if(v){const p=await v.path();await rename(p,path.join(OUT,'realtime.webm'));}}
await writeFile(path.join(OUT,'errors.json'),JSON.stringify(errors));await browser.close();server.close();
console.log('errors',errors.length,'frames',(await readdir(path.join(OUT,'frames'))).length);
