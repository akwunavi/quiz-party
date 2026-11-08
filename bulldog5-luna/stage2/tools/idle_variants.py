#!/usr/bin/env python3
"""Luna IDLE: two loop variants built only from the existing Kling IDLE (no new frames, no crossfade), their gates (IDLE frames equal to
FRONT_STAND f0) and the wait to SELECTED; review MP4s at selection-card scale (638x360, card top = frame top) at normal speed.
  A  "short there-and-back": f0 -> f48 -> f1   (96 frames, 4.0 s), turns on calm frames f48 and f0
  B  "full there-and-back":  f0 -> f120 -> f1  (240 frames, 10.0 s), turns on calm frames f120 and f0
usage: idle_variants.py RGBA_DIR(r%04d.png, source numbering) OUTDIR"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
D,O=sys.argv[1:3];os.makedirs(O+'/fr',exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
fr=lambda i:Image.open(f'{D}/r{i:04d}.png').convert('RGBA')
sm={i:np.asarray(Image.alpha_composite(Image.new('RGBA',(1276,720),(128,128,128,255)),fr(i)).convert('RGB').resize((319,180))).astype(np.int16) for i in range(121)}
d=lambda a,b:float(np.abs(sm[a]-sm[b]).mean())
gates=[i for i in range(121) if d(i,0)<=1.2]
V={'A':list(range(0,49))+list(range(47,0,-1)),'B':list(range(0,121))+list(range(119,0,-1))}
res={'gateRule':'IDLE frame differs from FRONT_STAND f0 by <= 1.2/255 (frame 319x180, on gray)','gates':gates,'variants':{}}
for k,order in V.items():
    n=len(order);fw=[]
    for p in range(n):                                   # pick while order[p] is shown; forward only along the loop
        q=p;c=0
        while order[q] not in gates: q=(q+1)%n;c+=1
        fw.append(c)
    rv=[max(0,order[p]-max(gates)) for p in range(n)]    # alternative: play IDLE backwards from the pick to the stand (Frenk-style)
    turns=[(order[p],round(d(order[p-1],order[p]),2)) for p in range(n) if order[p] in (0,48,120) ]
    res['variants'][k]={'order':f'f0→f{max(order)}→f1','frames':n,'seconds':round(n/24,2),'forwardOnly':{'maxFrames':max(fw),'maxS':round(max(fw)/24,2),'meanS':round(sum(fw)/n/24,2)},
                        'reverseToStand':{'maxFrames':max(rv),'maxS':round(max(rv)/24,2)},'turnSteps':turns}
json.dump(res,open(f'{O}/idle_variants.json','w'),ensure_ascii=False,indent=1)
CARD=(222,203,164);PAGE=(28,30,38)
for k,order in V.items():
    loops=3 if k=='A' else 2;seq=order*loops
    for n,i in enumerate(seq):
        p=n%len(order);dirn='→' if p<=order.index(max(order)) else '←'
        im=Image.new('RGB',(720,470),PAGE);g=ImageDraw.Draw(im)
        card=Image.new('RGB',(638,360),CARD);c=fr(i).resize((638,360),Image.LANCZOS);card.paste(c,(0,0),c);im.paste(card,(41,50))
        g.text((41,16),f'Луна · IDLE вариант {k}: {res["variants"][k]["order"]} ({len(order)} кадров, {len(order)/24:.1f} с) · 24 к/с',font=f2,fill=(200,200,210))
        g.text((41,420),f'IDLE f{i} {dirn}'+('   · ворота (= FRONT_STAND)' if i in gates else ''),font=F,fill=(255,214,120) if i in gates else (230,230,230))
        im.save(f'{O}/fr/{n:04d}.png')
    subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{O}/fr/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p',f'{O}/DOG5_IDLE_variant_{k}_{res["variants"][k]["frames"]}f_x1_{loops}loops.mp4'],check=True)
    for f in os.listdir(O+'/fr'): os.remove(f'{O}/fr/{f}')
os.rmdir(O+'/fr');print(json.dumps(res,ensure_ascii=False)[:1500])
