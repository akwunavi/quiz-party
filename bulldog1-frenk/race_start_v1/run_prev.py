import sys; sys.path.insert(0,'.')
import numpy as np
from rs_previews import *
clip=[rd(f'alpha_pipeline/work/rs_v1/rgba/r{i:04d}.png') for i in range(73)]
stop=[rd(f'stop_alpha_dec/s{i:03d}.png') for i in range(1,74)]
print(clip[0].shape, stop[0].shape)
print('A',build_A(clip))
u=np.arange(73)/24/(73/24)
print('B',build_B(clip,stop,125*(1-(2*u**3-u**4))))
