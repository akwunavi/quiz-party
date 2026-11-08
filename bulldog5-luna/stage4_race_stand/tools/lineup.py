#!/usr/bin/env python3
"""Luna RACE_STAND G1 next to the race stands of Frenk (RACE_STAND v3 alpha), Zefir (RUN #30 = his RACE_STAND, atlas) and Pups (BASE, atlas):
geometry in full-frame px (alpha > 128) and a game-scale picture: sprite 207x116 at x-148 / laneY-110 on the V3 arena, plus x3 crops; and a
check of Luna's own spots: RACE_STAND next to her RUN vs2 side frame. usage: lineup.py LUNA_RS_ALPHA FRENK_RS_ALPHA ZEFIR_ATLAS PUPS_BASE LUNA_RUN_ALPHA ARENA OUTDIR"""
import sys,os,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
lu,fr,za,pb,lr,ar,O=sys.argv[1:8];os.makedirs(O,exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
full=lambda im:im.resize((1276,720),Image.LANCZOS)
dogs=[('№1 Фрэнк',Image.open(fr).convert('RGBA')),('№2 Зефир',full(Image.open(za).convert('RGBA').crop((2*207,0,3*207,116)))),
      ('№4 Пупс',full(Image.open(pb).convert('RGBA').crop((0,0,178,100)))),('№5 Луна G1',Image.open(lu).convert('RGBA'))]
def geo(im):
    a=np.asarray(im)[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m)
    return dict(top=int(ys.min()),paw=int(ys.max()),height=int(ys.max()-ys.min()+1),width=int(xs.max()-xs.min()+1),cx=round(float((a.sum(0)*np.arange(1276)).sum()/a.sum()),1),areaK=round(m.sum()/1000))
G={n:geo(im) for n,im in dogs};json.dump(G,open(f'{O}/race_stands_geometry.json','w'),ensure_ascii=False,indent=1)
arena=Image.open(ar).convert('RGB').resize((1920,1080));laneY=[260+159*i for i in range(4)]
X=900;crop=(X-300,laneY[0]-150,X+260,laneY[3]+20)
scene=arena.copy()
for i,(n,im) in enumerate(dogs):
    sp=im.resize((207,116),Image.LANCZOS);scene.paste(sp,(X-148,laneY[i]-110),sp)
sc=scene.crop(crop);big=sc.resize((sc.width*2,sc.height*2),Image.LANCZOS);g=ImageDraw.Draw(big)
for i,(n,_) in enumerate(dogs): g.text((10,(laneY[i]-crop[1])*2-60),n,font=F,fill=(255,255,255),stroke_width=2,stroke_fill=(0,0,0))
big.save(f'{O}/RACE_STAND_lineup_arena_gamescale_x2.png');sc.save(f'{O}/RACE_STAND_lineup_arena_gamescale_x1.png')
o=Image.new('RGB',(4*420,330),(120,120,124));gg=ImageDraw.Draw(o)
for i,(n,im) in enumerate(dogs):
    b=Image.new('RGBA',im.size,(120,120,124,255));b.alpha_composite(im);o.paste(b.convert('RGB').resize((420,237)),(i*420,0))
    q=G[n];gg.text((i*420+6,242),n,font=F,fill=(255,214,120) if 'Луна' in n else (255,255,255));gg.text((i*420+6,264),f"рост {q['height']} · длина {q['width']} · лапы {q['paw']}",font=f2,fill=(240,240,240));gg.text((i*420+6,284),f"центр x {q['cx']} · площадь {q['areaK']} тыс. px",font=f2,fill=(240,240,240))
gg.text((6,308),'полный кадр 1276×720, px; Зефир и Пупс — из игровых атласов (увеличены обратно до кадра)',font=f2,fill=(220,220,220));o.save(f'{O}/RACE_STAND_lineup_fullframe.png')
r=Image.open(lr).convert('RGBA');L=Image.open(lu).convert('RGBA');o=Image.new('RGB',(1280,380),(120,120,124));gg=ImageDraw.Draw(o)
for k,(t,im) in enumerate((('RUN vs2 исходник #59 (alpha v2)',r),('RACE_STAND G1',L))):
    b=Image.new('RGBA',im.size,(120,120,124,255));b.alpha_composite(im);bb=im.getchannel('A').getbbox();c=b.crop(bb).convert('RGB');c.thumbnail((620,340));o.paste(c,(k*640+10,34));gg.text((k*640+10,8),t,font=F,fill=(255,255,255))
o.save(f'{O}/RACE_STAND_vs_RUN_spots.png');print(json.dumps(G,ensure_ascii=False))
