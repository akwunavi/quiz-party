#!/usr/bin/env python3
"""STOP visual test, step 2: render the variants side by side with the REAL V3 arena, V3 layout/geometry, the REAL Frenk alpha frames and (reference lane) the REAL Bulldog 4 sprite sheets.
NOT the game's own canvas page: this is an offline re-implementation of dog4-v3-lab/app.mjs draw() for ONE lane (same arena, lane band, shadow ellipse, sprite size/anchor).
usage: render_stop_demo.py TIMELINES.json OUTDIR --dog4-assets DIR --run-frames PATTERN [--decoded DIR]
Inputs outside the repo (documented in README): Bulldog 4 sprite sheets + arena (read from git, unchanged), Frenk RUN alpha frames (#87-98; not in this branch).
"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
tl=json.load(open(sys.argv[1])); out=sys.argv[2]; os.makedirs(out,exist_ok=True)
arg=lambda n,d=None: sys.argv[sys.argv.index(n)+1] if n in sys.argv else d
D4=arg('--dog4-assets'); RUN=arg('--run-frames'); DEC=arg('--decoded',os.path.join(out,'_decoded'))
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
L=tl['layout']; SW,SH,AX,TOP=L['spriteWidth'],L['spriteHeight'],L['spriteAnchorX'],L['spriteTopOffset']; LANE=L['laneTop']; SC=SW/1276
WEBM={'start1':f'{REPO}/bulldog1-frenk/race_start_v1/DOG1_RACE_START_v1_alpha.webm','gen3':f'{REPO}/bulldog1-frenk/race_start_gen3/DOG1_RACE_START_gen3_alpha.webm',
      'stop':f'{REPO}/bulldog1-frenk/assets/approved/DOG1_STOP_v1_alpha.webm','bf':f'{REPO}/bulldog1-frenk/butterfly_v1/DOG1_BUTTERFLY_v1_alpha_game_f1-f93.webm'}
for k,w in WEBM.items():
    d=f'{DEC}/{k}'
    if not os.path.isdir(d) or len(os.listdir(d))==0:
        os.makedirs(d,exist_ok=True); subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',w,'-pix_fmt','rgba',f'{d}/f%03d.png'],check=True)
def path(label):
    import re
    m=re.match(r'([a-z]+\d*?)(\d+)$',label)
    if label=='RACE_STAND': return f'{DEC}/bf/f093.png'
    kind,n=re.match(r'(v1f|g3f|run|stop|bf)(\d+)$',label).groups(); n=int(n)
    return {'v1f':f'{DEC}/start1/f{n:03d}.png','g3f':f'{DEC}/gen3/f{n:03d}.png','run':RUN%(n-39),'stop':f'{DEC}/stop/f{n:03d}.png','bf':f'{DEC}/bf/f{n:03d}.png'}[kind]
cache={}
def frenk(label):
    if label not in cache: cache[label]=Image.open(path(label)).convert('RGBA').resize((SW,SH),Image.LANCZOS)
    return cache[label]
man=json.load(open(f'{REPO}/dog4-v3-lab/manifest.json')); sheets={}
def dog4(clip,frame):
    if clip not in sheets: sheets[clip]=Image.open(f'{D4}/{man["clips"][clip]["file"].split("/")[-1]}').convert('RGBA')
    w,h,c=man['cellWidth'],man['cellHeight'],man['columns']; cell=sheets[clip].crop(((frame%c)*w,(frame//c)*h,(frame%c)*w+w,(frame//c)*h+h))
    return cell.resize((SW,SH),Image.LANCZOS)
# ---- the lab's static scene for lane 0 (app.mjs draw(): arena, header strip, start/finish lines, lane band, lane line)
arena=Image.open(f'{D4}/arena.png').convert('RGBA').resize((L['width'],L['height']))
ov=Image.new('RGBA',arena.size,(0,0,0,0)); d=ImageDraw.Draw(ov)
d.rectangle((0,0,L['width'],155),fill=(21,38,40,214))
d.line([(L['startX'],170),(L['startX'],1006)],fill=(255,250,217,242),width=5); d.line([(L['finishX'],170),(L['finishX'],1006)],fill=(255,250,217,242),width=5)
d.rectangle((0,LANE-111,L['width'],LANE+40),fill=(20,39,40,82)); d.line([(L['startX'],LANE+19),(L['finishX'],LANE+19)],fill=(255,247,211,158),width=2)
scene=Image.alpha_composite(arena,ov)
Z=2; CW=400; Y0,Y1=156,LANE+34
font=ImageFont.load_default()
def panel(key,row,annot):
    v=tl['variants'][key]; x_end=v['physical']['stopEndX']; x0=int(round(x_end-250))
    img=scene.copy(); sh=Image.new('RGBA',img.size,(0,0,0,0)); sd=ImageDraw.Draw(sh)
    x=row['x']; sd.ellipse((x-50-59,LANE+2-5,x-50+59,LANE+2+5),fill=(28,45,35,94)); img=Image.alpha_composite(img,sh)
    if key=='REF': sp=dog4(row['clip'],row['frame']); left=x-AX
    else: sp=frenk(row['label']); left=x-AX+(row.get('shiftSrc') or 0)*SC
    img.alpha_composite(sp,(int(round(left)),int(LANE-TOP)))
    crop=img.crop((x0,Y0,x0+CW,Y1)).resize((CW*Z,(Y1-Y0)*Z),Image.LANCZOS).convert('RGB')
    if annot:
        dr=ImageDraw.Draw(crop)
        for t in range(0,CW,10):                                   # measurement ticks every 10 canvas px along the ground (NOT part of the game)
            Ln=12 if (x0+t)%50==0 else 6; dr.line([(t*Z,(Y1-Y0)*Z-Ln),(t*Z,(Y1-Y0)*Z)],fill=(25,25,25),width=2)
        ax=int(round((x-x0)*Z)); dr.line([(ax,0),(ax,(Y1-Y0)*Z)],fill=(230,40,40),width=2)   # physical anchor (engine position)
        ex=int(round((x_end-x0)*Z)); dr.line([(ex,0),(ex,(Y1-Y0)*Z)],fill=(40,90,230),width=1)  # where the engine stops in this variant
    return crop
def head(key,row,annot):
    v=tl['variants'][key]; lab=row.get('label') or f"{row['clip']}:{row['frame']}"
    return f"{v['name']}   t={row['tRel']:+.2f}s   {row['window']}   {lab}"+("   (red=engine anchor, blue=engine stop)" if annot else '')
keys=['REF','A','B','C']; N=max(len(tl['variants'][k]['ticks']) for k in keys)
for annot,sub in [(True,'annot'),(False,'clean')]:
    os.makedirs(f'{out}/{sub}',exist_ok=True)
    for i in range(N):
        W=CW*Z; H=(Y1-Y0)*Z+22
        canvas=Image.new('RGB',(W*2,H*2),(18,22,24)); dr=ImageDraw.Draw(canvas)
        for q,key in enumerate(keys):
            tk=tl['variants'][key]['ticks']; row=tk[min(i,len(tk)-1)]
            canvas.paste(panel(key,row,annot),((q%2)*W,(q//2)*H+22)); dr.text(((q%2)*W+6,(q//2)*H+5),head(key,row,annot),fill=(255,240,160),font=font)
        canvas.save(f'{out}/{sub}/f{i:04d}.png')
    print(sub,'frames',N)
