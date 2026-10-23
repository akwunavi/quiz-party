#!/usr/bin/env python3
"""Pups selection: alpha geometry (source px, 1276x720) of the IDLE loop and the G0 FRONT_STAND - body centre cx/cy (alpha weighted),
paw line (lowest row alpha>128), top, height, area - and the seams that matter for selection at any moment:
loop wrap f239->f0, every gate frame -> G0 (future SELECTED start), G0 -> f1 (future RETURN end -> IDLE), plus ordinary IDLE steps.
usage: metrics.py OUT.json"""
import sys,os,json,subprocess,tempfile,numpy as np
from PIL import Image
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));P=os.path.dirname(H)
def geo(a):
    a=a.astype(float);m=a>128;ys,xs=np.nonzero(m)
    return dict(cx=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),2),cy=round(float((a.sum(1)*np.arange(a.shape[0])).sum()/a.sum()),2),
                bottom=int(ys.max()),top=int(ys.min()),height=int(ys.max()-ys.min()+1),area=int(m.sum()))
T=tempfile.mkdtemp();subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',f'{P}/idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm','-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
I=[geo(np.asarray(Image.open(f'{T}/a{n:03d}.png'))[...,3]) for n in range(1,241)]
G=geo(np.asarray(Image.open(f'{P}/front_stand_g0/G0_FRONT_STAND_alpha_1276.png'))[...,3])
gates=json.load(open(f'{H}/results/gates.json'))['gates']
d=lambda a,b:dict(dcx=round(b['cx']-a['cx'],2),dcy=round(b['cy']-a['cy'],2),dbottom=b['bottom']-a['bottom'],dheight=b['height']-a['height'])
steps=[d(I[i-1],I[i]) for i in range(1,240)]
res=dict(idle=I,G0=G,wrap_f239_f0=d(I[239],I[0]),G0_to_f1=d(G,I[1]),f0_vs_G0=d(G,I[0]),
  gate_to_G0={g:d(I[g],G) for g in gates},
  idle_step_abs_p50={k:float(np.median([abs(s[k]) for s in steps])) for k in ('dcx','dcy','dbottom','dheight')},
  idle_step_abs_p90={k:float(np.percentile([abs(s[k]) for s in steps],90)) for k in ('dcx','dcy','dbottom','dheight')},
  idle_bottom_range=[min(x['bottom'] for x in I),max(x['bottom'] for x in I)],idle_height_range=[min(x['height'] for x in I),max(x['height'] for x in I)])
gt=list(res['gate_to_G0'].values());res['gate_to_G0_max_abs']={k:max(abs(x[k]) for x in gt) for k in ('dcx','dcy','dbottom','dheight')}
json.dump(res,open(sys.argv[1],'w'),indent=1)
for k in ('wrap_f239_f0','G0_to_f1','f0_vs_G0','gate_to_G0_max_abs','idle_step_abs_p50','idle_step_abs_p90','idle_bottom_range','idle_height_range'):print(k,res[k])
