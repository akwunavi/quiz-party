import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const root=path.dirname(fileURLToPath(import.meta.url));
const repo=path.resolve(root,'../..');
const port=18767,server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',repo],{stdio:'ignore'});
let browser;
try{
  let ready=false;
  for(let i=0;i<30;i++){
    try{const r=await fetch(`http://127.0.0.1:${port}/bulldog3/run-phase-v3-lab/index.html`);if(r.ok){ready=true;break;}}catch{}
    await new Promise(r=>setTimeout(r,200));
  }
  if(!ready)throw new Error('Local lab HTTP server did not start');
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1920,height:1200},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/bulldog3/run-phase-v3-lab/index.html`);
  await page.waitForFunction('window.rockyPhaseLab?.ready===true',{timeout:30000});
  const checks=[];
  const wanted=new Set(process.argv.slice(2));
  for(const [mode,output] of [
    ['chain','DOG3_ROCKY_RUN_STOP_STAND_START_RUN.mp4'],
    ['finish','DOG3_ROCKY_RUN_FINISH_STAND.mp4'],
    ['compare','DOG3_ROCKY_OLD_NEW_PHASE_COMPARISON.mp4'],
  ].filter(([mode])=>wanted.size===0||wanted.has(mode))){
    const length=await page.evaluate(mode=>{const lab=window.rockyPhaseLab;lab.select(mode);return lab.modes[mode].t1-lab.modes[mode].t0},mode);
    const total=Math.floor(length*24+1e-7);
    const frames=await mkdtemp(path.join(tmpdir(),'rocky-phase-'));
    try{
      for(let i=0;i<total;i++){
        const jpeg=await page.evaluate(i=>{window.rockyPhaseLab.seek(i/24);return document.getElementById('race').toDataURL('image/jpeg',.93).split(',')[1]},i);
        await writeFile(path.join(frames,`f${String(i).padStart(4,'0')}.jpg`),Buffer.from(jpeg,'base64'));
      }
      await new Promise((resolve,reject)=>{
        const p=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','24','-i',path.join(frames,'f%04d.jpg'),
          '-an','-vf','scale=in_range=full:out_range=limited:flags=bicubic,format=yuv420p',
          '-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-color_range','tv',
          '-movflags','+faststart',path.join(root,output)],{stdio:'inherit'});
        p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(new Error(`ffmpeg exit ${code}`)));
      });
    }finally{await rm(frames,{recursive:true,force:true});}
    const playback=await page.evaluate(async output=>{
      const video=document.createElement('video');video.src=`./${output}`;video.muted=true;document.body.append(video);
      await new Promise((resolve,reject)=>{video.onloadeddata=resolve;video.onerror=()=>reject(new Error('MP4 decode failed'));});
      await video.play();await new Promise(r=>setTimeout(r,350));
      const result={width:video.videoWidth,height:video.videoHeight,time:video.currentTime,error:video.error?.message??null};video.remove();return result;
    },output);
    if(playback.time<.1||playback.error)throw new Error(`${output}: playback failed`);
    checks.push({mode,output,frames:total,playback});console.log(output,total,'frames',playback.time.toFixed(2),'s playback');
  }
  await page.evaluate(()=>window.rockyPhaseLab.select('speeds'));
  const categoryChecks=await page.evaluate(()=>{
    const lab=window.rockyPhaseLab;
    const s=lab.seek(7.5);
    return s.map(x=>({segment:x.segment,progress:x.progress,speed:x.speed}));
  });
  if(categoryChecks.length!==5||errors.length)throw new Error(JSON.stringify({categoryChecks,errors}));
  await writeFile(path.join(root,'browser_check.json'),JSON.stringify({browser:'Chromium',checks,categoryChecks,pageErrors:errors},null,2)+'\n');
  await page.close();
}finally{if(browser)await browser.close();server.kill();}
