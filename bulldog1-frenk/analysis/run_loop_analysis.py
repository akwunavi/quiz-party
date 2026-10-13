import numpy as np
from PIL import Image
def load(n,sz=(638,360)):
    return np.array(Image.open(f'b/full/f{n-39:03d}.png').convert('RGBA').resize(sz,Image.LANCZOS)).astype(np.float32)
C={n:load(n) for n in range(40,121)}
def mk(n): return C[n][:,:,3]>128
def feat(n):
    m=mk(n); ys,xs=np.nonzero(m)
    x0,x1=xs.min(),xs.max(); w=x1-x0
    head=m[:, int(x0+0.62*w):]            # передняя треть корпуса: голова/уши/передние лапы
    hy,hx=np.nonzero(head)
    return dict(front=x1, rear=x0, top=ys.min(), bot=ys.max(), headtop=hy.min(), headcy=hy.mean(), cx=xs.mean(), cy=ys.mean(), area=m.sum())
def step(a,b):
    fa,fb=feat(a),feat(b); return np.array([fb[k]-fa[k] for k in ('front','rear','top','bot','headtop','headcy','cx','cy')])
def rgbd(a,b):
    ma,mb=mk(a),mk(b); u=ma&mb
    return np.abs(C[a][:,:,:3]-C[b][:,:,:3]).mean(axis=2)[u].mean()
def iou(a,b): return (mk(a)&mk(b)).sum()/(mk(a)|mk(b)).sum()
for s,L in((87,12),(95,12),(75,12),(99,12)):
    e=s+L
    inl=[step(n,n+1) for n in range(s,e-1)]
    seam=step(e-1,s)   # последний кадр цикла -> первый
    inn=np.abs(np.array(inl))
    names=('front','rear','top','bot','headtop','headcy','cx','cy')
    print(f"loop #{s}-{e-1}: seam jump vs in-loop max step (px @638w)")
    print("  "," ".join(f"{k}:{abs(v):.0f}/{m:.0f}" for k,v,m in zip(names,seam,inn.max(0))))
    print("  rgb seam %.1f vs in-loop mean %.1f max %.1f ; IoU seam %.3f vs in-loop mean %.3f min %.3f ; first-vs-(last+1) IoU %.3f"%(rgbd(e-1,s),np.mean([rgbd(n,n+1) for n in range(s,e-1)]),max(rgbd(n,n+1) for n in range(s,e-1)),iou(e-1,s),np.mean([iou(n,n+1) for n in range(s,e-1)]),min(iou(n,n+1) for n in range(s,e-1)),iou(s,e)))
# stability: сколько кадров цикла повторяются между соседними циклами (по ключевым точкам)
for s in (87,95):
    d=[]
    for k in range(12):
        a,b=s+k,s+k+12
        if b<=120: d.append((np.abs(step(a,b)[:6]).max()))
    print("cycle-to-cycle feature offset (max over feat) per phase, loop start",s,[int(x) for x in d])

print("=== cut search: ...a | b(loop 87..98)")
lim=dict(zip(('front','rear','top','bot','headtop','headcy','cx','cy'),(21,28,15,26,16,19,10,10)))
names=tuple(lim)
ok=[]
for a in range(46,87):
    for b in range(87,99):
        st=np.abs(step(a,b)); r=rgbd(a,b); io=iou(a,b)
        over=[k for k,v in zip(names,st) if v>lim[k]]
        score=(1-io)*100+ r*0.5 + st.sum()*0.2
        ok.append((len(over),score,a,b,io,r,over))
ok.sort()
for o in ok[:12]: print("a=%d b=%d over=%d score %.1f IoU %.3f rgb %.1f %s"%(o[2],o[3],o[0],o[1],o[4],o[5],o[6]))
print("earliest a with zero over-limit features:",sorted(set(o[2] for o in ok if o[0]==0))[:6])
best=[o for o in ok if o[0]==0]
best.sort(key=lambda o:(o[2],o[1])); print([ (o[2],o[3],round(o[4],3),round(o[5],1)) for o in best[:6]])
print("=== seams")
for a,b in((53,87),(64,87),(47,93)):
    print("seam #%d -> #%d: IoU %.3f rgb %.1f steps %s | ordinary adj near #%d: IoU %.3f rgb %.1f"%(a-1,b,iou(a-1,b),rgbd(a-1,b),dict(zip(names,[int(x) for x in step(a-1,b)])),a-1,iou(a-1,a),rgbd(a-1,a)))
