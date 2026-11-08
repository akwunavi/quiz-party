#!/usr/bin/env python3
"""Luna RUN G1: find honest 12-frame loops (12 CONSECUTIVE original frames, no holds, no in-betweens) in the alpha of the new Kling clip and check
seam, leg motion, body stability, paw contact, dust (alpha outside the dog's main body), and the frames that could serve as a START from the same
clip. Composite on gray, frame 319x180 for diffs. usage (alpha pipeline venv, needs scipy): run_g1_analysis.py RGBA_DIR(r%04d.png) OUT.json"""
import sys,json
import numpy as np
from PIL import Image
from scipy import ndimage
D,OUT=sys.argv[1:3];N=121
sm={};geo={}
for i in range(N):
    im=Image.open(f'{D}/r{i:04d}.png').convert('RGBA');a=np.asarray(im)
    sm[i]=np.asarray(Image.alpha_composite(Image.new('RGBA',im.size,(128,128,128,255)),im).convert('RGB').resize((319,180))).astype(np.int16)
    al=a[...,3].astype(float);m=al>128;ys,xs=np.nonzero(m);lab,n=ndimage.label(a[...,3]>40);sizes=ndimage.sum(np.ones_like(lab),lab,range(1,n+1)) if n else []
    t=al[200:520]
    geo[i]=dict(cx=float((al.sum(0)*np.arange(al.shape[1])).sum()/al.sum()),cyT=float((t.sum(1)*np.arange(200,520)).sum()/max(t.sum(),1)),bottom=int(ys.max()),top=int(ys.min()),
                h=int(ys.max()-ys.min()+1),w=int(xs.max()-xs.min()+1),extraIslandsPx=int(sum(sorted(sizes)[:-1])) if n>1 else 0,semiPx=int(((a[...,3]>10)&(a[...,3]<200)).sum()))
d=lambda x,y:float(np.abs(sm[x]-sm[y]).mean())
leg=lambda x,y:float(np.abs(sm[x][120:176]-sm[y][120:176]).mean())          # paw band ~ y 480-700 of the full frame
steps={i:d(i,i-1) for i in range(1,N)}
run=[i for i in range(30,N)];med=float(np.median([steps[i] for i in run]));p90=float(np.percentile([steps[i] for i in run],90))
per={P:min((d(a,a+P),a) for a in range(30,N-P)) for P in range(8,17)}
loops=[]
for a in range(30,N-12):
    fr=list(range(a,a+12));seam=d(a+11,a);ls=[leg(fr[k],fr[(k+1)%12]) for k in range(12)]
    loops.append(dict(start=a,frames=[a,a+11],seamStep=round(seam,2),ratioToMedianStep=round(seam/med,2),loopBack=round(d(a,a+12),2),
      legMin=round(min(ls),2),legMedian=round(float(np.median(ls)),2),cxRange=round(max(geo[i]['cx'] for i in fr)-min(geo[i]['cx'] for i in fr),1),
      cyRange=round(max(geo[i]['cyT'] for i in fr)-min(geo[i]['cyT'] for i in fr),1),seamCx=round(geo[a]['cx']-geo[a+11]['cx'],1),
      bottom=[min(geo[i]['bottom'] for i in fr),max(geo[i]['bottom'] for i in fr)],dustPxMax=max(geo[i]['extraIslandsPx'] for i in fr),semiPxMean=int(np.mean([geo[i]['semiPx'] for i in fr]))))
best=sorted(loops,key=lambda x:x['loopBack'])[:8]
start=dict(stillUntil=max(i for i in range(1,40) if steps[i]<1.5),phaseMatches={k:round(d(k,best[0]['start']),2) for k in range(24,best[0]['start']+1) if (best[0]['start']-k)%12==0})
res=dict(stepMedianRun=round(med,2),stepP90Run=round(p90,2),periods={P:{'bestDiff':round(v[0],2),'start':v[1]} for P,v in per.items()},bestLoops=best,startFromSameClip=start,
         geometry={i:{k:(round(v,1) if isinstance(v,float) else v) for k,v in g.items()} for i,g in geo.items()})
json.dump(res,open(OUT,'w'),indent=1)
print('step median',round(med,2),'p90',round(p90,2));print({P:v for P,v in res['periods'].items()})
for b in best: print(b)
print(start)
