import sys; sys.path.insert(0,'sp4'); sys.path.insert(0,'.')
from an import *
import numpy as np, cv2
def shift(a,dx,dy):
    M=np.float32([[1,0,dx],[0,1,dy]])
    return cv2.warpAffine(a,M,(a.shape[1],a.shape[0]),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0,0))
def hermite(p0,v0,K):
    # cubic from p0 (slope v0) at t=0 to 0 (slope 0) at t=K ; returns offsets o(t) t=0..K
    t=np.arange(K+1)/K
    h00=2*t**3-3*t**2+1; h10=t**3-2*t**2+t
    return h00*p0+h10*K*v0
def cyc(n):
    while n>98: n-=12
    while n<87: n+=12
    return n
