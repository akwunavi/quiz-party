// Pups (dog4) selection screen: frame logic for the game engine. Pure, no DOM, no timers: the engine calls next() once per 1/24 s tick.
// IDLE G1 loops f0..f239. A pick on any IDLE frame lets IDLE play on FORWARD with its own frames up to the nearest gate (stand = G0),
// then SELECTED v4 s0..s120 plays once in full, then IDLE resumes at f1 (s120 ~ G0 ~ f0, f0 is not shown twice). No RETURN_TO_IDLE,
// no crossfade, no still pause. Same rule as ../../selection_v2/selection.mjs (approved lab); gates are passed in from MANIFEST.json.
export const IDLE_FRAMES=240,SELECTED_FRAMES=121,REENTRY=1;
export function createSelection(gates,startFrame=0){
  const isGate=new Set(gates);
  let mode='IDLE',f=startFrame%IDLE_FRAMES,picked=false,first=true;
  // current frame to draw: {clip:'IDLE'|'SELECTED', frame}
  const current=()=>({clip:mode==='SELECTED'?'SELECTED':'IDLE',frame:f,mode});
  function next(){
    if(first){first=false;return current();}
    if(mode==='IDLE'){f=(f+1)%IDLE_FRAMES;if(picked&&isGate.has(f)){/* this gate frame is shown; SELECTED starts on the next tick */mode='WAIT_DONE';}}
    else if(mode==='WAIT_DONE'||mode==='PICK_ON_GATE'){mode='SELECTED';f=0;picked=false;}
    else if(mode==='SELECTED'){if(f<SELECTED_FRAMES-1)f++;else{mode='IDLE';f=REENTRY;}}
    return current();
  }
  // pick(): call when the player confirms; ignored while SELECTED plays or a pick is pending
  function pick(){
    if(mode!=='IDLE'||picked)return false;
    picked=true;if(isGate.has(f))mode='PICK_ON_GATE';
    return true;
  }
  const busy=()=>mode!=='IDLE'||picked;
  return {next,pick,busy,current};
}
// frames of IDLE still shown after a pick on IDLE frame i before SELECTED s0 (0 on a gate)
export function waitFrames(gates,i){const g=new Set(gates);let k=i%IDLE_FRAMES,n=0;while(!g.has(k)){k=(k+1)%IDLE_FRAMES;n++;}return n;}
