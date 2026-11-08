#!/usr/bin/env python3
"""ROLL fix without a new generation: keep Luna's natural way down (stand -> lie down -> roll onto the back -> wiggle on the back) and play the
same frames BACKWARDS to get up again, so the frames with the deformed pelvis (rolling over and standing up, source #91-#108) are never used.
  R69: #6..#69 forward, #68..#24 backward (109 frames), RACE_STAND to 145
  R81: #6..#81 forward, #80..#24 backward (133 frames), RACE_STAND to 145
Turning points #69 / #81 are the calmest moments of the wiggle (smallest motion around them). #24 = stand (differs from #0 by 1.05/255).
Side-by-side real-time video with the original 145 frames, on the source frames (studio background) so motion can be judged before alpha.
usage: roll_reverse.py ROLL_ORIGINAL.mp4 OUTDIR"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
SRC,O=sys.argv[1:3];T=O+'/_fr';os.makedirs(T,exist_ok=True)
raw=subprocess.run(['ffmpeg','-v','error','-i',SRC,'-vf','crop=1100:640:90:60,scale=440:256','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True,check=True).stdout
V=np.frombuffer(raw,np.uint8).reshape(-1,256,440,3)
def seq(K): s=list(range(6,K+1))+list(range(K-1,23,-1));return s+[0]*(145-len(s)),len(s)
R={'R69':seq(69),'R81':seq(81)}
orig=list(range(145))
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
meta={k:{'bodyFrames':n,'order':f'#6→#{69 if k=="R69" else 81}→#24, затем стойка','fitsWindowWithLead7':n<=138,'fitsWithStopTail22':n<=116} for k,(s,n) in R.items()}
json.dump(meta,open(f'{O}/roll_reverse_meta.json','w'),ensure_ascii=False,indent=1)
for n in range(145):
    im=Image.new('RGB',(3*450+10,300),(26,28,34));g=ImageDraw.Draw(im)
    for li,(lab,s) in enumerate([('исходник (деформация таза #91–#108)',orig),('R69: вниз → на спине → назад',R['R69'][0]),('R81: дольше на спине',R['R81'][0])]):
        f=s[n];x=10+li*450;im.paste(Image.fromarray(V[f]),(x,34))
        back=li>0 and n<R['R69' if li==1 else 'R81'][1] and n>0 and s[n]<s[n-1]
        g.text((x,8),lab,font=F,fill=(255,214,120) if li else (220,220,220))
        g.text((x,294-20),f'#{f}'+('  ◀ обратный ход' if back else ''),font=F,fill=(255,140,120) if back else (230,230,230))
    im.save(f'{T}/{n:04d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{T}/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2',f'{O}/DOG5_ROLL_original_vs_reverse_R69_R81_x1realtime.mp4'],check=True)
for f in os.listdir(T): os.remove(f'{T}/{f}')
os.rmdir(T);print(meta)
