#!/usr/bin/env python3
"""Measure alpha sprite-cell seams; visual playback remains the acceptance gate."""
import json
from pathlib import Path
import numpy as np
from PIL import Image

ROOT=Path(__file__).resolve().parent
OLD=ROOT.parent
PATHS={
    'RUN':OLD/'race-start-v3-lab/assets/rocky-run.png',
    'STOP':OLD/'stop-v3-lab/assets/stop.png',
    'START':OLD/'race-start-v3-lab/assets/rocky-start.png',
    'SNIFF':ROOT/'assets/rocky-sniff-pee.png',
}
PAIR=[('RUN',16,'STOP',0),('STOP',36,'SNIFF',0),('SNIFF',120,'SNIFF',121),
      ('SNIFF',168,'SNIFF',169),('SNIFF',176,'SNIFF',177),
      ('SNIFF',239,'START',0),('START',39,'RUN',0)]

def tile(name,n):
    im=Image.open(PATHS[name]).convert('RGBA')
    return np.asarray(im.crop(((n%24)*178,(n//24)*100,(n%24+1)*178,(n//24+1)*100)))

def metrics(a,b):
    A=a[:,:,3]>127;B=b[:,:,3]>127;both=A&B
    ya,xa=np.nonzero(A);yb,xb=np.nonzero(B)
    return {'silhouetteIoU':round(float(both.sum()/max((A|B).sum(),1)),4),
            'centroidDeltaPx':[round(float(xb.mean()-xa.mean()),2),round(float(yb.mean()-ya.mean()),2)],
            'opaqueRGBMeanAbsError':round(float(np.abs(a[:,:,:3].astype(float)-b[:,:,:3].astype(float))[both].mean()),2) if both.any() else None}

data={f'{a} #{i} → {b} #{j}':metrics(tile(a,i),tile(b,j)) for a,i,b,j in PAIR}
(ROOT/'seam_metrics.json').write_text(json.dumps(data,indent=2)+'\n')
print(json.dumps(data,indent=2))
