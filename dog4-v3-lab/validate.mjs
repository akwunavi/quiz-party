import assert from 'node:assert/strict';
import {PRESETS,RACES,SHORT_EVENTS,stateAt,frameFor} from './model.mjs';
const out={};
for(const [key,race] of Object.entries(RACES)){
  assert.equal(race.dogs.length,5);
  const crossings=[];
  for(const dog of race.dogs){
    const segments=dog.segments;
    assert.equal(segments[0].kind,'BASE');
    assert.equal(segments[1].kind,'START');
    assert.equal(segments.at(-1).kind,'BASE');
    assert.equal(segments.filter(s=>s.kind==='START').length,dog.events.length+1);
    assert.equal(segments.filter(s=>s.kind==='STOP').length,dog.events.length);
    assert.equal(segments.filter(s=>s.kind==='FINISH_DECELERATE').length,1);
    for(const [eventIndex,[kind]] of dog.events.entries()){
      const start=segments.findIndex(s=>s.kind===kind&&s.eventIndex===eventIndex);
      assert.ok(start>0,`${key}/${dog.index+1}: missing ${kind}`);
      assert.equal(segments[start-1].kind,'STOP');
      assert.deepEqual(segments.slice(start,start+(kind==='SNIFF_PEE'?3:2)).map(s=>s.kind),
        kind==='SNIFF_PEE'?[kind,'RETURN','START']:[kind,'START']);
      if(kind==='ROLL'){
        assert.ok(Math.abs(segments[start].t1-segments[start].t0-145/24)<1e-8);
        assert.deepEqual(frameFor(segments[start],segments[start].t1-1/24),['ROLL',144]);
      }
    }
    for(let i=1;i<segments.length;i++){
      assert.ok(Math.abs(segments[i].t0-segments[i-1].t1)<1e-8);
      assert.ok(Math.abs(segments[i].p0-segments[i-1].p1)<1e-8);
    }
    for(const s of segments){
      assert.ok(s.t1>s.t0);
      if(['BASE','BUTTERFLY','SNIFF_PEE','RETURN','ROLL'].includes(s.kind))assert.equal(s.p0,s.p1);
      if(s.kind==='RUN'&&s.t0>=1.5-1e-8){
        const [clip,frame]=frameFor(s,s.t1-1/24);
        assert.equal(clip,'RUN');assert.equal(frame,22);
      }
    }
    let previous=0;
    for(let time=0;time<=race.end;time+=1/24){
      const state=stateAt(dog,time);
      assert.ok(state.progress>=previous-1e-8,`${key}/${dog.index}: backwards progress at ${time}`);
      previous=state.progress;
      if(['BUTTERFLY','SNIFF_PEE','RETURN','ROLL','BASE'].includes(state.segment))assert.equal(state.speed,0);
    }
    assert.ok(Math.abs(stateAt(dog,dog.crossing).progress-1)<1e-7);
    assert.ok(stateAt(dog,race.end).complete);
    crossings.push({lane:dog.index+1,name:dog.name,base:dog.base,variations:dog.variations,
      requestedEvents:dog.events,actualEvents:dog.eventsActual,crossing:dog.crossing,
      complete:dog.complete,finishExtra:dog.complete-dog.crossing});
  }
  assert.deepEqual([...crossings].sort((a,b)=>a.crossing-b.crossing).map(x=>x.lane-1),race.places);
  out[key]={end:race.end,places:race.places.map(x=>x+1),dogs:crossings};
}
assert.equal(SHORT_EVENTS.LOOK_AROUND_SHORT.enabled,false);
assert.equal(SHORT_EVENTS.HESITATION_SHORT.enabled,false);
console.log(JSON.stringify(out,null,2));
