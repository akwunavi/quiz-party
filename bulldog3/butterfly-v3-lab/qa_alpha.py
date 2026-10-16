#!/usr/bin/env python3
"""Make four-background visual QA from the existing alpha pipeline RGBA frames."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
FRAMES = [0, 28, 64, 68, 76, 82, 88, 94, 104, 120]
COLORS = [('#ffffff','WHITE'), ('#000000','BLACK'), ('#00dd35','GREEN'), ('#ddc9a7','BEIGE')]

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--rgba', type=Path, required=True)
    a = p.parse_args()
    w,h = 320,180
    out = Image.new('RGB',(w*4,(h+28)*len(FRAMES)),'#222')
    draw=ImageDraw.Draw(out)
    data=[]
    for row,n in enumerate(FRAMES):
        im=Image.open(a.rgba/f'r{n:04d}.png').convert('RGBA')
        alpha=im.getchannel('A')
        bbox=alpha.point(lambda v:255 if v>30 else 0).getbbox()
        data.append({'frame':n,'bbox':bbox,'cornerAlpha':[alpha.getpixel(c) for c in [(0,0),(1275,0),(0,719),(1275,719)]]})
        im=im.resize((w,h),Image.Resampling.LANCZOS)
        for col,(color,label) in enumerate(COLORS):
            bg=Image.new('RGB',(w,h),color)
            bg.paste(im,(0,0),im)
            out.paste(bg,(col*w,row*(h+28)))
            draw.text((col*w+8,row*(h+28)+h+6),f'SOURCE #{n:03}  ·  {label}',fill='#fff')
    out.save(HERE/'ALPHA_QA_WHITE_BLACK_GREEN_BEIGE.png')
    paw_frames=[68,76,82,94]
    zoom_w,zoom_h=440,350
    detail=Image.new('RGB',(zoom_w*4,(zoom_h+28)*len(paw_frames)),'#222')
    labels=ImageDraw.Draw(detail)
    for row,n in enumerate(paw_frames):
        original=Image.open(a.rgba/f'r{n:04d}.png').convert('RGBA').crop((240,0,1000,700))
        original.thumbnail((zoom_w,zoom_h),Image.Resampling.LANCZOS)
        for col,(color,label) in enumerate(COLORS):
            bg=Image.new('RGB',(zoom_w,zoom_h),color)
            bg.paste(original,((zoom_w-original.width)//2,(zoom_h-original.height)//2),original)
            detail.paste(bg,(col*zoom_w,row*(zoom_h+28)))
            labels.text((col*zoom_w+8,row*(zoom_h+28)+zoom_h+6),f'PAW #{n:03}  ·  {label}',fill='#fff')
    detail.save(HERE/'ALPHA_PAW_DETAIL_FOUR_BACKGROUNDS.png')
    (HERE/'alpha_frame_check.json').write_text(json.dumps(data,indent=2)+'\n')

if __name__=='__main__':main()
