#!/usr/bin/env python3
"""Analyses the frame-exact browser render (browser_check.mjs): for every frame, alpha is recovered from the white and the black
cell (a = 1 - (white - black)/255), then: dog present, centroid, paw line (bottom), height, mean body brightness and sharpness
(Laplacian variance) of the opaque body. Reports per-step changes and the values at each clip switch versus ordinary steps.
usage: analyse_frames.py OUTDIR (with frames/ and timeline.json) -> OUTDIR/frames_analysis.json"""
import sys,json,os,numpy as np
from PIL import Image
D=sys.argv[1];tl=json.load(open(f'{D}/timeline.json'));fl=sorted(os.listdir(f'{D}/frames'))
W,H,T=638,360,40
rows=[]
for k,f in enumerate(fl):
    im=np.asarray(Image.open(f'{D}/frames/{f}').convert('RGB'),dtype=float)
    wh=im[T:T+H,0:W];bk=im[T:T+H,W:2*W]
    a=np.clip(1-(wh-bk).mean(2)/255,0,1)
    m=a>0.5;ys,xs=np.nonzero(m);body=a>0.95
    g=bk.mean(2);lap=np.abs(g[1:-1,1:-1]*4-g[:-2,1:-1]-g[2:,1:-1]-g[1:-1,:-2]-g[1:-1,2:])
    rows.append({'k':k,'clip':tl[k][0],'i':tl[k][1],'present':bool(m.sum()>1000),'cx':float(xs.mean()),'cy':float(ys.mean()),'bottom':float(np.percentile(ys,99.5)),'top':float(np.percentile(ys,0.5)),
      'area':int(m.sum()),'bright':float(bk[body].mean()),'sharp':float(lap[body[1:-1,1:-1]].var()),'cornerAlpha':float(max(a[:6,:6].max(),a[:6,-6:].max(),a[-6:,:6].max(),a[-6:,-6:].max()))})
steps=[]
for r0,r1 in zip(rows,rows[1:]):
    steps.append({'k':r1['k'],'from':f"{r0['clip']}#{r0['i']}",'to':f"{r1['clip']}#{r1['i']}",'switch':r0['clip']!=r1['clip'] or (r1['i']!=(r0['i']+1)%({'idle':220,'sel':102,'ret':120}[r0['clip']])),
      **{f'd_{q}':round(r1[q]-r0[q],3) for q in ['cx','cy','bottom','top','area','bright','sharp']}})
ordinary=[s for s in steps if not s['switch']]
def pct(q,p): return round(float(np.percentile([abs(s[q]) for s in ordinary],p)),3)
summary={'frames':len(rows),'allPresent':all(r['present'] for r in rows),'cornerAlphaMax':round(max(r['cornerAlpha'] for r in rows),4),
 'ordinarySteps_p50_p99_max':{q:[pct(q,50),pct(q,99),pct(q,100)] for q in ['d_cx','d_cy','d_bottom','d_top','d_bright','d_sharp']},
 'switches':[s for s in steps if s['switch']]}
json.dump({'summary':summary,'rows':rows,'steps':steps},open(f'{D}/frames_analysis.json','w'))
print(json.dumps(summary,ensure_ascii=False,indent=1))
