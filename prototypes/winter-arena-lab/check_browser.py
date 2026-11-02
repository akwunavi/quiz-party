"""Smoke-check the running Vite lab in Chromium and its review files."""
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE=Path(__file__).resolve().parent
results={}
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=[
        '--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    page=b.new_page(viewport={'width':1920,'height':1080})
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://127.0.0.1:5173/',wait_until='networkidle')
    page.wait_for_function('window.winterArenaLab?.ready')
    for composition in ('A','B'):
        page.evaluate('(v)=>window.winterArenaLab.setComposition(v)',composition)
        before=page.evaluate('window.winterArenaLab.getState()')
        page.get_by_role('button',name='▶ Движение').click()
        page.wait_for_function('window.winterArenaLab.getState().elapsed > 0.2',timeout=5000)
        after=page.evaluate('window.winterArenaLab.getState()')
        page.get_by_role('button',name='Ⅱ Пауза').click()
        assert len(before['lanes'])==5
        assert len({d['z'] for d in before['lanes']})==5
        assert all(after['lanes'][i]['x']>before['lanes'][i]['x'] for i in range(5))
        results[composition]={'laneZ':[d['z'] for d in before['lanes']],
                              'xBefore':[d['x'] for d in before['lanes']],
                              'xAfter':[d['x'] for d in after['lanes']],
                              'camera':before['camera']}
        page.get_by_role('button',name='↺ Старт').click()
    page.locator('#camera').fill('70')
    assert page.evaluate('window.winterArenaLab.getState().camera')[1]>results['B']['camera'][1]
    assert not errors,errors
    results['pageErrors']=errors
    for composition in ('A','B'):
        page.goto(f'http://127.0.0.1:5173/review/WINTER_{composition}_MOTION.mp4')
        page.locator('video').evaluate('(v)=>{v.muted=true;return v.play()}')
        page.wait_for_function('document.querySelector("video").ended',timeout=10000)
        results[composition]['chromiumVideoEnded']=True
    b.close()
for composition in ('A','B'):
    file=HERE/'review'/f'WINTER_{composition}_MOTION.mp4'
    data=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0',
      '-show_entries','stream=codec_name,pix_fmt,width,height,nb_frames,r_frame_rate',
      '-show_entries','format=duration','-of','json',str(file)]))
    stream=data['streams'][0]
    assert stream['codec_name']=='h264' and stream['pix_fmt']=='yuv420p'
    assert stream['nb_frames']=='48' and stream['r_frame_rate']=='24/1'
    results[composition]['video']={'duration':data['format']['duration'],**stream}
(HERE/'review'/'BROWSER_CHECK.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print('Chromium: 5 lanes, both compositions, controls, motion and 2 MP4 verified')
