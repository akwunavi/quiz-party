# A (stop_montage_v1) и B (stop_montage_v2) рядом, игровой масштаб: цикл RUN #88..#99 x2 (конец на #88) -> STOP 37 кадров -> стойка 1 с.
# В каждой колонке спрайт 1:1 (кадр 1276x720 -> 207x116) и он же x3. Камера привязана к собаке. 24 к/с.
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
SRC,A,B,OUT=sys.argv[1:5]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
def seq(D):
    l=json.load(open(D+'/montage_list.json'))
    s=[(f'RUN #{n}',f'{SRC}/f{n+1:03d}.png') for n in list(range(88,100))*2+[88]]
    s+=[(f"STOP {i+1}/37 · {e['label']}",f'{D}/frames/m{i:03d}.png') for i,e in enumerate(l)]
    s+=[('RACE_STAND #30 (удержание)',f'{D}/frames/m036.png')]*24
    return s
sa,sb=seq(A),seq(B);os.makedirs(OUT,exist_ok=True)
for i,((ta,fa),(tb,fb)) in enumerate(zip(sa,sb)):
    c=Image.new('RGB',(1300,560),(24,26,30));d=ImageDraw.Draw(c)
    for k,(t,f,name) in enumerate([(ta,fa,'A: монтаж v1 (эталон)'),(tb,fb,'B: упрощённый')]):
        x=20+k*650;g=Image.open(f).convert('RGB').resize((207,116),Image.LANCZOS)
        d.text((x,10),name,font=F,fill=(255,220,90));d.text((x,36),t,font=F,fill=(140,210,255))
        c.paste(g,(x,70));d.text((x+215,70),'1:1',font=F,fill=(150,150,150));c.paste(g.resize((621,348),Image.NEAREST),(x,200))
    c.save(f'{OUT}/c{i:03d}.png')
