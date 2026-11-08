#!/usr/bin/env python3
"""STOP shift array for Luna (contract 'shift', as Frenk's STOP V4): the Kling camera did not hold her still, so her torso drifts forward up to
~110 px of the full frame during STOP and back during the settle, which in V3 (where the physics moves the sprite) would read as a lurch and a
slide back. shift_k = -(drift_k - drift_0 * w_k), w_k = 1 - k/36 on the moving part (so the entry from RUN #71 is untouched) and 0 on the tail
(full stabilisation on the stand). drift = alpha-weighted torso centre (rows 200-520) minus RACE_STAND's. usage: tools_stop_shift.py STOP_RGBA RUN_RGBA OUT.json"""
import sys,json
import numpy as np
from PIL import Image
SD,RD,OUT=sys.argv[1:4]
def tcx(d,i):
    a=np.asarray(Image.open(f'{d}/r{i:04d}.png'))[...,3][200:520].astype(float);return float((a.sum(0)*np.arange(1276)).sum()/a.sum())
rs=tcx(RD,0);moving=list(range(0,8))+list(range(18,47));tail=list(range(47,69))
dr=[tcx(SD,i)-rs for i in moving+tail]
sh=[-(dr[k]-dr[0]*(1-k/36)) if k<37 else -dr[k] for k in range(len(dr))]
res={'order':{'moving':moving,'tail':tail},'driftFullPx':[round(x,1) for x in dr],'shiftFullPx':[round(x,1) for x in sh],'shiftSpritePx':[round(x*207/1276,2) for x in sh],
     'note':'apply as sprite x offset per STOP frame (moving 37 + tail 22); entry shift 0 (RUN #71 unshifted), end shift ~ -1 px'}
json.dump(res,open(OUT,'w'),indent=1);print('max |shift| full px',max(abs(x) for x in sh),' end',sh[-1])
