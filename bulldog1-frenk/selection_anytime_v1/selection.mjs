// Frenk (Bulldog No.1) selection screen, PURE (no DOM). Approved clips are not changed:
//   IDLE loop  f8..f118, f117..f9 (220 frames, ping-pong)   -> selection_alpha_v1/DOG1_IDLE_v1_alpha_f8-f118.webm (frame f = index f-7)
//   SELECTED   f20..f121 (102 frames)                         -> selection_alpha_v1/DOG1_SELECTED_v1_alpha_f20-f121.webm
//   RETURN     r2..r121 (120 frames, graded)                  -> selection_alpha_v1/DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm
// Rule for all five dogs (user, 22.10.2026): a click at ANY moment -> IDLE keeps playing its own frames to a compatible stand -> SELECTED,
// no crossfade, no instant cut. Frenk's only stand compatible with the start of SELECTED is IDLE f8-f13 (mean diff 0.72-0.92/255 to SELECTED
// f4-f9). The IDLE loop is ping-pong, so the exit always runs DOWN the source from the clicked frame k: k-1, k-2 ... GATE (forward clips
// turn back at once, like the loop's own turnarounds).
//   entry A: GATE = f12 -> approved SELECTED f20 (diff 1.17)                       — no new alpha
//   entry B: GATE = f12 -> SELECTED f4 ... f19 (diff 0.82) -> approved f20 ...     — needs alpha of SELECTED f1-f24 (selection_anytime_v1/alpha)
// Measured in the lab (results/REPORT.md): wait to the first SELECTED frame 0-106 frames (max 4.42 s, click at f118). SELECTED moves only
// from f28, so A adds 8 still frames (0.33 s) and B 24 (1.0 s, incl. a blink f11-f14). Recommended: A. Choice is the user's.
// After SELECTED comes RETURN r2..r121 once; r121 takes the place of IDLE f8 (loop index 0), so IDLE resumes at loop index 1 (f9), forever.
const R=(a,b)=>{const o=[];if(b>=a)for(let k=a;k<=b;k++)o.push(k);else for(let k=a;k>=b;k--)o.push(k);return o;};
export const IDLE_LOOP=[...R(8,118),...R(117,9)];                 // 220 frames = 9.17 s
export const GATE=12;
export const ENTRY={A:{sel:R(20,121)},B:{sel:[...R(4,19).map(f=>({clip:'selEarly',f})),...R(20,121).map(f=>({clip:'sel',f}))]}};
export const RETURN=R(2,121);
export function exitPath(loopIndex){const k=IDLE_LOOP[loopIndex%IDLE_LOOP.length];return k>GATE?R(k-1,GATE):k<GATE?R(k+1,GATE):[];}
const selFrames=v=>v==='A'?ENTRY.A.sel.map(f=>({clip:'sel',f})):ENTRY.B.sel;
export function chain(variant,cyclesBefore,clickIndex,cyclesAfter){
  const t=[];for(let c=0;c<cyclesBefore;c++)IDLE_LOOP.forEach((f,i)=>t.push({clip:'idle',f,phase:`IDLE цикл ${c+1}`,i}));
  if(clickIndex==null)return t;
  for(let i=0;i<=clickIndex;i++)t.push({clip:'idle',f:IDLE_LOOP[i],phase:`IDLE цикл ${cyclesBefore+1}`,i});
  t[t.length-1].click=true;
  exitPath(clickIndex).forEach(f=>t.push({clip:'idle',f,phase:'IDLE → к стойке f12'}));
  selFrames(variant).forEach(s=>t.push({...s,phase:`SELECTED (вход ${variant})`}));
  RETURN.forEach(f=>t.push({clip:'ret',f,phase:'RETURN_TO_IDLE'}));
  for(let c=0;c<cyclesAfter;c++)IDLE_LOOP.forEach((f,i)=>{if(c===0&&i===0)return;t.push({clip:'idle',f,phase:`IDLE после возврата, цикл ${c+1}`,i});});
  return t;
}
export {selFrames};
