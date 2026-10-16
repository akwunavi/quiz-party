#!/usr/bin/env python3
"""Show the V3 RUN phase at STOP versus the previously approved STOP entry.

Reads approved sprite sheets only. This is a pose diagnostic, not a new race
scenario or a substitute for a five-speed gameplay laboratory.
"""
from pathlib import Path
import subprocess
import tempfile
from PIL import Image, ImageDraw

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent
RUN=Image.open(ROOT/'race-start-v3-lab/assets/rocky-run.png').convert('RGBA')
STOP=Image.open(ROOT/'stop-v3-lab/assets/stop.png').convert('RGBA')
BASE=Image.open(ROOT/'stop-v3-lab/assets/base.png').convert('RGBA')
ARENA=Image.open(ROOT/'race-start-v3-lab/assets/arena.png').convert('RGB')
CELL=(178,100)


def cell(sheet,index):
    return sheet.crop(((index%24)*CELL[0],(index//24)*CELL[1],(index%24+1)*CELL[0],(index//24+1)*CELL[1]))


def main():
    # Rocky's accepted RACE_START lab places source #62 in RUN sheet cell 22.
    # Previous STOP review instead ended at source #68. In this START lab's
    # RUN sheet that same source frame occupies cell 16 (the STOP lab uses 18).
    actual=list(range(11,23))
    control=list(range(5,17))
    with tempfile.TemporaryDirectory(prefix='rocky-stop-phase-') as tmp:
        seq=Path(tmp)
        for frame in range(54):
            image=ARENA.copy()
            d=ImageDraw.Draw(image)
            d.rectangle((0,0,1920,150),fill=(21,38,40))
            d.text((25,24),'ROCKY / RUN -> STOP : V3 phase conflict',fill=(255,246,218))
            d.text((25,60),f'{frame/24:.2f}s  |  same approved STOP on both lanes',fill=(255,246,218))
            for lane,(label,run_frames) in enumerate([
                ('ACTUAL V3: RUN #62 -> STOP #18',actual),
                ('PREVIOUS STOP REVIEW: RUN #68 -> STOP #18',control),
            ]):
                y=390+lane*310
                d.rectangle((0,y-110,1920,y+35),fill=(28,48,38,65))
                d.text((20,y-82),label,fill=(255,249,220))
                if frame<12: sprite=cell(RUN,run_frames[frame])
                elif frame<49:sprite=cell(STOP,frame-12)
                else:sprite=cell(BASE,0)
                sprite=sprite.resize((207,116),Image.Resampling.LANCZOS)
                image.paste(sprite,(260,y-110),sprite)
                d.line((260,y+5,467,y+5),fill=(255,245,210),width=1)
            image.save(seq/f'f{frame:04d}.png')
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','24','-i',str(seq/'f%04d.png'),
            '-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',
            str(HERE/'RUN_STOP_PHASE_CONFLICT.mp4')],check=True)
    sheet=Image.new('RGB',(178*3,130),'white')
    d=ImageDraw.Draw(sheet)
    for i,(title,sprite) in enumerate([
        ('V3 RUN #62',cell(RUN,22)),('STOP #18',cell(STOP,0)),('REVIEW RUN #68',cell(RUN,16)),
    ]):
        sheet.paste(sprite,(178*i,30),sprite)
        d.text((178*i+5,8),title,fill=(0,0,0))
    sheet.resize((1602,390),Image.Resampling.NEAREST).save(HERE/'RUN_STOP_PHASE_CONFLICT.png')


if __name__=='__main__':main()
