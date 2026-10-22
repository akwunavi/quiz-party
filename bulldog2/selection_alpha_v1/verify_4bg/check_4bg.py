#!/usr/bin/env python3
"""Own checks of the IDLE MAIN_L1 alpha loop: every 6th loop frame on white/black/green/beige; zoom of head/ears and of the paws for the
paw-lift part (loop frames of f84..f108) and the seam f109 -> f15; per-frame islands (other than the dog) and IoU with the previous mask
incl. the wrap (last -> first). usage: check_4bg.py LOOP_WEBM OUT_DIR"""
import sys,os,json,subprocess,tempfile,numpy as np
from PIL import Image,ImageDraw,ImageFont
from scipy import ndimage
src,out=sys.argv[1:3];T=tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',src,'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
n=len(os.listdir(T));F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20)
L=[*range(15,59),*range(57,39,-1),*range(41,110)];assert len(L)==n
BG={'white':(255,255,255),'black':(0,0,0),'green':(0,177,64),'beige':(222,203,164)}
fr=lambda i:Image.open(f'{T}/a{i+1:03d}.png').convert('RGBA')
def on(im,c):b=Image.new('RGBA',im.size,c+(255,));b.alpha_composite(im);return b.convert('RGB')
def grid(idx,box,cw,ch,cols,c,name):
    W=Image.new('RGB',(cols*cw,((len(idx)+cols-1)//cols)*ch),(40,40,40));d=ImageDraw.Draw(W)
    for j,i in enumerate(idx):W.paste(on(fr(i).crop(box),c).resize((cw,ch),Image.LANCZOS),((j%cols)*cw,(j//cols)*ch));d.text(((j%cols)*cw+5,(j//cols)*ch+3),f'#{i} f{L[i]}',font=F,fill=(220,0,0))
    W.save(os.path.join(out,name))
g=[i for i,k in enumerate(L) if 84<=k<=108][::2]
for nm,c in BG.items():
    grid(list(range(0,n,6)),(0,0,1276,720),319,180,8,c,f'SHEET_every6_on_{nm}.png')
    grid(g,(300,0,1000,720),280,288,7,c,f'ZOOM_paw_lift_f84-f108_{nm}.png')
    grid([n-3,n-2,n-1,0,1,2],(300,0,1000,720),350,360,6,c,f'ZOOM_seam_f107-f109_f15-f17_{nm}.png')
rows=[];prev=None;M=[]
for i in range(n):
    m=np.asarray(fr(i))[...,3]>128;M.append(m);lab,cnt=ndimage.label(m);sz=ndimage.sum(m,lab,range(1,cnt+1)) if cnt else []
    rows.append(dict(i=i,f=L[i],islands=int(cnt),extra_px=int(sum(sz)-max(sz)) if cnt else 0,iou_prev=None if prev is None else round(float((m&prev).sum()/(m|prev).sum()),3)));prev=m
wrap=round(float((M[0]&M[-1]).sum()/(M[0]|M[-1]).sum()),3)
json.dump(dict(frames=rows,wrap_iou_last_to_first=wrap),open(os.path.join(out,'idle_loop_alpha_frames.json'),'w'),indent=0)
ious=[r['iou_prev'] for r in rows[1:]];print('frames',n,'max extra island',max(r['extra_px'] for r in rows),'IoU min',min(ious),'at f',rows[1+ious.index(min(ious))]['f'],'mean',round(sum(ious)/len(ious),3),'wrap f109->f15',wrap)
