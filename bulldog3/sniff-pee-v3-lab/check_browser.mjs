import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const root=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(root,'../..');
const port=18775,server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',repo],{stdio:'ignore'});
let browser;
try{
  let ready=false;
  for(let i=0;i<30;i++){
    try{const r=await fetch(`http://127.0.0.1:${port}/bulldog3/sniff-pee-v3-lab/`);if(r.ok){ready=true;break;}}catch{}
    await new Promise(r=>setTimeout(r,200));
  }
  if(!ready)throw new Error('Lab HTTP server did not start');
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1920,height:1200}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/bulldog3/sniff-pee-v3-lab/`);
  await page.waitForFunction('window.rockySniffLab?.ready===true');
  await page.click('#play');await page.waitForTimeout(650);
  const playTime=await page.evaluate(()=>window.rockySniffLab.time);
  if(playTime<.3)throw new Error('Lab Play did not advance');
  await page.click('#play');
  const modes={};
  for(const mode of ['chain','action','speeds']){
    modes[mode]=await page.evaluate(mode=>{
      const lab=window.rockySniffLab;lab.select(mode);
      const length=lab.modes[mode].t1-lab.modes[mode].t0;
      const values=[0,length/3,length*.75,length-1/24].map(t=>lab.seek(t));
      return {duration:length,states:values.map(group=>group.map(s=>({segment:s.segment,progress:s.progress,frame:s.frame})))};
    },mode);
    if(mode==='speeds'&&modes[mode].states.some(a=>a.length!==5))throw new Error('Five speed lanes did not render');
  }
  const videos=[];
  for(const file of ['DOG3_ROCKY_SNIFF_PEE_FULL_CHAIN_GAMEPLAY.mp4','DOG3_ROCKY_SNIFF_PEE_ACTION_GAMEPLAY.mp4']){
    const result=await page.evaluate(async file=>{
      const v=document.createElement('video');v.src=`./${file}`;v.muted=true;document.body.append(v);
      await new Promise((resolve,reject)=>{v.onloadeddata=resolve;v.onerror=()=>reject(new Error(`${file}: decode error`));});
      await v.play();
      await Promise.race([
        new Promise(resolve=>{v.onended=resolve}),
        new Promise((_,reject)=>setTimeout(()=>reject(new Error(`${file}: full playback timed out`)),35000)),
      ]);
      const result={file,width:v.videoWidth,height:v.videoHeight,duration:v.duration,played:v.currentTime,ended:v.ended,error:v.error?.message??null};v.remove();return result;
    },file);
    if(!result.ended||result.error)throw new Error(`${file}: playback failed`);
    videos.push(result);
  }
  if(errors.length)throw new Error(errors.join('; '));
  await writeFile(path.join(root,'final_browser_check.json'),JSON.stringify({browser:'Chromium',playTime,modes,videos,errors},null,2)+'\n');
  console.log(`Chromium Play, three lab modes and ${videos.length} MP4s passed`);
}finally{if(browser)await browser.close();server.kill();}
