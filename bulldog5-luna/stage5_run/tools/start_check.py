#!/usr/bin/env python3
"""How Luna leaves the (straight) RACE_STAND in RUN G1: first frame vs the RACE_STAND image, take-off frames on a sheet, and a real-time
game-scale clip: source #0-#71 as filmed, then the loop #60-#71 three times (the clip itself flows #59 -> #60, so no join is invented).
usage: start_check.py RGBA_DIR RACE_STAND_1276.png RUN_ORIGINAL.mp4 ARENA OUTDIR"""
import sys,os,subprocess,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
D,RS,RUN,AR,O=sys.argv[1:6];T=O+'/_fr';os.makedirs(T,exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
f0=subprocess.run(['ffmpeg','-v','error','-i',RUN,'-frames:v','1','-vf','scale=319:180','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
a=np.frombuffer(f0,np.uint8).reshape(180,319,3).astype(int);b=np.asarray(Image.open(RS).convert('RGB').resize((319,180))).astype(int)
res={'run_f0_vs_RACE_STAND_G1':round(float(np.abs(a-b).mean()),2)}
o=Image.new('RGB',(6*320,3*200),(255,255,255));g=ImageDraw.Draw(o)
for k,i in enumerate(range(18,36)):
    im=Image.open(f'{D}/r{i:04d}.png').convert('RGBA');bb=Image.new('RGBA',im.size,(255,255,255,255));bb.alpha_composite(im)
    c=bb.crop((100,20,1180,710)).convert('RGB');c.thumbnail((320,180));o.paste(c,((k%6)*320,(k//6)*200+18));g.text(((k%6)*320+4,(k//6)*200),f'#{i}',font=F,fill=(0,0,0))
o.save(f'{O}/RUN_G1_takeoff_f18-f35.png')
arena=Image.open(AR).convert('RGB').resize((1920,1080));strip=arena.crop((500,300,820,420))
seq=list(range(0,72))+list(range(60,72))*3
for n,i in enumerate(seq):
    sp=Image.open(f'{D}/r{i:04d}.png').convert('RGBA').resize((207,116),Image.LANCZOS)
    im=Image.new('RGB',(8+320+12+640+8,300),(26,28,34));gg=ImageDraw.Draw(im)
    for sc,x0,y0 in ((1,8,90),(2,340,30)):
        bg=strip.resize((320*sc,120*sc));c=sp if sc==1 else sp.resize((414,232),Image.LANCZOS);bg.paste(c,(int(160*sc-148*sc),int(112*sc-110*sc)),c);im.paste(bg,(x0,y0))
    gg.text((8,8),f'Луна RUN G1 · #{i}'+(' · стойка' if i<=21 else ' · разгон' if i<36 else '')+(' · цикл #60–#71' if n>=72 else '')+' · 24 к/с, масштаб игры и ×2',font=F,fill=(230,230,230))
    im.save(f'{T}/{n:04d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{T}/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2',f'{O}/DOG5_RUN_G1_start_from_stand_then_loop_x1realtime.mp4'],check=True)
for f in os.listdir(T): os.remove(f'{T}/{f}')
os.rmdir(T);json.dump(res,open(f'{O}/start_check.json','w'));print(res)
