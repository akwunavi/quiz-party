# frame metadata (alpha centroid, ground line, leading paw x) for every source frame used in the track diagnostic
import sys; sys.path.insert(0,'.')
import numpy as np, json
from hy_load import *
g3=[rd(f'alpha_pipeline/work/rs_g3/rgba/r{i:04d}.png') for i in range(73)]
def meta(a):
    m=a[...,3]>127; ys,xs=np.nonzero(m); y1=int(ys.max())
    s=m[y1-22:y1+1]; cols=np.nonzero(s.any(0))[0]
    g=[];cur=[cols[0]]
    for x in cols[1:]:
        if x-cur[-1]>20: g.append((int(cur[0]),int(cur[-1]))); cur=[x]
        else: cur.append(x)
    g.append((int(cur[0]),int(cur[-1])))
    return dict(cx=round(float(xs.mean()),2),y1=y1,x0=int(xs.min()),x1=int(xs.max()),paw=g[-1][0],paw1=g[-1][1])
M={}
for n in range(87,99): M[f'run{n}']=meta(run[n])
M['run90']=meta(run[90])
for i,s in enumerate(stop): M[f'stop{i+1}']=meta(s)
M['stand']=meta(stop[-1])
for k in [1,7,8,9,10,11,16]: M[f'v1f{k}']=meta(clip[k-1])
for k in range(2,38): M[f'g3f{k}']=meta(g3[k-1])
json.dump(M,open('td_meta.json','w'))
print(len(M),M['stand'],M['v1f1'],M['g3f37'],M['run90'])
