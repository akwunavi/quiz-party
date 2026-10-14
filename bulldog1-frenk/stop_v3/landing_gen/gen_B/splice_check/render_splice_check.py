#!/usr/bin/env python3
"""Game-scale check of the Kling B sit segment against STOP V3 (no fixing, no blending).
Row 1: STOP V3 montage m1-m66 as accepted. Row 2: HARD-CUT ILLUSTRATION (not a candidate): m1-m5 | Kling B g42-g57 | m31-m66.
Real V3 arena, layout, sprite 207x116 at the physical STOP path of race-v3-stop-visual-test (variant B ticks from k=36); TEMPORARY rough colour mattes, not alpha assets.
usage: render_splice_check.py ARENA MONTAGE_DIR(m%03d.png) KLING_DIR(g%03d.png) MATTE_PY_DIR OUT"""
import sys,os,json,numpy as np
from PIL import Image,ImageDraw,ImageFont
arena_p,MD,GD,MP,OUT=sys.argv[1:6]; sys.path.insert(0,MP)
from matte import matte
from scipy import ndimage as ndi
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'../../../../..'))
tl=json.load(open(f'{REPO}/race-v3-stop-visual-test/timelines.json')); L=tl['layout']; T=[r for r in tl['variants']['B']['ticks'] if r['k']>=36]
SW,SH,AX,TOP,LANE=L['spriteWidth'],L['spriteHeight'],L['spriteAnchorX'],L['spriteTopOffset'],L['laneTop']
arena=Image.open(arena_p).convert('RGBA').resize((L['width'],L['height'])); ov=Image.new('RGBA',arena.size,(0,0,0,0)); d=ImageDraw.Draw(ov)
d.rectangle((0,LANE-111,L['width'],LANE+40),fill=(20,39,40,82)); d.line([(L['startX'],LANE+19),(L['finishX'],LANE+19)],fill=(255,247,211,158),width=2)
scene=Image.alpha_composite(arena,ov); cache={}
def spr(lbl):
    if lbl not in cache:
        p=f'{MD}/m{int(lbl[1:]):03d}.png' if lbl[0]=='m' else f'{GD}/g{int(lbl[1:]):03d}.png'
        a=np.asarray(Image.open(p).convert('RGB')); al=matte(p)
        if lbl[0]=='g':                                     # Kling B background differs: keep only pixels near the warm (fur) region
            w=(a[...,0].astype(int)-a[...,2])>14; w=ndi.binary_opening(w,iterations=2); l,n=ndi.label(w); s=ndi.sum(w,l,range(1,n+1)); w=l==(1+np.argmax(s))
            al=al*ndi.binary_dilation(ndi.binary_fill_holes(ndi.binary_closing(w,iterations=10)),iterations=30)
        cache[lbl]=Image.fromarray(np.dstack([a,(al*255).astype(np.uint8)]),'RGBA').resize((SW,SH),Image.LANCZOS)
    return cache[lbl]
row1=[f'm{i}' for i in range(1,67)]
row2=[f'm{i}' for i in range(1,6)]+[f'g{i}' for i in range(42,58)]+[f'm{i}' for i in range(31,67)]
N=max(len(row1),len(row2)); font=ImageFont.load_default(); os.makedirs(OUT,exist_ok=True)
CW,CH=560,170
for i in range(N):
    x=T[min(i,len(T)-1)]['x']; x0=int(x-AX-160); y0=LANE-TOP-30
    c=Image.new('RGB',(CW,2*(CH+20)),(18,22,24)); dr=ImageDraw.Draw(c)
    for r,(row,name) in enumerate([(row1,'STOP V3 (accepted montage)'),(row2,'HARD CUT illustration: m1-5 | Kling g42-57 | m31-66  (NOT a candidate)')]):
        lbl=row[min(i,len(row)-1)]; img=scene.copy(); sh=Image.new('RGBA',img.size,(0,0,0,0)); ImageDraw.Draw(sh).ellipse((x-109,LANE-3,x+9,LANE+7),fill=(28,45,35,94)); img=Image.alpha_composite(img,sh)
        img.alpha_composite(spr(lbl),(int(round(x-AX)),int(LANE-TOP)))
        c.paste(img.crop((x0,y0,x0+CW,y0+CH)).convert('RGB'),(0,r*(CH+20)+20))
        dr.text((6,r*(CH+20)+5),f'{name}   frame {i+1}: {lbl}',fill=(255,240,160) if r==0 else (255,170,150),font=font)
    c.save(f'{OUT}/f{i:04d}.png')
print(N,'frames')
