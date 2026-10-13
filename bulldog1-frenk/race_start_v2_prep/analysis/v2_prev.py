import sys; sys.path.insert(0,'.')
from hy_load import *
from hy_prev import lane_img
from PIL import ImageDraw
from rs_previews import lab, mp4
SC=207/1276
frames=[('RACE_STAND',stop[-1],0)]*12+[(f'f{k}',clip[k-1],125) for k in [1,7,8,9,10,11,16]]+[('f16 = START IMAGE V2',clip[15],125)]*12
def render(items,outd,name,pair=False):
    for i,(l,x,C) in enumerate(items):
        g=lab(comp(x)); 
        win=Image.new('RGB',(240,116),(190,186,192)); win.paste(g,(15,0))   # stand image uses its own coordinates; clips already shifted -125
        # stand is unshifted: shift it left by 125 src px to the same sprite position as f1 for the follow window? no: show true screen positions
        pos=15+int(round((125-C+ (0 if l!='RACE_STAND' else 0))*SC)) 
        lane=lane_img(g,0.0,C if l!='RACE_STAND' else 0.0,f'{name} {i+1:03d} {l} | engine 0 | C={C if l!="RACE_STAND" else 0}')
        lane.resize((1400,300),Image.BICUBIC).save(f'{outd}/lane{i:04d}.png')
        w4=g.resize((828,464),Image.BICUBIC); d=ImageDraw.Draw(w4); d.rectangle([0,0,330,13],fill=(0,0,0)); d.text((3,1),f'{name} {i+1:03d} {l}',fill=(255,255,0)); w4.save(f'{outd}/b{i:04d}.png')
render(frames,'v2_out/p1','P1')
mp4('v2_out/p1/lane%04d.png','v2_out/DOG1_RS_V2_P1_stand_to_f16_lane_x2.mp4')
mp4('v2_out/p1/b%04d.png','v2_out/DOG1_RS_V2_P1_stand_to_f16_x4.mp4')
rej=[('RACE_STAND',stop[-1],0)]*12+[('f1',clip[0],125)]*4+[('f16 (snap, rejected)',clip[15],125)]*12
render(rej,'v2_out/p1r','P1r')
mp4('v2_out/p1r/b%04d.png','v2_out/DOG1_RS_V2_P1_REJECTED_snap_f1_to_f16_x4.mp4')
