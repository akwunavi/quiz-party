import sys; sys.path.insert(0,'.')
import numpy as np, pickle
d=pickle.load(open('v2g_feats.pkl','rb')); V=d['V']; R=d['R']; C1=d['C1']
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), float(np.abs(a['c']-b['c']).mean(2)[u].mean())
print('--- V1f16 / V2 f_i -> V2 f_j (cut crouch), IoU>=0.6')
res=[]
for i in list(range(0,20)):
    for j in range(i+2,48):
        s=seam(V[i],V[j]); res.append((s[0],s[1],i+1,j+1))
good=[r for r in res if r[0]>=0.70 and r[1]<=45 and r[3]>=20]
for r in sorted(good,key=lambda t:(-t[0]))[:25]: print('f%d->f%d %.3f %.1f'%(r[2],r[3],r[0],r[1]))
print('--- V2 f_i -> real RUN #n')
res=[]
for i in range(0,73):
    for n in range(40,99):
        s=seam(V[i],R[n]); res.append((s[0],s[1],i+1,n))
for r in sorted([r for r in res if r[0]>=0.80 and r[1]<=34],key=lambda t:(t[2],-t[0])): print('f%d->#%d %.3f %.1f'%(r[2],r[3],r[0],r[1]))
