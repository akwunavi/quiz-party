import numpy as np, cv2
from PIL import Image
def rdf(p): return cv2.cvtColor(cv2.imread(p),cv2.COLOR_BGR2RGB)
def v2(n): return rdf(f'v2/f{n:04d}.png')
def mm(n): return rdf(f'mm/f{n:04d}.png')
def flow(a,b):
    ga=cv2.cvtColor(a,cv2.COLOR_RGB2GRAY); gb=cv2.cvtColor(b,cv2.COLOR_RGB2GRAY)
    return cv2.calcOpticalFlowFarneback(ga,gb,None,0.5,5,31,5,7,1.5,0)
def warp(img,fl,t):
    h,w=img.shape[:2]; gx,gy=np.meshgrid(np.arange(w),np.arange(h))
    mx=(gx+t*fl[...,0]).astype(np.float32); my=(gy+t*fl[...,1]).astype(np.float32)
    return cv2.remap(img,mx,my,cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
def morph(a,b,t):
    f10=flow(b,a); f01=flow(a,b)           # flow from b to a, and a to b
    wa=warp(a,f10,t) if False else warp(a,-f01*0,0)
    # backward-warp: pixel x of I_t samples A at x + t*F10(x) and B at x + (1-t)*F01(x)
    A=warp(a,f10,t); B=warp(b,f01,1-t)
    return np.clip((1-t)*A.astype(np.float32)+t*B.astype(np.float32),0,255).astype(np.uint8)
def xfade(a,b,t): return np.clip((1-t)*a.astype(np.float32)+t*b.astype(np.float32),0,255).astype(np.uint8)
def diff(a,b): return float(np.abs(a.astype(np.float32)-b.astype(np.float32)).mean())
