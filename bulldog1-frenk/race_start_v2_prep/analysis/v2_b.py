from hy_load import *
def stats(a):
    m=a[...,3]>200; rgb=a[...,:3][m].astype(float); 
    ys,xs=np.nonzero(m); top=ys.min(); body=m.copy(); 
    return rgb.mean(0).round(1), np.percentile(rgb.sum(1)/3,[10,50,90]).round(0)
for lab_,a in [('stand',stop[-1]),('f1',clip[0]),('f6',clip[5]),('f10',clip[9]),('f12',clip[11]),('f14',clip[13]),('f20',clip[19]),('f26',clip[25]),('f40',clip[39]),('f49',clip[48]),('f73',clip[72]),('run90',run[90]),('run87',run[87]),('run95',run[95])]:
    print(lab_,*stats(a))
