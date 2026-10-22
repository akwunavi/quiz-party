import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const root=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(root,'../..');
const port=18788,server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',repo],{stdio:'ignore'});
let browser;
try{
  let ready=false;
  for(let i=0;i<40;i++){
    try{const response=await fetch(`http://127.0.0.1:${port}/bulldog3/roll-v3-rhythm-review/compare.html`);if(response.ok){ready=true;break;}}catch{}
    await new Promise(resolve=>setTimeout(resolve,200));
  }
  if(!ready)throw new Error('Comparison server did not start');
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1920,height:1080}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/bulldog3/roll-v3-rhythm-review/compare.html`);
  await page.waitForFunction('window.rollCompare?.ready===true',{timeout:30000});
  const frames=await mkdtemp(path.join(tmpdir(),'rocky-roll-compare-'));
  const output=path.join(root,'DOG3_ROCKY_ROLL_V2_A_B_GAMEPLAY_COMPARISON.mp4');
  try{
    for(let i=0;i<145;i++){
      const data=await page.evaluate(i=>{window.rollCompare.seek(i/24);return document.getElementById('race').toDataURL('image/jpeg',.93).split(',')[1]},i);
      await writeFile(path.join(frames,`f${String(i).padStart(4,'0')}.jpg`),Buffer.from(data,'base64'));
    }
    await new Promise((resolve,reject)=>{
      const p=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','24','-i',path.join(frames,'f%04d.jpg'),
        '-an','-vf','scale=in_range=full:out_range=limited:flags=bicubic,format=yuv420p',
        '-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-color_range','tv',
        '-movflags','+faststart',output],{stdio:'inherit'});
      p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(new Error(`ffmpeg exit ${code}`)));
    });
  }finally{await rm(frames,{recursive:true,force:true});}
  if(errors.length)throw new Error(errors.join('; '));
  console.log(output);
}finally{if(browser)await browser.close();server.kill();}
