import sys, os, json; sys.path.insert(0,'.'); sys.path.insert(0,'sp3')
import numpy as np, cv2
from PIL import Image, ImageDraw
D='sp3'
def rdf(p): return cv2.cvtColor(cv2.imread(p),cv2.COLOR_BGR2RGB)
V2=lambda n: rdf(f'{D}/v2/f{n:04d}.png'); MM=lambda n: rdf(f'{D}/mm/f{n:04d}.png')
v2s=np.load(f'{D}/v2.npy'); mms=np.load(f'{D}/mm.npy')
d=lambda a,b: float(np.abs(a-b).mean())
# MM stance-shift schedule n0..n40 (piecewise): slow drift x3, fast part 1:1, tail x2, calm skipped
seg1=[0,3,6,9,11]; seg2=list(range(12,24)); seg3=[24,26,28,30]; sched=seg1+seg2+seg3+[40]
steps=[d(mms[a],mms[b]) for a,b in zip(sched,sched[1:])]
print('MM sched',len(sched),'frames; max step %.2f; steps>5: %s'%(max(steps),[(a,b,round(s,2)) for (a,b),s in zip(zip(sched,sched[1:]),steps) if s>5]))
def build(sniff_end, label):
    ev=[]
    # SNIFF forward V2 n26..sniff_end, turn to b, reverse b..26
    for n in range(26,sniff_end+1): ev.append(('SNIFF',f'V2 n{n}'))
    b=57 if sniff_end>=82 else sniff_end-1
    for n in range(b,25,-1): ev.append(('HEAD_RETURN',f'V2 n{n} (rev)'))
    for n in sched: ev.append(('STANCE_SHIFT',f'MM n{n}'))
    for n in range(41,65): ev.append(('LEG_LIFT',f'MM n{n}'))
    for n in range(65,69): ev.append(('HOLD',f'MM n{n}'))
    for n in range(67,40,-1): ev.append(('LEG_LOWER',f'MM n{n} (rev)'))
    for n in reversed(sched[:-1]): ev.append(('STANCE_RESTORE',f'MM n{n} (rev)'))
    return ev
def load(lbl):
    src,n=lbl.split()[0],int(lbl.split()[1][1:])
    return V2(n) if src=='V2' else MM(n)
out={}
for name,se in (('main',83),('short',60)):
    ev=build(se,name); frames=[(p,l,load(l)) for p,l in ev]
    os.makedirs(f'{D}/e31_{name}',exist_ok=True)
    for i,(p,l,f) in enumerate(frames): Image.fromarray(f).save(f'{D}/e31_{name}/e{i:04d}.png')
    out[name]=[(p,l) for p,l,_ in frames]
    print(name,len(frames),'frames',round(len(frames)/24,3),'s')
json.dump(out,open(f'{D}/plan31.json','w'))
