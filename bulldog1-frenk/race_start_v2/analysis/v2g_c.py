import sys; sys.path.insert(0,'.')
import numpy as np, pickle
d=pickle.load(open('v2g_feats.pkl','rb')); V=d['V']; R=d['R']
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), float(np.abs(a['c']-b['c']).mean(2)[u].mean())
out=[]
for i in range(24,73):          # V2 frame index (0-based) used last
    for n in range(44,99):
        s0=seam(V[i],R[n]); 
        # continuity: same-lag pairs behind the join
        pr=[seam(V[i-k],R[n-k]) for k in (1,2,3)]
        iou=np.mean([s0[0]]+[p[0] for p in pr]); 
        # forward: next real frame vs next V2 frame (phase agreement ahead)
        nx=seam(V[min(i+1,72)],R[min(n+1,98)])
        out.append((iou,s0[0],s0[1],i+1,n,nx[0]))
out.sort(reverse=True)
for o in out[:25]: print('f%d->#%d  join IoU %.3f rgb %.1f | 4-frame phase agreement %.3f | next-pair %.3f'%(o[3],o[4],o[1],o[2],o[0],o[5]))
