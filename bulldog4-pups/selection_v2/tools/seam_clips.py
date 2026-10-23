# Problem-seam views from the rendered chain MP4s (game scale): ±1 s around IDLE->SELECTED and SELECTED->IDLE of every click,
# glued in click order, at x1 and x0.25 (each frame shown 4 times, no interpolation); plus a still contact sheet of the seams.
# usage: python3 seam_clips.py LAB_OUT OUT_DIR KEY...
import sys,json,subprocess,os
import numpy as np
from PIL import Image,ImageDraw,ImageFont
O,OUT=sys.argv[1],sys.argv[2];KEYS=sys.argv[3:];os.makedirs(OUT+'/tmp',exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16)
def frames(k,idx):  # only the needed frames, in the given order (decoding whole chains does not fit in memory)
    sel='+'.join(f'eq(n\\,{i})' for i in sorted(set(idx)))
    raw=subprocess.run(['ffmpeg','-v','error','-i',f'{O}/{k}.mp4','-vf',f"select='{sel}'",'-vsync','0','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True,check=True).stdout
    v=np.frombuffer(raw,np.uint8).reshape(-1,760,1276,3);pos={i:n for n,i in enumerate(sorted(set(idx)))}
    return {i:v[pos[i]] for i in idx}
seq=[];sheet_rows=[]
for k in KEYS:
    t=json.load(open(f'{O}/{k}/timeline.json'))
    s0=next(i for i,s in enumerate(t) if s['clip']=='sel');e=s0+121
    idx=[i for c in (s0,e) for i in range(c-24,min(c+24,len(t)))];v=frames(k,idx)
    for i in idx: Image.fromarray(v[i]).save(f'{OUT}/tmp/{len(seq):05d}.png');seq.append(i)
    sheet_rows.append((k,[(t[i],v[i]) for i in (s0-2,s0-1,s0,s0+1,e-2,e-1,e,e+1)]))
for name,rate in (('SEAMS_all_clicks_x1.mp4','24'),('SEAMS_all_clicks_x0.25.mp4','6')):
    subprocess.run(['ffmpeg','-v','error','-y','-framerate',rate,'-i',f'{OUT}/tmp/%05d.png','-r','24','-c:v','libx264','-crf','18','-pix_fmt','yuv420p',f'{OUT}/{name}'],check=True)
for x in os.listdir(OUT+'/tmp'): os.remove(f'{OUT}/tmp/{x}')
os.rmdir(OUT+'/tmp')
# sheet: white-background quarter (game scale 638x360) of 4 frames before/after each seam
cw,ch=638,360;sh=Image.new('RGB',(8*cw//2+20,len(sheet_rows)*(ch//2+22)),(30,30,36));g=ImageDraw.Draw(sh)
for r,(k,cells) in enumerate(sheet_rows):
    for c,(st,fr) in enumerate(cells):
        q=Image.fromarray(fr[40:40+ch,0:cw]).resize((cw//2,ch//2),Image.LANCZOS);x=c*cw//2+(20 if c>=4 else 0);y=r*(ch//2+22)+20
        sh.paste(q,(x,y));g.text((x+4,y-18),f"{k} · {'IDLE f' if st['clip']=='idle' else 'SEL s'}{st['f']}",font=F,fill=(255,220,120) if c in (2,6) else (220,220,220))
sh.save(f'{OUT}/SEAMS_sheet_white_gamescale.png')
