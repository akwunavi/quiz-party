#!/usr/bin/env python3
"""Luna RUN vs2 check: loop search on the existing alpha v2 (vs2 source #40-120) and a game-scale comparison with the approved RUN loops of
Frenk (No.1), Zefir (No.2) and Pups (No.4), drawn the same way as Race V3 (full frame scaled to a 207x116 sprite at x-148, laneY-110; per-dog
lab shifts are NOT applied). usage: run_compare.py ALPHA_DIR(a%03d.png) REPO OUTDIR"""
import sys,os,json,subprocess,io
import numpy as np
from PIL import Image,ImageDraw,ImageFont
A,R,O=sys.argv[1:4];os.makedirs(O+'/fr',exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
SW,SH,AX,AY=207,116,148,110
def git(path): return Image.open(io.BytesIO(subprocess.run(['git','-C',R,'show','HEAD:'+path],capture_output=True,check=True).stdout)).convert('RGBA')
def cells(sheet,idx,cw=207,ch=116,cols=24): return [sheet.crop(((i%cols)*cw,(i//cols)*ch,(i%cols+1)*cw,(i//cols+1)*ch)).resize((SW,SH),Image.LANCZOS) for i in idx]
frenk=cells(Image.open(f'{R}/bulldog1-frenk/integration_v1/atlas/frenk_run.png').convert('RGBA'),range(0,12))
zefir=cells(git('bulldog2/lab_start_v1/assets/dog2_run28-100.png'),range(60,72))
pups=cells(Image.open(f'{R}/dog4-v3-lab/assets/run.png').convert('RGBA'),range(11,23),178,100)
L=[Image.open(f'{A}/a{i:03d}.png').convert('RGBA') for i in range(81)]
sm=[np.asarray(Image.alpha_composite(Image.new('RGBA',l.size,(128,128,128,255)),l).convert('RGB').resize((319,180))).astype(np.int16) for l in L]
d=lambda x,y:float(np.abs(x-y).mean())
steps=[d(sm[i],sm[i-1]) for i in range(1,81)]
res={'source':'alpha v2 = vs2 source frames #40-#120 (0-based), 81 frames','stepMedian':round(float(np.median(steps)),2),'stepP90':round(float(np.percentile(steps,90)),2),'periods':{}}
for P in range(8,17):
    b=min((d(sm[a],sm[a+P]),a) for a in range(0,81-P));res['periods'][P]={'bestSeamDiff':round(b[0],2),'start':b[1]}
a0=res['periods'][10]['start'];loop10=list(range(a0,a0+10))
b12=res['periods'][12]['start'];loop12=list(range(b12,b12+12))
inner=[d(sm[loop10[k]],sm[loop10[(k+1)%10]]) for k in range(10)]           # step leaving frame k (last = seam)
dup=sorted(range(10),key=lambda k:inner[k])[:2]                             # hold the two calmest frames one extra tick
retime=[]
for k in range(10): retime+= [loop10[k]]*(2 if k in dup else 1)
cx=[float((np.asarray(L[i])[...,3].astype(float).sum(0)*np.arange(1276)).sum()/np.asarray(L[i])[...,3].astype(float).sum()) for i in loop10]
res.update({'loop10':{'frames_alpha':loop10,'frames_source':[i+40 for i in loop10],'seamDiff':res['periods'][10]['bestSeamDiff'],'centerXrange':[round(min(cx),1),round(max(cx),1)]},
  'loop12_best_native':{'frames_alpha':loop12,'seamDiff':res['periods'][12]['bestSeamDiff']},'retime10to12':{'order_alpha':retime,'held':[loop10[k] for k in dup]}})
json.dump(res,open(f'{O}/run_loop_analysis.json','w'),indent=1)
luna10=[L[i].resize((SW,SH),Image.LANCZOS) for i in loop10];luna12=[L[i].resize((SW,SH),Image.LANCZOS) for i in retime];luna12n=[L[i].resize((SW,SH),Image.LANCZOS) for i in loop12]
lanes=[('№1 Фрэнк (утв., 12 к.)',frenk),('№2 Зефир (утв., 12 к.)',zefir),('№4 Пупс (утв., 12 к.)',pups),('Луна: цикл 10 к. → 12 (для V3)',luna12),('Луна: родной цикл 10 к. (не для V3)',luna10),('Луна: лучший «честный» 12 к.',luna12n)]
arena=Image.open(f'{R}/dog4-v3-lab/assets/arena.png').convert('RGB').resize((1920,1080))
strip=arena.crop((500,300,900,420))     # 400x120 patch of real track
for scale,name in ((1,'x1'),(2,'x2')):
    for n in range(120):                   # 5 s = 10 loops of 0.5 s
        W,H=(760 if scale==1 else 820),len(lanes)*(130 if scale==1 else 268)+30
        im=Image.new('RGB',(W,H),(26,28,34));g=ImageDraw.Draw(im);g.text((8,6),f'RUN в масштабе игры ×{scale} · кадр {n} · 24 к/с',font=F,fill=(220,220,230))
        for li,(lab,seq) in enumerate(lanes):
            y0=30+li*(130 if scale==1 else 268);bg=strip.resize((400*scale,120*scale))
            c=seq[n%len(seq)];c=c.resize((SW*scale,SH*scale),Image.LANCZOS) if scale>1 else c
            lane=bg.copy();lane.paste(c,(int(200*scale-AX*scale),int(112*scale-AY*scale)),c);ImageDraw.Draw(lane).line([0,112*scale,400*scale,112*scale],fill=(120,90,60))
            im.paste(lane,(8,y0));g.text((8+400*scale+8 if scale==1 else 8,y0+(4 if scale==1 else 120*scale+2)),lab,font=F,fill=(255,214,120) if 'Луна' in lab else (230,230,230))
        im.save(f'{O}/fr/{n:04d}.png')
    subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{O}/fr/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2',f'{O}/DOG5_RUN_compare_gamescale_{name}_10loops.mp4'],check=True)
    for f in os.listdir(O+'/fr'): os.remove(f'{O}/fr/{f}')
os.rmdir(O+'/fr');print(json.dumps(res)[:900])
