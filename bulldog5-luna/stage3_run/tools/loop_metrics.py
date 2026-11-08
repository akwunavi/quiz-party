#!/usr/bin/env python3
"""Per-tick metrics of the Luna RUN loop variants, over two loop passes so the seam is included (24 fps ticks):
leg motion (mean |dRGB| in the leg band y 480-700 of the full frame, over gray), whole-body motion, body centre (alpha-weighted, torso band
y 200-520) and lowest point (paw contact). A tick with leg motion ~0 is a micro-freeze. usage: loop_metrics.py LOOPS_DIR OUT.json"""
import sys,json,os
import numpy as np
from PIL import Image
D,OUT=sys.argv[1:3];res={}
def load(p):
    im=Image.open(p).convert('RGBA');a=np.asarray(im).astype(np.float32);al=a[...,3:]/255.
    comp=a[...,:3]*al+128*(1-al);return comp,a[...,3]
for v in ('N10','H12','I12','M12','C12'):
    n=len([f for f in os.listdir(f'{D}/{v}') if f.endswith('.png')]);fr=[load(f'{D}/{v}/{k:02d}.png') for k in range(n)]
    seq=fr+fr;leg=[];body=[];cy=[];cx=[];bot=[]
    for k in range(len(seq)):
        c,a=seq[k];t=a[200:520].astype(np.float64);ys,xs=np.nonzero(a>128)
        cx.append(float((t.sum(0)*np.arange(1276)).sum()/t.sum()));cy.append(float((t.sum(1)*np.arange(200,520)).sum()/t.sum()));bot.append(int(ys.max()))
        if k: p=seq[k-1][0];leg.append(float(np.abs(c[480:700]-p[480:700]).mean()));body.append(float(np.abs(c-p).mean()))
    L=np.array(leg[:n]);res[v]={'frames':n,'loopSeconds':round(n/24,3),'legMotionPerTick':[round(x,2) for x in leg[:n]],
      'legMin':round(float(L.min()),2),'legMedian':round(float(np.median(L)),2),'microFreezes':int((L<0.5*np.median(L)).sum()),'legUnevennessCV':round(float(L.std()/L.mean()),2),
      'seamLeg':round(leg[n-1],2),'bodyCenterYrange':round(max(cy[:n])-min(cy[:n]),1),'bodyCenterXrange':round(max(cx[:n])-min(cx[:n]),1),
      'seamCenterJump':[round(cx[n]-cx[n-1],1),round(cy[n]-cy[n-1],1)],'lowestPointRange':[min(bot[:n]),max(bot[:n])],'lowestPointPerTick':bot[:n]}
json.dump(res,open(OUT,'w'),indent=1)
for v,r in res.items(): print(v,{k:r[k] for k in ('frames','legMin','legMedian','microFreezes','legUnevennessCV','seamLeg','bodyCenterYrange','seamCenterJump','lowestPointRange')})
