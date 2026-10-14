import sys, os, json; sys.path.insert(0,'sp4'); sys.path.insert(0,'.')
from cand import *
from rs_previews import comp, rd, run_alpha
from PIL import Image
D='sp4'
GF={k:feat(G(k)) for k in range(30,40)}; RF={n:feat(R(n)) for n in range(87,99)}
rc=lambda n: RF[cyc(n)]
K=16
g,n=35,88
o=np.zeros(K+1)  # no offsets (B0)
clip=[rd(f'alpha_pipeline/work/rs_v1/rgba/r{i:04d}.png') for i in range(73)]
entry=[1,7,8,9,10,11,16]
seq=[('ENTRY',f'V1 f{k}',clip[k-1]) for k in entry]+[('RACE_START',f'G3 f{k}',G(k)) for k in range(2,g+1)]
run_n=list(range(n,99))+[m for _ in range(2) for m in range(87,99)]
nR=len(run_n)
iPush=len(entry)+5; iRun=len(seq)
tail=[('STAND_HOLD','MM n0',cv2.cvtColor(cv2.imread(f'sp3/e32/e{199:04d}.png'),cv2.COLOR_BGR2RGB))]*8
rows=[]
for i,(ph,lab_,a) in enumerate(seq):
    C=125.0 if i<iPush else 125*(1-(2*((i-iPush)/(iRun-iPush))**3-((i-iPush)/(iRun-iPush))**4))
    tail.append((ph,lab_,comp(a,C)))
for t,m in enumerate(run_n):
    tail.append(('RUN',f'RUN #{m}',comp(R(m),float(o[t]) if t<=K else 0.0)))
os.makedirs(f'{D}/chainB',exist_ok=True)
Pev=json.load(open('sp3/plan32.json'))['event']
frames=[(Pev[i][0],Pev[i][1],cv2.cvtColor(cv2.imread(f'sp3/e32/e{i:04d}.png'),cv2.COLOR_BGR2RGB)) for i in range(200)]+tail
for i,(p,l,f) in enumerate(frames): Image.fromarray(f).save(f'{D}/chainB/p{i:04d}.png')
labels=[(p,l) for p,l,_ in frames]
json.dump(dict(labels=labels,iPush=iPush,iRun=iRun,T2_frames=iRun-iPush),open(f'{D}/chainB_plan.json','w'))
print('chain B frames',len(frames),round(len(frames)/24,3),'s; push idx',iPush,'join idx',iRun,'ramp frames',iRun-iPush)
# step diffs
def f32(i): return cv2.imread(f'{D}/chainB/p{i:04d}.png').astype(np.float32)
prev=f32(0); st=[]
for i in range(1,len(frames)): cur=f32(i); st.append(float(np.abs(cur-prev).mean())); prev=cur
json.dump(st,open(f'{D}/chainB_steps.json','w'))
j=200+8+iRun-1   # index of last gen3 frame in chain (event 200 + stand 8 + seq frames)
