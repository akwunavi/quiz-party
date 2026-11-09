#!/usr/bin/env python3
"""Atlas of the STOP B Kling frames for the Bulldog No.2 stop lab, from the pipeline alpha (decoded RGBA 1276x720):
stop_b_alpha/DOG2_STOP_v2_alpha_k27-k40.webm -> labels s27..s40, DOG2_STOP_v1_alpha_k66-k73.webm -> labels t66..t73.
Each frame resized once to the game sprite 207x116 (Lanczos), 24 columns; alpha-weighted x centroid (cx) and paw line (bottom)
in sprite px — same method as lab_start_v1/tools/build_atlas.py. usage: build_stop_atlas.py"""
import os,json,subprocess,tempfile,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));L=os.path.dirname(H);B=os.path.dirname(L);W,Hh,C=207,116,24
parts=[('stop_b_alpha/DOG2_STOP_v2_alpha_k27-k40.webm','s',range(27,41)),('stop_b_alpha/DOG2_STOP_v1_alpha_k66-k73.webm','t',range(66,74))]
labels=[];imgs=[]
for src,p,rng in parts:
    T=tempfile.mkdtemp();subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',os.path.join(B,src),'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
    for i,n in enumerate(rng):labels.append(f'{p}{n}');imgs.append(Image.open(f'{T}/a{i+1:03d}.png').convert('RGBA'))
sheet=Image.new('RGBA',(W*C,Hh*((len(labels)+C-1)//C)),(0,0,0,0));frames={}
for i,(lab,im) in enumerate(zip(labels,imgs)):
    full=np.asarray(im)[...,3].astype(float);fcx=float((full.sum(0)*np.arange(full.shape[1])).sum()/full.sum())
    sm=im.resize((W,Hh),Image.LANCZOS);sheet.paste(sm,((i%C)*W,(i//C)*Hh))
    a=np.asarray(sm)[...,3].astype(float);ys=np.nonzero(a>128)[0]
    frames[lab]={'index':i,'cx':round(float((a.sum(0)*np.arange(W)).sum()/a.sum()),3),'bottom':int(ys.max()),'cxSrc':round(fcx,2)}
sheet.save(os.path.join(L,'assets/dog2_stopB.png'),optimize=True)
json.dump({'cellWidth':W,'cellHeight':Hh,'columns':C,'sheet':'assets/dog2_stopB.png','source':[s for s,_,_ in parts],'frames':frames},open(os.path.join(L,'assets/dog2_stopB_atlas.json'),'w'),indent=0)
print('frames',len(frames))
