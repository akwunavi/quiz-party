#!/usr/bin/env python3
"""Reproduce the APPROVED RETURN_TO_IDLE v1 grade (commit ef37006) from the unchanged sources:
per-channel offset, linear over r1..r121, from mean(SELECTED f121 - r1) to mean(IDLE f8 - r121) (whole-frame means, float64),
added to the decoded Kling frames and rounded. Writes r%03d.png (r1..r121) into OUTDIR.
usage: make_graded_frames.py OUTDIR"""
import sys,os,subprocess,tempfile,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));B=os.path.dirname(H);out=sys.argv[1];os.makedirs(out,exist_ok=True);t=tempfile.mkdtemp()
def dec(mp4,d):
    os.makedirs(d,exist_ok=True);subprocess.run(['ffmpeg','-v','error','-y','-i',mp4,f'{d}/f%03d.png'],check=True)
dec(f'{H}/DOG1_RETURN_TO_IDLE_v1_kling_source.mp4',f'{t}/ret');dec(f'{B}/assets/sources/bulldog_01_selected.mp4',f'{t}/sel');dec(f'{B}/assets/sources/bulldog_01_idle.mp4',f'{t}/idle')
L=lambda p:np.asarray(Image.open(p).convert('RGB'),dtype=float)
o0=(L(f'{t}/sel/f121.png')-L(f'{t}/ret/f001.png')).mean((0,1));o1=(L(f'{t}/idle/f008.png')-L(f'{t}/ret/f121.png')).mean((0,1))
for n in range(1,122):
    u=(n-1)/120;Image.fromarray(np.clip(L(f'{t}/ret/f{n:03d}.png')+o0*(1-u)+o1*u,0,255).round().astype(np.uint8)).save(f'{out}/r{n:03d}.png')
print('offsets',o0.round(3),o1.round(3))
