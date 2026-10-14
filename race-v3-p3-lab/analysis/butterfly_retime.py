#!/usr/bin/env python3
"""BUTTERFLY retime test x1.0932 vs the original tempo (Frenk, after-STOP path). NOT an approval: numbers + a side-by-side preview.
Sequence in the stationary action window: STOP tail (stop38..73, 36 frames) + BUTTERFLY game cut (bf1..bf93) = 129 frames; the window left
by the contract is 121 - lead 3 = 118 frames -> rate 129/118 = 1.0932. Displayed frames come from the lab's own visualAt output
(results/butterfly_retime_labels.json, made by analysis/retime_labels.mjs). Existing alpha frames only; nothing generated.
usage: butterfly_retime.py OUT_JSON OUT_MP4 OUT_PNG
"""
import sys,os,json,subprocess,tempfile
import numpy as np
from PIL import Image,ImageDraw
HERE=os.path.dirname(os.path.abspath(__file__)); REPO=os.path.abspath(os.path.join(HERE,'..','..'))
STOP=f'{REPO}/bulldog1-frenk/assets/approved/DOG1_STOP_v1_alpha.webm'
BF=f'{REPO}/bulldog1-frenk/butterfly_v1/DOG1_BUTTERFLY_v1_alpha_game_f1-f93.webm'
SC=0.16222570532915362
def dec(webm):
    d=tempfile.mkdtemp(prefix='dec_');subprocess.run(['ffmpeg','-v','error','-c:v','libvpx-vp9','-i',webm,'-pix_fmt','rgba',f'{d}/f%03d.png'],check=True)
    n=len(os.listdir(d));return [np.asarray(Image.open(f'{d}/f{i:03d}.png')) for i in range(1,n+1)]
stop=dec(STOP);bf=dec(BF); assert len(stop)==73 and len(bf)==93,(len(stop),len(bf))
seq=stop[37:73]+bf
labels=[f'stop{i}' for i in range(38,74)]+[f'bf{i}' for i in range(1,94)]
masks=[(f[...,3]>128) for f in seq]; area=np.array([m.sum() for m in masks],float)
cen=[np.array(np.nonzero(m)).mean(1)[::-1] for m in masks]
step=lambda a,b: float((masks[a]^masks[b]).sum()/(0.5*(area[a]+area[b])))      # fraction of the silhouette that changes between two frames
cstep=lambda a,b: float(np.linalg.norm(cen[a]-cen[b])*SC)                       # centroid move, canvas px
LAB=json.load(open(f'{HERE}/../results/butterfly_retime_labels.json'))
idx={l:i for i,l in enumerate(labels)}
O=[idx.get(x['frame']) for x in LAB['original']]; Rt=[idx.get(x['frame']) for x in LAB['retime']]       # None = START crouch / stand (not a STOP/BUTTERFLY frame)
shown=lambda s: sorted({i for i in s if i is not None})
def steps(s,f):
    v=[i for i in s if i is not None]; return [f(v[k],v[k+1]) for k in range(len(v)-1)]
R=129/118
os_,rs_,oc,rc=steps(O,step),steps(Rt,step),steps(O,cstep),steps(Rt,cstep)
dropped=sorted(set(range(129))-set(shown(Rt))); cut=sorted(set(range(129))-set(shown(O)))
cand=sorted(range(1,128),key=lambda j:step(j-1,j+1)); chosen=[]
for j in cand:
    if all(abs(j-c)>=3 for c in chosen): chosen.append(j)
    if len(chosen)==len(dropped): break
keep=[i for i in range(129) if i not in chosen]; qs=[step(keep[i],keep[i+1]) for i in range(len(keep)-1)]
pc=lambda x,p: round(float(np.percentile(x,p)),4)
jumps=[]
for d in dropped:
    prev=max([i for i in shown(Rt) if i<d],default=None); nxt=min([i for i in shown(Rt) if i>d],default=None)
    if prev is not None and nxt is not None: jumps.append({'skipped':labels[d],'jumpAfterSkipFraction':round(step(prev,nxt),4),'centroidJumpPx':round(cstep(prev,nxt),2)})
bfshown=[i for i in shown(Rt) if i>=36]
res={'sequence':{'stopTailFrames':36,'butterflyFrames':93,'total':129,'windowFramesAfterLead':118,'rate':round(R,4),'source':'results/butterfly_retime_labels.json (lab visualAt output, 121 ticks of the STOP->BUTTERFLY->START window)'},
 'tempo':{'butterflyBodySeconds_original':round(93/24,3),'butterflyBodySeconds_retimed':round(93/24/R,3),'stopTailSeconds_original':1.5,'stopTailSeconds_retimed':round(1.5/R,3),'speedUpPercent':round((R-1)*100,1)},
 'originalTempo_asIs':{'sourceFramesNeverShown_cutByNextStart':[labels[i] for i in cut],'count':len(cut),'poseJumpAtCut_silhouetteFraction_lastShownVsFinalFrame':round(step(max(shown(O)),128),4),'finalFrameVsMedianStep':round(step(max(shown(O)),128)/max(1e-9,float(np.median(os_))),1)},
 'uniformRetime':{'sourceFramesSkipped':[labels[i] for i in dropped],'count':len(dropped),'lastButterflyFrameShown':labels[max(bfshown)]},
 'silhouetteStepFraction':{'original_shownFrames':{'median':pc(os_,50),'p95':pc(os_,95),'max':pc(os_,100)},'uniformRetime':{'median':pc(rs_,50),'p95':pc(rs_,95),'max':pc(rs_,100)},
   'sameCountDroppedAtQuietestFrames_alternative_NOT_IMPLEMENTED':{'median':pc(qs,50),'p95':pc(qs,95),'max':pc(qs,100),'dropped':[labels[j] for j in sorted(chosen)]}},
 'centroidStepCanvasPx':{'original_shownFrames':{'p95':pc(oc,95),'max':pc(oc,100)},'uniformRetime':{'p95':pc(rc,95),'max':pc(rc,100)}},
 'jumpAtSkippedFrames':jumps,
 'caveat':'silhouette/centroid metrics only; the eye test (T11) has not been done and the retime is NOT approved'}
json.dump(res,open(sys.argv[1],'w'),indent=1)
W,H=638,360;grey=np.array([54,58,66],np.uint8)
def comp(a):
    arr=np.asarray(Image.fromarray(a).resize((W,H),Image.BILINEAR));al=arr[...,3:4]/255.
    return (arr[...,:3]*al+grey*(1-al)).astype(np.uint8)
tmp=tempfile.mkdtemp(prefix='bfprev_');last=[0,0]
for t in range(121):
    canvas=Image.new('RGB',(W*2,H+30),(20,20,24));d=ImageDraw.Draw(canvas)
    for k,(s,name) in enumerate([(O,'ORIGINAL tempo, as the lab shows it'),(Rt,'RETIME x1.0932 (not approved)')]):
        lab=LAB['original' if k==0 else 'retime'][t]; i=s[t]
        if i is not None: last[k]=i
        canvas.paste(Image.fromarray(comp(seq[last[k]])),(k*W,30))
        txt=f'{name}   tick {t+1}/121   {lab["frame"]}'+('   [START crouch: sprite not loaded, previous frame held]' if i is None else '')
        d.text((k*W+6,8),txt,fill=(255,140,140) if (k==0 and lab['overflow']) else (230,230,230))
        if k==0 and lab['overflow']: d.rectangle((0,30,W-1,H+29),outline=(255,90,90),width=3)
        if k==1 and t>0 and i is not None and Rt[t-1] is not None and i-Rt[t-1]==2: d.rectangle((W,30,W*2-1,H+29),outline=(255,200,0),width=3)
    canvas.save(f'{tmp}/c{t:03d}.png')
subprocess.run(f'ffmpeg -v error -y -framerate 24 -i {tmp}/c%03d.png -c:v libx264 -crf 18 -pix_fmt yuv420p {sys.argv[2]}',shell=True,check=True)
import matplotlib;matplotlib.use('Agg');import matplotlib.pyplot as plt
fig,ax=plt.subplots(2,1,figsize=(13,6),sharex=True)
ax[0].plot(range(1,129),[step(i,i+1) for i in range(128)],'k.-',label='source: silhouette step per source frame')
for d in dropped: ax[0].axvline(d+0.5,color='tab:orange',alpha=.7)
for c in cut: ax[0].axvspan(c+.5,c+1.5,color='tab:red',alpha=.15)
ax[0].set_ylabel('fraction changed');ax[0].legend();ax[0].set_title('orange = source frames skipped by x1.0932; red band = frames cut at the original tempo')
v=[i for i in Rt if i is not None];ax[1].plot([v[k]+1 for k in range(len(v)-1)],[step(v[k],v[k+1]) for k in range(len(v)-1)],'b.-',label='retimed: step between displayed frames (x = first source frame)')
ax[1].set_xlabel('source frame index (stop38..73 = 1..36, bf1..93 = 37..129)');ax[1].legend();fig.tight_layout();fig.savefig(sys.argv[3],dpi=100)
print(json.dumps({k:res[k] for k in ['tempo','originalTempo_asIs','uniformRetime','silhouetteStepFraction','centroidStepCanvasPx']},indent=1))
