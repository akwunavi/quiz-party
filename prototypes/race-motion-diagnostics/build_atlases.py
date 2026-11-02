"""Extract the documented RUN loops, without changing source clips or poses."""
from pathlib import Path
import subprocess
import tempfile
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = Path('/workspace/artifacts/bulldog-racing')
# source frame range, first source frame contained in alpha WebM
SOURCES = {
    'frank': (ROOT/'four-alpha/published/dog1-run-alpha.webm', 87, 98, 40),
    'zephyr': (ROOT/'four-alpha/published/dog2-run-alpha.webm', 88, 99, 36),
    'pups': (ROOT/'dog4-alpha/published/dog4-run-alpha.webm', 51, 62, 40),
}
TILE = (384, 216)
for name, (source, first, last, offset) in SOURCES.items():
    with tempfile.TemporaryDirectory() as temp:
        temp = Path(temp)
        subprocess.run([
            'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
            '-c:v', 'libvpx-vp9', '-i', str(source),
            '-vf', f'select=between(n\\,{first-offset}\\,{last-offset})',
            '-vsync', '0', '-pix_fmt', 'rgba', str(temp/'%03d.png'),
        ], check=True)
        frames = sorted(temp.glob('*.png'))
        assert len(frames) == last-first+1 == 12, (name, len(frames))
        atlas = Image.new('RGBA', (TILE[0]*4, TILE[1]*3))
        for n, path in enumerate(frames):
            frame = Image.open(path).convert('RGBA').resize(TILE, Image.Resampling.LANCZOS)
            atlas.alpha_composite(frame, ((n%4)*TILE[0], (n//4)*TILE[1]))
        atlas.save(HERE/'assets'/f'{name}-run.png', optimize=True)
        print(name, first, last, 'alpha indices', first-offset, last-offset)
