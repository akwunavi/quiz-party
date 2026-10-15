#!/usr/bin/env python3
"""Build the Frenk sprite atlases for the browser lab from the WORKING ALPHA frames (no new rendering of the dog):
every frame (1276x720 RGBA) is resized once to the game sprite size 207x116 (Lanczos) and packed, 24 columns per sheet.
Also writes frenk_atlas.json: label -> {sheet, index} and the alpha-weighted x-centroid / bottom of each frame in sprite px.
Sources (decoded with ffmpeg libvpx-vp9 -pix_fmt rgba from these files; see ../README.md):
  run87..run98   dog1-run-alpha.webm (approved RUN, #n), decoded frames
  v1f*, g3f*     bulldog1-frenk/race_start_v1/DOG1_RACE_START_v1_alpha.webm, race_start_gen3/DOG1_RACE_START_gen3_alpha.webm
  v4k38..v4k73   bulldog1-frenk/stop_v4/alpha/DOG1_STOP_v4_alpha_k38-k73.webm
  RACE_STAND     bulldog1-frenk/stop_v4/alpha/DOG1_RACE_STAND_v3_alpha_1276.webm
  sniffEv1..200  bulldog1-frenk/sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT_alpha_v3_ribbonfix.webm
  bf1..bf93      bulldog1-frenk/butterfly_v1/DOG1_BUTTERFLY_v1_alpha_game_f1-f93.webm
usage: build_frenk_atlas.py DECDIR (run/ v1f/ g3f/ v4/ stand.png sniff/ bf/)"""
import sys,os,json,numpy as np
from PIL import Image
D=sys.argv[1]; OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets'); W,H,C=207,116,24
groups={
 'run':[f'run{n}' for n in range(87,99)],
 'start':['v1f1','v1f7','v1f8','v1f9','v1f10','v1f11','v1f16']+[f'g3f{n}' for n in range(2,36)],
 'stop':[f'v4k{n}' for n in range(38,74)]+['RACE_STAND'],
 'sniff':[f'sniffEv{n}' for n in range(1,201)],
 'bf':[f'bf{n}' for n in range(1,94)]}
def src(lab):
    if lab=='RACE_STAND': return f'{D}/stand.png'
    for p,fn in (('run',lambda n:f'{D}/run/f{n-39:03d}.png'),('v1f',lambda n:f'{D}/v1f/f{n:03d}.png'),('g3f',lambda n:f'{D}/g3f/f{n:03d}.png'),
                 ('v4k',lambda n:f'{D}/v4/f{n-37:03d}.png'),('sniffEv',lambda n:f'{D}/sniff/f{n:03d}.png'),('bf',lambda n:f'{D}/bf/f{n:03d}.png')):
        if lab.startswith(p) and lab[len(p):].isdigit(): return fn(int(lab[len(p):]))
    raise KeyError(lab)
atlas={'cellWidth':W,'cellHeight':H,'columns':C,'sheets':{},'frames':{}}
for g,labs in groups.items():
    rows=(len(labs)+C-1)//C; sheet=Image.new('RGBA',(W*min(C,len(labs)),H*rows),(0,0,0,0))
    for i,lab in enumerate(labs):
        im=Image.open(src(lab)).convert('RGBA').resize((W,H),Image.LANCZOS); sheet.paste(im,((i%C)*W,(i//C)*H))
        a=np.asarray(im)[...,3].astype(float); ys,xs=np.nonzero(a>128)
        atlas['frames'][lab]={'sheet':g,'index':i,'cx':round(float((a.sum(0)*np.arange(W)).sum()/a.sum()),3),'bottom':int(ys.max())}
    sheet.save(f'{OUT}/frenk_{g}.png',optimize=True); atlas['sheets'][g]=f'assets/frenk_{g}.png'
json.dump(atlas,open(f'{OUT}/frenk_atlas.json','w'),indent=0)
print({g:len(l) for g,l in groups.items()})
