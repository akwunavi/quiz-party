#!/usr/bin/env python3
"""Seam metrics of a chain timeline on the WORKING ALPHA, in the game's geometry: each frame's mask is placed with
(anchor x + sprite shift) before comparison, so the numbers include the metadata, not only the poses.
For every change of clip in the timeline: silhouette IoU of the two consecutive game frames (alpha>128) and the centroid step
in canvas px; reference = the median IoU of consecutive frames inside the same clips. usage: seams.py TIMELINE.json DECDIR OUT.json"""
import sys,json,re,os,numpy as np
from PIL import Image
tl=json.load(open(sys.argv[1])); D=sys.argv[2]; L=tl['layout']; SC=L['spriteWidth']/1276
def path(lab):
    if lab=='RACE_STAND': return f'{D}/stand.png'
    k,n=re.match(r'(run|v4k|sniffEv|v1f|g3f|stop|bf)(\d+)$',lab).groups(); n=int(n)
    return {'run':f'{D}/run/f{n-39:03d}.png','v4k':f'{D}/v4/f{n-37:03d}.png','sniffEv':f'{D}/sniff/f{n:03d}.png','v1f':f'{D}/v1f/f{n:03d}.png','g3f':f'{D}/g3f/f{n:03d}.png','stop':f'{D}/stop1/f{n:03d}.png','bf':f'{D}/bf/f{n:03d}.png'}[k]
cache={}
def mask(lab):
    if lab not in cache: cache[lab]=np.asarray(Image.open(path(lab)))[...,3]>128
    return cache[lab]
def placed(r):                                # src-px offset of the frame on screen relative to the first tick
    return (r['x']-tl['ticks'][0]['x'])/SC+r['shiftSrc']
def pair(a,b):
    ma,mb=mask(a['label']),mask(b['label']); d=int(round(placed(b)-placed(a)))
    mb=np.roll(mb,d,1)
    iou=(ma&mb).sum()/(ma|mb).sum()
    ca=np.nonzero(ma)[1].mean(); cb=np.nonzero(mb)[1].mean()
    return float(iou),float((cb-ca)*SC)
cls=lambda l: re.sub(r'\d+$','',l)
T=tl['ticks']; seams=[]; inner=[]
for a,b in zip(T,T[1:]):
    if not (os.path.exists(path(a['label'])) and os.path.exists(path(b['label']))): continue
    i,c=pair(a,b)
    if cls(a['label'])!=cls(b['label']): seams.append({'k':b['k'],'from':a['label'],'to':b['label'],'iou':round(i,3),'centroidStepCanvasPx':round(c,2)})
    elif a['label']!=b['label']: inner.append(i)
out={'timeline':os.path.basename(sys.argv[1]),'insideClipsIoUMedian':round(float(np.median(inner)),3),'insideClipsIoUP10':round(float(np.percentile(inner,10)),3),'seams':seams}
json.dump(out,open(sys.argv[3],'w'),indent=1); print(json.dumps(out,indent=1))
