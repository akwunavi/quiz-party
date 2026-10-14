import numpy as np
from PIL import Image
from scipy import ndimage as ndi
def matte(p):
    a=np.asarray(Image.open(p).convert('RGB')).astype(np.float32)
    L=np.median(a[:,:40],axis=1);R=np.median(a[:,-40:],axis=1);t=np.linspace(0,1,a.shape[1])[None,:,None];bg=L[:,None,:]*(1-t)+R[:,None,:]*t
    d=np.abs(a-bg).max(2); m=d>16
    lum=a.mean(2); bl=bg.mean(2); ratio=lum/np.maximum(bl,1)
    chroma=np.abs((a-lum[...,None])-(bg-bl[...,None])).max(2)
    rows=np.arange(a.shape[0])[:,None]
    shadow=(ratio<0.98)&(ratio>0.5)&(chroma<16)&(rows>600)
    m&=~shadow
    m=ndi.binary_opening(m,iterations=2)
    l,n=ndi.label(m); s=ndi.sum(m,l,range(1,n+1)); m=l==(1+np.argmax(s))
    m=ndi.binary_closing(m,iterations=4); m=ndi.binary_fill_holes(m)
    al=ndi.gaussian_filter(m.astype(np.float32),1.0)
    return np.clip((al-0.15)/0.7,0,1)
