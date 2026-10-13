from hy_load import *
from PIL import ImageDraw
def im(a,lab):
    i=Image.fromarray(comp(a)).crop((200,40,1080,700)); i=i.resize((440,330)); d=ImageDraw.Draw(i); d.rectangle([0,0,90,12],fill=(0,0,0)); d.text((2,0),lab,fill=(255,255,0)); return i
joins=[('c',51,'r',58),('c',51,'r',69),('c',49,'r',90),('c',12,'c',22),('c',40,'r',67),('c',1,'r',90),('c',26,'c',40)]
g=lambda k,n: clip[n-1] if k=='c' else run[n]
S=Image.new('RGB',(880*2,330*4))
for t,(k1,n1,k2,n2) in enumerate(joins):
    a=im(g(k1,n1),f'{k1}{n1}'); b=im(g(k2,n2),f'{k2}{n2}')
    x=(t%2)*880; y=(t//2)*330; S.paste(a,(x,y)); S.paste(b,(x+440,y))
S.save('hy_seams_sheet.png')
