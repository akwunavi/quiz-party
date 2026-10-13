import sys; sys.path.insert(0,'.')
import numpy as np
from PIL import Image
from rs_previews import rd, comp, run_alpha, plate
def half(a): return np.array(Image.fromarray(a).resize((638,360),Image.BILINEAR))
clip=[rd(f'alpha_pipeline/work/rs_v1/rgba/r{i:04d}.png') for i in range(73)]
stop=[rd(f'stop_alpha_dec/s{i:03d}.png') for i in range(1,74)]
run={n:run_alpha(n) for n in range(40,121)}
def prep(a):
    c=comp(a); al=a[...,3]>127
    return half(c).astype(np.float32), np.array(Image.fromarray((al*255).astype(np.uint8)).resize((638,360)))>127, al
