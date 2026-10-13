from hy_load import *
import pickle
def feats(a):
    c,m,al=prep(a); ys,xs=np.nonzero(al); return dict(c=c,m=m,cx=xs.mean(),x0=xs.min(),x1=xs.max(),y1=ys.max(),y0=ys.min())
C=[feats(a) for a in clip]; R={n:feats(a) for n,a in run.items()}; S0=feats(stop[-1])
def seam(a,b):
    u=a['m']|b['m']; i=(a['m']&b['m']).sum()/max(u.sum(),1)
    d=np.abs(a['c']-b['c']).mean(2)[u].mean(); return i,d
# baseline: consecutive run steps
base=[seam(R[n],R[n+1]) for n in range(87,98)]
print('base steps IoU mean %.3f min %.3f rgb mean %.1f max %.1f'%(np.mean([b[0] for b in base]),min(b[0] for b in base),np.mean([b[1] for b in base]),max(b[1] for b in base)))
M=np.zeros((73,99-40,2))
for i in range(73):
    for n in range(40,99):
        M[i,n-40]=seam(C[i],R[n])   # clip frame i (last used) -> real n (next)
pickle.dump(dict(M=M,cx=[c['cx'] for c in C],x0=[c['x0'] for c in C],x1=[c['x1'] for c in C],y1=[c['y1'] for c in C],Rcx={n:R[n]['cx'] for n in R},Rx0={n:R[n]['x0'] for n in R},Rx1={n:R[n]['x1'] for n in R}),open('hy_M.pkl','wb'))
# stand->clip
print('stand vs clip f_k:',[ (k+1,)+tuple(np.round(seam(S0,C[k]),3)) for k in range(0,45,3)])
cand=[]
for i in range(73):
    for n in range(40,99):
        iou,d=M[i,n-40]; cand.append((iou,d,i+1,n))
cand.sort(key=lambda t:-t[0])
print('top IoU:'); [print('f%d->#%d IoU %.3f rgb %.1f'%(c[2],c[3],c[0],c[1])) for c in cand[:25]]
ok=[c for c in cand if c[0]>=0.64 and c[1]<=27]
ok.sort(key=lambda t:t[2])
print('ok by earliest clip frame:'); [print('f%d->#%d IoU %.3f rgb %.1f'%(c[2],c[3],c[0],c[1])) for c in ok[:40]]
