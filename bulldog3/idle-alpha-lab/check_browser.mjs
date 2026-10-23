// Check the isolated Rocky IDLE WebM in Chromium over four backgrounds and three real-time loops.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// This QA script runs in the managed Codex image, whose Playwright is outside the repo.
const require = createRequire('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');

const root = path.dirname(fileURLToPath(import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.webm':'video/webm','.png':'image/png'};
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const full = path.resolve(root, '.' + name);
  if (!full.startsWith(root + path.sep) || !fs.existsSync(full) || !fs.statSync(full).isFile()) {
    res.writeHead(404); res.end(); return;
  }
  const stat = fs.statSync(full);
  const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
  const start = range ? Number(range[1]) : 0;
  const end = range && range[2] ? Math.min(Number(range[2]), stat.size - 1) : stat.size - 1;
  res.writeHead(range ? 206 : 200, {
    'Content-Type': types[path.extname(full)] || 'application/octet-stream',
    'Content-Length': end - start + 1,
    'Accept-Ranges': 'bytes',
    ...(range ? {'Content-Range': `bytes ${start}-${end}/${stat.size}`} : {}),
  });
  fs.createReadStream(full, {start,end}).pipe(res);
});

await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
let browser;
try {
  browser = await chromium.launch({executablePath:process.env.CHROMIUM || '/usr/bin/chromium',
    headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
  const page = await browser.newPage({viewport:{width:1100,height:800}});
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
  await page.waitForFunction(() => document.querySelector('#dog')?.readyState >= 3, null, {timeout:30000});
  const colors = ['WHITE','BLACK','GREEN','BEIGE'];
  const buttons = ['Белый','Чёрный','Зелёный','Бежевый'];
  await page.locator('#dog').evaluate(v => {v.pause();v.currentTime = 3.0});
  await page.waitForTimeout(500);
  for (let i=0;i<colors.length;i++) {
    await page.getByRole('button',{name:buttons[i]}).click();
    await page.locator('#stage').screenshot({path:path.join(root,`BROWSER_${colors[i]}.png`)});
  }
  await page.locator('#dog').evaluate(async v => {
    window.__loops = 0;
    v.currentTime = 0;
    await new Promise(resolve => v.addEventListener('seeked',resolve,{once:true}));
    let previous = v.currentTime;
    v.addEventListener('timeupdate',() => {if (v.currentTime < previous - 1) window.__loops++; previous = v.currentTime});
    await v.play();
  });
  const started = Date.now();
  await page.waitForTimeout(30500);
  const status = await page.locator('#dog').evaluate(v => ({
    error:v.error?.message || null, paused:v.paused, width:v.videoWidth,height:v.videoHeight,
    duration:v.duration,currentTime:v.currentTime,loops:window.__loops,
    quality:v.getVideoPlaybackQuality?.(),
  }));
  fs.writeFileSync(path.join(root,'browser_check.json'),JSON.stringify({
    chromiumRealTimeSeconds:(Date.now()-started)/1000,
    screenshots:colors.map(c=>`BROWSER_${c}.png`),
    ...status,
  },null,2)+'\n');
  process.stdout.write(JSON.stringify(status)+'\n');
} finally {
  if (browser) await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
