#!/usr/bin/env python3
"""Luna FRONT_STAND candidate (IDLE f0, alpha from the shared pipeline) next to the approved front stands of Frenk, Zefir, Rocky and Pups on
selection cards (full 1276x720 frame fitted into the card, card top = frame top), plus geometry of each stand (alpha > 128).
usage: front_stand_compare.py LUNA_F0_RGBA.png FRENK.png ZEFIR.png ROCKY.png PUPS.png OUTDIR"""
import sys,os,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
lu,fr,ze,ro,pu,O=sys.argv[1:7];os.makedirs(O,exist_ok=True)
items=[('№1 Фрэнк',fr),('№2 Зефир',ze),('№3 Рокки',ro),('№4 Пупс',pu),('№5 Луна (кандидат)',lu)]
def geo(im):
    a=np.asarray(im)[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m)
    return dict(paw=int(ys.max()),top=int(ys.min()),height=int(ys.max()-ys.min()+1),width=int(xs.max()-xs.min()+1),cx=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),1),areaPx=int(m.sum()))
G={n:geo(Image.open(p).convert('RGBA')) for n,p in items}
json.dump(G,open(f'{O}/front_stands_geometry.json','w'),ensure_ascii=False,indent=1)
Fb=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',17);Fs=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
for bgname,CARD in (('beige',(222,203,164)),('dark',(46,52,70))):
    cw,ch=380,214;sh=Image.new('RGB',(5*(cw+16)+16,ch+110),(24,26,32));g=ImageDraw.Draw(sh)
    for i,(n,p) in enumerate(items):
        im=Image.open(p).convert('RGBA').resize((cw,ch),Image.LANCZOS);card=Image.new('RGB',(cw,ch),CARD);card.paste(im,(0,0),im)
        x=16+i*(cw+16);m=Image.new('L',(cw,ch),0);ImageDraw.Draw(m).rounded_rectangle([0,0,cw-1,ch-1],14,fill=255);sh.paste(card,(x,14),m)
        gg=G[n];g.text((x,ch+22),n,font=Fb,fill=(255,214,120) if 'Луна' in n else (235,235,235))
        g.text((x,ch+46),f"рост {gg['height']} · ширина {gg['width']} · лапы {gg['paw']}",font=Fs,fill=(200,200,210))
        g.text((x,ch+66),f"центр x {gg['cx']} · площадь {gg['areaPx']//1000} тыс. px",font=Fs,fill=(200,200,210))
    g.text((16,ch+88),'карточки — весь кадр 1276×720, верх кадра = верх карточки; цифры — px полного кадра',font=Fs,fill=(150,150,160))
    sh.save(f'{O}/FRONT_STAND_lineup_5_dogs_{bgname}.png')
print(json.dumps(G,ensure_ascii=False))
