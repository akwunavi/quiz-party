#!/usr/bin/env python3
"""Diagnostic transition chains of Luna from alpha frames (rgba dirs r%04d.png of the shared pipeline), real time 24 fps.
Race chains: sprite 207x116 at the Race V3 anchor (x-148, laneY-110) on a strip of the V3 arena, game scale and x2, IN PLACE (no track
movement: the physics are not simulated here; frame order follows the Race V3 windows). Selection chain: card 638x360, card top = frame top.
Each tick label shows clip and source frame, and the per-tick motion (mean |dRGB| 319x180 on gray) of every join is written to JSON.
usage: tools_chain.py SPEC.json OUTDIR   (SPEC: {"name": {"kind": "race"|"select", "items": [[dir, frame, label, dx?], ...]}, ...}); dx = optional horizontal sprite shift in full-frame px (contract shift array)"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
SPEC,O=sys.argv[1:3];os.makedirs(O,exist_ok=True)
spec=json.load(open(SPEC));F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
arena=Image.open(spec['_arena']).convert('RGB').resize((1920,1080));strip=arena.crop((500,300,820,420))
def load(d,f): return Image.open(f'{d}/r{f:04d}.png').convert('RGBA')
def small(im): return np.asarray(Image.alpha_composite(Image.new('RGBA',im.size,(128,128,128,255)),im).convert('RGB').resize((319,180))).astype(np.int16)
report={}
for name,ch in spec.items():
    if name.startswith('_'):continue
    T=f'{O}/_fr_{name}';os.makedirs(T,exist_ok=True);prev=None;joins=[];steps=[]
    for n,it in enumerate(ch['items']):
        d,f,lab=it[:3];dx=it[3] if len(it)>3 else 0.0
        im=load(d,f);sm=small(im)
        if prev is not None:
            s=float(np.abs(sm-prev[0]).mean());steps.append(s)
            if lab.split(' ')[0]!=prev[1].split(' ')[0]: joins.append({'tick':n,'from':prev[1],'to':lab,'step':round(s,2)})
        prev=(sm,lab)
        if ch['kind']=='race':
            sp=im.resize((207,116),Image.LANCZOS);ox=dx*207/1276;fr=Image.new('RGB',(8+320+12+640+8,300),(26,28,34));g=ImageDraw.Draw(fr)
            for sc,x0,y0 in ((1,8,90),(2,340,30)):
                bg=strip.resize((320*sc,120*sc));c=sp if sc==1 else sp.resize((414,232),Image.LANCZOS);bg.paste(c,(int(round((160-148+ox)*sc)),int(112*sc-110*sc)),c);fr.paste(bg,(x0,y0))
        else:
            fr=Image.new('RGB',(720,470),(28,30,38));g=ImageDraw.Draw(fr);c=Image.new('RGB',(638,360),(222,203,164));cc=im.resize((638,360),Image.LANCZOS);c.paste(cc,(0,0),cc);fr.paste(c,(41,50))
        g.text((8,8),f'{ch.get("title",name)} · {n/24:5.2f} с',font=F,fill=(200,200,210));g.text((8,fr.height-22),lab,font=F,fill=(255,214,120))
        fr.save(f'{T}/{n:05d}.png')
    subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{T}/%05d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2',f'{O}/{name}.mp4'],check=True)
    for x in os.listdir(T): os.remove(f'{T}/{x}')
    os.rmdir(T)
    report[name]={'ticks':len(ch['items']),'seconds':round(len(ch['items'])/24,2),'joins':joins,'stepMedian':round(float(np.median(steps)),2),'stepP90':round(float(np.percentile(steps,90)),2)}
    print(name,report[name]['seconds'],'s; joins',joins)
json.dump(report,open(f'{O}/chains_report.json','w'),ensure_ascii=False,indent=1)
