#!/usr/bin/env python3
"""Sprite-scale (207x116) size and stability of the RUN loops: Frenk, Zefir, Pups (approved) and Luna loops — mean height / length / area of the
silhouette, lowest point range (paw contact), alpha-weighted body centre ranges over one loop. usage: size_compare.py LOOPS_DIR REPO OUT.json"""
import sys,io,os,json,subprocess
import numpy as np
from PIL import Image
D,R,OUT=sys.argv[1:4]
def git(p): return Image.open(io.BytesIO(subprocess.run(['git','-C',R,'show','HEAD:'+p],capture_output=True,check=True).stdout)).convert('RGBA')
def cells(sheet,idx,cw=207,ch=116,cols=24): return [sheet.crop(((i%cols)*cw,(i//cols)*ch,(i%cols+1)*cw,(i//cols+1)*ch)).resize((207,116),Image.LANCZOS) for i in idx]
def luna(v): n=len([f for f in os.listdir(f'{D}/{v}') if f.endswith('.png')]);return [Image.open(f'{D}/{v}/{k:02d}.png').convert('RGBA').resize((207,116),Image.LANCZOS) for k in range(n)]
sets={'Frenk':cells(Image.open(f'{R}/bulldog1-frenk/integration_v1/atlas/frenk_run.png').convert('RGBA'),range(12)),'Zefir':cells(git('bulldog2/lab_start_v1/assets/dog2_run28-100.png'),range(60,72)),
      'Pups':cells(Image.open(f'{R}/dog4-v3-lab/assets/run.png').convert('RGBA'),range(11,23),178,100),'Luna_L60':luna('L60'),'Luna_L99':luna('L99'),'Luna_old_vs2_N10':luna('N10')}
res={}
for k,v in sets.items():
    h=[];w=[];b=[];ar=[];cx=[];cy=[]
    for c in v:
        a=np.asarray(c)[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m);h.append(ys.max()-ys.min()+1);w.append(xs.max()-xs.min()+1);b.append(ys.max());ar.append(m.sum())
        cx.append((a.sum(0)*np.arange(207)).sum()/a.sum());cy.append((a.sum(1)*np.arange(116)).sum()/a.sum())
    res[k]=dict(height=round(float(np.mean(h)),1),length=round(float(np.mean(w)),1),area=int(np.mean(ar)),lowest=[int(min(b)),int(max(b))],centreXrange=round(max(cx)-min(cx),1),centreYrange=round(max(cy)-min(cy),1))
json.dump(res,open(OUT,'w'),indent=1)
for k,v in res.items(): print(k,v)
