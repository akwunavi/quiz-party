// Render the same Canvas and the same deterministic model at exact 24 fps.
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile,rename,rm} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {RACES, FPS} from './model.mjs';
import {resolveRace} from './scenario.mjs';

const require=createRequire(import.meta.url);
const {chromium}=require('playwright-core');
const ROOT=path.dirname(fileURLToPath(import.meta.url));
const PRESET=process.argv[2]||'A';
const COMPARE=PRESET==='COMPARE';
if(!RACES[PRESET]&&PRESET!=='RANDOM'&&!COMPARE)throw new Error('Use preset A, B, C, RANDOM, or COMPARE');
const SEED=PRESET==='RANDOM'?Number(process.argv[3]):null;
const RACE_END=COMPARE?14:(PRESET==='RANDOM'?resolveRace(SEED):RACES[PRESET]).end;
const OUTPUT=path.join(ROOT,COMPARE?'DOG4_V3_RUN_SPEED_COMPARISON.mp4':PRESET==='RANDOM'?`DOG4_V3_RANDOM_SEED_${SEED}.mp4`:{A:'DOG4_V3_ALL_EVENTS_A.mp4',B:'DOG4_V3_COMBINATIONS_B.mp4',C:'DOG4_V3_STRESS_C.mp4'}[PRESET]);
const TEMP=path.join(ROOT,`.record-${PRESET}-${process.pid}.mp4`);
const FRAMES=process.argv[PRESET==='RANDOM'?4:3]?Number(process.argv[PRESET==='RANDOM'?4:3]):Math.ceil(RACE_END*FPS);
const mime={'.html':'text/html','.mjs':'text/javascript','.json':'application/json','.png':'image/png'};

const server=createServer(async(req,res)=>{
  try{
    const raw=new URL(req.url,'http://127.0.0.1').pathname;
    const name=raw==='/'?'index.html':raw.slice(1);
    const target=path.resolve(ROOT,name);
    if(!target.startsWith(ROOT+path.sep))throw new Error('bad path');
    res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');
    res.end(await readFile(target));
  }catch{res.writeHead(404);res.end('not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const address=`http://127.0.0.1:${server.address().port}/`;
let browser,encoder;
try{
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(address+(COMPARE?'run_compare.html':''),{waitUntil:'networkidle'});
  await page.waitForFunction(compare=>compare?window.runCompare?.ready:window.raceV3?.ready,COMPARE,{timeout:30000});
  if(COMPARE){const duration=await page.evaluate(()=>window.runCompare.total);if(duration!==RACE_END)throw new Error('comparison duration mismatch');}
  else if(PRESET==='RANDOM')await page.evaluate(seed=>window.raceV3.selectRandom(seed),SEED);
  else await page.evaluate(key=>window.raceV3.select(key),PRESET);
  encoder=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe',
    '-framerate',String(FPS),'-vcodec','mjpeg','-i','pipe:0','-an',
    '-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264',
    '-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-color_range','tv',
    '-movflags','+faststart',TEMP],
    {stdio:['pipe','ignore','pipe']});
  let encoderErrors='';encoder.stderr.on('data',data=>encoderErrors+=data);
  for(let i=0;i<FRAMES;i++){
    const t=i===FRAMES-1&&FRAMES===Math.ceil(RACE_END*FPS)?RACE_END:i/FPS;
    const base64=await page.evaluate(time=>{
      if(window.runCompare){window.runCompare.draw(time);return document.getElementById('comparison').toDataURL('image/jpeg',.86).split(',')[1];}
      window.raceV3.seek(time);return document.getElementById('race').toDataURL('image/jpeg',.86).split(',')[1];
    },t);
    if(!encoder.stdin.write(Buffer.from(base64,'base64')))await once(encoder.stdin,'drain');
    if(i%48===0)console.log(`${i}/${FRAMES} ${t.toFixed(2)}s`);
  }
  encoder.stdin.end();
  const [code]=await once(encoder,'exit');
  if(code!==0)throw new Error(`ffmpeg exited ${code}: ${encoderErrors}`);
  if(errors.length)throw new Error(`Chromium errors: ${errors.join('; ')}`);
  await rename(TEMP,OUTPUT);
  console.log(`DONE ${OUTPUT} frames=${FRAMES} duration=${FRAMES/FPS}`);
}finally{
  if(browser)await browser.close();
  server.close();
  await rm(TEMP,{force:true});
}
