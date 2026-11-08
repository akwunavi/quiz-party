#!/usr/bin/env python3
"""Free RETURN_TO_IDLE check for Luna: can the end pose of SELECTED (s120) be led back to FRONT_STAND with existing SELECTED / IDLE frames?
Measures the nearest frames to s120 in both clips (mean |dRGB|, frame 319x180) and draws the only existing path in SELECTED, played backwards.
usage: return_check.py SELECTED.mp4 IDLE.mp4 OUTDIR"""
import sys,os,json,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
S_,I_,O=sys.argv[1:4];os.makedirs(O,exist_ok=True)
def frames(p,w,h):
    r=subprocess.run(['ffmpeg','-v','error','-i',p,'-vf',f'scale={w}:{h}','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True,check=True).stdout
    return np.frombuffer(r,np.uint8).reshape(-1,h,w,3)
S,I=frames(S_,319,180).astype(np.int16),frames(I_,319,180).astype(np.int16)
d=lambda a,b:round(float(np.abs(a-b).mean()),2)
step=[d(I[k],I[k-1]) for k in range(1,121)]+[d(S[k],S[k-1]) for k in range(1,121)]
res={'ordinaryStep':{'median':round(float(np.median(step)),2),'p90':round(float(np.percentile(step,90)),2)},
 's120_vs_FRONT_STAND_f0':d(S[120],I[0]),
 'nearestIDLE':sorted(({'frame':k,'diff':d(S[120],I[k])} for k in range(121)),key=lambda x:x['diff'])[:3],
 'nearestSELECTED_before_s90':sorted(({'frame':k,'diff':d(S[120],S[k])} for k in range(90)),key=lambda x:x['diff'])[:4],
 'calmSmile_s32_s56_vs_IDLE_best':min(({'sel':k,'idle':j,'diff':d(S[k],I[j])} for k in range(32,57) for j in range(121)),key=lambda x:x['diff'])}
json.dump(res,open(f'{O}/return_free_check.json','w'),ensure_ascii=False,indent=1)
B=frames(S_,320,180);BI=frames(I_,320,180)
Fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
rows=[('Конец SELECTED и ближайшие кадры',[('SEL s120 (конец)',B[120]),(f"SEL s{res['nearestSELECTED_before_s90'][0]['frame']} · {res['nearestSELECTED_before_s90'][0]['diff']}",B[res['nearestSELECTED_before_s90'][0]['frame']]),
      (f"IDLE f{res['nearestIDLE'][0]['frame']} · {res['nearestIDLE'][0]['diff']}",BI[res['nearestIDLE'][0]['frame']]),(f"FRONT_STAND f0 · {res['s120_vs_FRONT_STAND_f0']}",BI[0])]),
      ('Единственный путь к стойке внутри SELECTED, если играть назад',[(f'SEL s{k}',B[k]) for k in (100,88,84,80,77,74,71,68,64,60)]),
      ('…и дальше назад',[(f'SEL s{k}',B[k]) for k in (56,40,30,24,21,19,17,15,13,0)])]
W=10*322+10;sh=Image.new('RGB',(W,sum(22+182+22 for _ in rows)+30),(28,30,38));g=ImageDraw.Draw(sh);y=6
g.text((6,y),f"Разница кадров 0–255; обычный шаг между соседними кадрами: медиана {res['ordinaryStep']['median']}, 90-й процентиль {res['ordinaryStep']['p90']}",font=Fn,fill=(220,220,230));y+=24
for title,cells in rows:
    g.text((6,y),title,font=Fn,fill=(255,214,120));y+=22;x=4
    for lab,a in cells: sh.paste(Image.fromarray(a),(x,y));g.text((x+4,y+184),lab,font=Fn,fill=(230,230,230));x+=322
    y+=182+22
sh.save(f'{O}/RETURN_free_check_sheet.png');print(json.dumps(res,ensure_ascii=False))
