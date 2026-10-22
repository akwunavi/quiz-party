#!/usr/bin/env python3
"""Approved SNIFF_PEE v1 (Kling 4.0, 1284x724, AAC audio) -> game geometry 1276x720 WITHOUT changing the dog's proportions: one uniform
scale s = 0.99375 on both axes plus a +0.25 px vertical offset (bicubic), fitted by least difference of k1/k7/k187/k193 to RACE_STAND #30
(the frames that are #30 by construction). Audio is dropped; output is lossless RGB H.264 (libx264rgb, crf 0) for the alpha pipeline.
usage: normalise.py FRAMES_DIR(f%03d.png from the original) OUT_DIR OUT_MP4"""
import sys,os,subprocess
from PIL import Image
S,DX,DY=0.99375,0.0,0.25
src,out,mp4=sys.argv[1:4];os.makedirs(out,exist_ok=True)
n=len([f for f in os.listdir(src) if f.endswith('.png')])
for i in range(1,n+1):
    im=Image.open(f'{src}/f{i:03d}.png').convert('RGB')
    im.transform((1276,720),Image.AFFINE,(1/S,0,-DX/S,0,1/S,-DY/S),resample=Image.BICUBIC).save(f'{out}/n{i:03d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{out}/n%03d.png','-an','-c:v','libx264rgb','-crf','0','-preset','veryslow',mp4],check=True)
print('frames',n)
