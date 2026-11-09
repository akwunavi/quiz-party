#!/usr/bin/env python3
"""Atlas of the approved BUTTERFLY v2 for the Bulldog No.2 BUTTERFLY lab, from the pipeline alpha butterfly_v2/alpha/DOG2_BUTTERFLY_v2_alpha_b1-b121.webm
(decoded RGBA 1276x720): labels o1..o121 = Kling frame b1..b121; each frame resized once to 207x116 (Lanczos), 24 columns;
alpha-weighted x centroid (cx) and paw line (bottom) in sprite px — same method as lab_start_v1/tools/build_atlas.py.
The game clip is b<FIRST>..b<LAST> (inclusive). usage: build_roll_atlas.py FIRST LAST"""
import os,sys,json,subprocess,tempfile,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));L=os.path.dirname(H);B=os.path.dirname(L);W,Hh,C=207,116,24
first,last=int(sys.argv[1]),int(sys.argv[2])
SRC='butterfly_v2/alpha/DOG2_BUTTERFLY_v2_alpha_b1-b121.webm';T=tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',os.path.join(B,SRC),'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
n=len(os.listdir(T));sheet=Image.new('RGBA',(W*C,Hh*((n+C-1)//C)),(0,0,0,0));frames={}
for i in range(n):
    im=Image.open(f'{T}/a{i+1:03d}.png').convert('RGBA');sm=im.resize((W,Hh),Image.LANCZOS);sheet.paste(sm,((i%C)*W,(i//C)*Hh))
    a=np.asarray(sm)[...,3].astype(float);ys=np.nonzero(a>128)[0]
    frames[f'o{i+1}']={'index':i,'cx':round(float((a.sum(0)*np.arange(W)).sum()/a.sum()),3),'bottom':int(ys.max())}
sheet.save(os.path.join(L,'assets/dog2_butterfly_v2.png'),optimize=True)
json.dump({'cellWidth':W,'cellHeight':Hh,'columns':C,'sheet':'assets/dog2_butterfly_v2.png','source':SRC,'clip':[f'o{k}' for k in range(first,last+1)],'frames':frames},open(os.path.join(L,'assets/dog2_butterfly_atlas.json'),'w'),indent=0)
print('frames',n,'clip',first,last,last-first+1)
