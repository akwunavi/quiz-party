#!/usr/bin/env python3
"""Four-background QA of selected game alpha frames decoded by verify_alpha.py."""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path
from PIL import Image,ImageDraw

ROOT=Path(__file__).resolve().parent
FRAMES=[0,4,8,13,16,20,24,33,40,54,65,80,88,90,96,99,100,104,108,112,113,120,144]
DETAIL=[8,16,24,40,54,65,80,90,96,100,108,112,113]
COLORS=[('#ffffff','WHITE'),('#000000','BLACK'),('#00dd35','GREEN'),('#ddc9a7','BEIGE')]

def frame(d,n):return Image.open(d/f'd{n+1:04d}.png').convert('RGBA')

def main():
    p=argparse.ArgumentParser();p.add_argument('--decoded',type=Path,required=True);a=p.parse_args()
    w,h=320,180
    out=Image.new('RGB',(w*4,(h+28)*len(FRAMES)),'#222');draw=ImageDraw.Draw(out);data=[]
    for row,n in enumerate(FRAMES):
        im=frame(a.decoded,n);alpha=im.getchannel('A')
        data.append({'frame':n,'bbox':alpha.point(lambda v:255 if v>30 else 0).getbbox(),
                     'cornerAlpha':[alpha.getpixel(c) for c in [(0,0),(1275,0),(0,719),(1275,719)]]})
        im=im.resize((w,h),Image.Resampling.LANCZOS)
        for col,(color,label) in enumerate(COLORS):
            bg=Image.new('RGB',(w,h),color);bg.paste(im,(0,0),im)
            out.paste(bg,(col*w,row*(h+28)));draw.text((col*w+8,row*(h+28)+h+6),f'GAME #{n:03} · {label}',fill='#fff')
    out.save(ROOT/'ALPHA_QA_WHITE_BLACK_GREEN_BEIGE.png')
    zw,zh=440,350;detail=Image.new('RGB',(zw*4,(zh+28)*len(DETAIL)),'#222');labels=ImageDraw.Draw(detail)
    for row,n in enumerate(DETAIL):
        im=frame(a.decoded,n).crop((220,0,1020,700));im.thumbnail((zw,zh),Image.Resampling.LANCZOS)
        for col,(color,label) in enumerate(COLORS):
            bg=Image.new('RGB',(zw,zh),color);bg.paste(im,((zw-im.width)//2,(zh-im.height)//2),im)
            detail.paste(bg,(col*zw,row*(zh+28)));labels.text((col*zw+8,row*(zh+28)+zh+6),f'HEAD/BODY/PAW #{n:03} · {label}',fill='#fff')
    detail.save(ROOT/'ALPHA_DETAIL_FOUR_BACKGROUNDS.png')
    (ROOT/'alpha_frame_check.json').write_text(json.dumps(data,indent=2)+'\n')
    with tempfile.TemporaryDirectory(prefix='rocky-roll-qa-') as folder:
        folder=Path(folder)
        for n in range(145):
            im=frame(a.decoded,n).resize((w,h),Image.Resampling.LANCZOS)
            row=Image.new('RGB',(w*4,h+28),'#222');text=ImageDraw.Draw(row)
            for col,(color,label) in enumerate(COLORS):
                bg=Image.new('RGB',(w,h),color);bg.paste(im,(0,0),im)
                row.paste(bg,(col*w,0));text.text((col*w+8,h+5),f'ROLL #{n:03} · {label}',fill='#fff')
            row.save(folder/f'f{n:04d}.png')
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','24',
                        '-i',str(folder/'f%04d.png'),'-an','-c:v','libx264','-pix_fmt','yuv420p',
                        '-crf','21','-movflags','+faststart',str(ROOT/'DOG3_ROCKY_ROLL_V2_ALPHA_FOUR_BACKGROUNDS.mp4')],check=True)

if __name__=='__main__':main()
