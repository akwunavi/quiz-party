from hy_load import *
from hy_sheet import sheet
def feats(a):
    c,m,al=prep(a); ys,xs=np.nonzero(al); return dict(c=c,m=m,cx=xs.mean(),x0=xs.min(),x1=xs.max(),y1=ys.max())
C=[feats(a) for a in clip]; S=feats(stop[-1])
def seam(a,b):
    u=a['m']|b['m']; return round((a['m']&b['m']).sum()/u.sum(),3), round(float(np.abs(a['c']-b['c']).mean(2)[u].mean()),1)
print('stand(unshifted) cx',S['cx'],S['x0'],S['x1'],S['y1'])
for i in range(0,14): print('f%d'%(i+1),'cx %.0f x0 %d x1 %d y1 %d'%(C[i]['cx'],C[i]['x0'],C[i]['x1'],C[i]['y1']))
for a,b in [(1,7),(1,8),(6,11),(6,12),(7,11),(7,12),(8,12),(9,12),(10,12),(11,12),(6,7),(7,8),(8,9),(9,10),(10,11)]: print(f'f{a}->f{b}',seam(C[a-1],C[b-1]))
sheet([(f'f{k}',clip[k-1]) for k in [1,5,6,7,8,9,10,11,12,13,14,16]],'v2_f1_16.png',cols=6,crop=(200,40,1000,700),sc=0.55)
