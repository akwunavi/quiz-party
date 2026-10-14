import sys, os, json; sys.path.insert(0,'sp4'); sys.path.insert(0,'.')
from cand import *
from rs_previews import comp, lab
from PIL import Image, ImageDraw
import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
D='sp4'
GF={k:feat(G(k)) for k in range(15,50)}; RF={n:feat(R(n)) for n in range(87,99)}
rc=lambda n: RF[cyc(n)]
K=16
def off_array(g,n):
    pg=GF[g]['cx']; vg=pg-GF[g-1]['cx']; pr=rc(n)['cx']; p0=pg+vg-pr
    return hermite(p0,0.0,K)
VAR={'A':dict(name='ORIGINAL f37 -> RUN #90',g=37,n=90,off=False),'B':dict(name='IMPROVED f35 -> RUN #88 (no offsets)',g=35,n=88,off=False)}
def sequence(v,pre=12,post=24):
    c=VAR[v]; g,n=c['g'],c['n']; o=off_array(g,n) if c['off'] else np.zeros(K+1)
    fr=[]
    for k in range(g-pre,g+1): fr.append((f'G3 f{k}',G(k),0.0,'g3'))
    for t in range(post):
        m=cyc(n+t); fr.append((f'RUN #{m}',R(m),float(o[t]) if t<=K else 0.0,'run'))
    return fr
def render(fr,i,kind):
    lbl,a,dx,ph=fr[i]
    full=comp(a,dx)
    if kind=='large': return Image.fromarray(full).crop((150,20,1100,700)).resize((640,458),Image.LANCZOS)
    g=lab(full); return g.resize((828,464),Image.BICUBIC)
os.makedirs(f'{D}/jb',exist_ok=True)
seqs={v:sequence(v) for v in VAR}
N=len(seqs['A'])  # 37
pre=12
# 1) compare frames (large + game x4)
for kind,(W,H) in (('large',(640,458)),('game',(828,464))):
    for i in range(N):
        im=Image.new('RGB',(W*2,H+34),(20,20,20)); d=ImageDraw.Draw(im)
        for j,v in enumerate('AB'):
            p=render(seqs[v],i,kind); im.paste(p,(j*W,34))
            lbl,_,dx,ph=seqs[v][i]; d.text((j*W+6,4),VAR[v]['name'],fill=(255,255,255)); d.text((j*W+6,18),f'{i+1:02d}/{N} {lbl}'+('   <<< JOIN' if i==pre+1 else ''),fill=(255,255,0) if i!=pre+1 else (255,90,90))
        im.save(f'{D}/jb/cmp_{kind}_{i:03d}.png')
# 2) trajectories plot
fig,ax=plt.subplots(2,2,figsize=(13,7))
for v,col in (('A','tab:red'),('B','tab:blue')):
    c=VAR[v]; fr=seqs[v]; o=off_array(c['g'],c['n']) if c['off'] else np.zeros(K+1)
    cx=[];cy=[];ar=[];bw=[]
    for i,(l,a,dx,ph) in enumerate(fr):
        f=feat(a); cx.append(f['cx']+dx); cy.append(f['cy']); ar.append(f['area']/1000); bw.append(f['x1']-f['x0'])
    x=np.arange(N)-pre-0.5
    for a_,y,t in ((ax[0,0],np.array(cy)*0.1622,'body centroid y (canvas px, lower = higher body)'),(ax[0,1],np.array(cx)*0.1622,'body centroid x (canvas px)'),(ax[1,0],np.array(ar)*0.1622**2*1000/1000,'silhouette area (k canvas px²)'),(ax[1,1],np.array(bw)*0.1622,'bbox width (canvas px)')):
        a_.plot(x,y,'-o',ms=3,color=col,label=VAR[v]['name']); a_.set_title(t,fontsize=9); a_.axvline(0,color='k',lw=.8,ls='--')
ax[0,0].legend(fontsize=7); plt.tight_layout(); plt.savefig(f'{D}/trajectories_A_vs_B.png',dpi=110)
# 3) seam sheet (large) +-6 frames
W,H=330,236
sh=Image.new('RGB',(W*13,(H+16)*2),'white'); d=ImageDraw.Draw(sh)
for r,v in enumerate('AB'):
    for c,i in enumerate(range(pre-5,pre+8)):
        p=render(seqs[v],i,'large').resize((W,H)); sh.paste(p,(c*W,r*(H+16)+16)); d.text((c*W+3,r*(H+16)+2),f'{v}: {seqs[v][i][0]}'+(' <JOIN' if i==pre+1 else ''),fill=(0,0,0))
sh.save(f'{D}/seam_sheet_A_B.png'); print(sh.size, 'done')
json.dump(dict(off_B=off_array(35,88).round(2).tolist()),open(f'{D}/offsets_B.json','w'))
