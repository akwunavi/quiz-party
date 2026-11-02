"""Measure projected alpha collisions for the old and proposed lane geometry."""
import json
from pathlib import Path
import numpy as np
from PIL import Image

HERE=Path(__file__).resolve().parent
W,H,S=1920,1080,37
ROSTER=[('frank',203),('zephyr',209),('pups',200),('frank',203),('zephyr',209)]
ATLASES={key:Image.open(HERE/'assets'/f'{key}-run.png').convert('RGBA') for key in ('frank','zephyr','pups')}
FRAMES={key:[atlas.crop(((n%4)*384,(n//4)*216,(n%4+1)*384,(n//4+1)*216)).getchannel('A') for n in range(12)] for key,atlas in ATLASES.items()}
LAYOUTS={
 'before':{'top':390,'step':120,'foot_offset':98,'heights':[132+i*10 for i in range(5)]},
 'after':{'top':330,'step':148,'foot_offset':95,'heights':[128+i*9 for i in range(5)]},
}

def world_x(t,i):
    speed=[4.70,4.90,5.12,4.77,4.83][i]
    lead=[0,.35,-.25,.85,-.7][i]
    pause=max(0,min(1.2,t-6)) if i==2 else 0
    return lead+speed*(t-pause)+min(t,1.2)*.4

def masks(layout,positions,phase):
    result=[]
    camera=sorted(positions)[2]*.70+13
    for lane,((key,bottom),wx) in enumerate(zip(ROSTER,positions)):
        height=layout['heights'][lane];width=height*384/216
        screen_x=W*.52+(wx-camera)*S
        ground=layout['top']+lane*layout['step']+layout['foot_offset']-.025*screen_x+24
        x0=round(screen_x-width/2);y0=round(ground-height*bottom/216)
        alpha=FRAMES[key][(phase+lane*2)%12].resize((round(width),round(height)),Image.Resampling.BILINEAR)
        a=np.asarray(alpha)>80
        mask=np.zeros((H,W),dtype=bool)
        left=max(0,x0);right=min(W,x0+a.shape[1]);top=max(0,y0);bot=min(H,y0+a.shape[0])
        if left<right and top<bot:mask[top:bot,left:right]=a[top-y0:bot-y0,left-x0:right-x0]
        yy,xx=np.where(mask)
        result.append({'mask':mask,'bbox':[int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1)] if len(xx) else None,'ground':ground,'screen_x':screen_x})
    return result

SCENARIOS={
 'all_same_x':lambda t:[40]*5,
 'adjacent_overtake':lambda t:[40,40+(t-1)*.7,39,42,41],
 'one_lags':lambda t:[40,40,34,40,40],
 'independent_speeds':lambda t:[world_x(t,i) for i in range(5)],
}
report={}
for layout_name,layout in LAYOUTS.items():
    report[layout_name]={}
    for scenario,positions_at in SCENARIOS.items():
        worst=0;worst_case=None;closest=999
        sample_times=[0,.5,1,1.5,2,4,6,8,10,14,18] if scenario=='independent_speeds' else [0,.5,1,1.5,2]
        for t in sample_times:
            positions=positions_at(t)
            for phase in range(12):
                sprites=masks(layout,positions,phase)
                for lane in range(4):
                    overlap=int(np.count_nonzero(sprites[lane]['mask']&sprites[lane+1]['mask']))
                    gap=sprites[lane+1]['bbox'][1]-sprites[lane]['bbox'][3]
                    if gap<closest:closest=gap
                    if overlap>worst:worst=overlap;worst_case={'t':t,'phase':phase,'lanes':[lane,lane+1],'positions':positions}
        report[layout_name][scenario]={'max_adjacent_overlap_pixels':worst,'min_vertical_bbox_gap_px':closest,'worst_case':worst_case}
(HERE/'review/LANE_ALPHA_AUDIT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
