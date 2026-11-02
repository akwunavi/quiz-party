"""Capture the real browser WebGL scene at fixed simulation times."""
import base64
import json
import subprocess
import tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE=Path(__file__).resolve().parent
OUT=HERE/'review';OUT.mkdir(exist_ok=True)
URL='http://127.0.0.1:5174/'

def record(page,directory,seconds,stable):
    directory.mkdir()
    for n in range(round(seconds*24)):
        t=n/24
        data=page.evaluate('([t,stable])=>{window.routeLab.renderAt(t,stable);return window.routeLab.canvas.toDataURL("image/jpeg",.84)}',[t,stable])
        (directory/f'{n:04d}.jpg').write_bytes(base64.b64decode(data.split(',',1)[1]))

def encode(directory,out):
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','24',
                    '-i',str(directory/'%04d.jpg'),'-vf','scale=in_range=full:out_range=limited,format=yuv420p',
                    '-c:v','libx264','-preset','veryfast','-crf','20','-color_range','tv',
                    '-movflags','+faststart',str(out)],check=True)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=[
        '--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    page=browser.new_page(viewport={'width':1920,'height':1080},device_scale_factor=1)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL,wait_until='networkidle');page.wait_for_function('window.routeLab?.ready')
    page.wait_for_timeout(900)
    snapshots=[]
    for t in (0,5,10,15,17):
        state=page.evaluate('(t)=>window.routeLab.renderAt(t,true)',t)
        page.locator('#stage canvas').screenshot(path=str(OUT/f'ROUTE_T{t:02d}.png'))
        snapshots.append(state)
    with tempfile.TemporaryDirectory() as td:
        td=Path(td)
        record(page,td/'stable',17,True)
        encode(td/'stable',OUT/'WINTER_MOVING_CAMERA_17S.mp4')
        record(page,td/'raw',3,False)
        record(page,td/'fixed',3,True)
        encode(td/'raw',td/'raw.mp4');encode(td/'fixed',td/'fixed.mp4')
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(td/'raw.mp4'),
          '-i',str(td/'fixed.mp4'),'-filter_complex',
          '[0:v]scale=960:540,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text=BEFORE:fontsize=27:fontcolor=white:x=30:y=22[a];'
          '[1:v]scale=960:540,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text=AFTER:fontsize=27:fontcolor=white:x=30:y=22[b];'
          '[a][b]hstack=inputs=2,scale=in_range=full:out_range=limited,format=yuv420p[out]',
          '-map','[out]','-c:v','libx264','-preset','veryfast','-crf','19',
          '-color_range','tv','-movflags','+faststart',str(OUT/'RUN_ANCHOR_BEFORE_AFTER.mp4')],check=True)
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y',
          '-i',str(OUT/'RUN_ANCHOR_BEFORE_AFTER.mp4'),'-filter_complex',
          '[0:v]split=2[l][r];'
          '[l]crop=370:310:390:120,scale=960:800,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text=BEFORE:fontsize=35:fontcolor=white:x=25:y=20[a];'
          '[r]crop=370:310:1350:120,scale=960:800,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text=AFTER:fontsize=35:fontcolor=white:x=25:y=20[b];'
          '[a][b]hstack=inputs=2[out]','-map','[out]','-c:v','libx264',
          '-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-color_range','tv',
          '-movflags','+faststart',str(OUT/'RUN_ANCHOR_BEFORE_AFTER_CLOSE.mp4')],check=True)
    assert not errors,errors
    (OUT/'BROWSER_TRACE.json').write_text(json.dumps({'snapshots':snapshots,'pageErrors':errors},ensure_ascii=False,indent=2)+'\n')
    browser.close()
print('17 s camera video and 3 s before/after encoded from Chromium')
