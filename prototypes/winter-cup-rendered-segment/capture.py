"""Record the live browser scene and measure RAF, render and memory counters."""
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'review'
OUT.mkdir(exist_ok=True)
URL='http://127.0.0.1:5180/'

def start_probe(page):
    page.evaluate('''()=>{
      window._probe={times:[],start:performance.now()};
      const sample=ts=>{
        if(!window._probe)return;
        window._probe.times.push(ts);
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }''')

def finish_probe(page):
    return page.evaluate('''()=>{
      const p=window._probe;window._probe=null;
      const gaps=p.times.slice(1).map((v,i)=>v-p.times[i]);
      return {frames:p.times.length,wall_seconds:(p.times.at(-1)-p.times[0])/1000,
        raf_fps:(p.times.length-1)*1000/(p.times.at(-1)-p.times[0]),
        gaps_over_50ms:gaps.filter(v=>v>50).length,max_gap_ms:Math.max(...gaps),
        sim_seconds:window.winterCup.time,camera_x:window.winterCup.camera.position.x,
        js_heap_bytes:performance.memory?.usedJSHeapSize,
        webgl:window.winterCup.memory,batching:window.winterCup.batching};
    }''')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    context=browser.new_context(viewport={'width':1920,'height':1080},device_scale_factor=1,accept_downloads=True)
    page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL,wait_until='networkidle');page.wait_for_function('window.winterCup?.ready')

    # Direct frame renders are only for composition screenshots, not the movie.
    for t in (0,6,12,18):
        page.evaluate('(t)=>window.winterCup.renderAt(t)',t)
        page.screenshot(path=str(OUT/f'SCENE_T{t:02d}_1920x1080.png'))
    page.evaluate('window.winterCup.setMarkers(true);window.winterCup.renderAt(9)')
    page.screenshot(path=str(OUT/'FIVE_LANES_MARKERS_1920x1080.png'))
    page.evaluate('window.winterCup.setMarkers(false);window.winterCup.renderAt(0)')

    start_probe(page);page.click('#play');page.wait_for_function('window.winterCup.time >= 18',timeout=40000)
    unrecorded=finish_probe(page)
    page.evaluate('window.winterCup.renderAt(0)')
    page.evaluate('''()=>{
      window._chunks=[];
      const stream=window.winterCup.canvas.captureStream(30);
      window._rec=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:6500000});
      window._rec.ondataavailable=e=>{if(e.data.size)window._chunks.push(e.data)};
      window._stopRecording=()=>new Promise(resolve=>{
        window._rec.onstop=()=>{
          const blob=new Blob(window._chunks,{type:'video/webm'});
          const a=document.createElement('a');a.href=URL.createObjectURL(blob);
          a.download='WINTER_CUP_LIVE.webm';a.click();resolve();
        };window._rec.stop();
      });
      window._rec.start(1000);
    }''')
    start_probe(page);page.click('#play');page.wait_for_function('window.winterCup.time >= 18',timeout=40000)
    recorded=finish_probe(page)
    with page.expect_download(timeout=30000) as dl:
        page.evaluate('()=>window._stopRecording()')
    raw=OUT/'WINTER_CUP_LIVE.webm';dl.value.save_as(str(raw))
    assert not errors,errors
    (OUT/'BROWSER_METRICS.json').write_text(json.dumps({'without_recording':unrecorded,'with_recording':recorded,'page_errors':errors},ensure_ascii=False,indent=2))
    context.close();browser.close()

subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(raw),'-vf','scale=1920:1080:flags=lanczos,fps=30',
                '-t','18','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p',
                '-movflags','+faststart',str(OUT/'WINTER_CUP_RENDERED_SEGMENT_18S.mp4')],check=True)
print(json.dumps({'without_recording':unrecorded,'with_recording':recorded,'page_errors':errors},ensure_ascii=False))
