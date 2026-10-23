# Diagnostic of the ear clipping at the top frame edge, SELECTED v4 s63-s70, in game scale (full frame 1276x720 -> 638x360).
# A: card whose top edge == frame top edge (the card itself clips) ; B: open background with free space above (the flat cut shows).
# usage: python3 ear_diag.py RGBA_DIR(s%03d.png from the alpha WebM, numbered from 0) OUT_DIR
import sys,os,subprocess
from PIL import Image,ImageDraw,ImageFont
src,out=sys.argv[1],sys.argv[2];os.makedirs(out+'/fr',exist_ok=True)
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
W,H=638,360;PAGE=(32,34,40);CARD=(222,203,164);UP=70
CLIP=set(range(63,71))
def frame(i):
    d=Image.open(f'{src}/s{i:03d}.png').convert('RGBA').resize((W,H),Image.LANCZOS)
    im=Image.new('RGB',(2*W+90,H+UP+110),PAGE);g=ImageDraw.Draw(im)
    x0,y0=30,40+UP                      # A: card top == frame top
    card=Image.new('RGB',(W,H),CARD);card.paste(d,(0,0),d);im.paste(card,(x0,y0))
    g.rectangle([x0-1,y0-1,x0+W,y0+H],outline=(120,110,90))
    x1,y1=60+W,40                       # B: open background, UP px above the frame
    bg=Image.new('RGB',(W,H+UP),CARD);bg.paste(d,(0,UP),d);im.paste(bg,(x1,y1))
    g.line([x1,y1+UP,x1+W,y1+UP],fill=(150,140,120))
    g.text((x0,10),'A. верх кадра = край карточки',font=F(18),fill=(240,240,240))
    g.text((x1,10),'B. открытый фон, над кадром пусто',font=F(18),fill=(240,240,240))
    c=(255,90,80) if i in CLIP else (200,200,200)
    g.text((30,H+UP+55),f'SELECTED s{i}'+('   ◀ уши за верхом кадра (s63–s70)' if i in CLIP else ''),font=F(22),fill=c)
    return im
def mp4(frames,name,rep):
    k=0
    for i in frames:
        im=frame(i)
        for _ in range(rep): im.save(f'{out}/fr/{k:05d}.png');k+=1
    subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{out}/fr/%05d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p',f'{out}/{name}'],check=True)
    for n in os.listdir(out+'/fr'): os.remove(f'{out}/fr/{n}')
mp4(list(range(40,96))*3,'EAR_CLIP_s40-s95_x1_3loops.mp4',1)
mp4(range(50,86),'EAR_CLIP_s50-s85_x0.25.mp4',4)
mp4(range(121),'EAR_CLIP_full_SELECTED_x1.mp4',1)
sheet=Image.new('RGB',(2*(2*W+90),4*(H+UP+110)))
for n,i in enumerate(range(63,71)): sheet.paste(frame(i),((n%2)*(2*W+90),(n//2)*(H+UP+110)))
sheet.save(f'{out}/EAR_CLIP_s63-s70_sheet.png')
