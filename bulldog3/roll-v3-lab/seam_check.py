#!/usr/bin/env python3
"""Measure approved clip joins; playback still determines visual acceptance."""
import json
from pathlib import Path
import numpy as np
from PIL import Image

ROOT=Path(__file__).resolve().parent
PATHS={
    'RUN':ROOT.parent/'race-start-v3-lab/assets/rocky-run.png',
    'STOP':ROOT.parent/'stop-v3-lab/assets/stop.png',
    'START':ROOT.parent/'race-start-v3-lab/assets/rocky-start.png',
    'ROLL':ROOT/'assets/rocky-roll.png',
}
PAIRS=[('RUN',16,'STOP',0),('STOP',36,'ROLL',0),('ROLL',111,'ROLL',112),
       ('ROLL',112,'ROLL',113),('ROLL',144,'START',0),('START',39,'RUN',0)]

def tile(name,n):
    im=Image.open(PATHS[name]).convert('RGBA')
    return np.asarray(im.crop(((n%24)*178,(n//24)*100,(n%24+1)*178,(n//24+1)*100)))

def metrics(a,b):
    aa=a[:,:,3]>127;bb=b[:,:,3]>127;both=aa&bb
    ya,xa=np.nonzero(aa);yb,xb=np.nonzero(bb)
    return {'silhouetteIoU':round(float(both.sum()/max((aa|bb).sum(),1)),4),
            'centroidDeltaPx':[round(float(xb.mean()-xa.mean()),2),round(float(yb.mean()-ya.mean()),2)],
            'opaqueRGBMeanAbsError':round(float(np.abs(a[:,:,:3].astype(float)-b[:,:,:3].astype(float))[both].mean()),2) if both.any() else None}

data={f'{a} #{i} → {b} #{j}':metrics(tile(a,i),tile(b,j)) for a,i,b,j in PAIRS}
(ROOT/'seam_metrics.json').write_text(json.dumps(data,indent=2)+'\n')
print(json.dumps(data,indent=2))
