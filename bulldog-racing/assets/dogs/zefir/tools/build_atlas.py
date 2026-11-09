#!/usr/bin/env python3
"""Atlas for the Bulldog No.2 start lab from the pipeline alpha DOG2_RUN_alpha_src28-100.webm (decoded RGBA, 1276x720):
every frame resized once to the game sprite 207x116 (Lanczos), 24 columns; label r<N> = source RUN frame #N (0-based).
Also the alpha-weighted x centroid (cx) and the paw line (bottom) of each frame in sprite px.
usage: build_atlas.py   (decodes with ffmpeg libvpx-vp9 into a temp dir; writes ../assets/)"""
import os,json,subprocess,tempfile,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));L=os.path.dirname(H);B=os.path.dirname(L)
SRC=os.path.join(B,'race_start_v1/alpha/DOG2_RUN_alpha_src28-100.webm');T=tempfile.mkdtemp();W,Hh,C=207,116,24
subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',SRC,'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
labels=list(range(28,101));sheet=Image.new('RGBA',(W*C,Hh*((len(labels)+C-1)//C)),(0,0,0,0));frames={}
for i,n in enumerate(labels):
    im=Image.open(f'{T}/a{i+1:03d}.png').convert('RGBA')
    full=np.asarray(im)[...,3].astype(float);fcx=float((full.sum(0)*np.arange(full.shape[1])).sum()/full.sum())
    sm=im.resize((W,Hh),Image.LANCZOS);sheet.paste(sm,((i%C)*W,(i//C)*Hh))
    a=np.asarray(sm)[...,3].astype(float);ys=np.nonzero(a>128)[0]
    frames[f'r{n}']={'index':i,'cx':round(float((a.sum(0)*np.arange(W)).sum()/a.sum()),3),'bottom':int(ys.max()),'cxSrc':round(fcx,2)}
sheet.save(os.path.join(L,'assets/dog2_run28-100.png'),optimize=True)
json.dump({'cellWidth':W,'cellHeight':Hh,'columns':C,'sheet':'assets/dog2_run28-100.png','source':'race_start_v1/alpha/DOG2_RUN_alpha_src28-100.webm','frames':frames},open(os.path.join(L,'assets/dog2_atlas.json'),'w'),indent=0)
print('frames',len(frames))
