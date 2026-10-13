import sys,os,json,subprocess; sys.path.insert(0,'.')
import numpy as np
from PIL import Image, ImageDraw
from hy_load import stop, rd
CL='alpha_pipeline/work/sp1/rgba_clean'; S0,E0=10,186            # idx of f11 .. f187
fr=[rd(f'{CL}/r{i:04d}.png') for i in range(193)]; stand=stop[-1]
L=json.load(open('/home/user/wt-codex/bulldog1-frenk/track_diag/timeline.json'))['layout']
def bg(a,c): al=a[...,3:4]/255.; return (a[...,:3]*al+np.array(c)*(1-al)).astype(np.uint8)
def gs(a):
    a=a.astype(np.float32); al=a[...,3:4]/255.; pm=np.concatenate([a[...,:3]*al,al*255],2)
    im=Image.fromarray(np.clip(pm,0,255).astype(np.uint8),'RGBA').resize((207,116),Image.LANCZOS); x=np.array(im).astype(np.float32); A=x[...,3:4]/255.
    return np.clip(np.where(A>1e-3,x[...,:3]/np.maximum(A,1e-3),0),0,255),A
def mp4(p,o,fps=24): subprocess.run(f'ffmpeg -v error -y -framerate {fps} -i {p} -r {fps} -c:v libx264 -crf 15 -pix_fmt yuv420p -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" {o}',shell=True,check=True)
seq=[('RACE_STAND hold',stand)]*12+[(f'SNIFF_PEE f{i+1}',fr[i]) for i in range(S0,E0+1)]+[('RACE_STAND hold',stand)]*24
os.makedirs('sps_out',exist_ok=True)
for i,(lab,a) in enumerate(seq):
    P=[Image.fromarray(bg(a,c)[20:700,300:1100]).resize((400,340)) for c in [(255,255,255),(30,30,34),(255,0,255)]]
    rgb,A=gs(a); W,H=300,170; t=Image.new('RGB',(W,H),(36,40,48)); d=ImageDraw.Draw(t); d.rectangle([0,H-38,W,H],fill=(58,64,76)); arr=np.array(t).astype(np.float32); x0=45; y0=H-116-34
    arr[y0:y0+116,x0:x0+207]=arr[y0:y0+116,x0:x0+207]*(1-A)+rgb*A; G=Image.fromarray(arr.astype(np.uint8)).resize((600,340),Image.BICUBIC)
    Sx=Image.new('RGB',(1200+600,340)); [Sx.paste(P[j],(j*400,0)) for j in range(3)]; Sx.paste(G,(1200,0)); dd=ImageDraw.Draw(Sx); dd.rectangle([0,0,480,12],fill=(0,0,0)); dd.text((3,0),f'{i+1:03d} {lab} (white | dark | magenta | game scale)',fill=(255,255,0)); Sx.save(f'sps_out/s{i:04d}.png')
mp4('sps_out/s%04d.png','DOG1_SNIFF_PEE_v1_game_cut_check_white_dark_magenta_gamescale.mp4')
# game-scale readability sheet (x1 sprite, enlarged x3 nearest to mimic the real pixel size) key phases
ks=[11,40,80,98,104,112,120,132,140,150,170,187]; tiles=[]
for k in ks:
    rgb,A=gs(fr[k-1]); t=np.full((116,207,3),(36,40,48),np.float32); t=t*(1-A)+rgb*A; im=Image.fromarray(t.astype(np.uint8)).resize((414,232),Image.NEAREST); ImageDraw.Draw(im).text((3,2),f'f{k} {(k-1)/24:.2f}s',fill=(255,255,0)); tiles.append(im)
Sx=Image.new('RGB',(414*4,232*3)); [Sx.paste(t,((i%4)*414,(i//4)*232)) for i,t in enumerate(tiles)]; Sx.save('sp1/gamescale_readability.png')
def feats(a):
    al=a[...,3]>127; return al
def iou(a,b): return round(float((a&b).sum()/(a|b).sum()),4)
st=feats(stand); print('stand->f11',iou(st,feats(fr[S0])),'f187->stand',iou(feats(fr[E0]),st),'f193->stand',iou(feats(fr[192]),st),'f187 vs f186',iou(feats(fr[E0]),feats(fr[E0-1])))
print('frames kept',E0-S0+1,'=',round((E0-S0+1)/24,3),'s')
