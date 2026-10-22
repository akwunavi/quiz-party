#!/usr/bin/env python3
"""4-background check of the RETURN_TO_IDLE v1 montage alpha: every 4th frame on white/black/green/beige, zoom of the paws during the
three steps (montage frames of r77-r110) and of the head (mouth closing r2-r28, squint r41-r60). usage: check_4bg.py WEBM MONTAGE_JSON OUT_DIR"""
import sys,os,json,subprocess,tempfile
from PIL import Image,ImageDraw,ImageFont
src,mj,out=sys.argv[1:4];T=tempfile.mkdtemp();FR=json.load(open(mj))['frames']
subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',src,'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
n=len(os.listdir(T));F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
BG={'white':(255,255,255),'black':(0,0,0),'green':(0,177,64),'beige':(222,203,164)}
fr=lambda i:Image.open(f'{T}/a{i+1:03d}.png').convert('RGBA')
def on(im,c):b=Image.new('RGBA',im.size,c+(255,));b.alpha_composite(im);return b.convert('RGB')
def grid(idx,box,cw,ch,cols,c,name):
    W=Image.new('RGB',(cols*cw,((len(idx)+cols-1)//cols)*ch),(40,40,40));d=ImageDraw.Draw(W)
    for j,i in enumerate(idx):W.paste(on(fr(i).crop(box),c).resize((cw,ch),Image.LANCZOS),((j%cols)*cw,(j//cols)*ch));d.text(((j%cols)*cw+4,(j//cols)*ch+3),f'm{i+1} {FR[i]}',font=F,fill=(220,0,0))
    W.save(os.path.join(out,name))
paws=[i for i,f in enumerate(FR) if 77<=int(f[1:])<=110][::3];head=[i for i,f in enumerate(FR) if int(f[1:])<=60][::4]
for nm,c in BG.items():
    grid(list(range(0,n,4))+[n-1],(0,0,1276,720),319,180,8,c,f'SHEET_every4_on_{nm}.png')
    grid(paws,(360,420,960,720),330,165,6,c,f'ZOOM_paws_steps_{nm}.png')
    grid(head,(338,0,938,500),300,250,8,c,f'ZOOM_head_{nm}.png')
print('frames',n)
