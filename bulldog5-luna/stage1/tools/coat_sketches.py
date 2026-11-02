#!/usr/bin/env python3
"""Coat colour SKETCHES for Luna (No.5) — NOT final art. Takes the old experimental No.5 render (Kling RUN vs2, front frame #9 and side
frame #90, cut out locally with the shared alpha pipeline) and recolours only the dark coat patches; eyes, nose/mouth and paws are
protected by hand-placed ellipses. Purpose: let the user compare colour schemes next to the other four dogs before any paid generation.
usage: coat_sketches.py FRONT_RGBA SIDE_RGBA OUTDIR"""
import sys,os,numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageFilter
fr,sd,out=sys.argv[1:4];os.makedirs(out,exist_ok=True)
PROTECT={'front':[(562,249,26,26),(690,264,27,27),(640,300,55,48)],'side':[(920,275,24,24),(945,330,42,48)]}
PAWS={'front':650,'side':640}
VARIANTS=[('A','чёрные пятна (как старый №5)',None),
          ('B','рыжие пятна',(205,118,58)),
          ('C','шоколадные пятна',(112,72,48)),
          ('D','серо-голубые — близко к Пупсу',(108,120,140))]
def recolor(im,view,col):
    a=np.asarray(im).astype(float);rgb=a[...,:3];al=a[...,3]
    if col is None: return im
    Y=rgb@[0.299,0.587,0.114];mx=rgb.max(-1);mn=rgb.min(-1);S=(mx-mn)/np.maximum(mx,1)
    w=np.clip((112-Y)/40,0,1)*np.clip((0.35-S)/0.15,0,1)
    m=Image.new('L',im.size,255);g=ImageDraw.Draw(m)
    for x,y,rx,ry in PROTECT[view]: g.ellipse([x-rx,y-ry,x+rx,y+ry],fill=0)
    g.rectangle([0,PAWS[view],im.size[0],im.size[1]],fill=0)
    m=np.asarray(m.filter(ImageFilter.GaussianBlur(4)))/255.;w=w*m
    shade=np.clip(0.45+Y/170,0.45,1.15)[...,None]
    new=np.clip(np.array(col)[None,None,:]*shade,0,255)
    rgb2=rgb*(1-w[...,None])+new*w[...,None]
    return Image.fromarray(np.dstack([rgb2,al]).round().astype(np.uint8),'RGBA')
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
src={'front':Image.open(fr).convert('RGBA'),'side':Image.open(sd).convert('RGBA')}
crop={'front':(400,10,950,700),'side':(320,90,1000,690)}
cells=[]
for k,name,col in VARIANTS:
    row=[]
    for v in ('front','side'):
        r=recolor(src[v],v,col);bg=Image.new('RGBA',r.size,(214,214,218,255));bg.alpha_composite(r)
        c=bg.crop(crop[v]).convert('RGB');c=c.resize((int(c.width*0.6),int(c.height*0.6)),Image.LANCZOS);row.append(c)
        r.save(f'{out}/LUNA_SKETCH_{k}_{v}.png')
    cells.append((k,name,row))
W=sum(c.width for c in cells[0][2])+30;H=cells[0][2][0].height+70
sheet=Image.new('RGB',(2*W+20,2*H+80),(250,250,250));g=ImageDraw.Draw(sheet)
g.text((14,10),'Луна (№5) — ЭСКИЗЫ ОКРАСА, не финальная внешность: перекраска старого экспериментального рендера №5',font=f2,fill=(160,30,30))
for i,(k,name,row) in enumerate(cells):
    x0=(i%2)*(W+20)+10;y0=(i//2)*H+50;x=x0
    for c in row: sheet.paste(c,(x,y0));x+=c.width+10
    g.text((x0,y0+row[0].height+8),f'{k}. {name}',font=F,fill=(20,20,20))
sheet.save(f'{out}/LUNA_COAT_SKETCHES.png');print('ok',sheet.size)
