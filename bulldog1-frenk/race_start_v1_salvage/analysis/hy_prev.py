import sys; sys.argv=['x']
from hy_comp import *
import shutil
os.makedirs('hy_out',exist_ok=True)
HOLD=12
def lane_img(g,E,C,lbl,LW=700,LH=150,x0=40):
    lane=Image.new('RGB',(LW,LH),(190,186,192)); dr=ImageDraw.Draw(lane)
    for tx in range(0,LW,25): dr.line([(tx,LH-8),(tx,LH-2)],fill=(90,90,90))
    dr.line([(0,LH-8),(LW,LH-8)],fill=(90,90,90))
    lane.paste(g,(int(round(x0+(E+C)*SC)),5))
    ax=x0+E*SC+60; dr.line([(ax,0),(ax,LH)],fill=(230,40,40)); dr.text((4,2),lbl,fill=(0,0,0)); return lane
def build(nm):
    a=opt(nm); seq=a['seq']; D=a['D']
    st=stop[-1]
    items=[('RACE_STAND',st,0.0,0.0,0.0)]*HOLD+[(f'{k}{n}',frame(k,n),a['E'][i],a['Cp'][i],a['Copt'][i]) for i,(k,n) in enumerate(seq)]
    # RACE_STAND hold: engine E=0, comp 0 (unshifted stand), hold uses same coords as clip f1 with C=125 -> same screen position
    items=[( 'RACE_STAND',st,0.0,0.0,0.0)]*HOLD+[(l,x,E,Cp,Co) for (l,x,E,Cp,Co) in items[HOLD:]]
    d0=f'hy_out/{nm}'; os.makedirs(d0,exist_ok=True)
    for i,(l,x,E,Cp,Co) in enumerate(items):
        g=lab(comp(x)); isst=(l=='RACE_STAND')
        # stand is unshifted: screen offset = 125 shifted-equivalent
        sh=0 if not isst else 0
        # stand image cx 736, clip frames shifted images already; lane x uses E+C so stand has C=0 and image cx 736 = f1 (cx611)+125
        l1=lane_img(g,E,Cp,f'{nm} {i+1:03d} {l} | diag proportional C={Cp:+.0f}')
        l2=lane_img(g,E,Co,f'{nm} {i+1:03d} {l} | derived C={Co:+.0f} src px')
        S=Image.new('RGB',(700,300)); S.paste(l1,(0,0)); S.paste(l2,(0,150)); S=S.resize((1400,600),Image.BICUBIC); S.save(f'{d0}/lane{i:04d}.png')
        win=Image.new('RGB',(240,116),(190,186,192)); win.paste(g,(int(round(15+Co*SC)),0)); wd=ImageDraw.Draw(win); wd.line([(120,0),(120,116)],fill=(230,40,40))
        w4=win.resize((960,464),Image.BICUBIC); d4=ImageDraw.Draw(w4); d4.rectangle([0,0,600,13],fill=(0,0,0)); d4.text((3,1),f"{nm} {i+1:03d} {l} | derived C {Co:+.0f}; red=physical anchor",fill=(255,255,0)); w4.save(f'{d0}/follow{i:04d}.png')
        # A-style no compensation, in-place game scale
        full=comp(x if not isst else clip[0]); ga=lab(full); ga.save(f'{d0}/g{i:04d}.png')
        b=ga.resize((828,464),Image.BICUBIC); dd=ImageDraw.Draw(b); dd.rectangle([0,0,330,13],fill=(0,0,0)); dd.text((3,1),f"{nm} {i+1:03d} {l} (no comp)",fill=(255,255,0)); b.save(f'{d0}/b{i:04d}.png')
    mp4(f'{d0}/lane%04d.png',f'hy_out/DOG1_RS_{nm}_B_lanes_x2.mp4')
    mp4(f'{d0}/follow%04d.png',f'hy_out/DOG1_RS_{nm}_B_follow_x4.mp4')
    mp4(f'{d0}/b%04d.png',f'hy_out/DOG1_RS_{nm}_A_inplace_x4.mp4')
    mp4(f'{d0}/g%04d.png',f'hy_out/DOG1_RS_{nm}_A_inplace_gamescale.mp4',pad="pad=208:116:0:0:color=0xB9B5B8")
    return len(items)
if __name__=='__main__':
    for nm in ['V1_full','V2_via69','V3_via90','V4_short90']: print(nm,build(nm))
