import sys, os, json, subprocess; sys.path.insert(0,'.'); sys.path.insert(0,'sp3')
import numpy as np, cv2
from PIL import Image, ImageDraw
from rs_previews import rd, comp, run_alpha, plate
D='sp3'
def rdf(p): return cv2.cvtColor(cv2.imread(p),cv2.COLOR_BGR2RGB)
V2=lambda n: rdf(f'{D}/v2/f{n:04d}.png'); MM=lambda n: rdf(f'{D}/mm/f{n:04d}.png')
# ---- EVENT plan (source frame refs)
ev=[]
for n in range(12,98): ev.append(('SNIFF','V2',n))        # stand beat, notice, lower, sniff, head return
for n in range(0,67):  ev.append(('LEG_LIFT','MM',n))      # stance change + lift
for n in range(67,79): ev.append(('HOLD','MM',n))
for n in range(77,-1,-1): ev.append(('LEG_LOWER','MM',n))  # reverse
frames=[(ph,src,n,(V2 if src=='V2' else MM)(n)) for ph,src,n in ev]
# ---- PREVIEW tail: stand hold, entry, gen3, RUN
clip=[rd(f'alpha_pipeline/work/rs_v1/rgba/r{i:04d}.png') for i in range(73)]
g3=[rd(f'alpha_pipeline/work/rs_g3/rgba/r{i:04d}.png') for i in range(73)]
tail=[]
STAND_HOLD=8
last=frames[-1][3]
for _ in range(STAND_HOLD): tail.append(('STAND_HOLD','MM',0,last))
entry=[1,7,8,9,10,11,16]; join_run=90
seq=[('ENTRY',f'V1 f{k}',clip[k-1],'entry') for k in entry]+[('RACE_START',f'G3 f{k}',g3[k-1],'g3') for k in range(2,38)]
runseq=[90,91,92,93,94,95,96,97,98]+[n for _ in range(2) for n in range(87,99)]
seq+= [('RUN_LEAD',f'RUN #{n}',run_alpha(n),'run') for n in runseq]
iPush=len(entry)+(7-2); iRun=len(entry)+36
for i,(ph,lab,a,k) in enumerate(seq):
    if i<iPush: C=125
    elif i<iRun: u=(i-iPush)/(iRun-iPush); C=125*(1-(2*u**3-u**4))
    else: C=0
    tail.append((ph,lab,i,comp(a,C)))
allf=frames+tail
meta=dict(event_frames=len(frames),tail_frames=len(tail),total=len(allf))
# ---- write
for d in ('out_event','out_prev'):
    os.makedirs(f'{D}/{d}',exist_ok=True)
for i,f in enumerate(frames): Image.fromarray(f[3]).save(f'{D}/out_event/e{i:04d}.png')
for i,f in enumerate(allf): Image.fromarray(f[3]).save(f'{D}/out_prev/p{i:04d}.png')
json.dump(dict(meta=meta,phases=[(p,s,n) for p,s,n,_ in frames]),open(f'{D}/plan.json','w'))
print(meta)
