import numpy as np
from PIL import Image,ImageFilter,ImageDraw
plate=np.array(Image.open('stop/plate_1276x720.png')).astype(np.float32)
rng=np.random.default_rng(3)
def run_frame(n):
    im=Image.open(f'b/full/f{n-39:03d}.png').convert('RGBA'); al=np.array(im)[:,:,3].astype(np.float32)/255
    ys,xs=np.nonzero(al>0.5); bot=ys.max(); x0,x1=xs.min(),xs.max()
    S=Image.new('L',(1276,720),0); d=ImageDraw.Draw(S)
    cx=(x0+x1)//2-50; wd=int((x1-x0)*0.50); d.ellipse([cx-wd,bot-22,cx+wd,bot+10],fill=255)
    S=np.array(S.filter(ImageFilter.GaussianBlur(14))).astype(np.float32)/255
    tint=np.array([0.78,0.82,0.92],dtype=np.float32)
    out=plate*(1-0.45*S[...,None]*(1-tint))
    out=out*(1-al[...,None])+np.array(im).astype(np.float32)[:,:,:3]*al[...,None]
    return np.clip(out,0,255).astype(np.uint8)
def stop_frame(k): return np.array(Image.open(f'stop_v1/f{k:03d}.png').convert('RGB'))
def warm(a):
    a=a.astype(np.float32); w=(a[...,0]-a[...,2]>14)&(a[...,0]>90)
    return np.array(Image.fromarray((w*255).astype(np.uint8)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(9)))>0
def iou(a,b): return (a&b).sum()/max((a|b).sum(),1)
def rgbd(A,B,ma,mb):
    u=ma&mb
    return np.abs(A.astype(np.float32)-B.astype(np.float32)).mean(axis=2)[u].mean() if u.sum() else 99
