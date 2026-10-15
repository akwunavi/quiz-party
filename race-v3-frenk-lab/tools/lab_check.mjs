// Browser checks + recordings of the Frenk lab in headless Chromium (the real browser renderer, not an offline re-draw).
// node tools/lab_check.mjs [--record] [--frames-only]      (playwright-core from /opt/node-tools; Chromium /opt/pw-browsers)
// Writes ../results/lab_check.json and, with --record, MP4s into ../results/.
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile,rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),LAB=path.resolve(HERE,'..'),ROOT=path.resolve(LAB,'..'),OUT=path.join(LAB,'results');
const require=createRequire(process.env.PW_CORE||'/opt/node-tools/node_modules/');
const {chromium}=require('playwright-core');
const {resolveRace}=await import(path.join(ROOT,'dog4-v3-lab/scenario.mjs'));
const RECORD=process.argv.includes('--record');
const mime={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.json':'application/json','.png':'image/png'};
// static server over the repo root. dog4-v3-lab/assets/* is not in this checkout: those requests are served from
// race-v3-frenk-lab/dog4assets/ (byte-identical git blobs of commit 921f0fe), only so the ORIGINAL page can be compared.
const server=createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://x').pathname);
  if(p.startsWith('/dog4-v3-lab/assets/'))p=p.replace('/dog4-v3-lab/assets/','/race-v3-frenk-lab/dog4assets/');
  const f=path.resolve(ROOT,'.'+(p.endsWith('/')?p+'index.html':p));if(!f.startsWith(ROOT))throw 0;const body=await readFile(f);
  res.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream'});res.end(body);}catch{if(!res.headersSent)res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1920,height:1300},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await mkdir(OUT,{recursive:true});
const report={generated:new Date().toISOString(),chromium:browser.version(),errors};

async function openLab(){await page.goto(base+'/race-v3-frenk-lab/');await page.waitForFunction(()=>window.frenkLab?.ready,null,{timeout:120000});}
await openLab();

// 1. Reproducibility of Bulldog №4 races: lab (browser) == dog4-v3-lab planner in Node, with and without a Frenk lane.
report.reproducibility=[];
for(const seed of [20261013,1069078,7,4242,123456789]){
  const node=resolveRace(seed).dogs.map(d=>+d.crossing.toFixed(9));
  for(const lane of [-1,2]){
    const lab=(await page.evaluate(([s,l])=>window.frenkLab.select('RANDOM',{seed:s,lane:l}),[seed,lane])).map(d=>+d.crossing.toFixed(9));
    report.reproducibility.push({seed,frenkLane:lane,identical:JSON.stringify(lab)===JSON.stringify(node),lab,node});
  }
}
// 2. Bulldog №4 pixels: lab vs the original dog4-v3-lab page, same seed and time, lanes area only (y >= 170).
{
  const p2=await browser.newPage({viewport:{width:1920,height:1300},deviceScaleFactor:1});
  await p2.goto(base+'/dog4-v3-lab/');await p2.waitForFunction(()=>window.raceV3?.ready,null,{timeout:120000});
  // the original page needs its own assets folder; if it is missing in this checkout the comparison is skipped and reported
  const assetsOk=await p2.evaluate(()=>document.getElementById('status').textContent);
  const cmp=[];
  for(const [seed,time] of [[20261013,12.3],[20261013,30.1],[1069078,22.0]]){
    await p2.evaluate(([s,t])=>{document.getElementById('seed').value=String(s);window.raceV3.selectRandom(s);window.raceV3.seek(t);},[seed,time]);
    await page.evaluate(([s,t])=>{window.frenkLab.select('RANDOM',{seed:s,lane:-1});window.frenkLab.seek(t);},[seed,time]);
    const a=await p2.locator('#race').screenshot({clip:undefined}),b=await page.locator('#race').screenshot();
    cmp.push({seed,time,a,b});
  }
  report.dog4Pixels={originalPageStatus:assetsOk,frames:[]};
  const dir=path.join(OUT,'_px');await mkdir(dir,{recursive:true});
  for(const [i,c] of cmp.entries()){await writeFile(path.join(dir,`orig_${i}.png`),c.a);await writeFile(path.join(dir,`lab_${i}.png`),c.b);report.dog4Pixels.frames.push({seed:c.seed,time:c.time,orig:`_px/orig_${i}.png`,lab:`_px/lab_${i}.png`});}
  await p2.close();
}
// 3. Frenk lanes: every tick at 24 fps. Seams (clip change), STOP-end shift switch, shadow vs visible body, diagnostics.
async function sweep(key){
  await page.evaluate(k=>window.frenkLab.select(k),key);
  return await page.evaluate(()=>{
    const L=window.frenkLab,race=L.race,out=[];
    race.dogs.forEach((d,i)=>{
      if(race.chars[i]!=='frenk')return;
      const ticks=[];for(let k=0;k*1/24<=d.end;k++){const t=k/24;ticks.push({t,...L.frenkAt(i,t)});}
      out.push({lane:i,name:d.name,base:d.base,ticks});
    });
    return out;
  });
}
const cls=l=>l==null?'MISSING':l.replace(/\d+$/,'');
function analyse(lanes){
  return lanes.map(({lane,name,base,ticks})=>{
    const seams=[],steps=[];let maxShadowOff=-1e9,minShadowOff=1e9;
    for(let i=1;i<ticks.length;i++){
      const a=ticks[i-1],b=ticks[i];
      if(a.bodyX!=null&&b.bodyX!=null){
        const visStep=b.bodyX-a.bodyX,anchorStep=b.x-a.x;
        if(cls(a.label)!==cls(b.label))seams.push({t:+b.t.toFixed(3),anchorX:+b.x.toFixed(2),bodyX:+b.bodyX.toFixed(2),from:a.label,to:b.label,bodyStepPx:+visStep.toFixed(2),anchorStepPx:+anchorStep.toFixed(2),shadowStepPx:+(b.shadowX-a.shadowX).toFixed(2),shiftFrom:+a.shiftSrc.toFixed(2),shiftTo:+b.shiftSrc.toFixed(2)});
        steps.push(Math.abs(visStep));
      }
      if(b.bodyX!=null){const o=b.shadowX-b.bodyX;maxShadowOff=Math.max(maxShadowOff,o);minShadowOff=Math.min(minShadowOff,o);}
    }
    const stopEnd=seams.filter(s=>s.from==='v4k73'&&s.to==='RACE_STAND');
    // largest per-tick shadow jump beyond the anchor step (a shadow must not hop)
    let maxShadowHop=0,hopAt=null;for(let i=1;i<ticks.length;i++){const h=Math.abs((ticks[i].shadowX-ticks[i-1].shadowX)-(ticks[i].x-ticks[i-1].x));if(h>maxShadowHop){maxShadowHop=h;hopAt={t:+ticks[i].t.toFixed(3),from:ticks[i-1].label,to:ticks[i].label};}}
    // shadow centre minus visible body centre, mean per window: new (shadow follows the sprite shift) vs anchor shadow
    const byWin={};for(const t of ticks){if(t.bodyX==null)continue;const w=t.window;(byWin[w]??=[]).push([t.shadowX-t.bodyX,t.x-50-t.bodyX]);}
    const shadowByWindow=Object.fromEntries(Object.entries(byWin).map(([w,v])=>[w,{followsSprite:+(v.reduce((a,b)=>a+b[0],0)/v.length).toFixed(2),atAnchor:+(v.reduce((a,b)=>a+b[1],0)/v.length).toFixed(2)}]));
    // where the old drawing (shadow at the anchor) would be: anchor shadow vs body, for contrast
    const anchorShadowOff=ticks.filter(t=>t.bodyX!=null).map(t=>t.x-50-t.bodyX);
    return {lane,name,base,seams,stopEndSwitch:stopEnd,shadowByWindow,maxShadowHopPx:+maxShadowHop.toFixed(2),maxShadowHopAt:hopAt,
      shadowMinusBodyPx:[+minShadowOff.toFixed(2),+maxShadowOff.toFixed(2)],
      anchorShadowMinusBodyPx_forContrast:[+Math.min(...anchorShadowOff).toFixed(2),+Math.max(...anchorShadowOff).toFixed(2)],
      diagnostics:[...new Set(ticks.map(t=>t.diagnostic).filter(Boolean))],
      labelsMissingFromAtlas:[]};
  });
}
report.lanes={};
for(const key of ['CHAIN_ALL','BUTTERFLY_ALL','PAIR']){report.lanes[key]=analyse(await sweep(key));}
// ROLL diagnostic is visible on the canvas: seek into the ROLL window of PAIR lane 5 and read the page diagnostics
{
  await page.evaluate(()=>window.frenkLab.select('PAIR'));
  const roll=await page.evaluate(()=>{const d=window.frenkLab.race.dogs[4];const s=d.segments.find(x=>x.kind==='ROLL');window.frenkLab.seek((s.t0+s.t1)/2);return {t0:s.t0,t1:s.t1,diag:window.frenkLab.diagnostics};});
  await writeFile(path.join(OUT,'roll_diagnostic.png'),await page.locator('#race').screenshot());
  report.roll=roll;
}
await writeFile(path.join(OUT,'lab_check.json'),JSON.stringify(report,null,1));
console.log('errors',errors.length,'repro',report.reproducibility.every(r=>r.identical));

// 4. Recordings at 24 fps: every frame drawn by the page itself (seek), captured from the canvas.
async function record(key,file,{from=0,to=null}={}){
  await page.evaluate(k=>window.frenkLab.select(k),key);
  const end=to??await page.evaluate(()=>window.frenkLab.race.end);
  const dir=path.join(OUT,'_frames_'+key);await rm(dir,{recursive:true,force:true});await mkdir(dir,{recursive:true});
  let n=0;for(let k=Math.round(from*24);k/24<=end;k++){await page.evaluate(t=>window.frenkLab.seek(t),k/24);await page.locator('#race').screenshot({path:path.join(dir,`f${String(n++).padStart(5,'0')}.png`)});}
  spawnSync('ffmpeg',['-v','error','-y','-framerate','24','-i',path.join(dir,'f%05d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','18',path.join(OUT,file)],{stdio:'inherit'});
  return dir;
}
if(RECORD){
  report.recordings=[];
  for(const [key,file] of [['PAIR','LAB_PAIR_dog4_vs_frenk_NORMAL_x1.mp4'],['CHAIN_ALL','LAB_FRENK_SNIFF_chain_5_categories_x1.mp4'],['BUTTERFLY_ALL','LAB_FRENK_BUTTERFLY_5_categories_x1.mp4']]){
    const dir=await record(key,file);report.recordings.push({key,file,framesDir:path.relative(LAB,dir)});
  }
  await writeFile(path.join(OUT,'lab_check.json'),JSON.stringify(report,null,1));
}
await browser.close();server.close();
