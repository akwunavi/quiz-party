"""Make small diagnostic sprite sheets from existing, unchanged VP9 alpha RUNs."""
from pathlib import Path
import subprocess
import tempfile
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = Path('/workspace/artifacts/bulldog-racing')
SOURCES = {
    'frank': (ROOT / 'four-alpha/published/dog1-run-alpha.webm', 25),
    'zephyr': (ROOT / 'four-alpha/published/dog2-run-alpha.webm', 25),
    'rocky': (ROOT / 'v2-dog3-dog5/published/bulldog_03_run_alpha_v2.webm', 25),
    'dog4': (ROOT / 'dog4-loop-audit/delivery/dog4_run_loop_short_03_13_alpha.webm', 0),
    'pups': (ROOT / 'v2-dog3-dog5/published/bulldog_05_run_alpha_v2.webm', 25),
}
TILE = (384, 216)

for name, (src, first) in SOURCES.items():
    with tempfile.TemporaryDirectory() as td:
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-c:v','libvpx-vp9','-i',str(src),
                        '-vf',f'select=between(n\\,{first}\\,{first+11})', '-vsync','0',
                        '-pix_fmt','rgba',str(Path(td)/'%03d.png')],check=True)
        frames = sorted(Path(td).glob('*.png'))
        if name == 'dog4' and len(frames) == 11:
            frames.append(frames[0])
        assert len(frames) == 12, (name, len(frames))
        atlas = Image.new('RGBA',(TILE[0]*4,TILE[1]*3))
        for i, path in enumerate(frames):
            im=Image.open(path).convert('RGBA').resize(TILE,Image.Resampling.LANCZOS)
            atlas.alpha_composite(im,((i%4)*TILE[0],(i//4)*TILE[1]))
        atlas.save(HERE/'assets'/f'{name}-run-atlas.png',optimize=True)
        print(name, src, 'alpha corners', [atlas.getpixel((x,y))[3] for x,y in [(0,0),(383,0),(0,215)]])
