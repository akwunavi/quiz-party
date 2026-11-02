// Checks runtime/dog4_selection.mjs against the approved lab logic ../../selection_v2/selection.mjs for a pick on every IDLE frame:
// same frames, same order, wait = forward path to the gate, SELECTED 121 frames once, IDLE again from f1. usage: node tools/check_selection_logic.mjs OUT.json
import {writeFileSync,readFileSync} from 'node:fs';
import {createSelection,waitFrames} from '../runtime/dog4_selection.mjs';
import * as lab from '../../selection_v2/selection.mjs';
const man=JSON.parse(readFileSync(new URL('../../MANIFEST.json',import.meta.url)));
const gates=man.selection.policy.gates;
const res={gatesEqualLab:JSON.stringify(gates)===JSON.stringify(lab.GATES),picks:240,mismatches:[],maxWait:{frames:0,at:null},meanWaitS:0,doublePickIgnored:true,pickDuringSelectedIgnored:true};
let sum=0;
for(let i=0;i<240;i++){
  const want=lab.chain(0,i,1).map(s=>[s.clip==='sel'?'SELECTED':'IDLE',s.f]);   // click frame i, exit path, SELECTED, one IDLE cycle from f1
  const m=createSelection(gates,0);const got=[];
  for(let k=0;k<=i;k++)got.push(m.next());
  m.pick();if(m.pick())res.doublePickIgnored=false;
  while(got.length<want.length){const c=m.next();got.push(c);if(c.clip==='SELECTED'&&c.frame===60&&m.pick())res.pickDuringSelectedIgnored=false;}
  const g=got.map(c=>[c.clip,c.frame]);
  if(JSON.stringify(g)!==JSON.stringify(want))res.mismatches.push(i);
  const w=waitFrames(gates,i);if(w!==lab.exitPath(i).length)res.mismatches.push('wait'+i);
  sum+=w;if(w>res.maxWait.frames)res.maxWait={frames:w,at:i,s:+(w/24).toFixed(3)};
}
res.meanWaitS=+(sum/240/24).toFixed(3);
res.ok=res.gatesEqualLab&&!res.mismatches.length&&res.maxWait.frames===87&&res.doublePickIgnored&&res.pickDuringSelectedIgnored;
writeFileSync(process.argv[2],JSON.stringify(res,null,1));console.log(JSON.stringify(res));
