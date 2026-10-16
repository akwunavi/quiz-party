#!/usr/bin/env python3
"""Diagnostic close-up of the actual START #41 -> RUN #52 cut."""
import argparse
import subprocess
import tempfile
from pathlib import Path
from PIL import Image, ImageDraw

HERE=Path(__file__).resolve().parent
SEQUENCE=[('KLING',n) for n in range(30,42)]+[('RUN',n) for n in range(52,64)]

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--start-rgba',type=Path,required=True)
    p.add_argument('--run-frames',type=Path,required=True)
    a=p.parse_args()
    out=HERE/'DOG3_ROCKY_START_RUN_SEAM_CLOSE.mp4'
    with tempfile.TemporaryDirectory(prefix='rocky-seam-close-') as tmp:
        seq=Path(tmp)
        index=0
        for repeat in (1,2):
            for kind,n in SEQUENCE:
                source=a.start_rgba/f'r{n:04d}.png' if kind=='KLING' else a.run_frames/f'{n:03d}.png'
                fg=Image.open(source).convert('RGBA')
                bg=Image.new('RGBA',fg.size,(211,201,175,255))
                bg.alpha_composite(fg)
                image=bg.convert('RGB')
                d=ImageDraw.Draw(image)
                d.rectangle((0,0,1276,44),fill=(24,37,33))
                d.text((14,14),f'{"1x" if repeat==1 else "0.5x"}  {kind} #{n}  |  cut: KLING #41 -> RUN #52',fill=(255,249,225))
                for _ in range(repeat):
                    image.save(seq/f'f{index:04d}.png')
                    index+=1
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','24','-i',str(seq/'f%04d.png'),
            '-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],check=True)
    print(out)


if __name__=='__main__':main()
