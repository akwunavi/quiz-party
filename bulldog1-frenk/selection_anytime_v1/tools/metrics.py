#!/usr/bin/env python3
"""Frenk anytime selection: per-frame alpha geometry (source px, 1276x720) of the four clips — body centre cx/cy (alpha weighted), paw line
(lowest row with alpha>128), top, height, area — and steps for lab_check timelines (biggest steps + every transition: exit to f12, IDLE->SELECTED,
SELECTED f19->f20 between the entry alpha and the approved one, SELECTED->RETURN, RETURN->IDLE).
usage: metrics.py OUT.json [TIMELINE.json ...]   (clip paths are fixed, relative to selection_anytime_v1)"""
import sys,os,json,subprocess,tempfile,numpy as np
from PIL import Image
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));A=os.path.join(H,'..','selection_alpha_v1')
CLIPS={'idle':(f'{A}/DOG1_IDLE_v1_alpha_f8-f118.webm',7),'sel':(f'{A}/DOG1_SELECTED_v1_alpha_f20-f121.webm',19),
       'selEarly':(f'{H}/alpha/DOG1_SELECTED_v1_alpha_f1-f24_entry.webm',0),'ret':(f'{A}/DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm',1)}
def decode(w,off):
    T=tempfile.mkdtemp();subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',w,'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
    out={}
    for n in sorted(os.listdir(T)):
        k=int(n[1:4])+off;a=np.asarray(Image.open(f'{T}/{n}'))[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m)
        out[k]=dict(cx=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),2),cy=round(float((a.sum(1)*np.arange(a.shape[0])).sum()/a.sum()),2),
                    bottom=int(ys.max()),top=int(ys.min()),height=int(ys.max()-ys.min()+1),area=int(m.sum()))
    return out
CL={k:decode(*v) for k,v in CLIPS.items()};res={**CL,'timelines':{}}
name=lambda s:{'selEarly':'sel'}.get(s['clip'],s['clip'])
for tl in sys.argv[2:]:
    t=json.load(open(tl));G=[CL[s['clip']][s['f']] for s in t];steps=[]
    for i in range(1,len(t)):
        a,b=G[i-1],G[i];steps.append(dict(i=i,frm=f"{t[i-1]['clip']} f{t[i-1]['f']}",to=f"{t[i]['clip']} f{t[i]['f']}",dcx=round(b['cx']-a['cx'],2),dcy=round(b['cy']-a['cy'],2),dbottom=b['bottom']-a['bottom'],dheight=b['height']-a['height']))
    trans=[s for s in steps if s['frm'].split()[0]!=s['to'].split()[0] or abs(int(s['frm'].split('f')[1])-int(s['to'].split('f')[1]))!=1]
    res['timelines'][os.path.basename(os.path.dirname(tl))]=dict(frames=len(t),transitions=trans,max_abs={k:max(abs(s[k]) for s in steps) for k in('dcx','dcy','dbottom','dheight')},
        bottom_range=[min(g['bottom'] for g in G),max(g['bottom'] for g in G)],height_range=[min(g['height'] for g in G),max(g['height'] for g in G)])
json.dump(res,open(sys.argv[1],'w'),indent=1,ensure_ascii=False)
for k,v in res['timelines'].items():print(k,v['frames'],'max',v['max_abs'],'bottom',v['bottom_range'],'height',v['height_range']);[print('   ',s) for s in v['transitions']]
