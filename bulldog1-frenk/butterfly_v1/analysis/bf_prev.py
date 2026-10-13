import sys,os,json,subprocess; sys.path.insert(0,'.')
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from hy_load import stop, rd
CL='alpha_pipeline/work/bf1/rgba_clean'
bf=[rd(f'{CL}/r{i:04d}.png') for i in range(121)]
L=json.load(open('/home/user/wt-codex/bulldog1-frenk/track_diag/timeline.json'))['layout']; SC=207/1276
def prem_resize(a,size):
    a=a.astype(np.float32); al=a[...,3:4]/255.; pm=np.concatenate([a[...,:3]*al,al*255],2)
    im=Image.fromarray(np.clip(pm,0,255).astype(np.uint8),'RGBA').resize(size,Image.LANCZOS); x=np.array(im).astype(np.float32); A=x[...,3:4]/255.
    return np.clip(np.where(A>1e-3,x[...,:3]/np.maximum(A,1e-3),0),0,255),A
def mp4(pattern,out,fps=24):
    subprocess.run(f'ffmpeg -v error -y -framerate {fps} -i {pattern} -r {fps} -c:v libx264 -crf 15 -pix_fmt yuv420p -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" {out}',shell=True,check=True)
def comp_bg(a,bg):
    al=a[...,3:4]/255.; return (a[...,:3]*al+np.array(bg)*(1-al)).astype(np.uint8)
def track(a,W=720,H=170,x0=380,label='',kf=None,t=0):
    px=lambda p:L['startX']+p*(L['finishX']-L['startX']+L['finishControlOffset'])
    img=Image.new('RGB',(W,H),(36,40,48)); d=ImageDraw.Draw(img); yl=H-40; d.rectangle([0,yl+2,W,H],fill=(58,64,76))
    for k in range(200):
        xx=px(k*0.01)-x0
        if 0<=xx<W: d.line([(xx,yl+2),(xx,yl+(10 if k%5==0 else 5))],fill=(120,128,140))
    anchor=px(0.17)-x0; d.line([(anchor,12),(anchor,yl)],fill=(230,60,60))
    rgb,A=prem_resize(a,(207,116)); left=int(round(anchor-148)); top=yl-116+6
    base=np.array(img).astype(np.float32); ys,ye=top,top+116; xs,xe=left,left+207
    base[ys:ye,xs:xe]=base[ys:ye,xs:xe]*(1-A)+rgb*A
    img=Image.fromarray(np.clip(base,0,255).astype(np.uint8)); d=ImageDraw.Draw(img)
    if kf:
        # diagnostic butterfly marker from the trajectory proposal (canvas px relative to dog stand centre / ground)
        bx=anchor-148+736*SC+kf[0]; by=top+679*SC+kf[1]      # kf already canvas offsets from stand centre/ground
        d.ellipse([bx-4,by-4,bx+4,by+4],fill=(255,210,40),outline=(0,0,0))
    d.rectangle([0,0,W,12],fill=(0,0,0)); d.text((3,0),label,fill=(255,255,0)); return img
if __name__=='__main__':
    out='bf_out'; os.makedirs(out,exist_ok=True)
    T=json.load(open('/home/user/wt-codex/bulldog1-frenk/butterfly_v1/butterfly_trajectory_proposal.json'))['keyframes']
    fr=np.array([k['frame'] for k in T]); dx=np.array([k['dx_canvas'] for k in T]); dy=np.array([k['dy_canvas'] for k in T])
    for i in range(121):
        f=i+1
        kf=None
        if fr[0]<=f<=fr[-1]: kf=(float(np.interp(f,fr,dx)),float(np.interp(f,fr,dy)))
        pan=[track(bf[i],label=f'BUTTERFLY v1 f{f} {(f-1)/24:.2f}s (game scale, no butterfly)'),track(bf[i],label=f'f{f}: + proposed butterfly path (diagnostic dot)',kf=kf)]
        S=Image.new('RGB',(720,340)); S.paste(pan[0],(0,0)); S.paste(pan[1],(0,170)); S.resize((1440,680),Image.BICUBIC).save(f'{out}/g{i:04d}.png')
        # follow x4 (window around the dog), with dot
        W=track(bf[i],W=300,H=170,x0=int(L['startX']+0.17*(L['finishX']-L['startX']+L['finishControlOffset']))-150,label=f'f{f} follow x4 (dot = proposed butterfly)',kf=kf)
        W.resize((1200,680),Image.BICUBIC).save(f'{out}/f{i:04d}.png')
        # light/dark/magenta preview crop
        crop=(slice(30,700),slice(380,1100))
        tiles=[Image.fromarray(comp_bg(bf[i],bg)[crop]) for bg in [(255,255,255),(30,30,34),(255,0,255)]]
        T3=Image.new('RGB',(tiles[0].width*3,tiles[0].height)); [T3.paste(t,(j*tiles[0].width,0)) for j,t in enumerate(tiles)]
        T3.resize((T3.width*2//3,T3.height*2//3)).save(f'{out}/b{i:04d}.png')
    mp4(f'{out}/g%04d.png','DOG1_BUTTERFLY_v1_gamescale_track_x2.mp4'); mp4(f'{out}/f%04d.png','DOG1_BUTTERFLY_v1_follow_x4_with_path.mp4'); mp4(f'{out}/b%04d.png','DOG1_BUTTERFLY_v1_alpha_preview_white_dark_magenta.mp4')
