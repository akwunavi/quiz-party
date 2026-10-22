#!/usr/bin/env python3
"""RETURN_TO_IDLE v1 montage for Zefir (no Kling, no retime, no crossfade): frames of the unchanged Kling original
  r2-r28, r33-r71, r75-r117  (109 frames = 4.54 s)
* r1 = repeat of SELECTED s121 (dropped); r29-r32 and r72-r74 = parts of still stands (each cut <= 0.35/255 at 319x180, i.e. <= 2 standing
  steps); r118-r121 = end of the final settle (r117 vs IDLE f4 differs by 0.06 more than r121).
* Constant tone correction like Frenk's: per channel, linear in the SOURCE frame index from (s121 - r1) at r1 to (f4 - r121) at r121, measured
  on whole frames (dog and plate coincide at both ends). Shape and motion untouched.
usage: make_montage.py RET_FRAMES_DIR(r%03d.png) SEL_s121.png IDLE_f4.png OUT_DIR OUT_LOSSLESS.mp4"""
import sys,os,json,subprocess,numpy as np
from PIL import Image
rd,s121,f4,out,mp4=sys.argv[1:6];os.makedirs(out,exist_ok=True)
L=lambda p:np.asarray(Image.open(p).convert('RGB')).astype(np.float64)
o0=(L(s121)-L(f'{rd}/r001.png')).reshape(-1,3).mean(0);o1=(L(f4)-L(f'{rd}/r121.png')).reshape(-1,3).mean(0)
FR=[*range(2,29),*range(33,72),*range(75,118)]
for i,k in enumerate(FR):
    off=o0+(o1-o0)*(k-1)/120
    Image.fromarray(np.clip(np.rint(L(f'{rd}/r{k:03d}.png')+off),0,255).astype(np.uint8)).save(f'{out}/m{i+1:03d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{out}/m%03d.png','-an','-c:v','libx264rgb','-crf','0','-preset','veryslow',mp4],check=True)
json.dump({'frames':[f'r{k}' for k in FR],'tone_offset_rgb_at_r1':o0.round(3).tolist(),'tone_offset_rgb_at_r121':o1.round(3).tolist()},open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'montage.json'),'w'),indent=0)
print('frames',len(FR),'offset r1',o0.round(2),'r121',o1.round(2))
