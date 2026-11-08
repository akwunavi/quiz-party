#!/usr/bin/env python3
"""Luna STOP G1 on alpha: join RUN #71 -> STOP f0, stride-cut seam (S2: drop #8-#18), geometry (centre, paw line, height) along the clip vs
RACE_STAND (RUN G1 f0 alpha) and the RUN loop, and where the stand is reached. usage: tools_stop_check.py STOP_RGBA RUN_RGBA OUT.json"""
import sys,json
import numpy as np
from PIL import Image
SD,RD,OUT=sys.argv[1:4]
def ld(d,i): return Image.open(f'{d}/r{i:04d}.png').convert('RGBA')
def sm(im): return np.asarray(Image.alpha_composite(Image.new('RGBA',im.size,(128,128,128,255)),im).convert('RGB').resize((319,180))).astype(np.int16)
def geo(im):
    a=np.asarray(im)[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m)
    return dict(cx=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),1),paw=int(ys.max()),h=int(ys.max()-ys.min()+1),w=int(xs.max()-xs.min()+1))
d=lambda a,b:round(float(np.abs(sm(a)-sm(b)).mean()),2)
st=[ld(SD,i) for i in range(73)];rs=ld(RD,0)
res={'RUN71_to_STOP0':d(ld(RD,71),st[0]),'RUN71_to_RUN72':d(ld(RD,71),ld(RD,72)),'STOP0_vs_RUN72':d(st[0],ld(RD,72)),
     'S2_cut_seam_f7_to_f19':d(st[7],st[19]),'S2_ordinary_f7_to_f8':d(st[7],st[8]),
     'toRaceStand':{i:d(st[i],rs) for i in range(40,73,4)},'raceStand':geo(rs),'geometry':{i:geo(st[i]) for i in range(0,73,4)},
     'steps':[d(st[i],st[i-1]) for i in range(1,73)]}
json.dump(res,open(OUT,'w'),indent=1)
print({k:v for k,v in res.items() if k not in ('geometry','steps')});print('geometry',res['geometry'])
