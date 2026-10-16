import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const root=path.dirname(fileURLToPath(import.meta.url));
const port=18766,server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root],{stdio:'ignore'});
let browser;
try{
  let ready=false;
  for(let i=0;i<30;i++){
    try{const r=await fetch(`http://127.0.0.1:${port}/index.html`);if(r.ok){ready=true;break;}}catch{}
    await new Promise(r=>setTimeout(r,200));
  }
  if(!ready)throw new Error('Local lab HTTP server did not start');
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const checks=[];
  for(const [compare,output] of [[false,'DOG3_ROCKY_RACE_START_GAMEPLAY.mp4'],[true,'DOG3_ROCKY_VS_DOG4_SCALE.mp4']]){
    const page=await browser.newPage({viewport:{width:1560,height:1020},deviceScaleFactor:1});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`http://127.0.0.1:${port}/index.html${compare?'?compare=1':''}`);
    await page.waitForFunction('window.rockyStartLab?.ready===true',{timeout:30000});
    if(errors.length)throw new Error(errors.join('; '));
    const boundaries=await page.evaluate(()=>window.rockyStartLab.dogs.map(d=>({
      name:d.name,base:d.base,startSeconds:d.segments[1].t1-d.segments[1].t0,
      baseStartGap:Math.abs(d.segments[0].p1-d.segments[1].p0),
      startRunGap:Math.abs(d.segments[1].p1-d.segments[2].p0),
    })));
    if(boundaries.length!==(compare?2:5)||boundaries.some(b=>b.startSeconds!==1||b.baseStartGap>1e-10||b.startRunGap>1e-10))throw new Error('Race V3 boundary failure');
    await page.click('#play');await page.waitForTimeout(350);
    const advanced=await page.evaluate(()=>window.rockyStartLab.time);
    if(advanced<.1)throw new Error('Play did not advance');
    await page.click('#play');
    const frames=await mkdtemp(path.join(tmpdir(),'rocky-start-record-'));
    try{
      for(let i=0;i<84;i++){
        const png=await page.evaluate(i=>{window.rockyStartLab.seek(i/24);return document.getElementById('race').toDataURL('image/png').split(',')[1]},i);
        await writeFile(path.join(frames,`f${String(i).padStart(4,'0')}.png`),Buffer.from(png,'base64'));
      }
      await new Promise((resolve,reject)=>{
        const p=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','24','-i',path.join(frames,'f%04d.png'),
          '-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',path.join(root,output)],{stdio:'inherit'});
        p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(new Error(`ffmpeg exit ${code}`)));
      });
    }finally{await rm(frames,{recursive:true,force:true});}
    const preview=await browser.newPage();
    await preview.goto(`http://127.0.0.1:${port}/index.html`);
    await preview.setContent(`<video id="v" src="http://127.0.0.1:${port}/${output}" muted autoplay playsinline></video>`);
    await preview.waitForFunction('document.getElementById("v").readyState>=3');
    await preview.waitForTimeout(350);
    const playback=await preview.evaluate(()=>{const v=document.getElementById('v');return {width:v.videoWidth,height:v.videoHeight,currentTime:v.currentTime,error:v.error?.message??null};});
    if(playback.currentTime<.1||playback.error)throw new Error(`${output}: playback failed`);
    checks.push({output,profiles:boundaries,playAdvancedSeconds:advanced,mp4Playback:playback,pageErrors:errors});
    await preview.close();await page.close();
  }
  await writeFile(path.join(root,'browser_check.json'),JSON.stringify({browser:'Chromium',model:'Race V3 byte-identical',checks},null,2)+'\n');
  console.log('Recorded gameplay and Bulldog #4 scale comparison; Chromium playback passed');
}finally{if(browser)await browser.close();server.kill();}
