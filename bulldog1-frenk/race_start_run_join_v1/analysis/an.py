import sys; sys.path.insert(0,'.')
import numpy as np, cv2
from rs_previews import rd, run_alpha, plate
G=lambda k: rd(f'alpha_pipeline/work/rs_g3/rgba/r{k-1:04d}.png')   # gen3 frame k (1-based)
R=lambda n: run_alpha(n)
def half(a): return cv2.resize(a,(638,360),interpolation=cv2.INTER_AREA)
def mask(a): return a[...,3]>127
def feat(a):
    m=mask(a); ys,xs=np.nonzero(m)
    return dict(cx=float(xs.mean()),cy=float(ys.mean()),x0=int(xs.min()),x1=int(xs.max()),y0=int(ys.min()),y1=int(ys.max()),area=int(m.sum()))
def iou(a,b,shift=(0,0)):
    ma,mb=mask(a),mask(b)
    if shift!=(0,0): mb=np.roll(mb,(int(shift[1]),int(shift[0])),axis=(0,1))
    return float((ma&mb).sum()/max(1,(ma|mb).sum()))
def cdiff(a,b):
    ma,mb=mask(a),mask(b); u=ma|mb
    return float(np.abs(a[...,:3].astype(np.float32)-b[...,:3].astype(np.float32))[u].mean())
