#!/usr/bin/env python3
"""Luna RUN: four loop variants from the existing alpha v2 cycle #13-#22 (= vs2 source #53-#62), no new generation:
  N10  native 10 frames (as filmed; NOT compatible with Race V3 LOOP = 12/24, shown as the reference)
  H12  12 frames, the two calmest phases (#13, #17) held one extra tick
  I12  12 frames, evenly retimed 10 -> 12: positions k*10/12, 10 of 12 frames are optical-flow in-betweens
  M12  12 frames = 10 originals + 2 optical-flow in-betweens (midpoints #13|#14 and #17|#18)
  C12  (copied by hand, not built here) 12 consecutive originals #47-#58 — the best 'honest' 12-frame cut; its seam steps one phase back
In-betweens: DIS optical flow both ways on the frames composited over gray, backward warp of premultiplied RGBA from both neighbours, linear blend.
usage: build_loops.py ALPHA_DIR(a%03d.png) OUTDIR  (needs opencv: run with the alpha pipeline venv)"""
import sys,os,json
import numpy as np,cv2
A,O=sys.argv[1:3]
CYC=list(range(13,23))
fr={i:cv2.imread(f'{A}/a{i:03d}.png',cv2.IMREAD_UNCHANGED).astype(np.float32) for i in CYC}   # BGRA
def gray(f):
    a=f[...,3:]/255.;c=f[...,:3]*a+128*(1-a);return cv2.cvtColor(c.astype(np.uint8),cv2.COLOR_BGR2GRAY)
dis=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_ULTRAFAST+2) if False else cv2.DISOpticalFlow_create(2)
H,W=720,1276;gx,gy=np.meshgrid(np.arange(W,dtype=np.float32),np.arange(H,dtype=np.float32))
flows={}
def flow(i,j):
    if (i,j) not in flows: flows[(i,j)]=dis.calc(gray(fr[i]),gray(fr[j]),None)
    return flows[(i,j)]
def pm(f): g=f.copy();g[...,:3]*=f[...,3:]/255.;return g
def inbetween(i,j,t):
    Fij,Fji=flow(i,j),flow(j,i)
    wi=cv2.remap(pm(fr[i]),gx-t*Fij[...,0],gy-t*Fij[...,1],cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
    wj=cv2.remap(pm(fr[j]),gx-(1-t)*Fji[...,0],gy-(1-t)*Fji[...,1],cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
    p=(1-t)*wi+t*wj;a=np.clip(p[...,3:],0,255);out=p.copy();out[...,:3]=np.where(a>0.5,p[...,:3]/np.maximum(a,1e-3)*255.,0);out[...,3:]=a
    return np.clip(out,0,255)
V={'N10':[('orig',i) for i in CYC],
   'H12':[('orig',i) for k in CYC for _ in range(2 if k in (13,17) else 1) for i in [k]],
   'I12':[],'M12':[]}
for k in range(12):
    u=k*10/12;i=int(u);t=u-i
    V['I12'].append(('orig',CYC[i]) if t<1e-6 else ('flow',CYC[i],CYC[(i+1)%10],round(t,4)))
for k in CYC:
    V['M12'].append(('orig',k))
    if k in (13,17): V['M12'].append(('flow',k,k+1,0.5))
meta={}
for name,seq in V.items():
    d=f'{O}/{name}';os.makedirs(d,exist_ok=True);meta[name]=[]
    for n,s in enumerate(seq):
        img=fr[s[1]] if s[0]=='orig' else inbetween(s[1],s[2],s[3])
        cv2.imwrite(f'{d}/{n:02d}.png',img.round().astype(np.uint8));meta[name].append(s)
json.dump(meta,open(f'{O}/loops.json','w'),indent=1);print({k:len(v) for k,v in meta.items()})
