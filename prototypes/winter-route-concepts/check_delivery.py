"""Verify the world-camera browser lab, media and concept package."""
import json
import subprocess
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE=Path(__file__).resolve().parent
LAB=HERE/'camera-lab';OUT=LAB/'review'
for concept in 'ABC':
    assert (HERE/'concepts'/f'{concept}_CONTACT.jpg').is_file()
    assert len(list((HERE/'concepts').glob(f'{concept}_0*.jpg')))==4

def probe(name):
    return json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0',
        '-show_entries','stream=codec_name,pix_fmt,width,height,r_frame_rate,nb_frames',
        '-show_entries','format=duration,size','-of','json',str(OUT/name)]))

result={'concepts':3,'framesPerConcept':4,'videos':{},'camera':[],'pageErrors':[]}
for name,count,duration in [('WINTER_MOVING_CAMERA_17S.mp4',408,17),
                            ('RUN_ANCHOR_BEFORE_AFTER.mp4',72,3),
                            ('RUN_ANCHOR_BEFORE_AFTER_CLOSE.mp4',72,3)]:
    v=probe(name);s=v['streams'][0]
    assert s['codec_name']=='h264' and s['pix_fmt']=='yuv420p' and int(s['nb_frames'])==count
    assert float(v['format']['duration'])==duration
    result['videos'][name]={'duration':duration,'frames':count,'width':s['width'],'height':s['height']}
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=[
        '--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    page=browser.new_page(viewport={'width':1920,'height':1080})
    page.on('pageerror',lambda e:result['pageErrors'].append(str(e)))
    page.goto('http://127.0.0.1:5174/',wait_until='networkidle')
    page.wait_for_function('window.routeLab?.ready')
    page.wait_for_timeout(500)
    for t in (0,5,10,15,17):
        state=page.evaluate('(t)=>window.routeLab.renderAt(t,true)',t)
        assert len(state['dogs'])==5 and len({d['z'] for d in state['dogs']})==5
        result['camera'].append({'t':t,'x':state['cameraX'],'dogX':[d['x'] for d in state['dogs']]})
    assert all(result['camera'][i+1]['x']>result['camera'][i]['x'] for i in range(4))
    raw=page.evaluate('window.routeLab.renderAt(1,false)')
    stable=page.evaluate('window.routeLab.renderAt(1,true)')
    assert raw['dogs']==stable['dogs'] and raw['cameraX']==stable['cameraX']
    page.goto('http://127.0.0.1:5174/review/WINTER_MOVING_CAMERA_17S.mp4')
    page.locator('video').evaluate('(v)=>{v.muted=true;return v.play()}')
    page.wait_for_function('document.querySelector("video").ended',timeout=25000)
    result['videos']['WINTER_MOVING_CAMERA_17S.mp4']['chromiumEnded']=True
    assert not result['pageErrors'],result['pageErrors']
    browser.close()
(OUT/'VALIDATION.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('3 concepts × 4 frames, 5 world lanes, moving camera, 3 H.264 MP4s and Chromium playback verified')
