#!/usr/bin/env python3
"""Luna SELECTED review videos: (1) SELECTED s0-s120 alone on 4 backgrounds at card scale 638x360 (card top = frame top);
(2) entry into SELECTED from IDLE variant A: pick on IDLE f20 (forward phase), IDLE plays on to the gate, SELECTED once in full;
the clip ends on s120 because the return to IDLE does not exist yet (RETURN_TO_IDLE needs one generation).
usage: selected_render.py SEL_RGBA IDLE_RGBA OUTDIR"""
import sys,os,subprocess
from PIL import Image,ImageDraw,ImageFont
SD,ID,O=sys.argv[1:4];T=O+'/_fr';os.makedirs(T,exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
BG=[('белый',(255,255,255)),('чёрный',(0,0,0)),('зелёный',(0,177,64)),('бежевый',(222,203,164))]
def enc(name):
    subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{T}/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p',f'{O}/{name}'],check=True)
    for f in os.listdir(T): os.remove(f'{T}/{f}')
for n in range(121):
    im=Image.open(f'{SD}/r{n:04d}.png').convert('RGBA').resize((638,360),Image.LANCZOS)
    o=Image.new('RGB',(1276+12,720+44),(24,26,32));g=ImageDraw.Draw(o)
    for k,(lab,c) in enumerate(BG):
        b=Image.new('RGB',(638,360),c);b.paste(im,(0,0),im);x,y=(k%2)*(638+12),36+(k//2)*(360+8);o.paste(b,(x,y))
    g.text((8,8),f'Луна · SELECTED s{n} · 638×360, верх кадра = верх карточки · 24 к/с'+('   ◀ уши за верхом кадра' if 71<=n<=78 else ''),font=f2,fill=(255,120,110) if 71<=n<=78 else (220,220,230))
    o.save(f'{T}/{n:04d}.png')
enc('DOG5_SELECTED_alpha_4bg_x1.mp4')
A=list(range(0,49))+list(range(47,0,-1));gates={0,1,2,3}
seq=[('IDLE',A[p],'') for p in range(0,21)];seq[-1]=('IDLE',20,'◀ ВЫБОР')
p=21
while A[p%96] not in gates: seq.append(('IDLE',A[p%96],'ждём стойку (IDLE вперёд)'));p+=1
seq.append(('IDLE',A[p%96],'ворота'))
seq+=[('SELECTED',s,'') for s in range(121)]
CARD=(222,203,164)
for n,(clip,f,note) in enumerate(seq):
    src=SD if clip=='SELECTED' else ID
    im=Image.open(f'{src}/r{f:04d}.png').convert('RGBA').resize((638,360),Image.LANCZOS)
    o=Image.new('RGB',(720,470),(28,30,38));g=ImageDraw.Draw(o);c=Image.new('RGB',(638,360),CARD);c.paste(im,(0,0),im);o.paste(c,(41,50))
    g.text((41,16),'Луна · вход в SELECTED из IDLE (вариант A) · дальше нужен RETURN_TO_IDLE',font=f2,fill=(200,200,210))
    g.text((41,420),f'{clip} {"s" if clip=="SELECTED" else "f"}{f}  {note}',font=F,fill=(255,214,120) if clip=='SELECTED' else (230,230,230))
    g.text((560,420),f'{n/24:5.2f} с',font=f2,fill=(160,160,170))
    o.save(f'{T}/{n:04d}.png')
enc('DOG5_IDLE_A_to_SELECTED_entry_x1.mp4');os.rmdir(T);print(len(seq),'frames; SELECTED starts at',next(i for i,s in enumerate(seq) if s[0]=='SELECTED'))
