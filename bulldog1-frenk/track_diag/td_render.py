import sys,os,json,subprocess; sys.path.insert(0,'.')
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from hy_load import *
g3=[rd(f'alpha_pipeline/work/rs_g3/rgba/r{i:04d}.png') for i in range(73)]
T=json.load(open('/home/user/wt-codex/bulldog1-frenk/track_diag/timeline.json')); L=T['layout']; SC=T['SC']
def src(key):
    if key.startswith('run'): return run[int(key[3:])]
    if key.startswith('stop'): return stop[int(key[4:])-1]
    if key=='stand': return stop[-1]
    if key.startswith('v1f'): return clip[int(key[3:])-1]
    if key.startswith('g3f'): return g3[int(key[3:])-1]
CORR=None
def sprite(key,gain=None):
    a=src(key).astype(np.float32); al=a[...,3:4]/255.
    rgb=a[...,:3]
    if gain is not None: rgb=np.clip(rgb*gain,0,255)
    pm=np.concatenate([rgb*al,al*255],axis=2)               # premultiplied
    im=Image.fromarray(np.clip(pm,0,255).astype(np.uint8),'RGBA').resize((L['spriteWidth'],L['spriteHeight']),Image.LANCZOS)
    arr=np.array(im).astype(np.float32); A=arr[...,3:4]/255.
    rgbn=np.where(A>1e-3,arr[...,:3]/np.maximum(A,1e-3),0)
    return np.clip(rgbn,0,255),A
cache={}
def get(key,gain=None):
    k=(key,None if gain is None else tuple(gain))
    if k not in cache: cache[k]=sprite(key,gain)
    return cache[k]
def lane_panel(row,W=720,H=170,x0=380,label='',gain_for=None,ticks=True):
    img=Image.new('RGB',(W,H),(36,40,48)); d=ImageDraw.Draw(img)
    y_lane=H-40
    d.rectangle([0,y_lane+2,W,H],fill=(58,64,76))
    if ticks:
        for k in range(0,200):
            px=L['startX']+k*0.01*(L['finishX']-L['startX']+L['finishControlOffset'])-x0
            if 0<=px<W: d.line([(px,y_lane+2),(px,y_lane+(10 if k%5==0 else 5))],fill=(120,128,140))
            if k%5==0 and 0<=px<W: d.text((px+2,y_lane+12),f'{k/100:.2f}',fill=(150,158,170))
    ax=row['anchorX']-x0; d.line([(ax,12),(ax,y_lane)],fill=(230,60,60))
    gain=gain_for(row) if gain_for else None
    rgb,A=get(row['key'],gain)
    left=int(round(row['left']-x0)); top=y_lane-L['spriteHeight']+6          # feet near lane line
    # soft contact shadow
    sh=Image.new('L',(W,H),0); ds=ImageDraw.Draw(sh); cxs=left+int(row['cx']*SC); ds.ellipse([cxs-34,y_lane-6,cxs+34,y_lane+6],fill=120)
    sh=sh.filter(ImageFilter.GaussianBlur(3)); base=np.array(img).astype(np.float32)*(1-np.array(sh)[...,None]/255.*0.5)
    # paste sprite
    ys,ye=max(0,top),min(H,top+L['spriteHeight']); xs_,xe=max(0,left),min(W,left+L['spriteWidth'])
    if ye>ys and xe>xs_:
        sa=A[ys-top:ye-top,xs_-left:xe-left]; sr=rgb[ys-top:ye-top,xs_-left:xe-left]
        base[ys:ye,xs_:xe]=base[ys:ye,xs_:xe]*(1-sa)+sr*sa
    img=Image.fromarray(np.clip(base,0,255).astype(np.uint8)); d=ImageDraw.Draw(img)
    d.rectangle([0,0,W,12],fill=(0,0,0)); d.text((3,0),label,fill=(255,255,0))
    return img
def mp4(pattern,out,fps=24):
    subprocess.run(f'ffmpeg -v error -y -framerate {fps} -i {pattern} -r {fps} -c:v libx264 -crf 15 -pix_fmt yuv420p -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" {out}',shell=True,check=True)
if __name__=='__main__':
    out=sys.argv[1]; os.makedirs(out,exist_ok=True)
    names=['N0_V3native_nocomp','N1_proportional','N2_derived','N3_matched_ramp']
    N=T['idx']['N']
    for i in range(N):
        panels=[]
        for nm in names:
            r=T['variants'][nm]['rows'][i]
            lab=f"{nm} | {i+1:03d} {r['kind']} {r['key']} | C={r['C']:+.0f}src p={r['p']:.4f}"
            panels.append(lane_panel(r,label=lab))
        S=Image.new('RGB',(720,170*4)); [S.paste(p,(0,170*k)) for k,p in enumerate(panels)]
        S.resize((1440,1360),Image.BICUBIC).save(f'{out}/cmp{i:04d}.png')
        r=T['variants']['N2_derived']['rows'][i]
        W=lane_panel(r,W=240,H=170,x0=int(r['anchorX'])-100,label=f"N2 {i+1:03d} {r['key']}",ticks=False)
        W.resize((960,680),Image.BICUBIC).save(f'{out}/fol{i:04d}.png')
    mp4(f'{out}/cmp%04d.png','DOG1_TRACK_compare_N0_N1_N2_N3_x2.mp4'); mp4(f'{out}/fol%04d.png','DOG1_TRACK_N2_follow_x4.mp4')
