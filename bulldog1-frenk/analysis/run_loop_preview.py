import sys,os,numpy as np
from PIL import Image,ImageDraw
BG=(209,197,170)
def make(start,L,cycles,out):
    os.makedirs(out,exist_ok=True)
    cache={}
    def fr(n):
        if n not in cache:
            im=Image.open(f'b/full/f{n-39:03d}.png').convert('RGBA'); cache[n]=im
        return cache[n]
    k=0
    for c in range(cycles):
        for j in range(L):
            n=start+j; im=fr(n)
            W=Image.new('RGB',(940,360),BG)
            g=im.resize((300,169),Image.LANCZOS); b=Image.new('RGBA',(300,169),BG+(255,)); b.alpha_composite(g)
            W.paste(b.convert('RGB'),(10,95))
            h=im.resize((638,360),Image.LANCZOS); b2=Image.new('RGBA',(638,360),BG+(255,)); b2.alpha_composite(h)
            W.paste(b2.convert('RGB'),(302,0))
            d=ImageDraw.Draw(W); d.rectangle([0,0,300,14],fill=(0,0,0)); d.text((4,1),f"game scale 0.235 | #{n} cycle {c+1}/{cycles}",fill=(255,255,0))
            W.save(f'{out}/p{k:04d}.png'); k+=1
make(87,12,12,'b/pv87'); make(95,12,12,'b/pv95')
