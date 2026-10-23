# 1:1 crops of the SELECTED alpha (head with ears/tongue, front paws) on contrasting backgrounds, to inspect edges.
# usage: python3 alpha_zoom.py RGBA_DIR OUT.png
import sys
from PIL import Image,ImageDraw,ImageFont
src,out=sys.argv[1],sys.argv[2];F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
BG=[('белый',(255,255,255)),('чёрный',(0,0,0)),('пурпур',(255,0,255)),('зелёный',(0,177,64))]
FR=[0,40,58,66,68,80,100,120]
def box(a):  # head = top 260 px of the dog, paws = bottom 120 px, from the alpha bbox
    x0,y0,x1,y1=a.getbbox();return [('голова',(x0-10,max(0,y0-10),x1+10,y0+260)),('лапы',(x0-10,y1-120,x1+10,min(720,y1+10)))]
cells=[]
for f in FR:
    im=Image.open(f'{src}/s{f:03d}.png').convert('RGBA')
    for part,b in box(im.getchannel('A')):
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
sh.save(out)
