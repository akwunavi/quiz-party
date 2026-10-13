import sys,os,json,subprocess; sys.path.insert(0,'.')
import numpy as np
from PIL import Image, ImageDraw
from hy_load import stop, rd
CL='alpha_pipeline/work/bf1/rgba_clean'; N=93
bf=[rd(f'{CL}/r{i:04d}.png') for i in range(N)]; stand=stop[-1]
seq=[('RACE_STAND hold',stand)]*12+[(f'BUTTERFLY f{i+1}',bf[i]) for i in range(N)]+[('RACE_STAND hold',stand)]*24
def bg(a,c): al=a[...,3:4]/255.; return (a[...,:3]*al+np.array(c)*(1-al)).astype(np.uint8)
def gs(a):
    a=a.astype(np.float32); al=a[...,3:4]/255.; pm=np.concatenate([a[...,:3]*al,al*255],2)
    im=Image.fromarray(np.clip(pm,0,255).astype(np.uint8),'RGBA').resize((207,116),Image.LANCZOS); x=np.array(im).astype(np.float32); A=x[...,3:4]/255.
    return np.clip(np.where(A>1e-3,x[...,:3]/np.maximum(A,1e-3),0),0,255),A
os.makedirs('bfs_out',exist_ok=True)
for i,(lab,a) in enumerate(seq):
    P=[Image.fromarray(bg(a,c)[20:700,380:1100]).resize((360,340)) for c in [(255,255,255),(30,30,34)]]
    rgb,A=gs(a); t=Image.new('RGB',(240,170),(36,40,48)); arr=np.array(t).astype(np.float32); arr[40:156,16:223]=arr[40:156,16:223]*(1-A)+rgb*A; G=Image.fromarray(arr.astype(np.uint8)).resize((480,340),Image.BICUBIC)
    S=Image.new('RGB',(360*2+480,340)); S.paste(P[0],(0,0)); S.paste(P[1],(360,0)); S.paste(G,(720,0)); d=ImageDraw.Draw(S); d.rectangle([0,0,400,12],fill=(0,0,0)); d.text((3,0),f'{i+1:03d} {lab}  (white | dark | game scale)',fill=(255,255,0)); S.save(f'bfs_out/s{i:04d}.png')
subprocess.run('ffmpeg -v error -y -framerate 24 -i bfs_out/s%04d.png -c:v libx264 -crf 15 -pix_fmt yuv420p -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" DOG1_BUTTERFLY_v1_game_cut_seam_check.mp4',shell=True,check=True)
# numeric: boundary steps
def feats(a):
    al=a[...,3]>127; return al
def iou(a,b): return float((a&b).sum()/(a|b).sum())
print('stand->f1',round(iou(feats(stand),feats(bf[0])),4),'f93->stand',round(iou(feats(bf[-1]),feats(stand)),4),'f92->f93',round(iou(feats(bf[-2]),feats(bf[-1])),4))
