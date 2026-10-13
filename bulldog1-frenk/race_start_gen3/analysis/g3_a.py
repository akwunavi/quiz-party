import sys; sys.path.insert(0,'.')
import numpy as np
from PIL import Image
from hy_load import run, clip, comp
def half(a): return np.array(Image.fromarray(a).resize((638,360),Image.BILINEAR)).astype(np.float32)
def F(c):
    h=half(c); m=(h[...,0]-h[...,2])>16; ys,xs=np.nonzero(m); return dict(c=h,m=m,cx=xs.mean()*2,y1=ys.max()*2,x0=xs.min()*2,x1=xs.max()*2)
G=[F(np.array(Image.open(f'rs_g3/frames/f{k:03d}.png').convert('RGB'))) for k in range(1,74)]
R={n:F(comp(run[n])) for n in range(40,99)}
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), float(np.abs(a['c']-b['c']).mean(2)[u].mean())
print('steps:',[(i+1,round(seam(G[i],G[i+1])[0],2),round(seam(G[i],G[i+1])[1])) for i in range(0,40)])
print('cx',[round(g['cx']) for g in G]); print('y1',[g['y1'] for g in G][:30])
print('--- cuts f_i -> f_j (i<=6)')
res=[(seam(G[i],G[j]),i+1,j+1) for i in range(0,7) for j in range(i+2,40)]
for (s,i,j) in sorted(res,key=lambda t:-t[0][0])[:12]: print(f'f{i}->f{j} {s[0]:.3f} {s[1]:.1f}')
print('--- G3 -> RUN joins (4-frame phase)')
out=[]
for i in range(8,73):
    for n in range(44,99):
        s0=seam(G[i],R[n]); pr=[seam(G[i-k],R[n-k]) for k in (1,2,3)]
        out.append((np.mean([s0[0]]+[p[0] for p in pr]),s0[0],s0[1],i+1,n))
out.sort(reverse=True)
for o in out[:20]: print('f%d->#%d join %.3f/%.1f phase4 %.3f'%(o[3],o[4],o[1],o[2],o[0]))
print('early (k<=36):')
for o in [o for o in out if o[3]<=36][:10]: print('f%d->#%d join %.3f/%.1f phase4 %.3f'%(o[3],o[4],o[1],o[2],o[0]))
