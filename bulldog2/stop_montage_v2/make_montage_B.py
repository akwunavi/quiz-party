# STOP Зефира, вариант B: RUN #89-#96 -> STOP v2 k27..k40 (торможение) -> STOP v1 k66..k73 (подъём в стойку) -> RACE_STAND #30 x7.
# Входы: SRC=f%03d (RUN, #n = f(n+1)), V2=k%03d (STOP v2), V1=k%03d (STOP v1), LAST=#30 (+44). Все 1276x720.
# Сдвиги спрайта — локальная компенсация: STOP v1 k66 стоит на ≈2 игровых px (≈12 исх. px) левее, чем требует стык с v2 k40;
# сдвиг +12 плавно гаснет к k73 (k73 уже совпадает с #30).
import sys,json,numpy as np
from PIL import Image
SRC,V2,V1,LAST,OUT=sys.argv[1:6]
seq=[('RUN#%d'%n,f'{SRC}/f{n+1:03d}.png',0) for n in range(89,97)]
seq+=[('v2 k%d'%k,f'{V2}/k{k:03d}.png',0) for k in range(27,41)]
js=list(range(66,74))
seq+=[('v1 k%d'%j,f'{V1}/k{j:03d}.png',round(12*(1-i/(len(js)-1)))) for i,j in enumerate(js)]
seq+=[('RACE_STAND #30',LAST,0)]*(37-len(seq))
json.dump([dict(label=a,file=b.split('/')[-1],shift_src_px=c) for a,b,c in seq],open(OUT+'/montage_list.json','w'),indent=0)
print(len(seq),'кадров')
for i,(lab,f,dx) in enumerate(seq):
    a=np.asarray(Image.open(f).convert('RGB'));b=np.roll(a,dx,1)
    if dx>0:b[:,:dx]=a[:,:1]
    elif dx<0:b[:,dx:]=a[:,-1:]
    Image.fromarray(b).save(f'{OUT}/frames/m{i:03d}.png')
