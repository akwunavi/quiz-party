#!/usr/bin/env python3
"""One comparison video, real time (24 fps, no slow motion), 6 s = 12 loops of 0.5 s: approved RUN loops of Frenk, Zefir, Pups and the honest
12-frame loops of Luna's new RUN G1 (#60-#71 and #99-#110, consecutive original frames), plus her old vs2 10-frame run as a style reference, each lane
at game scale (sprite 207x116, Race V3 anchor x-148 / laneY-110, no per-dog lab shifts) and enlarged x2 next to it. In place on a strip of the
V3 arena track (no track movement). usage: compare_video.py LOOPS_DIR REPO OUT.mp4"""
import sys,os,io,subprocess
from PIL import Image,ImageDraw,ImageFont
D,R,OUT=sys.argv[1:4];T=OUT+'_fr';os.makedirs(T,exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
SW,SH,AX,AY=207,116,148,110
def git(p): return Image.open(io.BytesIO(subprocess.run(['git','-C',R,'show','HEAD:'+p],capture_output=True,check=True).stdout)).convert('RGBA')
def cells(sheet,idx,cw=207,ch=116,cols=24): return [sheet.crop(((i%cols)*cw,(i//cols)*ch,(i%cols+1)*cw,(i//cols+1)*ch)).resize((SW,SH),Image.LANCZOS) for i in idx]
def luna(v): n=len([f for f in os.listdir(f'{D}/{v}') if f.endswith('.png')]);return [Image.open(f'{D}/{v}/{k:02d}.png').convert('RGBA').resize((SW,SH),Image.LANCZOS) for k in range(n)]
lanes=[('№1 Фрэнк · утв. 12 к.',cells(Image.open(f'{R}/bulldog1-frenk/integration_v1/atlas/frenk_run.png').convert('RGBA'),range(12))),
       ('№2 Зефир · утв. 12 к.',cells(git('bulldog2/lab_start_v1/assets/dog2_run28-100.png'),range(60,72))),
       ('№4 Пупс · утв. 12 к.',cells(Image.open(f'{R}/dog4-v3-lab/assets/run.png').convert('RGBA'),range(11,23),178,100)),
       ('Луна RUN G1 · #60–#71 (12 к. подряд)',luna('L60')),('Луна RUN G1 · #99–#110 (12 к. подряд)',luna('L99')),
       ('Луна старый vs2 · 10 к. (не для V3, для сравнения)',luna('N10'))]
arena=Image.open(f'{R}/dog4-v3-lab/assets/arena.png').convert('RGB').resize((1920,1080));strip=arena.crop((500,300,820,420))
RH=250;W=8+320+12+640+12+390;H=36+len(lanes)*RH
for n in range(144):
    im=Image.new('RGB',(W,H),(26,28,34));g=ImageDraw.Draw(im)
    g.text((8,8),f'RUN · реальное время 24 к/с · кадр {n} · слева масштаб игры, справа ×2 · на месте, без движения по дорожке',font=f2,fill=(210,210,220))
    for li,(lab,seq) in enumerate(lanes):
        y0=36+li*RH;c=seq[n%len(seq)]
        for sc,x0 in ((1,8),(2,340)):
            bg=strip.resize((320*sc,120*sc));cc=c if sc==1 else c.resize((SW*2,SH*2),Image.LANCZOS)
            bg.paste(cc,(int(160*sc-AX*sc),int(112*sc-AY*sc)),cc);ImageDraw.Draw(bg).line([0,112*sc,320*sc,112*sc],fill=(120,90,60))
            im.paste(bg,(x0,y0 if sc==2 else y0+60))
        g.text((992,y0+100),lab,font=F,fill=(255,214,120) if 'Луна' in lab else (230,230,230))
        g.text((992,y0+122),f'кадр цикла {n%len(seq)+1}/{len(seq)}',font=f2,fill=(170,170,180))
    im.save(f'{T}/{n:04d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{T}/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2',OUT],check=True)
for f in os.listdir(T): os.remove(f'{T}/{f}')
os.rmdir(T)
