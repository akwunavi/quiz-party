# Монтаж STOP Зефира v1: RUN #89-#96 -> STOP v2 k27..k39 -> обратная связка r30..r24 -> r22..r4 (каждый 3-й) -> RACE_STAND #30.
# Входы: кадры исходника RUN (f%03d = #n+1), STOP v2 (k%03d), связки rev v1 (r%03d), все 1276x720.
# Сдвиги спрайта (исх. px) — только локальная визуальная компенсация, мировая координата не трогается.
import sys,json,numpy as np
from PIL import Image
SRC,K,R,LAST,OUT=sys.argv[1:6]
SEAM=49   # r30 должен стоять на +8 игровых px (≈ +49 исх. px) правее k39; делим поровну: k уходит на -24, r приходит с +24
seq=[]
for n in range(89,97): seq.append(('RUN#%d'%n,f'{SRC}/f{n+1:03d}.png',0))
ks=list(range(27,40))
for k in ks:
    t=max(0,(k-31)/(39-31)) if k>=31 else 0
    seq.append(('k%d'%k,f'{K}/k{k:03d}.png',round(-SEAM/2*t)))
rs=list(range(30,23,-1))+list(range(22,0,-3))   # r30..r24, затем r22,r19,..,r4
for i,r in enumerate(rs):
    t=i/(len(rs)-1)
    seq.append(('r%d(rev)'%r,f'{R}/r{r:03d}.png',round(SEAM/2*(1-t))))
seq.append(('RACE_STAND #30',LAST,0))
json.dump([dict(label=a,file=b.split('/')[-1],shift_src_px=c) for a,b,c in seq],open(OUT+'/montage_list.json','w'),indent=0)
print(len(seq),'кадров')
for i,(lab,f,dx) in enumerate(seq):
    a=np.asarray(Image.open(f).convert('RGB'));b=np.roll(a,dx,1)
    if dx>0:b[:,:dx]=a[:,:1]
    elif dx<0:b[:,dx:]=a[:,-1:]
    Image.fromarray(b).save(f'{OUT}/frames/m{i:03d}.png')
