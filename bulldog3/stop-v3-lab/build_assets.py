#!/usr/bin/env python3
"""Build Rocky's isolated STOP lab assets from already prepared RGBA frames.

The source STOP's original 55 frames are matted before retiming. This script
samples the approved phase timing without interpolation and applies only a
local, transparent-canvas offset to the STOP art; it does not change race state.
"""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path
from PIL import Image

HERE=Path(__file__).resolve().parent
CELL=(178,100)
COLUMNS=24
PHASE_SOURCE=[round(18+i*29/24) for i in range(25)]+[round(48+i*24/11) for i in range(12)]

def sheet(frames,path):
    out=Image.new('RGBA',(COLUMNS*CELL[0],((len(frames)+COLUMNS-1)//COLUMNS)*CELL[1]))
    for i,im in enumerate(frames):
        out.paste(im.resize(CELL,Image.Resampling.LANCZOS),((i%COLUMNS)*CELL[0],(i//COLUMNS)*CELL[1]))
    out.save(path)

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--stop-rgba',type=Path,required=True,help='pipeline work/rgba containing r0018.png…r0072.png')
    p.add_argument('--run-frames',type=Path,required=True,help='decoded RUN alpha-v2, files 025.png…036.png')
    p.add_argument('--stand-rgba',type=Path,required=True,help='approved RACE_STAND matted at 1276×720')
    a=p.parse_args()
    assets=HERE/'assets';assets.mkdir(exist_ok=True)
    run={n:Image.open(a.run_frames/f'{n:03}.png').convert('RGBA') for n in range(25,37)}
    # V3 RUN has an 11-frame join then a 12-frame repeat. The last displayed
    # RUN frame before STOP is source #68, the accepted entrance to STOP #18.
    run_order=list(range(26,37))+list(range(25,37))
    sheet([run[n] for n in run_order],assets/'run.png')
    stand=Image.open(a.stand_rgba).convert('RGBA')
    sheet([stand],assets/'base.png')
    stop=[]
    for i,n in enumerate(PHASE_SOURCE):
        im=Image.open(a.stop_rgba/f'r{n:04d}.png').convert('RGBA')
        factor=max(0,(47-n)/29)
        dx,dy=round(-38*factor),round(17*factor)
        canvas=Image.new('RGBA',im.size)
        canvas.paste(im,(dx,dy))
        stop.append(canvas)
    sheet(stop,assets/'stop.png')
    webm=assets/'rocky-stop-alpha-37.webm'
    with tempfile.TemporaryDirectory(prefix='rocky-stop-frames-') as tmp:
        seq=Path(tmp)
        for i,im in enumerate(stop):im.save(seq/f'f{i:04d}.png')
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','24','-i',str(seq/'f%04d.png'),
            '-c:v','libvpx-vp9','-pix_fmt','yuva420p','-b:v','0','-crf','14','-auto-alt-ref','0',
            '-row-mt','1','-cpu-used','1','-deadline','good','-r','24','-metadata:s:v:0','alpha_mode=1',str(webm)],check=True)
    (HERE/'retiming.json').write_text(json.dumps({
        'name':'Rocky',
        'sourceStopFramesInclusive':[18,72],
        'outputStopFrames':37,
        'phaseSourceFrames':PHASE_SOURCE,
        'activeSourceFramesInclusive':[18,47],
        'activeOutputFrames':25,
        'settleSourceFramesInclusive':[48,72],
        'settleOutputFrames':12,
        'localOffsetStartSourcePx':[-38,17],
        'localOffsetEndsAtSourceFrame':47,
        'fps':24,
    },indent=2)+'\n')
    (HERE/'manifest.json').write_text(json.dumps({
        'cellWidth':CELL[0], 'cellHeight':CELL[1], 'columns':COLUMNS,
        'clips':{'RUN':{'file':'assets/run.png','frames':23},'STOP':{'file':'assets/stop.png','frames':37},'BASE':{'file':'assets/base.png','frames':1}}
    },indent=2)+'\n')
    print(webm)

if __name__=='__main__':main()
