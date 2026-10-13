import sys,os,json,subprocess,math; sys.path.insert(0,'.')
import numpy as np, cv2
from PIL import Image, ImageDraw
CL='alpha_pipeline/work/bf1/rgba_clean'
N=93                                   # game cut: f1..f93
L=json.load(open('/home/user/wt-codex/bulldog1-frenk/track_diag/timeline.json'))['layout']; SC=207/1276
frames=[np.array(Image.open(f'{CL}/r{i:04d}.png')) for i in range(N)]
# ---- synced keyframes (source-frame px, 1276x720; stand centre x=736, ground y=679) ----
# gaze/insect-measured path (f24-f62) + dodge moves at the two paw attempts + exit before the dog settles
KF=[(17,1290,228),(19,1262,222),(21,1215,206),(24,1146,193),(26,1100,153),(28,1061,154),(30,1033,162),(32,1031,161),
    (34,1060,190),(37,1090,238),(39,1062,292),(41,1060,262),     # first descent; gentle swing away from the face
    (43,1105,215),(45,1135,230),(47,1075,262),                    # first paw peak f40-43: butterfly flicks up and right, returns
    (50,1068,236),(53,1066,214),(56,1075,268),(58,1072,288),      # second attempt: hovers just beyond the reaching paw
    (62,1082,276),(66,1096,262),(68,1100,226),                    # at max reach it slips up over the paw
    (72,1140,176),(76,1195,128),(80,1245,92),(84,1305,60)]       # flies away up-right before the dog settles (f82-f91)
fr=np.array([k[0] for k in KF],float); X=np.array([k[1] for k in KF],float); Y=np.array([k[2] for k in KF],float)
def cr(t,P):                             # Catmull-Rom through keyframes (uniform param on index)
    i=np.searchsorted(fr,t)-1; i=int(np.clip(i,0,len(fr)-2)); u=(t-fr[i])/(fr[i+1]-fr[i])
    p0,p1,p2,p3=P[max(i-1,0)],P[i],P[i+1],P[min(i+2,len(P)-1)]
    return 0.5*((2*p1)+(-p0+p2)*u+(2*p0-5*p1+4*p2-p3)*u*u+(-p0+3*p1-3*p2+p3)*u**3)
MIND=34            # min distance (source px) from butterfly centre to the dog silhouette (wing radius 18 + clearance)
HAZE=(1022,268)    # residual haze at f37 (idx36)
path=[];mind=[]
for f in range(1,N+1):
    if f<fr[0] or f>fr[-1]: path.append(None); continue
    x=cr(f,X); y=cr(f,Y)
    m=(frames[f-1][...,3]>60).astype(np.uint8)
    dt=cv2.distanceTransform(1-m,cv2.DIST_L2,5)
    for _ in range(40):                       # push outward along the distance gradient until clear
        xi,yi=int(np.clip(x,2,1273)),int(np.clip(y,2,717)); d=dt[yi,xi]
        dh=math.hypot(x-HAZE[0],y-HAZE[1]) if f in (36,37,38) else 999
        if d>=MIND and dh>=60: break
        gx=dt[yi,min(xi+2,1275)]-dt[yi,max(xi-2,0)]; gy=dt[min(yi+2,719),xi]-dt[max(yi-2,0),xi]
        g=math.hypot(gx,gy) or 1; x+=3*gx/g; y+=3*gy/g
        if dh<60: x+=3*(x-HAZE[0])/(dh or 1); y+=3*(y-HAZE[1])/(dh or 1)
    xi,yi=int(np.clip(x,2,1273)),int(np.clip(y,2,717)); mind.append(float(dt[yi,xi])); path.append((x,y))
# ---- save synced trajectory ----
rows=[dict(frame=f,t=round((f-1)/24,3),x_src=round(p[0],1),y_src=round(p[1],1),dx_canvas=round((p[0]-736)*SC,1),dy_canvas=round((p[1]-679)*SC,1)) for f,p in enumerate(path,1) if p]
dist_min=min(mind)
json.dump(dict(note='synchronised proposal v2 (diagnostic; not in V3). frames 17-84, per-frame positions after collision avoidance (min distance to dog silhouette >= %d src px).'%MIND,min_distance_to_silhouette_src_px=round(dist_min,1),events={'enters':17,'first_paw_attempt':'f31-f46 peak ~f40-43','second_paw_attempt':'f52-f81 reach plateau f58-f73','exits':84,'dog_settled':91},per_frame=rows),open('butterfly_trajectory_synced.json','w'),indent=1)
print('frames with path',len(rows),'min distance',round(dist_min,1))
# ---- drawing: simple temporary butterfly ----
def draw_butterfly(img,cx,cy,span,f,ang):
    d=ImageDraw.Draw(img,'RGBA'); ph=2*math.pi*9*(f/24); flap=0.25+0.75*abs(math.cos(ph))
    w=span/2; h=span*0.38
    ca,sa=math.cos(ang),math.sin(ang)
    def P(x,y): return (cx+x*ca-y*sa,cy+x*sa+y*ca)
    for sgn in (-1,1):
        up=[P(0,0),P(-w*0.2,sgn*h*flap*1.0),P(-w*0.9,sgn*h*flap*1.25),P(-w*0.7,sgn*h*flap*0.2)]
        lo=[P(0,0),P(w*0.1,sgn*h*flap*0.9),P(w*0.7,sgn*h*flap*0.8),P(w*0.35,sgn*h*flap*0.1)]
        for poly,col in ((up,(255,165,30,235)),(lo,(255,205,70,235))):
            d.polygon(poly,fill=col,outline=(60,30,10,255))
    d.line([P(-w*0.35,0),P(w*0.45,0)],fill=(40,25,15,255),width=max(1,int(span/14)))
def mp4(pattern,out,fps=24):
    subprocess.run(f'ffmpeg -v error -y -framerate {fps} -i {pattern} -r {fps} -c:v libx264 -crf 15 -pix_fmt yuv420p -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" {out}',shell=True,check=True)
def comp_bg(a,bg):
    al=a[...,3:4]/255.; return (a[...,:3]*al+np.array(bg)*(1-al)).astype(np.uint8)
if __name__=='__main__':
    out='bfb_out'; os.makedirs(out,exist_ok=True)
    pts=[p for p in path]
    for i in range(N):
        f=i+1; p=path[i]; q=path[i+1] if i+1<N and path[i+1] else None
        ang=math.atan2((q[1]-p[1]),(q[0]-p[0])) if (p and q) else 0.0
        # (1) large in place, dark + light halves
        halves=[]
        for bg in [(34,38,46),(238,238,238)]:
            im=Image.fromarray(comp_bg(frames[i],bg)[20:700,380:1276]); 
            if p: draw_butterfly(im,p[0]-380,p[1]-20,70,f,ang)
            halves.append(im)
        S=Image.new('RGB',(halves[0].width*2,halves[0].height)); S.paste(halves[0],(0,0)); S.paste(halves[1],(halves[0].width,0))
        d=ImageDraw.Draw(S); d.rectangle([0,0,300,12],fill=(0,0,0)); d.text((3,0),f'f{f} {(f-1)/24:.2f}s  BUTTERFLY + temporary butterfly',fill=(255,255,0)); S.resize((S.width*3//4,S.height*3//4)).save(f'{out}/L{i:04d}.png')
        # (2) game scale on the V3 track (x3 zoom of the dog window) : butterfly span 11 canvas px
        W,H=300,170; x0=int(L['startX']+0.17*(L['finishX']-L['startX']+L['finishControlOffset']))-150
        base=Image.new('RGB',(W,H),(36,40,48)); dd=ImageDraw.Draw(base); yl=H-40; dd.rectangle([0,yl+2,W,H],fill=(58,64,76))
        a=frames[i].astype(np.float32); al=a[...,3:4]/255.; pm=np.concatenate([a[...,:3]*al,al*255],2)
        sp=Image.fromarray(np.clip(pm,0,255).astype(np.uint8),'RGBA').resize((207,116),Image.LANCZOS); x=np.array(sp).astype(np.float32); A=x[...,3:4]/255.
        rgb=np.clip(np.where(A>1e-3,x[...,:3]/np.maximum(A,1e-3),0),0,255)
        anchor=L['startX']+0.17*(L['finishX']-L['startX']+L['finishControlOffset'])-x0; left=int(round(anchor-148)); top=yl-116+6
        arr=np.array(base).astype(np.float32); arr[top:top+116,left:left+207]=arr[top:top+116,left:left+207]*(1-A)+rgb*A
        g=Image.fromarray(np.clip(arr,0,255).astype(np.uint8))
        if p: draw_butterfly(g,left+p[0]*SC,top+p[1]*SC,11,f,ang)
        dd=ImageDraw.Draw(g); dd.rectangle([0,0,W,12],fill=(0,0,0)); dd.text((3,0),f'game scale f{f}: temporary butterfly',fill=(255,255,0))
        g.resize((W*4,H*4),Image.BICUBIC).save(f'{out}/G{i:04d}.png')
    mp4(f'{out}/L%04d.png','DOG1_BUTTERFLY_v1_with_temp_butterfly_large.mp4'); mp4(f'{out}/G%04d.png','DOG1_BUTTERFLY_v1_with_temp_butterfly_gamescale_x4.mp4')
