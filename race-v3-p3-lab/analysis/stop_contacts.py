#!/usr/bin/env python3
"""Paw-contact analysis of the approved Frenk STOP clip (73 frames) in the P3 'STOP -> stationary window' transition.
Reads the repo's STOP alpha (decoded with ffmpeg/libvpx-vp9) and frames_meta.json. Changes nothing, creates no assets except a chart.
usage: stop_contacts.py OUT_JSON OUT_PNG [--run-frames PATTERN --run-first N --run-count 12]   (RUN frames are optional and live OUTSIDE the repo)
"""
import sys, os, json, subprocess, tempfile, math
import numpy as np
from PIL import Image
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
WEBM=f'{REPO}/bulldog1-frenk/assets/approved/DOG1_STOP_v1_alpha.webm'
LAYOUT=json.load(open(f'{REPO}/dog4-v3-lab/layout.json'))
SC=LAYOUT['spriteWidth']/1276; COURSE=LAYOUT['finishX']-LAYOUT['startX']+LAYOUT['finishControlOffset']; V0=COURSE/42
META=json.load(open(f'{REPO}/bulldog1-frenk/track_diag/frames_meta.json'))
STOP_S=37/24; FPS=24; WIN=37                       # canonical STOP window = 37 frames; frames 38..73 are the tail (stationary window)
CATS={'VERY_SLOW':.75,'SLOW':.88,'NORMAL':1,'FAST':1.12,'VERY_FAST':1.25}
braking=lambda u:u-u**3+.5*u**4
def anchor(k,mult):                                 # engine anchor offset (canvas px) at STOP frame k (1-based), relative to frame 1
    u=min(1,(k-1)/WIN); return V0*mult*STOP_S/2*2*braking(u)
def load_stop():
    d=tempfile.mkdtemp(prefix='stop_dec_')
    subprocess.run(['ffmpeg','-v','error','-c:v','libvpx-vp9','-i',WEBM,'-pix_fmt','rgba',f'{d}/s%03d.png'],check=True)
    return [np.asarray(Image.open(f'{d}/s{i:03d}.png'))[...,3]>128 for i in range(1,74)]
def clusters(mask,yb,band=6,gap=6,minw=5):
    xs=np.where(mask[max(0,yb-band):yb+1].any(0))[0]
    if len(xs)==0: return []
    out=[];s=p=xs[0]
    for x in xs[1:]:
        if x-p>gap: out.append((int(s),int(p))); s=x
        p=x
    out.append((int(s),int(p)))
    return [(a,b) for a,b in out if b-a>=minw]
def contacts(masks,ground,tol=7):
    rows=[]
    for i,m in enumerate(masks,1):
        yb=int(np.where(m.any(1))[0].max()); st=yb>=ground-tol
        cl=clusters(m,yb) if st else []
        rows.append(dict(frame=i,yb=yb,stance=st,clusters=cl))
    return rows
def episodes(rows):
    ep=[];cur=[]
    for r in rows:
        if r['stance']: cur.append(r)
        elif cur: ep.append(cur);cur=[]
    if cur: ep.append(cur)
    return ep
def lead_cluster(r,prev_x=None):                    # the cluster that carries the contact; follow the previous one when possible
    cs=[((a+b)/2,b-a) for a,b in r['clusters']]
    if not cs: return None
    if prev_x is None: return max(cs,key=lambda c:c[0])[0]   # front-most paw first (largest x), sprite faces right
    return min(cs,key=lambda c:abs(c[0]-prev_x))[0]
def analyse(rows,mult):
    res=[];
    for ep in episodes(rows):
        xs=[];px=None
        for r in ep:
            x=lead_cluster(r,px);xs.append(x);px=x
        fr=[r['frame'] for r in ep]
        world=[anchor(f,mult)+(x*SC) for f,x in zip(fr,xs)]
        per=[dict(frame=f,x_src=round(x,1),local_dx_canvas=None if i==0 else round((x-xs[i-1])*SC,2),world_dx_canvas=None if i==0 else round(world[i]-world[i-1],2)) for i,(f,x) in enumerate(zip(fr,xs))]
        res.append(dict(frames=[fr[0],fr[-1]],phase='window' if fr[-1]<=WIN else ('tail' if fr[0]>WIN else 'crosses boundary'),
                        world_slide_canvas=round(world[-1]-world[0],2),local_slide_canvas=round((xs[-1]-xs[0])*SC,2),max_world_speed_px_per_frame=round(max([abs(p['world_dx_canvas']) for p in per if p['world_dx_canvas'] is not None]+[0]),2),steps=per))
    return res
def main():
    out_json,out_png=sys.argv[1],sys.argv[2]
    masks=load_stop(); ground=int(np.median([int(np.where(m.any(1))[0].max()) for m in masks[-15:]]))   # final stand ground row (RACE_STAND end of STOP)
    rows=contacts(masks,ground)
    res={'source':os.path.relpath(WEBM,REPO),'frames':73,'canonicalWindowFrames':WIN,'groundRow':ground,'scaleCanvasPerSrc':round(SC,5),'cruisePxPerFrame_NORMAL':round(V0/FPS,3)}
    res['stanceFrames']=[r['frame'] for r in rows if r['stance']]
    res['bottomRow']=[r['yb'] for r in rows]
    res['bodyCx_src']=[META[f'stop{i}']['cx'] for i in range(1,74)]
    cat={}
    for name,m in CATS.items(): cat[name]=analyse(rows,m)
    res['episodesByCategory']=cat
    # summary numbers (NORMAL)
    eps=cat['NORMAL']; settle=[e for e in eps if e['frames'][0]>=47][-1]
    tail_eps=[e for e in eps if e['frames'][0]>WIN]; win_eps=[e for e in eps if e['frames'][1]<=WIN]
    # foot-lock shift: continuous cumulative offset that would keep every stance foot world-stationary (NORMAL)
    S=0;lock=[0.0]*73;bodyWorld=[0.0]*73
    for k in range(1,74):
        r=rows[k-1]
        cx=META[f'stop{k}']['cx']
        lock[k-1]=S
        bodyWorld[k-1]=anchor(k,1.0)+(cx-META['stop1']['cx'])*SC+S
    S=0;pos={}
    # second pass with the actual locking rule
    prev_x=None;prev_f=None;S=0;lock=[0.0]*73
    for k in range(1,74):
        r=rows[k-1]
        if r['stance'] and prev_f==k-1 and r['clusters']:
            x=lead_cluster(r,prev_x); S-= ((anchor(k,1.0)-anchor(k-1,1.0))+(x-prev_x)*SC)   # make world foot dx = 0
            prev_x=x
        elif r['stance'] and r['clusters']: prev_x=lead_cluster(r,None)
        else: prev_x=None
        prev_f=k if r['stance'] else None
        lock[k-1]=S
        cx=META[f'stop{k}']['cx']; bodyWorld[k-1]=anchor(k,1.0)+(cx-META['stop1']['cx'])*SC+S
    res['footLock_NORMAL']={'shift_canvas_px_by_frame':[round(x,1) for x in lock],'shift_at_37':round(lock[36],1),'shift_at_73':round(lock[72],1),
                            'bodyWorldTravel_without_shift_at_73':round(anchor(73,1.0)+(META['stop73']['cx']-META['stop1']['cx'])*SC,1),
                            'bodyWorldTravel_with_footLock_at_73':round(bodyWorld[72],1)}
    def sl(es): return [round(e['world_slide_canvas'],1) for e in es]
    res['summary']={
        'stanceEpisodes_NORMAL':[(e['frames'],e['phase'],e['world_slide_canvas'],e['max_world_speed_px_per_frame']) for e in eps],
        'windowPhase_worldFootSlide_canvasPx_perEpisode':sl(win_eps),'tailPhase_worldFootSlide_canvasPx_perEpisode':sl(tail_eps),
        'finalSettle_frames':settle['frames'],'finalSettle_footSlide_canvasPx':settle['world_slide_canvas'],
        'stationaryFromFrame':next((k for k in range(1,74) if all(abs(META[f'stop{j+1}']['cx']-META[f'stop{j}']['cx'])<0.3 for j in range(k,73))),None),
        'maxFootSpeedInTail_pxPerFrame':max([e['max_world_speed_px_per_frame'] for e in tail_eps]+[0]),
        'maxFootSpeedInWindow_pxPerFrame':max([e['max_world_speed_px_per_frame'] for e in win_eps]+[0])}
    # optional RUN reference (frames outside the repo)
    if '--run-frames' in sys.argv:
        pat=sys.argv[sys.argv.index('--run-frames')+1]; first=int(sys.argv[sys.argv.index('--run-first')+1]); cnt=int(sys.argv[sys.argv.index('--run-count')+1])
        rm=[np.asarray(Image.open(pat%(first+i)))[...,3]>128 for i in range(cnt)]*3
        rg=int(np.percentile([int(np.where(m.any(1))[0].max()) for m in rm],90)); rr=contacts(rm,rg,tol=9)
        sp=[];
        for ep in episodes(rr):
            xs=[];px=None
            for r in ep: x=lead_cluster(r,px);xs.append(x);px=x
            sp+= [abs((xs[i]-xs[i-1])*SC) for i in range(1,len(xs))]
        res['runReference']={'framesPattern':pat,'note':'RUN alpha is not in this branch; frames come from the working scratch decode of dog1-run-alpha.webm (#87-98 loop x3). Not reproducible from the repo.','groundRow':rg,
                             'stanceFootLocalSpeed_canvasPx_per_frame':{'median':round(float(np.median(sp)),2) if sp else None,'max':round(max(sp),2) if sp else None,'samples':len(sp)},'engineSpeed_NORMAL_px_per_frame':round(V0/FPS,2)}
    json.dump(res,open(out_json,'w'),indent=1)
    # chart
    import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
    fig,ax=plt.subplots(3,1,figsize=(13,9),sharex=True)
    k=np.arange(1,74)
    ax[0].plot(k,[(ground-y)*SC for y in res['bottomRow']],'k-',label='lowest point above ground (canvas px)')
    for f in res['stanceFrames']: ax[0].axvspan(f-.5,f+.5,color='tab:green',alpha=.35)
    ax[0].set_ylabel('paw height'); ax[0].legend(loc='upper right')
    cxs=[(c-res['bodyCx_src'][0])*SC for c in res['bodyCx_src']]; ax[1].plot(k,cxs,'b-',label='body cx drift baked in the clip'); 
    for e in cat['NORMAL']:
        ax[1].plot([s['frame'] for s in e['steps']],[(s['x_src'])*SC-res['bodyCx_src'][0]*SC for s in e['steps']],'r.-',label='stance paw x (sprite coords)' if e is cat['NORMAL'][0] else None)
    ax[1].set_ylabel('canvas px'); ax[1].legend(loc='upper left')
    for e in cat['NORMAL']:
        ax[2].bar([s['frame'] for s in e['steps'] if s['world_dx_canvas'] is not None],[s['world_dx_canvas'] for s in e['steps'] if s['world_dx_canvas'] is not None],color='tab:red')
    ax[2].axhline(0,color='k',lw=.5); ax[2].set_ylabel('world foot dx per frame (NORMAL)\ncanvas px'); ax[2].set_xlabel('STOP clip frame')
    for a in ax: a.axvline(WIN+.5,color='tab:orange',ls='--'); 
    ax[0].text(WIN+1,ax[0].get_ylim()[1]*.9,'tail: stationary window',color='tab:orange')
    ax[0].text(1,ax[0].get_ylim()[1]*.9,'physical STOP window (37 frames)',color='tab:orange')
    fig.suptitle('Frenk STOP: paw contacts vs the physical STOP window'); fig.tight_layout(); fig.savefig(out_png,dpi=110)
    print(json.dumps(res['summary'],indent=1))
main()
