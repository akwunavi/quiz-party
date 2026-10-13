from v2h_load import *
import pickle
def feats(a):
    c,m,al=prep(a); ys,xs=np.nonzero(al); return dict(c=c,m=m,cx=xs.mean(),x0=xs.min(),x1=xs.max(),y1=ys.max())
V=[feats(a) for a in v2]; R={n:feats(a) for n,a in run.items() if n<=98}
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), float(np.abs(a['c']-b['c']).mean(2)[u].mean())
steps=[seam(V[i],V[i+1]) for i in range(72)]
print('V2 steps IoU/rgb:',[(i+1,round(s[0],2),round(s[1])) for i,s in enumerate(steps)])
print('V2 cx',[round(f['cx']) for f in V]); print('V2 y1',[f['y1'] for f in V][:30])
out=[]
for i in range(24,73):
    for n in range(44,99):
        s0=seam(V[i],R[n]); pr=[seam(V[i-k],R[n-k]) for k in (1,2,3)]
        out.append((np.mean([s0[0]]+[p[0] for p in pr]),s0[0],s0[1],i+1,n))
out.sort(reverse=True)
for o in out[:20]: print('f%d->#%d join %.3f/%.1f phase4 %.3f'%(o[3],o[4],o[1],o[2],o[0]))
pickle.dump(dict(V=[{k:v for k,v in f.items() if k!='c'} for f in V],out=out[:200]),open('v2h_res.pkl','wb'))
