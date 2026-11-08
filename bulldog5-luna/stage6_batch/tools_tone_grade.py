#!/usr/bin/env python3
"""Tone grade of an alpha clip to a reference studio frame (same method as Pups/IDLE): per frame, per channel offset that makes the static
studio background of the Kling ORIGINAL (x 30-300 and 1000-1240, y 30-640; watermark excluded) match the reference frame's background; the
offset is added to the RGB of the alpha frames (alpha untouched). Writes graded RGBA frames + offsets.json; motion and frames unchanged.
usage: tools_tone_grade.py ORIGINAL.mp4 RGBA_DIR REFERENCE.png OUT_DIR"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image
SRC,RD,REF,O=sys.argv[1:5];os.makedirs(O,exist_ok=True)
M=np.zeros((720,1276),bool);M[30:640,30:300]=True;M[30:640,1000:1240]=True
g=np.asarray(Image.open(REF).convert('RGB')).astype(np.float32)[M].mean(0)
p=subprocess.Popen(['ffmpeg','-v','error','-i',SRC,'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE);off=[];i=0
while True:
    b=p.stdout.read(720*1276*3)
    if len(b)<720*1276*3:break
    f=np.frombuffer(b,np.uint8).reshape(720,1276,3).astype(np.float32);o=g-f[M].mean(0);off.append(o.round(3).tolist())
    a=np.asarray(Image.open(f'{RD}/r{i:04d}.png').convert('RGBA')).astype(np.float32);a[...,:3]=np.clip(a[...,:3]+o,0,255)
    Image.fromarray(a.round().astype(np.uint8),'RGBA').save(f'{O}/r{i:04d}.png');i+=1
json.dump({'reference':REF,'offsets_rgb':off},open(f'{O}/offsets.json','w'))
o=np.array(off);print(i,'frames; offset mean',o.mean(0).round(2),'min',o.min(0).round(2),'max',o.max(0).round(2))
