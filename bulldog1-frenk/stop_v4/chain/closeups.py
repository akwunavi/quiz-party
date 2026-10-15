#!/usr/bin/env python3
"""Close-ups of the seams from rendered chain frames: for every clip change in the timeline, ticks [-8, +8] around it,
a 260x150 game-px window around the sprite, enlarged x4 (nearest, so game pixels stay visible), 12 fps (= x0.5), captioned.
usage: closeups.py TIMELINE.json FRAMES_DIR OUT.mp4"""
import sys,json,re,subprocess,tempfile,os
from PIL import Image,ImageDraw,ImageFont
tl=json.load(open(sys.argv[1])); FD=sys.argv[2]; OUT=sys.argv[3]; L=tl['layout']; T=tl['ticks']
cls=lambda l: re.sub(r'\d+$','',l); font=ImageFont.load_default()
seams=[i for i in range(1,len(T)) if cls(T[i]['label'])!=cls(T[i-1]['label'])]
tmp=tempfile.mkdtemp(); n=0
for s in seams:
    for i in range(max(0,s-8),min(len(T),s+9)):
        r=T[i]; cx=int(round(r['x']-L['spriteAnchorX']+L['spriteWidth']/2)); y0=L['laneTop']-L['spriteTopOffset']-20
        im=Image.open(f'{FD}/f{i:04d}.png').crop((cx-130,y0,cx+130,y0+150)).resize((1040,600),Image.NEAREST)
        c=Image.new('RGB',(1040,630),(18,22,24)); c.paste(im,(0,30)); d=ImageDraw.Draw(c)
        d.text((8,10),f"SEAM {T[s-1]['label']} -> {T[s]['label']}   frame {r['label']}{'   <== seam' if i==s else ''}   (x4 game px, 0.5x speed)",fill=(255,240,160),font=font)
        c.save(f'{tmp}/c{n:04d}.png'); n+=1
subprocess.run(['ffmpeg','-v','error','-y','-framerate','12','-i',f'{tmp}/c%04d.png','-vf','fps=24','-c:v','libx264','-pix_fmt','yuv420p','-crf','16',OUT],check=True)
print(len(seams),'seams',n,'frames ->',OUT)
