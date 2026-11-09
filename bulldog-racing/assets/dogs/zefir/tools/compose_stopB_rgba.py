#!/usr/bin/env python3
"""Compose the approved STOP B (stop_montage_v2/montage_list.json, 37 frames) as RGBA 1276x720 from the pipeline alpha:
RUN #n and #30 <- race_start_v1 alpha (#28..#100, decoded frame index n-27), v2 kN <- DOG2_STOP_v2_alpha_k27-k40 (N-26),
v1 kN <- DOG2_STOP_v1_alpha_k66-k73 (N-65); each shifted by the montage's shift_src_px (#30 stand: +44, as in stop_prep).
Transparent fill on the vacated edge. usage: compose_stopB_rgba.py RUN_DIR V2_DIR V1_DIR OUT_DIR (decoded a%03d.png dirs)"""
import sys,json,os,re,numpy as np
from PIL import Image
RUN,V2,V1,OUT=sys.argv[1:5];H=os.path.dirname(os.path.abspath(__file__));os.makedirs(OUT,exist_ok=True)
lst=json.load(open(os.path.join(H,'../stop_montage_v2/montage_list.json')))
for i,e in enumerate(lst):
    l=e['label']
    if m:=re.match(r'RUN#(\d+)$',l): f,dx=f'{RUN}/a{int(m[1])-27:03d}.png',e['shift_src_px']
    elif m:=re.match(r'v2 k(\d+)$',l): f,dx=f'{V2}/a{int(m[1])-26:03d}.png',e['shift_src_px']
    elif m:=re.match(r'v1 k(\d+)$',l): f,dx=f'{V1}/a{int(m[1])-65:03d}.png',e['shift_src_px']
    else: f,dx=f'{RUN}/a{30-27:03d}.png',44
    a=np.asarray(Image.open(f).convert('RGBA'));b=np.zeros_like(a)
    if dx>=0: b[:,dx:]=a[:,:a.shape[1]-dx]
    else: b[:,:dx]=a[:,-dx:]
    Image.fromarray(b).save(f'{OUT}/s{i:03d}.png')
print(len(lst))
