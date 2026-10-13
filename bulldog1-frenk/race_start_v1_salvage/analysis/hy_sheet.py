from hy_load import *
from PIL import ImageDraw
import sys
def sheet(frames,out,cols=6,crop=(230,60,1060,700),sc=0.5):
    ims=[]
    for lab,a in frames:
        im=Image.fromarray(comp(a)).crop(crop); im=im.resize((int(im.width*sc),int(im.height*sc))); d=ImageDraw.Draw(im); d.rectangle([0,0,70,12],fill=(0,0,0)); d.text((2,0),lab,fill=(255,255,0)); ims.append(im)
    w,h=ims[0].size; rows=(len(ims)+cols-1)//cols; S=Image.new('RGB',(w*cols,h*rows))
    for i,im in enumerate(ims): S.paste(im,((i%cols)*w,(i//cols)*h))
    S.save(out)
if __name__=='__main__':
    ks=[1,6,7,8,9,10,12,14,16,18,20,22,24,26,27,28,29,30,32,34,36,38,40,42]
    sheet([(f'f{k}',clip[k-1]) for k in ks],'hy_clip_early.png')
