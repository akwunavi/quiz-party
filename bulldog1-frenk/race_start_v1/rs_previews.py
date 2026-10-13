import sys,subprocess,os; sys.path.insert(0,'stop')
import numpy as np
from PIL import Image,ImageFilter,ImageDraw
SC=207/1276                      # V3 lab sprite scale
plate=np.array(Image.open('stop/plate_1276x720.png')).astype(np.float32)
def rd(p): return np.array(Image.open(p).convert('RGBA'))
def comp(x,dx=0):
    """alpha frame -> RGB on plate with soft contact shadow; dx = horizontal offset in source px (compensation)"""
    al=x[...,3].astype(np.float32)/255; ys,xs=np.nonzero(al>0.5); bot=ys.max(); x0,x1=xs.min(),xs.max()
    S=Image.new('L',(1276,720),0); d=ImageDraw.Draw(S); cx=(x0+x1)//2-50; wd=int((x1-x0)*0.50); d.ellipse([cx-wd,bot-22,cx+wd,bot+10],fill=255)
    S=np.array(S.filter(ImageFilter.GaussianBlur(14))).astype(np.float32)/255; tint=np.array([0.78,0.82,0.92],dtype=np.float32)
    out=plate*(1-0.45*S[...,None]*(1-tint)); out=out*(1-al[...,None])+x[...,:3].astype(np.float32)*al[...,None]
    out=np.clip(out,0,255).astype(np.uint8)
    dx=int(round(dx))
    if dx: 
        o=np.empty_like(out)
        if dx>0: o[:,dx:]=out[:,:-dx]; o[:,:dx]=out[:,:1].repeat(dx,axis=1)
        else: o[:,:dx]=out[:,-dx:]; o[:,dx:]=out[:,-1:].repeat(-dx,axis=1)
        out=o
    return out

SC=207/1276
def lab(im_rgb): return Image.fromarray(im_rgb).resize((207,116),Image.LANCZOS)
def run_alpha(n): return rd(f'b/full/f{n-39:03d}.png')
def mp4(pattern,out,fps=24,pad=None):
    vf=f'-vf "{pad}"' if pad else ''
    subprocess.run(f'ffmpeg -v error -y -framerate {fps} -i {pattern} -r {fps} -c:v libx264 -crf 15 -pix_fmt yuv420p {vf} {out}',shell=True,check=True)

def build_A(clip, outdir='rs_prevA'):
    os.makedirs(outdir,exist_ok=True)
    seq=[("RACE_STAND (= clip frame 1)",clip[0])]*12+[(f"RACE_START f{i+1}",c) for i,c in enumerate(clip)]
    loop=[91,92,93,94,95,96,97,98]+[n for _ in range(3) for n in range(87,99)]
    seq+=[(f"RUN #{n}",run_alpha(n)) for n in loop]
    for i,(l,x) in enumerate(seq):
        full=comp(x); Image.fromarray(full).crop((150,20,1100,700)).save(f'{outdir}/L{i:04d}.png')
        g=lab(full); g.save(f'{outdir}/g{i:04d}.png')
        b=g.resize((828,464),Image.BICUBIC); d=ImageDraw.Draw(b); d.rectangle([0,0,300,13],fill=(0,0,0)); d.text((3,1),f"A {i+1:03d} {l}",fill=(255,255,0)); b.save(f'{outdir}/b{i:04d}.png')
    mp4(f'{outdir}/g%04d.png','dog1_race_start_v1_A_gamescale.mp4',pad="pad=208:116:0:0:color=0xB9B5B8")
    mp4(f'{outdir}/b%04d.png','dog1_race_start_v1_A_x4_labeled.mp4')
    mp4(f'{outdir}/L%04d.png','dog1_race_start_v1_A_large.mp4')
    return len(seq)

def build_B(clip, stop_frames, comp_profile, outdir='rs_prevB'):
    os.makedirs(outdir,exist_ok=True)
    V0=171.7; Ds=73/24; D=73/24
    segs=[]
    # (label, rgba, world_src, comp_src)
    for i,x in enumerate(stop_frames):
        u=i/24/Ds; E=(V0*Ds/2)*(2*u-2*u**3+u**4); segs.append((f"STOP f{i+1}",x,E,0.0))
    E_stop=(V0*Ds/2)
    for i in range(12): segs.append(("RACE_STAND (STOP last frame)",stop_frames[-1],E_stop,0.0))
    for i,x in enumerate(clip):
        u=i/24/D; E=E_stop+(V0*D/2)*(2*u**3-u**4); segs.append((f"RACE_START f{i+1}",x,E,float(comp_profile[i])))
    E_start=E_stop+V0*D/2
    loop=[91,92,93,94,95,96,97,98]+[n for _ in range(3) for n in range(87,99)]
    for j,n in enumerate(loop): segs.append((f"RUN #{n}",run_alpha(n),E_start+V0*(j/24),0.0))
    LW,LH=700,150; x0=40
    rows=[]
    for i,(l,x,E,C) in enumerate(segs):
        full=comp(x); g=lab(full); lane=Image.new('RGB',(LW,LH),(190,186,192)); d=ImageDraw.Draw(lane)
        for tx in range(0,LW,25): d.line([(tx,LH-8),(tx,LH-2)],fill=(90,90,90))
        d.line([(0,LH-8),(LW,LH-8)],fill=(90,90,90))
        left=x0+(E+C)*SC; lane.paste(g,(int(round(left)),5))
        anchor=x0+E*SC+60       # physical (engine) position marker, no compensation
        d.line([(anchor,0),(anchor,LH)],fill=(230,40,40)); 
        d.text((4,2),f"B {i+1:03d} {l} | engine +{E:.0f} src px | comp {C:+.0f} src px ({C*SC:+.1f} lab px)",fill=(0,0,0))
        lane.resize((LW*2,LH*2),Image.BICUBIC).save(f'{outdir}/lane{i:04d}.png')
        # окно «следом за физической точкой»: видно только положение относительно якоря (клип + компенсация)
        win=Image.new('RGB',(240,116),(190,186,192)); win.paste(g,(int(round(15+C*SC)),0))
        wd=ImageDraw.Draw(win); wd.line([(120+0,0),(120,116)],fill=(230,40,40))
        w4=win.resize((960,464),Image.BICUBIC); d4=ImageDraw.Draw(w4); d4.rectangle([0,0,560,13],fill=(0,0,0)); d4.text((3,1),f"B-follow {i+1:03d} {l} | comp {C:+.0f} src px; red = physical anchor",fill=(255,255,0)); w4.save(f'{outdir}/follow{i:04d}.png')
    mp4(f'{outdir}/lane%04d.png','dog1_race_start_v1_B_game_lane_x2.mp4')
    mp4(f'{outdir}/follow%04d.png','dog1_race_start_v1_B_follow_x4.mp4')
    return len(segs)
