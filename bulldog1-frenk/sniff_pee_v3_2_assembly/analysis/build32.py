import sys, os, json; sys.path.insert(0,'.'); sys.path.insert(0,'sp3')
import numpy as np, cv2
from PIL import Image
from rs_previews import rd, comp, run_alpha
D='sp3'
def rdf(p): return cv2.cvtColor(cv2.imread(p),cv2.COLOR_BGR2RGB)
V2=lambda n: rdf(f'{D}/v2/f{n:04d}.png'); MM=lambda n: rdf(f'{D}/mm/f{n:04d}.png')
P31=json.load(open(f'{D}/plan31.json'))['main']
T=74  # hold turnaround frame
ev=[]
for ph,l in P31:
    if ph=='HOLD' or ph=='LEG_LOWER': continue
    ev.append((ph,l))
# insert hold + lower after LEG_LIFT (before STANCE_RESTORE)
i0=max(i for i,(p,l) in enumerate(ev) if p=='LEG_LIFT')+1
new=[('HOLD',f'MM n{n}') for n in range(65,T+1)]+[('LEG_LOWER',f'MM n{n} (rev)') for n in range(T-1,40,-1)]
ev=ev[:i0]+new+ev[i0:]
def load(l):
    s,n=l.split()[0],int(l.split()[1][1:]); return V2(n) if s=='V2' else MM(n)
frames=[(p,l,load(l)) for p,l in ev]
os.makedirs(f'{D}/e32',exist_ok=True)
for i,(p,l,f) in enumerate(frames): Image.fromarray(f).save(f'{D}/e32/e{i:04d}.png')
print('V3.2 event frames',len(frames),round(len(frames)/24,3),'s')
# ---- preview tail (same as V3 preview): stand hold, entry V1, gen3, RUN
clip=[rd(f'alpha_pipeline/work/rs_v1/rgba/r{i:04d}.png') for i in range(73)]
g3=[rd(f'alpha_pipeline/work/rs_g3/rgba/r{i:04d}.png') for i in range(73)]
entry=[1,7,8,9,10,11,16]
seq=[('ENTRY',f'V1 f{k}',clip[k-1]) for k in entry]+[('RACE_START',f'G3 f{k}',g3[k-1]) for k in range(2,38)]
seq+=[('RUN',f'RUN #{n}',run_alpha(n)) for n in [90,91,92,93,94,95,96,97,98]+[n for _ in range(2) for n in range(87,99)]]
iPush=len(entry)+5; iRun=len(entry)+36
tail=[('STAND_HOLD','MM n0',frames[-1][2])]*8
for i,(ph,lab,a) in enumerate(seq):
    C=125 if i<iPush else (125*(1-(2*((i-iPush)/(iRun-iPush))**3-((i-iPush)/(iRun-iPush))**4)) if i<iRun else 0)
    tail.append((ph,lab,comp(a,C)))
allf=[(p,l,f) for p,l,f in frames]+tail
os.makedirs(f'{D}/pv32',exist_ok=True)
for i,(p,l,f) in enumerate(allf): Image.fromarray(f).save(f'{D}/pv32/p{i:04d}.png')
json.dump(dict(event=[(p,l) for p,l,_ in frames],preview=[(p,l) for p,l,_ in allf]),open(f'{D}/plan32.json','w'))
print('preview frames',len(allf),round(len(allf)/24,3),'s')
