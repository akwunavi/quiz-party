#!/usr/bin/env python3
"""Analysis of the ROLL lab measurements (tools/lab_check.mjs output), per Bulldog No.2 lane: phase sequence, ROLL window length,
anchor x during ROLL, body-centre steps at every phase change (stand→ROLL, ROLL→pad, pad→START, START→RUN, STOP→ROLL), largest
step inside ROLL, paw line vs lane line. usage: analyse.py OUT [PRESET ...] -> OUT/analysis.json"""
import sys,json,os
OUT=sys.argv[1];keys=sys.argv[2:] or ['EARLY5','MID5','PAIR'];res={}
for key in keys:
    M=json.load(open(os.path.join(OUT,key,'measure.json')));rows=M['rows'];lanes=[]
    for li,name in enumerate(M['lanes']):
        seq=[r['lanes'][li] for r in rows]
        if seq[0]['char']!='dog2':continue
        ph=[s['phase'] for s in seq];seg=[s['segment'] for s in seq]
        roll=[i for i,s in enumerate(seg) if s=='ROLL']
        changes=[]
        for i in range(1,len(seq)):
            if ph[i]!=ph[i-1]:changes.append(dict(at=round(seq[i]['t'],3),frm=ph[i-1]+' '+seq[i-1]['label'],to=ph[i]+' '+seq[i]['label'],body_step=round(seq[i]['bodyX']-seq[i-1]['bodyX'],2)))
        clip=[i for i in roll if ph[i]=='ROLL']
        inside=[abs(seq[i]['bodyX']-seq[i-1]['bodyX']) for i in clip[1:]]
        lanes.append(dict(lane=name,roll_window_frames=len(roll),clip_frames=len(clip),pad_frames=len(roll)-len(clip),
            anchor_x_range_in_roll=round(max(seq[i]['x'] for i in roll)-min(seq[i]['x'] for i in roll),3),
            max_body_step_inside_roll=round(max(inside),2),phase_changes=changes,
            paw_minus_line=[min(s['paw']-s['line'] for s in seq),max(s['paw']-s['line'] for s in seq)]))
    res[key]=lanes
json.dump(res,open(os.path.join(OUT,'analysis.json'),'w'),indent=1,ensure_ascii=False)
for k,v in res.items():
    print('==',k)
    for l in v:
        print(l['lane'],'| window',l['roll_window_frames'],'clip',l['clip_frames'],'pad',l['pad_frames'],'| anchor Δx in ROLL',l['anchor_x_range_in_roll'],'| max step inside',l['max_body_step_inside_roll'],'| paw-line',l['paw_minus_line'])
        for c in l['phase_changes']: print('   ',c['frm'],'→',c['to'],c['body_step'])
