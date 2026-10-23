// Pups (Bulldog No.4) selection screen, PURE (no DOM).
//   IDLE loop  f0..f239 (240 frames = 10.0 s) of the approved G1 (idle_g1/, artistic approval 23.10.2026), tone-graded to the approved
//              G0 FRONT_STAND (../idle_loop_v1/make_graded_loop.py), alpha ../idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm (frame f = index f).
//   FRONT_STAND = approved G0 (../front_stand_g0/G0_FRONT_STAND_alpha_1276.png). SELECTED and RETURN_TO_IDLE (G2, G3) will start / end on it.
// Selection at ANY moment, FORWARD ONLY (user, 23.10.2026: no reverse playback): IDLE keeps playing its own frames to the next GATE frame
// (a frame compatible with the stand, results/gates.json), then SELECTED. A click on a gate frame goes to SELECTED on the next frame.
// Until G2/G3 exist the lab shows the FRONT_STAND still in their place, then IDLE resumes at f1 (RETURN will end on G0 ~ f0).
export const N=240;
export const IDLE_LOOP=Array.from({length:N},(_,i)=>i);
export const GATES=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239];
const isGate=new Set(GATES);
export function exitPath(i){const o=[];let k=i%N;while(!isGate.has(k)){k=(k+1)%N;o.push(k);}return o;}   // frames shown after the click frame
export function chain(cyclesBefore,clickIndex,afterCycles=1,standHold=24){
  const t=[];for(let c=0;c<cyclesBefore;c++)IDLE_LOOP.forEach(f=>t.push({clip:'idle',f,phase:`IDLE цикл ${c+1}`}));
  if(clickIndex==null)return t;
  for(let i=0;i<=clickIndex;i++)t.push({clip:'idle',f:i,phase:`IDLE цикл ${cyclesBefore+1}`});
  t[t.length-1].click=true;
  exitPath(clickIndex).forEach(f=>t.push({clip:'idle',f,phase:'IDLE → к стойке (вперёд)'}));
  for(let h=0;h<standHold;h++)t.push({clip:'stand',f:0,phase:'FRONT_STAND G0 — здесь начнётся SELECTED (G2 ещё нет)'});
  for(let c=0;c<afterCycles;c++)IDLE_LOOP.forEach(f=>{if(c===0&&f===0)return;t.push({clip:'idle',f,phase:`IDLE после стойки, цикл ${c+1}`});});
  return t;
}
