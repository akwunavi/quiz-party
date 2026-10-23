#!/usr/bin/env python3
"""Pups IDLE loop v1: graded frames f0..f239 of the approved G1 (idle_g1/DOG4_IDLE_G1_kling_original.mp4, unchanged).
Grade = per-frame, per-channel offset so that the static studio background (x 30-300 and 1000-1246, y 30-690, never crossed by
the dog) matches the approved G0 FRONT_STAND studio frame; added to the whole frame, rounded. Motion and frames untouched.
usage: make_graded_loop.py OUTDIR  -> g000.png..g239.png + offsets.json"""
import sys,os,subprocess,tempfile,json,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));B=os.path.dirname(H);out=sys.argv[1];os.makedirs(out,exist_ok=True);t=tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-y','-i',f'{B}/idle_g1/DOG4_IDLE_G1_kling_original.mp4',f'{t}/f%03d.png'],check=True)
L=lambda p:np.asarray(Image.open(p).convert('RGB'),dtype=float)
G=L(f'{B}/front_stand_g0/G0_FRONT_STAND_studio_1276.png');R=np.zeros(G.shape[:2],bool);R[30:690,30:300]=True;R[30:690,1000:1246]=True
off=[]
for n in range(240):
    f=L(f'{t}/f{n+1:03d}.png');o=(G-f)[R].mean(0);off.append(o.round(3).tolist())
    Image.fromarray(np.clip(f+o,0,255).round().astype(np.uint8)).save(f'{out}/g{n:03d}.png')
json.dump({'frames':'f0..f239 of G1','offsets_rgb':off},open(f'{out}/offsets.json','w'))
print('offset mean',np.mean(off,0).round(2),'min',np.min(off,0).round(2),'max',np.max(off,0).round(2))
