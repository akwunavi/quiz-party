import sys; sys.path.insert(0,'.')
from hy_load import *
g3=[rd(f'alpha_pipeline/work/rs_g3/rgba/r{i:04d}.png') for i in range(73)]
def feats(a):
    c,m,al=prep(a); ys,xs=np.nonzero(al); return dict(c=c,m=m,cx=xs.mean(),y1=ys.max())
G=[feats(a) for a in g3]; R={n:feats(a) for n,a in run.items() if n<=98}
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), float(np.abs(a['c']-b['c']).mean(2)[u].mean())
print('G3 steps:',[(i+1,round(seam(G[i],G[i+1])[0],2),round(seam(G[i],G[i+1])[1])) for i in range(0,30)])
out=[]
for i in range(10,73):
    for n in range(44,99):
        s0=seam(G[i],R[n]); pr=[seam(G[i-k],R[n-k]) for k in (1,2,3)]
        out.append((np.mean([s0[0]]+[p[0] for p in pr]),s0[0],s0[1],i+1,n))
out.sort(reverse=True)
print('best overall'); [print('f%d->#%d join %.3f/%.1f phase4 %.3f'%(o[3],o[4],o[1],o[2],o[0])) for o in out[:8]]
print('early k<=40'); [print('f%d->#%d join %.3f/%.1f phase4 %.3f'%(o[3],o[4],o[1],o[2],o[0])) for o in [o for o in out if o[3]<=40][:10]]
