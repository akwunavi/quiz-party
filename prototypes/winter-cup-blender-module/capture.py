"""Capture the live 1920x1080 browser compositor and measured frame cadence."""
import base64
import json
import functools
import http.server
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'review'
OUT.mkdir(exist_ok=True)
handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(ROOT))
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),handler)
threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    page=browser.new_page(viewport={'width':1920,'height':1170},device_scale_factor=1)
    page.goto(f'http://127.0.0.1:{server.server_port}/',wait_until='load')
    page.wait_for_function('window.winterModule && window.winterModule.metrics().ready',timeout=30000)
    page.evaluate('winterModule.setTime(3.4)')
    page.locator('#scene').screenshot(path=str(OUT/'BROWSER_SCENE_1920x1080.png'))
    page.wait_for_timeout(6500)
    metrics=page.evaluate('winterModule.metrics()')
    (OUT/'BROWSER_METRICS.json').write_text(json.dumps(metrics,indent=2),encoding='utf8')
    if '--screenshot-only' not in __import__('sys').argv:
        data=page.evaluate("""async () => {
          winterModule.setTime(0);
          const stream=winterModule.canvas.captureStream(24);
          const rec=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp8',videoBitsPerSecond:6500000});
          const chunks=[];rec.ondataavailable=e=>chunks.push(e.data);
          rec.start();await new Promise(resolve=>setTimeout(resolve,8500));
          const stopped=new Promise(resolve=>rec.onstop=resolve);rec.stop();await stopped;
          const blob=new Blob(chunks,{type:'video/webm'});
          const bytes=new Uint8Array(await blob.arrayBuffer());
          let out='';const size=8192;for(let i=0;i<bytes.length;i+=size)out+=String.fromCharCode(...bytes.subarray(i,i+size));
          return btoa(out);
        }""")
        (OUT/'BROWSER_CAMERA_CAPTURE.webm').write_bytes(base64.b64decode(data))
    browser.close()
server.shutdown()
print('BROWSER_CAPTURE_OK',metrics,flush=True)
