from hy_load import *
import pickle
d=pickle.load(open('hy_M.pkl','rb'))
def feats(a):
    c,m,al=prep(a); return dict(c=c,m=m)
C=[feats(a) for a in clip]
def seam(a,b):
    u=a['m']|b['m']; return (a['m']&b['m']).sum()/max(u.sum(),1), np.abs(a['c']-b['c']).mean(2)[u].mean()
print('clip own steps (i->i+1):')
print([ (i+1, round(seam(C[i],C[i+1])[0],2), round(seam(C[i],C[i+1])[1],0)) for i in range(0,72)])
print('f1->fk:',[(k+1,round(seam(C[0],C[k])[0],2),round(seam(C[0],C[k])[1],0)) for k in range(0,45)])
