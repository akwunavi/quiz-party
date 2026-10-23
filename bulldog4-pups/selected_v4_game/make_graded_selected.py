#!/usr/bin/env python3
"""Pups SELECTED (approved G2 v4) graded frames s0..s120 for the game: per-frame, per-channel offset so the static studio background
(x 30-300 and 1000-1246, y 30-690; the dog stays within x 406-875 the whole clip) matches the approved G0 FRONT_STAND studio frame;
added to the whole frame, rounded. Same method as ../idle_loop_v1/make_graded_loop.py. Motion, order and frames untouched.
usage: make_graded_selected.py OUTDIR  -> s000.png..s120.png + offsets.json"""
import sys,os,subprocess,tempfile,json,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));B=os.path.dirname(H);out=sys.argv[1];os.makedirs(out,exist_ok=True);t=tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-y','-i',f'{B}/selected_g2v4/DOG4_SELECTED_G2v4_kling_original.mp4',f'{t}/f%03d.png'],check=True)
L=lambda p:np.asarray(Image.open(p).convert('RGB'),dtype=float)
G=L(f'{B}/front_stand_g0/G0_FRONT_STAND_studio_1276.png');R=np.zeros(G.shape[:2],bool);R[30:690,30:300]=True;R[30:690,1000:1246]=True
off=[]
for n in range(121):
    f=L(f'{t}/f{n+1:03d}.png');o=(G-f)[R].mean(0);off.append(o.round(3).tolist())
    Image.fromarray(np.clip(f+o,0,255).round().astype(np.uint8)).save(f'{out}/s{n:03d}.png')
json.dump({'frames':'s0..s120 of SELECTED G2 v4','offsets_rgb':off},open(f'{out}/offsets.json','w'))
print('offset mean',np.mean(off,0).round(2),'min',np.min(off,0).round(2),'max',np.max(off,0).round(2))
