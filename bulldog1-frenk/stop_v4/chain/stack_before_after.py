#!/usr/bin/env python3
"""Before/after at game scale (1:1 game px): top = accepted contract (STOP v1 + tail, old shifts), bottom = STOP V4 proposal.
Same physics/seed, so ticks line up. A 760x270 window follows the engine anchor. usage: stack_before_after.py TL_BEFORE TL_AFTER DIR_BEFORE DIR_AFTER OUT.mp4"""
import sys,json,subprocess,tempfile
from PIL import Image,ImageDraw,ImageFont
tb,ta=(json.load(open(p)) for p in sys.argv[1:3]); DB,DA,OUT=sys.argv[3:6]; L=ta['layout']; font=ImageFont.load_default(); tmp=tempfile.mkdtemp()
for i,(rb,ra) in enumerate(zip(tb['ticks'],ta['ticks'])):
    x0=int(ra['x'])-430; y0=L['laneTop']-L['spriteTopOffset']-60; c=Image.new('RGB',(760,2*(270+20)),(18,22,24)); d=ImageDraw.Draw(c)
    for j,(r,D,name) in enumerate([(rb,DB,'BEFORE: accepted contract (STOP v1 + tail)'),(ra,DA,'AFTER: STOP V4 proposal')]):
        c.paste(Image.open(f'{D}/f{i:04d}.png').crop((x0,y0,x0+760,y0+270)),(0,j*290+20)); d.text((6,j*290+5),f"{name}   frame {r['label']}   {r['window']}",fill=(255,240,160) if j else (200,200,200),font=font)
    c.save(f'{tmp}/s{i:04d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{tmp}/s%04d.png','-c:v','libx264','-pix_fmt','yuv420p','-crf','16',OUT],check=True); print(OUT)
