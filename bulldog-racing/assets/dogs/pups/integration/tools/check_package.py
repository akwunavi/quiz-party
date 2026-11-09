#!/usr/bin/env python3
"""Automatic check of the Pups (dog4) integration package against ../../MANIFEST.json: every file exists with the recorded SHA-256 (local
or git), formats (WebM VP9 + alpha, frames, 24 fps, 1276×720; PNG RGBA atlas geometry), atlas frame counts == V3 contract == model.mjs
frameFor range, paw line of stand frames in the atlas, selection anchors (from selection_v2 geometry). Writes results/check_package.json.
usage: python3 tools/check_package.py  (from bulldog4-pups/integration_v1)"""
import json,hashlib,os,subprocess,math,numpy as np
from PIL import Image
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));P=os.path.dirname(H);R=os.path.dirname(P)
M=json.load(open(os.path.join(P,'MANIFEST.json')));out={'files':[],'problems':[]}
def bad(msg): out['problems'].append(msg)
def walk(o,key=''):
    if isinstance(o,dict):
        if 'sha256' in o: yield key,o
        for k,v in o.items(): yield from walk(v,f'{key}.{k}' if key else k)
    elif isinstance(o,list):
        for i,v in enumerate(o): yield from walk(v,f'{key}[{i}]')
for key,f in walk(M):
    if 'path' in f: b=open(os.path.join(R,f['path']),'rb').read() if os.path.exists(os.path.join(R,f['path'])) else None
    else:
        br,pa=f['git'].split(':',1);b=subprocess.run(['git','-C',R,'show',f'origin/{br}:{pa}'],capture_output=True).stdout or None
    ok=b is not None and hashlib.sha256(b).hexdigest()==f['sha256'] and len(b)==f['bytes']
    out['files'].append({'key':key,'file':f.get('path',f.get('git')),'ok':ok})
    if not ok: bad(f'SHA/size mismatch or missing: {key}')
def probe(rel):
    r=subprocess.run(['ffprobe','-v','error','-select_streams','v','-count_frames','-show_entries','stream=codec_name,width,height,r_frame_rate,nb_read_frames:stream_tags=alpha_mode','-of','json',os.path.join(R,rel)],capture_output=True,text=True)
    s=json.loads(r.stdout)['streams'][0];return {'codec':s['codec_name'],'size':[s['width'],s['height']],'fps':s['r_frame_rate'],'frames':int(s['nb_read_frames']),'alpha':{k.lower():v for k,v in s.get('tags',{}).items()}.get('alpha_mode')=='1'}
sel=M['selection']['states'];out['selection']={}
for st in ('IDLE','SELECTED'):
    p=probe(sel[st]['asset']['path']);out['selection'][st]=p
    if not(p['codec']=='vp9' and p['alpha'] and p['size']==[1276,720] and p['fps']=='24/1' and p['frames']==sel[st]['frames']): bad(f'selection {st} format {p}')
g=Image.open(os.path.join(R,sel['FRONT_STAND']['asset']['path']));out['selection']['FRONT_STAND']={'size':list(g.size),'mode':g.mode}
if g.size!=(1276,720) or g.mode!='RGBA': bad('FRONT_STAND format')
geo=json.load(open(os.path.join(P,'selection_v2/results/seams_alpha_geometry.json')))
out['selection']['anchors']={'SELECTED_s0_vs_G0':geo['SELECTED_s0_vs_G0'],'SELECTED_s120_vs_G0':geo['SELECTED_s120_vs_G0'],'gate_to_s0_max_abs':geo['gate_to_s0_max_abs'],'s120_to_f1':geo['s120_to_f1']}
for k,v in out['selection']['anchors'].items():
    if abs(v['dbottom'])>1 or abs(v['dcx'])>0.5 or abs(v['dcy'])>0.5: bad(f'selection anchor {k} {v}')
logic=json.load(open(os.path.join(H,'results/selection_logic_check.json')));out['selection']['logic']={k:logic[k] for k in ('ok','maxWait','meanWaitS')}
if not logic['ok']: bad('selection logic')
# race atlas
race=M['race'];cw,ch,cols=race['atlas']['cellWidth'],race['atlas']['cellHeight'],race['atlas']['columns']
con=json.load(open(os.path.join(R,race['contract']['path'])))['clips'];out['race']={}
fr=json.loads(subprocess.run(['node','-e',"import('"+os.path.join(R,'dog4-v3-lab/model.mjs')+"').then(m=>{const o={};for(const k of ['BASE','START','RUN','STOP','FINISH_DECELERATE','BUTTERFLY','ROLL','SNIFF_PEE','RETURN']){let mx=0,c;for(let t=0;t<12;t+=1/240){const [cl,f]=m.frameFor({kind:k,t0:0},t);c=cl;mx=Math.max(mx,f)}o[k]=[c,mx]}console.log(JSON.stringify(o))})"],capture_output=True,text=True,check=True).stdout)
for st,v in race['states'].items():
    if not isinstance(v.get('atlas'),dict): continue
    a=v['atlas'];clip=v['v3'].split(' ')[0];im=Image.open(os.path.join(R,a['path']));n=a['frames'];rows=math.ceil(n/cols)
    arr=np.asarray(im.convert('RGBA'))[...,3]
    cell=lambda i:arr[(i//cols)*ch:(i//cols+1)*ch,(i%cols)*cw:(i%cols+1)*cw]
    paw=lambda c:int(np.nonzero(c>128)[0].max())
    cnt=con[clip].get('count',1 if con[clip]['sampler']=='constant' else con[clip].get('prologue',0)+con[clip].get('loop',0))
    r={'clip':clip,'frames':n,'contractCount':cnt,'imageSize':list(im.size),'mode':im.mode,'gridOk':im.size==(cols*cw,rows*ch),
       'cornersTransparent':int(max(arr[0,0],arr[0,-1],arr[-1,0],arr[-1,-1]))==0,'emptyCells':sum(1 for i in range(n) if cell(i).max()<=128),
       'pawFirst':paw(cell(0)),'pawLast':paw(cell(n-1)),'modelMaxFrame':fr[clip][1] if clip in fr else None}
    out['race'][st]=r
    if not(r['gridOk'] and r['mode']=='RGBA' and r['cornersTransparent'] and r['emptyCells']==0 and cnt==n and (r['modelMaxFrame'] is None or r['modelMaxFrame']==n-1)): bad(f'race {st} {r}')
out['race']['FINISH_DECELERATE_uses']=fr['FINISH_DECELERATE']
out['ok']=not out['problems'];out['filesChecked']=len(out['files'])
json.dump(out,open(os.path.join(H,'results/check_package.json'),'w'),ensure_ascii=False,indent=1)
print('ok',out['ok'],'files',out['filesChecked'],out['problems'])
for k,v in out['race'].items(): print(k,v)
