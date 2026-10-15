#!/usr/bin/env python3
"""Remove floor-shadow ribbons that the matting kept between the paws (cool blue-grey, flat, on the floor line).
Only pixels that are ALL of: within 40 px of the lowest opaque point, bluish (B-R >= 3, the fur and paws are warm) as the seed, grown into connected near-neutral pixels (R-B <= 6),
in a connected component >= 100 px whose width >= 2 x height. Alpha of those pixels -> 0 (2 px feather). Everything else
keeps the original RGBA bytes. Frames without such a component are copied unchanged. Re-encoded with the pipeline's VP9 settings.
usage: fix_floor_ribbon.py IN.webm OUT.webm WORKDIR REPORT.json"""
import sys,os,json,subprocess,numpy as np
from PIL import Image
from scipy import ndimage as ndi
IN,OUT,W,REP=sys.argv[1:5]; os.makedirs(f'{W}/in',exist_ok=True); os.makedirs(f'{W}/out',exist_ok=True)
subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',IN,'-pix_fmt','rgba',f'{W}/in/f%04d.png'],check=True)
fs=sorted(os.listdir(f'{W}/in')); rep=[]
for f in fs:
    a=np.asarray(Image.open(f'{W}/in/{f}')).copy(); al=a[...,3].astype(float); fl=np.nonzero(al>64)[0].max()
    band=np.zeros(al.shape,bool); band[fl-40:fl+3]=True
    cool=band&(al>16)&((a[...,2].astype(int)-a[...,0])>=3)
    l,n=ndi.label(ndi.binary_closing(cool,iterations=2)); kill=np.zeros_like(cool)
    for i in range(1,n+1):
        ys,xs=np.nonzero(l==i)
        if len(xs)>=100 and (xs.max()-xs.min()+1)>=2*(ys.max()-ys.min()+1): kill|=(l==i)
    if kill.any():                                   # grow into the connected neutral/bluish rest of the shadow (not warm fur/paws)
        cand=band&(al>8)&((a[...,0].astype(int)-a[...,2])<=6)
        kill=ndi.binary_propagation(kill,mask=cand|kill)
        k=ndi.binary_dilation(kill,iterations=1); soft=ndi.gaussian_filter(k.astype(float),1.0)
        a[...,3]=np.clip(al*(1-np.clip(soft*1.5,0,1)),0,255).astype(np.uint8); rep.append({'frame':int(f[1:5]),'removedPx':int(k.sum())})
    Image.fromarray(a,'RGBA').save(f'{W}/out/{f}')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{W}/out/f%04d.png','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-crf','14','-b:v','0','-auto-alt-ref','0','-row-mt','1','-cpu-used','1','-deadline','good','-metadata:s:v:0','alpha_mode=1',OUT],check=True)
json.dump({'input':os.path.basename(IN),'output':os.path.basename(OUT),'framesChanged':rep,'framesTotal':len(fs)},open(REP,'w'),indent=1); print(rep)
