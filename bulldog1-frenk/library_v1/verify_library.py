#!/usr/bin/env python3
"""Verifies LIBRARY.json: SHA-256 of every file, WebM containers (VP9, alpha_mode=1, frame counts), decoded alpha (transparent corners,
no empty frames), rebuild of derived files (IDLE loop, RETURN grade) and the unchanged race package check.
usage: verify_library.py   -> results/verify_library.json; exit 1 on failure"""
import json,hashlib,os,subprocess,tempfile,sys,numpy as np
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__));B=os.path.dirname(H);ROOT=os.path.dirname(B)
lib=json.load(open(os.path.join(H,'LIBRARY.json')));res={'libraryVersion':lib['libraryVersion'],'checks':{}};fail=[]
def chk(name,ok,detail=None):
    res['checks'][name]={'ok':bool(ok),'detail':detail}
    if not ok: fail.append(name)
sha=lambda p:hashlib.sha256(open(p,'rb').read()).hexdigest()
def walk(o):
    if isinstance(o,dict):
        if 'path' in o and 'sha256' in o: yield o
        for v in o.values(): yield from walk(v)
    elif isinstance(o,list):
        for v in o: yield from walk(v)
files=list(walk(lib));bad=[x['path'] for x in files if sha(os.path.join(B,x['path']))!=x['sha256']]
chk('sha256_all_files',not bad,{'files':len(files),'mismatch':bad})
def probe(p):
    out=subprocess.run(['ffprobe','-v','error','-count_frames','-select_streams','v:0','-show_entries','stream=codec_name,width,height,r_frame_rate,nb_read_frames:stream_tags','-of','json',p],capture_output=True,text=True,check=True).stdout
    s=json.loads(out)['streams'][0];return s
def decode(p,d):
    os.makedirs(d,exist_ok=True);subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',p,'-pix_fmt','rgba','-vsync','0',f'{d}/a%04d.png'],check=True);return sorted(os.listdir(d))
t=tempfile.mkdtemp();alpha={}
for k in ['IDLE','SELECTED','RETURN_TO_IDLE']:
    e=lib['selection'][k]['file'];p=os.path.join(B,e['path']);s=probe(p);tags={a.lower():b for a,b in s.get('tags',{}).items()}
    fr=decode(p,f'{t}/{k}');cov=[];corner=0;empty=0
    for n in fr:
        a=np.asarray(Image.open(f'{t}/{k}/{n}'))[...,3];corner=max(corner,int(max(a[:8,:8].max(),a[:8,-8:].max(),a[-8:,:8].max(),a[-8:,-8:].max())));c=float((a>128).mean());cov.append(c);empty+=c<0.01
    alpha[k]={'codec':s['codec_name'],'size':f"{s['width']}x{s['height']}",'fps':s['r_frame_rate'],'frames':int(s['nb_read_frames']),'alpha_mode':tags.get('alpha_mode'),
      'decodedFrames':len(fr),'cornerAlphaMax':corner,'emptyFrames':empty,'coverageMinMax':[round(min(cov),4),round(max(cov),4)]}
    ok=s['codec_name']=='vp9' and tags.get('alpha_mode')=='1' and int(s['nb_read_frames'])==e['frames']==len(fr) and corner==0 and empty==0 and f"{s['width']}x{s['height']}"=='1276x720'
    chk(f'webm_{k}',ok,alpha[k])
# rebuild IDLE loop and compare decoded frames
subprocess.run([os.path.join(B,'selection_alpha_v1/build_idle_loop.sh'),f'{t}/loopw',f'{t}/loop.webm'],check=True,capture_output=True)
fm=lambda p:subprocess.run(['ffmpeg','-v','error','-c:v','libvpx-vp9','-i',p,'-pix_fmt','rgba','-f','framemd5','-'],capture_output=True,text=True,check=True).stdout.split('\n')
strip=lambda L:[x.split(',')[-1] for x in L if x and not x.startswith('#')]
same_bytes=sha(f'{t}/loop.webm')==lib['selection']['IDLE']['file']['sha256']
same_frames=strip(fm(f'{t}/loop.webm'))==strip(fm(os.path.join(B,lib['selection']['IDLE']['file']['path'])))
chk('rebuild_idle_loop_identical',same_frames,{'byteIdentical':same_bytes,'decodedFramesIdentical':same_frames})
# RETURN grade reproduces the approved frames: graded frame hash list
subprocess.run(['python3',os.path.join(B,'return_to_idle_v1/make_graded_frames.py'),f'{t}/retg'],check=True,capture_output=True)
gh=hashlib.sha256(b''.join(np.asarray(Image.open(f'{t}/retg/r{n:03d}.png')).tobytes() for n in range(2,122))).hexdigest()
exp=json.load(open(os.path.join(B,'selection_alpha_v1/results/graded_input_hash.json')))['sha256_pixels_r2_r121']
chk('rebuild_return_grade_identical',gh==exp,{'sha256_pixels_r2_r121':gh})
# anytime selection (approved entry A): every pick reaches the stand f12 and SELECTED f20; max wait as approved; RETURN r2..r121
any_=lib['selection']['anytime'];js=("import('./selection_anytime_v1/selection.mjs').then(m=>{const w=[];for(let i=0;i<m.IDLE_LOOP.length;i++){const p=m.exitPath(i);"
  "w.push(p.length);const end=p.length?p[p.length-1]:m.IDLE_LOOP[i];if(end!==m.GATE)throw new Error('gate '+i);}"
  "console.log(JSON.stringify({loop:m.IDLE_LOOP.length,gate:m.GATE,maxWait:Math.max(...w),entry:m.ENTRY.A.sel[0],ret:[m.RETURN[0],m.RETURN[m.RETURN.length-1]]}))})")
r=subprocess.run(['node','--input-type=module','-e',js],cwd=B,capture_output=True,text=True);d=json.loads(r.stdout) if r.returncode==0 else {'error':r.stderr[-300:]}
chk('anytime_selection_logic',r.returncode==0 and d=={'loop':220,'gate':any_['gate'],'maxWait':any_['maxWaitFrames'],'entry':any_['entryFirstSelectedFrame'],'ret':[2,121]},d)
# race package unchanged + its own check
cp=os.path.join(B,'integration_v1/results/check_package.json');keep=open(cp,'rb').read()   # the race package must stay byte-identical
try: r=subprocess.run(['node',os.path.join(B,'integration_v1/tools/check_package.mjs'),'500'],capture_output=True,text=True)
finally: open(cp,'wb').write(keep)
chk('race_package_check',r.returncode==0,r.stdout.strip().splitlines()[:9])
res['ok']=not fail;res['failed']=fail
os.makedirs(os.path.join(H,'results'),exist_ok=True);json.dump(res,open(os.path.join(H,'results/verify_library.json'),'w'),ensure_ascii=False,indent=1)
print('\n'.join(('PASS ' if v['ok'] else 'FAIL ')+k for k,v in res['checks'].items()));sys.exit(1 if fail else 0)
