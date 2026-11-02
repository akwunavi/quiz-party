#!/usr/bin/env python3
"""Luna coat sketches next to the four existing dogs (front stands, same 1276×720 frame scale) — to check that Luna reads as a different
dog at a glance. usage: lineup.py DOG1 DOG2 DOG3 DOG4 SKETCH_DIR OUT.png"""
import sys
from PIL import Image,ImageDraw,ImageFont
d1,d2,d3,d4,sk,out=sys.argv[1:7]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20)
items=[(d1,'№1 Фрэнк'),(d2,'№2 Зефир'),(d3,'№3 Рокки'),(d4,'№4 Пупс')]+[(f'{sk}/LUNA_SKETCH_{k}_front.png',f'Луна {k}') for k in 'ABCD']
o=Image.new('RGB',(len(items)*260,330),(222,222,226));g=ImageDraw.Draw(o)
for i,(p,n) in enumerate(items):
    im=Image.open(p).convert('RGBA');bg=Image.new('RGBA',im.size,(222,222,226,255))
    if im.getchannel('A').getextrema()[0]<255: bg.alpha_composite(im)
    else: bg=im
    c=bg.crop((388,0,888,720)).convert('RGB').resize((250,360))     # same window and scale for all
    o.paste(c.crop((0,40,250,330)),(i*260+5,0));g.text((i*260+10,298),n,font=F,fill=(15,15,15) if i<4 else (150,30,30))
o.save(out)
