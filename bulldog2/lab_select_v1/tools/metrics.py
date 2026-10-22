#!/usr/bin/env python3
"""Per-frame geometry of the selection-screen alpha (source px, 1276x720): body centre cx/cy (alpha weighted), paw line (lowest row with
alpha>128 in the lower body), top, height, area; then steps for given timelines (lab_check timeline.json files) with the biggest steps
and every transition (loop seam, reversals, IDLE->SELECTED). usage: metrics.py IDLE_WEBM SEL_WEBM OUT.json [TIMELINE.json ...]"""
import sys,os,json,subprocess,tempfile,numpy as np
from PIL import Image
def decode(w):
    T=tempfile.mkdtemp();subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',w,'-pix_fmt','rgba','-vsync','0',f'{T}/a%03d.png'],check=True)
    out={}
    for n in sorted(os.listdir(T)):
        k=int(n[1:4]);a=np.asarray(Image.open(f'{T}/{n}'))[...,3].astype(float);m=a>128;ys,xs=np.nonzero(m)
        out[k]=dict(cx=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),2),cy=round(float((a.sum(1)*np.arange(a.shape[0])).sum()/a.sum()),2),
                    bottom=int(ys.max()),top=int(ys.min()),height=int(ys.max()-ys.min()+1),area=int(m.sum()))
    return out
idle,sel=decode(sys.argv[1]),decode(sys.argv[2]);res={'idle':idle,'sel':sel,'timelines':{}}
for tl in sys.argv[4:]:
    t=json.load(open(tl));G=[(idle if s['clip']=='idle' else sel)[s['f']] for s in t];steps=[]
    for i in range(1,len(t)):
        a,b=G[i-1],G[i];steps.append(dict(i=i,frm=f"{t[i-1]['clip']} f{t[i-1]['f']}",to=f"{t[i]['clip']} f{t[i]['f']}",dcx=round(b['cx']-a['cx'],2),dcy=round(b['cy']-a['cy'],2),dbottom=b['bottom']-a['bottom'],dheight=b['height']-a['height']))
    trans=[s for s in steps if s['frm'].split()[0]!=s['to'].split()[0] or abs(int(s['frm'].split('f')[1])-int(s['to'].split('f')[1]))!=1]
    res['timelines'][os.path.basename(os.path.dirname(tl))]=dict(frames=len(t),transitions=trans,max_abs={k:max(abs(s[k]) for s in steps) for k in('dcx','dcy','dbottom','dheight')},
        bottom_range=[min(g['bottom'] for g in G),max(g['bottom'] for g in G)],height_range=[min(g['height'] for g in G),max(g['height'] for g in G)])
json.dump(res,open(sys.argv[3],'w'),indent=1,ensure_ascii=False)
for k,v in res['timelines'].items():print(k,v['frames'],'max',v['max_abs'],'bottom',v['bottom_range'],'height',v['height_range']);[print('   ',s) for s in v['transitions']]
