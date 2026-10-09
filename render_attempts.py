"""Reproducible, lab-only transition edits. Never writes to the source folders."""
from functools import lru_cache
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import shutil
import subprocess
import sys

HERE = Path(__file__).resolve().parent
LAB = HERE.parent
RUN = Path('/workspace/artifacts/bulldog-racing/dog4-alpha/rgba')
SNIFF = LAB / 'v2' / 'rgba'
W, H, FPS = 1276, 720, 24
SNIFF_FIRST, SNIFF_LAST = 12, 240
RUN_LAST, RUN_RETURN = 59, 0
SNIFF_SCALE, SNIFF_X, SNIFF_Y = .87, 25, -4
RETURN_X, RETURN_Y = 100, 15
BEFORE_N, AFTER_N = 60, 36
RAMP_BEFORE_N = 65
GROUND_Y = 695

HERE.mkdir(parents=True, exist_ok=True)
for name, src, idx in [
    ('01_run_stop_frame_059.png', RUN, RUN_LAST),
    ('02_sniff_start_frame_012.png', SNIFF, SNIFF_FIRST),
    ('03_sniff_end_frame_240.png', SNIFF, SNIFF_LAST),
    ('04_run_resume_frame_000.png', RUN, RUN_RETURN),
]:
    shutil.copy2(src / f'{idx:04d}.png', HERE / name)

@lru_cache(maxsize=24)
def load(which, index):
    root = RUN if which.startswith('run') else SNIFF
    return Image.open(root / f'{int(index):04d}.png').convert('RGBA')

def dog_layer(which, index, travel=0):
    image = load(which, index)
    scale, dx, dy = (1, 0, 0) if which == 'run_before' else \
        ((1, RETURN_X, RETURN_Y) if which == 'run_after' else (SNIFF_SCALE, SNIFF_X, SNIFF_Y))
    if scale != 1:
        width, height = round(W*scale), round(H*scale)
        image = image.resize((width, height), Image.Resampling.LANCZOS)
    else:
        width, height = W, H
    result = Image.new('RGBA', (W, H))
    result.alpha_composite(image, ((W-width)//2 + dx + round(travel), H-height + dy))
    return result

def scene(which, index, travel, label):
    dog = dog_layer(which, index, travel)
    base = Image.new('RGB', (W,H), '#c7af7f')
    draw = ImageDraw.Draw(base)
    draw.rectangle((0,0,W,536), fill='#b7bc8e')
    draw.line((0,GROUND_Y,W,GROUND_Y), fill='#9e8a68', width=2)
    draw.text((24,24), label, fill='#252820')
    bbox = dog.getchannel('A').getbbox()
    if bbox:
        center = (bbox[0]+bbox[2])//2
        shadow = Image.new('RGBA',(W,H))
        sd = ImageDraw.Draw(shadow)
        sd.ellipse((center-135,GROUND_Y-17,center+135,GROUND_Y+10), fill=(50,43,37,65))
        shadow = shadow.filter(ImageFilter.GaussianBlur(10))
        base = Image.alpha_composite(base.convert('RGBA'),shadow)
    else:
        base=base.convert('RGBA')
    base.alpha_composite(dog)
    return base.convert('RGB')

def before_v1(n):
    return 'run_before', n, -80 + 120*n/(BEFORE_N-1)

def before_v2(n):
    # Source video and world translation share one integrated speed curve.
    duration=RAMP_BEFORE_N/FPS
    ramp=.55
    start=duration-ramp
    def area(t):
        if t<=start:return t
        q=min(ramp,t-start)
        return start+q-.65*q*q/(2*ramp)
    source=RUN_LAST*area(n/FPS)/area((RAMP_BEFORE_N-1)/FPS)
    return 'run_before', min(RUN_LAST,round(source)), -80 + 120*source/RUN_LAST

def after_v1(n):
    return 'run_after', n, 40 + 70*n/(AFTER_N-1)

def after_v2(n):
    ramp=.55
    def area(t):
        q=min(ramp,t)
        return .35*q+.65*q*q/(2*ramp)+max(0,t-ramp)
    value=area(n/FPS)
    source=24*value
    return 'run_after', min(80,round(source)), 40+70*value/area((AFTER_N-1)/FPS)

def frame_at(mode, n):
    pre=BEFORE_N if mode=='v1' else RAMP_BEFORE_N
    sniff_len=SNIFF_LAST-SNIFF_FIRST+1
    label='V1  Geometry alignment' if mode=='v1' else 'V2  Matched speed ramp'
    if n<pre:
        which,index,travel=(before_v1(n) if mode=='v1' else before_v2(n))
    elif n<pre+sniff_len:
        which,index,travel='sniff',SNIFF_FIRST+n-pre,40
    else:
        which,index,travel=(after_v1(n-pre-sniff_len) if mode=='v1' else after_v2(n-pre-sniff_len))
    return scene(which,index,travel,label)

def encode(mode):
    count=(BEFORE_N if mode=='v1' else RAMP_BEFORE_N)+(SNIFF_LAST-SNIFF_FIRST+1)+AFTER_N
    name='transition_v1_alignment.mp4' if mode=='v1' else 'transition_v2_speed_ramp.mp4'
    target=HERE/name
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24',
         '-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-frames:v',str(count),
         '-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',
         '-movflags','+faststart','-y',str(target)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    try:
        for n in range(count):
            proc.stdin.write(frame_at(mode,n).tobytes())
            if n%48==0:print(mode,n,'/',count,flush=True)
    finally:
        proc.stdin.close()
    if proc.wait():raise RuntimeError('Encoding failed: '+name)
    print(target,flush=True)
    # Eight consecutive frames straddling each cut, not isolated stills.
    pre=BEFORE_N if mode=='v1' else RAMP_BEFORE_N
    sniff_len=SNIFF_LAST-SNIFF_FIRST+1
    for cut_name,cut in [('entry',pre),('exit',pre+sniff_len)]:
        sheet=Image.new('RGB',(4*W//2,2*H//2),'#c7af7f')
        draw=ImageDraw.Draw(sheet)
        for k,n in enumerate(range(cut-4,cut+4)):
            im=frame_at(mode,n).resize((W//2,H//2),Image.Resampling.LANCZOS)
            x=(k%4)*(W//2);y=(k//4)*(H//2)
            sheet.paste(im,(x,y))
            draw.rectangle((x,y,x+154,y+22),fill='#eee5cb')
            draw.text((x+5,y+3),f'{n-cut:+d} | output {n}',fill='black')
        sheet.save(HERE/f'{mode}_{cut_name}_eight_frames.jpg',quality=91)
    return target

if __name__=='__main__':
    if '--v2-only' not in sys.argv:
        encode('v1')
    encode('v2')
    concat=HERE/'comparison.ffconcat'
    concat.write_text("ffconcat version 1.0\nfile 'transition_v1_alignment.mp4'\nfile 'transition_v2_speed_ramp.mp4'\n")
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-safe','0','-i',str(concat),
                    '-c','copy','-movflags','+faststart','-y',str(HERE/'transition_comparison_v1_v2.mp4')],check=True)
