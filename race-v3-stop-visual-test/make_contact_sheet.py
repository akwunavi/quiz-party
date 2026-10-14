#!/usr/bin/env python3
"""Contact sheet from the rendered CLEAN frames: rows = Bulldog 4 reference, A, B, C; columns = time from brake start. usage: make_contact_sheet.py RENDER_CLEAN_DIR OUT.png"""
import sys
from PIL import Image,ImageDraw
d,out=sys.argv[1],sys.argv[2]; T=[0.0,0.75,1.5,2.25,3.0,3.75]; names=['Bulldog 4 (reference)','A  STOP 37/24 + tail','B  STOP 63/24','C  STOP 73/24']
CW,CH=480,179; sheet=Image.new('RGB',(150+CW*len(T),24+CH*4),(18,22,24)); dr=ImageDraw.Draw(sheet)
for j,t in enumerate(T): dr.text((150+j*CW+8,6),f't = {t:+.2f} s from brake start',fill=(255,240,160))
for j,t in enumerate(T):
    k=int(round((t+1.5)*24)); im=Image.open(f'{d}/f{k:04d}.png'); W,H=im.size[0]//2,im.size[1]//2
    for q in range(4):
        cell=im.crop(((q%2)*W,(q//2)*H+22,(q%2)*W+W,(q//2)*H+H)).resize((CW,CH),Image.LANCZOS); sheet.paste(cell,(150+j*CW,24+q*CH))
for q,n in enumerate(names): dr.text((6,24+q*CH+CH//2),n,fill=(255,240,160))
sheet.save(out); print(sheet.size)
