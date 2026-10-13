import json,numpy as np
T=json.load(open('/home/user/wt-codex/bulldog1-frenk/track_diag/timeline.json')); I=T['idx']; SC=T['SC']; F=24
def sm(x,w=9):
    k=np.ones(w)/w; xp=np.pad(x,(w//2,w-1-w//2),mode='edge'); return np.convolve(xp,k,'valid')
res={}
for nm,v in T['variants'].items():
    r=v['rows']; X=np.array([q['dogX'] for q in r]); A=np.array([q['anchorX'] for q in r]); P=np.array([q['pawX'] for q in r]); y1=np.array([q['y1'] for q in r]); kinds=[q['kind'] for q in r]
    dx=np.diff(X)                                  # canvas px per frame
    trans={'RUN_PRE->STOP':I['iStop'],'STOP->EVENT':I['iEvent'],'EVENT->ENTRY':I['iEntry'],'ENTRY->GEN3':I['iGen'],'GEN3->RUN':I['iRun']}
    jumps={k:round(float(X[i]-X[i-1]),2) for k,i in trans.items()}
    # typical step in the same neighbourhood (median |dx| of the 8 frames before the transition)
    typ={k:round(float(np.median(np.abs(dx[max(0,i-9):i-1]))),2) for k,i in trans.items()}
    v_s=np.gradient(sm(X))*F                      # canvas px/s
    lo,hi=I['iEntry'],I['iRun']+12
    neg=v_s[lo:hi]<-0.5
    back_total=float(max(0,(np.maximum.accumulate(sm(X)[lo:hi])-sm(X)[lo:hi]).max()))
    # backward movement over the whole START window (px): max give-back of smoothed position
    # paw slip while planted (ground contact): leading paw canvas x change while y1>=672, ENTRY..push-off
    seg=range(I['iEntry'],I['iPush']+1); pl=[i for i in seg if y1[i]>=672]
    slip=float(P[pl[-1]]-P[pl[0]]) if pl else 0.0
    slip_stop=float(P[I['iEvent']-1]-P[I['iEvent']-16])    # last 15 frames of STOP (should settle)
    off=A-X                                        # engine anchor minus sprite centre (canvas px)
    rel=lambda i: round(float(X[i]-A[i]),1)
    res[nm]=dict(jumps_px=jumps,typical_step_px=typ,max_backward_giveback_px=round(back_total,2),negative_velocity_frames_in_START=int(neg.sum()),
        min_smoothed_velocity_px_s=round(float(v_s[lo:hi].min()),1),paw_slip_planted_px=round(slip,2),paw_slip_STOP_last15_px=round(slip_stop,2),
        dog_minus_anchor_px={'RUN_PRE_avg':round(float(np.mean(X[20:34]-A[20:34])),1),'STOP_end':rel(I['iEvent']-1),'EVENT':rel(I['iEvent']+10),'ENTRY_start':rel(I['iEntry']),'push':rel(I['iPush']),'join':rel(I['iRun']),'RUN_end_avg':round(float(np.mean(X[-24:]-A[-24:])),1)},
        dog_displacement_px={'STOP':round(float(X[I['iEvent']-1]-X[I['iStop']]),1),'STOP_engine':round(float(A[I['iEvent']-1]-A[I['iStop']]),1),'START_dog':round(float(X[I['iRun']]-X[I['iEntry']]),1),'START_engine':round(float(A[I['iRun']]-A[I['iEntry']]),1)})
json.dump(res,open('/home/user/wt-codex/bulldog1-frenk/track_diag/metrics.json','w'),indent=1)
print(json.dumps(res,indent=1))
