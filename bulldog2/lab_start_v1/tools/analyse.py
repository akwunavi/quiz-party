#!/usr/bin/env python3
"""Analyses lab_check.mjs measurements: per Bulldog No.2 lane - visible body step at every frame vs the physical anchor step,
the stand->start seam, the join to the loop, rollback (body moving back while the anchor moves forward), body lead over the
anchor, shadow hops, and the physical speed fraction while the legs already gallop. usage: analyse.py OUT PRESET"""
import sys,json,numpy as np
D,K=sys.argv[1],sys.argv[2];m=json.load(open(f'{D}/{K}/measure.json'));rows=m['rows'];out=[]
for li,name in enumerate(m['lanes']):
    L=[r['lanes'][li] for r in rows]
    if L[0]['char']!='dog2':continue
    t=np.array([r['t'] for r in rows]);x=np.array([l['x'] for l in L]);bx=np.array([l['bodyX'] for l in L]);sx=np.array([l['shadowX'] for l in L]);sp=np.array([l['speed'] for l in L])
    db=np.diff(bx);dx=np.diff(x);ds=np.diff(sx)
    n=[l['n'] for l in L];idx=[l['idx'] for l in L];ph=[l['phase'] for l in L]
    k0=next(i for i,l in enumerate(L) if l['idx']==0);N=42 if L[0]['variant']=='B' else 58;kj=next(i for i,l in enumerate(L) if l['idx']==N)
    run=[i for i in range(1,len(L)) if L[i]['phase']=='RUN' and L[i-1]['phase']=='RUN']
    runsteps=np.array([db[i-1]-dx[i-1] for i in run])
    seam=lambda i:{'t':round(t[i],3),'from':f"#{n[i-1]}",'to':f"#{n[i]}",'bodyStepPx':round(db[i-1],2),'anchorStepPx':round(dx[i-1],2),'shadowStepPx':round(ds[i-1],2)}
    fullstride=next(i for i in range(len(L)) if L[i]['n']>=36 and L[i]['idx'] is not None)
    out.append({'lane':li+1,'name':name,'standToStart':seam(k0) if k0>0 else None,'join':seam(kj),
      'firstStepsAfterStart':[seam(i) for i in range(k0,k0+8)],
      'rollbackFrames':[seam(i+1) for i in range(len(db)) if db[i]<-0.5 and dx[i]>0.05 and L[i+1]['phase']!='RUN'],
      'runLoopBodyMinusAnchorStep_p95':round(float(np.percentile(np.abs(runsteps),95)),2),
      'maxBodyLeadOverAnchorPx_start':round(float(max(bx[i]-x[i] for i in range(len(L)) if L[i]['phase']!='RUN')-(bx[k0-1]-x[k0-1])),2),
      'maxShadowHopPx':round(float(np.max(np.abs(ds-dx))),2),
      'physSpeedFractionWhenFullStride':{'t':round(t[fullstride],3),'sinceStart_s':round(t[fullstride]-t[k0],3),'fraction':round(float(sp[fullstride]/sp[-1]),3)},
      'physSpeedFraction_at':{f'+{d}s':round(float(sp[min(len(sp)-1,k0+int(d*24))]/sp[-1]),3) for d in [0.25,0.5,0.75,1.0]},
      'paw_bottom_stand_vs_run':[L[k0-1]['bottom'],sorted(set(l['bottom'] for l in L if l['phase']=='RUN'))]})
json.dump(out,open(f'{D}/{K}/analysis.json','w'),ensure_ascii=False,indent=1)
for o in out: print(json.dumps({k:o[k] for k in ['name','standToStart','join','maxBodyLeadOverAnchorPx_start','maxShadowHopPx','physSpeedFractionWhenFullStride']},ensure_ascii=False)); print('  rollback',len(o['rollbackFrames']),o['rollbackFrames'][:3])
