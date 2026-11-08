#!/usr/bin/env python3
"""START for Luna from the existing RUN G1 (no generation). Race V3 per START: window 1.0 s = 24 ticks, then RUN = prologue 11 frames + loop 12.
So START must end on the frame right before the prologue, i.e. 12+11 = 23 frames before the loop start.
  S-A  keeps the approved loop #60-#71: prologue #49-#59, START has to fit #18..#48 (31 frames) into 24 ticks ->
       stand/crouch #18,#21,#24,#27 at ~3x, then #29-#48 at 1:1 (#28 dropped).
  S-B  loop #52-#63 from the same clip (seam as good: 12 consecutive frames): prologue #41-#51, START = #17-#40 at 1:1, nothing dropped.
Real-time video at game scale and x2: the clip as filmed (reference), S-A, S-B; each = BASE 0.5 s (#0) -> START -> prologue -> loop x3.
Also per-tick motion (mean |dRGB|, 319x180 on gray) to show jerks. usage: tools_start_check.py RGBA_DIR ARENA OUTDIR"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
D,AR,O=sys.argv[1:4];T=O+'/_fr';os.makedirs(T,exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14)
seqs={'S-A':[0]*12+[18,21,24,27]+list(range(29,49))+list(range(49,60))+list(range(60,72))*3,
      'S-B':[0]*12+list(range(17,41))+list(range(41,52))+list(range(52,64))*3}
ref=[0]*12+list(range(12,72))+list(range(60,72))*2;ref=ref[:len(seqs['S-A'])]
phase=lambda name,n:'BASE' if n<12 else 'START' if n<36 else 'RUN пролог' if n<47 else 'RUN цикл'
cache={}
def sm(i):
    if i not in cache: cache[i]=np.asarray(Image.alpha_composite(Image.new('RGBA',(1276,720),(128,128,128,255)),Image.open(f'{D}/r{i:04d}.png').convert('RGBA')).convert('RGB').resize((319,180))).astype(np.int16)
    return cache[i]
res={}
for k,s in seqs.items():
    st=[float(np.abs(sm(s[n])-sm(s[n-1])).mean()) for n in range(1,len(s))]
    res[k]={'frames':s[:47],'startTicks':24,'startSourceFrames':sorted(set(s[12:36])),'maxStepInSTART':round(max(st[11:35]),2),'stepsSTART':[round(x,1) for x in st[11:35]],
            'baseToStart':round(st[11],2),'startToPrologue':round(st[35],2),'prologueToLoop':round(st[46],2),'loopSeam':round(st[58],2)}
res['note']='ordinary gallop step in RUN G1 ~ 8.9; stand step < 1.5'
json.dump(res,open(f'{O}/start_check.json','w'),ensure_ascii=False,indent=1)
arena=Image.open(AR).convert('RGB').resize((1920,1080));strip=arena.crop((500,300,820,420))
lanes=[('как снято (справка, не по окнам V3)',ref),('S-A · цикл #60–#71, подсед ×3',seqs['S-A']),('S-B · цикл #52–#63, START 1:1',seqs['S-B'])]
for n in range(len(ref)):
    im=Image.new('RGB',(8+320+12+640+300,36+3*250),(26,28,34));g=ImageDraw.Draw(im);g.text((8,10),f'Луна START из RUN G1 · такт {n} · 24 к/с · масштаб игры и ×2',font=F,fill=(220,220,230))
    for li,(lab,s) in enumerate(lanes):
        sp=Image.open(f'{D}/r{s[n]:04d}.png').convert('RGBA').resize((207,116),Image.LANCZOS);y0=36+li*250
        for sc,x0,yy in ((1,8,y0+60),(2,340,y0)):
            bg=strip.resize((320*sc,120*sc));c=sp if sc==1 else sp.resize((414,232),Image.LANCZOS);bg.paste(c,(int(160*sc-148*sc),int(112*sc-110*sc)),c);im.paste(bg,(x0,yy))
        g.text((992,y0+90),lab,font=F,fill=(255,214,120) if li else (200,200,200));g.text((992,y0+112),f'#{s[n]}'+('' if li==0 else '  · '+phase(lab,n)),font=F,fill=(230,230,230))
    im.save(f'{T}/{n:04d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{T}/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2',f'{O}/DOG5_START_from_RUN_G1_SA_vs_SB_x1realtime.mp4'],check=True)
for f in os.listdir(T): os.remove(f'{T}/{f}')
os.rmdir(T);print(json.dumps({k:{kk:v for kk,v in r.items() if kk not in ('frames','stepsSTART')} for k,r in res.items() if k!='note'},ensure_ascii=False));print({k:res[k]['stepsSTART'] for k in seqs})
