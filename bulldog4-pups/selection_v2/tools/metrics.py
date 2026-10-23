#!/usr/bin/env python3
"""Pups full selection chain: alpha geometry (source px, 1276x720) of the IDLE loop and SELECTED - body centre cx/cy (alpha weighted),
paw line (lowest row alpha>128), top, height, area - and the chain seams: every gate frame -> SELECTED s0, SELECTED s120 -> IDLE f1 (REENTRY)
and -> f0 (alternative), IDLE loop wrap; plus ordinary steps inside both clips for comparison. usage: metrics.py OUT.json"""
import sys,os,json,subprocess,tempfile,numpy as np
from PIL import Image
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));P=os.path.dirname(H)
def geo(a):
    a=a.astype(float);m=a>128;ys,xs=np.nonzero(m)
    return dict(cx=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),2),cy=round(float((a.sum(1)*np.arange(a.shape[0])).sum()/a.sum()),2),
                bottom=int(ys.max()),top=int(ys.min()),height=int(ys.max()-ys.min()+1),area=int(m.sum()))
def dec(w):
    T=tempfile.mkdtemp();subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',w,'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
    return [geo(np.asarray(Image.open(f'{T}/{n}'))[...,3]) for n in sorted(os.listdir(T))]
I=dec(f'{P}/idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm');S=dec(f'{P}/selected_v4_game/alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm')
G=geo(np.asarray(Image.open(f'{P}/front_stand_g0/G0_FRONT_STAND_alpha_1276.png'))[...,3])
gates=json.load(open(f'{H}/results/gates.json'))['gates']
d=lambda a,b:dict(dcx=round(b['cx']-a['cx'],2),dcy=round(b['cy']-a['cy'],2),dbottom=b['bottom']-a['bottom'],dheight=b['height']-a['height'])
def stat(seq):
    st=[d(seq[i-1],seq[i]) for i in range(1,len(seq))]
    return {q:{k:round(float(np.percentile([abs(s[k]) for s in st],q)),2) for k in ('dcx','dcy','dbottom','dheight')} for q in (50,90)}
res=dict(selected=S,SELECTED_s0_vs_G0=d(G,S[0]),SELECTED_s120_vs_G0=d(G,S[120]),
  gate_to_s0={g:d(I[g],S[0]) for g in gates},s120_to_f1=d(S[120],I[1]),s120_to_f0=d(S[120],I[0]),
  idle_steps=stat(I),selected_steps=stat(S),
  selected_bottom_range=[min(x['bottom'] for x in S),max(x['bottom'] for x in S)],selected_top_min=min(x['top'] for x in S),
  selected_frames_touching_top=[i for i,x in enumerate(S) if x['top']==0],
  selected_height_range=[min(x['height'] for x in S),max(x['height'] for x in S)])
gt=list(res['gate_to_s0'].values());res['gate_to_s0_max_abs']={k:max(abs(x[k]) for x in gt) for k in ('dcx','dcy','dbottom','dheight')}
json.dump(res,open(sys.argv[1],'w'),indent=1)
for k in ('SELECTED_s0_vs_G0','SELECTED_s120_vs_G0','gate_to_s0_max_abs','s120_to_f1','s120_to_f0','idle_steps','selected_steps','selected_bottom_range','selected_top_min','selected_frames_touching_top','selected_height_range'):print(k,res[k])
