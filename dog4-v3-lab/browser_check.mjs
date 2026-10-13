import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {RACES} from './model.mjs';
const require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const ROOT=path.dirname(fileURLToPath(import.meta.url));
const mime={'.html':'text/html','.mjs':'text/javascript','.json':'application/json','.png':'image/png'};
const server=createServer(async(req,res)=>{
  try{const name=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';const target=path.resolve(ROOT,name);if(!target.startsWith(ROOT+path.sep))throw 0;res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.end(await readFile(target));}
  catch{res.writeHead(404);res.end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try{
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>window.raceV3?.ready);
  for(const key of Object.keys(RACES)){
    await page.selectOption('#preset',key);
    const before=await page.evaluate(()=>window.raceV3.race.dogs.map(d=>d.crossing));
    await page.selectOption('#speed','4');await page.click('#play');
    await page.waitForFunction(()=>Number(document.querySelector('#scrub').value)===1000&&document.querySelector('#play').textContent.includes('Play'),{timeout:30000});
    const finished=await page.evaluate(()=>window.raceV3.race.dogs.every((_,i)=>window.raceV3.stateAt(i,window.raceV3.race.end).complete));
    assert.ok(finished,`${key}: finish state`);
    await page.click('#reset');
    assert.equal(await page.inputValue('#scrub'),'0');
    const after=await page.evaluate(()=>window.raceV3.race.dogs.map(d=>d.crossing));
    assert.deepEqual(after,before);
    console.log(`${key}: full playback to finish, reset deterministic`);
  }
  await page.fill('#seed','20261013');await page.click('#generate');
  assert.equal(await page.inputValue('#preset'),'RANDOM');
  const seeded=await page.evaluate(()=>window.raceV3.race.dogs.map(d=>d.crossing));
  await page.click('#play');
  await page.waitForFunction(()=>Number(document.querySelector('#scrub').value)===1000&&document.querySelector('#play').textContent.includes('Play'),{timeout:30000});
  await page.click('#reset');assert.equal(await page.inputValue('#scrub'),'0');
  await page.click('#generate');
  assert.deepEqual(await page.evaluate(()=>window.raceV3.race.dogs.map(d=>d.crossing)),seeded);
  console.log('RANDOM 20261013: full playback, reset and regeneration deterministic');
  await page.fill('#seed','20261423');await page.click('#generate');
  const fallback=await page.evaluate(()=>({requested:window.raceV3.race.requestedSeed,effective:window.raceV3.race.effectiveSeed,
    crossings:window.raceV3.race.dogs.map(d=>d.crossing)}));
  assert.equal(fallback.requested,20261423);assert.equal(fallback.effective,20261424);
  await page.click('#reset');await page.click('#generate');
  assert.deepEqual(await page.evaluate(()=>window.raceV3.race.dogs.map(d=>d.crossing)),fallback.crossings);
  console.log('RANDOM 20261423: deterministic fallback to 20261424, reset stable');
  await page.goto(`http://127.0.0.1:${server.address().port}/run_compare.html`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>window.runCompare?.ready);
  const cadence=await page.evaluate(()=>{
    const c=window.runCompare,r=c.run,profiles=[['VERY_SLOW',.75,.9],['NORMAL',1,1],['VERY_FAST',1.25,1.1]];
    return profiles.map(([name,speed,rhythm])=>{
      const beforeA=c.diagnosticState(r-1/24,'A',speed,rhythm),beforeB=c.diagnosticState(r-1/24,'B',speed,rhythm);
      const duringA=c.diagnosticState(r+.5,'A',speed,rhythm),duringB=c.diagnosticState(r+.5,'B',speed,rhythm);
      const hold=c.diagnosticState(r+2,'B',speed,rhythm);
      return {name,beforeA,beforeB,duringA,duringB,hold};
    });
  });
  assert.deepEqual(cadence.map(x=>x.beforeA.frame),[22,22,22]);
  assert.deepEqual(cadence.map(x=>x.beforeB.frame),[14,22,17]);
  for(const x of cadence){assert.equal(x.beforeA.x,x.beforeB.x);assert.equal(x.duringA.x,x.duringB.x);
    assert.equal(x.duringA.phase,'STOP');assert.equal(x.duringB.phase,'STOP');assert.equal(x.hold.phase,'BASE_STAND');}
  console.log('RUN comparison: physical positions match, STOP remains single, phase mismatch measured');
  assert.deepEqual(errors,[]);
  console.log('Chromium page errors: none');
}finally{if(browser)await browser.close();server.close();}
