import sys; sys.path.insert(0,'.')
import numpy as np, pickle
from PIL import Image
from hy_load import run, clip, comp
def half(a): return np.array(Image.fromarray(a).resize((638,360),Image.BILINEAR)).astype(np.float32)
def warm(c): return (c[...,0]-c[...,2])>16
def F(c):
    h=half(c); m=warm(h); ys,xs=np.nonzero(m); return dict(c=h,m=m,cx=xs.mean(),x0=xs.min()*2,x1=xs.max()*2,y1=ys.max()*2,y0=ys.min()*2)
V=[F(np.array(Image.open(f'rs_v2/frames/f{k:03d}.png').convert('RGB'))) for k in range(1,74)]
R={n:F(comp(run[n])) for n in range(40,99)}
C1=[F(comp(clip[k])) for k in range(0,16)]   # V1 f1..f16 (real entry fragment)
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), float(np.abs(a['c']-b['c']).mean(2)[u].mean())
pickle.dump(dict(V=[{k:v for k,v in f.items()} for f in V],R=R,C1=C1),open('v2g_feats.pkl','wb'))
print('RUN step base:',np.round([seam(R[n],R[n+1]) for n in range(87,98)],2).tolist()[:4], 'mean IoU',np.mean([seam(R[n],R[n+1])[0] for n in range(87,98)]).round(3),'max rgb',round(max(seam(R[n],R[n+1])[1] for n in range(87,98)),1))
print('V2 steps:',[ (i+1,round(seam(V[i],V[i+1])[0],2),round(seam(V[i],V[i+1])[1])) for i in range(72)])
print('V2 cx:',[round(f['cx']*2) for f in V])
print('V2 f1 vs V1 f16',seam(V[0],C1[15]))
