#!/usr/bin/env python3
"""Luna SNIFF_PEE + RETURN, fixed build (no frame of the wrong leg lift, no mirroring, no speed-up, no interpolation):
  original #24-#93 (stand -> head turn -> sniff) + leg-lift insert frames 1-96 (96 ~ original #178) + original #179-#205 (head rises, back in the stand)
= 70 + 96 + 27 = 193 frames at 24 fps. The first 24 stand frames of the original are dropped: the STOP tail / BASE already stand there.
Insert alpha is tone-graded to the studio of original #93 beforehand (tools_tone_grade). Writes the VP9+alpha WebM, a frame-order JSON, seam and geometry
checks. usage: assemble_sniff.py ORIG_RGBA INS_GRADED_RGBA RACE_STAND_ALPHA_RGBA(png) OUT_DIR"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image
OD,ID,RS,O=sys.argv[1:5];os.makedirs(O,exist_ok=True);T=O+'/_enc';os.makedirs(T,exist_ok=True)
order=[('orig',i) for i in range(24,94)]+[('ins',i) for i in range(1,97)]+[('orig',i) for i in range(179,206)]
ld=lambda c,i:Image.open(f'{OD if c=="orig" else ID}/r{i:04d}.png').convert('RGBA')
for k,(c,i) in enumerate(order):
    dst=f'{T}/e{k:04d}.png';src=f'{OD if c=="orig" else ID}/r{i:04d}.png'
    if os.path.lexists(dst): os.remove(dst)
    os.symlink(os.path.abspath(src),dst)
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{T}/e%04d.png','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-b:v','0','-crf','14','-auto-alt-ref','0','-row-mt','1','-metadata:s:v:0','alpha_mode=1',f'{O}/DOG5_SNIFF_PEE_RETURN_FIXED_alpha_193f.webm'],check=True)
def sm(im): return np.asarray(Image.alpha_composite(Image.new('RGBA',im.size,(128,128,128,255)),im).convert('RGB').resize((319,180))).astype(np.int16)
def geo(im):
    a=np.asarray(im)[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m);t=a[200:520]
    return dict(cx=float((t.sum(0)*np.arange(1276)).sum()/t.sum()),paw=int(ys.max()),h=int(ys.max()-ys.min()+1),w=int(xs.max()-xs.min()+1))
S=[sm(ld(c,i)) for c,i in order];G=[geo(ld(c,i)) for c,i in order];rs=Image.open(RS).convert('RGBA');rg=geo(rs);rsm=sm(rs)
d=lambda a,b:round(float(np.abs(a-b).mean()),2)
st=[d(S[k],S[k-1]) for k in range(1,len(S))]
res={'frames':len(order),'seconds':round(len(order)/24,2),'order':'orig #24-#93, insert 1-96, orig #179-#205',
 'seams':{'orig93_to_ins1':st[69],'ins96_to_orig179':st[69+96],'orig_sniff_step_median':round(float(np.median(st[:69])),2),'return_part_step_median':round(float(np.median(st[69+96:])),2)},
 'stepMax':max(st),'toRaceStand':{'first':d(S[0],rsm),'last':d(S[-1],rsm)},'raceStandGeometry':rg,
 'cxRangeVsRaceStand':[round(min(g['cx'] for g in G)-rg['cx'],1),round(max(g['cx'] for g in G)-rg['cx'],1)],'pawRange':[min(g['paw'] for g in G),max(g['paw'] for g in G)],
 'lastFrameGeometry':G[-1],'sizeRange_h':[min(g['h'] for g in G),max(g['h'] for g in G)]}
json.dump({'order':[list(x) for x in order],'checks':res},open(f'{O}/sniff_fixed_assembly.json','w'),indent=1)
print(json.dumps(res,indent=1))
