from hy_load import *
def paws(a,strip=22):
    m=a[...,3]>127; ys,xs=np.nonzero(m); y1=ys.max(); s=m[y1-strip:y1+1]; yy,xx=np.nonzero(s)
    # split into clusters by gaps >25px
    xs_=np.unique(xx); groups=[]; cur=[xs_[0]]
    for x in xs_[1:]:
        if x-cur[-1]>20: groups.append(cur); cur=[x]
        else: cur.append(x)
    groups.append(cur)
    return [(g[0]+0,g[-1]) for g in groups if len(g)>8]
print('stand',paws(stop[-1]))
for i in [0,3,5,6,7,8,9,10,11,12,13,15,19,25]: print('f%d'%(i+1),paws(clip[i]))
