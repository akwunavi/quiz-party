# Seams vs ordinary motion over the WHOLE rendered chain (MP4 of the lab, game scale, 4 backgrounds):
# every neighbour pair is classified by timeline.json; the seam diff is ranked against all ordinary IDLE / SELECTED steps of the same video.
# usage: python3 seams_mp4.py LAB_OUT KEY... > results/seams_chain_mp4.json
import sys,json,subprocess
import numpy as np
O=sys.argv[1];res={}
for k in sys.argv[2:]:
    t=json.load(open(f'{O}/{k}/timeline.json'))
    raw=subprocess.run(['ffmpeg','-v','error','-i',f'{O}/{k}.mp4','-vf','crop=1276:720:0:40','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True,check=True).stdout
    v=np.frombuffer(raw,np.uint8).reshape(-1,720,1276,3).astype(np.int16);assert len(v)==len(t),(k,len(v),len(t))
    dd=[float(np.abs(v[i]-v[i-1]).mean()) for i in range(1,len(v))]
    ordn={'idle':[],'sel':[]};seams={};zero=[]
    for i in range(1,len(t)):
        a,b=t[i-1],t[i];x=dd[i-1]
        if x<0.02: zero.append(i)
        if a['clip']!=b['clip']: seams[f"{a['clip']} f{a['f']} -> {b['clip']} f{b['f']}"]=x
        else: ordn[a['clip']].append(x)
    allo=np.array(ordn['idle']+ordn['sel'])
    res[k]={'seams':{s:{'diff':round(x,3),'percentile_among_ordinary_steps':round(float((allo<x).mean()*100),1)} for s,x in seams.items()},
      'ordinary_idle':{'p50':round(float(np.median(ordn['idle'])),3),'p90':round(float(np.percentile(ordn['idle'],90)),3),'max':round(max(ordn['idle']),3)},
      'ordinary_sel':{'p50':round(float(np.median(ordn['sel'])),3),'p90':round(float(np.percentile(ordn['sel'],90)),3),'max':round(max(ordn['sel']),3)} if ordn['sel'] else None,
      'near_identical_neighbours':len(zero)}
print(json.dumps({'note':'diff = mean |ΔRGB| 0-255 of the lab canvas without the header; percentile = share of ordinary neighbour steps of the same video that are smaller than the seam (low = the seam is calmer than ordinary motion).','keys':res},ensure_ascii=False,indent=1))
