"""Frame-step the actual browser scene for a smooth art-review MP4.

This is an offline capture. Runtime FPS is measured separately by capture.py.
"""
import base64
import functools
import http.server
import subprocess
import tempfile
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parent
out=root/'review/WINTER_CUP_BC_CAMERA_PREVIEW.mp4'
handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(root))
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),handler)
threading.Thread(target=server.serve_forever,daemon=True).start()
with tempfile.TemporaryDirectory(prefix='winter-frames-') as folder, sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    page=browser.new_page(viewport={'width':1920,'height':1170},device_scale_factor=1)
    page.goto(f'http://127.0.0.1:{server.server_port}/',wait_until='load')
    page.wait_for_function('window.winterModule && window.winterModule.metrics().ready',timeout=30000)
    page.locator('#play').click()
    for i in range(168):
        data=page.evaluate("""time => {
          winterModule.setTime(time);
          return winterModule.canvas.toDataURL('image/jpeg',.91).split(',')[1];
        }""",i/24)
        Path(folder,f'{i:04}.jpg').write_bytes(base64.b64decode(data))
    browser.close()
    subprocess.run(['ffmpeg','-y','-v','error','-framerate','24','-i',f'{folder}/%04d.jpg',
                    '-vf','scale=in_range=full:out_range=limited,format=yuv420p',
                    '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-color_range','tv',
                    '-movflags','+faststart',str(out)],check=True)
server.shutdown()
print('OFFLINE_BROWSER_VIDEO_OK',out,flush=True)
