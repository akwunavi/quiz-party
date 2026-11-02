"""Record two live-browser stress runs and put the old/new lane geometry side by side."""
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT=Path(__file__).resolve().parent/'review'
URL='http://127.0.0.1:5177/'

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    context=browser.new_context(viewport={'width':1920,'height':1080},accept_downloads=True,device_scale_factor=1)
    page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL,wait_until='networkidle');page.wait_for_function('window.winterRace?.ready')
    page.add_style_tag(content='header,#stats{display:none!important}body{margin:0!important}#stage{width:1920px!important;height:1080px!important}')
    for layout in ('before','after'):
        page.evaluate('''(layout)=>{
          window.winterRace.setLayout(layout);window.winterRace.setScenario('all_same_x');
          document.querySelector('#reset').click();window._laneChunks=[];
          window._laneRecorder=new MediaRecorder(window.winterRace.canvas.captureStream(30),
            {mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:7500000});
          window._laneRecorder.ondataavailable=e=>{if(e.data.size)window._laneChunks.push(e.data)};
          window._stopLane=()=>new Promise(resolve=>{
            window._laneRecorder.onstop=()=>{
              const blob=new Blob(window._laneChunks,{type:'video/webm'});
              const a=document.createElement('a');a.href=URL.createObjectURL(blob);
              a.download=`LANES_${layout.toUpperCase()}_LIVE.webm`;a.click();resolve()
            };window._laneRecorder.stop()
          });
          window._laneRecorder.start(1000);document.querySelector('#play').click();
        }''',layout)
        page.wait_for_timeout(6100)
        with page.expect_download(timeout=30000) as download:
            page.evaluate('()=>window._stopLane()')
        download.value.save_as(str(OUT/f'LANES_{layout.upper()}_LIVE.webm'))
    assert not errors,errors
    context.close();browser.close()

font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
subprocess.run([
    'ffmpeg','-hide_banner','-loglevel','error','-y',
    '-i',str(OUT/'LANES_BEFORE_LIVE.webm'),'-i',str(OUT/'LANES_AFTER_LIVE.webm'),
    '-filter_complex',
    f'[0:v]fps=30,crop=960:1080:300:0,drawbox=x=16:y=108:w=350:h=50:color=black@0.65:t=fill,drawtext=fontfile={font}:text=BEFORE\\ 120px:fontsize=29:fontcolor=white:x=29:y=119,setpts=PTS-STARTPTS[a];'
    f'[1:v]fps=30,crop=960:1080:300:0,drawbox=x=16:y=108:w=350:h=50:color=black@0.65:t=fill,drawtext=fontfile={font}:text=AFTER\\ 148px:fontsize=29:fontcolor=white:x=29:y=119,setpts=PTS-STARTPTS[b];'
    '[a][b]hstack=inputs=2,format=yuv420p[out]',
    '-map','[out]','-t','6','-c:v','libx264','-preset','veryfast','-crf','20',
    '-movflags','+faststart',str(OUT/'LANES_BEFORE_AFTER_LIVE_6S.mp4')
],check=True)
print('live browser lane comparison recorded; page errors:',errors)
