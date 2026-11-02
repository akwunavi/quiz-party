"""Record deterministic browser frames from the local Vite lab, then make H.264 MP4s."""
from pathlib import Path
import subprocess
import tempfile
from playwright.sync_api import sync_playwright

HERE=Path(__file__).resolve().parent
OUT=HERE/'review';OUT.mkdir(exist_ok=True)
URL='http://127.0.0.1:5173/'
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=[
        '--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    page=browser.new_page(viewport={'width':1920,'height':1080},device_scale_factor=1)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL,wait_until='networkidle');page.wait_for_function('window.winterArenaLab?.ready')
    page.wait_for_timeout(1800)
    for composition in ('A','B'):
        page.evaluate('(v)=>window.winterArenaLab.setComposition(v)',composition)
        page.evaluate('window.winterArenaLab.seek(0)')
        page.screenshot(path=str(OUT/f'WINTER_{composition}_WIDE_1920.png'))
        page.evaluate('window.winterArenaLab.setClose()')
        page.screenshot(path=str(OUT/f'WINTER_{composition}_CLOSE_1920.png'))
        page.evaluate('(v)=>window.winterArenaLab.setComposition(v)',composition)
        with tempfile.TemporaryDirectory() as td:
            # 48 distinct animation instants; browser renders existing sprite frames.
            page.evaluate('window.winterArenaLab.setMotion(true)')
            for frame in range(48):
                page.evaluate('(t)=>window.winterArenaLab.seek(t)',frame/24)
                page.locator('#scene canvas').screenshot(path=str(Path(td)/f'{frame:03d}.png'))
            page.evaluate('window.winterArenaLab.setMotion(false)')
            subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','24',
                '-i',str(Path(td)/'%03d.png'),'-c:v','libx264','-preset','veryfast','-crf','20',
                '-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/f'WINTER_{composition}_MOTION.mp4')],check=True)
        print(composition,page.evaluate('window.winterArenaLab.getState()'))
    print('page errors',errors)
    browser.close()
