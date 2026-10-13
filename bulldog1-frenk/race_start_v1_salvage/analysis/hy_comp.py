import sys; sys.argv=['x']
exec(open('hy_build.py').read().split("out={}")[0])
def opt(nm):
    a=analyse(nm); nc=a['nc']; X=smooth(a['X'],W)[:nc+1]
    # target: lower monotone envelope floored at X(0)
    rc=np.minimum.accumulate(X[::-1])[::-1]; Xt=np.maximum(rc,X[0]); 
    extra=Xt-X; extra[-1]=0
    ex=smooth(extra,5); ex[0]=0; ex[-1]=0
    Copt=a['Cp'].copy(); Copt[:nc+1]+=ex
    a['Copt']=Copt; a['extra']=np.concatenate([ex,np.zeros(len(a['X'])-len(ex))]); 
    a['Xo']=a['E']+a['cx']-736+Copt
    return a
if __name__=='__main__':
    res={}
    for nm in VAR:
        a=opt(nm); nc=a['nc']; ex=a['extra'][:nc+1]
        v=np.gradient(ex)*FPS
        lpo=smooth(a['Xo'],W); vo=np.gradient(lpo)*FPS; upto=a['D']+12
        res[nm]=dict(clip_frames=nc,max_abs_extra_src=round(float(np.abs(ex).max()),1),max_abs_extra_lab=round(float(np.abs(ex).max()*SC),1),peak_skate_src_s=round(float(np.abs(v).max()),1),peak_skate_lab_s=round(float(np.abs(v).max()*SC),1),path_src=round(float(np.abs(np.diff(ex)).sum()),1),min_net_v_after=round(float(vo[:upto].min()),1),
          net_total_fwd_src=round(float(a['Xo'][a['D']]-a['Xo'][0]),1))
        print(nm,res[nm])
    json.dump(res,open('hy_comp.json','w'),indent=1)
