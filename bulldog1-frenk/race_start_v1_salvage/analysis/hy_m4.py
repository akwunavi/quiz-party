from hy_load import *
def feats(a):
    c,m,al=prep(a); return dict(c=c,m=m)
C=[feats(a) for a in clip]
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), np.abs(a['c']-b['c']).mean(2)[u].mean()
res=[]
for i in range(6,30):
    for j in range(i+2,48):
        s=seam(C[i],C[j]); res.append((s[0],s[1],i+1,j+1))
ok=[r for r in res if r[0]>=0.75 and r[1]<=40]
print(len(ok)); 
for r in sorted(ok,key=lambda t:(t[2],-t[0]))[:60]: print('f%d->f%d %.3f %.1f'%(r[2],r[3],r[0],r[1]))
print('--- jumps to j>=26')
for r in sorted([r for r in res if r[3]>=26 and r[0]>=0.70 and r[1]<=45],key=lambda t:(-t[0])) [:40]: print('f%d->f%d %.3f %.1f'%(r[2],r[3],r[0],r[1]))
