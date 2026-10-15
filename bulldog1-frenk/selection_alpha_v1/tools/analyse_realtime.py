#!/usr/bin/env python3
"""Summary of the real-time browser run (realtime.json from browser_check.mjs): segments (clip / IDLE cycle), presented frames vs
expected, missing frame indices, frame interval statistics and the hold at every switch. usage: analyse_realtime.py OUTDIR"""
import sys,json,numpy as np
D=sys.argv[1];L=json.load(open(f'{D}/realtime.json'))['log'];N={'idle':220,'sel':102,'ret':120}
segs=[];cur=None
for e in L:
    idx=int(round(e['media']*24))
    if cur is None or e['clip']!=cur['clip'] or (e['clip']=='idle' and idx+5<cur['idx'][-1]):
        cur={'clip':e['clip'],'idx':[],'wall':[]};segs.append(cur)
    cur['idx'].append(idx);cur['wall'].append(e['wall'])
out=[]
for i,s in enumerate(segs):
    lo=s['idx'][0];hi=s['idx'][-1];   # a segment ends where the player switched (IDLE is left right after its wrap to f8)
    exp=set(range(lo,hi+1));miss=sorted(exp-set(s['idx']))
    dw=np.diff(s['wall']) if len(s['wall'])>1 else np.array([0.0])
    out.append({'seg':i+1,'clip':s['clip'],'firstIndex':lo,'lastIndex':s['idx'][-1],'presented':len(set(s['idx'])),'expected':len(exp),'missing':miss,
      'meanFrameMs':round(float(dw.mean()),1),'p95FrameMs':round(float(np.percentile(dw,95)),1),'maxFrameMs':round(float(dw.max()),1),
      'holdBeforeThisSegMs':None if i==0 else round(s['wall'][0]-segs[i-1]['wall'][-1],1)})
tot_exp=sum(o['expected'] for o in out);tot_miss=sum(len(o['missing']) for o in out)
res={'segments':out,'framesExpected':tot_exp,'framesMissing':tot_miss,'idleCyclesAfterReturn':sum(1 for o in out[3:] if o['clip']=='idle' and o['lastIndex']==219)}
json.dump(res,open(f'{D}/realtime_summary.json','w'),ensure_ascii=False,indent=1)
for o in out: print({k:(v if k!='missing' else f'{len(v)}: {v[:8]}') for k,v in o.items()})
print('missing',tot_miss,'of',tot_exp)
