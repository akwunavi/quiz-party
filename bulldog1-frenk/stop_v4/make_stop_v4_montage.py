#!/usr/bin/env python3
"""Stage 1: STOP V4 main montage at source resolution (RGB, no alpha) + side-by-side with the original Kling clip.
Main: RUN #87..#96 (approved RUN alpha on the clip's own floor plate) -> STOP V4 k38..k73 -> approved RACE_STAND (1276 resize, 12 frames hold).
Original (right): the untouched Kling MP4 k1..k73. Nothing is retimed, blended or morphed.
usage: make_stop_v4_montage.py RUN_FRAMES_PATTERN(f%03d.png = #n-39) KLING_FRAMES_DIR(k%03d.png) OUTDIR"""
import sys,os,subprocess,numpy as np
from PIL import Image,ImageDraw
RUN,KD,OUT=sys.argv[1:4]; H=os.path.dirname(os.path.abspath(__file__)); os.makedirs(OUT,exist_ok=True)
plate=np.repeat(np.asarray(Image.open(f'{H}/KLING_FIRST_RUN97_on_plate.png').convert('RGB'))[:,40:41,:],1276,axis=1).astype(float)
def run(n):
    r=np.asarray(Image.open(RUN%(n-39))).astype(float); a=r[...,3:4]/255; return Image.fromarray((r[...,:3]*a+plate*(1-a)).astype(np.uint8))
stand=Image.open(f'{H}/../butterfly_prep/DOG1_BUTTERFLY_START_END_racestand.png').convert('RGB')
main=[('RUN #%d'%n,run(n)) for n in range(87,97)]+[('STOP V4 k%d'%k,Image.open(f'{KD}/k{k:03d}.png').convert('RGB')) for k in range(38,74)]
# the approved RACE_STAND image sits 104.6 src px further right (it is drawn with its own offset in the game); shown here at the k73 point
st=Image.new('RGB',stand.size); st.paste(stand.crop((105,0,1276,720)),(0,0)); st.paste(stand.crop((1171,0,1276,720)),(1171,0))
main+=[('RACE_STAND (approved, aligned to k73)',st)]*12
orig=[('Kling original k%d'%k,Image.open(f'{KD}/k{k:03d}.png').convert('RGB')) for k in range(1,74)]
N=max(len(main),len(orig)); W,Hh=638,360
for i in range(N):
    c=Image.new('RGB',(W*2,Hh+24),(18,22,24)); d=ImageDraw.Draw(c)
    for j,(seq,name) in enumerate([(main,'STOP V4 main montage'),(orig,'original Kling MP4')]):
        lab,im=seq[min(i,len(seq)-1)]; c.paste(im.resize((W,Hh)),(j*W,24)); d.text((j*W+6,6),f'{name}: {lab}  ({i/24:.2f}s)',fill=(255,240,160) if j==0 else (200,200,200))
    c.save(f'{OUT}/c{i:04d}.png')
    main[min(i,len(main)-1)][1].save(f'{OUT}/m{i:04d}.png') if i<len(main) else None
enc=lambda pat,out,extra=[]:subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',pat,*extra,'-c:v','libx264','-pix_fmt','yuv420p','-crf','16',out],check=True)
enc(f'{OUT}/m%04d.png',f'{H}/DOG1_STOP_V4_main_montage_src.mp4'); enc(f'{OUT}/c%04d.png',f'{H}/DOG1_STOP_V4_main_vs_original.mp4')
print(len(main),'main frames,',len(orig),'original frames')
