#!/usr/bin/env python3
"""Close-ups of Frenk's seams from the BROWSER-recorded frames (results/_frames_<KEY>/f%05d.png, frame = t*24), using the seam
list of results/lab_check.json: for each seam of the chosen lane, frames [-8, +8], a 300x170 window centred on the visible
body, x4 nearest (game pixels stay visible), 12 fps (= x0.5), captioned. usage: lab_closeups.py KEY LANE(1-based) OUT.mp4"""
import sys,json,os,subprocess,tempfile
from PIL import Image,ImageDraw,ImageFont
KEY,LANE,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
H=os.path.dirname(os.path.abspath(__file__)); R=os.path.join(H,'..','results')
rep=json.load(open(f'{R}/lab_check.json')); lane=[l for l in rep['lanes'][KEY] if l['lane']==LANE-1][0]
L=json.load(open(os.path.join(H,'..','..','dog4-v3-lab','layout.json')))
y0=L['laneTop']+(LANE-1)*L['laneStep']-L['spriteTopOffset']-40
font=ImageFont.load_default(); tmp=tempfile.mkdtemp(); n=0
for s in lane['seams']:
    k=round(s['t']*24); cx=int(round(s['bodyX']))
    for i in range(k-8,k+9):
        p=f'{R}/_frames_{KEY}/f{i:05d}.png'
        if not os.path.exists(p): continue
        im=Image.open(p).convert('RGB').crop((cx-150,y0,cx+150,y0+170)).resize((1200,680),Image.NEAREST)
        c=Image.new('RGB',(1200,710),(18,22,24)); c.paste(im,(0,30)); d=ImageDraw.Draw(c)
        d.text((8,10),f"{KEY} lane {LANE}: {s['from']} -> {s['to']}  (t={s['t']:.2f}s){'   <== seam frame' if i==k else ''}   browser render, x4 game px, 0.5x",fill=(255,240,160),font=font)
        c.save(f'{tmp}/c{n:05d}.png'); n+=1
subprocess.run(['ffmpeg','-v','error','-y','-framerate','12','-i',f'{tmp}/c%05d.png','-vf','fps=24','-c:v','libx264','-pix_fmt','yuv420p','-crf','16',OUT],check=True)
print(len(lane['seams']),'seams',n,'frames ->',OUT)
