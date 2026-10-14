import sys, os, json; sys.path.insert(0,'.'); sys.path.insert(0,'sp3')
import numpy as np, cv2
from PIL import Image
from lib import morph, diff
from rs_previews import rd, comp, run_alpha
D='sp3'
def rdf(p): return cv2.cvtColor(cv2.imread(p),cv2.COLOR_BGR2RGB)
V2=lambda n: rdf(f'{D}/v2/f{n:04d}.png'); MM=lambda n: rdf(f'{D}/mm/f{n:04d}.png')
def event(variant):
    ev=[]
    for n in range(12,98): ev.append(('SNIFF',f'V2 n{n}',V2(n)))
    if variant=='flow':
        a,b=V2(97),MM(0)
        for t in (0.25,0.5,0.75): ev.append(('SEAM_S1',f'flow t={t}',morph(a,b,t)))
    for n in range(0,67):  ev.append(('LEG_LIFT',f'MM n{n}',MM(n)))
    for n in range(67,79): ev.append(('HOLD',f'MM n{n}',MM(n)))
    for n in range(77,-1,-1): ev.append(('LEG_LOWER',f'MM n{n} (rev)',MM(n)))
    return ev
clip=[rd(f'alpha_pipeline/work/rs_v1/rgba/r{i:04d}.png') for i in range(73)]
g3=[rd(f'alpha_pipeline/work/rs_g3/rgba/r{i:04d}.png') for i in range(73)]
entry=[1,7,8,9,10,11,16]
seq=[('ENTRY',f'V1 f{k}',clip[k-1]) for k in entry]+[('RACE_START',f'G3 f{k}',g3[k-1]) for k in range(2,38)]
runseq=[90,91,92,93,94,95,96,97,98]+[n for _ in range(2) for n in range(87,99)]
seq+=[('RUN',f'RUN #{n}',run_alpha(n)) for n in runseq]
iPush=len(entry)+5; iRun=len(entry)+36
tail=[]
for i,(ph,lab,a) in enumerate(seq):
    C=125 if i<iPush else (125*(1-(2*((i-iPush)/(iRun-iPush))**3-((i-iPush)/(iRun-iPush))**4)) if i<iRun else 0)
    tail.append((ph,lab,comp(a,C)))
out={}
for variant in ('flow','hardcut'):
    ev=event(variant); end=ev[-1][2]
    hold=[('STAND_HOLD','MM n0',end)]*8
    allf=ev+hold+tail
    for d in (f'ev_{variant}',f'pv_{variant}'): os.makedirs(f'{D}/{d}',exist_ok=True)
    for i,f in enumerate(ev): Image.fromarray(f[2]).save(f'{D}/ev_{variant}/e{i:04d}.png')
    for i,f in enumerate(allf): Image.fromarray(f[2]).save(f'{D}/pv_{variant}/p{i:04d}.png')
    out[variant]=dict(event=len(ev),preview=len(allf),labels=[(p,l) for p,l,_ in allf])
json.dump(out,open(f'{D}/plan2.json','w'))
print({k:(v['event'],v['preview']) for k,v in out.items()})
