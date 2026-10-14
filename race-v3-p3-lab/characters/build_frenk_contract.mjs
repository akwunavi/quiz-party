// Generates frenk.contract.json from facts that already exist in the repo (no assets touched, nothing invented).
// Frame labels use the SAME names as bulldog1-frenk/track_diag/frames_meta.json (v1fN, g3fN, runN, stopN) so tests can look geometry up.
import {writeFileSync} from 'node:fs';
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const loop=R(87,98).map(n=>`run${n}`);
const startLabels=[...[1,7,8,9,10,11,16].map(k=>`v1f${k}`),...R(2,35).map(k=>`g3f${k}`),...R(88,98).map(n=>`run${n}`)];   // idx 0..51 (kit metadata: idx 41 = RUN #88)
const c={
 schema:'character-visual-contract/v1-lab',character:'bulldog1-frenk',fps:24,
 role:'Frenk metadata: ONLY animations that exist. Missing/unapproved ones are marked, never substituted.',
 assetStatus:{
  START:'working: RACE_START gen3 + join f35->RUN#88 (architect: main candidate); visual acceptance NOT passed',
  STOP:'approved: STOP v1 variant A (73 frames), alpha exists',
  STOP_TAIL:'approved: STOP v1 frames 38-73 (same clip)',
  BUTTERFLY:'accepted_working: game cut f1-f93 (3.875 s); retime x1.093 NOT approved',
  SNIFF_PEE:'raw_no_alpha: V3.2 montage EVENT (200 frames) accepted as main montage by architect; NO alpha exists',
  RACE_STAND:'approved: RACE_STAND v3',
  ROLL:'missing: not started',
  RETURN:'merged into SNIFF_PEE EVENT',
  FINISH_DECELERATE:'provisional: reuse of STOP, not approved (FINISH not started)'
 },
 clips:{
  START:{sampler:'table',fps:24,labels:startLabels,loop},
  STOP:{sampler:'table',fps:24,labels:R(1,37).map(i=>`stop${i}`)},
  STOP_TAIL:{sampler:'table',fps:24,labels:R(38,73).map(i=>`stop${i}`)},
  BUTTERFLY:{sampler:'table',fps:24,labels:R(1,93).map(i=>`bf${i}`)},
  SNIFF_PEE:{sampler:'table',fps:24,labels:R(1,200).map(i=>`sniffEv${i}`)},
  RACE_STAND:{sampler:'constant',frame:'RACE_STAND'}
 },
 windows:{
  BASE:{hold:'RACE_STAND'},
  START:{clip:'START',lead:3},
  RUN:{clip:'START',spillFromStart:true},
  STOP:{clip:'STOP',tail:{clip:'STOP_TAIL'}},
  FINISH_DECELERATE:{clip:'STOP',tail:{clip:'STOP_TAIL'},provisional:true},
  BUTTERFLY:{body:'BUTTERFLY',pad:'RACE_STAND'},
  ROLL:{status:'missing'},
  SNIFF_PEE:{body:'SNIFF_PEE',pad:'RACE_STAND'},
  RETURN:{mergeInto:'SNIFF_PEE'}
 },
 keys:{releaseIdx:12,visualJoinFirstRunIdx:41,runFrameAtJoin:88},
 run:{cycle:{firstSrc:87,lastSrc:98,frames:12,periodMustEqual_s:0.5},stopEntry:{previousRunFrame:96}},
 shift:{arraysFile:'../../bulldog1-frenk/race_v3_character_contract_proposal/shift_arrays_lead3.json',mode:'native',stopStatus:'UNDEFINED_NOT_BUILT'},
 limits:{retimeRateBounds:[0.9,1.12],maxPrePushOffsetCanvasPx:1.5,smoothedRollbackCanvasPx:1.0,joinStepCanvasPxAbs:2.7,maxVisualForwardOffsetCanvasPx:39},
 geometry:{framesMeta:'../../bulldog1-frenk/track_diag/frames_meta.json'}
};
writeFileSync(new URL('./frenk.contract.json',import.meta.url),JSON.stringify(c,null,1)+'\n');
console.log('frenk.contract.json written; START labels',startLabels.length);
