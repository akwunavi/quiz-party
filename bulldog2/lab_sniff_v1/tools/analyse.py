#!/usr/bin/env python3
"""Analysis of the SNIFF_PEE lab measurements (tools/lab_check.mjs output), per Bulldog No.2 lane: SNIFF_PEE+RETURN window length (frames),
clip/pad split, the clip frame shown at the SNIFF_PEE→RETURN boundary, anchor x range in the window, body-centre steps at every phase
change, largest step inside the clip, paw line vs lane line. usage: analyse.py OUT [PRESET ...] -> OUT/analysis.json"""
import sys,json,os
OUT=sys.argv[1];keys=sys.argv[2:] or ['EARLY5','MID5','PAIR'];res={}
for key in keys:
    M=json.load(open(os.path.join(OUT,key,'measure.json')));rows=M['rows'];lanes=[]
    for li,name in enumerate(M['lanes']):
        seq=[r['lanes'][li] for r in rows]
        if seq[0]['char']!='dog2':continue
        ph=[s['phase'] for s in seq];seg=[s['segment'] for s in seq]
        win=[i for i,s in enumerate(seg) if s in('SNIFF_PEE','RETURN')]
        sp=[i for i in win if seg[i]=='SNIFF_PEE'];rt=[i for i in win if seg[i]=='RETURN']
        changes=[]
        for i in range(1,len(seq)):
            if ph[i]!=ph[i-1] or seg[i]!=seg[i-1]:changes.append(dict(at=round(seq[i]['t'],3),frm=seg[i-1]+'/'+ph[i-1]+' '+seq[i-1]['label'],to=seg[i]+'/'+ph[i]+' '+seq[i]['label'],body_step=round(seq[i]['bodyX']-seq[i-1]['bodyX'],2)))
        clip=[i for i in win if ph[i]=='SNIFF_PEE clip']
        inside=[abs(seq[i]['bodyX']-seq[i-1]['bodyX']) for i in clip[1:]]
        lanes.append(dict(lane=name,window_frames=len(win),sniff_frames=len(sp),return_frames=len(rt),clip_frames=len(clip),pad_frames=len(win)-len(clip),
            first_return_frame=seq[rt[0]]['label'] if rt else None,last_sniff_frame=seq[sp[-1]]['label'] if sp else None,
            anchor_x_range_in_window=round(max(seq[i]['x'] for i in win)-min(seq[i]['x'] for i in win),3),
            max_body_step_inside_clip=round(max(inside),2),phase_changes=changes,
            paw_minus_line=[min(s['paw']-s['line'] for s in seq),max(s['paw']-s['line'] for s in seq)]))
    res[key]=lanes
json.dump(res,open(os.path.join(OUT,'analysis.json'),'w'),indent=1,ensure_ascii=False)
for k,v in res.items():
    print('==',k)
    for l in v:
        print(l['lane'],'| window',l['window_frames'],f"(SNIFF {l['sniff_frames']} + RETURN {l['return_frames']})",'clip',l['clip_frames'],'pad',l['pad_frames'],'| SNIFF ends',l['last_sniff_frame'],'RETURN starts',l['first_return_frame'],'| anchor Δx',l['anchor_x_range_in_window'],'| max step inside',l['max_body_step_inside_clip'],'| paw-line',l['paw_minus_line'])
        for c in l['phase_changes']: print('   ',c['frm'],'→',c['to'],c['body_step'])
