# Pixel seams of the rendered lab (game scale 638x360, 4 backgrounds), from tools/lab_check.mjs output.
# For each CHAIN_<idx>: delay click -> SELECTED s0, diff at IDLE->SELECTED and SELECTED->IDLE, compared with ordinary neighbouring frames.
# usage: python3 seams_pixels.py LAB_OUT KEY... > results/seams_lab_pixels.json
import sys,json,os
import numpy as np
from PIL import Image
O=sys.argv[1];KEYS=sys.argv[2:]
def img(k,i):
    p=f'{O}/{k}/frames/f{i:04d}.png'
    return np.asarray(Image.open(p).convert('RGB'),dtype=np.float32)[40:] if os.path.exists(p) else None  # skip the text header
def d(a,b): return float(np.abs(a-b).mean())
res={'keys':{}}
for k in KEYS:
    t=json.load(open(f'{O}/{k}/timeline.json'));r={'frames':len(t)}
    pairs=[(i-1,i) for i in range(1,len(t)) if img(k,i-1) is not None and img(k,i) is not None]
    def kind(a,b):
        A,B=t[a],t[b]
        if A['clip']=='idle' and B['clip']=='sel': return 'IDLE->SELECTED'
        if A['clip']=='sel' and B['clip']=='idle': return 'SELECTED->IDLE'
        if A['clip']=='idle' and B['clip']=='idle' and A['f']==239 and B['f']==0: return 'IDLE wrap f239->f0'
        return 'ordinary '+A['clip']
    seams={};ordn={}
    for a,b in pairs:
        x=d(img(k,a),img(k,b));kd=kind(a,b);lab=f"{t[a]['clip']} {t[a]['f']} -> {t[b]['clip']} {t[b]['f']}"
        if kd.startswith('ordinary'): ordn.setdefault(kd,[]).append(x)
        else: seams[kd]={'pair':lab,'diff':round(x,3)}
        if x==0: r.setdefault('identical_neighbours',[]).append(lab)
    clk=[i for i,s in enumerate(t) if s.get('click')]
    if clk:
        s0=next(i for i,s in enumerate(t) if s['clip']=='sel')
        r['click_idle_frame']=t[clk[0]]['f'];r['gate']=t[s0-1]['f'];r['exit_frames']=s0-clk[0]-1;r['delay_s']=round((s0-clk[0]-1)/24,3)
        r['selected_frames']=sum(1 for s in t if s['clip']=='sel');r['reentry_idle_frame']=t[s0+r['selected_frames']]['f']
    r['seams']=seams;r['ordinary_neighbour_diff']={kd:{'n':len(v),'mean':round(float(np.mean(v)),3),'max':round(float(np.max(v)),3)} for kd,v in ordn.items()}
    res['keys'][k]=r
res['note']='diff = mean |ΔRGB| (0-255) of the whole lab canvas (4 backgrounds, 638x360 each) between neighbouring frames; only frames around transitions are kept by the runner.'
print(json.dumps(res,ensure_ascii=False,indent=1))
