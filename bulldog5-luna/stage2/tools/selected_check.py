#!/usr/bin/env python3
"""Luna SELECTED alpha check: per-frame geometry (alpha > 128: paw line, top, height, body centre) vs FRONT_STAND f0, frames touching the top
edge, and 1:1 crops of head / paws on contrasting backgrounds. usage: selected_check.py SEL_RGBA_DIR IDLE_RGBA_DIR(or FRONT png dir) OUTDIR"""
import sys,os,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
SD,ID,O=sys.argv[1:4];os.makedirs(O,exist_ok=True)
def geo(im):
    a=np.asarray(im)[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m)
    return dict(cx=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),2),cy=round(float((a.sum(1)*np.arange(a.shape[0])).sum()/a.sum()),2),
                paw=int(ys.max()),top=int(ys.min()),height=int(ys.max()-ys.min()+1),touchTop=bool((a[0]>128).any()),topRowPx=int((a[0]>128).sum()))
S=[Image.open(f'{SD}/r{i:04d}.png').convert('RGBA') for i in range(121)];G=Image.open(f'{ID}/r0000.png').convert('RGBA')
gs=[geo(s) for s in S];g0=geo(G)
res={'FRONT_STAND_f0':g0,'s0_vs_f0':{k:round(gs[0][k]-g0[k],2) for k in ('cx','cy','paw','height')},'s120_vs_f0':{k:round(gs[120][k]-g0[k],2) for k in ('cx','cy','paw','height')},
     'pawRange':[min(x['paw'] for x in gs),max(x['paw'] for x in gs)],'framesTouchingTop':[i for i,x in enumerate(gs) if x['touchTop']],
     'topRowPx':{i:x['topRowPx'] for i,x in enumerate(gs) if x['touchTop']},'heightRange':[min(x['height'] for x in gs),max(x['height'] for x in gs)],'perFrame':gs}
json.dump(res,open(f'{O}/selected_geometry.json','w'),indent=1)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
BG=[('белый',(255,255,255)),('чёрный',(0,0,0)),('пурпур',(255,0,255)),('зелёный',(0,177,64))]
cells=[]
for f in (0,24,44,66,72,76,90,120):
    im=S[f];x0,y0,x1,y1=im.getchannel('A').getbbox()
    for part,b in (('голова',(x0-10,max(0,y0-10),x1+10,y0+270)),('лапы',(x0-10,y1-130,x1+10,min(720,y1+10)))):
        row=[]
        for n,c in BG:
            bg=Image.new('RGBA',im.size,c+(255,));bg.alpha_composite(im);row.append(bg.crop(b).convert('RGB'))
        cells.append((f'SEL s{f} · {part}',row))
W=max(sum(r.width for r in row)+30 for _,row in cells);H=sum(row[0].height+26 for _,row in cells)
sh=Image.new('RGB',(W,H),(40,40,46));g=ImageDraw.Draw(sh);y=0
for t,row in cells:
    g.text((6,y+4),t+'   (белый · чёрный · пурпур · зелёный, 1:1 от 1276×720)',font=F,fill=(240,240,240));x=0
    for r in row: sh.paste(r,(x,y+24));x+=r.width+10
    y+=row[0].height+26
sh.save(f'{O}/SELECTED_alpha_zoom_head_paws_4bg.png')
print(json.dumps({k:v for k,v in res.items() if k!='perFrame'}))
