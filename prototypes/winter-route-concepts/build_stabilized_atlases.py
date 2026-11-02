"""Derive display-only torso anchor translations from unchanged RUN alpha frames."""
import json
from pathlib import Path
import numpy as np
from PIL import Image

HERE=Path(__file__).resolve().parent
SOURCE=HERE.parent/'winter-arena-lab'/'assets'
OUT=HERE/'camera-lab'/'assets';OUT.mkdir(parents=True,exist_ok=True)
report={}
for name in ('frank','zephyr','dog4'):
    original=Image.open(SOURCE/f'{name}-run-atlas.png').convert('RGBA')
    original.save(OUT/f'{name}-raw.png',optimize=True)
    frames=[];centers=[]
    for f in range(12):
        tile=original.crop(((f%4)*384,(f//4)*216,(f%4+1)*384,(f//4+1)*216))
        a=np.asarray(tile)[:,:,3]
        yy,xx=np.nonzero(a[65:155,70:310]>128)
        centers.append(float(xx.mean()+70))
        frames.append(tile)
    target=float(np.median(centers));stable=Image.new('RGBA',original.size);offsets=[]
    for f,tile in enumerate(frames):
        dx=round(target-centers[f]);assert abs(dx)<=8
        # Preserve every source pixel and all vertical gait motion. This is
        # placement correction inside the sprite tile, not image deformation.
        stable.alpha_composite(tile,((f%4)*384+dx,(f//4)*216))
        offsets.append(dx)
    stable.save(OUT/f'{name}-stable.png',optimize=True)
    report[name]={'source':str(SOURCE/f'{name}-run-atlas.png'),
                  'torsoX':centers,'targetX':target,'displayShiftX':offsets,
                  'sourceSpanPx':max(centers)-min(centers),
                  'residualSpanPx':max(x+d for x,d in zip(centers,offsets))-min(x+d for x,d in zip(centers,offsets))}
(HERE/'camera-lab'/'ANCHOR_DIAGNOSTIC.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({n:(round(r['sourceSpanPx'],1),round(r['residualSpanPx'],1)) for n,r in report.items()}))
