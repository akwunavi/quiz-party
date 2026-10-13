import sys; sys.path.insert(0,'.')
from v2h_load import *
import json, os, pickle
from hy_prev import lane_img
from hy_build import smooth
from PIL import ImageDraw
from rs_previews import lab, mp4
SC=207/1276; V0=171.7; FPS=24; W=9
JOIN_FRAME=64; JOIN_RUN=91
def cx_of(a):
    ys,xs=np.nonzero(a[...,3]>127); return float(xs.mean())
# --- timeline: (label, rgba, kind)
tl=[]
for n in list(range(87,99))+list(range(87,97)): tl.append((f'RUN #{n}',run[n],'run0'))          # run into stop (to #96)
for i,s in enumerate(stop): tl.append((f'STOP f{i+1}',s,'stop'))
for i in range(12): tl.append(('RACE_STAND',stop[-1],'stand'))
for k in [1,7,8,9,10,11,16]: tl.append((f'V1 f{k}',clip[k-1],'entry'))
CUT=int(os.environ.get('CUT','2'))
for k in range(CUT,JOIN_FRAME+1): tl.append((f'V2 f{k}',v2[k-1],'v2'))
tail=[91,92,93,94,95,96,97,98]+[n for _ in range(6) for n in range(87,99)]
for n in tail: tl.append((f'RUN #{n}',run[n],'run'))
N=len(tl); kinds=[k for _,_,k in tl]; cx=np.array([cx_of(a) for _,a,_ in tl])
# --- engine
E=np.zeros(N); t=np.arange(N)/FPS
iStop=kinds.index('stop'); iStand=kinds.index('stand'); iV2=kinds.index('v2'); iRun=kinds.index('run')
Ds=73/24
for i in range(N):
    if kinds[i]=='run0': E[i]=V0*t[i]
    elif kinds[i]=='stop':
        u=(i-iStop)/FPS/Ds; E[i]=V0*t[iStop]+(V0*Ds/2)*(2*u-2*u**3+u**4)
E_stop=V0*t[iStop]+V0*Ds/2
for i in range(iStand,N):
    if kinds[i] in('stand','entry'): E[i]=E_stop
# push-off at V2 f20
iPush=iV2+(max(20,CUT)-CUT)           # index of V2 f20
T2=(iRun-iPush)/FPS
for i in range(iStand,N):
    if i<iPush: E[i]=E_stop
    elif i<iRun:
        u=(i-iPush)/FPS/T2; E[i]=E_stop+(V0*T2/2)*(2*u**3-u**4)
    else: E[i]=E_stop+V0*T2/2+V0*(i-iRun)/FPS
# --- compensation: C=125 on stand->entry->V2 before push-off, 0 on stand? stand image already at 736 (C=0)
Cp=np.zeros(N); 
for i in range(N):
    if kinds[i] in('entry',) or (kinds[i]=='v2' and i<iPush): Cp[i]=125
# proportional diagnostic from push-off to join
for i in range(iPush,iRun):
    u=(i-iPush)/(iRun-iPush); Cp[i]=125*(1-(2*u**3-u**4))
X=E+cx-736+Cp
# derived: lower monotone envelope of smoothed X over push-off..join, floored at start
seg=slice(iPush,iRun+1); Xs=smooth(X,W)[seg]; rc=np.minimum.accumulate(Xs[::-1])[::-1]; Xt=np.maximum(rc,Xs[0]); extra=Xt-Xs; extra[0]=0; extra[-1]=0
ex=smooth(extra,5); ex[0]=0; ex[-1]=0
Copt=Cp.copy(); Copt[seg]+=ex
Xo=E+cx-736+Copt
def vel(Xa,lo,hi): return np.gradient(smooth(Xa,W))[lo:hi]*FPS
st=dict(frames=N,iPush=iPush,iRun=iRun,T2_s=round(T2,2),entry_s=round(7/24,2),v2_used_frames=JOIN_FRAME-1,
  prop_min_v=float(vel(X,iPush,iRun+12).min()),prop_giveback=float((np.maximum.accumulate(smooth(X,W)[iPush:iRun+12])-smooth(X,W)[iPush:iRun+12]).max()),
  opt_min_v=float(vel(Xo,iPush,iRun+12).min()),opt_giveback=float((np.maximum.accumulate(smooth(Xo,W)[iPush:iRun+12])-smooth(Xo,W)[iPush:iRun+12]).max()),
  max_extra_src=float(np.abs(ex).max()),max_extra_lab=float(np.abs(ex).max()*SC),peak_skate_src_s=float(np.abs(np.gradient(ex)*FPS).max()),peak_skate_lab_s=float(np.abs(np.gradient(ex)*FPS).max()*SC),
  X_at_push=float(X[iPush]),X_at_join=float(X[iRun]),net_fwd_src=float(X[iRun]-X[iPush]), cx_join_v2=float(cx[iRun-1]),cx_run91=float(cx[iRun]))
print(json.dumps(st,indent=1)); json.dump(st,open(os.environ.get('PFX','DOG1_RS_V2_FULL')+'_stats.json','w'),indent=1)
pickle.dump(dict(E=E,Cp=Cp,Copt=Copt,cx=cx,X=X,Xo=Xo,labels=[l for l,_,_ in tl],kinds=kinds),open('v2_game_arr.pkl','wb'))
if os.environ.get('RENDER'):
    d0=os.environ.get('OUTD','v2g_out'); os.makedirs(d0,exist_ok=True)
    for i,(l,a,k) in enumerate(tl):
        g=lab(comp(a))
        l1=lane_img(g,E[i],Cp[i],f'{i+1:03d} {l} | diag proportional C={Cp[i]:+.0f}'); l2=lane_img(g,E[i],Copt[i],f'{i+1:03d} {l} | derived from clip C={Copt[i]:+.0f}')
        S=Image.new('RGB',(700,300)); S.paste(l1,(0,0)); S.paste(l2,(0,150)); S.resize((1400,600),Image.BICUBIC).save(f'{d0}/lane{i:04d}.png')
        win=Image.new('RGB',(240,116),(190,186,192)); win.paste(g,(int(round(15+Copt[i]*SC)),0)); wd=ImageDraw.Draw(win); wd.line([(120,0),(120,116)],fill=(230,40,40))
        w4=win.resize((960,464),Image.BICUBIC); dd=ImageDraw.Draw(w4); dd.rectangle([0,0,640,13],fill=(0,0,0)); dd.text((3,1),f'{i+1:03d} {l} | derived C {Copt[i]:+.0f}; red = physical anchor',fill=(255,255,0)); w4.save(f'{d0}/follow{i:04d}.png')
        Image.fromarray(comp(a)).crop((150,20,1100,700)).save(f'{d0}/L{i:04d}.png')
    mp4(f'{d0}/lane%04d.png',os.environ.get('PFX','DOG1_RS_V2_FULL')+'_game_lanes_x2.mp4'); mp4(f'{d0}/follow%04d.png',os.environ.get('PFX','DOG1_RS_V2_FULL')+'_game_follow_x4.mp4'); mp4(f'{d0}/L%04d.png',os.environ.get('PFX','DOG1_RS_V2_FULL')+'_large_inplace.mp4')
