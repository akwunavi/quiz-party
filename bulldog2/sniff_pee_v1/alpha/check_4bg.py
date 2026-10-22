#!/usr/bin/env python3
"""Own checks of the SNIFF_PEE v1 alpha (beyond verify_alpha.py): decode the VP9 alpha to RGBA, then
* SHEET_every6_on_{white,black,green,beige}.png — every 6th frame over four backgrounds;
* ZOOM_lift_k62-k77_*.png, ZOOM_lower_k146-k161_*.png — hind leg and the gap between leg and body during the lift/lower transitions;
* ZOOM_head_hold_*.png — head/ears/muzzle and the lifted leg in the hold (k73, k100, k129, k148) and stand (k1, k193);
* sniff_alpha_frames.json — per frame: mask area, islands, size of islands other than the dog, IoU with the previous mask.
usage: check_4bg.py ALPHA_WEBM OUT_DIR"""
import sys,os,json,subprocess,tempfile,numpy as np
from PIL import Image,ImageDraw,ImageFont
from scipy import ndimage
src,out=sys.argv[1:3];os.makedirs(out,exist_ok=True);T=tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',src,'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
n=len(os.listdir(T));F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20)
BG={'white':(255,255,255),'black':(0,0,0),'green':(0,177,64),'beige':(222,203,164)}
fr=lambda k:Image.open(f'{T}/a{k:03d}.png').convert('RGBA')
def on(im,c):b=Image.new('RGBA',im.size,c+(255,));b.alpha_composite(im);return b.convert('RGB')
def grid(ks,box,cw,ch,cols,c,name):
    W=Image.new('RGB',(cols*cw,((len(ks)+cols-1)//cols)*ch),(40,40,40));d=ImageDraw.Draw(W)
    for j,k in enumerate(ks):
        W.paste(on(fr(k).crop(box),c).resize((cw,ch),Image.LANCZOS),((j%cols)*cw,(j//cols)*ch));d.text(((j%cols)*cw+5,(j//cols)*ch+3),f'k{k}',font=F,fill=(220,0,0))
    W.save(os.path.join(out,name))
for nm,c in BG.items():
    grid(list(range(1,n+1,6))+[n],(0,0,1276,720),319,180,8,c,f'SHEET_every6_on_{nm}.png')
    grid(list(range(62,78)),(100,200,760,620),330,210,4,c,f'ZOOM_lift_k62-k77_{nm}.png')
    grid(list(range(146,162)),(100,200,760,620),330,210,4,c,f'ZOOM_lower_k146-k161_{nm}.png')
    grid([1,73,100,129,148,n],(100,40,960,700),430,330,3,c,f'ZOOM_head_hold_{nm}.png')
rows=[];prev=None
for k in range(1,n+1):
    m=np.asarray(fr(k))[...,3]>128;lab,cnt=ndimage.label(m);sizes=ndimage.sum(m,lab,range(1,cnt+1)) if cnt else []
    extra=int(sum(sizes)-max(sizes)) if cnt else 0
    rows.append(dict(k=k,area=int(m.sum()),islands=int(cnt),extra_island_px=extra,iou_prev=None if prev is None else round(float((m&prev).sum()/(m|prev).sum()),3)));prev=m
json.dump(rows,open(os.path.join(out,'sniff_alpha_frames.json'),'w'),indent=0)
ious=[r['iou_prev'] for r in rows[1:]];print('frames',n,'max extra island px',max(r['extra_island_px'] for r in rows),'IoU prev min',min(ious),'at k',rows[1+ious.index(min(ious))]['k'],'mean',round(sum(ious)/len(ious),3))
