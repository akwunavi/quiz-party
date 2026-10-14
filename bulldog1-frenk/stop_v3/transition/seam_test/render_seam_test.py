#!/usr/bin/env python3
"""RUN #96 -> STOP V3 f1 seam on the real V3 track at game scale. Nothing is fixed or replaced: the seam is exactly as in the montage commit 6cd3a12.
Offline re-implementation of dog4-v3-lab/app.mjs draw() for ONE lane (same as race-v3-stop-visual-test/render_stop_demo.py): real arena, layout, shadow, sprite size/anchor (207x116 on a 1920 canvas).
RUN: real alpha frames #87-98. STOP V3: RGB montage frames (66) with a TEMPORARY rough colour matte (test_matte.py) - NOT an alpha asset, only to put the frames on the arena.
Physics/anchor path: timelines.json variant B of race-v3-stop-visual-test (V3 model copy, seed 1069078); STOP window 63/24; montage frame m starts at tick k=36 (RUN #96 at k=35); after m=66 the last frame is held.
usage: render_seam_test.py --arena arena.png --run-frames 'DIR/f%03d.png' --montage-frames 'DIR/m%03d.png' --out OUT
"""
import sys,os,json,numpy as np
from PIL import Image,ImageDraw,ImageFont
sys.path.insert(0,os.path.dirname(__file__)); from test_matte import matte
arg=lambda n: sys.argv[sys.argv.index(n)+1]
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'../../../..')); OUT=arg('--out'); os.makedirs(OUT,exist_ok=True)
tl=json.load(open(f'{REPO}/race-v3-stop-visual-test/timelines.json')); L=tl['layout']; ticks=tl['variants']['B']['ticks']
SW,SH,AX,TOP,LANE=L['spriteWidth'],L['spriteHeight'],L['spriteAnchorX'],L['spriteTopOffset'],L['laneTop']
arena=Image.open(arg('--arena')).convert('RGBA').resize((L['width'],L['height']))
ov=Image.new('RGBA',arena.size,(0,0,0,0)); d=ImageDraw.Draw(ov)
d.rectangle((0,0,L['width'],155),fill=(21,38,40,214)); d.line([(L['startX'],170),(L['startX'],1006)],fill=(255,250,217,242),width=5); d.line([(L['finishX'],170),(L['finishX'],1006)],fill=(255,250,217,242),width=5)
d.rectangle((0,LANE-111,L['width'],LANE+40),fill=(20,39,40,82)); d.line([(L['startX'],LANE+19),(L['finishX'],LANE+19)],fill=(255,247,211,158),width=2)
scene=Image.alpha_composite(arena,ov)
RUNP,MONP=arg('--run-frames'),arg('--montage-frames'); cache={}
def spr(label):
    if label not in cache:
        if label.startswith('run'): im=Image.open(RUNP%(int(label[3:])-39)).convert('RGBA')
        else:
            p=MONP%int(label[1:]); a=np.asarray(Image.open(p).convert('RGB')); al=(matte(p)*255).astype(np.uint8)
            im=Image.fromarray(np.dstack([a,al]),'RGBA')
        cache[label]=im.resize((SW,SH),Image.LANCZOS)
    return cache[label]
rows=[]; K0=ticks[0]['k']
for r in ticks:
    if r['tRel']<-1.0: continue
    if r['tRel']>2.9: break
    if r['window']=='STOP' or r['tRel']>=0:
        m=min(66,r['k']-36+1); label=f'm{m:03d}'
    else: label=r['label']                      # run frames from the physics/visual layer (START window)
    rows.append((r['k'],r['tRel'],r['x'],label))
def frame(x,label,crop=None):
    img=scene.copy(); sh=Image.new('RGBA',img.size,(0,0,0,0)); ImageDraw.Draw(sh).ellipse((x-50-59,LANE+2-5,x-50+59,LANE+2+5),fill=(28,45,35,94)); img=Image.alpha_composite(img,sh)
    img.alpha_composite(spr(label),(int(round(x-AX)),int(LANE-TOP)))
    return img.convert('RGB') if crop is None else img.crop(crop).convert('RGB')
font=ImageFont.load_default()
os.makedirs(f'{OUT}/full',exist_ok=True); os.makedirs(f'{OUT}/close',exist_ok=True)
for i,(k,t,x,label) in enumerate(rows):
    frame(x,label).save(f'{OUT}/full/f{i:04d}.png')
    # close-up: 220x130 game px around the dog, x6, caption bar below
    cx=int(round(x-AX+SW/2)); box=(cx-110,LANE-TOP-8,cx+110,LANE-TOP-8+130); im=frame(x,label,box).resize((220*6,130*6),Image.LANCZOS)
    bar=Image.new('RGB',(im.width,34),(18,22,24)); ImageDraw.Draw(bar).text((8,10),f'tick {k}  t={t:+.3f}s  '+('RUN #'+label[3:] if label.startswith('run') else 'STOP V3 f'+label[1:].lstrip('0')),fill=(255,240,160),font=font)
    c=Image.new('RGB',(im.width,im.height+34)); c.paste(im,(0,0)); c.paste(bar,(0,im.height)); c.save(f'{OUT}/close/f{i:04d}.png')
json.dump([dict(i=i,k=k,t=t,x=x,label=l) for i,(k,t,x,l) in enumerate(rows)],open(f'{OUT}/rows.json','w'))
print(len(rows),'frames')
