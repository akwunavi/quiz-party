"""Capture actual browser playback, exact scene screenshots, and live RAF stats."""
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE=Path(__file__).resolve().parent
OUT=HERE/'review';OUT.mkdir(exist_ok=True)
URL='http://127.0.0.1:5177/'

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    context=browser.new_context(viewport={'width':1920,'height':1080},accept_downloads=True,device_scale_factor=1)
    page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL,wait_until='networkidle');page.wait_for_function('window.winterRace?.ready')
    page.add_style_tag(content='header,#stats{display:none!important}body{margin:0!important}#stage{width:1920px!important;height:1080px!important}')
    snapshots=[]
    for t,label in [(1,'FESTIVAL_V2'),(8,'FOREST_V2'),(16,'SECOND_STAND_V2')]:
        snapshots.append(page.evaluate('(t)=>window.winterRace.renderAt(t)',t))
        page.locator('#stage').screenshot(path=str(OUT/f'{label}_1920x1080.png'))
    page.evaluate('()=>window.winterRace.renderAt(8)')
    page.screenshot(path=str(OUT/'DOGS_CLOSE_V2.png'),clip={'x':560,'y':300,'width':950,'height':730})
    for scenario in ('all_same_x','adjacent_overtake','one_lags','different_speeds'):
        page.evaluate('(s)=>window.winterRace.renderAt(8,s)',scenario)
        page.locator('#stage').screenshot(path=str(OUT/f'SCENARIO_{scenario.upper()}.png'))
    # MediaRecorder receives frames from live canvas playback, not renderAt(t).
    page.evaluate('''()=>{
      window._chunks=[];
      const stream=window.winterRace.canvas.captureStream(30);
      window._rec=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:9000000});
      window._rec.ondataavailable=e=>{if(e.data.size)window._chunks.push(e.data)};
      window._stopAndDownload=()=>new Promise(resolve=>{
        window._rec.onstop=()=>{
          const blob=new Blob(window._chunks,{type:'video/webm'});
          const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='WINTER_RACE_LANES_V2_LIVE.webm';a.click();resolve(blob.size)
        };window._rec.stop()
      });
      window.winterRace.setLayout('after');window.winterRace.setScenario('race');
      document.querySelector('#reset').click();window._rec.start(1000);document.querySelector('#play').click();
    }''')
    page.wait_for_timeout(18100)
    live=page.evaluate('''()=>{
      const s=window.winterRace.measure,d=s.slice(1).map((v,i)=>v.frame-s[i].frame),g=s.slice(1).map((v,i)=>v.at-s[i].at);
      return {frames:s.length,seconds:(s.at(-1).at-s[0].at)/1000,fps:1000*(s.length-1)/(s.at(-1).at-s[0].at),
        run_frames_skipped:d.reduce((a,v)=>a+Math.max(0,v-1),0),intervals_gt50ms:g.filter(v=>v>50).length,
        max_interval_ms:Math.max(...g),sim_time:window.winterRace.time}
    }''')
    with page.expect_download(timeout=30000) as info:
        page.evaluate('()=>window._stopAndDownload()')
    info.value.save_as(str(OUT/'WINTER_RACE_LANES_V2_LIVE.webm'))
    context.close()
    assert not errors,errors
    # Keep source WebM so the recorded browser cadence is inspectable.
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(OUT/'WINTER_RACE_LANES_V2_LIVE.webm'),
      '-t','18','-vf','fps=30,format=yuv420p','-c:v','libx264','-preset','veryfast','-crf','20',
      '-movflags','+faststart',str(OUT/'WINTER_RACE_LANES_V2_18S.mp4')],check=True)
    (OUT/'CAPTURE_METRICS_V2.json').write_text(json.dumps({'live_recording':live,'snapshots':snapshots,'page_errors':errors},ensure_ascii=False,indent=2)+'\n')
    print(live)
    browser.close()
