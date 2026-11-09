// Bulldog No.2 STOP lab: visual layer for a whole race with the approved clips
//   RACE_STAND = RUN #30, RACE_START = B (#30–#71 → #96, 'surge' compensation as in lab_start_v1), RUN loop #88–#99,
//   STOP = approved STOP B (stop_montage_v2, 37 frames, assets/stopB_montage_list.json).
// Physics is NOT touched: segments/positions come from the unmodified dog4-v3-lab/model.mjs; this module only picks the frame
// and a VISUAL sprite shift (sprite px). STOP: frames keep the montage's own src-px shifts (×207/1276); in addition the end of
// STOP is eased (frames 23–37, smoothstep) onto the RACE_STAND shift (cxRunMean − cx(#30)), so STOP → RACE_STAND has no jump.
// Shadow: RUN uses the loop mean, STOP eases from it onto the frame's own (5-frame smoothed) centroid by frame 9, stand = #30.
const LOOP=Array.from({length:12},(_,k)=>88+k),FPS=24,S=207/1276,START_B=Array.from({length:42},(_,k)=>30+k),JOIN=96;
const smoothstep=u=>{u=Math.min(1,Math.max(0,u));return u*u*(3-2*u);};
const img=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});
export async function loadDog2Stop(base){
  const runBase=new URL('../lab_start_v1/',base),run=await fetch(new URL('assets/dog2_atlas.json',runBase)).then(r=>r.json());
  const stop=await fetch(new URL('assets/dog2_stopB_atlas.json',base)).then(r=>r.json());
  const list=await fetch(new URL('assets/stopB_montage_list.json',base)).then(r=>r.json());
  const [runSheet,stopSheet]=await Promise.all([img(new URL(run.sheet,runBase).href),img(new URL(stop.sheet,base).href)]);
  const fr=run.frames,cxRun=LOOP.reduce((a,n)=>a+fr['r'+n].cx,0)/12,shiftStand=cxRun-fr.r30.cx;
  // montage label -> atlas frame
  const STOP=list.map((e,i)=>{let m;
    if(m=e.label.match(/^RUN#(\d+)$/))return {i,label:e.label,atlas:'run',key:'r'+m[1],src:e.shift_src_px};
    if(m=e.label.match(/^v2 k(\d+)$/))return {i,label:e.label,atlas:'stop',key:'s'+m[1],src:e.shift_src_px};
    if(m=e.label.match(/^v1 k(\d+)$/))return {i,label:e.label,atlas:'stop',key:'t'+m[1],src:e.shift_src_px};
    if(/RACE_STAND/.test(e.label))return {i,label:e.label,atlas:'run',key:'r30',src:44};   // #30 placed at +44 src px (stop_prep)
    throw new Error('unknown montage label '+e.label);});
  if(STOP.length!==37)throw new Error('STOP B must be 37 frames');
  const A={run,stop},cxOf=s=>A[s.atlas].frames[s.key].cx;
  STOP.forEach(s=>{s.cx=cxOf(s);s.shift0=s.src*S;});
  const endCorr=shiftStand-STOP[36].shift0;   // ≈ +1.1 sprite px: montage stand (+44 src) vs RACE_STAND shift
  STOP.forEach((s,i)=>{s.shift=s.shift0+endCorr*smoothstep((i-22)/14);});
  STOP.forEach((s,i)=>{const w=STOP.slice(Math.max(0,i-2),i+3);const sm=w.reduce((a,q)=>a+q.cx+q.shift,0)/w.length-s.shift;const u=smoothstep(i/8);s.ref=cxRun*(1-u)+sm*u;});
  STOP[36].ref=fr.r30.cx;
  return {run,stop,runSheet,stopSheet,cxRun,shiftStand,STOP,endCorr};
}
function segAt(dog,t){let i=dog.segments.findIndex(s=>t<s.t1-1e-9);if(i<0)i=dog.segments.length-1;return i;}
// -> {atlas,key,shift,ref,phase,label,idx}
export function dog2StopVisual(D,dog,t){
  const segs=dog.segments,si=segAt(dog,t),s=segs[si],stand=ph=>({atlas:'run',key:'r30',shift:D.shiftStand,ref:D.run.frames.r30.cx,phase:ph,label:'RACE_STAND #30',idx:null});
  if(s.kind==='STOP'||s.kind==='FINISH_DECELERATE'){const i=Math.min(36,Math.floor((t-s.t0)*FPS+1e-9)),f=D.STOP[i];
    return {atlas:f.atlas,key:f.key,shift:f.shift,ref:f.ref,phase:s.kind==='STOP'?'STOP B':'STOP B (финиш)',label:f.label,idx:i};}
  let st=null;for(let j=si;j>=0;j--){if(segs[j].kind==='START'){st=segs[j];break;}if(['STOP','FINISH_DECELERATE','BASE','BUTTERFLY','ROLL','SNIFF_PEE','RETURN'].includes(segs[j].kind)&&j!==si)break;}
  if(s.kind!=='START'&&s.kind!=='RUN')return stand(s.kind==='BASE'?'RACE_STAND':`RACE_STAND (окно ${s.kind}: клипа №2 нет)`);
  const k=Math.floor((t-st.t0)*FPS+1e-9),N=START_B.length;
  if(k<N){const n=START_B[k],w=1-smoothstep(k/N),cx=D.run.frames['r'+n].cx;
    return {atlas:'run',key:'r'+n,shift:-(cx-D.cxRun)*w,ref:cx,phase:s.kind==='START'?'RACE_START B':'RACE_START B (spill)',label:'#'+n,idx:k};}
  const n=LOOP[((JOIN-88)+(k-N))%12];return {atlas:'run',key:'r'+n,shift:0,ref:D.cxRun,phase:'RUN',label:'#'+n,idx:k};
}
export function drawDog2Stop(ctx,D,layout,v,x,lane){
  const A=D[v.atlas],sheet=v.atlas==='run'?D.runSheet:D.stopSheet,{cellWidth:w,cellHeight:h,columns:c}=A,f=A.frames[v.key],left=x-layout.spriteAnchorX+v.shift;
  ctx.fillStyle='rgba(28,45,35,.37)';ctx.beginPath();ctx.ellipse(left+v.ref,lane+2,59,5,0,0,Math.PI*2);ctx.fill();
  ctx.drawImage(sheet,(f.index%c)*w,Math.floor(f.index/c)*h,w,h,left,lane-layout.spriteTopOffset,layout.spriteWidth,layout.spriteHeight);
  return {bodyX:left+f.cx,shadowX:left+v.ref,left,bottom:lane-layout.spriteTopOffset+f.bottom};
}
