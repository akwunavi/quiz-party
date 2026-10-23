// Pups (Bulldog No.4) selection screen, full chain, PURE (no DOM).
//   IDLE loop  f0..f239 (240 = 10.0 s), approved G1, graded to G0, alpha ../idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm (frame f = index f).
//   SELECTED   s0..s120 (121 = 5.04 s), approved G2 v4 (first = tail = G0), graded to G0, alpha ../selected_v4_game/alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm.
// Chain: IDLE (any number of cycles) -> click at ANY moment -> IDLE plays FORWARD to the next gate (results/gates.json, same gates as
// selection_v1, approved 23.10.2026, max wait 3.62 s) -> SELECTED s0..s120 once -> IDLE resumes at REENTRY, forever.
// No RETURN_TO_IDLE (SELECTED ends in G0), no crossfade, no still pause: G0 is only the reference pose, never shown on its own.
export const N=240,S=121;
export const IDLE_LOOP=Array.from({length:N},(_,i)=>i);
export const SELECTED=Array.from({length:S},(_,i)=>i);
export const GATES=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239];
export const REENTRY=1;   // s120 ~ G0 ~ IDLE f0, so IDLE continues with f1 (no duplicated stand frame); measured in results/seams_*.json
const isGate=new Set(GATES);
export function exitPath(i){const o=[];let k=i%N;while(!isGate.has(k)){k=(k+1)%N;o.push(k);}return o;}
export function chain(cyclesBefore,clickIndex,afterCycles=1){
  const t=[];for(let c=0;c<cyclesBefore;c++)IDLE_LOOP.forEach(f=>t.push({clip:'idle',f,phase:`IDLE цикл ${c+1}`}));
  if(clickIndex==null)return t;
  for(let i=0;i<=clickIndex;i++)t.push({clip:'idle',f:i,phase:`IDLE цикл ${cyclesBefore+1}`});
  t[t.length-1].click=true;
  exitPath(clickIndex).forEach(f=>t.push({clip:'idle',f,phase:'IDLE → к стойке (вперёд)'}));
  SELECTED.forEach(s=>t.push({clip:'sel',f:s,phase:'SELECTED'}));
  for(let c=0;c<afterCycles;c++)for(let k=0;k<N;k++){const f=(REENTRY+k)%N;t.push({clip:'idle',f,phase:`IDLE после SELECTED, цикл ${c+1}`});}
  return t;
}
