#!/usr/bin/env python3
"""STOP visual test, step 3: measurements on the same timelines the video is rendered from (body world motion, paw contacts, transitions, timing).
usage: measure_stop_demo.py TIMELINES.json OUT.json OUT.png --dog4-assets DIR --decoded DIR --run-frames PATTERN
"""
import sys,os,json,re
import numpy as np
from PIL import Image
arg=lambda n,d=None: sys.argv[sys.argv.index(n)+1] if n in sys.argv else d
tl=json.load(open(sys.argv[1])); D4=arg('--dog4-assets'); DEC=arg('--decoded'); RUN=arg('--run-frames')
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
L=tl['layout']; SC=L['spriteWidth']/1276; SC4=L['spriteWidth']/178
man=json.load(open(f'{REPO}/dog4-v3-lab/manifest.json'))
def fpath(label):
    kind,n=re.match(r'(v1f|g3f|run|stop|bf)(\d+)$',label).groups();n=int(n)
    return {'v1f':f'{DEC}/start1/f{n:03d}.png','g3f':f'{DEC}/gen3/f{n:03d}.png','run':RUN%(n-39),'stop':f'{DEC}/stop/f{n:03d}.png','bf':f'{DEC}/bf/f{n:03d}.png'}[kind]
mcache={}
def fmask(label):
    if label=='RACE_STAND': label='bf93'
    if label not in mcache: mcache[label]=np.asarray(Image.open(fpath(label)))[...,3]>128
    return mcache[label]
sheets={}
def dmask(clip,frame):
    if clip not in sheets: sheets[clip]=np.asarray(Image.open(f'{D4}/{man["clips"][clip]["file"].split("/")[-1]}').convert('RGBA'))[...,3]>128
    w,h,c=man['cellWidth'],man['cellHeight'],man['columns']; return sheets[clip][(frame//c)*h:(frame//c)*h+h,(frame%c)*w:(frame%c)*w+w]
cen=lambda m:float(np.nonzero(m)[1].mean())
def iou(a,b): return float((a&b).sum()/max(1,(a|b).sum()))
def shifted(m,dx):
    o=np.zeros_like(m); dx=int(round(dx))
    if dx>=0: o[:,dx:]=m[:,:m.shape[1]-dx]
    else: o[:,:dx]=m[:,-dx:]
    return o
def clusters(mask,yb,band=6,gap=6,minw=5):
    xs=np.where(mask[max(0,yb-band):yb+1].any(0))[0]
    if len(xs)==0: return []
    o=[];s=p=xs[0]
    for x in xs[1:]:
        if x-p>gap:o.append((int(s),int(p)));s=x
        p=x
    o.append((int(s),int(p)));return [(a,b) for a,b in o if b-a>=minw]
def stance_episodes(masks,ticks_x,scale,tol=7):
    """masks: list of (key,mask) in clip order; ticks_x: world anchor x (canvas px) at the moment each frame is shown. Returns episodes with world slide of the leading contact."""
    bottoms=[int(np.where(m.any(1))[0].max()) for _,m in masks]; ground=int(np.median(bottoms[-12:]))
    rows=[]
    for (k,m),x,yb in zip(masks,ticks_x,bottoms):
        st=yb>=ground-tol; rows.append(dict(k=k,x=x,stance=st,cl=clusters(m,yb) if st else []))
    eps=[];cur=[]
    for r in rows:
        if r['stance'] and r['cl']: cur.append(r)
        elif cur: eps.append(cur);cur=[]
    if cur: eps.append(cur)
    res=[]
    for ep in eps:
        xs=[];px=None
        for r in ep:
            cs=[((a+b)/2) for a,b in r['cl']]
            c=max(cs) if px is None else min(cs,key=lambda q:abs(q-px)); xs.append(c);px=c
        world=[r['x']+c*scale for r,c in zip(ep,xs)]
        sp=[abs(world[i]-world[i-1]) for i in range(1,len(world))]
        res.append(dict(frames=[ep[0]['k'],ep[-1]['k']],worldSlide=round(world[-1]-world[0],2),maxFootSpeedPxPerFrame=round(max(sp+[0]),2),steps=[(ep[i]['k'],round(world[i]-world[i-1],3)) for i in range(1,len(ep))]))
    return res
OUT={'seed':tl['seed'],'lane0':tl['lane0'],'variants':{}}
series={}
for key,v in tl['variants'].items():
    T=v['ticks'];ph=v['physical'];stopS=ph['stopStart'];tEngStop=ph['stopEnd']-stopS
    body=[];lab=[]
    for r in T:
        if key=='REF': m=dmask(r['clip'],r['frame']);b=r['x']+cen(m)*SC4;lab.append((r['clip'],r['frame']))
        else: m=fmask(r['label']);b=r['x']+(cen(m)+(r.get('shiftSrc') or 0))*SC;lab.append(r['label'])
        body.append(b)
    body=np.array(body);tr=np.array([r['tRel'] for r in T]);d=np.diff(body)           # px per tick
    brake0=int(np.argmin(abs(tr)))
    # action start (first tick of the BUTTERFLY window) and START start
    ia=next(i for i,r in enumerate(T) if (r.get('clip')=='BUTTERFLY' if key=='REF' else str(r.get('label','')).startswith('bf')));ist=next(i for i,r in enumerate(T) if r['window']=='START' and r['tRel']>0)
    last_move=max((i for i in range(brake0,ia) if abs(d[i])>0.15),default=brake0)
    bodyStopT=float(tr[last_move+1]) if last_move+1<len(tr) else None
    eng=np.array([r['x'] for r in T]);
    res=dict(name=v['name'],physical=dict(stopSeconds=round(ph['stopSeconds'],4),actionWindowSeconds=round(ph['actionSeconds'],4),engineTravelInStopPx=round(ph['engineTravelInStopPx'],1),crossingSeconds=round(ph['crossing'],3)),
      timing=dict(actionClipStartsAt_s=round(float(tr[ia]),3),actionWindowOpensAt_s=round(tEngStop,3),engineStopsAt_s=round(tEngStop,3),bodyLastMovesAt_s=round(bodyStopT,3) if bodyStopT is not None else None,
                  gapEngineStopToActionClip_s=round(float(tr[ia])-tEngStop,3),startWindowBeginsAt_s=round(float(tr[ist]),3)),
      body=dict(travelBrakeStartToActionPx=round(float(body[ia]-body[brake0]),1),engineTravelPx=round(float(eng[ia]-eng[brake0]),1),
                bodyOvershootBeyondEngineStopPx=round(float(body[ia]-body[brake0])-(float(eng[ia]-eng[brake0])),1),
                peakBodySpeedPxPerFrame=round(float(d[brake0:ia].max()),2),bodyMovesAfterEngineStop_s=round(max(0.0,(bodyStopT or tEngStop)-tEngStop),3)))
    # paw contacts over the STOP clip, using the world anchor at the moment each frame is shown
    if key=='REF':
        idx=[(i,r) for i,r in enumerate(T) if r['window']=='STOP']
        masks=[(r['frame']+1,dmask('STOP',r['frame'])) for i,r in idx]; xs=[r['x'] for i,r in idx]; scale=SC4
    else:
        idx=[(i,r) for i,r in enumerate(T) if str(r.get('label','')).startswith('stop')]
        masks=[(int(r['label'][4:]),fmask(r['label'])) for i,r in idx]; xs=[r['x'] for i,r in idx]; scale=SC
    eps=stance_episodes(masks,xs,scale)
    tmap={(r['frame']+1 if key=='REF' else int(r['label'][4:])):r['tRel'] for i,r in idx}
    for e in eps:
        e['slideBeforeEngineStop']=round(sum(dx for kk,dx in e['steps'] if tmap[kk]<tEngStop-1e-6),2); e['slideAfterEngineStop']=round(sum(dx for kk,dx in e['steps'] if tmap[kk]>=tEngStop-1e-6),2); e.pop('steps')
    for e in eps:
        k1=e['frames'][1]; tk=next(r['tRel'] for i,r in idx if (r['frame']+1 if key=='REF' else int(r['label'][4:]))==k1)
        e['endsAt_s']=round(tk,3);e['engineMoving']=bool(tk<tEngStop-1e-6)
    res['pawContacts']=dict(episodes=eps,
        slideBeforeEngineStopPx=round(sum(abs(e['slideBeforeEngineStop']) for e in eps),1),slideAfterEngineStopPx=round(sum(abs(e['slideAfterEngineStop']) for e in eps),1),totalSlidePx=round(sum(abs(e['worldSlide']) for e in eps),1))
    # transitions
    if key=='REF': 
        a=dmask('STOP',36);b=dmask('BUTTERFLY',0);res['transitionStopToAction']=dict(silhouetteIoU=round(iou(a,b),3),bodyStepPx=round((cen(b)-cen(a))*SC4,2))
    else:
        a=fmask('stop73');b=fmask('bf1');a2=fmask('bf93');b2=shifted(fmask('v1f1'),125)
        res['transitionStopToAction']=dict(silhouetteIoU=round(iou(a,b),3),bodyStepPx=round((cen(b)-cen(a))*SC,2))
        res['transitionActionToStart']=dict(silhouetteIoU=round(iou(a2,b2),3),bodyStepPx=round((cen(b2)-cen(a2))*SC,2),note='v1f1 shifted +125 src px (the START baseline)')
    tot=float(body[ia]-body[brake0]);t95=next((float(tr[i]) for i in range(brake0,ia) if body[i]-body[brake0]>=0.95*tot),None);res['body']['timeTo95PercentOfTravel_s']=round(t95,3) if t95 is not None else None
    OUT['variants'][key]=res; series[key]=(tr[1:],d*24,eng,tEngStop,eps,body,tr)
# reference level of foot sweep in RUN (Frenk #87-98 loop, Bulldog 4 RUN loop) in canvas px per frame
def run_speed(masks,scale):
    ep=stance_episodes([(i,m) for i,m in enumerate(masks)],[0]*len(masks),scale); return ep
fr=[np.asarray(Image.open(RUN%(n-39)))[...,3]>128 for n in range(87,99)]*2
e1=stance_episodes([(i,m) for i,m in enumerate(fr)],[0]*len(fr),SC)
sp1=[e['maxFootSpeedPxPerFrame'] for e in e1]
d4=[dmask('RUN',f) for f in range(11,23)]*2
e4=stance_episodes([(i,m) for i,m in enumerate(d4)],[0]*len(d4),SC4); sp4=[e['maxFootSpeedPxPerFrame'] for e in e4]
OUT['runReferenceFootSweep']=dict(frenk_RUN_max_px_per_frame_median=round(float(np.median(sp1)),2) if sp1 else None,dog4_RUN_max_px_per_frame_median=round(float(np.median(sp4)),2) if sp4 else None,
    engineCruisePxPerFrame=round(1170/42/24,2),note='local foot speed in the sprite (no engine); Frenk RUN frames are from the working scratch decode (outside this branch)')
json.dump(OUT,open(sys.argv[2],'w'),indent=1)
import matplotlib;matplotlib.use('Agg');import matplotlib.pyplot as plt
fig,ax=plt.subplots(2,1,figsize=(13,8),sharex=True);col={'REF':'#444','A':'#d94a4a','B':'#e0a020','C':'#3a7bd5'}
for k,(t,s_,eng,te,eps,body,tr) in series.items():
    b0=int(np.argmin(abs(tr)));ax[0].plot(tr,body-body[b0],color=col[k],lw=1.8,label=f'{k}: sprite body, travel from brake start')
    ax[0].plot(tr,eng-eng[b0],color=col[k],lw=1,ls='--',alpha=.7);ax[0].axvline(te,color=col[k],ls=':',lw=1)
ax[0].set_xlim(-0.5,4.5);ax[0].set_ylim(-8,70);ax[0].set_ylabel('canvas px');ax[0].legend(loc='upper left');ax[0].set_title('Travel from brake start: solid = sprite body (anchor + clip motion), dashed = physical anchor (engine), dotted = engine stop. t=0 is brake start')
for k,(t,s_,eng,te,eps,body,tr) in series.items():
    if k=='REF': continue
    y={'A':2,'B':1,'C':0}[k]
    for e in eps:
        n=e['frames'][1]-e['frames'][0]+1;left=e['endsAt_s']-(n-1)/24
        ax[1].barh(y,n/24,left=left,height=.6,color=col[k],alpha=.45 if e['engineMoving'] else .95,edgecolor='white')
        ax[1].text(left,y+.38,f"{e['worldSlide']:+.0f}px",fontsize=7,color='black')
    ax[1].plot([te,te],[y-.4,y+.4],color='k',lw=2)
ax[1].set_yticks([0,1,2]);ax[1].set_yticklabels(['C','B','A']);ax[1].set_xlabel('time from brake start, s');ax[1].set_title('Paw contacts of the STOP clip, world slide of the leading paw. Pale: engine still moving. Saturated: engine stopped. Black tick: engine stop')
fig.tight_layout();fig.savefig(sys.argv[3],dpi=100)
print(json.dumps({k:{kk:vv for kk,vv in v.items() if kk in('physical','timing','body')} for k,v in OUT['variants'].items()},indent=1))
