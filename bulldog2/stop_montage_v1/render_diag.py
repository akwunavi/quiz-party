# Диагностика в игровом масштабе: цикл RUN (#88..#99, 2 раза, конец на #88) -> STOP (montage_list) -> стойка 1 с.
# Слева спрайт 1:1 (весь кадр 1276x720 -> 207x116), справа он же x4. Камера привязана к собаке (движение по миру не показано).
import sys,json
from PIL import Image,ImageDraw,ImageFont
SRC,O=sys.argv[1:3]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
lst=json.load(open(O+'/montage_list.json'))
seq=[('RUN#%d'%n,f'{SRC}/f{n+1:03d}.png') for n in list(range(88,100))*2+[88]]
seq+=[(e['label'],f"{O}/frames/m{i:03d}.png") for i,e in enumerate(lst)]
seq+=[('RACE_STAND #30 (удержание)',f"{O}/frames/m{len(lst)-1:03d}.png")]*24
import os;os.makedirs(O+'/diag',exist_ok=True)
for i,(t,f) in enumerate(seq):
    g=Image.open(f).convert('RGB').resize((207,116),Image.LANCZOS)
    c=Image.new('RGB',(1088,500),(24,26,30));c.paste(g,(16,60));c.paste(g.resize((828,464),Image.NEAREST),(244,30))
    d=ImageDraw.Draw(c);d.text((16,8),t,font=F,fill=(255,220,90));d.text((16,190),'1:1',font=F,fill=(160,160,160))
    stop=26<=i<26+len(lst);d.text((16,30),'STOP %d/%d'%(i-25,len(lst)) if stop else '',font=F,fill=(120,220,255))
    c.save(f'{O}/diag/d{i:03d}.png')
