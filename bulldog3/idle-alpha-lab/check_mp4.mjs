// Real-time browser playback of both stand-alone review MP4s.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const root = path.dirname(fileURLToPath(import.meta.url));
const names = [
  'DOG3_IDLE_B_THREE_CYCLES_FOUR_BACKGROUNDS.mp4',
  'DOG3_IDLE_B_THREE_CYCLES_SELECTION_SCALE.mp4',
];
const server = http.createServer((req,res) => {
  const name = path.basename(new URL(req.url,'http://localhost').pathname);
  if (!names.includes(name)) {res.writeHead(404);res.end();return}
  const file = path.join(root,name), stat = fs.statSync(file);
  const match = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
  const start = match ? Number(match[1]) : 0;
  const end = match && match[2] ? Number(match[2]) : stat.size - 1;
  res.writeHead(match ? 206 : 200, {
    'Content-Type':'video/mp4','Content-Length':end-start+1,'Accept-Ranges':'bytes',
    ...(match ? {'Content-Range':`bytes ${start}-${end}/${stat.size}`} : {}),
  });
  fs.createReadStream(file,{start,end}).pipe(res);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try {
  browser=await chromium.launch({executablePath:process.env.CHROMIUM || '/usr/bin/chromium',
    headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage();
  const result={};
  for(const name of names) {
    await page.goto(`http://127.0.0.1:${server.address().port}/${name}`);
    await page.waitForFunction(()=>document.querySelector('video')?.readyState>=3,null,{timeout:30000});
    const started=Date.now();
    await page.locator('video').evaluate(v=>v.play());
    await page.waitForFunction(()=>document.querySelector('video')?.ended,null,{timeout:45000});
    result[name]=await page.locator('video').evaluate(v=>({duration:v.duration,currentTime:v.currentTime,
      ended:v.ended,error:v.error?.message||null,width:v.videoWidth,height:v.videoHeight,
      quality:v.getVideoPlaybackQuality?.()}));
    result[name].wallSeconds=Math.round((Date.now()-started)/100)/10;
  }
  fs.writeFileSync(path.join(root,'mp4_browser_check.json'),JSON.stringify(result,null,2)+'\n');
  process.stdout.write(JSON.stringify(result)+'\n');
} finally {
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
