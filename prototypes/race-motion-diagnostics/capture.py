"""Capture deterministic comparisons and separately measure real browser playback."""
import base64
import json
import subprocess
import tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE=Path(__file__).resolve().parent
OUT=HERE/'review';OUT.mkdir(exist_ok=True)
URL='http://127.0.0.1:5175/'

def encode(directory,out):
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','24',
        '-i',str(directory/'%04d.jpg'),'-vf','format=yuv420p','-c:v','libx264',
        '-preset','veryfast','-crf','21','-movflags','+faststart',str(out)],check=True)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1280,'height':720},device_scale_factor=1)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL,wait_until='networkidle');page.wait_for_function('window.motionLab?.ready')
    page.evaluate('()=>{document.querySelector("#stage").style.height="720px";dispatchEvent(new Event("resize"))}')
    with tempfile.TemporaryDirectory() as temp:
        temp=Path(temp)
        for comparison,filename in [('legacy','OLD_VS_CORRECTED_18S.mp4'),('fixed','FIXED_VS_TRACKING_18S.mp4')]:
            frames=temp/comparison;frames.mkdir()
            for n in range(18*24):
                data=page.evaluate('([t,c])=>{window.motionLab.renderAt(t,"corrected",c);return window.motionLab.canvas.toDataURL("image/jpeg",.83)}',[n/24,comparison])
                (frames/f'{n:04d}.jpg').write_bytes(base64.b64decode(data.split(',',1)[1]))
            encode(frames,OUT/filename)
    performance={}
    page.evaluate('()=>{document.querySelector("#stage").style.height="";dispatchEvent(new Event("resize"))}')
    for width,height in [(1280,720),(1920,1080)]:
        page.set_viewport_size({'width':width,'height':height})
        page.evaluate('()=>document.querySelector("#reset").click()')
        page.evaluate('()=>document.querySelector("#play").click()')
        page.wait_for_timeout(6500)
        samples=page.evaluate('()=>window.motionLab.metrics')
        gaps=[s['gap'] for s in samples if s['gap']>0]
        frame_steps=[b['expectedFrame']-a['expectedFrame'] for a,b in zip(samples,samples[1:])]
        performance[f'{width}x{height}']={
            'rendered_frames':len(gaps),'sampled_seconds':(samples[-1]['at']-samples[0]['at'])/1000,
            'effective_fps':1000*(len(samples)-1)/(samples[-1]['at']-samples[0]['at']),
            'frame_gaps_gt_50ms':sum(x>50 for x in gaps),
            'skipped_run_frame_steps':sum(max(0,x-1) for x in frame_steps),
            'repeated_run_frame_steps':sum(x==0 for x in frame_steps),
            'max_gap_ms':max(gaps),
        }
        page.evaluate('()=>document.querySelector("#play").click()')
    assert not errors,errors
    (OUT/'BROWSER_PERFORMANCE.json').write_text(json.dumps({'environment':'headless Chromium, software rendering in cloud VM; browser wall-clock playback','results':performance,'errors':errors},indent=2)+'\n')
    print(performance)
    browser.close()
