// Isolated Dog 4 V3 diagnostic; no production race code is imported.
export const FPS=24;
const BASE_SPEED=1/42; // normalized course / second; RUN animation remains 24 fps.
const STOP=37/24, BUTTERFLY=121/24, ROLL=145/24;
const SNIFF=48/24+82/48+20/24+55/32+24/24;
const RETURN=16/48+68/40+8/24+17/48, START=1;
const RUN_JOIN=23/24, LOOP=12/24, EPS=1e-9;
export const SPEED_BANDS=[0,.25,.50,.75,Infinity];
export const PRESETS={
  A:{name:'ALL THREE EVENTS',dogs:[
    {name:'CLEAN · MEDIUM',base:1.00,variations:[1,.98,1.02,1],events:[]},
    {name:'BUTTERFLY 30% · QUICK',base:1.10,variations:[1.02,1,1.01,.99],events:[['BUTTERFLY',.30]]},
    {name:'SNIFF 40% · FAST',base:1.23,variations:[1,1.02,.99,1.01],events:[['SNIFF_PEE',.40]]},
    {name:'ROLL 35% · FAST',base:1.23,variations:[1.01,.98,1.02,1],events:[['ROLL',.35]]},
    {name:'BUTTERFLY 25% → ROLL 65% · MEDIUM',base:1.00,variations:[1,.99,1,1.01],events:[['BUTTERFLY',.25],['ROLL',.65]]},
  ]},
  B:{name:'COMBINATIONS',dogs:[
    {name:'CLEAN · MEDIUM',base:1.00,variations:[1,.98,1.02,1],events:[]},
    {name:'ROLL 25% → BUTTERFLY 70% · FAST',base:1.23,variations:[1.01,1,.99,1.02],events:[['ROLL',.25],['BUTTERFLY',.70]]},
    {name:'SNIFF 25% → ROLL 65% · FAST',base:1.23,variations:[1,1.02,.99,1.01],events:[['SNIFF_PEE',.25],['ROLL',.65]]},
    {name:'BUTTERFLY 20% → SNIFF 60% · QUICK',base:1.10,variations:[1.02,1,1.01,.99],events:[['BUTTERFLY',.20],['SNIFF_PEE',.60]]},
    {name:'ROLL 25% → SNIFF 50% → BUTTERFLY 75% · FAST',base:1.20,variations:[1.01,.98,1.02,1],events:[['ROLL',.25],['SNIFF_PEE',.50],['BUTTERFLY',.75]]},
  ]},
  C:{name:'REPETITION / STRESS',dogs:[
    {name:'CLEAN · MEDIUM',base:1.00,variations:[1,.98,1.02,1],events:[]},
    {name:'ROLL 25% + 65% · FAST',base:1.23,variations:[1.01,.99,1,1],events:[['ROLL',.25],['ROLL',.65]]},
    {name:'BUTTERFLY 25% + 65% · MEDIUM',base:1.00,variations:[1,.99,1.02,.99],events:[['BUTTERFLY',.25],['BUTTERFLY',.65]]},
    {name:'SNIFF 25% + 65% · FAST',base:1.23,variations:[1,1.02,.99,1.01],events:[['SNIFF_PEE',.25],['SNIFF_PEE',.65]]},
    {name:'ROLL 20% → BUTTERFLY 45% → ROLL 75% · QUICK',base:1.10,variations:[1,.99,1,1.01],events:[['ROLL',.20],['BUTTERFLY',.45],['ROLL',.75]]},
  ]},
};
export const SHORT_EVENTS={
  LOOK_AROUND_SHORT:{enabled:false,sequence:['RUN','STOP','LOOK_AROUND_SHORT','START','RUN'],reason:'No approved looking-around motion; STOP+START alone already lasts 2.54 s, beyond the 0.8–1.2 s action.'},
  HESITATION_SHORT:{enabled:false,sequence:['RUN','HESITATION_SHORT','START','RUN'],reason:'No approved partial-stop-to-START pose bridge; using STOP would exceed 0.4–0.8 s and a partial cut would jump.'},
};
const smooth=u=>u*u*(3-2*u);
const smoothIntegral=u=>u*u*u-.5*u*u*u*u;
const brakingIntegral=u=>u-u*u*u+.5*u*u*u*u;
const band=p=>Math.max(0,Math.min(3,Math.floor((Math.max(0,p)+EPS)*4)));
const speedAt=(dog,p,base=dog.base)=>BASE_SPEED*base*dog.variations[band(p)];
function advance(dog,p,dt,base=dog.base){
  let left=dt;
  while(left>EPS){
    const b=band(p),v=speedAt(dog,p,base),boundary=SPEED_BANDS[b+1];
    const toBoundary=(boundary-p)/v;
    if(left<toBoundary-EPS){p+=v*left;break;}
    p=boundary;left-=toBoundary;
    if(b===3){p+=v*left;break;}
  }
  return p;
}
function travelTime(dog,p,target,base=dog.base){
  let sum=0;
  while(p<target-EPS){
    const b=band(p),next=Math.min(target,SPEED_BANDS[b+1]);
    sum+=(next-p)/speedAt(dog,p,base);p=next;
  }
  return sum;
}
function add(segments,kind,duration,p0,p1,eventIndex=-1,extra={}){
  const t0=segments.length?segments.at(-1).t1:0;
  const s={kind,t0,t1:t0+duration,p0,p1,eventIndex,...extra};segments.push(s);return s;
}
function alignedStopTime(runStart,nominal){
  const first=runStart+RUN_JOIN;
  return first+Math.max(0,Math.round((nominal-first)/LOOP))*LOOP;
}
function nextStopTime(runStart,crossing){
  const first=runStart+RUN_JOIN;
  return first+Math.max(0,Math.ceil((crossing-first-EPS)/LOOP))*LOOP;
}
export function buildDog(preset,index){
  const config=PRESETS[preset].dogs[index];
  const dog={index,preset,...config,segments:[],eventsActual:[]};
  let p=0,base=dog.base;
  add(dog.segments,'BASE',.5,p,p);
  add(dog.segments,'START',START,p,p+speedAt(dog,p,base)*START/2,-1,{initial:true,base});
  p=dog.segments.at(-1).p1;
  let runStart=dog.segments.at(-1).t1;
  for(const [kind,desired] of dog.events){
    if(!['BUTTERFLY','SNIFF_PEE','ROLL'].includes(kind))throw new Error(`No approved clip/pose bridge for ${kind}`);
    const eventIndex=dog.eventsActual.length;
    // A full START, RUN join and STOP cannot reach smaller targets. Perform
    // these early actions from BASE, and expose actual=0 in diagnostics.
    const early=eventIndex===0&&desired<=speedAt(dog,0,base)*(START/2+RUN_JOIN+STOP/2);
    if(early){
      // The dog has not left BASE: perform the action before its first START.
      dog.segments.pop();p=0;runStart=dog.segments.at(-1).t1;
    }else{
      const target=Math.max(p,desired-speedAt(dog,desired,base)*STOP/2);
      const stopTime=alignedStopTime(runStart,runStart+travelTime(dog,p,target,base));
      const before=advance(dog,p,stopTime-runStart,base);
      if(stopTime<=runStart+EPS || before+speedAt(dog,before,base)*STOP/2>=1)
        throw new Error(`Event ${preset}/${index+1}/${eventIndex+1} cannot fit`);
      add(dog.segments,'RUN',stopTime-runStart,p,before,-1,{base});p=before;
      add(dog.segments,'STOP',STOP,p,p+speedAt(dog,p,base)*STOP/2,eventIndex,{base});
      p=dog.segments.at(-1).p1;
    }
    const action=add(dog.segments,kind,{BUTTERFLY,SNIFF_PEE:SNIFF,ROLL}[kind],p,p,eventIndex);
    if(kind==='SNIFF_PEE')add(dog.segments,'RETURN',RETURN,p,p,eventIndex);
    const beforeBase=base;base=dog.afterBases?.[eventIndex]??base;
    add(dog.segments,'START',START,p,p+speedAt(dog,p,base)*START/2,eventIndex,{base,initial:early});
    p=dog.segments.at(-1).p1;
    dog.eventsActual.push({kind,desired,actual:action.p0,stopStart:early?null:dog.segments.find(s=>s.kind==='STOP'&&s.eventIndex===eventIndex).t0,actionStart:action.t0,actionEnd:action.t1,beforeBase,afterBase:base,early});
    runStart=dog.segments.at(-1).t1;
  }
  const crossingSegment=dog.segments.find(s=>s.p0<1-EPS&&s.p1>=1-EPS);
  if(crossingSegment){
    let lo=crossingSegment.t0,hi=crossingSegment.t1;
    for(let i=0;i<48;i++){
      const mid=(lo+hi)/2,u=(mid-crossingSegment.t0)/(crossingSegment.t1-crossingSegment.t0);
      const progress=crossingSegment.kind==='START'
        ?crossingSegment.p0+(crossingSegment.p1-crossingSegment.p0)*2*smoothIntegral(u)
        :crossingSegment.kind==='STOP'
          ?crossingSegment.p0+(crossingSegment.p1-crossingSegment.p0)*2*brakingIntegral(u)
          :advance(dog,crossingSegment.p0,mid-crossingSegment.t0,crossingSegment.base??dog.base);
      if(progress>=1)hi=mid;else lo=mid;
    }
    dog.crossing=hi;
  }else dog.crossing=runStart+travelTime(dog,p,1,base);
  const stopTime=nextStopTime(runStart,dog.crossing);
  const afterRun=advance(dog,p,stopTime-runStart,base);
  add(dog.segments,'RUN',stopTime-runStart,p,afterRun,-1,{crossing:dog.crossing,base});p=afterRun;
  add(dog.segments,'FINISH_DECELERATE',STOP,p,p+speedAt(dog,p,base)*STOP/2,-1,{base});
  p=dog.segments.at(-1).p1;
  add(dog.segments,'BASE',1.5,p,p);
  dog.complete=dog.segments.at(-1).t0;
  dog.end=dog.segments.at(-1).t1;
  return dog;
}
export const RACES=Object.fromEntries(Object.keys(PRESETS).map(key=>{
  const dogs=PRESETS[key].dogs.map((_,i)=>buildDog(key,i));
  const places=[...dogs].sort((a,b)=>a.crossing-b.crossing||a.index-b.index).map(d=>d.index);
  return [key,{dogs,places,end:Math.max(...dogs.map(d=>d.end))}];
}));
function variableFrame(seconds,bands,count){
  let t=Math.max(0,seconds),index=0;
  for(const [number,fps] of bands){
    const duration=number/fps;
    if(t<duration-EPS)return Math.min(count-1,index+Math.floor(t*fps+EPS));
    t-=duration;index+=number;
  }
  return count-1;
}
export function frameFor(segment,time){
  const t=Math.max(0,time-segment.t0);
  switch(segment.kind){
    case 'BASE':return ['BASE',0];
    case 'START':return ['START',variableFrame(t,[[24,72],[16,24]],40)];
    case 'RUN':return ['RUN',t<11/24?Math.min(10,Math.floor(t*24)):11+Math.floor((t-11/24)*24+EPS)%12];
    case 'STOP':case 'FINISH_DECELERATE':return ['STOP',Math.min(36,Math.floor(t*24))];
    case 'BUTTERFLY':return ['BUTTERFLY',Math.min(120,Math.floor(t*24))];
    case 'ROLL':return ['ROLL',Math.min(144,Math.floor(t*24))];
    case 'SNIFF_PEE':return ['SNIFF_PEE',variableFrame(t,[[48,24],[82,48],[20,24],[55,32],[24,24]],229)];
    case 'RETURN':return ['RETURN',variableFrame(t,[[16,48],[68,40],[8,24],[17,48]],109)];
    default:throw new Error(segment.kind);
  }
}
export function stateAt(dog,time){
  const t=Math.max(0,Math.min(time,dog.end));
  const segments=dog.segments;
  let lo=0,hi=segments.length;
  while(lo<hi){const mid=(lo+hi)>>1;if(segments[mid].t1<=t+EPS)lo=mid+1;else hi=mid;}
  const s=segments[Math.min(lo,segments.length-1)];
  const u=Math.max(0,Math.min(1,(t-s.t0)/(s.t1-s.t0)));
  let p=s.p0,speed=0;
  if(s.kind==='RUN'){p=advance(dog,s.p0,t-s.t0,s.base);speed=speedAt(dog,p,s.base);}
  else if(s.kind==='START'){p=s.p0+(s.p1-s.p0)*2*smoothIntegral(u);speed=speedAt(dog,s.p0,s.base)*smooth(u);}
  else if(s.kind==='STOP'||s.kind==='FINISH_DECELERATE'){
    p=s.p0+(s.p1-s.p0)*2*brakingIntegral(u);speed=speedAt(dog,s.p0,s.base)*(1-smooth(u));
  }
  const [clip,frame]=frameFor(s,t);
  return {segment:s.kind,progress:p,speed,clip,frame,eventIndex:s.eventIndex,
    finished:t+EPS>=dog.crossing,complete:t+EPS>=dog.complete};
}
