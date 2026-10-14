import sys, os, json; sys.path.insert(0,'sp4'); sys.path.insert(0,'.')
from cand import *
from rs_previews import comp, rd, plate
from PIL import Image, ImageDraw
K='/home/user/wt-codex/bulldog1-frenk/race_start_run_integration_kit'
arr=json.load(open(f'{K}/shift_arrays.json')); SC=arr['sprite_scale_canvas_per_src']
lay=json.load(open('/home/user/wt-codex/dog4-v3-lab/layout.json'))
V00=1/42; course=lay['finishX']-lay['startX']+lay['finishControlOffset']
def pX(p): return lay['startX']+p*course
smoothI=lambda u:u**3-.5*u**4
clip=[rd(f'alpha_pipeline/work/rs_v1/rgba/r{i:04d}.png') for i in range(73)]
entry=[1,7,8,9,10,11,16]
loop=list(range(87,98+1))
labels=[('ENTRY',f'V1 f{k}',clip[k-1]) for k in entry]+[('RACE_START',f'G3 f{k}',G(k)) for k in range(2,36)]
runn=list(range(88,99))+[n for _ in range(8) for n in loop]
labels+= [('RUN',f'RUN #{n}',R(n)) for n in runn]
N=len(labels); print('frames',N)
def engine(mode,mult):
    v=V00*mult
    if mode=='contract': r0,r1=12,43
    else: r0,r1=0,24
    Tr=(r1-r0)/24
    def D(i):
        x=max(0,(i-r0)/24)
        return (v*Tr/2)*2*smoothI(x/Tr) if x<=Tr else v*Tr/2*2*smoothI(1)+v*(x-Tr)
    return D
def Cof(mode,cat,i): 
    a=arr['modes'][mode][cat]['C']; return a[i] if i<len(a) else 0.0
# ---------- 1) lane video: 4 rows at game scale x3
S=3; W0=250; WW=420; WH=124
bg=np.array(Image.fromarray(plate.astype(np.uint8)).resize((WW*S,WH*S),Image.LANCZOS))
rows=[('contract','VERY_SLOW'),('contract','NORMAL'),('contract','VERY_FAST'),('native','NORMAL')]
sprites={}
def sprite(i):
    if i not in sprites:
        a=labels[i][2]; sprites[i]=Image.fromarray(a).resize((207*S,116*S),Image.LANCZOS)
    return sprites[i]
os.makedirs('sp4/kit_lane',exist_ok=True)
Dm={(m,c):engine(m,arr['modes'][m][c]['speed_multiplier']) for m,c in rows}
RH=WH*S+26
for i in range(N):
    frame=Image.new('RGB',(WW*S,RH*len(rows)),(30,30,30)); d=ImageDraw.Draw(frame)
    for r,(m,c) in enumerate(rows):
        base=Image.fromarray(bg); anchor=pX(Dm[(m,c)](i)); left=anchor-lay['spriteAnchorX']+Cof(m,c,i)*SC
        sp=sprite(i); x=int(round((left-W0)*S)); y=(WH-116)*S//2+10
        base.paste(sp,(x,y),sp); dr=ImageDraw.Draw(base)
        for t in range(0,WW,10):
            L=14 if t%50==0 else 7; dr.line([(t*S,WH*S-L),(t*S,WH*S)],fill=(40,40,40),width=2)
            if t%50==0: dr.text((t*S+3,WH*S-28),str(W0+t),fill=(40,40,40))
        ax=int(round((anchor-W0)*S)); dr.line([(ax,0),(ax,WH*S)],fill=(230,40,40),width=2)
        frame.paste(base,(0,r*RH+26))
        d.text((6,r*RH+6),f'{m.upper()} / {c}  x{arr["modes"][m][c]["speed_multiplier"]}   idx {i:03d}  {labels[i][1]}   red line = physical anchor   rollback {arr["modes"][m][c]["rollback_canvas_px"]} px',fill=(255,255,0))
    frame.save(f'sp4/kit_lane/l{i:04d}.png')
# ---------- 2) final in-place large (contract NORMAL) 
os.makedirs('sp4/kit_large',exist_ok=True)
for i in range(N):
    ph,lbl,a=labels[i]; full=comp(a,Cof('contract','NORMAL',i))
    im=Image.fromarray(full).crop((150,20,1100,700)).resize((640,458),Image.LANCZOS); ImageDraw.Draw(im).text((6,6),f'{i:03d} {lbl}  C={Cof("contract","NORMAL",i):+.1f}px'+('  <JOIN' if lbl=='RUN #88' and labels[i-1][1]=='G3 f35' else ''),fill=(255,255,0)); im.save(f'sp4/kit_large/b{i:04d}.png')
# ---------- 3) full chain (event e32 + stand hold + START/RUN with final C)
os.makedirs('sp4/kit_chain',exist_ok=True)
n=0
for i in range(200): Image.open(f'sp3/e32/e{i:04d}.png').save(f'sp4/kit_chain/p{n:04d}.png'); n+=1
last=Image.open('sp3/e32/e0199.png')
for _ in range(8): last.save(f'sp4/kit_chain/p{n:04d}.png'); n+=1
for i in range(0,41+0):  # START window frames up to visual join
    pass
for i in range(N):
    ph,lbl,a=labels[i]; Image.fromarray(comp(a,Cof('contract','NORMAL',i))).save(f'sp4/kit_chain/p{n:04d}.png'); n+=1
print('chain frames',n)
json.dump(dict(chain_frames=n,start_run_frames=N),open('sp4/kit_render_meta.json','w'))
