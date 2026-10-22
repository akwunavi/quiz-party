#!/usr/bin/env python3
"""Four-background QA of selected game alpha frames decoded by verify_alpha.py."""
import argparse
import json
from pathlib import Path
from PIL import Image,ImageDraw

ROOT=Path(__file__).resolve().parent
FRAMES=[0,20,21,24,45,46,47,48,49,54,81,82,83,84,86,96,120,145,156,159,168,169,176,177,239]
DETAIL=[21,48,54,82,84,86,96,156,159,168,169]
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
            detail.paste(bg,(col*zw,row*(zh+28)));labels.text((col*zw+8,row*(zh+28)+zh+6),f'EAR/PAW #{n:03} · {label}',fill='#fff')
    detail.save(ROOT/'ALPHA_DETAIL_FOUR_BACKGROUNDS.png')
    (ROOT/'alpha_frame_check.json').write_text(json.dumps(data,indent=2)+'\n')

if __name__=='__main__':main()
