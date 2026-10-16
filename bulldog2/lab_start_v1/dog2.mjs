// Bulldog No.2 start lab: RACE_STAND (RUN #30) -> RACE_START (B: #30-#71 -> #96, reserve A: #30-#87 -> #88) -> RUN loop #88-#99.
// Physics is NOT touched: the unmodified V3 segments of a dog (dog4-v3-lab/model.mjs) give the world position; this module only
// chooses the frame and a VISUAL sprite shift (sprite px). Stand: shift = cxRunMean - cx(#30) so the standing body sits where the
// running body sits on average. START (mode 'surge', default): the in-frame body surge of the gallop (cx - cxRunMean) is cancelled
// at the start and released smoothly by the join: shift_k = -(cx_k - cxRunMean) * (1 - smoothstep(k/N)); at k = 0 this equals the
// stand shift, at the join it is 0, so the body follows the physical acceleration instead of lunging and sliding back.
// Mode 'linear' (first try, kept for comparison): shift fades from the stand shift to 0, the surge is not cancelled. RUN: 0.
export const VARIANTS={
  B:{name:'B: #30–#71 → #96',clip:Array.from({length:42},(_,k)=>30+k),joinTo:96},
  A:{name:'A: #30–#87 → #88',clip:Array.from({length:58},(_,k)=>30+k),joinTo:88}};
const LOOP=Array.from({length:12},(_,k)=>88+k),FPS=24;
export async function loadDog2(base){
  const atlas=await fetch(new URL('assets/dog2_atlas.json',base)).then(r=>r.json());
  const sheet=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=new URL(atlas.sheet,base).href;});
  const fr=atlas.frames,cxRun=LOOP.reduce((a,n)=>a+fr['r'+n].cx,0)/12,shiftStand=cxRun-fr.r30.cx;
  // shadow reference: own centroid smoothed over 5 frames along each sequence; loop -> loop mean; stand -> #30
  const smooth=new Map();for(const v of Object.values(VARIANTS)){const seq=v.clip;seq.forEach((n,i)=>{const w=seq.slice(Math.max(0,i-2),i+3);smooth.set(v.name+n,w.reduce((a,m)=>a+fr['r'+m].cx,0)/w.length);});}
  return {atlas,sheet,cxRun,shiftStand,smooth};
}
const smoothstep=u=>{u=Math.min(1,Math.max(0,u));return u*u*(3-2*u);};
// -> {label, shift (sprite px), phase, idx}
export function dog2Visual(D,dog,t,variant='B',lead=0,mode='surge'){
  const V=VARIANTS[variant],st=dog.segments.find(s=>s.kind==='START'),start=st.t0-lead/FPS;
  if(t<start)return {n:30,shift:D.shiftStand,phase:'RACE_STAND',idx:null,ref:D.atlas.frames.r30.cx};
  const k=Math.floor((t-start)*FPS+1e-9),N=V.clip.length;
  if(k<N){const n=V.clip[k],w=1-smoothstep(k/N),cx=D.atlas.frames['r'+n].cx;
    const shift=mode==='linear'?D.shiftStand*w:-(cx-D.cxRun)*w;
    // shadow: under the body; with the surge cancelled it follows the same compensated path
    const ref=mode==="linear"?D.smooth.get(V.name+n):cx+(D.smooth.get(V.name+n)-cx)*(1-w);
    return {n,shift,phase:t<st.t1?'RACE_START':'RACE_START (spill)',idx:k,ref};}
  const n=LOOP[((V.joinTo-88)+(k-N))%12];return {n,shift:0,phase:'RUN',idx:k,ref:D.cxRun};
}
export function drawDog2(ctx,D,layout,v,x,lane){
  const {cellWidth:w,cellHeight:h,columns:c}=D.atlas,f=D.atlas.frames['r'+v.n],left=x-layout.spriteAnchorX+v.shift;
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(left+v.ref,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  ctx.drawImage(D.sheet,(f.index%c)*w,Math.floor(f.index/c)*h,w,h,left,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
  return {bodyX:left+f.cx,shadowX:left+v.ref,left};
}
