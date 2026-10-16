#!/usr/bin/env python3
"""Analysis of the STOP lab measurements (tools/lab_check.mjs output): per Bulldog No.2 lane — last RUN frame before STOP,
body-centre steps (canvas px) in RUN / STOP / stand, the two seams (RUN→STOP, STOP→RACE_STAND), rollbacks, paw line vs the
lane line, shadow steps. usage: analyse.py OUT [PRESET ...] -> OUT/analysis.json"""
import sys,json,os
OUT=sys.argv[1];keys=sys.argv[2:] or ['FINISH5','EVENT5','PAIR'];res={}
for key in keys:
    M=json.load(open(os.path.join(OUT,key,'measure.json')));rows=M['rows'];lanes=[]
    for li,name in enumerate(M['lanes']):
        seq=[r['lanes'][li] for r in rows]
        if seq[0]['char']!='dog2':continue
        ph=[s['phase'] for s in seq];isS=[s['phase'].startswith('STOP') for s in seq]
        i0=isS.index(True);i1=i0+isS[i0:].index(False) if False in isS[i0:] else len(seq)
        dx=[seq[i]['bodyX']-seq[i-1]['bodyX'] for i in range(1,len(seq))]
        ds=[seq[i]['shadowX']-seq[i-1]['shadowX'] for i in range(1,len(seq))]
        run=[dx[i-1] for i in range(1,i0) if ph[i]=='RUN' and ph[i-1]=='RUN']
        stop=[dx[i-1] for i in range(i0+1,i1)]
        after=[dx[i-1] for i in range(i1+1,min(len(seq),i1+30)) if ph[i].startswith('RACE_STAND')]
        paw=lambda rng:[round(seq[i]['paw']-seq[i]['line'],1) for i in rng]
        lanes.append(dict(lane=name,
            last_run_frame=seq[i0-1]['label'],first_stop=seq[i0]['label'],stop_frames=i1-i0,after_stop=ph[i1] if i1<len(seq) else None,
            run_step_px=[round(min(run),2),round(sum(run)/len(run),2),round(max(run),2)],
            seam_run_to_stop_px=round(dx[i0-1],2),seam_stop_to_stand_px=round(dx[i1-1],2) if i1<len(seq) else None,
            stop_steps_px=[round(x,2) for x in stop],stop_min_step=round(min(stop),2),stop_max_step=round(max(stop),2),
            stand_steps_max_abs=round(max([abs(x) for x in after],default=0),3),
            shadow_max_step_stop=round(max(abs(ds[i-1]) for i in range(i0,i1+1)),2),
            paw_minus_line_run=[min(paw(range(0,i0))),max(paw(range(0,i0)))],paw_minus_line_stop=[min(paw(range(i0,i1))),max(paw(range(i0,i1)))],
            paw_minus_line_stand=paw([i1]) if i1<len(seq) else None,
            phases=sorted(set(ph))))
    res[key]=lanes
json.dump(res,open(os.path.join(OUT,'analysis.json'),'w'),indent=1,ensure_ascii=False)
for k,v in res.items():
    print('==',k)
    for l in v: print(l['lane'],'| last RUN',l['last_run_frame'],'→',l['first_stop'],'| stop',l['stop_frames'],'→',l['after_stop'],'| RUN step',l['run_step_px'],'| seams',l['seam_run_to_stop_px'],l['seam_stop_to_stand_px'],'| STOP step min/max',l['stop_min_step'],l['stop_max_step'],'| stand max',l['stand_steps_max_abs'],'| shadow',l['shadow_max_step_stop'],'| paw-line run/stop/stand',l['paw_minus_line_run'],l['paw_minus_line_stop'],l['paw_minus_line_stand'])
