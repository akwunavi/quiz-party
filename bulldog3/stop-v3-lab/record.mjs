import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const root=path.dirname(fileURLToPath(import.meta.url));
const port=18765,server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root],{stdio:'ignore'});
let browser,frames;
try{
  let ready=false;
  for(let i=0;i<30;i++){
    try{const r=await fetch(`http://127.0.0.1:${port}/index.html`);if(r.ok){ready=true;break;}}catch{}
    await new Promise(r=>setTimeout(r,200));
  }
  if(!ready)throw new Error('Local lab HTTP server did not start');
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1560,height:1020},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/index.html`);
  await page.waitForFunction('window.rockyStopLab?.ready===true',{timeout:30000});
  if(errors.length)throw new Error(errors.join('; '));
  const boundaries=await page.evaluate(()=>{
    const lab=window.rockyStopLab,eps=1e-7;
    return lab.dogs.map(d=>{
      const runEnd=d.segments[0].t1,stopEnd=d.segments[1].t1;
      return {name:d.name,base:d.base,
        runStopProgressGap:Math.abs(d.segments[0].p1-d.segments[1].p0),
        stopStandProgressGap:Math.abs(d.segments[1].p1-d.segments[2].p0),
        runStopSpeedBefore:lab.seek(runEnd-eps)[d.index].speed,
        stopStandSpeedAfter:lab.seek(stopEnd+eps)[d.index].speed};
    });
  });
  if(boundaries.length!==5||boundaries.some(b=>b.runStopProgressGap>1e-10||b.stopStandProgressGap>1e-10))throw new Error('Position jump at a segment boundary');
  await page.evaluate(()=>window.rockyStopLab.seek(0));
  await page.click('#play');await page.waitForTimeout(350);
  const advanced=await page.evaluate(()=>window.rockyStopLab.time);
  if(advanced<.1)throw new Error('Play button did not advance animation');
  await page.click('#play');
  frames=await mkdtemp(path.join(tmpdir(),'rocky-stop-record-'));
  for(let i=0;i<93;i++){
    const png=await page.evaluate(i=>{window.rockyStopLab.seek(i/24);return document.getElementById('race').toDataURL('image/png').split(',')[1]},i);
    await writeFile(path.join(frames,`f${String(i).padStart(4,'0')}.png`),Buffer.from(png,'base64'));
  }
  await new Promise((resolve,reject)=>{
    const p=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','24','-i',path.join(frames,'f%04d.png'),'-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',path.join(root,'DOG3_ROCKY_STOP_V3_GAMEPLAY.mp4')],{stdio:'inherit'});
    p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(new Error(`ffmpeg exit ${code}`)));
  });
  const preview=await browser.newPage();
  await preview.goto(`http://127.0.0.1:${port}/index.html`);
  await preview.setContent(`<video id="v" src="http://127.0.0.1:${port}/DOG3_ROCKY_STOP_V3_GAMEPLAY.mp4" muted autoplay playsinline></video>`);
  await preview.waitForFunction('document.getElementById("v").readyState>=3');
  await preview.waitForTimeout(350);
  const mp4Playback=await preview.evaluate(()=>{const v=document.getElementById('v');return {width:v.videoWidth,height:v.videoHeight,currentTime:v.currentTime,error:v.error?.message??null};});
  if(mp4Playback.currentTime<.1||mp4Playback.error)throw new Error('Gameplay MP4 failed Chromium playback');
  await writeFile(path.join(root,'browser_check.json'),JSON.stringify({browser:'Chromium',model:'Race V3 unchanged',fiveProfiles:boundaries,playAdvancedSeconds:advanced,mp4Playback,pageErrors:errors,framesRecorded:93},null,2)+'\n');
  console.log('Recorded 93 frames; five profiles and playback passed');
}finally{
  if(browser)await browser.close();
  server.kill();
  if(frames)await rm(frames,{recursive:true,force:true});
}
