from hy_load import *
import pickle, json, os, subprocess
from PIL import ImageDraw
from rs_previews import lab, mp4
d=pickle.load(open('hy_M.pkl','rb')); CXc=d['cx']; CXr=d['Rcx']
W=9
SC=207/1276; V0=171.7; FPS=24
R=lambda a,b: list(range(a,b+1))
VAR={
 'V1_full':      [('c',i) for i in R(1,51)]+[('r',n) for n in R(58,63)],
 'V2_via69':     [('c',i) for i in R(1,51)]+[('r',n) for n in R(69,86)],
 'V3_via90':     [('c',i) for i in R(1,49)],
 'V4_short90':   [('c',1)]+[('c',i) for i in R(7,12)]+[('c',i) for i in R(22,49)],
 'V5_short67':   [('c',1)]+[('c',i) for i in R(7,12)]+[('c',i) for i in R(22,40)]+[('r',n) for n in R(67,86)],
}
# what follows the acceleration part: real frames to 98 then loop (V1: 87.. directly)
TAIL={'V1_full':R(87,98),'V2_via69':R(87,98),'V3_via90':R(90,98),'V4_short90':R(90,98),'V5_short67':R(87,98)}
LOOP=R(87,98)*6
def frame(k,n): return clip[n-1] if k=='c' else run[n]
def cxof(k,n): return CXc[n-1] if k=='c' else CXr[n]
def smooth(x,w):
    k=np.ones(w)/w; xp=np.pad(x,(w//2,w-1-w//2),mode='edge'); return np.convolve(xp,k,'valid')
def analyse(name):
    acc=VAR[name]; seq=acc+[('r',n) for n in TAIL[name]]+[('r',n) for n in LOOP]
    D=len(acc); T=D/FPS
    cx=np.array([cxof(k,n) for k,n in seq]); t=np.arange(len(seq))/FPS
    # clip part (C ramp) = frames before first real frame
    nc=next((i for i,(k,_) in enumerate(seq) if k=='r'),len(seq))
    u=np.clip(np.arange(len(seq))/FPS/T,0,1)
    E=np.where(t<=T,(V0*T/2)*(2*u**3-u**4),(V0*T/2)+V0*(t-T))
    # proportional compensation over the clip part
    uc=np.clip(np.arange(len(seq))/max(nc,1),0,1); Cp=125*(1-(2*uc**3-uc**4)); Cp[nc:]=0
    X=E+cx-736+Cp                       # screen position relative to stand centre
    return dict(seq=seq,D=D,T=T,cx=cx,E=E,Cp=Cp,X=X,nc=nc,t=t)
def slide(a,upto):
    X=a['X']; lp=smooth(X,W); v=np.gradient(lp)*FPS     # px/s src
    vmin=v[:upto].min(); neg=(v[:upto]<-1).sum(); back=0.0
    run_max=np.maximum.accumulate(lp[:upto]); back=(run_max-lp[:upto]).max()   # deepest give-back of position
    return vmin,neg,back
out={}
for nm in VAR:
    a=analyse(nm); upto=a['D']+12
    vmin,neg,back=slide(a,upto)
    # monotone-fix cost: extra shift needed to make lp position non-decreasing (running max), foot-skate speed
    lp=smooth(a["X"],W); mono=np.maximum.accumulate(lp); extra=mono-lp
    ex=extra[:upto]; exv=np.abs(np.gradient(smooth(ex,W))*FPS)
    # joins
    joins=[]
    for i in range(1,len(a['seq'][:upto])):
        (k1,n1),(k2,n2)=a['seq'][i-1],a['seq'][i]
        if (k1==k2 and n2==n1+1): continue
        joins.append(((k1,n1),(k2,n2)))
    out[nm]=dict(frames_acc=a['D'],sec_acc=round(a['T'],2),vmin=round(float(vmin),1),neg_frames=int(neg),back=round(float(back),1),max_extra=round(float(ex.max()),1),max_skate=round(float(exv.max()),1),joins=[(f'{x[0]}{x[1]}',f'{y[0]}{y[1]}') for x,y in joins],cx_min=float(a['cx'][:a['D']].min()),cx_end=float(a['cx'][a['D']-1]))
    print(nm,json.dumps(out[nm],ensure_ascii=False))
json.dump(out,open('hy_drift.json','w'),indent=1)
# baseline: loop only, constant engine speed
lp=smooth(np.array([CXr[n] for n in LOOP]),W); v=(np.gradient(lp)*FPS+V0); print('loop baseline min net v',round(float(v[12:-12].min()),1))
