// Bulldog No.2 (Zefir) selection-screen logic, PURE (no DOM): the approved IDLE loop MAIN_L1 and the IDLE -> SELECTED exit path.
// Frames are SOURCE frame numbers (1-based) of assets/sources/bulldog_2_idle.mp4 ("i") and bulldog_2_selected.mp4 ("s").
// Why an exit path: no MAIN_L1 frame matches the start of SELECTED (head/ears/eyes differ by 3.7-12/255 vs 0.2 of a standing dog);
// only FRONT_STAND does (IDLE f1-f4 = SELECTED f1-f4, 0.19-0.44). So after a click IDLE keeps playing ITS OWN frames to f4 and
// SELECTED starts at s4 (s4..s121; the candidate's own range f20..f121 is contained, s4..s19 is its standing lead-in).
//  * clicked at source frame k <= 62 (opening look / calm stand / start of the head turn): play IDLE BACKWARDS k-1 ... f4;
//  * k >= 63 (head turn, calm, paw lift, squint): play FORWARDS to f109 (the paw lift is never cut or reversed), the loop seam
//    f109 -> f15, then backwards f14 ... f4.
// The crossover 62/63 minimises the wait (max 58 frames = 2.42 s). No crossfade, no retime, no skipped frames.
const R=(a,b)=>{const o=[];if(b>=a)for(let k=a;k<=b;k++)o.push(k);else for(let k=a;k>=b;k--)o.push(k);return o;};
export const IDLE_LOOP=[...R(15,58),...R(57,40),...R(41,109)];          // MAIN_L1, 131 frames = 5.46 s, then repeats (f109 -> f15)
export const SEL_ENTRY=4, SEL_FIRST=4, SEL_LAST=121, GESTURE=[84,109], CROSSOVER=62;
export function exitPath(loopIndex){                                      // IDLE frames shown AFTER the clicked frame, before SELECTED
  const k=IDLE_LOOP[loopIndex%IDLE_LOOP.length];
  if(k<=CROSSOVER)return R(k-1,SEL_ENTRY);
  return [...(k<109?R(k+1,109):[]),...R(15,SEL_ENTRY)];
}
export const SELECTED=R(SEL_FIRST,SEL_LAST);                             // 118 frames
// whole timeline: `cycles` full loops, then the click at loopIndex of the next loop, the exit path, SELECTED.
export function timeline(cycles,clickIndex){
  const t=[];for(let c=0;c<cycles;c++)IDLE_LOOP.forEach((k,i)=>t.push({clip:'idle',f:k,phase:`IDLE цикл ${c+1}`,i}));
  if(clickIndex==null)return t;
  for(let i=0;i<=clickIndex;i++)t.push({clip:'idle',f:IDLE_LOOP[i],phase:`IDLE цикл ${cycles+1}`,i});
  t[t.length-1].click=true;
  exitPath(clickIndex).forEach(k=>t.push({clip:'idle',f:k,phase:'IDLE → к FRONT_STAND'}));
  SELECTED.forEach(k=>t.push({clip:'sel',f:k,phase:'SELECTED'}));
  return t;
}

// RETURN_TO_IDLE v1 (accepted source, montage r2-r28, r33-r71, r75-r117 with tone correction): 109 frames of
// return_to_idle_v1/alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm ("r" = montage index 1..109). Played ONCE after SELECTED s121;
// it ends in FRONT_STAND, so IDLE continues with its own source frames f5..f14 and then the accepted loop from f15 (index 0), forever.
export const RETURN_N=109, RETURN=R(1,RETURN_N), REENTRY=R(5,14);
export function chain(cyclesBefore,clickIndex,cyclesAfter){                // full selection-screen sequence
  const t=timeline(cyclesBefore,clickIndex);
  RETURN.forEach(m=>t.push({clip:'ret',f:m,phase:'RETURN_TO_IDLE'}));
  REENTRY.forEach(k=>t.push({clip:'idle',f:k,phase:'IDLE (вход в цикл f5–f14)'}));
  for(let c=0;c<cyclesAfter;c++)IDLE_LOOP.forEach((k,i)=>t.push({clip:'idle',f:k,phase:`IDLE после возврата, цикл ${c+1}`,i}));
  return t;
}
